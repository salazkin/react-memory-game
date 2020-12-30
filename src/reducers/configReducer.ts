
export const INIT_CARDS = "INIT_CARDS"
export const INIT_MOVES = "INIT_MOVES"
export const UPDATE_START_TIME = "UPDATE_START_TIME"
export const UPDATE_COMPLETE_TIME = "UPDATE_COMPLETE_TIME"
export const UPDATE_MOVES = "UPDATE_MOVES"
export const UPDATE_CARD = "UPDATE_CARD"
export const UPDATE_LOCKED = "UPDATE_LOCKED"
export const UPDATE_STAGE = "UPDATE_STAGE"

const configReducer = (state, action) => {

    switch (action.type) {
        case INIT_CARDS:
            return Object.assign({}, state, { deck: action.value })

        case INIT_MOVES:
            return Object.assign({}, state, { moves: action.value });

        case UPDATE_START_TIME:
            return Object.assign({}, state, { startTime: action.value });

        case UPDATE_COMPLETE_TIME:
            return Object.assign({}, state, { completeTime: action.value });

        case UPDATE_MOVES:
            return Object.assign({}, state, { moves: state.moves + 1 });

        case UPDATE_CARD:
            let deck = [...state.deck]
            deck[action.id] = Object.assign(state.deck[action.index], action.value);
            return { ...state, deck: deck }

        case UPDATE_LOCKED:
            return Object.assign({}, state, { locked: action.value });

        case UPDATE_STAGE:
            return Object.assign({}, state, { stage: action.value });

        default:
            return {}
    }
}




export default configReducer;
