import React, { Component } from "react";
import { Machine } from "xstate";

const PlanetInfo = ({ data }) => (
  <div
    style={{
      margin: "10px",
      width: "500px",
      height: "300px",
      backgroundColor: "#F2F2F2",
      borderRadius: "5px"
    }}
  >
    <h1>{data.name}</h1>
    <p>Diameter: {data.diameter}</p>
    <p>Climate: {data.climate}</p>
    <p>Terrain: {data.terrain}</p>
    <p>Population: {data.population}</p>
  </div>
);

class Planets extends Component {
  constructor(props) {
    super(props);

    this.machine = Machine({
      key: "planets",
      initial: "idle",
      states: {
        idle: {
          on: {
            CLICK: "loading"
          }
        },
        loading: {
          on: {
            RESOLVE: "success",
            REJECT: "error"
          }
        },
        success: {
          on: {
            CLICK: "loading"
          }
        },
        error: {
          on: {
            RESET: "idle",
            RETRY: "loading"
          }
        }
      }
    });

    this.commands = {
      loading: this.nextPlanet
    };

    this.state = {
      data: null,
      dataState: "idle",
      nextPlanetId: 1
    };

    this.transition = this.transition.bind(this);
  }

  async nextPlanet() {
    try {
      const { nextPlanetId } = this.state;
      const data = await fetch(
        `https://swapi.co/api/planets/${nextPlanetId}/?format=json`
      ).then(res => res.json());

      this.setState(
        {
          data,
          nextPlanetId: this.state.nextPlanetId + 1
        },
        this.transition("RESOLVE")
      );
    } catch (error) {
      this.transition("REJECT");
    }
  }

  transition(action) {
    const nextState = this.machine.transition(this.state.dataState, action)
      .value;
    const nextCommand = this.commands[nextState];

    this.setState(
      {
        dataState: nextState
      },
      nextCommand
    );
  }

  render() {
    const { data, dataState, nextPlanetId } = this.state;
    const text = {
      idle: "Click to fetch planet",
      loading: "Fetching...",
      error: "Failed fetching planet. SAD!",
      success: `Succsessfully fetched /planets/${nextPlanetId - 1}`
    }[dataState];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <button
          onClick={() => this.transition("CLICK")}
          disabled={dataState === "loading"}
        >
          Next planet
        </button>
        {text}
        {data && <PlanetInfo data={data} />}
      </div>
    );
  }
}

export default Planets;
