import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './PopulationBar.css';

const PopulationBar = ({population, femalePopulation, malePopulation, births, deaths}) => {
  return (
    <div className="PB">
      <div className='PB-total-population-area'>
        <div className='PB-total-population-number'>{population}</div>
        <div className='PB-total-population-label'>Total US Population</div>
      </div>
      <div className='PB-gender-population-area'>
        <div className='PB-gender-number'>{femalePopulation}</div>
        <div className='PB-gender-label'>Female</div>
        <div className='PB-gender-number'>{malePopulation}</div>
        <div className='PB-gender-label'>Male</div>
      </div>
      <div className='PB-births-deaths-area'>
        <div className='PB-births-deaths-number'>
          {births}
        </div>
        <div className='PB-births-deaths-label'>
          Births
        </div>
      </div>
      <div className='PB-births-deaths-area'>
        <div className='PB-births-deaths-number'>
          {deaths}
        </div>
        <div className='PB-births-deaths-label'>
          Deaths
        </div>
      </div>
    </div>
  )
}

PopulationBar.propTypes = {
  population: PropTypes.number.isRequired,
}

export default PopulationBar;
