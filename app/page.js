"use client";

import React, { useState, useRef } from "react";
// Expanded story library (MVP sample)
const passages = {
  1: [
    "The cat sat on the mat.",
    "A dog ran in the sun.",
    "The red ball is big.",
    "I see a blue fish."
  ],
  2: [
    "Sam has a red hat. He likes to run.",
    "The bird can fly in the sky.",
    "Ben went to the shop with his mum.",
    "The frog jumps into the pond."
  ],
  3: [
    "Lucy went to the park with her dog. They played with a ball.",
    "Tom found a small turtle by the river and watched it swim."
  ],
  4: [
    "Tom rode his bike to school. He saw his friends and waved hello.",
    "Mia read a story before bed and dreamed about flying dragons."
  ]
};

const rewards = [
  { stories: 5, label: "5 Stories Badge" },
  { stories: 20, label: "Reading Star" },
  { stories: 50, label: "Reading Champion" }
];

export default function ReadingApp() {
  const [screen, setScreen] = useState("home");
  const [level, setLevel] = useState(null);
  const [index, setIndex] = useState(0);
  const [storiesRead, setStoriesRead] = useState(0);
  const [minutesRead, setMinutesRead] = useState(0);
  const [streak] = useState(3);
  const [feedback, setFeedback] = useState("");

  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.start();

    mediaRecorder.current.ondataavailable = e => {
      chunks.current.push(e.data);
    };
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/ogg; codecs=opus" });
      const audioURL = URL.createObjectURL(blob);
      const audio = new Audio(audioURL);
      audio.play();

      chunks.current = [];

      // Simulated AI feedback (MVP placeholder)
      const tips = [
        "Great reading! Try slowing down on tricky words.",
        "Nice job! Sound out each word clearly.",
        "Excellent effort! Practice reading smoothly.",
        "Good work! Try reading the sentence again for fluency."
      ];

      const tip = tips[Math.floor(Math.random() * tips.length)];
      setFeedback(tip);

      setStoriesRead(prev => prev + 1);
      setMinutesRead(prev => prev + 2);
    };
  };

  const nextStory = () => {
    setIndex((index + 1) % passages[level].length);
  };

  if (screen === "home") {
    return (
      <div className="p-6 grid gap-4">
        <h1 className="text-3xl font-bold">ReadBoost</h1>

        <Button onClick={() => setScreen("levels")}>Start Reading</button>
        <Button onClick={() => setScreen("progress")}>Parent Progress</button>
        <Button onClick={() => setScreen("rewards")}>Rewards</button>
        <Button onClick={() => setScreen("games")}>Reading Game</button>
      </div>
    );
  }

  if (screen === "levels") {
    return (
      <div className="p-6 grid gap-4">
        <h2 className="text-xl font-bold">Choose Level</h2>

        {[1, 2, 3, 4].map(l => (
          <Button
            key={l}
            onClick={() => {
              setLevel(l);
              setIndex(0);
              setScreen("reading");
            }}
          >
            Level {l}
          </button>
        ))}

        <Button variant="outline" onClick={() => setScreen("home")}>Home</button>
      </div>
    );
  }

  if (screen === "reading") {
    const text = passages[level][index];

    return (
      <div className="p-6 grid gap-4">
        <Card>
          <CardContent className="p-4 text-lg">{text}</CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={startRecording}>Record</button>
          <Button onClick={stopRecording}>Stop</button>
          <Button onClick={nextStory}>Next Story</button>
        </div>

        {feedback && (
          <Card>
            <CardContent className="p-3">
              <strong>Reading Feedback:</strong>
              <p>{feedback}</p>
            </CardContent>
          </Card>
        )}

        <Button variant="outline" onClick={() => setScreen("home")}>Home</button>
      </div>
    );
  }

  if (screen === "progress") {
    return (
      <div className="p-6 grid gap-4">
        <h2 className="text-xl font-bold">Parent Progress Report</h2>

        <p>Stories completed: {storiesRead}</p>
        <p>Minutes read: {minutesRead}</p>
        <p>Reading streak: {streak} days 🔥</p>

        <Button onClick={() => setScreen("home")}>Home</Button>
      </div>
    );
  }

  if (screen === "rewards") {
    return (
      <div className="p-6 grid gap-4">
        <h2 className="text-xl font-bold">Rewards</h2>

        {rewards.map((r, i) => (
          <Card key={i}>
            <CardContent className="p-3">
              {storiesRead >= r.stories ? `🏆 ${r.label} unlocked!` : `🔒 ${r.label} (read ${r.stories} stories)`}
            </CardContent>
          </Card>
        ))}

        <Button onClick={() => setScreen("home")}>Home</button>
      </div>
    );
  }

  if (screen === "games") {
    const words = ["cat", "sun", "dog", "hat"];
    const [guess, setGuess] = useState("");
    const word = words[Math.floor(Math.random() * words.length)];

    return (
      <div className="p-6 grid gap-4">
        <h2 className="text-xl font-bold">Word Match Game</h2>

        <p>Type the word you hear:</p>

        <Button onClick={() => {
          const utter = new SpeechSynthesisUtterance(word);
          speechSynthesis.speak(utter);
        }}>Play Word</Button>

        <input
          className="border p-2"
          value={guess}
          onChange={e => setGuess(e.target.value)}
        />

        {guess === word && <p>✅ Correct!</p>}

        <Button onClick={() => setScreen("home")}>Home</button>
      </div>
    );
  }
}



