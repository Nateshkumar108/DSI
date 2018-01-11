function generateTrackmap(fromDt, toDt) {
    var furl ="http://localhost:3001/v1/tracker/motion/installation/5a4e2d0b9963080006dc9dfb/extract/" + fromDt + "/" + toDt + "?st=00:00&et=23:59&blackpoint=25&whitepoint=1000";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', furl, true);
    xhr.responseType = 'arraybuffer';
    xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('x-client-id', 'digispc');
    xhr.setRequestHeader('x-api-key', '20d24f4d6cc964cae3050afd1610c29b');

    xhr.onload = function (e) {
        if (this.status == 200) {
            var data = btoa(String.fromCharCode.apply(null, new Uint8Array(this.response)));
            $("#trackmap").html('<img src="data:image/png;base64,' + data + '" />');

            // var canvas = getImageFor32BitInteger(this.response);
            // let urlForImage = canvas.toDataURL();
            // $("#trackmap").html('<img src="'+urlForImage+'" />');
        }
    };
    xhr.send();
}

function getImageFor32BitInteger(data) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = data[0];
    canvas.height = data[1];

    var dataForImage = data.slice(2, data.length);

    // create imageData object
    var idata = ctx.createImageData(800, 600);

    // set our dataForImage as source
    idata.data.set(dataForImage);

    // update canvas with new data
    ctx.putImageData(idata, 0, 0);
    return canvas;
}