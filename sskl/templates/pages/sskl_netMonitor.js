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
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                    "sInfoEmpty": "没有数据",
                    "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
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
                pagetotal = m.length - 1;
                html += "<li title=" + val[0] + " >" + val[1] + "</li>";
            });
            console.log("pagetotal   " + pagetotal);
            $("#sheng_ul").html(html);

        }
    });
};
//获取市列表


$("#sheng_ul").on("click", "li", function () {
    var shi = $(this).attr("title");
    $.ajax({
        url: httpUrl + "/api/method/cloud.cloud.doctype.region.region.list_child_region?",
        data: "rgn=" + shi + "&type=city",
        success: function (data) {
            var shi = data.message;
            var htmlStr = "";
            $.each(shi, function (index, val) {
                htmlStr += "<li title=" + val[0] + ">" + val[1] + "</li>"
            });
            $("#city_ul").html(htmlStr);
        }
    });
});

$("#city_ul").on("click", "li", function () {
    var shi = $(this).attr("title");
    $.ajax({
        url: httpUrl + "/api/method/cloud.cloud.doctype.region.region.list_child_region?",
        data: "rgn=" + shi + "&type=county",
        success: function (data) {
            var shi = data.message;
            var htmlStr = "";
            $.each(shi, function (index, val) {
                htmlStr += "<li title=" + val[0] + ">" + val[1] + "</li>"
            });
            $("#contyUl").html(htmlStr);
            $("#contyUl").parent().hide();
        }
    });
});

//点击搜索按钮进行搜索
// $("#beg_search").click(function () {
//
//     var rgn = $("#xian_input").attr("number3");
//
//     var rgn_type = "county";
//     var code = $("#stat_code").val();
//     var station_name = "";
//     var symlink_sn = $("#sn_caiji").val();
//
//     var status = "";
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
// })

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


