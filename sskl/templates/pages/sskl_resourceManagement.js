navList("网络监测");


$(function () {
    tableList();
    province();
});

//表格加载

function tableList() {
    $.ajax({
        url: httpUrl + "/api/method/tieta.tieta.doctype.cell_station.cell_station.search_station",
        success: function (r) {
            var data = r.message;
            console.log(data + "=========");
            $('#stationsTable').DataTable({
                data: data,
                // "dom": '<"top"i>rt<"bottom"flp><"clear">',
                "scrollY": "500px",
                paging: true,//分页
                // ordering: true,//是否启用排序
                columns: [
                    {data: 'code'},
                    {data: 'station_name'},
                    {data: 'station_type'},
                    {data: 'address_text'},
                    {data: 'name'},
                    {data: 'longitude'},
                    {data: 'latitude'},
                    {data: 'power_level'}
                ],
                "bFilter": false,   //去掉搜索框方法二
                "bSort": false,  //禁止排序
                ordering: false,

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
            var faultState = $("#stationsTable>tbody td:last-child");
            if (faultState.html() == "故障") {
                faultState.addClass("state_err");
            }
            ;

            // console.log(adressState.html());

            $("#stationsTable>tbody").on("click", "tr", function () {
                var code = $(this).children("td:nth-child(5)").html();
                location.href = httpUrl + "/sskl_netWork.html?code=" + code;
            });
        }
    });
}

function province() {
    var url1 = httpUrl + "/api/method/cloud.cloud.doctype.region.region.list_region";
    $.ajax({
        url: url1,
        success: function (data) {
            var m = data.message;
            var htmlProvice = "<option value='0'>省/直辖市</option>";
            $.each(m, function (index, val) {
                htmlProvice += "<option value=" + val[0] + ">" + val[1] + "</option>";
            });
            $("#provinceSel").html(htmlProvice);

        }
    });
}

//获取市列表
$("#provinceSel").change(function () {
    var rgn = $("#provinceSel option:selected").val();
    console.log("rgn =======" + rgn);
    if (rgn == 0) {
        alert("请选择省！");
        return;
    } else {
        var url = httpUrl + "/api/method/cloud.cloud.doctype.region.region.list_child_region?";
        $.ajax({
            url: url,
            data: "rgn=" + rgn + "&type=city",
            success: function (data) {
                var m = data.message;
                if (m) {
                    var htmlCity = "<option value='0'   rgnType='City'>城市</option>";
                    $.each(m, function (index, val) {
                        htmlCity += "<option value=" + val[0] + "   rgnType='City'>" + val[1] + "</option>";
                    });
                    $("#citySel").html(htmlCity);
                }
            }
        });
    }
});
//市列表有个小的bug
$("#citySel").change(function () {
    var rgn = $("#citySel option:selected").val();
    if (rgn == 0) {
        alert("请选择省！");
        return;
    }
    var url = httpUrl + "/api/method/cloud.cloud.doctype.region.region.list_child_region?";
    $.ajax({
        url: url,
        data: "rgn=" + rgn + "&type=county",
        success: function (data) {
            var m = data.message;
            if (m) {
                var htmlCity = "<option value='0'   rgnType='City'>城市</option>";
                $.each(m, function (index, val) {
                    htmlCity += "<option value=" + val[0] + "   rgnType='City'>" + val[1] + "</option>";
                });
                $("#countySel").html(htmlCity);
            }
        }
    });

});

$("#conditionBtn").click(function(){
    conditionalQuery();
});

$("#stationSearch").click(function(){
   StationNameQuery();

});
//按照基站名称查询
function StationNameQuery() {
    var page_length = 1000;
    var station_name = $("#stationName").val();
    var url ="http://192.168.174.140/api/method/tieta.tieta.doctype.cell_station.cell_station.list_station_info?";
    $.ajax({
        url: url,
       data:"station_name="+station_name,
        success: function (r) {
            console.log(r);
            var data = r.message;
            var dttable = $('#stationsTable').dataTable();
            dttable.fnClearTable(); //清空一下table
            dttable.fnDestroy(); //还原初始化了的datatable
            $('#stationsTable').DataTable({
                data: data,
                // "scrollY": "100px",
                scrollCollapse: true,
                columns: [
                    {data: 'code'},
                    {data: 'station_name'},
                    {data: 'station_type'},
                    {data: 'address_text'},
                    {data: 'name'},
                    {data: 'longitude'},
                    {data: 'latitude'},
                    {data: 'power_level'}
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
                        "共有_PAGES_ 页，共_MAX_ 条 ",
                    "sInfoEmpty":
                        "没有数据",
                    "sInfoFiltered":
                        "数据表中共为 _MAX_ 条记录",
                    "emptyTable":
                        "无数据",
                    "oPaginate": {
                        "sFirst":
                            "首页",
                        "sPrevious":
                            "上一页",
                        "sNext":
                            "下一页",
                        "sLast":
                            "尾页"
                    }

                }
            });
        }
    })
}



//多个条件查询============
function conditionalQuery() {
    var provinceSel = $("#provinceSel option:selected").val();
    // console.log("provinceSel"+provinceSel);
    var citySel = $("#citySel option:selected").val();
    var countySel = $("#countySel option:selected").val();
    var rgn = "";
    var rgn_type = "";
    if (provinceSel != "0") {
        rgn = provinceSel;
        rgn_type = "Province";
    }
    if (citySel != "0") {
        rgn = citySel;
        rgn_type = "City";
    }
    if (countySel != "0") {
        rgn = countySel;
        rgn_type = "County";
    }
    var code = $("#stationCode").val();
    // var station_name = $("#baseName").val();
    var symlink_sn = $("#symlink_sn").val();
    var status = $("#status option:selected").val();
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
    // //基站名称
    // if (station_name) {
    //     dataStr += "&station_name=" + station_name;
    // }
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
            var dttable = $('#stationsTable').dataTable();
            dttable.fnClearTable(); //清空一下table
            dttable.fnDestroy(); //还原初始化了的datatable
            $('#stationsTable').DataTable({
                data: data,
                // "scrollY": "100px",
                scrollCollapse: true,
                columns: [
                    {data: 'code'},
                    {data: 'station_name'},
                    {data: 'station_type'},
                    {data: 'address_text'},
                    {data: 'name'},
                    {data: 'longitude'},
                    {data: 'latitude'},
                    {data: 'power_level'}
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
                        "共有_PAGES_ 页，共_MAX_ 条 ",
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
                    }

                }
            });
        }
    })
}
