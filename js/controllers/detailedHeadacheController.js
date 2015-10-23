/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the history views.
 */


angular.module('Chronic').controller("detailedHeadacheController", function($scope, dataService) {
    function sortOnKeys(array) {
        if(array == null)
            return;
        var sorted = [];
        for(i=0;i<array.length; i++) {
            sorted[i] = array[i].key;
        }
        sorted = sorted.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return a-b;
        });

        var newArray = [];
        for(var i = 0; i < sorted.length; i++) {
            var sleutel = sorted[i];
            var waarde = 0;
            for(var j =0; j<sorted.length; j++){
                if(array[j].key == sleutel) {
                    waarde = array[j].value;
                    break;
                }
            }
            newArray[i] = {key: sleutel, value: waarde};
        }

        return newArray;
    }



    var current = dataService.getCurrentHeadache();
    var months = ["jan.", "feb.", "mrt.", "apr.", "mei", "jun.", "jul.", "aug.", "sept.", "okt.", "nov.", "dec."];


    if(current.start != null){
        current.start = new Date(current.start);
    }
    if (current.end != null){
        current.end = new Date(current.end);
    }
    $scope.startTime = current.start.getDate()+" "+months[current.start.getMonth()]+"    "+current.start.getHours() + ":" + current.start.getMinutes() ;
    if(current.end == null){
        current.end = new Date();

    }
    $scope.endTime = current.end.getDate()+" "+months[current.end.getMonth()]+"    "+current.end.getHours() + ":" + current.end.getMinutes() ;
    $scope.labels = [];
    $scope.data = [];
    var sorted = sortOnKeys(current.intensityValues);

    if(sorted != null){
        for(i=0; i< sorted.length; i++){
            obj = sorted[i];
            $scope.labels.push(""+obj["key"].getHours()+":"+obj["key"].getMinutes());
            $scope.data.push(obj["value"]);
        }
        $scope.data = [$scope.data];
        $scope.triggers = current.triggers;
        $scope.symptoms = current.symptoms;

    }




    $scope.series;
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };




});


//window.onload = $scope.fillEvents;
//});



