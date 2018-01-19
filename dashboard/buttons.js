var hiChart = document.getElementById("hiChart");
var agCount = document.getElementById("agCount");
var trackMap = document.getElementById("trackMap");
var r704 = document.getElementById("r704");
var r705 = document.getElementById("r705");
var r706 = document.getElementById("r706");
var rdo = document.getElementById("rdo");
var s1 = document.getElementById("s1");
var s2 = document.getElementById("s2");
var s3 = document.getElementById("s3");
var s4 = document.getElementById("s4");
var s5 = document.getElementById("s5");
function myPeopleCounter() {
    $('#graphBtn').hide();
    $('#occupancyBtn').hide();
    $('#utilizationBtn').hide();
    $('#OccAndUtilReportGraph').hide();
    $('#oCalendarBtn').hide();
    $('#in').show();
    $('#out').show();
    $('#inout').show();
    hiChart.style.display = "block";
    agCount.style.display = "none";
    trackMap.style.display = "none";
    r704.style.display = "none";
    r705.style.display = "none";
    r706.style.display = "block";
    rdo.style.display = "block";
    s1.style.display = "none";
    s2.style.display = "block";
    s3.style.display = "none";
    s4.style.display = "none";
    s5.style.display = "block";
    avgI.style.display = "block";
    avgID.style.display = "none"
    totalI.style.display = "block";
    avgO.style.display = "none";
    avgOD.style.display = "none";
    totalO.style.display = "block";
    avgIO.style.display = "none";
    totalIO.style.display = "block";
    avgIOD.style.display = "none";
    $('#ppc').addClass('active-tab');
    $('#agc').removeClass('active-tab');
    $('#trkMap').removeClass('active-tab');
    $('#occrptbtn').removeClass('active-tab');
    $('#inout').addClass('active');
    $('#occupancyBtn').hide();
    $('#utilizationBtn').hide();
    $('#txt-custom-cal').show();
    $('#calendar').hide();
    // $("hiChart").show();
    // $("agCount").hide();
    // $("trackMap").hide();
}

function myAgeCounter() {
    demoApi(calDate, calNextDate);
    $('#graphBtn').hide();
    $('#OccAndUtilReportGraph').hide();
    $('#oCalendarBtn').hide();
    $('#in').show();
    $('#out').show();
    $('#inout').show();
    hiChart.style.display = "none";
    agCount.style.display = "block";
    trackMap.style.display = "none";
    r704.style.display = "none";
    r705.style.display = "block";
    r706.style.display = "none";
    rdo.style.display = "none";
    s1.style.display = "block";
    s2.style.display = "none";
    s3.style.display = "none";
    s4.style.display = "none";
    s5.style.display = "none";

    $('#agc').addClass('active-tab');
    $('#ppc').removeClass('active-tab');
    $('#trkMap').removeClass('active-tab');
    $('#occrptbtn').removeClass('active-tab');
    $('#occupancyBtn').hide();
    $('#utilizationBtn').hide();
    $('#txt-custom-cal').show();
    $('#calendar').hide();
}

function myTrackMap() {
    $('#graphBtn').hide();
    $('#oCalendarBtn').hide();
    $('#OccAndUtilReportGraph').hide();
    hiChart.style.display = "none";
    agCount.style.display = "none";
    trackMap.style.display = "block";
    r704.style.display = "block";
    r705.style.display = "block";
    r706.style.display = "none";
    rdo.style.display = "none";
    s1.style.display = "none";
    s2.style.display = "none";
    s3.style.display = "block";
    s4.style.display = "block";
    s5.style.display = "none";
    $('#trkMap').addClass('active-tab');
    $('#ppc').removeClass('active-tab');
    $('#agc').removeClass('active-tab');
    $('#occrptbtn').removeClass('active-tab');
    $('#occupancyBtn').hide();
    $('#utilizationBtn').hide();


    $('#main-calendar').show();
    $('#custom-calendar').hide();
    $('#txt-main-cal').addClass('active-calendar');
    $('#txt-custom-cal').removeClass('active-calendar');
    $('#txt-custom-cal').hide();
    $('#calendar').hide();

    generateTrackmap(calDate, calNextDate,start_time,end_time);



}

function refreshApi(){
    apiCal(fromDate, toDate, value,start_time,end_time);
}

