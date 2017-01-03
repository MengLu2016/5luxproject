/**
 * Created by XiaoLuLu on 2016/10/26.
 */
$(function () {
    var ttlprice = 0;
    var singlegoodPrice = 0;
    var ttlPrice = 0;
    var ttlgoodsnum = 0;
    var goods = $.cookie('good')?JSON.parse($.cookie('good')):[];
    if (goods.length){//如果存在cookie---商品
        $('#cart_tbody tbody tr:eq(1)').hide();
        $('#cart_tbody tbody tr:eq(2)').hide();
        $('#cart_tbody tbody tr:gt(2)').show();
        $('.btn_price_info').show();

        $.each(goods,function (index,ele) {
            if(index > 0){
                $('.goods_tr').clone().insertAfter($('.goods_tr').last());
            }
            $('.goodsImg img').eq(index).attr('src',ele.img);
            $('.goodsInfo').eq(index).text(ele.info);
            $('.goodsPrice').eq(index).text(ele.price);
            $('.cart_goods_num input').eq(index).val(ele.num);
            $('.tr_price').eq(index).text(parseInt(ele.price) * ele.num);
            $('.goodsColor').eq(index).text(ele.color);
        })
        
        $('.cart-increase').click(function () {
            singlegoodPrice = 0;
            var num = $(this).siblings('input').val();
            num++;
            $(this).siblings('input').val(num);
            singlegoodPrice += parseInt($(this).closest('td').siblings('.goodsPrice').text()) * num;
            $(this).closest('td').siblings('.tr_price').text(singlegoodPrice);
            ttl();

        })
        $('.cart-reduce').click(function () {
            singlegoodPrice = 0;
            var num = $(this).siblings('input').val();
            num--;
            if(num < 1){
                num = 1;
            }
            $(this).siblings('input').val(num);
            singlegoodPrice += parseInt($(this).closest('td').siblings('.goodsPrice').text()) * num;
            $(this).closest('td').siblings('.tr_price').text(singlegoodPrice);
            ttl();
        })
    }else{//如果不存在cookie---商品
        $('#cart_tbody tbody tr:gt(0)').hide();
        $('.btn_price_info').hide();
        $('.blanks').show();
    }
    //删除商品
    $('.cart-remove').click(function () {
        if(confirm('确定删除此商品吗？')){
            $(this).closest('tr').remove();
            ttl();
        }
    })

    //单个勾选框点击
    $('.check_box').click(function () {
        var flag = true;
        $('.check_box').each(function () {
            if(!$(this).prop('checked')){
                flag = false;
            }
        })
        $('.cart_tfinput').prop('checked',flag);
        ttl();
    })

    //总勾选框点击
    $('.cart_tfinput').click(function () {
        if($(this).is(':checked')){
            $('.cart_tfinput').attr('checked',true);
            $('.cart_goods').find('.check_box').attr('checked',true);
        }else{
            $('.cart_tfinput').attr('checked',false);
            $('.cart_goods').find('.check_box').attr('checked',false);
        }
        ttl();
    })

    ttl();

    function ttl() {
        ttlPrice = 0;
        ttlgoodsnum = 0;
        if($('.tr_price').length){
            $('.tr_price').each(function () {
                if($(this).siblings('.tr_lineleft').find('.check_box').is(':checked')){
                    ttlPrice += parseInt($(this).text());
                    $('.ttlprice').text('¥ '+ttlPrice);
                }else{
                    $('.ttlprice').text('¥ '+ ttlPrice);
                }
            })
            $('.cart_goods_num input').each(function () {
                if($(this).closest('td').siblings('.tr_lineleft').find('.check_box').is(':checked')){
                    ttlgoodsnum += parseInt($(this).val());
                    $('.red_number').text(ttlgoodsnum);
                }else{
                    $('.red_number').text(ttlgoodsnum);
                }
            })
        }else{
            $('.ttlprice').text('¥ '+ ttlPrice);
            $('.red_number').text(ttlgoodsnum);
        }
        if(parseInt(ttlPrice) > 100000){
            $('#cart_tbody tbody tr:eq(1)').show();
            $('#cart_tbody tbody tr:eq(2)').show();
        }else {
            $('#cart_tbody tbody tr:eq(1)').hide();
            $('#cart_tbody tbody tr:eq(2)').hide();
        }
    }
})


























