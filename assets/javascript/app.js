// Golbal variables//
var timer = 3;
var interValId;
var questions = 0;
var choices= 0;
var score =0; 
var wrong = 0;

var triviaQuestion = [
    {
        question: "Why was Rick Grimes in a coma?",
        choices: ["He was in a car crash", "He was shot", "He fell off his roof","He had a Heartattack"],
        answer: "He was shot",
    },
    {
        question: "What is Daryl Dixon's iconic weapon of choice?",
        choices: ["Shotgun", "Sword", "Crossbow","Bat"],
        answer: "Crossbow",
    },
];

function questionUp(){
    var question = triviaQuestion[questions].question;
    timer = 3;
    interValId = setInterval(countDown, 1000);
        $("#time").html("Timer: " +timer);
    $("#game").html("<h2>" + question + "</h2>");

}       

function choiceUp(){
    for (var i = 0; i < 4; i++) {
        var choice = triviaQuestion[questions].choices;
        $('#choices').append(`<p class=c data-answer= '${choice[i]}'>${choice[i]}</p>`) 
        
    }
};

function newQuestion(){
    var over = (triviaQuestion.length-1) ===questions;
    if (over){

    }else {
        questions++;
        choices++;
        $('#choices').empty();
        questionUp();
        choiceUp();
    }
   
   
};
function countDown(){
    timer--;
    $("#time").html("Timer: " +timer);
    if (timer === 0){
        stopTime();
    }
};

function stopTime(){
    clearInterval(interValId);
    wrong++;
    newQuestion();
};


// document.onkeyup('click')

questionUp();
choiceUp();