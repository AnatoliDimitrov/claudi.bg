var promotionList = new Array();
promotionList[0] = "Дограма -10%";
promotionList[1] = "Хоризонтални -8%-13%";
promotionList[2] = "Вертикални -8% -13%";
promotionList[3] = "Руло -6% -13%";
promotionList[4] = "Плисе -6% -13%";
promotionList[5] = "Римски -8% -13%";
promotionList[6] = "Дървени -6% -13%";
promotionList[7] = "Бамбукови -6% -13%";
promotionList[8] = "Външни -6% -33%";
promotionList[9] = "Сенници -7%";
promotionList[10] = "Комарници -30% -33%";
promotionList[11] = "Хармоника -6% -13%";

var promotionLinks = 
[
	'Дограма.html',
	'Хоризонтални-щори.html',
	'Вертикални-щори.html',
	'Руло-щори.html',
	'Плисе-щори.html',
	'Римски-щори.html',
	'Дървени-щори.html',
	'Бамбукови-щори.html',
	'Външни-ролетни-щори.html',
	'Сенници.html',
	'Мрежи-против-насекоми.html',
	'Врати-хармоника.html'
];

function printPromotions()
{
	for (var i = 0; i < 12; i++)
	{
	document.write("<a href=" + promotionLinks[i] + ">" + promotionList[i] + "</a></br>");	//TODO: Make a array for the URL at each link iteration (hhtp://horizontalni.html...)
	}
}