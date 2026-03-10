"use client";
import { useState } from "react";

export default function Page() {
  const [screen, setScreen] = useState("home");
  const [level, setLevel] = useState(null);

  const levels = {
    1: "The cat sat on the mat.",
    2: "The dog ran to the big tree.",
    3: "Sam and Tom went to the park.",
    4: "The red bird flew over the hill."
  };

  if (screen === "home") {
    return (
      <div style={{padding:20}}>
        <h1>ReadBoost</h1>

        <button onClick={() => setScreen("levels")}>Start Reading</button>
        <button onClick={() => setScreen("progress")}>Parent Progress</button>
        <button onClick={() => setScreen("rewards")}>Rewards</button>
        <button onClick={() => setScreen("game")}>Reading Game</button>
      </div>
    );
  }

  if (screen === "levels") {
    return (
      <div style={{padding:20}}>
        <h2>Select Level</h2>

        <button onClick={() => {setLevel(1); setScreen("reading");}}>Level 1</button>
        <button onClick={() => {setLevel(2); setScreen("reading");}}>Level 2</button>
        <button onClick={() => {setLevel(3); setScreen("reading");}}>Level 3</button>
        <button onClick={() => {setLevel(4); setScreen("reading");}}>Level 4</button>

        <br/><br/>
        <button onClick={() => setScreen("home")}>Home</button>
      </div>
    );
  }

  if (screen === "reading") {
    return (
      <div style={{padding:20}}>
        <h2>Level {level}</h2>

        <p style={{fontSize:28}}>
          {levels[level]}
        </p>

        <button onClick={() => {
          const utter = new SpeechSynthesisUtterance(levels[level]);
          speechSynthesis.speak(utter);
        }}>
          🔊 Read Aloud
        </button>

        <br/><br/>
        <button onClick={() => setScreen("levels")}>Back</button>
      </div>
    );
  }

  if (screen === "progress") {
    return (
      <div style={{padding:20}}>
        <h2>Parent Progress</h2>
        <p>Reading streak: 3 days 🔥</p>
        <p>Minutes read: 25</p>
        <button onClick={() => setScreen("home")}>Home</button>
      </div>
    );
  }

  if (screen === "rewards") {
    return (
      <div style={{padding:20}}>
        <h2>Rewards</h2>
        <p>⭐ Stars earned: 5</p>
        <button onClick={() => setScreen("home")}>Home</button>
      </div>
    );
  }

  if (screen === "game") {
    return (
      <div style={{padding:20}}>
        <h2>Reading Game</h2>
        <p>Guess the word coming soon!</p>
        <button onClick={() => setScreen("home")}>Home</button>
      </div>
    );
  }
}







