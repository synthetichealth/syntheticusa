import React from 'react';
import './PeopleDetails.css';

export default ({showPerson, onClosePerson}) => {
  let style = {display: 'none'}

  if(showPerson){
    style = {display: 'block'}
  }

  return (
    <div className="PD" style={style}>
       SHOWING PERSON {showPerson}
       <button onClick={onClosePerson}>close</button>
    </div>
    // <div className="PD" style={style}>
       // <br/>
    // </div>
  );
}
