'use strict';

(function(){
	var app = angular.module('controllers', []);

	app.controller('instagramController', function($scope, $http, $state){
		$scope.data = {};

		$http.get('/api/tag').success(function(data){

			if(data == 'Fail') {
				$state.go('home');
			} else {
				console.log(data);
				$scope.data = data;
			}
		});
	});

})();