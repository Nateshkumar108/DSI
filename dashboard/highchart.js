var inppc = [];
var outppc = [];
var times = [];
var inData=0;
var outData=0;
var inoutData=0;
var totalIN=0;
var totalOUT=0;
var totalINOUT=0;
var avgINOUT=0;
console.log("DATESDFGHJKJHGFD"+fromDate)
console.log("DATESDFGHJKJHGFD"+toDate)
$(document).ready(function () {

  

  /*var url = "https://eds.modcam.io/v1/peoplecounter/installation";
  const installation = "5a420343b7e14e0007d73376";
  var projction = "hours";
  //var outer_range_start = $('outer_range_start').val();
  //var outer_range_end = $('outer_range_end').val();
  var date = ""
  // var furl = url+'/'+installation+'/'+projction+'/'+outer_range_start+'/'+outer_range_end;*/

var furl = "http://18.216.208.225:3000/v1/peoplecounter/installation/5a420343b7e14e0007d73376/hours/" + fromDate +"/"+ toDate +"?st=00:00&et=24:00";
  $('#in').click(function(){
    inData=1;
    outData=0;
    inoutData=0;
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
        //console.log("Data was ", data);
        //console.log("Data was ", data.data[0].items);
        inppc = [];
        times = [];
        for (let item of data.data[0].items) {
          console.log('in', item.in);
          inppc.push(item.in);
          var timeArray=item.date.split(" ");
          times.push(timeArray[1]);
        }
        loadCaptions("in",furl);
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
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} persons</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
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
   
  });
  $('#out').click(function(){
    inData=0;
    outData=1;
    inoutData=0;
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
        //console.log("Data was ", data);
        //console.log("Data was ", data.data[0].items);
        outppc = [];
        times = [];
        for (let item of data.data[0].items) {
          console.log('out', item.out);
          totalOUT=totalOUT + item.out;
          outppc.push(item.out);
          var timeArray=item.date.split(" ");
          times.push(timeArray[1]);
        }
        loadCaptions("out",furl);
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
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} persons</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
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
  
  });
  $('#inout').click(function(){
    inData=0;
    outData=0;
    inoutData=1;
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
        console.log("Data was ", data);
        console.log("Data was ", data.data[0].items);
        inppc = [];
        outppc = [];
        times = [];
        
        for (let item of data.data[0].items) {
          console.log('in', item.in);
          totalIN=totalIN + item.in;
          totalOUT=totalOUT + item.out;
          inppc.push(item.in);
          outppc.push(item.out);
          var timeArray=item.date.split(" ");
          times.push(timeArray[1]);
        }
        loadCaptions("inout",furl);
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
        
            },{
              name: 'OUT',
              data: outppc
            }]
          });
        
  
      }
    });
  
  });
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
      console.log("Data was ", data);
      console.log("Data was ", data.data[0].items);
      inppc = [];
      outppc = [];
      times = [];
      for (let item of data.data[0].items) {
        console.log('in', item.in);
        inppc.push(item.in);
        outppc.push(item.out);
        var timeArray=item.date.split(" ");
        times.push(timeArray[1]);
      }
      loadCaptions("inout",furl); 
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
    //       tooltip: {
    //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //         '<td style="padding:0"><b>{point.x} persons</b></td></tr>',
    //     footerFormat: '</table>',
    //     shared: true,
    //     useHTML: true,
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
      
          },{
            name: 'OUT',
            data: outppc
          }]
        });
      

    }
  });




  //var inppc= [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];
  
});
Highcharts.createElement('link', {
  href: 'https://fonts.googleapis.com/css?family=Open+Sans',
  rel: 'stylesheet',
  type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
  colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
     '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
  chart: {
     backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
           [0, '#2b2b2d'],
           [1, '#2b2b2d']
        ]
     },
     style: {
        fontFamily: '\'Open Sans\', sans-serif'
     },
     plotBorderColor: '#606063'
  },
  title: {
     style: {
        color: '#E0E0E3',
        textTransform: 'uppercase',
        fontSize: '20px'
     }
  },
  subtitle: {
     style: {
        color: '#E0E0E3',
        textTransform: 'uppercase'
     }
  },
  xAxis: {
     gridLineColor: '#707073',
     labels: {
        style: {
           color: '#E0E0E3'
        }
     },
     lineColor: '#707073',
     minorGridLineColor: '#505053',
     tickColor: '#707073',
     title: {
        style: {
           color: '#A0A0A3'

        }
     }
  },
  yAxis: {
     gridLineColor: '#707073',
     labels: {
        style: {
           color: '#E0E0E3'
        }
     },
     lineColor: '#707073',
     minorGridLineColor: '#505053',
     tickColor: '#707073',
     tickWidth: 1,
     title: {
        style: {
           color: '#A0A0A3'
        }
     }
  },
  tooltip: {
     backgroundColor: 'rgba(0, 0, 0, 0.85)',
     style: {
        color: '#F0F0F0'
     }
  },
  plotOptions: {
     series: {
        dataLabels: {
           color: '#B0B0B3'
        },
        marker: {
           lineColor: '#333'
        }
     },
     boxplot: {
        fillColor: '#505053'
     },
     candlestick: {
        lineColor: 'white'
     },
     errorbar: {
        color: 'white'
     }
  },
  legend: {
     itemStyle: {
        color: '#E0E0E3'
     },
     itemHoverStyle: {
        color: '#FFF'
     },
     itemHiddenStyle: {
        color: '#606063'
     }
  },
  credits: {
     style: {
        color: '#666'
     }
  },
  labels: {
     style: {
        color: '#707073'
     }
  },

  drilldown: {
     activeAxisLabelStyle: {
        color: '#F0F0F3'
     },
     activeDataLabelStyle: {
        color: '#F0F0F3'
     }
  },

  navigation: {
     buttonOptions: {
        symbolStroke: '#DDDDDD',
        theme: {
           fill: '#505053'
        }
     }
  },

  // scroll charts
  rangeSelector: {
     buttonTheme: {
        fill: '#505053',
        stroke: '#000000',
        style: {
           color: '#CCC'
        },
        states: {
           hover: {
              fill: '#707073',
              stroke: '#000000',
              style: {
                 color: 'white'
              }
           },
           select: {
              fill: '#000003',
              stroke: '#000000',
              style: {
                 color: 'white'
              }
           }
        }
     },
     inputBoxBorderColor: '#505053',
     inputStyle: {
        backgroundColor: '#333',
        color: 'silver'
     },
     labelStyle: {
        color: 'silver'
     }
  },

  navigator: {
     handles: {
        backgroundColor: '#666',
        borderColor: '#AAA'
     },
     outlineColor: '#CCC',
     maskFill: 'rgba(255,255,255,0.1)',
     series: {
        color: '#7798BF',
        lineColor: '#A6C7ED'
     },
     xAxis: {
        gridLineColor: '#505053'
     }
  },

  scrollbar: {
     barBackgroundColor: '#808083',
     barBorderColor: '#808083',
     buttonArrowColor: '#CCC',
     buttonBackgroundColor: '#606063',
     buttonBorderColor: '#606063',
     rifleColor: '#FFF',
     trackBackgroundColor: '#404043',
     trackBorderColor: '#404043'
  },

  // special colors for some of the
  legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  background2: '#505053',
  dataLabelsColor: '#B0B0B3',
  textColor: '#C0C0C0',
  contrastTextColor: '#F0F0F3',
  maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);


