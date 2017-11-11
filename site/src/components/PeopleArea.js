import React, { Component } from 'react';
import './PeopleArea.css';


const PERSON_HEIGHT = 38;
const PERSON_WIDTH = 38;
const PADDING = 5;
export default ({recentEvents, treadMillOffset}) => {
  return (
    <div className="PA">
       { recentEvents.filter((item) => (item !== null)).map((item) => {
         let style = {
           top: PADDING + PERSON_HEIGHT * item.currentColumnIndex, 
           left: PADDING + PERSON_WIDTH * (treadMillOffset - item.currentRowIndex)
         }
         let className = 'PA-person PA-' + item.gender
         return <img src='images/person.png' className={className} key={item.key} style={style}/>
       })}
    </div>
  );
}
