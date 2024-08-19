import React, { useState } from 'react';
import emojiData from '../data/emojiData';

const getRandomEmoji = () => emojiData[Math.floor(Math.random() * emojiData.length)];

const getClue = (target, guessCount) => {
  const clues = [
    `This emoji is from the "${target.category}" category.`,
    `It belongs to the "${target.subcategory}" subcategory.`,
    `The emoji's sentiment is generally considered ${target.sentiment}.`,
    `One of its notable features is ${target.features[0]}.`,
    `Another characteristic of this emoji is ${target.features[1]}.`,
    `The name of this emoji is "${target.name}".`
  ];

  return clues[Math.min(guessCount - 1, clues.length - 1)];
};

const EmojiGuessingGame = () => {
  const [targetEmoji, setTargetEmoji] = useState(getRandomEmoji());
  const [userGuess, setUserGuess] = useState('');
  const [clue, setClue] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [guessLog, setGuessLog] = useState([]);

  const handleGuess = (guess) => {
    const guessedEmojiData = emojiData.find(data => data.emoji === guess);
    if (!guessedEmojiData) {
      setClue("That's not a valid emoji from our list. Try again!");
      return;
    }

    setGuessCount(prevCount => prevCount + 1);
    setGuessLog(prevLog => [...prevLog, guess]);

    if (guess === targetEmoji.emoji) {
      setClue(`Correct! You've guessed the emoji: ${targetEmoji.name}`);
      setGameOver(true);
    } else {
      const newClue = getClue(targetEmoji, guessCount + 1);
      setClue(newClue);
    }
    setUserGuess('');
  };

  const resetGame = () => {
    setTargetEmoji(getRandomEmoji());
    setUserGuess('');
    setClue('');
    setGuessCount(0);
    setGameOver(false);
    setGuessLog([]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Emoji Guessing Game</h1>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>Guess the randomly selected emoji!</p>
      
      {/* Guess Log */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h3>Your Guesses:</h3>
        <div style={{ fontSize: '24px', letterSpacing: '5px' }}>
          {guessLog.join(' ')}
        </div>
      </div>

      {/* Input and Guess Button */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={userGuess} 
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Enter an emoji"
          style={{ flexGrow: 1, marginRight: '10px', padding: '5px' }}
        />
        <button onClick={() => handleGuess(userGuess)} disabled={gameOver} style={{ padding: '5px 10px' }}>
          Guess
        </button>
      </div>

      {/* Clue and Game Over Message */}
      {clue && <p style={{ textAlign: 'center', marginBottom: '20px' }}>{clue}</p>}
      {gameOver && (
        <p style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: 'green' }}>
          Congratulations! You found the emoji in {guessCount} guesses.
        </p>
      )}

      {/* Guess Count */}
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>Guesses: {guessCount}</p>

      {/* Play Again Button */}
      {gameOver && (
        <button onClick={resetGame} style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '20px' }}>
          Play Again
        </button>
      )}

      {/* Emoji Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '10px', marginBottom: '20px' }}>
        {emojiData.map((data, index) => (
          <button
            key={index}
            onClick={() => handleGuess(data.emoji)}
            disabled={gameOver}
            style={{ fontSize: '24px', padding: '5px', height: '40px' }}
          >
            {data.emoji}
          </button>
        ))}
      </div>

    </div>
  );
};

export default EmojiGuessingGame;