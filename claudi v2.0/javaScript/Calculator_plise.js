// JavaScript Document
var colorCode = 0;	//default color
var modelCode = 0; // default model
var totalPrice = 0;

var models = ["BB 10", "BB 15", "BB 30", "A0 10", "A0 30", "A0 70", "BF 50", "BF 51",
			  "BB 20", "BB 24", "A0 20", "B0 10", "B0 75", "BB 40", "A0 40"];

var colors = ["Uno(542****)", "Crepe Topar Plus(515****)", "Uno DustBlock(520****)", "Horizon(524****)", "Crush DustBlock(521****)", 
			  "Attia(480****)", "Textura Silk Topar Plus(530****)", "Bamboo(247****)", "Moondust(541****)", "Duette(025****)",
			  "Sixties(507****)", "Grass(528****)", "Crepe Metal FR(443****)", "Duette Fixe(071****)", "Duette Fixe Flow(073****)",
			  "Estrella Topar Titan(403****)", "Skaters Topar Titan(531****)", "Fairy Tale Topar Titan(532****)", "Duette Fixe 25mm BO(072****)"];

var pliseTable10 = [
						[31,36,40,45,49,54,59,63,68,72,77,81,86,90,95,100,104,109,113],
						[31,36,41,45,50,59,64,68,73,77,82,87,91,96,101,105,110,114,119],
						[36,41,45,50,55,59,64,73,78,83,87,92,97,101,110,115,120,124,129],
						[36,41,46,55,60,64,69,78,83,88,92,97,106,111,116,125,130,134,139],
						[37,46,50,55,60,69,74,79,88,93,98,107,112,116,126,130,135,140,149],
						[41,46,51,60,65,70,79,84,89,98,103,108,117,122,131,136,141,150,155],
						[41,46,56,61,65,75,80,89,94,103,108,113,122,127,137,142,151,156,165],
						[42,51,56,65,70,80,85,94,99,108,113,123,128,137,142,151,156,166,171],
						[42,51,56,66,71,80,90,95,104,109,119,124,133,142,148,157,162,171,177],
						[46,52,61,66,76,85,90,100,109,114,124,129,138,148,153,162,172,177,187],
						[47,56,61,71,80,90,95,105,110,120,129,139,144,153,163,168,178,187,192],
						[47,57,66,76,81,91,100,110,115,125,134,144,153,159,168,178,187,193,202],
						[47,57,67,76,86,95,101,111,120,130,139,145,154,164,174,183,193,198,208],
						[52,62,67,77,86,96,106,116,125,135,145,150,164,170,179,189,199,208,218],
						[52,62,72,81,91,101,111,121,130,140,150,155,169,179,189,199,209,214,224],
						[52,62,72,82,92,102,111,121,131,141,151,161,175,185,190,204,214,220,230],
						[57,67,77,87,97,106,116,126,136,146,156,166,180,190,200,210,220,230,240],
						[57,67,77,87,97,111,121,131,141,151,161,171,186,196,206,216,225,240,250],
						[57,67,78,92,102,112,122,136,146,156,167,177,191,201,211,221,235,245,0],
						[58,72,82,92,102,117,127,137,147,162,172,182,196,206,216,231,241,251,0],
						[62,72,83,97,107,122,132,142,152,167,177,187,202,212,226,236,247,0,0],
						[62,73,83,98,108,122,133,143,157,168,182,192,203,217,227,242,0,0,0]
						];

var pliseTable20 = [
						[43,51,56,60,69,73,77,86,90,95,99,108,112,121,125,129,138,142,147],
						[47,51,56,65,69,78,82,86,91,99,104,108,117,121,130,134,143,147,152],
						[47,52,60,65,73,78,87,91,95,104,109,117,122,130,135,143,148,152,161],
						[47,56,61,69,74,83,91,96,100,109,118,122,131,135,144,153,157,166,170],
						[52,56,65,70,78,87,92,100,105,114,122,127,136,144,149,158,166,171,180],
						[52,61,65,74,79,87,96,101,110,118,123,132,141,145,154,163,172,176,185],
						[52,61,70,74,83,92,101,106,114,123,128,137,145,154,159,168,177,185,190],
						[56,61,70,79,88,97,101,110,119,128,137,141,150,159,168,177,186,191,199],
						[57,66,70,79,88,97,106,115,120,133,137,146,155,164,173,182,191,196,205],
						[57,66,75,84,93,102,111,115,124,133,142,151,160,169,178,187,196,205,214],
						[57,66,75,84,93,106,111,120,129,138,147,156,169,174,183,196,205,210,219],
						[61,70,79,89,98,107,116,125,134,143,152,161,174,183,192,201,210,219,228],
						[62,71,80,89,98,111,120,129,138,148,157,166,175,188,197,206,215,224,233],
						[62,71,80,93,102,112,121,134,143,152,161,171,184,193,202,211,225,234,243],
						[66,75,84,94,107,116,125,134,148,157,166,175,189,198,207,220,230,239,248],
						[66,75,85,98,107,121,130,139,148,162,171,180,194,203,212,225,235,244,257],
						[66,76,89,98,112,121,130,144,153,167,176,185,199,208,217,230,244,253,262],
						[67,80,89,103,112,126,135,149,158,171,181,190,203,217,226,240,249,258,272],
						[71,80,90,103,117,126,140,149,158,172,185,195,208,218,231,245,255,268,0],
						[71,81,94,108,117,131,144,154,163,177,190,200,213,227,236,250,263,273,0],
						[71,85,94,108,122,135,145,158,168,181,195,204,218,232,241,259,268,0,0],
						[71,85,99,108,122,136,149,159,172,186,196,209,223,232,246,260,0,0,0]
						];

var Coeficient = [1.00,1.10,1.30,1.40,1.50,1.60,1.90,2.10];

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

	if(width > 220 || width < 20 || height > 250 || height < 20)
	{
		alert(errMSG);
	}
}

function printFinalPrice()
{
	var errMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	var sizeWidth = document.getElementById("sunblindWidth").value; 
	var sizeHeight = document.getElementById("sunblindHeight").value;	
	var discount = 6;	//precent discount
	
	CheckBoundories (modelCode, sizeWidth, sizeHeight);
	
	sizeWidth = findPrize(sizeWidth);
	sizeHeight = findPrize(sizeHeight);
	
	if (modelCode < 8)
	{
		totalPrice += pliseTable10[sizeHeight][sizeWidth];
		if(totalPrice == 0)
		{
			alert(errMSG);
		}
	}
	else
	{
		totalPrice += pliseTable20[sizeHeight][sizeWidth];
		if(totalPrice == 0)
		{
			alert(errMSG);
		}
	}
	
	var group ;
	switch(colorCode)
	{
		case 0:
		group = 0;
		break
		
		case 1:
		case 2:
		group = 1;
		break
		
		case 3:
		group = 2;
		break
		
		case 4:
		case 5:
		case 6:
		group = 3;
		break
		
		case 7:
		case 8:
		case 9:
		group = 4;
		break	
		
		case 10:
		case 11:
		case 12:
		case 13:
		case 14:
		group = 5;
		break
		
		case 15:
		case 16:
		case 17:
		group = 6;
		break
		
		default:
		group = 7;
		break	
	}
	
	totalPrice *= Coeficient[group];
	
	totalPrice -= totalPrice *  (discount /100);
	
	document.getElementById("finalPrice").innerHTML = totalPrice.toFixed(2) + " лв.";
	totalPrice = 0;
	return false;
}