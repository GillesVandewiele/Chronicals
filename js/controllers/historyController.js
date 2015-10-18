/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the history views.
 */


angular.module('Chronic').controller("historyController", function($scope){

    $scope.listItems = [
        /*
                parameters:
                            headache/mecicine 0/1
                                    headache
                                                    startDate+time
                                                    endDate+time
                                                    Intensity
                                    medicine
                                                    date+time
                                                    name of medicine
                                                    quantity
         */
                        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), "Sumatriptan", Math.random(200)],
        [new Date(), "Sumatriptan", Math.random(200)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), "Sumatriptan", Math.random(200)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), "Sumatriptan", Math.random(200)]
    ];
    });

$('#calendar').fullCalendar({

    eventSources: [

        // your event source
        {
            events: [ // put the array in the `events` property
                {
                    title  : 'event1',
                    start  : '2015-10-17'
                },
                {
                    title  : 'event2',
                    start  : '2015-10-18',
                    end    : '2010-10-07'
                },
                {
                    title  : 'event3',
                    start  : '2010-01-09T12:30:00',
                }
            ],
            color: 'black',     // an option!
            textColor: 'yellow' // an option!
        }

        // any other event sources...

    ]

});
