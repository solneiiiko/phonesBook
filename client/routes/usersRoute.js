MainApp.config([
	'$routeProvider',
	'ROUTES',
function ($routeProvider, ROUTES) {
	'use strict';

    $routeProvider
        .when(ROUTES.USERS, {
            templateUrl: '../modules/users/views/users.html',
            controller: 'UsersCtrl'
        });
        // TODO как поставить условие на роутинг??
}]);
