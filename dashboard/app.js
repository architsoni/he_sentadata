/**
 * Created by Shivali on 7/7/15.
 */
angular.module("senta-overview", []);
angular.module("senta-capture", []);
angular.module("senta-login", []);

angular.module('senta-app', ["ui.router", "oc.lazyLoad", "senta-overview", "senta-capture", "senta-login"])
    /*.factory('authInterceptor',function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {

                }
                return response || $q.when(response);
            }
        };
    }).config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })*/
    .run(function ($rootScope, $state, $window, $location) {

        $rootScope.$on('$stateChangeStart', function (event, nextState, toParam, currentState) {
            if (!$window.sessionStorage.token  && nextState.name != 'login') {
                $rootScope.notLoginState = false;
                $location.path('/login')
            } else if (nextState.name == 'login') {
                $rootScope.notLoginState = false;
            } else {
                $rootScope.notLoginState = true;
            }

        });
    })


