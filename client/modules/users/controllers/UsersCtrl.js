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

	$scope.ROUTES = ROUTES;

	var data = {
		//departmentId: 26103,
		// page: 2,
		// pageSize: 3,
		// orderBy: 'Id',
		// ascending: true,
		// nameQuery: ''
	};


	ApiService.get('Users', data)
		.then(function(response) {
			$scope.users = response.data.items;
		});


	// begin_region private functions

	// end_region private functions
}]);
