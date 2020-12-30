import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage } from '../enums/Stage';
import { UPDATE_STAGE } from '../reducers/configReducer';

const mapStateToProps = (state) => {
    return {
        config: state.config
    }
};

class HomeScreen extends Component<any, any> {

    constructor(props) {
        super(props);
        this.props.dispatch({ type: UPDATE_STAGE, value: Stage.HOME });
    }

    private onClick = () => {
        this.props.dispatch({ type: UPDATE_STAGE, value: Stage.GAME });
    }

    render() {
        return (
            <div className={`screen ${this.props.config.stage !== Stage.HOME ? "screen__hidden" : ""}`}>
                <div className={`modal`}>
                    <button className="modal__button" onClick={this.onClick}>START</button>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(HomeScreen); 
