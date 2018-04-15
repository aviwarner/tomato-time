import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRemaining: 0,
      intervalId: 0,
      workTime: 70, // seconds of work sessions - 1500 default
      shortBreak: 5, // seconds of short breaks - 300 default
      longBreak: 15, // seconds of long break - 1800 default
      workCount: 0,
      timerStatus: 'work'
    };

    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);

    this.ding = new Audio('/assets/ding.mp3');
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
    const newStatus = this.state.timerStatus === 'work' ?  'break' : 'work';
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

    const clockSecs = (seconds % 60) - 1
    const clockMins = Math.floor(seconds / 60) - 1;

    this.setClock(clockSecs, clockMins);

    if (seconds === 0) {
      this.setSeconds(-1, -1);
      this.playDing();
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

  setSeconds(sec) {
    const r = ((sec + 1) * 6) + 90;
    document.getElementsByClassName("second-hand")[0].style.transform = `rotate(${r}deg)`;
  }

  setMinutes(min) {
    const r = ((min + 1) * 6) + 90;
    this.minuteHand.style.transform = `rotate(${r}deg)`;
  }

  setClock(sec, min) {
    const s = ((sec + 1) * 6) + 90;
    const m = ((min + 1) * 6) + 90;
    document.getElementsByClassName("second-hand")[0].style.transform = `rotate(${s}deg)`;
    document.getElementsByClassName("min-hand")[0].style.transform = `rotate(${m}deg)`;
  }

  render() {
    return(
      <section>
        <Grid>
          <Row>
            <Col md={6} xs={12}>
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
