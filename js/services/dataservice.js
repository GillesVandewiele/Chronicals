angular.module('Chronic').service('dataService', function($localStorage) {

  // Reset the local storage; always comment this out!
  //  $localStorage.$reset();
    //

    var headache;

    var medicine;

    var medicineList = [];
    var headacheList = [];

    var dailyMedicine = [];

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
      var list = $localStorage.headacheList;
      if(list != null){
	      list.sort(function(a,b){ //sort the list on their start dates // date of consumption

	          dateA = a.intensityValues[0].key;
	          dateB = b.intensityValues[0].key;
	          return (new Date(dateA.toString()))-(new Date(dateB.toString()));
	      });
      }
      return list;
  };

  var setMedicineList = function(list){
      $localStorage.medicineList = list;
  };

  var setHeadacheList = function(list){
      $localStorage.headacheList = list;
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

  var removeHeadache = function(){
      var list = $localStorage.headacheList;
      var current = $localStorage.currentHeadache;

      var index = -1;
      for(var i=0; i<list.length; i++){
          if(list[i].intensityValues[0].key == current.intensityValues[0].key){
              index = i;
              break;
          }
      }

      if (index > -1) {
          console.log("Removed:",list.splice(index, 1));
      }

      $localStorage.headacheList = list;
      headacheList = list;

      headache = null;
      $localStorage.currentHeadache = null;

  };

    var removeMedicine = function(){
        var list = $localStorage.medicineList;
        var current = $localStorage.currentMedicine;

        var index = -1;
        for(var i=0; i<list.length; i++){
            if(list[i].drug.name == current.drug.name && list[i].quantity == current.quantity && list[i].date == current.date){
                index = i;
                break;
            }
        }

        if(index > -1){
            console.log("Removed:", list.splice(index, 1));
        }

        $localStorage.medicineList = list;
        medicineList = list;

        medicine = null;
        $localStorage.currentMedicine = null;
    };

    var clearCache = function(){
        $localStorage.headacheList = null;
        $localStorage.currentHeadache = null;
        $localStorage.medicineList = null;
        $localStorage.currentMedicine = null;
        headache = null;
        headacheList = null;
        medicine = null;
        medicineList = null;
    };

    var getHeadachesNoEnd = function(){
        listItems = getHeadacheList();
        listNoEnd = [];
        if(listItems != null){
	        listItems.sort(function(a,b){ //sort the list on their start dates // date of consumption

	            dateA = a.intensityValues[0].key;
	            dateB = b.intensityValues[0].key;
	            return (new Date(dateA.toString()))-(new Date(dateB.toString()));
	        });


	        for (var i=0; i<listItems.length; i++){
	            if(listItems[i].end == null){
	                listNoEnd.push(listItems[i]);
	            }
	        }
        }

        return listNoEnd;

    };

    var addDailyMedicine = function(medicine){
        dailyMedicine = $localStorage.dailyMedicine;
        if(dailyMedicine == null){
            dailyMedicine = [];
        }
        dailyMedicine.push(medicine);
        $localStorage.dailyMedicine = dailyMedicine;
    };

    var getDailyMedicines = function(){
        if($localStorage.dailyMedicine == null){
            $localStorage.dailyMedicine = [];
        }
        return $localStorage.dailyMedicine;
    }

  return {
    addHeadache: addHeadache,
    addMedicine: addMedicine,
    getHeadacheList: getHeadacheList,
    getMedicineList: getMedicineList,
    setMedicineList: setMedicineList,
    setHeadacheList: setHeadacheList,
    setCurrentHeadache: setCurrentHeadache,
    setCurrentMedicine: setCurrentMedicine,
    getCurrentHeadache: getCurrentHeadache,
    getCurrentMedicine: getCurrentMedicine,
    getSymptoms: getSymptoms,
    getTriggers: getTriggers,
    removeHeadache: removeHeadache,
    clearCache: clearCache,
    removeMedicine: removeMedicine,
    getHeadachesNoEnd: getHeadachesNoEnd,
    addDailyMedicine: addDailyMedicine,
    getDailyMedicines: getDailyMedicines

    };


});
