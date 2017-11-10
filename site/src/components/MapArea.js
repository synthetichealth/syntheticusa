import React, { Component } from 'react';
import './MapArea.css';
import GlobeScene from '../lib/GlobeScene'




class MapArea extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
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
  componentDidUpdate(){
    this.globeScene.addEvent(this.props.lastEvent)
    // console.log(this.props.lastEvent.lat + ',' + this.props.lastEvent.lon)
  }
  
}

export default MapArea;
