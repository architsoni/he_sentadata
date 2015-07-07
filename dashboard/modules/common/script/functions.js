/**
 * Created by Shivali on 7/7/15.
 */

var panelReloadStart=function(e,id){
    if(e){
        e.preventDefault();
        var target = $(e.target).closest('.panel');
    }else if(id){
        var target = $(id).closest('.panel');
    }else return;

    if (!$(target).hasClass('panel-loading')) {
        var targetBody = $(target).find('.panel-body');
        var spinnerHtml = '<div class="panel-loader"><span class="spinner-small"></span></div>';
        $(target).addClass('panel-loading');
        $(targetBody).prepend(spinnerHtml);
        return target;
    }

}

var panelReloadStop=function(target,id){
    if(target){
        $(target).removeClass('panel-loading');
        $(target).find('.panel-loader').remove();
    }else if(id){
        $(id).closest('.panel').removeClass('panel-loading');
        $(id).closest('.panel').find('.panel-loader').remove();
    }

}
var handleLoginPageChangeBackground = function() {
    $('[data-click="change-bg"]').live('click', function() {
        var targetImage = '[data-id="login-cover-image"]';
        var targetImageSrc = $(this).find('img').attr('src');
        var targetImageHtml = '<img src="'+ targetImageSrc +'" data-id="login-cover-image" />';

        $('.login-cover-image').prepend(targetImageHtml);
        $(targetImage).not('[src="'+ targetImageSrc +'"]').fadeOut('slow', function() {
            $(this).remove();
        });
        $('[data-click="change-bg"]').closest('li').removeClass('active');
        $(this).closest('li').addClass('active');
    });
};