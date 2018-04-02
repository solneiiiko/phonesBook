/**
 * Сервис для сохранения авторизации. Будет синглтон, чтобы везде знать key для session
 */
MainApp.service('SessionService',
function() {
    'use strict';

	var _key = 'c318cdce-8564-4bfb-9c43-ee6b1391e1c4';//'';

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
