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

  componentWillReceiveProps(lastProp){
    if(lastProp.time !== this.props.time){
      this.globeScene.render(this.props.time)
    }
    if((!lastProp.lastEvent && this.props.lastEvent) || (this.props.lastEvent && 
                                                        this.props.lastEvent.name !== lastProp.lastEvent.name && 
                                                        this.props.lastEvent.type !== lastProp.lastEvent.type)){
      this.globeScene.addEvent(this.props.lastEvent)
    }
  }

  
}

export default MapArea;
