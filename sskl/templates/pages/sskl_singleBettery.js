$(function () {
    navList("网络监测");
    totalBettery();
    var groupId = GetQueryString("groupId");
    console.log(groupId);

});
    var sn=sessionStorage.getItem("sn");
    var vsn=sessionStorage.getItem("vsn");
    var objId=sessionStorage.getItem("objId");
    var condition = "g"+objId+".v01";
$(".btn_search").click(function () {
    totalBettery();
});

//datepikr插件
var logic = function (currentDateTime) {
    if (currentDateTime.getDay() == 6) {
        this.setOptions({
            minTime: '11:00'
        });
    } else
        this.setOptions({
            minTime: '8:00'
        });
};
$('.startTime').datetimepicker({
    onChangeDateTime: logic,
    onShow: logic
});
$('.endTime').datetimepicker({
    onChangeDateTime: logic,
    onShow: logic
});

function totalBettery() {
    var httpUrl = "http://192.168.174.140/api/method/iot.hdb.iot_device_his_data?";
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    startTime = new Date(Date.parse(startTime)).Format("yyyy-MM-ddThh:mm:ss.SZ");
    endTime = new Date(Date.parse(endTime)).Format("yyyy-MM-ddThh:mm:ss.SZ");
    console.log(startTime);
    console.log(endTime);
    var voltageArr = [];
    $.ajax({
        url: httpUrl,
        data: "sn=" + sn + "&vsn=" + vsn + "&condition=aa=%27" + condition + "%27+AND+time+%3E=+%27" + startTime + "%27+AND+time+%3C=+%27" + endTime + "%27+limit+10000",
        // data: "sn="+sn+"&vsn="+vsn+"&condition=aa=%27g1.x01%27+AND+time+%3E=+%272017-10-13T09:00:00.000Z%27+AND+time+%3C=+%272017-10-13T10:00:00.000Z%27+limit+10000",
        success: function (data) {
            // console.log(data);
            var values = data.message[0].series[0].values;
            var valuesLength = values.length;
            var tempFre = Math.floor(valuesLength / 24);
            $.each(values, function (i, v) {
                if ((i + 1) % tempFre == 0) {
                    voltageArr.push(v[3]);
                }
            })
            console.log("VoltageArr====" + voltageArr);
            totalBetteryChart(voltageArr);
        }
    });
}

//d单体电压展示图
function totalBetteryChart(data) {
    $('.total_box_rec').highcharts({
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

