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
	
	// Initialize all fields on default values or on the values of current medicine (when modifying)
	$scope.medicine = dataService.getCurrentMedicine();
	
	if($scope.medicine != null && $scope.medicine.drug != null){
		$scope.selectedDrug = $scope.medicine.drug;
	}
	if($scope.medicine != null && $scope.medicine.date != null){
		$scope.drugDate = new Date($scope.medicine.date);
	}else {
    	$scope.drugDate = new Date();
    }
	$scope.drugTime = $scope.drugDate;
    if($scope.medicine != null && $scope.medicine.quantity != null){
    	$scope.drugQuantity = $scope.medicine.quantity;
    }else {
	    $scope.drugQuantity = 0;
	}
	
	$scope.getIndexOfMedicine = function(){
		medicines = dataService.getMedicineList();
  		if(medicines == null || medicines.length == 0) return -1;
  		if($scope.medicine == null) return -1;
		for(medicine in medicines){
			equalDrug = (medicines[medicine].drug.id == $scope.medicine.drug.id && medicines[medicine].drug.quantity == $scope.medicine.drug.quantity);
			equalDate = medicines[medicine].date == $scope.medicine.date;
			equalQuantity = medicines[medicine].quantity == $scope.medicine.quantity;
			if(equalDrug && equalDate && equalQuantity) return medicine;
		}
		return -1;
	};
	
	$scope.medicineIndex = $scope.getIndexOfMedicine();

	// Populate the dropdown and the advice
	$scope.advice = "Dit is een voorbeeldadvies.";
	$scope.drugs = dataService.getDrugs();
	
	// Create the possibility to add an own drug in the dropdown
	$(document).on("click", '#drugDropdown', function(e){
  		if($scope.selectedDrug != null && $scope.selectedDrug.name=="..."){
  			$(".selectDiv").hide();
  			$("#ownDrug").show();
  		}
  	});

	// Called when clicking "Sla Op"
	$scope.addMedicine = function(){
		var dateObj = new Date($scope.drugDate.getFullYear(), $scope.drugDate.getMonth(), $scope.drugDate.getDate(), $scope.drugTime.getHours(), $scope.drugTime.getMinutes());
		if($scope.ownDrug != null){
			var drug = {id: 0, name:$scope.ownDrug, description:""};
			var medicine = {drug: drug, quantity: $scope.drugQuantity, date: dateObj};
		} else {
			var medicine = {drug: $scope.selectedDrug, quantity: $scope.drugQuantity, date: dateObj};
		}
		
		if($scope.medicineIndex != -1){
			list = dataService.getMedicineList();
	  		list[$scope.medicineIndex] = medicine;
	  		dataService.setMedicineList(list);
		}
		else {
			dataService.addMedicine(medicine);
		}
		if($scope.ownDrug != null) dataService.addDrug($scope.ownDrug);
  		dataService.setCurrentMedicine(null);
		location.href='dashboard.html';
	};
	
	// Called on canceling
  $scope.cancel = function(){
  	dataService.setCurrentMedicine(null);
  	location.href="dashboard.html";
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
