
function getPeopleCounterAndFindUtilization(fromDate, toDate, start_time, end_time) {

  var furl = "http://18.216.208.225:3000/v1/peoplecounter/installation/5a420343b7e14e0007d73376/hours/" + fromDate + "/" + toDate + "?st=" + start_time + "&et=" + end_time;

  $('#page-loader').show();
  $.ajax({
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-client-id': 'digispc',
      'x-api-key': '20d24f4d6cc964cae3050afd1610c29b'
    },
    url: furl,
    crossDomain: true,
    method: 'GET',
    dataType: 'JSON',
    success: function (data) {
      console.log("data coming from getPeopleCounterAndFindUtilization was ", data.data[0].items);
      $('#page-loader').hide();
      var capacity = 3;

      if ($('#txt-custom-cal').hasClass("active-calendar")) {
        // show dates in x-axis

        var date = "";
        var numPeople = 0;
        var utilArr = [];
        var dateToUtilMap = [];
        var length = data.data[0].items.length;
        for (var i = 0; i < length; i++) {

          console.log(data.data[0].items[i]);

          var item = data.data[0].items[i];
          var currDate = item.date.split(" ")[0];
          var currTime = item.date.split(" ")[1];
          var hours = currTime.split(":")[0];
          if (date == currDate) {

            numPeople += item.in - item.out;    
             if (numPeople < 0) {    
               numPeople = 0;    
             }   
             var util = (numPeople / capacity) * 100;
             // temporarily set working hours from 8:00 to 20:00
             if (hours > 20) {
              util = 0;
             }

             utilArr.push(util);   
     
             if (i == length - 1) {    
               // add utilization for the last date    
               var total = utilArr.reduce((a, b) => a + b, 0);
               // Divide by 12 for now, as we have 12 working hours.   
               var utilAvg = total / 12;   
               dateToUtilMap[date] = utilAvg;    
             }   
     
           } else {    
             if (i != 0) {   
               // push average utilization for a day into dateToUtilMap    
               var total = utilArr.reduce((a, b) => a + b, 0);
               // Divide by 12 for now, as we have 12 working hours. 
               var utilAvg = total / 12;   
               dateToUtilMap[date] = utilAvg;    
             }   
     
             // reset variables for next date    
             date = currDate;    
             numPeople = 0;    
             utilArr = [];   
             numPeople = item.in - item.out;   
             var util = (numPeople / capacity) * 100;    
             utilArr.push(util);   
           }


        }

        // FetchUtilization.setUtilizationDateDictionary(dateToUtilMap);
        console.log("dateToUtilMap was ", dateToUtilMap);
        dateToUtilGlobalMap = dateToUtilMap;

        if ($('#graphBtn').hasClass('active')) {
          showInHighCharts(dateToUtilGlobalMap);
        } else {
          showInCalendar(dateToUtilGlobalMap);
        }



      } else {
        // show hours in x-axis

        var time = "";
        var numPeople = 0;
        var timeToUtilMap = [];
        var length = data.data[0].items.length;
        for (var i = 0; i < length; i++) {
          var item = data.data[0].items[i];
          numPeople += item.in - item.out;
          if (numPeople < 0) {
            numPeople = 0;
          }
          var util = (numPeople / capacity) * 100;
          time = item.date.split(" ")[1];
          var hours = time.split(":")[0];

          // remove tomorrow
          if (hours > 20) {
            timeToUtilMap[time] = 0;
          } else {
            timeToUtilMap[time] = util;
          }
        }

        console.log("timeToUtilMap was ", timeToUtilMap);
        FetchUtilization.setUtilizationTimeDictionary(timeToUtilMap);

        timeToUtilGlobalMap = timeToUtilMap;

        if ($('#graphBtn').hasClass('active')) {
          showInHighCharts(timeToUtilGlobalMap);
        } else {
          showInCalendar(timeToUtilGlobalMap);
        }
      }


      if ($('#oCalendarBtn').hasClass('active')) {
        oCalendar();
      }
    }
  });
}


