var maleCount = [];
var femaleCount = [];
var totalMale=0;
var totalFeMale=0;
var sumMale=0;
var sumFemale=0;
var avgMALE=0;
var avgFEMALE=0;
function demoApi(fromDate, toDate){

  

  /*var url = "https://eds.modcam.io/v1/peoplecounter/installation";
  const installation = "5a420343b7e14e0007d73376";
  var projction = "hours";
  //var outer_range_start = $('outer_range_start').val();
  //var outer_range_end = $('outer_range_end').val();
  var date = ""
  // var furl = url+'/'+installation+'/'+projction+'/'+outer_range_start+'/'+outer_range_end;*/
  var furl = "http://18.216.208.225:3000/v1/demographics/installation/5a42030e1ac137000520d8c4/range/" + fromDate + "/" + toDate + "?st="+start_time+"&et="+end_time;
 
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
    maleCount = [];
    femaleCount = [];

    totalMale=0;
    totalFeMale=0;
    sumMale=0;
    sumFemale=0;
      for (let item of data.data[0].items) {
        for (i=0;i<20;i++){
            //console.log('man', item.male[i]);
            maleCount.push(item.male[i]);
            // totalMale=totalMale + item.male[i];
            femaleCount.push(item.female[i]);
            // totalFeMale=totalFeMale + item.female[i];
            // demodata(item.male[i],item.female[i],i);
            
            
        }
       
        
        // for (let it of item.male) {
        //     //console.log('goof', it[i]);
        //  maleCount.push(it.male);
         
        // }
        //  femaleCount.push(item.female);
        // var timeArray=item.date.split(" ");
        // times.push(timeArray[1]);
        i++;
        //console.log("i=" + i);
      }
      // avgMALE= sumMale/totalMale;
      // avgFEMALE= sumFemale/totalFeMale;
      // document.getElementById("avgMale").innerHTML = Math.round(avgMALE);
      // document.getElementById("avgFeMale").innerHTML = Math.round(avgFEMALE);
      demoStats(fromDate, toDate,start_time,end_time);
        Highcharts.chart('demogra', {
          chart: {
            type: 'column',
            height: 70 + '%'
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
            categories: ['0-4','5-9','10-14','15-19','20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-64','65-69','70-74','75-79','80-84','85-89','90-94','95-*'],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Number Of People'
            }
          },
        //   tooltip: {
        //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        //       '<td style="padding:0"><b>{point.y} persons</b></td></tr>',
        //     footerFormat: '</table>',
        //     shared: true,
        //     useHTML: true
        //   },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            name: 'MALE',
            data: maleCount
      
          },{
            name: 'FEMALE',
            data: femaleCount
           }]
        });
      

    }
  });

}

// function demoStats(fromDate, toDate,start_time,end_time){

//   var furl = "http://18.216.208.225:3000/v1/demographics/installation/5a42030e1ac137000520d8c4/range/" + fromDate + "/" + toDate + "?st="+start_time+"&et="+end_time;
 
//   $.ajax({

//     headers: {
//       'Access-Control-Allow-Headers': '*',
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//       'x-client-id': 'digispc',
//       'x-api-key': '20d24f4d6cc964cae3050afd1610c29b'
//     },


//     url: furl,
//     crossDomain: true,
//     method: 'GET',
//     dataType: 'JSON',
//     success: function (data) {
//     //   //console.log("Data was ", data);
//     //   //console.log("Data was ", data.data[0].items);
    
//      var i=0;
//      var it=[];
//      maleCount = [];
//     femaleCount = [];

//     totalMale=0;
//     totalFeMale=0;
//     sumMale=0;
//     sumFemale=0;
//       for (let item of data.data[0].items) {
//         for (i=0;i<20;i++){
//             //console.log('man', item.male[i]);
//             maleCount.push(item.male[i]);
//             totalMale=totalMale + item.male[i];
//             femaleCount.push(item.female[i]);
//             totalFeMale=totalFeMale + item.female[i];
//             demodata(item.male[i],item.female[i],i);
            
            
//         }
 
//         i++;
      
//       }
//       avgMALE= sumMale/totalMale;
//       avgFEMALE= sumFemale/totalFeMale;
//       if(!avgMALE){
//         avgMALE=0;
//       }
//       if(!avgFEMALE){
//         avgFEMALE=0;
//       }
//       document.getElementById("avgMale").innerHTML = Math.round(avgMALE);
//       document.getElementById("avgFeMale").innerHTML = Math.round(avgFEMALE);
//     }
//   });
// }
// function demodata(male,female,i){


//   switch(i){
//     case 0:
//       sumMale= sumMale + (2*male);
//       sumFemale= sumFemale + (2*female);
//       break;

//     case 1:
//       sumMale= sumMale + (5*male);
//       sumFemale= sumFemale + (5*female);
//       break;

//     case 2:
//       sumMale= sumMale + (12*male);
//       sumFemale= sumFemale + (12*female);
//       break;

//     case 3:
//       sumMale= sumMale + (17*male);
//       sumFemale= sumFemale + (17*female);
//       break;
    
//     case 4:
//       sumMale= sumMale + (22*male);
//       sumFemale= sumFemale + (22*female);
//       break;

//     case 5:
//       sumMale= sumMale + (27*male);
//       sumFemale= sumFemale + (27*female);
//       break;

//     case 6:
//       sumMale= sumMale + (32*male);
//       sumFemale= sumFemale + (32*female);
//       break;

//     case 7:
//     sumMale= sumMale + (37*male);
//     sumFemale= sumFemale + (37*female);
//     break;
//     case 8:
//     sumMale= sumMale + (42*male);
//     sumFemale= sumFemale + (42*female);
//     break;
//     case 9:
//     sumMale= sumMale + (47*male);
//     sumFemale= sumFemale + (47*female);
//     break;
//     case 10:
//     sumMale= sumMale + (52*male);
//     sumFemale= sumFemale + (52*female);
//     break;
//     case 11:
//     sumMale= sumMale + (57*male);
//     sumFemale= sumFemale + (57*female);
//     break;
//     case 12:
//     sumMale= sumMale + (62*male);
//     sumFemale= sumFemale + (62*female);
//     break;
//     case 13:
//     sumMale= sumMale + (67*male);
//     sumFemale= sumFemale + (67*female);
//     break;
//     case 14:
//     sumMale= sumMale + (72*male);
//     sumFemale= sumFemale + (72*female);
//     break;
//     case 15:
//     sumMale= sumMale + (77*male);
//     sumFemale= sumFemale + (77*female);
//     break;
//     case 16:
//     sumMale= sumMale + (82*male);
//     sumFemale= sumFemale + (82*female);
//     break;
//     case 17:
//     sumMale= sumMale + (87*male);
//     sumFemale= sumFemale + (87*female);
//     break;
//     case 18:
//     sumMale= sumMale + (92*male);
//     sumFemale= sumFemale + (92*female);
//     break;
//     case 19:
//     sumMale= sumMale + (97*male);
//     sumFemale= sumFemale + (97*female);
//     break;
      
//     // '0-4'
//     // '5-9'
//     // '10-14'
//     // '15-19'
//     // '20-24'
//     // '25-29'
//     // '30-34'
//     // '35-39'
//     // '40-44'
//     // '45-49'
//     // '50-54'
//     // '55-59'
//     // '60-64'
//     // '65-69'
//     // '70-74'
//     // '75-79'
//     // '80-84'
//     // '85-89'
//     // '90-94'
//     // '95-*'
//   }
// }