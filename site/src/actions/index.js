export const FRAME = 'frame'

export const PAUSE = 'pause'
export const PLAY = 'play'

export const PEEK_PERSON = 'peekPerson'
export const CLEAR_PEEK = 'clearPeek'
export const SHOW_PERSON = 'showPerson'
export const CLOSE_PERSON = 'closePerson'

export const DEATH = 'death'
export const BIRTH = 'birth'
export const ENCOUNTER = 'encounter'
export const CONDITION_ONSET = 'condition-onset'
export const CONDITION_ABATEMENT = 'condition-abatement'
export const PROCEDURE = 'procedure'

export const frameEvent = (time) => {
  return {type: FRAME, time}
};

export const pause = () => {
  return {type: PAUSE}
};

export const play = () => {
  return {type: PLAY}
};

export const peekPerson = (id, name) => {
  return {type: PEEK_PERSON, id, name}
};

export const showPerson = (id) => {
  return {type: SHOW_PERSON, id}
};

export const closePerson = () => {
  return {type: CLOSE_PERSON}
};

export const clearPeek = (id) => {
  return {type: CLEAR_PEEK}
};

export const deathEvent = (name, gender, birthdate, lat, lon) => ({
    type: DEATH,
    name, gender, birthdate, lat, lon
});

export const birthEvent = (name, gender, birthdate, lat, lon) => ({
    type: BIRTH,
    name, gender, birthdate, lat, lon
});

export const encounterEvent = (encounterClass, code, name, gender, birthdate, lat, lon) => ({
    type: ENCOUNTER,
    encounterClass,
    code,
    name, gender, birthdate, lat, lon
});

export const conditionOnsetEvent = (value, name, gender, birthdate, lat, lon) => ({
    type: CONDITION_ONSET,
    value,
    name, gender, birthdate, lat, lon
});

export const conditionAbatementEvent = (value, name, gender, birthdate, lat, lon) => ({
    type: CONDITION_ABATEMENT,
    value,
    name, gender, birthdate, lat, lon
});

export const procedureEvent = (code, name, gender, birthdate, lat, lon) => ({
    type: PROCEDURE,
    code,
    name, gender, birthdate, lat, lon
});
