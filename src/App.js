import './App.scss';
import {audioDrum, audioTri} from './Audio'
import React, {Component, useEffect, useState} from "react";

const drumActive ={
  background: "radial-gradient(transparent, transparent,#703c7060, #4b284b60,transparent)",
  boxShadow: "0px 0px 10px #fefaff",
  marginTop: 5
}
const drumInactive = {
  marginTop: 3
}
const triActive ={
  marginTop: 6,
  background: "linear-gradient( #8a498a60, #703c7060,#5e325e3b, #4b284b1e, #231925, #080808)"
}
const triInactive = {
  marginTop: 5
}

class InstrumentBtn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      musicStatus: drumInactive,
      animation: "",
      switch: this.props.indicator
    }
    this.playSound = this.playSound.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.bangingStyle = this.bangingStyle.bind(this);
    this.animationStyle = this.animationStyle.bind(this);
  }
  componentDidMount(){
    document.addEventListener( "keydown", this.keyPress);
    
  } 

  componentDidUpdate(prevProps){
    if(prevProps.indicator !== this.props.indicator){
      if(this.props.indicator){
        this.setState({musicStatus: triInactive})
      }
      else{
        this.setState({musicStatus: drumInactive})
      }
    }
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyPress)
  }

  keyPress(e){
    if(e.keyCode === this.props.keyCode){
      this.playSound();
    }
  }
  
  bangingStyle(){
    let instrument = this.props.styleName;
    if(instrument === "drumStyle" && this.state.musicStatus.marginTop === 5){
      this.setState({musicStatus: drumInactive})
    }
    else if(instrument === "drumStyle" && this.state.musicStatus.marginTop === 3){
      this.setState({musicStatus: drumActive})
    }
    else if(instrument === "triStyle" && this.state.musicStatus.marginTop === 6){
      this.setState({musicStatus: triInactive})
    }
    else if(instrument === "triStyle" && this.state.musicStatus.marginTop === 5){
      this.setState({musicStatus: triActive})
    }
  }

  animationStyle(){
    let instrument = this.props.styleName;
    if(instrument === "drumStyle" && this.state.animation ===""){
      this.setState({animation: "drumAnimation"})
    }
    else if (instrument === "drumStyle" && this.state.animation ==="drumAnimation"){
      
      this.setState({animation: ""})
    }
    else if(instrument === "triStyle" && this.state.animation ===""){
      if(this.props.keyCode === 32){
        this.setState({animation: "triBottomAnimation"})
      }
      else{
        this.setState({animation: "triAnimation"})
      }
    }
    else if(instrument === "triStyle" && this.state.animation ==="triAnimation" ||this.state.animation ==="triBottomAnimation"){
      this.setState({animation: ""})
    }
  }

  playSound(){
    let sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0.2;
    sound.play();
    this.bangingStyle();
    setTimeout(()=>this.bangingStyle(), 100);
    this.animationStyle();
    setTimeout(()=>this.animationStyle(),200)
  }

  render(){
    
    let styleClass = `${this.props.styleName} ${this.state.animation}`
    return(
      <div id = {this.props.soundId} className = {styleClass} style ={this.state.musicStatus} onClick={this.playSound}>
        <audio id ={this.props.keyTrigger} src = {this.props.sound}/>
        {this.props.keyTrigger}
      </div>
    )
  }

}

const Switch = (props) =>{
  let instrument = props.instrument? audioTri:audioDrum;
  if(!props.instrument){
    let instrumentSet = instrument.map(set => <InstrumentBtn indicator = {props.instrument} styleName = "drumStyle" soundId = {set.id} keyTrigger = {set.key} keyCode = {set.keycode} sound = {set.url}/>)
    return(
      <div className="drumkit">{instrumentSet}</div>
    )
  }
  else{
    let instrumentSet = instrument.map(set => <InstrumentBtn indicator = {props.instrument} styleName = "triStyle" soundId = {set.id} keyTrigger = {set.key} keyCode = {set.keycode} sound = {set.url}/>)
    return(
      <div className ="trikit">{instrumentSet}</div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      drum: false,
      switch: `${"fa fa-circle"}`
    }
    this.chooseInstrument = this.chooseInstrument.bind(this);
  }
  
  chooseInstrument(){
    if(this.state.drum){
      this.setState({drum: !this.state.drum, switch: `${"fa fa-circle"} ${"switchleftAni"}` })
    }
    else{
      this.setState({drum: !this.state.drum, switch: `${"fa fa-circle"} ${"switchrightAni"}`})
    }
  }

  render(){
    return (
      <div >
        <div id = "backgroundDrop">
          <div className = "drops">
            <div className = "drop"></div>
            <div className = "drop"></div>
            <div className = "drop"></div>
            <div className = "drop"></div>
            <div className = "drop"></div>
            <div className = "drop"></div>
            <div className = "drop"></div>
            <div className = "drop"></div>
          </div>
        </div>
        <div id ="mainInstrument">
          <div id ="switch">
            <i id="dot" className={this.state.switch} onClick={this.chooseInstrument} ></i>
          </div>
          <div>
            <Switch instrument = {this.state.drum}/>
          </div>
          <div>
            <p id ="myName">by <a id ="myLinkedIn" href = "https://github.com/arthurlee945" target="_blank">Arthur Lee</a></p>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
