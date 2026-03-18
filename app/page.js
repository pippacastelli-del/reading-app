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

10:["Learning to read takes practice","Books can take you anywhere","Stories can teach lessons","Reading builds imagination","Words help us communicate"],

11:["The farmer grows fresh vegetables","The cows eat green grass","The chickens lay eggs","The tractor moves slowly","The barn is very big"],

12:["The train moves down the track","The car drives very fast","The plane flies in the sky","The boat sails on water","The bus stops for passengers"],

13:["The puppy wags its tail","The kitten plays with yarn","The rabbit hops quickly","The turtle walks slowly","The horse runs freely"],

14:["The chef cooks tasty meals","The baker makes fresh bread","The waiter serves food","The kitchen smells delicious","The customers feel happy"],

15:["The artist paints a picture","The singer sings loudly","The dancer moves gracefully","The actor performs on stage","The audience claps happily"],

16:["The scientist studies plants","The doctor helps sick people","The teacher explains lessons","The builder constructs houses","The pilot flies airplanes"],

17:["The rain falls from clouds","The thunder sounds loud","The lightning lights the sky","The storm passes quickly","The rainbow appears after rain"],

18:["The library is quiet and calm","Many books sit on shelves","Readers sit and enjoy stories","Pages turn softly","Learning happens every day"],

19:["The mountain is very tall","The hikers walk up slowly","The air feels cool","The view looks amazing","The journey feels exciting"],

20:["Dreams can inspire great ideas","Hard work builds success","Kind words make people smile","Helping others feels good","Learning never stops"]

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
const [intervalId,setIntervalId] = useState(null);

const buttonStyle={
padding:"15px 30px",
fontSize:22,
backgroundColor:"#4CAF50",
color:"white",
border:"none",
borderRadius:10,
margin:10,
cursor:"pointer"
};

// 🔊 Load voice
useEffect(()=>{

function loadVoices(){

const voices = speechSynthesis.getVoices();

const femaleVoice = voices.find(v =>
v.name.toLowerCase().includes("female") ||
v.name.toLowerCase().includes("samantha") ||
v.name.toLowerCase().includes("karen") ||
v.name.toLowerCase().includes("zira")
);

setVoice(femaleVoice || voices[0]);

}

loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;

},[]);

function cleanText(text){
return text.toLowerCase().trim().replace(/[.,!?]/g,"").replace(/\s+/g," ");
}

// 🔊 Sentence with FIXED highlight
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

10:["Learning to read takes practice","Books can take you anywhere","Stories can teach lessons","Reading builds imagination","Words help us communicate"],

11:["The farmer grows fresh vegetables","The cows eat green grass","The chickens lay eggs","The tractor moves slowly","The barn is very big"],

12:["The train moves down the track","The car drives very fast","The plane flies in the sky","The boat sails on water","The bus stops for passengers"],

13:["The puppy wags its tail","The kitten plays with yarn","The rabbit hops quickly","The turtle walks slowly","The horse runs freely"],

14:["The chef cooks tasty meals","The baker makes fresh bread","The waiter serves food","The kitchen smells delicious","The customers feel happy"],

15:["The artist paints a picture","The singer sings loudly","The dancer moves gracefully","The actor performs on stage","The audience claps happily"],

16:["The scientist studies plants","The doctor helps sick people","The teacher explains lessons","The builder constructs houses","The pilot flies airplanes"],

17:["The rain falls from clouds","The thunder sounds loud","The lightning lights the sky","The storm passes quickly","The rainbow appears after rain"],

18:["The library is quiet and calm","Many books sit on shelves","Readers sit and enjoy stories","Pages turn softly","Learning happens every day"],

19:["The mountain is very tall","The hikers walk up slowly","The air feels cool","The view looks amazing","The journey feels exciting"],

20:["Dreams can inspire great ideas","Hard work builds success","Kind words make people smile","Helping others feels good","Learning never stops"]

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
const [intervalId,setIntervalId] = useState(null);

const buttonStyle={
padding:"15px 30px",
fontSize:22,
backgroundColor:"#4CAF50",
color:"white",
border:"none",
borderRadius:10,
margin:10,
cursor:"pointer"
};

