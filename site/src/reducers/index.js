import {BIRTH, DEATH, ENCOUNTER_ONSET, ENCOUNTER_ABATEMENT, PROCEDURE, ENCOUNTER} from '../actions/'
// import { combineReducers } from 'redux'



// connected
// recentEvents
// births
// deaths
// population
// malePopulation
// femalePopul

const PEOPLE_PER_COLUMN = 5
const MAX_EVENTS = 250

let eventId = 0

const defaultState = {
  connected: false,
  population: 345123433,
  malePopulation: 345123432/2,
  femalePopulation: 345123432/2,
  births: 0,
  deaths: 0,
  recentEvents: new Array(MAX_EVENTS).fill(null),
  treadMillOffset: -1,
  treadMillRate: 0,
  currentColumnIndex: -1,
  currentRowIndex: -1,
}

const rootReducer = (state = defaultState, action) => {
  let malePopulation = state.malePopulation;
  let femalePopulation = state.femalePopulation;

  let newEvents = [...state.recentEvents]

  if(action.type === 'birth' || action.type === 'death' || action.type === 'encounter'){

    state.currentColumnIndex = (state.currentColumnIndex + 1) % PEOPLE_PER_COLUMN

    if(state.currentColumnIndex === 0){
      state.currentRowIndex++;
      state.treadMillOffset++;
    }

    newEvents.shift()
    newEvents.push({...action, currentColumnIndex: state.currentColumnIndex, currentRowIndex: state.currentRowIndex, key: eventId++})

  }

  // console.log(newEvents)

  switch(action.type){
    case BIRTH:
      if(action.gender === 'male'){
        malePopulation++;
      } else {
        femalePopulation++;
      }
      return Object.assign({}, state, {
        births: state.births + 1, 
        population: state.population + 1, 
        malePopulation: malePopulation, 
        femalePopulation: femalePopulation,
        recentEvents: newEvents,
        lastEvent: action
      })
    case DEATH:
      if(action.gender === 'male'){
        malePopulation--;
      } else {
        femalePopulation--;
      }
      return Object.assign({}, state, {
        deaths: state.deaths + 1, 
        population: state.population - 1, 
        malePopulation: malePopulation, 
        femalePopulation: femalePopulation,
        recentEvents: newEvents,
        lastEvent: action
      })

    case ENCOUNTER:
      return Object.assign({}, state, {
        recentEvents: newEvents,
        lastEvent: action
      })
    default:
      return state
  }
}

// const rootReducer = combineReducers({
//   begin,
// })
// 

export default rootReducer
