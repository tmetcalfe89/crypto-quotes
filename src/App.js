import { useEffect, useState } from "react";
import Phrase from "./components/Phrase";
import { countAllLetters, countLetters } from "./util";

import "./App.css";
import { useKey, useKeyPress } from "react-use";

const theAlphabet = "abcdefghijklmnopqrstuvwxyz";

function App() {
  const [quote, setQuote] = useState();
  const [quoteAuthor, setQuoteAuthor] = useState();
  const [translationMatrix, setTranslationMatrix] = useState();
  const [selectedLetter, setSelectedLetter] = useState();
  const [fetchNewQuote, setFetchNewQuote] = useState(true);

  const getNewQuote = async () => {
    const response = await fetch("https://quotable.io/random");
    const body = await response.json();
    return body;
  };

  const makeGuess = (guessedLetter) => {
    if (guessedLetter !== selectedLetter) return;

    const newTranslationMatrix = { ...translationMatrix };
    delete newTranslationMatrix[selectedLetter];
    setTranslationMatrix(newTranslationMatrix);
    setSelectedLetter("");
  };

  useKey([], (e) => {
    if (!theAlphabet.includes(e.key)) return;
    makeGuess(e.key);
  });

  useEffect(() => {
    if (!quote) return;

    const letters = countLetters(quote);
    let alphabet = theAlphabet.split("");

    let newCryptoQuote = quote;
    let newTranslationMatrix = {};
    let i = 0;
    while (countAllLetters(newCryptoQuote) > countAllLetters(quote) * 0.5) {
      const realLetter = letters[i++].letter;
      const fakeLetter = alphabet.splice(
        Math.floor(Math.random() * alphabet.length),
        1
      )[0];
      newCryptoQuote = newCryptoQuote.replaceAll(realLetter, "_");
      newTranslationMatrix[realLetter] = fakeLetter;
    }

    setTranslationMatrix(newTranslationMatrix);
  }, [quote]);

  useEffect(() => {
    if (!fetchNewQuote) return;
    let cancelled = false;
    getNewQuote().then(({ content, author }) => {
      if (cancelled) return;
      setQuote(content);
      setQuoteAuthor(author);
      setFetchNewQuote(false);
    });
    return () => (cancelled = true);
  }, [fetchNewQuote]);

  const solved = Object.keys(translationMatrix || {}).length === 0;

  return (
    <>
      <header>Crypto Quotes</header>
      <main>
        <Phrase
          phrase={quote}
          selectedLetter={selectedLetter}
          onSelectLetter={setSelectedLetter}
          hiddenLetters={Object.keys(translationMatrix || {})}
          maskedLetters={translationMatrix || {}}
        />
        {solved && <div className="author">{quoteAuthor}</div>}
        {solved && (
          <div className="next">
            <button onClick={() => setFetchNewQuote(true)}>
              New Crypto Quote
            </button>
          </div>
        )}
      </main>
      <footer>
        <div>
          Copyright &copy;{" "}
          <a href="https://github.com/tmetcalfe89/crypto-quotes">
            Timothy Metcalfe 2022
          </a>
        </div>
        <div>
          Quotes from{" "}
          <a href="https://github.com/lukePeavey/quotable#get-random-quote">
            quotable.io
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
