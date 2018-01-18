function loadOccupancyCalendar(){
    // page is now ready, initialize the calendar... 
    var today = new Date
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
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
            rendering:true,
            eventLimit: true, // allow "more" link when too many events

            dayRender: function (date, cell) {

                date = moment(date).format("YYYY-M-DD");

                console.log('kunal'+date);

                //utilisation[]

                if (date === currentDate) {
                    $(cell).html('<div class="utilization-div" >50% utilization</div>');
                }

            },
            dayClick: function (date) {

                $(this).css('background-color', 'yellow');;

            },
            events: [
                {
                    title: 'All Day Event',
                    start: '2018-01-01'
                },
                {
                    title: 'Long Event',
                    start: '2018-01-07',
                    end: '2018-01-10'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2018-12-09T16:00:00'
                },
                {
                    title: 'Lunch',
                    start: '2018-07-16T12:00:00'
                },
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2018-01-28'
                }
            ]
        });
}
