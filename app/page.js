"use client";
import { useState } from "react";

export default function Page() {

  const [screen, setScreen] = useState("home");
  const [level, setLevel] = useState(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [stars, setStars] = useState(0);

  const levels = {
    1: { sentence: "The cat sat on the mat.", word: "cat" },
    2: { sentence: "The dog ran to the tree.", word: "dog" },
    3: { sentence: "Sam and Tom went to the park.", word: "park" },
    4: { sentence: "The red bird flew over the hill.", word: "bird" }
  };

  function checkAnswer() {
    if (answer.toLowerCase() === levels[level].word) {
      setMessage("⭐ Correct!");
      setStars(stars + 1);
    } else {
      setMessage("❌ Try again");
    }
  }

  if (screen === "home") {
    return (
      <div style={{padding:30}}>
        <h1>📚 ReadBoost</h1>

        <button onClick={() => setScreen("levels")}>Start Reading</button>
        <br/><br/>

        <button onClick={() => setScreen("rewards")}>Rewards</button>
        <br/><br/>

        <button onClick={() => setScreen("progress")}>Parent Progress</button>
      </div>
    );
  }

  if (screen === "levels") {
    return (
      <div style={{padding:30}}>
        <h2>Select Level</h2>

        <button onClick={() => {setLevel(1); setScreen("reading");}}>Level 1</button>
        <br/><br/>

        <button onClick={() => {setLevel(2); setScreen("reading");}}>Level 2</button>
        <br/><br/>

        <button onClick={() => {setLevel(3); setScreen("reading");}}>Level 3</button>
        <br/><br/>

        <button onClick={() => {setLevel(4); setScreen("reading");}}>Level 4</button>

        <br/><br/>
        <button onClick={() => setScreen("home")}>Home</button>
      </div>
    );
  }

  if (screen === "reading") {
    const data = levels[level];

    return (
      <div style={{padding:30}}>
        <h2>Level {level}</h2>

        <p style={{fontSize:28}}>
          {data.sentence}
        </p>

        <button onClick={() => {
  const words = data.sentence.replace(".", "").split(" ");
  const randomWord = words[Math.floor(Math.random() * words.length)];
 const utter = new SpeechSynthesisUtterance(randomWord);
utter.rate = 0.7;
speechSynthesis.speak(utter);
}}>
  🔊 Play Word
</button>
<button onClick={() => {
  const utter = new SpeechSynthesisUtterance(data.sentence);
  utter.rate = 0.7;
  speechSynthesis.speak(utter);
}}>
  🔊 Read Full Sentence
<button onClick={() => {
  if (userInput.toLowerCase() === randomWord.toLowerCase()) {
    alert("✅ Correct!");
  } else {
    alert("❌ Try again");
  }
}}>
Check Answer
</button>

        <p style={{fontSize:20}}>
          {message}
        </p>

        <br/>
        <button onClick={() => setScreen("levels")}>Back</button>
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













