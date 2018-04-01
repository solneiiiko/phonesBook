/**
 * т к сборщик (gulp), то можно использовать переменную с другого файла (app.js)
 * ну и строки, т к будем минимизировать
 */
MainApp.controller('MainCtrl', [
	'$rootScope',
	'$location',
	'ROUTES',
	'LoginService',
function MainCtrl($rootScope, $location, ROUTES, LoginService) {
	'use strict';
	
	this.header = 'Телефонный справочник|PhonesBook';
	this.LoginService = LoginService;


	// будем слушать логины
	$rootScope.$on('onLogin', _onLogin);
	$rootScope.$on('onLogout', _onLogout);

	// begin_region private functions
	function _onLogin() {
		if ($location.path() === ROUTES.BASE) {
			$location.path(ROUTES.USERS);
		}
	}

	function _onLogout() {
		if ($location.path() !== ROUTES.BASE) {
			$location.path(ROUTES.BASE);
		}
	}
	// end_region private functions
}]);
