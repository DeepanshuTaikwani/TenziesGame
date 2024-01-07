import { useEffect, useState } from "react";
import Dice from "./Dice";
import "./app.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setdice] = useState(newDice());
  const [tenzies, setTenzies] = useState(false);
  useEffect(() => {
    const held = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const same = dice.every((die) => die.value === firstValue);
    if (held && same) {
      setTenzies(true);
    }
  }, [dice]);
  function generate() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }
  function newDice() {
    const row = [];
    for (let i = 0; i < 10; i++) {
      row.push(generate());
    }
    return row;
  }
  function rollDice() {
    if (!tenzies) {
      setdice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generate();
        })
      );
    } else {
      setTenzies(false);
      setdice(newDice());
    }
  }
  function holdDice(id) {
    setdice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const diceElement = dice.map((die) => (
    <Dice
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="container">
      <div className="App">
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instruction">
          Roll untill all dice are same. Click each die to freeze it at its
          current value between roll.
        </p>
        <div className="dice-container">{diceElement}</div>
        <button onClick={rollDice} className="roll">
          {tenzies ? "New game" : "Roll"}
        </button>
      </div>
    </div>
  );
}

export default App;