function loadCaptions(value,furl){
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
      console.log("Data was ", data);
      console.log("Data was ", data.data[0].items);
      inppc = [];
      outppc = [];
      times = [];
      for (let item of data.data[0].items) {
        console.log('in', item.in);
        inppc.push(item.in);
        totalIN=totalIN + item.in;
        totalOUT=totalOUT + item.out;
        outppc.push(item.out);
        var timeArray=item.date.split(" ");
        times.push(timeArray[1]);
      }
      totalINOUT=totalIN + totalOUT;
      avgIN=totalIN/24;
      avgOUT=totalOUT/24;
      avgINOUT=totalINOUT/24;

switch (value) {
  case 'in':
    document.getElementById("avgIn").innerHTML = Math.round(avgIN);
    document.getElementById("totalIn").innerHTML = totalIN;
   break;
   case 'out':
    document.getElementById("avgOut").innerHTML = Math.round(avgOUT);
    document.getElementById("totalOut").innerHTML = totalOUT;
   break;
   case 'inout':
   document.getElementById("avgInOut").innerHTML = Math.round(avgINOUT);
   document.getElementById("totalInOut").innerHTML = totalINOUT;
   document.getElementById("totalIn").innerHTML = totalIN;
   document.getElementById("totalOut").innerHTML = totalOUT;
   break;
   default:
      break;
}
}
});
  }
