const questions = [
    {
        question: "Is the section up ahead open or closed ?" ,
        videoSource: "vid1.MP4", 
        answers: [
            {text: "half open half closed" , correct: false},
            {text: "closed and will open down the line" , correct: true},
            {text: "open" , correct: false},
            {text: "closed" , correct: false},
        ]
    },
    {
        question: "what section is siutable for this lip kind ?" ,
        videoSource: "vid2.MP4", 
        answers: [
            {text: "critical carve" , correct: false},
            {text: "off the lip" , correct: false},
            {text: "air" , correct: false},
            {text: "all the answers could be correct" , correct: true},
        ]
    },
    {
        question: "when we stay straight under the lip , what happens ?" , 
        videoSource: "vid3.MP4", 
        answers: [
            {text: "we generate speed" , correct: false},
            {text: "we get close to the power source" , correct: false},
            {text: "a + b are correct" , correct: true},
            {text: "depends on the wave" , correct: false},
        ]
    },
    {
        question: "By seeing how wide my bottom turn was we can understand that...?" , 
        videoSource: "vid4.MP4",
        answers: [
            {text: "surfers turn will be wide" , correct: false},
            {text: "surfers turn will be sharp" , correct: true},
            {text: "surfer need more speed" , correct: false},
            {text: "surfer missed the lip" , correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const questionVideo = document.getElementById("question-video");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuizz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
    function showQuestion(){
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex +1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click" , selectAnswer);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        
        });
        const questionVideo = document.getElementById("question-video");
        questionVideo.src = currentQuestion.videoSource;
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
function  showSore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!` ;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();    
    }else{
       showSore(); 
    }
}



nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();    
    }else{
        startQuizz();
    }
});


startQuizz();

