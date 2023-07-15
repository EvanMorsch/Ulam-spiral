isPrime = function(n) {
	let to = Math.sqrt(n)
	for (let i=2;i<=to;i++) {
		if (!(n%i)) return false
	}
	return true
}

onmessage = (e) => {
    let curr = e.data[0]
    postMessage([isPrime(curr), e.data[1], e.data[2]]);
};