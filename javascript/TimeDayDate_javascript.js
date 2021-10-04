//javaScript of TimeDayDate

$(document).ready(function() {
	
	var day = new Date();
	var weekday = day.getDay();
	var date = day.getDate();
	var month = day.getMonth()+1;
	var year = day.getFullYear();
	var firstDate = new Date(month+"/01/"+year);
	var firstDay = firstDate.getDay();
	var thisMonth = month;
	var monthDay = 0;
	var previous_monthDay = 0;
	var moveStep = 0;
	var setDayDate = 0;
	var setTime;	//variable for setInterval()
	var setInstruction;	//variable for setInterval()
	var setColor = "";	
	var cityName = "";
	var arrDate = [];
	var arrMonth = []; 
	var arrTime = [];

	$(".main").onepage_scroll({
		sectionContainer: "section",
		responsiveFallback: 600,
		loop: true
	});

	//Function that determine how many days in a week
	function _howManyDays(inputMonth, inputYear) {
		var outputDays = 0;
		if (inputMonth == 2)
		{
			if ((inputYear%400 == 0)||(inputYear%4 == 0 && inputYear%100 != 0))
			{ outputDays = 29; }
			else
			{ outputDays = 28; }
		}
		else if ((inputMonth%2 == 0 && inputMonth>=8) || (inputMonth%2 != 0 && inputMonth<=7))
		{ outputDays = 31; }
		else
		{ outputDays = 30; }
		return outputDays;
	} //end function

	//Function that change style property each day
	function _changeProperty(inputColor, inputColor2) {
		$(".thisDay div").css("background-color", inputColor);
		$(".thisDay h4, .color").css("color", inputColor);
		$(".year_Container").css("color", inputColor);
		$(".month_Container:nth-of-type(odd)").css({"border": "2px solid "+inputColor, "color": inputColor});
		$(".month_Container:nth-of-type(even)").css({"border": "2px solid "+inputColor2, "color": inputColor2});
		$(".previousMonth_Button").attr("src", "../images/DatePrevious_"+inputColor+".png");
		$(".nextMonth_Button").attr("src", "../images/DateNext_"+inputColor+".png");
	} //end function
	
	//Function that put date into the right place
	function _putDate(inputdate, inputmonthDay, inputmoveStep, inputpreviousMonthDay, inputName) {
		var outputarrDate = [];
		var scratch = 0;
		
		$(inputName).each(function() {
			outputarrDate.push(this);
		});
		for (var i=inputdate; i<=inputmonthDay; i++)
		{ 
			$(outputarrDate[i-1+inputmoveStep]).html("<h4>"+i+"</h4><div></div>"); 
			if (i == inputmonthDay)
			{
				scratch = 1;
				for (var j=i+inputmoveStep; j<outputarrDate.length; j++)
				{ 
					$(outputarrDate[j]).html("<h4>"+scratch+"</h4><div></div>"); 
					$(outputarrDate[j]).css("opacity", "0.4");
					scratch++;
				}
			}
		}
		for (var i=inputdate; i>=1; i--)
		{ 
			$(outputarrDate[i-1+inputmoveStep]).html("<h4>"+i+"</h4><div></div>"); 
			if (i == 1)
			{
				scratch = inputpreviousMonthDay;
				for (var j=i-2+inputmoveStep; j>=0; j--)
				{
					$(outputarrDate[j]).html("<h4>"+scratch+"</h4><div></div>");
					$(outputarrDate[j]).css("opacity", "0.4");
					scratch--;
				}
			}
		}
		return outputarrDate;
	} //end function

	//Function that response when changing different month
	function _selectMonth(inputmonth, inputyear) {
		var functionfirstDate = new Date(inputmonth+"/01/"+inputyear);
		var functionfirstDay = functionfirstDate.getDay();
		var functionmonthDay = _howManyDays(inputmonth, inputyear);
		var functionpreviousMonthDay = _howManyDays(inputmonth-1, inputyear);
		var functionmoveStep = functionfirstDay;
		var outputarrDate = [];
		_putDate(1, functionmonthDay, functionmoveStep, functionpreviousMonthDay, ".dateNumber");
		$("#month"+inputmonth).css("opacity", "1");
	} //end function

	//Function that control ".thisDay"
	function _whichDay(inputweekDay) {
		switch (weekday)
		{
			case 0:
				$(".day:nth-of-type(1)").css({"height": "65.574%", "border-radius": "50% / 6.25%"}).addClass("sunday_Trick").removeClass("sunday");
				$(".decorationBox2, .decorationBox:nth-of-type(23)").addClass("decorationBox2_Sunday");
				$(".decorationBox:nth-of-type(22)").addClass("decorationBox_Sunday");
				$(".sevenDay:nth-of-type(8)").css({"bottom": "82.787%", "color": "red"});
				$(".tableContainer").addClass("table_Sunday");
				$(".timeZone td").css("border", "1px solid rgba(255,92,92,0.7)");
				_changeProperty("red", "orange");
				break;
			case 1:
				$(".day:nth-of-type(2)").css({"height": "65.574%", "border-radius": "50% / 6.25%"}).addClass("monday_Trick").removeClass("monday");
				$(".decorationBox2, .decorationBox:nth-of-type(23)").addClass("decorationBox2_Monday");
				$(".decorationBox:nth-of-type(22)").addClass("decorationBox_Monday");
				$(".sevenDay:nth-of-type(9)").css({"bottom": "82.787%", "color": "orange"});
				$(".tableContainer").addClass("table_Monday");
				$(".timeZone td").css("border", "1px solid rgba(255,153,102,0.7)");
				_changeProperty("orange", "gold");
				break;
			case 2:
				$(".day:nth-of-type(3)").css({"height": "65.574%", "border-radius": "50% / 6.25%"}).addClass("tuesday_Trick").removeClass("tuesday");
				$(".decorationBox2, .decorationBox:nth-of-type(23)").addClass("decorationBox2_Tuesday");
				$(".decorationBox:nth-of-type(22)").addClass("decorationBox_Tuesday");
				$(".sevenDay:nth-of-type(10)").css({"bottom": "82.787%", "color": "gold"});
				$(".tableContainer").addClass("table_Tuesday");
				$(".timeZone td").css("border", "1px solid rgba(207,207,83,0.7)");
				_changeProperty("gold", "green");
				break;
			case 3:
				$(".day:nth-of-type(4)").css({"height": "65.574%", "border-radius": "50% / 6.25%"}).addClass("wednesday_Trick").removeClass("wednesday");
				$(".decorationBox2, .decorationBox:nth-of-type(23)").addClass("decorationBox2_Wednesday");
				$(".decorationBox:nth-of-type(22)").addClass("decorationBox_Wednesday");
				$(".sevenDay:nth-of-type(11)").css({"bottom": "82.787%", "color": "green"});
				$(".tableContainer").addClass("table_Wednesday");
				$(".timeZone td").css("border", "1px solid rgba(133,184,133,0.7)");
				_changeProperty("green", "royalblue");
				break;
			case 4:
				$(".day:nth-of-type(5)").css({"height": "65.574%", "border-radius": "50% / 6.25%"}).addClass("thursday_Trick").removeClass("thursday");
				$(".decorationBox2, .decorationBox:nth-of-type(23)").addClass("decorationBox2_Thursday");
				$(".decorationBox:nth-of-type(22)").addClass("decorationBox_Thursday");
				$(".sevenDay:nth-of-type(12)").css({"bottom": "82.787%", "color": "royalblue"});
				$(".tableContainer").addClass("table_Thursday");
				$(".timeZone td").css("border", "1px solid rgba(0,92,230,0.7)");
				_changeProperty("royalblue", "deepskyblue");
				break;
			case 5:
				$(".day:nth-of-type(6)").css({"height": "65.574%", "border-radius": "50% / 6.25%"}).addClass("friday_Trick").removeClass("friday");
				$(".decorationBox2, .decorationBox:nth-of-type(23)").addClass("decorationBox2_Friday");
				$(".decorationBox:nth-of-type(22)").addClass("decorationBox_Friday");
				$(".sevenDay:nth-of-type(13)").css({"bottom": "82.787%", "color": "deepskyblue"});
				$(".tableContainer").addClass("table_Friday");
				$(".timeZone td").css("border", "1px solid rgba(88,198,235,0.7)");
				_changeProperty("deepskyblue", "darkviolet");
				break;
			case 6: 
				$(".day:nth-of-type(7)").css({"height": "65.574%", "border-radius": "50% / 6.25%"}).addClass("saturday_Trick").removeClass("saturday");
				$(".decorationBox2, .decorationBox:nth-of-type(23)").addClass("decorationBox2_Saturday");
				$(".decorationBox:nth-of-type(22)").addClass("decorationBox_Saturday");
				$(".sevenDay:nth-of-type(14)").css({"bottom": "82.787%", "color": "darkviolet"});
				$(".tableContainer").addClass("table_Saturday");
				$(".timeZone td").css("border", "1px solid rgba(107,36,178,0.7)");
				_changeProperty("darkviolet", "red");
				break;
		}
	} //end function

	//Function that change buttons opacity
	function _checkMonth(inputmonth) {
		if (inputmonth == 1)
		{
			$(".previous_Container div").css({"opacity": "0.4", "cursor": "not-allowed"});
			$(".next_Container div").css({"opacity": "1", "cursor": "pointer"});
		}
		else if (inputmonth == 12)
		{
			$(".previous_Container div").css({"opacity": "1", "cursor": "pointer"});
			$(".next_Container div").css({"opacity": "0.4", "cursor": "not-allowed"});
		}
		else
		{
			$(".previous_Container div").css({"opacity": "1", "cursor": "pointer"});
			$(".next_Container div").css({"opacity": "1", "cursor": "pointer"});
		}
	} //end function

	//Function that set city's time zone
	function _setTimeZone(inputname) {
		var daylightStartDate = 0;
		var daylightStopDate = 0;
		var UTCday = new Date();
		var UTCyear = UTCday.getUTCFullYear();
		var UTCmonth = UTCday.getUTCMonth()+1;
		var UTCdate = UTCday.getUTCDate();
		var UTChour = UTCday.getUTCHours();
		var outputtimeZone = 0;
		switch (inputname)
			{
				case "Denver":
					daylightStartDate = _findSunday(UTCyear, 3, "second");
					daylightStopDate = _findSunday(UTCyear, 11, "first");
					if ((UTCmonth>=4 && UTCmonth<=10) || (UTCmonth==3 && UTCdate>daylightStartDate) || (UTCmonth==11 && UTCdate<daylightStopDate))
					{ outputtimeZone = -6; }
					else if ((UTCmonth==3 && UTCdate==daylightStartDate && UTChour>=9) || (UTCmonth==11 && UTCdate==daylightStopDate && UTChour<8))
					{ outputtimeZone = -6; }
					else
					{ outputtimeZone = -7; }
					break;
				case "Ottawa":
					daylightStartDate = _findSunday(UTCyear, 3, "second");
					daylightStopDate = _findSunday(UTCyear, 11, "first");
					if ((UTCmonth>=4 && UTCmonth<=10) || (UTCmonth==3 && UTCdate>daylightStartDate) || (UTCmonth==11 && UTCdate<daylightStopDate))
					{ outputtimeZone = -4; }
					else if ((UTCmonth==3 && UTCdate==daylightStartDate && UTChour>=7) || (UTCmonth==11 && UTCdate==daylightStopDate && UTChour<6))
					{ outputtimeZone = -4; }
					else
					{ outputtimeZone = -5; }
					break;
				case "Brasilia":
					daylightStartDate = _findSunday(UTCyear, 10, "third");
					daylightStopDate = _findSunday(UTCyear+1, 2, "third");
					if ((UTCmonth>=11 || UTCmonth<=1) || (UTCmonth==10 && UTCdate>daylightStartDate) || (UTCmonth==2 && UTCdate<daylightStopDate))
					{ outputtimeZone = -2; }
					else if ((UTCmonth==10 && UTCdate==daylightStartDate && UTChour>=3) || (UTCmonth==2 && UTCdate==daylightStopDate && UTChour<2))
					{ outputtimeZone = -2; }
					else
					{ outputtimeZone = -3; }
					break;
				case "London":
					daylightStartDate = _findSunday(UTCyear, 3, "last");
					daylightStopDate = _findSunday(UTCyear, 10, "last");
					if ((UTCmonth>=4 && UTCmonth<=9) || (UTCmonth==3 && UTCdate>daylightStartDate) || (UTCmonth==10 && UTCdate<daylightStopDate))
					{ outputtimeZone = 1; }
					else if ((UTCmonth==3 && UTCdate==daylightStartDate && UTChour>=1) || (UTCmonth==10 && UTCdate==daylightStopDate && UTChour<1))
					{ outputtimeZone = 1; }
					else
					{ outputtimeZone = 0; }
					break;
				case "Paris":
				case "Berlin":
				case "Amsterdam":
					daylightStartDate = _findSunday(UTCyear, 3, "last");
					daylightStopDate = _findSunday(UTCyear, 10, "last");
					if ((UTCmonth>=4 && UTCmonth<=9) || (UTCmonth==3 && UTCdate>daylightStartDate) || (UTCmonth==10 && UTCdate<daylightStopDate))
					{ outputtimeZone = 2; }
					else if ((UTCmonth==3 && UTCdate==daylightStartDate && UTChour>=1) || (UTCmonth==10 && UTCdate==daylightStopDate && UTChour<1))
					{ outputtimeZone = 2; }
					else
					{ outputtimeZone = 1; }	
					break;
				case "Pretoria":
					outputtimeZone = 2;
					break;
				case "Moscow":
					outputtimeZone = 3;
					break;
				case "Taipei":
					outputtimeZone = 8;
					break;
				case "Beijing":
					outputtimeZone = 8;
					break;
				case "Tokyo":
					outputtimeZone = 9;
					break;
				case "Canberra":
					daylightStartDate = _findSunday(UTCyear, 10, "first");
					daylightStopDate = _findSunday(UTCyear+1, 4, "first");
					if ((UTCmonth>=11 || UTCmonth<=3) || (UTCmonth==10 && UTCdate>daylightStartDate) || (UTCmonth==4 && UTCdate<daylightStopDate))
					{ outputtimeZone = 11; }
					else if ((UTCmonth==10 && UTCdate==daylightStartDate-1 && UTChour>=16) || (UTCmonth==4 && UTCdate==daylightStopDate-1 && UTChour<16))
					{ outputtimeZone = 11; }
					else
					{ outputtimeZone = 10; }
					break;
				case "Wellington":
					daylightStartDate = _findSunday(UTCyear, 9, "last");
					daylightStopDate = _findSunday(UTCyear+1, 4, "first");
					if ((UTCmonth>=10 || UTCmonth<=3) || (UTCmonth==9 && UTCdate>daylightStartDate) || (UTCmonth==4 && UTCdate<daylightStopDate))	
					{ outputtimeZone = 13; }
					else if ((UTCmonth==9 && UTCdate==daylightStartDate-1 && UTCHour>=14) || (UTCmonth==4 && UTCdate==daylightStopDate-1 && UTChour<14))
					{ outputtimeZone = 13; }
					else
					{ outputtimeZone = 12; }
					break;
			}
			return outputtimeZone;
		
	} //end function

	//Function that get time for differnet time zone
	function _getTime(inputtimeZone) {
		function _addZero(inputNumber) {
			if (inputNumber<10)
			{ inputNumber = "0"+inputNumber; }
			return inputNumber;
		}

		var day = new Date();
		var timesince1970 = day.getTime()+day.getTimezoneOffset()*60000;
		var current_Time = new Date(timesince1970+inputtimeZone*60*60*1000);
		var current_Year = current_Time.getFullYear();
		var current_Month = _addZero(current_Time.getMonth()+1);
		var current_Date = _addZero(current_Time.getDate());
		var current_Hour = _addZero(current_Time.getHours());
		var current_Minute = _addZero(current_Time.getMinutes());
		var current_Second = _addZero(current_Time.getSeconds());
		
		var outputarr = [current_Year, current_Month, current_Date, current_Hour, current_Minute, current_Second];
		return outputarr;
	} //end function

	//Find specific Sunday in specific month
	function _findSunday(inputyear, inputmonth, inputcount) {  //inputcount should be "first", "second", "third", or "last"
		if (inputcount == "last")
		{
			var daysinWeek = _howManyDays(inputmonth, inputyear);
			var newDay = new Date(inputyear+"/"+inputmonth+"/"+daysinWeek);
			var day = newDay.getDay();

			return daysinWeek-day;
		}	
		else
		{
			var daysinWeek = 1;
			var newDay = new Date(inputyear+"/"+inputmonth+"/"+daysinWeek);
			var daycount = 7-(newDay.getDay());
			var count = 0;
			if (inputcount == "first")
			{ count = 0; }
			else if (inputcount == "second")
			{ count = 1; }
			else
			{ count = 2; }
			daysinWeek = daysinWeek+daycount+(count*7);

			return daysinWeek;
		}
	} //end function
		
	
	//Function that set color according to each city
	function _setCityColor(inputname) {
		var outputcolor = "";
		switch (inputname)
		{
			case "Denver":
			case "Pretoria":
				outputcolor = "red";
				break;
			case "Ottawa":
			case "Moscow":
				outputcolor = "orange";
				break;
			case "Brasilia":
			case "Taipei":
				outputcolor = "gold";
				break;
			case "London":
			case "Beijing":
				outputcolor = "green";
				break;
			case "Paris":
			case "Tokyo":
				outputcolor = "royalblue";
				break;
			case "Berlin":
			case "Canberra":
				outputcolor = "deepskyblue";
				break;
			case "Amsterdam":
			case "Wellington":	
				outputcolor = "darkviolet";
				break;
		}
		return outputcolor;
	} //end function

	$(".month_Container").each(function() {
		arrMonth.push(this);
	});
	
	setDayDate = setInterval(function() {
	});

	monthDay = _howManyDays(month, year);
	previous_monthDay = _howManyDays(month-1, year);
	
	//To count how many step should be move to get to the right day
	moveStep = firstDay;

	arrDate = _putDate(date, monthDay, moveStep, previous_monthDay, ".dateNumber");

	//Show the date of today
	$(arrDate[date-1+moveStep]).addClass("thisDay").removeClass("dateNumber");
	//Show the month
	$("#month"+month).css("opacity", "1");

	_whichDay(weekday);

	_checkMonth(month);
	$(arrMonth[month-1]).css("cursor", "not-allowed");
	
	//When next month is clicked
	$(".next_Container div").click(function() {
		if (month != 12)
		{
			$(arrDate[date-1+moveStep]).removeClass("thisDay").addClass("dateNumber");
			$(".dateNumber").css("opacity", "1");
			$(".month_Container").css("opacity", "0.4");
			_checkMonth(month);
			month = month+1;
			_checkMonth(month);
			_selectMonth(month, year);
		}
		if (month == thisMonth)
		{ 
			$(arrDate[date-1+moveStep]).removeClass("dateNumber").addClass("thisDay"); 
			_whichDay(weekday);
		}
		$(arrMonth).css("cursor", "pointer");
		$(arrMonth[month-1]).css("cursor", "not-allowed");
	});

	//When previous month is clicked
	$(".previous_Container div").click(function() {
		if (month != 1)
		{
			$(arrDate[date-1+moveStep]).removeClass("thisDay").addClass("dateNumber");
			$(".dateNumber").css("opacity", "1");
			$(".month_Container").css("opacity", "0.4");
			_checkMonth(month);
			month = month-1;
			_checkMonth(month);
			_selectMonth(month, year);
		}	
		if (month == thisMonth)
		{ 
			$(arrDate[date-1+moveStep]).removeClass("dateNumber").addClass("thisDay"); 
			_whichDay(weekday);
		}
		$(arrMonth).css("cursor", "pointer");
		$(arrMonth[month-1]).css("cursor", "not-allowed");
	});

	//Changing month by clicking month number
	$(".month_Container").click(function() {
		if (month != arrMonth.indexOf(this)+1)
		{
			month = (arrMonth.indexOf(this)+1);
			$(arrDate[date-1+moveStep]).removeClass("thisDay").addClass("dateNumber");
			$(".dateNumber").css("opacity", "1");
			$(".month_Container").css("opacity","0.4");
			_selectMonth(month, year);
			_checkMonth(month);
		}
		if (month == thisMonth)
		{
			$(arrDate[date-1+moveStep]).removeClass("dateNumber").addClass("thisDay");
			_whichDay(weekday);
		}
		$(arrMonth).css("cursor", "pointer");
		$(arrMonth[month-1]).css("cursor", "not-allowed");
	})

	//Choose city and show time
	$(".showTime").hide();
	$(".city_Dot, .cityName h4").hover(function() {
		cityName = $(this).text();
		clearInterval(setInstruction);
		$(".timeContainer h6").hide();
		$(".showTime").show();
		$(".Name").text(cityName);
		setColor = _setCityColor(cityName);
		$("."+cityName+"Name").css("text-shadow", "0px 0px 5px "+setColor);
		$("."+cityName+"_Dot").css("box-shadow", "0px 0px 5px 2px "+setColor);
		setTime = setInterval(function() {
			arrTime = _getTime(_setTimeZone(cityName));
			$(".Time").text(arrTime[3]+":"+arrTime[4]+":"+arrTime[5]);
			$(".Date").text(arrTime[0]+". "+arrTime[1]+". "+arrTime[2]);
		}); //end setInterval
		}, function() {
		$(".showTime").hide();
		$("."+cityName+"Name").css({"text-shadow": ""});
		$("."+cityName+"_Dot").css({"box-shadow": ""});
		clearInterval(setTime);
	});

	//Make instructions flick
	setInstruction = setInterval(function() {
		$(".timeContainer h6").fadeToggle(1000);
	}, 2500);
	

}); //end document
