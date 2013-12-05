#knockout-view
**version 2.0.0**

Use this bookmarklet to view your [Knockout](http://knockoutjs.com/) View Models with a toggle-able, minimally-intrusive display.

![KO View](http://github.jmeas.com/ko-view/ko-view-cursor.gif)

##Installation

Copy the code from `build/ko-view.min.js` into a new Bookmark in the browser of your choice.

##Usage

Click the bookmarklet on any page with a Knockout model.

Need a page to test it on? Try this [Knockout Example page.](http://knockoutjs.com/examples/contactsEditor.html)

You can toggle the visibility of the view model display panel with the main button. The `x` will remove the debugger from the DOM.

The display panel can be resized by dragging the lower right corner. It can also be moved about with the burger menu.

##Building

Want to make some changes? It's easy to do with grunt.

1. Clone this repository
2. Run `npm install` in the directory of installation
3. Install `Ruby` and `SASS`, if you don't already have them
4. Make your changes to the files in the `source` directory
5. Run `grunt` from the command line to build the bookmarklet

##Licensing

Don't fret about legal stuff. [Do whatever you want with it](http://www.wtfpl.net/).