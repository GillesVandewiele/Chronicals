angular.module('Chronic').service('dataService', function ($http) {

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

    var patientID = -1;
    var triggers = [];
    var symptoms = [];
    var drugs = [];


    var addHeadache = function (newObj) {
        console.log("addHeadache:", JSON.parse(localStorage.getItem("headacheList")));
        if (JSON.parse(localStorage.getItem("headacheList")) != null) {
            headacheList = JSON.parse(localStorage.getItem("headacheList"));
            headacheList.push(newObj);
            localStorage.setItem("headacheList", JSON.stringify(headacheList));

        }
        else {
            localStorage.setItem("headacheList", JSON.stringify([newObj]));
            headacheList = [newObj];
        }

    };

    var addMedicine = function (newObj) {
        if (JSON.parse(localStorage.getItem("medicineList")) != null) {
            medicineList = JSON.parse(localStorage.getItem("medicineList"));
            medicineList.push(newObj);
            localStorage.setItem("medicineList", JSON.stringify(medicineList));
        }
        else {
            localStorage.setItem("medicineList", JSON.stringify([newObj]));
        }
    };

    var setCurrentHeadache = function (newObj) {
        localStorage.setItem("currentHeadache", JSON.stringify(newObj));
        currentHeadache = newObj;
    };

    var setCurrentMedicine = function (newObj) {
        localStorage.setItem("currentMedicine", JSON.stringify(newObj));
        currentMedicine = newObj;
    };

    var getCurrentHeadache = function () {
        return JSON.parse(localStorage.getItem("currentHeadache"));
    };

    var getCurrentMedicine = function () {
        return JSON.parse(localStorage.getItem("currentMedicine"));
    };

    var getMedicineList = function () {
        return JSON.parse(localStorage.getItem("medicineList"));
    };

    var getHeadacheList = function () {
        var list = JSON.parse(localStorage.getItem("headacheList"));
        if (list != null && list != "null") {
            list.sort(function (a, b) { //sort the list on their start dates // date of consumption

                dateA = a.intensityValues[0].key;
                dateB = b.intensityValues[0].key;
                return (new Date(dateA.toString())) - (new Date(dateB.toString()));
            });
        }
        return list;
    };

    var getAuthorization = function () {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser != null) return 'Basic ' + btoa(currentUser.email + ":" + sha3_512(currentUser.passwordHash + getApiKey()));
        else return null;
    };

    var syncDB = function () {
        // First check if there's an internet connection available
        //$http.get('http://tw06v033.ugent.be/Chronic/rest/DBService/status').
        //success(function (data, status, headers, config) {
        // Get advice for patient

        // Get new drugs
        $http.get('http://tw06v033.ugent.be/Chronic/rest/DrugService/drugs', {headers: {'Content-Type': 'application/json'}}).
        success(function (data, status, headers, config) {
            alert("CONNECTED TO INTERNET OR DATABASE " + status);
            var list = data;
            // drugList consists of a list specified by the doctor which is gotten remotely,
            // and a list of own-made drugs
            if (JSON.parse(localStorage.getItem("ownDrugList")) != null) {
                list = list.concat(JSON.parse(localStorage.getItem("ownDrugList")));
            }
            list[list.length] = {id: -1, name: "...", description: "Own custom drug"};
            console.log("Druglist = ", list);
            localStorage.setItem("drugList", JSON.stringify(list));
        }).
        error(function (data, status, headers, config) {
            console.log(data, status)
            // If the connection failed, we just use the old drugList (this can't be the first time the app is started)
            var drugList = JSON.parse(localStorage.getItem("drugList"));
            if (drugList == null) alert("Er moet een internetverbinding aanwezig zijn wanneer u de app voor de eerste keer opstart.");
        });

        // Get new symptoms
        $http({method: 'GET', url: 'http://tw06v033.ugent.be/Chronic/rest/SymptomService/symptoms'}).
        success(function (data, status, headers, config) {
            var symptoms = data;
            symptoms.forEach(function (entry) {
                entry["val"] = false;
            });
            localStorage.setItem("symptoms", JSON.stringify(symptoms));
        }).
        error(function (data, status, headers, config) {
            var symptoms = JSON.parse(localStorage.getItem("symptoms"));
            if (symptoms == null) alert("Er moet een internetverbinding aanwezig zijn wanneer u de app voor de eerste keer opstart.");

        });
    }


    var setMedicineList = function (list) {
        medicineList = list;
        localStorage.setItem("medicineList", JSON.stringify(list));
    };

    var setHeadacheList = function (list) {
        headacheList = list;

        localStorage.setItem("headacheList", JSON.stringify(list));
    };

    var getSymptoms = function () {
        return JSON.parse(localStorage.getItem("symptoms"));
    };

    var getTriggers = function () {
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
        return [{id: 0, name: "trigger1", description: "this is a description 1", val: false}, {
            id: 1,
            name: "trigger2",
            description: "this is a description 2",
            val: false
        },
            {id: 2, name: "trigger3", description: "this is a description 3", val: false}, {
                id: 3,
                name: "trigger4",
                description: "this is a description 4",
                val: false
            }]; // List of all triggers

    };

    var setAdvice = function (advice) {
        localStorage.setItem("advice", JSON.stringify(advice));
    };

    var getAdvice = function () {
        return JSON.parse(localStorage.getItem("advice"));
    };

    var getDrugs = function () {
        return JSON.parse(localStorage.getItem("drugList"));
    };

    var addDrug = function (drugName) {
        inList = false;
        for (drug in JSON.parse(localStorage.getItem("drugList"))) {
            if (JSON.parse(localStorage.getItem("drugList")[drug].name == drugName)) inList = true;
        }
        if (!inList) {
            var drug = {
                id: JSON.parse(localStorage.getItem("drugList"))[JSON.parse(localStorage.getItem("drugList")).length - 2].id + 1,
                name: drugName,
                description: ""
            };
            var list = JSON.parse(localStorage.getItem("drugList"));
            list = list.splice(list.length - 1, 0, drug);
            localStorage.setItem("drugList", JSON.stringify(list));
        }
    };

    var removeHeadache = function () {
        var list = JSON.parse(localStorage.getItem("headacheList"));
        var current = JSON.parse(localStorage.getItem("currentHeadache"));

        var index = -1;
        for (var i = 0; i < list.length; i++) {
            if (list[i].intensityValues[0].key == current.intensityValues[0].key) {
                index = i;
                break;
            }
        }

        if (index > -1) {
            console.log("Removed:", list.splice(index, 1));
        }

        localStorage.setItem("headacheList", JSON.stringify(list));
        headacheList = list;

        currentHeadache = null;
        localStorage.setItem("currentHeadache", JSON.stringify(null));

    };

    var removeMedicine = function () {
        var list = JSON.parse(localStorage.getItem("medicineList"));
        var current = JSON.parse(localStorage.getItem("currentMedicine"));

        var index = -1;
        for (var i = 0; i < list.length; i++) {
            if (list[i].drug.name == current.drug.name && list[i].quantity == current.quantity && list[i].date == current.date) {
                index = i;
                break;
            }
        }

        if (index > -1) {
            console.log("Removed:", list.splice(index, 1));
        }

        localStorage.setItem("medicineList", JSON.stringify(list));
        medicineList = list;

        currentMedicine = null;
        localStorage.setItem("currentMedicine", JSON.stringify(null));
    };

    var clearCache = function () {
        localStorage.clear();

    };

    var getHeadachesNoEnd = function () {
        var listItems = getHeadacheList();
        var listNoEnd = [];
        if (listItems != null) {
            listItems.sort(function (a, b) { //sort the list on their start dates // date of consumption

                dateA = a.intensityValues[0].key;
                dateB = b.intensityValues[0].key;
                return (new Date(dateA.toString())) - (new Date(dateB.toString()));
            });


            for (var i = 0; i < listItems.length; i++) {
                if (listItems[i].end == null) {
                    listNoEnd.push(listItems[i]);
                }
            }
        }

        return listNoEnd;

    };

    var addDailyMedicine = function (medicine) {
        dailyMedicine = JSON.parse(localStorage.getItem("dailyMedicine"));
        if (dailyMedicine == null) {
            dailyMedicine = [];
        }
        dailyMedicine.push(medicine);
        localStorage.setItem("dailyMedicine", JSON.stringify(dailyMedicine));
    };

    var getDailyMedicines = function () {
        if (JSON.parse(localStorage.getItem("dailyMedicine") == null)) {
            localStorage.setItem("dailyMedicine", JSON.stringify([]));
        }
        JSON.parse(localStorage.getItem("dailyMedicine")).forEach(function (s) {

        });

        return JSON.parse(localStorage.getItem("dailyMedicine"));
    };

    var setDailyMedicineList = function (list) {
        localStorage.setItem("dailyMedicine", JSON.stringify(list));
        console.log("jajaja==========");
        list.forEach(function (s) {
            var medicine;
            medicine.patientID = dataService.get
            $http.post('http://tw06v033.ugent.be/Chronic/rest/MedicineService/medicines', {headers: {'Authorization': getAuthorization()}}).
            success(function (data, status, headers, config) {
                alert("CONNECTED TO INTERNET OR DATABASE " + status)
                // Get advice for patient

                // Get new drugs

                // Get new symptoms
                var symptomsList = JSON.parse(localStorage.getItem("symptoms"));
                if (symptomsList == null) symptomsList = [];
                $http({method: 'GET', url: 'http://tw06v033.ugent.be/Chronic/rest/SymptomService/symptoms'}).
                success(function (data, status, headers, config) {
                    //alert(""+data);
                    //console.log("symptoms fetched:"+data);
                    symptoms = data;
                    symptoms.forEach(function (entry) {
                        entry["val"] = false;
                    });
                    symptomsList.push.apply(symptoms);
                    console.log(symptomsList)
                    localStorage.setItem("symptoms", JSON.stringify(symptomsList));
                }).
                error(function (data, status, headers, config) {
                    alert("error retrieving symptoms from database")
                });

                // Get new triggers
            }).
            error(function (data, status, headers, config) {
                alert("NO INTERNET OR DATABASE CONNECTION " + status)
            });
        });
    };

    var getPasswordHash = function () {
        passwordHash = JSON.parse(localStorage.getItem("passwordHash"));
        return passwordHash;
    };

    var setEmail = function (user) {
        email = user;
        localStorage.setItem("email", JSON.stringify(user));
    };

    var getEmail = function () {
        email = JSON.parse(localStorage.getItem("email"));
        if (email == null)
            email = "";
        return email;
    };

    var registerUser = function (_firstname, _lastname, _birthdate, _sex, _status, _employment, _email, _sha3, _patientID) {
        var user = {
            firstname: _firstname, lastname: _lastname, birthdate: _birthdate, sex: _sex, status: _status,
            employment: _employment, email: _email, passwordHash: _sha3, patientID: _patientID
        };
        localStorage.setItem("currentUser", JSON.stringify(user));
        //TODO: register on the server or check if server already has this shit
        /*
         localStorage.setItem("firstname", JSON.stringify(firstname));
         localStorage.setItem("lastname",JSON.stringify(lastname));
         localStorage.setItem("birthdate",JSON.stringify(birthdate));
         localStorage.setItem("sex",JSON.stringify(sex));
         localStorage.setItem("status", JSON.stringify(status));
         localStorage.setItem("employment",JSON.stringify(employment));
         localStorage.setItem("email", JSON.stringify(email));
         localStorage.setItem("passwordHash",JSON.stringify(sha3));
         */
    };

    var getApiKey = function () {
        return "FiFoEdUdLOI4D19lj7Vb5pi72dDZf2aB";
    };

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
        registerUser: registerUser,
        getApiKey: getApiKey,
        getAuthorization: getAuthorization,
        setAdvice: setAdvice,
        getAdvice: getAdvice
        //syncDB: syncDB

    };


});
