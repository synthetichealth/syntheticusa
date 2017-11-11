import {deathEvent, birthEvent, encounterEvent, conditionOnsetEvent, conditionAbatementEvent, procedureEvent} from '../actions/'
require('event-source-polyfill');

export default store => {

  let es = new window.EventSourcePolyfill('http://localhost:1337/events?eps=20')

  let listener = function (event) {
    let data = JSON.parse(event.data)
    switch(data.type){
      case 'death':
        store.dispatch(deathEvent(data.name, data.gender, data.birthdate, data.lat, data.lon));
        break
      case 'birth':
        store.dispatch(birthEvent(data.name, data.gender, data.birthdate, data.lat, data.lon));
        break
      case 'encounter':
        store.dispatch(encounterEvent(data.class, data.code, data.name, data.gender, data.birthdate, data.lat, data.lon));
        break
      case 'condition-onset':
        store.dispatch(conditionOnsetEvent(data.value, data.name, data.gender, data.birthdate, data.lat, data.lon));
        break
      case 'condition-abatement':
        store.dispatch(conditionAbatementEvent(data.value, data.name, data.gender, data.birthdate, data.lat, data.lon));
        break
      case 'procedure':
        store.dispatch(procedureEvent(data.code, data.name, data.gender, data.birthdate, data.lat, data.lon));
        break
    }

    // if(data.type == 'meta-connect'){
    //   document.getElementById('connection-count').innerHTML = data.size;
    // }

    // if(!usa.loaded){
    //   return;
    // }

    // if(data.type == 'death'){

    //   currentPopulation--;
    //   document.getElementById('population-count').innerHTML = numberWithCommas(currentPopulation);
    // }

    // if(data.type == 'birth'){
    //   currentPopulation++;
    //   document.getElementById('population-count').innerHTML = numberWithCommas(currentPopulation);
    // }

    // if(currentPoint[data.type] !== undefined){

    //   counters[data.type]++;
    //   document.getElementById(data.type + '-counter').innerHTML = counters[data.type];

    //   if(viewState === 'map'){

    //     particleSystem.geometry.attributes.position.array[particleSystem.currentIndex * 3] = (((70+data.lon)/-50) - .5) * 2;
    //     particleSystem.geometry.attributes.position.array[particleSystem.currentIndex * 3 + 1] = .05
    //     particleSystem.geometry.attributes.position.array[particleSystem.currentIndex * 3 + 2] = (((data.lat-31)/17) - .5) * 2 / 1.6;
    //     particleSystem.geometry.attributes.customColor.array[particleSystem.currentIndex * 3] = colors[data.type].r;
    //     particleSystem.geometry.attributes.customColor.array[particleSystem.currentIndex * 3 + 1] = colors[data.type].g; 
    //     particleSystem.geometry.attributes.customColor.array[particleSystem.currentIndex * 3 + 2] = colors[data.type].b;
    //     particleSystem.geometry.attributes.startTime.array[particleSystem.currentIndex] = thisTime();

    //     particleSystem.incrementIndex();
    //   }

    //   if(viewState === 'people'){

    //     peopleSystem.geometry.attributes.position.array[peopleSystem.currentIndex * 3] = -1 + (peopleSystem.currentIndex%25)/12.5;
    //     peopleSystem.geometry.attributes.position.array[peopleSystem.currentIndex * 3 + 1] = -.05
    //     // peopleSystem.geometry.attributes.position.array[particleSystem.currentIndex * 3 + 2] = -3 + Math.floor(particleSystem.currentIndex / 25) / 10;
    //     peopleSystem.geometry.attributes.position.array[peopleSystem.currentIndex * 3 + 2] = 1;

    //     peopleSystem.geometry.attributes.customColor.array[peopleSystem.currentIndex * 3] = colors[data.type].r;
    //     peopleSystem.geometry.attributes.customColor.array[peopleSystem.currentIndex * 3 + 1] = colors[data.type].g; 
    //     peopleSystem.geometry.attributes.customColor.array[peopleSystem.currentIndex * 3 + 2] = colors[data.type].b;
    //     peopleSystem.geometry.attributes.startTime.array[peopleSystem.currentIndex] = thisTime();

    //     peopleSystem.incrementIndex();
    //   }

    //}
    // console.log(data);

  };

  function listenerDelay(event){
    setTimeout(()=>{listener(event)}, Math.random() * 3000);
  }


  es.addEventListener("message", listenerDelay);
}
