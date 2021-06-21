const mapScoreToProbabilities = (choices_) => {
  let min = Infinity;
  let max = -Infinity;
  // find probability based on highest & lowest score choices
  choices_.forEach((choice) => {
    min = choice.score < min ? choice.score : min;
    max = choice.score > max ? choice.score : max;
  });
  const range = max - min;
  const mark1 = min + Math.floor(range / 3);
  const mark2 = min + Math.floor(range / 3) * 2;
  return choices_.map((choice) => {
    const probability =
      // eslint-disable-next-line no-nested-ternary
      choice.score < mark1
        ? "low"
        : choice.score >= mark1 && choice.score <= mark2
        ? "medium"
        : "high";
    return {
      ...choice,
      probability,
    };
  });
};

export default mapScoreToProbabilities;
