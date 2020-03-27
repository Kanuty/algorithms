const test = [1, 2, 3, 4, 18, 93, 26, 15, 87, 94, 33, 13, 12, 15];

function insertionSort(arr) {
	for (let i = 1; i < arr.length; i += 1) {
		let currentVal = arr[i];
		let j = i - 1;
		for (; j >= 0 && arr[j] > currentVal; j -= 1) {
			arr[j + 1] = arr[j];
		}
		arr[j + 1] = currentVal;
	}
	return arr;
}

console.log(
	insertionSort([1, 2, 3, 4, 18, 93, 26, 15, 87, 94, 33, 13, 12, 15])
);

// function bubbleSort(arr){
//   let x = 0
//   while (x <= arr.length){
//     let noSwaps = true;
//     for(let i = 0; i < arr.length-1-x; i += 1){
//       if (arr[i] > arr[i+1]){
//         [arr[i],arr[i+1]] = [arr[i+1],arr[i]];
//         noSwaps = false
//       }
//     }
//     x++
//     if(noSwaps) break;
//   }
//   return arr
// }

// console.log(bubbleSort(test))
// console.log(bubbleSort([1,2,4,3,5,6,7,8]))
// console.log(bubbleSort([2,4,6,8,10]))
// console.log(bubbleSort([3,4,2,5,6,1,7,8,9]))
