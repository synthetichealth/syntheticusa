# SyntheticUSA

## About SyntheticUSA

SyntheticUSA is  is a model of synthetic residents of the United States, with artificial health records for the fictional residents.  It builds on software developed for the [SyntheticMass](https://github.com/synthetichealth/syntheticmass) project to support a larger synthetic population and to provide novel visualization methods.

This project is currently early in the development phase, and all components in this repository are prototypes that are not yet stable.  These components currently include:

* [/site](/site): Prototype front-end dashboard to allow users to explore the synthetic population
* [/stream-server](/stream-server): Prototype real-time http stream service to display medical events in the synthetic population as they happen
* [/fhir-to-csv](/fhir-to-csv): Helper script that transforms a directory of FHIR STU3 resources exported from synthea into a csv file suitable to upload into data visualization tools.

## License

Copyright 2017 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
