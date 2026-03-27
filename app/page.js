"use client";

import { useState, useEffect } from "react";

export default function Home() {

const levels = {
1:["The cat sat","The dog ran","The sun is hot","The hat is red","The bug is big"],
2:["The cat sat on the mat","The dog ran in the yard","The sun is very bright","The hat is on my head","The bug crawls slowly"],
3:["I like red apples","I see a big dog","The cat likes milk","The bird can fly","The boy runs fast"],
4:["We went to the park today","She loves to draw pictures","The dog chased the ball","The girl read a book","The boy rode a bike"],
5:["Reading helps you learn new words","Practice makes you better","Books are fun to read","Stories can be exciting","Reading can be relaxing"],
6:["The boy kicked the ball","The girl rode her bike","The dog barked loudly","The baby laughed happily","The cat climbed the tree"],
7:["The birds are flying high","The flowers smell nice","The grass feels soft","The clouds look fluffy","The wind blows gently"],
8:["We are going to the beach","The waves crash loudly","The sand feels warm","The water looks blue","The sun shines brightly"],
9:["The teacher reads a story","The children listen carefully","The class learns new words","The students write sentences","Everyone enjoys the lesson"],
10:["Learning to read takes practice","Books can take you anywhere","Stories can teach lessons","Reading builds imagination","Words help us communicate"]
};

const [screen,setScreen] = useState("home");
const [level,setLevel] = useState(1);
const [sentenceIndex,setSentenceIndex] = useState(0);
const [wordIndex,setWordIndex] = useState(0);
const [highlightIndex,setHighlightIndex] = useState(-1);
const [answer,setAnswer] = useState("");
const [message,setMessage] = useState("");
const [complete,setComplete] = useState(false);
const [voice,setVoice] = useState(null);
const [stars,setStars] = useState(0);

// 🎨 BIG iPad button style
const bigButton = {
padding:"20px 40px",
fontSize:24,
borderRadius:20,
border:"none",
margin:15,
cursor:"pointer",
fontWeight:"bold",
boxShadow:"0 6px 0 rgba(0,0,0,0.2)",
transition:"0.1s",
};

const playSentenceStyle = {
...bigButton,
backgroundColor:"#4CAF50",
color:"white"
};

const playWordStyle = {
...bigButton,
backgroundColor:"#FF9800",
color:"white"
};

const mainButton = {
...bigButton,
backgroundColor:"#2196F3",
color:"white"
};

// 🔊 Voice
useEffect(()=>{
function loadVoices(){
const voices = speechSynthesis.getVoices();
const female = voices.find(v =>
v.name.toLowerCase().includes("female") ||
v.name.toLowerCase().includes("samantha") ||
v.name.toLowerCase().includes("zira")
);
setVoice(female || voices[0]);
}
loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;
},[]);

function cleanText(text){
return text.toLowerCase().trim().replace(/[.,!?]/g,"");
}

// 🔊 Sentence + highlight
function speakSentence(){
const sentence = levels[level][sentenceIndex];
const words = sentence.split(" ");

speechSynthesis.cancel();

let i = 0;

function speakNext(){
if(i >= words.length){
setHighlightIndex(-1);
return;
}

setHighlightIndex(i);

const utter = new SpeechSynthesisUtterance(words[i]);
utter.rate = 0.6;
utter.voice = voice;

utter.onend = () => {
i++;
speakNext();
};

speechSynthesis.speak(utter);
}

speakNext();
}

// 🔈 Word
function speakWord(){
const word = levels[level][sentenceIndex].split(" ")[wordIndex];
const utter = new SpeechSynthesisUtterance(word);
utter.rate = 0.5;
utter.voice = voice;

speechSynthesis.cancel();
speechSynthesis.speak(utter);
}

// ✅ Check
function checkAnswer(){
const words = levels[level][sentenceIndex].split(" ");
const correct = words[wordIndex];

if(cleanText(answer) === cleanText(correct)){

setMessage("✅ Correct!");
setStars(s=>s+1);

if(wordIndex+1 < words.length){
setTimeout(()=>{
setWordIndex(wordIndex+1);
setAnswer("");
setMessage("");
},700);
}else{
if(sentenceIndex+1 < levels[level].length){
setTimeout(()=>{
setSentenceIndex(sentenceIndex+1);
setWordIndex(0);
setAnswer("");
setMessage("");
},700);
}else{
setComplete(true);
}
}

}else{
setMessage("❌ Try Again");
}
}

function startLevel(l){
setLevel(Number(l));
setSentenceIndex(0);
setWordIndex(0);
setAnswer("");
setMessage("");
setComplete(false);
setScreen("reading");
}

// 🏠 HOME
if(screen==="home"){
return(
<div style={{textAlign:"center",padding:40}}>
<h1 style={{fontSize:50}}>📚 ReadBoost</h1>

<button style={mainButton} onClick={()=>setScreen("levels")}>
Start Reading
</button>

<br/>

<button style={mainButton} onClick={()=>setScreen("rewards")}>
⭐ Rewards ({stars})
</button>

</div>
);
}

// 📚 LEVELS
if(screen==="levels"){
return(
<div style={{textAlign:"center",padding:40}}>
<h2 style={{fontSize:40}}>Choose Level</h2>

{Object.keys(levels).map(l=>(
<button key={l} style={mainButton} onClick={()=>startLevel(l)}>
Level {l}
</button>
))}

<br/><br/>
<button style={mainButton} onClick={()=>setScreen("home")}>
⬅ Back
</button>
</div>
);
}
// ⭐ REWARDS SCREEN (UPGRADED)
if(screen==="rewards"){

const rewardsUnlocked = Math.floor(stars / 10);

return(
<div style={{
textAlign:"center",
padding:40,
background:"linear-gradient(#a1c4fd, #c2e9fb)",
minHeight:"100vh"
}}>

<h1 style={{
fontSize:52,
marginBottom:10
}}>
🏆 Rewards
</h1>

<h2 style={{
fontSize:36,
marginBottom:20
}}>
You have {stars} ⭐
</h2>

{/* ⭐ BIG STAR DISPLAY */}
<div style={{
fontSize:80,
margin:20
}}>
{"⭐".repeat(Math.min(stars,10))}
</div>

{/* 🎁 REWARD UNLOCKS */}
<h3 style={{fontSize:28}}>
🎁 Rewards Unlocked: {rewardsUnlocked}
</h3>

{rewardsUnlocked > 0 && (
<p style={{fontSize:24}}>
Amazing! You've unlocked {rewardsUnlocked} reward{rewardsUnlocked>1?"s":""} 🎉
</p>
)}

{/* 🎉 NEXT GOAL */}
<p style={{fontSize:22, marginTop:20}}>
Next reward in {10 - (stars % 10 || 10)} ⭐
</p>

<br/>

<button style={mainButton} onClick={()=>setScreen("home")}>
⬅ Back
</button>

</div>
);
}

<button style={mainButton} onClick={()=>setScreen("home")}>
⬅ Back
</button>

</div>
);
}
// 🎯 READING
if(screen==="reading"){

const sentence = levels[level][sentenceIndex];
const words = sentence.split(" ");

return(
<div style={{textAlign:"center",padding:40}}>

<h2 style={{fontSize:36}}>Level {level}</h2>

<div style={{fontSize:42,marginBottom:30}}>

{words.map((w,i)=>(
<span key={i}
style={{
backgroundColor:
i===highlightIndex ? "#FFD54F" :
i===wordIndex ? "yellow" :
"transparent",
padding:"6px",
marginRight:"6px",
borderRadius:"6px"
}}>
{w}
</span>
))}

</div>

{/* 🔥 BIG BUTTONS BACK */}
<button style={playSentenceStyle} onClick={speakSentence}>
🔊 Play Sentence
</button>

<button style={playWordStyle} onClick={speakWord}>
🔈 Play Word
</button>

<br/><br/>

<input
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
placeholder="Type the word"
style={{
fontSize:28,
padding:15,
width:"70%",
maxWidth:400,
borderRadius:15,
textAlign:"center"
}}
/>

<br/><br/>

<button style={mainButton} onClick={checkAnswer}>
Check
</button>

<p style={{fontSize:26}}>{message}</p>

{complete && (
<div>
<h3>🎉 Level Complete!</h3>
<button style={mainButton} onClick={()=>setScreen("levels")}>
Back to Levels
</button>
</div>
)}

<br/><br/>

<button style={mainButton} onClick={()=>setScreen("levels")}>
⬅ Back
</button>

</div>
);
}

}










