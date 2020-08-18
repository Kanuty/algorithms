// There are n stairs, a person standing at the bottom wants to reach the top. The person can climb either 1 stair or 2 stairs at a time. Count the number of ways, the person can reach the top.
const fib = (number, memo = []) => {
	if (memo[number] !== undefined) return memo[number];
	if (number <= 1) return 1;
	let distinctWays = fib(number - 1, memo) + fib(number - 2, memo);
	memo[number] = distinctWays;
	return distinctWays;
}

// Version with Timeand Space Complexity O(1)
// phi = (a+b)/a = a/b(golden ratio)
const phi = (1 + Math.sqrt(5)) / 2
const fibPhi = number => Math.round(Math.pow(phi, (number + 1)) / Math.sqrt(5))

// Generalization of the Problem
//How to count the number of ways if the person can climb up to m stairs for a given value m. For example, if m is 4, the person can climb 1 stair or 2 stairs or 3 stairs or 4 stairs at a time.


