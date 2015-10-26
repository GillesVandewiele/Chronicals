/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the history views.
 */


angular.module('Chronic').controller("detailedHeadacheController", function($scope, dataService) {
    document.addEventListener("backbutton", function(e){
        if($.mobile.activePage.is('#login_page')){
            e.preventDefault();
        }
        else {
            if (confirm("Are you sure you want to logout?")) {
                /* Here is where my AJAX code for logging off goes */
            }
            else {
                return false;
            }
        }
    }, false);

    $scope.deleteEntry = function(){
        console.log("Removed: ", dataService.getCurrentHeadache());
        dataService.removeHeadache();
    };


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


    if(current == null){
        current = dataService.getCurrentHeadache();
        if(current==null){
            dataService.setCurrentHeadache(dataService.getHeadacheList()[0]);
            current = dataService.getCurrentHeadache();
        }
    }

    if(current.intensityValues != null && current.intensityValues[0].key != null){
        current.start = new Date(current.intensityValues[0].key);
    }
    if (current.end != null){
        current.end = new Date(current.end);
    }
    $scope.startTime = current.start.getDate()+" "+months[current.start.getMonth()]+"    "+current.start.getHours() + ":" + ((current.start.getMinutes()<10?'0':'')+current.start.getMinutes()) ;
    if(current.end == null){
        current.end = new Date();

    }
    $scope.endTime = current.end.getDate()+" "+months[current.end.getMonth()]+"    "+current.end.getHours() + ":" + ((current.end.getMinutes()<10?'0':'')+current.end.getMinutes()) ;
    $scope.labels = [];
    $scope.data = [];
    $scope.symptoms = [];
    $scope.triggers = [];
    var sorted = sortOnKeys(current.intensityValues);
    console.log("sorted: ", sorted);

    if(sorted != null){
        if(sorted[sorted.length-1].key.toString() != current.end.toString()){
            sorted.push({key: current.end.toString(), value: 0});
        }
        for( var i=0; i< sorted.length; i++){
            var obj = sorted[i];
            $scope.labels.push(""+(new Date(obj["key"])).getHours()+":"+((new Date(obj["key"])).getMinutes() <10?'0':'')+(new Date(obj["key"])).getMinutes());
            $scope.data.push(obj["value"]);
        }


        $scope.data = [$scope.data];
        for(var i =0; i<current.triggers.length; i++){
            if(current.triggers[i].val==true){
                $scope.triggers.push(current.triggers[i].name);
            }
        }
        for(var i =0; i<current.symptoms.length; i++){
            if(current.symptoms[i].val==true){
                $scope.symptoms.push(current.symptoms[i].name);
            }
        }


    }




    $scope.series;
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };



});


//window.onload = $scope.fillEvents;
//});



