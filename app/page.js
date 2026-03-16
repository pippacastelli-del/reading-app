"use client";

import { useState } from "react";

export default function Home() {

const levels = {
  1: ["The cat sat on the mat", "The dog ran fast"],
  2: ["I like to read books", "The sun is very bright"],
  3: ["We went to the park today", "She loves to draw pictures"],
  4: ["Reading helps you learn new words", "Practice makes you better"],
  5: ["The quick brown fox jumps over the lazy dog"]
};

const [screen,setScreen] = useState("home");
const [level,setLevel] = useState(1);
const [wordIndex,setWordIndex] = useState(0);
const [answer,setAnswer] = useState("");
const [message,setMessage] = useState("");
const [complete,setComplete] = useState(false);
const [highlightIndex,setHighlightIndex] = useState(-1);

const greenButton = {
  padding:"15px 30px",
  fontSize:22,
  backgroundColor:"#4CAF50",
  color:"white",
  border:"none",
  borderRadius:10,
  margin:10,
  cursor:"pointer"
};

function speakSentence(){

const sentence = levels[level][wordIndex];
const words = sentence.split(" ");

const utterance = new SpeechSynthesisUtterance(sentence);

utterance.rate = 0.8;

utterance.onboundary = (event)=>{

if(event.name === "word"){

const charIndex = event.charIndex;

let total = 0;

for(let i=0;i<words.length;i++){

total += words[i].length + 1;

if(charIndex < total){
setHighlightIndex(i);
break;
}

}

}

};

utterance.onend = ()=>{
setHighlightIndex(-1);
};

speechSynthesis.speak(utterance);

}

function checkAnswer(){

const correct = levels[level][wordIndex];

if(answer.trim().toLowerCase() === correct.toLowerCase()){

setMessage("✅ Correct!");

if(wordIndex + 1 < levels[level].length){

setWordIndex(wordIndex + 1);
setAnswer("");

}else{

setComplete(true);

}

}else{

setMessage("❌ Try Again");

}

}

function startLevel(l){

setLevel(l);
setWordIndex(0);
setAnswer("");
setMessage("");
setComplete(false);
setScreen("reading");

}

function goHome(){

setScreen("home");
setMessage("");
setAnswer("");
setWordIndex(0);
setComplete(false);

}

if(screen === "home"){

return(

<div style={{textAlign:"center",padding:40}}>

<h1 style={{fontSize:48}}>ReadBoost</h1>

<button
style={greenButton}
onClick={()=>setScreen("levels")}
>
Start Reading
</button>

<br/>

<button style={greenButton}>
Rewards
</button>

</div>

);

}

if(screen === "levels"){

return(

<div style={{textAlign:"center",padding:40}}>

<h2 style={{fontSize:36}}>Choose Level</h2>

{Object.keys(levels).map((l)=>(
<button
key={l}
style={greenButton}
onClick={()=>startLevel(l)}
>
Level {l}
</button>
))}

<br/><br/>

<button style={greenButton} onClick={goHome}>
Back
</button>

</div>

);

}

if(screen === "reading"){

const sentence = levels[level][wordIndex];

return(

<div style={{textAlign:"center",padding:40}}>

<h2 style={{fontSize:34}}>Level {level}</h2>

<div style={{fontSize:40,marginBottom:30}}>

{sentence.split(" ").map((word,i)=>(

<span
key={i}
style={{
backgroundColor:i===highlightIndex?"yellow":"transparent",
padding:"6px",
marginRight:"6px",
borderRadius:"6px"
}}
>
{word}
</span>

))}

</div>

<button
style={greenButton}
onClick={speakSentence}
>
🔊 Read Sentence
</button>

<br/><br/>

<input
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
placeholder="Type the sentence"
style={{
fontSize:24,
padding:10,
width:"80%",
maxWidth:500
}}
/>

<br/><br/>

<button
style={greenButton}
onClick={checkAnswer}
>
Check Answer
</button>

<p style={{fontSize:24}}>{message}</p>

{complete && (

<div>

<h3>🎉 Level Complete!</h3>

<button
style={greenButton}
onClick={()=>setScreen("levels")}
>
Back to Levels
</button>

</div>

)}

<br/><br/>

<button
style={greenButton}
onClick={()=>setScreen("levels")}
>
Back
</button>

</div>

);

}

}

