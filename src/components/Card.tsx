import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flipCard, lockCards, unlockCards, updateCompleteTime, updateMoves } from '../actions';

const FLIP_DELAY = 500;

const mapStateToProps = (state, props) => {
    const deck = state.deck.deck;
    const cardConfig = deck[props.index];
    return {
        deck: deck,
        locked: state.deck.locked || cardConfig.disabled,
        id: cardConfig.id,
        visible: cardConfig.visible
    };
};

class Card extends Component<any, any> {
    private cardIds: string[] = ["diamond", "plane", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];

    private onClick = () => {
        this.props.dispatch(lockCards());
        this.props.dispatch(updateMoves());
        this.updateCard(this.props.index, true, false);

        setTimeout(() => {
            this.props.dispatch(unlockCards());
            const visibleItems = this.props.deck.filter(item => !item.disabled && item.visible);
            if (visibleItems.length === 2) {
                const match = visibleItems[0].id === visibleItems[1].id;
                visibleItems.forEach(item => this.updateCard(item.index, match, match));
                const totalDisabledCards = this.props.deck.filter(item => item.disabled).length;
                if (match && totalDisabledCards === this.props.deck.length) {
                    this.complete();
                }
            }
        }, FLIP_DELAY);
    };

    private complete(): void {
        this.props.dispatch(updateCompleteTime(Date.now()));
        this.props.history.push("/score");
    }


    private updateCard(index: number, visible: boolean, disabled: boolean): void {
        this.props.dispatch(flipCard({ index, visible, disabled }));
    }

    private getCardClassName(): string {
        let keys = [];
        if (this.props.visible) { keys.push("deck__card_open"); };
        if (this.props.locked) { keys.push("deck__card_locked"); };
        return `deck__card ${keys.join(" ")}`;
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
