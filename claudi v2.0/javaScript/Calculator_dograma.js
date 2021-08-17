
var profileName = [ "PVC KMG 4 кам.", "PVC KMG 6 кам.", "PVC Trocal 5 кам.", "PVC Trocal 6 кам.",
					"PVC Salamander 5 кам.", "PVC Salamander 6 кам.", "AL студен ETEM 40mm", "AL Термо ETEM 60mm"];
var profilePricePerMeter = 
[
	[5.8, 7, 10.35 /* -0.8 for  Wings*/, 15 /* -1.5 for  Wings*/, 16, 31 /* -11 for  Wings, +16 for Separator*/, 9.45 /* +3.15 for  Wings*/, 23],	//  White
	[10.5, 11.5, 17.25 /* -0.8 for Wings*/, 24.75 /* -1.1 for  Wings*/,25.5, 50 /* -20 for  Wings, +34 for Separator*/, 15.05 /* +3.15 for  Wings*/, 31]	// Colored
];	
var profileColors = ["Бял", "Имитация Дърво"];
var glassName = ["бяло/бяло", "бяло/Ка", "бяло/високоенергийно"];
var glasPirce = 
[
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

function getColor(color)
{
	colorCode = color.selectedIndex;
}	
function getModel(model)
{
	modelCode = model.selectedIndex;	
}
function getGlass(glass)
{
	glassCode = glass.selectedIndex;
}

// Main funciton
function setConfiguration(confNo)
{
	switchImage(confNo);
	
	var windowWidth =  Number(document.getElementById("Width").value); 
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
	
	switch (confNo)
	{
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
		
	if(hasDoor)
	{
		doorWidth = Number(document.getElementById("WidthDoorWing").value);	
		doorHeight = Number(document.getElementById("HeightDoorWing").value);
		doorProfileLenght = addWing(doorWidth,doorHeight, 1);
		doorProfileLenght += doorWidth;
		profileTotalLength += addWing(doorWidth,doorHeight, 1);
		getMechanismsPrize(doorWidth, doorHeight, modelCode, 1);
		sqrtMeters += (doorWidth * doorHeight) / 10000;
	}
	else
	{
		doorWidth = 0;
		doorHeight = 0;
		doorProfileLenght = 0;
		sqrtMeters = 0;
	}
	
	if(hasWing > 0)
	{
		if(typeOfTheWindow != 0 && typeOfTheWindow != 8)
		{
			wingProfileLenght += addWing(75, windowHeight, hasWing);	// default wing width
			getMechanismsPrize(75, windowHeight, modelCode, hasWing);
		}
		else
		{
			wingProfileLenght += addWing(windowWidth, windowHeight, hasWing);
			getMechanismsPrize(windowWidth, windowHeight, modelCode, hasWing);
		}
	}
	else
	{
		wingProfileLenght = 0;
	}
	
	wingProfileLenght += doorProfileLenght;	
	profileTotalLength += windowWidth * 2 + windowHeight * 2;
	profileTotalLength += delimeters * windowHeight;
	delimeterLenght += delimeters * windowHeight;
	sqrtMeters += (windowWidth * windowHeight) / 10000;
	
	if (typeOfTheWindow == 8)
	{
		wingProfileLenght += innerDelimiters * windowWidth;
		//delimeterLenght += innerDelimiters * windowWidth;
	}
	else
	{
		//profileTotalLength += innerDelimiters * doorWidth;
	}
	
	// Printing the total prize :
	profileTotalLength = profileTotalLength / 100;
	totalPrize = getProfilePrize(profileTotalLength, wingProfileLenght);
	totalPrize += getGlassPrize(sqrtMeters);
	totalPrize += getAddonsPrize(delimeterLenght,(delimeters + innerDelimiters), windowWidth, sqrtMeters);
	totalPrize += mechanismsPirze;
	totalPrize += expansion / 100 * totalPrize;
	totalPrize -= discount / 100 * totalPrize;
	totalPrize = checkBoundories(windowWidth, windowHeight, doorWidth, doorHeight, totalPrize);
	document.getElementById("finalPrice").innerHTML = totalPrize.toFixed(2) + " лв.";
}

// Showing the invisible fields
function ShowDoorArea(obj)
{
	obj.style.display = "visible";
}

// Setting the image to the blueprint
function switchImage(configuration)
{
	var old = document.getElementById("blueprintCanvas");
	var img = document.createElement("img");
	var source;
	var doorW = document.getElementById("doorWidth");
	var doorH = document.getElementById("doorHeight");
	
	switch(configuration)
	{
		case 0:
		source = "images/BluePrints/otv.jpg";
		typeOfTheWindow = 0;
		hasWing = 1;
		break;	
		case 1:
		source = "images/BluePrints/fix.jpg";
		typeOfTheWindow = 1;
		hasWing = 0;
		break;
		case 2:
		source = "images/BluePrints/fix_otv_fix.jpg";
		typeOfTheWindow = 2;
		hasWing = 1;
		break;
		case 3:
		source = "images/BluePrints/otv_fix.jpg";
		typeOfTheWindow = 3;
		hasWing = 1;
		break;
		case 4:
		source = "images/BluePrints/fix_otv_otv_fix.jpg";
		typeOfTheWindow = 4;
		hasWing = 2;
		break;
		case 5:
		source = "images/BluePrints/proz_fix_vrata.jpg";
		typeOfTheWindow = 5;
		doorW.style.visibility = "visible";
		doorH.style.visibility = "visible";
		hasWing = 0;
		break;
		case 6:
		source = "images/BluePrints/otv_fix_otv.jpg";
		typeOfTheWindow = 6;
		hasWing = 2;
		break;
		case 7:
		source = "images/BluePrints/otv_fix_vrata.jpg";
		typeOfTheWindow = 7;
		doorW.style.visibility = "visible";
		doorH.style.visibility = "visible";
		hasWing = 1;
		break;
		case 8:
		source = "images/BluePrints/vrata.jpg";
		typeOfTheWindow = 8;
		hasWing = 1;
		break;
	}
	
	if(configuration != 5 && configuration != 7)
	{
		doorW.style.visibility = "hidden";
		doorH.style.visibility = "hidden";
		hasDoor = false;
		//doorWidth = 0;
		//doorHeight = 0;
	}
	else
	{
		hasDoor = true;
	}
	
	img.src = source;
    img.width = 260;
    img.height = 150;
	document.getElementById("blueprintCanvas").innerHTML = '<img src="' + img.src + '">';
}

function addWing(sizeWidth, sizeHeight, quantity)
{
	// TODO: Add mechanisms
	var l = (sizeWidth * 2 + sizeHeight * 2) * quantity;
	return l;
}

function getGlassPrize(sqrtMeters)
{
	var sqr = sqrtMeters;
	var total;
	var row;
	switch(modelCode)
	{
		case 2:
		case 3:
		case 6:
		row = 0;
		break;
		
		default:
		row = 1;
		sqr -= 18/100 * sqr;
		break;
	}
	total = sqr * glasPirce[row][glassCode];
	return total;
}

function getProfilePrize(len, wingLen)
{
	var total;
	var wingProfileAddPrize = [
	[0, 0, 0.8, 1.5, 0, 11, 3.15, 0],	// White
	[0, 0, 0.8, 1.1, 0, 20, 3.15, 0]	// Colored
	];
	var wing = wingLen / 100;
	var price = profilePricePerMeter[colorCode][modelCode];
	total = len * price;
	total += wing * (price - wingProfileAddPrize[colorCode][modelCode]);
	return total;
}

function getMechanismsPrize(width, height, profileType, count)
{
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
	
	switch(profileType)
	{
		case 2:
		case 3:
		if(height <= 180)
		{
			mechanismsPirze += rollPVCMechNormal;
		}
		else
		{
			mechanismsPirze += rollPVCMechLong;
		}
		break;
		
		case 6:
		mechanismsPirze += rollAlNormal;
		break;
		
		case 8:
		mechanismsPirze += vipAlMechNormal;
		if(dblMechanism == 1)
		{
			addons += vipAlDouble;
		}
		else
		{
			addons = 0;
		}
		break;
		
		default:
		if(height <= 140)
		{
			mechanismsPirze += vipPVCMechNormal;
			// if double
			if(dblMechanism == 1)
			{
				addons += vipPVCDouble;
			}
			else
			{
				addons = 0;
			}
		}
		else	// Long Wing
		{
			mechanismsPirze += vipPVCMechLong;
			// if double
			if(dblMechanism == 1)
			{
				addons += vipPVCDouble;
			}
			else
			{
				addons = 0;
			}
		}
		if(width > 80)
		{
			mechanismsPirze += 10;
			if(dblMechanism == 1)
			{
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

function getAddonsPrize(delimeterLen, delCounter, winWidth, sqrtMeters)
{
	var total = 0
	var alAddon = document.getElementById("alOutside").checked;
	var pvcAddon = document.getElementById("pvcInside").checked;
	
	if(modelCode == 5 && colorCode == 0)
	{
		total += delimeterLen * 16 / 100;
	}
	else if(modelCode == 5 && colorCode == 1)
	{
		total += delimeterLen * 34 / 100;
	}
	switch(modelCode)	// Per delimeter
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
	
	if (alAddon == 1)
	{
		if(colorCode == 0)
		{
			total += winWidth * 0.087; // 150mm AL
		}
		else
		{
			total += winWidth * 0.127; // 150 AL colored
		}
	}
	
	if (pvcAddon == 1)
	{
		if(colorCode == 0)
		{
			total += winWidth * 0.08; // PVC 150mm
		}
		else
		{
			total += winWidth * 0.11; // PVC 150mm colored
		}
	}
	
	return total;
}

function checkBoundories(width, height, doorW, doorH, prize)
{
	var accept = true;
	switch(typeOfTheWindow)
	{
		case 0:
		case 8:
		if(width < 50 || width > 90 || height < 40 ||height > 230)
		{
			accept = false;
		}break;
		
		case 5:
		case 7:
		if(doorW < 50 || doorW > 90 || doorH < 40 || doorH > 230 || width < 40 || width > 500 || height < 40 || height > 500)
		{
			accept = false;
		}
		break;
		
		default:
		if(width < 40 || width > 500 || height < 40 ||height > 500)
		{
			accept = false;
		}break;
	}
	
	if(accept == true)
	{
		return prize;
	}
	else
	{
		alert("Зададените размери са извън позволените ширина/височина.");
		return 0;
	}	
}


















