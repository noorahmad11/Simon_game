var gamePattern = [];
var userclickPattern = [];
var buttonColors=["red","blue","green","yellow"];
var level=0;
var start=false;


$(document.body).keypress(function(){
  if(!start){
  start=true;
  $("h1").text("level"+level);
  nextSequence();}
});


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

 async function nextSequence(){
  level++;
  $("h1").text("level "+level);
  userclickPattern=[];
  var rnum = Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[rnum];
  gamePattern.push(randomChosenColor);
    for(var i=0;i<gamePattern.length;i++){
    await new Promise(resolve => setTimeout(resolve,400));
    animatePress(gamePattern[i]);
    playSound(gamePattern[i]);
  }
}





$(".btn").click(function(){
  userchosencolor =  this.id;
  userclickPattern.push(userchosencolor);

  animatePress(userchosencolor);
  checkAnswer(userclickPattern.length-1);
  });



function checkAnswer(currentlevel){
    if(userclickPattern[currentlevel]===gamePattern[currentlevel]){
      playSound(userchosencolor);
      if(userclickPattern.length===gamePattern.length){
        console.log("level change");
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else{
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over Press a key to start game ");
      setTimeout(function(){
      $("body").removeClass("game-over");
      },300);
      startOver();

    }

}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100)

}

function startOver(){
  level=0;
  gamePattern=[];
  start=false;
}
