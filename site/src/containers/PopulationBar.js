import React, { Component } from 'react';
import './PopulationBar.css';

class PopulationBar extends Component {
  render() {
    return (
      <div className="PB">
        <div className='PB-total-population-area'>
          <div className='PB-total-population-number'>362,182,849</div>
          <div className='PB-total-population-label'>Total US Population</div>
        </div>
        <div className='PB-gender-population-area'>
          <div className='PB-gender-number'>145,345,2343</div>
          <div className='PB-gender-label'>Female</div>
          <div className='PB-gender-number'>135,345,343</div>
          <div className='PB-gender-label'>Male</div>
        </div>
        <div className='PB-births-deaths-area'>
          <div className='PB-births-deaths-number'>
            123,231
          </div>
          <div className='PB-births-deaths-label'>
            Births
          </div>
        </div>
        <div className='PB-births-deaths-area'>
          <div className='PB-births-deaths-number'>
            123,231
          </div>
          <div className='PB-births-deaths-label'>
            Deaths
          </div>
        </div>
      </div>
    );
  }
}

export default PopulationBar;
