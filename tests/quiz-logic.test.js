const assert = require("assert");
const {
  shuffleArray,
  pickQuestions,
  getResultTier,
} = require("../js/quiz-logic");

function makeRng(values) {
  let i = 0;
  return () => {
    const value = values[i % values.length];
    i += 1;
    return value;
  };
}

function testShuffleArrayDeterministic() {
  const rng = makeRng([0]);
  const input = [1, 2, 3];
  const output = shuffleArray(input, rng);
  assert.deepStrictEqual(output, [2, 3, 1]);
  assert.deepStrictEqual(input, [1, 2, 3]);
}

function testPickQuestionsCount() {
  const rng = makeRng([0]);
  const input = [1, 2, 3, 4];
  const output = pickQuestions(input, 2, rng);
  assert.deepStrictEqual(output, [2, 3]);
}

function testResultTierBoundaries() {
  assert.strictEqual(getResultTier(10, 12), "high");
  assert.strictEqual(getResultTier(9, 12), "mid");
  assert.strictEqual(getResultTier(6, 12), "mid");
  assert.strictEqual(getResultTier(5, 12), "low");
}

function runTests() {
  testShuffleArrayDeterministic();
  testPickQuestionsCount();
  testResultTierBoundaries();
  console.log("All tests passed.");
}

runTests();
