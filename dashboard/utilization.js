function getPeopleCounterAndFindUtilization(fromDate, toDate, value, start_time, end_time) {
  var furl = "http://18.216.208.225:3000/v1/peoplecounter/installation/5a420343b7e14e0007d73376/hours/" + fromDate + "/" + toDate + "?st=" + start_time + "&et=" + end_time;


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
          var currTime = item.date.split(" ")[1]

          if (date == currDate) {
            numPeople += item.in - item.out;
            if (numPeople < 0) {
              numPeople = 0;
            }
            var util = (numPeople / capacity) * 100;
            utilArr.push(util);

            if (i == length - 1) {
              // add utilization for the last date
              var total = utilArr.reduce((a, b) => a + b, 0);
              var utilAvg = total / utilArr.length;
              dateToUtilMap[date] = utilAvg;
            }

          } else {
            if (i != 0) {
              // push average utilization for a day into dateToUtilMap
              var total = utilArr.reduce((a, b) => a + b, 0);
              var utilAvg = total / utilArr.length;
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
        //FetchUtilization.setUtilizationDateDictionary(dateToUtilMap);
        console.log("dateToUtilMap was ", dateToUtilMap);
        dateToUtilGlobalMap = dateToUtilMap;
        if($('#graph').hasClass('active-tab')) {
          showInHighCharts(dateToUtilGlobalMap);
        } else {
          showInCalendar(timeToUtilGlobalMap);
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
          timeToUtilMap[time] = util;
        }

        console.log("timeToUtilMap was ", timeToUtilMap);
        FetchUtilization.setUtilizationTimeDictionary(timeToUtilMap);
        timeToUtilGlobalMap = timeToUtilMap;
        if($('#graph').hasClass('active-tab')) {
          showInHighCharts(dateToUtilGlobalMap);
        } else {
          showInCalendar(timeToUtilGlobalMap);
        }
      }

    }
  });
}


function getPeopleCounterAndFindOccupancy(fromDate, toDate, value, start_time, end_time) {

  var furl = "http://18.216.208.225:3000/v1/peoplecounter/installation/5a420343b7e14e0007d73376/hours/" + fromDate + "/" + toDate + "?st=" + start_time + "&et=" + end_time;


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

          if (date == currDate) {
            numPeople += item.in - item.out;
            if (numPeople < 0) {
              numPeople = 0;
            }
            occupancyArr.push(numPeople);
            if (i == length - 1) {
              // add occupancy for the last date
              var total = occupancyArr.reduce((a, b) => a + b, 0);
              var occAvg = total / occupancyArr.length;
              occAvg = Math.round(occAvg);
              dateToOccupancyMap[date] = occAvg;
              //dateToOccupancyMap.push(occAvg);
              //xaxisdate.push(date);
            }

          } else {
            if (i != 0) {
              // push average occupancy for a day into dateToOccupancyMap
              var total = occupancyArr.reduce((a, b) => a + b, 0);
              var occAvg = total / occupancyArr.length;
              occAvg = Math.round(occAvg);
              dateToOccupancyMap[date] = occAvg;
              
              // dateToOccupancyMap.push(occAvg);
              // xaxisdate.push(date);
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
        if($('#graph').hasClass('active-tab')) {
          showInHighCharts(dateToOccupancyGlobalMap);
        } else {
          showInCalendar(timeToOccupancyGlobalMap);
        }

        

        console.log("dateToOccupancyMap was ", dateToOccupancyMap);
        console.log("date was ", xaxisdate);
        // FetchUtilization.setOccupancyDateDictionary(dateToOccupancyMap);
        

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
          timeToOccupancyMap[time] = numPeople;
          //timeToOccupancyMap.push(numPeople);
          //tim.push(time);

        }
        console.log("timeToOccupancyMap was ", timeToOccupancyMap);
        //console.log("time", tim);
        //var timeOMdata=timeToOccupancyMap.split(" ");
        // console.log("@@@@time", timeOMdata[0]);
        // console.log("@@@@data", timeOMdata[1]);
        
        FetchUtilization.setOccupancyTimeDictionary(timeToOccupancyMap);
        timeToOccupancyGlobalMap = timeToOccupancyMap;
        if($('#graph').hasClass('active-tab')) {
          showInHighCharts(dateToOccupancyGlobalMap);
        } else {
          showInCalendar(timeToOccupancyGlobalMap);
        }
        
      }
      

    }
  });
}

var utilizationDate;
var utilizationTime;
var OccupancyDate;
var OccupancyTime;

var FetchUtilization =  {
    
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

function setUtilizationDateOnCalendar() {

  var fcEl = $('#calendar'),
  view = fcEl.fullCalendar('getView');
  view.unrenderDates();
  view.renderDates();

  fcEl.fullCalendar({

    dayRender: function (date, cell) {

      date = moment(date).format("YYYY-M-DD");

      console.log('kunal' + date);

      //utilisation[]

      if (date === currentDate) {
        $(cell).html('<div class="utilization-div" >50% utilization</div>');
      }

    }
  });
}
  function createHighchart() {

    Highcharts.chart('OccAndUtilReportGraph', {
      chart: {
        type: 'column',
        height: 65 + '%'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: '',
        crosshair: true
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
        name: 'PERSONS',
        data: []

      }]
    });

  }

  function showInHighCharts (dictionary) {

    var graph = $('#OccAndUtilReportGraph').highcharts();
    graph.setData([]);

    // for (key, value in dictionary) {
    //   graph.series[0].addPoint(key, value, false);
    // }

    // if ($('#occupancyBtn').hasClass('active-tab')) {
    //   // set all necessary properties of highchart, graph for occupancy

    // } else {
    //   // set all necessary properties of highchart, graph for utilisation 
      
    // }
    


  }

  function showInCalendar (dictionary) {

  } 



