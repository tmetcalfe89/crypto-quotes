export const countLetters = (string = "") =>
  Object.entries(
    string
      .toLowerCase()
      .match(/[a-z]/g)
      ?.reduce(
        (acc, element) => ({
          ...acc,
          [element]: acc[element] === undefined ? 1 : acc[element] + 1,
        }),
        {}
      )
  )
    .map(([key, value]) => ({ letter: key, count: value }))
    .sort((a, b) => b.count - a.count);

export const countAllLetters = (string = "") =>
  string.toLowerCase().match(/[a-z]/g)?.length || 0;

export const isLetter = (string = "") =>
  countAllLetters(string) === 1 && string.length === 1;

export const createCompoundClassString = (...classes) =>
  classes.filter((thisClass) => thisClass).join(" ");

export const pickRandomFromArray = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];
