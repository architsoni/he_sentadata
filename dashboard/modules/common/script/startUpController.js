/**
 * Created by Shivali on 7/7/15.
 */

angular.module('senta-app')
    .controller("StartUpController",
        ["$scope", "$rootScope", "$window", "$state", "$cookies","$http", function ($scope, $rootScope, $window, $state, $cookies,$http) {

            Chart.defaults.global = {
                animation: true,
                animationSteps: 60,
                animationEasing: 'easeOutQuart',
                showScale: true,
                scaleOverride: false,
                scaleSteps: null,
                scaleStepWidth: null,
                scaleStartValue: null,
                scaleLineColor: 'rgba(0,0,0,.1)',
                scaleLineWidth: 1,
                scaleShowLabels: true,
                scaleLabel: '<%=value%>',
                scaleIntegersOnly: true,
                scaleBeginAtZero: false,
                scaleFontFamily: '"Open Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                scaleFontSize: 12,
                scaleFontStyle: 'normal',
                scaleFontColor: '#707478',
                responsive: true,
                maintainAspectRatio: true,
                showTooltips: true,
                customTooltips: false,
                tooltipEvents: ['mousemove', 'touchstart', 'touchmove'],
                tooltipFillColor: 'rgba(0,0,0,0.8)',
                tooltipFontFamily: '"Open Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                tooltipFontSize: 12,
                tooltipFontStyle: 'normal',
                tooltipFontColor: '#ccc',
                tooltipTitleFontFamily: '"Open Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                tooltipTitleFontSize: 12,
                tooltipTitleFontStyle: 'bold',
                tooltipTitleFontColor: '#fff',
                tooltipYPadding: 10,
                tooltipXPadding: 10,
                tooltipCaretSize: 8,
                tooltipCornerRadius: 3,
                tooltipXOffset: 10,
                tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %>',
                multiTooltipTemplate: '<%= value %>',
                onAnimationProgress: function () {
                },
                onAnimationComplete: function () {
                }
            }

            $rootScope.$on('$stateChangeSuccess', function (event, nextState, toParam, currentState) {

                $scope.currentState = nextState;
            });

            $scope.logout = function () {

                var json = createReqJSONWithToken($cookies.get('token'), {"operation": {"object": "XaUser", "event": "XaUserLogout"}});

                $http.post("https://demo1.sentadata.com/SentaDCaaS.cgi", json)
                    .success(function (result) {
                        $cookies.remove('sentaApp');
                        $cookies.remove('token');
                        $state.transitionTo('login');

                    })
                    .error(function (error) {


                    })


            }
        }])