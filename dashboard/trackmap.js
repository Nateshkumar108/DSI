function generateTrackmap(fromDate, toDate, startTime, endTime) {
    /* Currently the api only support single day data. Need to remove the below line once api start
       supporting multiple days. */
    toDate = fromDate;
    let furl ="http://18.216.208.225:3001/v1/tracker/motion/installation/5a4e2d0b9963080006dc9dfb/compose/" + fromDate + "/" + toDate + "?st="+ startTime +"&et="+ endTime +"&blackpoint=25&whitepoint=1000";

    $('#page-loader').show();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', furl, true);
    xhr.responseType = 'arraybuffer';
    xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('x-client-id', 'digispc');
    xhr.setRequestHeader('x-api-key', '20d24f4d6cc964cae3050afd1610c29b');

    xhr.onload = function (e) {
        if (this.status == 200) {
            let data = btoa(String.fromCharCode.apply(null, new Uint8Array(this.response)));
            $('#page-loader').hide();
            drawArea(data, fromDate, toDate, startTime, endTime);
            

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

function drawArea(data, fromDate, toDate, startTime, endTime) {
    let stDate = fromDate; 
    let etDate = toDate;
    let stTime = startTime;
    let etTime = endTime;
    if(canvas) {
        canvas.dispose();
    }
    canvas = new fabric.Canvas('trackmap', {
        preserveObjectStacking: true,
        hoverCursor: 'default',
        selection: false
    });

    
    let mainImage = "data:image/png;base64," + data;

    canvas.setBackgroundImage('img/floor.PNG', canvas.renderAll.bind(canvas), {
        // Needed to position backgroundImage at 0/0
        originX: 'left',
        originY: 'top'
    });

    fabric.Image.fromURL(mainImage, function (oImg) {
        oImg.lockMovementX = true;
        oImg.lockMovementY = true;
        oImg.hasControls = false;
        canvas.add(oImg);
    });


    let rect, isDown, origX, origY, bX, bY, bWidth, bHeight, group;

    canvas.on('mouse:down', function (o) {
        isDown = true;
        let pointer = canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        rect = new fabric.Rect({
            left: origX,
            top: origY,
            originX: 'left',
            originY: 'top',
            width: pointer.x - origX,
            height: pointer.y - origY,
            angle: 0,
            fill: 'rgba(0,0,0,0)',
            stroke: 'black',
            transparentCorners: false
        });
        canvas.add(rect);
    });

    canvas.on('mouse:move', function (o) {
        if (!isDown) {
            return;
        }
        let pointer = canvas.getPointer(o.e);

        if (origX > pointer.x) {
            rect.set({ left: Math.abs(pointer.x) });
        }

        if (origY > pointer.y) {
            rect.set({ top: Math.abs(pointer.y) });
        }
        rect.set({ width: Math.abs(origX - pointer.x) });
        rect.set({ height: Math.abs(origY - pointer.y) });

        canvas.renderAll();
    });

    canvas.on('mouse:up', function (o) {
        let pos = canvas.getPointer(o.e);
        isDown = false;
        bX = parseInt(rect.get('left'));
        bY = parseInt(rect.get('top'));
        bWidth = parseInt(rect.get('width'));
        bHeight = parseInt(rect.get('height'));
        if (bWidth < 20 && bHeight < 20) {
            activeObj = canvas.getActiveObject();
            if (activeObj) {
                if (Math.abs(pos.x - activeObj.left) < 18 && Math.abs(pos.y - activeObj.top) < 27 &&  Math.abs(pos.y - activeObj.top) > 12) {
                    canvas.remove(canvas.getActiveObject());
                } else {
                    canvas.remove(rect);
                    canvas.renderAll();
                }
            }
        } else {
            let boxCoordintates = bX + "," + bY + "-" + (bX + bWidth) + "," + (bY + bHeight);
            getBoxData(boxCoordintates);
        }
    });

    function getBoxData(coordinates){
        let furl = "http://18.216.208.225:3001/v1/tracker/installation/5a4e2d0b9963080006dc9dfb/aoi/" + stDate + "/" + etDate + "?st="+ stTime + "&et="+ etTime +"&zones=" + coordinates;

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
                let boxData = data["data"][0];

                let closeIcon = new fabric.Text('\uf057', {
                    fontSize: 20,
                    fontFamily: 'FontAwesome',
                    left: bX - 20,
                    top: bY - 10,
                });

                let txtArea =  new fabric.Text('Area', {
                    fontSize: 15,
                    fontFamily: 'Calibri',
                    fontWeight: 'bold',
                    left: ((bWidth/2) + bX) - 12,
                    top: bY + 2,
                });

                let bAvgSecLeft = ((bWidth/2) + bX) - 25;
                let bAvgSecTop = ((bHeight / 2) + bY) - 10;
                let bAvgSecText = "Avg: " + boxData["averageTimeSpent"] + " secs"
                let bAvgSec =  new fabric.Text(bAvgSecText, {
                    fontSize: 15,
                    fontFamily: 'Calibri',
                    fontWeight: 'bold',
                    left: bAvgSecLeft,
                    top: bAvgSecTop,
                });

            
                let bNorthLeft = ((bWidth/2) + bX) - 25;
                let bNorthTop = bY - 20;
                let bNorthText = "\uf176" + boxData["north"]["out"] + "  \uf175" + boxData["north"]["in"];
                let bNorth = new fabric.Text(bNorthText, {
                    fontSize: 15,
                    fontFamily: 'FontAwesome',
                    left: bNorthLeft,
                    top: bNorthTop,
                });

                let bSouthLeft = ((bWidth/2) + bX) - 25;
                let bSouthTop = bY + bHeight + 5;
                let bSouthText = "\uf176" + boxData["south"]["in"] + "  \uf175" + boxData["south"]["out"];
                let bSouth = new fabric.Text(bSouthText, {
                    fontSize: 15,
                    fontFamily: 'FontAwesome',
                    left: bSouthLeft,
                    top: bSouthTop,
                });

                let bWestLeft = bX - 20;
                let bWestOutIcon = new fabric.Text("\uf177", {
                    fontSize: 15,
                    fontFamily: 'FontAwesome',
                    left: bWestLeft,
                    top: bAvgSecTop - 15,
                });
                let bWestOutText = JSON.stringify(boxData["west"]["out"]);
                let bWestOut = new fabric.Text(bWestOutText, {
                    fontSize: 15,
                    fontFamily: 'FontAwesome',
                    left: bWestLeft,
                    top: bAvgSecTop - 5,
                });
                let bWestInIcon = new fabric.Text("\uf178", {
                    fontSize: 15,
                    fontFamily: 'FontAwesome',
                    left: bWestLeft,
                    top: bAvgSecTop + 12,
                });
                let bWestInText = JSON.stringify(boxData["west"]["in"]);
                let bWestIn = new fabric.Text(bWestInText, {
                    fontSize: 15,
                    fontFamily: 'FontAwesome',
                    left: bWestLeft,
                    top: bAvgSecTop + 22,
                });


                let bEastLeft = bX + bWidth + 5;
                let bEastOutIcon = new fabric.Text("\uf177", {
                    fontSize: 15,
                    fontFamily: 'FontAwesome',
                    left: bEastLeft,
                    top: bAvgSecTop - 15,
                });
                let bEastOutText = JSON.stringify(boxData["east"]["in"]);
                let bEastOut = new fabric.Text(bEastOutText, {
                    fontSize: 15,
                    fontFamily: 'FontAwesome',
                    left: bEastLeft,
                    top: bAvgSecTop - 5,
                });
                let bEastInIcon = new fabric.Text("\uf178", {
                    fontSize: 15,
                    fontFamily: 'FontAwesome',
                    left: bEastLeft,
                    top: bAvgSecTop + 12,
                });
                let bEastInText = JSON.stringify(boxData["east"]["out"]);
                let bEastIn = new fabric.Text(bEastInText, {
                    fontSize: 15,
                    fontFamily: 'FontAwesome',
                    left: bEastLeft,
                    top: bAvgSecTop + 22,
                });

                let groupValues = [rect, closeIcon, txtArea, bAvgSec, bNorth, bSouth, bWestOutIcon, bWestOut, bWestInIcon, bWestIn, bEastOutIcon, bEastOut, bEastInIcon, bEastIn];

                group = new fabric.Group(groupValues, {
                    lockMovementX: true,
                    lockMovementY: true,
                    hasControls: false
                });

                let lastItem = canvas.getObjects().length - 1;
                canvas.remove(canvas.item(lastItem));

                canvas.add(group);
                canvas.renderAll();
                

            }
        });
    }
}


