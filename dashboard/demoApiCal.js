var maleCount = [];
var femaleCount = [];
function demoApi(fromDate, toDate){

  

  /*var url = "https://eds.modcam.io/v1/peoplecounter/installation";
  const installation = "5a420343b7e14e0007d73376";
  var projction = "hours";
  //var outer_range_start = $('outer_range_start').val();
  //var outer_range_end = $('outer_range_end').val();
  var date = ""
  // var furl = url+'/'+installation+'/'+projction+'/'+outer_range_start+'/'+outer_range_end;*/
  var furl = "http://18.216.208.225:3000/v1/demographics/installation/5a42030e1ac137000520d8c4/range/" + fromDate + "/" + toDate + "?st=00:00&et=24:00";
 
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
    //   console.log("Data was ", data);
    //   console.log("Data was ", data.data[0].items);
    
     var i=0;
     var it=[];
     var maleCount = [];
    var femaleCount = [];
      for (let item of data.data[0].items) {
        for (i=0;i<20;i++){
            console.log('man', item.male[i]);
            maleCount.push(item.male[i]);
            femaleCount.push(item.female[i]);
        }
        
        // for (let it of item.male) {
        //     console.log('goof', it[i]);
        //  maleCount.push(it.male);
         
        // }
        //  femaleCount.push(item.female);
        // var timeArray=item.date.split(" ");
        // times.push(timeArray[1]);
        i++;
        console.log("i=" + i);
      }
        Highcharts.chart('demogra', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'DSI Demographics'
          },
          subtitle: {
            text: 'Age and Gender'
          },
          credits: {
            enabled: false
        },
          xAxis: {
            categories: ['0-4','5-9','10-14','15-19','20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-64','65-69','70-74','75-79','80-84','85-89','90-94','95-*','','','','','','','','','','','','','','','','','','',],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: ''
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
            name: 'Male',
            data: maleCount
      
          },{
            name: 'Female',
            data: femaleCount
           }]
        });
      

    }
  });

}