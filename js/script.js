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
let lastFocusedElement = null;
let dialogTrapHandler = null;

// EVENT LISTENERS

// Start quiz
startBtn.addEventListener("click", () => {
  lastFocusedElement = document.activeElement;
  startSection.classList.add("activeStart");
  openInfoDialog();
});

// Exit info box
exitBtn.addEventListener("click", closeInfoDialog);

// Continue to quiz
continueBtn.addEventListener("click", () => {
  closeInfoDialog(false);
  setSectionState(startSection, false);
  quizBox.classList.add("activeQuiz");
  setSectionState(quizBox, true);
  setSectionState(resultBox, false);
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
    .map(
      (opt, i) =>
        `<li class="option" role="option" tabindex="${i === 0 ? "0" : "-1"}" aria-selected="false">${opt}</li>`,
    )
    .join("");

  bindOptionListHandlers();

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
  options.forEach((opt) => {
    opt.classList.add("disabled");
    opt.setAttribute("aria-disabled", "true");
    opt.setAttribute("aria-selected", opt === selectedOption ? "true" : "false");
    opt.setAttribute("tabindex", "-1");
  });

  nextBtn.style.display = "block";
}

function showResultBox() {
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  setSectionState(quizBox, false);
  setSectionState(resultBox, true);

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
      opt.setAttribute("aria-selected", "true");
    } else {
      opt.setAttribute("aria-selected", "false");
    }
    opt.classList.add("disabled");
    opt.setAttribute("aria-disabled", "true");
    opt.setAttribute("tabindex", "-1");
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
  setSectionState(quizBox, true);
  setSectionState(resultBox, false);

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

// ACCESSIBILITY HELPERS
function setSectionState(section, isActive) {
  if (isActive) {
    section.removeAttribute("aria-hidden");
    section.removeAttribute("inert");
  } else {
    section.setAttribute("aria-hidden", "true");
    section.setAttribute("inert", "");
  }
}

function openInfoDialog() {
  infoBox.classList.add("activeInfo");
  setSectionState(infoBox, true);
  setSectionState(startSection, false);
  setSectionState(quizBox, false);
  setSectionState(resultBox, false);
  continueBtn.focus();
  trapFocus(infoBox);
}

function closeInfoDialog(restoreFocus = true) {
  infoBox.classList.remove("activeInfo");
  setSectionState(infoBox, false);
  setSectionState(startSection, true);
  removeTrapFocus();
  if (restoreFocus && lastFocusedElement) lastFocusedElement.focus();
}

function trapFocus(container) {
  removeTrapFocus();
  dialogTrapHandler = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeInfoDialog(true);
      return;
    }
    if (e.key !== "Tab") return;
    const focusables = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  document.addEventListener("keydown", dialogTrapHandler, true);
}

function removeTrapFocus() {
  if (!dialogTrapHandler) return;
  document.removeEventListener("keydown", dialogTrapHandler, true);
  dialogTrapHandler = null;
}

function bindOptionListHandlers() {
  if (!optionList.dataset.bound) {
    optionList.addEventListener("click", (e) => {
      const option = e.target.closest(".option");
      if (!option || option.classList.contains("disabled")) return;
      optionSelected(option);
    });

    optionList.addEventListener("keydown", (e) => {
      const options = Array.from(optionList.querySelectorAll(".option"));
      if (!options.length) return;
      const active =
        document.activeElement.closest(".option") ||
        optionList.querySelector('.option[tabindex="0"]') ||
        options[0];
      const currentIndex = Math.max(0, options.indexOf(active));

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!active.classList.contains("disabled")) optionSelected(active);
        return;
      }

      let nextIndex = currentIndex;
      if (e.key === "ArrowDown") nextIndex = (currentIndex + 1) % options.length;
      if (e.key === "ArrowUp")
        nextIndex = (currentIndex - 1 + options.length) % options.length;
      if (e.key === "Home") nextIndex = 0;
      if (e.key === "End") nextIndex = options.length - 1;

      if (nextIndex !== currentIndex) {
        e.preventDefault();
        options.forEach((opt, i) => {
          opt.setAttribute("tabindex", i === nextIndex ? "0" : "-1");
        });
        options[nextIndex].focus();
      }
    });
    optionList.dataset.bound = "true";
  }
}
