// JavaScript Document

// ---Rollers---
var colorCode = 0;	//default color
var modelCode = 0; // default model
var totalPrice = 0;
var isVisible = false;

var rollersModels = ["Стандарт", "Елеганс", "Престиж"];
var rollerTextiles = ["Melisa(11***)", "Adriana(100**)", "Patara(513*****)", "Dream(900**)", "Van Gogh(300**)", 
					  "Tropic(400**)", "Madeira(500**)", "Rembrandt(600**)", "Melisa BlackOut(12***)", "Stella BlackOut(700**)",
					  "Isabela BlackOut(800**)", "Alaska(750**)", "Berry BlackOut(456***)", "Green Screen ECO(524****)", 
					  "Pinestripe(751**)", "Chats(752**)", "Attia(667****)", "Textura Silk Topar Plus(379****)", 
					  "Summer Daze(753**)", "Montana(755**)"];

var Coeficient = [
				   [1.00, 1.05, 1.15, 1.15, 1.25, 1.25, 1.25, 1.25, 1.30, 1.40, 1.40, 1.40, 1.70, 1.70, 1.70, 1.70, 2.00, 2.00, 2.00, 2.40],	// Standart
				   [1.00, 1.05, 1.10, 1.10, 1.20, 1.20, 1.20, 1.20, 1.20, 1.30, 1.30, 1.30, 1.50, 1.50, 1.50, 1.50, 1.70, 1.70, 1.70, 1.90],	// Elegans
				   [1.00, 1.05, 1.10, 1.10, 1.20, 1.20, 1.20, 1.20, 1.20, 1.30, 1.30, 1.30, 1.50, 1.50, 1.50, 1.50, 1.70, 1.70, 1.70, 1.90]	// Presige
				   ];

// Roller STANDART
var rollerStandart = [
					  [8,9,11,12,14,15,16,18,19,21,22,23,25,26,28],		// 40
					  [9,10,12,13,15,16,18,19,21,22,24,25,27,28,30],	// 50 
					  [9,11,12,19,16,17,19,21,22,24,25,27,29,39,32],	// 60
					  [10,11,13,15,17,18,20,22,24,25,27,29,31,33,34],	// 70 
					  [10,12,14,16,18,20,21,23,25,27,29,31,33,35,37],	// 80
					  [11,13,15,17,19,21,23,25,27,29,31,33,35,37,39],	// 90
					  [11,13,15,18,20,22,24,26,28,30,33,35,37,39,41],	// 100
					  [12,14,16,19,21,23,25,28,30,32,34,37,39,41,43],	// 110
					  [12,15,17,19,22,24,27,29,31,34,36,39,41,43,46],	// 120
					  [13,15,18,20,23,25,28,30,33,35,38,40,43,45,48],	// 130
					  [13,16,19,21,24,27,29,32,34,37,40,42,45,48,50],	// 140
					  [14,17,19,22,25,28,30,33,36,39,41,44,47,50,51],	// 150
					  [14,17,20,23,26,29,32,35,37,40,43,46,49,52,55],	// 160
					  [15,18,21,24,27,30,33,36,39,42,45,48,51,54,57],	// 170
					  [16,19,22,25,28,31,34,37,41,44,47,50,53,56,59],	// 180
					  [16,19,23,26,29,32,36,39,42,45,49,52,55,58,62],	// 190
					  [17,20,23,27,30,33,37,40,44,47,50,54,57,60,64],	// 200
					  [17,21,24,28,31,35,38,42,45,49,52,56,59,63,66],	// 210
					  [18,21,25,29,32,36,39,43,47,50,54,57,61,65,68],	// 220
					  [18,22,26,29,33,37,41,44,48,52,56,59,63,67,71],	// 230
					  [19,23,26,30,34,38,42,46,50,54,57,61,65,69,73],	// 240
					  [19,23,27,31,35,39,43,47,51,55,59,63,67,71,75]	// 250
					  ];

