/**
 * Created by Shivali on 7/7/15.
 */

angular.module("senta-login")
    .controller('LoginController',
        ["$scope", "$window", "$state", '$http', "$cookies", function ($scope, $window, $state, $http, $cookies) {

            $scope.login = function (params) {
                var json = 'WsJson=yes&WsJsonData={"login": {"username": "", "password": ""},' +
                    '"operation": {"object":"XaUser", "event":"XaUserLogin"},' +
                    '"params":[{"name":"email","value":"' + params.username + '"},{"name":"password","value":"' + params.password + '"}]}';

                $http.post("https://demo1.sentadata.com/SentaDCaaS.cgi", json)
                    .success(function (result) {
                        $cookies.put('sentaApp', '12345678910');
//                        $window.sessionStorage.token = "12345678910";
                        $state.transitionTo("overview");
                    })
                    .error(function (error) {
                        $cookies.remove('sentaApp');
//                        delete $window.sessionStorage.token;
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