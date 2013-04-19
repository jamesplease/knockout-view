// The ko.js-debugger script
(function( kojsDebugger, undefined ) {
  var toggleButton = document.getElementById("viewModel-toggle");
  toggleButton.onclick = function() {
    var yourUl = document.getElementById("viewModel-display");
    yourUl.style.display = yourUl.style.display === 'none' ? '' : 'none';
    var buttonText = yourUl.style.display === 'none' ? 'Show View Model' : 'Hide View Model';
    this.innerHTML = buttonText;
  }
}( window.kojsDebugger = window.kojsDebugger || {} ));