function getPeopleCounterAndFindOccupancy(fromDate, toDate, start_time, end_time) {
  console.log("start time", start_time);
  console.log("end time", end_time);
  console.log("fromDate", fromDate);
  console.log("toDate", toDate);

  var furl = "http://18.216.208.225:3000/v1/peoplecounter/installation/5a420343b7e14e0007d73376/hours/" + fromDate + "/" + toDate + "?st=" + start_time + "&et=" + end_time;

  $('#page-loader').show();
  $.ajax({
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-client-id': 'digispc',
      'x-api-key': '20d24f4d6cc964cae3050afd1610c29b'
    },
    url: furl,
    crossDomain: true,
    method: 'GET',
    dataType: 'JSON',
    success: function (data) {
      console.log("data coming from getPeopleCounterAndFindOccupancy was ", data.data[0].items);
      $('#page-loader').hide();
      var capacity = 3;
      if ($('#txt-custom-cal').hasClass("active-calendar")) {
        // show dates in x-axis

        var date = "";
        var numPeople = 0;
        var occupancyArr = [];
        var dateToOccupancyMap = [];
        var length = data.data[0].items.length;
        for (var i = 0; i < length; i++) {

          console.log(data.data[0].items[i]);

          var item = data.data[0].items[i];
          var currDate = item.date.split(" ")[0];
          var currTime = item.date.split(" ")[1]
          var hours = currTime.split(":")[0];
          if (date == currDate) {
            numPeople += item.in - item.out;

            if (numPeople < 0) {    
               numPeople = 0;    
             }

             if (hours > 20) {
              numPeople = 0;
             }

             occupancyArr.push(numPeople); 

             if (i == length - 1) {    
               // add occupancy for the last date    
               var total = occupancyArr.reduce((a, b) => a + b, 0);
               // Divide by 12 for now, as we have 12 working hours.     
               var occAvg = total / 12;   
               occAvg = Math.round(occAvg);    
               dateToOccupancyMap[date] = occAvg;  
             }   
     
           } else {    
             if (i != 0) {   
               // push average occupancy for a day into dateToOccupancyMap   
               var total = occupancyArr.reduce((a, b) => a + b, 0); 
               // Divide by 12 for now, as we have 12 working hours.    
               var occAvg = total / 12;   
               occAvg = Math.round(occAvg);    
               dateToOccupancyMap[date] = occAvg;
             }   
                 
             // reset variables for next date    
             date = currDate;    
             numPeople = 0;    
             occupancyArr = [];    
             numPeople = item.in - item.out;   
             occupancyArr.push(numPeople);   
                 
           }
        }

        dateToOccupancyGlobalMap = dateToOccupancyMap;

        if ($('#graphBtn').hasClass('active')) {
          showInHighCharts(dateToOccupancyGlobalMap);
        } else {
          showInCalendar(dateToOccupancyGlobalMap);
        }

        console.log("dateToOccupancyMap was ", dateToOccupancyMap);


      } else {
        // show hours in x-axis

        var time = "";
        // var tim = [];
        var numPeople = 0;
        var timeToOccupancyMap = [];
        var length = data.data[0].items.length;
        for (var i = 0; i < length; i++) {
          var item = data.data[0].items[i];
          numPeople += item.in - item.out;
          if (numPeople < 0) {
            numPeople = 0;
          }
          time = item.date.split(" ")[1];
          var hours = time.split(":")[0];
          if (hours > 20) {
            timeToOccupancyMap[time] = 0;
          } else {
            timeToOccupancyMap[time] = numPeople;
          }

          //timeToOccupancyMap.push(numPeople);
          //tim.push(time);

        }
        console.log("timeToOccupancyMap was ", timeToOccupancyMap);
        //console.log("time", tim);
        //var timeOMdata=timeToOccupancyMap.split(" ");
        // console.log("@@@@time", timeOMdata[0]);
        // console.log("@@@@data", timeOMdata[1]);

        // FetchUtilization.setOccupancyTimeDictionary(timeToOccupancyMap);

        timeToOccupancyGlobalMap = timeToOccupancyMap;

        if ($('#graphBtn').hasClass('active')) {
          showInHighCharts(timeToOccupancyGlobalMap);
        } else {
          showInCalendar(timeToOccupancyGlobalMap);
        }

      }

      if ($('#oCalendarBtn').hasClass('active')) {
        oCalendar();
      }

    }
  });


}

