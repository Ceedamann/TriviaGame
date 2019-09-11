// Golbal variables//
var timer = 30;
var interValId;
var questions = 0;
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

var correct=[
    './assets/images/yup.gif'
];
var incorrect=[
    './assets/images/no.gif',
    './assets/images/wrong.gif'
];

function questionUp(){
    var question = triviaQuestion[questions].question;
    timer = 30;
    interValId = setInterval(countDown, 1000);
        $("#time").html("Timer: " +timer);
    $("#game").html("<h2>" + question + "</h2>");

}       

function choiceUp(){
    for (var i = 0; i < 4; i++) {
        var choice = triviaQuestion[questions].choices;
        $('#game').append(`<p class=c data-answer= '${choice[i]}'>${choice[i]}</p>`) 
        
    }
};

function newQuestion(){
    var over = (triviaQuestion.length-1) ===questions;
    if (over){
        results();
    }else {
        questions++;
        // choices++;
        $('#game').empty();
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
    splash('wrong');
    setTimeout(newQuestion , 3*1000);
    
};


    $(document).on('click', '.c',function(){
        clearInterval(interValId);
        var userpick = $(this).attr('data-answer');
        var answer =  triviaQuestion[questions].answer;
        if(answer === userpick){
            score++;
            splash('win');
            setTimeout(newQuestion , 3*1000);
          console.log('win');
        }else{
            wrong++;
            splash('wrong');
            setTimeout(newQuestion , 3*1000);
            console.log('wrong');
        }

    } );

    function results(){
        
        var result = `
        <p class= r>You got ${score} questions correct</p>
        <p class= r>You got ${wrong} questions incorrect</p>
        <button class="btn btn-lg btn-success" id="reset">Reset Game</button>
        `;
        $('#game').html(result)
    }

        function splash(status){
                $("#time").empty();
                var correctChoice= triviaQuestion[questions].answer;

                if(status=== 'win'){
                    $('#game').html(`
                    <p class= s>Good Job</p>
                    <img src='${splashImage(correct)}'/>
                    `)

                }else{
                    $('#game').html(`
                    <p class= s>Incorrect</p>
                    <p class= s>The Correct answer is : <strong>${correctChoice}</strong></p>
                    <img src='${splashImage(incorrect)}'/>
                    `)
                }
        }

        function splashImage(images){
            var random = Math.floor(Math.random() * images.length);
            var randomImage = images[random];
            return randomImage;
        }
        $(document).on('click','#reset', function(){
             timer = 30;
             interValId = null;
             questions = 0;
             score =0; 
             wrong = 0;
             questionUp();
             choiceUp();
        });

$('#start').click(function(){
    $('#start').remove();
    $('#time').html(timer);
    questionUp();
    choiceUp();
});;