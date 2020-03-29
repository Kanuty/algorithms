const test = [1, 2, 3, 4, 18, 93, 26, 15, 87, 94, 33, 13, 12, 15];
const randomTest = Array.apply(null, { length: 100000 }).map(
	Function.call,
	Math.random
);

function pivot(arr, start = 0, end = arr.length + 1) {
	let pivot = arr[start];
	let swapIdx = start;

	for (let i = start + 1; i < arr.length; i += 1) {
		if (pivot > arr[i]) {
			swapIdx += 1;
			swap(arr, swapIdx, i);
		}
	}
	swap(arr, start, swapIdx);
	return swapIdx;
}

function swap(array, i, j) {
	let temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
	if (left < right) {
		let pivotIndex = pivot(arr, left, right);
		quickSort(arr, left, pivotIndex - 1);
		quickSort(arr, pivotIndex + 1, right);
	}
	return arr;
}

console.log(quickSort(randomTest));
