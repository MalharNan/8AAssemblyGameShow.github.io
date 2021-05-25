var userScore
var questionList = ["A word I know, six letters it contains, remove one letter and 12 remains. What is it?", "What gets bigger when more is taken away?", "What runs all around a backyard, yet never moves?", "What can you catch, but not throw?", "What gets wet while drying?"]
var answerList = ["Dozens", "Hole", "Fence", "cold", "towel"]
var index = 0
var titleRef = document.getElementById("questionHolder")


function resetTextBox() {
    document.getElementById("userAnswer").value = "";
}

function continueGame() {
  calculateScore()
    index++;
    
    console.log(isGameOver())
    if (isGameOver()) {
        endGame()
    } else {
      
        getNextQuestion()
        resetTextBox();
    }
}

function getNextQuestion() {
    titleRef.innerHTML = questionList[index]
    document.getElementById("userAnswer").value = "";
    resetTextBox()
}

function endGame() {

    window.location = './hangman.html'
    x = document.cookie;
    x[score] += userScore
}

function isGameOver() {
    if (index === questionList.length) {
        return true
    } else {
        return false
    }
}

function calculateScore(){
  var userAnswer = document.getElementById("userAnswer").value;
  if (userAnswer.toLowerCase() == answerList[index].toLowerCase()){
    updateScoreDB(1)
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
