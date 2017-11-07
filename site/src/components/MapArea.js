import React, { Component } from 'react';
import './MapArea.css';
import GlobeScene from '../lib/GlobeScene'

const THREE = require('three');

class MapArea extends Component {
  render() {
    return (
      <div ref={(mount) => { this.mount = mount }} className="MapArea">
      </div>
    );
  }

  componentDidMount(){
    this.globeScene = new GlobeScene(this.mount)
    this.globeScene.render();

  }
  
}

export default MapArea;
