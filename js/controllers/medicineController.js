/*!
 	NAAM VAN ONS PROJECT, v1.0
 	Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
    https://github.com/kianilannoye/Chronicals

    This file contains the controller to add and modify medicines.
 */

angular.module('Chronic').controller('medicineController', function($scope, dataService){
    ons.ready(function() {
        $('.hidden').removeClass("hidden");
    });

	$scope.advice = "Dit is een voorbeeldadvies.";
	$scope.drugs = [{id: 0, name:"drug1", description:"this is a description of drug1"}, {id: 1, name:"drug2", description:"this is a description of drug2"},
                    {id: 2, name:"drug3", description:"this is a description of drug3"}];

    $scope.drugDate = new Date();
    $scope.drugTime = $scope.drugDate;

	$scope.addMedicine = function(){
		console.log($scope.selectedDrug, $scope.drugQuantity, $scope.drugDate, $scope.drugTime);
		var dateObj = new Date($scope.drugDate.getFullYear(), $scope.drugDate.getMonth(), $scope.drugDate.getDate(), $scope.drugTime.getHours(), $scope.drugTime.getMinutes());
		var medicine = {drug: $scope.selectedDrug, quantity: $scope.drugQuantity, date: dateObj};
		dataService.addMedicine(medicine);
		location.href='dashboard.html';
	};

});

angular.module('Chronic').directive('ngModel', function( $filter ) {
	// This is used to remove seconds and milliseconds in time pickers
    return {
        require: '?ngModel',
        link: function(scope, elem, attr, ngModel) {
            if( !ngModel )
                return;
            if( attr.type !== 'time' )
                return;

            ngModel.$formatters.unshift(function(value) {
                return value.replace(/(:\d\d)(:.*)$/, '\$1');
            });
        }
    };
});
