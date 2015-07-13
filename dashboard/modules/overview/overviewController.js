/**
 * Created by Shivali on 7/7/15.
 */

angular.module("senta-overview")
    .controller('OverviewController', ["$scope", "$rootScope", "OverviewServices", function ($scope, $rootScope, OverviewServices) {

        $scope.dateRangeType = {"DAY": 1, "WEEK": 2, "MONTH": 3};

        var handleGenerateGraph = function (animationOption) {
            var animationOption = (animationOption) ? animationOption : false;


            $scope.overViewFn.retrieveActiveUsers('line-chart', animationOption);
            $scope.overViewFn.retrieveInstallRate('line-chart1', animationOption);
            $scope.overViewFn.retrieveUnInstallRate('line-chart2', animationOption);
            $scope.overViewFn.retrieveRegisterDevice();
            $scope.overViewFn.retrieveDeRegisterDevice();
            $scope.overViewFn.retrieveTransimissions();
            $scope.overViewFn.retrieveParameters();
            $scope.overViewFn.retrieveNewRegisterDevices();
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
            retrieveActiveUsers: function (animationOption, dateRangeType) {
                dateRangeType = dateRangeType || $scope.dateRangeType['DAY'];
                $scope.activeUser={dateRangeType:dateRangeType};
                panelReloadStart(false,"#line-chart");

                OverviewServices.retrieveOverviewLineChart({type: 'activeUser', dateRangeType: dateRangeType})
                    .then(function (result) {
                        if (result.flag) {

                            panelReloadStop(false,"#line-chart");

                            var ctx = document.getElementById("line-chart").getContext('2d');
                            var lineChart = new Chart(ctx).Line(result.data, {
                                animation: animationOption
                            });
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveInstallRate: function (animationOption, dateRangeType) {
                dateRangeType = dateRangeType || $scope.dateRangeType['DAY'];
                $scope.installRate={dateRangeType:dateRangeType};
                panelReloadStart(false,"#line-chart1");
                OverviewServices.retrieveOverviewLineChart({type: 'installRate', dateRangeType: dateRangeType})
                    .then(function (result) {
                        if (result.flag) {

                            panelReloadStop(false,"#line-chart1");
                            var ctx = document.getElementById("line-chart1").getContext('2d');
                            var lineChart = new Chart(ctx).Line(result.data, {
                                animation: animationOption
                            });
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveUnInstallRate: function (animationOption, dateRangeType) {
                dateRangeType = dateRangeType || $scope.dateRangeType['DAY'];
                $scope.uninstallRate={dateRangeType:dateRangeType};
                panelReloadStart(false,"#line-chart2");
                OverviewServices.retrieveOverviewLineChart({type: 'unInstallRate', dateRangeType: dateRangeType})
                    .then(function (result) {
                        if (result.flag) {

                            panelReloadStop(false,"#line-chart2");

                            var ctx = document.getElementById("line-chart2").getContext('2d');
                            var lineChart = new Chart(ctx).Line(result.data, {
                                animation: animationOption
                            });
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveRegisterDevice: function () {
                OverviewServices.retrieveOverviewWidgets({type: 'registerDevice'})
                    .then(function (result) {
                        if (result.flag) {
                            $scope.widgets.registerDevices = result.data.value;
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveDeRegisterDevice: function () {
                OverviewServices.retrieveOverviewWidgets({type: 'unRegisterDevice'})
                    .then(function (result) {
                        if (result.flag) {
                            $scope.widgets.deRegisterDevices = result.data.value;
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveTransimissions: function () {
                OverviewServices.retrieveOverviewWidgets({type: 'transmissions'})
                    .then(function (result) {
                        if (result.flag) {
                            $scope.widgets.transmissions = result.data.value;
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveParameters: function () {
                OverviewServices.retrieveOverviewWidgets({type: 'parameters'})
                    .then(function (result) {
                        if (result.flag) {
                            $scope.widgets.paramters = result.data.value;
                        }

                    }, function (error) {
                        alert(error);
                    })
            },
            retrieveNewRegisterDevices: function () {
//                panelReloadStart(false,"#newRegisterDevices");
                OverviewServices.retrieveNewRegisterDevices()
                    .then(function (result) {
                        if (result.flag) {
//                            panelReloadStop(false,"#newRegisterDevices");
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