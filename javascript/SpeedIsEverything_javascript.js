//javasScript of ColorDance

$(document).ready(function() {

	var arr = [];
	var count = 0;
	var getNumber = [];
	var flag = false;
	var flagStart = false;
	var rememberRandomColor = 0;
	var countTime = 0;
	var wrongAnswer = 0;
	var time;

	//Function to create random integer between 1 to 3
	var randomNumber = function() {
		return Math.floor((Math.random()*3)+1);
	};
	//Function to random choose blocks color
	function createColor(key) { 
		getNumber[key] = randomNumber();
		if (getNumber[key] == 1)
		{ $(arr[key]).css({"background": "radial-gradient(#BF00FF, #D358F7, white)", "border-color": "#DA81F5"}); }
		else if (getNumber[key] == 2)
		{ $(arr[key]).css({"background": "radial-gradient(#DF7401, #FE9A2E, white)", "border-color": "#F7BE81"}); }
		else
		{ $(arr[key]).css({"background": "radial-gradient(#0080FF, #58ACFA, white)", "border-color": "#A9D0F5"}); }
	};
	//Function to return default
	function returnDefault() {
		for (var i=0; i<arr.length; i=i+2)
		{  
			$(arr[i]).css({"background": "radial-gradient(#BDBDBD, #D8D8D8, white)", "border-color": "#D8D8D8"});
			$(arr[i+1]).css({"background-image": "none", "border-color": "black"});
			$(arr[i]).css({"border-width": "1px", "margin": "12px"})
			$(arr[i+1]).css({"border-width": "1px", "margin": "12px"})
			rememberRandomColor = 0;
			count = 0;
			flag = false;
			flagStart = false;
		}
	};
	//Function to check if colors match
	function checkColor(num) {
		if (getNumber[count] == num)
		{
			$(arr[count]).css({"background": "radial-gradient(#01DF01, #81F781, white)", "border-color": "#58FA58"});
		}
		else
		{
			$(arr[count]).css({"background": "radial-gradient(#FF0000, #F78181, white)", "border-color": "#FA5858"});
			wrongAnswer++;	
		}
		createColor(rememberRandomColor);
		$(arr[count]).css({"border-width": "1px", "margin": "12px"});
		if (rememberRandomColor < arr.length)
			{ rememberRandomColor++; }
		if (count < arr.length)
		{	
			$(arr[count+1]).css({"border-width": "3px", "margin": "10px"});
			count++;
		}
	} //End checkColor

	//Function timer start
	function timerStart() {
		var millisecond = 0, second = 0, minute = 0;
		countTime++;

		millisecond = countTime%100;
		second = (Math.floor(countTime/100))%60;
		minute = (Math.floor(countTime/6000));
		
		if (millisecond >= 10)
		{$(".time3").text(millisecond)}
		else
		{$(".time3").text("0"+millisecond)}
		if (second >= 10)
		{$(".time2").text(second)}
		else
		{$(".time2").text("0"+second)}
		if (minute >= 10)
		{$(".time1").text(minute)}
		else
		{$(".time1").text("0"+minute)}
	};

	//Make a 14*7 table
	for (var i=1; i<=49; i++)
	{
		$("#left_container").append("<div class='rect'></div>");
		$("#right_container").append("<div class='rect'></div>");
	}

	$(".rect").width("23px");
	$(".rect").height("23px");
	$(".rect").css({"border": "1px solid black", "border-radius": "5px", "margin": "12px", "float": "left"});


	//Put class "rect" into array
	$(".rect").each(function() {
		arr.push(this);
	});
	//Make some color decoration
	returnDefault();
	//Introduction effect
	$("#introductionButton").hover(function(){
		$("#introduction_box").show("slow");}, function(){
		$("#introduction_box").hide("slow");
	});

	//When Ready is pressed
	$(document).on("click", "#readyButton", function() {
		for (rememberRandomColor=0; rememberRandomColor<=6; rememberRandomColor++)
		{
			createColor(rememberRandomColor);	
		}	
		$("#readyButton").attr("id", "restartButton").text("Restart");
		$("#timer").show();
		$("#title").hide();
		$(arr[0]).css({"border-width": "3px", "margin": "10px"});
		flag = true;
		flagStart = true;
	}); //End ready button
	//When Restart is pressed
	$(document).on("click", "#restartButton", function() {
		$("#restartButton").attr("id", "readyButton").text("Ready");
		clearInterval(time);
		returnDefault();
		$("#timer").hide();
		$("#title").show();
		$("#result_box").hide();

		$(".time1").text("00");
		$(".time2").text("00");
		$(".time3").text("00");
		countTime = 0;
		wrongAnswer = 0;
	}); //End restart button
	//When Done is pressed
	$("#doneButton").click(function() {
		returnDefault();
		$("#restartButton").attr("id", "readyButton").text("Ready");
		$("#result_box").hide();
		$("#timer").hide();
		$("#title").show();
		wrongAnswer = 0;
	}); //End done button

	$(document).keydown(function(key) {
		var whichKey = parseInt(key.which, 10);
		if (flagStart == true)
		{
			if (whichKey==65 || whichKey==68 || whichKey==83)
			{ 
				time = setInterval(function() {timerStart();}, 10);
				flagStart = false
			}
		}
		if (count == arr.length-1)
		{ 
			clearInterval(time); 

			$("#result_box").show();
			$("#mistake").text("+ Mistake: "+wrongAnswer+" * 0.7 seconds")

			var resultTime = countTime+wrongAnswer*70;
			var millisecond = 0, second = 0, minute = 0;
			millisecond = resultTime%100;
			second = (Math.floor(resultTime/100))%60;
			minute = (Math.floor(resultTime/6000));
			if (millisecond >=10)
			{$("#score3").text(millisecond)}
			else
			{$("#score3").text("0"+millisecond)}
			if (second >= 10)
			{$("#score2").text(second)}
			else
			{$("#score2").text("0"+second)}
			if (minute >= 10)
			{$("#score1").text(minute)}
			else
			{$("#score1").text("0"+minute)}
		}
		switch(parseInt(key.which, 10)) {
		//A key pressed
			case 65:
				if (flag)
				{
					checkColor(1);
				}
				break;
			case 83:
				if (flag)
				{
					checkColor(2);
				}
				break;
			case 68:
				if (flag)
				{
					checkColor(3);
				}
				break;
			}
	}); //end switch

}); //end ready
