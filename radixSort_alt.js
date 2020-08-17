const testArray = [11,1234,34,5,9,43,22,299,903,210,549,736,822,9,8,31,13,56,654,453,399,89,842,2904,920,994,-1]

// it doesn't work for negative numbers
// const getDigit = (number, digit) => {
//   const numberAsArray = number.toString().reverse().split('')  
//   return numberAsArray[digit]
// }

const getDigit = (number, digit) => {
  return Math.floor(Math.abs(number) / Math.pow(10, digit)) % 10;
}

// It doesn't work for negative numbers
// const getDigitLength = (number) => {
//   return number.toString().split('').length
// }

const getDigitLength = (number) => {
  if (number === 0) return 1;
  return Math.floor(Math.log10(Math.abs(number))) + 1;
}

const getMaxLengthOfNumberInArray = (arrayOfNumbers) => {
  let maxLengthOfNumber = 0;
  arrayOfNumbers.map(number => getDigitLength(number) > maxLengthOfNumber ? maxLengthOfNumber = getDigitLength(number) : null)
  return maxLengthOfNumber
}

const radixSort = (arrayOfNumbers) => {
  const maxIterations = getMaxLengthOfNumberInArray(arrayOfNumbers);
  for (let iteratableDigit = 0; iteratableDigit < maxIterations; iteratableDigit++){
    let buckets = Array.from({length: 10}, () => [])
    for (let iteration = 0; iteration < arrayOfNumbers.length; iteration++){
      buckets[getDigit(arrayOfNumbers[iteration],iteratableDigit)].push(arrayOfNumbers[iteration])
    }
    arrayOfNumbers = [].concat(...buckets);
  }
  return arrayOfNumbers 
}

radixSort(testArray)

