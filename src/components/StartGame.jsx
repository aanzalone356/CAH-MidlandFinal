import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import emitEvents from './sockets/emitEvents';
import listenEvents from './sockets/listenEvents';

const socket = io('http://localhost:3001');

function StartGame() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
    { id: 4, name: 'Player 4' },
  ]);

  const [currentJudgeIndex, setCurrentJudgeIndex] = useState(0);
  const [cardsDealt, setCardsDealt] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { handleGame, handleCards, handlePlay } = emitEvents(socket, players, currentPlayerIndex);


  useEffect(() => {
    if (!gameStarted) {
      setCurrentJudgeIndex(Math.floor(Math.random() * players.length));
    }
  }, [gameStarted, players.length]);

  useEffect(() => {
    let timer;

    if (isPlaying) {
      timer = setTimeout(() => {
        handleNextPlayer();
      }, 20000); 

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isPlaying, currentPlayerIndex]);

  const handleStartGame = () => {
    setGameStarted(true);
    handleGame();
  };

  const handleDealCards = () => {
    setCardsDealt(true);
    handleNextPlayer();
    handleCards();

  const handleNextPlayer = () => {
    setIsPlaying(false);
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const handleNextJudge = () => {
    setCurrentJudgeIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const handlePlayCard = () => {
    console.log(`${players[currentPlayerIndex].name} played a card.`);
    handleNextPlayer();
    handlePlay();
  };

  // Use the listeners for the socket connection
  useEffect(() => {
    listenEvents(socket, setIsPlaying, setCurrentPlayerIndex);
  }, [setIsPlaying, setCurrentPlayerIndex]);

  return (
    <div>
      <h2>Game</h2>
      {!gameStarted && (
        <button onClick={handleStartGame}>Start Game</button>
      )}
      {gameStarted && !cardsDealt && (
        <button onClick={handleDealCards}>Deal Cards</button>
      )}
      {cardsDealt && (
        <div>
          <h3>Judge: {players[currentJudgeIndex].name}</h3>
          <button onClick={handleNextJudge}>Next Judge</button>
          <button onClick={() => setIsPlaying(true)}>Start Timer</button>
          <button onClick={() => setIsPlaying(false)}>Stop Timer</button>
          <button onClick={handlePlayCard} disabled={!isPlaying}>
            Play Card
          </button>
          <p>Current Player: {players[currentPlayerIndex].name}</p>
        </div>
      )}
    </div>
  );
}}

export default StartGame;

