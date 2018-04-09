import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBbUMQU3u_N6i8JSd2RZ_ABOevF5-0F-XM",
  authDomain: "tomato-timer-be8e5.firebaseapp.com",
  databaseURL: "https://tomato-timer-be8e5.firebaseio.com",
  projectId: "tomato-timer-be8e5",
  storageBucket: "",
  messagingSenderId: "207907061698"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer
          firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
