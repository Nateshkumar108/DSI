
// data imported from roomVsSensorMap.json
var myData = data;

$(document).ready(function () {

});

$('#sensorDropDownList').change(function () {

	// check the pair of Room and Sensor for the functionality to be shown.

	var selectedRoom = $('#dd').val();
	var selectedSensor = $('#sensorDropDownList :selected').text();

	showDataFor(selectedRoom, selectedSensor);
	
});

//Following ID belongs for a Room DDL
$('#dd').change(function() {
	// Populate Sensors DDL according to selected room.

	var selectedRoom = $('#dd').val();

	console.log("selected value was ", selectedRoom);

	var sensorsArr = myData[selectedRoom];

	if (sensorsArr != null) {
		$('#sensorDropDownList').html('');
		for (var i = 0; i < sensorsArr.length; i++) {
			$('#sensorDropDownList').append("<option value=''>"+sensorsArr[i]+"</option>");
		}
	}

	// show the respective sensor's data.

	var selectedSensor = $('#sensorDropDownList :selected').text();

	showDataFor(selectedRoom, selectedSensor);


});

function showDataFor(room, sensor) {

	console.log("showDataFor room: " + room + " and sensor: " + sensor);

	if ((room == "r704" && sensor == "001438") || (room == "r705" && sensor == "001D5F")) {
		// show Heatmap

		console.log("Show Track Map");

		$('#trkMap').click();
	} else if ((room == "r705" && sensor == "001EAA")) {
		// show Demographics
		$('#agc').click();

		console.log("Show Demographics");
	} else if ((room == "r706" && sensor == "001EEC")) {
		// show People Counter
		$('#ppc').click();

		console.log("Show People Counter");
	}


}



console.log("modification js was loaded");