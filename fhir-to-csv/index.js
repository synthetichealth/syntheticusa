var fs = require('fs'); 
var argv = require('minimist')(process.argv.slice(2));

var headers = [
  'NAME',
  'GENDER',
  'BIRTHDATE',
  'DEATHDATE',
  'AGE',
  'ALIVE',
  'CITY',
  'STATE',
  'LATITUDE',
  'LONGITUDE',
  'MARITAL_STATUS',
  'COMMUNICATION',
  'COMMUNICATION_COUNT',
  'RACE',
  'ETHNICITY',
  'AGE_AT_HEIGHT',
  'HEIGHT',
  'AGE_AT_WEIGHT',
  'WEIGHT',
  'CAUSE_OF_DEATH',
  'CONDITION_COUNT',
  'ACTIVE_CONDITION_COUNT',
  'ENCOUNTER_COUNT',
  'OBSERVATION_COUNT',
  'PROCEDURE_COUNT'
];

var files = fs.readdirSync(argv['_'][0] || '.');

if(!argv['s']){
  console.log(headers.join(','));
};

files.forEach(function(filename, index) {

  var content = fs.readFileSync((argv['_'][0] || '.') + '/' + filename, 'utf-8');

  var bundle = JSON.parse(content);

  var out = {}; 
  var patientFound = false;

  var lastHeight = new Date('1/1/1800');
  var lastWeight = new Date('1/1/1800');

  out.ENCOUNTER_COUNT=0;
  out.OBSERVATION_COUNT=0;
  out.CONDITION_COUNT=0;
  out.ACTIVE_CONDITION_COUNT=0;
  out.PROCEDURE_COUNT=0;

  bundle.entry.forEach(function(obj){
    switch(obj.resource.resourceType){
      case 'Patient':
        patientFound = true;
        out.NAME = "\"" + obj.resource.name[0].given[0] + ' ' + obj.resource.name[0].family + "\"";
        out.GENDER = obj.resource.gender;
        out.BIRTHDATE = new Date(obj.resource.birthDate).toLocaleDateString('en-US');
        out.ALIVE=1;
        out.AGE = (Date.now() -  new Date(out.BIRTHDATE)) / 31557600000;
        out.CITY= "\"" + obj.resource.address[0].city + "\"";
        out.STATE= obj.resource.address[0].state;
        out.LATITUDE = obj.resource.address[0].extension[0].extension.filter(item => (item.url === 'latitude'))[0].valueDecimal;
        out.LONGITUDE = obj.resource.address[0].extension[0].extension.filter(item => (item.url === 'longitude'))[0].valueDecimal;
        out.MARITAL_STATUS = obj.resource.maritalStatus.coding[0].code;
        out.COMMUNICATION = obj.resource.communication[0].language.coding[0].code;
        out.COMMUNICATION_COUNT = obj.resource.communication.length;
        out.RACE=obj.resource.extension.filter((item) => {return item.url.endsWith("us-core-race")})[0].valueCodeableConcept.coding[0].display
        out.ETHNICITY=obj.resource.extension.filter((item) => {return item.url.endsWith("us-core-ethnicity")})[0].valueCodeableConcept.coding[0].display
        break;
      case 'Condition':
        out.CONDITION_COUNT++;
        if(!obj.resource.abatementDateTime){
          out.ACTIVE_CONDITION_COUNT++;
        }
        break;
      case 'Encounter':
        out.ENCOUNTER_COUNT++;
        break;
      case 'Observation': 
        out.OBSERVATION_COUNT++;
        if(obj.resource.code.coding[0].code === '69453-9'){
          out.ALIVE=0;
          out.DEATHDATE=new Date(obj.resource.effectiveDateTime).toLocaleDateString('en-US');
          out.AGE = (new Date(obj.resource.effectiveDateTime) -  new Date(out.BIRTHDATE)) / 31557600000;
          out.CAUSE_OF_DEATH="\"" + obj.resource.valueCodeableConcept.coding[0].display + "\"";
        }
        if(obj.resource.code.coding[0].code === '8302-2'){
          let dt = new Date(obj.resource.effectiveDateTime);
          if(dt > lastHeight){
            lastHeight = dt;
            out.AGE_AT_HEIGHT = (dt - new Date(out.BIRTHDATE)) / 31557600000;
            out.HEIGHT=obj.resource.valueQuantity.value;
          }
        }

        if(obj.resource.code.coding[0].code === '29463-7'){
          let dt = new Date(obj.resource.effectiveDateTime);
          if(dt > lastWeight){
            lastWeight = dt;
            out.AGE_AT_WEIGHT = (dt - new Date(out.BIRTHDATE)) / 31557600000;
            out.WEIGHT=obj.resource.valueQuantity.value;
          }
        }

        break;

      case 'Procedure':
        out.PROCEDURE_COUNT++;
        // events.push({type: 'procedure', code: obj.resource.code.text})
        break;
    };
  });

  if(patientFound){
    console.log(headers.map(field => (out[field])).map(entry => ( entry == null ? '' : entry)).join(','))
  }

});
