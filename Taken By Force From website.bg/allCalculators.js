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
	18, 	                                                       // price 1 - 1
	7, 27, 58, 62, 63, 144, 302, 315, 24, 570, 378, 698, 700, 705, 707, 711, 712, 713, 714, 715, 872, 866, 716, 717, 266, 279, 1037, 103, 718, 870, 814, // price 2 - 31
	1000, 027, 738, 695, 441, 436, 241, 330, "1PR", "285PR", "58PR", // price 3 - 42
	780, 781, 8204, 8300, 754, 755,                               // price 4 - 48
	991, 992, 993, 994, 995, 996, 997, 998,                       // price 5 - 56
	101, 102, 121, 107, 311, 371,                                 // price 6 - 62
	"0150", 4459, 7010, 7113,                                     // price 7 - 66
	7327, 7332, 7333, 7346, 7418, 8595,                           // price 8 - 72
	"0150P", "4459P", "7010P"                                     // price 9 - 75
);

var CoeficientHorizontal = [
	[1.00, 1.07, 1.35, 1.60, 1.80, 1.30, 1.60, 2.50, 2.50],	// Pred Styklo
	[1.10, 1.20, 1.45, 1.70, 1.90, 1.40, 1.70, 2.60, 2.60],	// BlackOut
	[1.00, 1.07, 1.35, 1.60, 1.80, 1.30, 1.60, 2.50, 2.50],	// Mejdu Styklo
	[1.00, 1.10, 1.25, 1.50, 1.60, 1.20, 1.50, 2.20, 2.20],	// Maxi Standart
	[1.10, 1.20, 1.35, 1.60, 1.70, 1.30, 1.60, 2.30, 2.30],	// Maxi BlackOut
	[1.40, 1.45, 1.50, 1.70, 1.75, 1.45, 1.70, 2.40, 2.40],   // Maxi Lux
	[0.00, 0.00, 0.00, 0.00, 1.00, 1.20, 1.25, 1.60, 1.60],	// UltiMate
	[0.00, 0.00, 0.00, 0.00, 1.15, 1.35, 1.40, 1.75, 1.75],   // MegaView
	[0.00, 0.00, 0.00, 0.00, 1.65, 1.85, 1.90, 2.25, 2.25]    // VarioFlex
];

