navList("网络监测");

$(".tabstation >tbody tr").click(function(){
    location.href="sskl_netWork.html";
});
$(".pageinput").click(function(){
    var LiChd=$(this).siblings(".page-num_pages");
    LiChd.show();
    LiChd.children("li").click(function(){
       $(".nihao").val( $(this).html());
        LiChd.hide();

    });

});
$(".statinput").click(function(){
    $(this).children("div").show();
});