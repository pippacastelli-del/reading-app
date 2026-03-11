"use client";
import { useState } from "react";

/* ---------- BUTTON STYLES ---------- */

const buttonStyle = {
padding: "16px 24px",
fontSize: "20px",
borderRadius: "12px",
border: "none",
cursor: "pointer",
margin: "10px",
color: "white"
};

const greenButton = { ...buttonStyle, backgroundColor: "#4CAF50" };
const blueButton = { ...buttonStyle, backgroundColor: "#2196F3" };
const orangeButton = { ...buttonStyle, backgroundColor: "#FF9800" };
const purpleButton = { ...buttonStyle, backgroundColor: "#9C27B0" };

/* ---------- SPEECH FUNCTION ---------- */

function speak(text) {

const utter = new SpeechSynthesisUtterance(text);

const voices = speechSynthesis.getVoices();

const voice = voices.find(
v => v.lang === "en-US" || v.name.includes("Google")
);

if (voice) utter.voice = voice;

utter.rate = 0.75;
utter.pitch = 1.1;

speechSynthesis.cancel();
speechSynthesis.speak(utter);

}

export default function Page() {

const [screen, setScreen] = useState("home");
const [level, setLevel] = useState(null);
const [answer, setAnswer] = useState("");
const [message, setMessage] = useState("");
const [stars, setStars] = useState(0);
const [wordIndex, setWordIndex] = useState(0);
const [highlightIndex, setHighlightIndex] = useState(-1);

const levels = {
1: { sentence: "The cat sat on the mat." },
2: { sentence: "The dog ran to the tree." },
3: { sentence: "Sam and Tom went to the park." },
4: { sentence: "The red bird flew over the hill." }
};

/* ---------- CHECK ANSWER ---------- */

function checkAnswer(words) {

```
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
```

}

/* ---------- READ SENTENCE ---------- */

function readSentence(words) {

```
let i = 0;

const interval = setInterval(() => {

  if (i >= words.length) {
    clearInterval(interval);
    setHighlightIndex(-1);
    return;
  }

  setHighlightIndex(i);
  speak(words[i]);

  i++;

}, 900);
```

}

/* ---------- HOME ---------- */

if (screen === "home") {
return (
<div style={{padding:30, textAlign:"center"}}>

```
    <h1 style={{fontSize:40}}>📚 ReadBoost</h1>

    <button style={greenButton} onClick={() => setScreen("levels")}>
      Start Reading
    </button>

    <br/>

    <button style={blueButton} onClick={() => setScreen("rewards")}>
      Rewards
    </button>

    <br/>

    <button style={purpleButton} onClick={() => setScreen("progress")}>
      Parent Progress
    </button>

  </div>
);
```

}

/* ---------- LEVEL SELECT ---------- */

if (screen === "levels") {
return (
<div style={{padding:30, textAlign:"center"}}>

```
    <h2 style={{fontSize:36}}>Select Level</h2>

    <button style={greenButton} onClick={() => {setLevel(1); setWordIndex(0); setScreen("reading");}}>
      Level 1
    </button>

    <br/>

    <button style={greenButton} onClick={() => {setLevel(2); setWordIndex(0); setScreen("reading");}}>
      Level 2
    </button>

    <br/>

    <button style={greenButton} onClick={() => {setLevel(3); setWordIndex(0); setScreen("reading");}}>
      Level 3
    </button>

    <br/>

    <button style={greenButton} onClick={() => {setLevel(4); setWordIndex(0); setScreen("reading");}}>
      Level 4
    </button>

    <br/><br/>

    <button style={purpleButton} onClick={() => setScreen("home")}>
      Home
    </button>

  </div>
);
```

}

/* ---------- READING SCREEN ---------- */

if (screen === "reading") {

```
const data = levels[level];
const words = data.sentence.replace(".", "").split(" ");
const currentWord = words[wordIndex];

return (
  <div style={{padding:30, textAlign:"center"}}>

    <h2 style={{fontSize:36}}>Level {level}</h2>

    <p style={{
      fontSize:48,
      fontWeight:"bold",
      lineHeight:1.6
    }}>

      {words.map((word, index) => (
        <span
          key={index}
          style={{
            backgroundColor: index === highlightIndex ? "yellow" : "transparent",
            marginRight: 8
          }}
        >
          {word}
        </span>
      ))}

    </p>

    <button style={blueButton} onClick={() => readSentence(words)}>
      🔊 Read Sentence
    </button>

    <br/>

    <button style={greenButton} onClick={() => speak(currentWord)}>
      🔊 Play Word
    </button>

    <br/><br/>

    <input
      type="text"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      placeholder="Type the word you hear"
      style={{
        padding:12,
        fontSize:22,
        borderRadius:10,
        border:"1px solid #ccc"
      }}
    />

    <br/><br/>

    <button style={orangeButton} onClick={() => checkAnswer(words)}>
      Check Answer
    </button>

    <p style={{fontSize:24}}>
      {message}
    </p>

    <p style={{fontSize:18}}>
      Word {wordIndex + 1} of {words.length}
    </p>

    <br/>

    <button style={purpleButton} onClick={() => setScreen("levels")}>
      Back
    </button>

  </div>
);
```

}

/* ---------- REWARDS ---------- */

if (screen === "rewards") {
return (
<div style={{padding:30, textAlign:"center"}}>

```
    <h2 style={{fontSize:36}}>⭐ Rewards</h2>

    <p style={{fontSize:32}}>
      Stars earned: {stars}
    </p>

    <button style={purpleButton} onClick={() => setScreen("home")}>
      Home
    </button>

  </div>
);
```

}

/* ---------- PROGRESS ---------- */

if (screen === "progress") {
return (
<div style={{padding:30, textAlign:"center"}}>

```
    <h2 style={{fontSize:36}}>📊 Parent Progress</h2>

    <p style={{fontSize:24}}>
      Stars earned: {stars}
    </p>

    <button style={purpleButton} onClick={() => setScreen("home")}>
      Home
    </button>

  </div>
);
```

}

return null;

}






















