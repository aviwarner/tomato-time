import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRemaining: 0,
      intervalId: 0,
      workTime: 10,
      shortBreak: 5,
      longBreak: 15,
      timerStatus: 'work'
    };
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  formatTime(time) {
    const sec = Math.round(time % 60);
    const min = Math.floor(time / 60);
    if (Number.isNaN(sec) || Number.isNaN(min)) {
      return "-:--"
    } else if (sec < 10) {
      return min + ":0" + sec
    } else {
      return min + ":" + sec
    }
  }

  startTimer() {
    if (this.state.intervalId === 0) {
      const intervalId = setInterval(this.countDown, 1000)
      this.setState({
        intervalId: intervalId
      });
    }
  }

// if working, resets work time, if on break, call switchTimer
  resetClick() {
    if (this.state.timerStatus === 'work') {
      this.setState({
        timeRemaining: this.state.workTime
      });
    } else {
      this.switchTimer();
    }
  }

// Switches from work to break, clears interval, sets timer status and time in state
  switchTimer() {
    clearInterval(this.state.intervalId);
    const newStatus = (this.state.timerStatus === 'work') ? ['break', this.state.shortBreak] : ['work', this.state.workTime];
    this.setState({
      intervalId: 0,
      timerStatus: newStatus[0],
      timeRemaining: newStatus[1]
    });
  }

  countDown() {
    let seconds = this.state.timeRemaining - 1;
    this.setState({
      timeRemaining: seconds
    });
    if (seconds === 0) {
      this.switchTimer();
    }
  }

  componentDidMount() {
    this.setState({
      timeRemaining: this.state.workTime
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return(
      <div>
        <h1>{this.formatTime(this.state.timeRemaining)}</h1>
        {this.state.intervalId === 0
          ? <Button bsStyle="primary" onClick={() => this.startTimer()}>
            {this.state.timerStatus === 'work'
              ? "Start work"
              : "Start break"
            }
          </Button>
          : <Button bsStyle="warning" onClick={() => this.resetClick()}>
            {this.state.timerStatus === 'work'
              ? "Reset work"
              : "Stop break"
            }
          </Button>
        }
      </div>
    )
  }
}

export default Timer;
