MainApp.config([
	'$routeProvider', 
	'ROUTES',
function ($routeProvider, ROUTES) {
	'use strict';

    $routeProvider
        .when(ROUTES.BASE, {
            templateUrl: '../modules/main/views/main.html',
            controller: 'MainCtrl'
        });
}]);
