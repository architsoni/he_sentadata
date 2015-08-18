/**
 * Created by Shivali on 7/7/15.
 */

var panelReloadStart = function (e, id) {
    if (e) {
        e.preventDefault();
        var target = $(e.target).closest('.panel');
    } else if (id) {
        var target = $(id).closest('.panel');
    } else return;

    if (!$(target).hasClass('panel-loading')) {
        var targetBody = $(target).find('.panel-body');
        var spinnerHtml = '<div class="panel-loader"><span class="spinner-small"></span></div>';
        $(target).addClass('panel-loading');
        $(targetBody).prepend(spinnerHtml);
        return target;
    }

}

var panelReloadStop = function (target, id) {
    if (target) {
        $(target).removeClass('panel-loading');
        $(target).find('.panel-loader').remove();
    } else if (id) {
        $(id).closest('.panel').removeClass('panel-loading');
        $(id).closest('.panel').find('.panel-loader').remove();
    }

}
var handleLoginPageChangeBackground = function () {
    $('[data-click="change-bg"]').live('click', function () {
        var targetImage = '[data-id="login-cover-image"]';
        var targetImageSrc = $(this).find('img').attr('src');
        var targetImageHtml = '<img src="' + targetImageSrc + '" data-id="login-cover-image" />';

        $('.login-cover-image').prepend(targetImageHtml);
        $(targetImage).not('[src="' + targetImageSrc + '"]').fadeOut('slow', function () {
            $(this).remove();
        });
        $('[data-click="change-bg"]').closest('li').removeClass('active');
        $(this).closest('li').addClass('active');
    });
};

var prepareTimeSeriesData = function (result, xLabel, yLabel) {
    var data = [];
    for (var i in result) {
        data.push([new Date(result[i][xLabel]).getTime(), Number(result[i][yLabel])]);
    }

    return data;
}


var prepareLineChart = function (result, xLabel, yLabel) {
    var labels = [], data = [];
    for (var i in result) {
        labels[i] = result[i][xLabel];
        data[i] = result[i][yLabel];
    }
    var chart = {
        "labels": labels,
        "datasets": [
            {
                "pointHighlightStroke": "rgba(112,124,170, 0.8)",
                "label": "My First dataset",
                "pointStrokeColor": "rgba(255,255,255,1.0)",
                "fillColor": "rgba(89,156,133, 0.2)",
                "pointColor": "rgba(99,90,115, 0.8)",
                "strokeColor": "rgba(129,111,67, 0.8)",
                "pointHighlightFill": "rgba(255,255,255,1.0)",
                "data": data
            }
        ]
    }
    return chart;
}
function resetChartById(id) {
    var parent = jQuery('#' + id).parent();
    jQuery('#' + id).remove();
    parent.append('<canvas id="' + id + '"><canvas>');
}
function noDataFound(id, className) {
    var parent = jQuery('#' + id).parent();
    jQuery('#' + id).remove();
    parent.append('<div id="' + id + '" class="noDataMsg ' + className + '">Data not found</div>');
}

var createReqJSONWithToken = function (token, params) {
    var data = {"login": {"username": "", "password": "", token: token == false ? "" : token}};
    jQuery.extend(data, params);

    return "WsJson=yes&WsJsonData=" + JSON.stringify(data);
}

var highchartDefination = {
    getTimeSeriesChart: function (id, data, seriesName) {

        $(id).highcharts('StockChart', {
            chart: {
                type: 'line'
            },
            rangeSelector: {
                selected: 1,
                inputBoxHeight: 10
            },
            scrollbar: {
                height: 5
            },
            navigator: {
                height: 20,
                maskFill: 'rgba(222, 240, 240, 0.48)'
            },
            yAxis: {
                gridLineWidth: 0,
                labels: {
                    enabled: false
                }
            },
            title: {
                text: null
            },
            plotOptions: {
                /*area: {
                 fillColor: {
                 linearGradient: {
                 x1: 0,
                 y1: 0,
                 x2: 0,
                 y2: 1
                 },
                 stops: [
                 [0, '#008a8a'],
                 [1, Highcharts.Color('#008a8a').setOpacity(0).get('rgba')]
                 ]
                 },
                 marker: {
                 radius: 2
                 },
                 lineWidth: 1,
                 states: {
                 hover: {
                 lineWidth: 1
                 }
                 },
                 threshold: null
                 }*/
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    name: seriesName,
                    data: data,
                    tooltip: {
                        valueDecimals: 2
                    },
                    color: '#008a8a',
                    dataGrouping: {
                        groupPixelWidth: 40,
                        approximation: "average",
                        enabled: true,
                        units: [
                            [
                                'day',
                                [1]
                            ],
                            [
                                'week',
                                [1]
                            ],
                            [
                                'month',
                                [1, 3, 6]
                            ]
                        ]
                    }
                }
            ]
        });


    }
}
function convertToProperJson(result) {
    var obj = {};
    result = result.replace(/{/g, '');
    result = result.replace(/}/g, '');
    result = result.split(",");
    obj.result = result[0].split(':')[1].replace(/"/g,'');
    obj.message = result[1].substr(11).replace(/""/g,'');

    obj.message=obj.message.substr(0,obj.message.length-2);
    return obj;
}