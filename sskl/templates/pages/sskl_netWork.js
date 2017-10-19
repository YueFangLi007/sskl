$(function () {
    navList("网络监测");
    //电池组展示
    batteryPack();
    //温度显示
    temperature();
    //总电压 的图表展示图
    bet_zong();
    //SOC展示图表
    batteryCapacity();
//    电流展示图
    electrical();
});

var httpUrl = "";
var sn = $("#gateWay").html(); //得到页面上的网关号码

var vsn = "9CC0D7DC-6A27F34A-B295E231-A5E2FDF6_C1_B2";

//电池组展示
function batteryPack() {
    //得到页面上的网关号
    $.ajax({
        url: httpUrl + "/api/method/iot.hdb.iot_device_data?",
        data: "sn=" + sn + "&vsn=" + vsn,
        datatype: "json",
        success: function (data) {
            //把电池组数据放入缓存
            sessionStorage["batteryData"] = JSON.stringify(data.message);
            //单体电池组列表展示
            var m = data.message;
            //console.log(m);
            var totalZu = parseInt(m.P04.PV);
            var html = "";
            for (var i = 1; i < totalZu + 1; i++) {
                html += "<tr class='betGroupTr'  betGroupId='" + i + "'><td>" + "0" + i + "</td><td>" + Number(m["G" + i + ".V"]['PV']).toFixed(2) + "</td><td>" + m["G" + i + ".I"]['PV'] + "</td></tr>";
            }
            $(".groups").append(html);

            //初始化function
            initFun();
        }
    });

}

//初始化function
function initFun() {
    $(".groups>tbody>tr:first-of-type").addClass("volGroup");
    $(".betGroupTr").click(function () {
        $(this).addClass("volGroup").siblings().removeClass("volGroup");
        var betGroupId = $(this).attr("betGroupId");
        var batteryData = JSON.parse(sessionStorage["batteryData"]);

        vol(batteryData, betGroupId);


    });

    //电压显示图标
    var batteryData = JSON.parse(sessionStorage["batteryData"]);
    vol(batteryData, "1");
}

function vol(obj, groupId) {
    // var groupId = "1";
    var dyValue = [];
    var seachKey = "G" + groupId + ".V0";
    for (var key in obj) {
        if (key.indexOf(seachKey) > -1) {
            dyValue.push(Number(obj[key]["PV"]));
        }
    }
    var chart = Highcharts.chart('dianyaVol', {
        title: {
            text: null
        },
        xAxis: {
            categories: ['1', '2', '3', '4']
        },
        yAxis: {
            title: {
                text: null
            }
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            location.href = "https://www.baidu.com/";
                        }
                    }
                }
            }
        },
        series: [{
            name: "电压",
            type: 'column',
            colorByPoint: true,
            data: dyValue,
            showInLegend: false,
        }],
        //颜色设置；
        credits: {
            enabled: false
            //去除版权信息。
        }
    });
    $('#plain').click(function () {
        chart.update({
            chart: {
                inverted: false,
                polar: false
            },
            subtitle: {
                text: null
            }
        });
    });
}

//温度加载

function temperature() {
    var url = httpUrl + "/api/method/iot.hdb.iot_device_his_data?";
    //var dataTem="sn=9CC0D7DC-6A27F34A-B295E231-A5E2FDF6&vsn=9CC0D7DC-6A27F34A-B295E231-A5E2FDF6_C1_B2&condition=aa=%27g1.x01%27+AND+time+%3E=+%272017-10-12T00:00:00.000Z%27+AND+time+%3C=+%272017-10-12T10:00:00.000Z%27+limit+10000;";
    var condition="g1.x01";
    var startTime="2017-10-12T00:00:00.000Z";
    //获得现在的时间
    var nowTime=new Date();

    console.log(nowTime);
    var endTime="2017-10-12T10:00:00.000Z";

    var dataTem="sn="+sn+"&vsn="+vsn+"&condition=aa=%27"+condition+"%27+AND+time+%3E=+%27"+startTime+"%27+AND+time+%3C=+%27"+ endTime+"%27+limit+10000;";
    var temperatureArr = [];
    $.ajax({
        url: url,
        data:dataTem,
        datatype: "json",
        success: function (data) {
            var values = data.message[0].series[0].values;
            var valuesLength = values.length;
            var tempFre = Math.floor(valuesLength / 24);
            $.each(values, function (i, v) {
                if ((i + 1) % tempFre == 0) {
                    temperatureArr.push(v[4]);
                }
            })
            //console.log("temperatureArr=11=" +temperatureArr);
            temperatureChart(temperatureArr);
        }
    });

}

