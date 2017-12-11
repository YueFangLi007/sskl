$(function () {
    pageInit();
});

function pageInit() {
    jQuery("#lista1").jqGrid({
        // url:ctx+'/JSONData',
        url: 'data/JSONData.json',//组件创建完成之后请求数据的url
        datatype: "json",
        height:"100%",
        colNames: ['标题内容', '提交时间'],
        colModel: [
            {name: 'id', index: 'id'},
            {name: 'invdate', index: 'invdate'}
        ],

        rowNum: 10,
        autowidth: true, //自动宽度  也就是为百分百展示
        // rownumbers: true,
        rowList: [10, 20, 30],
        pager: '#pagera1',
        // sortname: 'id',
        viewrecords: true,
        multiselect: true,
        sortorder: "desc",
        overflowX:true
    })
        // .ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default

    jQuery("#lista1").jqGrid('navGrid', '#pagera1', {edit: false, add: false, del: false});


    //添加按钮
    jQuery("#lista1")
        .navGrid('#pagera1',{edit:false,add:false,del:false,search:false})

        .navButtonAdd('#pagera1',{

            caption:'<button class="btn">分页</button>',

            // buttonicon:"ui-icon-add",

            onClickButton: function(){

                alert("Adding Row");

            },

            position:"last"

        })

        .navButtonAdd('#pagera1',{



            caption:'<button class="btn">标记为已读</button>',

            // buttonicon:"ui-icon-del",

            onClickButton: function(){

                alert("Deleting Row");

            },

            position:"last"

        })
        .navButtonAdd('#pagera1',{

            // caption:"<button class='btn'  onclick='javascript:method1("stationTable")'>导出</button>",
            caption:'<button class="btn">导出 <u>Excel</u></button>',
            // buttonicon:"ui-icon-del",

            onClickButton: function(){
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
                    console.log(tableid);
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
                method1(lista1);


            },

            position:"last"

        })

}




//跳转函数
function netWorkDrop(code) {
    location.href = "sskl_netWork.html?code=" + code;
}
