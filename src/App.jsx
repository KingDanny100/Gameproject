import React, { useState } from "react";
import Result from "./Components/Result/Result";
import Button from "./Components/Button/Button";

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber(100));
  const [userInput, setUserInput] = useState({
    firstGuess: "",
    secondGuess: "",
    thirdGuess: "",
    fourthGuess: "",
  });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [trials, setTrials] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [finishedGame, setFinishedGame] = useState(false);

  function generateRandomNumber(max) {
    return Math.ceil(Math.random() * max);
  }

  const handleGuess = () => {
    setTrials((prev) => prev + 1);
    const valuesArray = Object.values(userInput);
    // console.log(valuesArray);

    for (let i = 0; i < valuesArray.length; i++) {
      if (
        parseInt(valuesArray[i], 10) > 100 ||
        parseInt(valuesArray[i], 10) < 1
      ) {
        setMessage(
          "Please enter a valid number. Should be between 1 and 100 inclusive"
        );
        setShowMessage((prev) => !showMessage);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
        return;
      }
    }
    for (let i = 0; i < valuesArray.length; i++) {
      // console.log(valuesArray[i].length);
      console.log(randomNumber);
      if (valuesArray[i].length > 3 || valuesArray[i].length < 1) {
        setMessage(
          "Please enter a valid number. Should be between 1 and 100 inclusive"
        );
        setShowMessage((prev) => !showMessage);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
        return;
      }

      const guess = parseInt(valuesArray[i], 10);

      if (isNaN(guess) || guess > 100 || guess < 1) {
        setMessage(
          "Please enter a valid number. Should be between 1 and 100 inclusive"
        );
        setShowMessage((prev) => !showMessage);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
        return;
      }

      if (guess === randomNumber) {
        setMessage(
          `Congratulations! You got it right. The number is ${randomNumber}`
        );
        setFinishedGame(true);
        setGameOver(true);
        return;
      }
    }
   
    // if (trials < 5) {
    //   setMessage(
    //     `You did not guess right, you have ${5 - trials} ${
    //       5 - trials === 1 ? "attempt" : "attempts"
    //     } to try`
    //   );
    //   setShowMessage((prev) => !showMessage);
    //   setTimeout(() => {
    //     setShowMessage(false);
    //   }, 2000);
    // }

    if (trials > 1) {
      setMessage(`The number is ${randomNumber}.`);
      setFinishedGame(false);
      setGameOver(true);
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.value.length);
    setUserInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRestart = () => {
    const newRandomNumber = generateRandomNumber(100);
    setRandomNumber(newRandomNumber);
    setUserInput({
      firstGuess: "",
      secondGuess: "",
      thirdGuess: "",
      fourthGuess: "",
    });
    setMessage("");
    setTrials(1);
    setGameOver(false);
    setFinishedGame(false);
  };

  return (
    <div className="App">
      <h1>Guess the Number Game</h1>
      <p>Guess a number between 1 and 100</p>

      <section>
        <p>Input 4 numbers within range 1-100</p>
        <div>
          <input
            type="number"
            value={userInput.firstGuess}
            name="firstGuess"
            onChange={(e) => handleChange(e)}
            disabled={gameOver}
            min={1}
            max={100}
            step={1}
            required
          />
          <input
            type="number"
            value={userInput.secondGuess}
            name="secondGuess"
            onChange={(e) => handleChange(e)}
            disabled={gameOver}
            required
            min={1}
            max={100}
            step={1}
          />
          <input
            type="number"
            value={userInput.thirdGuess}
            name="thirdGuess"
            onChange={(e) => handleChange(e)}
            disabled={gameOver}
            min={1}
            max={100}
            step={1}
            required
          />
          <input
            type="number"
            value={userInput.fourthGuess}
            name="fourthGuess"
            onChange={(e) => handleChange(e)}
            disabled={gameOver}
            min={1}
            max={100}
            step={1}
          />
        </div>
      </section>

      {showMessage && <p className="message_para error">{message}</p>}

      <div className="button_divs">
        <button onClick={handleGuess} disabled={gameOver}>
          Submit
        </button>
        <Button onClick={handleRestart} title="Restart" />
      </div>

      {gameOver && (
        <Result
          restartFunc={handleRestart}
          finished={finishedGame}
          message={message}
          randomNumber={randomNumber}
        />
      )}
    </div>
  );
}

export default App;
