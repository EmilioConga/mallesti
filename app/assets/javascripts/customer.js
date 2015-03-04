(function(){
  var app = angular.module('mallesti-customer', ['ui.router']);

  app.controller('CustomerController', ['$http', function($http){
    var scope = this;
    scope.customer = {};

    $http.get('http://localhost:4000/customers.json').success(function(data){
      scope.customer = data.customers[0];
    });
  }]);

  app.controller('PanelController', ['$state', function($state){
    this.isSelected = function(checkTab) {
      return $state.current.name.match(checkTab);
    };
  }]);

  app.directive('customerTitle', function(){
    return {
      restrict: 'E',
      templateUrl: 'customer-title.html'
    };
  });

  app.directive('customerPanels', function(){
    return {
      restrict:     'E',
      templateUrl:  'customer-panels.html',
      controller:   'PanelController',
      controllerAs: 'panelCtrl'
    };
  });

  app.directive('customerTabs', function(){
    return {
      restrict: 'E',
      templateUrl: 'customer-tabs.html'
    };
  });
})();