var predStykloTable = [
	[11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 14, 14, 15, 16, 16, 17, 18, 18, 19, 20, 20, 21, 21, 22, 23, 24],
	[11, 11, 11, 11, 11, 11, 11, 11, 12, 13, 14, 14, 16, 17, 17, 18, 19, 20, 21, 21, 22, 23, 24, 24, 25, 26, 27, 28],
	[11, 11, 11, 11, 11, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 24, 25, 26, 27, 28, 29, 30, 31, 33],
	[11, 11, 11, 11, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37],
	[11, 11, 11, 11, 12, 13, 15, 16, 17, 18, 19, 21, 22, 24, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 37, 38, 39, 41],
	[11, 11, 11, 11, 13, 15, 16, 17, 18, 20, 21, 23, 25, 26, 27, 29, 30, 31, 33, 34, 35, 37, 38, 39, 40, 42, 43, 45],
	[11, 11, 11, 12, 14, 16, 17, 19, 20, 21, 23, 25, 27, 28, 30, 31, 33, 34, 36, 37, 38, 40, 41, 43, 44, 46, 47, 50],
	[11, 11, 11, 13, 15, 17, 18, 20, 22, 23, 25, 27, 29, 31, 32, 34, 35, 37, 39, 40, 42, 43, 45, 47, 48, 50, 51, 54],
	[11, 11, 12, 14, 16, 18, 20, 22, 23, 25, 27, 29, 31, 33, 35, 36, 38, 40, 42, 43, 45, 47, 48, 50, 52, 54, 55, 58],
	[11, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 46, 48, 50, 52, 54, 56, 58, 59, 62],
	[11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 31, 33, 35, 37, 39, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 67],
	[11, 12, 14, 17, 19, 22, 24, 26, 28, 30, 32, 35, 38, 40, 42, 44, 46, 48, 51, 53, 55, 57, 59, 61, 63, 65, 68, 71],
	[11, 13, 15, 17, 20, 23, 25, 27, 30, 32, 34, 37, 40, 42, 44, 47, 49, 51, 53, 56, 58, 60, 63, 65, 67, 69, 72, 75],
	[11, 13, 16, 18, 21, 24, 26, 29, 31, 34, 36, 39, 42, 44, 47, 49, 52, 54, 56, 59, 61, 64, 66, 69, 71, 73, 76, 79],
	[12, 14, 17, 19, 22, 25, 28, 30, 33, 35, 38, 41, 44, 47, 49, 52, 54, 57, 59, 62, 65, 67, 70, 72, 75, 77, 80, 84],
	[12, 15, 17, 20, 23, 26, 29, 32, 34, 37, 40, 43, 46, 49, 52, 54, 57, 60, 62, 65, 68, 71, 73, 76, 79, 81, 84, 88],
	[13, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 49, 51, 54, 57, 60, 63, 65, 68, 71, 74, 77, 80, 82, 85, 88, 92],
	[13, 16, 19, 22, 25, 29, 32, 35, 38, 40, 44, 47, 51, 54, 57, 60, 63, 65, 68, 71, 74, 77, 80, 83, 86, 89, 92, 96],
	[13, 17, 20, 23, 26, 30, 33, 36, 39, 42, 46, 49, 53, 56, 59, 62, 65, 68, 71, 75, 78, 81, 84, 87, 90, 93, 96, 101],
	[14, 17, 20, 24, 27, 31, 34, 37, 41, 44, 47, 51, 55, 58, 62, 65, 68, 71, 74, 78, 81, 84, 87, 91, 94, 97, 0, 0],
	[14, 18, 21, 24, 28, 32, 36, 39, 42, 46, 49, 53, 57, 61, 64, 67, 71, 74, 77, 81, 84, 88, 91, 94, 98, 0, 0, 0],
	[15, 18, 22, 25, 29, 33, 37, 40, 44, 47, 51, 55, 59, 63, 66, 70, 73, 77, 80, 84, 87, 91, 94, 98, 0, 0, 0, 0],
	[15, 19, 23, 26, 30, 35, 38, 42, 45, 49, 53, 57, 62, 65, 69, 72, 76, 80, 83, 87, 91, 94, 98, 0, 0, 0, 0, 0],
	[16, 20, 23, 27, 31, 36, 40, 43, 47, 51, 55, 59, 64, 68, 71, 75, 79, 83, 86, 90, 94, 98, 0, 0, 0, 0, 0, 0],
	[16, 20, 24, 28, 32, 37, 41, 45, 49, 53, 57, 61, 66, 70, 74, 78, 82, 85, 89, 93, 97, 0, 0, 0, 0, 0, 0, 0],
	[17, 21, 25, 29, 33, 38, 42, 46, 50, 54, 59, 63, 68, 72, 76, 80, 84, 88, 92, 96, 0, 0, 0, 0, 0, 0, 0, 0],
	[17, 21, 26, 30, 34, 39, 43, 48, 52, 56, 61, 65, 70, 74, 79, 83, 87, 91, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[18, 22, 26, 31, 35, 40, 45, 49, 53, 58, 62, 67, 72, 77, 81, 85, 90, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[18, 23, 27, 32, 36, 42, 46, 51, 55, 59, 64, 69, 75, 79, 84, 88, 92, 97, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	
	var maxiTable = [
	[13, 13, 13, 13, 13, 13, 13, 13, 14, 15, 15, 16, 17, 18, 19, 20, 21, 22, 23, 23, 24, 25, 26, 27, 28, 28, 29, 30],
	[13, 13, 13, 13, 13, 13, 14, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
	[13, 13, 13, 13, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 40],
	[13, 13, 13, 13, 13, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 28, 30, 31, 32, 33, 35, 36, 37, 39, 40, 41, 42, 44],
	[13, 13, 13, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 32, 34, 35, 37, 38, 40, 41, 42, 44, 45, 47, 49],
	[13, 13, 13, 14, 16, 18, 19, 21, 22, 24, 26, 27, 29, 31, 32, 34, 35, 37, 39, 40, 42, 43, 45, 46, 48, 50, 51, 53],
	[13, 13, 13, 15, 17, 19, 21, 22, 24, 26, 28, 29, 31, 33, 35, 37, 38, 40, 42, 43, 45, 47, 49, 50, 52, 54, 55, 58],
	[13, 13, 14, 16, 18, 20, 22, 24, 26, 28, 30, 31, 34, 36, 38, 39, 41, 43, 45, 47, 49, 51, 52, 54, 56, 58, 60, 62],
	[13, 13, 15, 17, 19, 21, 23, 25, 27, 29, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 67],
	[13, 14, 16, 18, 20, 23, 25, 27, 29, 31, 34, 36, 38, 41, 43, 45, 47, 49, 51, 54, 56, 58, 60, 62, 64, 66, 69, 71],
	[13, 14, 17, 19, 21, 24, 26, 28, 31, 33, 36, 38, 41, 43, 45, 48, 50, 52, 55, 57, 59, 62, 64, 66, 68, 71, 73, 76],
	[13, 15, 17, 20, 22, 25, 28, 30, 32, 35, 38, 40, 43, 46, 48, 50, 53, 55, 58, 60, 63, 65, 68, 70, 73, 75, 77, 81],
	[13, 16, 18, 21, 23, 26, 29, 32, 34, 37, 40, 42, 45, 48, 51, 53, 56, 58, 61, 64, 66, 69, 71, 74, 77, 79, 82, 85],
	[13, 16, 19, 22, 24, 28, 30, 33, 36, 39, 42, 44, 48, 51, 53, 56, 59, 61, 64, 67, 70, 72, 75, 78, 81, 83, 86, 90],
	[14, 17, 20, 23, 25, 29, 32, 35, 38, 40, 44, 46, 50, 53, 56, 59, 62, 65, 67, 70, 73, 76, 79, 82, 85, 88, 91, 94],
	[14, 17, 21, 24, 27, 30, 33, 36, 39, 42, 46, 49, 52, 55, 59, 62, 65, 68, 71, 74, 77, 80, 83, 86, 89, 92, 95, 99],
	[15, 18, 21, 24, 28, 31, 35, 38, 41, 44, 48, 51, 55, 58, 61, 64, 68, 71, 74, 77, 80, 83, 87, 90, 93, 96, 99, 103],
	[15, 19, 22, 25, 29, 33, 36, 39, 43, 46, 50, 53, 57, 60, 64, 67, 70, 74, 77, 80, 84, 87, 90, 94, 97, 100, 104, 108],
	[16, 19, 23, 26, 30, 34, 37, 41, 44, 48, 52, 55, 59, 63, 66, 70, 73, 77, 80, 84, 87, 91, 94, 98, 101, 105, 108, 113],
	[16, 20, 24, 27, 31, 35, 39, 43, 46, 50, 54, 57, 62, 65, 69, 73, 76, 80, 84, 87, 91, 94, 98, 102, 105, 109, 0, 0],
	[17, 21, 25, 28, 32, 37, 40, 44, 48, 52, 56, 59, 64, 68, 72, 75, 79, 83, 87, 90, 94, 98, 102, 106, 109, 0, 0, 0],
	[17, 21, 25, 29, 33, 38, 42, 46, 50, 53, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94, 98, 102, 106, 110, 0, 0, 0, 0],
	[18, 22, 26, 30, 34, 39, 43, 47, 51, 55, 60, 64, 69, 73, 77, 81, 85, 89, 93, 97, 101, 105, 109, 0, 0, 0, 0, 0],
	[19, 23, 27, 31, 35, 40, 45, 49, 53, 57, 62, 66, 71, 75, 80, 84, 88, 92, 96, 101, 105, 109, 0, 0, 0, 0, 0, 0],
	[19, 23, 28, 32, 36, 42, 46, 50, 55, 59, 64, 68, 73, 78, 82, 86, 91, 95, 100, 104, 108, 0, 0, 0, 0, 0, 0, 0],
	[20, 24, 29, 33, 37, 43, 47, 52, 56, 61, 66, 70, 76, 80, 85, 89, 94, 98, 103, 107, 0, 0, 0, 0, 0, 0, 0, 0],
	[20, 25, 29, 34, 39, 44, 49, 53, 58, 63, 68, 72, 78, 83, 87, 92, 97, 101, 106, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[21, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 74, 80, 85, 90, 95, 100, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[21, 26, 31, 36, 41, 47, 52, 57, 61, 66, 72, 77, 83, 88, 93, 98, 103, 107, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	
	var megaViewTable = [
	[22, 22, 22, 23, 25, 29, 31, 32, 34, 36, 38, 40, 45, 46, 48, 50, 51, 53, 55, 57, 58, 60, 62, 63, 65, 67, 69, 74],
	[22, 22, 23, 25, 26, 31, 33, 35, 37, 39, 41, 43, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 67, 69, 71, 73, 75, 81],
	[22, 22, 24, 26, 28, 33, 35, 37, 39, 41, 44, 46, 52, 54, 56, 58, 60, 63, 65, 67, 69, 71, 73, 75, 77, 80, 82, 88],
	[22, 23, 25, 28, 30, 35, 37, 40, 42, 44, 47, 50, 55, 58, 60, 62, 65, 67, 70, 72, 74, 77, 79, 81, 84, 86, 88, 95],
	[22, 24, 26, 29, 31, 37, 39, 42, 44, 47, 50, 53, 59, 62, 64, 67, 69, 72, 74, 77, 80, 82, 85, 87, 90, 92, 95, 102],
	[22, 25, 28, 30, 33, 39, 42, 44, 47, 50, 53, 56, 63, 65, 68, 71, 74, 77, 79, 82, 85, 88, 91, 93, 96, 99, 102, 109],
	[23, 26, 29, 32, 35, 41, 44, 47, 50, 53, 56, 59, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 116],
	[24, 27, 30, 33, 37, 43, 46, 49, 52, 55, 60, 63, 70, 73, 76, 79, 83, 86, 89, 92, 96, 99, 102, 105, 108, 112, 115, 123],
	[25, 28, 31, 35, 38, 45, 48, 51, 55, 58, 63, 66, 73, 77, 80, 84, 87, 91, 94, 97, 101, 104, 108, 111, 115, 118, 122, 129],
	[26, 29, 33, 36, 40, 47, 50, 54, 57, 61, 66, 69, 77, 81, 84, 88, 92, 95, 99, 103, 106, 110, 114, 117, 121, 125, 128, 136],
	[26, 30, 34, 38, 42, 49, 52, 56, 60, 64, 69, 73, 81, 84, 88, 92, 96, 100, 104, 108, 112, 115, 119, 123, 127, 131, 135, 143],
	[27, 31, 35, 39, 43, 51, 55, 59, 63, 67, 72, 76, 84, 88, 92, 96, 101, 105, 109, 113, 117, 121, 125, 129, 133, 137, 141, 150],
	[28, 32, 36, 41, 45, 52, 57, 61, 65, 69, 75, 79, 88, 92, 96, 101, 105, 109, 114, 118, 122, 127, 131, 135, 139, 144, 148, 157],
	[29, 33, 38, 42, 47, 54, 59, 63, 68, 72, 78, 83, 91, 96, 100, 105, 109, 114, 119, 123, 128, 132, 137, 141, 146, 150, 155, 164],
	[30, 34, 39, 44, 48, 56, 61, 66, 70, 75, 81, 86, 95, 100, 104, 109, 114, 119, 123, 128, 133, 138, 142, 147, 152, 157, 161, 171],
	[30, 35, 40, 45, 50, 58, 63, 68, 73, 78, 84, 89, 99, 104, 108, 113, 118, 123, 128, 133, 138, 143, 148, 153, 158, 163, 168, 178],
	[31, 36, 42, 47, 52, 60, 65, 70, 76, 81, 87, 93, 102, 107, 112, 118, 123, 128, 133, 138, 144, 149, 154, 159, 164, 169, 175, 185],
	[32, 37, 43, 48, 53, 62, 67, 73, 78, 83, 90, 96, 106, 111, 117, 122, 127, 133, 138, 143, 149, 154, 160, 165, 170, 176, 181, 192],
	[33, 38, 44, 50, 55, 64, 70, 75, 81, 86, 94, 99, 109, 115, 121, 126, 132, 137, 143, 149, 154, 160, 165, 171, 177, 182, 188, 199],
	[34, 40, 45, 51, 57, 66, 72, 78, 83, 89, 97, 102, 113, 119, 125, 130, 136, 142, 148, 154, 160, 165, 171, 177, 183, 189, 0, 0],
	[35, 41, 47, 53, 58, 68, 74, 80, 86, 92, 100, 106, 117, 123, 129, 135, 141, 147, 153, 159, 165, 171, 177, 183, 189, 0, 0, 0],
	[35, 42, 48, 54, 60, 70, 76, 82, 88, 95, 103, 109, 120, 126, 133, 139, 145, 151, 158, 164, 170, 176, 183, 189, 0, 0, 0, 0],
	[36, 43, 49, 55, 62, 72, 78, 85, 91, 97, 106, 112, 124, 130, 137, 143, 150, 156, 163, 169, 176, 182, 189, 0, 0, 0, 0, 0],
	[37, 44, 50, 57, 64, 74, 80, 87, 94, 100, 109, 116, 127, 134, 141, 147, 154, 161, 167, 174, 181, 188, 0, 0, 0, 0, 0, 0],
	[38, 45, 52, 58, 65, 76, 83, 89, 96, 103, 112, 119, 131, 138, 145, 152, 159, 165, 172, 179, 186, 0, 0, 0, 0, 0, 0, 0],
	[39, 46, 53, 60, 67, 78, 85, 92, 99, 106, 115, 122, 134, 142, 149, 156, 163, 170, 177, 184, 0, 0, 0, 0, 0, 0, 0, 0],
	[39, 47, 54, 61, 69, 80, 87, 94, 101, 109, 118, 126, 138, 145, 153, 160, 167, 175, 182, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[40, 48, 55, 63, 70, 82, 89, 97, 104, 112, 121, 129, 142, 149, 157, 164, 172, 179, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[41, 49, 57, 64, 72, 83, 91, 99, 107, 114, 124, 132, 145, 153, 161, 169, 176, 184, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
		totalPrice = totalPrice + 4.9;
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

var verticalTable = [[8.7, 9.3, 10.6, 10.6, 10.9, 11.3, 11.3, 11.5, 11.5, 11.5, 12.5, 17.7, 20.9, 21.9, 24.3, 24.90, 27.3, 27.3, 30.5, 31.9, 34.9, 36.5, 40.9, 40.9, 40.9, 41.9, 41.9, 47.9, 49.5, 50.9, 51.9, 56.9, 59.9],	// 89mm
[8.7, 9.3, 10.9, 10.9, 11.5, 11.9, 11.9, 13.9, 13.9, 13.9, 16.9, 32.9, 36.5, 41.9, 47.9],	//127mm
[46.9, 47.9, 47.9, 47.9, 47.9, 47.9, 71.5, 74.5, 74.5, 74.5, 74.5, 74.5]	//AL
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
	totalPrice = totalPrice + (20.90 * sizeWidth / 100);
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
	[47, 52, 59, 66, 72, 78, 84, 90, 98, 103, 111, 116, 121, 129, 138, 142, 148, 155, 162],
[47, 54, 59, 66, 73, 85, 90, 98, 106, 112, 116, 123, 131, 138, 143, 150, 158, 164, 169],
[54, 59, 66, 73, 80, 85, 92, 106, 112, 117, 125, 131, 139, 144, 158, 165, 170, 175, 185],
[54, 60, 66, 80, 86, 92, 100, 112, 117, 125, 133, 140, 151, 159, 166, 177, 186, 193, 197],
[54, 66, 73, 80, 86, 100, 107, 113, 125, 133, 140, 151, 159, 166, 179, 186, 193, 198, 212],
[60, 67, 74, 86, 94, 101, 113, 119, 127, 141, 147, 152, 167, 172, 187, 194, 199, 212, 220],
[60, 67, 80, 86, 96, 108, 114, 127, 134, 147, 155, 162, 172, 180, 195, 200, 213, 221, 235],
[60, 74, 81, 94, 101, 114, 120, 134, 142, 155, 162, 173, 183, 195, 200, 215, 223, 235, 241],
[61, 74, 81, 96, 102, 114, 128, 137, 148, 157, 168, 175, 191, 201, 210, 223, 231, 242, 250],
[67, 74, 87, 96, 110, 120, 129, 142, 157, 164, 175, 185, 197, 210, 218, 231, 245, 251, 263],
[67, 81, 87, 102, 115, 128, 138, 148, 158, 169, 185, 197, 204, 219, 231, 239, 251, 265, 273],
[69, 81, 96, 110, 115, 129, 143, 157, 165, 177, 192, 204, 219, 225, 239, 252, 265, 274, 288],
[69, 83, 97, 110, 121, 138, 143, 158, 170, 186, 198, 205, 220, 234, 248, 260, 274, 281, 294],
[75, 87, 97, 111, 123, 139, 150, 165, 177, 193, 205, 212, 234, 240, 253, 268, 281, 295, 308],
[75, 88, 103, 116, 131, 144, 158, 170, 186, 198, 212, 221, 240, 253, 268, 281, 295, 302, 317],
[75, 88, 103, 116, 131, 144, 159, 171, 187, 199, 213, 227, 249, 262, 269, 290, 303, 312, 324],
[83, 97, 111, 123, 139, 151, 166, 179, 194, 206, 221, 236, 254, 269, 282, 296, 312, 324, 339],
[83, 97, 111, 123, 140, 159, 171, 187, 200, 215, 228, 242, 262, 278, 291, 304, 319, 340, 354],
[83, 98, 112, 131, 144, 161, 172, 194, 208, 223, 236, 250, 270, 285, 297, 315, 332, 346, 0],
[84, 103, 116, 133, 145, 167, 180, 195, 208, 228, 242, 256, 278, 293, 305, 327, 342, 356, 0],
[88, 106, 117, 140, 152, 172, 189, 200, 218, 236, 251, 265, 287, 299, 321, 333, 348, 0, 0],
[88, 106, 117, 140, 152, 172, 191, 201, 224, 238, 256, 273, 288, 307, 322, 343, 0, 0, 0]
];

var pliseTable20 = [
	[60, 72, 78, 84, 97, 102, 108, 119, 126, 133, 138, 150, 157, 167, 172, 179, 192, 197, 204],
[66, 73, 78, 89, 98, 108, 114, 119, 127, 139, 143, 151, 164, 168, 180, 186, 197, 205, 210],
[66, 73, 85, 89, 102, 110, 120, 127, 134, 144, 151, 164, 169, 182, 187, 198, 205, 211, 223],
[67, 78, 85, 98, 103, 114, 127, 134, 140, 152, 164, 169, 182, 189, 198, 211, 219, 231, 236],
[73, 80, 90, 98, 110, 120, 128, 140, 144, 158, 169, 177, 189, 199, 208, 219, 231, 237, 249],
[73, 85, 90, 103, 111, 123, 135, 140, 152, 165, 170, 183, 195, 200, 213, 225, 238, 242, 254],
[73, 85, 98, 103, 115, 128, 140, 145, 159, 170, 178, 191, 200, 213, 221, 234, 245, 256, 264],
[80, 86, 99, 111, 123, 135, 141, 153, 166, 178, 191, 196, 209, 221, 234, 245, 256, 264, 275],
[80, 90, 99, 111, 123, 135, 145, 161, 166, 185, 192, 204, 215, 226, 239, 251, 264, 269, 281],
[80, 90, 106, 116, 129, 141, 153, 161, 171, 185, 197, 210, 222, 235, 247, 260, 270, 285, 295],
[80, 92, 106, 116, 129, 147, 155, 167, 179, 192, 205, 218, 235, 240, 252, 270, 285, 291, 302],
[86, 99, 111, 125, 137, 147, 161, 172, 186, 197, 210, 223, 240, 253, 266, 278, 291, 303, 317],
[86, 99, 112, 125, 137, 155, 167, 179, 193, 205, 218, 231, 241, 262, 273, 287, 296, 312, 322],
[86, 100, 112, 131, 142, 155, 168, 186, 198, 211, 223, 237, 253, 267, 279, 292, 312, 322, 335],
[92, 106, 116, 131, 150, 162, 172, 187, 205, 219, 231, 242, 262, 274, 288, 304, 318, 330, 344],
[92, 106, 117, 137, 150, 168, 180, 193, 206, 224, 237, 250, 267, 280, 293, 313, 323, 339, 354],
[92, 107, 125, 138, 157, 168, 182, 198, 212, 232, 242, 254, 274, 289, 299, 319, 339, 349, 362],
[92, 112, 126, 142, 157, 173, 187, 206, 220, 237, 250, 263, 280, 299, 315, 330, 345, 356, 375],
[100, 112, 126, 143, 164, 173, 194, 208, 220, 238, 256, 268, 289, 301, 320, 340, 350, 371, 0],
[100, 112, 131, 150, 164, 182, 199, 212, 225, 245, 264, 275, 294, 315, 326, 346, 364, 376, 0],
[100, 117, 133, 151, 169, 189, 199, 220, 234, 251, 269, 281, 301, 320, 332, 357, 372, 0, 0],
[100, 117, 138, 151, 169, 189, 208, 221, 239, 260, 269, 290, 307, 321, 342, 358, 0, 0, 0]
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



var stillTable =
	[
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

var maxiStilTable =
	[
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
		totalPrice += 16;
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
		[65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 68, 72, 76, 80, 84, 88, 92, 96],
[65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 69, 74, 80, 85, 90, 96, 101, 106, 112, 117, 122, 128],
[65, 65, 65, 65, 65, 65, 65, 67, 73, 80, 86, 93, 100, 106, 113, 120, 126, 133, 140, 146, 153, 160],
[65, 65, 65, 65, 65, 65, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192],
[65, 65, 65, 65, 65, 74, 84, 93, 102, 112, 121, 130, 140, 149, 158, 168, 177, 186, 196, 205, 214, 223],
[65, 65, 65, 65, 74, 85, 96, 106, 117, 128, 138, 149, 160, 170, 181, 192, 202, 213, 223, 234, 245, 255],
[65, 65, 65, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 203, 215, 227, 239, 251, 263, 275, 287],
[65, 65, 67, 80, 93, 106, 120, 133, 146, 160, 173, 186, 200, 213, 226, 239, 253, 266, 279, 293, 306, 319],
[65, 65, 73, 88, 102, 117, 132, 146, 161, 176, 190, 205, 219, 234, 249, 263, 278, 293, 307, 322, 336, 351],
[65, 65, 80, 96, 112, 128, 144, 160, 176, 192, 207, 223, 239, 255, 271, 287, 303, 319, 335, 351, 367, 383],
[65, 69, 86, 104, 121, 138, 156, 173, 190, 207, 225, 242, 259, 277, 294, 311, 329, 346, 363, 380, 398, 415],
[65, 74, 93, 112, 130, 149, 168, 186, 205, 223, 242, 261, 279, 298, 317, 335, 354, 372, 391, 410, 428, 447],
[65, 80, 100, 120, 140, 160, 180, 200, 219, 239, 259, 279, 299, 319, 339, 359, 379, 399, 419, 439, 459, 479],
[65, 85, 106, 128, 149, 170, 192, 213, 234, 255, 277, 298, 319, 340, 362, 383, 404, 426, 447, 468, 489, 511],
[68, 90, 113, 136, 158, 181, 203, 226, 249, 271, 294, 317, 339, 362, 384, 407, 430, 452, 475, 497, 520, 0],
[72, 96, 120, 144, 168, 192, 215, 239, 263, 287, 311, 335, 359, 383, 407, 431, 455, 479, 503, 527, 0, 0],
[76, 101, 126, 152, 177, 202, 227, 253, 278, 303, 329, 354, 379, 404, 430, 455, 480, 505, 531, 0, 0, 0],
[80, 106, 133, 160, 186, 213, 239, 266, 293, 319, 346, 372, 399, 426, 452, 479, 505, 532, 0, 0, 0, 0],
[84, 112, 140, 168, 196, 223, 251, 279, 307, 335, 363, 391, 419, 447, 475, 503, 531, 0, 0, 0, 0, 0],
[88, 117, 146, 176, 205, 234, 263, 293, 322, 351, 380, 410, 439, 468, 497, 527, 0, 0, 0, 0, 0, 0],
[92, 122, 153, 184, 214, 245, 275, 306, 336, 367, 398, 428, 459, 489, 520, 0, 0, 0, 0, 0, 0, 0],
[96, 128, 160, 192, 223, 255, 287, 319, 351, 383, 415, 447, 479, 511, 0, 0, 0, 0, 0, 0, 0, 0],
[100, 133, 166, 200, 233, 266, 299, 333, 366, 399, 432, 466, 499, 532, 0, 0, 0, 0, 0, 0, 0, 0],
[104, 138, 173, 207, 242, 277, 311, 346, 380, 415, 450, 484, 519, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[108, 144, 180, 215, 251, 287, 323, 359, 395, 431, 467, 503, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[112, 149, 186, 223, 261, 298, 335, 372, 410, 447, 484, 521, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[116, 154, 193, 231, 270, 309, 347, 386, 424, 463, 501, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[120, 160, 200, 239, 279, 319, 359, 399, 439, 479, 519, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
		totalPrice *= 1.17;
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
	[74, 80, 87, 93, 100, 106, 113, 119, 126, 134, 141, 147, 153, 160, 166, 173, 181, 188, 194, 201, 207, 214, 220, 228, 235, 241],
[79, 86, 93, 100, 107, 114, 121, 128, 136, 144, 152, 159, 166, 173, 180, 187, 196, 203, 210, 217, 224, 232, 239, 248, 255, 262],
[84, 91, 99, 107, 115, 122, 130, 138, 145, 155, 163, 170, 178, 186, 194, 201, 211, 219, 226, 234, 242, 249, 257, 267, 274, 282],
[89, 97, 105, 114, 122, 130, 139, 147, 155, 165, 174, 182, 190, 199, 207, 215, 226, 234, 242, 251, 259, 267, 276, 286, 294, 302],
[94, 102, 111, 120, 129, 138, 147, 156, 165, 176, 185, 194, 203, 212, 221, 230, 240, 249, 258, 267, 276, 285, 294, 305, 314, 323],
[98, 108, 118, 127, 137, 146, 156, 166, 175, 186, 196, 206, 215, 225, 234, 244, 255, 265, 274, 284, 294, 303, 313, 324, 334, 343],
[103, 114, 124, 134, 144, 154, 165, 175, 185, 197, 207, 217, 228, 238, 248, 258, 270, 280, 290, 301, 311, 321, 331, 343, 353, 364],
[108, 119, 130, 141, 152, 162, 173, 184, 195, 207, 218, 229, 240, 251, 262, 272, 285, 296, 307, 317, 328, 339, 350, 362, 373, 384],
[113, 125, 136, 148, 159, 170, 182, 193, 205, 218, 229, 241, 252, 264, 275, 286, 300, 311, 323, 334, 345, 357, 368, 382, 393, 404],
[124, 137, 150, 162, 175, 187, 200, 213, 225, 240, 252, 265, 278, 290, 303, 316, 330, 343, 355, 368, 381, 393, 406, 420, 433, 446],
[129, 142, 156, 169, 182, 195, 209, 222, 235, 250, 264, 277, 290, 303, 317, 330, 345, 358, 371, 385, 398, 411, 424, 439, 453, 466],
[134, 148, 162, 176, 190, 204, 217, 231, 245, 261, 275, 289, 302, 316, 330, 344, 360, 374, 387, 401, 415, 429, 443, 459, 472, 486],
[139, 154, 168, 183, 197, 212, 226, 241, 255, 271, 286, 300, 315, 329, 344, 358, 375, 389, 404, 418, 432, 447, 461, 478, 492, 507],
[144, 159, 174, 189, 204, 220, 235, 250, 265, 282, 297, 312, 327, 342, 357, 372, 389, 404, 420, 435, 450, 465, 480, 497, 512, 527],
[149, 165, 180, 196, 212, 228, 243, 259, 275, 292, 308, 324, 339, 355, 371, 387, 404, 420, 436, 451, 467, 483, 498, 516, 532, 547],
[154, 170, 187, 203, 219, 236, 252, 268, 285, 303, 319, 335, 352, 368, 384, 401, 419, 435, 452, 468, 484, 501, 517, 535, 551, 568],
[159, 176, 193, 210, 227, 244, 261, 278, 294, 313, 330, 347, 364, 381, 398, 415, 434, 451, 468, 485, 502, 519, 536, 554, 0, 0],
[172, 191, 210, 228, 247, 266, 285, 304, 322, 343, 362, 380, 399, 418, 437, 455, 476, 495, 513, 532, 551, 570, 588, 0, 0, 0],
[177, 197, 216, 235, 255, 274, 293, 313, 332, 353, 373, 392, 411, 431, 450, 470, 491, 510, 530, 549, 568, 588, 0, 0, 0, 0],
[182, 202, 222, 242, 262, 282, 302, 322, 342, 364, 384, 404, 424, 444, 464, 484, 506, 526, 546, 566, 586, 0, 0, 0, 0, 0],
[187, 208, 228, 249, 269, 290, 311, 331, 352, 374, 395, 416, 436, 457, 477, 498, 520, 541, 562, 582, 0, 0, 0, 0, 0, 0],
[192, 213, 234, 256, 277, 298, 319, 341, 362, 385, 406, 427, 449, 470, 491, 512, 535, 556, 578, 0, 0, 0, 0, 0, 0, 0],
[197, 219, 241, 262, 284, 306, 328, 350, 372, 395, 417, 439, 461, 483, 505, 526, 550, 572, 0, 0, 0, 0, 0, 0, 0, 0],
[202, 224, 247, 269, 292, 314, 337, 359, 382, 406, 428, 451, 473, 496, 518, 541, 565, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[207, 230, 253, 276, 299, 322, 345, 368, 391, 416, 439, 462, 486, 509, 532, 555, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[212, 235, 259, 283, 306, 330, 354, 378, 401, 427, 450, 474, 498, 522, 545, 569, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

///////////AL-H39R/////////////

var alH39rvut = [
	[93, 100, 107, 115, 122, 129, 136, 143, 150, 159, 166, 173, 180, 187, 194, 201, 210, 217, 224, 231, 238, 245, 252, 261, 268, 275],
[98, 106, 114, 121, 129, 137, 144, 152, 160, 169, 177, 184, 192, 200, 207, 215, 225, 232, 240, 248, 255, 263, 271, 280, 288, 296],
[103, 112, 120, 128, 136, 145, 153, 161, 170, 180, 188, 196, 205, 213, 221, 229, 239, 248, 256, 264, 273, 281, 289, 299, 308, 316],
[108, 117, 126, 135, 144, 153, 162, 170, 179, 190, 199, 208, 217, 226, 235, 244, 254, 263, 272, 281, 290, 299, 308, 318, 327, 336],
[113, 123, 132, 142, 151, 161, 170, 180, 189, 201, 210, 220, 229, 239, 248, 258, 269, 279, 288, 298, 307, 317, 326, 338, 347, 357],
[118, 128, 138, 148, 159, 169, 179, 189, 199, 211, 221, 231, 242, 252, 262, 272, 284, 294, 304, 314, 325, 335, 345, 357, 367, 377],
[123, 134, 144, 155, 166, 177, 187, 198, 209, 222, 232, 243, 254, 265, 275, 286, 299, 309, 320, 331, 342, 353, 363, 376, 387, 397],
[128, 139, 151, 162, 173, 185, 196, 208, 219, 232, 243, 255, 266, 278, 289, 300, 314, 325, 336, 348, 359, 370, 382, 395, 406, 418],
[133, 145, 157, 169, 181, 193, 205, 217, 229, 243, 255, 267, 279, 291, 303, 315, 328, 340, 352, 364, 376, 388, 400, 414, 426, 438],
[138, 150, 163, 176, 188, 201, 213, 226, 239, 253, 266, 278, 291, 304, 316, 329, 343, 356, 368, 381, 394, 406, 419, 433, 446, 459],
[143, 156, 169, 182, 196, 209, 222, 235, 248, 264, 277, 290, 303, 316, 330, 343, 358, 371, 384, 398, 411, 424, 437, 452, 466, 479],
[148, 161, 175, 189, 203, 217, 231, 245, 258, 274, 288, 302, 316, 329, 343, 357, 373, 387, 401, 414, 428, 442, 456, 472, 485, 499],
[153, 167, 181, 196, 210, 225, 239, 254, 268, 285, 299, 314, 328, 342, 357, 371, 388, 402, 417, 431, 446, 460, 474, 491, 505, 520],
[157, 173, 188, 203, 218, 233, 248, 263, 278, 295, 310, 325, 340, 355, 370, 386, 402, 418, 433, 448, 463, 478, 493, 510, 525, 540],
[162, 178, 194, 210, 225, 241, 257, 272, 288, 306, 321, 337, 353, 368, 384, 400, 417, 433, 449, 464, 480, 496, 512, 529, 545, 560],
[176, 194, 211, 228, 246, 263, 281, 298, 315, 335, 352, 369, 387, 404, 421, 439, 458, 475, 493, 510, 528, 545, 562, 581, 599, 616],
[181, 199, 217, 235, 253, 271, 289, 307, 325, 345, 363, 381, 399, 417, 435, 453, 473, 491, 509, 527, 545, 563, 581, 601, 619, 0],
[186, 205, 223, 242, 261, 279, 298, 316, 335, 355, 374, 393, 411, 430, 449, 467, 488, 506, 525, 543, 562, 581, 599, 620, 0, 0],
[191, 210, 230, 249, 268, 287, 306, 326, 345, 366, 385, 404, 424, 443, 462, 481, 502, 522, 541, 560, 579, 599, 0, 0, 0, 0],
[196, 216, 236, 256, 275, 295, 315, 335, 355, 376, 396, 416, 436, 456, 476, 496, 517, 537, 557, 577, 597, 0, 0, 0, 0, 0],
[201, 221, 242, 262, 283, 303, 324, 344, 365, 387, 407, 428, 448, 469, 489, 510, 532, 553, 573, 593, 0, 0, 0, 0, 0, 0],
[206, 227, 248, 269, 290, 311, 332, 353, 375, 397, 419, 440, 461, 482, 503, 524, 547, 568, 589, 0, 0, 0, 0, 0, 0, 0],
[211, 232, 254, 276, 298, 319, 341, 363, 384, 408, 430, 451, 473, 495, 516, 538, 562, 583, 0, 0, 0, 0, 0, 0, 0, 0],
[216, 238, 260, 283, 305, 327, 350, 372, 394, 418, 441, 463, 485, 508, 530, 552, 577, 599, 0, 0, 0, 0, 0, 0, 0, 0],
[221, 244, 267, 289, 312, 335, 358, 381, 404, 429, 452, 475, 498, 521, 544, 567, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

///////////PVC2/////////////

var pvcOutsideRollervut = [
	[68, 73, 79, 84, 89, 95, 100, 105, 111, 119, 124, 129, 135, 140, 145, 151, 159, 164, 169, 175],
[71, 77, 83, 89, 95, 100, 106, 112, 118, 126, 132, 137, 143, 149, 155, 160, 169, 174, 180, 186],
[75, 81, 87, 94, 100, 106, 112, 118, 124, 133, 139, 145, 152, 158, 164, 170, 179, 185, 191, 197],
[79, 85, 92, 98, 105, 111, 118, 125, 131, 140, 147, 153, 160, 166, 173, 180, 189, 195, 202, 208],
[82, 89, 96, 103, 110, 117, 124, 131, 138, 147, 154, 161, 168, 175, 182, 189, 199, 206, 213, 220],
[86, 93, 101, 108, 115, 123, 130, 137, 145, 155, 162, 169, 177, 184, 191, 199, 209, 216, 223, 231],
[89, 97, 105, 113, 121, 128, 136, 144, 152, 162, 170, 177, 185, 193, 201, 208, 219, 226, 234, 242],
[93, 101, 109, 118, 126, 134, 142, 150, 158, 169, 177, 185, 193, 202, 210, 218, 229, 237, 245, 253],
[97, 105, 114, 122, 131, 139, 148, 157, 165, 176, 185, 193, 202, 210, 219, 228, 239, 247, 256, 264],
[106, 116, 125, 135, 144, 154, 163, 173, 182, 194, 204, 213, 223, 232, 242, 251, 263, 273, 282, 292],
[110, 120, 130, 139, 149, 159, 169, 179, 189, 201, 211, 221, 231, 241, 251, 261, 273, 283, 0, 0],
[113, 124, 134, 144, 155, 165, 175, 185, 196, 209, 219, 229, 239, 250, 260, 270, 283, 0, 0, 0],
[117, 128, 138, 149, 160, 170, 181, 192, 203, 216, 226, 237, 248, 259, 269, 280, 0, 0, 0, 0],
[121, 132, 143, 154, 165, 176, 187, 198, 209, 223, 234, 245, 256, 267, 0, 0, 0, 0, 0, 0],
[124, 136, 147, 159, 170, 182, 193, 205, 216, 230, 242, 253, 265, 0, 0, 0, 0, 0, 0, 0],
[128, 140, 152, 163, 175, 187, 199, 211, 223, 237, 249, 261, 273, 0, 0, 0, 0, 0, 0, 0],
[131, 144, 156, 168, 181, 193, 205, 217, 230, 245, 257, 269, 0, 0, 0, 0, 0, 0, 0, 0],
[143, 157, 171, 184, 198, 212, 226, 240, 253, 270, 283, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[147, 161, 175, 189, 203, 218, 232, 246, 260, 277, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[150, 165, 179, 194, 209, 223, 238, 252, 267, 284, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[154, 169, 184, 199, 214, 229, 244, 259, 274, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

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
	[1.00, 1.00, 1.20, 1.20, 1.30, 1.30, 1.30, 1.30, 1.30, 1.30, 1.30, 1.40, 1.40, 1.50, 1.50, 1.70, 1.80, 1.80, 1.90, 2.00, 2.00, 2.00, 2.00, 2.30, 2.30, 2.30, 2.70],	// Standart
	[1.00, 1.00, 1.10, 1.20, 1.20, 1.20, 1.20, 1.20, 1.20, 1.30, 1.30, 1.30, 1.30, 1.30, 1.30, 1.50, 1.50, 1.50, 1.50, 1.50, 1.50, 1.70, 1.70, 1.80, 1.80, 1.90, 2.00],	// Elegans
	[1.00, 1.00, 1.20, 1.20, 1.20, 1.20, 1.20, 1.30, 1.30, 1.30, 1.30, 1.30, 1.40, 1.40, 1.40, 1.60, 1.60, 1.60, 1.80, 1.80, 1.80, 1.80, 1.80, 2.00, 2.00, 2.00, 2.40]	// komfort
];

// Roller STANDART
var rollerStandart = [
	[11, 13, 14, 16, 18, 20, 21, 23, 25, 26, 28, 30, 32, 33, 35],
[12, 14, 16, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 36, 38],
[13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 40, 42],
[13, 16, 18, 20, 22, 25, 27, 29, 31, 34, 36, 38, 40, 43, 45],
[14, 17, 19, 21, 24, 26, 29, 31, 34, 36, 38, 41, 43, 46, 48],
[15, 18, 20, 23, 25, 28, 31, 33, 36, 38, 41, 44, 46, 49, 51],
[16, 18, 21, 24, 27, 30, 32, 35, 38, 41, 43, 46, 49, 52, 55],
[17, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58],
[17, 20, 24, 27, 30, 33, 36, 39, 42, 45, 49, 52, 55, 58, 61],
[18, 21, 25, 28, 31, 35, 38, 41, 44, 48, 51, 54, 58, 61, 64],
[19, 22, 26, 29, 33, 36, 40, 43, 47, 50, 54, 57, 61, 64, 68],
[20, 23, 27, 31, 34, 38, 42, 45, 49, 53, 56, 60, 63, 67, 71],
[20, 24, 28, 32, 36, 40, 43, 47, 51, 55, 59, 63, 66, 70, 74],
[21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69, 73, 77],
[22, 26, 30, 35, 39, 43, 47, 51, 55, 60, 64, 68, 72, 76, 81],
[23, 27, 32, 36, 40, 45, 49, 53, 58, 62, 66, 71, 75, 79, 84],
[24, 28, 33, 37, 42, 46, 51, 55, 60, 64, 69, 73, 78, 82, 87],
[24, 29, 34, 39, 43, 48, 53, 57, 62, 67, 71, 76, 81, 86, 90],
[25, 30, 35, 40, 45, 50, 54, 59, 64, 69, 74, 79, 84, 89, 93],
[26, 31, 36, 41, 46, 51, 56, 61, 66, 71, 77, 82, 87, 92, 97],
[27, 32, 37, 42, 48, 53, 58, 63, 69, 74, 79, 84, 90, 95, 100],
[28, 33, 38, 44, 49, 55, 60, 65, 71, 76, 82, 87, 92, 98, 103]
];

var rollerElegans = [
	[21, 24, 27, 29, 32, 35, 38, 41, 43, 46, 49, 52],
[23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56],
[24, 27, 30, 34, 37, 40, 43, 46, 50, 53, 56, 59],
[25, 29, 32, 36, 39, 43, 46, 49, 53, 56, 60, 63],
[27, 31, 34, 38, 41, 45, 49, 52, 56, 60, 63, 67],
[28, 32, 36, 40, 44, 48, 51, 55, 59, 63, 67, 71],
[30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 75],
[31, 35, 40, 44, 48, 53, 57, 61, 65, 70, 74, 78],
[33, 37, 42, 46, 51, 55, 60, 64, 69, 73, 78, 82],
[34, 39, 43, 48, 53, 58, 62, 67, 72, 76, 81, 86],
[35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
[37, 42, 47, 52, 57, 63, 68, 73, 78, 83, 88, 94],
[38, 44, 49, 54, 60, 65, 71, 76, 81, 87, 92, 97],
[40, 45, 51, 57, 62, 68, 73, 79, 84, 90, 96, 101],
[41, 47, 53, 59, 64, 70, 76, 82, 88, 93, 99, 105],
[43, 49, 55, 61, 67, 73, 79, 85, 91, 97, 103, 109],
[44, 50, 57, 63, 69, 75, 81, 88, 94, 100, 106, 112],
[46, 52, 58, 65, 71, 78, 84, 91, 97, 103, 110, 116],
[47, 54, 60, 67, 74, 80, 87, 93, 100, 107, 113, 120],
[48, 55, 62, 69, 76, 83, 90, 96, 103, 110, 117, 124],
[50, 57, 64, 71, 78, 85, 92, 99, 106, 114, 121, 128],
[51, 59, 66, 73, 80, 88, 95, 102, 110, 117, 124, 131]
];

var rollerPrestige = [
	[28, 31, 33, 36, 39, 42, 45, 47, 50, 53, 56, 59, 61, 64, 67, 70, 73, 75, 78],
[29, 32, 35, 38, 41, 44, 47, 50, 52, 55, 58, 61, 64, 67, 70, 73, 76, 79, 82],
[29, 33, 36, 39, 42, 45, 49, 52, 55, 58, 61, 64, 68, 71, 74, 77, 80, 83, 87],
[30, 34, 37, 40, 44, 47, 50, 54, 57, 61, 64, 67, 71, 74, 77, 81, 84, 87, 91],
[31, 35, 38, 42, 45, 49, 52, 56, 60, 63, 67, 70, 74, 77, 81, 84, 88, 92, 95],
[32, 36, 39, 43, 47, 51, 54, 58, 62, 66, 69, 73, 77, 81, 84, 88, 92, 96, 99],
[33, 37, 41, 45, 49, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104],
[34, 38, 42, 46, 50, 54, 58, 62, 67, 71, 75, 79, 83, 87, 91, 95, 100, 104, 108],
[35, 39, 43, 47, 52, 56, 60, 65, 69, 73, 78, 82, 86, 90, 95, 99, 103, 108, 112],
[35, 40, 44, 49, 53, 58, 62, 67, 71, 76, 80, 85, 89, 94, 98, 103, 107, 112, 116],
[36, 41, 46, 50, 55, 60, 64, 69, 74, 78, 83, 88, 92, 97, 102, 106, 111, 116, 120],
[37, 42, 47, 52, 57, 61, 66, 71, 76, 81, 86, 91, 96, 100, 105, 110, 115, 120, 125],
[38, 43, 48, 53, 58, 63, 68, 73, 78, 83, 88, 94, 99, 104, 109, 114, 119, 124, 129],
[39, 44, 49, 54, 60, 65, 70, 75, 81, 86, 91, 96, 102, 107, 112, 117, 123, 128, 133],
[40, 45, 50, 56, 61, 67, 72, 78, 83, 89, 94, 99, 105, 110, 116, 121, 127, 132, 137],
[40, 46, 52, 57, 63, 69, 74, 80, 85, 91, 97, 102, 108, 114, 119, 125, 130, 136, 142],
[41, 47, 53, 59, 65, 70, 76, 82, 88, 94, 99, 105, 111, 117, 123, 128, 134, 140, 146],
[42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120, 126, 132, 138, 144, 150],
[43, 49, 55, 62, 68, 74, 80, 86, 92, 99, 105, 111, 117, 123, 130, 136, 142, 148, 154],
[44, 50, 57, 63, 69, 76, 82, 88, 95, 101, 108, 114, 120, 127, 133, 140, 146, 152, 159],
[45, 51, 58, 64, 71, 77, 84, 91, 97, 104, 110, 117, 123, 130, 137, 143, 150, 156, 163],
[45, 52, 59, 66, 72, 79, 86, 93, 100, 106, 113, 120, 127, 133, 140, 147, 154, 160, 167],
[46, 53, 60, 67, 74, 81, 88, 95, 102, 109, 116, 123, 130, 137, 144, 151, 157, 164, 171],
[47, 54, 61, 69, 76, 83, 90, 97, 104, 111, 119, 126, 133, 140, 147, 154, 161, 168, 176],
[48, 55, 63, 70, 77, 85, 92, 99, 107, 114, 121, 129, 136, 143, 151, 158, 165, 173, 180]
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
			[588, 679, 720, 761, 852, 893, 1035],
			[0, 741, 783, 825, 928, 969, 1124],
			[0, 0, 836, 879, 995, 1037, 1205],
			[0, 0, 0, 951, 1079, 1123, 1302]
		],
		[         //1
			[658, 765, 810, 855, 962, 1006, 1169],
			[0, 837, 883, 929, 1051, 1097, 1275],
			[0, 0, 946, 993, 1130, 1177, 1371],
			[0, 0, 0, 1077, 1230, 1278, 1486]
		],
		[        //2
			[701, 825, 871, 916, 1040, 1086, 1267],
			[0, 909, 956, 1002, 1145, 1192, 1392],
			[0, 0, 1030, 1078, 1240, 1288, 1507],
			[0, 0, 0, 1174, 1355, 1404, 1642]
		],
		[
			//Elegance       //3
			[719, 820, 868, 916, 1017, 1065, 1220, 1409, 1516, 1670, 1719],
            [0, 891, 940, 990, 1103, 1153, 1320, 1522, 1630, 1797, 1846],
            [0, 0, 1019, 1069, 1196, 1246, 1426, 1645, 1755, 1935, 1985],
            [0, 0, 0, 1173, 1312, 1417, 1557, 1608, 1920, 2060, 2111],
            [0, 0, 0, 0, 1511, 1563, 1716, 1768, 1879, 2276, 0],
            [0, 0, 0, 0, 0, 1641, 1914, 1967, 2079, 0, 0]
		],
		[                   //4
			[755, 865, 916, 965, 1076, 1126, 1292, 1486, 1598, 1763, 1813],
			[0, 943, 995, 1045, 1171, 1222, 1403, 1611, 1722, 1903, 1954],
			[0, 0, 1080, 1132, 1273, 1325, 1520, 1746, 1859, 2055, 2106],
			[0, 0, 0, 1244, 1400, 1507, 1663, 1716, 2037, 2194, 2246],
			[0, 0, 0, 0, 1610, 1664, 1834, 1888, 2003, 2426, 0],
			[0, 0, 0, 0, 0, 1751, 2047, 2101, 2218, 0, 0]
		],
		[                   //5
			[806, 936, 987, 1038, 1167, 1218, 1404, 1604, 1718, 1904, 1955],
			[0, 1026, 1079, 1131, 1279, 1331, 1535, 1749, 1864, 2069, 2121],
			[0, 0, 1177, 1230, 1397, 1450, 1673, 1906, 2022, 2245, 2298],
			[0, 0, 0, 1355, 1541, 1652, 1837, 1891, 2223, 2408, 2462],
			[0, 0, 0, 0, 1771, 1827, 2031, 2086, 2204, 2667, 0],
			[0, 0, 0, 0, 0, 1930, 2266, 2322, 2441, 0, 0]
		],
		[
			//Vera          //6
			[1015, 1167, 1267, 1368, 1520, 1621, 1880],
 			[0, 0, 1370, 1472, 1637, 1738, 2010],
 			[0, 0, 0, 1578, 1756, 1858, 2143],
 			[0, 0, 0, 0, 1873, 1976, 2274]
		],
		[                   //7
			[1082, 1248, 1353, 1460, 1626, 1731, 2012],
			[0, 0, 1467, 1573, 1755, 1861, 2157],
			[0, 0, 0, 1690, 1887, 1995, 2305],
			[0, 0, 0, 0, 2016, 2125, 2449]
		],
		[                 //8
			[1143, 1329, 1438, 1547, 1734, 1842, 2145],
			[0, 0, 1565, 1674, 1880, 1990, 2312],
			[0, 0, 0, 1805, 2030, 2140, 2481],
			[0, 0, 0, 0, 2176, 2287, 2648]
		],
		[
			//Prestige   //9
			[1272, 1443, 1565, 1685, 1858, 1978, 2150, 2622, 2808, 2980, 3101],
			[0, 1527, 1649, 1770, 1956, 2077, 2262, 2754, 2941, 3126, 3248],
			[0, 0, 1737, 1860, 2058, 2181, 2378, 2895, 3084, 3282, 3456],
			[0, 0, 0, 1946, 2155, 2332, 2541, 2666, 3270, 3479, 0]
		],
		[               //10
			[1350, 1539, 1666, 1793, 1981, 2108, 2296, 2792, 2988, 3176, 3303],
			[0, 1631, 1759, 1887, 2090, 2218, 2422, 2939, 3136, 3339, 3467],
			[0, 0, 1858, 1987, 2205, 2334, 2552, 3096, 3294, 3512, 3696],
			[0, 0, 0, 2081, 2314, 2499, 2732, 2862, 3497, 3730, 0]
		],
		[               //11
			[1408, 1615, 1744, 1874, 2079, 2209, 2416, 2922, 3122, 3327, 3457],
			[0, 1719, 1849, 1980, 2205, 2335, 2561, 3088, 3289, 3514, 3645],
			[0, 0, 1960, 2091, 2335, 2466, 2711, 3265, 3467, 3710, 3898],
			[0, 0, 0, 2197, 2460, 2648, 2910, 3044, 3690, 3954, 0]
		],
		[
			//Classic   //12
			[523, 591, 621, 689, 719, 750, 818],
			[544, 625, 657, 738, 769, 801, 882],
			[568, 662, 695, 789, 822, 856, 949],
			[594, 700, 736, 842, 877, 912, 1018],
			[616, 735, 771, 890, 927, 964, 1083]
		],
		[                //13
			[528, 601, 631, 704, 734, 764, 837],
			[551, 638, 670, 757, 789, 820, 908],
			[576, 678, 711, 812, 846, 879, 981],
			[603, 719, 754, 870, 905, 940, 1056],
			[626, 756, 793, 923, 960, 996, 1126]
		],
		[               //14
			[565, 652, 684, 771, 803, 835, 922],
			[592, 697, 731, 836, 869, 903, 1008],
			[622, 745, 780, 904, 939, 974, 1097],
			[654, 795, 832, 973, 1010, 1047, 1189],
			[681, 840, 879, 1038, 1077, 1116, 1275]
		],
		[
			//Smart    //15
			[577, 712, 809, 945, 1041, 1137, 1273],
			[598, 748, 846, 995, 1093, 1191, 1340],
			[623, 786, 886, 1048, 1148, 1248, 1410],
			[650, 826, 928, 1103, 1205, 1307, 1482],
			[673, 862, 965, 1154, 1257, 1361, 1550]
		],
		[               //16
			[582, 723, 819, 960, 1056, 1153, 1294],
			[605, 761, 859, 1015, 1113, 1211, 1367],
			[632, 802, 902, 1073, 1173, 1272, 1443],
			[660, 846, 947, 1133, 1234, 1336, 1521],
			[684, 884, 987, 1188, 1291, 1394, 1595]
		],
		[               //17
			[604, 759, 857, 1012, 1110, 1208, 1363],
			[631, 804, 904, 1077, 1177, 1277, 1450],
			[661, 852, 954, 1145, 1247, 1349, 1540],
			[694, 903, 1007, 1216, 1320, 1423, 1633],
			[721, 949, 1054, 1282, 1387, 1493, 1720]
		],
		[
			//Kabrio   //18
			[422, 422, 422, 422, 422, 422, 889, 946],
			[610, 610, 610, 610, 610, 610, 1013, 1218],
			[845, 845, 845, 845, 845, 845, 1396, 0],
			[1126, 1126, 1126, 1126, 1126, 1126,  0,  0]
		],
		[             //19
			[422, 422, 422, 422, 422, 422, 889, 946],
			[610, 610, 610, 610, 610, 610, 1013, 1218],
			[845, 845, 845, 845, 845, 845, 1396, 0],
			[1126, 1126, 1126, 1126, 1126, 1126,  0,  0]
		],
		[             //20
			[459, 561, 622, 695, 797, 858, 973, 1034],
			[682, 744, 879, 954, 1089, 1151, 1227, 1361],
			[965, 1029, 1196, 1274, 1334, 1505, 1582, 0],
			[1308, 1375, 1441, 1653, 1720, 1918, 0, 0]
		],
		[
			//Balkonski //21
			[329, 422, 452, 545, 575, 606, 699, 729, 881, 911, 941]
		],
		[             //22
			[354, 461, 492, 599, 630, 662, 768, 800, 968, 1000, 1031]
		],
		[             //23
			[390, 520, 553, 683, 716, 749, 879, 912, 1107, 1140, 1174]
		],
		[
			//Kristal // 24
			[223, 285, 347, 409, 471, 533],
			[240, 312, 384, 455, 527, 599],
			[258, 339, 420, 502, 583, 664],
			[275, 366, 457, 548, 639, 730]
		],
		[
			//Kristal Rido  //25
			[456, 564, 673, 782, 891, 1000],
			[551, 670, 788, 907, 1025, 1144],
			[646, 775, 903, 1031, 1159, 1288],
			[742, 880, 1018, 1156, 1294, 1431],
			[837, 985, 1132, 1280, 1428, 1575],
			[933, 1090, 1247, 1404, 1562, 1719]
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
	[17, 17, 17, 17, 17, 17, 17, 18, 19, 21],
	[17, 17, 17, 17, 17, 17, 19, 20, 21, 23],
	[17, 17, 17, 17, 17, 19, 20, 22, 23, 25],
	[17, 17, 17, 18, 19, 21, 22, 24, 25, 27],
	[17, 17, 17, 19, 21, 22, 24, 26, 27, 29],
	[17, 17, 19, 21, 22, 24, 26, 27, 29, 31],
	[17, 19, 20, 22, 24, 26, 28, 29, 31, 33],
	[18, 20, 22, 24, 26, 27, 29, 31, 33, 35],
	[19, 21, 23, 25, 27, 29, 31, 33, 35, 37],
	[21, 23, 25, 27, 29, 31, 33, 35, 37, 39],
	[22, 24, 26, 28, 30, 33, 35, 37, 39, 41],
	[23, 26, 28, 30, 32, 34, 36, 39, 41, 43],
	[25, 27, 29, 31, 34, 36, 38, 41, 43, 45],
	[26, 28, 31, 33, 35, 38, 40, 42, 45, 47],
	[27, 30, 32, 35, 37, 39, 42, 44, 47, 49],
	[29, 31, 34, 36, 39, 41, 44, 46, 49, 51],
	[30, 32, 35, 38, 40, 43, 45, 48, 51, 53],
	[31, 34, 37, 39, 42, 44, 47, 50, 52, 55],
	[32, 35, 38, 41, 43, 46, 49, 52, 54, 57],
	[34, 37, 39, 42, 45, 48, 51, 54, 56, 59]
];

//fix
var insectNetFix = [
	[17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 20, 21, 22, 23, 24, 25],
	[17, 17, 17, 17, 17, 17, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27],
	[17, 17, 17, 17, 17, 17, 18, 19, 21, 22, 23, 24, 26, 27, 28, 29],
	[17, 17, 17, 17, 17, 18, 20, 21, 22, 24, 25, 26, 28, 29, 30, 31],
	[17, 17, 17, 17, 18, 20, 21, 23, 24, 25, 27, 28, 29, 31, 32, 44],
	[17, 17, 17, 18, 20, 21, 23, 24, 26, 27, 29, 30, 31, 42, 44, 46],
	[17, 17, 18, 20, 21, 23, 24, 26, 27, 29, 30, 40, 42, 44, 46, 49],
	[17, 18, 19, 21, 23, 24, 26, 27, 29, 31, 40, 42, 44, 46, 49, 51],
	[17, 19, 21, 22, 24, 26, 27, 29, 37, 39, 42, 44, 46, 48, 51, 53],
	[18, 20, 22, 24, 25, 27, 29, 31, 39, 41, 43, 46, 48, 50, 53, 55],
	[20, 21, 23, 25, 27, 29, 30, 38, 40, 43, 45, 48, 50, 52, 55, 57],
	[21, 22, 24, 26, 28, 30, 37, 40, 42, 45, 47, 49, 52, 54, 57, 59],
	[22, 24, 26, 28, 29, 31, 39, 41, 44, 46, 49, 51, 54, 56, 59, 61],
	[23, 25, 27, 29, 31, 38, 40, 43, 45, 48, 51, 53, 56, 58, 61, 64],
	[24, 26, 28, 30, 32, 39, 42, 44, 47, 50, 52, 55, 58, 60, 63, 66],
	[25, 27, 29, 31, 38, 40, 43, 46, 49, 51, 54, 57, 60, 62, 65, 68],
	[26, 28, 30, 33, 39, 42, 45, 48, 50, 53, 56, 59, 62, 64, 67, 70],
	[27, 29, 32, 34, 40, 43, 46, 49, 52, 55, 58, 61, 64, 67, 69, 72],
	[28, 31, 33, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 71, 74],
	[29, 32, 34, 40, 43, 46, 49, 52, 55, 58, 61, 64, 67, 71, 74, 77]
];

//vrati
var doorInsectNet = [
	[41, 43, 45, 47, 50, 52, 54, 56, 58],
	[43, 45, 48, 50, 52, 54, 57, 59, 61],
	[45, 48, 50, 52, 55, 57, 59, 62, 64],
	[47, 50, 52, 55, 57, 60, 62, 65, 67],
	[50, 52, 55, 57, 60, 62, 65, 67, 70],
	[52, 54, 57, 60, 62, 65, 67, 70, 73],
	[54, 57, 59, 62, 65, 67, 70, 73, 76],
	[56, 59, 62, 65, 67, 70, 73, 87, 91],
	[58, 61, 64, 67, 70, 73, 76, 90, 94],
	[60, 63, 66, 69, 72, 75, 89, 93, 97],
	[63, 66, 69, 72, 75, 88, 92, 96, 100],
	[65, 68, 71, 74, 77, 90, 94, 99, 103],
	[67, 70, 73, 77, 89, 93, 97, 101, 106],
	[69, 72, 76, 79, 91, 95, 100, 104, 109],
	[71, 75, 78, 89, 94, 98, 103, 107, 112],
	[73, 77, 81, 92, 96, 101, 105, 110, 114],
	[76, 79, 83, 94, 99, 103, 108, 113, 117],
	[78, 82, 92, 96, 101, 106, 111, 115, 120],
	[80, 84, 94, 99, 104, 109, 113, 118, 123],
	[82, 86, 96, 101, 106, 111, 116, 121, 126],
	[84, 88, 99, 104, 109, 114, 119, 124, 129],
	[86, 96, 101, 106, 111, 116, 122, 127, 132]
];

//ramka 20/40
var insectNetInFrame = [
	[35, 39, 42, 46, 50, 54, 57, 61, 65, 69, 73, 76],
	[36, 40, 44, 48, 52, 56, 60, 63, 67, 71, 75, 79],
	[38, 42, 46, 50, 54, 58, 62, 66, 69, 73, 77, 81],
	[40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84],
	[41, 45, 50, 54, 58, 62, 66, 70, 74, 78, 82, 86],
	[43, 47, 51, 55, 60, 64, 68, 72, 76, 80, 84, 88],
	[45, 49, 53, 57, 61, 66, 70, 74, 78, 82, 86, 91],
	[46, 51, 55, 59, 63, 68, 72, 76, 80, 85, 89, 93],
	[48, 52, 57, 61, 65, 70, 74, 78, 83, 87, 91, 95],
	[50, 54, 59, 63, 67, 72, 76, 80, 85, 89, 93, 98],
	[52, 56, 60, 65, 69, 74, 78, 82, 87, 91, 96, 100],
	[53, 58, 62, 67, 71, 76, 80, 85, 89, 94, 98, 102],
	[56, 61, 66, 71, 76, 81, 86, 90, 95, 100, 105, 110],
	[58, 63, 68, 73, 78, 83, 88, 93, 97, 102, 107, 112],
	[60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115],
	[61, 66, 71, 77, 82, 87, 92, 97, 102, 107, 112, 117],
	[63, 68, 73, 78, 84, 89, 94, 99, 104, 109, 114, 119],
	[65, 70, 75, 80, 85, 91, 96, 101, 106, 111, 117, 122],
	[67, 72, 77, 82, 87, 93, 98, 103, 108, 113, 120, 125],
	[69, 74, 79, 84, 89, 95, 100, 105, 110, 115, 123, 128]
];

//vgraden vodach
var insectNetWithBuiltInDriver = [
	[44, 48, 52, 56, 60, 64, 68, 71, 75, 79, 83, 87],
	[47, 51, 55, 59, 63, 67, 71, 75, 79, 83, 87, 91],
	[50, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94],
	[53, 57, 61, 65, 69, 73, 77, 82, 86, 90, 94, 98],
	[56, 60, 64, 68, 73, 77, 81, 85, 89, 93, 97, 102],
	[59, 63, 67, 71, 76, 80, 84, 88, 93, 97, 101, 105],
	[62, 66, 70, 75, 79, 83, 87, 92, 96, 100, 105, 109],
	[65, 69, 73, 78, 82, 86, 91, 95, 99, 104, 108, 112],
	[68, 72, 76, 81, 85, 90, 94, 98, 103, 107, 112, 116],
	[71, 75, 80, 84, 88, 93, 97, 102, 106, 111, 115, 120],
	[74, 78, 83, 87, 92, 96, 101, 105, 110, 114, 119, 123],
	[77, 81, 86, 90, 95, 99, 104, 109, 113, 118, 122, 127],
	[81, 86, 91, 96, 101, 106, 111, 116, 121, 126, 131, 136],
	[84, 89, 94, 99, 104, 109, 114, 119, 124, 129, 134, 140],
	[87, 92, 97, 102, 107, 112, 118, 123, 128, 133, 138, 143],
	[90, 95, 100, 105, 110, 116, 121, 126, 131, 136, 142, 147],
	[93, 98, 103, 108, 114, 119, 124, 129, 135, 140, 145, 150],
	[96, 101, 106, 112, 117, 122, 127, 133, 138, 143, 149, 154],
	[99, 104, 110, 116, 121, 127, 143, 138, 143, 148, 155, 159],
	[102, 107, 114, 120, 125, 132, 148, 143, 148, 153, 161, 164]
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
			totalPrice = totalPrice * 1.1;
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



















