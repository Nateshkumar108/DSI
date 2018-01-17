function getPeopleCounterAndFindUtilization(fromDate, toDate, value,start_time,end_time) {
  var furl = "http://18.216.208.225:3000/v1/peoplecounter/installation/5a420343b7e14e0007d73376/hours/" + fromDate + "/" + toDate + "?st="+start_time+"&et="+end_time;


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
            if (numPeople < 0 ) {
              numPeople = 0;
            }
            var util = (numPeople / capacity) * 100;
            utilArr.push(util);

            if (i == length-1) {
              // add utilization for the last date
              var total = utilArr.reduce((a,b) => a+b, 0);
              var utilAvg = total/utilArr.length;
              dateToUtilMap[date] = utilAvg;
            }

          } else {
            if (i != 0) {
              // push average utilization for a day into dateToUtilMap
              var total = utilArr.reduce((a,b) => a+b, 0);
              var utilAvg = total/utilArr.length;
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
        FetchUtilization.setUtilizationDate(dateToUtilMap);
        console.log("dateToUtilMap was ", dateToUtilMap);

      } else {
        // show hours in x-axis

        var time = "";
        var numPeople = 0;
        var timeToUtilMap = [];
        var length = data.data[0].items.length;
        for (var i = 0; i < length; i++) {
          var item = data.data[0].items[i];
          numPeople += item.in -item.out;
          if (numPeople < 0) {
            numPeople = 0;
          }
          var util = (numPeople / capacity) * 100;
          time = item.date.split(" ")[1];
          timeToUtilMap[time] = util;
        }

        console.log("timeToUtilMap was ", timeToUtilMap);
        FetchUtilization.setUtilizationTime(timeToUtilMap);
      }

    }
  });
}


function getPeopleCounterAndFindOccupancy(fromDate, toDate, value,start_time,end_time) {

  var furl = "http://18.216.208.225:3000/v1/peoplecounter/installation/5a420343b7e14e0007d73376/hours/" + fromDate + "/" + toDate + "?st="+start_time+"&et="+end_time;


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
        var dateToOccupancylMap = [];
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

            if (i == length-1) {
              // add occupancy for the last date
              var total = occupancyArr.reduce((a,b) => a+b, 0);
              var occAvg = total/occupancyArr.length;
              occAvg = Math.round(occAvg);
              dateToOccupancylMap[date] = occAvg;
            }

          } else {
            if (i != 0) {
              // push average occupancy for a day into dateToOccupancyMap
              var total = occupancyArr.reduce((a,b) => a+b, 0);
              var occAvg = total/occupancyArr.length;
              occAvg = Math.round(occAvg);
              dateToOccupancylMap[date] = occAvg;
            }

            // reset variables for next date
            date = currDate;
            numPeople = 0;
            occupancyArr = [];
            numPeople = item.in - item.out;
            occupancyArr.push(numPeople);
          }
        }

        console.log("dateToOccupancylMap was ", dateToOccupancylMap);
        FetchUtilization.setOccupancyDate(dateToOccupancylMap);

      } else {
        // show hours in x-axis

        var time = "";
        var numPeople = 0;
        var timeToOccupancyMap = [];
        var length = data.data[0].items.length;
        for (var i = 0; i < length; i++) {
          var item = data.data[0].items[i];
          numPeople += item.in -item.out;
          if (numPeople < 0) {
            numPeople = 0;
          }
          time = item.date.split(" ")[1];
          timeToOccupancyMap[time] = numPeople;
        }
        console.log("timeToOccupancyMap was ", timeToOccupancyMap);
        FetchUtilization.setOccupancyTime(timeToOccupancyMap);
      }

    }
  });


}

var FetchUtilization = (function(){

let utilization;

function setUtilizationDateDictionary(data) {
  utilization = data;
}
function getUtilizationDateDictionary() {
  return utilization;
}
function setUtilizationTimeDictionary(data) {
  utilization = data;
}
function getUtilizationTimeDictionary() {
  return utilization;
}

function setOccupancyDateDictionary(data) {
  utilization = data;
}
function getOccupancyDateDictionary() {
  return utilization;
}
function setOccupancyTimeDictionary(data) {
  utilization = data;
}
function getOccupancyTimeDictionary() {
  return utilization;
}
}());
