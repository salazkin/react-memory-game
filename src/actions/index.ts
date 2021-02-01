import { FLIP_CARD, LOCK_CARDS, RESET, UNLOCK_CARDS, UPDATE_COMPLETE_TIME, UPDATE_DECK, UPDATE_MOVES } from "./types";


export type SCORE_PAYLOAD = {
    date: number;
};

export type DECK_PAYLOAD = {
    deck: CARD_PAYLOAD[];
};

export type FLIP_PAYLOAD = {
    index: number;
    visible: boolean;
    disabled: boolean;
};

export type CARD_PAYLOAD = {
    index: number;
    id: number;
    visible: boolean;
    disabled: boolean;
};

export const updateDeck = (payload: DECK_PAYLOAD) => ({ type: UPDATE_DECK, payload });
export const flipCard = (payload: FLIP_PAYLOAD) => ({ type: FLIP_CARD, payload });
export const resetScore = (payload: SCORE_PAYLOAD) => ({ type: RESET, payload });
export const updateCompleteTime = (value: number) => ({ type: UPDATE_COMPLETE_TIME, payload: value });
export const updateMoves = () => ({ type: UPDATE_MOVES });
export const lockCards = () => ({ type: LOCK_CARDS });
export const unlockCards = () => ({ type: UNLOCK_CARDS });

