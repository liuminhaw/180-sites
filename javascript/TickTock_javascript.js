/* LifeCount_javascript.js -- JavaScript of Life Count */

$(document).ready(function() {
	var day = new Date();
	var thisYear = day.getFullYear();

	var user = {
		birthYear: 0,
		birthMonth: 0,
		birthDate: 0,
		nowAge: 0,
		daysLived: 0,
		daysLeft: 0,
		predictAge: 0,
		prevYear: null,
		prevMonth: null,
		prevDate: null,
		yearFlag: false,
		monthFlag: false,
		dateFlag: false	
	};

	var button = {
		yearFlag: true,
		monthFlag: true,
		dateFlag: true,
		submitFlag: true 
	};

	var saveAge = {
		now: null,
		previous: null,
	};

	// Function to see if it is lunar year
	function isLunar(inputYear) {
		if ((inputYear % 400 == 0) || (inputYear % 4 == 0 && inputYear % 100 != 0))
		{ return true; }  
		else
		{ return false; }
	}

	// Function that count how many days has lived
	function countDays(inputYear, inputMonth, inputDate) {
		var daysInMonth = new Date(inputYear, inputMonth, 0).getDate();
		var today = new Date();
		var day = new Date(inputYear, inputMonth-1, inputDate);
		var timePass = 0;
		var devideDays = 24*60*60*1000;

		// For Date() object, the range of month is 0-11, which means that 0 will represent January

		if (inputYear >= 1970)
		{
			timePass = Math.round((today.getTime() / devideDays) - (day.getTime() / devideDays));
		}
		else
		{
			for (var i=0; inputYear+i<1970; i++)
			{
				if (isLunar(inputYear+i))
				{ timePass += 366; }
				else
				{ timePass += 365; }
			}
			for (var i=0; i<inputMonth-1; i++)
			{
				timePass -= new Date(inputYear, i+1, 0).getDate();
			}
			timePass -= (inputDate-1); 
			timePass += Math.round(today.getTime() / devideDays);
		}
		return timePass;
	}

	// function that count user's age
	function countAge(inputYear, inputMonth, inputDate) {
		var age = 0;
		var day = new Date();
		var year = day.getFullYear();
		var month = day.getMonth() + 1;
		var date = day.getDate();
		
		age = (year - 1) - inputYear;
		if (month > inputMonth || (month == inputMonth && date >= inputDate))
		{ age++; }

		return age;
	} 

	// Function that count's the days left before specific age
	function countLeft(inputYear, inputMonth, inputDate, inputNumber) {
		var futureYear = inputYear + inputNumber;
		var today = new Date();
		var futureDay = new Date(futureYear, inputMonth-1, inputDate);
		var devideDays = 24*60*60*1000;
		var daysLeft = 0;

		daysLeft = Math.round((futureDay.getTime()/devideDays) - (today.getTime()/devideDays));
		
		return daysLeft; 	
	}

	// Function that turn all the flag to true
	function turnFlag(inputObj) {
		for (var i in inputObj)
		{ inputObj[i] = true; }
	}

	// Function which put the age button in place
	function initialTargetAge() {
		$("div.resultContainer").fadeOut(1000);
		$("div.ageSelect").css({"width": "130px", "margin-left": "50px"});
		$("div.ageSelect img").fadeIn(300);
	}	


	// Place Years and months into right place
	for(var i=1; i<100; i++)
	{
		$("div.yearContainer").append("<h5>" + (thisYear-i) + "</h5>");
		if (i<12)
		{ 
			if (i < 10)
			{ 
				var fixMonth = "0" + (i).toString(); 
				$("div.monthContainer").append("<h5>" + fixMonth + "</h5>");
			}
			else
			{ $("div.monthContainer").append("<h5>" + (i+1).toString() + "</h5>"); }
	       	}
	}


	// Show the choosing panel when clicking BirthYear button
	$("img#birthYear").click(function() {
		initialTargetAge();
		if (button.yearFlag)
		{
			$("div.monthContainer, h4#chooseMonth, div.dateContainer, h4#chooseDate").fadeOut(1000);
			$("div.inputContainer").css({"top": "320px", "height": "calc(100% - 320px)"});
			$("div.informationContainer").css({"top": "30px", "height": "calc(100% - 98px)"});
			$("h4#chooseYear, div.yearContainer").fadeIn(1000);
			turnFlag(button);
			button.yearFlag = false;
		}
		else
		{
			$("h4#chooseYear, div.yearContainer").fadeOut(1000);
			$("div.inputContainer").css({"top": "70px", "height": "calc(100% - 70px)"});
			turnFlag(button);
		}
	});

	// Show the choosing panel when clicking BirthMonth button
	$("img#birthMonth").click(function() {
		initialTargetAge();
		if (button.monthFlag)
		{
			$("div.yearContainer, h4#chooseYear, div.dateContainer, h4#chooseDate").fadeOut(1000);
			$("div.inputContainer").css({"top": "150px", "height": "calc(100% - 150px)"});
			$("div.informationContainer").css({"top": "30px", "height": "calc(100% - 98px)"});
			$("div.monthContainer, h4#chooseMonth").fadeIn(1000);	
			turnFlag(button);
			button.monthFlag = false;
		}
		else
		{
			$("h4#chooseMonth, div.monthContainer").fadeOut(1000);
			$("div.inputContainer").css({"top": "70px", "height": "calc(100% - 70px)"});
			turnFlag(button);
		}
	});

	// Show the choosing panel when clicking BirthDate button
	$("img#birthDate").click(function() {
		initialTargetAge();
		if (button.dateFlag)
		{
			var numberOfDays = 0;
			$("div.dateContainer").empty();
			if (user.yearFlag && user.monthFlag)
			{
				switch (user.birthMonth.text())
				{
					case "02":
						if (isLunar(user.birthYear))
						{ numberOfDays = 29; }
						else
						{ numberOfDays = 28; }
						break;
					case "04":
					case "06":
					case "09":
					case "11":
						numberOfDays = 30;
						break;
					default: 
						numberOfDays = 31;
				}	
				for (var i=0; i<numberOfDays; i++)
				{
					if (i+1 < 10)
					{ $("div.dateContainer").append("<h5>0" + (i+1).toString() + "</h5>"); }
					else
					{ $("div.dateContainer").append("<h5>" + (i+1).toString() + "</h5>"); }
				}
				$("div.yearContainer, h4#chooseYear, div.monthContainer, h4#chooseMonth").fadeOut(1000);
				$("div.inputContainer").css({"top": "210px", "height": "calc(100% - 210px)"});
				$("div.informationContainer").css({"top": "30px", "height": "calc(100% - 98px)"});
				$("div.dateContainer, h4#chooseDate").fadeIn(1000);
			}
			else
			{
				$("div.dateContainer").append("<h6>Please choose birth year and birth month first.</h6>");
				$("div.yearContainer, h4#chooseYear, div.monthContainer, h4#chooseMonth").fadeOut(1000);
				$("div.inputContainer").css({"top": "150px", "height": "calc(100% - 150px)"});
				$("div.informationContainer").css({"top": "30px", "height": "calc(100% - 98px)"});
				$("div.dateContainer").fadeIn(1000);
			}
			turnFlag(button);
			button.dateFlag = false;
		}
		else 
		{
			$("div.dateContainer, h4#chooseDate").fadeOut(1000);
			$("div.inputContainer").css({"top": "70px", "height": "calc(100% - 70px)"});
			turnFlag(button);
		}
	});

	// Select Birth Year
	$("div.yearContainer h5").click(function() {
		user.birthYear = $(this);
		$(user.prevYear).css("color", "rgb(17, 0, 112)");		
		$(user.birthYear).css("color", "rgb(254, 133, 234)");		// Target clicked year
		$("span.guestYear").text(user.birthYear.text()).css("color", "rgb(254, 133, 234)");
		user.prevYear = user.birthYear;
		user.yearFlag = true;
	});

	// Select Birth Month
	$("div.monthContainer h5").click(function() {
		user.birthMonth = $(this);
		$(user.prevMonth).css("color", "rgb(17, 0, 112)");
		$(user.birthMonth).css("color", "rgb(254, 133, 234)");		// Target clicked month
		$("span.guestMonth").text(user.birthMonth.text()).css("color", "rgb(254, 133, 234)");
		user.prevMonth = user.birthMonth;
		user.monthFlag = true;
	});

	// Select Birth Date
	$("div.dateContainer").on("click", "h5", function() {
		user.birthDate = $(this);
		$(user.prevDate).css("color", "rgb(17, 0, 112)");
		$(user.birthDate).css("color", "rgb(254, 133, 234)");		// Target clicked date
		$("span.guestDate").text(user.birthDate.text()).css("color", "rgb(254, 133, 234)");
		user.prevDate = user.birthDate;
		user.dateFlag = true;
	});

	// Submit button clicked
	$("img#submitButton").click(function() {
		$("div.yearContainer, div.monthContainer, div.dateContainer, h4#chooseYear, h4#chooseMonth, h4#chooseDate")
			.fadeOut(1000);
		$("div.inputContainer").css({"top": "70px", "height": "calc(100% - 70px)"});
		if (user.yearFlag && user.monthFlag && user.dateFlag && button.submitFlag)
		{
			user.daysLived = countDays(parseInt(user.birthYear.text()), 
				parseInt(user.birthMonth.text()), parseInt(user.birthDate.text()));
			user.nowAge = countAge(parseInt(user.birthYear.text()), parseInt(user.birthMonth.text()), parseInt(user.birthDate.text()));
			book = [true, true, true, true];
			if (user.nowAge < 70)
			{
				$("div.ageSelect:nth-of-type(1)").css({"width": "180px", "margin-left": "0px"});
				saveAge.now = $("div.ageSelect:nth-of-type(1)");
				user.predictAge = 70;
			}
			else if (user.nowAge < 80)
			{
				$("div.ageSelect:nth-of-type(2)").css({"width": "180px", "margin-left": "0px"});
				$("div.ageSelect:nth-of-type(1)").css({"width": "20px", "margin-left": "160px"});
				$("div.ageSelect:nth-of-type(1) img").fadeOut(300);
				saveAge.now = $("div.ageSelect:nth-of-type(2)");
				user.predictAge = 80;
				count = 1;
			}
			else if (user.nowAge < 90)
			{
				$("div.ageSelect:nth-of-type(3)").css({"width": "180px", "margin-left": "0px"});
				$("div.ageSelect:nth-of-type(1), div.ageSelect:nth-of-type(2)").css({"width": "20px", "margin-left": "160px"});
				$("div.ageSelect:nth-of-type(1) img, div.ageSelect:nth-of-type(2) img").fadeOut(300);
				saveAge.now = $("div.ageSelect:nth-of-type(3)");
				user.predictAge = 90;
				count = 2;
			}
			else
			{
				$("div.ageSelect:nth-of-type(4)").css({"width": "180px", "margin-left": "0px"});
				$("div.ageSelect:nth-of-type(1), div.ageSelect:nth-of-type(2), div.ageSelect:nth-of-type(3)")
					.css({"width": "20px", "margin-left": "160px"});
				$("div.ageSelect:nth-of-type(1) img, div.ageSelect:nth-of-type(2) img, div.ageSelect:nth-of-type(3) img")
					.fadeOut(300);
				saveAge.now = $("div.ageSelect:nth-of-type(4)");
				user.predictAge = 100;
				count = 3;
			}

			user.daysLeft = countLeft(parseInt(user.birthYear.text()), parseInt(user.birthMonth.text()), 
				parseInt(user.birthDate.text()), parseInt(user.predictAge));
			$("span#daysLived").empty().append(user.daysLived);
			$("span#nowAge").empty().append(user.nowAge);
			$("span#daysToGo").empty().append(user.daysLeft);
			$("span#expectAge").empty().append(user.predictAge);
			$("div.warningContainer").fadeOut(1000);
			$("div.resultContainer").fadeIn(1000);
			$("div.informationContainer").css({"top": "300px", "height": "calc(100% - 368px)"});
			turnFlag(button);
			button.submitFlag = false;
		}
		else if (button.submitFlag)
		{
			$("div.resultContainer").fadeOut(1000);
			$("div.warningContainer").fadeIn(1000);
			$("div.informationContainer").css({"top": "140px", "height": "calc(100% - 208px)"});
			turnFlag(button);
			button.submitFlag = false;
		}
		else
		{ 
			initialTargetAge();
			$("div.resultContainer").fadeOut(1000);
			$("div.warningContainer").fadeOut(1000);
			$("div.informationContainer").css({"top": "30px", "height": "calc(100% - 98px)"});
			turnFlag(button); 
		}
	});

	// Select age button clicked
	$("div.ageSelect").click(function() {
		var count = 0;

		if ($(this).css("width") == "130px")	
		{
			saveAge.previous = saveAge.now;
			saveAge.now = $(this);
			$(saveAge.now).css({"width": "180px", "margin-left": "0px"});
			$(saveAge.previous).css({"width": "130px", "margin-left": "50px"});

			user.predictAge = $(this).attr("data-number");
			user.daysLeft = countLeft(parseInt(user.birthYear.text()), parseInt(user.birthMonth.text()),
			parseInt(user.birthDate.text()), parseInt(user.predictAge));	

			$("span#daysToGo").empty().append(user.daysLeft);
			$("span#expectAge").empty().append(user.predictAge);
		}
		else	
		{ return 0; }
	});

	$("h5#instruction").click(function() {
		$("div.instructionContainer").fadeToggle(700);
	});

});
