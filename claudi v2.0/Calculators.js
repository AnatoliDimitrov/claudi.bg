// JavaScript Document

//Horizontals MODELS
var horizontalModels = new Array("Пред стъкло","Пред стъкло BO","Между стъкло","Макси стандарт","Макси лукс","Макси BO","Ultimate","Ultimate Мегавю","Ultimate BB24");
function printHorizontalModels()
{
	for (var i = 0; i < horizontalModels.length; i++)
	{
		document.write("<option value=" + 'horizontalModels[i]' + ">"  + horizontalModels[i] + "</option>");
	}
}

//Horizontal COLORS
var horizontalColors = new Array(0);