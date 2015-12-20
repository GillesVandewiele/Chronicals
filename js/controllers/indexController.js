/*!
 Chronicals, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */

angular.module('Chronic').controller('indexController', function($scope, dataService){

    ons.ready(function() {
        $('.hidden').removeClass("hidden");
        $('#loadingImg').hide();
        if(dataService.getEmail()!=null && dataService.getEmail().length>0){
            location.href="./html/login.html";
        }else{
            location.href="./html/register.html";
        }
    });

    $scope.transition = function(){
        //console.log($("body").children());
        $("body").children().eq(0).show();
        $('body').children().eq(1).hide();
    };
});
