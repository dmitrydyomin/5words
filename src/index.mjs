import { readFile } from 'fs/promises';

// const data = await readFile('./Russian-Nouns/dist/russian_nouns.txt', 'utf-8');
// const allWords = data
//   .split('\n')
//   .filter((w) => w.length === 5)
//   .filter((w) => w.indexOf('-') === -1);

// await writeFile('./words.txt', allWords.join('\n'), 'utf-8');

const notFoundLetters = 'средхомувышо'.split('');

const allWords = (await readFile('./words.txt', 'utf-8')).split('\n');

const words = allWords
  .filter((w) => notFoundLetters.every((l) => w.indexOf(l) === -1))
  .filter(
    (w) =>
      w[4] !== 'а' &&
      w[4] !== 'т' &&
      w[3] !== 'к' &&
      w[2] !== 'т' &&
      w[1] !== 'а' &&
      w[0] !== 'к'
  )
  .filter(
    (w) =>
      w.indexOf('к') !== -1 && w.indexOf('а') !== -1 && w.indexOf('т') !== -1
  );

const letters = words.join('');
const probability = {};
for (let i = 0; i < letters.length; i++) {
  const letter = letters[i];
  probability[letter] = (probability[letter] || 0) + 1;
}

const scores = Object.entries(probability);
scores.sort((a, b) => b[1] - a[1]);
console.log(scores);

const wordsWithScore = words.map((w) => {
  const used = [];
  let score = 0;
  for (let i = 0; i < w.length; i++) {
    const letter = w[i];
    if (used.includes(letter)) {
      continue;
    }
    used.push(letter);
    score += probability[letter];
  }
  return [w, score];
});

wordsWithScore.sort((a, b) => b[1] - a[1]);
console.log(wordsWithScore);

// for (let i = 0; i < 5; i++) {
//   const letters =
// }
