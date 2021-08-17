// JavaScript Document

//Horizontals MODELS ---------------------------
var horizontalModels = new Array("Пред стъкло", "Пред стъкло BO", "Между стъкло", "Макси стандарт", "Макси лукс", "Макси BO", "Ultimate", "Ultimate Мегавю", "Ultimate BB24");
//Horizontal COLORS
var horizontalColors = new Array(
	18, 	                                                       // price 1
	7, 27, 58, 62, 63, 144, 302, 315, 24, 570, 378, 698, 700, 705,
	707, 711, 712, 713, 714, 715, 872, 866, 716, 717,
	266, 279, 1037, 103, 718, 870, 814,                         // price 2
	1000, 738, 695, 441, 436, 241, 330, "1PR", "285PR", "58PR", // price 3
	780, 781, 8204, 8300, 754, 755,                               // price 4
	991, 992, 993, 994, 995, 996, 997, 998,                       // price 5
	101, 102, 121, 107, 311, 371,                                 // price 6
	"0150", 4459, 7010, 7113,                                     // price 7
	7327, 7332, 7333, 7346, 7418, 8595,                           // price 8
	"0150P", "4459P", "7010P"                                     // price 9
);

var horizontalTable = [
	[15.95, 16.95, 19.95, 25.5, 27.9, 19.95, 29.5, 38.9, 41.5], //Pred stuklo  	20/380 x 10/350
	[17.95, 18.95, 23.95, 29.5, 30.9, 23.95, 34.5, 45.5, 48.9],	// Pred stuklo black out  26/360 x 10/350
	[14.9, 15.9, 18.9, 23.9, 26.9, 18.9, 26.9, 37.3, 38.9],	// Mejdu stuklo		20/380 x 10/350
	[20.5, 21.90, 24.5, 30.5, 31.9, 23.9, 34.5, 44.9, 48.9],	//Max standart		22/300 x 10/350	
	[21.95, 23.95, 26.5, 31.5, 33.9, 25.9, 37.5, 46.9, 50.9],	// Maxi BO		26/300 x 10/350
	[28.9, 29.5, 30.9, 35.9, 36.9, 29.9, 40.9, 48.9, 51.9],	// Maxi LUX		19/300 x 10/220
	[0.00, 0.00, 0.00, 0.00, 55.9, 0.00, 49.9, 61.5, 65.5],	// Ultimate		32/330 x 20/300
	[0.00, 0.00, 0.00, 0.00, 69.5, 0.00, 61.5, 69.9, 74.9],	// Ultimate mega	38/270 x 20/300
	[0.00, 0.00, 0.00, 0.00, 97.9, 0.00, 89.5, 97.9, 99.9]	// BB24		27/150 x 20/250
];

function printOption(option) {
	for (var i = 0; i < option.length; i++) {
		document.write("<option value=" + 'option[i]' + ">" + option[i] + "</option>");
	}
}
//Gettign values ffrom sizes form for Horizontals and Verticals and Prints the result

var colorCode = 0;	//default color
var modelCode = 0; // default model
var totalPrice = 0;
var selctedVerical = 0;
//var selectedVerticalType;

// When clicked on the select menu
function getColor(color) {
	colorCode = color.selectedIndex;
}

function getModel(model) {
	modelCode = model.selectedIndex;	//models are thw rows in  horizontalTable
	selctedVerical = model;
}

// checkes the width and hitght
function checkBoundories(model, width, height) {
	var errorMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	var isThereError = false;
	switch (model) {
		case 0:
		case 2:
			{
				if (width < 20 || width > 380 || height < 10 || height > 350) {
					isThereError = true;
				}
			} break;

		case 1:
			if (width < 26 || width > 380 || height < 10 || height > 350) {
				isThereError = true;
			} break;

		case 3:
			if (width < 22 || width > 300 || height < 10 || height > 350) {
				isThereError = true;
			} break;

		case 4:
			if (width < 26 || width > 300 || height < 10 || height > 350) {
				isThereError = true;
			} break;

		case 5:
			if (width < 19 || width > 300 || height < 10 || height > 220) {
				isThereError = true;
			} break;

		case 6:
			if (width < 32 || width > 330 || height < 20 || height > 300) {
				isThereError = true;
			} break;

		case 7:
			if (width < 38 || width > 270 || height < 20 || height > 300) {
				isThereError = true;
			} break;

		case 8:
			if (width < 27 || width > 150 || height < 20 || height > 250) {
				isThereError = true;
			} break;
	}
	if (isThereError) {
		alert(errorMSG);

	}
}

function printFinalPrice(fromModels) {
	var sizeWidth = document.getElementById("sunblindWidth").value;
	var sizeHeight = document.getElementById("sunblindHeight").value;
	var squareMeters;
	var pricePerSquareMeter = 0;
	var discount = 6;	//precent discount
	var colorGroup;
	var errorMSG = "Зададените размери са извън позволената площ на продукта";

	var normalMaxSquareMeters = 6;
	var ultimateMegaMaxSqareMeters = 4;
	var maxiLuxBB24MaxSquareMeters = 2;

	squareMeters = sizeWidth * sizeHeight / 10000;
	if (squareMeters < 0.5) {
		squareMeters = 0.5;
	}
	// checking the boundories
	if (squareMeters > normalMaxSquareMeters) {
		alert(errorMSG);
	}

	if (modelCode == 4 || modelCode == 8) 	// Po princip e 5 ; ) blabla
	{
		if (squareMeters > 2) {
			alert(errorMSG);
		}
	}
	if (modelCode == 7) {
		if (squareMeters > ultimateMegaMaxSqareMeters) {
			alert(errorMSG);
		}
	}

	checkBoundories(modelCode, sizeWidth, sizeHeight);

	//finding The colors
	if (colorCode == 0) {
		colorGroup = 0;
	}
	if (colorCode > 0) {
		colorGroup = 1;
	}
	if (colorCode > 31) {	// old 40
		colorGroup = 2;
	}
	if (colorCode > 41) {
		colorGroup = 3;
	}
	if (colorCode > 47) {
		colorGroup = 4;
	}
	if (colorCode > 53) {
		colorGroup = 5;
	}
	if (colorCode > 61) {
		colorGroup = 6;
	}
	if (colorCode > 67) {
		colorGroup = 7;
	}
	if (colorCode > 71) {
		colorGroup = 8;
	}
	if(colorCode > 77){
		colorGroup = 9;
	}

	var StrVodeneChk = document.getElementById("stranichnoVodene").checked;
	var PlankiLux = document.getElementById("luxPlanki").checked;

	if (StrVodeneChk == 1) {
		totalPrice = totalPrice + 3.5;
	}
	if (PlankiLux == 1) {
		totalPrice = totalPrice + 0.5;
	}

	pricePerSquareMeter = fromModels[modelCode][colorGroup];
	totalPrice = totalPrice + (squareMeters * pricePerSquareMeter);
	totalPrice -= totalPrice * (discount / 100);

	if (totalPrice == 0) {
		totalPrice = "Неподдържан цвят за този модел";
		document.getElementById("finalPrice").innerHTML = totalPrice;
	}
	else {
		document.getElementById("finalPrice").innerHTML = totalPrice.toFixed(2) + " лв.";
	}
	totalPrice = 0;
	return false;
}


