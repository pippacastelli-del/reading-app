
"use client";
import { useState } from "react";

const button = {
padding: "16px 24px",
fontSize: 20,
borderRadius: 10,
border: "none",
margin: 10,
cursor: "pointer",
color: "white"
};

const green = { ...button, backgroundColor: "#4CAF50" };
const blue = { ...button, backgroundColor: "#2196F3" };
const purple = { ...button, backgroundColor: "#9C27B0" };
const orange = { ...button, backgroundColor: "#FF9800" };

function speak(text) {
const utter = new SpeechSynthesisUtterance(text);
utter.rate = 0.75;
speechSynthesis.cancel();
speechSynthesis.speak(utter);
}

export default function Page() {

const [screen, setScreen] = useState("home");
const [level, setLevel] = useState(1);
const [wordIndex, setWordIndex] = useState(0);
const [answer, setAnswer] = useState("");
const [message, setMessage] = useState("");
const [complete, setComplete] = useState(false);

const sentences = [
  "The cat sat on the mat.",
  "The dog ran to the tree.",
  "The red bird flew over the hill.",
  "Sam and Tom went to the park.",
  "The small frog jumped in the pond.",
  "The sun is bright in the sky.",
  "A big fish swims in the lake.",
  "The boy kicks the red ball.",
  "The girl reads a fun book.",
  "The duck walks by the pond."
];

const levels = {};

sentences.forEach((sentence, index) => {
  levels[index + 1] = sentence;
});

if (screen === "home") {
return (
<div style={{textAlign:"center", padding:40}}> <h1 style={{fontSize:42}}>📚 ReadBoost</h1>

    <button
      style={green}
      onClick={()=>setScreen("levels")}
    >
      Start Reading
    </button>
  </div>
);

}

if (screen === "levels") {
return (
<div style={{textAlign:"center", padding:40}}>

    <h2 style={{fontSize:34}}>Choose Level</h2>

  {Object.keys(levels).map((l)=>(
  <button
    key={l}
    style={green}
    onClick={()=>{
      setLevel(l);
      setWordIndex(0);
      setAnswer("");
      setMessage("");
      setComplete(false);
      setScreen("reading");
    }}
  >
    Level {l}
  </button>
))}
        Level {l}
      </button>
    ))}

    <br/>

    <button
      style={purple}
      onClick={()=>setScreen("home")}
    >
      Back
    </button>

  </div>
);

}

if (screen === "reading") {

const sentence = levels[level];
const words = sentence.replace(".","").split(" ");
const current = words[wordIndex];

function check() {

  if(answer.toLowerCase() === current.toLowerCase()){

    setAnswer("");
    setMessage("⭐ Correct!");

    if(wordIndex < words.length-1){
      setWordIndex(wordIndex+1);
    } else {
      setComplete(true);
      setMessage("🎉 Level Complete!");
    }

  } else {
    setMessage("❌ Try again");
  }

}

return (
  <div style={{textAlign:"center", padding:40}}>

    <h2>Level {level}</h2>

    <p style={{fontSize:36}}>
      {sentence}
    </p>

    <button
      style={blue}
      onClick={()=>speak(sentence)}
    >
      🔊 Read Sentence
    </button>

    <button
      style={blue}
      onClick={()=>speak(current)}
    >
      🔊 Hear Word
    </button>

    <br/><br/>

    {!complete && (
      <>
        <input
          value={answer}
          onChange={(e)=>setAnswer(e.target.value)}
          placeholder="Type the word"
          style={{
            fontSize:22,
            padding:10,
            borderRadius:8
          }}
        />

        <br/><br/>

        <button
          style={orange}
          onClick={check}
        >
          Check
        </button>
      </>
    )}

    <p style={{fontSize:22}}>
      {message}
    </p>

    {complete && (
      <>
        <button
          style={green}
          onClick={()=>setScreen("levels")}
        >
          Next Level
        </button>

        <button
          style={purple}
          onClick={()=>setScreen("home")}
        >
          Home
        </button>
      </>
    )}

    <br/>

    <button
      style={purple}
      onClick={()=>setScreen("levels")}
    >
      Back
    </button>

  </div>
);

}

}

