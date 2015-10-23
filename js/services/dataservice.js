angular.module('Chronic').service('dataService', function() {
  var headache;
  var medicine;
  
  var setHeadache = function(newObj){
  	headache = newObj;
  };
  
  var setMedicine = function(newObj){
  	medicine = newObj;
  };
  
  var getHeadache = function(){
  	return headache;
  };
  
  var getMedicine = function(){
  	return medicine;
  };

  return {
    setHeadache: setHeadache,
    setMedicine: setMedicine,
    getHeadache: getHeadache,
    getMedicine: getMedicine
  };

});