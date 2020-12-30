import React, { Component } from 'react';
import { connect } from 'react-redux';
import { INIT_CARDS, INIT_MOVES, UPDATE_START_TIME } from '../reducers/configReducer';
import Card from './Card';
import InfoBar from './InfoBar';

const mapStateToProps = (state) => {
    return {
        config: state.config
    }
};

class GameScreen extends Component<any, any> {

    private totalSymbolTypes = 4;
    private symbols = [];
    private active = false;

    constructor(props) {
        super(props)
        this.init();
    }

    private init() {
        this.active = true;
        this.symbols = this.getShuffledSymbols(this.totalSymbolTypes);

        this.props.dispatch({ type: INIT_MOVES, value: 0 });
        this.props.dispatch({ type: UPDATE_START_TIME, value: Date.now() });
        this.props.dispatch({ type: INIT_CARDS, value: this.symbols.map((id, index) => { return { index: index, id: id, visible: false, disabled: false } }) })
    }

    private getShuffledSymbols(length: number): number[] {
        let symbols: number[] = [];
        let out: number[] = [];
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
        if (!this.active && this.props.config.stage === 1) {
            this.init();
        }
        if (this.props.config.stage !== 1) {
            this.active = false
        }
    }

    render() {
        const deck = this.props.config.deck || [];
        const cards = deck.map((id, index) => <Card key={index} index={index} />)

        return (
            <div className={`game_screen ${this.props.config.stage !== 1 ? "hidden" : ""}`}>
                <InfoBar />
                <ul className="deck">
                    {cards}
                </ul>
            </div>
        );
    }
}


export default connect(mapStateToProps)(GameScreen); 
