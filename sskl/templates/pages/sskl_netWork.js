navList("网络监测");
$(function () {
   vol();
});
function vol(){
    var chart = Highcharts.chart('dianyaVol', {
        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16']
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            console.log(this.options.key);
                            location.href = "https://www.baidu.com/";

                        }
                    }
                }
            }
        },
        series: [{
            name:"电压",
            type: 'column',
            colorByPoint: true,
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4,44,56,67,78],
            showInLegend: false,

        }],

        colors: ['#492970', '#0d233a', '#8bbc21', '#910000', '#1aadce',
            '#492970', '#f28f43', '#77a1e5', '#c42525', '#492970','#492970', '#0d233a', '#8bbc21', '#910000', '#1aadce','#492970'],
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
                text: '普通的'
            }
        });
    });
}