var utilizationDate;
var utilizationTime;
var OccupancyDate;
var OccupancyTime;

var FetchUtilization = {

  setUtilizationDateDictionary: function (data) {
    utilizationDate = data;
  },
  getUtilizationDateDictionary: function () {
    return utilizationDate;
  },
  setUtilizationTimeDictionary: function (data) {
    utilizationTime = data;
  },
  getUtilizationTimeDictionary: function () {
    return utilizationTime;
  },

  setOccupancyDateDictionary: function (data) {
    OccupancyDate = data;
  },
  getOccupancyDateDictionary: function () {
    return OccupancyDate;
  },
  setOccupancyTimeDictionary: function (data) {
    OccupancyTime = data;
  },
  getOccupancyTimeDictionary: function () {
    return OccupancyTime;
  }
};

function createHighchart() {

  Highcharts.chart('OccAndUtilReportGraph', {
    chart: {
      type: 'column',
      height: 65 + '%'
    },
    title: {
      text: 'Chart Title'
    },
    subtitle: {
      text: ''
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      // categories: xAxis,
      // min:startdate,
      //max:endDate,
      crosshair: true,
      tickInterval: 1
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    // tooltip: {
    //   headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //   pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //     '<td style="padding:0"><b>{point.y:.1f} persons</b></td></tr>',
    //   footerFormat: '</table>',
    //   shared: true,
    //   useHTML: true
    // },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: '',
      data: []
    }]
  });

}

function showInHighCharts(dictionary) {

  var graph = $('#OccAndUtilReportGraph').highcharts();
  graph.series[0].setData([]);

  var data = [];

  var yAxis = [];
  console.log("dictionary was printed");
  var xAxis = [];
  for (var key in dictionary) {
    // console.log("key " + key + " value " + dictionary[key]);

    // var date = new Date(fromDate + " " + key);

    // console.log("Date was ", date);
    // xAxis.push(key);
    // yAxis.push(dictionary[key]);
    xAxis.push(key);
    yAxis.push(dictionary[key]);
    data.push([key, dictionary[key]]);

    // graph.series[0].addPoint(dictionary[key], false);

  }

  console.log("Hello world", graph);
  graph.series[0].setData(yAxis);
  graph.xAxis[0].setCategories(xAxis);

 if($('#utilizationBtn').hasClass('active'))
  {
    var new_title = "Utilization";
    var chart = $('#OccAndUtilReportGraph').highcharts();
    chart.setTitle({ text: new_title });
    
    graph.series[0].update({name:"Utilization"}, false);
    graph.yAxis[0].update({title:{text:"PERCENTAGE"}});
    graph.redraw();
  }

  if($('#occupancyBtn').hasClass('active'))
  {
    var new_title = "Occupancy";
    var chart = $('#OccAndUtilReportGraph').highcharts();
    chart.setTitle({ text: new_title });
    
    graph.series[0].update({name:"Occupancy"}, false);
    graph.yAxis[0].update({title:{text:"PERSONS"}});
    graph.redraw();
  }

  // if ($('#occupancyBtn').hasClass('active')) {
  //   // set all necessary properties of highchart, graph for occupancy
  //   $('#OccAndUtilReportGraph').show();
  //   $('#calendar').hide();

  // } else {
  //   // set all necessary properties of highchart, graph for utilisation 
  //   $('#OccAndUtilReportGraph').show();
  //   $('#calendar').hide();
  // }

}

function showInCalendar(dictionary) {

}



