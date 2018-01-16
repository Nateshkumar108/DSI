var startDate;
var monthDate;
var totalDays;
var prevMonth;
var preYear;
var weekDate;
var monthDate;
function avgData(){
    
  var today = new Date();
      var day = today.getDate();
      var month = today.getMonth() + 1;
      var year = today.getFullYear();
      var todayDate = year + "-" + month + "-" + day;
      todayD=todayDate.split("-");
      if(todayD[2]==7){
        weekDate=1;
      }
      if(todayD[2]>7){
        weekDate=todayD[2]-7;
      }
      else if(todayD[2]<7){
        daysLeft= 7-todayD[2];
        var dim=daysInMonth(month,year);
        //console.log("~~~~~~~~~~~~~~DIM", dim);
        weekDate=dim-daysLeft;
       
      }
      startDate= year + "-" + month + "-" + weekDate;
     fromDate=startDate;
     todayDate= year + "-" + month + "-" + day;
     toDate=todayDate;
     sumMaleWeek=0;
     
     var furl = "http://18.216.208.225:3000/v1/demographics/installation/5a42030e1ac137000520d8c4/days/" + fromDate + "/" + toDate + "?st=00:00&et=24:00";
 
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

     console.log("helo");
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
    //console.log("Data: " ,  data.data[0].items);
    var dataValue=data.data[0].items;
    // console.log("Data: " ,  dataValue);
    var j=0;
      for (let item of data.data[0].items) {

    //  console.log("helo", item);
        for (i=0;i<20;i++){
           //console.log('%%%%man', item.male[i]);
            totalMale=totalMale + item.male[i];
           // console.log('%%%%totalMale', totalMale);
            totalFeMale=totalFeMale + item.female[i];
            demodata(item.male[i],item.female[i],i);
            
            
         }
 
        // j++;
      
      }
      console.log("________",sumMale);
      avgMALE= sumMale/totalMale;
      avgFEMALE= sumFemale/totalFeMale;
      console.log("!!!!!!!!!!!! avgMaleWEEK",avgMALE);
      document.getElementById("avgMaleWeek").innerHTML = Math.round(avgMALE);
      document.getElementById("avgFemaleWeek").innerHTML = Math.round(avgFEMALE);
      

    //    if(!avgMALE){
    //      avgMALE=0;
    //   }
    //    if(!avgFEMALE){
    //      avgFEMALE=0;
    //    }
    //    document.getElementById("avgMale").innerHTML = Math.round(avgMALE);
    //    document.getElementById("avgFeMale").innerHTML = Math.round(avgFEMALE);
     }
    
  });
    //   for(i=0;i<7;i++){
    //     fromDate = year + "-" + month + "-" + weekDate;
    //     toDate = year + "-" + month + "-" + weekDate;
    //     demoStats(fromDate, toDate,start_time,end_time)

    //     weekDate=weekDate+ 1;
        
    //     sumMaleWeek = sumMaleWeek + avgMALE;
    //     console.log("*********** sumMaleWeek" + sumMaleWeek);
    //     sumFemaleWeek = sumFemaleWeek + avgFEMALE;
        
    //   }
    //   avgMaleWEEK=sumMaleWeek/7;
    //   avgFemaleWEEK=sumFemaleWeek/7;
     
    }
  
    function avgMonthData(){
        // todayD=0;
        // fromDate=0;
        // daysLeft=0;
        // monthDate=0;
        // var today = new Date();
            // var day = today.getDate();
            // var month = today.getMonth() + 1;
            // var year = today.getFullYear();
            // var todayDate = year + "-" + month + "-" + day;
        //     todayD=todayDate.split("-");
        //     monthDate=0;
        //     prevMonth=month;
        //        preYear=year;
        //     if(todayD[2]==30){
        //       monthDate=1;
        //     }
        //     if(todayD[2]>30){
        //       monthDate=todayD[2]-30;
        //     }
        //     else if(todayD[2]<30){
        //       daysLeft= 30 - todayD[2];
                
        //       if(prevMonth==1){
        //         prevMonth=12;
        //         preYear=year-1;
        //       }
        //       else{
        //         prevMonth=prevMonth-1;
        //       }
        //       console.log("~~~~~~~~~~~~~~prevMonth",prevMonth);
        //       console.log("~~~~~~~~~~~~~~preYear",preYear);
        //       dim=daysInMonth(prevMonth,preYear);
        //       console.log("~~~~~~~~~~~~~~DIM",dim);
        //       monthDate=dim-daysLeft;
             
        //     }
        //     console.log("***** monthDate",monthDate);
        //     startDate= year + "-" + month + "-" + monthDate;
        //    fromDate=startDate;
        //    todayDate= year + "-" + month + "-" + day;
        //    toDate=todayDate;
        //    sumMaleWeek=0;
        

        var todate = new Date();
        var day = todate.getDate();
        var month = todate.getMonth() + 1;
        var year = todate.getFullYear();

        var toDate = year + "-" + month + "-" + day;
        var fromdate = new Date(todate.getTime() - 30*24*3600*1000);
        var day = fromdate.getDate();
        var month = fromdate.getMonth() + 1;
        var year = fromdate.getFullYear();

        var fromDate = year + "-" + month + "-" + day;
        console.log("***** startDate",fromDate);
        console.log("***** toDate",toDate);
           
        var furl = "http://18.216.208.225:3000/v1/demographics/installation/5a42030e1ac137000520d8c4/days/" + fromDate + "/2018-01-17?st=00:00&et=24:00"; 
       
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
      
           console.log("mohito");
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
          console.log("Data: " ,  data.data[0].items);
          
          // console.log("Data: " ,  dataValue);
          var j=0;
            for (let item of data.data[0].items) {
      
          //  console.log("helo", item);
              for (i=0;i<20;i++){
                 //console.log('%%%%man', item.male[i]);
                  totalMale=totalMale + item.male[i];
                 console.log('%%%%totalMale', totalMale);
                  totalFeMale=totalFeMale + item.female[i];
                  demodata(item.male[i],item.female[i],i);
                  
                  
               }
       
              // j++;
            
            }
            // console.log("________",sumMale);
            avgMALE= sumMale/totalMale;
            avgFEMALE= sumFemale/totalFeMale;
            console.log("!!!!!!!!!!!! avgMaleWEEK",avgMALE);
            document.getElementById("avgMaleMonthWeek").innerHTML = Math.round(avgMALE);
            document.getElementById("avgFemaleMonthWeek").innerHTML = Math.round(avgFEMALE);
      
          //    if(!avgMALE){
          //      avgMALE=0;
          //   }
          //    if(!avgFEMALE){
          //      avgFEMALE=0;
          //    }
          //    document.getElementById("avgMale").innerHTML = Math.round(avgMALE);
          //    document.getElementById("avgFeMale").innerHTML = Math.round(avgFEMALE);
           }
        });
          //   for(i=0;i<7;i++){
          //     fromDate = year + "-" + month + "-" + weekDate;
          //     toDate = year + "-" + month + "-" + weekDate;
          //     demoStats(fromDate, toDate,start_time,end_time)
      
          //     weekDate=weekDate+ 1;
              
          //     sumMaleWeek = sumMaleWeek + avgMALE;
          //     console.log("*********** sumMaleWeek" + sumMaleWeek);
          //     sumFemaleWeek = sumFemaleWeek + avgFEMALE;
              
          //   }
          //   avgMaleWEEK=sumMaleWeek/7;
          //   avgFemaleWEEK=sumFemaleWeek/7;
           
          }
        

