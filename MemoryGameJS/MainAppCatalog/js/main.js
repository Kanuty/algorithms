
const start = document.getElementById('gamePanel-start');
const shuffle = document.getElementById('gamePanel-shuffle');
const reset = document.getElementById('gamePanel-reset');
const destroy = document.getElementById('gamePanel-delete');
const showCards = document.getElementById('gamePanel-show');
const gameField = document.getElementById('memoryField');
const winInfoField = document.getElementById('consoleField');
const gameInfo = document.getElementById('gameInfo');

const cards = document.getElementsByClassName('memoryField__card');

const timeDisplayer = gameInfo.getElementsByTagName('p')[0].innerHTML = `You play this round X sec`;
const movesDisplayer = gameInfo.getElementsByTagName('p')[1].innerHTML = `You have fliped 0 times this round`;
const foundPairsDisplayer = gameInfo.getElementsByTagName('p')[2].innerHTML = `You have found X out of Y pairs`;
const wonQuantityDisplayer = gameInfo.getElementsByTagName('p')[3].innerHTML = `You have won 0 times`;

const movesDisplayerActualise = () => gameInfo.getElementsByTagName('p')[1].innerHTML = `You have fliped ${moves} times this round`;
const wonQuantityDisplayerActualise = () => gameInfo.getElementsByTagName('p')[3].innerHTML = `You have won ${numberOfWins} times`;


const createArrayOfIDs = (numberOfCardPairs) => {
  const IDsArray = new Array(numberOfCardPairs * 2) // for each pair of cards we need 2 cards
    for (let i = 0; i < IDsArray.length; i +=1){
      IDsArray[i] = `card${i+1}` // +1 because Array indexes start at 0 and card indexes start at 1
    }
    return IDsArray;
};

// quantity of cards in game
const quantity = 24;

const idsArray = createArrayOfIDs(quantity/2) //  array of 'IDs' for cards
const usedIdsArray = []; // container for used IDs in process of generaiting cards
const cardN = []; // array of created cards (divs)
const slicedRandArr = []; // ???

const winReq = quantity/2;
var winCount = 0;
var lastPosition = 0;
var moves = 0;
let blank = '#DDD';
var numberOfWins = 0;

let matchCheaker = new Array(quantity).fill(0);
let alreadyMatched = new Array(quantity/2).fill(0);

start.addEventListener('click', () => newSettingOfCards(quantity))
shuffle.addEventListener('click', () => reShuffle(quantity));
destroy.addEventListener('click', () => removeCards(quantity));
showCards.addEventListener('click', () => show());
reset.addEventListener('click', () => hardResetOfCards());

//setColors
const numberOfColors = 12-1;

const newCollors = () => {
  let randomColor;
  for(let i = 0; i < numberOfColors; i  += 1){
    randomColor = "#"+((1<<24)*Math.random()|0).toString(16);
    document.documentElement.style.setProperty(`--cardColor${i}`, randomColor);
  } 
}

const hardResetOfCards = () => {
  removeCards(quantity),
  reShuffle(quantity),
  newSettingOfCards(quantity)
  show()
}

const randomID = () => {
	const rand = idsArray[Math.floor(Math.random() * idsArray.length)];
	usedIdsArray.push(rand); //side effect of function -> think about how to refactor it
	const idIndex = idsArray.indexOf(rand);
	idsArray.splice(idIndex, 1);  // delete used IDs from IDs 
	return rand;
};

const newSettingOfCards = (quantity) => {
  newCollors();
	if ( idsArray.length === quantity) {
		for (let i = 0; i < quantity; i++) {
			let rand = randomID();
			let div = document.createElement('div');
			div.classList.add('memoryField__card'); //change div in card
			div.id = rand; //give it id drawn ID 
			div.classList.add(rand); //why? can't I use id?
			gameField.appendChild(div); 

			cardN[i] = document.getElementById(rand);
			slicedRandArr[i] = rand.slice(4) - 1; //wtf?
			cardN[i].addEventListener('click', () => cardComparision(slicedRandArr[i], i)
			);

      // This 'set disable' mechanism should be transfered in implementation of State design pattern. 
      start.disabled = true;
			shuffle.disabled = true;
			destroy.disabled = false;
			showCards.disabled = false;
      reset.disabled = false;
		}
	}
}

newSettingOfCards(quantity);

function reShuffle(quantity) {
	if (usedIdsArray.length === quantity) {
    //repopulate original idsArray 
		for (let i = 0; i < quantity; i++) { 
			let reRand = usedIdsArray[Math.floor(Math.random() * usedIdsArray.length)] 
			idsArray.push(reRand);
			let reIdIndex = usedIdsArray.indexOf(reRand);
			usedIdsArray.splice(reIdIndex, 1);

			start.disabled = false;
			shuffle.disabled = true;
			destroy.disabled = true;
		}
	}
}

function removeCards(quantityOfCards) {
	for (let i = 0; i < quantityOfCards; i+= 1) {
		cards[0].remove();
		resetGlobalFlags();
	}
  destroy.disabled = true;
  shuffle.disabled = false;
  showCards.disabled = true;
  reset.disabled = true;
}
//At a start  of the game:
start.disabled = true;
shuffle.disabled = true;

function cardComparision(id, position) {
	matchCheaker[id]++;
	moves++;
  movesDisplayerActualise();
  
	let matchInstanceCheaker = matchCheaker.reduce(function (a, b) {
		return a + b;
	});

	if (matchInstanceCheaker === 2) {
      for(let i = 0; i < matchCheaker.length; i+=2) {
        if (matchCheaker[0] === matchCheaker[1] && matchCheaker[0] === 1 && alreadyMatched[0] !== 1){
          cardN[position].style.backgroundColor = blank;
          cardN[lastPosition].style.backgroundColor = blank;
          winCount++;
          alreadyMatched[0]++;
        }
        else if (matchCheaker[i] === matchCheaker[i+1] && matchCheaker[i] === 1 && alreadyMatched[i/2] !== 1){
          cardN[position].style.backgroundColor = blank;
          cardN[lastPosition].style.backgroundColor = blank;
          winCount++;
          alreadyMatched[i/2]++;
        }}
		matchCheaker.fill(0);
	}
	lastPosition = position;

	if (winCount === winReq) {
		newWinInfo(winInfoField);
		showCards.disabled = true;
		resetGlobalFlags();
    numberOfWins += 1;
    wonQuantityDisplayerActualise();
	}
}

const newWinInfo = (elementDOM) => {
  const paragraph = document.createElement('p');
  const textnode = document.createTextNode(`The memory is strong in you. You won in  ${moves} clicks`);
  paragraph.appendChild(textnode);
  elementDOM.appendChild(paragraph);
}

function show() {
	for (let i = 0; i < quantity; i++) {
		cards[i].classList.add('active' + slicedRandArr[i]);
	}

	setTimeout(function () {
		for (let i = 0; i < quantity; i++) {
			cards[i].classList.remove('active' + slicedRandArr[i]);
		}
	}, 3500);
}

window.onload = show();

function resetGlobalFlags() {
	moves = 0;
	alreadyMatched = [0, 0, 0, 0, 0, 0];
	winCount = 0;
}