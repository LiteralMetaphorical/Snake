$("body").hide();

var canvas = document.getElementById("canv");
var height = 300;
var width = 400;
canvas.height = height;
canvas.width = width;
$("#canvasdiv").css("height", height + "px");
$("#canvasdiv").css("width", width + "px");
c = canvas.getContext("2d");

window.onload = function() {
	$(".gameOver").hide();
	$("body").show();
}

var x = 0;
var y = 0;
var key;
var snakelength = 1;
var snakearr = [[0, 0]];
var foodarr = [50, 125];


function itemKeyDown(e) {
	if ((key === 39 || key === undefined) && e.keyCode === 37) {
		return;
	} else if (key === 37 && e.keyCode === 39) {
		return;
	} else if (key === 38 && e.keyCode === 40) {
		return;
	} else if (key === 40 && e.keyCode === 38) {
		return;
	} else {
    	key = e.keyCode;
	}
}

function newGame() {
	x = 0;
	y = 0;
	key = 39;
	snakelength = 1;
	snakearr = [[0, 0]];
	foodarr = [50, 50];
	play();
}

function play() {
	$(".gameOver").hide();
	c.clearRect(0, 0, width, height);
	var interval = setInterval(function() {
		c.clearRect(0, 0, width, height);
		c.fillStyle = "red";
		c.fillRect(foodarr[0] + 1, foodarr[1] + 1, 23, 23);
		c.fillStyle = "green";
		snakearr.splice(0, snakearr.length - snakelength);
		switch (key) {
			case undefined:
				x+=25;
				break;
			case 39:
				x+=25;
				break;
			case 37:
				x-=25;
				break;
			case 38:
				y-=25;
				break;
			case 40:
				y+=25;
				break;
		}
		for (var i = 0; i < snakearr.length; i++) {
			c.fillRect(snakearr[i][0] + 1, snakearr[i][1] + 1, 23, 23);
		}
		if (c.getImageData(x + 2, y + 2, 1, 1).data[1] !== 0) {
			snakelength++;
			$(".gameOver").html("<h2>GAME OVER</h2>");
			$(".gameOver").append("<h2>FINAL SCORE: " + (snakelength-2) + "</h2>");
			$(".gameOver").show();
			clearInterval(interval);
			c.clearRect(0, 0, width, height);
			return;
		}
		if (x > width - 25 || y > height - 25 || x < 0 || y < 0) {
			snakelength++;
			$(".gameOver").html("<h2>GAME OVER</h2>");
			$(".gameOver").append("<h2>FINAL SCORE: " + (snakelength-2) + "</h2>");
			$(".gameOver").show();
			clearInterval(interval);
			c.clearRect(0, 0, width, height);
			return;
		}
		snakearr.push([x, y]);
		if (x === foodarr[0] && y === foodarr[1]) {
			snakelength++;
			c.clearRect(foodarr[0] + 1, foodarr[1] + 1, 23, 23);
			c.fillRect(foodarr[0] + 1, foodarr[1] + 1, 23, 23);
			do {
				foodarr[0] = Math.floor(Math.random()*(width/25))*25;
				foodarr[1] = Math.floor(Math.random()*(height/25))*25;
			}
			while ((c.getImageData(foodarr[0] + 1, foodarr[1] + 1, 1, 1).data[2]) !== 0 || (c.getImageData(foodarr[0] + 1, foodarr[1] + 1, 1, 1).data[1]) !== 0);
			c.fillStyle = "red";
		}
		c.fillStyle = "green";
		for (var i = 0; i < snakearr.length; i++) {
			c.fillRect(snakearr[i][0] + 1, snakearr[i][1] + 1, 23, 23);
		}
	}, 120);
}