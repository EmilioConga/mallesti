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
   	//variable para pintar la tabla
   	scope.clientes = [];
   	// variable para el formulario
   	scope.formularioCliente= {};
   	//variable para los errores
   	scope.errors = {};


   	$http.get('/customers.json')
	  .success(function(data){
	      scope.clientes = data.customers;
	    })

   		scope.guardarCliente = function() {
    	
		// Creamos un cliente nuevo en la base de datos. El verbo para crear es POST y la URL /customer.json. Ahora tengo que pasarle los datos del formulario... y lo hago con {customer: scope.formularioCliente})
		$http.post('/customers.json', {customer: scope.formularioCliente}) 
				// Solo se llama si se crea correctamente
			  .success(function(data){
			  	// En este array de clientes, meto el que acabo de crear
			  	scope.clientes.push(data.customer);
    			scope.formularioCliente= {};  
    			scope.errors = {};
            
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

  app.controller('CustomerController', ['$http', '$state', '$timeout', function($http, $state, $timeout){ 
  	var scope = this;
  	scope.cliente = {};
  	scope.formularioCliente = {};
  	scope.showForm = false;
  	scope.errors = {};
  	scope.alerta = false

  	$http.get('/customers/' + $state.params.cliente_id + '.json')
    .success(function(data){
      scope.cliente = data.customer;
      angular.copy(data.customer, scope.formularioCliente);
     })

  	scope.toggleForm = function() {
  		scope.showForm = !scope.showForm;
   };

    scope.guardarCliente = function() {
      $http.put("/customers/" + scope.cliente.id + ".json", {customer: scope.formularioCliente})
        .success(function() {
          // Modificamos el cliente con los datos del formulario
          angular.copy(scope.formularioCliente, scope.cliente);
          // Ponemos error a vacío para que no salga en rojo de nuevo
          scope.errors = {};
          // Ocultamos el formulario
          scope.showForm = false;
          // Mostramos una alerta ala usuario
          scope.alerta = true;
          // La alerta se oculta después de 3 segundos
          $timeout(function(){scope.alerta = false;}, 3000);
        })
        .error(function(data) {
          scope.errors = data.errors;
        });
  	};
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
	    scope: {
        ctrl: "="
      }
	  };
	});
})();

