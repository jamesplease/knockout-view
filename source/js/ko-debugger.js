// The ko.js-debugger script
(function( kojsDebugger, undefined ) {
  var toggleButton = document.getElementById("viewModel-toggle");
  toggleButton.onclick = function() {
    var viewModelDisplay = document.getElementById("viewModel-display");
    viewModelDisplay.style.display = viewModelDisplay.style.display === 'none' ? '' : 'none';
    var buttonText = viewModelDisplay.style.display === 'none' ? 'Show View Model' : 'Hide View Model';
    this.innerHTML = buttonText;
  }
}( window.kojsDebugger = window.kojsDebugger || {} ));