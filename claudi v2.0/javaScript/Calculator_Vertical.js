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
var vercialColors = [ ["Rococo(12**)", "Polly(94**)", "Marina(90**)", "Beata(96**)", "Silk(21**)", "Vanessa(55**)", "Sanrda(82**)", "Jenny(92**)", "Shantung(SH****)", "Salsa(32*)",
						"Ray(34*)", "Moon(35*)", "Aneta(64**)", "Van Gogh(45**)", "Pasifico(115***)", "Pinstripe(701**)", "Kendo(702**)", "Pharaon(703**)", "Nocturne(704**)",
						"Green Screen ECO(965****)", "Attia(565****)", "Montana(705**)"],	//89
					  ["Corra(50**)", "Creppe(51**)", "Fiesta(52**)", "Vanesa(57**)", "Ray(66**)", "Jenny(97**)", "Shantung(SH**)", "Aneta(65**)", "Itaca(14**)", "Tokio(16**)", 
						"Van Gogh(69**)", "Dunes(36**)", "Yukon(YU****)", "Mountain(74**)", "Green Screen ECO(960****)", "Screen(10***)"],	//127
					  ["Бяла(0150)", "Слонова кост(4459)", "Сребриста(7113)", "Сива(7010)", "Крем(4451)", "Мед(7418)", "Светло синя(2850)", "Сива перла(9770)", "Крем перла(9253)",
						"Бяла перф.(0150P)", "Черна перф.(1858P)", "Слонова кост перф.(4459P)", "Сребриста перф.(7113P)", "Сива перф.(7010P)", "Крем перф.(4451P)", "Фладер(8592)", "Фладер орех(8595)"]	//AL
					 ];

var verticalTable = [ [6.5, 7.5, 7.9, 8.5, 8.9, 8.9, 8.9, 8.9, 8.9, 9.6, 9.6, 9.6, 9.95, 10.9, 19.9, 24.9, 28.9, 28.9, 36.9, 32.9, 34.9, 62.9],	// 89mm
					  [6.5, 6.5, 7.0, 7.9, 7.9, 7.9, 7.9, 8.5, 10.9, 12.9, 12.9, 14.9, 19.9, 21.9, 21.9, 36.9],	//127mm
					  [27.9, 28.9, 28.9, 29.9, 31.4, 33.9, 33.9, 40.9, 43.9, 45.9, 45.9, 46.6, 46.9, 47.9, 49.4, 64.9, 64.9]	//AL
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
	var discount = 8;	//precent discount
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
	totalPrice = totalPrice + (15.7 * sizeWidth / 100 );
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