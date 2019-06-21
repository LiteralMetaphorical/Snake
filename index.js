$("body").hide();

//initialize canvas
let canvas = document.getElementById("canv");
let height = 300;
let width = 400;
canvas.height = height;
canvas.width = width;
$("#canvasdiv").css("height", height + "px");
$("#canvasdiv").css("width", width + "px");
c = canvas.getContext("2d");

window.onload = function() {
	$(".gameOver").hide();
	$("body").show();
}

//initialize game variables
let x = 0;
let y = 0;
let key; //last pressed key
let snakelength = 1;
let snakearr = [[0, 0]];
let foodarr = [50, 125];

//block snake from changing direction to the opposite direction, for example left -> right or up -> down
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

//start new game, reset variables
function newGame() {
	c.clearRect(0, 0, width, height);
	$(".gameOver").hide();
	x = 0;
	y = 0;
	key = 39;
	snakelength = 1;
	snakearr = [[0, 0]];
	foodarr = [50, 50];
	play();
}

//main game loop
function play() {
	let interval = setInterval(function() { //set main interval that updates canvas according to game state every 120 milliseconds
		c.clearRect(0, 0, width, height);
		c.fillStyle = "red";
		c.fillRect(foodarr[0] + 1, foodarr[1] + 1, 23, 23);
		c.fillStyle = "green";
		snakearr.splice(0, snakearr.length - snakelength);
		switch (key) { //check last pressed key and change snake direction
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
			c.fillRect(snakearr[i][0] + 1, snakearr[i][1] + 1, 23, 23); //draw snake cells according to current snakearr state
		}
		if (c.getImageData(x + 2, y + 2, 1, 1).data[1] !== 0) { //check if snake has folded in on itself, if yes game over
			snakelength++;
			$(".gameOver").html("<h2>GAME OVER</h2>");
			$(".gameOver").append("<h2>FINAL SCORE: " + (snakelength-2) + "</h2>");
			$(".gameOver").show();
			clearInterval(interval);
			c.clearRect(0, 0, width, height);
			return;
		}
		if (x > width - 25 || y > height - 25 || x < 0 || y < 0) { //check if snake has gone out of bounds, if yes game over
			snakelength++;
			$(".gameOver").html("<h2>GAME OVER</h2>");
			$(".gameOver").append("<h2>FINAL SCORE: " + (snakelength-2) + "</h2>");
			$(".gameOver").show();
			clearInterval(interval);
			c.clearRect(0, 0, width, height);
			return;
		}
		snakearr.push([x, y]);
		if (x === foodarr[0] && y === foodarr[1]) { //check if snake is eating food
			snakelength++;
			c.clearRect(foodarr[0] + 1, foodarr[1] + 1, 23, 23);
			c.fillRect(foodarr[0] + 1, foodarr[1] + 1, 23, 23);
			do { //place new piece of food on random spot on canvas not occupied by snake itself
				foodarr[0] = Math.floor(Math.random()*(width/25))*25;
				foodarr[1] = Math.floor(Math.random()*(height/25))*25;
			}
			while ((c.getImageData(foodarr[0] + 1, foodarr[1] + 1, 1, 1).data[2]) !== 0 || (c.getImageData(foodarr[0] + 1, foodarr[1] + 1, 1, 1).data[1]) !== 0);
			c.fillStyle = "red"; //set food fill color
		}
		c.fillStyle = "green"; //set snake fill color
		for (var i = 0; i < snakearr.length; i++) {
			c.fillRect(snakearr[i][0] + 1, snakearr[i][1] + 1, 23, 23);
		}
	}, 120);
}
