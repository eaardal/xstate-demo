import React, { Component } from "react";

const CharacterInfo = ({ data }) => (
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
    <p>Gender: {data.gender}</p>
    <p>Height: {data.height}</p>
    <p>Hair color: {data.hair_color}</p>
    <p>Eye color: {data.eye_color}</p>
  </div>
);

const Planets = ({
  data,
  dataState,
  viewState,
  characterId,
  onGetNextCharacter
}) => {
  const text = {
    idle: "Click to fetch character",
    loading: "Fetching...",
    error: "Failed fetching character. SAD!",
    success: `Succsessfully fetched /people/${characterId}`
  }[viewState];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <button
        onClick={() => onGetNextCharacter()}
        disabled={dataState === "loading"}
      >
        Next character
      </button>
      {text}
      {data && <CharacterInfo data={data} />}
    </div>
  );
};

export default Planets;
