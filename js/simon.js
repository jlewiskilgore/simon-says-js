var currGameSequence;
var isStrictMode = 0; // Strict Starts Off
var numRight;
var userGuess;
startGame();

function startGame() {
	currGameSequence = []; // Clear sequence for the new game
	numRight = 0;
	userGuess = 0;
	currGameSequence = generateRandomSequence(20);

	console.log(currGameSequence); // for DEBUG

	// Play the initial sequence for the player starting at 0
	playSequence(0, 1);
}

function toggleStrictMode() {
	if($('#strict-mode-btn').is(':checked')) {
		isStrictMode = 1;
	}
	else {
		isStrictMode = 0;
	}
}

// Play sequence from a starting currentButton
// for a specific number of turns (numTurns)
function playSequence(currentButton, numTurns) {
	disableButtons();
	if(currentButton >= numTurns) {
		enableButtons();
		return;
	}
	// Loop through each element in the sequence with a 0.8 second delay
	setTimeout(function() {
		nextTurn(currentButton);
		playSequence(++currentButton, numTurns);
	}, 800);
}

function disableButtons() {
	$('#green-btn').prop('disabled', true);
	$('#red-btn').prop('disabled', true);
	$('#yellow-btn').prop('disabled', true);
	$('#blue-btn').prop('disabled', true);
}

function enableButtons() {
	$('#green-btn').prop('disabled', false);
	$('#red-btn').prop('disabled', false);
	$('#yellow-btn').prop('disabled', false);
	$('#blue-btn').prop('disabled', false);
}

function nextTurn(turnNum) {
	var currentButton = currGameSequence[turnNum];

	switch(currentButton) {
		case 0:
			pressColorButton('green');
			break;
		case 1:
			pressColorButton('red');
			break;
		case 2:
			pressColorButton('yellow');
			break;
		case 3:
			pressColorButton('blue');
			break;
	}
}

function getUserChoice(buttonNum, buttonColor) {
	// Light up and play user's button choice
	pressColorButton(buttonColor);

	// Check if this button matches, mark as corrent guess
	if(buttonNum == currGameSequence[userGuess]) {
		console.log("right!");
		userGuess++;
		if(userGuess == numRight+1) {
			console.log("All Right!! Get next sequence!");
			numRight++;
			userGuess = 0; // Reset guess count for next sequence
			playSequence(0, numRight+1); // Play new sequence
		}
	}
	// Else, user is wrong
	else {
		console.log("wrong...");
		userGuess = 0;
		// If regular mode
		if(!isStrictMode){
			playSequence(0, numRight+1); // Replay same sequence
		}
		// If strict mode, game is over
		else if(isStrictMode) {
			startGame(); // Restart Game;
		}
	}

	// Check what to do with the guess result
	

}

function pressColorButton(color) {
	var audioFile = "sounds/";
	var buttonId = '#'+color+'-btn'; // Use for
	switch(color) {
		case 'green':
			audioFile += 'simonSound1.mp3';
			break;
		case 'red':
			audioFile += 'simonSound2.mp3';
			break;
		case 'yellow':
			audioFile += 'simonSound3.mp3';
			break;
		case 'blue':
			audioFile += 'simonSound4.mp3';
			break;
	}
	// Turn button "on" and play the associated sound file
	$(buttonId).css({"opacity": "1"});
	var audio = new Audio(audioFile);
	audio.play();

	// Hold button "on" for 0.5 seconds and reset opacity to turn "off"
	setTimeout(function(){ $(buttonId).css({"opacity": "0.5"}); }, 500);
}

/* 
* Generate an array of numElements random numbers 0 to 3 where:
* 0 = Green
* 1 = Red
* 2 = Yellow
* 3 = Blue
*/
function generateRandomSequence(numElements) {
	var sequence = [];
	var nextNum;

	for(var i = 0; i < numElements; i++) {
		nextNum = Math.floor(Math.random() * 4);
		sequence.push(nextNum);
	}

	return sequence;
}