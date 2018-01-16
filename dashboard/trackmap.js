function generateTrackmap(fromDt, toDt,start_time,end_time) {
    var furl ="http://18.216.208.225:3001/v1/tracker/motion/installation/5a4e2d0b9963080006dc9dfb/compose/" + fromDt + "/" + toDt + "?st="+start_time+"+&et="+ end_time +"&blackpoint=25&whitepoint=1000";

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
            drawArea(data, fromDt, toDt);

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

function drawArea(data, fromDt, toDt) {
    var canvas, context, canvaso, contexto;

    // The active tool instance.
    var tool;
    var boxCoordintates;
    var bX;
    var bY;
    var bWidth;
    var bHeight;
    var stDt = fromDt;
    var etDt = toDt;

    function init() {
        // Find the canvas element.
        canvaso = document.getElementById('trackmap');
        if (!canvaso) {
            alert('Error: I cannot find the canvas element!');
            return;
        }

        if (!canvaso.getContext) {
            alert('Error: no canvas.getContext!');
            return;
        }

        // Get the 2D canvas context.
        contexto = canvaso.getContext('2d');
        if (!contexto) {
            alert('Error: failed to getContext!');
            return;
        }


        var image = new Image();
        image.onload = function () {
            contexto.drawImage(image, 0, 0);
        };
        image.src = "data:image/png;base64," + data;

        // Add the temporary canvas.
        var container = canvaso.parentNode;
        canvas = document.createElement('canvas');
        if (!canvas) {
            alert('Error: I cannot create a new canvas element!');
            return;
        }

        canvas.id = 'imageTemp';
        canvas.width = canvaso.width;
        canvas.height = canvaso.height;
        container.appendChild(canvas);

        context = canvas.getContext('2d');

        // Attach the mousedown, mousemove and mouseup event listeners.
        canvas.addEventListener('mousedown', ev_canvas, false);
        canvas.addEventListener('mousemove', ev_canvas, false);
        canvas.addEventListener('mouseup', ev_canvas, false);
        canvas.addEventListener('click', ev_canvas, false);

        tool = new tools["rect"]();
    }

    // The general-purpose event handler. This function just determines the mouse 
    // position relative to the canvas element.
    function ev_canvas(ev) {
        if (ev.layerX || ev.layerX == 0) { // Firefox
            ev._x = ev.layerX;
            ev._y = ev.layerY;
        }

        // Call the event handler of the tool.
        var func = tool[ev.type];
        if (func) {
            func(ev);
        }
    }

    // The event handler for any changes made to the tool selector.
    function ev_tool_change(ev) {
        if (tools[this.value]) {
            tool = new tools[this.value]();
        }
    }

    // This function draws the #imageTemp canvas on top of #imageView, after which 
    // #imageTemp is cleared. This function is called each time when the user 
    // completes a drawing operation.
    function img_update() {
        contexto.drawImage(canvas, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // This object holds the implementation of each drawing tool.
    var tools = {};

    // The rectangle tool.
    tools.rect = function () {
        var tool = this;
        this.started = false;

        this.click = function (ev) {
            var x = Math.min(ev._x, tool.x0);
            var y = Math.min(ev._y, tool.y0);
            // console.log('*****************');
            // console.log(x, y, bX, bY);
        }

        this.mousedown = function (ev) {
            tool.started = true;
            tool.x0 = ev._x;
            tool.y0 = ev._y;
        };

        this.mousemove = function (ev) {
            if (!tool.started) {
                return;
            }

            var x = Math.min(ev._x, tool.x0),
                y = Math.min(ev._y, tool.y0),
                w = Math.abs(ev._x - tool.x0),
                h = Math.abs(ev._y - tool.y0);

            context.clearRect(0, 0, canvas.width, canvas.height);

            if (!w || !h) {
                return;
            }

            //Format is x1,y1-x2,y2
            boxCoordintates = x + "," + y + "-" + (x + w) + "," + (y + h);
            bX = x;
            bY = y;
            bWidth = w;
            bHeight = h;

            context.strokeRect(x, y, w, h);
        };

        this.mouseup = function (ev) {
            if (tool.started) {
                tool.mousemove(ev);
                tool.started = false;
                getBoxData(boxCoordintates, stDt, etDt);
            }
        };
    };

    init();

    function getBoxData(coordinates, fromDt, toDt) {
        var stDt = fromDt;
        var etDt = toDt;
        var furl = "http://18.216.208.225:3001/v1/tracker/installation/5a4e2d0b9963080006dc9dfb/aoi/" + stDt + "/" + etDt + "?st=00:00&et=23:59&zones=" + coordinates;

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
                var boxData = data["data"][0];
                // console.log('-----------------------');
                // console.log(boxData);
                context.font = 'bold 15px Calibri';
                context.textAlign = 'center';

                var textX = (((bX + bWidth) - bX) / 2) + bX;
                var textY = (15 + bY);
                context.fillText('Area', textX, textY);


                var bAvgSecX = textX;
                var bAvgSecY = (((bY + bHeight) - bY) / 2) + bY;
                var bAvgSecText = "Avg: " + boxData["averageTimeSpent"] + " secs"
                context.fillText(bAvgSecText, bAvgSecX, bAvgSecY);

                // context.font = '20px FontAwesome';
                // context.fillText('\uf057', bX - 10, bY - 2);

                context.font = '15px FontAwesome';
                var bNorthX = textX;
                var bNorthY = bY - 5;
                var bNorthText = "\uf176" + boxData["north"]["out"] + "  \uf175" + boxData["north"]["in"];
                context.fillText(bNorthText, bNorthX, bNorthY);

                var bSouthX = textX;
                var bSouthY = bY + bHeight + 15;
                var bSouthText = "\uf176" + boxData["south"]["in"] + "  \uf175" + boxData["south"]["out"];
                context.fillText(bSouthText, bSouthX, bSouthY);

                var bWestX = bX - 10;

                context.fillText("\uf177", bWestX, bAvgSecY - 15);
                context.fillText(boxData["west"]["out"], bWestX, bAvgSecY - 5);
                context.fillText("\uf178", bWestX, bAvgSecY + 10);
                context.fillText(boxData["west"]["in"], bWestX, bAvgSecY + 20);

                var bEastX = bX + bWidth + 10;

                context.fillText("\uf177", bEastX, bAvgSecY - 15);
                context.fillText(boxData["east"]["in"], bEastX, bAvgSecY - 5);
                context.fillText("\uf178", bEastX, bAvgSecY + 10);
                context.fillText(boxData["east"]["out"], bEastX, bAvgSecY + 20);

                img_update();

            }
        });
    }



}