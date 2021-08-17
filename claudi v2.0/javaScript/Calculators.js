// JavaScript Document

//Horizontals MODELS ---------------------------
var horizontalModels = new Array("Пред стъкло","Пред стъкло BO","Между стъкло","Макси стандарт","Макси лукс","Макси BO","Ultimate","Ultimate Мегавю","Ultimate BB24");
//Horizontal COLORS
var horizontalColors = new Array(
								 18, 	//price 1
								 7, 27, 58, 62, 63, 144, 241, 302, 315, 24, 330, 570, 378,695, 698,700, 705, 
								 707, 711, 712, 713, 714, 715 , 872, 866, 1000, 716, 717, 738, 436, 441	,
								 266, 279, 1037, 103, 718, 870, 814 //price 2
								 
								 ,781, 780, 754, 755, 8204, 8300, "1PR", "285PR", "58PR", // price 3
								 991, 992, 993, 994, 995, 996, 997, 998 ,  // price 4
								 "0150", 4459, 7010, 7113,  // price 5
								 7327, 7332, 7333, 7341, 7346,  // price 6
								 "0150P", "4459P", "7010P",  //price 7
								 2792, 3590, 4192, 4791, 5990,  //price 8
								 8581, 8582, 8583 //price 9
								 );

var horizontalTable = [ [14.9, 15.5, 23.5, 32.9, 28.9, 32.9, 39.9, 52.9, 59.9], //Pred stuklo  	20/380 x 10/350
						[16.9, 17.8, 27.9, 35.9, 33.9, 39.5, 46.5, 59.9, 71.9],	// Pred stuklo black out  26/360 x 10/350
						[13.9, 14.5, 22.5, 31.5, 26.9, 31.9, 37.9, 50.9, 57.9],	// Mejdu stuklo		20/380 x 10/350
						[19.5, 20.9, 28.9, 35.9, 33.9, 37.9, 45.5, 58.9, 65.5],	//Max standart		22/300 x 10/350	
						[26.5, 27.9, 34.9, 39.9, 38.9, 42.9, 48.9, 59.9, 66.5],	// Maxi BO		26/300 x 10/350
						[21.9, 22.9, 29.9, 37.9, 36.9, 40.9, 47.5, 61.9, 68.9],	// Maxi LUX		19/300 x 10/220
						[0.00, 0.00, 0.00, 59.9, 46.9, 53.5, 59.5, 73.9, 83.9],	// Ultimate		32/330 x 20/300
						[0.00, 0.00, 0.00, 73.5, 56.5, 60.9, 67.9, 82.9, 92.9],	// Ultimate mega	38/270 x 20/300
						[0.00, 0.00, 0.00, 99.5, 85.5, 90.9, 95.9, 112.5, 115.9]	// BB24		27/150 x 20/250
						];

function printOption(option)
{
	for (var i = 0; i < option.length; i++)
	{
		document.write("<option value=" + 'option[i]' + ">"  + option[i] + "</option>");
	}
}
//Gettign values ffrom sizes form for Horizontals and Verticals and Prints the result

var colorCode = 0;	//default color
var modelCode = 0; // default model
var totalPrice = 0;
var selctedVerical = 0;
//var selectedVerticalType;

// When clicked on the select menu
function getColor(color)
{
	colorCode = color.selectedIndex;
}
	
function getModel(model)
{
	modelCode = model.selectedIndex;	//models are thw rows in  horizontalTable
	selctedVerical = model;
}

// checkes the width and hitght
function checkBoundories(model, width, height)
{	
	var errorMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	var isThereError = false;
	switch(model)
	{
		case 0:
		case 2:
		{
			if (width < 20 || width > 380 || height < 10 || height > 350)
			{
				isThereError = true;
			}
		} break;
		
		case 1:
		if (width < 26 || width > 380 || height < 10 || height > 350)
			{
				isThereError = true;
			}break;
			
		case 3:
		if (width < 22 || width > 300 || height < 10 || height > 350)
			{
				isThereError = true;
			}break;
			
		case 4:
		if (width < 26 || width > 300 || height < 10 || height > 350)
			{
				isThereError = true;
			}break;
			
		case 5:
		if (width < 19 || width > 300 || height < 10 || height > 220)
			{
				isThereError = true;
			}break;
			
		case 6:
		if (width < 32 || width > 330 || height < 20 || height > 300)
			{
				isThereError = true;
			}break;
			
		case 7:
		if (width < 38 || width > 270 || height < 20 || height > 300)
			{
				isThereError = true;
			}break;
			
		case 8:
		if (width < 27 || width > 150 || height < 20 || height > 250)
			{
				isThereError = true;
			}break;
	}	
	if (isThereError)
	{
		alert(errorMSG);
		
	}	
}

function printFinalPrice(fromModels)
{
	var sizeWidth = document.getElementById("sunblindWidth").value; 
	var sizeHeight = document.getElementById("sunblindHeight").value;	
	var squareMeters;
	var pricePerSquareMeter = 0;
	var discount = 8;	//precent discount
	var colorGroup;
	var errorMSG = "Зададените размери са извън позволената площ на продукта";
	
	var normalMaxSquareMeters = 6;
	var ultimateMegaMaxSqareMeters = 4;
	var maxiLuxBB24MaxSquareMeters = 2;

	squareMeters = sizeWidth * sizeHeight / 10000;  
	if (squareMeters < 0.5)
	{
		squareMeters = 0.5;
	}
	// checking the boundories
	if (squareMeters > normalMaxSquareMeters)
	{
		alert(errorMSG);
	}
	
	if (modelCode == 4  || modelCode == 8) 	// Po princip e 5 ; ) blabla
	{
		if (squareMeters > 2)
		{
		alert(errorMSG);
		}
	}
	if (modelCode == 7)
	{
		if (squareMeters > ultimateMegaMaxSqareMeters)
		{
		alert(errorMSG);
		}
	}
	
	checkBoundories(modelCode, sizeWidth, sizeHeight);
	
	//finding The colors
	if (colorCode == 0)
	{	
		colorGroup = 0;
	}		
	if (colorCode > 0)
	{			
		colorGroup = 1;	
	}		
	if (colorCode > 40)
	{
		colorGroup = 2;
	}
	if (colorCode > 49)
	{
		colorGroup = 3;
	}
	if (colorCode > 57)
	{
		colorGroup = 4;
	}
	if (colorCode > 61)
	{
		colorGroup = 5;
	}
	if (colorCode > 66)
	{
		colorGroup = 6;
	}
	if (colorCode >  69)
	{
		colorGroup = 7;
	}
	if (colorCode >  74)
	{
		colorGroup = 8;
	}
	
	var StrVodeneChk = document.getElementById("stranichnoVodene").checked;
	var PlankiLux = document.getElementById("luxPlanki").checked;
	
	if (StrVodeneChk == 1)
	{
		totalPrice = totalPrice + 3;
	}
	if (PlankiLux == 1)
	{
		totalPrice = totalPrice + 0.5;
	}
	
	pricePerSquareMeter = fromModels[modelCode][colorGroup];
	totalPrice = totalPrice + ( squareMeters * pricePerSquareMeter );
	totalPrice -= totalPrice *  (discount /100);
	
	if (totalPrice == 0)
	{
		totalPrice = "Неподдържан цвят за този модел";
		document.getElementById("finalPrice").innerHTML = totalPrice;		
	}
	else
	{	
		document.getElementById("finalPrice").innerHTML = totalPrice.toFixed(2) + " лв.";
	}	
	totalPrice = 0;
	return false;
}


