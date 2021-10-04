//javaScript of Decision Machine

$(document).ready(function() {
	function getAttribute(inputName) {
		this.thiswidth = $(inputName).outerWidth();
		this.thisheight = $(inputName).outerHeight();
		this.thisposition = $(inputName).position();
		this.thiscenter = [this.thisposition.left+(this.thiswidth/2), this.thisposition.top+(this.thisheight/2)]; 
	};
	var objContainer = new getAttribute(".bigContainer");
	var objmain = new getAttribute("main");
	var objsection = new getAttribute("section");
	var objchoice = {
		initialBox: [],
		backupBox: [],
		resultBox: [],
		insertCount: 0,
		memoryCount: 0,
		boxSize: 0
	};
	var Distance = 0;
	var randomNum = 0;
	var booleanSection = false;

	// Function that produce a random number between 0 and inputAccess
	function randomNumber(inputAccess) {
		return Math.floor(Math.random()*inputAccess);
	}  //end function

	// Function that set position of choiceBoxs
	function setboxPosition(objBox, objreference, inputLength) {
		var distance = 0;
		for (var i=0; i<inputLength; i++)
		{
			if (i<5)
			{
				objBox.boxSize = $(".firstLayer").outerWidth();
				distance = objreference.thiswidth/2+objBox.boxSize/2+15;
				$(objBox.initialBox[i]).css({"left": objreference.thiscenter[0]+distance*Math.cos(Math.PI/3*i)-objBox.boxSize/2, 
							     "top": objreference.thiscenter[1]-distance*Math.sin(Math.PI/3*i)-objBox.boxSize/2});
			}
			else if (i==5)
			{
				objBox.boxSize = $(".firstLayer").outerWidth();
				distance = objreference.thiswidth/2+objBox.boxSize/2+15;
				$(objBox.initialBox[i]).css({"left": objreference.thiscenter[0]+distance*Math.cos(Math.PI/3*i)-$(".functionBox").outerWidth()/2,
							     "top": objreference.thiscenter[1]-distance*Math.sin(Math.PI/3*i)-$(".functionBox").outerWidth()/2});
			}
			else if (i<18)
			{
				objBox.boxSize = $(".secondLayer").outerWidth();
				distance = objreference.thiswidth/2+objBox.boxSize/2+15+objBox.boxSize+20;
				$(objBox.initialBox[i]).css({"left": objreference.thiscenter[0]+distance*Math.cos(Math.PI/6*i)-objBox.boxSize/2, 
						   	     "top": objreference.thiscenter[1]-distance*Math.sin(Math.PI/6*i)-objBox.boxSize/2});
			}
			else
			{
				objBox.boxSize = $(".thirdLayer").outerWidth();
				distance = objreference.thiswidth/2+objBox.boxSize/2+15+2*(objBox.boxSize+25);
				if (i<23)
				{
					$(objBox.initialBox[i]).css({"left": objreference.thiscenter[0]+distance*Math.cos(Math.PI/9*(i-2)+Math.PI/18)-objBox.boxSize/2, 
						 	  	     "top": objreference.thiscenter[1]-distance*Math.sin(Math.PI/9*(i-2)+Math.PI/18)-objBox.boxSize/2});
				}
				else
				{
					$(objBox.initialBox[i]).css({"left": objreference.thiscenter[0]+distance*Math.cos(Math.PI/9*(i+2)+Math.PI/18)-objBox.boxSize/2, 
							  	     "top": objreference.thiscenter[1]-distance*Math.sin(Math.PI/9*(i+2)+Math.PI/18)-objBox.boxSize/2});	
				}
			
			}
		}
	} //end function
	
	// Function that set main tag's position to middle of the screen
	function setmainPosition(inputobj, objreference) {
		var outputobj = 0;
		$("main").css({"left": objreference.thiscenter[0]-(inputobj.thiswidth/2), "top": objreference.thiscenter[1]-(inputobj.thisheight/2)});
		outputobj = new getAttribute("main");

		return outputobj;
	} // end function

	// Function that show random box when section "Insert" is clicked
	function showrandomBox(objBox) {
		var randomNum = randomNumber(objBox.memoryCount);
		var randomColor = randomNumber(5)+1

		objBox.resultBox[objBox.insertCount] = objBox.backupBox[randomNum];
		objBox.backupBox.splice(randomNum, 1);
		$(objBox.resultBox[objchoice.insertCount]).css("background-image", "url('../images/DecisionChoice_Button"+randomColor+".png')").show();
		objBox.insertCount++;
		objBox.memoryCount--;
	} //end function

	// Function that response to adding choices in the website
	function dynamicAddBox() {
		if (objchoice.insertCount<6)
		{
			switch (objchoice.insertCount)
			{
				case 0:
					$("main, main img").css({"width": "220px", "height": "220px"});
					objmain = new getAttribute("main");
					objmain = setmainPosition(objmain, objContainer);
					setboxPosition(objchoice, objmain, 6);
					objchoice.resultBox[objchoice.insertCount] = objchoice.backupBox[5];
					objchoice.backupBox.splice(5, 1);	
					$(".functionBox").show();
					objchoice.memoryCount = 5;
					objchoice.insertCount = 1;
					
				default:
					showrandomBox(objchoice);
			}	
		}
		else if (objchoice.insertCount<18)
		{
			switch (objchoice.insertCount)
			{
				case 6:
					$("main, main img").css({"width": "130px", "height": "130px"});
					$(".firstLayer").css({"width": "120px", "height": "120px"});
					$(".functionBox").css({"width": "100px", "height": "100px"});
					$(".functionButton").css({"width": "100px", "height": "50px"});
					objmain = new getAttribute("main");
					objmain = setmainPosition(objmain, objContainer);
					setboxPosition(objchoice, objmain, 18);
					objchoice.memoryCount = 11;
				default:
					showrandomBox(objchoice);
			}
		}
		else if (objchoice.insertCount<28)
		{
			switch (objchoice.insertCount)
			{
				case 18:
					$("main, main img").css({"width": "120px", "height": "120px"});
					$(".firstLayer").css({"width": "110px", "height": "110px"});
					$(".secondLayer").css({"width": "100px", "height": "100px"});
					$(".functionBox").css({"width": "80px", "height": "80px"});
					$(".functionButton").css({"width": "80px", "height": "40px"});
					objmain = new getAttribute("main");
					objmain = setmainPosition(objmain, objContainer);
					setboxPosition(objchoice, objmain, objchoice.initialBox.length);
					objchoice.memoryCount = 9;
				default: 
					showrandomBox(objchoice);
			}
		}
		else
		{ $(".alertBox").show(); }
	} // end function


	objmain = setmainPosition(objmain, objContainer);

	// Set section tag to position
	$("section").css({"left": objContainer.thiscenter[0]-(objsection.thiswidth/2), "top": objContainer.thiscenter[1]-(objsection.thisheight/2)});
	objsection = new getAttribute("section");
	$("form").css("top", objsection.thisheight/3);
	$(".insertBox div").css("top", objsection.thisheight*3/5);
	$(".alertBox div:nth-child(1)").css("top", objsection.thisheight*2/5);
	$(".alertBox div:nth-child(2)").css("top", objsection.thisheight*3/5);
	
	// Put choice boxes into the array
	$(".choiceBox").each(function() {
		objchoice.initialBox.push(this);
		objchoice.backupBox.push(this);
	});

	setboxPosition(objchoice, objmain, objchoice.initialBox.length);

	$(document).keydown(function(key) {
		if (parseInt(key.which, 10) == 13)
		{ 
			if (objchoice.insertCount == 28)
			{ $(".alertBox").toggle(); }
			else
			{
				$(".insertBox").toggle();
				if (booleanSection == true)
				{
					dynamicAddBox();
					booleanSection = false;
				}
				else
				{ booleanSection = true; }
			}
		}
	});

	$("main img").mousedown(function() {
		$(this).attr("src", "../images/DecisionAddPush_Button.png");
	}).mouseup(function() {
		$(this).attr("src", "../images/DecisionAdd_Button.png");
	}).mouseleave(function() {
		$(this).attr("src", "../images/DecisionAdd_Button.png");
	}).click(function() {
		if (objchoice.insertCount == 28)
		{ $(".alertBox").show(); }
		else 
		{
			$(".insertBox").show();
			booleanSection = true;
		}
	});

	//Interact when clicking on section "Insert"
	$("section .click").mousedown(function() {
		$(this).css({"background-color": "white", "color": "black"});
	}).mouseup(function() {
		$(this).css({"background-color": "", "color": "white"});
		//$("section").hide();	
	}).mouseleave(function() {
		$(this).css({"background-color": "", "color": "white"});
	});
	$(".insertBox .click").click(function() {
		$(".insertBox").hide();
		booleanSection = false;
		dynamicAddBox();
		//alert(objchoice.insertCount+" "+objchoice.memoryCount);
	});
	$(".alertBox .click").click(function() {
		$(".alertBox").hide();
	});

}); //end ready
