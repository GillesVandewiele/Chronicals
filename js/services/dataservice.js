angular.module('Chronic').service('dataService', function() {
  var headache;
  //{ intensityValue: 5, start: null, end: null, location: null, triggers: null, symptoms: null };
  var medicine;
  //{ name: "Sumatripan", date: new Date(), quantity: 5}
  
  var setCurrentHeadache = function(newObj){
  	headache = newObj;
  };
  
  var setCurrentMedicine = function(newObj){
  	medicine = newObj;
  };
  
  var getCurrentHeadache = function(){
  	return headache;
  };
  
  var getCurrentMedicine = function(){
  	return medicine;
  };

  return {
    setCurrentHeadache: setCurrentHeadache,
    setCurrentMedicine: setCurrentMedicine,
    getCurrentHeadache: getCurrentHeadache,
    getCurrentMedicine: getCurrentMedicine
  };

});