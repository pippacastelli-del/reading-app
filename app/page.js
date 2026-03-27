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

// 🔊 Voice
useEffect(()=>{
const loadVoices = ()=>{
const voices = speechSynthesis.getVoices();
setVoice(voices.find(v=>v.name.includes("Female")) || voices[0]);
};
loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;
},[]);

function cleanText(t){
return t.toLowerCase().trim().replace(/[.,!?]/g,"");
}

// 🔊 Speak sentence word-by-word (perfect sync)
function speakSentence(){
const words = levels[level][sentenceIndex].split(" ");
speechSynthesis.cancel();

let i = 0;

function speakNext(){
if(i>=words.length){
setHighlightIndex(-1);
return;
}

setHighlightIndex(i);

const u = new SpeechSynthesisUtterance(words[i]);
u.rate = 0.6;
u.voice = voice;

u.onend = ()=>{
i++;
speakNext();
};

speechSynthesis.speak(u);
}

speakNext();
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

// ✅ Check
function checkAnswer(){
const words = levels[level][sentenceIndex].split(" ");
const correct = words[wordIndex];

if(cleanText(answer)===cleanText(correct)){
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

<div style={{
background:"linear-gradient(135deg,#42a5f5,#1e88e5)",
padding:"25px 40px",
borderRadius:25,
display:"inline-flex",
alignItems:"center",
gap:20,
boxShadow:"0 8px 0 rgba(0,0,0,0.2)",
marginBottom:40
}}>

<img src="/logo.png" style={{width:70,height:70}}/>

<h1 style={{fontSize:60,color:"white",margin:0}}>
ReadBoost
</h1>

</div>

<br/>

<button style={{
padding:"20px 50px",
fontSize:26,
borderRadius:20,
background:"#4CAF50",
color:"white",
margin:15
}}
onClick={()=>setScreen("levels")}
>
Start Reading
</button>

<br/>

<button style={{
padding:"20px 50px",
fontSize:26,
borderRadius:20,
background:"#FF9800",
color:"white",
margin:15
}}
onClick={()=>setScreen("rewards")}
>
⭐ Rewards ({stars})
</button>

</div>
);
}

// 📚 LEVELS
if(screen==="levels"){
return(
<div style={{
textAlign:"center",
padding:40
}}>

<h2 style={{fontSize:42, marginBottom:30}}>
🎯 Choose Level
</h2>

{/* 🔥 GRID OF BIG BUTTONS */}
<div style={{
display:"flex",
flexWrap:"wrap",
justifyContent:"center",
gap:20,
maxWidth:800,
margin:"0 auto"
}}>

{Object.keys(levels).map((l,i)=>{

// 🎨 Different colors for fun
const colors = [
"#FF5252","#FF9800","#FFEB3B","#4CAF50",
"#00BCD4","#2196F3","#3F51B5","#9C27B0",
"#E91E63","#8BC34A"
];

return(
<button
key={l}
onClick={()=>startLevel(l)}
style={{
padding:"25px 35px",
fontSize:24,
borderRadius:20,
border:"none",
cursor:"pointer",
fontWeight:"bold",
color:"white",
backgroundColor:colors[i % colors.length],
boxShadow:"0 6px 0 rgba(0,0,0,0.2)",
minWidth:140
}}
>
Level {l}
</button>
);

})}

</div>

<br/><br/>

<button
style={{
padding:"18px 40px",
fontSize:22,
borderRadius:15,
border:"none",
backgroundColor:"#607D8B",
color:"white",
cursor:"pointer",
boxShadow:"0 5px 0 rgba(0,0,0,0.2)"
}}
onClick={()=>setScreen("home")}
>
⬅ Back
</button>

</div>
);
}

<br/>

<button onClick={speakSentence}>🔊 Sentence</button>
<button onClick={speakWord}>🔈 Word</button>

<br/><br/>

<input value={answer} onChange={e=>setAnswer(e.target.value)} />

<br/>

<button onClick={checkAnswer}>Check</button>

<p>{message}</p>

{complete && <h3>🎉 Level Complete!</h3>}

<br/>
<button onClick={()=>setScreen("levels")}>⬅ Back</button>

</div>
);
}

}










