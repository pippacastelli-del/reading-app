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

// --- Helpers ---
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
        <h1 className="text-3xl font-bold mb-6">Read With Me</h1>
        <p className="mb-4">Choose a level</p>
        {Object.keys(stories).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className="block mx-auto mb-3 px-6 py-2 bg-blue-500 text-white rounded-2xl"
          >
            {lvl}
          </button>
        ))}
        <p className="mt-6">⭐ Stars: {stars}</p>
      </div>
    );
  }

  const currentStory = stories[level][index].text;
  const expectedWords = clean(currentStory).split(" ");
  const spokenWords = clean(spoken).split(" ");

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold mb-4">{level} Story</h2>

      {/* Highlighted Text */}
      <div className="text-xl mb-6 border p-6 rounded-2xl">
        {expectedWords.map((word, i) => {
          let color = "text-gray-400";

          if (spokenWords[i]) {
            if (similar(spokenWords[i], word)) {
              color = "text-green-600"; // correct
            } else {
              color = "text-red-500"; // incorrect
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
          className="px-6 py-2 bg-green-500 text-white rounded-2xl"
        >
          Start Reading
        </button>
      )}

      {listening && (
        <button
          onClick={stopReading}
          className="px-6 py-2 bg-purple-500 text-white rounded-2xl"
        >
          Stop Reading
        </button>
      )}

      {score !== null && (
        <div className="mt-6">
          <p className="text-xl">Great job!</p>
          <p>Accuracy: {score}%</p>
          <button
            onClick={nextStory}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-2xl"
          >
            Next Story
          </button>
        </div>
      )}

      <p className="mt-8">⭐ Stars: {stars}</p>

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




