var numCorrect;
var secondsLeft;
let minutes = 0;
let seconds = 0;


function callOnLoad() {
    timer(1);

}


var numCorrect = 0;
var questionAnswered = false

function timer(startingMinutes) {
    
const countdownEl = document.getElementById("Display");
countdownEl.innerHTML = `${minutes}:${seconds}`;
    
    if (!questionAnswered) {
        let time = startingMinutes * 60; //60 seconds





        function updateCountdown() {
            time--; //time = time -1
            minutes = Math.floor(time / 60);
            seconds = time % 60
            console.log(minutes, seconds)


            
            if (minutes == 0 && seconds == 0) { //timer ends
                secondsLeft = minutes * 60 + seconds;
                countdownEl.style.color = "white";
                calculateScore(minutes, seconds)
                startingMinutes = 1
                time = startingMinutes * 60;

                alert("TIME IS UP");
                showSlide(currentSlide + 1);
            }
            if (minutes == 0 && 10 > seconds && seconds >= 0) {
                countdownEl.style.color = "red";
            }

        }



        setInterval(updateCountdown, 1000)
    } else { calculateScore(seconds) }
}

function calculateScore(timeLeft) {
    console.log(timeLeft)
}

// (function() {

var gameOver = false

// Functions
function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            // variable to store the list of possible answers
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {

                // ...add an HTML radio button
                answers.push(
                    `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
                
              </label><br>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
            );
        }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}


function showResults() {
    secondsLeft = minutes * 60 + seconds;
    const answerContainers = quizContainer.querySelectorAll('.answers');

    check(answerContainers)

    let numCorrect = 0;


    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    window.location = 'riddles.html'
}

function showSlide(n) {
    previousButton.style.display = 'none';
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === slides.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    secondsLeft = minutes * 60 + seconds;
    const answerContainers = quizContainer.querySelectorAll('.answers');

    check(answerContainers)
    showSlide(currentSlide + 1);
    questionAnswered = true
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [{
        question: "Which is the happiest country in the world?",
        answers: {
            a: "Bhutan",
            b: "Denmark",
            c: "Finland"
        },
        correctAnswer: "c"
    },
    {
        question: "Who invented the computer?",
        answers: {
            a: "Ada Lovelace",
            b: "Alan Turring",
            c: "Charles Babbage"
        },
        correctAnswer: "c"
    },
    {
        question: "With whose wand did Harry kill voldemort?",
        answers: {
            a: "His own",
            b: "Draco Malfoy's",
            c: "Voldemort's"
        },
        correctAnswer: "b"
    },
    {
        question: "Who calculated the value of pi for the 1st time?",
        answers: {
            a: "Archimedes",
            b: "Albert Einstein",
            c: "Aryabhatta"
        },
        correctAnswer: "a"
    },
    {
        question: "In which continent is cuba located?",
        answers: {
            a: "Oceania",
            b: "North america",
            c: "Africa "
        },
        correctAnswer: "b"
    },
    
];


function checkIfRight(index, answerContainers) {
    var correct = ["c", "c", "c"];
    const answerContainer = answerContainers[index];
    const selector = `input[name=question${index}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer == correct[index]) {
        score = 100 * secondsLeft / 60
        console.log(secondsLeft);
        console.log(score)
        updateScoreDB(Math.round(score))
    }
    
}
function updateScoreDB(data){
  var db = firebase.firestore();

  db.collection("users").doc(sessionStorage.getItem('docId')).update({
      score: firebase.firestore.FieldValue.increment(data)
  })
  .then((docRef) => {
      console.log("Document updated");

  })
  .catch((error) => {
      console.error("Error updating document: ", error);
  });
}


function check(answerContainer) {
    var totalScore = 0
    for (index = 0; index < myQuestions.length; index++) {


        totalScore = checkIfRight(index, answerContainer)
    }
    console.log(totalScore);
    return totalScore;
}
// Kick things off
buildQuiz();


// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Show the first slide
showSlide(currentSlide);

// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
// })();
