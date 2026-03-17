"use client";

import { useState, useEffect, useRef } from "react";

const stories = {
  Beginner: [
    { text: "The cat sat on the mat." },
    { text: "The dog ran fast." },
    { text: "I see a red ball." }
  ],
  Easy: [
    { text: "The small bird sings in the tree." },
    { text: "Tom likes to read a book." }
  ],
  Medium: [
    { text: "Lucy went to the park to play with her friend." },
    { text: "The sun was bright and warm in the sky." }
  ]
};

const clean = (text) =>
  text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const similar = (a, b) => {
  if (a === b) return true;
  return a.startsWith(b) || b.startsWith(a);
};

export default function ReadingApp() {
  const [level, setLevel] = useState(null);
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [spoken, setSpoken] = useState("");
  const [score, setScore] = useState(null);
  const [stars, setStars] = useState(0);

  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setSpoken(transcript);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const startReading = () => {
    setSpoken("");
    setScore(null);
    setListening(true);
    recognitionRef.current?.start();
  };

  const stopReading = () => {
    recognitionRef.current?.stop();
    setListening(false);

    const expectedWords = clean(currentStory).split(" ");
    const spokenWords = clean(spoken).split(" ");

    let correct = 0;

    expectedWords.forEach((word, i) => {
      if (spokenWords[i] && similar(spokenWords[i], word)) {
        correct++;
      }
    });

    const accuracy = Math.round((correct / expectedWords.length) * 100);
    setScore(accuracy);
    setStars((prev) => prev + Math.max(1, Math.floor(accuracy / 30)));
  };

  const nextStory = () => {
    setIndex((prev) => (prev + 1) % stories[level].length);
    setScore(null);
    setSpoken("");
  };

  if (!level) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-8">📚 Read With Me</h1>
        <p className="mb-6 text-lg">Choose a level</p>

        <div className="space-y-4">
          <button
            onClick={() => setLevel("Beginner")}
            className="w-60 py-3 bg-green-400 hover:bg-green-500 text-white text-lg rounded-2xl shadow-lg"
          >
            🟢 Beginner
          </button>

          <button
            onClick={() => setLevel("Easy")}
            className="w-60 py-3 bg-yellow-400 hover:bg-yellow-500 text-white text-lg rounded-2xl shadow-lg"
          >
            🟡 Easy
          </button>

          <button
            onClick={() => setLevel("Medium")}
            className="w-60 py-3 bg-red-400 hover:bg-red-500 text-white text-lg rounded-2xl shadow-lg"
          >
            🔴 Medium
          </button>
        </div>

        <p className="mt-8 text-xl">⭐ Stars: {stars}</p>
      </div>
    );
  }

  const currentStory = stories[level][index].text;
  const expectedWords = clean(currentStory).split(" ");
  const spokenWords = clean(spoken).split(" ");

  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold mb-4">{level} Story</h2>

      <div className="text-xl mb-6 border p-6 rounded-2xl bg-gray-50">
        {expectedWords.map((word, i) => {
          let color = "text-gray-400";

          if (spokenWords[i]) {
            if (similar(spokenWords[i], word)) {
              color = "text-green-600";
            } else {
              color = "text-red-500";
            }
          }

          return (
            <span key={i} className={`${color} mr-2 font-semibold`}>
              {word}
            </span>
          );
        })}
      </div>

      {!listening && score === null && (
        <button
          onClick={startReading}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-lg rounded-2xl shadow-lg"
        >
          ▶️ Start Reading
        </button>
      )}

      {listening && (
        <button
          onClick={stopReading}
          className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white text-lg rounded-2xl shadow-lg"
        >
          ⏹ Stop Reading
        </button>
      )}

      {score !== null && (
        <div className="mt-6">
          <p className="text-2xl font-bold">🎉 Great job!</p>
          <p className="text-lg">Accuracy: {score}%</p>
          <button
            onClick={nextStory}
            className="mt-4 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-2xl shadow-lg"
          >
            ➡️ Next Story
          </button>
        </div>
      )}

      <p className="mt-8 text-xl">⭐ Stars: {stars}</p>

      <button
        onClick={() => {
          setLevel(null);
          setIndex(0);
          setScore(null);
          setSpoken("");
        }}
        className="block mx-auto mt-6 text-sm underline"
      >
        Back to Levels
      </button>
    </div>
  );
}






