import React, { Component } from 'react';
import '../css/Styles.css';
import GameScreen from './GameScreen';
import HomeScreen from './HomeScreen';
import ScoreScreen from './ScoreScreen';

class App extends Component<any, any> {


    render() {
        return (
            <div className="App">
                <HomeScreen />
                <GameScreen />
                <ScoreScreen />
            </div>
        );
    }
}


export default App;
