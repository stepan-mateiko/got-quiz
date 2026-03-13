(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.QuizLogic = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  function shuffleArray(array, rng) {
    const arr = array.slice();
    const random = typeof rng === "function" ? rng : Math.random;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function pickQuestions(allQuestions, count, rng) {
    return shuffleArray(allQuestions, rng).slice(0, count);
  }

  function getResultTier(score, total) {
    if (score > Math.floor(total * 0.75)) return "high";
    if (score >= Math.ceil(total * 0.5)) return "mid";
    return "low";
  }

  return {
    shuffleArray,
    pickQuestions,
    getResultTier,
  };
});
