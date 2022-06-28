import Letter from "./Letter";

export default function Word({
  word = "",
  selectedLetter = "",
  onSelectLetter = () => {},
  hiddenLetters = [],
  maskedLetters = {},
}) {
  return (
    <div className="word">
      {word.split("").map((letter, i) => (
        <Letter
          letter={maskedLetters[letter.toLowerCase()] || letter}
          hidden={Object.keys(maskedLetters).includes(letter.toLowerCase())}
          selected={letter.toLowerCase() === selectedLetter}
          onSelectLetter={() => onSelectLetter(letter)}
          key={`${letter}-${i}`}
        />
      ))}
    </div>
  );
}
