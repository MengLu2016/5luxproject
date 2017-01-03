$(function () {

    var usersList= $.cookie("users") ? JSON.parse($.cookie("users")) : null;
    var lastUser = usersList ? usersList[usersList.length-1].phone : '';
    if(lastUser){
        $('.login').find('span').text(lastUser);
        $('.register').find('a').text('退出');
        $('.register').find('a').attr('href','login.html');
        $('.register').find('span').hide();
    }

    function reloadGoods() {
        var Goods = $.cookie("good")?JSON.parse($.cookie("good")):[];
        var ttlprice = 0;
        var ttlgoodsnum = 0;
        if(Goods.length > 0){
            $('.cart dd p').hide();
            $('.bag_img').hide().next('p').hide().next('p').hide();
            $('.cart_middle').css('marginTop','20px');
            $.each(Goods,function (index,ele) {
                //顶部购物袋
                var liNode=$("<li/>");
                var imgNode=$("<img>");
                liNode.appendTo($(".cart").find("ul"));
                imgNode.attr("src",ele.img).appendTo(liNode);
                $("<p><span>"+ele.info+"</span>&nbsp;&nbsp;&nbsp;&nbsp;￥ "+ele.price+" &nbsp;&nbsp;x "+ele.num+"件</p>").appendTo(liNode);

                    //计算总价
                    ttlprice += ele.price * ele.num;
                    ttlgoodsnum += ele.num;
                $('.cart dt span').text(ttlgoodsnum);
            });

            $.each(Goods,function (index,ele) {
                //右侧栏购物袋
                var LiNode=$("<li/>");
                var ImgNode=$("<img>");
                LiNode.appendTo($(".cart_middle").find("ul"));
                ImgNode.attr("src",ele.img).appendTo(LiNode);
                $("<p><span>"+ele.info+"</span>&nbsp;&nbsp;&nbsp;&nbsp;￥ "+ele.price+" &nbsp;&nbsp;x "+ele.num+"件</p>").appendTo(LiNode);
            })
        }else{
            $('.cart dd p').show();
            $('.bag_img').show().next('p').show().next('p').show();
            $('.cart_middle').css('marginTop','165px');
        }
    }
        reloadGoods();

//***************************获取json数据******************************//
    //加载三级菜单信息//
    $.get('json/index_nav.json',function (data) {
        for(var i = 0; i < 14; i++){
            var array = [-36,-68,-100,-132,-165,-196,-228,-261,-294,-326,-357,-390,-422,-458];
            $('.first_category:first').clone(true).appendTo($('.first_list'));
            $('.secondary').eq(i+1).css({'background-position':'-3px '+array[i]+'px'}).find('span').css('color','#000');
        }
        $.each(data,function (index1,ele) {
            $('.secondary span').eq(index1).text(ele.name);
            $.each(ele.category,function (index2,ele) {
                if (index2 >= 1){
                    $('.first_category').eq(index1).find('.showshop').first().clone(true).find('.showbag').empty('a').end().insertBefore($('.first_category').eq(index1).find('.showindex'));
                }
                $('.first_category').eq(index1).find('.showshop h2 a').eq(index2).text(ele.name);
                $.each(ele.brandList,function (index3,ele) {
                    $('<a href="#"></a>').appendTo($('.first_category').eq(index1).find('.showbag').eq(index2));
                    $('.first_category').eq(index1).find('.showbag').eq(index2).find('a').eq(index3).text(ele.name);
                })
            });
            $.each(ele.more,function (index4,ele) {
                if (index4 >= 1) {
                    $('.first_category').eq(index1).find('.showindex a').first().clone(true).appendTo($('.first_category').eq(index1).find('.showindex'));
                }
                $('.first_category').eq(index1).find('.showindex a').eq(index4).text(ele.name);
            })
        })
    });

    //三级菜单动画
    $('#menu_List').hover(function () {
        $('.first').show();
        $('#cover').show();
    },function () {
        $('#cover').hide();
        $('.first').hide();
    });
    $('.first_category').hover(function () {
        $(this).find('.secondary').css('opacity','1').find('i').show().siblings('span').css('color','#c69c6d');
        if($(this).index() <= 7){
            $(this).find('.menu_show').show().css('top',-36*$(this).index()+"px");
        }else{
            $(this).find('.menu_show').show().css('top',-80);
        }
    },function () {
        $(this).find('.secondary').css('opacity','0.85').find('i').hide().siblings('span').css('color','#000');
        $('.secondary:first').find('span').css('color','#c69c6d');
        $(this).find('.menu_show').hide();
    });

    //加载品牌旗舰信息//
    $.get("json/flagship_brand.json", function (data) {
        $.each(data,function (index,ele) {
            if(index < 4){
                $('.brand_list li:first').clone(true).appendTo($('.brand_list'));
            }
            $('.brand_list li a > img').eq(index).attr('src',ele.bpsrc);
            $('.brand_list_hidebox > img').eq(index).attr('src',ele.spsrc);
            $('.brand_ename').eq(index).text(ele.ename);
            $('.brand_cname').eq(index).text(ele.cname);
            $('.brand_list li:nth-child(5)').addClass('margin_right0');
        })
    });

    //加载热门旗舰店信息//
    $.get("json/hotstore.json",function (data) {
        $.each(data,function (index,ele) {
            if(index < 13){
                $('.flag_store_firststore:first').clone(true).appendTo($('.flag_store_first'));
            }else if(index == 13 || index == 27){
                $('.flag_store_first:first').clone(true).appendTo($('.flag_store_box'));
            }
            $('.flag_store_firststore > img').eq(index).attr('src',ele.src);
            $('.flag_store_text').eq(index).text(ele.brandname);
        })
    });

    //加载商场同款信息//**************待完善
// $.get("json/hotsale.json",function (data) {
//     $.each(data,function (index,ele) {
//         $('.hotsale_info p').eq(0).text(ele.ename);
//     })
// })
    //加载购物中心信息//
    $.get("json/shopping_mall.json",function (data) {
        $.each(data,function (index,ele) {
            //标题栏中文名
            $.each(ele.cname,function (index,ele) {
                if(index < 4){
                    $('.shopcenter li:first').clone(true).appendTo($('.shopcenter'));
                }
                $('.shopcenter_boxtop').eq(index).text(ele.name);
            });
            //购物中心标题//
            $.each(ele.title,function (index,ele) {
                //复制购物中心下的4个大模块
                if(index < 4){
                    $('.goods_title:first').clone(true).insertAfter($('.goods').last());
                    $('.goods').first().clone(true).insertAfter($('.goods_title').last());
                }
                $('.goods_title img').eq(index).prop('src',ele.src);
            });
            //标题栏英文名
            $.each(ele.ename,function (index,ele) {
                $('.shopcenter_box_brandname').eq(index).text(ele.name);
            });
            //左侧物品清单
            $.each(ele.list,function (index,ele) {
                $('.goodslist li a').eq(index).text(ele.name);
            });
            //左侧小图片
            $.each(ele.pic,function (index,ele) {
                $('.goods_sliderbox img').eq(index).prop("src",ele.src);
            });
            //goods2图片
            $.each(ele.goods2pic,function (index,ele) {
                $('.goods2 img').eq(index).prop('src',ele.src);
            });
            //goods3图片
            $.each(ele.goods3pic,function (index,ele) {
                $('.goods3 img').eq(index).prop('src',ele.src);
            });
            //goods2文字
            $.each(ele.text,function (index,ele) {
                $('.goods2_info dd').eq(index).html(ele.name);
            });
            //goods2文字标题
            $.each(ele.texttitle,function (index,ele) {
                $('.goods2_info dt').eq(index).text(ele.name);
            })
        });


        //小轮播图相关
        for(var clonei = 0; clonei < 5; clonei++){
            $('.goods_sliderbox li:first-child').eq(clonei).clone(true).appendTo($('.goods_sliderbox').eq(clonei));
        }
    });


    //***************************动画效果集合******************************//

    //==========================头部动画效果============================
        //头部最顶端标签hover效果
    $('#headerNav1210 div:not(:eq(1))').hover(function () {
        $(this).css('color','#c69c6d');
    },function () {
        $(this).css('color','#666');
    });
        //我的第五大道hover效果
    $('.my5lux').hover(function(){
        $(this).find('dt').css("backgroundColor","#fff").next().show();
        $(this).find('dt').find('a').hover(function () {
            $(this).css('color','#c69c6d');
        },function () {
            $(this).css('color','#666');
        });
        $(this).find('li').hover(function () {
            $(this).css('color','red');
        },function () {
            $(this).css('color','#666');
        })
    },function(){
        $(this).find('dt').css("backgroundColor","#f2f2f2").next().hide();
    });
        //手机版下载hover效果
    $('.mobile').hover(function () {
        $(this).css({'background':'#fff','height':"177px"}).find('dd').show().siblings('dt').css('color','red');
    },function () {
        $(this).css({'background':'#f2f2f2','height':"30px"}).find('dd').hide().siblings('dt').css('color','#666');
    });

    //==========================导航栏动画效果============================
        //小图标hover效果
    $("#icon_wrap li").hover(function(){
        $(this).stop().animate({"width":"140px"},400);
    },function(){
        $(this).stop().animate({"width":"30px"},400);
    });
        //购物袋hover效果
    $('.cart dt').mouseenter(function () {
        $(this).siblings('b').show().siblings('dd').show();
    }).closest('dl').mouseleave(function () {
        $(this).find('b').hide().siblings('dd').hide();
    });

    //==========================“品牌旗舰”动画效果============================
    $(".brand_list li").hover(function () {
        $(this).find('.brand_list_hidebox').stop().animate({"top":"0"},250)
    },function(){
        $(this).find('.brand_list_hidebox').stop().animate({"top":"100px"},250)
    });


    //==========================“热门旗舰店”动画效果============================
        //图片hover效果
    $(".flag_store_firststore").hover(function () {
        $(this).find('.flag_store_name').fadeTo(200,1).find('p').hover(function () {
            $(this).css('color','#c69c6d');
        },function () {
            $(this).css('color','#000');
        });
        $(this).find(".topline").stop().animate({"width":"166px"},200);
        $(this).find(".rightline").stop().animate({"height":"85px"},200);
        $(this).find(".bottomline").stop().animate({"width":"166px"},200);
        $(this).find(".leftline").stop().animate({"height":"85px"},200);
    },function(){
        $(this).find('.flag_store_name').fadeTo(200,0);
        $(this).find(".topline").stop().animate({"width":"0px"},200);
        $(this).find(".rightline").stop().animate({"height":"0px"},200);
        $(this).find(".bottomline").stop().animate({"width":"0px"},200);
        $(this).find(".leftline").stop().animate({"height":"0px"},200);
    });
        //左右按钮点击滑动效果
    var hotclick = 0;
    $('.hot_next').click(function () {
        hotclick++;
        if(hotclick >= 2){
            hotclick = 2;
        }
        $('.flag_store_box').animate({'left':-1210*hotclick+'px'},400);
    });
    $('.hot_last').click(function () {
        hotclick--;
        if(hotclick <= 0){
            hotclick = 0;
        }
        $('.flag_store_box').animate({'left':-1210*hotclick+'px'},400);
    });


    //==========================“商场同款”动画效果JS代码============================
        //切换品牌类型
    $('.hotsale_tab li:nth-child(1)').hover(function () {
        $('.hotsale_box').stop().animate({'left':0},400);
        $(this).addClass('black_bg').siblings().removeClass('black_bg');
    });
    $('.hotsale_tab li:nth-child(2)').hover(function () {
        $('.hotsale_box').stop().animate({'left':'-1210px'},400);
        $(this).addClass('black_bg').siblings().removeClass('black_bg');
    });
    $('.hotsale_tab li:nth-child(3)').hover(function () {
        $('.hotsale_box').stop().animate({'left':'-2420px'},400);
        $(this).addClass('black_bg').siblings().removeClass('black_bg');
    });
        //前两组图片hover效果
    $(".hotsale_boxRightTop1").hover(function(){
        $(this).find(".hotsale_info").stop().animate({"left":"-20px"},200);
        $(this).find(".hotsale_info_pic").stop().animate({"left":"20px"},200);
    },function(){
        $(this).find(".hotsale_info").stop().animate({"left":"0px"},200);
        $(this).find(".hotsale_info_pic").stop().animate({"left":"0px"},200);
    });
    $(".hotsale_boxRightTop2").hover(function(){
        $(this).find(".hotsale_info").stop().animate({"left":"-20px"},200);
        $(this).find(".hotsale_info_pic").stop().animate({"left":"20px"},200);
    },function(){
        $(this).find(".hotsale_info").stop().animate({"left":"0px"},200);
        $(this).find(".hotsale_info_pic").stop().animate({"left":"0px"},200);
    });
    $(".hotsale_boxRightbottom1").hover(function(){
        $(this).find(".hotsale_info").stop().animate({"left":"-20px"},200);
        $(this).find(".hotsale_info_pic1").stop().animate({"left":"80px"},200);
    },function(){
        $(this).find(".hotsale_info").stop().animate({"left":"0px"},200);
        $(this).find(".hotsale_info_pic1").stop().animate({"left":"60px"},200);
    });
        //第三组图片hover效果
    $('#hotsale_box3_fa').hover(function () {
        $(this).find('.hotsale_box3_leftinfo').show();
    },function () {
        $(this).children('.hotsale_box3_leftinfo').hide();
    });
    $('.hotsale_box3_smallbox').hover(function () {
        $(this).find('div:nth-child(2)').show();
    },function () {
        $(this).find('div:nth-child(2)').hide();
    });



    //==========================“购物中心”动画效果JS代码============================
    //标题栏hover
    $(".shopcenter_box").hover(function(){
        $(this).find(".shopcenter_boxtop").stop().animate({"top":"-50px"},200);
        $(this).find(".shopcenter_boxbottom").stop().animate({"top":"0px"},200)
    },function(){
        $(this).find(".shopcenter_boxtop").stop().animate({"top":"0px"},200);
        $(this).find(".shopcenter_boxbottom").stop().animate({"top":"50px"},200)
    });
    //标题栏点击
    $('.shopcenter li').click(function () {
        $(window).scrollTop($('.goods_title').eq($(this).index()).offset().top);
    });
    //左侧物品清单a标签hover
    $('.goodslist a').hover(function () {
        $(this).css('color','#c69c6d');
    },function () {
        $(this).css('color','#000');
    });
    //左下角图片轮播
    var shoppingmall = 0;
    // $('.goods_sliderbox li').first().clone(true).appendTo($('.goods_sliderbox'));
    //clone移至get方法中
    $('.goods_sliderbox').css('width','896px');
    $('.goods_slider_direction .last').click(function () {
        // console.log($(this).closest('.goods_slider_control').find('.button'));
        for(var i = 0; i < 3; i++){
            if($(this).closest('.goods_slider_control').find('.button').eq(i).hasClass('active')){
                shoppingmall = i;
                // console.log(i,shoppingmall);
                break;
            }
        }
        // console.log(shoppingmall);
        shoppingmall--;
        // $(this).addProp("a",shoppingmall);
        if(shoppingmall == -1){
            $(this).closest('.goods_slider_control').siblings('.goods_viewport').find('.goods_sliderbox').css('left',-224*3);
            shoppingmall = 2;
        }
        // console.log(shoppingmall);
        $(this).closest('.goods_slider_control').siblings('.goods_viewport').find('.goods_sliderbox').stop().animate({'left':-224*shoppingmall});
        $(this).closest('.goods_slider_control').find('.button').eq(shoppingmall).addClass('active').siblings().removeClass('active');
    });
    $('.goods_slider_direction .next').click(function () {
        for(var i = 0; i < 3; i++){
            if($(this).closest('.goods_slider_control').find('.button').eq(i).hasClass('active')){
                if(i == 0){
                    i = 3;
                }
                shoppingmall = i;
                // console.log(i,shoppingmall);
                break;
            }
        }
        console.log(shoppingmall);
        shoppingmall++;
        if(shoppingmall == 4){
            $(this).closest('.goods_slider_control').siblings('.goods_viewport').find('.goods_sliderbox').css('left','0');
            shoppingmall = 1;
        }
        // console.log(shoppingmall);
        $(this).closest('.goods_slider_control').siblings('.goods_viewport').find('.goods_sliderbox').stop().animate({'left':-224*shoppingmall});
        if(shoppingmall == 3){
            $(this).closest('.goods_slider_control').find('.button').eq(0).addClass('active').siblings().removeClass('active');
        }else{
            $(this).closest('.goods_slider_control').find('.button').eq(shoppingmall).addClass('active').siblings().removeClass('active');
        }
    });
    $('.goods_slider_button .button').click(function () {
        shoppingmall = $(this).index()%3;
        $(this).closest('.goods_slider_control').siblings('.goods_viewport').find('.goods_sliderbox').stop().animate({'left':-224*shoppingmall});
        $(this).addClass('active').siblings().removeClass('active');
    });
    //第一组效果没有问题，后面的都有问题，因为clone问题--ok
    //因为shoppingmall值的问题--待处理--ok




    //==========================“主题活动”动画效果JS代码============================
    $('.picbox').hover(function () {
        console.log($(this).closest('li').index());
        $(this).find(".topline").stop().animate({"width":"193px"},200);
        $(this).find(".rightline").stop().animate({"height":"64px"},200);
        $(this).find(".bottomline").stop().animate({"width":"193px"},200);
        $(this).find(".leftline").stop().animate({"height":"64px"},200);
        $('.promotion3_right img').prop('src','img/'+parseInt($(this).closest('li').index()+1)+'bank.jpg');
    },function(){
        $(this).find('.flag_store_name').fadeTo(200,0);
        $(this).find(".topline").stop().animate({"width":"0px"},200);
        $(this).find(".rightline").stop().animate({"height":"0px"},200);
        $(this).find(".bottomline").stop().animate({"width":"0px"},200);
        $(this).find(".leftline").stop().animate({"height":"0px"},200);
    });


//==========================“右侧栏快捷按钮”动画效果JS代码============================
    //hover效果
    $('.icon_cart').closest('li').hover(function () {
        $(this).find('.icon_cart').css({'background':'url(img/share02.png) no-repeat -88px -121px',
                    'background-color':'#c69c6d',
                    'border-top-left-radius': '5px',
                    'border-bottom-left-radius': '5px'})
    },function () {
        $(this).find('.icon_cart').css({'background':'url(img/share02.png) no-repeat -88px -156px',
                    'background-color':''})
    });

    $('.icon_property').closest('li').hover(function () {
        $(this).find('.tab-tip').show();
        $(this).find('.icon_property').css({'background':'url(img/share02.png) no-repeat -141px -124px',
                    'background-color':'#c69c6d',
                    'border-top-left-radius': '5px',
                    'border-bottom-left-radius': '5px'})
    },function () {
        $(this).find('.tab-tip').hide();
        $(this).find('.icon_property').css({'background':'url(img/share02.png) no-repeat -140px -154px',
                    'background-color':''})
    });

    $('.icon_interesting').closest('li').hover(function () {
        $(this).find('.tab-tip').show();
        $(this).find('.icon_interesting').css({'background':'url(img/share02.png) no-repeat -203px -126px',
            'background-color':'#c69c6d',
            'border-top-left-radius': '5px',
            'border-bottom-left-radius': '5px'})
    },function () {
        $(this).find('.tab-tip').hide();
        $(this).find('.icon_interesting').css({'background':'url(img/share02.png) no-repeat -202px -155px',
            'background-color':''})
    });

    $('.icon_service').closest('li').hover(function () {
        $(this).find('.tab-tip').show();
        $(this).find('.icon_service').css({'background':'url(img/share02.png) no-repeat -258px -125px',
            'background-color':'#c69c6d',
            'border-top-left-radius': '5px',
            'border-bottom-left-radius': '5px'})
    },function () {
        $(this).find('.tab-tip').hide();
        $(this).find('.icon_service').css({'background':'url(img/share02.png) no-repeat -258px -125px',
            'background-color':''})
    });


    $('.icon_weixin').closest('li').hover(function () {
        $(this).find('.menu_barcode').show();
        $(this).find('.icon_weixin').css({'background':'url(img/lux_index.png) no-repeat -475px -52px',
            'background-color':'#c69c6d',
            'border-top-left-radius': '5px',
            'border-bottom-left-radius': '5px'})
    },function () {
        $(this).find('.menu_barcode').hide();
        $(this).find('.icon_weixin').css({'background':'url(img/share02.png) no-repeat -312px -155px',
            'background-color':''})
    });

    $('.icon_feedback').closest('li').hover(function () {
        $(this).find('.tab-tip').show();
        $(this).find('.icon_feedback').css({'background':'url(img/lux_index.png) no-repeat -124px -52px',
            'background-color':'#c69c6d',
            'border-top-left-radius': '5px',
            'border-bottom-left-radius': '5px'})
    },function () {
        $(this).find('.tab-tip').hide();
        $(this).find('.icon_feedback').css({'background':'url(img/share02.png) no-repeat -374px -157px',
            'background-color':''})
    });

    $('.icon_contactus').closest('li').hover(function () {
        $(this).find('.tab-tip').show();
        $(this).find('.icon_contactus').css({'background':'url(img/line_bg.png) 10px -19px no-repeat',
            'background-color':'#c69c6d',
            'border-top-left-radius': '5px',
            'border-bottom-left-radius': '5px'})
    },function () {
        $(this).find('.tab-tip').hide();
        $(this).find('.icon_contactus').css({'background':'url(img/line_bg.png) 10px 9px no-repeat',
            'background-color':''})
    });

    $('.icon_backtotop').closest('li').hover(function () {
        $(this).find('.tab-tip').show();
        $(this).find('.icon_backtotop').css({'background':'url(img/lux_index.png) no-repeat -401px -52px',
            'background-color':'#c69c6d',
            'border-top-left-radius': '5px',
            'border-bottom-left-radius': '5px'})
    },function () {
        $(this).find('.tab-tip').hide();
        $(this).find('.icon_backtotop').css({'background':'url(img/share02.png) no-repeat -437px -153px',
            'background-color':''})
    });

    //点击事件
    //返回顶部
    $('.icon_backtotop').click(function () {
        $('body').animate({scrollTop:0},300);
    });
    //显示资产
    var propertyCliked = false;
    var cartCliked = false;
    var interestingCliked = false;
    $('.icon_property').click(function () {
        if(!propertyCliked){
            $('#right_menu').animate({'right':'296px'});
            $('.info_property').show().siblings().hide();
            propertyCliked = true;
            cartCliked = false;
            interestingCliked = false;
        }else{
            $('#right_menu').animate({'right':'0'},function () {
                $('.info_property').hide();
            });
            propertyCliked = false;
        }
    });
    //显示购物袋
    $('.icon_cart').click(function () {
        if(!cartCliked){
            $('#right_menu').animate({'right':'296px'});
            $('.info_cart').show().siblings().hide();
            cartCliked = true;
            propertyCliked = false;
            interestingCliked = false;
        }else{
            $('#right_menu').animate({'right':'0'},function () {
                $('.info_cart').hide();
            });
            cartCliked = false;
        }
    });
    //显示喜欢的商品
    $('.icon_interesting').click(function () {
        if(!interestingCliked){
            $('#right_menu').animate({'right':'296px'});
            $('.info_interesting').show().siblings().hide();
            interestingCliked = true;
            cartCliked = false;
            propertyCliked = false;
        }else{
            $('#right_menu').animate({'right':'0'},function () {
                $('.info_interesting').hide();
            });
            interestingCliked = false;
        }
    });

    //xx关闭
    $('.info_title b').click(function () {
        $('#right_menu').animate({'right':'0'},function () {
            $('.info_property').hide();
            $('.info_cart').hide();
            $('.info_interesting').hide();
        });
        propertyCliked = false;
        cartCliked = false;
        interestingCliked = false;
    });

    $('.hotsale_boxRightbottom1').click(function () {
        location.href = "goods_detail.html";
    })
});
















