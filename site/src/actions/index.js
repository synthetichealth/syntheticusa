
export const DEATH = 'death'
export const BIRTH = 'birth'

export const deathEvent = (name, gender, birthdate, lat, lon) => ({
    type: DEATH,
    name, gender, birthdate, lat, lon
});

export const birthEvent = (name, gender, birthdate, lat, lon) => ({
    type: BIRTH,
    name, gender, birthdate, lat, lon
});
