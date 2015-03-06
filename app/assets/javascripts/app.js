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
   	// variable para el formulario
   	scope.nuevoCliente= {};
   	//variable para los errores
   	scope.errors = {};


   	$http.get('/customers.json')
	  .success(function(data){
	      scope.clientes = data.customers;
	  })

   	scope.addCustomer = function() {
    	
		// Creamos un cliente nuevo en la base de datos. El verbo para crear es POST y la URL /customer.json. Ahora tengo que pasarle los datos del formulario... y lo hago con {customer: scope.nuevoCliente})
		$http.post('/customers.json', {customer: scope.nuevoCliente}) 
				// Solo se llama si se crea correctamente
			  .success(function(data){
			  	// En este array de clientes, meto el que acabo de crear
			  	scope.clientes.push(data.customer);
    			scope.nuevoCliente= {};
			   })
				
				// Solo se llama si ha ocurrido un error y no se ha creado
			  .error(function(data) {
			       scope.errors = data.errors
			  })


  	};



    // Funcion que recibe un cliente y lo borra
    scope.removeCustomer = function(cliente) {
     if (confirm("¿Estas seguro de borrar este cliente " + cliente.name + "?")) {

    	$http.delete('/customers/' + cliente.id + '.json')
    	 .success(function(){
    	 	// Busco el indice del array que contiene el objeto "cliente"
    		var index = scope.clientes.indexOf(cliente);
    		// Borra la posicion index del array
    		scope.clientes.splice(index, 1);
    	})
    	}
    };	 
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

	app.directive('customerForm', function(){
	  return {
	    restrict: 'E',
	    templateUrl: 'customer-form.html',
	    controller: 'CustomersController',
    	controllerAs: 'customersCtrl'
	  };
	});
})();

