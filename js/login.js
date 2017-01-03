/**
 * Created by XiaoLuLu on 2016/10/26.
 */
$(function () {
    var nameOk = false;
    var passwordOk = false;

    var usersList= $.cookie("users") ? JSON.parse($.cookie("users")) : null;
    var lastUser = usersList ? usersList[usersList.length-1].phone : '';
    var lastPw = usersList ? usersList[usersList.length-1].pwd : '';
    if(lastUser){
        $('.name_text').val(lastUser);
    }
    $('.login_remenber input').click(function () {
        if($(this).is(':checked')){
            $('.password_text').val(lastPw);
        }
    });

    $('.name_text').blur(function () {
        if (!$(this).val()){
            $(this).next('.msg_warning').css('display','inline-block');
        }
    });
    $('.password_text').blur(function () {
        if (!$(this).val()){
            $(this).next('.msg_warning').css('display','inline-block');
        }
    });

    $(".login_btn").click(function(){
        var users= $.cookie("users");
        if(users){
            users=JSON.parse(users);
            var isExist=false;
            for(var i=0;i<users.length;i++){
                if(($(".name_text").val()==users[i].phone && $(".password_text").val()==users[i].pwd)){
                    alert('登录成功');
                    location.href = "index.html";
                    isExist=true;
                }
            }
            if(!isExist){
                alert("用户名或密码不正确");
            }
        } else {
            var phone = $('.name_text').val();
            var pwd = $('.password_text').val();
            var currentUsers = [{'phone': phone, 'pwd': pwd}];
            currentUsers = JSON.stringify(currentUsers);
            $.cookie('users', currentUsers, {expires: 30, path: "/"});
            location.href = "index.html";
        }

        if($(".login_remenber input").is(':checked')) {
            console.log("a");
            $.cookie("username", $(".name_text").val(), {expires: 30, path: "/"});
            $.cookie("psw", $(".password_text").val(), {expires: 30, path: "/"});
        }
    });
    var oldUsername =$.cookie("username");
    var oldPsw =$.cookie("psw");
    if(oldUsername){
        $(".name_text").val(oldUsername);
        $(".password_text").val(oldPsw);
    }
});