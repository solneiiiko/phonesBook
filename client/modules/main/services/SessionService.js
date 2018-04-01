/**
 * Сервис для сохранения авторизации. Будет синглтон, чтобы везде знать key для session
 */
MainApp.service('SessionService',
function() {
    'use strict';

	var _key = '';

    this.set = function(session) {
        if (_key) {
            throw 'SessionService.set: Уже есть сессия. Нужно сначала сбросить.';
        }
        if (!session) {
            throw 'SessionService.set: в session ничего нет.';
        }

        _key = session;
    };

    this.get = function() {
        return _key;
    };

    this.remove = function() {
        if (!_key) {
            throw 'SessionService.remove: нечего сбрасывать.';
        }

        _key = '';
    };
});
