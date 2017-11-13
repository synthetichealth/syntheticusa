import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import PopulationBar from '../components/PopulationBar'
import PeopleArea from '../components/PeopleArea'
import MapArea from '../components/MapArea'
import Stats from '../components/Stats'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {play, pause, peekPerson} from '../actions/'

const App = ({playing, population, malePopulation, femalePopulation, births, deaths, recentEvents, treadMillOffset, lastEvent, time, onPeopleEnter, onPeopleLeave, peekPerson, onPeekPerson}) => {
  let playStyle = {display: 'none'}
  if(!playing){
    playStyle = {display: 'block'}
  }
  
  return (
    <div className="App">
      <Header />
      <PopulationBar population={population} malePopulation={malePopulation} femalePopulation={femalePopulation} births={births} deaths={deaths}/>
      <MapArea lastEvent = {lastEvent} time = {time}/>
      <Stats />
      <PeopleArea recentEvents = {recentEvents} treadMillOffset = {treadMillOffset} peekPerson={peekPerson} onPeopleEnter={onPeopleEnter} onPeopleLeave={onPeopleLeave} onPeekPerson={onPeekPerson}/>
      <Footer />
      <div class="App-paused" style={playStyle}>PAUSED</div>
    </div>
  )
}

App.propTypes = {
  population: PropTypes.number.isRequired,
  malePopulation: PropTypes.number.isRequired,
  femalePopulation: PropTypes.number.isRequired,
  births: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired,
  recentEvents: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  population: state.population,
  malePopulation: state.malePopulation,
  femalePopulation: state.femalePopulation,
  births: state.births,
  deaths: state.deaths,
  recentEvents: state.recentEvents,
  treadMillOffset: state.treadMillOffset,
  lastEvent: state.lastEvent,
  time: state.time,
  playing: state.playing,
  peekPerson: state.peekPerson
})

const mapDispatchToProps = dispatch => {
  return {
    onPeopleEnter: () => {
      dispatch(pause());
    },
    onPeopleLeave: () => {
      dispatch(play());
    },
    onPeekPerson: (id) => {
      dispatch(peekPerson(id))
    }
  }
  // actions: bindActionCreators(TodoActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
