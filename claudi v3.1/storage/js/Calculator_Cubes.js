// JavaScript Document

// ---Rollers---
var colorCode = 0;	//default color
var modelCode = 0; // default model
var totalPrice = 0;
var isVisible = false;

var rollersModels = ["Стандарт", "Елеганс", "Комфорт",];
var rollerTextiles = [
	"Melisa(11***)", 
    "Classic(50****)",
    "Luna(14****)", 
    "Van Gogh(300**)",
	"Tropic(400**)", 
	"Melisa BlackOut(12***)",
	"Lumina(683****)",
	"Juno(109****)",
	"Isabela BlackOut(800**)", 
	"Antares BlackOut(59****)",  
	"Mineral(777**)",
	"Chats(752**)", 
	"Strata SPC(765**)", 
	"Green Screen ECO(524****)",
	"Zadie(779**)", 
	"Coral(780**)", 
	"Liberty(775**)", 
	"Shade(34****)",
	"Tropicana(781**)", 
	"Print(753**)",
	"Silklook(633****)", 
	"Brodie Fern(157****)",
	"Soltis(99*****)"];

var Coeficient = [
	[1.00, 1.00, 1.20, 1.20, 1.30, 1.30, 1.30, 1.30, 1.50, 1.50, 1.50, 1.70, 1.70, 1.80, 1.90, 2.00, 2.00, 2.20, 2.20, 2.40, 2.40, 2.60, 2.60, 2.60],	// Standart
	[1.00, 1.00, 1.10, 1.20, 1.20, 1.20, 1.20, 1.20, 1.30, 1.30, 1.30, 1.40, 1.40, 1.40, 1.50, 1.50, 1.50, 1.60, 1.70, 1.80, 1.80, 2.00, 2.00, 2.00],	// Elegans
	[1.00, 1.00, 1.20, 1.20, 1.30, 1.30, 1.30, 1.30, 1.40, 1.40, 1.40, 1.70, 1.70, 1.70, 1.70, 1.90, 1.90, 1.90, 1.90, 2.40, 2.40, 2.40, 2.40, 2.40]	// komfort
];

// Roller STANDART
var rollerStandart = [
	[9, 11, 12, 14, 15, 16, 17, 19, 20, 21, 23, 24, 25, 26, 28],
	[9, 12, 13, 15, 16, 17, 19, 20, 22, 23, 24, 26, 27, 29, 30],
	[11, 12, 14, 16, 17, 19, 20, 22, 23, 25, 26, 28, 29, 32, 34],
	[11, 13, 15, 16, 18, 20, 22, 23, 25, 27, 28, 30, 33, 34, 36],
	[12, 14, 16, 17, 19, 21, 23, 25, 26, 28, 30, 33, 35, 36, 38],
	[13, 15, 16, 18, 20, 22, 24, 26, 28, 30, 33, 35, 37, 39, 41],
	[13, 15, 17, 19, 21, 24, 26, 28, 30, 33, 35, 37, 39, 41, 43],
	[14, 16, 18, 20, 23, 25, 27, 29, 32, 34, 37, 39, 41, 43, 45],
	[14, 17, 19, 21, 24, 26, 28, 32, 34, 36, 39, 41, 43, 46, 48],
	[15, 17, 20, 22, 25, 27, 30, 33, 36, 38, 40, 43, 45, 48, 50],
	[16, 18, 21, 23, 26, 28, 32, 35, 37, 40, 42, 45, 47, 50, 54],
	[16, 19, 22, 24, 27, 30, 33, 36, 39, 41, 44, 47, 50, 53, 56],
	[17, 20, 22, 25, 28, 32, 35, 38, 40, 43, 46, 49, 53, 56, 58],
	[17, 20, 23, 26, 29, 33, 36, 39, 42, 45, 48, 51, 55, 58, 61],
	[18, 21, 24, 27, 30, 34, 37, 40, 44, 47, 50, 54, 57, 60, 63],
	[18, 22, 25, 28, 32, 36, 39, 42, 45, 48, 53, 56, 59, 62, 65],
	[19, 22, 26, 29, 33, 37, 40, 43, 47, 50, 54, 58, 61, 65, 68],
	[20, 23, 27, 30, 34, 38, 41, 45, 48, 53, 56, 60, 63, 67, 70],
	[20, 24, 27, 32, 36, 39, 43, 46, 50, 55, 58, 62, 65, 69, 74],
	[21, 24, 28, 33, 37, 40, 44, 48, 53, 56, 60, 64, 68, 71, 76],
	[21, 25, 29, 34, 38, 42, 46, 49, 54, 58, 62, 66, 70, 75, 78],
	[22, 26, 30, 35, 39, 43, 47, 51, 56, 60, 64, 68, 72, 77, 81]
];

