_version 2.0.0_

When building a project that uses [Knockout.js](http://knockoutjs.com/), you might, at times, want to see what your View Model looks like. This bookmarklet lets you do that with a toggle-able, minimally-intrusive display.

![KO View](http://github.jmeas.com/ko-debug/ko-debug.jpg)

##Installation

Copy the code from the `ko-view.min.js` file in the `build` directory of this repository into a new Bookmark in the browser of your choice.

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

_I'd like to thank Ryan Niemeyer twofold: first for writing [the enlightening article](http://www.knockmeout.net/2011/06/10-things-to-know-about-knockoutjs-on.html) that inspired me to make this, and second for his advice on this bookmarklet._
