$('#occrptbtn').click(function () {
  // // $.ajax({
  // //   headers: {
  // //     'Access-Control-Allow-Headers': '*',
  // //     'Content-Type': 'application/json',
  // //     'Access-Control-Allow-Origin': '*',
  // //     'x-client-id': 'digispc',
  // //     'x-api-key': '20d24f4d6cc964cae3050afd1610c29b'
  // //   },
  // //   url: furl,
  // //   crossDomain: true,
  // //   method: 'GET',
  // //   dataType: 'JSON',
  //   success: function (data) {
  //     ////console.log("Data was ", data);
  //     ////console.log("Data was ", data.data[0].items);
  //     $('#page-loader').hide();
  //     outppc = [];
  //     times = [];
  //     for (let item of data.data[0].items) {
  //       //console.log('out', item.out);
  //       totalOUT = totalOUT + item.out;
  //       outppc.push(item.out);
  //       var timeArray = item.date.split(" ");
  //       times.push(timeArray[1]);
  //     }

      Highcharts.chart('OccupancyReportChart', {
        chart: {
          type: 'column',
          height: 65 + '%'
        },
        title: {
          text: 'DSI Occupancy Graph'
        },
        subtitle: {
          text: 'Occupancy per hour'
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
            text: 'PERCENTAGE'
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
          name: 'OCCUPANCY',
          data: [12, 54, 65, 12, 56, 25, 865, 123, 23]

        }]
      });
    });
  // });
// });

$('#graph').click(function () {
  Highcharts.chart('OccupancyReportChart', {
    chart: {
      type: 'column',
      height: 65 + '%'
    },
    title: {
      text: 'DSI Occupancy Graph'
    },
    subtitle: {
      text: 'Occupancy per hour'
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
        text: 'PERCENTAGE'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'OCCUPANCY',
      data: [12, 54, 65, 12, 56, 25, 865, 123, 23]
    }]
  });
});
