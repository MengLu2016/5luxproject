/**
 * Created by XiaoLuLu on 2016/10/26.
 */
$(function () {
    var goodsQty = 1;
    $('.choosenumber input').val(goodsQty);
    $('.add').click(function () {
        goodsQty++;
        $('.choosenumber input').val(goodsQty);
    })
    $('.reduce').click(function () {
        goodsQty--;
        if(goodsQty <= 1){
            goodsQty = 1;
        }
        $('.choosenumber input').val(goodsQty);
    })

    //选择颜色
    $('.color_size_cur').click(function () {
        $(this).toggleClass('goods_active').siblings().removeClass('goods_active');
    })
    //弹出购物车弹窗
    $('.add_tocart').click(function () {
        var goColor = false;
        //保存cookie
        var name = "good";
        console.log($.cookie(name));
        var goodsList = $.cookie(name)?JSON.parse($.cookie(name)):[];
        var goodPrice = $('.goodsprice').text().slice(2);
        var goodsImg = $('.smallpic img:nth-child(1)').attr('src');
        var goodsInfo = $('.goodstitle a').eq(1).text();
        //增加颜色判断
        console.log($('.color_size_cur').eq(0).hasClass('goods_active'));
        if ($('.color_size_cur').eq(0).hasClass('goods_active')){
            var goodsColor = $('.color_size_cur').eq(0).text();
            goColor = true;
        }else if($('.color_size_cur').eq(1).hasClass('goods_active')){
            goodsColor = $('.color_size_cur').eq(1).text();
            goColor = true;
        }

        var isExit = false;

        var ttlprice = 0;
        var ttlgoodsnum = 0;
        for(var i=0; i < goodsList.length; i++){
            //判断现存cookie是否存在
            if(goodsList[i].img == goodsImg && goodsList[i].color == goodsColor){
                goodsList[i].num += goodsQty;
                isExit = true;
            }
            //计算总价
            ttlprice += goodsList[i].price * goodsList[i].num;
            ttlgoodsnum += goodsList[i].num;
            // console.log(ttlgoodsnum,ttlprice);
        }
        if(!isExit){
            var goodsObj = {
                price:goodPrice,
                img:goodsImg,
                info:goodsInfo,
                num:goodsQty,
                color:goodsColor
            }
            goodsList.push(goodsObj);
            ttlprice += goodsObj.price * goodsObj.num;
            ttlgoodsnum += goodsObj.num;
            console.log(ttlgoodsnum,ttlprice);
        }
        $.cookie(name,JSON.stringify(goodsList),{'expires':7});

        if(goColor){
            $('.goods_cart').show();
            $('.cart_text .text1 span').text(ttlgoodsnum);
            $('.cart_text .text2 span').text(ttlprice);
        }else{
            alert('请选择颜色');
        }
    })

//-----------------------------动画效果-----------------------------//
    //关闭购物车弹窗
    $('.goods_cart .close').click(function () {
        $('.goods_cart').hide();
    })
    
    $('.goodsprice_slow').click(function () {
        $('.sendremind').show();
    })
    $('.sendremind a').click(function () {
        $('.sendremind').hide();
    })
    $('.vipprice_link').hover(function () {
        $('.goods_hide_price').show();
    },function () {
        $('.goods_hide_price').hide();
    })
    $('.goodstitle div:eq(0)').hover(function () {
        $(this).css('color','#c69c6d');
    },function () {
        $(this).css('color','#999');
    })
    $('.goodstitle div:eq(1)').hover(function () {
        $(this).css('color','#c69c6d');
    },function () {
        $(this).css('color','#000');
    })
    $('.bottom a').hover(function () {
        $(this).find('.big_picbottom_hide').show();
    },function () {
        $(this).find('.big_picbottom_hide').hide();
    })
    $('.big_pictop').hover(function () {
        $(this).find('.big_pictop_hide').show();
    },function () {
        $(this).find('.big_pictop_hide').hide();
    })

    $('.title_right ul li').click(function () {
        var index = $(this).index();
        $(this).css('color','#c69c6d').siblings('li').css('color','#000');
        $('.goodsContent_right ul li').eq(index).show().siblings('li').hide();
    })

    $('.phoneAppLoad').hover(function () {
        $('.barcode').show();
    },function () {
        $('.barcode').hide();
    })

//图片相关
    $('.smallpic').click(function () {
        $('.bigpic img').attr('src',$(this).find('img').attr('src'));
    })

    //放大镜
    var lens = $('.cloudzoom-lens');
    var smallpic = $('.bigpic img');
    var zoom = $('.cloudzoom-zoom');
    var bigpic = $('.cloudzoom-zoom img');

    lens.width(240);
    lens.height(240);

    var ratio = zoom.width()*zoom.height()/lens.width()/lens.height();

    $('.bigpic').mousemove(function () {
        $('.cloudzoom-zoom img').attr('src',$(this).find('img').attr('src'));
        $('.cloudzoom-blank').show().siblings('.cloudzoom-zoom').show();
    })

    $('.cloudzoom-blank').mousemove(function (evt) {

        var x = evt.pageX - smallpic.offset().left - lens.width()/2;
        var y = evt.pageY - smallpic.offset().top - lens.height()/2;

        if(x < 0){
            x = 0;
        }else if(x > smallpic.width()-lens.width()){
            x = smallpic.width()-lens.width();
        }
        if(y < 0){
            y = 0;
        }else if(y > smallpic.height()-lens.height()){
            y = smallpic.height()-lens.height();
        }

        lens.css({left:x,top:y});

        bigpic.width(lens.width()*ratio);
        bigpic.height(lens.height()*ratio);

        bigpic.css({left:-x * ratio/2, top: -y * ratio/2});
    })
    $('.cloudzoom-blank').mouseout(function () {
        $('.cloudzoom-blank').hide().siblings('.cloudzoom-zoom').hide();
    })

})






















