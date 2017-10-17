$(function () {
    // $('#table').dataTable();
    navList("网络监测");
    tableAA();
    //省||市的选择
    sheng_shoose();
});
var httpUrl = "http://192.168.174.140"

//表格加载
function tableAA() {
    $.ajax({
        url: httpUrl + "/api/method/tieta.tieta.doctype.cell_station.cell_station.search_station",
        success: function (r) {
            var data = r.message;

            $('#table').DataTable({
                data: data,
                columns: [
                    {data: 'code'},
                    {data: 'station_name'},
                    {data: 'station_type'},
                    {data: 'address_text'},
                    {data: 'name'},
                    {data: 'longitude'},
                    {data: 'latitude'},
                    {data: 'modified'}
                ],
                "bFilter": false,   //去掉搜索框方法二
                "bSort": false,  //禁止排序
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                    "sInfoEmpty": "没有数据",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
                    "emptyTable": "无数据",
                    "aLengthMenu": [10, 25, 50, -1],
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "尾页"
                    },
                    "sZeroRecords": "没有检索到数据",
                    "sProcessing": "<img src='./loading.gif' />"
                }
            });
        }
    });

}


//跳转函数
function netWorkDrop(code) {
    location.href = "sskl_netWork.html?code=" + code;
}


$(".searchs >span").click(function (e) {
    $(this).children("div").show();
});

//获取省列表
function sheng_shoose() {
    var url1 = httpUrl + "/api/method/cloud.cloud.doctype.region.region.list_region";
    $.ajax({
        url: url1,
        success: function (data) {
            var m = data.message;
            var html = "";
            var pagetotal = 0;
            $.each(m, function (index, val) {
                html += "<li rgn=" + val[0] + "   rgnType=Province>" + val[1] + "</li>";
            });
            $("#sheng_ul").html(html);

        }
    });
};
//获取市列表


$("#sheng_ul").on("click", "li", function () {
     $("#sheng_input").val($(this).html());
    var rgn = $(this).attr("rgn");
    var url = "/api/method/cloud.cloud.doctype.region.region.list_child_region?";
    $.ajax({
        url: httpUrl + url,
        data: "rgn=" + rgn + "&type=city",
        success: function (data) {
            var m = data.message;
            var htmlStr = "";
            $.each(m, function (index, val) {
                htmlStr += "<li rgn=" + val[0] + "   rgnType=Province>" + val[1] + "</li>";
            });
            $("#city_ul").html(htmlStr);
            $("#sheng_divUl").hide();

        }

    });
});

$("#city_ul").on("click", "li", function () {
    var rgn = $(this).attr("rgn");
     $("#shi_input").val($(this).html());
    $.ajax({
        url: httpUrl + "/api/method/cloud.cloud.doctype.region.region.list_child_region?",
        data: "rgn=" + rgn + "&type=county",
        success: function (data) {
            var m = data.message;
            var htmlStr = "";
            $.each(m, function (index, val) {
                htmlStr += "<li rgn=" + val[0] + "  rgnType=County>" + val[1] + "</li>"
            });
            $("#contyUl").html(htmlStr);
            $(this).parent().siblings("input").val($(this).html());
            $("#shi_ul").hide();//    无法实现父元素隐藏


        }
    });
});
$("#contyUl").on("click", "li", function () {
    $(this).parent().parent().hide();
    $("#xian_input").val($(this).html());
    $("#xian_input").attr("rgn",$(this).attr("rgn"));
    $("#xian_input").attr("rgntype",$(this).attr("rgntype"));
    console.log( $("#xian_input").val());



});
$(".sta_stat>li").click(function(){
    $(".statInput").val($(this).html());
    $(".statInput").attr("state",$(this).attr("state"));

    $("#statDiv").hide(); //    无法实现父元素隐藏
});
//点击搜索按钮进行搜索
$("#beg_search").click(function () {
     var rgn = $("#xian_input").attr("rgn");
     var rgn_type =  $("#xian_input").attr("rgntype");
     console.log("=====rgn"+rgn+"====rgn_type"+rgn_type);
//     竟然是未定义
    var code = $("#stat_code").val();
    var station_name = $("#baseName").val();
    var symlink_sn = $("#sn_caiji").val();
    $(".statInput").attr("state");

    console.log("rgn=="+rgn+"----rgn_type=="+rgn_type+"--code=="+code+"station_name=="+station_name+"--symlink_sn=="+symlink_sn);

//     var page_length = "";
//
//     var url = httpUrl+/api/method/tieta.tieta.doctype.cell_station.cell_station.list_station_info?";
//     $.ajax({
//         url: url,
//         data: "rgn=" + rgn + "&rgn_type=" + rgn_type + "&code=" + code + "&station_name=" + station_name + "&symlink_sn=" + symlink_sn + "&status=" + status + "&page_length=" + page_length,
//
//         success: function (r) {
//             var message = r.message;
//
//         }
//     })
//
 })

//page页数的显示start
// $(".pageinput").click(function(){
//     var LiChd=$(this).siblings(".page-num_pages");
//     LiChd.show();
//     LiChd.children("li").each(function(){
//         if($(this).html()==$(".pageinput").val()){
//             $(this).addClass("page_hover").siblings("li").removeClass("page_hover");
//         }
//     });
//
//     LiChd.children("li").click(function(){
//        $(".pageinput").val( $(this).html());
//         LiChd.hide();
//     });
//        LiChd.children("li").hover(function(){
//         $(this).addClass("page_hover").siblings("li").removeClass("page_hover");
//     });
//
// });
//page页数的显示的end


