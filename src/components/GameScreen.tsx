import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage } from '../enums/Stage';
import { INIT_CARDS, INIT_MOVES, UPDATE_START_TIME } from '../reducers/configReducer';
import Card from './Card';
import InfoBar from './InfoBar';

const mapStateToProps = (state) => {
    return {
        config: state.config
    }
};

class GameScreen extends Component<any, any> {

    private totalSymbolTypes = 3;
    private symbols = [];
    private active = false;

    constructor(props) {
        super(props);
    }

    private init(): void {
        this.active = true;
        this.symbols = this.getShuffledSymbols(this.totalSymbolTypes);

        this.props.dispatch({ type: INIT_MOVES, value: 0 });
        this.props.dispatch({ type: UPDATE_START_TIME, value: Date.now() });
        this.props.dispatch({ type: INIT_CARDS, value: this.symbols.map((id, index) => { return { index: index, id: id, visible: false, disabled: false } }) })
    }

    private getShuffledSymbols(length: number): number[] {
        const symbols: number[] = [];
        const out: number[] = [];
        for (let i = 0; i < length; i++) {
            symbols.push(i, i)
        }
        while (symbols.length) {
            let randomIndex = Math.floor(Math.random() * symbols.length);
            out.push(...symbols.splice(randomIndex, 1));
        }
        return out;
    }

    public componentDidUpdate(): void {
        if (!this.active && this.isGameStage()) {
            this.init();
        }
        if (!this.isGameStage()) {
            this.active = false
        }
    }

    private isGameStage(): boolean {
        return this.props.config.stage === Stage.GAME;
    }

    render() {
        const deck = this.props.config.deck || [];
        const cards = deck.map((...arg) => <Card key={`card${arg[1]}`} index={arg[1]} />)

        return (
            <div className={`screen ${this.isGameStage() ? "" : "screen__hidden"}`}>
                <InfoBar />
                <ul className="deck">
                    {cards}
                </ul>
            </div>
        );
    }
}


export default connect(mapStateToProps)(GameScreen); 
