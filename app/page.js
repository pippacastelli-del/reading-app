"use client";
import { useState } from "react";

export default function Page() {

  const [screen, setScreen] = useState("home");
  const [level, setLevel] = useState(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [stars, setStars] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const levels = {
    1: { sentence: "The cat sat on the mat." },
    2: { sentence: "The dog ran to the tree." },
    3: { sentence: "Sam and Tom went to the park." },
    4: { sentence: "The red bird flew over the hill." }
  };

  function checkAnswer(words) {

    const correctWord = words[wordIndex].toLowerCase();

    if (answer.toLowerCase() === correctWord) {

      setMessage("⭐ Correct!");
      setStars(stars + 1);
      setAnswer("");

      if (wordIndex < words.length - 1) {
        setWordIndex(wordIndex + 1);
      } else {
        setMessage("🎉 Sentence Complete!");
      }

    } else {
      setMessage("❌ Try again");
    }

  }

  if (screen === "home") {
    return (
      <div style={{padding:30}}>
        <h1>📚 ReadBoost</h1>

        <button onClick={() => setScreen("levels")}>
          Start Reading
        </button>

        <br/><br/>

        <button onClick={() => setScreen("rewards")}>
          Rewards
        </button>

        <br/><br/>

        <button onClick={() => setScreen("progress")}>
          Parent Progress
        </button>
      </div>
    );
  }

  if (screen === "levels") {
    return (
      <div style={{padding:30}}>
        <h2>Select Level</h2>

        <button onClick={() => {setLevel(1); setWordIndex(0); setScreen("reading");}}>
          Level 1
        </button>

        <br/><br/>

        <button onClick={() => {setLevel(2); setWordIndex(0); setScreen("reading");}}>
          Level 2
        </button>

        <br/><br/>

        <button onClick={() => {setLevel(3); setWordIndex(0); setScreen("reading");}}>
          Level 3
        </button>

        <br/><br/>

        <button onClick={() => {setLevel(4); setWordIndex(0); setScreen("reading");}}>
          Level 4
        </button>

        <br/><br/>

        <button onClick={() => setScreen("home")}>
          Home
        </button>
      </div>
    );
  }

  if (screen === "reading") {

    const data = levels[level];
    const words = data.sentence.replace(".", "").split(" ");
    const currentWord = words[wordIndex];

    return (
      <div style={{padding:30}}>
        <h2>Level {level}</h2>

        <p style={{fontSize:28}}>
          {data.sentence}
        </p>

        <button onClick={() => {
          const utter = new SpeechSynthesisUtterance(data.sentence);
          utter.rate = 0.7;
          speechSynthesis.speak(utter);
        }}>
          🔊 Read Full Sentence
        </button>

        <br/><br/>

        <button onClick={() => {
          const utter = new SpeechSynthesisUtterance(currentWord);
          utter.rate = 0.7;
          speechSynthesis.speak(utter);
        }}>
          🔊 Play Word
        </button>

        <br/><br/>

        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type the word you hear"
          style={{padding:10, fontSize:18}}
        />

        <br/><br/>

        <button onClick={() => checkAnswer(words)}>
          Check Answer
        </button>

        <p style={{fontSize:20}}>
          {message}
        </p>

        <p>
          Word {wordIndex + 1} of {words.length}
        </p>

        <br/>

        <button onClick={() => setScreen("levels")}>
          Back
        </button>

      </div>
    );
  }

  if (screen === "rewards") {
    return (
      <div style={{padding:30}}>
        <h2>⭐ Rewards</h2>

        <p style={{fontSize:24}}>
          Stars earned: {stars}
        </p>

        <button onClick={() => setScreen("home")}>
          Home
        </button>
      </div>
    );
  }

  if (screen === "progress") {
    return (
      <div style={{padding:30}}>
        <h2>📊 Parent Progress</h2>

        <p>Stars earned: {stars}</p>

        <button onClick={() => setScreen("home")}>
          Home
        </button>
      </div>
    );
  }

}













