$(function(){
    navList("网络监测")
    totalVol();//总电压展示
    singleBattery();//单体电池电压
    SOC();//SOC展示
    temperature();//温度展示
    electricCurrent();//单体放电电流
});

//总电压图表展示

function totalVol(){
    $.getJSON('https://data.jianshukeji.com/jsonp?filename=json/usdeur.json&callback=?', function (data) {
        $('#totalVol').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: null
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
//单体电压展示图

function singleBattery(){
     var chart = Highcharts.chart('singleBattery', {
        chart: {
            type: 'column'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16']
        },
        yAxis: {
            labels: {
                x: -15
            },
            title: {
                text: null
            }
        },
        series: [{
            name: '电压',
            color:'#00cb87',//配置图表显示的颜色
            data: [434, 523, 345, 785, 565, 843, 726, 590, 665, 434, 312, 432,124,222,33,66]
        }],
       legend: {
            enabled: false
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                // Make the labels less space demanding on mobile
                chartOptions: {
                    xAxis: {
                        labels: {
                            formatter: function () {
                                return this.value.replace('月', '')
                            }
                        }
                    },

                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -2
                        },
                        title: {
                            text: ''
                        }
                    }
                }
            }]
        }
    });
}
//SOC展示图
function SOC(){
    $.getJSON('https://data.jianshukeji.com/jsonp?filename=json/usdeur.json&callback=?', function (data) {
        $('#soc').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: null
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
                color:"#05cc89",
                fillColor:"#64dfb6",
                type: 'area',
                name: '电压',
                data: data
            }]
        });
    });
}
//温度展示图

function temperature(){
        var chart = new Highcharts.Chart('temperature', {
        title: {
            text: null,
            x: -20
        },
        subtitle: {
            text: null,
            x: -20
        },
        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23','24']
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
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            enabled: false
        },
        series: [{
            name: '单体1',
            marker:{//线上数据点
                    radius:0,
                    lineWidth:0,
                    lineColor:'#fba845',
                    fillColor:'#fba845',
                    states:{
                        hover:{
                            enabled:false
                        }
                    }
                },
            color:"#5486f2",
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,7.0, 6.9, 9.5, 14.5, 18.2,24.1, 20.1, 14.1, 8.6, 2.5 ]
        }, {
            name: '单体2',
            marker:{//线上数据点
                    radius:0,
                    lineWidth:0,
                    lineColor:'#fba845',
                    fillColor:'#fba845',
                    states:{
                        hover:{
                            enabled:false
                        }
                    }
                } ,//设置曲线上面没有原点显示，
            color:"#eb8267",
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5,25.2, 26.5, 23.3, 18.3, 13.9, 9.6,7.0, 6.9, 9.5, 14.5,18.3, 13.9]
        }, {
            marker:{//线上数据点
                    radius:0,
                    lineWidth:0,
                    lineColor:'#fba845',
                    fillColor:'#fba845',
                    states:{
                        hover:{
                            enabled:false
                        }
                    }
                },
            name: '单体3',
            color:"#fa7095",
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0,-0.2,3.9,-8.8,-5.6,0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3]
        }, {
            marker:{//线上数据点
                    radius:0,
                    lineWidth:0,
                    lineColor:'#fba845',
                    fillColor:'#fba845',
                    states:{
                        hover:{
                            enabled:false
                        }
                    }
                } ,
            name: '单体4',
            color:"#08cd8b",
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5,25.2]
        }]
    });
}
//单体放电电流
function electricCurrent(){
 Highcharts.setOptions({
        // chart: {
        //     style: {
        //         fontFamily: 'serif'
        //     }
        // }
    });
    $('#electricCurrent').highcharts({
        title:null,
        xAxis: {
             title: null,
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23','24']
        },
         yAxis: {
            title:null
        },
        series: [{
            color:"#10ce8f",
            marker:{//线上数据点
                    radius:0,
                    lineWidth:0,
                    lineColor:'#fba845',
                    fillColor:'#fba845',
                    states:{
                        hover:{
                            enabled:false
                        }
                    }
                },
            name:"电流",
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0, 13.5, 17.0, 18.6]
        }]
    });
}

