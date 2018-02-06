# SyntheticUSA

## fhir-to-csv.js

This Node.js script exports a directory of FHIR DSTU3 patient health records into CSV format, suitable for
import into data visualization tools, such as [MapD Immerse](https://mapd.com/platform/immerse). It was written to explore options for visualing large sets of synethic patient medical records.


![MapD Immerse Synthetic Mass Example](https://raw.github.com/synthetichealth/syntheticusa/master/fhir-to-csv/viz-example.png "MapD Immerse Synthetic Mass Example")

## Usage

This script writes to stdout.  To save, redirect stdout into a file.

```bash

npm install 
node index.js /path/to/fhir/json/directory/ > out.csv

# add -s to supress the csv header, useful to append to an existing csv
node index.js -s -- /path/to/more/fhir/files >> out.csv

```

For simplicity, this script only exports one line per patient, with the following columns:

```javascript

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

```

## License

Copyright 2018 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
