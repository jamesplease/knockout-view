_version 1.0.1_

When building a project that uses [Knockout.js](http://knockoutjs.com/), you might, at times, want to see what your View Model looks like. This bookmarklet lets you do that with a toggle-able, minimally-intrusive display.

##Installation

###Drag this link to your bookmarks bar: [KO Debug][bookmarklet]

[bookmarklet]: javascript%3A(function(ko)%7Bvar%20context%3Dko.contextFor(document.body)%3Bif(context%26%26!document.getElementById(%22ko-debug%22))%7Bvar%20styleSheetText%3D%27%23ko-debug%7Bfont-family%3AArial%3Bposition%3Afixed%3Bz-index%3A99999%3Bleft%3A10px%3Btop%3A20px%3Bfont-size%3A13px%3Bbackground%3A%23f5f5f5%3Bborder%3A1px%20solid%20%23eee%3Bborder-radius%3A3px%3Bbox-shadow%3A0%202px%202px%20rgba(0%2C0%2C0%2C.3)%7D%23ko-debug-toggle%7Bwidth%3A120px%3Bheight%3A18px%3Btext-align%3Acenter%3Bfont-weight%3Abold%3Bcolor%3A%23444%3Bpadding%3A5px%202px%205px%202px%3Bmargin%3A0%205px%3Bbackground%3A%23f5f5f5%3Bcursor%3Apointer%3B-webkit-touch-callout%3Anone%3B-webkit-user-select%3Anone%3B-khtml-user-select%3Anone%3B-moz-user-select%3Anone%3B-ms-user-select%3Anone%3Buser-select%3Anone%3Bfloat%3Aleft%7D%23ko-debug-close%7Bfloat%3Aleft%3Bcolor%3A%23aaa%3Bfont-weight%3Abold%3Bwidth%3A8px%3Bmargin%3A4px%200%206px%2010px%3Bcursor%3Apointer%3Bheight%3A18px%7D%23ko-debug%20pre%7Bheight%3A450px%3Bwidth%3A450px%3Boverflow%3Aauto%3Bfont-family%3A%22Lucida%20Console%22%2CMonaco%2Cmonospace%3Bline-height%3A14px%3Bmargin%3A0%3Bbackground%3A%23fff%3Bborder%3A1px%20solid%20%23eee%3Bbox-shadow%3A0%202px%202px%20rgba(0%2C0%2C0%2C.3)%3Bpadding%3A4px%3Bcolor%3A%23666%3Bbackground%3A%23fcfcfc%3Bresize%3Aboth%3Bposition%3Aabsolute%3Bleft%3A0%3Btop%3A40px%7D%27%2CcontainerDiv%3Ddocument.createElement(%22div%22)%2CdebugClose%3Ddocument.createElement(%22div%22)%2CdisplayToggle%3Ddocument.createElement(%22div%22)%2CviewModelDisplay%3Ddocument.createElement(%22pre%22)%2Chead%3Ddocument.getElementsByTagName(%22head%22)%5B0%5D%2Cclose%3Dfunction()%7BremoveDebugger()%7D%3Bif(!document.getElementById(%22ko-debug-style%22))%7Bvar%20debugStyle%3Ddocument.createElement(%22style%22)%3BdebugStyle.type%3D%22text%2Fcss%22%3BdebugStyle.id%3D%22ko-debug-style%22%3BdebugStyle.appendChild(document.createTextNode(styleSheetText))%3Bhead.appendChild(debugStyle)%7DcontainerDiv.id%3D%22ko-debug%22%3BdebugClose.id%3D%22ko-debug-close%22%3BdebugClose.dataset.bind%3D%22click%3A%20close%22%3BdebugClose.innerHTML%3D%22x%22%3BdisplayToggle.id%3D%22ko-debug-toggle%22%3BdisplayToggle.innerHTML%3D%22Hide%20ViewModel%22%3BviewModelDisplay.id%3D%22ko-debug-display%22%3BviewModelDisplay.dataset.bind%3D%22text%3A%20ko.toJSON(data%2C%20null%2C%202)%22%3Bdocument.body.appendChild(containerDiv)%3BcontainerDiv.appendChild(debugClose)%3BcontainerDiv.appendChild(displayToggle)%3BcontainerDiv.appendChild(viewModelDisplay)%3Bko.applyBindings(%7Bdata%3Acontext.%24root%2Cclose%3Aclose%7D%2CcontainerDiv)%3BdisplayToggle.onclick%3Dfunction()%7Bvar%20viewModelDisplay%3Ddocument.getElementById(%22ko-debug-display%22)%3BviewModelDisplay.style.display%3DviewModelDisplay.style.display%3D%3D%3D%22none%22%3F%22%22%3A%22none%22%3BdisplayToggle.innerHTML%3DviewModelDisplay.style.display%3D%3D%3D%22none%22%3F%22Show%20ViewModel%22%3A%22Hide%20ViewModel%22%7D%3Bfunction%20removeDebugger()%7Bko.removeNode(containerDiv)%3Bhead.removeChild(debugStyle)%7D%7D%7D(window.ko))%3B

Copy the code from the `ko-debug.js` file in the `bookmarklet` directory of this repository into a new Bookmark in the browser of your choice. 

##Usage

Simply click the bookmarklet on any page with a Knockout model. Voila!

Need a page to test it on? Try the [Knockout Tutorial page.](http://learn.knockoutjs.com/#/?tutorial=intro)

You can toggle the visibility of the view model display panel with the main button. The `x` will remove the debugger from the DOM.

The display panel can be resized by dragging the lower right corner.

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