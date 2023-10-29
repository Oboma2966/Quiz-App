// questions and options for the quiz
const questions = [
    {
        question: "Which player scored the fastest hat-trick in the Premier League?",
        answers: [
            {text: "Mane", correct: true},
            {text: "Messi", correct: false},
            {text: "Ronalo", correct: false},
            {text: "Zidane", correct: false},
        ]
    },
    {
        question: "With 202 clean sheets, which goalkeeper has the best record in the Premier League?",
        answers: [
            {text: "David de Gea", correct: false},
            {text: "Ederson", correct: false},
            {text: "Petr Cech", correct: true},
            {text: "Van der sar", correct: false},
        ]
    },
    {
        question: "Which team won the first Premier League tittle?",
        answers: [
            {text: "Chelsea", correct: false},
            {text: "Manchester United", correct: true},
            {text: "Arsenal", correct: false},
            {text: "Liverpool", correct: false},
        ]
    },
    {
        question: "Which team did Chelsea beat to win the 2021 Champions League tittle?",
        answers: [
            {text: "Manchester United", correct: true},
            {text: "Barcelona", correct: false},
            {text: "Real Madrid", correct: false},
            {text: "Liverpool", correct: false},
        ]
    },
    {
        question: "Who is the best player in Africa?",
        answers: [
            {text: "Okocha", correct: true},
            {text: "Messi", correct: false},
            {text: "Ronalo", correct: false},
            {text: "Zidane", correct: false},
        ]
    }
];

// add behaviors for my elements (question, answer & next)
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
let nextButton = document.querySelector(".next-btn");
const scoreButton = document.querySelector(".liveScore");
let homeButton = document.querySelector(".backhome");

let currentQuestionIndex = 0;
let score = 0;
let liveScore = 0;

const SCORE_POINTS = 20

function startQuiz(){
    currentQuestionIndex= 0;
    score = 0;
    nextButton.innerHTML = "Next";
    scoreButton.innerHTML = 0;
    liveScore = 0;
    homeButton.style.display = "none";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        incrementScore(SCORE_POINTS);
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

incrementScore = num => {
    liveScore +=num
    scoreButton.innerHTML = liveScore
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    homeButton.style.display = "block";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();