angular.module('Chronic').service('dataService', function($http) {

  // Reset the local storage; always comment this out!
  //  $localStorage.$reset();
  //  localStorage.clear();
    var currentHeadache;

    var currentMedicine;

    var medicineList = [];
    var headacheList = [];

    var dailyMedicine = [];

    var passwordHash = "";
    var email = "";

    var triggers = [];
    var symptoms = [];
    var drugs = [];


  var addHeadache = function(newObj){
      console.log("addHeadache:",JSON.parse(localStorage.getItem("headacheList")));
      if(JSON.parse(localStorage.getItem("headacheList")) != null) {
          headacheList = JSON.parse(localStorage.getItem("headacheList"));
          headacheList.push(newObj);
          localStorage.setItem("headacheList", JSON.stringify(headacheList));

      }
      else {
          localStorage.setItem("headacheList", JSON.stringify([newObj]));
          headacheList = [newObj];
      }

  };

  var addMedicine = function(newObj){
      if(JSON.parse(localStorage.getItem("medicineList"))!= null){
          medicineList = JSON.parse(localStorage.getItem("medicineList"));
          medicineList.push(newObj);
          localStorage.setItem("medicineList", JSON.stringify(medicineList));
      }
      else{
          localStorage.setItem("medicineList", JSON.stringify([newObj]));
      }
  };

  var setCurrentHeadache = function(newObj){
      localStorage.setItem("currentHeadache", JSON.stringify(newObj));
      currentHeadache = newObj;
  };

  var setCurrentMedicine = function(newObj){
      localStorage.setItem("currentMedicine", JSON.stringify(newObj));
      currentMedicine = newObj;
  };

  var getCurrentHeadache = function(){
  	  return JSON.parse(localStorage.getItem("currentHeadache"));
  };

  var getCurrentMedicine = function(){
      return JSON.parse(localStorage.getItem("currentMedicine"));
  };

  var getMedicineList = function(){
      return JSON.parse(localStorage.getItem("medicineList"));
  };

  var getHeadacheList = function(){
      var list = JSON.parse(localStorage.getItem("headacheList"));
      if(list != null && list != "null"){
	      list.sort(function(a,b){ //sort the list on their start dates // date of consumption

	          dateA = a.intensityValues[0].key;
	          dateB = b.intensityValues[0].key;
	          return (new Date(dateA.toString()))-(new Date(dateB.toString()));
	      });
      }
      return list;
  };

  var setMedicineList = function(list){
      medicineList = list;
      localStorage.setItem("medicineList",JSON.stringify(list));
  };

  var setHeadacheList = function(list){
      headacheList = list;

      localStorage.setItem("headacheList",JSON.stringify(list));
  };

  var getSymptoms = function(){
      //TODO: replace this by a DB call
      symptomsList =  [{id: 0, name:"symptom1", description:"this is a description", val: false}, {id: 1, name:"symptom2", description:"this is a description", val: false},
          {id: 2, name:"symptom3", description:"this is a description", val: false}, {id: 3, name:"symptom4", description:"this is a description", val: false}]; // List of all symptoms


      $http({ method: 'GET', url: 'http://localhost:8080/Chronic/rest/SymptomService/symptoms' }).
      success(function (data, status, headers, config) {
          //alert(""+data);
          //console.log("symptoms fetched:"+data);
          symptoms = data;
          symptoms.forEach(function(entry){
              entry["val"]=false;
          });

      }).
      error(function (data, status, headers, config) {
          alert("error retrieving data")
      });
      symptomsList.push.apply(symptoms);
      return symptomsList;
  	};

  var getTriggers = function(){
      //
      //$http({ method: 'GET', url: 'http://localhost:8080/Chronic/rest/TriggerService/Triggers' }).
      //success(function (data, status, headers, config) {
      //    //alert(""+data);
      //    console.log("triggers fetched:"+data);
      //    triggers = data;
      //    triggers.forEach(function(entry){
      //       entry["val"]=false;
      //    });
      //
      //}).
      //error(function (data, status, headers, config) {
      //    alert("error retrieving data")
      //});
      //return triggers;

  	////TODO: replace this by a DB call
  	return [{id: 0, name:"trigger1", description:"this is a description 1", val: false}, {id: 1, name:"trigger2", description:"this is a description 2", val: false},
  			{id: 2, name:"trigger3", description:"this is a description 3", val: false}, {id: 3, name:"trigger4", description:"this is a description 4", val: false}]; // List of all triggers

  };



  var getDrugs = function(){
      return JSON.parse(localStorage.getItem("drugList"));
  };

  var addDrug = function(drugName){
	inList = false;
	for(drug in JSON.parse(localStorage.getItem("drugList"))){
		if(JSON.parse(localStorage.getItem("drugList")[drug].name == drugName)) inList = true;
	}
  	if(!inList){
  		var drug = {id: JSON.parse(localStorage.getItem("drugList"))[JSON.parse(localStorage.getItem("drugList")).length-2].id+1, name: drugName, description: ""};
  		var list = JSON.parse(localStorage.getItem("drugList"));
        list = list.splice(list.length-1,0, drug);
        localStorage.setItem("drugList", JSON.stringify(list));
  	}
  };

  var removeHeadache = function(){
      var list = JSON.parse(localStorage.getItem("headacheList"));
      var current = JSON.parse(localStorage.getItem("currentHeadache"));

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

      localStorage.setItem("headacheList", JSON.stringify(list));
      headacheList = list;

      currentHeadache = null;
      localStorage.setItem("currentHeadache",JSON.stringify(null));

  };

    var removeMedicine = function(){
        var list = JSON.parse(localStorage.getItem("medicineList"));
        var current = JSON.parse(localStorage.getItem("currentMedicine"));

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

        localStorage.setItem("medicineList",JSON.stringify(list));
        medicineList = list;

        currentMedicine = null;
        localStorage.setItem("currentMedicine", JSON.stringify(null));
    };

    var clearCache = function(){
        localStorage.clear();

    };

    var getHeadachesNoEnd = function(){
        var listItems = getHeadacheList();
        var listNoEnd = [];
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
        dailyMedicine = JSON.parse(localStorage.getItem("dailyMedicine"));
        if(dailyMedicine == null){
            dailyMedicine = [];
        }
        dailyMedicine.push(medicine);
        localStorage.setItem("dailyMedicine",JSON.stringify(dailyMedicine));
    };

    var getDailyMedicines = function(){
        if(JSON.parse(localStorage.getItem("dailyMedicine") == null)){
            localStorage.setItem("dailyMedicine",JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem("dailyMedicine"));
    };

    var setDailyMedicineList = function(list){
        localStorage.setItem("dailyMedicine", JSON.stringify(list));
    };

    var getPasswordHash = function(){
        passwordHash = JSON.parse(localStorage.getItem("passwordHash"));
        return passwordHash;
    };

    var setEmail = function(user){
        email = user;
        localStorage.setItem("email",JSON.stringify(user));
    };

    var getEmail = function(){
        email = JSON.parse(localStorage.getItem("email"));
        if(email==null)
            email = "";
        return email;
    };

    var registerUser = function (firstname, lastname, birthdate, sex, status, employment, email, sha3) {
        //TODO: register on the server or check if server already has this shit
        localStorage.setItem("firstname", JSON.stringify(firstname));
        localStorage.setItem("lastname",JSON.stringify(lastname));
        localStorage.setItem("birthdate",JSON.stringify(birthdate));
        localStorage.setItem("sex",JSON.stringify(sex));
        localStorage.setItem("status", JSON.stringify(status));
        localStorage.setItem("employment",JSON.stringify(employment));
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("passwordHash",JSON.stringify(sha3));
    };

    var getApiKey = function(){
        return "FiFoEdUdLOI4D19lj7Vb5pi72dDZf2aB";
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
    getDailyMedicines: getDailyMedicines,
    setDailyMedicineList: setDailyMedicineList,
    getDrugs: getDrugs,
    addDrug: addDrug,
    getPasswordHash: getPasswordHash,
    getEmail: getEmail,
    setEmail: setEmail,
    registerUser:registerUser,
    getApiKey: getApiKey

    };


});