var rollerElegans = [
	[18, 20, 21, 23, 25, 27, 29, 32, 34, 36, 38, 40],
	[19, 21, 23, 25, 27, 29, 32, 34, 36, 38, 40, 42],
	[20, 22, 24, 26, 29, 32, 34, 36, 38, 40, 43, 45],
	[21, 23, 26, 28, 30, 34, 36, 38, 40, 43, 45, 47],
	[22, 25, 27, 30, 33, 35, 38, 40, 43, 45, 48, 50],
	[23, 26, 29, 32, 35, 37, 40, 42, 45, 47, 50, 54],
	[25, 27, 30, 34, 36, 39, 42, 44, 47, 50, 53, 56],
	[26, 29, 32, 35, 38, 41, 44, 46, 49, 53, 56, 59],
	[27, 30, 34, 37, 40, 43, 46, 48, 51, 55, 58, 61],
	[28, 32, 35, 38, 41, 44, 47, 51, 55, 58, 61, 64],
	[29, 33, 37, 40, 43, 46, 49, 54, 57, 60, 63, 66],
	[30, 35, 38, 41, 45, 48, 51, 56, 59, 62, 66, 69],
	[32, 36, 39, 43, 46, 50, 54, 58, 61, 65, 68, 72],
	[34, 37, 41, 44, 48, 53, 56, 60, 63, 67, 71, 75],
	[35, 39, 42, 46, 50, 54, 58, 62, 66, 69, 74, 78],
	[36, 40, 44, 47, 51, 56, 60, 64, 68, 72, 76, 80],
	[37, 41, 45, 49, 54, 58, 62, 66, 70, 75, 79, 83],
	[38, 42, 46, 51, 56, 60, 64, 68, 72, 77, 81, 85],
	[39, 44, 48, 53, 57, 62, 66, 70, 75, 80, 84, 88],
	[41, 45, 49, 55, 59, 63, 68, 72, 78, 82, 86, 91],
	[42, 46, 51, 56, 61, 65, 70, 75, 80, 84, 89, 93],
	[43, 47, 53, 58, 62, 67, 72, 77, 82, 87, 91, 97]
];

