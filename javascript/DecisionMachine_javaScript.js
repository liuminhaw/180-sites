// javaScript of Decision Machine

$(document).ready(function() {

	function setColor(mainColor, darkColor, lightColor, decisionDark, decisionLight, numberColor, plateColor, optionPlateColor)
	{
		this.mainColor = "rgb"+mainColor;
		this.darkColor = "rgb"+darkColor;
		this.lightColor = "rgb"+lightColor;
		this.decisionDark = "rgb"+decisionDark;
		this.decisionLight = "rgb"+decisionLight;
		this.numberColor = "rgb"+numberColor;
		this.colorPlate = "rgba"+plateColor;
		this.optionPlate = "rgba"+optionPlateColor
	}
	var red = new setColor("(255,85,85)", "(213,13,13)", "(255,234,234)", "(255,85,85)", "(255,147,147)", "(84,0,0)", "(255,234,234,0.85)", "(213,13,13,0.7)");
	var purple = new setColor("(213,100,213)", "(153,0,153)", "(246,207,246)", "(213,100,213)", "(242,177,242)", "(52,0,52)", "(246,207,246,0.85)", "(153,0,153,0.7)");
	var blue = new setColor("(50,154,233)", "(6,91,216)", "(224,235,252)", "(50,154,233)", "(187,223,251)", "(1,28,68)", "(224,235,252,0.85)", "(6,91,216,0.7)");
	var green = new setColor("(42,203,0)", "(27,129,0)", "(208,249,197)", "(42,203,0)", "(186,247,170)", "(7,35,0)", "(208,249,197,0.85)", "(27,129,0,0.7)");
	var orange = new setColor("(255,151,0)", "(149,88,0)", "(255,240,217)", "(255,151,0)", "(255,203,127)", "(64,38,0)", "(255,240,217,0.85)", "(149,88,0,0.7)");

	var clickTimes = false;
	var attrColor = red;	
	var nowColor = "Red";
	var optionsLeft = 1;
	var subOptionFlag = false;
	var optionsNumber = 0;
	var globalArray = [];

	//Changing color function
	function changeColor(colorValue, colorName)
	{
		var arrButton = [];
		var strSource = "";
		var strIndex = "";
		var strSub = "";
		var color = colorValue
		$(".imageButton, .closeButton, .controlButton").each(function() {
			arrButton.push(this);	
		});
		for (var i=0; i<arrButton.length; i++)
		{
			strSource = $(arrButton[i]).attr("src");
			strIndex = strSource.indexOf("_");
			strSub = strSource.substring(0,strIndex+1);
			$(arrButton[i]).attr("src", strSub+colorName+"Normal.png");
		}
		$("header").css("border-bottom", "10px solid "+colorValue.mainColor);
		$("aside").css({"background-color": colorValue.mainColor, "background-image": "linear-gradient(to bottom, "+colorValue.mainColor+", white)"});
		$(".Button>.colorPlate, div.middlePlate").css("background-color", colorValue.colorPlate);
		$(".Button>.optionPlate").css("background-color", colorValue.optionPlate);
		$(".optionPlate h4").css("color", colorValue.lightColor);
		$(".optionPlate form input").css({"color": colorValue.lightColor, "border-color": colorValue.lightColor});
		$(".finalOptions p").css("color", colorValue.lightColor);
		$(".optionContainer:nth-of-type(2n)").css("border-color", colorValue.decisionDark);
		$(".optionContainer:nth-of-type(2n+1)").css("border-color", colorValue.decisionLight);
		$(".optionContainer h4").css("color", colorValue.numberColor);
		$("div.replayContainer h3").css({"color": colorValue.darkColor, "border-color": colorValue.darkColor});
		$("span.color").css("color", colorValue.mainColor);

		return color;
	}	

	//Function which get random number
	function randomNumber(length)
	{
		var number = Math.floor(Math.random() * length);
		return number;
	}	
	
	//Function to get how many options where left
	function getOptionLeft(originLeft, inputNumber)
	{
		var originText = $(".optionPlate h4").text();
		var output = $("#focusStyle").val();
		if (output>0 && $.isNumeric(output) && output%1 == 0 && output<inputNumber)
		{
			var showValue = $(".finalOptions p").text(parseInt(output));
			closeOptionPlate();
			return output;
		}
		else if (output == "")
		{
			closeOptionPlate();
			return originLeft;
		}
		else if ($.isNumeric(output) && output%1 == 0 && output>=inputNumber)
		{
			$(".optionPlate h4").text("The number should be smaller than existing options");
			setTimeout(function() {
				$(".optionPlate h4").text(originText);
			}, 3000);
			$("#focusStyle").val("").focus();
			return originLeft;
		}
		else
		{
			$(".optionPlate h4").text("Please enter a positive integer");
			setTimeout(function() {
				$(".optionPlate h4").text(originText);
			}, 3000);
			$("#focusStyle").val("").focus();
			return originLeft;
		}
	}

	//Function to get option's content
	function getOptionContent(inputNumber)
	{
		var insertContent = ($("#insertChoice").val()).trim();
		if (insertContent.length != 0)
		{
			inputNumber++;
			$(".editOptionContainer").after('<div class="optionContainer subOption">'
							+ '<h4>'+inputNumber+'</h4>'
							+ '<p>'+insertContent+'</p>');
			//optionArray[inputNumber] = $(".subOption:first");
		}
		return inputNumber;
	}

	//Function to check length of object
	function objectLength(inputObject)
	{
		var count = 0;
		for (var i in inputObject)
		{
			if (inputObject.hasOwnProperty(i))
			{ count++; }
		}
		return count;
	}

	//Function to close optionPlate
	function closeOptionPlate()
	{
		$(".optionPlate h4, .optionPlate form, .checkButton").fadeOut();
		$(".optionPlate").delay(300).hide(500);
	}

	//Function to open optionPlate
	function openOptionPlate()
	{
		$("#focusStyle").val("");
		$(".optionPlate").show(500);
		$(".optionPlate h4, .optionPlate form, .checkButton").delay(380).fadeIn();
		setTimeout(function() {
			$("#focusStyle").focus().css("background-color", attrColor.optionPlate);
		}, 500);
	}

	//Function changing .optionContainer color
	function optionContainerChange()
	{
		$(".optionContainer:nth-of-type(2n)").css("border-color", attrColor.decisionDark);
		$(".optionContainer:nth-of-type(2n+1)").css("border-color", attrColor.decisionLight);
		$(".optionContainer h4").css("color", attrColor.numberColor);
	}

	//Function that reset settings
	function resetSettings()
	{
		optionsNumber = 0;
		optionsLeft = 1;
		$("div.subOption").remove();
		$(".finalOptions p").text(optionsLeft);
		if (subOptionFlag == true)
		{
			$("div.editOptionContainer").hide();
			subOptionFlag = false;
		}
		$("div.instructionContainer").fadeIn(500);
		$("div.resetPlate, div.resetMask").fadeOut(600);
	}

	// Function which loops the answer
	function answerLoop(inputArray, numbersLeft)
	{
		var length = inputArray.length;
		var number = 0;
		setTimeout(function() {
			number = randomNumber(inputArray.length);
			$(inputArray[number]).animate({left: "200px", opacity: "0"}, 600);
			setTimeout(function() {
				inputArray[number].remove();
				inputArray.splice(number, 1);
			}, 600);
			if (inputArray.length-numbersLeft > 1)
			{ answerLoop(inputArray, numbersLeft); }
			else if (inputArray.length-numbersLeft == 1)
			{
				$(inputArray).css("z-index", "4");
				$("div.replayContainer").fadeIn(600);
			}	
		}, 600);
	}

	//Make random color of the site
	switch (randomNumber(5))
	{
		case 0:
			attrColor = changeColor(red, "Red");
			$(".selectionRed").removeClass("selectionRed").addClass("selection"+nowColor);
			nowColor = "Red";
			break;
		case 1:
			attrColor = changeColor(purple, "Purple");
			$(".selectionPurple").removeClass("selectionPurple").addClass("selection"+nowColor);
			nowColor = "Purple";
			break;
		case 2:
			attrColor = changeColor(blue, "Blue");
			$(".selectionBlue").removeClass("selectionBlue").addClass("selection"+nowColor);
			nowColor = "Blue";
			break;
		case 3:
			attrColor = changeColor(green, "Green");
			$(".selectionGreen").removeClass("selectionGreen").addClass("selection"+nowColor);
			nowColor = "Green";
			break;
		case 4:
			attrColor = changeColor(orange, "Orange");
			$(".selectionOrange").removeClass("selectionOrange").addClass("selection"+nowColor);
			nowColor = "Orange";
			break;
	}

	//Change the image when the mouse hover through buttons
	$(".imageButton, .controlButton").hover(function() {
		var strSource = $(this).attr("src");
		var strSourceCode = strSource.substring(0, strSource.length-10);
		var strClass = $(this).attr("class");
		if (strClass == "finalButton imageButton")
		{ $(this).prev().find("p").css("color", attrColor.darkColor); }
		$(this).attr("src", strSourceCode+"Hover.png");
	}, function() {
		var strSource = $(this).attr("src");
		var strSourceCode = strSource.substring(0, strSource.length-9);
		var strClass = $(this).attr("class");
		if (strClass == "finalButton imageButton")
		{ $(this).prev().find("p").css("color", attrColor.lightColor); }
		$(this).attr("src", strSourceCode+"Normal.png");
	}).mousedown(function() {
		var strSource = $(this).attr("src");
		var strSourceCode = strSource.substring(0, strSource.length-9);
		var strClass = $(this).attr("class");
		if (strClass == "finalButton imageButton")
		{ $(this).prev().css("background-color", attrColor.lightColor).find("p").css("color", attrColor.darkColor); }
		$(this).attr("src", strSourceCode+"Click.png");
	}).mouseup(function() {
		var strSource = $(this).attr("src"); 
		var strSourceCode = strSource.substring(0, strSource.length-9);
		var strClass = $(this).attr("class");
		if (strClass == "finalButton imageButton")
		{ $(this).prev().css("background-color", "").find("p").css("color", attrColor.darkColor); }
		$(this).attr("src", strSourceCode+"Hover.png");
	}); //end imageButton control  

	//Interact when imageButton is clicked
	$(".imageButton").click(function() {
		var getCSS;
		getCSS = $("div.colorPlate").css("display");
		if (getCSS != "none")
		{ $("div.colorPlate").hide(500); }
		getCSS = $("div.optionPlate").css("display");
		if (getCSS != "none")
		{ closeOptionPlate(); }
	});

	//Interaction when the addButton is clicked
	$(".addButton").click(function() {
		$("div.instructionContainer").fadeOut(500);
		if ($("div").hasClass("subOption") && subOptionFlag==false)
		{
			setTimeout(function() {
				$("div.editOptionContainer").fadeIn(600);
				$("div.subOption").css("top", "-80px");
				$("div.subOption").animate({top: "0px"}, 550);
				$("#insertChoice").val("").focus();
			}, 500);
		}
		else if(subOptionFlag == false)
		{ 
			setTimeout(function() {
				$("div.editOptionContainer").fadeIn(600); 
				$("#insertChoice").val("").focus();
			}, 500);
		}
		//$("#insertChoice").val("").focus();
		subOptionFlag = true;
	});

	//Add Option when submit button is pressed
	$(document).on("click", ".submitOption", function() {
		optionsNumber = getOptionContent(optionsNumber);
		optionContainerChange();
		$("#insertChoice").val("").focus();
		//alert(objOptions["1"]);
	});

	//Use Enter key to submit options
	$("#insertChoice").keydown(function(event) {
		if (event.which == 13)
		{
			event.preventDefault();
			optionsNumber = getOptionContent(optionsNumber);
			optionContainerChange();
			$("#insertChoice").val("").focus();
		}
	});

	//When cancel option is pressed
	$(".cancelOption").click(function() {
		if (clickTimes == false)
		{
			clickTimes = true;
			$("div.editOptionContainer").fadeOut(600);
			$("div.subOption").animate({top: "-80px"}, 550);
			setTimeout(function() {
				$("div.subOption").css("top", "0px");
				clickTimes = false;
			}, 600);
			subOptionFlag = false;
		}
	});

	// Interacted when undo button is pressed
	$(".undoButton").click(function() {
		$("div.subOption:first").remove();
		//$(arrOptions[optionsNumber]).remove();
		optionContainerChange();
		if (optionsNumber != 0)
		{ optionsNumber--; }
	});

	// Interacted when reset button is pressed
	$(".resetButton").click(function() {
		$("div.resetPlate, div.resetMask").fadeIn(600);
	});

	// Interacted when NoButton is pressed
	$("img.NoButton").click(function() {
		$("div.resetPlate, div.resetMask").fadeOut(600);
	});

	// Interacted when Yes Button is pressed
	$("img.YesButton").click(function() {
		resetSettings();
	});

	// Use "Y" key same as clicking on YesButton
	$(document).keydown(function(event) {
		if ($("div.resetPlate").is(":visible"))
		{
			switch (event.which)
			{
				case 89:
					resetSettings();
					break;
				case 78:
					$("div.resetPlate, div.resetMask").fadeOut(600);
			}
		}
	});

	// Interaction when colorButton is clicked
	$(".colorButton, .colorPlate>.closeButton").click(function() {
		var getCSS;
		getCSS = $(".colorPlate").css("display");
		if (getCSS == "none")
		{ $(".colorPlate").show(500); }
		else
		{ $(".colorPlate").hide(500); }
	});

	// Interaction when finalButton is clicked
	$(".finalButton, .optionPlate>.closeButton").click(function() {
		var getCSS;
		getCSS = $(".optionPlate").css("display");
		if (getCSS == "none")
		{ 
			openOptionPlate();
		}
		else
		{ 
			closeOptionPlate();
		}
	});

	// Interact when Run is clicked
	$(".executeButton").click(function() {
		var arrOptions = [];
		var getCSS;
		globalArray = [];
		$(".subOption").each(function() {
			arrOptions.push(this);
			globalArray.push(this);
		});
		$(".resetMask").fadeIn(600);
		getCSS = $("div.editOptionContainer").css("display");
		if (getCSS != "none")
		{
			$("div.editOptionContainer").fadeOut(600);
			subOptionFlag = false;
		}
		if (arrOptions.length-optionsLeft >= 1 && arrOptions.length-optionsLeft <= 6)
		{
			answerLoop(arrOptions, optionsLeft);
		}
		else if (arrOptions.length-optionsLeft > 6)
		{
			var number;
			var arrNew = [];	
			while (arrOptions.length-optionsLeft > 6)
			{
				number = randomNumber(arrOptions.length);
				arrNew.push(arrOptions[number]);
				arrOptions.splice(number, 1);
			}
			setTimeout(function() {
				$(arrNew).animate({left: "200px", opacity: "0"}, 600);
				setTimeout(function() {
					$(arrNew).remove();
					arrNew = [];
				}, 600);
				answerLoop(arrOptions, optionsLeft);
			}, 600);
		}
		else
		{ $(".executePlate, .resetMask").fadeIn(600); }
	});

	// Interact when okayButton is clicked
	$(".okayButton").click(function() {
		$(".resetMask, .executePlate").fadeOut(600);
	});

	// Interaction when color change
	$(".colorPlate>div").click(function() {
		var strClass = $(this).attr("class");
		switch (strClass)
		{
			case "selectionRed":
				attrColor = changeColor(red, "Red");
				$(this).removeClass(strClass).addClass("selection"+nowColor);
				nowColor = "Red";
				break;
			case "selectionPurple":
				attrColor = changeColor(purple, "Purple");
				$(this).removeClass(strClass).addClass("selection"+nowColor);
				nowColor = "Purple";
				break;
			case "selectionBlue":
				attrColor = changeColor(blue, "Blue");
				$(this).removeClass(strClass).addClass("selection"+nowColor);
				nowColor = "Blue";
				break;
			case "selectionGreen":
				attrColor = changeColor(green, "Green");
				$(this).removeClass(strClass).addClass("selection"+nowColor);
				nowColor = "Green";
				break;
			case "selectionOrange":
				attrColor = changeColor(orange, "Orange");
				$(this).removeClass(strClass).addClass("selection"+nowColor);
				nowColor = "Orange";
				break;
		}
	});

	// Get the optionsleft decision
	$(".checkButton").click(function() {
		optionsLeft = getOptionLeft(optionsLeft, optionsNumber);
	});

	//Using the enter key to get optionsleft decision
	$("#focusStyle").keydown(function(event) {
		if (event.which == 13)
		{
			event.preventDefault();
			optionsLeft = getOptionLeft(optionsLeft, optionsNumber);
		}
	});

	//interact with replayContainer
	$("h3.replayButton, h3.startoverButton").hover(function() {
		$(this).css("background-color", "white");
	}, function() {
		$(this).css("background-color", "");
	}).mousedown(function() {
		$(this).css({"background-color": attrColor.optionPlate, "color": attrColor.lightColor});
	}).mouseup(function() {
		$(this).css({"background-color": "white", "color": attrColor.darkColor});
	});

	//Interact when startoverButton is clicked
	$("h3.startoverButton").click(function() {
		resetSettings();
		$("div.replayContainer").fadeOut(600);
	});

	//Interact when replayButton is clicked
	$("h3.replayButton").click(function() {
		$(globalArray).css({"left": "0px", "opacity": "1", "z-index": ""});
		$("div.editOptionContainer").after(globalArray);
		$("div.replayContainer, div.resetMask").fadeOut(600);
	});

	// Preload Images
	//var preloadImages = [""]

})	//end ready
