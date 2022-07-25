// eslint-disable-next-line no-useless-concat
export const FADE_TOKEN = '$$';

export const generateParsons = (sourceCode) =>
  sourceCode
    .split('\n')
    .filter((t) => t.length > 0)
    .map(mapLine);

export const mapLine = (text, id) => {
  let parsedText = text;
  const fadedIndices = [];
  const answers = [];
  while (parsedText.indexOf(FADE_TOKEN) >= 0) {
    const i = parsedText.indexOf(FADE_TOKEN);
    const j = parsedText.indexOf(FADE_TOKEN, i + 2);

    if (j < 0) {
      break;
    }
    answers.push(parsedText.substring(i + 2, j));
    fadedIndices.push(i);
    parsedText = replaceRange(parsedText, i, j + 2, '');
  }
  const indentation = Math.floor(countSpaces(parsedText) / 2);
  return { id: `block-${id}`, text: parsedText, fadedIndices, indentation, answers };
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

const replaceRange = (str, start, end, substitute) => {
  return str.substring(0, start) + substitute + str.substring(end);
};

export default generateParsons;