//温度图表
function temperatureChart(obj) {
    var chart = new Highcharts.Chart('temperature', {
        title: {
            text: null
        },
        credits: {
            enabled: false
            //去除版权信息。
        },
        xAxis: {
            categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
        },
        yAxis: {
            title: {
                text: null
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: "温度1",
            data: obj
        }]
    });
}


function bet_zong() {
    var url = httpUrl + "/api/method/iot.hdb.iot_device_his_data?sn=9CC0D7DC-6A27F34A-B295E231-A5E2FDF6&vsn=9CC0D7DC-6A27F34A-B295E231-A5E2FDF6_C1_B2&condition=aa=%27g1.v01%27+AND+time+%3E=+%272017-10-12T00:00:00.000Z%27+AND+time+%3C=+%272017-10-12T10:00:00.000Z%27+limit+10000";
    var voltageArr = [];
    $.ajax({
        url: url,
        datatype: "json",
        success: function (data) {
            var values = data.message[0].series[0].values;
            var valuesLength = values.length;
            var tempFre = Math.floor(valuesLength / 24);
            $.each(values, function (i, v) {
                if ((i + 1) % tempFre == 0) {
                    voltageArr.push(v[3]);
                }
            })
            //console.log("VoltageArr====" +voltageArr);
            voltageChart(voltageArr);
        }
    });
}

//总电压图表展示
function voltageChart(data) {
    $('#bet_zong').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: null
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
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            name: '总电压',
            data: data
        }]
    });
}

/*------------------------------------------------------------------------------------*/

//soc 电池剩余容量
function batteryCapacity() {
    var url = httpUrl + "/api/method/iot.hdb.iot_device_his_data?sn=9CC0D7DC-6A27F34A-B295E231-A5E2FDF6&vsn=9CC0D7DC-6A27F34A-B295E231-A5E2FDF6_C1_B2&condition=aa=%27g1.z01%27+AND+time+%3E=+%272017-10-12T00:00:00.000Z%27+AND+time+%3C=+%272017-10-12T10:00:00.000Z%27+limit+10000";
    var batteryCapacityArr = [];
    $.ajax({
        url: url,
        datatype: "json",
        success: function (data) {
            var values = data.message[0].series[0].values;
            var valuesLength = values.length;
            var tempFre = Math.floor(valuesLength / 24);
            $.each(values, function (i, v) {
                if ((i + 1) % tempFre == 0) {
                    batteryCapacityArr.push(v[3]);
                }
            })
            // console.log("batteryCapacityArr====" +batteryCapacityArr);
            batteryCapacityChart(batteryCapacityArr);
        }
    });

}

function batteryCapacityChart(data) {
    console.log("=======================" + data);
    $('#soc').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
            //去除版权信息。
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
        yAxis: {
            title: {
                text: null
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

        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            data: data
        }],
        plotOptions: {
            area: {
                color: '#fddad0',

            }
        }

    });
}


//单体充放电电流展示图
function electrical() {
    var url = httpUrl + "/api/method/iot.hdb.iot_device_his_data?sn=9CC0D7DC-6A27F34A-B295E231-A5E2FDF6&vsn=9CC0D7DC-6A27F34A-B295E231-A5E2FDF6_C1_B2&condition=aa=%27g1.i%27+AND+time+%3E=+%272017-10-12T00:00:00.000Z%27+AND+time+%3C=+%272017-10-12T10:00:00.000Z%27+limit+10000";
    var electricalArr = [];
    $.ajax({
        url: url,
        datatype: "json",
        success: function (data) {
            var values = data.message[0].series[0].values;
            var valuesLength = values.length;
            var eleFre = Math.floor(valuesLength / 24);
            $.each(values, function (i, v) {
                if ((i + 1) % eleFre == 0) {
                    electricalArr.push(v[3]);
                }
            })
            // console.log("electricalArr====" +electricalArr);
            currentChart(electricalArr);
        }
    });


}

function currentChart(obj) {
    var chart = new Highcharts.Chart('electrical', {
        title: {
            text: null
        },
        credits: {
            enabled: false
            //去除版权信息。
        },
        xAxis: {
            categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
        },
        yAxis: {
            title: {
                text: null
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: "电流",
            data: obj
        }]
    });
}

