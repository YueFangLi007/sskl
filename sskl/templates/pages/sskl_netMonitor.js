$(function () {
    // $('#stationTable').dataTable();
    navList("网络监测");
    tableList();
    //省||市的选择
    provinceChoose();
    //省市县显示及点击空白处隐藏
    provinceCityContyShow();

});

//省市县列表条件查找js控制
function provinceCityContyShow() {
    $("#provinceInput").click(function (event) {
        var e = window.event || event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        $("#provinceDiv").toggle();
    });
    $("#cityInput").click(function (event) {
        var e = window.event || event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        $("#cityDiv").toggle();
    });
    $("#countyInput").click(function (event) {
        var e = window.event || event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        $("#countyDiv").toggle();
    });
      $(".statInput").click(function (event) {
        var e = window.event || event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        $("#statDiv").toggle();
    });
    $(".divShow").click(function (event) {
        var e = window.event || event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    });
     $("#statDiv").click(function (event) {
        var e = window.event || event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    });
    document.onclick = function () {
        $(".divShow").hide();
        $("#statDiv").hide();
    };
}


//

var httpUrl = "http://192.168.174.140"
//点击基站去查询基站列表
$(".stateSearch").click(function () {
    conditionalQuery();

});

//表格加载
function tableList() {
    $.ajax({
        url: httpUrl + "/api/method/tieta.tieta.doctype.cell_station.cell_station.search_station",
        success: function (r) {
            var data = r.message;
            $('#stationTable').DataTable({
                data: data,
                paging: true,//分页
                ordering: true,//是否启用排序
                // searching: true,//搜索
                // dom: 'Bfrtip',
                // buttons: [{
                //     extend: 'excelHtml5',
                //     customize: function (xlsx) {
                //         var sheet = xlsx.xl.worksheets['sheet1.xml'];
                //         $('row c[r^="C"]', sheet).attr('s', '2');
                //     }
                // }],
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
                language: {
                    lengthMenu: '每页显示<select class="form-control input-xsmall">' + '<option value="10">10</option>' + '<option value="25">25</option>' + '<option value="75">75</option>' + '<option value="100">100</option>' + '</select>',//左上角的分页大小显示。
                    // search: '<span class="label label-success">搜索：</span>',//右上角的搜索文本，可以写html标签

                    paginate: {//分页的样式内容。
                        previous: "上一页",
                        next: "下一页",
                        first: "第一页",
                        last: "最后"
                    },
                    zeroRecords: "没有内容",//table tbody内容为空时，tbody的内容。
                    info: "共有_PAGES_ 页，共_MAX_ 条 ",//左下角的信息显示，大写的词为关键字。
                    infoEmpty: "0条记录",//筛选为空时左下角的显示。
                    infoFiltered: ""//筛选之后的左下角筛选提示，
                }
            });
            //如果页面返回的是故障那就将其颜色改为红色
            var faultState = $("#stationTable>tbody td:last-child");
            if (faultState.html() == "故障") {
                faultState.addClass("state_err");
            }
            ;

            $("#stationTable>tbody").on("click", "tr", function () {
                var code = $(this).children("td:nth-child(5)").html();
                location.href = httpUrl + "/sskl_netWork.html?code=" + code;
            });
        }
    });
}

//跳转函数
function netWorkDrop(code) {
    location.href = "sskl_netWork.html?code=" + code;
}

//
//  $('##provinceInput').click(function (event) {
//      //取消事件冒泡
//      event.stopPropagation();
//      //按钮的toggle,如果div是可见的,点击按钮切换为隐藏的;如果是隐藏的,切换为可见的。
//      $('#provinceDiv').toggle('slow');
//  return false;
//  });
//  //点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
// $(document).click(function(event){
//   var _con = $('#provinceDiv');   // 设置目标区域
//   if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
// 	//$('#divTop').slideUp('slow');   //滑动消失
// 	$('#provinceDiv').hide(1000);          //淡出消失
//   }
// });


// $("#provinceInput").click(function (event) {
//     $(this).siblings("div").toggle();
// });

