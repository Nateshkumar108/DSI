var inppc = [];
var outppc = [];
var times = [];
var inData=0;
var outData=0;
var inoutData=0;
$(document).ready(function () {



  /*var url = "https://eds.modcam.io/v1/peoplecounter/installation";
  const installation = "5a420343b7e14e0007d73376";
  var projction = "hours";
  //var outer_range_start = $('outer_range_start').val();
  //var outer_range_end = $('outer_range_end').val();
  var date = ""
  // var furl = url+'/'+installation+'/'+projction+'/'+outer_range_start+'/'+outer_range_end;*/
  var furl = "http://18.216.208.225:3000/v1/peoplecounter/installation/5a420343b7e14e0007d73376/hours/2017-12-26/2017-12-27?st=00:00&et=24:00";
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
          Highcharts.chart('container', {
            chart: {
              type: 'column'
            },
            title: {
              text: 'Digital_spaces_PPC'
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
              name: 'In',
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
          outppc.push(item.out);
          var timeArray=item.date.split(" ");
          times.push(timeArray[1]);
        }
          Highcharts.chart('container', {
            chart: {
              type: 'column'
            },
            title: {
              text: 'Digital_spaces_PPC'
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
              name: 'Out',
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
          inppc.push(item.in);
          outppc.push(item.out);
          var timeArray=item.date.split(" ");
          times.push(timeArray[1]);
        }
          Highcharts.chart('container', {
            chart: {
              type: 'column'
            },
            title: {
              text: 'Digital_spaces_PPC'
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
              name: 'In',
              data: inppc
        
            },{
              name: 'Out',
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
        Highcharts.chart('container', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Digital_spaces_PPC'
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
            name: 'In',
            data: inppc
      
          },{
            name: 'Out',
            data: outppc
          }]
        });
      

    }
  });




  //var inppc= [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];
  
});

