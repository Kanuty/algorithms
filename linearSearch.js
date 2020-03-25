//linear search
function linearSearch(arr, target){
  for(let i = 0; i < arr.length; i += 1){
    if(target === arr[i]) return i
  }
  return -1
}

console.log(linearSearch([10,15,20,25,30], 15))
console.log(linearSearch([9,8,7,6,5,4,3,2], 4))
console.log(linearSearch([100], 100))
console.log(linearSearch([100], 200))



//binary search
function binarySearch(arr, target) {
  let start = 0;;
  let end = arr.length -1;
  let middle = Math.floor(start + end) / 2;

  while(arr[middle] !== target) {
    if(target < arr[middle]){
      end = middle -1
    } else {
      start = middle +1
    }
    middle = Math.floor(start + end) / 2;
    if (middle === start && middle === end) return -1
  }
  return middle
}


console.log(binarySearch([2,5,6,9,13,15,28,29,30,31,32,33,34,34,35],39))
