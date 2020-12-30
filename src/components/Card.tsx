import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage } from '../enums/Stage';
import { UPDATE_CARD, UPDATE_COMPLETE_TIME, UPDATE_LOCKED, UPDATE_MOVES, UPDATE_STAGE } from '../reducers/configReducer';
 
const FLIP_DELAY = 500;

const mapStateToProps = (state, props) => {
    const deck = state.config.deck;
    const cardConfig = deck[props.index];
    return {
        deck: deck,
        locked: state.config.locked || cardConfig.disabled,
        id: cardConfig.id,
        visible: cardConfig.visible
    }
};

class Card extends Component<any, any> {
    private cardIds: string[] = ["diamond", "plane", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];

    private onClick = () => {
        this.lockCards();
        this.updateMoves();
        this.updateCard(this.props.index, true, false)

        setTimeout(() => {
            this.unlockCards();
            const visibleItems = this.props.deck.filter(item => !item.disabled && item.visible);
            if (visibleItems.length === 2) {
                const match = visibleItems[0].id === visibleItems[1].id;
                visibleItems.forEach(item => this.updateCard(item.index, match, match));
                const totalDisabledCards = this.props.deck.filter(item => item.disabled).length;
                if (match && totalDisabledCards === this.props.deck.length) {
                    this.complete();
                }
            }
        }, FLIP_DELAY)
    };

    private complete(): void {
        this.props.dispatch({ type: UPDATE_COMPLETE_TIME, value: Date.now() });
        this.props.dispatch({ type: UPDATE_STAGE, value: Stage.RESULT });
    }

    private lockCards(): void {
        this.props.dispatch({ type: UPDATE_LOCKED, value: true });
    }

    private unlockCards(): void {
        this.props.dispatch({ type: UPDATE_LOCKED, value: false });
    }

    private updateMoves(): void {
        this.props.dispatch({ type: UPDATE_MOVES });
    }

    private updateCard(index: number, visible: boolean, disabled: boolean): void {
        this.props.dispatch({ type: UPDATE_CARD, index: index, value: { visible, disabled } });
    }

    private getCardClassName(): string {
        let keys = [];
        if (this.props.visible) { keys.push("open") };
        if (this.props.locked) { keys.push("locked") };
        return `card ${keys.join(" ")}`
    }

    render() {
        return (
            <li ref="card" className={this.getCardClassName()} onClick={this.onClick} >
                {this.props.visible && <i className={`fa fa-${this.cardIds[this.props.id]}`}></i>}
            </li>
        );
    }
}


export default connect(mapStateToProps)(Card);

