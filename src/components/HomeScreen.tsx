import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateDeck } from "../actions";
const HomeScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateDeck({ deck: [] }));
    }, []);

    return (
        <div>
            <div className={`modal`}>
                <Link to={{ pathname: '/game', difficulty: 4 }}>
                    <button className="modal__button">EASY</button>
                </Link>
                <Link to={{ pathname: '/game', difficulty: 6 }}>
                    <button className="modal__button">NORMAL</button>
                </Link>
                <Link to={{ pathname: '/game', difficulty: 8 }}>
                    <button className="modal__button">HARD</button>
                </Link>
            </div>
        </div>
    );
};

export default HomeScreen;
