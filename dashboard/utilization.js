function getPeopleCounterAndFindUtilization(fromDate, toDate, value,start_time,end_time) {
  var furl = "http://18.216.208.225:3000/v1/peoplecounter/installation/5a420343b7e14e0007d73376/hours/" + fromDate + "/" + toDate + "?st="+start_time+"&et="+end_time;

  var inppc = [];
  var times = [];


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
		  console.log("data coming from getPeopleCounterAndFindUtilization was ", data);      
    }
  });


}