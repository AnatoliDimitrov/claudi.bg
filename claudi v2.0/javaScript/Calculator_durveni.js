
//wooden MODELS ---------------------------
var woodModels = new Array("25 мм","50 мм");
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
	
function getModel(model)
{
	modelCode = model.selectedIndex;	//models are thw rows in  horizontalTable
}

function checkBoundories(model, width, height)
{
	var errorMSG = "Зададените размери са извън позволената площ на продукта";
	var sqrtMeters = width * height / 10000;
	if(model == 0)
	{
		if(width < 30 || width > 240 || height < 45 || height > 300)
		{
			alert(errorMSG);
		}
	}
	else
	{
		if(width < 45 || width > 240 || height < 45 || height > 400)
		{
			alert(errorMSG);
		}
	}
	
	if(sqrtMeters > 4)
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
	var colorGroup;
	var StrVodeneChk = document.getElementById("stranichnoVodene").checked;

	squareMeters = sizeWidth * sizeHeight / 10000;  
	if (squareMeters < 0.5)
	{
		squareMeters = 0.5;
	}
	
	checkBoundories(modelCode, sizeWidth, sizeHeight);
	
	if (StrVodeneChk == 1)
	{
		totalPrice = totalPrice + 0;
	}
	
	if(modelCode == 0)
	{
		pricePerSquareMeter = 119;
	}
	else
	{
		pricePerSquareMeter = 149;
	}
	
	totalPrice = squareMeters * pricePerSquareMeter ;
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


