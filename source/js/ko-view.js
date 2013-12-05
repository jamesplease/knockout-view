javascript:

(function( ko ) {

  "use strict";

  var TYPE_STRING = 1,
  TYPE_NUMBER = 2,
  TYPE_OBJECT = 3,
  TYPE_ARRAY  = 4,
  TYPE_BOOL   = 5,
  TYPE_NULL   = 6,

  baseSpan = document.createElement('span'),
  baseDiv  = document.createElement('div'),
  baseText = document.createTextNode(""),

  templatesObj = {
    t_kvov: getSpanClass('kvov'),
    t_exp: getSpanClass('e'),
    t_key: getSpanClass('k'),
    t_string: getSpanClass('s'),
    t_number: getSpanClass('n'),
    
    t_null: getSpanBoth('null', 'nl'),
    t_true: getSpanBoth('true','bl'),
    t_false: getSpanBoth('false','bl'),
    
    t_oBrace: getSpanBoth('{','b'),
    t_cBrace: getSpanBoth('}','b'),
    t_oBracket: getSpanBoth('[','b'),
    t_cBracket: getSpanBoth(']','b'),
    
    t_ellipsis: getSpanClass('ell'),
    t_blockInner: getSpanClass('blockInner'),
    
    t_colonAndSpace: document.createTextNode(':\u00A0'),
    t_commaText: document.createTextNode(','),
    t_dblqText: document.createTextNode('"')
  },

  mac = navigator.platform.indexOf('Mac') !== -1,
  modKey,
  lastKvovIdGiven = 0,

  context = ko.contextFor(document.body),

  showText          = "Show",
  hideText          = "Hide",
  head              = document.getElementsByTagName('head')[0],
  fragment          = document.createDocumentFragment(),

  koViewStyle       = document.createElement("style"),
  styleSheetText    = '<%= style %>',
  styleTextNode     = baseText.cloneNode(false),

  koViewContainer   = getDivId('ko-view-container'),
  koViewMenu        = getDivClass('ko-view-menu'),
  koViewContent     = getDivClass('ko-view-content'),
  koViewMove        = getSpanClass('ko-view-move'),
  koViewToggle      = getSpanClass('ko-view-toggle'),
  koViewToggleText  = baseText.cloneNode(false),
  koViewClose       = getSpanBoth('x', 'ko-view-close');

  if (mac) {
    modKey = function (ev) {
      return ev.metaKey;
    };
  } else {
    modKey = function (ev) {
      return ev.ctrlKey;
    };
  }

  if (context && !document.getElementById("ko-view-container")) {

    koViewStyle.type      = "text/css";
    koViewStyle.id        = "ko-debug-style";
    styleTextNode     .nodeValue = styleSheetText;
    koViewStyle.appendChild(styleTextNode     );
    head.appendChild(koViewStyle);

    koViewToggleText.nodeValue = hideText;
    koViewToggle.appendChild(koViewToggleText);

    koViewMove.setAttribute('draggable', 'true');
    koViewClose.setAttribute('data-bind', 'click: closeView');
    koViewContent.setAttribute("data-bind", "html: format(ko.toJS(data))");


    koViewMenu.appendChild(koViewMove);
    koViewMenu.appendChild(koViewToggle);
    koViewMenu.appendChild(koViewClose);

    koViewContainer.appendChild(koViewMenu);
    koViewContainer.appendChild(koViewContent);

    fragment.appendChild(koViewContainer);
    document.body.appendChild(fragment);
    
    ko.applyBindings({ data: context.$root, closeView: closeView, format: jsonObjToHtml }, koViewContainer);

    document.addEventListener(
      'click',
      generalClick,
      false // No need to propogate down
    );

    koViewToggle.onclick = function() {
      koViewContent.style.display = koViewContent.style.display === "none" ? "" : "none";
      koViewToggleText.nodeValue  = koViewContent.style.display === "none" ? showText : hideText;
    };

    koViewMove.addEventListener( 'dragstart', dragStart,false ); 
    document.body.addEventListener( 'dragover', dragOver, false ); 
    document.body.addEventListener( 'drop', dropEvent, false ); 

  }

  function closeView() {

    // Stop listening
    koViewMove.removeEventListener( 'dragstart', dragStart );
    document.removeEventListener( 'click', generalClick );
    document.body.removeEventListener( 'dragover', dragOver );
    document.body.removeEventListener( 'drop', dropEvent );

    // Remove the stylesheet and element
    ko.removeNode(koViewContainer);
    head.removeChild(koViewStyle);



  }

  function dragStart( event ) {

    event.dataTransfer.setData(
      "text/plain",
      (parseInt(event.clientX, 10) + ',' + (parseInt(event.clientY, 10)))
    );
    event.dataTransfer.setDragImage(koViewMenu, 0, 0);

  }

  function dragOver( event ) {

    event.preventDefault(); 
    return false; 
  
  }

  function dropEvent( event ) {

    var offset = event.dataTransfer.getData("text/plain").split(','),
    style = window.getComputedStyle(koViewContainer, null),
    left = parseInt(style.getPropertyValue("left"),10),
    top = parseInt(style.getPropertyValue("top"),10);

    koViewContainer.style.left = left + (event.clientX-parseInt(offset[0],10)) + 13 + 'px';
    koViewContainer.style.top = top + (event.clientY-parseInt(offset[1],10)) + 10 + 'px';

    event.preventDefault();
    return false;

  } 

  function getDivId(id) {
    var div = baseDiv.cloneNode(false);
    div.id = id;
    return div;
  }

  function getDivClass(className) {
    var div = baseDiv.cloneNode(false);
    div.className = className;
    return div;
  }

  function getSpanBoth(text,className) {
    var span     = baseSpan.cloneNode(false),
        textNode = baseText.cloneNode(false);
    span.className = className;
    textNode.nodeValue = text;
    span.appendChild(textNode);
    return span;
  }
  
  function getSpanClass(className) {
    var span = baseSpan.cloneNode(false);
    span.className = className;
    return span;
  }

  function exists(object) {
    return (object !== null && typeof object !== 'undefined');
  }

  function getKvovDOM(value, keyName, parentKeyName, depth) {

    // depth         = ( exists(depth) )         ? depth         : 0;
    // parentKeyName = ( exists(parentKeyName) ) ? parentKeyName + "-" + parentKeyName : "root";
    // console.log(keyName, parentKeyName, exists(parentKeyName)); 

    var type,
    kvov,
    nonZeroSize,
    templates = templatesObj, // bring into scope for tiny speed boost
    objKey,
    keySpan,
    valueElement;

    // Establish value type
      if (typeof value === 'string') {
        type = TYPE_STRING;
      }
      else if (typeof value === 'number') {
        type = TYPE_NUMBER;
      }
      else if (value === false || value === true ) {
        type = TYPE_BOOL;
      }
      else if (value === null) {
        type = TYPE_NULL;
      }
      else if (value instanceof Array) {
        type = TYPE_ARRAY;
      }
      else {
        type = TYPE_OBJECT;
      }

    // Root node for this kvov
      kvov = templates.t_kvov.cloneNode(false);
      // kvov.classList.add("c"+"-"+parentKeyName);
    
    // Add an 'expander' first (if this is object/array with non-zero size)
      if (type === TYPE_OBJECT || type === TYPE_ARRAY) {
        nonZeroSize = false;
        for (objKey in value) {
          if (value.hasOwnProperty(objKey)) {
            nonZeroSize = true;
            break; // no need to keep counting; only need one
          }
        }
        if (nonZeroSize) {
          kvov.appendChild(  templates.t_exp.cloneNode(false) );
        }
      }
      
    // If there's a key, add that before the value
      if (keyName !== false) { // NB: "" is a legal keyname in JSON
        // This kvov must be an object property
          kvov.classList.add('objProp');
        // Create a span for the key name
          keySpan = templates.t_key.cloneNode(false);
          keySpan.textContent = JSON.stringify(keyName).slice(1,-1); // remove quotes
        // Add it to kvov, with quote marks
          kvov.appendChild(templates.t_dblqText.cloneNode(false));
          kvov.appendChild( keySpan );
          kvov.appendChild(templates.t_dblqText.cloneNode(false));
        // Also add ":&nbsp;" (colon and non-breaking space)
          kvov.appendChild( templates.t_colonAndSpace.cloneNode(false) );
      }
      else {
        // This is an array element instead
          kvov.classList.add('arrElem');
      }
    
    // Generate DOM for this value
      var blockInner, childKvov;
      switch (type) {
        case TYPE_STRING:
          // If string is a URL, get a link, otherwise get a span
            var innerStringEl = baseSpan.cloneNode(false),
                escapedString = JSON.stringify(value)
           ;
            escapedString = escapedString.substring(1, escapedString.length-1); // remove quotes
            if (value[0] === 'h' && value.substring(0, 4) === 'http') { // crude but fast - some false positives, but rare, and UX doesn't suffer terribly from them.
              var innerStringA = document.createElement('A');
              innerStringA.href = value;
              innerStringA.innerText = escapedString;
              innerStringEl.appendChild(innerStringA);
            }
            else {
              innerStringEl.innerText = escapedString;
            }
            valueElement = templates.t_string.cloneNode(false);
            valueElement.appendChild(templates.t_dblqText.cloneNode(false));
            valueElement.appendChild(innerStringEl);
            valueElement.appendChild(templates.t_dblqText.cloneNode(false));
            kvov.appendChild(valueElement);
          break;
        
        case TYPE_NUMBER:
          // Simply add a number element (span.n)
            valueElement = templates.t_number.cloneNode(false);
            valueElement.innerText = value;
            kvov.appendChild(valueElement);
          break;
        
        case TYPE_OBJECT:
          // Add opening brace
            kvov.appendChild( templates.t_oBrace.cloneNode(true) );
          // If any properties, add a blockInner containing k/v pair(s)
            if (nonZeroSize) {
              // Add ellipsis (empty, but will be made to do something when kvov is collapsed)
                kvov.appendChild( templates.t_ellipsis.cloneNode(false) );
              // Create blockInner, which indents (don't attach yet)
                blockInner = templates.t_blockInner.cloneNode(false);
              // For each key/value pair, add as a kvov to blockInner
                var count = 0, k, comma;
                for (k in value) {
                  if (value.hasOwnProperty(k)) {
                    count++;
                    childKvov =  getKvovDOM(value[k], k, keyName+"0", depth+1);
                    // Add comma
                      comma = templates.t_commaText.cloneNode();
                      childKvov.appendChild(comma);
                    blockInner.appendChild( childKvov );
                  }
                }
              // Now remove the last comma
                childKvov.removeChild(comma);
              // Add blockInner
                kvov.appendChild( blockInner );
            }
          
          // Add closing brace
            kvov.appendChild( templates.t_cBrace.cloneNode(true) );
          break;

        case TYPE_ARRAY:
          // Add opening bracket
            kvov.appendChild( templates.t_oBracket.cloneNode(true) );
          // If non-zero length array, add blockInner containing inner vals
            if (nonZeroSize) {
              // Add ellipsis
                kvov.appendChild( templates.t_ellipsis.cloneNode(false) );
              // Create blockInner (which indents) (don't attach yet)
                blockInner = templates.t_blockInner.cloneNode(false);
              // For each key/value pair, add the markup
                for (var i=0, length=value.length, lastIndex=length-1; i<length; i++) {
                  // Make a new kvov, with no key
                    childKvov = getKvovDOM(value[i], false, keyName+"0", depth+1);
                  // Add comma if not last one
                    if (i < lastIndex) {
                      childKvov.appendChild( templates.t_commaText.cloneNode() );
                    }
                  // Append the child kvov
                    blockInner.appendChild( childKvov );
                }
              // Add blockInner
                kvov.appendChild( blockInner );
            }
          // Add closing bracket
            kvov.appendChild( templates.t_cBracket.cloneNode(true) );
          break;

        case TYPE_BOOL:
          if (value) {
            kvov.appendChild( templates.t_true.cloneNode(true) );
          }
          else {
            kvov.appendChild( templates.t_false.cloneNode(true) );
          }
          break;

        case TYPE_NULL:
          kvov.appendChild( templates.t_null.cloneNode(true) );
          break;
      }

    return kvov;
  }

  function collapse(elements) {
    // console.log('elements', elements);

    var el, i, blockInner, count;

    for (i = elements.length - 1; i >= 0; i--) {
      el = elements[i];
      el.classList.add('collapsed');

      // (CSS hides the contents and shows an ellipsis.)

      // Add a count of the number of child properties/items (if not already done for this item)
        if (!el.id) {
          el.id = 'kvov' + (++lastKvovIdGiven);

          // Find the blockInner
            blockInner = el.firstElementChild;
            while ( blockInner && !blockInner.classList.contains('blockInner') ) {
              blockInner = blockInner.nextElementSibling;
            }
            if (!blockInner) {
              continue;
            }

          // See how many children in the blockInner
            count = blockInner.children.length;

          // Generate comment text eg "4 items"
            var comment = count + (count===1 ? ' item' : ' items');
          // Add CSS that targets it
            koViewStyle.insertAdjacentHTML(
              'beforeend',
              '\n#kvov'+lastKvovIdGiven+'.collapsed:after{color: #aaa; content:" // '+comment+'"}'
            );
        }
    }
  }

  function expand(elements) {
    for (var i = elements.length - 1; i >= 0; i--) {
      elements[i].classList.remove('collapsed');
    }
  }

  function generalClick(ev) {
    // console.log('click', ev);
    if (ev.which === 1) {
      var elem = ev.target;
      
      if (elem.className === 'e') {
        // It's a click on an expander.

        ev.preventDefault();

        var parent = elem.parentNode;
        
        // Expand or collapse
          if (parent.classList.contains('collapsed')) {
            // EXPAND
              if (modKey(ev)) {
                expand(parent.parentNode.children);
              }
              else {
                expand([parent]);
              }
          }
          else {
            // COLLAPSE
              if (modKey(ev)) {
                collapse(parent.parentNode.children);
              }
              else {
                collapse([parent]);
              }
          }

        return;
      }
    }
  }

  function jsonObjToHtml(obj) {

    // Format object (using recursive kvov builder)
    var rootKvov = getKvovDOM(obj, false);

    // The whole DOM is now built.

    // Set class on root node to identify it
    rootKvov.classList.add('rootKvov');
      
    // Make div#formattedJson and append the root kvov
    var divFormattedJson = document.createElement('div');
    divFormattedJson.id = 'formattedJson';
    divFormattedJson.appendChild( rootKvov );
    
    // Get the HTML
    var returnHTML = divFormattedJson.outerHTML;

    // Return the HTML
    return returnHTML;
  }

})( window.ko );


