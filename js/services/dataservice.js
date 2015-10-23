angular.module('Chronic').service('dataService', function() {



    var headache = {start: new Date(2015, 9, 18, 22, 30, 00, 0), end: new Date(2015, 9, 19, 1, 30, 0, 0),
      intensityValues: [{key: new Date(2015, 9, 18, 22, 30, 00, 0), value:1}

      ,{key: new Date(2015, 9, 19, 00, 15, 00, 0), value: 2}
          ,{key: new Date(2015, 9, 18, 23, 15, 00, 0),value : 9}
      ,{key: new Date(2015, 9, 19, 1,0, 00, 0), value:9}
      ,{key: new Date(2015, 9, 19, 1, 30, 00, 0), value: 1}], triggers:["Smwoaren", "An me piet getrokken"], location: null, symptoms: ["Kleine oogsjes", "Zwoare kop", "Dikke neuze"]};
    //{ intensityValue: 5, start: null, end: null, location: null, triggers: null, symptoms: null };
    var medicine;

    var medicineList = [
          {date:new Date(2015, 9, 18, 14, 45, 0, 0), name:"Sumatriptan", quantity:Math.random(200)},
      {date: new Date(2015, 9, 17, 00, 15, 0, 0), name: "Paddo's", quantity: Math.random(200)}
    ];
    var headacheList = [
      {start: new Date(2015, 9, 18, 22, 30, 00, 0), end: new Date(2015, 9, 19, 1, 30, 0, 0), intensityValue: Math.random() * 10, triggers:[], location: null, symptoms: []},
      {start: new Date(2015, 9, 17, 14, 30, 00, 0), end: new Date(2015, 9, 17, 15, 30, 0, 0), intensityValue: Math.random() * 10, triggers:[], location: null, symptoms: []},
      {start: new Date(2015, 9, 17, 22, 30, 00, 0), end: new Date(2015, 9, 17, 23, 30, 0, 0), intensityValue: Math.random() * 10, triggers:[], location: null, symptoms: []},
      {start: new Date(2015, 9, 15, 22, 45, 00, 0), end: new Date(2015, 9, 16, 00, 30, 0, 0), intensityValue: Math.random() * 10, triggers:[], location: null, symptoms: []},
      {start: new Date(2015, 9, 15, 14, 30, 00, 0), end: new Date(2015, 9, 15, 15, 30, 0, 0), intensityValue: Math.random() * 10, triggers:[], location: null, symptoms: []},
    ];


    var addHeadache = function(newObj){
      headacheList.push(newObj);
    };

    var addMedicine = function(newObj){
      medicineList.push(newObj);
    };

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

    var getMedicineList = function(){
      return medicineList;
    };

    var getHeadacheList = function(){
      return headacheList;
    };

    return {
    addHeadache: addHeadache,
    addMedicine: addMedicine,
    getHeadacheList: getHeadacheList,
    getMedicineList: getMedicineList,
    setCurrentHeadache: setCurrentHeadache,
    setCurrentMedicine: setCurrentMedicine,
    getCurrentHeadache: getCurrentHeadache,
    getCurrentMedicine: getCurrentMedicine
    };


});
