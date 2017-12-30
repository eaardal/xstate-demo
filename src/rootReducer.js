import { combineReducers } from "redux";
import charactersReducer from "./Character/characters.reducer";

export default combineReducers({
  character: charactersReducer
});
