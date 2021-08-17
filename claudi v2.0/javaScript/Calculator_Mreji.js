// JavaScript Document

var colorCode = 0;	//default color
var modelCode = 0; // default model
var totalPrice = 0;
var isVisible = false;

// Prices by different models and colors
var netsContent = ["Статичен", "Ролетен хоризонтален", "Ролетен вертикален", "Балконска врата"]

var netsTable = [ [33, 33, 36, 41.5],	// Static
				  [81.5, 81.5, 96.9, 129.9],	// Roleten horizontal
				  [73.9, 73.9, 90.9, 123],	// Roleten vertical
				  [69.5, 69.5, 85.9, 89.9]	// vrata napr. panti
				 ];

var netsColors = ["Бял", "Кафяв", "Златен Дъб", "Цвят по RAL"];

var profile = [6.4, 6.4, 15.4, 10.3];	// Only Roller

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

//Chencking boundories 
function CheckBoundories(model, width, height)
{
	var sqrtM = width * height  / 10000;
	var isThereError = false;
	var errorMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	
	if (sqrtM > 2.4)
	{
		alert("Зададените размери са извън позволената площ на продукта");
	}
	
	switch(model)
	{
		case 0:	//static 
		if (width < 20 || width > 180 || height < 20 || height > 200)
		{
			isThereError = true;
		} break;
		case 1:	//roller horizontal
		if (width < 30 || width > 160 || height < 30 || height > 240)
		{
			isThereError = true;
		} break;
		case 2:	 //roller vertical
		if (width < 30 || width > 150 || height < 30 || height > 240)
		{
			isThereError = true;
		} break;
		case 3:	// vrata
		if (width < 40 || width > 100 || height < 40 || height > 240)
		{
			isThereError = true;
		} break;
	}
	
	if (isThereError)
	{
		alert(errorMSG);
		
	}
}

function ShowExtras(obj)
{
	obj.style.display = "visible";
}

//Calc the final price
function printFinalPrice()
{
	var sizeWidth = document.getElementById("sunblindWidth").value; 
	var sizeHeight = document.getElementById("sunblindHeight").value;	
	var extras = document.getElementById("extras").checked;
	var squareMeters;
	var pricePerSquareMeter = 0;
	var linearMeters  = 0;
	var discount = 30;	//precent discount
	
	CheckBoundories (modelCode, sizeWidth, sizeHeight);
	
	squareMeters = sizeWidth * sizeHeight / 10000;  
	if (squareMeters < 0.5)
	{
		squareMeters = 0.5;
	}
	 
	linearMeters += (sizeWidth / 100) ;
	linearMeters += (sizeHeight / 100);
	linearMeters = linearMeters * 2;
	
	pricePerSquareMeter = netsTable[modelCode][colorCode];
	totalPrice = totalPrice + ( squareMeters * pricePerSquareMeter );

	if (modelCode == 1 || modelCode == 2)
	{
		totalPrice = totalPrice + (linearMeters * profile[colorCode]);
	}
	if (extras == 1 && modelCode == 0)//&& isVisible == true
	{
		totalPrice = totalPrice + 15.8;
	}
	
	totalPrice -= totalPrice *  (discount /100);
	
	document.getElementById("finalPrice").innerHTML = totalPrice.toFixed(2) + " лв.";
	totalPrice = 0;
	return false;
}





