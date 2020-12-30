import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UPDATE_STAGE } from '../reducers/configReducer';
import { Stage } from '../enums/Stage';

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
            <div className={`home_screen ${this.props.config.stage !== Stage.HOME ? "hidden" : ""}`}>
                <div className={`modal`}>
                    <button className="start_btn" onClick={this.onClick}>START</button>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(HomeScreen); 
