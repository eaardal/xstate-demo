import React, { Component } from "react";
import { Machine } from "xstate";

class Light extends Component {
  constructor(props) {
    super(props);

    this.machine = Machine({
      key: "light",
      initial: "red",
      states: {
        green: {
          on: {
            TIMER: "yellow"
          }
        },
        yellow: {
          on: {
            TIMER: "red"
          }
        },
        red: {
          on: {
            TIMER: "green"
          }
        }
      }
    });

    this.state = {
      currentLight: "red"
    };

    this.transition = this.transition.bind(this);
  }

  transition() {
    const nextState = this.machine.transition(this.state.currentLight, "TIMER")
      .value;

    this.setState({
      currentLight: nextState
    });
  }

  render() {
    const color = {
      red: "#CC0000",
      green: "#66CC00",
      yellow: "#CCC900"
    }[this.state.currentLight];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <button onClick={this.transition}>Transition</button>
        <div
          style={{
            margin: "10px",
            width: "100px",
            height: "100px",
            backgroundColor: color,
            borderRadius: "5px"
          }}
        />
        {`state: "${this.state.currentLight}"`}
      </div>
    );
  }
}

export default Light;
