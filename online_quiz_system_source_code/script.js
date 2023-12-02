var currentUser;
var currentQuestionIndex = 0;
var score = 0;
var timer;
var timeLimit = 20; // Set the time limit for each question in seconds

var questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Ringgit"],
    correctAnswer: "Yen"
  }
  // Add more questions as needed
];

function validateLogin() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var errorMessage = document.getElementById('error-message');

  if (username === 'user1' && password === 'dev') {
    currentUser = username;
    errorMessage.textContent = '';
    showQuiz();
    startTimer();
    showNextQuestion();
  } else {
    errorMessage.textContent = 'Invalid username or password. Please try again.';
    errorMessage.style.color = 'red';
  }
}

function showQuiz() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
}

function startTimer() {
  var timerElement = document.getElementById('timer');
  var timeRemaining = timeLimit;

  timer = setInterval(function () {
    timerElement.textContent = 'Time Remaining: ' + timeRemaining + 's';

    if (timeRemaining <= 0) {
      clearInterval(timer);
      timerElement.textContent = 'Time\'s up!';
      showNextQuestion();
    }

    timeRemaining--;
  }, 1000);
}

function showNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    var questionElement = document.getElementById('question');
    var optionsElement = document.getElementById('options');
    var resultMessageElement = document.getElementById('result-message');

    questionElement.textContent = questions[currentQuestionIndex].question;

    optionsElement.innerHTML = '';

    questions[currentQuestionIndex].options.forEach(function (option, index) {
      var optionButton = document.createElement('button');
      optionButton.textContent = option;
      optionButton.onclick = function () {
        selectAnswer(option);
      };
      optionsElement.appendChild(optionButton);
    });

    resultMessageElement.textContent = '';
  } else {
    showResult();
  }
}

function selectAnswer(selectedOption) {
  var correctAnswer = questions[currentQuestionIndex].correctAnswer;
  var resultMessageElement = document.getElementById('result-message');
  clearInterval(timer);

  if (selectedOption === correctAnswer) {
    score++;
  }

  currentQuestionIndex++;
  resultMessageElement.textContent = 'Your answer is ' + (selectedOption === correctAnswer ? 'correct!' : 'incorrect.');
  resultMessageElement.style.color = selectedOption === correctAnswer ? 'green' : 'red';

  setTimeout(function () {
    showNextQuestion();
    startTimer();
  }, 1000);
}

function showResult() {
  var resultMessageElement = document.getElementById('result-message');
  resultMessageElement.textContent = 'Quiz completed, ' + currentUser + '! Your score is ' + score + ' out of ' + questions.length + '.';
  resultMessageElement.style.color = 'blue';
}
