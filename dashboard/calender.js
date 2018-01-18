function apiCal(fromDate, toDate, value,start_time,end_time) {
  var furl = "http://18.216.208.225:3000/v1/peoplecounter/installation/5a420343b7e14e0007d73376/hours/" + fromDate + "/" + toDate + "?st="+start_time+"&et="+end_time;

  getPeopleCounterAndFindOccupancy(fromDate, toDate, value, start_time, end_time);
  getPeopleCounterAndFindUtilization(fromDate, toDate, value, start_time, end_time);

  var inppc = [];
  var times = [];

  switch (value) {
    case 'in':
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
          inppc = [];
          times = [];
          for (let item of data.data[0].items) {
            inppc.push(item.in);
            var timeArray = item.date.split(" ");
            times.push(timeArray[1]);
          }
          loadCaptions("in",furl,fromDate,toDate,start_time,end_time);
          Highcharts.chart('container', {
            chart: {
              type: 'column',
              height: 65 + '%'
            },
            title: {
              text: 'DSI People Counter'
            },
            subtitle: {
              text: 'Visitors per hour'
            },
            xAxis: {
              categories: times,
              crosshair: true
            },
            yAxis: {
              min: 0,
              title: {
                text: 'PERSONS'
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
              name: 'IN',
              data: inppc

            }]
          });
        }
      });
     
      $('#page-loader').hide();
      break;
    case 'out':
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
          outppc = [];
          times = [];
          for (let item of data.data[0].items) {
            outppc.push(item.out);
            var timeArray = item.date.split(" ");
            times.push(timeArray[1]);
          }
          loadCaptions("out",furl,fromDate,toDate,start_time,end_time);
          Highcharts.chart('container', {
            chart: {
              type: 'column',
              height: 65 + '%'
            },
            title: {
              text: 'DSI People Counter'
            },
            subtitle: {
              text: 'Visitors per hour'
            },
            credits: {
              enabled: false
          },
            xAxis: {
              categories: times,
              crosshair: true
            },
            yAxis: {
              min: 0,
              title: {
                text: 'PERSONS'
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
              name: 'OUT',
              data: outppc

            }]
          });
        }
      });
     $('#page-loader').hide();
      break;
    case 'in-out':
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
          inppc = [];
          outppc = [];
          times = [];
          for (let item of data.data[0].items) {
            inppc.push(item.in);
            outppc.push(item.out);
            var timeArray = item.date.split(" ");
            times.push(timeArray[1]);
          }
          loadCaptions("inout",furl,fromDate,toDate,start_time,end_time);
          Highcharts.chart('container', {
            chart: {
              type: 'column',
              height: 65 + '%'
            },
            title: {
              text: 'DSI People Counter'
            },
            subtitle: {
              text: 'Visitors per hour'
            },
            credits: {
              enabled: false
          },
            xAxis: {
              categories: times,
              crosshair: true
            },
            yAxis: {
              min: 0,
              title: {
                text: 'PERSONS'
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
              name: 'IN',
              data: inppc

            }, {
              name: 'OUT',
              data: outppc
            }]
          });
        }
      });
      $('#page-loader').hide();
      break;

    default:
      break;
  }
}