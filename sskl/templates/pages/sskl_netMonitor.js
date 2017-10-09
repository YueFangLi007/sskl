
navList("网络监测");

$(".tabstation >tbody tr").click(function(){
    location.href="sskl_netWork.html";
});
$(".pageinput").click(function(){
    var LiChd=$(this).siblings(".page-num_pages");
    LiChd.show();
    LiChd.children("li").each(function(){
        if($(this).html()==$(".pageinput").val()){
            $(this).addClass("page_hover").siblings("li").removeClass("page_hover");
        }
    });

    LiChd.children("li").click(function(){
       $(".pageinput").val( $(this).html());
        LiChd.hide();
    });
       LiChd.children("li").hover(function(){
        $(this).addClass("page_hover").siblings("li").removeClass("page_hover");
    });

});
$(".statinput").click(function(){
    $(this).children("div").show();
});