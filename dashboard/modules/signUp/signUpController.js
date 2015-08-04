/**
 * Created by Shivali on 7/20/15.
 */

angular.module("senta-login")
    .controller('SignUpController',
        ["$rootScope", "$scope", "$cookies", "$state", '$http', function ($rootScope, $scope, $cookies, $state, $http) {
            $scope.signUp = {};
            var token='';

            if (!$rootScope.notLoginState) {
                var loginJson = {"login": {"username": "", "password": ""}, "operation": {"object": "XaUser", "event": "XaUserLoginFrm"}, "params": [
                    {"name": "email", "value": "demo@sentadata.com"},
                    {"name": "password", "value": "DDdem0"}
                ]};

                $http.post("https://demo1.sentadata.com/SentaDCaaS.cgi", "WsJson=yes&WsJsonData=" + JSON.stringify(loginJson))
                    .then(function (result) {
                        if (result.data && result.data.message === "login form")
                            token=result.data.token;
                    }, function (error) {
                        if (error.data && error.data.message === "login form")
                            token=error.data.token;
                    });
            }


            $scope.signUpUser = function (params) {
                var json = createReqJSONWithToken(token, {"operation": {"object": "XaUser", "event": "XaUserRegistration"}, "params": [
                    {"name": "email", "value": $scope.signUp.email },
                    {"name": "password1", "value": $scope.signUp.password },
                    {"name": "password2", "value": $scope.signUp.confirmPassword }
                ]});
                $http.post(" http://demo1.sentadata.com/SentaDCaaS.cgi", json)
                    .success(function (result) {
                        if (result.result === 'success') {
                            $scope.message = {flag: true};
//                            $state.transitionTo("login");
                        }
                        else if (result.result === 'error') {
                            $scope.signUp = {};
                            $scope.message = {flag: false,message:result.message};
                        }

                    })
                    .error(function (error) {

                    })

            };

            angular.element(document).ready(function () {
                App.init();
            });
        }])