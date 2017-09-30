//公共的 进入后菜单列表选中样式
$("a").click(function(){
    $(this).css("text-decoreation","none");
});
function navList(aValue){
    $(".sec_nav>.nav_list>li>a").each(function(){
        if($(this).html()==aValue){
            $(this).addClass("aList").parent().siblings().children("a").removeClass("aList");
        }
    });
}