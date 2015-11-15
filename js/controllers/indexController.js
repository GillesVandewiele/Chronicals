/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */

angular.module('Chronic').controller('indexController', function($scope, dataService){

    ons.ready(function() {
        if(dataService.getEmail()!=null && dataService.getEmail().length>0){
            location.href="./html/login.html";
        }else{
            location.href="./html/register.html";
        }
    });
});
