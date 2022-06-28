import { createCompoundClassString, isLetter } from "../util";

export default function Letter({
  letter = "",
  hidden = false,
  selected = false,
  onSelectLetter = () => {},
}) {
  return (
    <div
      className={createCompoundClassString(
        isLetter(letter) && "letter",
        letter === "_" && "missing letter",
        selected && "selected",
        hidden && "hidden"
      )}
      onClick={onSelectLetter}
    >
      {letter}
    </div>
  );
}