// $(document).click( function () {
//     console.log(33);
//     $(".searchs >span >input").siblings("div").hide();
// });
console.log($('.searchs >span >div'));


//获取省列表
function provinceChoose() {
    var url1 = httpUrl + "/api/method/cloud.cloud.doctype.region.region.list_region";
    $.ajax({
        url: url1,
        success: function (data) {
            var m = data.message;
            var htmlProvice = "<li rgn='0'   rgnType=Province>省/直辖市</li>";
            $.each(m, function (index, val) {
                htmlProvice += "<li rgn=" + val[0] + "   rgnType=Province>" + val[1] + "</li>";
            });
            $("#provinceUl").html(htmlProvice);
        }
    });
};
//获取市列表
$("#provinceUl").on("click", "li", function () {
    $("#provinceInput").val($(this).html());
    $("#provinceInput").attr("rgn", $(this).attr("rgn"));
    $("#provinceDiv").hide();
    //============
    $("#cityUl").html("<li rgn='0'   rgnType='City'>城市</li>");
    $("#cityInput").val("市");
    $("#cityInput").attr("rgn", "0");

    $("#countyUl").html("<li rgn='0'   rgnType='County'>县</li>");
    $("#countyInput").val("县");
    $("#countyInput").attr("rgn", "0");
});

$("#cityInput").click(function () {
    var rgn = $("#provinceInput").attr("rgn");
    if (rgn == 0) {
        alert("请选择省！");
        return;
    }
    var url = httpUrl + "/api/method/cloud.cloud.doctype.region.region.list_child_region?";
    $.ajax({
        url: url,
        data: "rgn=" + rgn + "&type=city",
        success: function (data) {
            var m = data.message;
            if (m) {
                var htmlCity = "<li rgn='0'   rgnType='City'>城市</li>";
                $.each(m, function (index, val) {
                    htmlCity += "<li rgn=" + val[0] + "   rgnType='City'>" + val[1] + "</li>";
                });
                $("#cityUl").html(htmlCity);
            }
        }
    });
});
//获得县列表
$("#cityUl").on("click", "li", function () {
    $("#cityInput").val($(this).html());
    $("#cityInput").attr("rgn", $(this).attr("rgn"));
    $("#cityDiv").hide();//    无法实现父元素隐藏
    //===============
    $("#countyUl").html("<li rgn='0'   rgnType='County'>县</li>");
    $("#countyInput").val("县");
    $("#countyInput").attr("rgn", "0");
    var rgn = $(this).attr("rgn");
    $.ajax({
        url: httpUrl + "/api/method/cloud.cloud.doctype.region.region.list_child_region?",
        data: "rgn=" + rgn + "&type=county",
        success: function (data) {
            var m = data.message;
            var htmlCounty = "<li rgn='0'   rgnType='County'>县</li>";
            $.each(m, function (index, val) {
                htmlCounty += "<li rgn=" + val[0] + "  rgnType=County>" + val[1] + "</li>"
            });
            $("#countyUl").html(htmlCounty);
        }
    });
});
$("#countyUl").on("click", "li", function () {
    $("#countyInput").val($(this).html());
    $("#countyInput").attr("rgn", $(this).attr("rgn"));
    $("#countyDiv").hide();
});
$(".sta_stat>li").click(function () {
    $(".statInput").val($(this).html());
    $(".statInput").attr("state", $(this).attr("state"));

    $("#statDiv").hide(); //    无法实现父元素隐藏
});
//点击搜索按钮进行搜索
$("#beg_search").click(function () {
    conditionalQuery();
})

