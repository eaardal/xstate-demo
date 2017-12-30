import { Machine } from "xstate";
import {
  GET_CHARACTER_START,
  GET_CHARACTER_SUCCESS,
  GET_CHARACTER_FAIL
} from "./characters.actions";

const machine = Machine({
  key: "characters",
  initial: "idle",
  states: {
    idle: {
      on: {
        START: "loading"
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
        START: "loading"
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

export const defaultState = {
  viewState: machine.initial,
  dataState: {
    isSuccess: false,
    isLoading: false,
    hasError: false
  },
  data: null,
  characterId: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_CHARACTER_START:
      return {
        ...state,
        dataState: {
          ...state.dataState,
          isLoading: true
        },
        viewState: machine.transition(state.viewState, "START")
      };
    case GET_CHARACTER_SUCCESS:
      return {
        ...state,
        dataState: {
          ...state.dataState,
          isLoading: false,
          isSuccess: true
        },
        data: action.char,
        characterId: state.characterId + 1,
        viewState: machine.transition(state.viewState, "RESOLVE")
      };
    case GET_CHARACTER_FAIL:
      return {
        ...state,
        dataState: {
          ...state.dataState,
          isLoading: false,
          isSuccess: false,
          hasError: true
        },
        data: null,
        viewState: machine.transition(state.viewState, "REJECT")
      };
    default:
      return state;
  }
};
