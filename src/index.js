import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

const SET_CURR_SONG = "SET_CURR_SONG"; 

const bank = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];
const inithialState = {
  currSong: "",
  bank
}
const setCurrSong = (name) => {
  return {
    type: SET_CURR_SONG,
    name
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
} 
const mapDispathToProps = (dispatch) => {
  return {
    setCurrSong: (name)=> {
      dispatch(setCurrSong(name))
    }
  }
}

const reducerDrum = (state = inithialState , action) => {
  switch (action.type) {
    case SET_CURR_SONG:
      return {
        ...state,
        currSong: action.name
      }
  
    default:
      return {
        ...state
      }
  }
}

const store = createStore(reducerDrum);

let DrumPad = ({keyCode, keyTrigger, id, url, setCurrSong}) => {
  const playSong = () => {
    setCurrSong(id);
    const sound = document.getElementById(keyTrigger)
    sound.play();
  }
  const handleKeyPress = (e) => {
    if(e.keyCode === keyCode){
      playSong()
    }
  }
  useEffect(()=>{
    document.addEventListener('keydown',handleKeyPress)
    return () => document.removeEventListener('keydown', this.handleKeyPress);
  })
  return(
    <div className = "drum-pad"
      id={id}
      onClick={playSong}
    >
        <audio
          className = "clip"
          id={keyTrigger}
          src={url}
        >

        </audio>
        {keyTrigger}
    </div>
  )
}

DrumPad = connect(null,mapDispathToProps)(DrumPad);

/**
 * 
 * @param {{bank:{keyCode: number,keyTrigger: string, id: string, url:string}[]}} param0 
 * @returns 
 */
let DrumPads = ({bank}) =>{
  return(
    <ul id = "drum-pads">
      {bank.map((v,i)=>(
        <li className="drum-pad-li" key={i}>
          <DrumPad 
          id ={v.id} 
          keyCode = {v.keyCode}
          keyTrigger = {v.keyTrigger}
          url = {v.url}
          key = {i}
          />

        </li>
      ))}
    </ul>
  )
}

DrumPads = connect(mapStateToProps, mapDispathToProps)(DrumPads);

let Display = ({currSong}) => {
  return (
    <div id = "display">
      {currSong}
    </div>
  )
}

Display = connect(mapStateToProps,null)(Display);

const App = () =>{
  return (
    <div id="drum-machine">
      <Display/>
      <DrumPads/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
