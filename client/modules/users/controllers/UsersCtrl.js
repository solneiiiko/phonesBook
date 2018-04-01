'use strict';

/**
 * т к сборщик (gulp), то можно использовать переменную с другого файла (app.js)
 * ну и строки, т к будем минимизировать
 */
MainApp.controller('UsersCtrl', [
	'$scope', 
	'$location', 
	'ROUTES',
	'LoginService', 
	'ApiService', 
function MainCtrl($scope, $location, ROUTES, LoginService, ApiService) {
	// TODO тут может пронаследоваться... или что-то сделать без дублирования
	if (!LoginService.isAuth()) {
		$location.path(ROUTES.BASE);
		return;
	}

	var data;

	ApiService.get('Users', data)
		.then(function(response) {
			console.log('res');
			$scope.users = response.data.items;
		});
}]);
