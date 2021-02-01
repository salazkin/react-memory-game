import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetScore, updateDeck } from "../actions";
import { DeckState } from "../reducers/deckReducer";
import Card from "./Card";
import InfoBar from "./InfoBar";
import { useLocation } from "react-router-dom";
const getShuffledSymbols = (length: number): number[] => {
    const symbols: number[] = [];
    const out: number[] = [];
    for (let i = 0; i < length; i++) {
        symbols.push(i, i);
    }
    while (symbols.length) {
        let randomIndex = Math.floor(Math.random() * symbols.length);
        out.push(...symbols.splice(randomIndex, 1));
    }
    return out;
};

const GameScreen = (props: any) => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const difficulty = location.difficulty || 2;
        const symbols = getShuffledSymbols(difficulty);
        dispatch(resetScore({ date: Date.now() }));
        dispatch(
            updateDeck({ deck: symbols.map((id, index) => ({ index, id, visible: false, disabled: false })) })
        );
    }, []);

    const deckState: DeckState = useSelector((state: any) => state.deck);
    const cards = deckState.deck.map((...arg) => (
        <Card key={`card${arg[1]}`} index={arg[1]} history={props.history} />
    ));

    return (
        <div>
            <InfoBar />
            <ul className="deck">{cards}</ul>
        </div>
    );
};

export default GameScreen;
