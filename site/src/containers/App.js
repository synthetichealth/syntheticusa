import React from 'react';
import './App.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import PopulationBar from '../components/PopulationBar'
import PeopleArea from '../components/PeopleArea'
import PeopleDetails from '../components/PeopleDetails'
import MapArea from '../components/MapArea'
import Stats from '../components/Stats'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {play, pause, peekPerson, showPerson, closePerson} from '../actions/'

const App = ({playing, population, malePopulation, femalePopulation, births, deaths, recentEvents, treadMillOffset, lastEvent, time, onPeopleEnter, onPeopleLeave, onPeopleClick, peekPerson, onPeekPerson, onClosePerson, showPerson}) => {
  let playStyle = {display: 'none'}
  if(!playing){
    playStyle = {display: 'block'}
  }

  let mainStyle = {display: 'block'}
  if(showPerson){
    mainStyle = {display: 'none'}
  }

  
  return (
    <div className="App">
      <Header />
      <div className='App-main' style={mainStyle}>
        <PopulationBar population={population} malePopulation={malePopulation} femalePopulation={femalePopulation} births={births} deaths={deaths}/>
        <MapArea lastEvent = {lastEvent} time = {time}/>
        <Stats />
        <PeopleArea recentEvents = {recentEvents} treadMillOffset = {treadMillOffset} peekPerson={peekPerson} onPeopleEnter={onPeopleEnter} onPeopleLeave={onPeopleLeave} onPeopleClick={onPeopleClick} onPeekPerson={onPeekPerson}/>
        <Footer />
        <div className="App-paused" style={playStyle}>PAUSED</div>
      </div>
      <PeopleDetails showPerson={showPerson} onClosePerson = {onClosePerson} />

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
  peekPerson: state.peekPerson,
  showPerson: state.showPerson,
})

const mapDispatchToProps = dispatch => {
  return {
    onPeopleEnter: () => {
      dispatch(pause());
    },
    onPeopleLeave: () => {
      dispatch(play());
    },
    onPeopleClick: (id) => {
      dispatch(showPerson(id));
    },
    onPeekPerson: (id) => {
      dispatch(peekPerson(id))
    },
    onClosePerson: (id) => {
      dispatch(closePerson())
    }
  }
  // actions: bindActionCreators(TodoActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
