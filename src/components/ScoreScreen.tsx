import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ScoreState } from "../reducers/scoreReducer";

const EXIT_DELAY = 1500;

const getScoreValue = (scoreData: ScoreState): number => {
    const seconds = (scoreData.completeTime - scoreData.startTime) / 1000;
    const ratio = Math.max(1, scoreData.moves * 10 + seconds);
    return Math.floor(100000 / ratio);
};

const ScoreScreen = (props: any) => {
    const scoreData = useSelector((state: any) => state.score);

    useEffect(() => {
        setTimeout(() => {
            props.history.push("/");
        }, EXIT_DELAY);
    });

    return (
        <div className="modal">
            <div className="modal__title">
                SCORE: {`${getScoreValue(scoreData)}`}
            </div>
        </div>
    );
};

export default ScoreScreen;
