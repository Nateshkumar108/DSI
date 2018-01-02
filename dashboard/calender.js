function apiCal(fromDate,toDate){
    var furl = "http://18.216.208.225:3000/v1/peoplecounter/installation/5a420343b7e14e0007d73376/hours/" + fromDate + "/"+toDate+"?st=00:00&et=24:00";

    var inppc = [];
    var times = [];
    if(inData==1){
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
    }else if(outData==1){
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
    } else if(inoutData==1){
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
    }
}