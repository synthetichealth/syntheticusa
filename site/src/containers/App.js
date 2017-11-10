import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import PopulationBar from './PopulationBar'
import PeopleArea from './PeopleArea'
import MapArea from '../components/MapArea'
import Stats from '../components/Stats'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

const App = ({population, malePopulation, femalePopulation, births, deaths, recentEvents, lastEvent}) => (
  <div className="App">
    <Header />
    <PopulationBar population={population} malePopulation={malePopulation} femalePopulation={femalePopulation} births={births} deaths={deaths}/>
    <MapArea lastEvent = {lastEvent}/>
    <Stats />
    <PeopleArea recentEvents = {recentEvents}/>
    <Footer />
  </div>
)

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
  lastEvent: state.lastEvent,
})

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
