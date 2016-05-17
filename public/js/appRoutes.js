'use strict';

// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    // Start page
    .state('home', {
      url: '/',
      templateUrl: './views/login.html'
    })

    .state('login', {
      url: '/access',
      templateUrl: './views/',
      controller: 'instagramController',
      controllerAs: 'instagram'
    });

}]);