// 🔊 Load voice
useEffect(()=>{

function loadVoices(){

const voices = speechSynthesis.getVoices();

const femaleVoice = voices.find(v =>
v.name.toLowerCase().includes("female") ||
v.name.toLowerCase().includes("samantha") ||
v.name.toLowerCase().includes("karen") ||
v.name.toLowerCase().includes("zira")
);

setVoice(femaleVoice || voices[0]);

}

loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;

},[]);

function cleanText(text){
return text.toLowerCase().trim().replace(/[.,!?]/g,"").replace(/\s+/g," ");
}

// 🔊 Sentence with FIXED highlight
function speakSentence(){

const sentence = levels[level][sentenceIndex];
const words = sentence.split(" ");

const utterance = new SpeechSynthesisUtterance(sentence);

utterance.rate = 0.6;
utterance.pitch = 1.1;
utterance.voice = voice;

// stop previous
speechSynthesis.cancel();
if(intervalId) clearInterval(intervalId);

// 🔥 estimate total speaking time
const avgWordTime = 500 / utterance.rate; 
const totalTime = words.length * avgWordTime;

// 🔥 calculate per-word timing
const timePerWord = totalTime / words.length;

let i = 0;

const newInterval = setInterval(()=>{

setHighlightIndex(i);
i++;

if(i >= words.length){
clearInterval(newInterval);
setTimeout(()=>setHighlightIndex(-1),300);
}

}, timePerWord);

// start speaking AFTER timer starts (better sync)
speechSynthesis.speak(utterance);

setIntervalId(newInterval);

}

// 🔈 Word
function speakWord(){

const words = levels[level][sentenceIndex].split(" ");
const word = words[wordIndex];

const utterance = new SpeechSynthesisUtterance(word);

utterance.rate = 0.5;
utterance.pitch = 1.1;
utterance.voice = voice;

speechSynthesis.cancel();
speechSynthesis.speak(utterance);

}

