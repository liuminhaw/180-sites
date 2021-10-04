//javaScript of ColorDance

$(document).ready(function() {
	//A function that helps to get random color
	var randomColor = function() {
		  return "#" + Math.random().toString(16).substring(2,8);
	};
	var hexColor;
	var count = true;
	var arr = [];
	var saveColor, setColor;

	//Find each class "circle" and put them into array "arr"
	$(".circle").each(function() {
		arr.push(this);
	});

	//Show random color when the mouse hovers through circle
	$(".circle").hover(function() {
		hexColor = randomColor();
		saveColor = $(this).css("background-color");
		$(this).css("background-color", hexColor);
		}, function() {
		$(this).css("background-color", saveColor);
	});

	//Change color when the mouse clicks the circle
	$(".circle").click(function() {
		var checkedValue = $("input[type='radio'][name='effect']:checked").val(); 	
		setColor = hexColor;	
		saveColor = hexColor;
		$(".fontcolor").css("color", hexColor);
		$("#HideShowButton").css("border-bottom-color", hexColor);
		var remainder = arr.indexOf(this)%10;
		switch (checkedValue)
		{
			case "Vertical":
				for(var i=0; i<=90; i+=10)
				{
					$(arr[remainder+i]).css("background-color", hexColor);
				}
				
				break;
			case "Default":
				$(".circle").css("background-color", hexColor);
				
				break;
			case "Horizontal":
				for (var i=remainder; i>remainder-10; i--)
				{
					$(arr[(arr.indexOf(this))-i]).css("background-color", hexColor);
				}

				break;
			case "Cross":
				for(var i=0; i<=90; i+=10)
				{
					$(arr[remainder+i]).css("background-color", hexColor);
				}
					for (var i=remainder; i>remainder-10; i--)
				{
					$(arr[(arr.indexOf(this))-i]).css("background-color", hexColor);
				}

				break;
		}
	});

	//Use to hide and show introduction
	$("#HideShowButton").click(function() {
		$("#section").fadeToggle("slow");
		if (count ===  true)
		{
			$("#HideShowButton").html('<span class="fontcolor">S</span>h<span class="fontcolor">o</span>w <span class="fontcolor">I</span>ntr<span class="fontcolor">o</span>d<span class="fontcolor">u</span>cti<span class="fontcolor">o</span>n');
			count = false;
		}
		else
		{
			$("#HideShowButton").html('<span class="fontcolor">H</span>id<span class="fontcolor">e</span> <span class="fontcolor">I</span>ntr<span class="fontcolor">o</span>d<span class="fontcolor">u</span>cti<span class="fontcolor">o</span>n')
			count = true;
		}
		$("#HideShowButton").css("border-bottom-color", setColor);
		$(".fontcolor").css("color", setColor);
	});
});
