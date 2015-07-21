/**
 * Created by Shivali on 7/20/15.
 */

angular.module("senta-login")
    .controller('SignUpController',
        ["$scope", "$window", "$state", '$http', function ($scope, $window, $state, $http) {
            $scope.signUp = {};
            $scope.signUpUser = function (params) {
                var json = 'WsJson=yes&WsJsonData={"login": {"username": "demo@sentadata.com", "password": "DDdem0"},"operation": {"object":"XaUser", "event":"XaUserRegistration"},"params":[ {"name":"email","value":"' + $scope.signUp.email + '"},{"name":"password1","value":"' + $scope.signUp.password + '"},{"name":"password2","value":"' + $scope.signUp.confirmPassword + '"} ]}';
                $http.post(" http://demo1.sentadata.com/SentaDCaaS.cgi", json)
                    .success(function (result) {
                        if (result.result === 'success') {
                            $scope.error = {};
                            $state.transitionTo("login");
                        }
                        else if (result.result === 'error') {
                            $scope.signUp = {};
                            $scope.error = {flag: true, message: result.message};
                        }

                    })
                    .error(function (error) {

                    })

            };

            angular.element(document).ready(function () {
                App.init();
            });
        }])