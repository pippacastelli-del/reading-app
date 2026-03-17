"use client";

import { useState } from "react";

const stories = {
  Beginner: [{ text: "The cat sat on the mat." }],
  Easy: [{ text: "The small bird sings in the tree." }],
  Medium: [{ text: "Lucy went to the park to play with her friend." }]
};

const clean = (text) => text.toLowerCase().replace(/[.,!?]/g, "").trim();

export default function ReadingApp() {
  const [level, setLevel] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState(0);

  const currentStory = level ? stories[level][0].text : "";
  const words = clean(currentStory).split(" ");

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.6;
    speechSynthesis.speak(u);
  };

  const checkWord = () => {
    const expected = words[wordIndex];
    const typed = clean(input);

    if (typed === expected) {
      setFeedback("✅ Correct!");
      setStars((s) => s + 1);
      setWordIndex((i) => i + 1);
    } else {
      setFeedback("❌ Try again");
    }

    setInput("");
  };

  // 🟦 iPad STYLE BUTTON (HUGE TILE)
  const ipadBtn =
    "w-full h-36 text-4xl font-bold rounded-[40px] shadow-xl flex items-center justify-center";

  if (!level) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-6xl font-bold mb-12">📚 Read With Me</h1>

        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
          <button
            onClick={() => setLevel("Beginner")}
            className={`${ipadBtn} bg-green-300 text-white`}
          >
            🟢 Beginner
          </button>

          <button
            onClick={() => setLevel("Easy")}
            className={`${ipadBtn} bg-yellow-300 text-white`}
          >
            🟡 Easy
          </button>

          <button
            onClick={() => setLevel("Medium")}
            className={`${ipadBtn} bg-red-300 text-white`}
          >
            🔴 Medium
          </button>
        </div>

        <p className="mt-12 text-3xl">⭐ Stars: {stars}</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      <h2 className="text-5xl font-bold mb-8">{level}</h2>

      <div className="text-3xl mb-10">
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

      {/* iPad TILE BUTTONS */}
      <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
        <button
          onClick={() => speak(currentStory)}
          className={`${ipadBtn} bg-blue-300 text-white`}
        >
          🔊 Read Sentence
        </button>

        <button
          onClick={() => speak(words[wordIndex])}
          className={`${ipadBtn} bg-purple-300 text-white`}
        >
          🔉 Read Word
        </button>

        <button
          onClick={checkWord}
          className={`${ipadBtn} bg-green-400 text-white`}
        >
          ✅ Check Answer
        </button>
      </div>

      <div className="mt-10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-6 text-3xl rounded-2xl w-full max-w-xl text-center"
          placeholder="Type the word"
        />
      </div>

      <p className="mt-8 text-3xl">{feedback}</p>

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










