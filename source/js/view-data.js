// The viewData namespace handles our viewModel

(function( viewData, undefined ) {
  
  viewData.initialize = function(dataToBind) {
    viewData.myViewModel = new viewData.viewModel(dataToBind);
    ko.applyBindings(viewData.myViewModel);
  }

  viewData.viewModel = function(data) {
    ko.mapping.fromJSON(data, {}, this);
  }

}( window.viewData = window.viewData || {} ));


