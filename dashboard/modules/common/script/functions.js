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
    var data = {"login": {"username": "", "password": "", token: token}};
    jQuery.extend(data, params);

    return "WsJson=yes&WsJsonData=" + JSON.stringify(data);
}