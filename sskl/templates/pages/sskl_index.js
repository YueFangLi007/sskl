navList("资源管理");
    var map = new BMap.Map("map",{enableMapClick: false});
	map.centerAndZoom("北京市", 5);
	map.enableScrollWheelZoom();

	var opts = {
		width : 260,     // 信息窗口宽度
		height: 88,     // 信息窗口高度
		//title : "设备信息" , // 信息窗口标题
		enableMessage:true//设置允许信息窗发送短息
	};

	function addClickHandler(content,marker){
		marker.addEventListener("click",function(e){
			openInfo(content,e)}
		);
	}
	function openInfo(content,e){
		var p = e.target;
		var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
		map.openInfoWindow(infoWindow,point); //开启信息窗口
	}



$(function(){
	$('#map').height(parseInt($(window).height()));
	$(window).resize(function() {
	  $('#map').height(parseInt($(window).height()));
	});
    var dataurl = "http://192.168.174.140:8000/api/method/tieta.tieta.doctype.cell_station.cell_station.search_station?page_length=9999";
    $.ajax({url:dataurl,async:true,success:function(r){
        //################################################

        if(r.message.length){
            var markers = [];
            var stations = r.message;
            for (var cs in stations) {
                pt = new BMap.Point(stations[cs].longitude, stations[cs].latitude);
                var myIcon = new BMap.Icon("/assets/sskl/images/jizhan.png", new BMap.Size(32,38));
                var marker = new BMap.Marker(pt,{icon:myIcon});
                // var gourl = "/iot_devinfo/" + stations[cs].device_sn;

                var content =
				'<div class="widget-box">'+
					'<h4 class="widget-title">'+ stations[cs].station_name +'</h4>' +
					'<p> 地&nbsp;&nbsp;&nbsp;址:'+ stations[cs].address_text +'</p>'+
					 '<p> 联系人:XXX</p>'+'<a href="sskl_netWork.html?code=\''+stations[cs].code+'\'">详情</a>'+
				'</div>';


                 addClickHandler(content, marker)
                   markers.push(marker);
            }
            //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
            var markerClusterer = new BMapLib.MarkerClusterer(map, {markers: markers})

        }


        //################################################

            }});
        });



