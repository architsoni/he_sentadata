/**
 * Created by Shivali on 7/7/15.
 */

angular.module("senta-capture")
    .controller('AppDashboardController', ["$scope", "$rootScope",  function ($scope, $rootScope) {


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


        var randomScalingFactor = function() {
            return Math.round(Math.random()*100)
        };

        var barChartData = {
            labels : ['January','February','March','April','May','June','July'],
            datasets : [
                {
                    fillColor : fillBlackLight,
                    strokeColor : strokeBlack,
                    highlightFill: highlightFillBlack,
                    highlightStroke: highlightStrokeBlack,
                    data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                },
                {
                    fillColor : fillBlueLight,
                    strokeColor : strokeBlue,
                    highlightFill: highlightFillBlue,
                    highlightStroke: highlightStrokeBlue,
                    data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                }
            ]
        };

// var doughnutData = [
//     {
//         value: 300,
//         color: fillGrey,
//         highlight: highlightFillGrey,
//         label: 'Grey'
//     },
//     {
//         value: 50,
//         color: fillGreen,
//         highlight: highlightFillGreen,
//         label: 'Green'
//     },
//     {
//         value: 100,
//         color: fillBlue,
//         highlight: highlightFillBlue,
//         label: 'Blue'
//     },
//     {
//         value: 40,
//         color: fillPurple,
//         highlight: highlightFillPurple,
//         label: 'Purple'
//     },
//     {
//         value: 120,
//         color: fillBlack,
//         highlight: highlightFillBlack,
//         label: 'Black'
//     }
// ];

        var lineChartData = {
            labels : ['January','February','March','April','May','June','July'],
            datasets : [
                {
                    label: 'My First dataset',
                    fillColor : fillBlackLight,
                    strokeColor : strokeBlack,
                    pointColor : strokeBlack,
                    pointStrokeColor : white,
                    pointHighlightFill : white,
                    pointHighlightStroke : strokeBlack,
                    data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                },
                {
                    label: 'My Second dataset',
                    fillColor : 'rgba(52,143,226,0.2)',
                    strokeColor : 'rgba(52,143,226,1)',
                    pointColor : 'rgba(52,143,226,1)',
                    pointStrokeColor : '#fff',
                    pointHighlightFill : '#fff',
                    pointHighlightStroke : 'rgba(52,143,226,1)',
                    data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                }
            ]
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

// var polarData = [
//     {
//         value: 300,
//         color: strokePurple,
//         highlight: highlightStrokePurple,
//         label: 'Purple'
//     },
//     {
//         value: 50,
//         color: strokeBlue,
//         highlight: highlightStrokeBlue,
//         label: 'Blue'
//     },
//     {
//         value: 100,
//         color: strokeGreen,
//         highlight: highlightStrokeGreen,
//         label: 'Green'
//     },
//     {
//         value: 40,
//         color: strokeGrey,
//         highlight: highlightStrokeGrey,
//         label: 'Grey'
//     },
//     {
//         value: 120,
//         color: strokeBlack,
//         highlight: highlightStrokeBlack,
//         label: 'Black'
//     }
// ];

// var radarChartData = {
//     labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
//     datasets: [
//         {
//             label: 'My First dataset',
//             fillColor: 'rgba(45,53,60,0.2)',
//             strokeColor: 'rgba(45,53,60,1)',
//             pointColor: 'rgba(45,53,60,1)',
//             pointStrokeColor: '#fff',
//             pointHighlightFill: '#fff',
//             pointHighlightStroke: 'rgba(45,53,60,1)',
//             data: [65,59,90,81,56,55,40]
//         },
//         {
//             label: 'My Second dataset',
//             fillColor: 'rgba(52,143,226,0.2)',
//             strokeColor: 'rgba(52,143,226,1)',
//             pointColor: 'rgba(52,143,226,1)',
//             pointStrokeColor: '#fff',
//             pointHighlightFill: '#fff',
//             pointHighlightStroke: 'rgba(52,143,226,1)',
//             data: [28,48,40,19,96,27,100]
//         }
//     ]
// };




        var handleGenerateGraph = function(animationOption) {
            var animationOption = (animationOption) ? animationOption : false;

            var ctx = document.getElementById('line-chart').getContext('2d');
            var lineChart = new Chart(ctx).Line(lineChartData, {
                animation: animationOption
            });

            var ctx1 = document.getElementById('line-chart_first').getContext('2d');
            var lineChart = new Chart(ctx1).Line(lineChartData, {
                animation: animationOption
            });



            // var ctx3 = document.getElementById('radar-chart').getContext('2d');
            // var radarChart = new Chart(ctx3).Radar(radarChartData, {
            //     animation: animationOption
            // });

            // var ctx4 = document.getElementById('polar-area-chart').getContext('2d');
            // var polarAreaChart = new Chart(ctx4).PolarArea(polarData, {
            //     animation: animationOption
            // });


            // var ctx6 = document.getElementById('doughnut-chart').getContext('2d');
            // window.myDoughnut = new Chart(ctx6).Doughnut(doughnutData, {
            //     animation: animationOption
            // });
        };


        var handleChartJs = function() {
            $(window).ready(function() {
                handleGenerateGraph(true);
            });
/*
            $(window).resize( function() {
                handleGenerateGraph();
            });*/
        };

        var ChartJs = function () {
            "use strict";
            return {
                //main function
                init: function () {
                    handleChartJs();
                }
            };
        }();


            angular.element(document).ready(function () {
                App.init();
                ChartJs.init();

            });



    }])