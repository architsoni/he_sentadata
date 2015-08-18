/**
 * Created by Shivali on 7/7/15.
 */

angular.module("senta-login")
    .controller('LoginController',
        ["$rootScope", "$scope", "$window", "$state", '$http', "$cookies", '$location', 'ApplicationConstants', function ($rootScope, $scope, $window, $state, $http, $cookies, $location, ApplicationConstants) {


            $scope.errorMsg = {};
            $scope.message = {};


            $scope.login = function (params) {

                var json = createReqJSONWithToken(false, {"operation": {"object": "XaUser", "event": "XaUserLogin"},
                    "params": [
                        {"name": "email", "value": params.username },
                        {"name": "password", "value": params.password }
                    ]});


                $http.post("https://demo1.sentadata.com/SentaDCaaS.cgi", json)
                    .success(function (result) {
                        if (result.result === "success") {
                            $scope.errorMsg = {};
//                            $cookies.put('sentaApp', '12345678910');
                            $cookies.put('token', result.token);
                            $cookies.put('currentUserName', result.message.replace("authenticated", '').trim());
                            //                        $window.sessionStorage.token = "12345678910";
                            $state.transitionTo('overview');
                        } else {
                            $scope.credentials = {};
                            $scope.errorMsg = result;
                            $scope.errorMsg.flag = true;

                        }

                    })
                    .error(function (error) {
                        $cookies.remove('sentaApp');
                    })
            };

            function initParams() {

                if (ApplicationConstants.defaultDomain == $window.location.host) {
                    $scope.notToShowRegister = false;
                } else {
                    $scope.notToShowRegister = true;
                }
            }

            angular.element(document).ready(function () {
                $cookies.remove('token');
                App.init();
                handleLoginPageChangeBackground();
                initParams();
            });
        }])