
//点击实现tab页面切换
//表格加载
sysTableList();
function sysTableList() {
    $.ajax({
        url: httpUrl + "/api/method/tieta.tieta.doctype.cell_station.cell_station.search_station",
        success: function (r) {
            var data = r.message;
            $('#sysTemTable').DataTable({
                data: data,
                paging: true,//分页
                ordering: true,//是否启用排序
                columns: [
                    // {data: "<input type='checkbox'></td>"},
                    {data: 'code'},
                    {data: 'station_name'}
                ],
                "bFilter": false,   //去掉搜索框方法二
                "bSort": false,  //禁止排序
                language: {
                     // lengthMenu: '每页显示<select class="form-control input-xsmall">' + '<option value="10">10</option>' + '<option value="25">25</option>' + '<option value="75">75</option>' + '<option value="100">100</option>' + '</select>',//左上角的分页大小显示。
                     lengthMenu: "",
                    //去除每页显示的
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
