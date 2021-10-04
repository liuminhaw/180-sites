/* DropBricks_javascript.js -- JavaScript of Drop Bricks */

$(document).ready(function() {

	var stepCounts = 9;
	var score = 0;

	var imgSource = "../images/DropBricks/Brick_";
	var nextImgSource = "../images/DropBricks/NextBrick_";

	var arrBrick = [];
	var arrColor = [];
	var arrPreColor = [];
	var arrPairs = [];

	var pairBrick = [];

	var flag = true;	// This get to set if the brick can be clicked
	var gameFlag = true;	// To see if the game is still playing


	// Object to record pairs
	function pairs(inputStart, inputStop, inputColor)
	{
		this.start = inputStart;
		this.stop = inputStop;
		this.num = inputStop - inputStart + 1;
		this.color = inputColor;
	}

	// Preload images
	var preloadImage = [imgSource + "green.png", imgSource + "purple.png",
	    			imgSource + "red.png", imgSource + "white.png",
				imgSource + "yellow.png", nextImgSource + "green.png",
				nextImgSource + "purple.png", nextImgSource + "red.png",
				nextImgSource + "yellow.png"];
	var imgs = [];
	for (var i=0; i<preloadImage.length; i++)
	{
		imgs[i] = new Image();
		imgs[i].src = preloadImage[i];
	}  // End preload images

	// Get random color
	function randomColor() {
		var randomNumber = Math.floor((Math.random() * 4) + 1);

		switch (randomNumber)
		{
			case 1:	return "red";
				break;
			case 2: return "green";
				break;
			case 3: return "yellow";
				break;
			case 4: return "purple";
				break;
		}
	}

	// Function to remove bricks
	function removeBrick(inputIndex) {
		
		$(arrBrick[inputIndex]).remove();
		$(arrColor[inputIndex]).remove();

		arrBrick.splice(inputIndex, 1);
		arrColor.splice(inputIndex, 1);
		
		for (var i = inputIndex; i < arrBrick.length; i++)
		{
			$(arrBrick[i]).css("bottom", 40 * i);
		}
	}

	// Function to add bricks
	function addBrick(inputCount) {
		var content;
		arrBrick.length = 0;

		for (var i=inputCount; i>=0; i--)
		{
			content = "<img class='brickImg' src='" + imgSource +arrPreColor[inputCount - i] +
					".png' alt='Image of the brick' />";
			$("div.gameContainer").append(content);
			$("img.brickImg:last").css("bottom", 40 * (11 - i));
			arrColor.push(arrPreColor[inputCount - i]);
		}

		$("img.brickImg").each(function() {
			arrBrick.push(this);	
		});
	}

	// Function to do the dropping of the bricks
	function dropBrick(inputIndex) {
		for (var i=inputIndex; i<arrBrick.length; i++)
			$(arrBrick[i]).css("bottom", 40 * i);
	}  // End dropBrick

	// Function reload the next coming bricks
	function reload(inputCount) {
		var color;
		var num = 3;

		for (var i=0; i<=inputCount; i++)
		{
			color = randomColor();
			arrPreColor.shift();
			arrPreColor.push(color);
		}
		$("img.preImg").each(function() {
			$(this).attr("src", nextImgSource + arrPreColor[num] + ".png");	
			num--;
		});
	}  // End reload

	// Function to check and record if pairs exist
	function checkPairs() {
		var countSeries = 1;
		var pairCount = 0;
		var count = 0;
		pairBrick.length = 0;

		for (var i=1; i<arrColor.length; i++)
		{
			if (arrColor[i] == arrColor[i-1])	
			{
				countSeries++;
				if (countSeries == 3) {
					pairBrick[pairCount] = new pairs(i-2, null, arrColor[i]);
				}
				if (countSeries >= 3 && i == 11)
				{
					pairBrick[pairCount]["stop"] = i;
					pairBrick[pairCount]["num"] = pairBrick[pairCount]["stop"] - pairBrick[pairCount]["start"] + 1;
					pairCount++;
				}
			}
			else 
			{
				if (countSeries >= 3)	
				{
					pairBrick[pairCount]["stop"] = i - 1;
					pairBrick[pairCount]["num"] = pairBrick[pairCount]["stop"] - pairBrick[pairCount]["start"] + 1;
					pairCount++;
				}
				countSeries = 1;
			}
		}

		if (pairCount != 0)
		{
			animationBrick();
			setTimeout(function() {
				removePairs();
				dropBrick(0);
			}, 2000);
			setTimeout(function() {
				setScores(pairBrick);
				count = 11 - arrBrick.length;
				addBrick(count);
				reload(count);
				checkPairs();
			}, 2800);
		}
		else
		{
			flag = true;
		}

		pairCount = 0;
	}	// End checkPairs

	// Function to remove pairs of bricks in colors
	function removePairs() {
		var count = 0;
		var length = pairBrick.length;

		for (var i=0; i<length; i++)
		{
			if (pairBrick[i]["color"] == "white")
			{
				for (var j=pairBrick[i]["start"]; j<=pairBrick[i]["stop"]; j++)
				{
					$(arrBrick[j-count]).remove();
					$(arrColor[j-count]).remove();
				}
				arrBrick.splice(pairBrick[i]["start"] - count, pairBrick[i]["num"]);
				arrColor.splice(pairBrick[i]["start"] - count, pairBrick[i]["num"]);
				count += (pairBrick[i]["num"]);
			}
			else
			{
				addWhite(arrBrick[pairBrick[i]["stop"] - count], pairBrick[i]["stop"] - count);
				for (var j=pairBrick[i]["start"]; j<pairBrick[i]["stop"]; j++)
				{
					$(arrBrick[j-count]).remove();
					$(arrColor[j-count]).remove();
				}
				arrBrick.splice(pairBrick[i]["start"] - count, pairBrick[i]["num"]-1);
				arrColor.splice(pairBrick[i]["start"] - count, pairBrick[i]["num"]-1);
				count += (pairBrick[i]["num"] - 1);
			}
		}
	}  // End removePairs

	// Function control the bricks removing animation
	function animationBrick() {
		var length = pairBrick.length;
		
		for (var i=0; i<length; i++)
		{
			for (var j=pairBrick[i]["start"]; j<=pairBrick[i]["stop"]; j++)
			{
				$(arrBrick[j]).addClass("twinkle");
			}
		}
	}	// End animationBrick

	// Function that add a white brick when a pair of other colors is removed
	function addWhite(replaceObj, colorNumber) {
		arrColor[colorNumber] = "white";
		$(replaceObj).attr("src", imgSource + "white.png").css("opacity", "1").removeClass("twinkle");
	}  // End addWhite

	// Function to set number of steps left
	function setCountStep(inputFlag) {
		if (inputFlag == true)
			stepCounts--;
		$("div.steps p").text(stepCounts);
	}  // End setCountStep

	// Function to set scores of the game
	function setScores(inputArray) {
		var length = pairBrick.length;

		for (var i=0; i<length; i++)
		{
			if (pairBrick[i]["color"] == "white")
				$("div.score p").text(++score);
		}
	}  // End setScores


	// Initial the game
	$("img.brickImg").each(function() {
		var color = randomColor();

		$(this).attr("src", imgSource + color + ".png").css("bottom", 40 * arrBrick.length);

		arrBrick.push(this);
		arrColor.push(color);
	});

	$("img.preImg").each(function() {
		var color = randomColor();

		$(this).attr("src", nextImgSource + color + ".png");
		arrPreColor.unshift(color);
	});

	for (var i=4; i<=11; i++)
	{
		arrPreColor.push(randomColor());
	}


	$("div.gameContainer").on("click", "img.brickImg", function() {
		var index = arrBrick.indexOf(this);
		var color = arrColor[index];
		
		if (flag == true)	
		{
			flag = false;

			if (color == "white" && stepCounts<=7)
			{
				stepCounts += 2;
				setCountStep(false);
			}
			else if (color == "white" && stepCounts>7)
			{
				stepCounts = 9;
				setCountStep(false);
			}
			else
				setCountStep(true);

			if (stepCounts == 0)
			{
				$("div.gameOver").fadeIn(1400);
				gameFlag = false;
			}

			removeBrick(index);
			setTimeout(function() {
				addBrick(11 - arrBrick.length);
				reload(0);
			}, 800);
			setTimeout(function() {
				checkPairs();	
			}, 850);
		}
	});

	$("footer p:nth-of-type(3)").click(function() {
		if (gameFlag == false)
			$("div.gameOver").fadeToggle(800);
		$("div.instructionContainer").fadeToggle(800);
	});

	$("div.closeContainer h3").click(function() {
		if (gameFlag == false)
			$("div.gameOver").fadeIn(800);
		$("div.instructionContainer").fadeOut(800);	
	});
});
