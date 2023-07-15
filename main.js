//const FRAMESKIPS = 25
const SCALE = 1
let c = document.getElementById("Canvas");
ctx = c.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
SCREENWIDTH = window.innerWidth;
SCREENHEIGHT = window.innerHeight;

myWorker = new Worker("worker.js");
toDraw = []

init = function() {
	CV = {dir:0,tt:0,val:1,delta:{x:null,y:null},pos:{x:Math.floor((SCREENWIDTH/SCALE)/2),y:Math.floor((SCREENHEIGHT/SCALE)/2)}};
	TURNIN = 1;//add 0.5 to this but floor the value when processing
	ctx.fillStyle = "white"

	loop();
}

isPrime = function(n) {
	let to = Math.sqrt(n)
	for (let i=2;i<=to;i++) {
		if (!(n%i)) return false
	}
	return true
}

function onScreen(x, y)
{
	return x>0 && x<SCREENWIDTH && y>0 && y<SCREENHEIGHT
}

myWorker.onmessage = (e) => {
	toDraw.push([e.data[1], e.data[2]])
};  

update = function() {
	CV.pos.x+=CV.delta.x
	CV.pos.y+=CV.delta.y
	CV.val++
	if (++CV.tt>=Math.floor(TURNIN)) {
		TURNIN+=0.5;
		CV.tt = 0;
		CV.dir=(CV.dir+(Math.PI/2))%(Math.PI*2)
		CV.delta.x=Math.cos(CV.dir)
		CV.delta.y=-Math.sin(CV.dir)
	}
	if (onScreen(CV.pos.x, CV.pos.y)) myWorker.postMessage([CV.val, CV.pos.x, CV.pos.y])
}

draw = function(x, y) {//make the actual pos of the CV include scale to cut multiplication time
	var curr
	console.log(toDraw.length)
	while(undefined != (curr = toDraw.pop())) 
	{
		ctx.fillRect(curr[0]*SCALE, curr[1]*SCALE, SCALE, SCALE)
	}
}

loop = function() {
	requestAnimationFrame(loop)
	for (var i=0;i<1000;i++) {//draw stuff to the screen once everytime CV turns
		update()
		draw()
	}
}

window.onload = init;
