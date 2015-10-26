/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the history views.
 */

angular.module('Chronic').controller("historyController", function($scope, dataService) {

    $scope.getTimeDateString = function(tijdstip){
        var datum = new Date(tijdstip);
        return ""+(datum.getDate())+"/"+(datum.getMonth()+1)+" "+(datum.getHours()<10?'0':'')+datum.getHours()+":"+(datum.getMinutes()<10?'0':'')+datum.getMinutes();
    };

    $scope.listItems =[];
    if($scope.listItems.length>0){
        $scope.listItems = [];
    }

    $scope.listItems = [];
    Array.prototype.push.apply($scope.listItems,dataService.getHeadacheList());
    Array.prototype.push.apply($scope.listItems, dataService.getMedicineList());

    if($scope.listItems != null && $scope.listItems.length>0)
        $scope.listItems.sort(function(a,b){ //sort the list on their start dates // date of consumption

            if(a.hasOwnProperty('end')){//if it is a headache it has property end
                dateA = a.intensityValues[0].key;
            }else{
                dateA = a.date;
            }

            if(b.hasOwnProperty('end')){//if it is a headache it has property end
                dateB = b.intensityValues[0].key;
            }else{
                dateB = b.date;
            }
            return (new Date(dateB.toString())) - (new Date(dateA.toString()));
        });

    /* Onload fill event list of the calendar */
    $scope.fillEvents = function () {

        var dateA = null;
        var dateB = null;
        $scope.listItems =[];
        if($scope.listItems.length>0){
            $scope.listItems = [];
        }

        Array.prototype.push.apply($scope.listItems,dataService.getHeadacheList());
        Array.prototype.push.apply($scope.listItems, dataService.getMedicineList());

        if($scope.listItems != null && $scope.listItems.length>0)
            $scope.listItems.sort(function(a,b){ //sort the list on their start dates // date of consumption

                if(a.hasOwnProperty('end')){//if it is a headache it has property end
                    dateA = a.intensityValues[0].key;
                }else{
                    dateA = a.date;
                }

                if(b.hasOwnProperty('end')){//if it is a headache it has property end
                    dateB = b.intensityValues[0].key;
                }else{
                    dateB = b.date;
                }
                return (new Date(dateB.toString())) - (new Date(dateA.toString()));
            });


        // page is now ready, initialize the calendar...
        $('#calendar').fullCalendar({
            /* Identify the structure for the header*/
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            ignoreTimezone: false,
            height: $('#calendar').height() - 2,

            nextDayThreshold: "00:00:01"
        });

        document.getElementById('calendar').style.display = 'block';
        if(!$scope.listItems) { $('#loadingImg').hide(); return; }
        for(i =0; i<$scope.listItems.length; i++){
            if($scope.listItems[i].hasOwnProperty("end")){
                $('#calendar').fullCalendar('renderEvent',
                    {
                        title: "Hoofdpijn"
                        , start: $scope.listItems[i].intensityValues[0].key
                        , end: $scope.listItems[i].end
                        , intensity: $scope.listItems[i].intensityValue
                        , color: '#f9332f'
                        , timeZone: "Europe/Brussels"
                        , object: $scope.listItems[i]
                    }, true);
            }else{
                $('#calendar').fullCalendar('renderEvent',
                    {
                        title: "Medicijn"
                        , start: $scope.listItems[i].date
                        , end: $scope.listItems[i].date
                        , medicine: $scope.listItems[i].drug.name
                        , quantity: $scope.listItems[i].quantity
                        , color: '#0cc80c'
                        , timeZone: "Europe/Brussels"
                        , object: $scope.listItems[i]
                    }, true);
            }
        }

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
        $('.hidden').removeClass("hidden");

        historyNavigator.on('postpush', function(event) {

            // page is now ready, initialize the calendar...
            $('#calendar').fullCalendar({
                /* Identify the structure for the header*/
                header: {
                    left: 'today',
                    center: 'prev, title, next',
                    right: 'month,basicWeek,basicDay'
                },
                ignoreTimezone: false,
                height: $('#calendar').height() - 2,
                nextDayThreshold: "00:00:01",

                eventRender: function (event, element) {
                    element.attr('href', 'javascript:void(0);');
                    element.click(function() {
                        $scope.listClick(event);
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
        console.log("listClick event:", obj);
        if(obj.title == "Hoofdpijn" || obj.hasOwnProperty('intensityValues')){
            if(obj.hasOwnProperty('title')){
                dataService.setCurrentHeadache(obj.object);
            }else{
                dataService.setCurrentHeadache(obj);
            }
            location.href='detailedHeadache.html';
        }else{
            if(obj.hasOwnProperty('title')){
                dataService.setCurrentMedicine(obj.object);
            }else{
                dataService.setCurrentMedicine(obj);
            }

            location.href = 'detailedMedicine.html';
        }

    };



});


    //window.onload = $scope.fillEvents;
    //});



