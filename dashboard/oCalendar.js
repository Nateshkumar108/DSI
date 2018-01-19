function loadOccupancyCalendar() {
    // page is now ready, initialize the calendar... 
    var today = new Date
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var currentDate = yyyy + '-' + mm + '-' + dd;
    var utilization = FetchUtilization.getUtilizationDateDictionary();

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },

        defaultDate: currentDate,
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        selectable: true,
        borderColor: true,
        rendering: true,
        eventLimit: true, // allow "more" link when too many events

        dayRender: function (date, cell) {

            //console.log('kunal'+date);

            if ($('#txt-custom-cal').hasClass('active-calendar')) {

                date = moment(date).format("YYYY-MM-DD");

                if ($('#occupancyBtn').hasClass('active')) {

                    if (dateToOccupancyGlobalMap[date] == undefined) {
                        $(cell).html('<div class="occupancy-div-fail" > </div>');
                    } else {
                        $(cell).html('<div class="occupancy-div" >' + dateToOccupancyGlobalMap[date] + '</div>');
                    }

                } else if ($('#utilizationBtn').hasClass('active')) {

                    if (dateToUtilGlobalMap[date] == undefined) {
                        $(cell).html('<div class="utilization-div-fail" > </div>');
                    } else {
                        $(cell).html('<div class="utilization-div" >' + dateToUtilGlobalMap[date].toFixed(2) + ' %' + '</div>');
                    }
                    //$(cell).html(dateToUtilGlobalMap[date]);

                }
            } else if ($('#txt-main-cal').hasClass('active-calendar')) {

                date = moment(date).format("YYYY-M-D");

                if ($('#occupancyBtn').hasClass('active')) {

                    if (date === fromDate) {
                        var total = 0;
                        for (var key in timeToOccupancyGlobalMap) {
                            total += timeToOccupancyGlobalMap[key];
                        }

                        var average = total / 10;
                        $(cell).html('<div class="occupancy-div" >' + Math.round(average) + '</div>');
                    }
                } else if ($('#utilizationBtn').hasClass('active')) {

                    if (date === fromDate) {
                        var total = 0;
                        for (var key in timeToUtilGlobalMap) {
                            total += timeToUtilGlobalMap[key];
                        }

                        var average = total / 10;
                        $(cell).html('<div class="occupancy-div" >' + average.toFixed(2) + ' %' + '</div>');
                    }
                }
            }

        },
        dayClick: function (date) {

            // $(this).css('background-color', 'yellow');

        },
        events: [
            // {
            //     title: 'All Day Event',
            //     start: '2018-01-01'
            // },
            // {
            //     title: 'Long Event',
            //     start: '2018-01-07',
            //     end: '2018-01-10'
            // },
            // {
            //     id: 999,
            //     title: 'Repeating Event',
            //     start: '2018-12-09T16:00:00'
            // },
            // {
            //     title: 'Lunch',
            //     start: '2018-07-16T12:00:00'
            // },
            // {
            //     title: 'Click for Google',
            //     url: 'http://google.com/',
            //     start: '2018-01-28'
            // }
        ]
    });
}
