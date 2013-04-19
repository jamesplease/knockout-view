// This isn't a critical component to the ko.js debugger. It's merely an example
// of how I implement view models in my webapps.

// This namespace handles everything regarding our viewModel

(function( viewData, undefined ) {
  
  viewData.initialize = function(dataToBind) {
    viewData.myViewModel = new viewData.viewModel(dataToBind);
    ko.applyBindings(viewData.myViewModel);
  }

  viewData.viewModel = function(data) {
    ko.mapping.fromJSON(data, {}, this);
  }

}( window.viewData = window.viewData || {} ));


