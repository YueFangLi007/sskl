$(function () {
        $("#tabs").tabs();
    });
$(".loginInUl>li").click(function(){
    $(this).css("backgroundColor","#fff").siblings("li").css("backgroundColor","#dde0e0");
});

//验证码
 window.onload = function(){
        createCode();
 }
function createCode(){
    FourCode = "";
    var codeLength = 4;//验证码的长度;
    var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');//随机数
    for(var i = 0; i < codeLength; i++) {//循环操作
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
         // FourCode += random[index];//根据索引取得随机数加到code上
         var a="<b class='p2'>"+random[index]+"</b>";
          FourCode += a;//根据索引取得随机数加到code上

    }
    $("#FourCode").html(FourCode);
    $.each($(".p2"),function(i,v){
       console.log( "this===="+$(this));
       $(this)
    });
    $(".p2").css({
        "margin":"6px",
        "display":"inline-block",
        "transform":"rotate("+8+"deg) translateX(10px)"
    });
}

$("#dynaminVal").blur(function(){
    validate();
});
function validate(){
    var inputCode = $("#dynaminVal").val().toUpperCase(); //取得输入的验证码并转化为大写
    if(inputCode.length <= 0) { //若输入的验证码长度为0
      // alert("请输入验证码");
        $("#ErrMessages").show().html("请输入验证码");
    }
    else if(inputCode != FourCode ) { //若输入的验证码与产生的验证码不一致时
        // alert("验证码输入错误！@_@"); //则弹出验证码输入错误
         $("#ErrMessages").show().html("验证码输入错误");
        createCode();//刷新验证码
        $("#dynaminVal").value = "";//清空文本框
    }
    else { //输入正确时
         $("#ErrMessages").hide();
        // alert("输入正确"); //弹出^-^
    }
}


//忘记密码输入

$("#inputVerCode").blur(function(){
        var upwd= $.trim($('#inputVerCode').val());
        console.log(upwd);
        var regUpwd=/^[A-Za-z0-9]{6,12}$/;
        if(!upwd){//当密码为空的时候
            $('#ForgetErrPassword').show().text("密码不能为空");
            return false;
        }
        else if(!regUpwd.test(upwd)){
            $('#ForgetErrPassword').show().text("密码必须在6~12位");
        }
        else{
            $('#ForgetErrPassword').hide();
            return true;
        }
    });