var rollerElegans = [
					 [14,16,18,20,22,24,26,28,30,31,33,35,37,39],
					 [15,17,19,21,24,26,28,30,32,34,36,38,40,42],
					 [16,19,21,23,25,27,30,32,34,36,38,40,43,45],
					 [18,20,22,25,27,29,32,34,36,38,41,43,45,48],
					 [19,21,24,26,29,31,33,36,38,41,43,46,48,51],
					 [20,23,25,28,30,33,35,38,41,43,46,48,51,53],
					 [21,24,26,29,32,35,37,40,43,45,48,51,54,56],
					 [22,25,28,31,34,36,39,42,45,48,51,53,56,59],
					 [23,26,29,32,35,38,41,44,47,50,53,56,59,62],
					 [25,28,31,34,37,40,43,46,49,52,55,59,62,65],
					 [26,29,32,35,39,42,45,48,51,55,58,61,64,68],
					 [27,30,34,37,40,44,47,50,54,57,60,64,67,70],
					 [28,31,35,38,42,45,49,52,56,59,63,66,70,73],
					 [29,33,36,40,44,47,51,54,58,62,65,69,72,76],
					 [30,34,38,42,45,49,53,56,60,64,68,71,75,79],
					 [31,35,39,43,47,51,55,59,62,66,70,74,78,82],
					 [33,37,41,45,49,53,57,61,65,69,73,77,81,85],
					 [34,38,42,46,50,54,59,63,67,71,75,79,83,87],
					 [35,39,43,48,52,56,60,65,69,73,77,82,86,90],
					 [36,40,45,49,54,58,62,67,71,76,80,84,89,93],
					 [37,42,46,51,55,60,64,69,73,78,82,87,91,96],
					 [38,43,48,52,57,62,66,71,76,80,85,89,94,99]
					 ];

var rollerPrestige = [
					  [44,47,51,53,56,58,62,66,68],
					  [46,51,53,56,58,63,66,68,72],
					  [48,53,56,58,63,66,70,73,76],
					  [52,56,58,63,66,70,73,77,80],
					  [54,58,62,66,68,73,77,80,85],
					  [57,62,65,68,73,77,80,85,89],
					  [61,65,68,72,76,80,85,89,91],
					  [63,67,72,76,80,83,87,91,96],
					  [66,70,75,79,83,87,91,96],
					  [68,73,77,81,86,90,96,100],
					  [70,76,80,85,90,95,99],
					  [73,79,83,87,94,97]
					  ];

function printOption(option)
{
	for (var i = 0; i < option.length; i++)
	{
		document.write("<option value=" + 'option[i]' + ">"  + option[i] + "</option>");
	}
}

//Receving Info from dropdown menu
function getColor(color)
{
	colorCode = color.selectedIndex;
}
	
function getModel(model)
{
	modelCode = model.selectedIndex;
	var obj = document.getElementById('extrasChk');
	
	if (model.selectedIndex == 0)
	{
		obj.style.visibility = "visible";
		isVisible = true;
	}
	else
	{
		obj.style.visibility = "hidden";
		isVisible = false;
	}
}

function findPrize(arg)
{
	var local = Math.round(Math.ceil(arg)/10);
	
	//local = local / 10;
	local = local - 4;
	
	if(local < 0)
	{
		local = 0;
	}
	
	return local;
}

function CheckBoundories(model, width, height)
{
	var errMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	switch (model)
	{
		case 0:
		if(width > 180 || width < 15 || height > 250 || height < 15)
		{
			alert(errMSG);
		} break;
		
		case 1:
		if(width > 170 || width < 15 || height > 250 || height < 15)
		{
			alert(errMSG);
		}break;
		
		case 2:
		if(width > 120 || width < 40 || height > 150 || height < 40)
		{
			alert(errMSG);
		}break;
	}
}

function printFinalPrice()
{
	var sizeWidth = document.getElementById("sunblindWidth").value; 
	var sizeHeight = document.getElementById("sunblindHeight").value;	
	var discount = 6;	//precent discount
	
	CheckBoundories (modelCode, sizeWidth, sizeHeight);
	
	sizeWidth = findPrize(sizeWidth);
	sizeHeight = findPrize(sizeHeight);
	
	var extras = document.getElementById("extras").checked;
	
	switch(modelCode)
	{
		case 0:
		totalPrice = rollerStandart[sizeHeight][sizeWidth];
		totalPrice *= Coeficient[0][colorCode];
		if(extras == 1)
		{
			totalPrice += 3;
		}break;
		
		case 1:
		totalPrice = rollerElegans[sizeHeight][sizeWidth];
		totalPrice *= Coeficient[1][colorCode];
		break;
		
		case 2:
		totalPrice = rollerPrestige[sizeHeight][sizeWidth];
		totalPrice *= Coeficient[2][colorCode];
		break;
	}
	
	totalPrice -= totalPrice *  (discount /100);
	
	document.getElementById("finalPrice").innerHTML = totalPrice.toFixed(2) + " лв.";
	totalPrice = 0;
	return false;
}