// Memoization
function fib(n, memo = []) {
	if (memo[n] !== undefined) return memo[n];
	if (n <= 2) return 1;
	let res = fib(n - 1, memo) + fib(n - 2, memo);
	memo[n] = res;
	return res;
}

console.log(fib(100));

// Tabulation

function fibT(n) {
	if (n <= 2) return 1;
	let fibNums = [0, 1, 1];
	for (var i = 3; i <= n; i += 1) {
		fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
	}
	return fibNums[n];
}
console.log(fibT(100));
