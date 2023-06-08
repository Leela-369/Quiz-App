const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
      { text: "Rome", correct: false },
      { text: "Berlin", correct: false }
    ]
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Saturn", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Neptune", correct: false },
      { text: "Mars", correct: false }
    ]
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Vincent van Gogh", correct: false },
      { text: "Michelangelo", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const resultContainer = document.getElementById("result-container");
const resultMessage = document.getElementById("result-message");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");

function showQuestion() {
  resetState();

  const question = questions[currentQuestionIndex];
  questionElement.innerText = question.question;

  question.answers.forEach(answer => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = answer.text;
    input.classList.add("radio-btn")
    label.classList.add("answer-option");
    label.appendChild(input);
    label.appendChild(document.createTextNode(answer.text));
    answerButtons.appendChild(label);
  });

  prevButton.style.display = currentQuestionIndex === 0 ? "none" : "block";
  nextButton.style.display = currentQuestionIndex === 2 ? "none" : "block";
  submitButton.style.display = currentQuestionIndex === 2 ? "block" : "none";

  
  const answerOptionInputs = document.querySelectorAll('input[name="answer"]');
  answerOptionInputs.forEach(input => {
    input.addEventListener("change", selectAnswer);
  });
}

function selectAnswer() {
  nextButton.disabled = false;
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (selectedAnswer) {
    const selectedText = selectedAnswer.value;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedText === currentQuestion.answers.find(answer => answer.correct).text) {
      score++;
    }
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    finishQuiz();
    submitButton.style.display = "block"; 
    nextButton.style.display = "none"; 
  } else {
    showQuestion();
  }
}


function previousQuestion() {
  currentQuestionIndex--;
  showQuestion();
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }

  resultContainer.style.display = "none";
  resultMessage.innerText = "";
  nextButton.disabled = true;
}

function finishQuiz() {
  questionElement.innerText = "Quiz completed!";
  answerButtons.innerHTML = "";
  resultMessage.innerText = `Final Score: ${score}/${questions.length}`;
  resultContainer.style.display = "block";
  prevButton.style.display = "none"; 
  submitButton.style.display = "none"; 

}



showQuestion();

nextButton.addEventListener("click", checkAnswer);
prevButton.addEventListener("click", previousQuestion);
submitButton.addEventListener("click", finishQuiz);
