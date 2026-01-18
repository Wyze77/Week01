// DOMS ELEMENTS  ---------------------------------------------------------
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_score = document.querySelector("#scoreContainer");
const dom_start = document.querySelector("#start");

dom_start.addEventListener("click", onStart);

// DATA  ---------------------------------------------------------
let questions = [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  },
];
let runningQuestionIndex = 0;
let score = 0;

// FUNCTIONS ---------------------------------------------------------

// Hide a given element
function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

function onStart() {
  hide(dom_start);
  show(dom_quiz);
  runningQuestionIndex = 0;
  score = 0;
  renderQuestion();
}

function renderQuestion() {
  let q = questions[runningQuestionIndex];
  dom_question.innerHTML =q.title
  dom_choiceA.innerHTML = q.choiceA;
  dom_choiceB.innerHTML = q.choiceB;
  dom_choiceC.innerHTML = q.choiceC;
  dom_choiceD.innerHTML = q.choiceD;
}

function checkAnswer(answer) {
  if (questions[runningQuestionIndex].correct === answer) {
    score++;
  }
  runningQuestionIndex++;
  if (runningQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    renderSCore();
  }
}

function renderSCore() {
  hide(dom_quiz);
  show(dom_score);

  const scorePercent = Math.round((100 * score) / questions.length);

  let imgPath = "";

  if (scorePercent < 20) {
    imgPath = "./img/20.png";
  } else if (scorePercent < 40) {
    imgPath = "./img/40.png";
  } else if (scorePercent < 60) {
    imgPath = "./img/60.png";
  } else if (scorePercent < 80) {
    imgPath = "./img/80.png";
  } else {
    imgPath = "./img/100.png";
  }

  dom_score.innerHTML = `
    <img src="${imgPath}" alt="score">
    <h2>Score: ${scorePercent}%</h2>
  `;
}


// FUNCTIONS ---------------------------------------------------------
show(dom_start);
hide(dom_quiz);
hide(dom_score);
