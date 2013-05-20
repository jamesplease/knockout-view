knockout-debug
==============

_version 1.0.1_

When building a project with [Knockout](http://knockoutjs.com/), you might, at times, want to see what your `View Model` looks like. This bookmarklet lets you do that with a toggle-able, minimally-intrusive display.

##Usage

Copy the code from the `ko-debug.js` file in the `bookmarklet` folder into a new Bookmark in your browser. Then, on any page with a View Model, simply click the Bookmarklet and the display will appear.

Need a page to test it on? Try the [Knockout Tutorial page.](http://learn.knockoutjs.com/#/?tutorial=intro)

You can toggle the visibility of the view model display with the main button. The `x` will remove the debugger from the DOM entirely.

###Caveats

This has only been tested on pages with a single view model.

###Browser Support

Chrome 26, Firefox 19, Opera 12

##Extending

I included the uncompressed files I used to build this app in the `source` folder. If you wanted to expand the functionality of this plugin, look there!

##Licensing

This is released under the [WTFPL](http://www.wtfpl.net/); that means you can do whatever you want with it.

##Roadmap

- Notification system for webpages that don't have the View Model
- Support for multiple View Models
- Filtering system for observables, calculated, and mapped variables

###Thanks

_I'd like to thank Ryan Niemeyer firstly for writing [the article](http://www.knockmeout.net/2011/06/10-things-to-know-about-knockoutjs-on.html) that inspired me to make this thing, and secondly for advice on this project._