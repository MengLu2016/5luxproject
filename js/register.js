/**
 * Created by XiaoLuLu on 2016/10/26.
 */
$(function () {
    var reg = /^1[34578]\d{9}$/;

    var phoneOk = false;
    var verifycodeOk = false;
    var pwOk = false;
    var readOk = false;
    var code;


    $('#mobile_phone').blur(function () {
        var phoneval = $('#mobile_phone').val();
        if (!reg.test(phoneval)){
            $(this).siblings('.warning').show();
        }
    });

    $('.getcode').click(function () {
        var users= $.cookie("users") ? JSON.parse($.cookie("users")) : null;
        if (!users){
            return;
        }
        for(var i= 0;i<users.length;i++){
            if($("#mobile_phone").val()==users[i].phone){
                alert("该手机号已经存在，不能注册");
                return;
            }
        }

        var phoneval = $('#mobile_phone').val();
        if (!reg.test(phoneval)){
            $(this).siblings('.warning').show();
        }else{
            $(this).siblings('.warning').hide();
            phoneOk = true;

            $(this).text('正在获取...');
            code = getRandom(1000000);
            setTimeout(function () {
                $('#verifycode').val(code);
                $('.getcode').text('获取验证码');
            },3000);
        }
    });

    $('.register_submit input').click(function () {
        if($('#verifycode').val() == code){
            verifycodeOk = true;
            $('#verifycode').next('.warning').hide();
        }else {
            $('#verifycode').next('.warning').show();
        }
        if($('#password_comfirm').val() == $('#password').val()){
            pwOk = true;
            $('#password_comfirm').next('.warning').hide();
        }else {
            $('#password_comfirm').next('.warning').show();
        }
        if($('#remember').attr("checked")){
            readOk = true;
        }
        // console.log(phoneOk,verifycodeOk,pwOk,readOk);
        if(phoneOk && verifycodeOk && pwOk && readOk){
            var users= $.cookie("users")?JSON.parse($.cookie("users")):[];
            var isExit=false;
            for(var i= 0;i<users.length;i++){
                if($("#mobile_phone").val()==users[i].phone){
                    alert("该手机号已经存在，不能注册");
                    isExit=true;
                    return;
                }
            }
            if(!isExit){
                var user={
                    phone:$("#mobile_phone").val(),
                    pwd:$("#password").val()
                };
                users.push(user);
            }

            //保存到cookie中
            $.cookie("users",JSON.stringify(users),{expires:30,path:"/"});
            console.log($.cookie("users"));
            if (confirm('是否转到登录？')){
                location.href = 'login.html';
            }
        }else{
            console.log('false');
        }
    });


    $('.getcode').hover(function () {
        $(this).css({'color':'#fff','background':'#c69c6d'})
    },function () {
        $(this).css({'color':'#000','background':'#fff'})
    });

    function getRandom(n){
        var num = Math.floor(Math.random()*n+1);
        if(num >= 100000){
            return num;
        }else{
            num += 100000;
            return num;
        }
    }
});