import React from 'react';
import './PeopleArea.css';

const PERSON_HEIGHT = 38;
const PERSON_WIDTH = 38;
const PADDING = 5;
export default ({recentEvents, treadMillOffset, onPeopleEnter, onPeopleLeave, peekPerson, onPeekPerson, onPeopleClick}) => {
  return (
    <div className="PA" onMouseEnter={onPeopleEnter} onMouseLeave={onPeopleLeave}>
       <div className="PA-container" style={{left: treadMillOffset * PERSON_WIDTH}}>
         { recentEvents.filter((item) => (item !== null)).map((item) => {
           let style = {
             top: PADDING + PERSON_HEIGHT * item.currentColumnIndex, 
             left: PADDING - PERSON_WIDTH * (item.currentRowIndex + 1)
           }
           let className = 'PA-person PA-person-' + item.gender + ' PA-person-' + item.type

           if(peekPerson === item.key){
             className += ' PA-person-peek'
           }

           return <img alt='person' src='images/person.png' className={className} key={item.key} style={style} onMouseEnter={onPeekPerson.bind(this, item.key)} onClick={onPeopleClick.bind(this, item.key)}/>
         })}
       </div>
    </div>
  );
}
