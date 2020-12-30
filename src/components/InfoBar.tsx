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

    private getTimeStr(): string {
        let time = Date.now() - this.props.startTime
        return `${Math.floor(time / 1000)} sec`;
    }

    private onEnterFrame(delta: number): void {
        this.setState({ timer: this.getTimeStr() });
        requestAnimationFrame(this.onEnterFrame.bind(this))
    }

    render() {
        return (
            <div className="info-bar">
                <div className="info-bar__item">
                    <div className="info-bar__title">moves:</div>
                    <div className="info-bar__value"> {this.props.moves}</div>
                </div>

                <div className="info-bar__item">
                    <div className="info-bar__title">time:</div>
                    <div className="info-bar__value"> {this.state.timer}</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,)(InfoBar);

