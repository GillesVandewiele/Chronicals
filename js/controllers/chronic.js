/*!
 	NAAM VAN ONS PROJECT, v1.0
 	Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
    https://github.com/kianilannoye/Chronicals

    This file contains the main objects.
 */


var app = angular.module('Chronic', ['onsen.directives', 'ngStorage', "chart.js"]);
app.run(function($rootScope){
    ons.ready(function() {
        alert("READY");
    });

    document.addEventListener("backbutton", function (e) {
        alert("THE BACK BUTTON WAS HIT!");
        e.preventDefault();
     });
});

