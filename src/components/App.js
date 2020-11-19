import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.state = { time: 0, x: 0, y: 0, isGameStarted: false };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
  }

  componentDidUpdate() {
    if (this.state.x === 250 && this.state.y === 250) {
      clearInterval(this.timer);
      document.removeEventListener("keydown", this.onKeyDown);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown(event) {
    if (!this.state.isGameStarted) {
      return;
    }
    if (event.keyCode === 39) {
      this.setState({ x: this.state.x + 5 });
    } else if (event.keyCode === 37) {
      this.setState({ x: this.state.x - 5 });
    } else if (event.keyCode === 38) {
      this.setState({ y: this.state.y - 5 });
    } else if (event.keyCode === 40) {
      this.setState({ y: this.state.y + 5 });
    }
  }

  handleStartGame() {
    this.setState({ isGameStarted: true });
    this.timer = setInterval(() => {
      if (this.state.isGameStarted) {
        this.setState({ time: this.state.time + 1 });
      }
    }, 1000);
  }

  render() {
    return (
      <>
        <button className="start" onClick={this.handleStartGame}>
          start
        </button>
        <div className="heading-timer">{this.state.time}</div>
        <div
          className="ball"
          style={{ left: this.state.x + "px", top: this.state.y + "px" }}
        ></div>
        <div className="hole"></div>
      </>
    );
  }
}

export default Timer;
