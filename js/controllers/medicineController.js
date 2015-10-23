/*!
 	NAAM VAN ONS PROJECT, v1.0
 	Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
    https://github.com/kianilannoye/Chronicals
    
    This file contains the controller to add and modify medicines.
 */

angular.module('Chronic').controller('medicineController', function($scope, dataService){

	$scope.advice = "Dit is een voorbeeldadvies.";
	$scope.drugs = [{id: 0, name:"drug1", description:"this is a description of drug1"}, {id: 1, name:"drug2", description:"this is a description of drug2"},
                    {id: 2, name:"drug3", description:"this is a description of drug3"}]; 
});