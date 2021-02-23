
const start = document.getElementById('gamePanel-start');
const shuffle = document.getElementById('gamePanel-shuffle');
const reset = document.getElementById('gamePanel-reset');
const destroy = document.getElementById('gamePanel-delete');
const showCards = document.getElementById('gamePanel-show');
const gameField = document.getElementById('memoryField');
const winInfoField = document.getElementById('consoleField');
const gameInfo = document.getElementById('gameInfo');
const cardSlider = document.getElementById("NumberOfPairs");
const cardSliderOutput = document.getElementById("nextGamePairsDisplayer");
const foundedPairsField = document.getElementById("foundedPairs");

const cards = document.getElementsByClassName('memoryField__card');

cardSliderOutput.innerHTML = cardSlider.value;
cardSlider.oninput = () => cardSliderOutput.innerHTML = cardSlider.value;

// quantity of cards in game
// TODO: change quantity variable to an subscription object.
// let quantity = parseInt(cardSlider.value) || 12;
const quantity =  24;

const timeDisplayerAcrualise = (sec) => gameInfo.getElementsByTagName('p')[0].innerHTML = `You have ${sec} sec of fun!`;
const movesDisplayerActualise = () => gameInfo.getElementsByTagName('p')[1].innerHTML = `You have clicked ${moves} times this round`;
const foundPairsDisplayerActualise = () => gameInfo.getElementsByTagName('p')[2].innerHTML = `You have found ${winCount} ot ouf ${quantity/2} pairs`;
const wonQuantityDisplayerActualise = () => gameInfo.getElementsByTagName('p')[3].innerHTML = `You have won ${numberOfWins} times`;

const createArrayOfIDs = (numberOfCardPairs) => {
  const IDsArray = new Array(numberOfCardPairs * 2) // for each pair of cards we need 2 cards
    for (let i = 0; i < IDsArray.length; i += 1){
      IDsArray[i] = `card${i+1}` // +1 because Array indexes start at 0 and card indexes start at 1
    }
    return IDsArray;
};

const idsArray = createArrayOfIDs(quantity/2) //  array of 'IDs' for cards
const usedIdsArray = []; // container for used IDs in process of generaiting cards
const cardN = []; // array of created cards (divs)
const slicedRandArr = []; 
let foundedCardArr = [];

const winReq = quantity/2;
let winCount = 0; 
let lastPosition = 0;
let moves = 0;
const blank = '#FFF';
let numberOfWins = 0;

let matchCheaker = new Array(quantity).fill(0);
let alreadyMatched = new Array(quantity/2).fill(0);

start.addEventListener('click', () => startNewGame())
shuffle.addEventListener('click', () => reShuffle(quantity));
destroy.addEventListener('click', () => removeCards(quantity));
showCards.addEventListener('click', () => show());
reset.addEventListener('click', () => hardResetOfCards());

//WIP - this mechanism rewrite css style variables and set pseudorandom hexdecimal value to color variable --cardColorX.
//numberOfColors 12 represent number of hardcoded variables in css. Also it make a hard cap for possible card pairs. Their can't be more pairs than colors variables.
//TODO: Redesign color generator to create more independent (not dependent on numbers of css variables) mechanism. 
//TODO: Give player a choice to use pre defined set of colors or random one.
//TODO: Preper sets of cards for people with specific colorblindness (for example set of cards without yellowish hue)
//TODO: Generated colors sometimes don't have full hexdecimal value - ergo are transparent. 
const numberOfColors = 12;

const newCollors = () => {
  let randomColor;
  for(let i = 0; i < numberOfColors; i  += 1){
    randomColor = "#"+((1<<24)*Math.random()|0).toString(16);
    document.documentElement.style.setProperty(`--cardColor${i}`, randomColor);
  } 
}

const hardResetOfCards = () => {
	foundedCardArr = [];
	foundedPairsField.innerHTML = foundedCardArr;
  removeCards(quantity),
  reShuffle(quantity),
  newSettingOfCards(quantity),
  show();
}

