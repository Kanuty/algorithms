//pseudorandom integer between 0 and 10 mln
function randomInteger() {
	return Math.floor(Math.random() * 10000000);
}

const randomTestInteger = Array.apply(null, { length: 100000 }).map(
	Function.call,
	randomInteger
);

function bigRandomTestInteger(n) {
	if (n === 1) return randomTestInteger;
	return randomTestInteger.concat(bigRandomTestInteger(n - 1));
}

function getDigit(num, i) {
	return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
	if (num === 0) return 1;
	return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(arr) {
	let maxDigits = 0;
	for (let i = 0; i < arr.length; i++) {
		maxDigits = Math.max(maxDigits, digitCount(arr[i]));
	}
	return maxDigits;
}

function radixSort(arr) {
	let maxDigitsCount = mostDigits(arr);
	for (let k = 0; k < maxDigitsCount; k += 1) {
		let digitBuckets = Array.from({ length: 10 }, () => []);
		for (let i = 0; i < arr.length; i += 1) {
			digitBuckets[getDigit(arr[i], k)].push(arr[i]);
		}
		arr = [].concat(...digitBuckets);
	}
	return arr;
}

console.log(radixSort(bigRandomTestInteger(10)));
