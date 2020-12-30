import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UPDATE_CARD, UPDATE_COMPLETE_TIME, UPDATE_LOCKED, UPDATE_MOVES, UPDATE_STAGE } from '../reducers/configReducer';

const FLIP_DELAY = 500;

const mapStateToProps = (state, props) => {
    const deck = state.config.deck
    return {
        deck: deck,
        locked: state.config.locked || deck[props.index].disabled,
        id: deck[props.index].id,
        visible: deck[props.index].visible
    }
};

class Card extends Component<any, any> {
    private cardIds: string[] = ["diamond", "plane", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];

    private onClick(): void {
        this.lockCards();
        this.updateMoves();
        this.updateCard(this.props.index, true, false)

        setTimeout(() => {
            this.unlockCards();
            const visibleItems = this.props.deck.filter(item => !item.disabled && item.visible);

            if (visibleItems.length === 2) {
                const match = visibleItems[0].id === visibleItems[1].id;
                visibleItems.forEach(item => this.updateCard(item.index, match, match));
                if (match && this.props.deck.filter(item => item.disabled).length === this.props.deck.length) {
                    this.complete();
                }
            }
        }, FLIP_DELAY)
    }

    complete(): void {
        this.props.dispatch({ type: UPDATE_COMPLETE_TIME, value: Date.now() });
        this.props.dispatch({ type: UPDATE_STAGE, value: 2 });
    }

    lockCards(): void {
        this.props.dispatch({ type: UPDATE_LOCKED, value: true });
    }

    unlockCards(): void {
        this.props.dispatch({ type: UPDATE_LOCKED, value: false });
    }

    updateMoves(): void {
        this.props.dispatch({ type: UPDATE_MOVES });
    }

    updateCard(index: number, visible: boolean, disabled: boolean): void {
        this.props.dispatch({ type: UPDATE_CARD, index: index, value: { visible, disabled } });
    }

    componentDidUpdate(): void {
        console.log(this.props.index);
    }


    getCardClassName(): string {
        let keys = [];
        if (this.props.visible === true) { keys.push("open") };
        if (this.props.locked === true) { keys.push("locked") };
        return `card ${keys.join(" ")}`
    }

    render() {
        return (
            <li ref="card" className={this.getCardClassName()} onClick={this.onClick.bind(this)} >
                {this.props.visible ? <i className={`fa fa-${this.cardIds[this.props.id]}`}></i> : null}
            </li>
        );
    }
}


export default connect(mapStateToProps)(Card);

