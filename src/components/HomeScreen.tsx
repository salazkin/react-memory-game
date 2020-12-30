import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UPDATE_STAGE } from '../reducers/configReducer';

const mapStateToProps = (state) => {
    return {
        config: state.config
    }
};

class HomeScreen extends Component<any, any> {

    constructor(props) {
        super(props);
        this.props.dispatch({ type: UPDATE_STAGE, value: 0 });
    }

    private onClick(): void {
        this.props.dispatch({ type: UPDATE_STAGE, value: 1 });
    }

    render() {
        return (
            <div className={`home_screen ${this.props.config.stage !== 0 ? "hidden" : ""}`}>
                <div className={`modal`}>
                    <button className="start_btn" onClick={this.onClick.bind(this)}>START</button>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(HomeScreen); 