function daysInMonth(preMonth,preYear){
  switch(preMonth){
    case 1,3,5,7,8,10,12:
      totalDays=31;
      break;
    case 2:
      if(preYear%4==0){
        totalDays=29;
      }
      totalDays=28;
      break;  
    case 4,6,9,11:
      totalDays=30;
      break;

  }
  return totalDays;
}

function demoStats(fromDate, toDate,start_time,end_time){

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
            totalMale=totalMale + item.male[i];
            femaleCount.push(item.female[i]);
            totalFeMale=totalFeMale + item.female[i];
            demodata(item.male[i],item.female[i],i);
            
            
        }
 
        i++;
      
      }
      avgMALE= sumMale/totalMale;
      avgFEMALE= sumFemale/totalFeMale;
      if(!avgMALE){
        avgMALE=0;
      }
      if(!avgFEMALE){
        avgFEMALE=0;
      }
      document.getElementById("avgMale").innerHTML = Math.round(avgMALE);
      document.getElementById("avgFeMale").innerHTML = Math.round(avgFEMALE);
    }
  });
}
function demodata(male,female,i){


  switch(i){
    case 0:
      sumMale= sumMale + (2*male);
      sumFemale= sumFemale + (2*female);
      break;

    case 1:
      sumMale= sumMale + (5*male);
      sumFemale= sumFemale + (5*female);
      break;

    case 2:
      sumMale= sumMale + (12*male);
      sumFemale= sumFemale + (12*female);
      break;

    case 3:
      sumMale= sumMale + (17*male);
      sumFemale= sumFemale + (17*female);
      break;
    
    case 4:
      sumMale= sumMale + (22*male);
      sumFemale= sumFemale + (22*female);
      break;

    case 5:
      sumMale= sumMale + (27*male);
      sumFemale= sumFemale + (27*female);
      break;

    case 6:
      sumMale= sumMale + (32*male);
      sumFemale= sumFemale + (32*female);
      break;

    case 7:
    sumMale= sumMale + (37*male);
    sumFemale= sumFemale + (37*female);
    break;
    case 8:
    sumMale= sumMale + (42*male);
    sumFemale= sumFemale + (42*female);
    break;
    case 9:
    sumMale= sumMale + (47*male);
    sumFemale= sumFemale + (47*female);
    break;
    case 10:
    sumMale= sumMale + (52*male);
    sumFemale= sumFemale + (52*female);
    break;
    case 11:
    sumMale= sumMale + (57*male);
    sumFemale= sumFemale + (57*female);
    break;
    case 12:
    sumMale= sumMale + (62*male);
    sumFemale= sumFemale + (62*female);
    break;
    case 13:
    sumMale= sumMale + (67*male);
    sumFemale= sumFemale + (67*female);
    break;
    case 14:
    sumMale= sumMale + (72*male);
    sumFemale= sumFemale + (72*female);
    break;
    case 15:
    sumMale= sumMale + (77*male);
    sumFemale= sumFemale + (77*female);
    break;
    case 16:
    sumMale= sumMale + (82*male);
    sumFemale= sumFemale + (82*female);
    break;
    case 17:
    sumMale= sumMale + (87*male);
    sumFemale= sumFemale + (87*female);
    break;
    case 18:
    sumMale= sumMale + (92*male);
    sumFemale= sumFemale + (92*female);
    break;
    case 19:
    sumMale= sumMale + (97*male);
    sumFemale= sumFemale + (97*female);
    break;
      
    // '0-4'
    // '5-9'
    // '10-14'
    // '15-19'
    // '20-24'
    // '25-29'
    // '30-34'
    // '35-39'
    // '40-44'
    // '45-49'
    // '50-54'
    // '55-59'
    // '60-64'
    // '65-69'
    // '70-74'
    // '75-79'
    // '80-84'
    // '85-89'
    // '90-94'
    // '95-*'
  }
}