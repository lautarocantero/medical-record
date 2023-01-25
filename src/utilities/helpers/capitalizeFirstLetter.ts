export const CapitalizeFirstLetter = (str: string) => {
  const firstLetter = str.slice(0, 1).toUpperCase();
  const rest = str.slice(1, str.length);
  const word = firstLetter + rest;
  return word;
};
