import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import PopulationBar from './PopulationBar'
import PeopleArea from './PeopleArea'
import MapArea from '../components/MapArea'
import Stats from '../components/Stats'

class App extends Component {
  render() {
    return (
      <div className="App">
         <Header />
         
         <PopulationBar />

         <MapArea />

         <Stats />

         <PeopleArea />


         <Footer />
      </div>
    );
  }
}

export default App;
