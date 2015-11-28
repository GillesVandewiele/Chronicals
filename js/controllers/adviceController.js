angular.module('Chronic').controller('adviceController', function($scope, dataService){

    ons.ready(function() {
        ons.bootstrap();
        $('.hidden').removeClass("hidden");
        $('#loadingImg').hide();
    });

    //TODO: replace by DB call
    $scope.advice = dataService.getAdvice();

});
