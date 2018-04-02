/**
 * Фабрика для формирования запросов к API
 */
MainApp.factory('ApiService', [
    '$http', 
    '$q', 
    'ROUTES', 
    'SessionService', 
function ($http, $q, ROUTES, SessionService) {
    'use strict';

    return {
        get: _get,
        delete: _delete,
        post: _post,
        getMethodUrl: _getMethodUrl
    };

    /**
     * Формирует url для запроса к api.
     *      для get добавит параметры в урл
     * {params} ...
     * returns {String} - урл куда пойдем
     */
    function _getMethodUrl(method, httpMethod, data) {
        var url = ROUTES.API + method;

        //Если сессия есть, то допишем. Если ее нет, то и будем считать, что ее не нужно
        if (SessionService.get()) {
            url += '/' + SessionService.get();  
        }

        if (httpMethod === 'GET') {
            data = data || {};

            url += '?' + Object.keys(data).map(function(key) {
                return [key, encodeURIComponent(data[key])].join('=');
            }).join('&');
        }
        
        return url;
    };

    /**
     * Отправляет запрос
     *     Будем считать, что сообщение об ошибке приходит с сервера или, что итак понятно что именно случилось.
     *     Т о выдавать ошибку будем в одном месте.
     * {params} ...
     * returns {Deferred} - вернет дефер ангуляра, положит в него ответ
     */
    function _request(method, httpMethod, data) {
        var deferred = $q.defer(),
            params;

        params = {
            method: httpMethod,
            url: _getMethodUrl(method, httpMethod, data)
        };

        if (httpMethod !== 'GET') {
            params.data = data;
        }


        $http(angular.extend(params))
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                // TODO нужно понять когда отвалилась авторизация. Да и умеет ли API в 401
                if (response.status === 401) {
                    deferred.reject(response);
                    SessionService.remove();
                } else {
                    //TODO переделать в модное сообщение DialogAlert или что-то такое
                    alert('Упс! Что-то пошло не так...')
                }
            });

        return deferred.promise;
    }

    function _get(method, data) {
        return _request(method, 'GET', data);
    }

    function _delete(method, data) {
        return _request(method, 'DELETE', data);
    }

    function _post(method, data) {
        return _request(method, 'POST', data);
    }

}]);

