var currGameSequence;
var numRight;
startGame();
console.log(currGameSequence);

function startGame() {
	currGameSequence = []; // Clear sequence for the new game
	numRight = 5;
	currGameSequence = generateRandomSequence(20);

	// Play the initial sequence for the player starting at 0
	playSequence(0, numRight);
}

// Play sequence from a starting currentButton
// for a specific number of turns (numTurns)
function playSequence(currentButton, numTurns) {
	if(currentButton >= numTurns) {
		return;
	}
	// Loop through each element in the sequence with a 0.5 second delay
	setTimeout(function() {
		nextTurn(currentButton);
		playSequence(++currentButton, numTurns);
	}, 500);
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