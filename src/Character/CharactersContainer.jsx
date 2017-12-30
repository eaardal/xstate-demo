import React, { Component } from "react";
import { connect } from "react-redux";
import Characters from "./Characters";
import { getNextCharacter } from "./characters.actions";

class CharactersContainer extends Component {
  render() {
    return (
      <Characters
        {...this.props.character}
        onGetNextCharacter={this.props.onGetNextCharacter}
      />
    );
  }
}

const mapStateToProps = state => ({
  character: state.character
});

const mapDispatchToProps = dispatch => ({
  onGetNextCharacter: () => dispatch(getNextCharacter())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CharactersContainer
);
