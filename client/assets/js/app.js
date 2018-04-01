/**
 * Файл с главными настройками
 */
'use strict';

var MainApp = angular
	.module('MainApp', [
		// для роутинга
	    'ngRoute',
	    // для модальных окон
	    'ui.bootstrap',
	]).constant('ROUTES', {
	    BASE: '/',
	    API: 'http://frontendtest.xrm.ru/api/',
	    USERS: '/users'
	}).config(['$routeProvider', function ($routeProvider) {
	    $routeProvider.otherwise({redirectTo: '/'});
	}]);