const startNewGame = () => {
	foundedCardArr = [];
	foundedPairsField.innerHTML = foundedCardArr;
	newSettingOfCards(quantity),
  show();
}

const randomID = () => {
	const rand = idsArray[Math.floor(Math.random() * idsArray.length)];
	usedIdsArray.push(rand); //side effect of function -> think about how to refactor it
	const idIndex = idsArray.indexOf(rand);
	idsArray.splice(idIndex, 1);  // delete used IDs from IDs 
	return rand;
};

const newSettingOfCards = (quantityOfCards) => {
  newCollors();
	if ( idsArray.length === quantityOfCards) {
		for (let i = 0; i < quantityOfCards; i++) {
			let rand = randomID();
			let div = document.createElement('div');
			div.classList.add('memoryField__card'); //change div in card
			div.id = rand; //give it id drawn ID 
			div.classList.add(rand); //why? can't I use id?
			gameField.appendChild(div); 

			cardN[i] = document.getElementById(rand);
			//TODO: change this  abomination  of the solution! It work, but for what cost!? 
			slicedRandArr[i] = rand.slice(4) - 1; //abomination of the solution.
			cardN[i].addEventListener('click', () => cardComparision(slicedRandArr[i], i)
			);

      // This 'set disable' mechanism should be transfered in implementation of State design pattern. (This is tideos and bug-prone to set state of every button manually)
      start.disabled = true;
			shuffle.disabled = true;
			destroy.disabled = false;
			showCards.disabled = false;
      reset.disabled = false;
		}
	}
}
newSettingOfCards(quantity);

const reShuffle = (quantity) => {
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

const removeCards = (quantityOfCards) => {
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

//Main mechanism of the game
const cardComparision = (id, position) => {
	matchCheaker[id]++;
	moves++;
  movesDisplayerActualise();
  
	let matchInstanceCheaker = matchCheaker.reduce(function (a, b) {
		return a + b;
	});

	if (matchInstanceCheaker === 2) {
      for(let i = 0; i < matchCheaker.length; i+=2) {
        if (matchCheaker[0] === matchCheaker[1] && matchCheaker[0] === 1 && alreadyMatched[0] !== 1){
          cardN[position].style.background = blank;
          cardN[lastPosition].style.background = blank;
          winCount++;
          alreadyMatched[0]++;
					updateFoundPairs(lastPosition, position);
        }
        else if (matchCheaker[i] === matchCheaker[i+1] && matchCheaker[i] === 1 && alreadyMatched[i/2] !== 1){
          cardN[position].style.background = blank;
          cardN[lastPosition].style.background = blank;
          winCount++;
          alreadyMatched[i/2]++;
					updateFoundPairs(lastPosition, position);
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

const updateFoundPairs = (indexOld, indexCurrent) => {
	foundedCardArr.push(` ${(cardN[indexOld].id).toString()}`)
	foundedCardArr.push(` ${(cardN[indexCurrent].id).toString()}`)
	foundedPairsField.innerHTML = foundedCardArr;
	foundPairsDisplayerActualise();
}

const newWinInfo = (elementDOM) => {
  const paragraph = document.createElement('p');
  const textnode = document.createTextNode(`The memory is strong in you. You won in ${moves} clicks`);
  paragraph.appendChild(textnode);
  elementDOM.appendChild(paragraph);
}

//Show cards for x period of time
const show = () => {
	for (let i = 0; i < quantity; i++) {
		cards[i].classList.add('active' + slicedRandArr[i]);
	}

	setTimeout(function () {
		for (let i = 0; i < quantity; i++) {
			cards[i].classList.remove('active' + slicedRandArr[i]);
		}
	}, 3500);
}
//Show cards when game start
window.onload = show();

const resetGlobalFlags = () => {
	moves = 0;
	alreadyMatched = new Array(quantity/2).fill(0);
	winCount = 0;
	movesDisplayerActualise();
	foundPairsDisplayerActualise ();
	wonQuantityDisplayerActualise();
}

let present = 0;
const updateTime = setInterval(() => {
  present = present + 1;
	timeDisplayerAcrualise(present)
}, 1000);