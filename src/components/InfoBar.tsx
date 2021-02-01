import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        moves: state.score.moves,
        startTime: state.score.startTime,
    };
};

class InfoBar extends Component<any, any> {
    private requestAnimationFrameId: number;

    constructor(props: any) {
        super(props);
        this.state = { timer: this.getTimeStr() };

        this.requestAnimationFrameId = requestAnimationFrame(this.onEnterFrame);
    }

    private getTimeStr(): string {
        let time = Date.now() - this.props.startTime;
        return `${Math.floor(time / 1000)} sec`;
    }

    private onEnterFrame = (): void => {
        this.setState({ timer: this.getTimeStr() });
        this.requestAnimationFrameId = requestAnimationFrame(this.onEnterFrame);
    };

    public componentWillUnmount(): void {
        cancelAnimationFrame(this.requestAnimationFrameId);
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

export default connect(mapStateToProps)(InfoBar);
