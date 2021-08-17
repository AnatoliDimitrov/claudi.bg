
//wooden MODELS ---------------------------
var models = new Array("Стандарт");
var colors = ["N118", "N124", "L100", "L123", "L124", "L129", "L134", "L136", "L140", "L150"];
var colorCode = 0;	//default color
var modelCode = 0; // default model
var totalPrice = 0;

function printOption(option)
{
	for (var i = 0; i < option.length; i++)
	{
		document.write("<option value=" + 'option[i]' + ">"  + option[i] + "</option>");
	}
}
	
function getColor(color)
{
	colorCode = color.selectedIndex;	//models are thw rows in  horizontalTable
}

function checkBoundories(width, height)
{
	var errorMSG = "Зададените размери са извън позволената площ на продукта";
	var sqrtMeters = width * height / 10000;
	
	if(width < 40 || width > 400 || height < 30 || height > 253)
	{
		alert(errorMSG);
	}
	
	
	if(sqrtMeters > 8)
	{
		alert(errorMSG);
	}
}

function printFinalPrice()
{
	var sizeWidth = document.getElementById("sunblindWidth").value; 
	var sizeHeight = document.getElementById("sunblindHeight").value;	
	var squareMeters;
	var pricePerSquareMeter = 0;
	var discount = 6;	//precent discount
	var brava = document.getElementById("brava").checked;

	squareMeters = sizeWidth * sizeHeight / 10000;  
	if (squareMeters < 0.5)
	{
		squareMeters = 0.5;
	}
	
	checkBoundories(sizeWidth, sizeHeight);
	
	if(colorCode == 0 || colorCode == 1)
	{
		pricePerSquareMeter = 64;
	}
	else
	{
		pricePerSquareMeter = 88;
	}
	
	totalPrice = squareMeters * pricePerSquareMeter ;
	
	if(brava == 1)
	{
		totalPrice +=  19.90;
	}
	
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


