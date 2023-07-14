//const FRAMESKIPS = 25
const SCALE = 1
var c = document.getElementById("Canvas");
ctx = c.getContext("2d");

ctx.init = function() {
	//make the size changable as a parameter?
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	SCREENWIDTH = window.innerWidth;
	SCREENHEIGHT = window.innerHeight;
	//camera = new _camera(new _VECTOR3D(0,0,0));
	return true;
}

init = function() {
	ctx.init()

	CV = {dir:0,tt:0,val:1,delta:{x:null,y:null},pos:{x:Math.floor((SCREENWIDTH/SCALE)/2),y:Math.floor((SCREENHEIGHT/SCALE)/2)}};
	TURNIN = 1;//add 0.5 to this but floor the value when processing
	ctx.fillStyle = "white"

	loop();
}

isPrime = function(n) {
	//if (n==undefined || isNaN(n) || (n%1)!=0) {console.error("bro you gotta put a number");return false;}
	var to = Math.sqrt(n)
	for (var i=2;i<=to;i++) {
		if (!(n%i)) return false
	}
	return true
}

function onScreen(pos)
{
	return pos.x>0 && pos.x<SCREENWIDTH && pos.y>0 && pos.y<SCREENHEIGHT
}

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
}

draw = function() {//make the actual pos of the CV include scale to cut multiplication time
	if (onScreen(CV.pos) && isPrime(CV.val)) ctx.fillRect(CV.pos.x*SCALE,CV.pos.y*SCALE,SCALE,SCALE)
}

loop = function() {
	requestAnimationFrame(loop)
	for (var i=0;i<TURNIN;i++) {//draw stuff to the screen once everytime CV turns
		update()
		draw()
	}
}

window.onload = init;
