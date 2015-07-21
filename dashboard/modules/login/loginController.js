/**
 * Created by Shivali on 7/7/15.
 */

angular.module("senta-login")
    .controller('LoginController',
        ["$scope", "$window", "$state", '$http', function ($scope, $window, $state, $http) {

            $scope.login = function (params) {

                $http.get("https://demo1.sentadata.com/SentaDCaaS.cgi?obj=XaUser&evt=XaUserLogin&email=" + params.username + "&password=" + params.password)
                    .success(function (result) {
                        $window.sessionStorage.token = "12345678910";
                        $state.transitionTo("overview");
                    })
                    .error(function (error) {
                        delete $window.sessionStorage.token;
                    })

                /*if (params.username == 'senta' && params.password == 'senta') {

                 } else {


                 }*/
            };

            angular.element(document).ready(function () {
                App.init();
                handleLoginPageChangeBackground();
            });
        }])