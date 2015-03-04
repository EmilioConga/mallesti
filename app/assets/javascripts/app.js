(function(){
  var app = angular.module('mallesti', []);

  app.controller('CustomersController', function() {
  	this.customers = clientes;

  });

	var clientes = [{
	  name: "Melyna Rau",
	  address: "7220 Jakubowski Freeway",
	  town: "Lake Juliofurt",
	  city: "Hilbertside",
	  country: "Republic of Korea",
	  zip_code: "43650-0519",
	  phone: "1-206-502-0584",
	  cif: "00000001R",
	  email: "user1@email.com"
	}, 
	{
	  name: "Carmelo Coton",
	  address: "7220 Jakubowski Freeway",
	  town: "Lake Juliofurt",
	  city: "Hilbertside",
	  country: "Republic of Korea",
	  zip_code: "43650-0519",
	  phone: "1-206-502-0584",
	  cif: "00000001R",
	  email: "user1@email.com"
	}]

})();

