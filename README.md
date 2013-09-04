_version 1.0.1_

When building a project that uses [Knockout.js](http://knockoutjs.com/), you might, at times, want to see what your View Model looks like. This bookmarklet lets you do that with a toggle-able, minimally-intrusive display.

##Installation

###Drag this link to your bookmarks bar: [KO Debug](javascript:(function(ko){var context=ko.contextFor(document.body);if(context&&!document.getElementById("ko-debug")){var styleSheetText='#ko-debug{font-family:Arial;position:fixed;z-index:99999;left:10px;top:20px;font-size:13px;background:#f5f5f5;border:1px solid #eee;border-radius:3px;box-shadow:0 2px 2px rgba(0,0,0,.3)}#ko-debug-toggle{width:120px;height:18px;text-align:center;font-weight:bold;color:#444;padding:5px 2px 5px 2px;margin:0 5px;background:#f5f5f5;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;float:left}#ko-debug-close{float:left;color:#aaa;font-weight:bold;width:8px;margin:4px 0 6px 10px;cursor:pointer;height:18px}#ko-debug pre{height:450px;width:450px;overflow:auto;font-family:"Lucida Console",Monaco,monospace;line-height:14px;margin:0;background:#fff;border:1px solid #eee;box-shadow:0 2px 2px rgba(0,0,0,.3);padding:4px;color:#666;background:#fcfcfc;resize:both;position:absolute;left:0;top:40px}',containerDiv=document.createElement("div"),debugClose=document.createElement("div"),displayToggle=document.createElement("div"),viewModelDisplay=document.createElement("pre"),head=document.getElementsByTagName("head")[0],close=function(){removeDebugger()};if(!document.getElementById("ko-debug-style")){var debugStyle=document.createElement("style");debugStyle.type="text/css";debugStyle.id="ko-debug-style";debugStyle.appendChild(document.createTextNode(styleSheetText));head.appendChild(debugStyle)}containerDiv.id="ko-debug";debugClose.id="ko-debug-close";debugClose.dataset.bind="click: close";debugClose.innerHTML="x";displayToggle.id="ko-debug-toggle";displayToggle.innerHTML="Hide ViewModel";viewModelDisplay.id="ko-debug-display";viewModelDisplay.dataset.bind="text: ko.toJSON(data, null, 2)";document.body.appendChild(containerDiv);containerDiv.appendChild(debugClose);containerDiv.appendChild(displayToggle);containerDiv.appendChild(viewModelDisplay);ko.applyBindings({data:context.$root,close:close},containerDiv);displayToggle.onclick=function(){var viewModelDisplay=document.getElementById("ko-debug-display");viewModelDisplay.style.display=viewModelDisplay.style.display==="none"?"":"none";displayToggle.innerHTML=viewModelDisplay.style.display==="none"?"Show ViewModel":"Hide ViewModel"};function removeDebugger(){ko.removeNode(containerDiv);head.removeChild(debugStyle)}}}(window.ko));)

Alternatively, you can copy the code from the `ko-debug.js` file in the `bookmarklet` directory of this repository into a new Bookmark in the browser of your choice. 

##Usage

Simply click the bookmarklet on any page with a Knockout model. Voila!

Need a page to test it on? Try the [Knockout Tutorial page.](http://learn.knockoutjs.com/#/?tutorial=intro)

You can toggle the visibility of the view model display with the main button. The `x` will remove the debugger from the DOM.

##Extending

The uncompressed files used to build this app can be found in the `source` folder. If you wished to expand upon or change the functionality of this plugin, I'd look there.

##Licensing

This is released under the [WTFPL](http://www.wtfpl.net/); that means you can do whatever you want with it.

###2.0 Roadmap

- Filtering system for observables, calculated, and mapped variables


===

_Tested on Chrome 26, Firefox 19, Opera 12, Safari 6_

===

_I'd like to thank Ryan Niemeyer twofold: first for writing [the article](http://www.knockmeout.net/2011/06/10-things-to-know-about-knockoutjs-on.html) that inspired me to make this, and second for his advice on this bookmarklet._