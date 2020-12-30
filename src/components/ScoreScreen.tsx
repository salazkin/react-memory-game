import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UPDATE_STAGE } from '../reducers/configReducer';
import { Stage } from '../enums/Stage';

const EXIT_DELAY = 1500;

const mapStateToProps = (state) => {
    return {
        config: state.config
    }
};

class ScoreScreen extends Component<any, any> {

    private active = false;

    public componentDidUpdate(): void {
        if (!this.active && this.props.config.stage === Stage.RESULT) {
            this.active = true;
            setTimeout(() => {
                this.active = false;
                this.props.dispatch({ type: UPDATE_STAGE, value: Stage.HOME });
            }, EXIT_DELAY)
        }
    }

    private getScoreValue(): number {
        const config = this.props.config;
        let seconds = (config.completeTime - config.startTime) / 1000;
        return Math.floor(100000 / (config.moves * 10 + seconds));
    }

    render() {

        return (
            <div className={`score_screen ${this.props.config.stage !== Stage.RESULT ? "hidden" : ""}`}>
                <div className="modal">
                    SCORE: {`${this.getScoreValue()}`}
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(ScoreScreen); 
