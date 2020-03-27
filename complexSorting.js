const randomTest = Array.apply(null, { length: 100000 }).map(
	Function.call,
	Math.random
);

function bigRandomTest(n) {
	if (n === 1) return randomTest;
	return randomTest.concat(bigRandomTest(n - 1));
}

//bubbleSort
function bubbleSort(arr) {
	let x = 0;
	while (x <= arr.length) {
		let noSwaps = true;
		for (let i = 0; i < arr.length - 1 - x; i += 1) {
			if (arr[i] > arr[i + 1]) {
				[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
				noSwaps = false;
			}
		}
		x++;
		if (noSwaps) break;
	}
	return arr;
}

//mergeSort
function mergeSort(arr) {
	if (arr.length <= 1) return arr;
	let mid = Math.floor(arr.length / 2);
	let left = mergeSort(arr.slice(0, mid));
	let right = mergeSort(arr.slice(mid));
	return merge(left, right);
}

function merge(arr1, arr2) {
	let results = [];
	let i = 0;
	let j = 0;
	while (i < arr1.length && j < arr2.length) {
		if (arr2[j] > arr1[i]) {
			results.push(arr1[i]);
			i += 1;
		} else {
			results.push(arr2[j]);
			j += 1;
		}
	}
	while (i < arr1.length) {
		results.push(arr1[i]);
		i += 1;
	}
	while (j < arr2.length) {
		results.push(arr2[j]);
		j += 1;
	}
	return results;
}

// check if array is sorted, nearly sorted or not sorted
//return -1 if not sorted, 0 if nearly sorted, 1 if sorted
function nearlySorted(arr) {
	let sorted = 1;
	for (let i = 0; i < arr.length - 1; i += 1) {
		if (arr[i] > arr[i + 1]) {
			sorted = 0;
			if (arr[i] > arr[i + 2]) {
				return -1;
			}
		}
	}
	return sorted;
}

function sort(arr) {
	console.log('input:', arr);
	const complexityCheck = nearlySorted(arr);
	console.log('complexity test', complexityCheck);
	if (complexityCheck === -1) return mergeSort(arr);
	if (complexityCheck === 0) return bubbleSort(arr);
	if (complexityCheck === 1) return arr;
	return console.log('sorting Error');
}

console.log(sort(bigRandomTest(100)));
