// eslint-disable-next-line no-useless-concat
export const FADE_TOKEN = '$$fade$$';

export const generateParsons = (sourceCode) =>
  sourceCode
    .split('\n')
    .filter((t) => t.length > 0)
    .map(mapLine);

export const mapLine = (text, id) => {
  let parsedText = text;
  const fadedIndices = [];
  while (parsedText.indexOf(FADE_TOKEN) >= 0) {
    const i = parsedText.indexOf(FADE_TOKEN);
    fadedIndices.push(i);
    parsedText = parsedText.replace(FADE_TOKEN, '');
  }
  const indentation = Math.floor(countSpaces(parsedText) / 2);
  return { id: `block-${id}`, text: parsedText, fadedIndices, indentation };
};

const countSpaces = (line) => {
  let i = 0;
  let count = 0;
  walkLine: while (i < line.length) {
    const c = line.charAt(i);
    switch (c) {
      case ' ':
        count++;
        break;
      case '\t':
        count += 2;
        break;
      default:
        break walkLine;
    }
    i++;
  }
  return count;
};

export default generateParsons;
