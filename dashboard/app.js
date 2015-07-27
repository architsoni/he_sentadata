/**
 * Created by Shivali on 7/7/15.
 */
angular.module("senta-overview", []);
angular.module("senta-capture", []);
angular.module("senta-login", []);

angular.module('senta-app', ["ui.router", "oc.lazyLoad", "senta-overview", "senta-capture", "senta-login", 'ngCookies'])
    .factory('authHttpInterceptor',
        ['$cookies', '$location', '$q' , function ($cookies, $location, $q) {
            return {
                request: function ($config) {
                    if ($cookies.get('sentaApp')) {
//                        $config.headers['sentaApp'] = $cookies.get('sentaApp');
                    }

                    return $config;
                },
                response: function (response) {

                    if (response.data.message == 'login form') {
                        $cookies.remove('token');
                        $cookies.remove('sentaApp');
                        $location.path('/login');
                        return $q.reject(response);
                    }
                    return response;
                }
            };
        }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authHttpInterceptor');
    }])
    .run(function ($rootScope, $state, $cookies, $location) {
        $rootScope.notLoginState = false;
        $rootScope.$on('$stateChangeStart', function (event, nextState, toParam, currentState) {

            if ((!$cookies.get('sentaApp') || !$cookies.get('token')) && (nextState.name != 'login' && nextState.name != 'signUp')) {
                $rootScope.notLoginState = false;
//                event.preventDefault();
//                $state.go('login');
                $location.path('/login');
            }
            else if (nextState.name == 'login' || nextState.name == 'signUp') {
//                event.preventDefault();
                $rootScope.notLoginState = false;
            }
            else {
//                event.preventDefault();
                $rootScope.notLoginState = true;
            }

        });
    })


