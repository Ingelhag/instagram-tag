'use strict';

(function(){
	var app = angular.module('controllers', []);

	app.controller('instagramController', function($scope, $http, $state){
		$scope.tab = 1;
		$scope.tag = ''
		$scope.data = {};

		$scope.transition = {
			name: 'none'
		};

		this.setTab = function(tab) {
			$scope.tab = ($scope.tab == tab)?0:tab;
		}

		this.setTag = function(tag) {
			console.log(tag);
			$scope.tag = tag;
			$scope.tab = 0;

			$http.get('/api/tag').success(function(data){

			if(data == 'Fail') {
				$state.go('home');
			} else {
				console.log(data);
				$scope.data = data;
			}
		});
		}
	});

})();