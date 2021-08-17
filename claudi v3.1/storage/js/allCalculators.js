//dograma
var profileName = ["PVC KMG 4 кам.", "PVC KMG 6 кам.", "PVC Trocal 5 кам.", "PVC Trocal 6 кам.",
	"PVC Salamander 5 кам.", "PVC Salamander 6 кам.", "AL студен ETEM 40mm", "AL Термо ETEM 60mm"
	, "VEKA 5 kam."];
var profilePricePerMeter = [
	[5.8, 7, 10.35 /* -0.8 for  Wings*/, 15 /* -1.5 for  Wings*/, 16, 31 /* -11 for  Wings, +16 for Separator*/, 9.45 /* +3.15 for  Wings*/, 23,
		8.5 /* + 4 for separator*/],	//  White
	[10.5, 11.5, 17.25 /* -0.8 for Wings*/, 24.75 /* -1.1 for  Wings*/, 25.5, 50 /* -20 for  Wings, +34 for Separator*/, 15.05 /* +3.15 for  Wings*/, 31,
		16/* + 7 for separator*/]	// Colored
];
var profileColors = ["Бял", "Имитация Дърво"];
var glassName = ["бяло/бяло", "бяло/Ка", "бяло/високоенергийно"];
var glasPirce = [
	[22.92, 27.61, 30.74], // Price per square meter for RollPlast
	[24, 29, 32] // Price for VipLine -> remove 18% from hole square
];

var typeOfTheWindow = 0;
var sqrtMeters = 0;
var mechanismsPirze = 0;
var addonsPrize = 0;
var expansion = 38;
var discount = 10;

var wingWidth = 0;
var wingHeight = 0;
var doorWidth = 0;
var doorHeight = 0;
var hasDoor = false;
var hasWing = 0;

var colorCode = 0;
var modelCode = 0;
var glassCode = 0;

function getColor(color) {
	colorCode = color.selectedIndex;
}
function getModel(model) {
	modelCode = model.selectedIndex;
}
function getGlass(glass) {
	glassCode = glass.selectedIndex;
}

// Main funciton
function setConfiguration(confNo) {
	switchImage(confNo);

	var windowWidth = Number(document.getElementById("Width").value);
	var windowHeight = Number(document.getElementById("Height").value);
	var wingProfileLenght = 0;//wingWidth * 2 + wingHeight * 2;
	var doorProfileLenght = 0;//doorWidth * 2 + doorHeight * 2;
	var profileTotalLength = 0;
	var delimeters = 0;
	var innerDelimiters = 0;
	var doubleOpenAddon;
	var glassTotalPrize = 0;
	var totalPrize = 0;
	var delimeterLenght = 0;
	sqrtMeters = 0;
	mechanismsPirze = 0;

	switch (confNo) {
		case 3:
			delimeters = 1;
			break;

		case 7:
			delimeters = 1;
			innerDelimiters = 1;
			break;

		case 2:
		case 6:
			delimeters = 2;
			break;

		case 4:
			delimeters = 3;
			break;

		case 5:
		case 8:
			innerDelimiters = 1;
			break;

		default:
			innerDelimiters = 0;
			delimeters = 0;
			break;
	}

	if (hasDoor) {
		doorWidth = Number(document.getElementById("WidthDoorWing").value);
		doorHeight = Number(document.getElementById("HeightDoorWing").value);
		doorProfileLenght = addWing(doorWidth, doorHeight, 1);
		doorProfileLenght += doorWidth;
		profileTotalLength += addWing(doorWidth, doorHeight, 1);
		getMechanismsPrize(doorWidth, doorHeight, modelCode, 1);
		sqrtMeters += (doorWidth * doorHeight) / 10000;
	}
	else {
		doorWidth = 0;
		doorHeight = 0;
		doorProfileLenght = 0;
		sqrtMeters = 0;
	}

	if (hasWing > 0) {
		if (typeOfTheWindow != 0 && typeOfTheWindow != 8) {
			wingProfileLenght += addWing(75, windowHeight, hasWing);	// default wing width
			getMechanismsPrize(75, windowHeight, modelCode, hasWing);
		}
		else {
			wingProfileLenght += addWing(windowWidth, windowHeight, hasWing);
			getMechanismsPrize(windowWidth, windowHeight, modelCode, hasWing);
		}
	}
	else {
		wingProfileLenght = 0;
	}

	wingProfileLenght += doorProfileLenght;
	profileTotalLength += windowWidth * 2 + windowHeight * 2;
	profileTotalLength += delimeters * windowHeight;
	delimeterLenght += delimeters * windowHeight;
	sqrtMeters += (windowWidth * windowHeight) / 10000;

	if (typeOfTheWindow == 8) {
		wingProfileLenght += innerDelimiters * windowWidth;
		//delimeterLenght += innerDelimiters * windowWidth;
	}
	else {
		//profileTotalLength += innerDelimiters * doorWidth;
	}

	// Printing the total prize :
	profileTotalLength = profileTotalLength / 100;
	totalPrize = getProfilePrize(profileTotalLength, wingProfileLenght);
	console.log(totalPrize);
	totalPrize += getGlassPrize(sqrtMeters);
	console.log(totalPrize);
	totalPrize += getAddonsPrize(delimeterLenght, (delimeters + innerDelimiters), windowWidth, sqrtMeters);
	console.log(totalPrize);
	totalPrize += mechanismsPirze;
	console.log(totalPrize);
	totalPrize += expansion / 100 * totalPrize;
	console.log(totalPrize);
	totalPrize -= discount / 100 * totalPrize;
	console.log(totalPrize);
	totalPrize = checkBoundories(windowWidth, windowHeight, doorWidth, doorHeight, totalPrize);
	console.log(totalPrize);
	document.getElementById("finalPrice").innerHTML = totalPrize.toFixed(2) + " лв.";
}

// Showing the invisible fields
function ShowDoorArea(obj) {
	obj.style.display = "visible";
}

// Setting the image to the blueprint
function switchImage(configuration) {
	var old = document.getElementById("blueprintCanvas");
	var img = document.createElement("img");
	var source;
	var doorW = document.getElementById("doorWidth");
	var doorH = document.getElementById("doorHeight");

	switch (configuration) {
		case 0:
			source = "http://claudi-resp.website.bg/storage/calculatorImg/otv.jpg";
			typeOfTheWindow = 0;
			hasWing = 1;
			break;
		case 1:
			source = "http://claudi-resp.website.bg/storage/calculatorImg/fix.jpg";
			typeOfTheWindow = 1;
			hasWing = 0;
			break;
		case 2:
			source = "http://claudi-resp.website.bg/storage/calculatorImg/fix_otv_fix.jpg";
			typeOfTheWindow = 2;
			hasWing = 1;
			break;
		case 3:
			source = "http://claudi-resp.website.bg/storage/calculatorImg/otv_fix.jpg";
			typeOfTheWindow = 3;
			hasWing = 1;
			break;
		case 4:
			source = "http://claudi-resp.website.bg/storage/calculatorImg/fix_otv_otv_fix.jpg";
			typeOfTheWindow = 4;
			hasWing = 2;
			break;
		case 5:
			source = "http://claudi-resp.website.bg/storage/calculatorImg/proz_fix_vrata.jpg";
			typeOfTheWindow = 5;
			doorW.style.visibility = "visible";
			doorH.style.visibility = "visible";
			hasWing = 0;
			break;
		case 6:
			source = "http://claudi-resp.website.bg/storage/calculatorImg/otv_fix_otv.jpg";
			typeOfTheWindow = 6;
			hasWing = 2;
			break;
		case 7:
			source = "http://claudi-resp.website.bg/storage/calculatorImg/otv_fix_vrata.jpg";
			typeOfTheWindow = 7;
			doorW.style.visibility = "visible";
			doorH.style.visibility = "visible";
			hasWing = 1;
			break;
		case 8:
			source = "http://claudi-resp.website.bg/storage/calculatorImg/vrata.jpg";
			typeOfTheWindow = 8;
			hasWing = 1;
			break;
	}


	if (configuration != 5 && configuration != 7) {
		doorW.style.visibility = "hidden";
		doorH.style.visibility = "hidden";
		hasDoor = false;
		//doorWidth = 0;
		//doorHeight = 0;
	}
	else {
		hasDoor = true;
	}

	img.src = source;
	img.width = 260;
	img.height = 150;
	document.getElementById("blueprintCanvas").innerHTML = '<img src="' + img.src + '">';
}

function addWing(sizeWidth, sizeHeight, quantity) {
	// TODO: Add mechanisms
	var l = (sizeWidth * 2 + sizeHeight * 2) * quantity;
	return l;
}

function getGlassPrize(sqrtMeters) {
	var sqr = sqrtMeters;
	var total;
	var row;
	switch (modelCode) {
		case 2:
		case 3:
		case 6:
			row = 0;
			break;

		default:
			row = 1;
			sqr -= 18 / 100 * sqr;
			break;
	}
	total = sqr * glasPirce[row][glassCode];
	return total;
}

function getProfilePrize(len, wingLen) {
	var total;
	var wingProfileAddPrize = [
		[0, 0, 0.8, 1.5, 0, 11, 3.15, 0, 0],	// White
		[0, 0, 0.8, 1.1, 0, 20, 3.15, 0, 0]	// Colored
	];
	var wing = wingLen / 100;
	var price = profilePricePerMeter[colorCode][modelCode];
	total = len * price;
	total += wing * (price - wingProfileAddPrize[colorCode][modelCode]);
	return total;
}

function getMechanismsPrize(width, height, profileType, count) {
	// Mechanisms for Rollplast PVC -> 29.25 , +10.5 for Doors
	// Mechanisms for Rollplast AL  -> 45    , + 0 for Double mechanism
	// Mechanisms for VipLine   PVC -> 23    , +10 for Doors ,+ 12 for double mechanism
	// Mechanisms for VipLine Al Termo -> 20,  +42 for Double Mechanism
	var rollPVCMechNormal = 29.25;
	var rollPVCMechLong = 39.75;
	//var rollPVCDouble = 0;
	var rollAlNormal = 31.5;	// This Al doesn't have double mechanism

	var vipPVCMechNormal = 23;
	var vipPVCMechLong = 33;
	var vipPVCDouble = 12;
	var vipAlMechNormal = 20;
	var vipAlDouble = 42;	// Addon 
	//mechanismsPirze
	var dblMechanism = document.getElementById("doubleMechanism").checked;
	var addons = 0;

	switch (profileType) {
		case 2:
		case 3:
			if (height <= 180) {
				mechanismsPirze += rollPVCMechNormal;
			}
			else {
				mechanismsPirze += rollPVCMechLong;
			}
			break;

		case 6:
			mechanismsPirze += rollAlNormal;
			break;

		case 7:
			mechanismsPirze += vipAlMechNormal;
			if (dblMechanism == 1) {
				addons += vipAlDouble;
			}
			else {
				addons = 0;
			}
			break;

		default:
			if (height <= 140) {
				mechanismsPirze += vipPVCMechNormal;
				// if double
				if (dblMechanism == 1) {
					addons += vipPVCDouble;
				}
				else {
					addons = 0;
				}
			}
			else	// Long Wing
			{
				mechanismsPirze += vipPVCMechLong;
				// if double
				if (dblMechanism == 1) {
					addons += vipPVCDouble;
				}
				else {
					addons = 0;
				}
			}
			if (width > 80) {
				mechanismsPirze += 10;
				if (dblMechanism == 1) {
					addons += 5;
				}
				// else
			}
			break;
	}
	mechanismsPirze = mechanismsPirze * count;
	mechanismsPirze += addons;
	//return mechanismsPirze;
	// TODO: Adding double mechanisms for more than 1 wing or door
}

function getAddonsPrize(delimeterLen, delCounter, winWidth, sqrtMeters) {
	var total = 0
	var alAddon = document.getElementById("alOutside").checked;
	var pvcAddon = document.getElementById("pvcInside").checked;

	if (modelCode == 5 && colorCode == 0) {
		total += delimeterLen * 16 / 100;
	}
	else if (modelCode == 5 && colorCode == 1) {
		total += delimeterLen * 34 / 100;
	}
	else if (modelCode == 8) {	// VEKA
		if (colorCode == 0) {
			total += delimeterLen * 4 / 100;
		}
		else {	// colored profile
			total += delimeterLen * 7 / 100;
		}
	};
	switch (modelCode)	// Per delimeter
	{
		case 2:
		case 3:
		case 6:
			total += 12 * delCounter;
			break;

		case 5:
			total += 10 * delCounter;
			total += 5 * sqrtMeters;
			break;

		default:
			total += 5 * delCounter;
			total += 5 * sqrtMeters;
			break;
	}

	if (alAddon == 1) {
		if (colorCode == 0) {
			total += winWidth * 0.087; // 150mm AL
		}
		else {
			total += winWidth * 0.127; // 150 AL colored
		}
	}

	if (pvcAddon == 1) {
		if (colorCode == 0) {
			total += winWidth * 0.08; // PVC 150mm
		}
		else {
			total += winWidth * 0.11; // PVC 150mm colored
		}
	}

	return total;
}

function checkBoundories(width, height, doorW, doorH, prize) {
	var accept = true;
	switch (typeOfTheWindow) {
		case 0:
		case 8:
			if (width < 50 || width > 90 || height < 40 || height > 230) {
				accept = false;
			} break;

		case 5:
		case 7:
			if (doorW < 50 || doorW > 90 || doorH < 40 || doorH > 230 || width < 40 || width > 500 || height < 40 || height > 500) {
				accept = false;
			}
			break;

		default:
			if (width < 40 || width > 500 || height < 40 || height > 500) {
				accept = false;
			} break;
	}

	if (accept == true) {
		return prize;
	}
	else {
		alert("Зададените размери са извън позволените ширина/височина.");
		return 0;
	}
}



///////////////////////////////////
//   horizontalni shtori - start //
///////////////////////////////////

//Gettign values from sizes form for Horizontals and Verticals and Prints the result
var colorCode = 0;	//default color
var modelCode = 0; // default model
var totalPrice = 0;
var selctedVerical = 0;
//var selectedVerticalType;

//Horizontals MODELS ---------------------------
var horizontalModels = new Array("Пред стъкло", "Пред стъкло BO", "Между стъкло", "Макси стандарт", "Макси BO", "Макси лукс", "Ultimate", "MegaView", "VarioFlex");
//Horizontal COLORS

// if (modelCode > 1) {
// 	plankiCheck = document.getElementById("luxPlanki").checked;
// 	plankiCheck.style.display = "none";
// 	}
var horizontalColors = new Array(
	18, 	                                                       // price group 0 - to 0
	7, 27, 58, 62, 63, 144, 302, 315, 24, 570, 378, 698, 700, 705, 707, 711, 712, 713, 714, 715, 872, 866, 716, 717, 266, 279, 1037, 103, 718, 870, 814, // price group 1 - to 31
	1000, 027, 738, 695, 441, 436, 241, 330, "1PR", "285PR", "58PR", // price 2 - 42
	780, 781, 8204, 8300, 754, 755,                               // price group 3 - to 48
	991, 992, 993, 994, 995, 996, 997, 998,                       // price group 4 - to 56
	101, 102, 121, 107, 311, 371,                                 // price group 5 - to 62
	"0150", 4459, 7010, 7113,                                     // price group 6 - to 66
	7327, 7332, 7333, 7346, 7418, 8595,                           // price group 7 - to 72
	"0150P", "4459P", "7010P"                                     // price group 8 - to 75
);

var CoeficientHorizontal = [
	[1.00, 1.07, 1.35, 1.60, 1.80, 1.30, 1.60, 2.50, 2.50],	// Pred Styklo
	[1.10, 1.20, 1.45, 1.70, 1.90, 1.40, 1.70, 2.60, 2.60],	// BlackOut
	[1.00, 1.07, 1.35, 1.60, 1.80, 1.30, 1.60, 2.50, 2.50],	// Mejdu Styklo
	[1.00, 1.10, 1.25, 1.50, 1.60, 1.20, 1.50, 2.20, 2.20],	// Maxi Standart
	[1.10, 1.20, 1.35, 1.60, 1.70, 1.30, 1.60, 2.30, 2.30],	// Maxi BlackOut
	[1.40, 1.45, 1.50, 1.70, 1.75, 1.45, 1.70, 2.40, 2.40], // Maxi Lux
	[0.00, 0.00, 0.00, 0.00, 1.25, 1.00, 1.20, 1.60, 1.60],	// UltiMate
	[0.00, 0.00, 0.00, 0.00, 1.40, 1.15, 1.35, 1.75, 1.75], // MegaView
	[0.00, 0.00, 0.00, 0.00, 1.90, 1.65, 1.85, 2.25, 2.25]  // VarioFlex
];

