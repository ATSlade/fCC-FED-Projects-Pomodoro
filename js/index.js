  
$(document).ready(function() {

var workTime = 25;
var breakTime = 5;
var workTimeSeconds = workTime * 60;
var breakTimeSeconds = breakTime * 60;
var countdown;

// INITIAL SET-UP
var presetWork = document.getElementById('preset-work');
presetWork.innerHTML = workTime;

var presetBreak = document.getElementById('preset-break');
presetBreak.innerHTML = breakTime;

var timer = document.getElementById('timer');
timer.innerHTML = workTime + ":00";


// CORE CLOCK FUNCTIONALITY
function tickTock(seconds) {
   var clockMinutes = parseInt(seconds / 60);
   var clockSeconds = seconds % 60;

  if (clockSeconds < 10) {
     timer.innerHTML = clockMinutes + ":0" + clockSeconds;
   } else {
     timer.innerHTML = clockMinutes + ":" + clockSeconds; 
   }
}   

   
// CLOCK ADJUSTMENT CONTROL BUTTONS
$("#inc-work").click(increaseWorkTime);
$("#dec-work").click(decreaseWorkTime);
$("#dec-break").click(decreaseBreakTime);
$("#inc-break").click(increaseBreakTime);

$("#startWorkButton").click(beginWork);  
$("#pauseWorkButton").click(pauseWork);
$("#resetWorkButton").click(resetWork);

$("#startBreakButton").click(beginBreak);  
$("#pauseBreakButton").click(pauseBreak);
$("#resetBreakButton").click(resetBreak);

$("#defaultSetButton").click(resetToDefaults);   

// CLOCK ADJUSTMENT CONTROL FUNCTIONS
function increaseWorkTime() {
  workTime++;
  workTimeSeconds = workTime * 60;
  presetWork.innerHTML = workTime;
}

function decreaseWorkTime() {
  workTime--;
  if (workTime < 1) {
     workTime = 1;
  }   
  workTimeSeconds = workTime * 60;
  presetWork.innerHTML = workTime;
}

function increaseBreakTime() {
  breakTime++;
  breakTimeSeconds = breakTime * 60;
  presetBreak.innerHTML = breakTime;
}

function decreaseBreakTime() {
  breakTime--;
  if (breakTime < 1) {
     breakTime = 1;
  }   
  breakTimeSeconds = breakTime * 60;
  presetBreak.innerHTML = breakTime;
}

function playSound(url) {
   var sound = new Audio('http://www.oringz.com/oringz-uploads/3a_1-128.mp3');
   sound.play();
}   
   
// BEGINNING WORK
function beginWork() {
  clearInterval(countdown);

  countdown = setInterval(function() {
    tickTock(workTimeSeconds);

    if (workTimeSeconds === 0) {
      clearInterval(countdown);
      playSound(); 
      timer.innerHTML = 'Break!';       
      breakTimeSeconds = breakTime * 60;
      beginBreak();
    } else workTimeSeconds--;
  }, 1000);
    workButtons();
}

   
// PAUSE WORK
function pauseWork() {
  clearInterval(countdown);
  //$("#startSessionButton").val = Resume; // Graphic here!
}
  
// RESET WORK
function resetWork() {
  workTimeSeconds = workTime * 60; 
  timer.innerHTML = workTime + ':00';
  startWorkButton.innerHTML = 'start'; // use "start-button" here too?
}   

// BEGINNING A BREAK
 function beginBreak() {
   clearInterval(countdown);
   countdown = setInterval(function() {
      tickTock(breakTimeSeconds);

      if (breakTimeSeconds === 0) {
         clearInterval(countdown);
         playSound();
         timer.innerHTML = 'Work!';
         workTimeSeconds = workTime * 60;
         beginWork();
         } else
            breakTimeSeconds--;
      }, 1000);
      breakButtons();
}  

// PAUSE BREAK
function pauseBreak() {
  clearInterval(countdown);
  //$("#startBreakButton").innerHTML = 'resume';  // Graphic Here!
}

   
// RESET BREAK
function resetBreak() {
  pauseBreak();
  breakTimeSeconds = breakTime * 60; 
  timer.innerHTML = breakTime + ':00';
  startBreakButton.innerHTML = 'start';  // Can I use "start-button" here?
}

function resetToDefaults() {
   // code
   pauseBreak();
   workTime = 25;
   breakTime = 5;
   
   workTimeSeconds = workTime * 60;
   presetWork.innerHTML = workTime;

   breakTimeSeconds = breakTime * 60;
   presetBreak.innerHTML = breakTime;
   
   timer = document.getElementById('timer');
timer.innerHTML = workTime + ":00";
}
   
// BUTTON DISPLAY VISIBILITY   
function workButtons() {
  $(document).ready(function() {
    $("#workButtonBox").show(); 
    $("#pauseWorkButton").show();
    $("#startWorkButton").show();
    $("#resetWorkButton").show();
    $("#breakButtonBox").hide();
  });
}   

function breakButtons() {
   $(document).ready(function() {
      $("#workButtonBox").hide();
      $("#breakButtonBox").show();
      $("#pauseBreakButton").show();
      $("#startBreakButton").show();
      $("#resetBreakButton").show();
   });
 }     
 $("#breakButtonBox").hide(); 
  
});