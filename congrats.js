var name, points;

function showCard(){


var db = firebase.firestore();

db.collection("users").doc(sessionStorage.getItem('docId')).get().then((doc) => {
    if (doc.exists) {
        console.log(doc.data().score)
        points = "Score: " + doc.data().score;
        console.log("Document data:", doc.data());
        name = doc.data().name;
        document.getElementById("name").innerHTML = name
document.getElementById("score").innerHTML = points
        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});


}

