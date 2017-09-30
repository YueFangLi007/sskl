navList("资源管理");
     // 百度地图API功能
    var map = new BMap.Map("map");
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 4);
    map.enableScrollWheelZoom();
    var myIcon2 = new BMap.Icon("tb1_0.png", new BMap.Size(30, 40));


    var data={"message":[{"code":"haidianqu","creation":"2017-09-14 17:41:39.630150","address_text":"\u5317\u4eac \u5317\u4eac \u897f\u57ce\u533a  ","doctype":"Cell Station","battery_setup_type":null,"owner":"1029153015@qq.com","work_current_uom":null,"modified_by":"1029153015@qq.com","station_type":"\u524a\u5cf0\u586b\u8c37","_user_tags":null,"latitude":"39.34","docstatus":0,"_liked_by":null,"description":"\u5173\u4e8e\u6d77\u6dc0\u533a\u7684\u57fa\u7ad9\u7684\u6d4b\u8bd5\u672c\u5730\u865a\u62df\u673a\u6d4b\u8bd5","parent":null,"setup_type":"\u673a\u67b6\u5b89\u88c5","work_current":0.0,"_assign":null,"setup_time":"2017-09-14","station_name":"\u6d77\u6dc0\u533a\u57fa\u7ad9","power_level":"\u4e00\u7c7b","_comments":null,"name":"CELL00000003","idx":0,"enabled":1,"modified":"2017-09-14 17:41:45.811343","longitude":"116.23","project":"PRJ-00001","parenttype":null,"parentfield":null},{"code":"djflkajdkl","creation":"2017-09-14 17:18:48.479504","address_text":"\u5317\u4eac \u5317\u4eac \u897f\u57ce\u533a  \u77f3\u666f\u5c71\u6d4b\u8bd5","doctype":"Cell Station","battery_setup_type":null,"owner":"1029153015@qq.com","work_current_uom":null,"modified_by":"1029153015@qq.com","station_type":"\u524a\u5cf0\u586b\u8c37","_user_tags":null,"latitude":"39.9132659227","docstatus":0,"_liked_by":null,"description":"\u8fd9\u4e2a\u6d4b\u8bd5","parent":null,"setup_type":"\u673a\u67b6\u5b89\u88c5","work_current":0.0,"_assign":null,"setup_time":"2017-09-14","station_name":"\u77f3\u666f\u5c71\u57fa\u7ad9","power_level":"\u4e00\u7c7b","_comments":null,"name":"CELL00000002","idx":0,"enabled":1,"modified":"2017-09-14 17:18:48.479504","longitude":"116.1704600193","project":"PRJ-00001","parenttype":null,"parentfield":null},{"code":"BJ00001","creation":"2017-08-28 12:20:08.755531","address_text":"\u5317\u4eac \u5317\u4eac \u897f\u57ce\u533a  ","doctype":"Cell Station","battery_setup_type":null,"owner":"Administrator","work_current_uom":null,"modified_by":"Administrator","station_type":"\u524a\u5cf0\u586b\u8c37","_user_tags":null,"latitude":null,"docstatus":0,"_liked_by":null,"description":null,"parent":null,"setup_type":"\u673a\u67b6\u5b89\u88c5","work_current":0.0,"_assign":null,"setup_time":"2017-08-04","station_name":"\u5317\u4eac\u5929\u5b89\u95e8","power_level":"\u4e00\u7c7b","_comments":null,"name":"CELL00000001","idx":0,"enabled":1,"modified":"2017-08-28 12:20:08.755531","longitude":null,"project":"PRJ-00001","parenttype":null,"parentfield":null}]};
    var markers = new Array();

    $.each(data.message, function(i, item) {
        var point = new BMap.Point(item.longitude, item.latitude);
        var marker = new BMap.Marker(point);
//        var myIcon = new BMap.Icon("4.jpg", new BMap.Size(32,32));
//        var marker = new BMap.Marker(point,{icon:myIcon});
        var content ="<div class='box' style='margin:0 0 5px;padding:3px;'><h3>"+ item.station_name+"<a href='' class='det'> 详情》"+"</a></h3><p>地址:"+ item.address_text+"</p></div>";
//       var content =item.creation;
        addClickHandler(content, marker); //添加点击事件
        markers.push(marker);
    });

    //添加聚合效果。
    var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});
    var opts = {
        width : 250, // 信息窗口宽度
        height: 80, // 信息窗口高度
        //title : "信息窗口" ,  //信息窗口标题
        background:"red",
        enableMessage:true//设置允许信息窗发送短息
    };




    function addClickHandler(content,marker){
        marker.addEventListener("click",function(e){

            openInfo(content,e)

        }
        );
    }


    function openInfo(content,e){
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content,opts); // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    }