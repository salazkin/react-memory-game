import produce from "immer"
import { Stage } from "../enums/Stage"

export const INIT_CARDS = "INIT_CARDS"
export const INIT_MOVES = "INIT_MOVES"
export const UPDATE_START_TIME = "UPDATE_START_TIME"
export const UPDATE_COMPLETE_TIME = "UPDATE_COMPLETE_TIME"
export const UPDATE_MOVES = "UPDATE_MOVES"
export const UPDATE_CARD = "UPDATE_CARD"
export const UPDATE_LOCKED = "UPDATE_LOCKED"
export const UPDATE_STAGE = "UPDATE_STAGE"

type CardConfig = {
    id: number,
    index: number,
    visible: boolean,
    disabled: boolean
}

type Config = {
    moves: number,
    startTime: number,
    completeTime: number,
    locked: boolean,
    stage: Stage,
    deck: CardConfig[]
}

const configReducer = (state: Config, action: any) => {
    switch (action.type) {
        case INIT_CARDS:
            return produce(state, draft => { draft.deck = action.value; });

        case INIT_MOVES:
            return produce(state, draft => { draft.moves = action.value; });

        case UPDATE_START_TIME:
            return produce(state, draft => { draft.startTime = action.value; });

        case UPDATE_COMPLETE_TIME:
            return produce(state, draft => { draft.completeTime = action.value; });

        case UPDATE_MOVES:
            return produce(state, draft => { draft.moves = state.moves + 1; });

        case UPDATE_CARD:
            return produce(state, draft => {
                draft.deck[action.index].visible = action.value.visible;
                draft.deck[action.index].disabled = action.value.disabled;
            });

        case UPDATE_LOCKED:
            return produce(state, draft => { draft.locked = action.value; });

        case UPDATE_STAGE:
            return produce(state, draft => { draft.stage = action.value; });

        default:
            return {};
    }
}

export default configReducer;
