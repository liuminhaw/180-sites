/* LighttheLight_javascript.js -- JavaScript of Light the Light */

$(document).ready(function() {

	var leftColumn = [], rightColumn = [];
	var leftRow = [], rightRow = [];
	var leftNode = [], rightNode = [];
	var arrayLight = [];

	var color = "rgb(64,158,199)";
	var activeClass = $("div.color:nth-of-type(6)");

	var book = [];

	// To see if the light is need to be turned on or off
	var objLight = {
		first: false,
		second: false,
		third: false,
		fourth: false,
		fifth: false
	}

	// Initialize book array
	for (var i=0; i<25; i++)
	{
		book[i] = 0;
	}

	// Function for finding which light is connected to the power
	function findRoad(nodeSet, inputNode, inputDirection, oppositeSide, thisSide) {
		var thisDirection = ["Top", "Right", "Bottom", "Left"];
		var nextDirection = ["Bottom", "Left", "Top", "Right"];
		var moves = [];
		var index = nodeSet.indexOf(inputNode);
		var defaultColor = $(inputNode).children("div.node_"+inputDirection).css("background-color");
		var getColor;

		if (oppositeSide == "Right")
		{ moves = [-5, 1, 5, -1]; }
		else
		{ moves = [5, -1, -5, 1]; }

		if (index%5==4 && defaultColor==$(inputNode).children("div.node_" + oppositeSide).css("background-color"))
		{ 
			switch (index)
			{
				case 4:
					if (oppositeSide == "Right")
					{ objLight.first = true; }
					else
					{ objLight.fifth = true; }
					break;
				case 9:
					if (oppositeSide == "Right")
					{ objLight.second = true; }
					else
					{ objLight.fourth = true; }
					break;
				case 14: 
					objLight.third = true;
					break;
				case 19: 
					if (oppositeSide == "Right")
					{ objLight.fourth = true; }
					else
					{ objLight.second = true; }
					break;
				case 24: 
					if (oppositeSide == "Right")
					{ objLight.fifth = true; }
					else
					{ objLight.first = true; }
					break;
			}	
		}

		for (var i=0; i<thisDirection.length; i++)
		{
			if ((index%5==4 && thisDirection[i]==oppositeSide) || (index%5==0 && thisDirection[i]==thisSide))
			{ i++; }
			if ((inputDirection!=thisDirection[i]) && (index+moves[i]>=0) && (index+moves[i]<25))
			{
				getColor = $(inputNode).children("div.node_"+thisDirection[i]).css("background-color");
				if (defaultColor == getColor && book[index+moves[i]] == 0)
				{
					book[index] = 1;
					findRoad(nodeSet, nodeSet[index+moves[i]], nextDirection[i], oppositeSide, thisSide);
				}
			}
		}

		return;
	} // End findRoad

	// Function react when the light is turned on
	function lightOn(inputItem, inputColor) {
		var originBackground = $(inputItem).css("background");
		var originBorder = $(inputItem).css("border-color");

		$(inputItem).css({"background": "radial-gradient(circle, #3C3C3C, " + inputColor + ")",
			"border-color": inputColor});
		setTimeout(function() {
			$(inputItem).css({"background": originBackground,
				"border-color": originBorder});
		}, 300);
		setTimeout(function() {
			$(inputItem).css({"background": "radial-gradient(circle, #3C3C3C, " + inputColor + ")",
				"border-color": inputColor});	
		}, 450);
		setTimeout(function() {
			$(inputItem).css({"background": originBackground,
				"border-color": originBorder});
		}, 500);
		setTimeout(function() {
			$(inputItem).css({"background": "radial-gradient(circle, #3C3C3C, " + inputColor + ")",
				"border-color": inputColor});	
		}, 600);
	}

	// Function react when the light is turned off
	function lightOff(inputItem) {
		$(inputItem).css({"background": "radial-gradient(circle, #3C3C3C, #3C3C3C)", 
			"border-color": "white"});
	}

	// Put div.left_Column into leftColumn array
	$("div.left_Column").each(function() {
		leftColumn.push(this);
	});

	// Put div.left_Row into leftRow array
	$("div.left_Row").each(function() {
		leftRow.push(this);
	});

	// Put div.right_Column into rightColumn array
	$("div.right_Column").each(function() {
		rightColumn.unshift(this);
	})

	// Put div.right_Row into rightRow array
	$("div.right_Row").each(function() {
		rightRow.unshift(this);
	});

	// Get the nodes into array
	$("div.left_Node").each(function() {
		leftNode.push(this);
	});

	$("div.right_Node").each(function() {
		rightNode.unshift(this);
	});

	// Put lights into array
	$("div.light").each(function() {
		arrayLight.push(this);
	});

	// Choose wire color
	$("div.color").click(function() {
		color = $(this).css("background-color");
		activeClass.removeClass("color_Active");
		activeClass = $(this);
		activeClass.addClass("color_Active");
	});

	// Change the wire's color
	$("div.left_Column, div.right_Column, div.left_Row, div.right_Row").click(function() {
		if (color == "rgb(206, 206, 206)")
		{ $(this).children("div").css("background-color", "rgb(114, 114, 114)"); }
		else
		{ $(this).children("div").css("background-color", color); }
	});

	// Response when clicking on wires
	$("div.left_Column").click(function() {
		var getNum = $(this).attr("data-count");
		if (color == "rgb(206, 206, 206)")
		{
			$(leftNode[Number(getNum)]).children("div.node_Right").css("background-color", "");
			$(leftNode[Number(getNum)+1]).children("div.node_Left").css("background-color", "");
		}
		else
		{
			if (Number(getNum) % 5 != 4)
			{
		       		$(leftNode[Number(getNum)]).children("div.node_Right").css("background-color", color); 
				$(leftNode[Number(getNum)+1]).children("div.node_Left").css("background-color", color);
			}
			else 
			{ $(leftNode[Number(getNum)]).children("div.node_Right").css("background-color", color); }
		}
	});
	
	$("div.right_Column").click(function() {
		var getNum = $(this).attr("data-count");
		if (color == "rgb(206, 206, 206)")
		{
		       	$(rightNode[Number(getNum)+1]).children("div.node_Right").css("background-color", ""); 
			$(rightNode[Number(getNum)]).children("div.node_Left").css("background-color", "");
		}
		else
		{
			if (Number(getNum) % 5 != 4)
			{
			       	$(rightNode[Number(getNum)+1]).children("div.node_Right").css("background-color", color); 
				$(rightNode[Number(getNum)]).children("div.node_Left").css("background-color", color);
			}
			else 
			{ $(rightNode[Number(getNum)]).children("div.node_Left").css("background-color", color); }
		}
	});

	$("div.left_Row").click(function() {
		var getNum = $(this).attr("data-count");
		if (color == "rgb(206, 206, 206)")
		{
			$(leftNode[Number(getNum)]).children("div.node_Bottom").css("background-color", "");
			$(leftNode[Number(getNum)+5]).children("div.node_Top").css("background-color", "");
		}
		else
		{
			$(leftNode[Number(getNum)]).children("div.node_Bottom").css("background-color", color);
			$(leftNode[Number(getNum)+5]).children("div.node_Top").css("background-color", color);
		}
	});

	$("div.right_Row").click(function() {
		var getNum = $(this).attr("data-count");
		if (color == "rgb(206, 206, 206)")
		{
			$(rightNode[Number(getNum)]).children("div.node_Top").css("background-color", "");
			$(rightNode[Number(getNum)+5]).children("div.node_Bottom").css("background-color", "");
		}
		else
		{
			$(rightNode[Number(getNum)]).children("div.node_Top").css("background-color", color);
			$(rightNode[Number(getNum)+5]).children("div.node_Bottom").css("background-color", color);
		}
	});

	$("div.head_Wire").click(function() {
		getNum = $(this).attr("data-count");
		if (color == "rgb(206, 206, 206)")
		{
			$(this).children("div").css("background-color", "");
			$(leftNode[getNum]).children("div.node_Left").css("background-color", "");
		}
		else
		{
			$(this).children("div").css("background-color", color);
			$(leftNode[getNum]).children("div.node_Left").css("background-color", color);
		}
	});

	$("div.tail_Wire").click(function() {
		getNum = $(this).attr("data-count");
		if (color == "rgb(206, 206, 206)")
		{
			$(this).children("div").css("background-color", "");
			$(rightNode[getNum]).children("div.node_Right").css("background-color", "");
		}
		else
		{
			$(this).children("div").css("background-color", color);
			$(rightNode[getNum]).children("div.node_Right").css("background-color", color);
		}
	});

	// Response when clicking on left hand side power
	$("div.power_Left").click(function() {
		var getNum = $(this).attr("data-count");
		var wireColor = $(leftNode[getNum]).children("div.node_Left").css("background-color");
		var powerCondition = $(this).css("border-color");

		for(var i in objLight)
		{ objLight[i] = false; }
		
		for(var i in book)
		{ book[i] = 0; }

		if (wireColor != "rgba(0, 0, 0, 0)" && 
			(powerCondition == "rgb(255, 255, 255)" || powerCondition != wireColor))
		{
			var lightIndex = 0;
			$(this).css("border-color", wireColor);
		      	findRoad(leftNode, leftNode[getNum], "Left", "Right", "Left");
			for(var i in objLight)
			{
				if (objLight[i])
				{
					lightOn(arrayLight[lightIndex], wireColor); 
				}
				lightIndex++;
			}
		}
		else if (wireColor != "rgba(0, 0, 0, 0)" && powerCondition == wireColor)
		{
			var lightIndex = 0;
			$(this).css("border-color", "white");
			findRoad(leftNode, leftNode[getNum], "Left", "Right", "Left");
			for (var i in objLight)
			{
				if (objLight[i])
				{ lightOff(arrayLight[lightIndex]); }
				lightIndex++;
			}
		}
	});

	// Respond when clicking on right hand side power
	$("div.power_Right").click(function() {
		var getNum = $(this).attr("data-count");
		var wireColor = $(rightNode[getNum]).children("div.node_Right").css("background-color");
		var powerCondition = $(this).css("border-color");

		for(var i in objLight)
		{ objLight[i] = false; }
		
		for(var i in book)
		{ book[i] = 0; }

		if (wireColor != "rgba(0, 0, 0, 0)" && 
			(powerCondition == "rgb(255, 255, 255)" || powerCondition != wireColor))
		{
			var lightIndex = 0;
			$(this).css("border-color", wireColor);
		      	findRoad(rightNode, rightNode[getNum], "Right", "Left", "Right");
			for(var i in objLight)
			{
				if (objLight[i])
				{
					lightOn(arrayLight[lightIndex], wireColor); 
				}
				lightIndex++;
			}
		}
		else if (wireColor != "rgba(0, 0, 0, 0)" && powerCondition == wireColor)
		{
			var lightIndex = 0;
			$(this).css("border-color", "white");
			findRoad(rightNode, rightNode[getNum], "Right", "Left", "Right");
			for (var i in objLight)
			{
				if (objLight[i])
				{ lightOff(arrayLight[lightIndex]); }
				lightIndex++;
			}
		}
	});

	// Show and hide the instruction
	$("header h2").click(function() {
		$("div.instruction_Container").slideToggle(1000);
	});

});	// end ready

