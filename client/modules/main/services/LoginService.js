/**
 * Сервис для авторизации.
 *   Тут будем логиниться и разлогиниваться
 */
MainApp.service('LoginService', [
    '$rootScope',
    'ROUTES',
    'ApiService',
    'SessionService',
function(
    $rootScope,
    ROUTES,
    ApiService,
    SessionService
) {
    'use strict';
    
    // по хорошему, нужно сообщения вынести в отдельный файл, чтобы можно было изменять локализацию.
    this.defaultError = 'Ошибка авторизации';

    /**
     * Метод установки авторизации
     */
    this.login = function() {
        ApiService.post('Sessions')
            .then(function(response) {
                SessionService.set(response.data);
                // прокинем, что все ок. Конечно, это никто не слушает, но все равно
                $rootScope.$emit('onLogin');
            });            
    };

    /**
     * Метод сброса авторизации
     */
    this.logout = function() {
        SessionService.remove();
        // прокинем, что разлогинен. Конечно, это никто не слушает, но все равно
        $rootScope.$emit('onLogout');
    };

    /**
     * Функция проверки флага авторизации
     * returns {Boolean} true - авторизован
     */
    this.isAuth = function() {
        return Boolean(SessionService.get());
    }
}]);
