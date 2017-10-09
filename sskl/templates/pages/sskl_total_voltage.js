navList("网络监测");
var logic = function( currentDateTime ){
    if( currentDateTime.getDay()==6 ){
        this.setOptions({
            minTime:'11:00'
        });
    }else
        this.setOptions({
            minTime:'8:00'
        });
};
$('.startTime').datetimepicker({
    onChangeDateTime:logic,
    onShow:logic
});
$('.endTime').datetimepicker({
    onChangeDateTime:logic,
    onShow:logic
});
