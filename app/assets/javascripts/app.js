(function(){
  var app = angular.module('mallesti', ['templates', 'ui.router']);
  
	app.config(function($urlRouterProvider, $stateProvider){
	  // Para las urls que no se encuentren, redirigimos a la raíz.
	  $urlRouterProvider.otherwise("/customers");

	  // Aquí establecemos los estados de nuestra applicación. 
	  $stateProvider
	    .state("customers", {
	      url: "/customers",
	      templateUrl: "home.html",
	      controller: "CustomersController",
	      controllerAs: "customersCtrl"
	    })

	    .state("customer", {
	      url: "/customers/:cliente_id",
	      templateUrl: "customer.html",
	      controller: "CustomerController",
	      controllerAs: "customerCtrl"
	    })
	});



  // Controladores
  app.controller('CustomersController', ['$http', function($http){      
   	var scope = this;
   	scope.clientes = [];

   	$http.get('/customers.json')
    .success(function(data){
      scope.clientes = data.customers;
    })
  }]);

  app.controller('CustomerController', ['$http', '$state', function($http, $state){ 
  	var scope = this;
  	scope.cliente = {};

  	$http.get('/customers/' + $state.params.cliente_id + '.json')
  	.success(function(data){
  		scope.cliente = data.customer;
  	 })
	}]);

	// Directivas
	app.directive('customerTable', function(){
	  return {
	    restrict: 'E',
	    templateUrl: 'customer-table.html',
	    controller: 'CustomersController',
    	controllerAs: 'customersCtrl'
	  };
	});
})();

