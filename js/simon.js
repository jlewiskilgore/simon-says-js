var currGameSequence;
var numRight;
startGame();
console.log(currGameSequence);

function startGame() {
	currGameSequence = []; // Clear sequence for the new game
	numRight = 0;
	currGameSequence = generateRandomSequence(20);

	nextTurn();
}

function nextTurn() {
	var currentButton = currGameSequence[numRight];

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
	var audio = new Audio(audioFile);
	audio.play();
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