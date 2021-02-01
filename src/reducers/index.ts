import { combineReducers } from "redux";
import deckReducer from "./deckReducer";
import scoreReducer from "./scoreReducer";

export default combineReducers({
    score: scoreReducer,
    deck: deckReducer,
});
