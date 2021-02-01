import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "../css/styles.scss";
import GameScreen from "./GameScreen";
import HomeScreen from "./HomeScreen";
import ScoreScreen from "./ScoreScreen";

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Route path="/" exact component={HomeScreen} />
                <Route path="/game" exact component={GameScreen} />
                <Route path="/score" exact component={ScoreScreen} />
            </div>
        </BrowserRouter>
    );
};

export default App;
