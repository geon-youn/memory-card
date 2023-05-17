import { useState } from 'react';
import Card from './components/Card';
import './style/App.css';

const names = [
    'Awkward',
    'Flex',
    'Funny',
    'FunnyAndSad',
    'IAmEmbarrased',
    "I'mAngry",
    "Let'sPlay",
    'Playemon',
    'Really',
    'Recommendation',
    'WhatDidYouSay',
    'WitcherMokoko',
];

const initialCards = () => {
    return names.map((name) => {
        return {
            name,
            clicked: 0,
        };
    });
};

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
}

export default function App() {
    const [round, setRound] = useState(0);
    const [cards, setCards] = useState(initialCards());
    const [best, setBest] = useState(0);
    const score = cards.reduce((p, c) => p + c.clicked, 0);

    let copy = cards.map((item) => item);
    shuffle(copy);

    function handleClick(name) {
        let fail = false;

        setCards(
            cards.map((cardInfo) => {
                if (cardInfo.name === name) {
                    if (cardInfo.clicked !== round) {
                        fail = true;
                    }
                    return {
                        ...cardInfo,
                        clicked: cardInfo.clicked + 1,
                    };
                }
                return cardInfo;
            })
        );

        if (fail) {
            if (score > best) {
                setBest(score);
            }
            setCards(initialCards);
            setRound(0);
        } else if (score + 1 === names.length) {
            setRound(round + 1);
        }
    }

    return (
        <>
            <h1>Memory Card Game</h1>
            <h2>Don't click on the same mokoko twice before the next round!</h2>
            <hr />
            <div className="scores">
                <div>
                    Round: <strong>{round + 1}</strong>
                </div>
                <div>
                    Score: <strong>{score}</strong>
                </div>
                <div>
                    Best Score: <strong>{best}</strong>
                </div>
            </div>
            <hr />
            <div className="cards">
                {copy.map((cardInfo) => {
                    return (
                        <Card
                            name={cardInfo.name}
                            handleClick={handleClick}
                            clicked={cardInfo.clicked}
                            key={cardInfo.name}
                        ></Card>
                    );
                })}
            </div>
        </>
    );
}