// ✅ Check
function checkAnswer(){

const sentence = levels[level][sentenceIndex];
const words = sentence.split(" ");
const correctWord = words[wordIndex];

if(cleanText(answer)===cleanText(correctWord)){

setMessage("✅ Correct!");

if(wordIndex+1<words.length){

setTimeout(()=>{
setWordIndex(wordIndex+1);
setAnswer("");
setMessage("");
setHighlightIndex(-1);
},800);

}else{

if(sentenceIndex+1<levels[level].length){

setTimeout(()=>{
setSentenceIndex(sentenceIndex+1);
setWordIndex(0);
setAnswer("");
setMessage("");
setHighlightIndex(-1);
},800);

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
setHighlightIndex(-1);
setScreen("reading");
}

function goHome(){
setScreen("home");
}

// 🏠
if(screen==="home"){
return(
<div style={{textAlign:"center",padding:40}}>
<h1 style={{fontSize:48}}>ReadBoost</h1>
<button style={buttonStyle} onClick={()=>setScreen("levels")}>
Start Reading
</button>
<br/>
<button style={buttonStyle}>Rewards</button>
</div>
);
}

// 📚
if(screen==="levels"){
return(
<div style={{textAlign:"center",padding:40}}>
<h2 style={{fontSize:36}}>Choose Level</h2>

{Object.keys(levels).map((l)=>(
<button key={l} style={buttonStyle} onClick={()=>startLevel(l)}>
Level {l}
</button>
))}

<br/><br/>
<button style={buttonStyle} onClick={goHome}>Back</button>
</div>
);
}

// 🎯
if(screen==="reading"){

const sentence = levels[level][sentenceIndex];
const words = sentence.split(" ");

return(
<div style={{textAlign:"center",padding:40}}>

<h2 style={{fontSize:34}}>Level {level}</h2>

<div style={{fontSize:40,marginBottom:30}}>

{words.map((word,i)=>(
<span
key={i}
style={{
backgroundColor:
i===highlightIndex ? "#FFD54F" :
i===wordIndex ? "yellow" :
"transparent",
padding:"6px",
marginRight:"6px",
borderRadius:"6px"
}}
>
{word}
</span>
))}

</div>

<button style={buttonStyle} onClick={speakSentence}>
🔊 Read Sentence
</button>

<button style={buttonStyle} onClick={speakWord}>
🔈 Play Word
</button>

<br/><br/>

<input
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
placeholder="Type the word"
style={{
fontSize:24,
padding:10,
width:"60%",
maxWidth:300,
textAlign:"center"
}}
/>

<br/><br/>

<button style={buttonStyle} onClick={checkAnswer}>
Check
</button>

<p style={{fontSize:24}}>{message}</p>

{complete&&(
<div>
<h3>🎉 Level Complete!</h3>
<button style={buttonStyle} onClick={()=>setScreen("levels")}>
Back to Levels
</button>
</div>
)}

<br/><br/>

<button style={buttonStyle} onClick={()=>setScreen("levels")}>
Back
</button>

</div>
);
}

}

// 🔈 Word
function speakWord(){

const words = levels[level][sentenceIndex].split(" ");
const word = words[wordIndex];

const utterance = new SpeechSynthesisUtterance(word);

utterance.rate = 0.5;
utterance.pitch = 1.1;
utterance.voice = voice;

speechSynthesis.cancel();
speechSynthesis.speak(utterance);

}

// ✅ Check
function checkAnswer(){

const sentence = levels[level][sentenceIndex];
const words = sentence.split(" ");
const correctWord = words[wordIndex];

if(cleanText(answer)===cleanText(correctWord)){

setMessage("✅ Correct!");

if(wordIndex+1<words.length){

setTimeout(()=>{
setWordIndex(wordIndex+1);
setAnswer("");
setMessage("");
setHighlightIndex(-1);
},800);

}else{

if(sentenceIndex+1<levels[level].length){

setTimeout(()=>{
setSentenceIndex(sentenceIndex+1);
setWordIndex(0);
setAnswer("");
setMessage("");
setHighlightIndex(-1);
},800);

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
setHighlightIndex(-1);
setScreen("reading");
}

function goHome(){
setScreen("home");
}

// 🏠
if(screen==="home"){
return(
<div style={{textAlign:"center",padding:40}}>
<h1 style={{fontSize:48}}>ReadBoost</h1>
<button style={buttonStyle} onClick={()=>setScreen("levels")}>
Start Reading
</button>
<br/>
<button style={buttonStyle}>Rewards</button>
</div>
);
}

// 📚
if(screen==="levels"){
return(
<div style={{textAlign:"center",padding:40}}>
<h2 style={{fontSize:36}}>Choose Level</h2>

{Object.keys(levels).map((l)=>(
<button key={l} style={buttonStyle} onClick={()=>startLevel(l)}>
Level {l}
</button>
))}

<br/><br/>
<button style={buttonStyle} onClick={goHome}>Back</button>
</div>
);
}

// 🎯
if(screen==="reading"){

const sentence = levels[level][sentenceIndex];
const words = sentence.split(" ");

return(
<div style={{textAlign:"center",padding:40}}>

<h2 style={{fontSize:34}}>Level {level}</h2>

<div style={{fontSize:40,marginBottom:30}}>

{words.map((word,i)=>(
<span
key={i}
style={{
backgroundColor:
i===highlightIndex ? "#FFD54F" :
i===wordIndex ? "yellow" :
"transparent",
padding:"6px",
marginRight:"6px",
borderRadius:"6px"
}}
>
{word}
</span>
))}

</div>

<button style={buttonStyle} onClick={speakSentence}>
🔊 Read Sentence
</button>

<button style={buttonStyle} onClick={speakWord}>
🔈 Play Word
</button>

<br/><br/>

<input
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
placeholder="Type the word"
style={{
fontSize:24,
padding:10,
width:"60%",
maxWidth:300,
textAlign:"center"
}}
/>

<br/><br/>

<button style={buttonStyle} onClick={checkAnswer}>
Check
</button>

<p style={{fontSize:24}}>{message}</p>

{complete&&(
<div>
<h3>🎉 Level Complete!</h3>
<button style={buttonStyle} onClick={()=>setScreen("levels")}>
Back to Levels
</button>
</div>
)}

<br/><br/>

<button style={buttonStyle} onClick={()=>setScreen("levels")}>
Back
</button>

</div>
);
}

}










