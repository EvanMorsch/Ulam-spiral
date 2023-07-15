isPrime = function(n) {
	let to = Math.sqrt(n)
	for (let i=2;i<=to;i++) {
		if (!(n%i)) return false
	}
	return true
}

onmessage = (e) => {
    if (isPrime(e.data[0])) postMessage(e.data);
};