/* GreedySnake_javascirpt.js -- JavaScript of Greedy Snake */

$(document).ready(function() {
	
	var arrSnake = [];
	var objFood = new Object();	// Object to memorize the location of food
	var movement = "right";	// The current direction that the snake is moving 
	var startFlag = false;	// This determine whether the game has start 
	var startHoverFlag = false;	// This determine whether the mouse is hover on start button
	var score = 0;	// This record the temporary score
	var foodColor; 	// Record temporary color of the food
	var snakeColor = "rgb(211,211,211)";	// Record temporary color of the snake
	var snakeOpacity = 1;	//Record temporary opacity of the snake
	var speed = 100;	// The speed which the snake moves
	
	var mainPosition = $("main").offset();	// Get the top and left position of main
	var startButtonPosition = $("div.startContainer").offset();	// Get the top and left position of startButton
	var topOffset = startButtonPosition.top - mainPosition.top;	// The initial top position of snake
	var leftOffset = startButtonPosition.left - mainPosition.left;	// The initial left position of snake

	var snakeInterval;	// Use to set the initial movement of the snake
	
	// This make adjustment when the window's size changes
	var elementsProperty = {
		mainWidth: $("main").width(),
		mainHeight: $("main").height(),
		mainBorder: parseInt($("main").css("border-width")),
		startContainerWidth: $("div.startContainer").width(),
		startContainerHeight: $("div.startContainer").height()
	};

	// Object record the position of snake digit
	function snakeDigitPosition(inputTop, inputLeft) {
		this.object = $("div.snake").first();
		this.topPosition = inputTop;
		this.leftPosition = inputLeft;
	}

	// Get a random number between 0 to inputNumber
	function makeRandom(inputNumber) {
		return Math.floor(Math.random()*inputNumber);
	}

	// Make random food color
	function randomColor() {
		var number = makeRandom(10);
		if (0<=number && number<=3 ) 
		{ return "yellowgreen"; }
		else if (4<=number && number<=6)
		{ return "blue"; }
		else if (7<=number && number<=8)
		{ return "darkOrange"; }
		else
		{ return "red"; }

	}

	// Function initial before game start
	function initialSnake() {
		arrSnake = [];
		topOffset = topOffset - elementsProperty.mainBorder - 10;	// Initial the top position
		leftOffset = leftOffset - elementsProperty.mainBorder - 10;	// Initial the left position
		
		for (var i=5; i>=0; i--) {
			$("main").prepend("<div class='snake'></div>");
			arrSnake[i] = new snakeDigitPosition(topOffset, leftOffset);
			$(arrSnake[i].object).css({"left": arrSnake[i].leftPosition, "top": arrSnake[i].topPosition});
			leftOffset += 10;
		}
		
		topOffset = startButtonPosition.top - mainPosition.top;
		leftOffset = startButtonPosition.left - mainPosition.left;

		snakeInitialInterval();
	}

	// Move the snake with popping out the tail cell and place infront of the head cell
	function movingFunction(inputTopPosition, inputLeftPosition, inputFlag) {
		var objElement;
		
		if (inputFlag) {
			$("div.snake:last").remove(); 
		 	arrSnake.pop();
		}
		$("main").prepend("<div class='snake'></div>");
		objElement = new snakeDigitPosition(inputTopPosition, inputLeftPosition);
		$(objElement.object).css({"left": objElement.leftPosition, "top": objElement.topPosition});
		arrSnake.unshift(objElement);
	}

	// Function moving the snake
	function moveSnake(inputFlag) {
		var topPosition, leftPosition;

		switch (movement) {
			case "right":
				leftPosition = arrSnake[0].leftPosition + 10;
				topPosition = arrSnake[0].topPosition;
				movingFunction(topPosition, leftPosition, inputFlag);
				break;
			case "left":
				leftPosition = arrSnake[0].leftPosition - 10;
				topPosition = arrSnake[0].topPosition;
				movingFunction(topPosition, leftPosition, inputFlag);
				break;
			case "up":
				leftPosition = arrSnake[0].leftPosition;
				topPosition = arrSnake[0].topPosition - 10;
				movingFunction(topPosition, leftPosition, inputFlag);
				break;
			case "down":
				leftPosition = arrSnake[0].leftPosition;
				topPosition = arrSnake[0].topPosition + 10;
				movingFunction(topPosition, leftPosition, inputFlag);
				break;
		}
	}

	// Function of the snake movement before game started
	function snakeInitialInterval() {
		snakeInterval = setInterval(function() {
			moveSnake(true);
			if ((arrSnake[0].leftPosition == leftOffset + elementsProperty.startContainerWidth - elementsProperty.mainBorder) 
				&& (arrSnake[0].topPosition == topOffset - elementsProperty.mainBorder - 10)) {
				movement = "down";
			}
			else if ((arrSnake[0].leftPosition == leftOffset + elementsProperty.startContainerWidth - elementsProperty.mainBorder) 
					&& (arrSnake[0].topPosition == topOffset + elementsProperty.startContainerHeight - elementsProperty.mainBorder)) {
				movement = "left";
			}
			else if ((arrSnake[0].leftPosition == leftOffset - elementsProperty.mainBorder - 10) 
					&& (arrSnake[0].topPosition == topOffset + elementsProperty.startContainerHeight - elementsProperty.mainBorder)) {
				movement = "up";
			}
			else if ((arrSnake[0].leftPosition == leftOffset - elementsProperty.mainBorder - 10) 
					&& (arrSnake[0].topPosition == topOffset - elementsProperty.mainBorder - 10)) {
				movement = "right";
			}
			if (!startHoverFlag) {
				$("div.snake").css({"background-color": "rgb(211,211,211)", "opacity": "1"});
			}
			else {
				$("div.snake").css({"background-color": "rgb(123,123,123)", "opacity": "1"});
				$(arrSnake[1].object).css("background-color", "rgb(211,211,211)");
				$(arrSnake[3].object).css("background-color", "rgb(211,211,211)");
			}
		}, 120);
	}

	// Function of the snake movement after game started
	function snakeStartInterval() {
		snakeInterval = setInterval(function() {
			moveSnake(true);
			$("div.snake").css({"background-color": "rgb(123,123,123)", "opacity": snakeOpacity});
			changeSnakeColor();
			checkEatFood();
			snakeDie();
		}, speed);
	}

	// Function use when got the food
	function addSnakeInterval(inputCount) {
		snakeInterval = setInterval(function() {
			inputCount++;
			moveSnake(false);
			$("div.snake").css({"background-color": "rgb(123,123,123)", "opacity": snakeOpacity});
			changeSnakeColor();
			checkEatFood();
			snakeDie();
			
			if (inputCount == 2) {
				clearInterval(snakeInterval);
				snakeStartInterval();
			}
		}, 100);
	}

	// Function that create food
	function createFood() {
		objFood.xPosition = makeRandom(Math.floor(elementsProperty.mainWidth/10)) * 10;
		objFood.yPosition = makeRandom(Math.floor(elementsProperty.mainHeight/10)) * 10;
		if (checkFood()) {
			createFood();
		} 
		else {
			$("main").append("<div class='food'></div>");
			$("div.food").css({"left": objFood.xPosition, "top": objFood.yPosition});
			foodColor = randomColor();
			$("div.food").css("background", "radial-gradient(circle, white, " + foodColor + ")");
		} 
	}

	// Function check if the food has the same position to the snake
	function checkFood() {
		for (var i=1; i<arrSnake.Length; i++) {
			if (objFood.xPosition == arrSnake[i].leftPosition && objFood.yPosition == arrSnake[i].topPosition) {
				return true;
			}
		}
		return false;
	}

	// Function use when the snake get the food
	function checkEatFood() {
		var previousScore;
		if (arrSnake[0].topPosition == objFood.yPosition && arrSnake[0].leftPosition == objFood.xPosition) {
			clearInterval(snakeInterval);
			addSnakeInterval(0);
			$("div.food").remove();
			previousScore = score;
			snakeColor = foodColor;
			addScore();
			if (score%200 > previousScore%200)
			{ showScoreContainer(); }
			else
			{ showSubmain(); }
			changeSpeed(previousScore);
			changeOpacity(previousScore);
			createFood();
		}
	}

	// Function adding score when the snake gets the food
	function addScore() {
		switch (foodColor) {
			case "yellowgreen":
				score += 25;
				break;
			case "blue":
				score += 50;
				break;
			case "darkOrange":
				score += 75;
				break;
			case "red":
				score += 100;
				break;
		}
	}	

	// Function changing speed
	function changeSpeed(inputPreviousScore) {
		if (speed > 40) {
			if (Math.floor(inputPreviousScore/100) < Math.floor(score/100)) {
				speed -= 10;
			}
		}
	}

	// Function changing snake body's opacity
	function changeOpacity(inputPreviousScore) {
		if (snakeOpacity > 0) {
			if (Math.floor(inputPreviousScore/100) < Math.floor(score/100)) 
			{ 
				snakeOpacity = (snakeOpacity - 0.1).toFixed(1); 
			}
		}	
	}

	// Function changing the color of the snake
	function changeSnakeColor() {
		for (var i=9; i<arrSnake.length; i+=10) {
			$(arrSnake[i].object).css({"background-color": snakeColor, "opacity": "1"});
		}	
		$(arrSnake[1].object).css({"background-color": snakeColor, "opacity": "1"});
		$(arrSnake[3].object).css({"background-color": snakeColor, "opacity": "1"});
		$(arrSnake[0].object).css("opacity", "1");
	}

	// Function that check if game over
	function snakeDie() {
		for (var i=1; i<arrSnake.length; i++) {
			if (arrSnake[0].topPosition == arrSnake[i].topPosition && arrSnake[0].leftPosition == arrSnake[i].leftPosition) { 
				clearInterval(snakeInterval); 
				$("div.snake").css("opacity", "1");
				$("div.finishContainer").fadeIn(600);
				$("div.finishContainer h2:nth-of-type(2)").text(score);
				$("div.finishContainer h2 span").css("color", snakeColor);
			}
		}
		if (arrSnake[0].topPosition < 0 || arrSnake[0].leftPosition < 0 || 
		    arrSnake[0].leftPosition > elementsProperty.mainWidth - elementsProperty.mainBorder ||
		    arrSnake[0].topPosition > elementsProperty.mainHeight - elementsProperty.mainBorder) 
		{ 
			clearInterval(snakeInterval); 
			$("div.snake").css("opacity", "1");
			$("div.finishContainer").fadeIn(600);
			$("div.finishContainer h2:nth-of-type(2)").text(score);
			$("div.finishContainer h2 span").css("color", snakeColor);
		}

	}

	// Function shows scores everytime when the snake eat a food
	function showScoreContainer() {
		$("div.scoreContainer").html("<p>score " + score + "</p>").animate({"opacity": "1"}, 600);
		$("div.scoreContainer").animate({"opacity": "0"}, 900);
	}

	// Function shows big score every 200 points
	function showSubmain() {
		$("div.submainBottom h3").text(score);
		$("div.submainTop, div.submainBottom").css("display", "block").animate({"opacity": "1"}, 1500);
		$("div.submainTop, div.submainBottom").delay(500).animate({"opacity": "0"}, 1500);
	}

	initialSnake();


	// Make GREEDY into HOMEPAGE button
	$("section.leftSection h1").hover(function() {
		$(this).html("H<br>O<br>M<br>E<br>P<br>A<br>G<br>E")
			.css({"font-size": "65px", "color": "grey", "padding-top": "20px"});
	}, function() {
		$(this).html("G<br>R<br>E<br>E<br>D<br>Y")
			.css({"font-size": "90px", "color": "black", "padding-top": "10px"});
	});

	// Make SNAKE into BLOG button
	$("section.rightSection h1").hover(function() {
		$(this).html("B<br>L<br>O<br>G")
			.css({"color": "grey", "padding-top": "60px"});
	}, function() {
		$(this).html("S<br>N<br>A<br>K<br>E")
			.css({"color": "black", "padding-top": "10px"});
	});

	// Start button effects
	$("div.startContainer h2").hover(function() {
		startHoverFlag = true;
	}, function() {
		startHoverFlag = false;
	}).click(function() {
		startFlag = true;
		$("div.startContainer").animate({
			"marginTop": "200px",
			"opacity": "0"
		}, 1400);
		$("div.startContainer").animate({"height": "hide"}, 0);

		clearInterval(snakeInterval);
		snakeStartInterval();
		createFood();
	});

	$(document).keydown(function(event) {
		if (startFlag) {
			if (event.which==37 && movement!="right") 
			{ movement = "left"; }
			else if (event.which==38 && movement!="down")
			{ movement = "up"; }
			else if (event.which==39 && movement!="left")
			{ movement = "right"; }
			else if (event.which==40 && movement!="up")
			{ movement = "down"; }
		}
	});

});	// end ready
