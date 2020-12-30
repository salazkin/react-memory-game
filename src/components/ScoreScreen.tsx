import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UPDATE_STAGE } from '../reducers/configReducer';

const EXIT_DELAY = 1500;

const mapStateToProps = (state) => {
    return {
        config: state.config
    }
};

class ScoreScreen extends Component<any, any> {

    private active = false;

    public componentDidUpdate(): void {
        if (!this.active && this.props.config.stage === 2) {
            this.active = true;
            setTimeout(() => {
                this.active = false;
                this.props.dispatch({ type: UPDATE_STAGE, value: 0 });
            }, EXIT_DELAY)
        }
    }

    render() {
        const config = this.props.config;
        let seconds = (config.completeTime - config.startTime) / 1000;
        let score = Math.floor(100000 / (config.moves * 10 + seconds));
        return (
            <div className={`score_screen ${this.props.config.stage !== 2 ? "hidden" : ""}`}>
                <div className="modal">
                    SCORE: {`${score}`}
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(ScoreScreen); 
