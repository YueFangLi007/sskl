$(function(){
    var url="http://192.168.174.140:8000/api/method/tieta.tieta.doctype.cell_station.cell_station.search_station";
    var html="";
    $.ajax({
      type: 'get',
      url: url,
      success: function(data){
          var m=data.message;
          $.each(m,function(index,v){
              html+=
             "<tr>"+
                  "<td>"+ v.code+"</td>"+
                  "<td>"+v.station_name+"</td>"+
                  "<td>"+v.station_type+"</td>"+
                  "<td>"+v.address_text+"</td>"+
                  "<td>"+"网关地址"+"</td>"+
                  "<td>"+v.longitude +"</td>"+
                  "<td>"+ v.latitude+"</td>"+
                  "<td>"+"正常" +"</td>"+
                  " </tr>"
            ;
          });
          $(".table_list>table>tbody").append(html);
      },
        error:function(){
          $(".table_list>table>tbody").html("无数据");
        }
    });

});
navList("网络监测");

$(".tabstation >tbody tr").click(function(){
    location.href="sskl_netWork.html";
});
$(".pageinput").click(function(){
    var LiChd=$(this).siblings(".page-num_pages");
    LiChd.show();
    LiChd.children("li").each(function(){
        if($(this).html()==$(".pageinput").val()){
            $(this).addClass("page_hover").siblings("li").removeClass("page_hover");
        }
    });

    LiChd.children("li").click(function(){
       $(".pageinput").val( $(this).html());
        LiChd.hide();
    });
       LiChd.children("li").hover(function(){
        $(this).addClass("page_hover").siblings("li").removeClass("page_hover");
    });

});
$(".statinput").click(function(){
    $(this).children("div").show();
});
$('.searchs>span').click(function(){
    var $chooseDiv=$(this).children("div");
    $chooseDiv.css("display","block");
});
$("#page").paging({
			pageNo:1,
			totalPage: 60,
            // nowPage: 1, // 当前显示页
            // allPages: Math.ceil(data.count / 6), // 所有页（由传入的数据决定）
            displayPage: 7  // 分页列表显示的个数

});
