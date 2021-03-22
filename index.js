
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var level=0;var started=false;

userClickedPattern= [];

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  level=level+1;
  $("h1").text("level "+level);

}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(a)
{
  var audio = new Audio("sounds/" + a + ".mp3");
  audio.play();
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

$(document).keypress(
  function (e)
  {
    //alert(e.key);
    if(!started)
    {
      $("h1").text("level "+level);
      nextSequence();
      started=true;
    }
  }
);

function checkAnswer(len){
  if(gamePattern[len]==userClickedPattern[len])
  {
    console.log("success");
    if(userClickedPattern.length==gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text(" Game Over, Press Any Key to Restart ");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  level=0;
  started=false;
}