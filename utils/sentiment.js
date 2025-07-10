function getSentiment(text) {
  const lexicon = {
    hate: -3, angry: -2, bad: -1,
    love: 3, happy: 2, good: 1,
    terrible: -3, great: 3
  };
  const words = text.toLowerCase().split(/\W+/);
  let score = 0;
  words.forEach(word => {
    if (lexicon[word]) score += lexicon[word];
  });
  if (score > 2) return "positive";
  if (score < -2) return "negative";
  return "neutral";
}

window.getSentiment = getSentiment;
