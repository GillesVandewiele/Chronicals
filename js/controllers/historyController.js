/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the history views.
 */

angular.module('Chronic').controller("historyController", function($scope, dataService) {


    $scope.listItems = dataService.getHeadacheList();

    /* Onload fill event list of the calendar */
    $scope.fillEvents = function () {
    	$scope.listItems = dataService.getHeadacheList();
    	if($scope.listItems) Array.prototype.push.apply($scope.listItems, dataService.getMedicineList());
    	else $scope.listItems = dataService.getMedicineList();
        if($scope.listItems != null && $scope.listItems.length>0)
            $scope.listItems.sort(function(a,b){
                return b.intensityValues[0].key - a.intensityValues[0].key;
            });
        //document.getElementById('history').style.display = 'none';

        console.log("opgeroepen", $scope.listItems);

        // page is now ready, initialize the calendar...

        $('#calendar').fullCalendar({
            /* Identify the structure for the header*/
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },

            nextDayThreshold: "00:00:01",

            eventRender: function (event, element) {
                element.attr('href', 'javascript:void(0);');
                element.click(function() {
                    //onclick functie van de events in de kalender
                    $("#startTime").html(moment(event.start).format('MMM Do h:mm A'));
                    $("#endTime").html(moment(event.end).format('MMM Do h:mm A'));
                    $("#eventInfo").html(event.description);
                    $("#eventLink").attr('href', event.url);
                    alert("Start: "+moment(event.start).format('MMM Do h:mm A')+"\nEnd: "+moment(event.end).format('MMM Do h:mm A')+"\nTitel: "+event.title+"\nIntensity: "+event.intensity+"\nMedicijn: "+event.medicine);
                    $("#eventContent").show();
                });
            },

        });

        document.getElementById('calendar').style.display = 'block';
        if(!$scope.listItems) { $('#loadingImg').hide(); return; }
        for(i =0; i<$scope.listItems.length; i++){
            if($scope.listItems[i].hasOwnProperty("end")){
            	console.log($scope.listItems[i]);
                $('#calendar').fullCalendar('renderEvent',
                    {
                        title: "Hoofdpijn"
                        , start: $scope.listItems[i].intensityValues[0].key
                        , end: $scope.listItems[i].end
                        , intensity: $scope.listItems[i].intensityValue
                        , color: '#f9332f'
                    }, true);
            }else{
                $('#calendar').fullCalendar('renderEvent',
                    {
                        title: "Medicijn"
                        , start: $scope.listItems[i].start
                        , medicine: $scope.listItems[i].name
                        , quantity: $scope.listItems[i].quantity
                        , color: '#0cc80c'
                    }, true);
            }
        }



        console.log("Loading changed");
        $('#loadingImg').hide();




        //$('#calendar').fullCalendar('renderEvent',
        //    eventSources= [
        //
        //        // your event source
        //        {
        //            events: [ // put the array in the `events` property
        //                {
        //                    title: 'Medicijn',
        //                    start: '2015-10-18T12:30:00'
        //                },
        //                {
        //                    title: 'Hoofdpijn',
        //                    start: '2015-10-19T12:30:00',
        //                    end: '2015-10-22T12:30:00'
        //                },
        //                {
        //                    title: 'Medicijn',
        //                    start: '2015-10-25T12:30:00'
        //                }
        //            ],
        //            color: 'black',     // an option!
        //            textColor: 'yellow' // an option!
        //        }
        //
        //        // any other event sources...
        //
        //    ]
        //, true);
    };

    ons.ready(function() {


        historyNavigator.on('postpush', function(event) {

            // page is now ready, initialize the calendar...
            $('#calendar').fullCalendar({
                /* Identify the structure for the header*/
                header: {
                    left: 'today',
                    center: 'prev, title, next',
                    right: 'month,basicWeek,basicDay'
                },

                nextDayThreshold: "00:00:01",

                eventRender: function (event, element) {
                    element.attr('href', 'javascript:void(0);');
                    element.click(function() {

                        $("#startTime").html(moment(event.start).format('MMM Do h:mm A'));
                        $("#endTime").html(moment(event.end).format('MMM Do h:mm A'));
                        $("#eventInfo").html(event.description);
                        $("#eventLink").attr('href', event.url);
                        $scope.listClick(event);
                        //alert("Start: "+moment(event.start).format('MMM Do h:mm A')+"\nEnd: "+moment(event.end).format('MMM Do h:mm A')+"\nTitel: "+event.title+"\nIntensity: "+event.intensity+"\nMedicijn: "+event.medicine);
                        $("#eventContent").show();
                    });
                }
            });
            $scope.fillEvents();






        });

    });

    $scope.goNextPage = function(){
        historyNavigator.pushPage('calendarView.html', {onTransitionEnd: '$scope.fillEvents()'});
    };

    $scope.listClick = function(obj){
        if(obj.hasOwnProperty('end')){
            dataService.setCurrentHeadache(obj);
            location.href='detailedHeadache.html'
        }else{
            dataService.setCurrentMedicine(obj);
            console.log(obj)
        }

    }

    $scope.getTimeDateString = function(tijdstip){
        var datum = new Date(tijdstip.intensityValues[0].key);
        return ""+(datum.getDate())+"/"+(datum.getMonth()+1)+" "+datum.getHours()+":"+datum.getMinutes();
    }

});


    //window.onload = $scope.fillEvents;
    //});