var rollerPrestige = [
	[23, 25, 27, 29, 32, 34, 36, 38, 40, 43, 45, 47, 49, 52, 54, 56, 58, 60, 63],
	[23, 26, 28, 30, 33, 35, 38, 40, 42, 45, 47, 49, 52, 54, 56, 59, 61, 63, 66],
	[24, 27, 29, 32, 34, 37, 39, 42, 44, 47, 49, 52, 54, 56, 59, 61, 64, 66, 69],
	[25, 27, 30, 33, 35, 38, 41, 43, 46, 48, 51, 54, 56, 59, 62, 64, 67, 70, 72],
	[25, 28, 31, 34, 36, 39, 42, 45, 48, 50, 53, 56, 59, 61, 64, 67, 70, 73, 75],
	[26, 29, 32, 35, 38, 41, 44, 46, 49, 52, 55, 58, 61, 64, 67, 70, 73, 76, 79],
	[27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 73, 76, 79, 82],
	[27, 30, 34, 37, 40, 43, 47, 50, 53, 56, 59, 63, 66, 69, 72, 75, 79, 82, 85],
	[28, 31, 35, 38, 41, 45, 48, 51, 55, 58, 61, 65, 68, 71, 75, 78, 82, 85, 88],
	[29, 32, 36, 39, 43, 46, 50, 53, 57, 60, 64, 67, 70, 74, 77, 81, 84, 88, 91],
	[29, 33, 36, 40, 44, 47, 51, 55, 58, 62, 66, 69, 73, 76, 80, 84, 87, 91, 95],
	[30, 34, 37, 41, 45, 49, 53, 56, 60, 64, 68, 71, 75, 79, 83, 87, 90, 94, 98],
	[30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 81, 85, 89, 93, 97, 101],
	[31, 35, 39, 43, 47, 51, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104],
	[32, 36, 40, 44, 49, 53, 57, 61, 65, 70, 74, 78, 82, 86, 91, 95, 99, 103, 108],
	[32, 37, 41, 45, 50, 54, 59, 63, 67, 72, 76, 80, 85, 89, 93, 98, 102, 106, 111],
	[33, 38, 42, 47, 51, 56, 60, 65, 69, 73, 78, 82, 87, 91, 96, 100, 105, 109, 114],
	[34, 38, 43, 48, 52, 57, 62, 66, 71, 75, 80, 85, 89, 94, 99, 103, 108, 113, 117],
	[34, 39, 44, 49, 53, 58, 63, 68, 73, 77, 82, 87, 92, 96, 101, 106, 111, 116, 120],
	[35, 40, 45, 50, 55, 60, 64, 69, 74, 79, 84, 89, 94, 99, 104, 109, 114, 119, 124],
	[36, 41, 46, 51, 56, 61, 66, 71, 76, 81, 86, 91, 96, 101, 107, 112, 117, 122, 127],
	[36, 41, 47, 52, 57, 62, 67, 73, 78, 83, 88, 94, 99, 104, 109, 114, 120, 125, 130],
	[37, 42, 48, 53, 58, 64, 69, 74, 80, 85, 90, 96, 101, 106, 112, 117, 123, 128, 133],
	[37, 43, 48, 54, 59, 65, 70, 76, 81, 87, 92, 98, 103, 109, 114, 120, 125, 131, 136],
	[38, 44, 49, 55, 61, 66, 72, 78, 83, 89, 95, 100, 106, 111, 117, 123, 128, 134, 140]
];

function printOption(option) {
	for (var i = 0; i < option.length; i++) {
		document.write("<option value=" + 'option[i]' + ">" + option[i] + "</option>");
	}
}

//Receving Info from dropdown menu
function getColor(color) {
	colorCode = color.selectedIndex;
}

function getModel(model) {
	modelCode = model.selectedIndex;
	var obj = document.getElementById('extrasChk');

	if (model.selectedIndex == 0) {
		obj.style.visibility = "visible";
		isVisible = true;
	}
	else {
		obj.style.visibility = "hidden";
		isVisible = false;
	}
}

function findPrize(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	//local = local / 10;
	local = local - 4;

	if (local < 0) {
		local = 0;
	}

	return local;
}

function CheckBoundories(model, width, height) {
	var errMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	switch (model) {
		case 0:
			if (width > 180 || width < 15 || height > 250 || height < 15) {
				alert(errMSG);
			} break;

		case 1:
			if (width > 150 || width < 15 || height > 250 || height < 15) {
				alert(errMSG);
			} break;

		case 2:
			if (width > 220 || width < 40 || height > 300 || height < 40) {
				alert(errMSG);
			} break;
	}
}

function printFinalPrice() {
	var sizeWidth = document.getElementById("sunblindWidth").value;
	var sizeHeight = document.getElementById("sunblindHeight").value;
	var discount = 6;	//precent discount

	CheckBoundories(modelCode, sizeWidth, sizeHeight);

	sizeWidth = findPrize(sizeWidth);
	sizeHeight = findPrize(sizeHeight);

	var extras = document.getElementById("extras").checked;

	switch (modelCode) {
		case 0:
			totalPrice = rollerStandart[sizeHeight][sizeWidth];
			totalPrice *= Coeficient[0][colorCode];
			if (extras == 1) {
				totalPrice += 3;
			} break;

		case 1:
			totalPrice = rollerElegans[sizeHeight][sizeWidth];
			totalPrice *= Coeficient[1][colorCode];
			break;

		case 2:
			totalPrice = rollerPrestige[sizeHeight - 2][sizeWidth];
			totalPrice *= Coeficient[2][colorCode];
			break;
	}

	totalPrice -= totalPrice * (discount / 100);

	document.getElementById("finalPrice").innerHTML = totalPrice.toFixed(2) + " лв.";
	totalPrice = 0;
	return false;
}