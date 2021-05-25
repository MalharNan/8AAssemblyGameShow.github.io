var userid, addBtn, std, classId;

function updateDB(){
    var db = firebase.firestore();
    userid = document.getElementById("userName").value;
    std = document.getElementById("std").value;
    classId = document.getElementById("email").value;
    if(userid == "" || std == "" || classId == ""){
    alert("Some fields are empty")}else{

    db.collection("users").add({
        name: userid,
        std: std,
        email: classId,
        score: 0
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        sessionStorage.setItem('docId', docRef.id)

        window.location = './quiz.html'
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });}
}
