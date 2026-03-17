"use client";

import { useState } from "react";

const stories = {
  Beginner: [{ text: "The cat sat on the mat." }],
  Easy: [{ text: "The small bird sings in the tree." }],
  Medium: [{ text: "Lucy went to the park to play with her friend." }]
};

const clean = (text) =>
  text.toLowerCase().replace(/[.,!?]/g, "").trim();

export default function ReadingApp() {
  const [level, setLevel] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState(0);

  const currentStory = level ? stories[level][0].text : "";
  const words = clean(currentStory).split(" ");

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.6;
    speechSynthesis.speak(utterance);
  };

  const checkWord = () => {
    const expected = words[wordIndex];
    const typed = clean(input);

    if (typed === expected) {
      setFeedback("🎉 Correct!");
      setStars((s) => s + 1);
      setWordIndex((i) => i + 1);
    } else {
      setFeedback("❌ Try again");
    }

    setInput("");
  };

  // 🎮 GAME STYLE BUTTON
  const gameBtn =
    "w-full max-w-3xl h-32 text-5xl font-extrabold rounded-[30px] shadow-[0_10px_0_rgba(0,0,0,0.2)] active:translate-y-2 active:shadow-none transition-all duration-150";

  if (!level) {
    return (
      <div className="p-6 text-center flex flex-col items-center">
        <h1 className="text-6xl font-extrabold mb-12">🎮 Read Game</h1>

        <button
          onClick={() => setLevel("Beginner")}
          className={`${gameBtn} bg-gradient-to-b from-green-300 to-green-500 text-white mb-6`}
        >
          🟢 BEGINNER
        </button>

        <button
          onClick={() => setLevel("Easy")}
          className={`${gameBtn} bg-gradient-to-b from-yellow-300 to-yellow-500 text-white mb-6`}
        >
          🟡 EASY
        </button>

        <button
          onClick={() => setLevel("Medium")}
          className={`${gameBtn} bg-gradient-to-b from-red-300 to-red-500 text-white`}
        >
          🔴 MEDIUM
        </button>

        <p className="mt-12 text-3xl">⭐ Stars: {stars}</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-center flex flex-col items-center">
      <h2 className="text-5xl font-extrabold mb-8">{level}</h2>

      <div className="text-4xl mb-8">
        {words.map((w, i) => (
          <span
            key={i}
            className={`mr-3 ${
              i === wordIndex ? "underline text-blue-600" : "text-gray-400"
            }`}
          >
            {w}
          </span>
        ))}
      </div>

      <button
        onClick={() => speak(currentStory)}
        className={`${gameBtn} bg-gradient-to-b from-blue-300 to-blue-500 text-white mb-6`}
      >
        🔊 READ SENTENCE
      </button>

      <button
        onClick={() => speak(words[wordIndex])}
        className={`${gameBtn} bg-gradient-to-b from-purple-300 to-purple-500 text-white mb-10`}
      >
        🔉 READ WORD
      </button>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-6 text-4xl rounded-2xl w-full max-w-xl text-center"
        placeholder="Type the word"
      />

      <button
        onClick={checkWord}
        className={`${gameBtn} bg-gradient-to-b from-green-400 to-green-600 text-white mt-6`}
      >
        ✅ CHECK
      </button>

      <p className="mt-8 text-4xl">{feedback}</p>

      <p className="mt-6 text-2xl">⭐ Stars: {stars}</p>

      <button
        onClick={() => {
          setLevel(null);
          setWordIndex(0);
          setInput("");
          setFeedback("");
        }}
        className="mt-10 underline text-xl"
      >
        Back
      </button>
    </div>
  );
}