//条件查询
function conditionalQuery() {
    var provinceInput = $("#provinceInput").attr("rgn");
    var cityInput = $("#cityInput").attr("rgn");
    var countyInput = $("#countyInput").attr("rgn");
    var rgn = "";
    var rgn_type = "";
    if (provinceInput != "0") {
        rgn = provinceInput;
        rgn_type = "Province";
    }
    if (cityInput != "0") {
        rgn = cityInput;
        rgn_type = "City";
    }
    if (countyInput != "0") {
        rgn = countyInput;
        rgn_type = "County";
    }
    var code = $("#stat_code").val();
    var station_name = $("#baseName").val();
    var symlink_sn = $("#sn_caiji").val();
    var status = $(".statInput").attr("state");
    var page_length = 1000;
    var dataStr = "page_length=" + page_length;
    //基站编码
    if (code) {
        dataStr += "&code=" + code;
    }
    //数据采集器
    if (symlink_sn) {
        dataStr += "&symlink_sn=" + symlink_sn;
    }
    //状态
    if (status != "0") {
        dataStr += "&status=" + status;
    }
    //基站名称
    if (station_name) {
        dataStr += "&station_name=" + station_name;
    }
    //区域，省市县。
    if (rgn) {
        dataStr += "&rgn=" + rgn + "&rgn_type=" + rgn_type;
    }
    var url = httpUrl + "/api/method/tieta.tieta.doctype.cell_station.cell_station.list_station_info?";
    console.log("基站列表请求url===" + url);
    console.log("基站列表请求参数===" + dataStr);
    $.ajax({
        url: url,
        data: dataStr,
        success: function (r) {
            var data = r.message;
            var dttable = $('#stationTable').dataTable();
            dttable.fnClearTable(); //清空一下table
            dttable.fnDestroy(); //还原初始化了的datatable
            $('#stationTable').DataTable({
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
                "bFilter":
                    false,   //去掉搜索框方法二
                "bSort":
                    false,  //禁止排序
                "oLanguage": {
                    "sLengthMenu":
                        "每页显示 _MENU_",
                    "sZeroRecords":
                        "抱歉， 没有找到",
                    "sInfo":
                        "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                    "sInfoEmpty":
                        "没有数据",
                    "sInfoFiltered":
                        "数据表中共为 _MAX_ 条记录",
                    "emptyTable":
                        "无数据",
                    "aLengthMenu":
                        [10, 25, 50, -1],
                    "oPaginate": {
                        "sFirst":
                            "首页",
                        "sPrevious":
                            "上一页",
                        "sNext":
                            "下一页",
                        "sLast":
                            "尾页"
                    },
                    "sZeroRecords": "<p class='dataNull'>没有检索到数据</p>",

                }
            });
        }
    })
}


//导出基站列表excel 公共函数
var idTmr;

function getExplorer() {
    var explorer = window.navigator.userAgent;
    //ie
    if (explorer.indexOf("MSIE") >= 0) {
        return 'ie';
    }
    //firefox
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
    //Chrome
    else if (explorer.indexOf("Chrome") >= 0) {
        return 'Chrome';
    }
    //Opera
    else if (explorer.indexOf("Opera") >= 0) {
        return 'Opera';
    }
    //Safari
    else if (explorer.indexOf("Safari") >= 0) {
        return 'Safari';
    }
}

function method1(tableid) {//整个表格拷贝到EXCEL中
    if (getExplorer() == 'ie') {
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        //创建AX对象excel
        var oWB = oXL.Workbooks.Add();
        //获取workbook对象
        var xlsheet = oWB.Worksheets(1);
        //激活当前sheet
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        //把表格中的内容移到TextRange中
        sel.select();
        //全选TextRange中内容
        sel.execCommand("Copy");
        //复制TextRange中内容
        xlsheet.Paste();
        //粘贴到活动的EXCEL中
        oXL.Visible = true;
        //设置excel可见属性

        try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally {
            oWB.SaveAs(fname);

            oWB.Close(savechanges = false);
            //xls.visible = false;
            oXL.Quit();
            oXL = null;
            //结束excel进程，退出完成
            //window.setInterval("Cleanup();",1);
            idTmr = window.setInterval("Cleanup();", 1);

        }
    }
    else {
        tableToExcel(tableid)
    }
}

function Cleanup() {
    window.clearInterval(idTmr);
    CollectGarbage();
}

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="Content-Type" charset=utf-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g,
                function (m, p) {
                    return c[p];
                })
        }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
        window.location.href = uri + base64(format(template, ctx))
    }
})()


//=====================================================================================================




