/**
 * Created by Shivali on 7/7/15.
 */
angular.module("senta-overview", []);
angular.module("senta-capture", []);
angular.module("senta-login", []);

angular.module('senta-app', ["ui.router", "oc.lazyLoad", 'ngSanitize', "senta-overview", "senta-capture", "senta-login", 'ngCookies'])
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

                    if (response.data.result === 'error' && response.data.message && response.data.message.indexOf('User Not Authorized To Execute Action Or Action Does Not Exist') > -1) {
                        $cookies.remove('token');
                        if ($location.path() === '/signUp')
                            $location.path('/signUp');
                        if ($location.path() === '/confirm')
                            $location.path('/confirm');
                        else
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

            if ((!$cookies.get('token')) && (nextState.name != 'login' && nextState.name != 'signUp' && nextState.name != 'confirm')) {
                $rootScope.notLoginState = false;
                $location.path('/login');
                $state.go('login');
            }
            else if (nextState.name == 'login' || nextState.name == 'signUp' || nextState.name == 'confirm') {

                $rootScope.notLoginState = false;
            }
            else {

                $rootScope.currentUser = {name: $cookies.get('currentUserName')};
                $rootScope.notLoginState = true;
            }

        });
    })


