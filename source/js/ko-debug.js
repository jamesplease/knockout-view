javascript:

(function( ko ) {

  "use strict";

  var context = ko.contextFor(document.body);

  if (context && !document.getElementById("ko-debug")) {

    var setText           = "textContent" in document.body ? "textContent" : "innerText",
        styleSheetText    = '#ko-debug{font-family:Arial;position:fixed;z-index:99999;left:10px;top:20px;font-size:13px;background:#f5f5f5;border:1px solid #eee;border-radius:3px;box-shadow:0 2px 2px rgba(0,0,0,.3)}#ko-debug-toggle{width:120px;height:18px;text-align:center;font-weight:bold;color:#444;padding:5px 2px 5px 2px;margin:0 5px;background:#f5f5f5;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;float:left}#ko-debug-close{float:left;color:#aaa;font-weight:bold;width:8px;margin:4px 0 6px 10px;cursor:pointer;height:18px}#ko-debug pre{height:450px;width:450px;overflow:auto;font-family:"Lucida Console",Monaco,monospace;line-height:14px;margin:0;background:#fff;border:1px solid #eee;box-shadow:0 2px 2px rgba(0,0,0,.3);padding:4px;color:#666;background:#fcfcfc;resize:both;position:absolute;left:0;top:40px}',
        head              = document.getElementsByTagName('head')[0],
        debugStyle        = document.createElement("style"),
        viewModelDisplay  = document.createElement("pre"),
        containerDiv      = document.createElement("div"),
        debugClose        = containerDiv.cloneNode(false),
        displayToggle     = containerDiv.cloneNode(false),
        closeText         = document.createTextNode(),
        buttonText        = closeText.cloneNode(false),
        styleText         = closeText.cloneNode(false),
        showModelText     = "Show ViewModel",
        hideModelText     = "Hide ViewModel",
        close = function() {
          ko.removeNode(containerDiv);
          head.removeChild(debugStyle);
        };

    if (!document.getElementById("ko-debug-style")) {
      debugStyle          = document.createElement("style");
      debugStyle.type     = "text/css";
      debugStyle.id       = "ko-debug-style";
      styleText.nodeValue = styleSheetText;
      debugStyle.appendChild(styleText);
      head.appendChild(debugStyle);
    }

    containerDiv.id = "ko-debug";

    debugClose.id = "ko-debug-close";
    debugClose.setAttribute("data-bind", "click: close");
    closeText.nodeValue = "x";

    displayToggle.id = "ko-debug-toggle";
    buttonText.nodeValue = hideModelText;

    viewModelDisplay.id = "ko-debug-display";
    viewModelDisplay.setAttribute("data-bind", "text: ko.toJSON(data, null, 2)");

    debugClose.appendChild(closeText);
    displayToggle.appendChild(buttonText);
    document.body.appendChild(containerDiv);
    containerDiv.appendChild(debugClose);
    containerDiv.appendChild(displayToggle);
    containerDiv.appendChild(viewModelDisplay);
    
    ko.applyBindings({ data: context.$root, close: close }, containerDiv);

    displayToggle.onclick = function() {
      viewModelDisplay               = document.getElementById("ko-debug-display");
      viewModelDisplay.style.display = viewModelDisplay.style.display === "none" ? "" : "none";
      buttonText.nodeValue           = viewModelDisplay.style.display === "none" ? showModelText : hideModelText;
    };

  }

}( window.ko ));


