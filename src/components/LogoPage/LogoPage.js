import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AiFillGithub, AiOutlineMail, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import "./LogoPage.css";

const SIZE = 4;
const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const SECRET_WORD = "react";

// Whack-a-Mole Game Component
function WhackAMole() {
  const [score, setScore] = useState(0);
  const [moleIndex, setMoleIndex] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setMoleIndex(Math.floor(Math.random() * 9));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = (index) => {
    if (index === moleIndex) {
      setScore(score + 1);
      setMoleIndex(null);
    }
  };

  return (
    <div>
      <h2>Whack-a-Mole</h2>
      <p>Score: {score}</p>
      <div className="whack-a-mole-grid">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={`whack-a-mole-cell ${
              index === moleIndex ? "mole" : ""
            }`}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

// 2048 Game Component
function Game2048() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    addRandomTile(board);
    addRandomTile(board);
    setBoard([...board]);

    const handleKeyDown = (event) => {
      if (!gameOver) {
        switch (event.key) {
          case "ArrowUp":
            moveUp();
            break;
          case "ArrowDown":
            moveDown();
            break;
          case "ArrowLeft":
            moveLeft();
            break;
          case "ArrowRight":
            moveRight();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);

  function createEmptyBoard() {
    return Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill(0));
  }

  function addRandomTile(board) {
    let emptyTiles = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] === 0) {
          emptyTiles.push([r, c]);
        }
      }
    }
    if (emptyTiles.length > 0) {
      let [r, c] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  function moveLeft() {
    let newBoard = board.map((row) => [...row]);
    let hasMoved = false;
    for (let r = 0; r < SIZE; r++) {
      let row = newBoard[r].filter((val) => val);
      let newRow = Array(SIZE).fill(0);
      for (let i = 0; i < row.length; i++) {
        if (row[i] === row[i + 1]) {
          newRow[i] = row[i] * 2;
          setScore((prevScore) => prevScore + newRow[i]);
          row[i + 1] = 0;
          i++;
        } else {
          newRow[i] = row[i];
        }
      }
      if (newRow.join() !== newBoard[r].join()) {
        hasMoved = true;
      }
      newBoard[r] = newRow;
    }
    if (hasMoved) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      if (checkGameOver(newBoard)) setGameOver(true);
    }
  }

  function moveRight() {
    let newBoard = board.map((row) => [...row].reverse());
    moveLeft();
    newBoard = board.map((row) => row.reverse());
    setBoard(newBoard);
  }

  function moveUp() {
    let newBoard = transpose(board);
    moveLeft();
    newBoard = transpose(board);
    setBoard(newBoard);
  }

  function moveDown() {
    let newBoard = transpose(board);
    moveRight();
    newBoard = transpose(board);
    setBoard(newBoard);
  }

  function transpose(board) {
    let newBoard = createEmptyBoard();
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        newBoard[r][c] = board[c][r];
      }
    }
    return newBoard;
  }

  function checkGameOver(board) {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] === 0) return false;
        if (c < SIZE - 1 && board[r][c] === board[r][c + 1]) return false;
        if (r < SIZE - 1 && board[r][c] === board[r + 1][c]) return false;
      }
    }
    return true;
  }

  function resetGame() {
    let newBoard = createEmptyBoard();
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
  }

  return (
    <div>
      <h2>2048</h2>
      <p>Score: {score}</p>
      <div className="board">
        {board.map((row, r) =>
          row.map((tile, c) => (
            <div key={`${r}-${c}`} className={`tile tile-${tile}`}>
              {tile !== 0 ? tile : ""}
            </div>
          ))
        )}
      </div>
      {gameOver && <h2 className="game-over">Game Over</h2>}
      <Button onClick={resetGame} className="reset-button">
        Reset
      </Button>
    </div>
  );
}

// Wordle Game Component
function Wordle() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setCurrentGuess(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentGuess.length !== WORD_LENGTH) {
      setMessage(`Guess must be ${WORD_LENGTH} letters`);
      return;
    }

    if (guesses.length < MAX_ATTEMPTS) {
      const guessResult = evaluateGuess(currentGuess);
      setGuesses([...guesses, guessResult]);

      if (currentGuess === SECRET_WORD) {
        setGameOver(true);
        setMessage("Congratulations! You've guessed the word.");
      } else if (guesses.length === MAX_ATTEMPTS - 1) {
        setGameOver(true);
        setMessage(`Game Over! The word was "${SECRET_WORD}".`);
      } else {
        setMessage("");
      }

      setCurrentGuess("");
    }
  };

  const evaluateGuess = (guess) => {
    let result = [];
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guess[i] === SECRET_WORD[i]) {
        result.push({ letter: guess[i], status: "correct" });
      } else if (SECRET_WORD.includes(guess[i])) {
        result.push({ letter: guess[i], status: "present" });
      } else {
        result.push({ letter: guess[i], status: "absent" });
      }
    }
    return result;
  };

  return (
    <div>
      <h2>Wordle</h2>
      <p>Guess the 5-letter word within 6 tries.</p>
      <div className="board">
        {guesses.map((guess, rowIndex) => (
          <div key={rowIndex} className="guess-row">
            {guess.map((letter, colIndex) => (
              <div key={colIndex} className={`guess-letter ${letter.status}`}>
                {letter.letter}
              </div>
            ))}
          </div>
        ))}
        {!gameOver && (
          <Form onSubmit={handleSubmit} className="guess-form">
            <Form.Control
              type="text"
              maxLength={WORD_LENGTH}
              value={currentGuess}
              onChange={handleInputChange}
              disabled={gameOver}
            />
            <Button type="submit" className="guess-button">
              Submit
            </Button>
          </Form>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

// Main LogoPage Component
function LogoPage() {
  const [selectedGame, setSelectedGame] = useState(null);

  const renderGame = () => {
    switch (selectedGame) {
      case "whack-a-mole":
        return <WhackAMole />;
      case "2048":
        return <Game2048 />;
      case "wordle":
        return <Wordle />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>Choose a Game</h1>
            {!selectedGame ? (
              <div className="game-selection">
                <Button
                  onClick={() => setSelectedGame("whack-a-mole")}
                  className="game-button"
                >
                  Whack-a-Mole
                </Button>
                <Button
                  onClick={() => setSelectedGame("2048")}
                  className="game-button"
                >
                  2048
                </Button>
                <Button
                  onClick={() => setSelectedGame("wordle")}
                  className="game-button"
                >
                  Wordle
                </Button>
              </div>
            ) : (
              <div className="game-container">
                {renderGame()}
                <Button
                  onClick={() => setSelectedGame(null)}
                  className="back-button"
                >
                  Back to Selection
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default LogoPage;