var predStykloTable = [
		[12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 16, 16, 17, 18, 18, 19, 20, 20, 21, 22, 22, 24, 24, 25, 26, 27],
		[12, 12, 12, 12, 12, 12, 12, 12, 13, 15, 16, 16, 18, 19, 19, 20, 21, 22, 24, 24, 25, 26, 27, 27, 28, 29, 30, 31],
		[12, 12, 12, 12, 12, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 27, 28, 29, 30, 31, 32, 34, 35, 37],
		[12, 12, 12, 12, 12, 13, 15, 16, 17, 18, 19, 21, 22, 24, 25, 26, 27, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 41],
		[12, 12, 12, 12, 13, 15, 17, 18, 19, 20, 21, 24, 25, 27, 28, 29, 30, 31, 34, 35, 36, 37, 38, 39, 41, 43, 44, 46],
		[12, 12, 12, 12, 15, 17, 18, 19, 20, 22, 24, 26, 28, 29, 30, 32, 34, 35, 37, 38, 39, 41, 43, 44, 45, 47, 48, 50],
		[12, 12, 12, 13, 16, 18, 19, 21, 22, 24, 26, 28, 30, 31, 34, 35, 37, 38, 40, 41, 43, 45, 46, 48, 49, 52, 53, 56],
		[12, 12, 12, 15, 17, 19, 20, 22, 25, 26, 28, 30, 32, 35, 36, 38, 39, 41, 44, 45, 47, 48, 50, 53, 54, 56, 57, 60],
		[12, 12, 13, 16, 18, 20, 22, 25, 26, 28, 30, 32, 35, 37, 39, 40, 43, 45, 47, 48, 50, 53, 54, 56, 58, 60, 62, 65],
		[12, 12, 15, 17, 19, 21, 24, 26, 28, 30, 32, 35, 37, 39, 41, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 65, 66, 69],
		[12, 13, 16, 18, 20, 22, 25, 27, 29, 31, 35, 37, 39, 41, 44, 47, 49, 52, 54, 56, 58, 60, 63, 65, 67, 69, 72, 75],
		[12, 13, 16, 19, 21, 25, 27, 29, 31, 34, 36, 39, 43, 45, 47, 49, 52, 54, 57, 59, 62, 64, 66, 68, 71, 73, 76, 80],
		[12, 15, 17, 19, 22, 26, 28, 30, 34, 36, 38, 41, 45, 47, 49, 53, 55, 57, 59, 63, 65, 67, 71, 73, 75, 77, 81, 84],
		[12, 15, 18, 20, 24, 27, 29, 32, 35, 38, 40, 44, 47, 49, 53, 55, 58, 60, 63, 66, 68, 72, 74, 77, 80, 82, 85, 88],
		[13, 16, 19, 21, 25, 28, 31, 34, 37, 39, 43, 46, 49, 53, 55, 58, 60, 64, 66, 69, 73, 75, 78, 81, 84, 86, 90, 94],
		[13, 17, 19, 22, 26, 29, 32, 36, 38, 41, 45, 48, 52, 55, 58, 60, 64, 67, 69, 73, 76, 80, 82, 85, 88, 91, 94, 99],
		[15, 17, 20, 24, 27, 30, 34, 37, 40, 44, 47, 50, 55, 57, 60, 64, 67, 71, 73, 76, 80, 83, 86, 90, 92, 95, 99, 103],
		[15, 18, 21, 25, 28, 32, 36, 39, 43, 45, 49, 53, 57, 60, 64, 67, 71, 73, 76, 80, 83, 86, 90, 93, 96, 100, 103, 108],
		[15, 19, 22, 26, 29, 34, 37, 40, 44, 47, 52, 55, 59, 63, 66, 69, 73, 76, 80, 84, 87, 91, 94, 97, 101, 104, 108, 113],
		[16, 19, 22, 27, 30, 35, 38, 41, 46, 49, 53, 57, 62, 65, 69, 73, 76, 80, 83, 87, 91, 94, 97, 102, 105, 109, 0, 0],
		[16, 20, 24, 27, 31, 36, 40, 44, 47, 52, 55, 59, 64, 68, 72, 75, 80, 83, 86, 91, 94, 99, 102, 105, 110, 0, 0, 0],
		[17, 20, 25, 28, 32, 37, 41, 45, 49, 53, 57, 62, 66, 71, 74, 78, 82, 86, 90, 94, 97, 102, 105, 110, 0, 0, 0, 0],
		[17, 21, 26, 29, 34, 39, 43, 47, 50, 55, 59, 64, 69, 73, 77, 81, 85, 90, 93, 97, 102, 105, 110, 0, 0, 0, 0, 0],
		[18, 22, 26, 30, 35, 40, 45, 48, 53, 57, 62, 66, 72, 76, 80, 84, 88, 93, 96, 101, 105, 110, 0, 0, 0, 0, 0, 0],
		[18, 22, 27, 31, 36, 41, 46, 50, 55, 59, 64, 68, 74, 78, 83, 87, 92, 95, 100, 104, 109, 0, 0, 0, 0, 0, 0, 0],
		[19, 24, 28, 32, 37, 43, 47, 52, 56, 60, 66, 71, 76, 81, 85, 90, 94, 99, 103, 108, 0, 0, 0, 0, 0, 0, 0, 0],
		[19, 24, 29, 34, 38, 44, 48, 54, 58, 63, 68, 73, 78, 83, 88, 93, 97, 102, 106, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[20, 25, 29, 35, 39, 45, 50, 55, 59, 65, 69, 75, 81, 86, 91, 95, 101, 105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[20, 26, 30, 36, 40, 47, 52, 57, 62, 66, 72, 77, 84, 88, 94, 99, 103, 109, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	
	var maxiTable = [
		[15, 15, 15, 15, 15, 15, 15, 15, 16, 17, 17, 18, 19, 20, 21, 22, 24, 25, 26, 26, 27, 28, 29, 30, 31, 31, 32, 34],
		[15, 15, 15, 15, 15, 15, 16, 16, 17, 18, 19, 20, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39],
		[15, 15, 15, 15, 15, 16, 17, 18, 19, 20, 22, 24, 25, 26, 27, 29, 30, 31, 32, 34, 35, 36, 37, 39, 40, 41, 43, 45],
		[15, 15, 15, 15, 15, 17, 18, 20, 21, 22, 25, 26, 27, 29, 30, 31, 34, 35, 36, 37, 39, 40, 41, 44, 45, 46, 47, 49],
		[15, 15, 15, 15, 17, 18, 20, 21, 24, 25, 27, 28, 30, 31, 34, 35, 36, 38, 39, 41, 43, 45, 46, 47, 49, 50, 53, 55],
		[15, 15, 15, 16, 18, 20, 21, 24, 25, 27, 29, 30, 32, 35, 36, 38, 39, 41, 44, 45, 47, 48, 50, 52, 54, 56, 57, 59],
		[15, 15, 15, 17, 19, 21, 24, 25, 27, 29, 31, 32, 35, 37, 39, 41, 43, 45, 47, 48, 50, 53, 55, 56, 58, 60, 62, 65],
		[15, 15, 16, 18, 20, 22, 25, 27, 29, 31, 34, 35, 38, 40, 43, 44, 46, 48, 50, 53, 55, 57, 58, 60, 63, 65, 67, 69],
		[15, 15, 17, 19, 21, 24, 26, 28, 30, 32, 36, 38, 40, 43, 45, 47, 49, 52, 54, 56, 58, 60, 63, 65, 67, 69, 72, 75],
		[15, 16, 18, 20, 22, 26, 28, 30, 32, 35, 38, 40, 43, 46, 48, 50, 53, 55, 57, 60, 63, 65, 67, 69, 72, 74, 77, 80],
		[15, 16, 19, 21, 24, 27, 29, 31, 35, 37, 40, 43, 46, 48, 50, 54, 56, 58, 62, 64, 66, 69, 72, 74, 76, 80, 82, 85],
		[15, 17, 19, 22, 25, 28, 31, 34, 36, 39, 43, 45, 48, 52, 54, 56, 59, 62, 65, 67, 71, 73, 76, 78, 82, 84, 86, 91],
		[15, 18, 20, 24, 26, 29, 32, 36, 38, 41, 45, 47, 50, 54, 57, 59, 63, 65, 68, 72, 74, 77, 80, 83, 86, 88, 92, 95],
		[15, 18, 21, 25, 27, 31, 34, 37, 40, 44, 47, 49, 54, 57, 59, 63, 66, 68, 72, 75, 78, 81, 84, 87, 91, 93, 96, 101],
		[16, 19, 22, 26, 28, 32, 36, 39, 43, 45, 49, 52, 56, 59, 63, 66, 69, 73, 75, 78, 82, 85, 88, 92, 95, 99, 102, 105],
		[16, 19, 24, 27, 30, 34, 37, 40, 44, 47, 52, 55, 58, 62, 66, 69, 73, 76, 80, 83, 86, 90, 93, 96, 100, 103, 106, 111],
		[17, 20, 24, 27, 31, 35, 39, 43, 46, 49, 54, 57, 62, 65, 68, 72, 76, 80, 83, 86, 90, 93, 97, 101, 104, 108, 111, 115],
		[17, 21, 25, 28, 32, 37, 40, 44, 48, 52, 56, 59, 64, 67, 72, 75, 78, 83, 86, 90, 94, 97, 101, 105, 109, 112, 116, 121],
		[18, 21, 26, 29, 34, 38, 41, 46, 49, 54, 58, 62, 66, 71, 74, 78, 82, 86, 90, 94, 97, 102, 105, 110, 113, 118, 121, 127],
		[18, 22, 27, 30, 35, 39, 44, 48, 52, 56, 60, 64, 69, 73, 77, 82, 85, 90, 94, 97, 102, 105, 110, 114, 118, 122, 0, 0],
		[19, 24, 28, 31, 36, 41, 45, 49, 54, 58, 63, 66, 72, 76, 81, 84, 88, 93, 97, 101, 105, 110, 114, 119, 122, 0, 0, 0],
		[19, 24, 28, 32, 37, 43, 47, 52, 56, 59, 65, 69, 74, 78, 83, 87, 92, 96, 101, 105, 110, 114, 119, 123, 0, 0, 0, 0],
		[20, 25, 29, 34, 38, 44, 48, 53, 57, 62, 67, 72, 77, 82, 86, 91, 95, 100, 104, 109, 113, 118, 122, 0, 0, 0, 0, 0],
		[21, 26, 30, 35, 39, 45, 50, 55, 59, 64, 69, 74, 80, 84, 90, 94, 99, 103, 108, 113, 118, 122, 0, 0, 0, 0, 0, 0],
		[21, 26, 31, 36, 40, 47, 52, 56, 62, 66, 72, 76, 82, 87, 92, 96, 102, 106, 112, 116, 121, 0, 0, 0, 0, 0, 0, 0],
		[22, 27, 32, 37, 41, 48, 53, 58, 63, 68, 74, 78, 85, 90, 95, 100, 105, 110, 115, 120, 0, 0, 0, 0, 0, 0, 0, 0],
		[22, 28, 32, 38, 44, 49, 55, 59, 65, 71, 76, 81, 87, 93, 97, 103, 109, 113, 119, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[24, 28, 34, 39, 45, 50, 56, 62, 67, 73, 78, 83, 90, 95, 101, 106, 112, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[24, 29, 35, 40, 46, 53, 58, 64, 68, 74, 81, 86, 93, 99, 104, 110, 115, 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	
	var megaViewTable = [
		[25, 25, 25, 26, 28, 32, 35, 36, 38, 40, 43, 45, 50, 52, 54, 56, 57, 59, 62, 64, 65, 67, 69, 71, 73, 75, 77, 83],
		[25, 25, 26, 28, 29, 35, 37, 39, 41, 44, 46, 48, 54, 56, 58, 60, 63, 65, 67, 69, 72, 74, 75, 77, 80, 82, 84, 91],
		[25, 25, 27, 29, 31, 37, 39, 41, 44, 46, 49, 52, 58, 60, 63, 65, 67, 71, 73, 75, 77, 80, 82, 84, 86, 90, 92, 99],
		[25, 26, 28, 31, 34, 39, 41, 45, 47, 49, 53, 56, 62, 65, 67, 69, 73, 75, 78, 81, 83, 86, 88, 91, 94, 96, 99, 106],
		[25, 27, 29, 32, 35, 41, 44, 47, 49, 53, 56, 59, 66, 69, 72, 75, 77, 81, 83, 86, 90, 92, 95, 97, 101, 103, 106, 114],
		[25, 28, 31, 34, 37, 44, 47, 49, 53, 56, 59, 63, 71, 73, 76, 80, 83, 86, 88, 92, 95, 99, 102, 104, 108, 111, 114, 122],
		[26, 29, 32, 36, 39, 46, 49, 53, 56, 59, 63, 66, 74, 77, 81, 84, 87, 91, 94, 97, 101, 104, 108, 111, 114, 118, 121, 130],
		[27, 30, 34, 37, 41, 48, 52, 55, 58, 62, 67, 71, 78, 82, 85, 88, 93, 96, 100, 103, 108, 111, 114, 118, 121, 125, 129, 138],
		[28, 31, 35, 39, 43, 50, 54, 57, 62, 65, 71, 74, 82, 86, 90, 94, 97, 102, 105, 109, 113, 116, 121, 124, 129, 132, 137, 144],
		[29, 32, 37, 40, 45, 53, 56, 60, 64, 68, 74, 77, 86, 91, 94, 99, 103, 106, 111, 115, 119, 123, 128, 131, 136, 140, 143, 152],
		[29, 34, 38, 43, 47, 55, 58, 63, 67, 72, 77, 82, 91, 94, 99, 103, 108, 112, 116, 121, 125, 129, 133, 138, 142, 147, 151, 160],
		[30, 35, 39, 44, 48, 57, 62, 66, 71, 75, 81, 85, 94, 99, 103, 108, 113, 118, 122, 127, 131, 136, 140, 144, 149, 153, 158, 168],
		[31, 36, 40, 46, 50, 58, 64, 68, 73, 77, 84, 88, 99, 103, 108, 113, 118, 122, 128, 132, 137, 142, 147, 151, 156, 161, 166, 176],
		[32, 37, 43, 47, 53, 60, 66, 71, 76, 81, 87, 93, 102, 108, 112, 118, 122, 128, 133, 138, 143, 148, 153, 158, 164, 168, 174, 184],
		[34, 38, 44, 49, 54, 63, 68, 74, 78, 84, 91, 96, 106, 112, 116, 122, 128, 133, 138, 143, 149, 155, 159, 165, 170, 176, 180, 192],
		[34, 39, 45, 50, 56, 65, 71, 76, 82, 87, 94, 100, 111, 116, 121, 127, 132, 138, 143, 149, 155, 160, 166, 171, 177, 183, 188, 199],
		[35, 40, 47, 53, 58, 67, 73, 78, 85, 91, 97, 104, 114, 120, 125, 132, 138, 143, 149, 155, 161, 167, 172, 178, 184, 189, 196, 207],
		[36, 41, 48, 54, 59, 69, 75, 82, 87, 93, 101, 108, 119, 124, 131, 137, 142, 149, 155, 160, 167, 172, 179, 185, 190, 197, 203, 215],
		[37, 43, 49, 56, 62, 72, 78, 84, 91, 96, 105, 111, 122, 129, 136, 141, 148, 153, 160, 167, 172, 179, 185, 192, 198, 204, 211, 223],
		[38, 45, 50, 57, 64, 74, 81, 87, 93, 100, 109, 114, 127, 133, 140, 146, 152, 159, 166, 172, 179, 185, 192, 198, 205, 212, 0, 0],
		[39, 46, 53, 59, 65, 76, 83, 90, 96, 103, 112, 119, 131, 138, 144, 151, 158, 165, 171, 178, 185, 192, 198, 205, 212, 0, 0, 0],
		[39, 47, 54, 60, 67, 78, 85, 92, 99, 106, 115, 122, 134, 141, 149, 156, 162, 169, 177, 184, 190, 197, 205, 212, 0, 0, 0, 0],
		[40, 48, 55, 62, 69, 81, 87, 95, 102, 109, 119, 125, 139, 146, 153, 160, 168, 175, 183, 189, 197, 204, 212, 0, 0, 0, 0, 0],
		[41, 49, 56, 64, 72, 83, 90, 97, 105, 112, 122, 130, 142, 150, 158, 165, 172, 180, 187, 195, 203, 211, 0, 0, 0, 0, 0, 0],
		[43, 50, 58, 65, 73, 85, 93, 100, 108, 115, 125, 133, 147, 155, 162, 170, 178, 185, 193, 200, 208, 0, 0, 0, 0, 0, 0, 0],
		[44, 52, 59, 67, 75, 87, 95, 103, 111, 119, 129, 137, 150, 159, 167, 175, 183, 190, 198, 206, 0, 0, 0, 0, 0, 0, 0, 0],
		[44, 53, 60, 68, 77, 90, 97, 105, 113, 122, 132, 141, 155, 162, 171, 179, 187, 196, 204, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[45, 54, 62, 71, 78, 92, 100, 109, 116, 125, 136, 144, 159, 167, 176, 184, 193, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[46, 55, 64, 72, 81, 93, 102, 111, 120, 128, 139, 148, 162, 171, 180, 189, 197, 206, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];

var horizontalTable = [
	[17.00, 18.2, 22.9, 27.9, 29.9, 22.50, 25.9, 39.9, 42.5], //Pred stuklo  	20/380 x 10/350
	[19, 20.2, 25.5, 31.5, 32.9, 25.9, 30.5, 46.5, 49.9],	// Pred stuklo black out  26/360 x 10/350
	[17.00, 18.2, 22.9, 27.9, 29.9, 22.50, 25.9, 39.9, 42.5],	// Mejdu stuklo		20/380 x 10/350
	[21.5, 23.5, 26.5, 32.5, 33.9, 27.5, 33.5, 47.9, 51.9],	//Max standart		22/300 x 10/350	
	[23.5, 25.5, 28.5, 33.5, 35.9, 27.5, 33.5, 47.9, 51.9],	// Maxi BO		26/300 x 10/350
	[29.9, 30.5, 31.9, 36.9, 37.9, 30.9, 36.9, 49.9, 52.9],	// Maxi LUX		19/300 x 10/220
	[0.00, 0.00, 0.00, 0.00, 51.9, 0.00, 44.9, 63.9, 63.9],	// Ultimate		32/330 x 20/300
	[0.00, 0.00, 0.00, 0.00, 58.9, 0.00, 49.5, 69.9, 69.9],	// Ultimate mega	38/270 x 20/300
	[0.00, 0.00, 0.00, 0.00, 97.9, 0.00, 84.5, 99.9, 99.9]	// BB24		27/150 x 20/250
];
// When clicked on the select menu
function getColor(color) {
	colorCode = color.selectedIndex;
}

function getModel(model) {
	modelCode = model.selectedIndex;	//models are the rows in  horizontalTable
	selctedVerical = model;

	if (model.selectedIndex > 1) {
		plankiCheck = document.getElementById("luxPlankiTd");
		document.getElementById("luxPlanki").checked = 0;
		plankiCheck.style.display = "none";
	} else {
		plankiCheck.style.display = "block";
	}

}

function findPrizeHorizontal(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	//local = local / 10;

	if (local < 0) {
		local = 0;
	}

	return local;
}

// checkes the width and hitght
function checkBoundorieshs(model, width, height) {
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
			if (width < 32 || width > 270 || height < 20 || height > 300) {
				isThereError = true;
			} break;

		case 8:
			if (width < 41 || width > 300 || height < 40 || height > 300) {
				isThereError = true;
			} break;
	}
	if (isThereError) {
		alert(errorMSG);

	}
}

function printFinalPricehs(fromModels) {
	var sizeWidthRaw = document.getElementById("sunblindWidthhs").value;
	var sizeHeightRaw = document.getElementById("sunblindHeighths").value;

	sizeWidth = findPrizeHorizontal(sizeWidthRaw);
	sizeHeight = findPrizeHorizontal(sizeHeightRaw);
	sizeWidth -= 3;
	sizeHeight -= 2;

	if(sizeWidth < 0){
		sizeWidth = 0
	}

	if(sizeHeight < 0){
		sizeHeight = 0
	}

	var squareMeters;
	var pricePerSquareMeter = 0;
	var discount = 6;	//precent discount
	var colorGroup;
	var errorMSG = "Зададените размери са извън позволената площ на продукта";

	var normalMaxSquareMeters = 6;
	var ultimateMegaMaxSqareMeters = 4;

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
	if (colorCode > 42) {
		colorGroup = 3;
	}
	if (colorCode > 48) {
		colorGroup = 4;
	}
	if (colorCode > 56) {
		colorGroup = 5;
	}
	if (colorCode > 62) {
		colorGroup = 6;
	}
	if (colorCode > 66) {
		colorGroup = 7;
	}
	if (colorCode > 72) {
		colorGroup = 8;
	}
	if (colorCode > 77) {
		colorGroup = 9;
	}

	switch (modelCode) {
		case 0:
			totalPrice = predStykloTable[sizeHeight][sizeWidth];
			totalPrice *= CoeficientHorizontal[0][colorGroup];
			break;
		case 1:
			totalPrice = predStykloTable[sizeHeight][sizeWidth];
			totalPrice *= CoeficientHorizontal[1][colorGroup];
			break;
		case 2:
			totalPrice = predStykloTable[sizeHeight][sizeWidth];
			totalPrice *= CoeficientHorizontal[2][colorGroup];
			break;
		case 3:
			totalPrice = maxiTable[sizeHeight][sizeWidth];
			totalPrice *= CoeficientHorizontal[3][colorGroup];
			break;
		case 4:
			totalPrice = maxiTable[sizeHeight][sizeWidth];
			totalPrice *= CoeficientHorizontal[4][colorGroup];
			break;
		case 5:
			totalPrice = maxiTable[sizeHeight][sizeWidth];
			totalPrice *= CoeficientHorizontal[5][colorGroup];
			break;
		case 6:
			totalPrice = megaViewTable[sizeHeight][sizeWidth];
			totalPrice *= CoeficientHorizontal[6][colorGroup];
			break;
		case 7:
			totalPrice = megaViewTable[sizeHeight][sizeWidth];
			totalPrice *= CoeficientHorizontal[7][colorGroup];
			break;
		case 8:
			totalPrice = megaViewTable[sizeHeight][sizeWidth];
			totalPrice *= CoeficientHorizontal[8][colorGroup];
			break;
	}

	squareMeters = sizeWidth * sizeHeight / 10000;
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

	checkBoundorieshs(modelCode, sizeWidthRaw, sizeHeightRaw);

	var StrVodeneChk = document.getElementById("stranichnoVodene").checked;
	var PlankiLux = document.getElementById("luxPlanki").checked;

	if (StrVodeneChk == 1 && totalPrice > 0) {
		
		if (modelCode >= 6){
			totalPrice = totalPrice + 5.5;
		}
		else{
			totalPrice = totalPrice + 4.9;
		}
	}
	if (PlankiLux == 1 && totalPrice > 0) {
		totalPrice = totalPrice + 0.5;
	}

	//pricePerSquareMeter = fromModels[modelCode][colorGroup];
	// totalPrice = totalPrice + (squareMeters * pricePerSquareMeter);
	totalPrice -= totalPrice * (discount / 100);

	if (totalPrice == 0) {
		totalPrice = "Неподдържан цвят за този модел";
		document.getElementById("finalPricehs").innerHTML = totalPrice;
	}
	else {
		document.getElementById("finalPricehs").innerHTML = totalPrice.toFixed(2) + " лв.";
	}
	totalPrice = 0;
	return false;
}

///////////////////////////////////
//   horizontalni shtori - end   //
///////////////////////////////////

///////////////////////////////////
//   verticalni shtori - start   //
///////////////////////////////////

var selectedVerticalType;
//Gettign values ffrom sizes form for Horizontals and Verticals and Prints the result
var colorCodevs = 0;	//default color
var modelCodevs = 0; // default model
var totalPricevs = 0;
var selctedVericalvs = 0;

// Vertical MODELS ----------------------------
var verticalModels = ["89 мм", "127 мм", "AL 89"];
// VEtical COLORS
var vercialColors = [
	["Rococo (12**)",
	"Polly (94**)",
	"Beata (96**)",
	"Melisa (15**)",
	"Moon (35*)",
	"Vanessa (55**)",
	"Sandra (82**)",
	"Jenny (92**)",
	"Ray (34*)",
	"Van Gogh (45**)",
	"Silk (21**)",
	"Pasifico (115***)",
	"Lima (56*****)",
	"Melisa BO (54**) BlackOut",
	"Metalic (57*****)",
	"Lumina (255****)",
	"Guardian (720**)",
	"Juno (97****)",
	"Tundra (759**)",
	"Porto(51****)",
	"Albery (757**)",
	"Carina BO (102****) BlackOut",
	"Jacquard Natalie (085****)",
	"Banbury (728**)",
	"Strata SPC (715**)",
	"Juno BO (112****) BlackOut",
	"Monterey (756**)",
	"Blossom Print (741**)",
	"Green Screen ECO (965****)",
	"Oslo (729**)",
	"Monroe (758**)",
	"Jacquard Cube (695****)",
	"Hampton (736**)",],	//89
	["Corra(50**)",
		"Creppe(51**)",
		"Jenny(97**)",
		"Shantung(SH**)",
		"Fiesta(52**)",
		"Vanesa(57**)",
		"Ray(66**)",
		"Aneta(65**)",
		"Itaca(14**)",
		"Van Gogh(69**)",
		"Patricia(19**)",
		"Mountain(74**)",
		"Carina BlackOut(578****)",
		"Screen(10***)",
		"Green Screen ECO(960****)"],	//127
	["Бяла(0150)",
		"Слонова кост(4459)",
		"Сребриста(7113)",
		"Сива(7010)",
		"Крем(4451)",
		"Мед(7418)",
		"Бяла перф.(0150P)",
		"Черна перф.(1858P)",
		"Слонова кост перф.(4459P)",
		"Сребриста перф.(7113P)",
		"Сива перф.(7010P)",
		"Крем перф.(4451P)"]	//AL
];

var verticalTable = [[9.14, 9.77, 11.13, 11.13, 11.45, 11.87, 11.87, 12.08, 12.08, 12.08, 13.13, 18.59, 21.95, 23.00, 25.52, 28.67, 28.67, 32.03, 33.50, 36.65, 38.33, 38.33, 42.95, 42.95, 42.95, 51.90, 44.00, 50.30, 51.98, 81.98, 54.50, 59.75, 62.90],	// 89mm
[9.14, 9.77, 11.45, 11.45, 12.08, 12.50, 12.50, 14.60, 14.60, 14.60, 17.75, 34.55, 38.33, 44.00, 50.30],	//127mm
[49.25, 50.30, 50.30, 50.30, 50.30, 50.30, 75.08, 78.23, 78.23, 78.23, 78.23, 78.23]	//AL
]

//Prints an option TAG whit argument gived
function printElement(array, index) {
	document.write(array[index]);
}

function getVerticalType(model) {

	$('#selectColorvs').find('option').remove();
	var type = model.selectedIndex;
	option = vercialColors[type];
	for (var i = 0; i < option.length; i++) {
		$('#selectColorvs').append("<option value=" + 'option[i]' + ">" + option[i] + "</option>");
	}
}


function getColorvs(color) {
	colorCodevs = color.selectedIndex;
}

function getModelvs(model) {
	modelCodevs = model.selectedIndex;	//models are the rows in  horizontalTable
	selctedVerical = model;
}

// checkes the width and hitght
function checkBoundoriesvs(model, width, height) {
	var errorMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	var errorMSG_ = "Зададените размери са извън позволената площ на продукта";

	switch (model) {
		case 0:
		case 2:
		case 1:
			if (width < 20 || width > 600 || height < 20 || height > 500) {
				alert(errorMSG);
			} break;
	}

	if ((width * height) / 10000 > 20) {
		alert(errorMSG_);
	}
}

function printFinalPrice(fromModels) {
	var sizeWidth = document.getElementById("sunblindWidthvs").value;
	var sizeHeight = document.getElementById("sunblindHeightvs").value;
	var squareMeters;
	var pricePerSquareMeter = 0;
	var discount = 6;	//precent discount
	var colorGroup;

	squareMeters = sizeWidth * sizeHeight / 10000;
	if (squareMeters < 0.5) {
		squareMeters = 0.5;
	}
	// checking the boundories

	checkBoundoriesvs(modelCodevs, sizeWidth, sizeHeight);

	pricePerSquareMeter = fromModels[modelCodevs][colorCodevs];
	totalPrice = totalPrice + (squareMeters * pricePerSquareMeter);
	totalPrice = totalPrice + (21.95 * sizeWidth / 100);
	totalPrice -= totalPrice * (discount / 100);

	if (totalPrice == 0) {
		totalPrice = "Неподдържан цвят за този модел";
		document.getElementById("finalPricevs").innerHTML = totalPrice;
	}
	else {
		document.getElementById("finalPricevs").innerHTML = totalPrice.toFixed(2) + " лв.";
	}
	totalPrice = 0;
	return false;
}

///////////////////////////////////
//   verticalni shtori - end     //
///////////////////////////////////

///////////////////////////////////
//   plise shtori - start        //
///////////////////////////////////

// JavaScript Document
var colorCodepls = 0;	//default color
var modelCodepls = 0; // default model
var totalPricepls = 0;

var modelspls = ["BB 10", "BB 15", "BB 30", "A0 10", "A0 30", "A0 70", "BF 50", "BF 51",
	"BB 20", "BB 24", "A0 20", "B0 10", "B0 75", "BB 40", "A0 40"];

var colorspls = [
	"Crepe FR(536****)", 
	"Tendence(44****)", 
	"Flush(65****)",
	"Venezia(65****)", //group 0 from 0 - 3

	"CrepeTopar®FR(548****)",
	"Juno(41****)",
	"CrushPearlFR(622****)",
	"Porto(58****)",  
	"Blossom(820726*)",//group 1 from 4 - 8

	"Shade(143****)",
	"California(671**)",
	"Onda(64***)", 
	"Scala BO Color(80232**)", //group 2 from 9 - 12

	"Strata(771**)",
	"CrushDustBlock™(521****)",
	"Attia(480****)",
	"Georgette(739****)",
	"Duette®UnixDuotone(070****)", //group3 from 13 - 17

	"CrushTopar®Plus(522****)",
	"Duette®Classic25mmBlackout(021****)", //group 4 from 18 - 19

	"Ardeche(774****)",
	"Duette®Fixe25mmBO(072****)",
	"Duette®Montana25mmBO(605****)"];//group 5 from 20 - 22

var pliseTable10 = [
	[49, 55, 62, 69, 76, 82, 88, 95, 103, 108, 117, 122, 127, 135, 145, 149, 155, 163, 170],
	[49, 57, 62, 69, 77, 89, 95, 103, 111, 118, 122, 129, 138, 145, 150, 158, 166, 172, 177],
	[57, 62, 69, 77, 84, 89, 97, 111, 118, 123, 131, 138, 146, 151, 166, 173, 179, 184, 194],
	[57, 63, 69, 84, 90, 97, 105, 118, 123, 131, 140, 147, 159, 167, 174, 186, 195, 203, 207],
	[57, 69, 77, 84, 90, 105, 112, 119, 131, 140, 147, 159, 167, 174, 188, 195, 203, 208, 223],
	[63, 70, 78, 90, 99, 106, 119, 125, 133, 148, 154, 160, 175, 181, 196, 204, 209, 223, 231],
	[63, 70, 84, 90, 101, 113, 120, 133, 141, 154, 163, 170, 181, 189, 205, 210, 224, 232, 247],
	[63, 78, 85, 99, 106, 120, 126, 141, 149, 163, 170, 182, 192, 205, 210, 226, 234, 247, 253],
	[64, 78, 85, 101, 107, 120, 134, 144, 155, 165, 176, 184, 201, 211, 221, 234, 243, 254, 263],
	[70, 78, 91, 101, 116, 126, 135, 149, 165, 172, 184, 194, 207, 221, 229, 243, 257, 264, 276],
	[70, 85, 91, 107, 121, 134, 145, 155, 166, 177, 194, 207, 214, 230, 243, 251, 264, 278, 287],
	[72, 85, 101, 116, 121, 135, 150, 165, 173, 186, 202, 214, 230, 236, 251, 265, 278, 288, 302],
	[72, 87, 102, 116, 127, 145, 150, 166, 179, 195, 208, 215, 231, 246, 260, 273, 288, 295, 309],
	[79, 91, 102, 117, 129, 146, 158, 173, 186, 203, 215, 223, 246, 252, 266, 281, 295, 310, 323],
	[79, 92, 108, 122, 138, 151, 166, 179, 195, 208, 223, 232, 252, 266, 281, 295, 310, 317, 333],
	[79, 92, 108, 122, 138, 151, 167, 180, 196, 209, 224, 238, 261, 275, 282, 305, 318, 328, 340],
	[87, 102, 117, 129, 146, 159, 174, 188, 204, 216, 232, 248, 267, 282, 296, 311, 328, 340, 356],
	[87, 102, 117, 129, 147, 167, 180, 196, 210, 226, 239, 254, 275, 292, 306, 319, 335, 357, 372],
	[87, 103, 118, 138, 151, 169, 181, 204, 218, 234, 248, 263, 284, 299, 312, 331, 349, 363, 0],
	[88, 108, 122, 140, 152, 175, 189, 205, 218, 239, 254, 269, 292, 308, 320, 343, 359, 374, 0],
	[92, 111, 123, 147, 160, 181, 198, 210, 229, 248, 264, 278, 301, 314, 337, 350, 365, 0, 0],
	[92, 111, 123, 147, 160, 181, 201, 211, 235, 250, 269, 287, 302, 322, 338, 360, 0, 0, 0]
];

var pliseTable20 = [
	[63, 76, 82, 88, 102, 107, 113, 125, 132, 140, 145, 158, 165, 175, 181, 188, 202, 207, 214],
	[69, 77, 82, 93, 103, 113, 120, 125, 133, 146, 150, 159, 172, 176, 189, 195, 207, 215, 221],
	[69, 77, 89, 93, 107, 116, 126, 133, 141, 151, 159, 172, 177, 191, 196, 208, 215, 222, 234],
	[70, 82, 89, 103, 108, 120, 133, 141, 147, 160, 172, 177, 191, 198, 208, 222, 230, 243, 248],
	[77, 84, 95, 103, 116, 126, 134, 147, 151, 166, 177, 186, 198, 209, 218, 230, 243, 249, 261],
	[77, 89, 95, 108, 117, 129, 142, 147, 160, 173, 179, 192, 205, 210, 224, 236, 250, 254, 267],
	[77, 89, 103, 108, 121, 134, 147, 152, 167, 179, 187, 201, 210, 224, 232, 246, 257, 269, 277],
	[84, 90, 104, 117, 129, 142, 148, 161, 174, 187, 201, 206, 219, 232, 246, 257, 269, 277, 289],
	[84, 95, 104, 117, 129, 142, 152, 169, 174, 194, 202, 214, 226, 237, 251, 264, 277, 282, 295],
	[84, 95, 111, 122, 135, 148, 161, 169, 180, 194, 207, 221, 233, 247, 259, 273, 284, 299, 310],
	[84, 97, 111, 122, 135, 154, 163, 175, 188, 202, 215, 229, 247, 252, 265, 284, 299, 306, 317],
	[90, 104, 117, 131, 144, 154, 169, 181, 195, 207, 221, 234, 252, 266, 279, 292, 306, 318, 333],
	[90, 104, 118, 131, 144, 163, 175, 188, 203, 215, 229, 243, 253, 275, 287, 301, 311, 328, 338],
	[90, 105, 118, 138, 149, 163, 176, 195, 208, 222, 234, 249, 266, 280, 293, 307, 328, 338, 352],
	[97, 111, 122, 138, 158, 170, 181, 196, 215, 230, 243, 254, 275, 288, 302, 319, 334, 347, 361],
	[97, 111, 123, 144, 158, 176, 189, 203, 216, 235, 249, 263, 280, 294, 308, 329, 339, 356, 372],
	[97, 112, 131, 145, 165, 176, 191, 208, 223, 244, 254, 267, 288, 303, 314, 335, 356, 366, 380],
	[97, 118, 132, 149, 165, 182, 196, 216, 231, 249, 263, 276, 294, 314, 331, 347, 362, 374, 394],
	[105, 118, 132, 150, 172, 182, 204, 218, 231, 250, 269, 281, 303, 316, 336, 357, 368, 390, 0],
	[105, 118, 138, 158, 172, 191, 209, 223, 236, 257, 277, 289, 309, 331, 342, 363, 382, 395, 0],
	[105, 123, 140, 159, 177, 198, 209, 231, 246, 264, 282, 295, 316, 336, 349, 375, 391, 0, 0],
	[105, 123, 145, 159, 177, 198, 218, 232, 251, 273, 282, 305, 322, 337, 359, 376, 0, 0, 0]
];

var Coeficient = [1.00, 1.10, 1.30, 1.40, 1.60, 2.10];

//Receving Info from dropdown menu
function getColorpls(color) {
	colorCodepls = color.selectedIndex;
}

function getModelpls(model) {
	modelCodepls = model.selectedIndex;
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

function CheckBoundoriespls(model, width, height) {
	var errMSG = "Зададените размери са извън позволената ширина/височина на продукта";

	if (width > 220 || width < 20 || height > 250 || height < 20) {
		alert(errMSG);
	}
}

function printFinalPricepls() {
	var errMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	var sizeWidth = document.getElementById("sunblindWidthpls").value;
	var sizeHeight = document.getElementById("sunblindHeightpls").value;
	var discount = 6;	//precent discount

	CheckBoundoriespls(modelCodepls, sizeWidth, sizeHeight);

	sizeWidth = findPrize(sizeWidth);
	sizeHeight = findPrize(sizeHeight);

	if (modelCodepls < 8) {
		totalPrice += pliseTable10[sizeHeight][sizeWidth];
		if (totalPrice == 0) {
			alert(errMSG);
		}
	}
	else {
		totalPrice += pliseTable20[sizeHeight][sizeWidth];
		if (totalPrice == 0) {
			alert(errMSG);
		}
	}

	var group;
	switch (colorCodepls) {
		case 0:
		case 1:
		case 2:
		case 3:
			group = 0;
			break

		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
			group = 1;
			break

		case 9:
		case 10:
		case 11:
		case 12:
			group = 2;
			break

		case 13:
		case 14:
		case 15:
		case 16:
		case 17:
			group = 3;
			break

		case 18:
		case 19:
			group = 4;
			break

		case 20:
		case 21:
		case 22:
			group = 5;
			break

		default:
			group = 7;
			break
	}

	totalPrice *= Coeficient[group];

	totalPrice -= totalPrice * (discount / 100);

	document.getElementById("finalPricepls").innerHTML = totalPrice.toFixed(2) + " лв.";
	totalPrice = 0;
	return false;
}

///////////////////////////////////
//   plise shtori - end          //
///////////////////////////////////

///////////////////////////////////
//   rimski shtori - start       //
///////////////////////////////////

// JavaScript Document
var modelsrm = ["Елеганте", "Аура"];
var colorsrm = [
	"Cesta(29**)",
	"Rioja(C20)", 
	"Golfo(19**)", 
	"Monarca(B30)",
	"Cuisine(B31)", //group 0 from 0 - 4

	"Vereda(B1**)", 
	"Vanesa(B2*)",
	"Brest(39**)",
	"Sunset(B61*)",
	"Altea(B40*)",
	"Jacquard(13**)",//group 1 from 5 - 10

	"Cotton(20**)",
	"Mimos(C4***)",
	"Veronika(49**)"]; //group 0 from 11 - 12

var coeficients =
	[
		[1, 1.1, 1.25],
		[1, 1.1, 1.25]
	];

var colorCoderm = 0;	//default color
var modelCoderm = 0; // default model
var totalPricerm = 0;



var stillTable = [
	[44, 51, 58, 64, 72, 78, 86, 92, 99, 105, 114, 119],
	[45, 53, 60, 67, 75, 83, 89, 98, 104, 110, 118, 126],
	[47, 56, 62, 70, 78, 85, 92, 101, 108, 114, 124, 131],
	[51, 61, 67, 76, 85, 91, 100, 110, 115, 123, 133, 140],
	[53, 62, 70, 78, 88, 94, 104, 113, 119, 128, 138, 146],
	[58, 67, 75, 85, 93, 103, 111, 121, 129, 137, 148, 156],
	[60, 69, 77, 87, 98, 105, 114, 126, 133, 141, 154, 160],
	[61, 71, 80, 89, 100, 108, 118, 130, 138, 146, 158, 166],
	[64, 76, 85, 94, 107, 115, 127, 137, 146, 155, 167, 177],
	[66, 78, 87, 98, 110, 118, 130, 141, 151, 159, 173, 182],
	[70, 84, 92, 104, 116, 127, 137, 150, 158, 167, 182, 191],
	[72, 86, 94, 106, 118, 130, 140, 154, 162, 174, 187, 198],
	[74, 87, 98, 110, 123, 132, 143, 157, 167, 179, 194, 204],
	[78, 91, 103, 114, 129, 139, 152, 165, 177, 186, 202, 212],
	[80, 93, 105, 117, 132, 142, 156, 171, 181, 191, 207, 220],
	[84, 99, 111, 123, 138, 151, 162, 178, 188, 200, 218, 228],
	[86, 101, 113, 127, 141, 154, 166, 182, 195, 206, 223, 234]
];

var maxiStilTable = [
	[54, 59, 64, 74, 80, 86, 90, 96, 106, 111, 116, 123, 127, 137, 142, 146, 152, 157, 168, 173, 178, 185, 189, 197],
	[56, 62, 66, 76, 83, 88, 94, 100, 110, 116, 120, 127, 133, 143, 147, 153, 158, 164, 173, 181, 187, 192, 196, 208],
	[58, 64, 69, 81, 86, 93, 100, 105, 117, 121, 127, 135, 142, 152, 157, 164, 169, 174, 186, 194, 198, 205, 211, 222],
	[59, 65, 72, 83, 88, 98, 102, 108, 120, 125, 132, 141, 145, 157, 164, 170, 174, 181, 193, 199, 208, 213, 220, 229],
	[62, 67, 74, 86, 93, 101, 108, 116, 126, 133, 140, 147, 154, 167, 173, 179, 187, 193, 204, 213, 220, 225, 234, 245],
	[63, 69, 76, 88, 94, 105, 111, 118, 130, 137, 144, 153, 159, 171, 178, 186, 193, 198, 211, 221, 226, 234, 241, 252],
	[65, 73, 80, 91, 100, 110, 117, 124, 137, 144, 152, 161, 169, 181, 189, 195, 202, 211, 223, 233, 240, 247, 255, 267],
	[66, 74, 83, 94, 102, 112, 120, 127, 141, 147, 156, 167, 173, 187, 194, 201, 210, 216, 229, 240, 247, 255, 263, 276],
	[67, 76, 85, 99, 106, 118, 125, 134, 146, 156, 164, 173, 184, 195, 204, 212, 221, 227, 242, 252, 261, 268, 277, 291],
	[69, 77, 87, 101, 108, 120, 127, 137, 151, 159, 168, 178, 188, 199, 210, 219, 226, 236, 248, 260, 267, 277, 286, 299],
	[72, 81, 89, 105, 114, 125, 134, 143, 157, 167, 174, 187, 195, 211, 220, 227, 238, 246, 261, 272, 280, 290, 300, 314],
	[73, 84, 91, 106, 117, 127, 137, 146, 161, 170, 179, 192, 199, 215, 224, 236, 243, 252, 267, 279, 289, 299, 307, 321],
	[75, 86, 94, 110, 120, 133, 143, 152, 168, 177, 188, 198, 210, 224, 236, 245, 254, 264, 279, 292, 301, 312, 321, 336],
	[76, 87, 98, 112, 123, 135, 145, 156, 171, 181, 192, 204, 214, 229, 240, 249, 261, 270, 288, 299, 309, 318, 329, 346],
	[80, 89, 101, 117, 127, 141, 151, 162, 177, 189, 198, 212, 223, 239, 249, 261, 272, 281, 299, 312, 321, 332, 344, 360],
	[81, 90, 102, 119, 130, 143, 154, 165, 181, 193, 204, 216, 227, 245, 255, 266, 278, 289, 305, 318, 329, 341, 351, 369],
	[83, 93, 103, 121, 133, 145, 157, 169, 186, 196, 209, 222, 234, 249, 262, 273, 285, 294, 313, 326, 336, 348, 360, 376],
	[84, 96, 107, 125, 137, 151, 162, 174, 192, 204, 215, 229, 241, 260, 270, 283, 294, 306, 324, 337, 349, 362, 373, 393],
	[85, 98, 110, 126, 140, 153, 167, 177, 195, 209, 220, 236, 246, 264, 277, 289, 301, 313, 330, 346, 357, 370, 381, 399],
	[87, 100, 112, 130, 143, 158, 171, 185, 201, 214, 226, 242, 255, 273, 286, 299, 312, 324, 344, 357, 370, 382, 396, 415],
	[88, 101, 116, 133, 145, 161, 174, 188, 205, 220, 233, 247, 261, 279, 292, 305, 317, 331, 349, 366, 377, 393, 403, 422],
	[90, 105, 118, 137, 151, 167, 179, 193, 213, 225, 240, 255, 268, 289, 302, 315, 329, 343, 362, 377, 393, 403, 418, 438]
];

function ConvertWidthRoman(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	//local = local / 10;
	local = local - 4;

	if (local < 0) {
		local = 0;
	}
	return local;
}

function ConvertHeigthRoman(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	//local = local / 10;
	local = local - 6;

	if (local < 0) {
		local = 0;
	}
	return local;
}

//Receving Info from dropdown menu
function getColorrm(colorrm) {
	colorCoderm = colorrm.selectedIndex;
}

function getModelrm(modelrm) {
	modelCoderm = modelrm.selectedIndex;
}

function CheckBoundoriesrm(model, w, h) {
	var errMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	if (model == 0) {
		if (w < 30 || w > 150 || h < 30 || h > 250) {
			alert(errMSG);
		}
		if ((w * h) / 10000 > 4) {
			alert("Зададените размери са извън позволената квадратура на продукта");
		}
	}
	if (model == 1) {
		if (w < 40 || w > 270 || h < 40 || h > 300) {
			alert(errMSG);
		}
	}

}

function printFinalPricerm() {
	var sizeWidth = document.getElementById("sunblindWidthrm").value;
	var sizeHeight = document.getElementById("sunblindHeightrm").value;
	var discount = 6;	//precent discount
	var K = 0;	// multiplier
	var strVodene = document.getElementById("romanSV").checked;

	CheckBoundoriesrm(modelCoderm, sizeWidth, sizeHeight);

	sizeWidth = ConvertWidthRoman(sizeWidth);
	sizeHeight = ConvertHeigthRoman(sizeHeight);
	if (sizeHeight < 0) {
		sizeHeight = 0;
	}


	switch (modelCoderm) {
		case 0:
			totalPrice = stillTable[sizeHeight][sizeWidth];
			break;

		case 1:
			totalPrice = maxiStilTable[sizeHeight][sizeWidth];
			break;
	}

	switch (colorCoderm) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
			K = 0;
			break;
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
			K = 1;
			break;
		case 11:
		case 12:
		case 13:
			K = 2;
			break;
	}

	totalPrice *= coeficients[modelCoderm][K];
	if ((strVodene == 1) && (modelCoderm == 0)) {
		totalPrice += 6;
	}
	if ((strVodene == 1) && (modelCoderm == 1)) {
		totalPrice += 16.9;
	}

	totalPrice -= totalPrice * (discount / 100);

	document.getElementById("finalPricerm").innerHTML = totalPrice.toFixed(2) + " лв.";
	totalPrice = 0;
	return false;
}

///////////////////////////////////
//   rimski shtori - end       //
///////////////////////////////////

///////////////////////////////////
//   dyrveni shtori - start      //
///////////////////////////////////

//wooden MODELS ---------------------------
var woodModelsdur = new Array("25 мм", "50 мм");
//var woodColordur = new Array("CLASSIC", "CITY");
var modelCodedur = 0; // default model
var totalPricedur = 0;



function getModeldur(modeldur) {
	modelCodedur = modeldur.selectedIndex;	//models are the rows in  horizontalTable
}

function checkBoundoriesdur(model, width, height) {
	var errorMSG = "Зададените размери са извън позволената площ на продукта";
	var sqrtMeters = width * height / 10000;
	if (model == 0) {
		if (width < 30 || width > 240 || height < 30 || height > 300) {
			alert(errorMSG);
		}
	}
	else {
		if (width < 50 || width > 240 || height < 50 || height > 300) {
			alert(errorMSG);
		}
	}

	if (sqrtMeters > 4) {
		alert(errorMSG);
	}
}

function ConvertSizesWoodenBlinds(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	//local = local / 10;
	local = local - 3;

	if (local < 0) {
		local = 0;
	}
	return local;
}

function printFinalPricedur() {
	var woodenSizeWidth = document.getElementById("sunblindWidthdur").value;
	var woodenSizeHeight = document.getElementById("sunblindHeightdur").value;
	var squareMeters;
	var pricePerSquareMeter = 0;
	var discount = 6;	//precent discount
	var colorGroup;
	var StrVodeneChk = document.getElementById("stranichnoVodenedur").checked;

	var sizeWidth = ConvertSizesWoodenBlinds(woodenSizeWidth);
	var sizeHeight = ConvertSizesWoodenBlinds(woodenSizeHeight);

	var woodenBlindsPrices = [
		[53, 53, 59, 66, 72, 78, 84, 90, 98, 104, 110, 116, 123, 129, 136, 142, 148, 155, 161, 167, 173, 180, 187, 194, 202],
		[53, 53, 59, 66, 72, 78, 84, 90, 98, 104, 110, 116, 123, 129, 136, 142, 148, 155, 161, 167, 173, 180, 187, 194, 202],
		[56, 56, 64, 71, 78, 86, 93, 99, 106, 114, 121, 128, 136, 143, 150, 157, 165, 171, 180, 186, 193, 200, 208, 215, 222],
		[61, 61, 68, 76, 84, 92, 101, 109, 117, 125, 133, 141, 149, 157, 165, 172, 181, 188, 197, 205, 213, 221, 229, 237, 245],
		[65, 65, 73, 82, 90, 99, 109, 118, 126, 135, 143, 153, 162, 171, 180, 188, 197, 205, 215, 224, 233, 242, 251, 259, 269],
		[68, 68, 78, 88, 98, 106, 117, 126, 136, 146, 155, 165, 175, 184, 194, 204, 214, 224, 233, 242, 253, 262, 272, 282, 292],
		[72, 72, 83, 93, 104, 114, 125, 135, 146, 156, 167, 177, 188, 198, 209, 220, 230, 240, 251, 261, 272, 282, 293, 304, 315],
		[76, 76, 87, 99, 109, 121, 133, 143, 155, 167, 177, 189, 200, 211, 224, 234, 246, 258, 269, 280, 292, 303, 315, 326, 338],
		[81, 81, 92, 104, 116, 128, 141, 153, 165, 177, 189, 202, 214, 225, 238, 250, 263, 275, 287, 299, 312, 324, 336, 348, 361],
		[84, 84, 97, 109, 123, 136, 149, 162, 175, 188, 200, 214, 227, 240, 253, 265, 279, 292, 305, 318, 331, 344, 358, 370, 384],
		[87, 87, 101, 115, 129, 143, 157, 171, 184, 198, 211, 225, 240, 254, 268, 282, 296, 309, 323, 336, 351, 364, 379, 393, 407],
		[92, 92, 106, 120, 135, 150, 165, 180, 194, 209, 224, 238, 253, 268, 282, 297, 312, 327, 342, 356, 370, 385, 400, 415, 429],
		[95, 95, 110, 126, 142, 157, 172, 188, 204, 220, 235, 250, 265, 282, 297, 313, 328, 343, 359, 375, 390, 406, 421, 436, 0],
		[99, 99, 115, 132, 148, 165, 181, 197, 214, 230, 246, 263, 279, 296, 312, 328, 344, 360, 376, 393, 409, 426, 442, 0, 0],
		[103, 103, 120, 138, 155, 171, 188, 205, 223, 240, 258, 274, 292, 309, 326, 343, 360, 378, 395, 412, 429, 0, 0, 0, 0],
		[106, 106, 125, 143, 160, 178, 197, 215, 233, 251, 195, 287, 305, 323, 342, 359, 376, 395, 413, 431, 0, 0, 0, 0, 0],
		[110, 110, 129, 148, 167, 186, 205, 224, 242, 261, 280, 299, 318, 336, 356, 375, 393, 412, 433, 0, 0, 0, 0, 0, 0],
		[115, 115, 134, 154, 173, 193, 213, 232, 252, 272, 292, 312, 331, 351, 370, 389, 409, 429, 0, 0, 0, 0, 0, 0, 0],
		[119, 119, 138, 159, 180, 200, 220, 242, 262, 282, 302, 324, 344, 364, 385, 406, 425, 0, 0, 0, 0, 0, 0, 0, 0],
		[122, 122, 143, 165, 186, 208, 229, 250, 271, 293, 314, 336, 357, 378, 400, 421, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[126, 126, 148, 171, 192, 215, 237, 259, 281, 303, 326, 347, 370, 392, 414, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[130, 130, 153, 176, 199, 222, 244, 268, 291, 314, 336, 360, 384, 406, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[133, 133, 157, 182, 205, 230, 253, 276, 301, 325, 348, 373, 396, 419, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[138, 138, 162, 187, 211, 237, 261, 286, 310, 335, 359, 384, 409, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[142, 142, 167, 192, 218, 243, 269, 294, 320, 346, 370, 396, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[145, 145, 171, 198, 225, 250, 277, 303, 330, 356, 382, 409, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[149, 149, 177, 203, 231, 258, 285, 313, 340, 366, 393, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[153, 153, 181, 209, 238, 265, 293, 321, 349, 376, 402, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
	squareMeters = sizeWidth * sizeHeight / 10000;
	if (squareMeters < 0.5) {
		squareMeters = 0.5;
	}

	checkBoundoriesdur(modelCodedur, woodenSizeWidth, woodenSizeHeight);

	totalPrice = woodenBlindsPrices[sizeWidth][sizeHeight];

	if (StrVodeneChk == 1) {
		totalPrice = totalPrice + 0;
	}

	if (modelCodedur == 0) {
		totalPrice *= 1;
	}
	else {
		totalPrice *= 1.40;
	}

	totalPrice -= totalPrice * (discount / 100);

	if (totalPrice == 0) {
		totalPrice = "Зададените размери са извън позволените";
		document.getElementById("finalPricedur").innerHTML = totalPrice;
	}
	else {
		document.getElementById("finalPricedur").innerHTML = totalPrice.toFixed(2) + " лв.";
	}
	totalPrice = 0;
	return false;
}

///////////////////////////////////
//   dyrveni shtori - start      //
///////////////////////////////////

///////////////////////////////////
//   bambukovi shtori - start    //
///////////////////////////////////

// JavaScript Document
var colorCodebam = 0;	//default color
var modelCodebam = 0; // default model
var totalPricebam = 0;

var modelsbam = ["Ейша", "Феба"];
var colorsbam = ["J1", "J2", "J3", "J4", "J5", "J6",
	"B2", "B3", "B8", "B10", "D3", "D7", "D9", "D10", "D11",
	"B1", "B4", "B5", "B7", "B9", "B11", "B12", "B13", "D1", "D4", "D6", "D8",
	"B6", "D2", "D5"];

var Coeficientbam = [1.00, 1.35, 1.75, 2.10];

var eishaTable = [
	[34, 36, 37, 38, 40, 42, 44, 45, 46, 49, 52, 57, 60, 64, 67, 71, 75],
[34, 36, 37, 38, 40, 42, 44, 48, 52, 56, 60, 64, 69, 73, 77, 81, 86],
[34, 36, 37, 38, 40, 44, 49, 53, 59, 63, 69, 73, 78, 83, 88, 92, 98],
[34, 36, 37, 38, 44, 49, 54, 60, 65, 71, 76, 81, 87, 92, 98, 103, 108],
[34, 36, 37, 43, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 107, 114, 119],
[34, 36, 39, 46, 52, 59, 65, 72, 78, 85, 91, 98, 104, 111, 117, 124, 131],
[34, 36, 43, 50, 57, 64, 71, 78, 85, 92, 100, 106, 114, 120, 128, 134, 142],
[34, 38, 46, 53, 61, 70, 77, 85, 92, 100, 107, 115, 123, 130, 138, 145, 153],
[34, 42, 49, 58, 66, 74, 83, 90, 99, 106, 115, 124, 131, 140, 147, 156, 164],
[35, 44, 53, 62, 71, 79, 88, 97, 105, 114, 123, 131, 140, 150, 158, 167, 175],
[37, 47, 57, 65, 75, 84, 93, 103, 112, 121, 130, 140, 150, 158, 168, 178, 186],
[39, 50, 60, 70, 79, 89, 99, 108, 118, 129, 139, 148, 158, 168, 178, 187, 197],
[43, 52, 63, 73, 84, 94, 104, 115, 126, 135, 146, 157, 167, 178, 188, 198, 209],
[45, 56, 66, 77, 88, 99, 111, 121, 132, 143, 154, 165, 175, 187, 198, 209, 220],
[47, 58, 70, 81, 92, 104, 116, 127, 139, 151, 161, 173, 185, 196, 208, 220, 231],
[49, 61, 73, 85, 98, 110, 121, 133, 145, 157, 170, 182, 194, 206, 218, 231, 242],
[51, 64, 76, 89, 102, 114, 127, 140, 152, 165, 178, 191, 202, 215, 228, 240, 253],
[53, 66, 79, 93, 106, 119, 132, 145, 159, 172, 185, 198, 212, 225, 238, 251, 264],
[56, 70, 83, 97, 111, 125, 138, 152, 166, 180, 193, 207, 221, 235, 248, 262, 276],
[58, 72, 87, 101, 115, 129, 144, 158, 172, 186, 201, 215, 229, 243, 259, 273, 287],
[60, 75, 90, 104, 119, 134, 150, 164, 179, 194, 209, 224, 238, 253, 268, 283, 297],
[62, 77, 93, 108, 124, 140, 155, 170, 185, 201, 216, 232, 248, 263, 278, 293, 309]
];

var febaTable = [
	[36, 37, 39, 42, 43, 45, 47, 48, 50, 53, 57, 61, 65, 70, 73, 77, 81],
[36, 37, 39, 42, 43, 45, 47, 51, 56, 60, 65, 70, 74, 78, 84, 88, 92],
[36, 37, 39, 42, 43, 47, 52, 58, 62, 67, 73, 78, 83, 88, 93, 99, 104],
[36, 37, 39, 42, 46, 52, 58, 63, 70, 75, 80, 86, 92, 98, 103, 110, 115],
[36, 37, 39, 45, 51, 57, 63, 70, 76, 83, 88, 94, 101, 107, 114, 119, 126],
[36, 37, 42, 48, 56, 62, 69, 76, 83, 89, 97, 103, 110, 117, 124, 130, 138],
[36, 37, 45, 52, 60, 67, 74, 81, 89, 97, 104, 112, 119, 126, 133, 141, 148],
[36, 40, 48, 57, 64, 72, 80, 88, 96, 104, 112, 119, 128, 135, 144, 152, 159],
[36, 43, 51, 60, 69, 77, 86, 94, 103, 111, 119, 128, 137, 145, 154, 162, 171],
[37, 46, 54, 64, 73, 83, 91, 100, 110, 118, 128, 137, 145, 155, 164, 172, 182],
[39, 49, 58, 67, 77, 87, 97, 106, 116, 126, 135, 145, 155, 164, 173, 183, 193],
[42, 51, 62, 72, 81, 92, 102, 113, 123, 133, 143, 153, 164, 173, 184, 194, 205],
[44, 54, 65, 76, 87, 97, 107, 118, 129, 140, 151, 161, 172, 183, 194, 205, 215],
[46, 57, 69, 79, 91, 102, 114, 125, 137, 147, 158, 170, 181, 193, 204, 215, 226],
[48, 60, 72, 84, 96, 107, 119, 131, 143, 155, 167, 179, 191, 202, 214, 226, 238],
[50, 62, 75, 87, 100, 112, 125, 137, 150, 161, 174, 186, 199, 211, 224, 236, 249],
[52, 65, 78, 91, 104, 117, 130, 143, 156, 169, 182, 195, 208, 221, 234, 247, 260],
[54, 69, 81, 96, 108, 123, 135, 150, 162, 177, 189, 204, 216, 231, 243, 258, 270],
[57, 71, 85, 99, 113, 127, 141, 155, 169, 184, 198, 212, 226, 240, 254, 268, 282],
[59, 74, 88, 103, 117, 132, 147, 161, 177, 191, 206, 220, 235, 249, 264, 279, 293],
[61, 76, 91, 107, 123, 138, 153, 168, 183, 198, 213, 228, 243, 259, 274, 289, 304],
[63, 79, 96, 111, 127, 142, 158, 173, 189, 206, 221, 237, 252, 268, 285, 300, 316]
];



//Receving Info from dropdown menu
function getColorbam(colorbam) {
	colorCodebam = colorbam.selectedIndex;
}

function getModelbam(modelbam) {
	modelCodebam = modelbam.selectedIndex;
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

function CheckBoundoriesbam(model, width, height) {
	var errMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	var J1ErrEisha = "За бамбук J1, J2, J3, J4, J5 и J6 (за система Ейша) максималната ширина е 180 см.";
	var B3ErrEisha = "За бамбук B3, B4, B5 и B6 (за система Ейша) максималната височина е 200 см.";
	var J1ErrFeba = "За бамбук J2, J5 и J6 (система Феба) максималната ширина е 180 см.";
	var B3ErrFeba = "За бамбук B3, B4, B5, ,B6, B7, B13 и D4 (система Феба) максималната ширина е 180 см.";
	var sqrtMeters = width * height / 10000;

	switch (model) {
		case 0:
			if (width > 200 || width < 35 || height > 250 || height < 40 || sqrtMeters > 5) {
				alert(errMSG);
			}
			else if (colorCodebam < 6) {
				if (width > 180) {
					alert(J1ErrEisha);
				}
			}
			else if (colorCodebam == 7 || colorCodebam == 16 || colorCodebam == 17 || colorCodebam == 18) {
				if (height > 200) {
					alert(B3ErrEisha);
				}
			}
			break;

		case 1:
			if (width > 200 || width < 35 || height > 250 || height < 40 || sqrtMeters > 4) {
				alert(errMSG);
			}
			else if (colorCodebam == 1 || colorCodebam == 4 || colorCodebam == 5) {
				if (width > 180) {
					alert(J1ErrFeba);
				}
			}
			else if (colorCodebam == 7 || colorCodebam == 16 || colorCodebam == 17 || colorCodebam == 18 || colorCodebam == 22 || colorCodebam == 24) {
				if (width > 180) {
					alert(B3ErrFeba);
				}
			} break;
	}
}

function printFinalPricebam() {
	var sizeWidth = document.getElementById("sunblindWidthbam").value;
	var sizeHeight = document.getElementById("sunblindHeightbam").value;
	var discount = 6;	//precent discount
	var colorGroup = 0;
	var colorExeptionMSG = "Бамбук J1, J3 и J4 не може да се изпълняват със система Феба.";

	CheckBoundoriesbam(modelCode, sizeWidth, sizeHeight);

	sizeWidth = findPrize(sizeWidth);
	sizeHeight = findPrize(sizeHeight);

	switch (modelCodebam) {
		case 0:
			totalPrice = eishaTable[sizeHeight][sizeWidth];
			break;

		case 1:
			totalPrice = febaTable[sizeHeight][sizeWidth];

			if (colorCodebam == 0 || colorCodebam == 2 || colorCodebam == 3) {
				alert(colorExeptionMSG);
			} break;
	}

	if (colorCodebam > 26) {
		colorGroup = 3;
	}
	else if (colorCodebam > 14) {
		colorGroup = 2;
	}
	else if (colorCodebam > 5) {
		colorGroup = 1;
	}
	else {
		colorGroup = 0;
	}

	totalPrice *= Coeficientbam[colorGroup];
	totalPrice -= totalPrice * (discount / 100);

	document.getElementById("finalPricebam").innerHTML = totalPrice.toFixed(2) + " лв.";
	totalPrice = 0;
	return false;
}

///////////////////////////////////
//   bambukovi shtori - end      //
///////////////////////////////////

/////////////////////////////////////////
//   vynshni roletni shtori - start    //
/////////////////////////////////////////

var modelsvut = ["PVC", "AL H-39", "AL H-39R"];
var colorsvut = ["Бял", "Кафяв"];
var colorCodevut = 0;	//default color
var modelCodevut = 0; // default model
var totalPricevut = 0;
var errMSG = "Зададените размери са извън позволените габарити/площ  на щората."

///////////AL-H39R/////////////

var alH39vut = [
	[80, 86, 94, 100, 108, 114, 122, 129, 136, 145, 152, 159, 165, 173, 179, 187, 195, 203, 210, 217, 224, 231, 238, 246, 254, 260],
	[85, 93, 100, 108, 116, 123, 131, 138, 147, 156, 164, 172, 179, 187, 194, 202, 212, 219, 227, 234, 242, 251, 258, 268, 275, 283],
	[91, 98, 107, 116, 124, 132, 140, 149, 157, 167, 176, 184, 192, 201, 210, 217, 228, 237, 244, 253, 261, 269, 278, 288, 296, 305],
	[96, 105, 113, 123, 132, 140, 150, 159, 167, 178, 188, 197, 205, 215, 224, 232, 244, 253, 261, 271, 280, 288, 298, 309, 318, 326],
	[102, 110, 120, 130, 139, 149, 159, 168, 178, 190, 200, 210, 219, 229, 239, 248, 259, 269, 279, 288, 298, 308, 318, 329, 339, 349],
	[106, 117, 127, 137, 148, 158, 168, 179, 189, 201, 212, 222, 232, 243, 253, 264, 275, 286, 296, 307, 318, 327, 338, 350, 361, 370],
	[111, 123, 134, 145, 156, 166, 178, 189, 200, 213, 224, 234, 246, 257, 268, 279, 292, 302, 313, 325, 336, 347, 357, 370, 381, 393],
	[117, 129, 140, 152, 164, 175, 187, 199, 211, 224, 235, 247, 259, 271, 283, 294, 308, 320, 332, 342, 354, 366, 378, 391, 403, 415],
	[122, 135, 147, 160, 172, 184, 197, 208, 221, 235, 247, 260, 272, 285, 297, 309, 324, 336, 349, 361, 373, 386, 397, 413, 424, 436],
	[134, 148, 162, 175, 189, 202, 216, 230, 243, 259, 272, 286, 300, 313, 327, 341, 356, 370, 383, 397, 411, 424, 438, 454, 468, 482],
	[139, 153, 168, 183, 197, 211, 226, 240, 254, 270, 285, 299, 313, 327, 342, 356, 373, 387, 401, 416, 430, 444, 458, 474, 489, 503],
	[145, 160, 175, 190, 205, 220, 234, 249, 265, 282, 297, 312, 326, 341, 356, 372, 389, 404, 418, 433, 448, 463, 478, 496, 510, 525],
	[150, 166, 181, 198, 213, 229, 244, 260, 275, 293, 309, 324, 340, 355, 372, 387, 405, 420, 436, 451, 467, 483, 498, 516, 531, 548],
	[156, 172, 188, 204, 220, 238, 254, 270, 286, 305, 321, 337, 353, 369, 386, 402, 420, 436, 454, 470, 486, 502, 518, 537, 553, 569],
	[161, 178, 194, 212, 229, 246, 262, 280, 297, 315, 333, 350, 366, 383, 401, 418, 436, 454, 471, 487, 504, 522, 538, 557, 575, 591],
	[166, 184, 202, 219, 237, 255, 272, 289, 308, 327, 345, 362, 380, 397, 415, 433, 453, 470, 488, 505, 523, 541, 558, 578, 595, 613],
	[172, 190, 208, 227, 245, 264, 282, 300, 318, 338, 356, 375, 393, 411, 430, 448, 469, 487, 505, 524, 542, 561, 579, 598, 0, 0],
	[186, 206, 227, 246, 267, 287, 308, 328, 348, 370, 391, 410, 431, 451, 472, 491, 514, 535, 554, 575, 595, 616, 635, 0, 0, 0],
	[191, 213, 233, 254, 275, 296, 316, 338, 359, 381, 403, 423, 444, 465, 486, 508, 530, 551, 572, 593, 613, 635, 0, 0, 0, 0],
	[197, 218, 240, 261, 283, 305, 326, 348, 369, 393, 415, 436, 458, 480, 501, 523, 546, 568, 590, 611, 633, 0, 0, 0, 0, 0],
	[202, 225, 246, 269, 291, 313, 336, 357, 380, 404, 427, 449, 471, 494, 515, 538, 562, 584, 607, 629, 0, 0, 0, 0, 0, 0],
	[207, 230, 253, 276, 299, 322, 345, 368, 391, 416, 438, 461, 485, 508, 530, 553, 578, 600, 624, 0, 0, 0, 0, 0, 0, 0],
	[213, 237, 260, 283, 307, 330, 354, 378, 402, 427, 450, 474, 498, 522, 545, 568, 594, 618, 0, 0, 0, 0, 0, 0, 0, 0],
	[218, 242, 267, 291, 315, 339, 364, 388, 413, 438, 462, 487, 511, 536, 559, 584, 610, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[224, 248, 273, 298, 323, 348, 373, 397, 422, 449, 474, 499, 525, 550, 575, 599, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[229, 254, 280, 306, 330, 356, 382, 408, 433, 461, 486, 512, 538, 564, 589, 615, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

///////////AL-H39R/////////////

var alH39rvut = [
	[100, 108, 116, 124, 132, 139, 147, 154, 162, 172, 179, 187, 194, 202, 210, 217, 227, 234, 242, 249, 257, 265, 272, 282, 289, 297],
	[106, 114, 123, 131, 139, 148, 156, 164, 173, 183, 191, 199, 207, 216, 224, 232, 243, 251, 259, 268, 275, 284, 293, 302, 311, 320],
	[111, 121, 130, 138, 147, 157, 165, 174, 184, 194, 203, 212, 221, 230, 239, 247, 258, 268, 276, 285, 295, 303, 312, 323, 333, 341],
	[117, 126, 136, 146, 156, 165, 175, 184, 193, 205, 215, 225, 234, 244, 254, 264, 274, 284, 294, 303, 313, 323, 333, 343, 353, 363],
	[122, 133, 143, 153, 163, 174, 184, 194, 204, 217, 227, 238, 247, 258, 268, 279, 291, 301, 311, 322, 332, 342, 352, 365, 375, 386],
	[127, 138, 149, 160, 172, 183, 193, 204, 215, 228, 239, 249, 261, 272, 283, 294, 307, 318, 328, 339, 351, 362, 373, 386, 396, 407],
	[133, 145, 156, 167, 179, 191, 202, 214, 226, 240, 251, 262, 274, 286, 297, 309, 323, 334, 346, 357, 369, 381, 392, 406, 418, 429],
	[138, 150, 163, 175, 187, 200, 212, 225, 237, 251, 262, 275, 287, 300, 312, 324, 339, 351, 363, 376, 388, 400, 413, 427, 438, 451],
	[144, 157, 170, 183, 195, 208, 221, 234, 247, 262, 275, 288, 301, 314, 327, 340, 354, 367, 380, 393, 406, 419, 432, 447, 460, 473],
	[149, 162, 176, 190, 203, 217, 230, 244, 258, 273, 287, 300, 314, 328, 341, 355, 370, 384, 397, 411, 426, 438, 453, 468, 482, 496],
	[154, 168, 183, 197, 212, 226, 240, 254, 268, 285, 299, 313, 327, 341, 356, 370, 387, 401, 415, 430, 444, 458, 472, 488, 503, 517],
	[160, 174, 189, 204, 219, 234, 249, 265, 279, 296, 311, 326, 341, 355, 370, 386, 403, 418, 433, 447, 462, 477, 492, 510, 524, 539],
	[165, 180, 195, 212, 227, 243, 258, 274, 289, 308, 323, 339, 354, 369, 386, 401, 419, 434, 450, 465, 482, 497, 512, 530, 545, 562],
	[170, 187, 203, 219, 235, 252, 268, 284, 300, 319, 335, 351, 367, 383, 400, 417, 434, 451, 468, 484, 500, 516, 532, 551, 567, 583],
	[175, 192, 210, 227, 243, 260, 278, 294, 311, 330, 347, 364, 381, 397, 415, 432, 450, 468, 485, 501, 518, 536, 553, 571, 589, 605],
	[190, 210, 228, 246, 266, 284, 303, 322, 340, 362, 380, 399, 418, 436, 455, 474, 495, 513, 532, 551, 570, 589, 607, 627, 647, 665],
	[195, 215, 234, 254, 273, 293, 312, 332, 351, 373, 392, 411, 431, 450, 470, 489, 511, 530, 550, 569, 589, 608, 627, 649, 0, 0],
	[201, 221, 241, 261, 282, 301, 322, 341, 362, 383, 404, 424, 444, 464, 485, 504, 527, 546, 567, 586, 607, 627, 647, 0, 0, 0],
	[206, 227, 248, 269, 289, 310, 330, 352, 373, 395, 416, 436, 458, 478, 499, 519, 542, 564, 584, 605, 625, 647, 0, 0, 0, 0],
	[212, 233, 255, 276, 297, 319, 340, 362, 383, 406, 428, 449, 471, 492, 514, 536, 558, 580, 602, 623, 645, 0, 0, 0, 0, 0],
	[217, 239, 261, 283, 306, 327, 350, 372, 394, 418, 440, 462, 484, 507, 528, 551, 575, 597, 619, 640, 0, 0, 0, 0, 0, 0],
	[222, 245, 268, 291, 313, 336, 359, 381, 405, 429, 453, 475, 498, 521, 543, 566, 591, 613, 636, 0, 0, 0, 0, 0, 0, 0],
	[228, 251, 274, 298, 322, 345, 368, 392, 415, 441, 464, 487, 511, 535, 557, 581, 607, 630, 0, 0, 0, 0, 0, 0, 0, 0],
	[233, 257, 281, 306, 329, 353, 378, 402, 426, 451, 476, 500, 524, 549, 572, 596, 623, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[239, 264, 288, 312, 337, 362, 387, 411, 436, 463, 488, 513, 538, 563, 588, 612, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[244, 269, 295, 320, 346, 370, 396, 421, 447, 474, 500, 526, 551, 577, 602, 627, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

///////////PVC2/////////////

var pvcOutsideRollervut = [
	[73, 79, 85, 91, 96, 103, 108, 113, 120, 129, 134, 139, 146, 151, 157, 163, 172, 177, 183, 189],
	[77, 83, 90, 96, 103, 108, 114, 121, 127, 136, 143, 148, 154, 161, 167, 173, 183, 188, 194, 201],
	[81, 87, 94, 102, 108, 114, 121, 127, 134, 144, 150, 157, 164, 171, 177, 184, 193, 200, 206, 213],
	[85, 92, 99, 106, 113, 120, 127, 135, 141, 151, 159, 165, 173, 179, 187, 194, 204, 211, 218, 225],
	[89, 96, 104, 111, 119, 126, 134, 141, 149, 159, 166, 174, 181, 189, 197, 204, 215, 222, 230, 238],
	[93, 100, 109, 117, 124, 133, 140, 148, 157, 167, 175, 183, 191, 199, 206, 215, 226, 233, 241, 249],
	[96, 105, 113, 122, 131, 138, 147, 156, 164, 175, 184, 191, 200, 208, 217, 225, 237, 244, 253, 261],
	[100, 109, 118, 127, 136, 145, 153, 162, 171, 183, 191, 200, 208, 218, 227, 235, 247, 256, 265, 273],
	[105, 113, 123, 132, 141, 150, 160, 170, 178, 190, 200, 208, 218, 227, 237, 246, 258, 267, 276, 285],
	[114, 125, 135, 146, 156, 166, 176, 187, 197, 210, 220, 230, 241, 251, 261, 271, 284, 295, 305, 315],
	[119, 130, 140, 150, 161, 172, 183, 193, 204, 217, 228, 239, 249, 260, 271, 282, 295, 306, 0, 0],
	[122, 134, 145, 156, 167, 178, 189, 200, 212, 226, 237, 247, 258, 270, 281, 292, 306, 0, 0, 0],
	[126, 138, 149, 161, 173, 184, 195, 207, 219, 233, 244, 256, 268, 280, 291, 302, 0, 0, 0, 0],
	[131, 143, 154, 166, 178, 190, 202, 214, 226, 241, 253, 265, 276, 288, 0, 0, 0, 0, 0, 0],
	[134, 147, 159, 172, 184, 197, 208, 221, 233, 248, 261, 273, 286, 0, 0, 0, 0, 0, 0, 0],
	[138, 151, 164, 176, 189, 202, 215, 228, 241, 256, 269, 282, 295, 0, 0, 0, 0, 0, 0, 0],
	[141, 156, 168, 181, 195, 208, 221, 234, 248, 265, 278, 291, 0, 0, 0, 0, 0, 0, 0, 0],
	[154, 170, 185, 199, 214, 229, 244, 259, 273, 292, 306, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[159, 174, 189, 204, 219, 235, 251, 266, 281, 299, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[162, 178, 193, 210, 226, 241, 257, 272, 288, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[166, 183, 199, 215, 231, 247, 264, 280, 296, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];



//Receving Info from dropdown menu
function getColorvut(colorvut) {
	colorCodevut = colorvut.selectedIndex;
}

function getModelvut(modelvut) {
	modelCodevut = modelvut.selectedIndex;
}

function findPrizevut(arg) {
	var local = Math.round(Math.ceil(arg) / 10);
	//local = local / 10;
	local = local - 5;
	if (local < 0) {
		local = 0;
	}

	return local;
}

function CheckBoundoriesvut(model, width, height) {
	switch (model) {
		case 0:
			if (width < 30 || height < 30 || width > 250 || height > 250) {
				alert(errMSG);
			} break;

		default:
			if (width < 30 || height < 30 || width > 300 || height > 300) {
				alert(errMSG);
			} break;
	}
}

function printFinalPricevut() {
	var sizeWidth = document.getElementById("sunblindWidthvut").value;
	var sizeHeight = document.getElementById("sunblindHeightvut").value;
	//var discount = 6;	//precent discount

	CheckBoundoriesvut(modelCodevut, sizeWidth, sizeHeight);

	sizeWidth = findPrizevut(sizeWidth);
	sizeHeight = findPrizevut(sizeHeight);

	switch (modelCodevut) {
		case 0:
			totalPrice = pvcOutsideRollervut[sizeHeight][sizeWidth];
			break;

		case 1:
			totalPrice = alH39vut[sizeHeight][sizeWidth];
			break;

		case 2:
			totalPrice = alH39rvut[sizeHeight][sizeWidth];
			break;

		case 3:
			totalPrice = alH39r2vut[sizeHeight][sizeWidth];
			break;
	}

	if (modelCodevut >= 2) {
		totalPrice -= totalPrice * (6 / 100);
	}
	else {
		totalPrice -= totalPrice * (6 / 100);
	}

	if (totalPrice == 0) {
		alert(errMSG);
	}
	else {
		document.getElementById("finalPricevut").innerHTML = totalPrice.toFixed(2) + " лв.";
	}
	totalPrice = 0;
	return false;
}

/////////////////////////////////////////
//   vynshni roletni shtori - end      //
/////////////////////////////////////////

//////////////////////////////////////////////
//   vynshni horizontalni shtori - start    //
//////////////////////////////////////////////

var modelsvh = ["C50", "C80", "Z90"];
var colorsvh = [9010, 1013, 7035, 9006, 240, 1007, 5014, 9007, 6005, 3004, 8014];
var colorCodevh = 0;	//default color
var modelCodevh = 0; // default model
var totalPricevh = 0;
var errMSG = "Зададените размери са извън позволените габарити/площ  на щората."

var vynshniLamelniC50 =
	[
		[128, 132, 135, 139, 142, 146, 150, 156, 160, 163, 167, 172, 179, 182, 186, 189, 193, 201, 204, 208, 212],
		[132, 135, 140, 143, 147, 150, 155, 161, 165, 169, 173, 178, 185, 189, 193, 196, 200, 209, 212, 216, 220],
		[135, 140, 143, 148, 151, 156, 159, 167, 170, 175, 178, 185, 191, 195, 199, 203, 207, 216, 220, 224, 228],
		[139, 143, 148, 152, 156, 160, 164, 172, 175, 180, 184, 191, 197, 201, 206, 210, 214, 224, 228, 232, 236],
		[143, 147, 151, 156, 160, 164, 169, 176, 180, 185, 189, 196, 203, 208, 212, 216, 221, 231, 235, 239, 244],
		[147, 151, 156, 160, 164, 170, 174, 181, 186, 191, 195, 202, 210, 215, 219, 223, 228, 239, 243, 248, 252],
		[151, 155, 160, 164, 169, 174, 178, 187, 191, 196, 200, 209, 216, 221, 225, 230, 235, 246, 251, 256, 260],
		[154, 159, 164, 169, 174, 178, 183, 192, 196, 201, 206, 215, 222, 227, 232, 237, 242, 254, 259, 263, 268],
		[158, 163, 168, 173, 178, 183, 188, 197, 202, 206, 212, 220, 228, 233, 238, 243, 249, 261, 266, 271, 276],
		[162, 167, 172, 178, 183, 188, 193, 202, 207, 213, 218, 227, 235, 240, 246, 251, 256, 268, 274, 279, 284],
		[165, 170, 176, 181, 187, 192, 198, 207, 213, 218, 223, 233, 241, 247, 252, 257, 263, 276, 281, 287, 292],
		[180, 185, 191, 196, 202, 208, 213, 223, 228, 233, 239, 250, 258, 263, 269, 274, 280, 294, 300, 305, 311],
		[183, 189, 195, 201, 207, 212, 218, 228, 234, 240, 245, 255, 264, 270, 276, 281, 287, 302, 308, 313, 319],
		[187, 193, 199, 205, 211, 217, 223, 233, 239, 245, 250, 261, 270, 277, 283, 288, 294, 309, 315, 321, 327],
		[191, 197, 203, 210, 215, 221, 228, 238, 244, 250, 257, 268, 277, 283, 289, 295, 301, 316, 323, 329, 335],
		[194, 201, 207, 213, 220, 226, 232, 243, 249, 255, 262, 274, 283, 289, 296, 302, 308, 324, 330, 337, 343],
		[199, 205, 211, 218, 224, 231, 237, 248, 255, 261, 268, 280, 289, 296, 302, 309, 315, 332, 338, 345, 352],
		[202, 209, 216, 222, 229, 235, 242, 253, 260, 266, 273, 286, 295, 302, 309, 316, 322, 339, 346, 352, 360],
		[219, 226, 233, 240, 246, 253, 260, 271, 278, 285, 292, 305, 314, 322, 328, 336, 342, 360, 367, 373, 381],
		[223, 230, 237, 244, 251, 258, 265, 276, 283, 291, 297, 311, 321, 328, 335, 342, 349, 368, 374, 382, 388],
		[227, 234, 241, 248, 255, 262, 270, 281, 288, 296, 303, 318, 327, 334, 342, 349, 356, 375, 382, 390, 396],
		[230, 238, 245, 252, 260, 268, 275, 287, 294, 301, 308, 323, 333, 341, 349, 356, 363, 382, 390, 397, 404],
		[234, 241, 249, 256, 265, 272, 279, 292, 299, 306, 314, 329, 339, 348, 355, 363, 370, 390, 398, 405, 412],
		[238, 246, 253, 261, 269, 276, 284, 296, 304, 312, 320, 336, 346, 354, 362, 369, 377, 397, 405, 413, 421],
		[241, 249, 257, 265, 273, 281, 289, 301, 309, 317, 325, 342, 352, 360, 368, 376, 384, 405, 413, 420, 429],
		[245, 253, 262, 270, 278, 286, 294, 306, 314, 322, 331, 347, 358, 367, 375, 383, 391, 412, 420, 428, 437]
	];

var vynshniLamelniC80 =
	[
		[214, 217, 224, 226, 232, 236, 244, 248, 255, 274, 281, 285, 299, 303, 310, 313, 320, 324, 346, 350, 357, 360, 375, 379, 385, 389, 396, 415, 422, 434, 440, 444, 448, 454, 458, 465, 523, 530, 535, 542, 546, 553],
		[222, 226, 232, 234, 242, 249, 253, 259, 266, 286, 292, 296, 311, 317, 321, 328, 335, 338, 361, 365, 371, 378, 390, 396, 403, 407, 413, 434, 440, 455, 459, 465, 472, 476, 482, 486, 548, 555, 559, 566, 573, 578],
		[225, 234, 240, 245, 249, 255, 262, 270, 274, 297, 304, 310, 322, 329, 336, 342, 349, 352, 376, 383, 389, 393, 408, 414, 421, 424, 431, 455, 461, 473, 480, 486, 493, 499, 503, 510, 572, 579, 584, 591, 598, 605],
		[234, 242, 247, 253, 260, 266, 272, 277, 283, 309, 316, 322, 337, 343, 350, 357, 361, 367, 391, 398, 404, 411, 426, 432, 439, 445, 449, 473, 480, 494, 501, 507, 514, 520, 527, 533, 597, 602, 609, 616, 623, 630],
		[244, 250, 257, 263, 270, 276, 283, 289, 296, 321, 327, 334, 348, 355, 361, 368, 374, 381, 406, 412, 421, 428, 443, 449, 456, 462, 469, 494, 500, 515, 521, 528, 534, 541, 547, 554, 619, 627, 634, 641, 648, 655],
		[249, 258, 263, 271, 276, 284, 291, 300, 307, 332, 338, 345, 362, 369, 375, 382, 388, 395, 423, 430, 436, 443, 458, 467, 473, 480, 486, 512, 518, 536, 542, 549, 555, 562, 571, 577, 644, 651, 658, 666, 675, 683],
		[257, 264, 272, 280, 286, 295, 302, 308, 318, 344, 350, 360, 374, 381, 390, 397, 403, 412, 438, 445, 451, 460, 475, 482, 491, 497, 504, 533, 539, 554, 563, 570, 576, 586, 592, 599, 669, 676, 683, 693, 701, 708],
		[266, 272, 280, 288, 297, 304, 313, 320, 326, 355, 362, 371, 386, 395, 401, 411, 417, 426, 453, 460, 469, 475, 493, 499, 509, 515, 524, 551, 560, 575, 584, 591, 597, 606, 613, 622, 691, 701, 708, 718, 725, 735],
		[271, 280, 290, 296, 305, 312, 321, 330, 337, 366, 373, 382, 399, 406, 415, 422, 431, 441, 467, 477, 483, 492, 510, 516, 526, 532, 541, 571, 578, 595, 602, 611, 620, 627, 636, 643, 715, 725, 732, 742, 749, 759],
		[279, 289, 296, 303, 312, 323, 332, 339, 346, 378, 388, 394, 412, 421, 427, 437, 446, 455, 483, 492, 501, 510, 525, 534, 544, 553, 559, 590, 599, 617, 623, 632, 642, 648, 657, 667, 740, 748, 758, 767, 777, 784],
		[287, 297, 304, 312, 322, 331, 340, 349, 359, 389, 399, 405, 423, 432, 441, 451, 460, 469, 500, 507, 516, 525, 543, 552, 561, 570, 580, 608, 617, 635, 644, 653, 662, 672, 681, 687, 762, 772, 782, 792, 802, 812],
		[296, 305, 313, 324, 333, 342, 352, 361, 370, 402, 411, 420, 437, 447, 456, 465, 474, 484, 515, 524, 534, 543, 560, 570, 579, 588, 597, 629, 638, 655, 665, 674, 683, 692, 702, 711, 788, 797, 807, 817, 827, 837],
		[315, 326, 337, 347, 355, 366, 375, 384, 394, 428, 438, 447, 464, 474, 483, 495, 504, 513, 546, 555, 564, 573, 594, 603, 612, 621, 630, 662, 674, 692, 701, 710, 720, 729, 738, 750, 828, 838, 848, 858, 867, 880],
		[325, 334, 346, 355, 365, 372, 386, 395, 404, 440, 449, 458, 476, 488, 497, 506, 518, 528, 560, 569, 581, 590, 608, 620, 629, 638, 650, 683, 693, 710, 722, 731, 740, 752, 762, 771, 850, 863, 872, 882, 895, 905],
		[333, 343, 353, 364, 373, 385, 394, 406, 415, 452, 461, 470, 490, 499, 511, 521, 533, 542, 575, 587, 597, 608, 626, 638, 647, 656, 668, 702, 714, 731, 743, 752, 762, 774, 783, 794, 875, 888, 898, 907, 920, 930],
		[339, 351, 359, 372, 384, 393, 405, 415, 427, 460, 472, 484, 501, 513, 523, 535, 544, 556, 593, 602, 614, 623, 644, 653, 665, 676, 685, 722, 731, 752, 761, 773, 785, 794, 806, 815, 899, 909, 922, 934, 944, 957],
		[347, 359, 367, 380, 392, 404, 414, 426, 438, 472, 484, 496, 516, 525, 537, 549, 559, 571, 608, 617, 629, 641, 661, 670, 682, 694, 703, 741, 753, 773, 782, 794, 806, 815, 827, 839, 924, 934, 947, 960, 969, 982],
		[355, 367, 376, 388, 400, 412, 424, 436, 448, 483, 495, 507, 527, 539, 551, 561, 573, 585, 623, 635, 647, 658, 676, 688, 700, 712, 724, 761, 771, 791, 803, 815, 827, 839, 851, 860, 946, 959, 972, 984, 997, 1007],
		[361, 373, 383, 397, 409, 421, 433, 445, 457, 495, 507, 519, 539, 551, 563, 575, 587, 599, 637, 649, 661, 673, 694, 706, 718, 729, 741, 780, 792, 812, 824, 836, 848, 860, 872, 883, 971, 984, 996, 1009, 1022, 1034],
		[369, 381, 392, 405, 420, 430, 442, 456, 468, 506, 518, 530, 553, 565, 577, 590, 602, 614, 652, 664, 679, 691, 711, 723, 735, 747, 759, 798, 812, 833, 845, 856, 868, 880, 892, 904, 996, 1009, 1021, 1034, 1047, 1059],
		[377, 389, 400, 416, 426, 440, 452, 467, 478, 518, 530, 544, 564, 576, 591, 604, 616, 628, 670, 682, 694, 706, 729, 741, 753, 764, 779, 818, 830, 851, 865, 877, 889, 904, 916, 928, 1018, 1034, 1046, 1059, 1071, 1087],
		[386, 398, 408, 423, 435, 451, 463, 475, 488, 530, 544, 556, 577, 591, 603, 618, 630, 642, 685, 697, 711, 723, 743, 758, 770, 785, 797, 837, 852, 872, 887, 899, 911, 925, 937, 951, 1043, 1056, 1071, 1084, 1099, 1112],
		[407, 422, 434, 448, 460, 475, 487, 502, 516, 556, 571, 583, 606, 618, 633, 645, 660, 672, 715, 727, 742, 757, 777, 791, 803, 818, 830, 873, 885, 908, 920, 935, 949, 961, 976, 988, 1083, 1096, 1111, 1124, 1139, 1152],
		[415, 430, 440, 456, 471, 483, 498, 511, 524, 568, 583, 595, 618, 632, 644, 659, 674, 686, 730, 744, 759, 771, 794, 809, 821, 835, 850, 891, 906, 929, 941, 955, 970, 982, 997, 1011, 1105, 1120, 1136, 1148, 1164, 1179],
		[422, 435, 448, 465, 479, 494, 509, 521, 535, 580, 594, 609, 629, 644, 659, 674, 689, 703, 745, 760, 774, 789, 812, 824, 839, 853, 868, 912, 927, 947, 962, 977, 991, 1006, 1018, 1032, 1130, 1146, 1161, 1176, 1189, 1204],
		[427, 444, 457, 473, 488, 502, 517, 532, 546, 591, 606, 621, 644, 658, 673, 688, 702, 717, 762, 774, 789, 804, 827, 841, 856, 870, 885, 930, 945, 968, 983, 997, 1012, 1027, 1042, 1056, 1155, 1170, 1186, 1201, 1216, 1232],
		[437, 452, 465, 479, 496, 510, 528, 542, 557, 602, 617, 632, 655, 670, 684, 699, 717, 732, 777, 792, 806, 821, 844, 859, 873, 888, 905, 951, 965, 988, 1003, 1018, 1032, 1047, 1062, 1077, 1177, 1195, 1210, 1226, 1241, 1256],
		[444, 460, 473, 488, 507, 521, 536, 551, 568, 614, 629, 643, 669, 684, 699, 714, 728, 746, 792, 807, 822, 839, 862, 877, 891, 908, 923, 969, 984, 1010, 1024, 1039, 1054, 1068, 1086, 1101, 1202, 1217, 1235, 1251, 1266, 1281],
		[449, 468, 483, 497, 515, 529, 547, 561, 576, 626, 640, 655, 681, 695, 713, 728, 743, 760, 807, 821, 839, 853, 879, 894, 908, 926, 941, 987, 1005, 1028, 1045, 1060, 1075, 1092, 1107, 1121, 1227, 1242, 1260, 1276, 1291, 1309],
		[459, 477, 491, 509, 523, 541, 556, 573, 588, 637, 652, 669, 692, 710, 724, 742, 757, 775, 822, 839, 854, 871, 894, 912, 926, 944, 959, 1009, 1023, 1049, 1064, 1081, 1099, 1113, 1131, 1145, 1252, 1267, 1285, 1301, 1319, 1334],
		[467, 482, 499, 517, 531, 549, 566, 581, 598, 649, 664, 681, 707, 721, 739, 756, 771, 788, 839, 854, 871, 886, 911, 929, 944, 961, 978, 1026, 1044, 1069, 1084, 1101, 1119, 1134, 1151, 1168, 1273, 1291, 1310, 1325, 1343, 1361],
		[472, 490, 507, 525, 542, 557, 574, 592, 609, 660, 675, 692, 718, 735, 753, 768, 785, 803, 854, 869, 886, 903, 929, 946, 961, 979, 996, 1047, 1064, 1087, 1105, 1122, 1140, 1157, 1172, 1189, 1298, 1316, 1334, 1350, 1368, 1386],
		[481, 498, 516, 533, 550, 568, 585, 603, 620, 672, 686, 704, 729, 747, 764, 783, 800, 818, 869, 887, 904, 921, 947, 964, 979, 997, 1014, 1066, 1083, 1109, 1126, 1144, 1161, 1178, 1196, 1213, 1323, 1341, 1359, 1375, 1393, 1411],
		[489, 507, 524, 541, 559, 576, 594, 611, 629, 681, 701, 718, 744, 761, 779, 797, 814, 831, 883, 901, 918, 936, 961, 979, 999, 1016, 1034, 1086, 1103, 1129, 1146, 1164, 1181, 1199, 1216, 1234, 1345, 1363, 1381, 1402, 1420, 1438],
		[497, 515, 532, 550, 567, 587, 605, 622, 640, 692, 712, 730, 755, 773, 790, 811, 828, 846, 899, 916, 936, 954, 979, 997, 1017, 1034, 1052, 1104, 1122, 1150, 1168, 1185, 1203, 1220, 1240, 1258, 1370, 1388, 1406, 1427, 1445, 1463],
		[503, 523, 540, 558, 578, 595, 613, 633, 650, 704, 724, 741, 767, 787, 805, 823, 843, 860, 914, 934, 951, 971, 997, 1014, 1035, 1052, 1069, 1125, 1143, 1168, 1189, 1206, 1223, 1244, 1261, 1278, 1395, 1413, 1431, 1452, 1470, 1488]
	];

var vynshniLamelniZ90 =
	[
		[221, 228, 232, 238, 242, 245, 254, 258, 265, 290, 294, 301, 313, 320, 324, 328, 335, 339, 367, 371, 375, 382, 394, 401, 405, 409, 416, 440, 448, 460, 464, 471, 475, 482, 486, 489, 564, 568, 576, 581, 586, 594],
		[232, 239, 243, 249, 254, 261, 265, 272, 276, 306, 309, 317, 329, 336, 340, 347, 354, 358, 387, 391, 398, 402, 418, 421, 429, 433, 440, 466, 473, 485, 492, 496, 503, 507, 514, 518, 595, 603, 607, 615, 620, 628],
		[240, 246, 253, 258, 262, 269, 277, 282, 289, 320, 324, 331, 346, 350, 357, 361, 368, 376, 403, 410, 417, 421, 436, 444, 447, 455, 462, 489, 496, 512, 515, 523, 530, 534, 541, 545, 623, 631, 636, 644, 652, 657],
		[247, 255, 261, 270, 272, 279, 288, 294, 302, 331, 338, 345, 361, 364, 372, 379, 386, 393, 421, 429, 436, 443, 455, 462, 470, 477, 484, 512, 519, 535, 542, 546, 553, 560, 568, 571, 652, 660, 668, 676, 680, 688],
		[258, 265, 272, 280, 287, 291, 298, 305, 312, 345, 352, 359, 375, 382, 389, 393, 400, 407, 440, 447, 455, 462, 477, 484, 492, 495, 503, 535, 543, 558, 565, 573, 580, 587, 594, 598, 680, 688, 696, 704, 712, 720],
		[269, 276, 282, 290, 296, 305, 312, 319, 326, 361, 368, 375, 391, 398, 405, 412, 419, 427, 461, 468, 475, 482, 498, 505, 512, 519, 527, 561, 568, 583, 591, 598, 605, 612, 619, 627, 715, 723, 731, 739, 747, 755],
		[275, 283, 291, 300, 306, 315, 322, 329, 336, 375, 382, 389, 405, 412, 419, 426, 437, 444, 479, 487, 494, 501, 520, 527, 534, 542, 549, 584, 591, 610, 617, 624, 632, 639, 646, 653, 743, 751, 759, 767, 775, 783],
		[285, 292, 298, 310, 316, 324, 335, 342, 349, 386, 396, 404, 419, 426, 437, 444, 451, 462, 498, 505, 513, 523, 539, 546, 553, 564, 571, 607, 618, 633, 640, 648, 658, 665, 673, 680, 772, 780, 788, 799, 807, 815],
		[292, 302, 309, 320, 327, 334, 345, 352, 363, 400, 407, 418, 433, 444, 451, 458, 469, 476, 517, 524, 531, 542, 557, 568, 575, 582, 593, 630, 641, 656, 664, 674, 681, 692, 699, 706, 800, 808, 820, 828, 836, 847],
		[302, 313, 319, 329, 336, 349, 356, 366, 372, 416, 423, 434, 449, 460, 467, 477, 488, 495, 538, 545, 555, 562, 581, 588, 599, 606, 617, 656, 666, 682, 692, 700, 710, 717, 728, 735, 831, 842, 850, 862, 870, 881],
		[312, 319, 328, 341, 348, 358, 369, 376, 387, 430, 437, 448, 467, 474, 485, 492, 502, 513, 553, 563, 574, 581, 600, 611, 618, 628, 639, 679, 690, 708, 716, 726, 737, 744, 755, 762, 860, 871, 879, 890, 902, 910],
		[319, 329, 338, 350, 358, 368, 379, 389, 400, 441, 452, 462, 481, 488, 499, 509, 520, 531, 572, 582, 593, 603, 619, 629, 640, 651, 661, 702, 713, 732, 742, 749, 760, 771, 781, 788, 888, 899, 911, 922, 930, 942],
		[342, 355, 364, 376, 385, 394, 404, 415, 425, 471, 481, 492, 511, 521, 532, 539, 550, 560, 606, 617, 627, 638, 657, 667, 678, 685, 695, 741, 752, 770, 781, 792, 802, 813, 823, 831, 932, 944, 955, 966, 978, 989],
		[355, 366, 376, 387, 397, 406, 418, 429, 440, 487, 497, 508, 527, 537, 548, 558, 569, 579, 626, 637, 648, 658, 677, 688, 698, 709, 719, 766, 777, 796, 806, 817, 827, 838, 849, 859, 967, 978, 989, 1001, 1012, 1024],
		[361, 372, 384, 396, 407, 418, 428, 439, 449, 501, 511, 522, 541, 551, 562, 573, 587, 597, 645, 656, 666, 677, 699, 710, 720, 731, 741, 790, 800, 822, 833, 844, 854, 865, 875, 886, 995, 1006, 1018, 1029, 1041, 1052],
		[371, 382, 391, 406, 417, 427, 441, 452, 463, 512, 526, 536, 555, 566, 580, 590, 601, 615, 664, 675, 685, 699, 718, 728, 739, 753, 764, 813, 827, 846, 856, 867, 881, 891, 902, 912, 1024, 1035, 1046, 1061, 1073, 1084],
		[378, 392, 401, 416, 427, 437, 451, 462, 476, 526, 537, 551, 569, 583, 594, 605, 618, 629, 683, 693, 704, 718, 737, 751, 761, 772, 786, 836, 850, 869, 879, 893, 904, 918, 928, 939, 1052, 1064, 1078, 1090, 1101, 1116],
		[389, 402, 413, 427, 438, 452, 462, 476, 487, 542, 552, 566, 585, 599, 610, 624, 638, 648, 703, 714, 728, 738, 761, 771, 785, 796, 810, 861, 875, 894, 908, 919, 933, 943, 957, 968, 1083, 1098, 1109, 1124, 1135, 1150],
		[398, 409, 421, 437, 447, 461, 475, 486, 500, 556, 567, 581, 603, 613, 627, 638, 652, 666, 719, 733, 747, 757, 779, 793, 804, 818, 832, 885, 899, 921, 931, 945, 959, 970, 984, 994, 1112, 1126, 1138, 1153, 1167, 1179],
		[405, 419, 431, 447, 457, 470, 483, 499, 513, 567, 581, 595, 617, 628, 642, 656, 669, 683, 737, 751, 765, 779, 798, 812, 826, 840, 854, 908, 922, 944, 958, 968, 982, 996, 1010, 1021, 1140, 1155, 1170, 1184, 1196, 1211],
		[415, 429, 441, 456, 469, 481, 495, 509, 523, 581, 595, 609, 631, 645, 659, 670, 684, 698, 756, 770, 784, 798, 820, 834, 848, 859, 873, 931, 945, 967, 981, 995, 1009, 1023, 1037, 1048, 1169, 1183, 1198, 1213, 1228, 1243],
		[425, 439, 452, 466, 480, 495, 509, 523, 535, 597, 611, 625, 647, 661, 675, 689, 703, 717, 777, 791, 805, 818, 841, 855, 869, 883, 896, 956, 970, 992, 1006, 1020, 1034, 1048, 1062, 1076, 1203, 1218, 1233, 1247, 1262, 1277],
		[447, 461, 479, 493, 507, 521, 535, 549, 562, 627, 641, 655, 677, 691, 705, 719, 736, 750, 811, 825, 839, 853, 878, 892, 906, 920, 934, 995, 1009, 1035, 1049, 1063, 1077, 1091, 1104, 1118, 1247, 1262, 1277, 1291, 1306, 1321],
		[457, 471, 484, 503, 516, 530, 548, 560, 576, 638, 655, 669, 691, 705, 722, 736, 750, 768, 830, 844, 858, 875, 897, 911, 925, 942, 956, 1018, 1036, 1058, 1072, 1086, 1103, 1117, 1131, 1145, 1276, 1290, 1305, 1323, 1338, 1353],
		[462, 481, 493, 512, 526, 540, 558, 572, 589, 652, 666, 683, 705, 723, 737, 751, 768, 782, 848, 862, 876, 894, 916, 933, 947, 961, 979, 1042, 1059, 1081, 1095, 1112, 1126, 1144, 1158, 1172, 1304, 1319, 1337, 1352, 1367, 1385],
		[473, 492, 504, 523, 537, 554, 568, 586, 600, 668, 682, 699, 721, 738, 752, 770, 787, 801, 869, 883, 900, 914, 940, 954, 971, 985, 1002, 1067, 1084, 1106, 1124, 1138, 1155, 1169, 1186, 1200, 1335, 1353, 1368, 1386, 1401, 1419],
		[484, 498, 514, 531, 547, 564, 582, 596, 613, 682, 696, 713, 739, 753, 770, 784, 801, 819, 884, 902, 919, 933, 959, 976, 990, 1007, 1024, 1090, 1107, 1133, 1147, 1164, 1182, 1196, 1213, 1227, 1364, 1382, 1397, 1415, 1433, 1448],
		[489, 508, 524, 541, 557, 574, 591, 609, 626, 693, 710, 728, 753, 767, 784, 802, 819, 836, 903, 920, 938, 955, 977, 995, 1012, 1029, 1047, 1113, 1131, 1156, 1174, 1188, 1205, 1222, 1240, 1254, 1392, 1410, 1428, 1447, 1461, 1480],
		[499, 518, 535, 553, 570, 584, 601, 619, 636, 707, 724, 742, 767, 785, 802, 816, 833, 851, 922, 939, 957, 974, 999, 1017, 1034, 1048, 1065, 1137, 1154, 1179, 1197, 1214, 1231, 1249, 1266, 1280, 1421, 1439, 1457, 1475, 1493, 1511],
		[512, 529, 546, 563, 581, 598, 615, 633, 650, 723, 740, 757, 783, 800, 818, 835, 852, 870, 942, 960, 977, 994, 1020, 1037, 1055, 1072, 1089, 1162, 1179, 1205, 1222, 1239, 1257, 1274, 1291, 1309, 1455, 1473, 1491, 1509, 1528, 1546],
		[518, 535, 556, 573, 591, 608, 625, 643, 660, 737, 754, 772, 797, 815, 832, 849, 870, 887, 961, 978, 996, 1013, 1042, 1059, 1077, 1094, 1111, 1185, 1202, 1231, 1249, 1266, 1283, 1301, 1318, 1335, 1484, 1502, 1520, 1538, 1556, 1574],
		[528, 545, 562, 583, 600, 618, 638, 656, 673, 748, 769, 786, 812, 829, 850, 867, 884, 905, 980, 997, 1015, 1035, 1061, 1078, 1095, 1116, 1134, 1208, 1229, 1255, 1272, 1289, 1310, 1327, 1345, 1362, 1512, 1530, 1548, 1570, 1588, 1606],
		[534, 555, 572, 593, 610, 628, 648, 666, 686, 762, 780, 800, 826, 847, 864, 881, 902, 919, 999, 1016, 1033, 1054, 1080, 1100, 1118, 1135, 1156, 1232, 1252, 1278, 1295, 1316, 1333, 1354, 1371, 1389, 1541, 1559, 1580, 1598, 1617, 1638],
		[545, 566, 583, 604, 621, 642, 659, 680, 697, 778, 795, 816, 842, 862, 880, 900, 921, 938, 1019, 1036, 1057, 1074, 1103, 1121, 1141, 1159, 1180, 1257, 1278, 1303, 1324, 1341, 1362, 1379, 1400, 1417, 1572, 1593, 1611, 1633, 1651, 1672],
		[555, 572, 593, 614, 631, 652, 672, 690, 710, 792, 810, 830, 859, 877, 897, 915, 935, 956, 1034, 1055, 1076, 1093, 1122, 1143, 1160, 1181, 1202, 1280, 1301, 1330, 1347, 1368, 1389, 1406, 1427, 1444, 1600, 1622, 1640, 1661, 1683, 1701],
		[561, 582, 603, 623, 641, 661, 682, 703, 724, 803, 824, 845, 874, 891, 912, 932, 953, 974, 1053, 1074, 1095, 1115, 1141, 1162, 1182, 1203, 1224, 1303, 1324, 1353, 1374, 1391, 1412, 1432, 1453, 1470, 1629, 1650, 1672, 1693, 1711, 1733]
	];

//Receving Info from dropdown menu
function getColorvh(colorvh) {
	colorCodevh = colorvh.selectedIndex;
}

function getModelvh(modelvh) {
	modelCodevh = modelvh.selectedIndex;
}

function findPrizevh(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	//local = local / 10;
	local = local - 5;

	if (local < 0) {
		local = 0;
	}

	return local;
}

function CheckBoundoriesvh(model, width, height) {
	switch (model) {
		case 0:
			if (width < 50 || height < 50 || width > 250 || height > 300) {
				alert(errMSG);
			} break;

		default:
			if (width < 50 || height < 50 || width > 460 || height > 400) {
				alert(errMSG);
			} break;
	}
}

function printFinalPricevh() {
	var sizeWidth = document.getElementById("sunblindWidthvh").value;
	var sizeHeight = document.getElementById("sunblindHeightvh").value;
	var decorative = document.getElementById("dekorativevh").checked;
	//var discount = 6;	//precent discount

	CheckBoundoriesvh(modelCodevh, sizeWidth, sizeHeight);


	sizeWidth = findPrizevh(sizeWidth);
	sizeHeight = findPrizevh(sizeHeight);

	switch (modelCodevh) {
		case 0:
			totalPrice = vynshniLamelniC50[sizeHeight][sizeWidth];
			break;

		case 1:
			totalPrice = vynshniLamelniC80[sizeHeight][sizeWidth];
			break;

		case 2:
			totalPrice = vynshniLamelniZ90[sizeHeight][sizeWidth];
			break;
	}

	if (decorative == 1) {
		var w = document.getElementById("sunblindWidthvh").value;
		totalPrice += (w / 100) * 47.9;
	}

	totalPrice -= totalPrice * (6 / 100);

	if (totalPrice == 0) {
		alert(errMSG);
	}
	else {
		document.getElementById("finalPricevh").innerHTML = totalPrice.toFixed(2) + " лв.";
	}
	totalPrice = 0;
	return false;
}

//////////////////////////////////////////////
//   vynshni horizontalni shtori - end      //
//////////////////////////////////////////////

//////////////////////////////
//   rulo shtori - start    //
//////////////////////////////

var colorCoderulo = 0;	//default color
var modelCoderulo = 0; // default model
var totalPricerulo = 0;
var isVisible = false;

var rollersModels = ["Стандарт", "Елеганс", "Комфорт"];
var rollerTextiles = [
	"Melisa (11***)",
	"Classic (50****)",
	"Luna (14****)",
	"Classic BlackOut (51****)",
	"Lima (101****)",
	"Lumina (683****)",
	"Classic Color BlackOut (61****)",
	"Melisa BlackOut (12***)",
	"Metalic (768****)",
	"Lino (4601**)",
	"Tropic (400**)",
	"Van Gogh (300**)",
	"Isabela BlackOut (700**)",
	"Corona (20****)",
	"Juno (109****)",
	"Prato (4107**)",
	"Tundra (795**)",
	"Albery (793**)",
	"Corona BlackOut (21****)",
	"Lino BlackOut (601**)",
	"Strata SPC® (765**)",
	"Green Screen ECO (524****)",
	"Tendence BlackOut (18****)",
	"Print (791**)",
	"Monroe (794**)",
	"Shade (34****)",
	"Wonderland (792**)"
];

var Coeficientrulo = [
	[1.00, 1.20, 1.40, 1.40, 1.30, 1.30, 1.50, 1.30, 1.30, 1.30, 1.30, 1.40, 1.40, 1.50, 1.50, 1.70, 1.80, 1.80, 2.10, 2.00, 2.00, 2.00, 2.20, 2.30, 2.30, 2.30, 2.70],	// Standart
	[1.00, 1.20, 1.30, 1.40, 1.20, 1.20, 1.40, 1.20, 1.20, 1.30, 1.30, 1.30, 1.30, 1.30, 1.30, 1.50, 1.50, 1.50, 1.70, 1.50, 1.50, 1.70, 1.90, 1.80, 1.80, 1.90, 2.00],	// Elegans
	[1.00, 1.20, 1.20, 1.20, 1.30, 1.30, 1.30, 1.30, 1.30, 1.30, 1.30, 1.30, 1.40, 1.40, 1.40, 1.60, 1.60, 1.60, 1.80, 1.80, 1.80, 2.00, 2.00, 2.00, 2.00, 2.00, 2.40]	// komfort
];

// Roller STANDART
var rollerStandart = [
	[12, 14, 15, 17, 19, 21, 22, 24, 26, 27, 29, 32, 34, 35, 37],
	[13, 15, 17, 18, 20, 22, 24, 26, 28, 30, 33, 35, 37, 38, 40],
	[14, 16, 18, 20, 22, 24, 26, 28, 30, 33, 35, 37, 39, 42, 44],
	[14, 17, 19, 21, 23, 26, 28, 30, 33, 36, 38, 40, 42, 45, 47],
	[15, 18, 20, 22, 25, 27, 30, 33, 36, 38, 40, 43, 45, 48, 50],
	[16, 19, 21, 24, 26, 29, 33, 35, 38, 40, 43, 46, 48, 51, 54],
	[17, 19, 22, 25, 28, 32, 34, 37, 40, 43, 45, 48, 51, 55, 58],
	[18, 20, 23, 26, 29, 33, 36, 39, 42, 45, 48, 51, 55, 58, 61],
	[18, 21, 25, 28, 32, 35, 38, 41, 44, 47, 51, 55, 58, 61, 64],
	[19, 22, 26, 29, 33, 37, 40, 43, 46, 50, 54, 57, 61, 64, 67],
	[20, 23, 27, 30, 35, 38, 42, 45, 49, 53, 57, 60, 64, 67, 71],
	[21, 24, 28, 33, 36, 40, 44, 47, 51, 56, 59, 63, 66, 70, 75],
	[21, 25, 29, 34, 38, 42, 45, 49, 54, 58, 62, 66, 69, 74, 78],
	[22, 26, 30, 35, 39, 43, 47, 51, 56, 60, 64, 68, 72, 77, 81],
	[23, 27, 32, 37, 41, 45, 49, 54, 58, 63, 67, 71, 76, 80, 85],
	[24, 28, 34, 38, 42, 47, 51, 56, 61, 65, 69, 75, 79, 83, 88],
	[25, 29, 35, 39, 44, 48, 54, 58, 63, 67, 72, 77, 82, 86, 91],
	[25, 30, 36, 41, 45, 50, 56, 60, 65, 70, 75, 80, 85, 90, 95],
	[26, 32, 37, 42, 47, 53, 57, 62, 67, 72, 78, 83, 88, 93, 98],
	[27, 33, 38, 43, 48, 54, 59, 64, 69, 75, 81, 86, 91, 97, 102],
	[28, 34, 39, 44, 50, 56, 61, 66, 72, 78, 83, 88, 95, 100, 105],
	[29, 35, 40, 46, 51, 58, 63, 68, 75, 80, 86, 91, 97, 103, 108]
];

var rollerElegans = [
	[22, 25, 28, 30, 34, 37, 40, 43, 45, 48, 51, 55],
	[24, 27, 30, 34, 37, 40, 43, 46, 49, 53, 56, 59],
	[25, 28, 32, 36, 39, 42, 45, 48, 53, 56, 59, 62],
	[26, 30, 34, 38, 41, 45, 48, 51, 56, 59, 63, 66],
	[28, 33, 36, 40, 43, 47, 51, 55, 59, 63, 66, 70],
	[29, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 75],
	[32, 36, 40, 44, 48, 53, 57, 61, 65, 69, 74, 79],
	[33, 37, 42, 46, 50, 56, 60, 64, 68, 74, 78, 82],
	[35, 39, 44, 48, 54, 58, 63, 67, 72, 77, 82, 86],
	[36, 41, 45, 50, 56, 61, 65, 70, 76, 80, 85, 90],
	[37, 42, 47, 53, 58, 63, 68, 74, 79, 84, 89, 95],
	[39, 44, 49, 55, 60, 66, 71, 77, 82, 87, 92, 99],
	[40, 46, 51, 57, 63, 68, 75, 80, 85, 91, 97, 102],
	[42, 47, 54, 60, 65, 71, 77, 83, 88, 95, 101, 106],
	[43, 49, 56, 62, 67, 74, 80, 86, 92, 98, 104, 110],
	[45, 51, 58, 64, 70, 77, 83, 89, 96, 102, 108, 114],
	[46, 53, 60, 66, 72, 79, 85, 92, 99, 105, 111, 118],
	[48, 55, 61, 68, 75, 82, 88, 96, 102, 108, 116, 122],
	[49, 57, 63, 70, 78, 84, 91, 98, 105, 112, 119, 126],
	[50, 58, 65, 72, 80, 87, 95, 101, 108, 116, 123, 130],
	[53, 60, 67, 75, 82, 89, 97, 104, 111, 120, 127, 134],
	[54, 62, 69, 77, 84, 92, 100, 107, 116, 123, 130, 138]
];

var rollerPrestige = [
	[29, 33, 35, 38, 41, 44, 47, 49, 53, 56, 59, 62, 64, 67, 70, 74, 77, 79, 82],
	[30, 34, 37, 40, 43, 46, 49, 53, 55, 58, 61, 64, 67, 70, 74, 77, 80, 83, 86],
	[30, 35, 38, 41, 44, 47, 51, 55, 58, 61, 64, 67, 71, 75, 78, 81, 84, 87, 91],
	[32, 36, 39, 42, 46, 49, 53, 57, 60, 64, 67, 70, 75, 78, 81, 85, 88, 91, 96],
	[33, 37, 40, 44, 47, 51, 55, 59, 63, 66, 70, 74, 78, 81, 85, 88, 92, 97, 100],
	[34, 38, 41, 45, 49, 54, 57, 61, 65, 69, 72, 77, 81, 85, 88, 92, 97, 101, 104],
	[35, 39, 43, 47, 51, 55, 59, 63, 67, 71, 76, 80, 84, 88, 92, 97, 101, 105, 109],
	[36, 40, 44, 48, 53, 57, 61, 65, 70, 75, 79, 83, 87, 91, 96, 100, 105, 109, 113],
	[37, 41, 45, 49, 55, 59, 63, 68, 72, 77, 82, 86, 90, 95, 100, 104, 108, 113, 118],
	[37, 42, 46, 51, 56, 61, 65, 70, 75, 80, 84, 89, 93, 99, 103, 108, 112, 118, 122],
	[38, 43, 48, 53, 58, 63, 67, 72, 78, 82, 87, 92, 97, 102, 107, 111, 117, 122, 126],
	[39, 44, 49, 55, 60, 64, 69, 75, 80, 85, 90, 96, 101, 105, 110, 116, 121, 126, 131],
	[40, 45, 50, 56, 61, 66, 71, 77, 82, 87, 92, 99, 104, 109, 114, 120, 125, 130, 135],
	[41, 46, 51, 57, 63, 68, 74, 79, 85, 90, 96, 101, 107, 112, 118, 123, 129, 134, 140],
	[42, 47, 53, 59, 64, 70, 76, 82, 87, 93, 99, 104, 110, 116, 122, 127, 133, 139, 144],
	[42, 48, 55, 60, 66, 72, 78, 84, 89, 96, 102, 107, 113, 120, 125, 131, 137, 143, 149],
	[43, 49, 56, 62, 68, 74, 80, 86, 92, 99, 104, 110, 117, 123, 129, 134, 141, 147, 153],
	[44, 50, 57, 63, 69, 76, 82, 88, 95, 101, 107, 113, 120, 126, 132, 139, 145, 151, 158],
	[45, 51, 58, 65, 71, 78, 84, 90, 97, 104, 110, 117, 123, 129, 137, 143, 149, 155, 162],
	[46, 53, 60, 66, 72, 80, 86, 92, 100, 106, 113, 120, 126, 133, 140, 147, 153, 160, 167],
	[47, 54, 61, 67, 75, 81, 88, 96, 102, 109, 116, 123, 129, 137, 144, 150, 158, 164, 171],
	[47, 55, 62, 69, 76, 83, 90, 98, 105, 111, 119, 126, 133, 140, 147, 154, 162, 168, 175],
	[48, 56, 63, 70, 78, 85, 92, 100, 107, 114, 122, 129, 137, 144, 151, 159, 165, 172, 180],
	[49, 57, 64, 72, 80, 87, 95, 102, 109, 117, 125, 132, 140, 147, 154, 162, 169, 176, 185],
	[50, 58, 66, 74, 81, 89, 97, 104, 112, 120, 127, 135, 143, 150, 159, 166, 173, 182, 189]
];

//Receving Info from dropdown menu
function getColorrulo(colorrulo) {
	colorCoderulo = colorrulo.selectedIndex;
}

function getModelrulo(modelrulo) {
	modelCoderulo = modelrulo.selectedIndex;
	var obj = document.getElementById('extrasChkrulo');

	if (modelrulo.selectedIndex == 0) {
		obj.style.visibility = "visible";
		isVisible = true;
	}
	else {
		obj.style.visibility = "hidden";
		isVisible = false;
	}
}

function findPrizerulo(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	//local = local / 10;
	local = local - 4;

	if (local < 0) {
		local = 0;
	}

	return local;
}

function CheckBoundoriesrulo(model, width, height) {
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

function printFinalPricerulo() {
	var sizeWidth = document.getElementById("sunblindWidthrulo").value;
	var sizeHeight = document.getElementById("sunblindHeightrulo").value;
	var discount = 6;	//precent discount

	CheckBoundoriesrulo(modelCoderulo, sizeWidth, sizeHeight);

	sizeWidth = findPrizerulo(sizeWidth);
	sizeHeight = findPrizerulo(sizeHeight);

	var extras = document.getElementById("extrasrulo").checked;

	switch (modelCoderulo) {
		case 0:
			totalPrice = rollerStandart[sizeHeight][sizeWidth];
			totalPrice *= Coeficientrulo[0][colorCoderulo];
			if (extras == 1) {
				totalPrice += 4.9;
			} break;

		case 1:
			totalPrice = rollerElegans[sizeHeight][sizeWidth];
			totalPrice *= Coeficientrulo[1][colorCoderulo];
			break;

		case 2:
			totalPrice = rollerPrestige[(sizeHeight - 2)][sizeWidth];
			totalPrice *= Coeficientrulo[2][colorCoderulo];
			break;
	}

	totalPrice -= totalPrice * (discount / 100);

	document.getElementById("finalPricerulo").innerHTML = totalPrice.toFixed(2) + " лв.";
	totalPrice = 0;
	return false;
}

//////////////////////////////
//   rulo shtori - end      //
//////////////////////////////

//////////////////////////////
//   den i nosht shtori - start    //
//////////////////////////////

var colorCodeDN = 0;	//default color
var modelCodeDN = 0; // default model
var totalPriceDN = 0;
var isVisibleDN = false;

var DNModels = ["Стандарт", "Елеганс", "Комфорт"];
var DNTextiles = [
	"Style (140**)",
	"Bahama (31***)",
	"Van Gogh (500*)",
	"Gradiente (199**)",
	"Flow (539**)",
	"Elegante (2287**)",
	"Bamboo (6534**)",
	"Corona (543**)",
	"Crush (9615*)",
	"Flax (21****)",
	"Ravello (15**)",
	"Bamboo Mini (4628**)",
	"Horizon (28**)",
	"Flower (2418*)",
	"Bamboo BO (29**)",
	"Bahama BO (16**)",
	"Nero (1212**)",
	"Shine (4478*)",
	"Bahama Lux (99*)",
	"Vision (831**)"
];

var CoeficientDN = [
	[1.00, 1.00, 1.10, 1.10, 1.20, 1.20, 1.25, 1.25, 1.25, 1.25, 1.25, 1.35, 1.35, 1.50, 1.50, 1.50, 1.80, 1.80, 1.80, 1.80],	// Standart
	[1.00, 1.00, 1.10, 1.10, 1.15, 1.15, 1.25, 1.25, 1.25, 1.25, 1.25, 1.35, 1.35, 1.50, 1.50, 1.50, 1.70, 1.70, 1.70, 1.70],	// Elegans
	[1.00, 1.00, 1.05, 1.05, 1.10, 1.10, 1.15, 1.15, 1.15, 1.15, 1.15, 1.20, 1.20, 1.25, 1.25, 1.25, 1.35, 1.35, 1.35, 1.35]	// komfort
];

// Roller STANDART
var DNStandart = [
	[17, 20, 23, 25, 28, 30, 33, 36, 38, 41, 43, 46, 49, 51, 54],
	[18, 21, 24, 27, 30, 33, 36, 39, 41, 44, 47, 50, 53, 56, 59],
	[20, 23, 26, 29, 32, 35, 38, 41, 45, 48, 51, 54, 57, 60, 63],
	[21, 24, 27, 31, 34, 38, 41, 44, 48, 51, 55, 58, 61, 65, 68],
	[22, 25, 29, 33, 36, 40, 44, 47, 51, 55, 58, 62, 66, 69, 73],
	[23, 27, 31, 35, 39, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78],
	[24, 28, 32, 37, 41, 45, 49, 53, 57, 62, 66, 70, 74, 78, 82],
	[25, 30, 34, 38, 43, 47, 52, 56, 61, 65, 69, 74, 78, 83, 87],
	[26, 31, 36, 40, 45, 50, 54, 59, 64, 69, 73, 78, 83, 87, 92],
	[27, 32, 37, 42, 47, 52, 57, 62, 67, 72, 77, 82, 87, 92, 97],
	[29, 34, 39, 44, 49, 55, 60, 65, 70, 75, 81, 86, 91, 96, 102],
	[30, 35, 41, 46, 52, 57, 63, 68, 73, 79, 84, 90, 95, 101, 106],
	[31, 37, 42, 48, 54, 59, 65, 71, 77, 82, 88, 94, 100, 105, 111],
	[32, 38, 44, 50, 56, 62, 68, 74, 80, 86, 92, 98, 104, 110, 116],
	[33, 39, 46, 52, 58, 64, 71, 77, 83, 89, 96, 102, 108, 114, 121],
	[34, 41, 47, 54, 60, 67, 73, 80, 86, 93, 99, 106, 112, 119, 125],
	[35, 42, 49, 56, 62, 69, 76, 83, 90, 96, 103, 110, 117, 123, 130],
	[37, 44, 51, 58, 65, 72, 79, 86, 93, 100, 107, 114, 121, 128, 135],
	[38, 45, 52, 59, 67, 74, 81, 89, 96, 103, 111, 118, 125, 132, 140],
	[39, 46, 54, 61, 69, 77, 84, 92, 99, 107, 114, 122, 129, 137, 144]
];

var DNElegans = [
	[21, 25, 28, 31, 34, 38, 41, 44, 47, 50, 54, 57],
	[23, 27, 30, 34, 37, 41, 44, 47, 51, 54, 58, 61],
	[25, 29, 32, 36, 40, 44, 47, 51, 55, 59, 62, 66],
	[26, 30, 34, 39, 43, 47, 51, 55, 59, 63, 67, 71],
	[28, 32, 37, 41, 45, 50, 54, 58, 62, 67, 71, 75],
	[30, 34, 39, 43, 48, 53, 57, 62, 66, 71, 75, 80],
	[31, 36, 41, 46, 51, 56, 60, 65, 70, 75, 80, 85],
	[33, 38, 43, 48, 54, 59, 64, 69, 74, 79, 84, 89],
	[35, 40, 45, 51, 56, 62, 67, 72, 78, 83, 89, 94],
	[36, 42, 48, 53, 59, 65, 70, 76, 82, 87, 93, 99],
	[38, 44, 50, 56, 62, 68, 74, 80, 86, 91, 97, 103],
	[40, 46, 52, 58, 65, 71, 77, 83, 89, 96, 102, 108],
	[41, 48, 54, 61, 67, 74, 80, 87, 93, 100, 106, 113],
	[43, 50, 56, 63, 70, 77, 84, 90, 97, 104, 111, 117],
	[45, 52, 59, 66, 73, 80, 87, 94, 101, 108, 115, 122],
	[46, 54, 61, 68, 75, 83, 90, 97, 105, 112, 119, 127],
	[48, 55, 63, 71, 78, 86, 93, 101, 109, 116, 124, 131],
	[50, 57, 65, 73, 81, 89, 97, 105, 112, 120, 128, 136],
	[51, 59, 67, 76, 84, 92, 100, 108, 116, 124, 133, 141],
	[53, 61, 70, 78, 86, 95, 103, 112, 120, 129, 137, 145]
];

var DNPrestige = [
	[54, 61, 67, 73, 79, 85, 92, 98, 104, 113, 119, 125, 132, 138, 144, 153, 159, 165, 171],
	[55, 62, 68, 75, 81, 88, 94, 100, 107, 116, 122, 129, 135, 141, 148, 157, 163, 170, 176],
	[57, 63, 70, 76, 83, 90, 96, 103, 110, 119, 125, 132, 139, 145, 152, 161, 167, 174, 181],
	[58, 64, 71, 78, 85, 92, 99, 105, 112, 122, 128, 135, 142, 149, 156, 165, 172, 179, 185],
	[59, 66, 73, 80, 87, 94, 101, 108, 115, 124, 131, 138, 145, 153, 160, 169, 176, 183, 190],
	[60, 67, 74, 81, 89, 96, 103, 110, 118, 127, 135, 142, 149, 156, 163, 173, 180, 188, 195],
	[61, 68, 76, 83, 91, 98, 105, 113, 120, 130, 138, 145, 152, 160, 167, 177, 185, 192, 199],
	[62, 70, 77, 85, 93, 100, 108, 115, 123, 133, 141, 148, 156, 164, 171, 181, 189, 196, 204],
	[63, 71, 79, 87, 94, 102, 110, 118, 126, 136, 144, 152, 159, 167, 175, 185, 193, 201, 209],
	[64, 72, 80, 88, 96, 104, 112, 120, 128, 139, 147, 155, 163, 171, 179, 189, 197, 205, 213],
	[65, 74, 82, 90, 98, 106, 115, 123, 131, 142, 150, 158, 166, 175, 183, 193, 202, 210, 218],
	[66, 75, 83, 92, 100, 108, 117, 125, 134, 145, 153, 161, 170, 178, 187, 197, 206, 214, 223],
	[68, 76, 85, 93, 102, 111, 119, 128, 136, 147, 156, 165, 173, 182, 191, 202, 210, 219, 227],
	[69, 77, 86, 95, 104, 113, 121, 130, 139, 150, 159, 168, 177, 186, 194, 206, 214, 223, 232],
	[70, 79, 88, 97, 106, 115, 124, 133, 142, 153, 162, 171, 180, 189, 198, 210, 219, 228, 237],
	[71, 80, 89, 98, 108, 117, 126, 135, 144, 156, 165, 175, 184, 193, 202, 214, 223, 232, 241],
	[72, 81, 91, 100, 110, 119, 128, 138, 147, 159, 168, 178, 187, 197, 206, 218, 227, 237, 246],
	[73, 83, 92, 102, 111, 121, 131, 140, 150, 162, 171, 181, 191, 200, 210, 222, 231, 241, 251],
	[74, 84, 94, 104, 113, 123, 133, 143, 153, 165, 175, 184, 194, 204, 214, 226, 236, 246, 255],
	[75, 85, 95, 105, 115, 125, 135, 145, 155, 168, 178, 188, 198, 208, 218, 230, 240, 250, 260]
];

//Receving Info from dropdown menu
function getColorDN(colorDN) {
	colorCodeDN = colorDN.selectedIndex;
}

function getModelDN(modelDN) {
	modelCodeDN = modelDN.selectedIndex;
	var obj = document.getElementById('extrasChkDN');

	if (modelDN.selectedIndex == 0) {
		obj.style.visibility = "visible";
		isVisibleDN = true;
	}
	else {
		obj.style.visibility = "hidden";
		isVisibleDN = false;
	}
}

function findPrizeDN(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	//local = local / 10;
	local = local - 4;

	if (local < 0) {
		local = 0;
	}

	return local;
}

function CheckBoundoriesDN(model, width, height) {
	var errMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	switch (model) {
		case 0:
			if (width > 180 || width < 20 || height > 230 || height < 20) {
				alert(errMSG);
			} break;

		case 1:
			if (width > 150 || width < 20 || height > 230 || height < 20) {
				alert(errMSG);
			} break;

		case 2:
			if (width > 220 || width < 40 || height > 250 || height < 40) {
				alert(errMSG);
			} break;
	}
}

function printFinalPriceDN() {
	var sizeWidth = document.getElementById("sunblindWidthDN").value;
	var sizeHeight = document.getElementById("sunblindHeightDN").value;
	var discount = 6;	//precent discount

	CheckBoundoriesDN(modelCodeDN, sizeWidth, sizeHeight);

	sizeWidth = findPrizeDN(sizeWidth);
	sizeHeight = findPrizeDN(sizeHeight);

	var extrasDN = document.getElementById("extrasDN").checked;

	switch (modelCodeDN) {
		case 0:
			totalPrice = DNStandart[sizeHeight][sizeWidth];
			totalPrice *= CoeficientDN[0][colorCodeDN];
			if (extrasDN == 1) {
				totalPrice += 4.5;
			} break;

		case 1:
			totalPrice = DNElegans[sizeHeight][sizeWidth];
			totalPrice *= CoeficientDN[1][colorCodeDN];
			break;

		case 2:
			totalPrice = DNPrestige[(sizeHeight - 2)][sizeWidth];
			totalPrice *= CoeficientDN[2][colorCodeDN];
			break;
	}

	totalPrice -= totalPrice * (discount / 100);

	document.getElementById("finalPriceDN").innerHTML = totalPrice.toFixed(2) + " лв.";
	totalPrice = 0;
	return false;
}

//////////////////////////////
//   den i nosht shtori - end      //
//////////////////////////////

//////////////////////////
//   sennici - start    //
//////////////////////////



var colorCodesen = 0;	//default color
var modelCodesen = 0; // default model
var totalPrice = 0;

var modelssen = ["Стандарт(Чупещо рамо)",
	"Елеганс(Чупещо рамо)",
	"Вера(Чупещо рамо)",
	"Престиж(Чупещо рамо)",
	"Класик(Падащо рамо)",
	"Смарт(Падащо рамо)",
	"Кабрио",
	"Балконски(Ветроупорен)",
	"Кристал(Ветроупорен)",
	"Кристал Ридо(Ветроупорен)"
];

var colorssen = ["Breza(Акрилен)",
	"PARÀ(Акрилен)",
	"PARÀ StarLight"];



var modelsTable =
	[
		[
			//standart //0
			[617, 713, 756, 799, 895, 938, 1087],
			[0, 778, 822, 866, 974, 1017, 1180],
			[0, 0, 878, 923, 1045, 1089, 1265],
			[0, 0, 0, 999, 1133, 1179, 1367]
		],
		[         //1
			[691, 803, 851, 898, 1010, 1056, 1227],
			[0, 879, 927, 975, 1104, 1152, 1339],
			[0, 0, 993, 1043, 1187, 1236, 1440],
			[0, 0, 0, 1131, 1292, 1342, 1560]
		],
		[        //2
			[736, 866, 915, 962, 1092, 1140, 1330],
			[0, 954, 1004, 1052, 1202, 1252, 1462],
			[0, 0, 1082, 1132, 1302, 1352, 1582],
			[0, 0, 0, 1233, 1423, 1474, 1724]
		],
		[
			//Elegance       //3
			[755, 861, 911, 962, 1068, 1118, 1281, 1479, 1592, 1754, 1805],
			[0, 936, 987, 1040, 1158, 1211, 1386, 1598, 1712, 1887, 1938],
			[0, 0, 1070, 1122, 1256, 1308, 1497, 1727, 1843, 2032, 2084],
			[0, 0, 0, 1232, 1378, 1488, 1635, 1688, 2016, 2163, 2217],
			[0, 0, 0, 0, 1587, 1641, 1802, 1856, 1973, 2390, 0],
			[0, 0, 0, 0, 0, 1723, 2010, 2065, 2183, 0, 0]
		],
		[                   //4
			[793, 908, 962, 1013, 1130, 1182, 1357, 1560, 1678, 1851, 1904],
			[0, 990, 1045, 1097, 1230, 1283, 1473, 1692, 1808, 1998, 2052],
			[0, 0, 1134, 1189, 1337, 1391, 1596, 1833, 1952, 2158, 2211],
			[0, 0, 0, 1306, 1470, 1582, 1746, 1802, 2139, 2304, 2358],
			[0, 0, 0, 0, 1691, 1747, 1926, 1982, 2103, 2547, 0],
			[0, 0, 0, 0, 0, 1839, 2149, 2206, 2329, 0, 0]
		],
		[                   //5
			[846, 983, 1036, 1090, 1225, 1279, 1474, 1684, 1804, 1999, 2053],
			[0, 1077, 1133, 1188, 1343, 1398, 1612, 1836, 1957, 2172, 2227],
			[0, 0, 1236, 1292, 1467, 1523, 1757, 2001, 2123, 2357, 2413],
			[0, 0, 0, 1423, 1618, 1735, 1929, 1986, 2334, 2528, 2585],
			[0, 0, 0, 0, 1860, 1918, 2133, 2190, 2314, 2800, 0],
			[0, 0, 0, 0, 0, 2027, 2379, 2438, 2563, 0, 0]
		],
		[
			//Vera          //6
			[1066, 1225, 1330, 1436, 1596, 1702, 1974],
			[0, 0, 1439, 1546, 1719, 1825, 2111],
			[0, 0, 0, 1657, 1844, 1951, 2250],
			[0, 0, 0, 0, 1967, 2075, 2388]
		],
		[                   //7
			[1136, 1310, 1421, 1533, 1707, 1818, 2113],
			[0, 0, 1540, 1652, 1843, 1954, 2265],
			[0, 0, 0, 1775, 1981, 2095, 2420],
			[0, 0, 0, 0, 2117, 2231, 2571]
		],
		[                 //8
			[1200, 1395, 1510, 1624, 1821, 1934, 2252],
			[0, 0, 1643, 1758, 1974, 2090, 2428],
			[0, 0, 0, 1895, 2132, 2247, 2605],
			[0, 0, 0, 0, 2285, 2401, 2780]
		],
		[
			//Prestige   //9
			[1336, 1515, 1643, 1769, 1951, 2077, 2258, 2753, 2948, 3129, 3256],
			[0, 1603, 1731, 1859, 2054, 2181, 2375, 2892, 3088, 3282, 3410],
			[0, 0, 1824, 1953, 2161, 2290, 2497, 3040, 3238, 3446, 3629],
			[0, 0, 0, 2043, 2263, 2449, 2668, 2799, 3434, 3653, 0]
		],
		[               //10
			[1418, 1616, 1749, 1883, 2080, 2213, 2411, 2932, 3137, 3335, 3468],
			[0, 1713, 1847, 1981, 2195, 2329, 2543, 3086, 3293, 3506, 3640],
			[0, 0, 1951, 2086, 2315, 2451, 2680, 3251, 3459, 3688, 3881],
			[0, 0, 0, 2185, 2430, 2624, 2869, 3005, 3672, 3917, 0]
		],
		[               //11
			[1478, 1696, 1831, 1968, 2183, 2319, 2537, 3068, 3278, 3493, 3630],
			[0, 1805, 1941, 2079, 2315, 2452, 2689, 3242, 3453, 3690, 3827],
			[0, 0, 2058, 2196, 2452, 2589, 2847, 3428, 3640, 3896, 4093],
			[0, 0, 0, 2307, 2583, 2780, 3056, 3196, 3875, 4152, 0]
		],
		[
			//Classic   //12
			[549, 621, 652, 723, 755, 788, 859],
			[571, 656, 690, 775, 807, 841, 926],
			[596, 695, 730, 828, 863, 899, 996],
			[624, 735, 773, 884, 921, 958, 1069],
			[647, 772, 810, 935, 973, 1012, 1137]
		],
		[                //13
			[554, 631, 663, 739, 771, 802, 879],
			[579, 670, 704, 795, 828, 861, 953],
			[605, 712, 747, 853, 888, 923, 1030],
			[633, 755, 792, 914, 950, 987, 1109],
			[657, 794, 833, 969, 1008, 1046, 1182]
		],
		[               //14
			[593, 685, 718, 810, 843, 877, 968],
			[622, 732, 768, 878, 912, 948, 1058],
			[653, 782, 819, 949, 986, 1023, 1152],
			[687, 835, 874, 1022, 1061, 1099, 1248],
			[715, 882, 923, 1090, 1131, 1172, 1339]
		],
		[
			//Smart    //15
			[606, 748, 849, 992, 1093, 1194, 1337],
			[628, 785, 888, 1045, 1148, 1251, 1407],
			[654, 825, 930, 1100, 1205, 1310, 1481],
			[683, 867, 974, 1158, 1265, 1372, 1556],
			[707, 905, 1013, 1212, 1320, 1429, 1628]
		],
		[               //16
			[611, 759, 860, 1008, 1109, 1211, 1359],
			[635, 799, 902, 1066, 1169, 1272, 1435],
			[664, 842, 947, 1127, 1232, 1336, 1515],
			[693, 888, 994, 1190, 1296, 1403, 1597],
			[718, 928, 1036, 1247, 1356, 1464, 1675]
		],
		[               //17
			[634, 797, 900, 1063, 1166, 1268, 1431],
			[663, 844, 949, 1131, 1236, 1341, 1523],
			[694, 895, 1002, 1202, 1309, 1416, 1617],
			[729, 948, 1057, 1277, 1386, 1494, 1715],
			[757, 996, 1107, 1346, 1456, 1568, 1806]
		],
		[
			//Kabrio   //18
			[443, 538, 597, 671, 765, 826, 933, 993],
			[641, 704, 823, 900, 1020, 1083, 1158, 1279],
			[887, 951, 1098, 1176, 1241, 1388, 1466, 0],
			[1182, 1248, 1315, 1502, 1568, 1742, 0, 0]
		],
		[             //19
			[443, 538, 597, 671, 765, 826, 933, 993],
			[641, 704, 823, 900, 1020, 1083, 1158, 1279],
			[887, 951, 1098, 1176, 1241, 1388, 1466, 0],
			[1182, 1248, 1315, 1502, 1568, 1742, 0, 0]
		],
		[             //20
			[482, 589, 653, 730, 837, 901, 1022, 1086],
			[716, 781, 923, 1002, 1143, 1209, 1288, 1429],
			[1013, 1080, 1256, 1338, 1405, 1580, 1661, 0],
			[1373, 1444, 1513, 1736, 1806, 2014, 0, 0]
		],
		[
			//Balkonski //21
			[345, 443, 475, 572, 604, 636, 734, 765, 925, 957, 988]
		],
		[             //22
			[372, 484, 517, 629, 662, 695, 806, 840, 1016, 1050, 1083]
		],
		[             //23
			[410, 546, 581, 717, 752, 786, 923, 958, 1162, 1197, 1233]
		],
		[
			//Kristal // 24
			[234, 299, 364, 429, 495, 560],
			[252, 328, 403, 478, 553, 629],
			[271, 356, 441, 527, 612, 697],
			[289, 384, 480, 575, 671, 767]
		],
		[
			//Kristal Rido  //25
			[479, 592, 707, 821, 936, 1050],
			[579, 704, 827, 952, 1076, 1201],
			[678, 814, 948, 1083, 1217, 1352],
			[779, 924, 1069, 1214, 1359, 1503],
			[879, 1034, 1189, 1344, 1499, 1654],
			[980, 1145, 1309, 1474, 1640, 1805]
		]
	];


//Receving Info from dropdown menu

function getColorsen(colorsen) {
	colorCodesen = colorsen.selectedIndex;
}

function getModelsen(modelsen) {
	modelCodesen = modelsen.selectedIndex;
	document.getElementById('sunblindHeightsen').disabled = false;
	document.getElementById("sennikPvcsen").disabled = false;
	document.getElementById("sennikBrezasen").disabled = false;
	//document.getElementById('sunblindHeightsen').value = '';
	switch (modelCodesen) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 8:
		case 9:
			// document.getElementById("sennikPvcsen").disabled = "true";
			break;
		case 6:
			document.getElementById("sennikBrezasen").disabled = true;
			break;
		case 7:
			// The lenght is olny 200 cm and the field is disabled
			document.getElementById('sunblindHeightsen').value = 200;
			document.getElementById('sunblindHeightsen').disabled = true;
			break;
		default:
			document.getElementById("sennikPvcsen").disabled = false;
			break;
	}
}

// MAXIMUM
function throwMaxLenghtExeption(wOrH, maximum) {
	var maxWidth = "Масималната ширина на този сенник е ";
	var maxHeight = "Максималната височина(напред) на този сенник е ";
	if (wOrH == 0)	// Width
	{
		alert(maxWidth + maximum + ' cm.');
	}
	else	// e.g. 1 -> height
	{
		alert(maxHeight + maximum + ' cm.');
	}
}

// MINIMUM
function throwMinLenghtExeption(minimum) {
	var minWidth = "Минималната ширна на този сенник е ";
	alert(minWidth + minimum + ' cm.');
}

function findTable(model, color) {
	var tableIndex = 0;
	switch (model) {
		case 0:                 //standart
			tableIndex = 0;
			break;
		case 1:                 //elegance
			tableIndex = 3;
			break;
		case 2:                 //vera
			tableIndex = 6;
			break;
		case 3:                 //prestige
			tableIndex = 9;
			break;
		case 4:                 //classic
			tableIndex = 12;
			break;
		case 5:                 //smart
			tableIndex = 15;
			break;
		case 6:                 //cabrio
			tableIndex = 18;
			break;
		case 7:                 //balkonski
			tableIndex = 21;
			break;
		case 8:                 //kristal
			tableIndex = 24;
			break;
		case 9:                 //kristal rido
			tableIndex = 25;
			break;
	}

	if (model != 8 && 9) {
		tableIndex += color;
	}


	return tableIndex;
}

function findPrizeClasicAndSmart(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCodesen, colorCodesen);
	//-------- Width Parameters
	if (width < 70) {
		throwMinLenghtExeption(70);
	}
	if (width > 400) {
		throwMaxLenghtExeption(0, 400);
		return 1;
	}
	if (width > 350) {
		col = 6;
	}
	else if (width > 300) {
		col = 5;
	}
	else if (width > 250) {
		col = 4;
	}
	else if (width > 200) {
		col = 3;
	}
	else if (width > 150) {
		col = 2;
	}
	else if (width > 100) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height > 150) {
		throwMaxLenghtExeption(1, 150);
		return 1;
	}
	if (height > 125) {
		row = 4;
	}
	else if (height > 100) {
		row = 3;
	}
	else if (height > 75) {
		row = 2;
	}
	else if (height > 50) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeStandartAndVera(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCodesen, colorCodesen);
	//-------- Width Parameters
	if (width < 185) {
		throwMinLenghtExeption(185);
	}
	if (width > 500) {
		throwMaxLenghtExeption(0, 500);
		return 1;
	}
	if (width > 450) {
		col = 6;
	}
	else if (width > 400) {
		col = 5;
	}
	else if (width > 350) {
		col = 4;
	}
	else if (width > 300) {
		col = 3;
	}
	else if (width > 250) {
		col = 2;
	}
	else if (width > 200) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height < 150 || height > 300) {
		throwMaxLenghtExeption(1, 300);
		return 1;
	}
	if (height > 250) {
		row = 3;
	}
	else if (height > 200) {
		row = 2;
	}
	else if (height > 150) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeElegans(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCodesen, colorCodesen);
	//-------- Width Parameters
	if (width < 185) {
		throwMinLenghtExeption(185);
	}
	if (width > 700) {
		throwMaxLenghtExeption(0, 700);
		return 1;
	}

	if (width > 650) {
		col = 10;
	}
	else if (width > 600) {
		col = 9;
	}
	else if (width > 550) {
		col = 8;
	}
	else if (width > 500) {
		col = 7;
	}
	else if (width > 450) {
		col = 6;
	}
	else if (width > 400) {
		col = 5;
	}
	else if (width > 350) {
		col = 4;
	}
	else if (width > 300) {
		col = 3;
	}
	else if (width > 250) {
		col = 2;
	}
	else if (width > 200) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height > 400) {
		throwMaxLenghtExeption(1, 400);
		return 1;
	}

	if (height > 350) {
		row = 5;
	}
	else if (height > 300) {
		row = 4;
	}
	else if (height > 250) {
		row = 3;
	}
	else if (height > 200) {
		row = 2;
	}
	else if (height > 150) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizePrestige(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCodesen, colorCodesen);
	//-------- Width Parameters
	if (width < 185) {
		throwMinLenghtExeption(185);
	}
	if (width > 700) {
		throwMaxLenghtExeption(0, 700);
		return 1;
	}

	if (width > 650) {
		col = 10;
	}
	else if (width > 600) {
		col = 9;
	}
	else if (width > 550) {
		col = 8;
	}
	else if (width > 500) {
		col = 7;
	}
	else if (width > 450) {
		col = 6;
	}
	else if (width > 400) {
		col = 5;
	}
	else if (width > 350) {
		col = 4;
	}
	else if (width > 300) {
		col = 3;
	}
	else if (width > 250) {
		col = 2;
	}
	else if (width > 200) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height > 300) {
		throwMaxLenghtExeption(1, 300);
		return 1;
	}
	if (height > 250) {
		row = 3;
	}
	else if (height > 200) {
		row = 2;
	}
	else if (height > 150) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeCabrio(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCodesen, colorCodesen);
	//-------- Width Parameters
	if (width < 70) {
		throwMinLenghtExeption(70);
	}
	if (width > 450) {
		throwMaxLenghtExeption(0, 450);
		return 1;
	}
	else if (width > 400) {
		col = 7;
	}
	else if (width > 350) {
		col = 6;
	}
	else if (width > 300) {
		col = 5;
	}
	else if (width > 250) {
		col = 4;
	}
	else if (width > 200) {
		col = 3;
	}
	else if (width > 150) {
		col = 2;
	}
	else if (width > 100) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height > 200) {
		throwMaxLenghtExeption(1, 200);
		return 1;
	}
	else if (height > 150) {
		row = 3;
	}
	else if (height > 100) {
		row = 2;
	}
	else if (height > 50) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeBalkonski(height, width) {
	// The lenght is olny 200 cm and the field is disabled
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCodesen, colorCodesen);

	if (width < 70) {
		throwMinLenghtExeption(70);
	}

	if (width > 600) {
		throwMaxLenghtExeption(0, 600);
		return 1;
	}
	else if (width > 550) {
		col = 10;
	}
	else if (width > 500) {
		col = 9;
	}
	else if (width > 450) {
		col = 8;
	}
	else if (width > 400) {
		col = 7;
	}
	else if (width > 350) {
		col = 6;
	}
	else if (width > 300) {
		col = 5;
	}
	else if (width > 250) {
		col = 4;
	}
	else if (width > 200) {
		col = 3;
	}
	else if (width > 150) {
		col = 2;
	}
	else if (width > 100) {
		col = 1;
	}
	else {
		col = 0;
	}
	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeShirokoploshten(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCodesen, colorCodesen);
	//-------- Width Parameters
	if (width < 100) {
		throwMinLenghtExeption(100);
	}

	if (width > 350) {
		throwMaxLenghtExeption(0, 350);
		return 1;
	}


    if (width > 350) {
		col = 6;
	}
	else if (width > 300) {
		col = 5;
	}
	else if (width > 250) {
		col = 4;
	}
	else if (width > 200) {
		col = 3;
	}
	else if (width > 150) {
		col = 2;
	}
	else if (width > 100) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height > 350) {
		throwMaxLenghtExeption(1, 350);
		return 1;
	}
	else if (height > 350) {
		row = 5;
	}
	else if (height > 300) {
		row = 5;
	}
	else if (height > 250) {
		row = 4;
	}
	else if (height > 200) {
		row = 3;
	}
	else if (height > 150) {
		row = 2;
	}
	else if (height > 100) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeCristal(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCodesen, colorCodesen);
	//-------- Width Parameters
	if (width < 70) {
		throwMinLenghtExeption(70);
	}

	if (width > 350) {
		throwMaxLenghtExeption(0, 350);
		return 1;
	}
	if (width > 300) {
		col = 5;
	}
	else if (width > 250) {
		col = 4;
	}
	else if (width > 200) {
		col = 3;
	}
	else if (width > 150) {
		col = 2;
	}
	else if (width > 100) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters

	if (height > 300) {
		throwMaxLenghtExeption(1, 300);
		return 1;
	}
	else if (height > 250) {
		row = 3;
	}
	else if (height > 200) {
		row = 2;
	}
	else if (height > 150) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function CheckBreakingSholder(model, width, height) {
	var errMSG = "Минимална ширина на сенника = дължина на рамо + 35 см.";
	var errMSG2 = "При рамо 200, 250 или 300 см (за сенник 'Вера') минималната ширина на сенника = дължина на рамо + 60 см."
	if (model == 2) {
		if (height <= 150) {
			if (width < height + 35) {
				alert(errMSG);
			}
		}
		else {
			if (width < height + 60) {
				alert(errMSG2);
			}
		}
	}
	else {
		var minW = height + 35;
		if (width < minW) {
			alert(errMSG);
		}
	}
}

function printFinalPricesen() {
	var errMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	var errMsgUnacceptable = "При зададените размери ширината и височината са несъвместими. Моля намалете височината.";
	var sizeWidth = Number(document.getElementById("sunblindWidthsen").value);
	var sizeHeight = Number(document.getElementById("sunblindHeightsen").value);
	var discount = 6;	//precent discount

	//CheckBoundories (modelCode, sizeWidth, sizeHeight);

	// Setting the prize for the Total
	switch (modelCodesen) {
		case 0:
		case 2:
			totalPrice = findPrizeStandartAndVera(sizeHeight, sizeWidth);
			CheckBreakingSholder(modelCode, sizeWidth, sizeHeight);
			break;

		case 1:
			totalPrice = findPrizeElegans(sizeHeight, sizeWidth);
			CheckBreakingSholder(modelCode, sizeWidth, sizeHeight);
			break;

		case 3:
			totalPrice = findPrizePrestige(sizeHeight, sizeWidth);
			CheckBreakingSholder(modelCode, sizeWidth, sizeHeight);
			break;

		case 4:
		case 5:
			totalPrice = findPrizeClasicAndSmart(sizeHeight, sizeWidth);
			break;

		case 6:
			totalPrice = findPrizeCabrio(sizeHeight, sizeWidth);
			break;

		case 7:
			totalPrice = findPrizeBalkonski(sizeHeight, sizeWidth);
			break;

		case 8:
			totalPrice = findPrizeCristal(sizeHeight, sizeWidth);
			break;

		case 9:
			totalPrice = findPrizeShirokoploshten(sizeHeight, sizeWidth);
			break;
	}

	// TODO: If total = 0
	// TODO: If total = 1
	if (totalPrice == 0) {
		alert(errMsgUnacceptable);
		document.getElementById("finalPricesen").innerHTML = "";
	}
	else if (totalPrice == 1) {
		//alert(errMSG);
		document.getElementById("finalPricesen").innerHTML = "";
	}
	else {
		document.getElementById("finalPricesen").innerHTML = totalPrice - totalPrice * discount / 100 + " лв.";
	}
	totalPrice = 0;
	return false;
}

//////////////////////////
//   sennici - end      //
//////////////////////////

//////////////////////////
//   mreji - start      //
//////////////////////////

var colorCodemrj = 0;	//default color
var modelCodemrj = 0; // default model
var totalPrice = 0;
var isVisible = false;

// Prices by different models and colors
var netsContent = ["Статична мрежа", "Мрежа с панти", "Ролетен в рамка", "Ролетен с вграден водач", "Ролетен хоризонтален", "Балконска врата"]

var netsTable = [
	[],	// Static
	[],// hinges
	[],
	[],
	[],
	[]	// hinges door
];

var netsColors = ["Бял", "Кафяв", "Имитация на дърво", "Цвят по RAL"];

var profile = [9.9, 9.9, 12.9, 12.9];	// Only Roller


//panti
var insectNetWithPanti = [
	[18, 18, 18, 18, 18, 18, 18, 19, 20, 22],
	[18, 18, 18, 18, 18, 18, 20, 21, 22, 25],
	[18, 18, 18, 18, 18, 20, 21, 24, 25, 27],
	[18, 18, 18, 19, 20, 22, 24, 26, 27, 29],
	[18, 18, 18, 20, 22, 24, 26, 28, 29, 31],
	[18, 18, 20, 22, 24, 26, 28, 29, 31, 33],
	[18, 20, 21, 24, 26, 28, 30, 31, 33, 35],
	[19, 21, 24, 26, 28, 29, 31, 33, 35, 37],
	[20, 22, 25, 27, 29, 31, 33, 35, 37, 40],
	[22, 25, 27, 29, 31, 33, 35, 37, 40, 42],
	[24, 26, 28, 30, 32, 35, 37, 40, 42, 44],
	[25, 28, 30, 32, 34, 36, 39, 42, 44, 46],
	[27, 29, 31, 33, 36, 39, 41, 44, 46, 48],
	[28, 30, 33, 35, 37, 41, 43, 45, 48, 50],
	[29, 32, 34, 37, 40, 42, 45, 47, 50, 52],
	[31, 33, 36, 39, 42, 44, 47, 49, 52, 55],
	[32, 34, 37, 41, 43, 46, 48, 51, 55, 57],
	[33, 36, 40, 42, 45, 47, 50, 54, 56, 59],
	[34, 37, 41, 44, 46, 49, 52, 56, 58, 61],
	[36, 40, 42, 45, 48, 51, 55, 58, 60, 63]
];

//fix
var insectNetFix = [
	[18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 21, 22, 24, 25, 26, 27],
	[18, 18, 18, 18, 18, 18, 18, 19, 20, 21, 22, 24, 26, 27, 28, 29],
	[18, 18, 18, 18, 18, 18, 19, 20, 22, 24, 25, 26, 28, 29, 30, 31],
	[18, 18, 18, 18, 18, 19, 21, 22, 24, 26, 27, 28, 30, 31, 32, 33],
	[18, 18, 18, 18, 19, 21, 22, 25, 26, 27, 29, 30, 31, 33, 34, 47],
	[18, 18, 18, 19, 21, 22, 25, 26, 28, 29, 31, 32, 33, 45, 47, 49],
	[18, 18, 19, 21, 22, 25, 26, 28, 29, 31, 32, 43, 45, 47, 49, 52],
	[18, 19, 20, 22, 25, 26, 28, 29, 31, 33, 43, 45, 47, 49, 52, 55],
	[18, 20, 22, 24, 26, 28, 29, 31, 40, 42, 45, 47, 49, 51, 55, 57],
	[19, 21, 24, 26, 27, 29, 31, 33, 42, 44, 46, 49, 51, 54, 57, 59],
	[21, 22, 25, 27, 29, 31, 32, 41, 43, 46, 48, 51, 54, 56, 59, 61],
	[22, 24, 26, 28, 30, 32, 40, 43, 45, 48, 50, 52, 56, 58, 61, 63],
	[24, 26, 28, 30, 31, 33, 42, 44, 47, 49, 52, 55, 58, 60, 63, 65],
	[25, 27, 29, 31, 33, 41, 43, 46, 48, 51, 55, 57, 60, 62, 65, 68],
	[26, 28, 30, 32, 34, 42, 45, 47, 50, 54, 56, 59, 62, 64, 67, 71],
	[27, 29, 31, 33, 41, 43, 46, 49, 52, 55, 58, 61, 64, 66, 70, 73],
	[28, 30, 32, 35, 42, 45, 48, 51, 54, 57, 60, 63, 66, 68, 72, 75],
	[29, 31, 34, 36, 43, 46, 49, 52, 56, 59, 62, 65, 68, 72, 74, 77],
	[30, 33, 35, 42, 45, 48, 51, 55, 58, 61, 64, 67, 71, 74, 76, 79],
	[31, 34, 36, 43, 46, 49, 52, 56, 59, 62, 65, 68, 72, 76, 79, 82]
];

//vrati
var doorInsectNet = [
	[44, 46, 48, 50, 54, 56, 58, 60, 62],
	[46, 48, 51, 54, 56, 58, 61, 63, 65],
	[48, 51, 54, 56, 59, 61, 63, 66, 68],
	[50, 54, 56, 59, 61, 64, 66, 70, 72],
	[54, 56, 59, 61, 64, 66, 70, 72, 75],
	[56, 58, 61, 64, 66, 70, 72, 75, 78],
	[58, 61, 63, 66, 70, 72, 75, 78, 81],
	[60, 63, 66, 70, 72, 75, 78, 93, 97],
	[62, 65, 68, 72, 75, 78, 81, 96, 101],
	[64, 67, 71, 74, 77, 80, 95, 100, 104],
	[67, 71, 74, 77, 80, 94, 98, 103, 107],
	[70, 73, 76, 79, 82, 96, 101, 106, 110],
	[72, 75, 78, 82, 95, 100, 104, 108, 113],
	[74, 77, 81, 85, 97, 102, 107, 111, 117],
	[76, 80, 83, 95, 101, 105, 110, 114, 120],
	[78, 82, 87, 98, 103, 108, 112, 118, 122],
	[81, 85, 89, 101, 106, 110, 116, 121, 125],
	[83, 88, 98, 103, 108, 113, 119, 123, 128],
	[86, 90, 101, 106, 111, 117, 121, 126, 132],
	[88, 92, 103, 108, 113, 119, 124, 129, 135],
	[90, 94, 106, 111, 117, 122, 127, 133, 138],
	[92, 103, 108, 113, 119, 124, 131, 136, 141]
];

//ramka 20/40
var insectNetInFrame = [
	[40, 44, 48, 52, 57, 62, 66, 71, 75, 79, 83, 88],
	[42, 46, 50, 55, 60, 64, 68, 73, 77, 81, 86, 91],
	[44, 48, 52, 57, 62, 66, 71, 75, 80, 85, 89, 93],
	[46, 50, 55, 60, 64, 68, 73, 78, 82, 87, 91, 96],
	[48, 52, 57, 62, 66, 71, 76, 80, 85, 90, 94, 98],
	[49, 55, 59, 64, 68, 73, 78, 82, 88, 92, 97, 102],
	[51, 57, 61, 66, 71, 76, 80, 86, 90, 95, 100, 105],
	[54, 59, 63, 68, 73, 78, 82, 88, 92, 97, 103, 107],
	[56, 60, 65, 71, 75, 80, 86, 90, 95, 100, 105, 110],
	[58, 62, 67, 73, 77, 82, 88, 93, 97, 103, 108, 112],
	[60, 64, 70, 75, 80, 85, 90, 95, 101, 105, 110, 116],
	[61, 66, 72, 77, 82, 88, 92, 97, 103, 108, 113, 118],
	[65, 71, 76, 82, 88, 93, 100, 105, 110, 116, 122, 127],
	[67, 73, 78, 85, 90, 95, 102, 107, 113, 119, 124, 131],
	[68, 75, 80, 87, 92, 98, 104, 109, 116, 121, 127, 133],
	[71, 77, 82, 89, 94, 101, 106, 112, 118, 124, 129, 136],
	[73, 79, 85, 91, 96, 103, 109, 114, 121, 126, 133, 138],
	[75, 81, 87, 93, 98, 105, 111, 117, 123, 129, 135, 141],
	[77, 83, 89, 95, 100, 107, 113, 119, 125, 131, 137, 143],
	[79, 85, 91, 97, 102, 109, 115, 121, 127, 133, 139, 145]
];

//vgraden vodach
var insectNetWithBuiltInDriver = [
	[50, 56, 60, 64, 68, 73, 78, 82, 87, 91, 95, 100],
	[55, 59, 63, 67, 73, 77, 81, 86, 91, 95, 100, 105],
	[58, 62, 66, 72, 76, 80, 86, 90, 95, 100, 104, 109],
	[61, 65, 71, 75, 80, 85, 89, 94, 98, 104, 108, 113],
	[64, 70, 74, 79, 83, 89, 93, 98, 103, 108, 112, 118],
	[67, 73, 77, 82, 88, 92, 97, 102, 107, 111, 117, 122],
	[72, 76, 81, 86, 91, 96, 101, 106, 111, 116, 121, 126],
	[75, 79, 85, 90, 95, 100, 105, 110, 116, 120, 125, 131],
	[78, 83, 89, 93, 98, 104, 109, 114, 119, 124, 129, 135],
	[81, 87, 92, 97, 103, 107, 112, 118, 123, 128, 134, 139],
	[85, 90, 95, 101, 106, 111, 117, 122, 127, 133, 138, 143],
	[88, 94, 100, 105, 110, 116, 121, 126, 132, 137, 142, 148],
	[93, 100, 105, 111, 117, 123, 128, 135, 140, 147, 152, 158],
	[96, 103, 109, 114, 121, 126, 133, 139, 144, 151, 156, 163],
	[101, 106, 112, 119, 124, 131, 137, 142, 149, 155, 161, 167],
	[104, 110, 116, 122, 128, 135, 140, 147, 153, 159, 165, 171],
	[107, 113, 120, 126, 132, 138, 144, 151, 157, 163, 169, 175],
	[110, 117, 123, 129, 136, 142, 149, 155, 161, 167, 173, 180],
	[113, 120, 126, 132, 139, 145, 152, 158, 164, 170, 176, 183],
	[116, 123, 129, 135, 142, 148, 155, 161, 167, 173, 179, 186]
];

//horizontalen
var insectNetHorizontal = [
	[49, 51, 52, 54, 56, 58, 59, 61, 63, 64, 66, 68, 70],
	[54, 56, 58, 60, 62, 63, 65, 67, 69, 71, 72, 74, 76],
	[60, 62, 64, 66, 68, 69, 71, 73, 75, 77, 79, 81, 82],
	[66, 68, 70, 72, 73, 75, 77, 79, 81, 83, 85, 87, 89],
	[71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95],
	[77, 79, 81, 83, 85, 87, 89, 91, 93, 96, 98, 100, 102],
	[83, 85, 87, 89, 91, 93, 95, 97, 100, 102, 104, 106, 108],
	[88, 90, 93, 95, 97, 99, 101, 104, 106, 108, 110, 112, 114],
	[94, 96, 98, 101, 103, 105, 107, 110, 112, 114, 116, 119, 121],
	[100, 102, 104, 107, 109, 111, 113, 116, 118, 120, 123, 125, 127],
	[105, 108, 110, 112, 115, 117, 119, 122, 124, 127, 129, 131, 134],
	[111, 113, 116, 118, 121, 123, 125, 128, 130, 133, 135, 138, 140],
	[116, 118, 122, 124, 127, 129, 131, 134, 136, 139, 141, 145, 147],
	[121, 123, 128, 130, 133, 135, 137, 140, 142, 145, 147, 152, 154],
	[126, 128, 134, 136, 139, 141, 143, 146, 148, 151, 153, 159, 161],
	[131, 133, 140, 142, 145, 147, 149, 152, 152, 157, 159, 166, 168],
	[136, 138, 146, 148, 151, 153, 155, 158, 158, 163, 165, 173, 175],
	[141, 143, 152, 154, 157, 159, 161, 164, 164, 169, 171, 180, 183],
	[146, 148, 158, 160, 163, 165, 167, 170, 172, 175, 177, 187, 190],
	[151, 153, 164, 166, 169, 171, 173, 176, 178, 181, 183, 194, 197]
];

//Receving Info from dropdown menu
function getColormrj(colormrj) {
	colorCodemrj = colormrj.selectedIndex;
}

function getModelmrj(modelmrj) {
	modelCodemrj = modelmrj.selectedIndex;
	var obj = document.getElementById('extrasChkmrj');

	// if (modelmrj.selectedIndex == 0) {
	// 	obj.style.visibility = "visible";
	// 	isVisible = true;
	// }
	// else {
	// 	obj.style.visibility = "hidden";
	// 	isVisible = false;
	// }
}

//Checking boundеries 
function CheckBoundoriesmrj(model, width, height) {
	var sqrtM = width * height / 10000;
	var isThereError = false;
	var errorMSG = "Зададените размери са извън позволената ширина/височина на продукта";

	if (sqrtM > 3.84) {
		alert("Зададените размери са извън позволената площ на продукта");
	}

	switch (model) {
		case 0:	//static 
			if (width < 15 || width > 180 || height < 15 || height > 220) {
				isThereError = true;
			} break;
		case 1:	//static with hinges
			if (width < 15 || width > 120 || height < 15 || height > 220) {
				isThereError = true;
			} break;
		case 2:	//roller in frame
			if (width < 30 || width > 150 || height < 30 || height > 240) {
				isThereError = true;
			} break;
		case 3:	 //roller in-built driver
			if (width < 30 || width > 150 || height < 30 || height > 240) {
				isThereError = true;
			} break;

		case 4:	 //roller horizontal
			if (width < 30 || width > 160 || height < 30 || height > 240) {
				isThereError = true;
			} break;
		case 5:	// vrata
			if (width < 40 || width > 100 || height < 40 || height > 240) {
				isThereError = true;
			} break;
	}

	if (isThereError) {
		alert(errorMSG);

	}
}

function ConvertInsectNetWidth(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	local = local - 4;

	if (local < 0) {
		local = 0;
	}

	return local;
}

function ConvertInsectNetHeigth(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	local = local - 5;

	if (local < 0) {
		local = 0;
	}

	return local;
}

function ConvertInsectNetPantiAndFix(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	local = local - 3;

	if (local < 0) {
		local = 0;
	}

	return local;
}

function ConvertInsectNetDoor(arg) {
	var local = Math.round(Math.ceil(arg) / 10);

	local = local - 4;

	if (local < 0) {
		local = 0;
	}

	return local;
}

//Calc the final price
function printFinalPricemrj() {
	var sizeWidth = document.getElementById("sunblindWidthmrj").value;
	var sizeHeight = document.getElementById("sunblindHeightmrj").value;
	var squareMeters;
	var pricePerSquareMeter = 0;
	var linearMeters = 0;
	var discount = 6;	//percent discount

	CheckBoundoriesmrj(modelCodemrj, sizeWidth, sizeHeight);

	squareMeters = sizeWidth * sizeHeight / 10000;
	if (squareMeters < 0.5) {
		squareMeters = 0.5;
	}

	if (modelCodemrj > 1 && modelCodemrj < 5) {

		convertedWidth = ConvertInsectNetWidth(sizeWidth);
		convertedHeight = ConvertInsectNetHeigth(sizeHeight);

		switch (modelCodemrj) {
			case 2:
				totalPrice = insectNetInFrame[convertedHeight][convertedWidth];
				break;
			case 3:
				totalPrice = insectNetWithBuiltInDriver[convertedHeight][convertedWidth];
				break;
			case 4:
				totalPrice = insectNetHorizontal[convertedHeight][convertedWidth];
				break;
		}

		if (modelCodemrj == 2 || modelCodemrj == 3 || modelCodemrj == 4) {
			if (colorCodemrj == 2 || colorCodemrj == 3) {
				totalPrice = totalPrice * 1.25;
			}

		}

		linearMeters += (sizeWidth / 100);
		linearMeters += (sizeHeight / 100);
		linearMeters = linearMeters * 2;

		if (modelCodemrj == 2 || modelCodemrj == 4) {
			totalPrice = totalPrice + (linearMeters * profile[colorCodemrj]);
		}

	}
	else if(modelCodemrj == 0 || modelCodemrj == 1){

		convertedWidth = ConvertInsectNetPantiAndFix(sizeWidth);
		convertedHeight = ConvertInsectNetPantiAndFix(sizeHeight);

		switch (modelCodemrj) {
			case 0:
				totalPrice = insectNetFix[convertedHeight][convertedWidth];
				break;
			case 1:
				totalPrice = insectNetWithPanti[convertedHeight][convertedWidth];
				break;
		}

		if (colorCodemrj == 2) {
			if (modelCodemrj === 0){
				totalPrice = totalPrice * 1.1;
			}
			else{
				totalPrice = totalPrice * 1.3;
			}
		}
		else if (colorCodemrj == 3) {
			totalPrice = totalPrice * 1.3;
		}
	}
	else if(modelCodemrj == 5 ){

		convertedWidth = ConvertInsectNetDoor(sizeWidth);
		convertedHeight = ConvertInsectNetDoor(sizeHeight);

		totalPrice = doorInsectNet[convertedHeight][convertedWidth];

		if (colorCodemrj == 2 || colorCodemrj == 3) {
			totalPrice = totalPrice * 1.1;
		}

	}
	totalPrice -= totalPrice * (discount / 100);

	document.getElementById("finalPricemrj").innerHTML = totalPrice.toFixed(2) + " лв.";
	totalPrice = 0;
	return false;
}

//////////////////////////
//   mreji - end        //
//////////////////////////

////////////////////////////////////
//   vrati harmonica - start      //
////////////////////////////////////

//wooden MODELS ---------------------------
var modelsvrt = new Array("Стандарт");
var colorsvrt = ["N118", "N124", "L100", "L123", "L124", "L129", "L134", "L136", "L140", "L150"];
var harmonicaDoorsTable = [
	[118, 219, 318, 418],//N colors
	[143, 268, 394, 519],//N colors
	[162, 306, 448, 594],//L colors
	[197, 377, 558, 738] //L colors
];
var colorCodevrt = 0;	//default color
var modelCodevrt = 0; // default model
var totalPrice = 0;


function getColorvrt(colorvrt) {
	colorCodevrt = colorvrt.selectedIndex;	//models are the rows in  horizontalTable
}

function checkBoundoriesvrt(width, height) {
	var errorMSG = "Зададените размери са извън позволената площ на продукта";
	var sqrtMeters = width * height / 10000;

	if (width < 40 || width > 360 || height < 30 || height > 253) {
		alert(errorMSG);
	}
	console.log(sqrtMeters);

	if (sqrtMeters > 9) {
		alert(errorMSG);
	}
}

function printFinalPricevrt() {
	var sizeWidth = document.getElementById("sunblindWidthvrt").value;
	var sizeHeight = document.getElementById("sunblindHeightvrt").value;
	var tableRow;
	var tableCol;
	var discount = 6;	//precent discount
	var brava = document.getElementById("bravavrt").checked;

	checkBoundoriesvrt(sizeWidth, sizeHeight);

	if (colorCodevrt == 0 || colorCodevrt == 1) {
		if (sizeHeight > 0 && sizeHeight <= 200) {
			tableRow = 0;
		}
		else if (sizeHeight > 200 && sizeHeight <= 253) {
			tableRow = 1
		}
	}
	else {

		if (sizeHeight > 0 && sizeHeight <= 200) {
			tableRow = 2;
		}
		else if (sizeHeight > 200 && sizeHeight <= 253) {
			tableRow = 3
		}
	}

	if (sizeWidth > 0 && sizeWidth <= 90) {
		tableCol = 0
	}

	else if (sizeWidth > 90 && sizeWidth <= 180) {
		tableCol = 1
	}

	else if (sizeWidth > 180 && sizeWidth <= 270) {
		tableCol = 2
	}

	else if (sizeWidth > 270 && sizeWidth <= 360) {
		tableCol = 3
	}
	totalPrice = harmonicaDoorsTable[tableRow][tableCol];

	if (brava == 1) {
		totalPrice += 19.90;
	}

	totalPrice -= totalPrice * (discount / 100);

	if (totalPrice == 0) {
		totalPrice = "Неподдържан цвят за този модел";
		document.getElementById("finalPricevrt").innerHTML = totalPrice;
	}
	else {
		document.getElementById("finalPricevrt").innerHTML = totalPrice.toFixed(2) + " лв.";
	}
	totalPrice = 0;
	return false;
}

////////////////////////////////////
//   vrati harmonica - end        //
////////////////////////////////////






function printOption(option) {
	for (var i = 0; i < option.length; i++) {
		document.write("<option value=" + 'option[i]' + ">" + option[i] + "</option>");
	}
}



















