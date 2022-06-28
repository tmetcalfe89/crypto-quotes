import Word from "./Word";
import "./Phrase.css";
import { useEffect, useState } from "react";

export default function Phrase({
  phrase = "",
  selectedLetter = "",
  onSelectLetter = () => {},
  hiddenLetters = [],
  maskedLetters = {},
}) {
  const updateSelectedLetter = (selectedLetter) => {
    onSelectLetter(selectedLetter.toLowerCase());
  };

  return (
    <div className="phrase">
      {phrase.split(" ").map((word, i) => (
        <Word
          word={word}
          selectedLetter={selectedLetter}
          onSelectLetter={updateSelectedLetter}
          hiddenLetters={hiddenLetters}
          maskedLetters={maskedLetters}
          key={`${word}-${i}`}
        />
      ))}
    </div>
  );
}
