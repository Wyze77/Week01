const dom_start = document.querySelector("#start");
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_score = document.querySelector("#scoreContainer");
const dom_progress = document.querySelector("#progress");

const defaultQuestions = [
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
    choiceA: "Cascading Style Sheets",
    choiceB: "Colorful Style Sheets",
    choiceC: "Computer Style Sheets",
    choiceD: "Creative Style Sheets",
    correct: "A",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  }
];

let questions = JSON.parse(localStorage.getItem('questions')) || defaultQuestions;
if (questions.length === 0) {
  
}

let runningQuestionIndex = 0;
let score = 0;

dom_start.addEventListener("click", onStart);

function hide(element) {
  element.classList.add("hidden");
  element.style.display = "none";
}

function show(element) {
  element.classList.remove("hidden");
  element.style.display = "block";
}

function showFlex(element) {
    element.classList.remove("hidden");
    element.style.display = "flex";
}

function onStart() {

  if (questions.length === 0) {
      alert("No questions found! Please go to Edit Quiz and add some questions.");
      return;
  }

  hide(dom_start);
  show(dom_quiz);
  runningQuestionIndex = 0;
  score = 0;
  renderQuestion();
}

function renderQuestion() {
  let q = questions[runningQuestionIndex];

  if (!q) { 
      console.error("Question is undefined!"); 
      return; 
  }

  dom_question.innerHTML = q.title;
  dom_choiceA.innerHTML = q.choiceA;
  dom_choiceB.innerHTML = q.choiceB;
  dom_choiceC.innerHTML = q.choiceC;
  dom_choiceD.innerHTML = q.choiceD;

  let percent = ((runningQuestionIndex) / questions.length) * 100;
  if(dom_progress) {
      dom_progress.style.width = percent + "%";
  }
}

window.checkAnswer = function(answer) {
  if (questions[runningQuestionIndex].correct === answer) {
    score++;
  }
  runningQuestionIndex++;
  if (runningQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    renderScore();
  }
}

function renderScore() {
  hide(dom_quiz);
  showFlex(dom_score);

  const scorePercent = Math.round((100 * score) / questions.length);
  let imgPath = "../../img/100.png";
  if (scorePercent < 20) imgPath = "../../img/20.png";
  else if (scorePercent < 40) imgPath = "../../img/40.png";
  else if (scorePercent < 60) imgPath = "../../img/60.png";
  else if (scorePercent < 80) imgPath = "../../img/80.png";

  dom_score.innerHTML = `
    <img src="${imgPath}" alt="score" class="w-32 mb-4">
    <h2 class="text-3xl font-bold text-purple-600">${scorePercent}%</h2>
    <p class="text-gray-500 mt-2">You answered ${score} out of ${questions.length} correctly.</p>
    <button onclick="location.reload()" class="mt-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">Play Again</button>
  `;
}