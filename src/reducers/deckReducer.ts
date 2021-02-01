import produce from "immer";
import { CARD_PAYLOAD, DECK_PAYLOAD, FLIP_PAYLOAD } from "../actions";
import { FLIP_CARD, LOCK_CARDS, UNLOCK_CARDS, UPDATE_DECK } from "../actions/types";

export type DeckState = {
    deck: CARD_PAYLOAD[];
    locked: boolean;
};

const deckInitialState: DeckState = { deck: [], locked: false };

const updateDeck = (state: DeckState, payload: DECK_PAYLOAD): DeckState =>
    produce(state, (draft) => {
        draft.deck = payload.deck;
    });

const flipCard = (state: DeckState, payload: FLIP_PAYLOAD): DeckState =>
    produce(state, (draft) => {
        draft.deck[payload.index].visible = payload.visible;
        draft.deck[payload.index].disabled = payload.disabled;
    });

const deckReducer = (state: DeckState = deckInitialState, action: any): DeckState => {
    switch (action.type) {
        case LOCK_CARDS:
            return produce(state, (draft) => {
                draft.locked = true;
            });
        case UNLOCK_CARDS:
            return produce(state, (draft) => {
                draft.locked = false;
            });
        case UPDATE_DECK:
            return updateDeck(state, action.payload);

        case FLIP_CARD:
            return flipCard(state, action.payload);

        default:
            return state;
    }
};
export default deckReducer;
