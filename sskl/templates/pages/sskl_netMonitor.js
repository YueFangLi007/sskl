$(function() {
   // $('#table').dataTable();
    navList("网络监测");
    tableAA();

//省||市的选择
//         sheng_shoose();
});

//表格加载
function tableAA(){
     $.ajax({
            url: "http://192.168.174.140:8000/api/method/tieta.tieta.doctype.cell_station.cell_station.search_station",
            success: function (r) {
                var data=r.message;

                $('#table').DataTable( {
                     data:data,
                     scrollY: 400,
                     columns: [
                                { data: 'code' },
                                { data: 'station_name' },
                                { data: 'station_type' },
                                { data: 'address_text' },
                                { data: 'name' },
                                { data: 'longitude' },
                                { data: 'latitude' },
                                { data: 'modified' }
                     ],
                    "aoColumns" : [ {
                                "mDataProp" : "code",
                                "sTitle" : "用户名",
                                "sDefaultContent" : "",
                                "sClass" : "center"
                            }, {
                                "mDataProp" : "station_name",
                            "sTitle" : "电子邮箱",
                            "sDefaultContent" : "",
                            "sClass" : "center"
                        }, {
                            "mDataProp" : "station_type",
                            "sTitle" : "手机",
                            "sDefaultContent" : "",
                            "sClass" : "center"
                        }, {
                            "mDataProp" : "address_text",
                            "sTitle" : "座机",
                            "sDefaultContent" : "",
                            "sClass" : "center"
                        }, {
                            "mDataProp" : "name",
                            "sTitle" : "姓名",
                            "sDefaultContent" : "",
                            "sClass" : "center"
                        }, {
                            "mDataProp" : "longitude",
                            "sTitle" : "用户权限",
                            "sDefaultContent" : "",
                            "sClass" : "center"
                        }, {
                            "mDataProp" : "latitude",
                            "sTitle" : "用户权限",
                            "sDefaultContent" : "",
                            "sClass" : "center"
                        }, {
                            "mDataProp" : "modified",
                            "sTitle" : "用户权限",
                            "sDefaultContent" : "",
                            "sClass" : "center"
                        }],
                 });
            }
     });

}







//跳转函数
    function netWorkDrop(code){
        location.href="sskl_netWork.html?code="+code;
    }



    $(".searchs >span").click(function(e){
        $(this).children("div").show();
    });
    //获得省的列表后进行获得市的列表
    function sheng_shoose(){
        console.log(11);
        var url1="http://192.168.174.140:8000/api/method/cloud.cloud.doctype.region.region.list_region";
       $.ajax({
            url:url1,
            success:function(data){
                var m=data.message;
                var html="";
                var pagetotal=0;
                $.each(m,function(index,val){
                   pagetotal=m.length-1;
                    html+="<li title="+val[0]+">"+ val[1] +"</li>";
                });
                console.log("pagetotal   "+pagetotal);
                $("#sheng_ul").html(html);

            }
       });
    };

    $("#sheng_ul").on("click","li",function() {
        var shi = $(this).attr("title");
        $.ajax({
            url: "http://192.168.174.140:8000/api/method/cloud.cloud.doctype.region.region.list_child_region?",
            data: "rgn" + "=" + shi + "&type=city",
            success: function (data) {
                console.log(data);
                var shi = data.message;
                var html = "";
                $.each(shi, function (index, val) {
                    html += "<li title=" + val[0] + ">" + val[1] + "</li>"
                });
                console.log(1);
                $("#city_ul").append(html);
            }
        });
    });

   /* //点击搜索按钮进行搜索
    $("#beg_search").click(){

        var rgn=$("#sheng_input").val()|| $("#shi_input").val()||$("#xian_input").val();
        if(){

        }
        var rgn_type=;
        var code= $("#stat_code").val();
        var station_name=;
        var symlink_sn=$("#sn_caiji").val();

        var status=$("#");
        var page_length= ;

        var url="http://192.168.174.140:8000/api/method/tieta.tieta.doctype.cell_station.cell_station.list_station_info?";
        $.ajax({
            url:url,
            data:"rgn="+ +"&rgn_type="+ +"&code="+ +"&station_name="+ +"&symlink_sn="+ +"&status="+ +"&page_length="+   ;,
            success:function(r){
                var message=r.message;




            }

        });


    }*/




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


