import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer';
import User from './components/User';
import Task from './components/Task';
import * as firebase from 'firebase';
import { Jumbotron } from 'react-bootstrap';

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
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      userId: ''
    };
  }

  setUser(user) {
    this.setState({
      currentUser: user ? user.displayName : "Guest",
      userId: user ? user.uid : "n/a"
    });
  }

  render() {
    return (
      <section className="App">
        <div className="container">
          <Jumbotron className="app-frame">
            <User
              firebase={firebase}
              currentUser={this.state.currentUser}
              setUser={(user) => this.setUser(user)}
            />
            <Timer
              firebase={firebase}
            />
            { this.state.currentUser !== 'Guest'
              ? <Task
                firebase={firebase}
                userId={this.state.userId}
                />
              : ''
            }
          </Jumbotron>
        </div>
      </section>
    );
  }
}

export default App;
