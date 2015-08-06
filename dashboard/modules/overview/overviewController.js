/**
 * Created by Shivali on 7/7/15.
 */

angular.module("senta-overview")
    .controller('OverviewController', ["$scope", "$rootScope", "OverviewServices", '$cookies', function ($scope, $rootScope, OverviewServices, $cookies) {

        if ($rootScope.notLoginState) {
            $scope.dateRangeType = {"DAY": 'day', "WEEK": 'week', "MONTH": 'month'};

            var handleGenerateGraph = function (animationOption) {
                var animationOption = (animationOption) ? animationOption : false;


                $scope.overViewFn.retrieveActiveUsers(animationOption);
                $scope.overViewFn.retrieveInstallRate(animationOption);
                $scope.overViewFn.retrieveUnInstallRate(animationOption);
                $scope.overViewFn.retrieveWidgetData();
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
                    $scope.activeUser = {dateRangeType: dateRangeType};
                    panelReloadStart(false, "#line-chart");


                    var json = createReqJSONWithToken($cookies.get("token"), {  "operation": {"object": "XaPages", "event": "XaDashboard"}, "params": [
                        {"name": "output", "value": "active_devices"},
                        {"name": "start_day", "value": "2015-01-01"},
                        {"name": "end_day", "value": "2015-07-20"},
                        {"name": "period", "value": dateRangeType }
                    ]});

                    OverviewServices.retrieveOverviewLineChart(json/*{type: 'activeUser', dateRangeType: dateRangeType}*/)
                        .then(function (result) {
                            panelReloadStop(false, "#line-chart");
                            if (result.active_devices.length) {
                                /*var lineChartData = prepareLineChart(result.active_devices, 'date', 'transmissions');
                                 resetChartById("line-chart");
                                 var ctx = document.getElementById("line-chart").getContext('2d');
                                 var lineChart = new Chart(ctx).Line(lineChartData, {
                                 animation: animationOption
                                 });
                                 lineChart.update();*/
                                jQuery('#line-chart').empty();
                                highchartDefination.getTimeSeriesChart("#line-chart", prepareTimeSeriesData(result.active_devices, 'date', 'transmissions'), 'Transmissions');
                            }
                            else {
                                noDataFound("line-chart", 'overview_chart_noData');
                            }

                        }, function (error) {
                            alert(error);
                        })
                },
                retrieveInstallRate: function (animationOption, dateRangeType) {
                    dateRangeType = dateRangeType || $scope.dateRangeType['DAY'];
                    $scope.installRate = {dateRangeType: dateRangeType};
                    panelReloadStart(false, "#line-chart1");

                    var json = createReqJSONWithToken($cookies.get("token"), {  "operation": {"object": "XaPages", "event": "XaDashboard"}, "params": [
                        {"name": "output", "value": "new_devices"},
                        {"name": "start_day", "value": "2015-01-01"},
                        {"name": "end_day", "value": "2015-07-15"},
                        {"name": "period", "value": dateRangeType }
                    ]});

                    OverviewServices.retrieveOverviewLineChart(json)
                        .then(function (result) {
//                        if (result.flag) {
                            panelReloadStop(false, "#line-chart1");
                            if (result.new_devices.length) {
                                /*var lineChartData = prepareLineChart(result.new_devices, 'date', 'devices');
                                 resetChartById("line-chart1");
                                 var ctx = document.getElementById("line-chart1").getContext('2d');
                                 var lineChart = new Chart(ctx).Line(lineChartData, {
                                 animation: animationOption
                                 });*/
                                jQuery('#line-chart1').empty();
                                highchartDefination.getTimeSeriesChart("#line-chart1", prepareTimeSeriesData(result.new_devices, 'date', 'devices'), 'Devices');
                            } else {
                                noDataFound('line-chart1', 'overview_chart_noData');
                            }

//                        }

                        }, function (error) {
                            alert(error);
                        })
                },
                retrieveUnInstallRate: function (animationOption, dateRangeType) {
                    dateRangeType = dateRangeType || $scope.dateRangeType['DAY'];
                    $scope.uninstallRate = {dateRangeType: dateRangeType};
                    panelReloadStart(false, "#line-chart2");

                    var json = createReqJSONWithToken($cookies.get("token"), {  "operation": {"object": "XaPages", "event": "XaDashboard"}, "params": [
                        {"name": "output", "value": "chart1"},
                        {"name": "start_day", "value": "2015-01-01"}
                    ]});

                    OverviewServices.retrieveOverviewLineChart(json)
                        .then(function (result) {
//                        if (result.flag) {
                            panelReloadStop(false, "#line-chart2");
                            if (result.chart1 && result.chart1.length) {
                                /*var lineChartData = prepareLineChart(result.chart1, 'date', 'transmissions');
                                 resetChartById("line-chart2");
                                 var ctx = document.getElementById("line-chart2").getContext('2d');
                                 var lineChart = new Chart(ctx).Line(lineChartData, {
                                 animation: animationOption
                                 });*/
                                jQuery('#line-chart2').empty();
                                highchartDefination.getTimeSeriesChart("#line-chart2", prepareTimeSeriesData(result.chart1, 'date', 'transmissions'), 'Transmissions');
                            } else {
                                noDataFound("line-chart2", 'overview_chart_noData');
                            }

//                        }

                        }, function (error) {
                            alert(error);
                        })
                },
                retrieveWidgetData: function () {

                    var json = createReqJSONWithToken($cookies.get("token"), {  "operation": {"object": "XaPages", "event": "XaDashboard"}, "params": [
                        {"name": "output", "value": "counters"}
                    ]});

                    OverviewServices.retrieveOverviewWidgets(json)
                        .then(function (result) {
//                        if (result.flag) {
                            $scope.widgets = result.counters;
//                        }

                        }, function (error) {
                            alert(error);
                        })
                },
                retrieveNewRegisterDevices: function () {
//                panelReloadStart(false,"#newRegisterDevices");

                    var json = createReqJSONWithToken($cookies.get("token"), {   "operation": {"object": "StParameter", "event": "StParameterStaticReport"}, "params": [
                        {"name": "latest", "value": "10"}
                    ]});

                    OverviewServices.retrieveNewRegisterDevices(json)
                        .then(function (result) {
//                        if (result.flag) {
//                            panelReloadStop(false,"#newRegisterDevices");
                            $scope.nonRegisterDevices = result.devices;

//                        }

                        }, function (error) {
                            alert(error);
                        })
                }
            }

            angular.element(document).ready(function () {
                $scope.overViewFn.startUp();
            });
        }
    }])