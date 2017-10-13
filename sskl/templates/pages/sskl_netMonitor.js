    $(function() {
        navList("网络监测");
        var url = "http://192.168.174.140:8000/api/method/tieta.tieta.doctype.cell_station.cell_station.search_station";
        var html = "";
        $.ajax({
            type: 'get',
            url: url,
            success: function (data) {
                var m = data.message;
               $.each(m, function (index, v) {
                html +=
                    '<tr onclick="netWorkDrop(\''+v.name+'\')">' +
                    '<td>' + v.code+ '</td>' +
                    '<td>' + v.station_name + '</td>' +
                    '<td>' + v.station_type + '</td>' +
                    '<td>' + v.address_text + '</td>' +
                    '<td>' + '' + '</td>' +
                    '<td>' + v.longitude + '</td>' +
                    '<td>' + v.latitude + '</td>' +
                    '<td>' + '' + '</td>' +
                    ' </tr>' ;
            });

                $(".table_list>table>tbody").append(html);
            },
            error: function () {
                $(".table_list>table>tbody").html("没有查到数据");
            }
        });
//省||市的选择
        sheng_shoose();
    });
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
            //    分页代码开始
                var size=pagetotal;
                 $("#page").paging({
                    pageNo:1,
                    maxentries :pagetotal,
                    totalPage: 77,
                     size:1,
                     count:4,
                     hasFirstPage: true,//whether has first button
                     total:pagetotal,
                     nowPage: 1, //当前页数
                    // // allPages: Math.ceil(data.count / 6), // 所有页（由传入的数据决定）
                     displayPage: 7,  // 分页列表显示的个数
                      callback:function(page,size,count){
                        //
                        var count=pagetotal;
                       alert('当前第 ' +page +'页,每页 '+size+'条,总页数：'+count+'页')
                       }
                     });
            //    分页代码结束
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




    //
    //

