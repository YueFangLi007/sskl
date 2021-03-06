$(function () {
    navList("网络监测");
    // totalBettery();
    // var groupId = GetQueryString("groupId");
    // console.log(groupId);
    hisRecord();
});

laydate.render({
     elem: '#startTime', //指定元素
     type: 'datetime',
    theme: '#437af1'
});
laydate.render({
     elem: '#endTime',//指定元素
     type: 'datetime',
    theme: '#437af1'
});




// var sn = sessionStorage.getItem("sn");
// var vsn = sessionStorage.getItem("vsn");

// var objId = sessionStorage.getItem("objId");
// var condition = "g" + objId + ".v";
// $("#betZongID").html(objId);

//时间转换
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$("#hisSearchBtn").click(function () {

    hisRecord();
});


function hisRecord(){
    var httpUrl = "http://192.168.174.140/api/method/iot.hdb.iot_device_his_data?";
    var startTime=$("#startTime").val();
    var endTime=$("#endTime").val();
    startTime = new Date(Date.parse(startTime)).Format("yyyy-MM-ddThh:mm:ss.SZ");
    endTime = new Date(Date.parse(endTime)).Format("yyyy-MM-ddThh:mm:ss.SZ");
    // console.log(startTime);
    // console.log(endTime);
    //  var voltageArr = [];
    //  var timeArr=[];
//     $.ajax({
//         url: httpUrl,
//         data: "sn=" + sn + "&vsn=" + vsn + "&condition=aa=%27" + condition + "%27+AND+time+%3E=+%27" + startTime + "%27+AND+time+%3C=+%27" + endTime + "%27+limit+10000",
//         // data: "sn="+sn+"&vsn="+vsn+"&condition=aa=%27g1.x01%27+AND+time+%3E=+%272017-10-13T09:00:00.000Z%27+AND+time+%3C=+%272017-10-13T10:00:00.000Z%27+limit+10000",
//         success: function (data) {
//             // console.log(data);
//             var values = data.message[0].series[0].values;
//             var valuesLength = values.length;
//             var tempFre = Math.floor(valuesLength / 48);
//             $.each(values, function (i, v) {
//                 if ((i + 1) % tempFre == 0) {
//                     voltageArr.push(v[3]);
//                     timeArr.push(v[0].substring(5,10).replace("-","/"));
//                 }
//             })
//             console.log("VoltageArr====" + voltageArr);
//             console.log("dataArr"+timeArr);
//             totalBetteryChart(voltageArr,timeArr);
//         }
//     });
  $.getJSON('https://data.jianshukeji.com/jsonp?filename=json/usdeur.json&callback=?', function (data) {
        $('#hisCharts').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: null
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                '鼠标拖动可以进行缩放' : '手势操作进行缩放'
            },
            credits: {
                 enabled: false
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%m-%d',
                    week: '%m-%d',
                    month: '%Y-%m',
                    year: '%Y'
                }
            },
            tooltip: {
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%Y-%m-%d',
                    week: '%m-%d',
                    month: '%Y-%m',
                    year: '%Y'
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                 labels: {
                     format: '{value} V'
                 }
            },
            legend: {
                enabled: false
            },
            series: [{
                color:"#fb977a",
                fillColor:"#fbc1af",
                type: 'area',
                name: '电压',
                data: data
            }]
        });
    });
}



//时间转换
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}





// function hisRecord() {
//     var httpUrl = "http://192.168.174.140/api/method/iot.hdb.iot_device_his_data?";
//     var startTime = $("#startTime").val();
//     var endTime = $("#endTime").val();
//     startTime = new Date(Date.parse(startTime)).Format("yyyy-MM-ddThh:mm:ss.SZ");
//     endTime = new Date(Date.parse(endTime)).Format("yyyy-MM-ddThh:mm:ss.SZ");
//     console.log(startTime);
//     console.log(endTime);
//     var voltageArr = [];
//     var timeArr=[];
//     $.ajax({
//         url: httpUrl,
//         data: "sn=" + sn + "&vsn=" + vsn + "&condition=aa=%27" + condition + "%27+AND+time+%3E=+%27" + startTime + "%27+AND+time+%3C=+%27" + endTime + "%27+limit+10000",
//         // data: "sn="+sn+"&vsn="+vsn+"&condition=aa=%27g1.x01%27+AND+time+%3E=+%272017-10-13T09:00:00.000Z%27+AND+time+%3C=+%272017-10-13T10:00:00.000Z%27+limit+10000",
//         success: function (data) {
//             // console.log(data);
//             var values = data.message[0].series[0].values;
//             var valuesLength = values.length;
//             var tempFre = Math.floor(valuesLength / 48);
//             $.each(values, function (i, v) {
//                 if ((i + 1) % tempFre == 0) {
//                     voltageArr.push(v[3]);
//                     timeArr.push(v[0].substring(5,10).replace("-","/"));
//                 }
//             })
//             console.log("VoltageArr====" + voltageArr);
//             console.log("dataArr"+timeArr);
//             totalBetteryChart(voltageArr,timeArr);
//         }
//     });
// }
//
// //d单体电压展示图
// function totalBetteryChart(data,time) {
//     $('.hisCharts').highcharts({
//         global: {
//             useUTC: false
//         },
//         chart: {
//             zoomType: 'x'
//         },
//         title: {
//             text: null
//         },
//         xAxis: {
//             type: 'datetime',
//             categories:time,
//             dateTimeLabelFormats: {
//                 millisecond: '%H:%M:%S.%L',
//                 second: '%H:%M:%S',
//                 minute: '%H:%M',
//                 hour: '%H:%M',
//                 day: '%m-%d',
//                 week: '%m-%d',
//                 month: '%Y-%m',
//                 year: '%Y'
//             }
//         },
//         tooltip: {
//             dateTimeLabelFormats: {
//                 millisecond: '%H:%M:%S.%L',
//                 second: '%H:%M:%S',
//                 minute: '%H:%M',
//                 hour: '%H:%M',
//                 day: '%Y-%m-%d',
//                 week: '%m-%d',
//                 month: '%Y-%m',
//                 year: '%Y'
//             }
//         },
//         yAxis: {
//             title: {
//                 text: "单位(V)"
//             }
//
//         },
//         legend: {
//             enabled: false
//         },
//         plotOptions: {
//             area: {
//                 fillColor: {
//                     linearGradient: {
//                         x1: 0,
//                         y1: 0,
//                         x2: 0,
//                         y2: 1
//                     },
//                     stops: [
//                         [0, Highcharts.getOptions().colors[0]],
//                         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
//                     ]
//                 },
//                 marker: {
//                     radius: 2
//                 },
//                 lineWidth: 1,
//                 states: {
//                     hover: {
//                         lineWidth: 1
//                     }
//                 },
//                 threshold: null
//             }
//         },
//         series: [{
//             type: 'area',
//             name: '总电压',
//             data: data
//         }]
//     });
// }

