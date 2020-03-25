function bubbleSort(arr){
  let x = 0
  while (x <= arr.length){
    let noSwaps = true;
    for(let i = 0; i < arr.length-1-x; i += 1){
      if (arr[i] > arr[i+1]){
        [arr[i],arr[i+1]] = [arr[i+1],arr[i]];
        noSwaps = false
      }
    }
    x++
    if(noSwaps) break;
  }
  return arr
}

const dynamoTest = Array.from({length: 40}, () => Math.floor(Math.random() * 100));
// test = [1,2,3,4,18,93,26,15,87,94,33,13,12,15]
console.log(bubbleSort(dynamoTest))
