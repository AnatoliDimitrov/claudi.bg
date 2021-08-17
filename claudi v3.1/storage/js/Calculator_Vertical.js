// JavaScript Document
var selectedVerticalType;
//Gettign values ffrom sizes form for Horizontals and Verticals and Prints the result
var colorCode = 0;	//default color
var modelCode = 0; // default model
var totalPrice = 0;
var selctedVerical = 0;

// Vertical MODELS ----------------------------
var verticalModels = ["89 мм", "127 мм", "AL 89"];
// VEtical COLORS
var vercialColors = [  ["Rococo(12**)",
                        "Polly(94**)",
						"Beata(96**)",
						"Melisa(15**)",
						"Vanessa(55**)",
						"Sandra(82**)",
						"Jenny(92**)",
						"Ray(34*)",
						"Moon(35*)",
						"Van Gogh(45**)", 
						"Silk(21**)",
						"Pasifico(115***)",
						"Waffle(730**)",
						"Melisa Blackout(54**)",
						"Guardian (720**)", 
						"Antares(105****)",
						"Chats(700**)",
						"Mineral(731**)",
						"Banbury(728**)",
						"Strata SPC(715**)",
						"Juno Blackout(112****)",
						"Coral(732**)",
						"Zeta(733**)",
						"Print(734**)",
						"Green Screen ECO(965****)",
						"Vision Blackout(113****)",
						"Oslo(729**)",
						"Newport(735**)",
						"Hampton(736**)",
						"Montana(705**)"],	//89
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
					  "Mountain(74**)",
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

var verticalTable = [ [6.9, 7.9, 8.9, 8.9, 9.5, 9.5, 9.5, 9.5, 9.5, 9.5, 10.5, 14.9, 15.9, 18.5, 20.9, 24.5, 26.9, 29.9, 29.9, 29.9, 31.9, 31.9, 31.9, 34.9, 36.9, 38.9, 38.9, 41.9, 45.9, 69.9],	// 89mm
					  [6.9, 7.9, 8.5, 8.5, 8.9, 9.9, 9.9, 10.9, 10.9, 10.9, 25.9, 33.9, 39.9],	//127mm
					  [33.9, 34.9, 34.9, 36.9, 38.9, 42.9, 55.9, 55.9, 58.9, 58.9, 58.9, 61.9]	//AL
					 ]

//Prints an option TAG whit argument gived
function printElement(array, index)
{
	document.write(array[index]);
}

function getVerticalType(model)
{
	var type = model.selectedIndex;
	switch(type)
	{
		case 0:
		selectedVerticalType = "Калкулатор-вертикални-щори.html";
		break;
		
		case 1:
		selectedVerticalType = "Калкулатор-вертикални-щори127.html";
		break;
		
		case 2:
		selectedVerticalType = "Калкулатор-вертикални-щориAL.html";
		break;
	}
	return selectedVerticalType;
}

function printOption(option)
{
	for (var i = 0; i < option.length; i++)
	{
		document.write("<option value=" + 'option[i]' + ">"  + option[i] + "</option>");
	}
}

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
	var errorMSG_ = "Зададените размери са извън позволената площ на продукта";
	
	switch(model)
	{
		case 0:
		case 2:
		case 1:	
		if (width < 20 || width > 600 || height < 20 || height > 500)
		{
			alert(errorMSG);
		}break;
	}
	
	if ( (width * height)/ 10000  > 20)
	{
		alert(errorMSG_);
	}
}

function printFinalPrice(fromModels)
{
	var sizeWidth = document.getElementById("sunblindWidth").value; 
	var sizeHeight = document.getElementById("sunblindHeight").value;	
	var squareMeters;
	var pricePerSquareMeter = 0;
	var discount = 6;	//precent discount
	var colorGroup;

	squareMeters = sizeWidth * sizeHeight / 10000;  
	if (squareMeters < 0.5)
	{
		squareMeters = 0.5;
	}
	// checking the boundories
	
	checkBoundories(modelCode, sizeWidth, sizeHeight);
	
	pricePerSquareMeter = fromModels[modelCode][colorCode];
	totalPrice = totalPrice + ( squareMeters * pricePerSquareMeter );
	totalPrice = totalPrice + (16.5 * sizeWidth / 100 );
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