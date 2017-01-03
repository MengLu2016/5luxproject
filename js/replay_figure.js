/**
 * Created by XiaoLuLu on 2016/10/19.
 */
$(function(){
    var i = 0;
    $('#figure li').first().clone(true).appendTo($('#figure'));
    $('#button li').first().addClass('active').siblings().removeClass('active');
    function replayR(){
        i++;
        if(i == $('#figure li').size()){
            $('#figure').css('left',0);
            i = 1;
        }
        $('#figure').stop().animate({left:-1440*i});
        if(i == $('#figure li').size()-1){
            $('#button li').first().addClass('active').siblings().removeClass('active');
        }else{
            $('#button li').eq(i).addClass('active').siblings().removeClass('active');
        }
    }
    function replayL(){
        i--;
        if(i == -1){
            $('#figure').css('left',-1440*($('#figure li').size()-1));
            i = $('#figure li').size()-2;
        }
        $('#figure').stop().animate({left:-1440*i});
        if(i == $('#figure li').size()-1){
            $('#button li').first().addClass('active').siblings().removeClass('active');
        }else{
            $('#button li').eq(i).addClass('active').siblings().removeClass('active');
        }
    }
    var timer = setInterval(replayR,2400);
    $('#next').click(function(){
        clearInterval(timer);
        replayR();
        timer = setInterval(replayR,2400);
    })
    $('#last').click(function(){
        clearInterval(timer);
        replayL();
        timer = setInterval(replayR,2400);
    })

    $('#button li').hover(function(){
        clearInterval(timer);
        i = $(this).index();
        $('#figure').stop().animate({left:-1440*i},500,function(){
            timer = setInterval(replayR,2400);
        });
        $(this).addClass('active').siblings().removeClass('active');
    })
})