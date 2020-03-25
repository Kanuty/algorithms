function factorial(num){
  if(num === 1) return 1;
  return num * factorial(num-1)
}

console.log(factorial(4))

function factorialLoop(num){
  let result = 1
  for(let i = 1; i <= num; i += 1){
    result = result * i
  }
  return result
}

console.log(factorialLoop(4))
