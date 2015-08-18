/**
 * Created by Shivali on 8/18/15.
 */

/**
 * Created by Shivali on 7/7/15.
 */

angular.module("senta-login")
    .controller('ConfirmController',
        ["$rootScope", "$scope", "$window", "$state", '$http', "$cookies", '$location', function ($rootScope, $scope, $window, $state, $http, $cookies, $location) {


            $scope.errorMsg = {};
            $scope.message={};

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

            function validateUser(params) {
                var json = createReqJSONWithToken(false, {"operation": {"object": "XaUser", "event": "XaUserRegistrationConfirm"},
                    "params": [
                        {"name": "database", "value": params.database},
                        {"name": "email", "value": params.email},
                        {"name": "token", "value": params.token}
                    ]});

                jQuery.ajax({url: "https://demo1.sentadata.com/SentaDCaaS.cgi", data: json, method: "POST"})
                    .success(function (result) {
                        result = convertToProperJson(result);
                        $scope.message = {showConfirm: true};
                        $scope.message.confirmFlag = (result.result == 'success');
                        $scope.message.message = result.message;
                        if(!$scope.$root.$$phase)$scope.$apply();
                    })
                    .error(function (error) {

                    })

            }

            function initParams() {
                var params = $location.$$search;
                if (params.token && params.email && params.database) {
                    $scope.notToShowRegister = true;
                    validateUser(params);
                } else {
                    $state.transitionTo('login');
                }
            }

            angular.element(document).ready(function () {
                $cookies.remove('token');
                App.init();
                handleLoginPageChangeBackground();
                initParams();
            });
        }])