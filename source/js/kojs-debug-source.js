javascript:

(function( ko, undefined ) {

  var context = ko.contextFor(document.body);

  if (context && !document.getElementById("ko-debug")) {

    var styleSheetText = '#ko-debug{font-family:Arial;position:fixed;z-index:99999;left:10px;top:20px;font-size:13px;background:#f5f5f5;border:1px solid #eee;border-radius:3px;box-shadow:0 2px 2px rgba(0,0,0,.3)}#ko-debug-toggle{width:120px;height:18px;text-align:center;font-weight:bold;color:#444;padding:5px 2px 5px 2px;margin:0 5px;background:#f5f5f5;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;float:left}#ko-debug-close{float:left;color:#aaa;font-weight:bold;width:8px;margin:4px 0 6px 10px;cursor:pointer;height:18px}#ko-debug pre{height:450px;width:450px;overflow:auto;font-family:"Lucida Console",Monaco,monospace;line-height:14px;margin:0;background:#fff;border:1px solid #eee;box-shadow:0 2px 2px rgba(0,0,0,.3);padding:4px;color:#666;background:#fcfcfc;resize:both;position:absolute;left:0;top:40px}';

    if (!document.getElementById("ko-debug-style")) {
      var debugStyle = document.createElement("style"),
          head = document.getElementsByTagName('head')[0];

      debugStyle.type = "text/css";
      debugStyle.appendChild(document.createTextNode(styleSheetText));
      head.appendChild(debugStyle);
    }

    var containerDiv = document.createElement("div");
    containerDiv.id = 'ko-debug';

    var debugClose = document.createElement("div");
    debugClose.id = 'ko-debug-close';
    debugClose.dataset.bind = "click: close";

    debugClose.innerHTML = 'x';

    var displayToggle = document.createElement("div");
    displayToggle.id = 'ko-debug-toggle';

    displayToggle.innerHTML = 'Show ViewModel';

    var viewModelDisplay = document.createElement("pre");
    viewModelDisplay.id = 'ko-debug-display';
    viewModelDisplay.style.display = "none";
    viewModelDisplay.dataset.bind = "text: ko.toJSON(viewData.myViewModel, null, 2)";

    var close = function() {
      ko.removeNode(containerDiv);
    };

    document.body.appendChild(containerDiv);
    containerDiv.appendChild(debugClose);
    containerDiv.appendChild(displayToggle);
    containerDiv.appendChild(viewModelDisplay);
    
    ko.applyBindings({ data: context.$root, close: close }, containerDiv);

    displayToggle.onclick = function() {
      var viewModelDisplay = document.getElementById("ko-debug-display");
      viewModelDisplay.style.display = viewModelDisplay.style.display === 'none' ? '' : 'none';
      displayToggle.innerHTML = viewModelDisplay.style.display === 'none' ? 'Show ViewModel' : 'Hide ViewModel';
    }

  }
  else if (context && document.getElementById("ko-debug")) {
    document.getElementById("ko-debug").style.display = "block";
  }

}( window.ko ));


