import produce from "immer";
import { SCORE_PAYLOAD } from "../actions";
import { RESET, UPDATE_COMPLETE_TIME, UPDATE_MOVES } from "../actions/types";

export type ScoreState = {
    moves: number;
    startTime: number;
    completeTime: number;
};

const scoreInitialState: ScoreState = {
    moves: 0,
    startTime: 0,
    completeTime: 0,
};

const resetScore = (state: ScoreState, payload: SCORE_PAYLOAD): ScoreState =>
    produce(state, (draft) => {
        draft.moves = 0;
        draft.startTime = payload.date;
        draft.completeTime = payload.date;
    });

const scoreReducer = (state: ScoreState = scoreInitialState, action: any): ScoreState => {
    switch (action.type) {
        case UPDATE_MOVES:
            return produce(state, (draft) => {
                draft.moves += 1;
            });

        case UPDATE_COMPLETE_TIME:
            return produce(state, (draft) => {
                draft.completeTime = action.payload;
            });
        case RESET:
            return resetScore(state, action.payload);
        default:
            return state;
    }
};

export default scoreReducer;
