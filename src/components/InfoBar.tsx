import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        moves: state.config.moves,
        startTime: state.config.startTime
    }
};


class InfoBar extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = { timer: this.getTimeStr() };
        requestAnimationFrame(this.onEnterFrame.bind(this))
    }

    private getTimeStr() {
        let time = Date.now() - this.props.startTime
        return `${Math.floor(time / 1000)} sec`;
    }

    private onEnterFrame(delta: number): void {
        this.setState({ timer: this.getTimeStr() });
        requestAnimationFrame(this.onEnterFrame.bind(this))
    }

    render() {
        return (
            <div className="info_bar">
                <div className="info moves">
                    <div className="moves-title">moves:</div>
                    <div className="moves-value"> {this.props.moves}</div>
                </div>

                <div className="info time">
                    <div className="time-title">time:</div>
                    <div className="time-value"> {this.state.timer}</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,)(InfoBar);

