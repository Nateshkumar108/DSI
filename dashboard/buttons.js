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
    $('#ppc').addClass('active-tab');
    $('#agc').removeClass('active-tab');
    $('#trkMap').removeClass('active-tab');
    $('#txt-custom-cal').show();
    // $("hiChart").show();
    // $("agCount").hide();
    // $("trackMap").hide();
}

function myAgeCounter() {
    demoApi(calDate, calNextDate);
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
    $('#txt-custom-cal').show();
}

function myTrackMap() {
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


    $('#main-calendar').show();
    $('#custom-calendar').hide();
    $('#txt-main-cal').addClass('active-calendar');
    $('#txt-custom-cal').removeClass('active-calendar');
    $('#txt-custom-cal').hide();

    generateTrackmap(calDate, calNextDate);
}

function refreshApi(){
    apiCal(fromDate, toDate, value,start_time,end_time);
}