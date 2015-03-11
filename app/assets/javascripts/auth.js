(function() {
  var app = angular.module('mallesti-auth', ['LocalStorageModule', 'ui.router']);

  // Controllers
  app.controller(
    "LoginController",
    ['$http', '$state', 'AuthService', function($http, $state, AuthService){
      var scope = this;
      scope.session = {};
      scope.error = false;

      scope.login = function() {
        $http.post(
          "/session.json",
          {email: scope.session.email, password: scope.session.password}
        )
          .success(function(data) {
            AuthService.saveUser(data.user);
            $state.go("main.customers");
          })
          .error(function(data) {
            scope.session = {};
            scope.error = true;
          })
      };

      scope.logout = function() {
        AuthService.destroyUser();
        $state.go("login");
      };
    }]
  );

  // Factories
  app.factory("AuthService", ['localStorageService', function(localStorageService) {
    var currentUser = localStorageService.get("user");
    return {
      currentUser: function() {
        return currentUser;
      },
      saveUser: function(user) {
        localStorageService.set("user", user);
        currentUser = user;
      },
      destroyUser: function() {
        localStorageService.set("user", null);
        currentUser = null;
      },
      currentUserEmail: function() {
        if (currentUser) {
          return currentUser.email;
        }
        else {
          return null;
        }
      },
      currentUserToken: function() {
        if (currentUser)
          return currentUser.authentication_token;
        else
          return null;
      }
    };
  }]);
})();