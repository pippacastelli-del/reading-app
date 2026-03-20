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

// ⭐ NEW REWARDS
const [stars,setStars] = useState(0);
const [coins,setCoins] = useState(0);

const colors = ["#FF6B6B","#4ECDC4","#FFD93D","#6C5CE7","#00B894","#FDCB6E"];

// 🎤 Voice
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

// 🔊 Sentence
function speakSentence(){
const words = levels[level][sentenceIndex].split(" ");
let i = 0;

function next(){
if(i >= words.length){
setHighlightIndex(-1);
return;
}

setHighlightIndex(i);

const u = new SpeechSynthesisUtterance(words[i]);
u.rate = 0.6;
u.voice = voice;

u.onend = ()=>{
i++;
next();
};

speechSynthesis.speak(u);
}

speechSynthesis.cancel();
next();
}

// 🔈 Word
function speakWord(){
const word = levels[level][sentenceIndex].split(" ")[wordIndex];
const u = new SpeechSynthesisUtterance(word);
u.rate = 0.5;
u.voice = voice;
speechSynthesis.cancel();
speechSynthesis.speak(u);
}

// ✅ Check answer + rewards
function checkAnswer(){

const words = levels[level][sentenceIndex].split(" ");
const correct = words[wordIndex];

if(cleanText(answer) === cleanText(correct)){

setStars(prev => prev + 1); // ⭐ per word
setMessage("⭐ Correct!");

if(wordIndex+1 < words.length){

setTimeout(()=>{
setWordIndex(wordIndex+1);
setAnswer("");
setMessage("");
},600);

}else{

setCoins(prev => prev + 5); // 🪙 per sentence

if(sentenceIndex+1 < levels[level].length){

setTimeout(()=>{
setSentenceIndex(sentenceIndex+1);
setWordIndex(0);
setAnswer("");
setMessage("");
},600);

}else{
setCoins(prev => prev + 20); // 🎉 level bonus
setComplete(true);
}

}

}else{
setMessage("❌ Try again");
}

}

// Start level
function startLevel(l){
setLevel(Number(l));
setSentenceIndex(0);
setWordIndex(0);
setAnswer("");
setMessage("");
setComplete(false);
setHighlightIndex(-1);
setScreen("reading");
}

// 🏠 HOME
if(screen==="home"){
return(
<div style={{textAlign:"center",padding:40,background:"#F0F8FF",minHeight:"100vh"}}>

<h1 style={{fontSize:56}}>📚 ReadBoost</h1>

<div style={{fontSize:22}}>
⭐ {stars} | 🪙 {coins}
</div>

<button style={{padding:"20px 40px",fontSize:28,borderRadius:20,margin:20}}
onClick={()=>setScreen("levels")}>
Start Reading
</button>

<button style={{padding:"15px 30px",fontSize:22,borderRadius:15}}
onClick={()=>setScreen("rewards")}>
Rewards
</button>

</div>
);
}

// 🏆 REWARDS SCREEN
if(screen==="rewards"){
return(
<div style={{textAlign:"center",padding:40,background:"#FFF8E7",minHeight:"100vh"}}>

<h2 style={{fontSize:42}}>🏆 Rewards</h2>

<p style={{fontSize:30}}>⭐ Stars: {stars}</p>
<p style={{fontSize:30}}>🪙 Coins: {coins}</p>

<p style={{fontSize:20}}>Keep going! You're doing amazing!</p>

<button onClick={()=>setScreen("home")} style={{fontSize:22}}>
⬅ Back
</button>

</div>
);
}

// 📚 LEVELS
if(screen==="levels"){
return(
<div style={{padding:30,background:"#F0F8FF",minHeight:"100vh"}}>

<h2 style={{textAlign:"center",fontSize:42}}>Choose Level</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, minmax(120px,1fr))",
gap:20,
marginTop:30
}}>

{Object.keys(levels).map((l,i)=>(
<div
key={l}
onClick={()=>startLevel(l)}
style={{
background:colors[i%colors.length],
padding:30,
borderRadius:20,
textAlign:"center",
fontSize:28,
color:"white",
cursor:"pointer"
}}
>
Level {l}
</div>
))}

</div>

<div style={{textAlign:"center",marginTop:40}}>
<button onClick={()=>setScreen("home")}>⬅ Back</button>
</div>

</div>
);
}

// 🎯 READING
if(screen==="reading"){

const words = levels[level][sentenceIndex].split(" ");

return(
<div style={{textAlign:"center",padding:30,background:"#FFF8E7",minHeight:"100vh"}}>

<h2 style={{fontSize:36}}>Level {level}</h2>

<div style={{fontSize:44,marginBottom:30}}>
{words.map((word,i)=>(
<span key={i} style={{
background:
i===highlightIndex ? "#FFD54F" :
i===wordIndex ? "#FFF176" :
"transparent",
padding:"8px",
marginRight:"8px",
borderRadius:8
}}>
{word}
</span>
))}
</div>

<button onClick={speakSentence}>🔊 Sentence</button>
<button onClick={speakWord}>🔈 Word</button>

<br/><br/>

<input value={answer} onChange={(e)=>setAnswer(e.target.value)} />

<br/><br/>

<button onClick={checkAnswer}>Check</button>

<p style={{fontSize:24}}>{message}</p>

{complete && (
<div>
<h3>🎉 Level Complete!</h3>
<p>+20 coins bonus!</p>
<button onClick={()=>setScreen("levels")}>
Back to Levels
</button>
</div>
)}

<br/><br/>

<button onClick={()=>setScreen("levels")}>⬅ Back</button>

</div>
);
}

}










