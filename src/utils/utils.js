export const mapScoreToProbabilities = (choices_) => {
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

export const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  if ((hours >= 0 && hours <= 4) || hours > 21) return "Night";
  if (hours > 4 && hours < 12) return "Morning";
  if (hours >= 12 && hours <= 16) return "Afternoon";
  if (hours > 16 && hours <= 21) return "Evening";
  return "Day";
};

export const isMobile = window.matchMedia(
  "only screen and (max-width: 760px)"
).matches;

export const updateLocalStorageWithCurrentState = (choices, question) => {
  if (choices) localStorage.setItem("choices", JSON.stringify(choices));
  if (question) localStorage.setItem("question", JSON.stringify(question));
};
