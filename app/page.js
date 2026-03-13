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

/* ---------- SPEECH ---------- */

function speak(text) {
const utter = new SpeechSynthesisUtterance(text);
utter.rate = 0.75;
utter.pitch = 1.1;

speechSynthesis.cancel();
speechSynthesis.speak(utter);
}

/* ---------- APP ---------- */

export default function Page() {

const [screen, setScreen] = useState("home");
const [level, setLevel] = useState(null);
const [answer, setAnswer] = useState("");
const [message, setMessage] = useState("");
const [stars, setStars] = useState(0);
const [wordIndex, setWordIndex] = useState(0);
const [completed, setCompleted] = useState(false);

const levels = {
1: { sentence: "The cat sat on the mat." },
2: { sentence: "The dog ran to the tree." },
3: { sentence: "Sam and Tom went to the park." },
4: { sentence: "The red bird flew over the hill." }
};

function checkAnswer(words) {

```
const correct = words[wordIndex].toLowerCase();

if (answer.toLowerCase() === correct) {

  setStars(stars + 1);
  setAnswer("");
  setMessage("⭐ Correct!");

  if (wordIndex < words.length - 1) {
    setWordIndex(wordIndex + 1);
  } else {
    setCompleted(true);
    setMessage("🎉 Level Complete!");
  }

} else {
  setMessage("❌ Try again");
}
```

}

/* ---------- HOME ---------- */

if (screen === "home") {
return (
<div style={{padding:30, textAlign:"center"}}>

```
    <h1 style={{fontSize:42}}>📚 ReadBoost</h1>

    <button
      style={greenButton}
      onClick={() => setScreen("levels")}
    >
      Start Reading
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

    {Object.keys(levels).map((lvl) => (
      <button
        key={lvl}
        style={greenButton}
        onClick={()=>{
          setLevel(lvl);
          setWordIndex(0);
          setCompleted(false);
          setScreen("reading");
        }}
      >
        Level {lvl}
      </button>
    ))}

    <br/><br/>

    <button
      style={purpleButton}
      onClick={()=>setScreen("home")}
    >
      Back
    </button>

  </div>
);
```

}

/* ---------- READING ---------- */

if (screen === "reading") {

```
const sentence = levels[level].sentence;
const words = sentence.replace(".", "").split(" ");
const currentWord = words[wordIndex];

return (
  <div style={{padding:30, textAlign:"center"}}>

    <h2 style={{fontSize:36}}>Level {level}</h2>

    <p style={{fontSize:42}}>
      {sentence}
    </p>

    <button
      style={blueButton}
      onClick={()=>speak(sentence)}
    >
      🔊 Read Sentence
    </button>

    <button
      style={blueButton}
      onClick={()=>speak(currentWord)}
    >
      🔊 Hear Word
    </button>

    <br/><br/>

    {!completed && (
    <>
    <input
      value={answer}
      onChange={(e)=>setAnswer(e.target.value)}
      placeholder="Type the word you hear"
      style={{
        padding:12,
        fontSize:22,
        borderRadius:10,
        border:"1px solid #ccc"
      }}
    />

    <br/><br/>

    <button
      style={orangeButton}
      onClick={()=>checkAnswer(words)}
    >
      Check
    </button>
    </>
    )}

    <p style={{fontSize:24}}>
      {message}
    </p>

    {completed && (
      <>
      <button
        style={greenButton}
        onClick={()=>setScreen("levels")}
      >
        Next Level
      </button>

      <button
        style={purpleButton}
        onClick={()=>setScreen("home")}
      >
        Home
      </button>
      </>
    )}

    <br/><br/>

    <button
      style={purpleButton}
      onClick={()=>setScreen("levels")}
    >
      Back
    </button>

  </div>
);
```

}

return null;
}
