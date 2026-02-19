let questions = [];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

/* ---------- HELPERS ---------- */

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

/* ---------- FETCH QUESTIONS ---------- */

async function fetchQuestions() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
  );

  if (!res.ok) throw new Error("Network error");

  const data = await res.json();

  return data.results.map(q => {
    const options = shuffle([
      ...q.incorrect_answers,
      q.correct_answer
    ]);

    return {
      question: q.question,
      options,
      answer: options.indexOf(q.correct_answer)
    };
  });
}

/* ---------- START QUIZ ---------- */

async function startQuiz() {
  questionElement.innerHTML = "Loading questions...";
  answerButtons.innerHTML = "";

  try {
    questions = await fetchQuestions();
  } catch {
    questionElement.innerHTML = "Failed to load questions";
    return;
  }

  if (!questions.length) {
    questionElement.innerHTML = "No questions found";
    return;
  }

  currentQuestionIndex = 0;
  score = 0;

  nextButton.innerHTML = "Next";
  nextButton.onclick = null;

  showQuestion();
}

/* ---------- UI ---------- */

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;

  questionElement.innerHTML =
    `${questionNo}. ${decodeHTML(currentQuestion.question)}`;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.innerHTML = decodeHTML(option);
    button.classList.add("btn");
    button.type = "button";

    if (index === currentQuestion.answer) {
      button.dataset.correct = "true";
    }

    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

/* ---------- ANSWER ---------- */

function selectAnswer(e) {
  const selectedBtn = e.target;

  if (selectedBtn.disabled) return; // prevent double click

  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    score++;
    selectedBtn.classList.add("correct");
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

/* ---------- SCORE ---------- */

function showScore() {
  resetState();

  questionElement.innerHTML =
    `You scored ${score} out of ${questions.length}`;

  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
  nextButton.onclick = startQuiz;
}

/* ---------- NAVIGATION ---------- */

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

/* ---------- START ---------- */

startQuiz();
