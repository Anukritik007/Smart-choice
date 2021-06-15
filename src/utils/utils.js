export const mapScoreToProbabilities = (choices_) => {
  let min = Infinity;
  let max = -Infinity;
  //find probability based on highest & lowest score choices
  choices_.forEach((choice) => {
    min = choice.score < min ? choice.score : min;
    max = choice.score > max ? choice.score : max;
  });
  const range_ = max - min;
  const mark1 = min + Math.floor(range_ / 3),
    mark2 = min + Math.floor(range_ / 3) * 2;
  console.log("range:,marks", range_, mark1, mark2);
  return choices_.map((choice) => {
    const probability_ =
      choice.score < mark1
        ? "low"
        : choice.score >= mark1 && choice.score <= mark2
        ? "medium"
        : "high";
    return {
      ...choice,
      probability: probability_,
    };
  });
};
