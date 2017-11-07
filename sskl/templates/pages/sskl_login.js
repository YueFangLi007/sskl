
//登录页面
$("#login").click(function(){
//     $.ajax({
//        type:get,
//        url:"",
//        data:"",
//        success:function(){
//
//        },
//        err:function(){
//
//        }
//    });
});



//    注册功能页面start
    $("#register").click(function () {
        console.log("点击了下一步");
        //location.href="https://www.baidu.com/";
        location.href = "sskl_netWork.html";
    });
$(".loginInUl>li").click(function(){
    $(this).css("backgroundColor","#fff").siblings("li").css("backgroundColor","#dde0e0");
});
    //  发送验证码
    $("#getCode").click(function () {
        var code = 60;
        $(this).addClass("getCodeHover"); //移除click
        $("#getCode").html(code + "S");
        var timer = setInterval(function () {
            code--;
            $("#getCode").html(code + "S");
            if (code == 0) {
                $("#getCode").html("再次获取验证码").removeClass("getCodeHover");
                clearInterval(timer)
            }
        }, 1000)
    });


    //验证手机号码
    $("#phoneNum").blur(function(){
       var phoneNum = $(this).val();
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phoneNum))) {
            $('#MesErr').show().text("您输入的号码有误");;
            $("#phoneNum").focus();
            return false;
        }else{
             $("#MesErr").hide();
        }
    });

//    验证6-12位数的密码
    $("#getpassWord").blur(function(){
        var upwd= $.trim($('#getpassWord').val());
        var regUpwd=/^[A-Za-z0-9]{6,12}$/;
        if(!upwd){//当密码为空的时候
            $('#MesErr').show().text("密码不能为空");
            return false;
        }
        else if(!regUpwd.test(upwd)){
            $('#MesErr').show().text("密码必须在6~12位");
        }
        else{
            $('#MesErr').hide();
            return true;
        }
    });

//点击下一步操作
    $("#register").click(function(){

    });

//    注册功能页面start