function occupyrpt(){
    $('#in').hide();
    $('#out').hide();
    $('#inout').hide();
    $('#occupancyBtn').show();
    $('#utilizationBtn').show();
    $('#graphBtn').show();
    $('#oCalendarBtn').show();

    $('#OccAndUtilReportGraph').show();

    $('#occrpt').removeClass("hide");
    hiChart.style.display = "none";
    agCount.style.display = "none";
    trackMap.style.display = "none";
    avgI.style.display = "none";
    avgID.style.display = "none"
    totalI.style.display = "none";
    avgO.style.display = "none";
    avgOD.style.display = "none";
    totalO.style.display = "none";
    avgIO.style.display = "none";
    totalIO.style.display = "none";
    avgIOD.style.display = "none";
    $('#trkMap').removeClass('active-tab');
    $('#ppc').removeClass('active-tab');
    $('#agc').removeClass('active-tab');
    $('#occrptbtn').addClass('active');
    $('#graphBtn').addClass('active-internal-tab');
    $('#oCalendarBtn').removeClass('active-internal-tab');
    $('#calendar').removeClass('active-tab');
    $('#occupancyBtn').addClass('active');
    $('#utilizationBtn').removeClass('active');
    $('#calendar').hide();
    if ($('#occupancyBtn').hasClass('active')) {
        //console.log(fromDate+" "+toDate);
        getPeopleCounterAndFindOccupancy(fromDate, toDate, start_time, end_time);
    } else if ($('#utilizationBtn').hasClass('active')) {
        getPeopleCounterAndFindUtilization(fromDate, toDate, start_time, end_time);
    }
    $('#main-calendar').show();
    $('#custom-calendar').hide();
    $('#txt-main-cal').addClass('active-calendar');
    $('#txt-custom-cal').removeClass('active-calendar');
    $('#txt-custom-cal').show();

    getPeopleCounterAndFindOccupancy(fromDate, toDate, start_time, end_time);

}
function oCalendar() {
    loadOccupancyCalendar();
    $('#graphBtn').show();
    $('#oCalendarBtn').show();
    $('#OccAndUtilReportGraph').hide();
    $('#in').hide();
    $('#out').hide();
    $('#inout').hide();
    hiChart.style.display = "none";
    agCount.style.display = "none";
    trackMap.style.display = "none";
    avgI.style.display = "none";
    avgID.style.display = "none"
    totalI.style.display = "none";
    avgO.style.display = "none";
    avgOD.style.display = "none";
    totalO.style.display = "none";
    avgIO.style.display = "none";
    totalIO.style.display = "none";
    avgIOD.style.display = "none";
    $('#trkMap').removeClass('active-tab');
    $('#ppc').removeClass('active-tab');
    $('#agc').removeClass('active-tab');
    $('#occrptbtn').addClass('active');
    $('#graphBtn').removeClass('active-internal-tab');
    $('#oCalendarBtn').addClass('active-internal-tab');
    $('#calendar').show();
}

// function occupyrpt()
// {
//     //document.getElementById("occrpt").style.display = "block";
//     $('#graph').show();
//     $('#oCalendarBtn').show();
//     $('#OccAndUtilReportGraph').show();
//     $('#calendar').hide();
//     hiChart.style.display = "none";
//     agCount.style.display = "none";
//     trackMap.style.display = "none";
// }

function graphButtonChart(){
    $('#graphBtn').show();
    $('#oCalendarBtn').removeClass('active-internal-tab');
    $('#calendar').hide();
    $('#OccAndUtilReportGraph').show();
    $('#trkMap').removeClass('active-tab');
    $('#ppc').removeClass('active-tab');
    $('#agc').removeClass('active-tab');
    $('#occrptbtn').addClass('active-tab');
   $('#calendar').removeClass('active-internal-tab');
    $('#graphBtn').addClass('active-internal-tab');

    if($('#txt-custom-cal').hasClass('active-calendar'))
    {
        customCalSearch();
    }
    else if($('#txt-main-cal').hasClass('active-calendar'))
    {
        mainCalSearch();
    }

   // document.getElementById("OccAndUtilReportGraph").style.display = "block";
}

function occupancyBtnClicked(){

    $('#in').removeClass('active-tab');
    $('#out').removeClass('active-tab');
    $('#inout').removeClass('active-tab');
    $('#occupancyBtn').addClass('active');
    $('#utilizationBtn').removeClass('active');
}

function utilizationBtnClicked(){

    $('#in').removeClass('active-tab');
    $('#out').removeClass('active-tab');
    $('#inout').removeClass('active-tab');
    $('#occupancyBtn').removeClass('active');
    $('#utilizationBtn').addClass('active');
}
