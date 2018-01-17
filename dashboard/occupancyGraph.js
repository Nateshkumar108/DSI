
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
            data: [12,54,65,12,56,25,865,123]

          }]
        });
