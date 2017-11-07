import { combineReducers } from 'redux'

const begin = (state = { }, action) => {
  return state
}

const rootReducer = combineReducers({
  begin,
})

export default rootReducer
