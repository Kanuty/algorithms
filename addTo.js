function addUpto(n){
let result = 0;
for (let i = 1; i <= n; i += 1){result += i}
return result
}

let t1 = performance.now();
addUpto(2000000000)
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2-t1) / 1000}s.`)

function betterAddUpto(n) {return n*(n+1)/2}

t1 = performance.now();
betterAddUpto(2000000000)
t2 = performance.now();
console.log(`Time Elapsed: ${(t2-t1) / 1000}s.`)
