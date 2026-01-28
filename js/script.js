// DOM ELEMENTS
const startSection = document.querySelector(".start_btn");
const startBtn = startSection.querySelector("button");

const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");

const quizBox = document.querySelector(".quiz_box");
const questionText = quizBox.querySelector(".que_text");
const optionList = quizBox.querySelector(".option_list");
const nextBtn = quizBox.querySelector(".next_btn");
const timeCountEl = quizBox.querySelector(".timer .timer_sec");
const timeTextEl = quizBox.querySelector(".timer .time_text");
const timeLine = quizBox.querySelector(".time_line");

const resultBox = document.querySelector(".result_box");
const restartQuizBtn = resultBox.querySelector(".buttons .restart");
const quitQuizBtn = resultBox.querySelector(".buttons .quit");

// QUIZ STATE
let currentQuestion = 0;
let questionNumber = 1;
let userScore = 0;
let timeValue = 15;
let widthValue = 0;
let timer;
let timerLine;
let quizQuestions;

// EVENT LISTENERS

// Start quiz
startBtn.addEventListener("click", () => {
  infoBox.classList.add("activeInfo");
  startSection.classList.add("activeStart");
});

// Exit info box
exitBtn.addEventListener("click", () => infoBox.classList.remove("activeInfo"));

// Continue to quiz
continueBtn.addEventListener("click", () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  showQuestion(currentQuestion);
  updateQuestionCounter(questionNumber);
  startTimer(timeValue);
  startTimerLine(widthValue);
});

// Next question
nextBtn.addEventListener("click", () => {
  if (currentQuestion < 11) {
    currentQuestion++;
    questionNumber++;
    showQuestion(currentQuestion);
    updateQuestionCounter(questionNumber);
    resetTimers();
  } else {
    clearInterval(timer);
    clearInterval(timerLine);
    showResultBox();
  }
});

// Restart quiz
restartQuizBtn.addEventListener("click", restartQuiz);

// Quit quiz
quitQuizBtn.addEventListener("click", () => window.location.reload());

// FUNCTIONS

// Shuffle array using Fisher-Yates
function shuffleArray(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

quizQuestions = shuffleArray(questions).slice(0, 12);

function showQuestion(index) {
  const q = quizQuestions[index];
  questionText.innerHTML = `<span>${q.question}</span>`;

  optionList.innerHTML = q.options
    .map((opt) => `<li class="option" role="option" tabindex="0">${opt}</li>`)
    .join("");

  // Add click & keyboard listeners
  const options = optionList.querySelectorAll(".option");
  options.forEach((opt) => {
    opt.addEventListener("click", () => optionSelected(opt));
    opt.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") optionSelected(opt);
    });
  });

  questionText.focus();
  nextBtn.style.display = "none";
  timeTextEl.textContent = "Time Left";
}

function optionSelected(selectedOption) {
  clearInterval(timer);
  clearInterval(timerLine);

  const correctAnswer = quizQuestions[currentQuestion].answer;
  const options = optionList.querySelectorAll(".option");

  if (currentQuestion === 11) {
    nextBtn.innerHTML = "Show results";
  }

  if (selectedOption.textContent === correctAnswer) {
    userScore++;
    selectedOption.classList.add("correct");
    selectedOption.innerHTML += `<span class="icon tick"><i class="fas fa-check"></i></span>`;
  } else {
    selectedOption.classList.add("incorrect");
    selectedOption.innerHTML += `<span class="icon cross"><i class="fas fa-times"></i></span>`;
    // Highlight correct option
    options.forEach((opt) => {
      if (opt.textContent === correctAnswer) {
        opt.classList.add("correct");
        opt.innerHTML += `<span class="icon tick"><i class="fas fa-check"></i></span>`;
      }
    });
  }

  // Disable all options
  options.forEach((opt) => opt.classList.add("disabled"));

  nextBtn.style.display = "block";
}

function showResultBox() {
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");

  const scoreText = resultBox.querySelector(".score_text");
  const scoreIcon = resultBox.querySelector(".icon");

  let message = "";
  let imgSrc = "img/crow.jpg";

  if (userScore > 9) {
    message = `You got <span>${userScore}</span> out of <span>12</span>. <br> Proved to be the true heir of the Iron Throne!`;
    imgSrc = "img/crown.jpg";
  } else if (userScore > 5) {
    message = `You got <span>${userScore}</span> out of <span>12</span>. <br> Deserved to be the lord of a Great House.`;
    imgSrc = "img/lannister.jpg";
  } else {
    message = `You got <span>${userScore}</span> out of <span>12</span>. <br> You will be sent to the Night's Watch.`;
  }

  scoreText.innerHTML = message;
  scoreIcon.innerHTML = `<img src="${imgSrc}" alt="Result icon" id="crown">`;
}

function startTimer(duration) {
  let time = duration;
  timeCountEl.textContent = time < 10 ? `0${time}` : time;

  timer = setInterval(() => {
    timeCountEl.textContent = time < 10 ? `0${time}` : time;
    time--;
    if (time < 0) {
      clearInterval(timer);
      timeCountEl.textContent = "00";
      timeTextEl.textContent = "Time Off!";
      autoSelectCorrect();
      nextBtn.style.display = "block";
    }
  }, 1000);
}

function startTimerLine(startWidth) {
  let width = startWidth;
  timerLine = setInterval(() => {
    width += 0.5;
    timeLine.style.width = `${width}%`;
    if (width > 100) clearInterval(timerLine);
  }, 79);
}

function autoSelectCorrect() {
  const correctAnswer = quizQuestions[currentQuestion].answer;
  const options = optionList.querySelectorAll(".option");

  options.forEach((opt) => {
    if (opt.textContent === correctAnswer) {
      opt.classList.add("correct");
      opt.innerHTML += `<span class="icon tick"><i class="fas fa-check"></i></span>`;
    }
    opt.classList.add("disabled");
  });
}

function updateQuestionCounter(index) {
  const counterEl = quizBox.querySelector(".total_que");
  counterEl.innerHTML = `<span><p>${index}</p>Of <p>12</p> Questions</span>`;
}

function resetTimers() {
  clearInterval(timer);
  clearInterval(timerLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  nextBtn.style.display = "none";
  timeTextEl.textContent = "Time Left";
}

// Restart quiz logic
function restartQuiz() {
  quizBox.classList.add("activeQuiz");
  resultBox.classList.remove("activeResult");

  currentQuestion = 0;
  questionNumber = 1;
  userScore = 0;
  timeValue = 15;
  widthValue = 0;
  quizQuestions = shuffleArray(questions).slice(0, 12);

  showQuestion(currentQuestion);
  updateQuestionCounter(questionNumber);
  resetTimers();
}
