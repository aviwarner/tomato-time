import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRemaining: 0,
      intervalId: 0,
      workTime: 1500, // seconds of work sessions - 1500 default
      shortBreak: 300, // seconds of short breaks - 300 default
      longBreak: 1800, // seconds of long break - 1800 default
      workCount: 0,
      timerStatus: 'work',
      paused: false
    };

    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);

    this.ding = new Audio('/assets/ding.mp3');
  }

  formatTime(time) {
    let sec = Math.round(time % 60);
    let min = Math.floor(time / 60);
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
      let intervalId = setInterval(this.countDown, 1000)
      this.setState({
        intervalId: intervalId
      });
    }
  }

  playDing() {
    this.ding.load();
    this.ding.play();
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
    let newStatus = this.state.timerStatus === 'work' ?  'break' : 'work';
    let newTime = '';
    let newCount = '';
    if (this.state.workCount < 3 && this.state.timerStatus === 'work') {
      newTime = this.state.shortBreak;
      newCount = this.state.workCount + 1;
    } else if (this.state.timerStatus === 'break') {
      newTime = this.state.workTime;
      newCount  = this.state.workCount;
    } else {
      newTime = this.state.longBreak;
      newCount = 0;
    }
    this.setState({
      intervalId: 0,
      timerStatus: newStatus,
      timeRemaining: newTime,
      workCount: newCount
    });
  }

  countDown() {
    let seconds = this.state.timeRemaining - 1;
    this.setState({
      timeRemaining: seconds
    });

    let clockSecs = (seconds % 60) - 1
    let clockMins = Math.floor(seconds / 60) - 1;

    this.setClock(clockSecs, clockMins);

    if (seconds === 0) {
      this.setSeconds(-1, -1);
      this.playDing();
      this.switchTimer();
    }
  }

  handlePause() {
    if (this.state.paused) {
      this.setState({ paused: false })
      let intervalId = setInterval(this.countDown, 1000)
      this.setState({
        intervalId: intervalId
      });
    } else {
      this.setState({ paused: true })
      clearInterval(this.state.intervalId)
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

  setClock(sec, min) {
    let s = ((sec + 1) * 6) + 90;
    if (s >= 360) {
      s -= 360;
    }
    let m = ((min + 1) * 6) + 90;
    document.getElementsByClassName("second-hand")[0].style.transform = `rotate(${s}deg)`;
    document.getElementsByClassName("min-hand")[0].style.transform = `rotate(${m}deg)`;
    console.log()
  }

  render() {
    return(
      <section>
        <Grid>
          <Row>
            <Col md={6} xs={12}>
              <h1>{this.formatTime(this.state.timeRemaining)}</h1>
              {this.state.intervalId === 0
                ? <Button bsStyle="primary" className="timer-button" onClick={() => this.startTimer()}>
                  {this.state.timerStatus === 'work'
                    ? "Start work"
                    : "Start break"
                  }
                </Button>
                : <Button bsStyle="warning" className="timer-button" onClick={() => this.resetClick()}>
                  {this.state.timerStatus === 'work'
                    ? "Reset work"
                    : "Stop break"
                  }
                </Button>
              }
              {this.state.intervalId !== 0
                ? <Button bsStyle="info" onClick={() => this.handlePause()}>
                  {this.state.paused ? 'Resume' : 'Pause' }
                </Button>
                : ''
              }

            </Col>
            <Col md={6} xs={12}>
              <div className="clock">
                <div className="clock-face">
                  <div className="hand min-hand"></div>
                  <div className="hand second-hand"></div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}

export default Timer;
