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

    var current = JSON.parse(JSON.stringify(dataService.getCurrentHeadache()));
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

    $scope.startTime = current.start.getDate()+" "+months[current.start.getMonth()]+"    "+current.start.getHours() + ":" + ((current.start.getMinutes()<10?'0':'')+current.start.getMinutes()) ;
    if(current.end == null){
        current.end = new Date();
    }
    if(typeof current.end == "string"){
    	current.end = new Date(current.end);
    }

    $scope.endTime = current.end.getDate()+" "+months[current.end.getMonth()]+"    "+(current.end.getHours()<10?'0':'')+current.end.getHours() + ":" + (current.end.getMinutes()<10?'0':'')+current.end.getMinutes();
    $scope.labels = [];
    $scope.data = [];
    $scope.symptoms = [];
    $scope.triggers = [];
    var arrayToSort = current.intensityValues;
    var sorted = sortOnKeys(arrayToSort);
    var medicines = dataService.getMedicineList();

    if(sorted != null){
        if(sorted[sorted.length-1].key.toString() != current.end.toString()){
            sorted.push({key: current.end.toString(), value: 0});
        }
        for( var i=0; i< sorted.length; i++){
            var obj = sorted[i];
            $scope.labels.push(""+(new Date(obj["key"])).getHours()+":"+((new Date(obj["key"])).getMinutes() <10?'0':'')+(new Date(obj["key"])).getMinutes());
            $scope.data.push(obj["value"]);
        }

        var medicinePositions = Array.apply(null, new Array($scope.data.length)).map(Number.prototype.valueOf, 0);

        medicines.forEach(function (entry) {
            if (!(entry.date < sorted[0].key || entry.date > sorted[sorted.length - 1].key)) {
                //update sorted
                var inserted = false;
                var counter = 1;
                while (!inserted) {
                    if (sorted[counter].hasOwnProperty('key')) {
                        if (new Date(sorted[counter].key) > new Date(entry.date)) {
                            $scope.labels.splice(counter, 0, "" + (new Date(entry.date)).getHours() + ":" + ((new Date(entry.date)).getMinutes() < 10 ? '0' : '') + (new Date(entry.date)).getMinutes());
                            sorted.splice(counter, 0, entry);
                            var value = (Number($scope.data[counter - 1]) + Number($scope.data[counter])) / 2;
                            $scope.data.splice(counter, 0, value);
                            medicinePositions.splice(counter, 0, 1);
                            inserted = true;
                        }
                    } else {
                        if (new Date(sorted[counter].date) > new Date(entry.date)) {
                            $scope.labels.splice(counter, 0, "" + (new Date(entry.date)).getHours() + ":" + ((new Date(entry.date)).getMinutes() < 10 ? '0' : '') + (new Date(entry.date)).getMinutes());
                            sorted.splice(counter, 0, entry);
                            var value = (Number($scope.data[counter - 1]) + Number($scope.data[counter])) / 2;
                            $scope.data.splice(counter, 0, value);
                            medicinePositions.splice(counter, 0, 1);
                            inserted = true;
                        }
                    }

                    counter++;
                }
                //update labels

                //update data

            }


        });


        $scope.data = {
            labels: $scope.labels, datasets: [{
                data: $scope.data, fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)"
            }]
        };





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


    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    ons.ready(function() {
        $('.hidden').removeClass("hidden");
        var ctx = $('canvas').get(0).getContext("2d");
        var myNewChart = new Chart(ctx).Line($scope.data, null);
        for (var iter = 0; iter < medicinePositions.length; iter++) {
            if (medicinePositions[iter] == 1)
                myNewChart.datasets[0].points[iter].fillColor = "green";

        }
        myNewChart.update();
    });



});


//window.onload = $scope.fillEvents;
//});



