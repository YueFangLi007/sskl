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
//时间转换
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//获取url参数
function GetQueryString(name) {
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}



//datepikr插件
var logic = function( currentDateTime ){
    if( currentDateTime.getDay()==6 ){
        this.setOptions({
            minTime:'11:00'
        });
    }else
        this.setOptions({
            minTime:'8:00'
        });
};
$('.startTime').datetimepicker({
    onChangeDateTime:logic,
    onShow:logic
});
$('.endTime').datetimepicker({
    onChangeDateTime:logic,
    onShow:logic
});
