// This array holds the words we are going to choose from. 
const words = ['london', 'paris', 'rome', 'berlin', 'havana', 'madrid'];

function chooseWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function blanksFromAnswer(answerWord) {
  let result = "";
  for (i in answerWord) {
    result += "_";
  }
  return result;
}

// finds where to change a letter if a correct letter has been guessed
function alterAt(n, c, originalString) {
  return originalString.substr(0, n) + c + originalString.substr(n + 1, originalString.length);
}

function guessLetter(letter, shown, answer) {
  let checkIndex = 0;
  checkIndex = answer.indexOf(letter);
  console.log(letter);
  console.log(checkIndex);
  while (checkIndex >= 0) {
    shown = alterAt(checkIndex, letter, shown);
    checkIndex = answer.indexOf(letter, checkIndex + 1);
  }
  return shown;
}

// induvidual parts

function drawHead() {
  $('.draw-area').append($('<div>').addClass("body-part head"));
}

function drawTorso() {
  $('.draw-area').append(
    $('<div>').addClass("body-part armbox").append(
      $('<div>').addClass("body-part torso")));
  $('.draw-area').append(
    $('<div>').addClass("body-part legbox").append(
      $('<div>').addClass("body-part pelvis")));
}

function drawLeftArm() {
  $('.armbox').prepend($('<div/>').addClass("body-part leftarm"));
}

function drawRightArm() {
  $('.armbox').prepend($('<div/>').addClass("body-part rightarm"));
}

function drawLeftLeg() {
  $('.legbox').prepend($('<div/>').addClass("leftleg"));
}

function drawRightLeg() {
  $('.legbox').prepend($('<div/>').addClass("body-part rightleg"));
}

const drawSequence = [drawHead, drawTorso, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg];

function wrongLetter(letter) {
  $('#wrong-letters').append(
    $('<span/>').addClass('guessed-letter').text(letter));
}

function resetUI() {
  $('.body-part').remove();
  $('.guessed-letter').remove();
  $('.shown-letter').remove();
}

function drawWord(answer) {
  for (i in answer) {
    $('.word-display').append(
      $('<span/>').addClass('shown-letter').html('&nbsp;'));
  }
}

function updateWord(answer) {
  $k = $('.shown-letter:first');
  for (i in answer) {
    if (answer.charAt(i) != '_') {
      $k.text(answer.charAt(i));
    } else {
      $k.html('&nbsp;');
    }
    $k = $k.next();
  }
}

// below is the game core functions
function resetGame() {
  resetUI();
  gameAnswer = chooseWord();
  gameShownAnswer = blanksFromAnswer(gameAnswer);
  hangmanState = 0;
  drawWord(gameShownAnswer);
}

$(document).ready(resetGame);

function win() {
  alert('You win! Play again?');
}

function lose() {
  alert('Better luck next time! Try again?');
}

function doKeypress() {
  let tempChar = $('#letter-input').val().toLowerCase();
  let tempString = "";
  $('#letter-input').val("");
  tempString = guessLetter(tempChar, gameShownAnswer, gameAnswer);
  if (tempString != gameShownAnswer) {
    updateWord(tempString);
    gameShownAnswer = tempString;
    if (gameShownAnswer === gameAnswer) {
      win();
    }
  } else {
    wrongLetter(tempChar);
    drawSequence[hangmanState++]();
    if (hangmanState === drawSequence.length) {
      lose();
    }
  }
}
// this takes the inputted character and checks if it's valid or not
$('#letter-input').keyup(doKeypress);

// "press to begin" button to reset the game
$(".reset").click(function() {
  resetGame();
});