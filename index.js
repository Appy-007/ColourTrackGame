var userClickedPattern=[];
var gamePattern=[];
var buttonColours =["red","blue","green","yellow"];

var level=0;
var started=false;

document.addEventListener("keydown",function(){
    if(!started){
        $("h1").html("Level " +level);
        nextSequence();
        started=true;
    }    
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if( userClickedPattern.length === gamePattern.length ) {
            setTimeout(function(){
                nextSequence();
            }, 1000)
        } 
    } 
        else{
            var wrongAudio=new Audio("sounds/wrong.mp3");
            wrongAudio.play();
            $("body").addClass("game-over");
            $("#level-title").html("GAME OVER!! Press any key to restart");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200)
            startOver();
        }  
    
    
}

function nextSequence () {
   userClickedPattern=[];
   level++;
   var randomNumber=Math.floor(Math.random()*4);
   var randomChosenColour=buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   $("#level-title").html("Level "+level);
   playSound(randomChosenColour);
}
     
function playSound(name){
    var btnaudio=new Audio("sounds/"+name+".mp3");
    btnaudio.play();
}

function animatePress(randomChosenColour){
$("#"+randomChosenColour).addClass("pressed");
setTimeout(function(){
    $("#"+randomChosenColour).removeClass("pressed")
},100);
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}
