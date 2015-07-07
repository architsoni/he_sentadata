/**
 * Created by Shivali on 7/7/15.
 */

angular.module("senta-login")
    .controller('LoginController',
        ["$scope","$window","$state", function ($scope,$window,$state) {
            $scope.login = function (params) {
                if (params.username == 'senta' && params.password == 'senta') {
                    $window.sessionStorage.token = "12345678910";
                    $state.transitionTo("overview");
                } else {

                    delete $window.sessionStorage.token;
                }
            };

            angular.element(document).ready(function () {
                App.init();
                handleLoginPageChangeBackground();
            });
        }])