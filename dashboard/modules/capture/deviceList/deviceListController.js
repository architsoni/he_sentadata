/**
 * Created by Shivali on 7/7/15.
 */

angular.module("senta-overview")
    .controller('OverviewController', ["$scope", "$rootScope", "OverviewServices", function ($scope, $rootScope, OverviewServices) {

        // white
        var white = 'rgba(255,255,255,1.0)';
        var fillBlack = 'rgba(45, 53, 60, 0.6)';
        var fillBlackLight = 'rgba(45, 53, 60, 0.2)';
        var strokeBlack = 'rgba(45, 53, 60, 0.8)';
        var highlightFillBlack = 'rgba(45, 53, 60, 0.8)';
        var highlightStrokeBlack = 'rgba(45, 53, 60, 1)';

// blue
        var fillBlue = 'rgba(52, 143, 226, 0.6)';
        var fillBlueLight = 'rgba(52, 143, 226, 0.2)';
        var strokeBlue = 'rgba(52, 143, 226, 0.8)';
        var highlightFillBlue = 'rgba(52, 143, 226, 0.8)';
        var highlightStrokeBlue = 'rgba(52, 143, 226, 1)';

        // grey
        var fillGrey = 'rgba(182, 194, 201, 0.6)';
        var fillGreyLight = 'rgba(182, 194, 201, 0.2)';
        var strokeGrey = 'rgba(182, 194, 201, 0.8)';
        var highlightFillGrey = 'rgba(182, 194, 201, 0.8)';
        var highlightStrokeGrey = 'rgba(182, 194, 201, 1)';

// green
        var fillGreen = 'rgba(0, 172, 172, 0.6)';
        var fillGreenLight = 'rgba(0, 172, 172, 0.2)';
        var strokeGreen = 'rgba(0, 172, 172, 0.8)';
        var highlightFillGreen = 'rgba(0, 172, 172, 0.8)';
        var highlightStrokeGreen = 'rgba(0, 172, 172, 1)';

// purple
        var fillPurple = 'rgba(114, 124, 182, 0.6)';
        var fillPurpleLight = 'rgba(114, 124, 182, 0.2)';
        var strokePurple = 'rgba(114, 124, 182, 0.8)';
        var highlightFillPurple = 'rgba(114, 124, 182, 0.8)';
        var highlightStrokePurple = 'rgba(114, 124, 182, 1)';


        var randomScalingFactor = function () {
            return Math.round(Math.random() * 100)
        };

        var pieData = [
            {
                value: 300,
                color: strokePurple,
                highlight: highlightStrokePurple,
                label: 'Purple'
            },
            {
                value: 50,
                color: strokeBlue,
                highlight: highlightStrokeBlue,
                label: 'Blue'
            },
            {
                value: 100,
                color: strokeGreen,
                highlight: highlightStrokeGreen,
                label: 'Green'
            },
            {
                value: 40,
                color: strokeGrey,
                highlight: highlightStrokeGrey,
                label: 'Grey'
            },
            {
                value: 120,
                color: strokeBlack,
                highlight: highlightStrokeBlack,
                label: 'Black'
            }
        ];


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


        var handleGenerateGraph = function (animationOption) {
            var animationOption = (animationOption) ? animationOption : false;


            $scope.overViewFn.retrieveActiveUsers('line-chart', animationOption);
            $scope.overViewFn.retrieveInstallRate('line-chart1', animationOption);
            $scope.overViewFn.retrieveUnInstallRate('line-chart2', animationOption);
            $scope.overViewFn.retrieveRegisterDevice();
            $scope.overViewFn.retrieveDeRegisterDevice();
            $scope.overViewFn.retrieveTransimissions();
            $scope.overViewFn.retrieveParameters();
            $scope.overViewFn.retrieveNonRegisterDevices();
        };


        var handleChartJs = function () {
            $(window).load(function () {
                handleGenerateGraph(true);
            });

            $(window).resize(function () {
                handleGenerateGraph();
            });
        };

        var ChartJs = function () {
            "use strict";
            return {
                //main function
                init: function () {
//                    handleChartJs();
                    handleGenerateGraph(true);
                }
            };
        }();

        $scope.overViewFn = {
            startUp: function () {
                $scope.widgets = {};
                App.init();
                ChartJs.init();
            },
            retrieveActiveUsers: function (elemId, animationOption) {
                OverviewServices.retrieveActiveUsers()
                    .then(function (result) {
                        if (result.flag) {
                            var ctx = document.getElementById(elemId).getContext('2d');
                            var lineChart = new Chart(ctx).Line(result.data, {
                                animation: animationOption
                            });
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveInstallRate: function (elemId, animationOption) {
                OverviewServices.retrieveInstallRate()
                    .then(function (result) {
                        if (result.flag) {
                            var ctx = document.getElementById(elemId).getContext('2d');
                            var lineChart = new Chart(ctx).Line(result.data, {
                                animation: animationOption
                            });
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveUnInstallRate: function (elemId, animationOption) {
                OverviewServices.retrieveUnInstallRate()
                    .then(function (result) {
                        if (result.flag) {
                            var ctx = document.getElementById(elemId).getContext('2d');
                            var lineChart = new Chart(ctx).Line(result.data, {
                                animation: animationOption
                            });
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveRegisterDevice: function () {
                OverviewServices.retrieveRegisterDevice()
                    .then(function (result) {
                        if (result.flag) {
                            $scope.widgets.registerDevices = result.data.value;
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveDeRegisterDevice: function () {
                OverviewServices.retrieveDeRegisterDevice()
                    .then(function (result) {
                        if (result.flag) {
                            $scope.widgets.deRegisterDevices = result.data.value;
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveTransimissions: function () {
                OverviewServices.retrieveTransimissions()
                    .then(function (result) {
                        if (result.flag) {
                            $scope.widgets.transmissions = result.data.value;
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveParameters: function () {
                OverviewServices.retrieveParameters()
                    .then(function (result) {
                        if (result.flag) {
                            $scope.widgets.paramters = result.data.value;
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveNonRegisterDevices: function () {
                OverviewServices.retrieveNonRegisterDevices()
                    .then(function (result) {
                        if (result.flag) {
                            $scope.nonRegisterDevices = result.data;
                        }

                    }, function (error) {
                        alert(error);
                    })
            }
        }

        angular.element(document).ready(function () {
            $scope.overViewFn.startUp();
        });
    }])