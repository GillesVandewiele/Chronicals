angular.module('Chronic').service('dataService', function($localStorage) {
 
  // Reset the local storage; always comment this out!
  //  $localStorage.$reset();


    var headache = {start: new Date(2015, 9, 18, 22, 30, 00, 0), end: new Date(2015, 9, 19, 1, 30, 0, 0),
      intensityValues: [{key: new Date(2015, 9, 18, 22, 30, 00, 0), value:1}

      ,{key: new Date(2015, 9, 19, 00, 15, 00, 0), value: 2}
          ,{key: new Date(2015, 9, 18, 23, 15, 00, 0),value : 9}
      ,{key: new Date(2015, 9, 19, 1,0, 00, 0), value:9}
      ,{key: new Date(2015, 9, 19, 1, 30, 00, 0), value: 1}], triggers:["Smwoaren", "An me piet getrokken"], location: null, symptoms: ["Kleine oogsjes", "Zwoare kop", "Dikke neuze"]};
    //{ intensityValue: 5, start: null, end: null, location: null, triggers: null, symptoms: null };
    var medicine;

    var medicineList = [
          {start:new Date(2015, 9, 18, 14, 45, 0, 0), name:"Sumatriptan", quantity: Math.random(200)},
      {start: new Date(2015, 9, 17, 00, 15, 0, 0), name: "Paddo's", quantity: Math.random(200)}
    ];
    var headacheList = [
      {start: new Date(2015, 9, 18, 22, 30, 00, 0), end: new Date(2015, 9, 19, 1, 30, 0, 0), intensityValue: Math.random() * 10, triggers:[], location: null, symptoms: []},
      {start: new Date(2015, 9, 17, 14, 30, 00, 0), end: new Date(2015, 9, 17, 15, 30, 0, 0), intensityValue: Math.random() * 10, triggers:[], location: null, symptoms: []},
      {start: new Date(2015, 9, 17, 22, 30, 00, 0), end: new Date(2015, 9, 17, 23, 30, 0, 0), intensityValue: Math.random() * 10, triggers:[], location: null, symptoms: []},
      {start: new Date(2015, 9, 15, 22, 45, 00, 0), end: new Date(2015, 9, 16, 00, 30, 0, 0), intensityValue: Math.random() * 10, triggers:[], location: null, symptoms: []},
      {start: new Date(2015, 9, 15, 14, 30, 00, 0), end: new Date(2015, 9, 15, 15, 30, 0, 0), intensityValue: Math.random() * 10, triggers:[], location: null, symptoms: []},
    ];

  var addHeadache = function(newObj){
      if($localStorage.headacheList) $localStorage.headacheList.push(newObj);
      else $localStorage.headacheList = [newObj];
  };

  var addMedicine = function(newObj){
      if($localStorage.medicineList) $localStorage.medicineList.push(newObj);
      else $localStorage.medicineList = [newObj];
  };

  var setCurrentHeadache = function(newObj){
  	  $localStorage.currentHeadache = newObj;
  };
   
    setCurrentHeadache(headache);

  var setCurrentMedicine = function(newObj){
  	  $localStorage.currentMedicine = newObj;
  };
  
  var getSymptoms = function(){
  	//TODO: replace this by a DB call
  	return [{id: 0, name:"symptom1", description:"this is a description", val: false}, {id: 1, name:"symptom2", description:"this is a description", val: false},
  			{id: 2, name:"symptom3", description:"this is a description", val: false}, {id: 3, name:"symptom4", description:"this is a description", val: false}]; // List of all symptoms
  
  };
  
  var getTriggers = function(){
  	//TODO: replace this by a DB call
  	return [{id: 0, name:"trigger1", description:"this is a description 1", val: false}, {id: 1, name:"trigger2", description:"this is a description 2", val: false},
  			{id: 2, name:"trigger3", description:"this is a description 3", val: false}, {id: 3, name:"trigger4", description:"this is a description 4", val: false}]; // List of all triggers
  
  };

  var getCurrentHeadache = function(){
  	  return $localStorage.currentHeadache;
  };

  var getCurrentMedicine = function(){
  	  return $localStorage.currentMedicine;
  };

  var getMedicineList = function(){
      return $localStorage.medicineList;
  };

  var getHeadacheList = function(){
      return $localStorage.headacheList;
  };
  
  var getSymptoms = function(){
  	//TODO: replace this by a DB call
  	return [{id: 0, name:"symptom1", description:"this is a description", val: false}, {id: 1, name:"symptom2", description:"this is a description", val: false},
  			{id: 2, name:"symptom3", description:"this is a description", val: false}, {id: 3, name:"symptom4", description:"this is a description", val: false}]; // List of all symptoms
  
  };
  
  var getTriggers = function(){
  	//TODO: replace this by a DB call
  	return [{id: 0, name:"trigger1", description:"this is a description 1", val: false}, {id: 1, name:"trigger2", description:"this is a description 2", val: false},
  			{id: 2, name:"trigger3", description:"this is a description 3", val: false}, {id: 3, name:"trigger4", description:"this is a description 4", val: false}]; // List of all triggers
  
  };
  
  return {
    addHeadache: addHeadache,
    addMedicine: addMedicine,
    getHeadacheList: getHeadacheList,
    getMedicineList: getMedicineList,
    setCurrentHeadache: setCurrentHeadache,
    setCurrentMedicine: setCurrentMedicine,
    getCurrentHeadache: getCurrentHeadache,
    getCurrentMedicine: getCurrentMedicine,
    getSymptoms: getSymptoms,
    getTriggers: getTriggers
    };


});
