const questions = {
    cute: [
        {
            question: "Seal or Sea lion: Which one is the seal?",
            answers: [
                { image: "https://github.com/lookssame/lookssame/raw/main/images/cute_seal.webp", correct: true },
                { image: "https://github.com/lookssame/lookssame/raw/main/images/cute_sealion.webp", correct: false }
            ],
            explanation: "https://youtu.be/Q8gdbx_A4Hs?t=73"
        },
        {
            question: "Alpaca or Llama: Which one is the llama?",
            answers: [
                { image: "https://github.com/lookssame/lookssame/raw/main/images/cute_alpaca.webp", correct: false },
                { image: "https://github.com/lookssame/lookssame/raw/main/images/cute_llama.webp", correct: true }
            ],
            explanation: "https://youtu.be/PCtXJoDm41s?t=192"
        },
        // Add more cute questions here
    ],
    normal: [
        {
            question: "Seal or Sea lion: Which one is the seal?",
            answers: [
                { image: "https://github.com/lookssame/lookssame/raw/main/images/normal_seal.webp", correct: true },
                { image: "https://github.com/lookssame/lookssame/raw/main/images/normal_sealion.jpg", correct: false }
            ],
            explanation: "https://youtu.be/Q8gdbx_A4Hs?t=73"
        },
        {
            question: "Alpaca or Llama: Which one is the llama?",
            answers: [
                { image: "https://github.com/lookssame/lookssame/raw/main/images/normal_alpaca.png", correct: false },
                { image: "https://github.com/lookssame/lookssame/raw/main/images/normal_llama.png", correct: true }
            ],
            explanation: "https://youtu.be/PCtXJoDm41s?t=192"
        },
        // Add more normal questions here
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;

const versionContainer = document.getElementById('version-container');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const confirmButton = document.getElementById('confirm-btn');
const resultElement = document.getElementById('result');
const explanationLink = document.getElementById('explanation-link');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const progressText = document.getElementById('progress-text');

function selectVersion(version) {
    currentQuestions = questions[version];
    versionContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    startQuiz();
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hide');
    scoreContainer.classList.add('hide');
    confirmButton.classList.remove('hide');
    confirmButton.textContent = "Confirm";
    showQuestion(currentQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    selectedAnswerIndex = null;
    questionElement.textContent = question.question;
    const answers = shuffleArray(question.answers);
    answers.forEach((answer, index) => {
        const button = document.getElementById(`img${index + 1}`);
        button.src = answer.image;
        button.parentElement.classList.remove('correct', 'wrong', 'selected');
        button.parentElement.disabled = false;
        button.parentElement.dataset.correct = answer.correct;
    });
    resultElement.textContent = '';
    explanationLink.href = question.explanation;
    explanationLink.classList.add('hide');
    confirmButton.textContent = "Confirm";
    confirmButton.onclick = confirmAnswer;
    updateProgress();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectAnswer(index) {
    if (selectedAnswerIndex !== null) {
        document.getElementById(`img${selectedAnswerIndex + 1}`).parentElement.classList.remove('selected');
    }
    selectedAnswerIndex = index;
    document.getElementById(`img${index + 1}`).parentElement.classList.add('selected');
}

function confirmAnswer() {
    if (selectedAnswerIndex === null) return;

    const button = document.getElementById(`img${selectedAnswerIndex + 1}`).parentElement;
    const correct = button.dataset.correct === 'true';
    resultElement.innerHTML = correct ? '<span class="correct-text">Correct! ✅</span>' : '<span class="wrong-text">Wrong! ❌</span>';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach((button) => {
        button.classList.add(button.dataset.correct === 'true' ? 'correct' : 'wrong');
        button.disabled = true;
    });
    explanationLink.classList.remove('hide');
    confirmButton.textContent = "Next";
    confirmButton.onclick = nextQuestion;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion(currentQuestions[currentQuestionIndex]);
    } else {
        showScore();
    }
}

function showScore() {
    questionContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.textContent = `${score} out of ${currentQuestions.length}`;
}

function restartQuiz() {
    versionContainer.classList.remove('hide');
    quizContainer.classList.add('hide');
}

function updateProgress() {
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
}

document.addEventListener("DOMContentLoaded", function() {
    // Initialize quiz by hiding all sections except version selection
    versionContainer.classList.remove('hide');
    quizContainer.classList.add('hide');
});
