"use client";

import { useState } from "react";

const stories = {
  Beginner: [
    { text: "The cat sat on the mat." },
    { text: "The dog ran fast." }
  ],
  Easy: [
    { text: "The small bird sings in the tree." }
  ],
  Medium: [
    { text: "Lucy went to the park to play with her friend." }
  ]
};

const clean = (text) =>
  text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .trim();

export default function ReadingApp() {
  const [level, setLevel] = useState(null);
  const [index, setIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState(0);

  const currentStory = level ? stories[level][index].text : "";
  const words = clean(currentStory).split(" ");

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.6; // slow
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
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

  if (!level) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-5xl font-bold mb-10">📚 Read With Me</h1>

        <button
          onClick={() => setLevel("Beginner")}
          className="w-80 h-20 mb-6 bg-green-500 text-white text-2xl rounded-3xl shadow-xl"
        >
          🟢 BEGINNER
        </button>

        <button
          onClick={() => setLevel("Easy")}
          className="w-80 h-20 mb-6 bg-yellow-500 text-white text-2xl rounded-3xl shadow-xl"
        >
          🟡 EASY
        </button>

        <button
          onClick={() => setLevel("Medium")}
          className="w-80 h-20 bg-red-500 text-white text-2xl rounded-3xl shadow-xl"
        >
          🔴 MEDIUM
        </button>

        <p className="mt-10 text-2xl">⭐ Stars: {stars}</p>
      </div>
    );
  }

  return (
    <div className="p-10 text-center">
      <h2 className="text-4xl font-bold mb-6">{level}</h2>

      <div className="text-2xl mb-6">
        {words.map((w, i) => (
          <span
            key={i}
            className={`mr-2 ${
              i === wordIndex ? "underline text-blue-600" : "text-gray-400"
            }`}
          >
            {w}
          </span>
        ))}
      </div>

      {/* BIG BUTTONS */}
      <div className="space-y-6">
        <button
          onClick={() => speak(currentStory)}
          className="w-full max-w-xl h-20 bg-blue-500 text-white text-2xl rounded-3xl shadow-xl"
        >
          🔊 READ SENTENCE
        </button>

        <button
          onClick={() => speak(words[wordIndex])}
          className="w-full max-w-xl h-20 bg-purple-500 text-white text-2xl rounded-3xl shadow-xl"
        >
          🔉 READ WORD
        </button>
      </div>

      {/* INPUT */}
      <div className="mt-8">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-4 text-2xl rounded-xl w-80 text-center"
          placeholder="Type the word"
        />

        <br />

        <button
          onClick={checkWord}
          className="mt-4 w-64 h-16 bg-green-600 text-white text-xl rounded-2xl shadow-lg"
        >
          ✅ CHECK
        </button>
      </div>

      <p className="mt-6 text-2xl">{feedback}</p>

      <p className="mt-6 text-xl">⭐ Stars: {stars}</p>

      <button
        onClick={() => {
          setLevel(null);
          setIndex(0);
          setWordIndex(0);
          setInput("");
          setFeedback("");
        }}
        className="mt-10 underline"
      >
        Back
      </button>
    </div>
  );
}







