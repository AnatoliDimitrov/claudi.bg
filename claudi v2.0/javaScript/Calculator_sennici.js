
var colorCode = 0;	//default color
var modelCode = 0; // default model
var totalPrice = 0;

var models = ["Стандарт(Чупещо рамо)", "Елеганс(Чупещо рамо)", "Вера(Чупещо рамо)", "Престиж(Чупещо рамо)", "Класик(Падащо рамо)",
 			"Смарт(Падащо рамо)", "Кабрио", "Балконски(Ветроупорен)", "Кристал(Ветроупорен)", "Широкоплощен(Ветроупорен)"];

var colors = ["Breza(Акрилен)", "Sattler(Акрилен)", "PVC"];

/*
var sennikStandartPvc = 
[
[411,436,475,513,539,578,659],	// 0
[0,471,513,555,581,623,708],
[0,0,551,597,623,711,757],
[0,0,0,638,708,757,806]
];

var sennikStandartBreza = //
[
[436,481,526,552,616,641,729], 
[0,526,576,602,675,701,794],
[0,0,625,652,735,804,859],
[0,0,0,703,837,864,924]
];

var sennikStandartSattler = //
[
[471,524,578,604,685,711,807],
[0,579,640,666,760,787,890],
[0,0,701,728,836,905,972],
[0,0,0,790,954,981,1055]
];

var sennikElegansBreza = // 3
[
[547,598,648,679,749,780,876,1027,1134,1184,1235],
[0,649,704,736,815,846,947,1117,1224,1280,1449],
[0,0,766,797,886,964,1024,1214,1368,1428,1489],
[0,0,0,854,998,1030,1096,1350,1458,1524,1635],
[0,0,0,0,1141,1174,1289,1360,1515,1779,0],
[0,0,0,0,0,1278,1399,1474,1629,0,0]
];

var sennikElegansSattler = //
[
[583,642,701,732,820,851,956,1116,1223,1282,1341],
[0,703,770,801,902,934,1045,1226,1333,1400,1580],
[0,0,843,875,990,1067,1140,1344,1497,1571,1644],
[0,0,0,944,1118,1150,1230,1499,1608,1688,1814],
[0,0,0,0,1276,1309,1442,1529,1684,1966,0],
[0,0,0,0,0,1430,1570,1664,1819,0,0]
];

var sennikVeraBreza = // 5
[
[845,948,1051,1134,1256,1339,1442],
[0,0,1134,1218,1349,1433,1541],
[0,0,0,1304,1445,1529,1642],
[0,0,0,0,1538,1623,1740]
];

var sennikVeraSattler = //
[
[881,993,1104,1187,1327,1410,1522],
[0,0,1199,1283,1437,1512,1639],
[0,0,0,1382,1548,1633,1758],
[0,0,0,0,1658,1742,1875]
];

var sennikPrestigeBreza = // 7 
[
[1018,1200,1321,1422,1562,1663,1858,1979,2340,2461,2582],
[0,1263,1389,1491,1640,1742,1867,2067,2448,2574,2774],
[0,0,1461,1563,1722,1898,2029,2160,2637,2767,2898],
[0,0,0,1701,1870,1973,2108,2318,2421,2874,0]
];

var sennikPrestigeSattler = //
[
[1115,1245,1374,1475,1633,1735,1938,2068,2429,2559,2687],
[0,1318,1454,1556,1727,1829,1966,2176,2557,2694,2904],
[0,0,1539,1641,1826,2002,2145,2289,2766,2909,3053],
[0,0,0,1791,1989,2092,2243,2467,2570,3038,0]
];

var sennikClasicPvc = // 9 
[
[316,341,366,383,408,432,450,484,509],
[330,358,386,404,432,460,477,519,547],
[345,376,407,425,456,487,505,554,585],
[362,396,430,448,483,517,535,592,627],
[374,412,449,467,505,542,560,624,661]
];

var sennikClasicBreza = //
[
[354,352,381,398,426,455,472,511,539],
[341,374,407,425,458,491,508,555,589],
[358,396,434,451,489,527,545,600,638],
[378,420,463,481,523,565,583,649,691],
[393,440,487,506,552,599,618,691,738]
];

var sennikClasicSattler = //
[
[334,368,401,418,452,486,503,547,580],
[355,395,435,453,493,533,551,605,645],
[376,423,470,488,534,581,599,664,711],
[400,453,507,525,578,632,650,726,780],
[419,479,539,558,618,678,696,782,842]
];	
		
var sennikSmartBreza = 	// 12
[
[404,462,521,567,626,684,823,881,940],
[421,484,547,594,657,720,863,926,989],
[439,506,574,621,689,756,904,971,1039],
[458,530,603,650,722,794,948,1020,1092],
[474,550,627,675,752,828,985,1061,1138]
];	

var sennikSmartSattler = //
[
[414,478,541,588,651,715,854,917,981],
[435,505,575,623,693,762,906,976,1046],
[457,533,610,657,734,810,958,1035,1111],
[481,564,647,694,778,861,1014,1097,1180],
[500,589,679,727,817,906,1063,1152,1242]
];		
				
var sennikKabrioPvc = // 14 
[
[280,315,361,396,430,476,511,545],
[373,408,444,500,535,571,626,662],
[454,519,555,592,657,693,758,0],
[571,609,683,721,795,833,0,0]	
];					
							
var sennikKabrioBreza = //
[
[295,348,382,417,470,505,558,592],
[410,445,513,548,616,652,719,755],
[551,588,670,707,789,826,862,0],
[720,758,854,892,930,1026,0,0]	
];

var sennikKabrioSattler = //
[
[312,374,409,443,505,540,602,637],
[455,491,574,609,692,728,811,846],
[638,675,778,815,919,956,992,0],	
[860,898,1023,1060,1098,1223,0,0]		
];

var sennikBalkonskiPvc = // 17
[
[231,258,286,301,328,356,371,451,479,494,521]
];									

var sennikBalkonskiBreza = 	//
[
[243,277,311,345,379,394,446,514,548,582,597]
];									

var sennikBalkonskiSattler = //
[
[261,304,347,390,432,448,518,586,629,671,686]
];	

var sennikKristal = // 20 one prize for every color !!!!!!!!!
[
[198,253,308,363,419,474,529,585,640],
[223,290,358,426,494,561,629,697,765],
[248,328,408,488,569,649,729,809,0],
[273,365,458,551,643,836,829,0,0]
];

var sennikShirokoploshtenPvc = //  21
[
[757,804,851,878,1135,1182,1209,1333,1544,1571],
[791,841,891,919,1189,1240,1268,1395,1619,1647],
[824,878,932,961,1244,1297,1326,1457,1694,0],
[858,915,973,1002,1298,1355,1384,1519,0,0],	
[892,953,1014,1043,1352,1413,0,0,0,0],		
[925,990,1054,1085,1407,0,0,0,0,0]		
];

var sennikShirokoploshtenBreza = // 
[
[795,881,908,994,1231,1287,1344,1449,1669,1725],
[835,930,958,1053,1300,1362,1423,1529,1763,1825],
[875,979,1008,1112,1370,1436,1503,1609,1858,0],
[915,1028,1058,1172,1439,1511,1582,1689,0,0],
[954,1078,1107,1231,1508,1585,0,0,0,0],	
[994,1127,1157,1290,1578,0,0,0,0,0]	
];

var sennikShirokoploshtenSattler = 
[
[848,959,987,1098,1336,1405,1475,1580,1813,1882],
[896,1021,1049,1174,1422,1498,1575,1680,1930,2007],
[944,1082,1111,1250,1507,1591,1675,1781,2047,0],
[992,1144,1173,1326,1593,1684,1775,1881,0,0],
[1039,1205,1235,1401,1679,1777,0,0,0,0],
[1087,1267,1297,1477,1765,0,0,0,0,0]		
];
*/

var modelsTable = 
[
	[
	[436,481,526,552,616,641,729], 
	[0,526,576,602,675,701,794],
	[0,0,625,652,735,804,859],
	[0,0,0,703,837,864,924]
	],
	[
	[471,524,578,604,685,711,807],
	[0,579,640,666,760,787,890],
	[0,0,701,728,836,905,972],
	[0,0,0,790,954,981,1055]
	],
	[
	[411,436,475,513,539,578,659],	
	[0,471,513,555,581,623,708],
	[0,0,551,597,623,711,757],
	[0,0,0,638,708,757,806]
	],
	[
	[547,598,648,679,749,780,876,1027,1134,1184,1235],
	[0,649,704,736,815,846,947,1117,1224,1280,1449],
	[0,0,766,797,886,964,1024,1214,1368,1428,1489],
	[0,0,0,854,998,1030,1096,1350,1458,1524,1635],
	[0,0,0,0,1141,1174,1289,1360,1515,1779,0],
	[0,0,0,0,0,1278,1399,1474,1629,0,0]
	],
	[
	[583,642,701,732,820,851,956,1116,1223,1282,1341],
	[0,703,770,801,902,934,1045,1226,1333,1400,1580],
	[0,0,843,875,990,1067,1140,1344,1497,1571,1644],
	[0,0,0,944,1118,1150,1230,1499,1608,1688,1814],
	[0,0,0,0,1276,1309,1442,1529,1684,1966,0],
	[0,0,0,0,0,1430,1570,1664,1819,0,0]
	],
	[
	[845,948,1051,1134,1256,1339,1442],
	[0,0,1134,1218,1349,1433,1541],
	[0,0,0,1304,1445,1529,1642],
	[0,0,0,0,1538,1623,1740]
	],
	[
	[881,993,1104,1187,1327,1410,1522],
	[0,0,1199,1283,1437,1512,1639],
	[0,0,0,1382,1548,1633,1758],
	[0,0,0,0,1658,1742,1875]
	],
	[
	[1080,1200,1321,1422,1562,1663,1858,1979,2340,2461,2582],
	[0,1263,1389,1491,1640,1742,1867,2067,2448,2574,2774],
	[0,0,1461,1563,1722,1898,2029,2160,2637,2767,2898],
	[0,0,0,1701,1870,1973,2108,2318,2421,2874,0]
	],
	[
	[1115,1245,1374,1475,1633,1735,1938,2068,2429,2559,2687],
	[0,1318,1454,1556,1727,1829,1966,2176,2557,2694,2904],
	[0,0,1539,1641,1826,2002,2145,2289,2766,2909,3053],
	[0,0,0,1791,1989,2092,2243,2467,2570,3038,0]
	],
	[
	[354,352,381,398,426,455,472,511,539],
	[341,374,407,425,458,491,508,555,589],
	[358,396,434,451,489,527,545,600,638],
	[378,420,463,481,523,565,583,649,691],
	[393,440,487,506,552,599,618,691,738]
	],
	[
	[334,368,401,418,452,486,503,547,580],
	[355,395,435,453,493,533,551,605,645],
	[376,423,470,488,534,581,599,664,711],
	[400,453,507,525,578,632,650,726,780],
	[419,479,539,558,618,678,696,782,842]
	],
	[
	[316,341,366,383,408,432,450,484,509],
	[330,358,386,404,432,460,477,519,547],
	[345,376,407,425,456,487,505,554,585],
	[362,396,430,448,483,517,535,592,627],
	[374,412,449,467,505,542,560,624,661]
	],
	[
	[404,462,521,567,626,684,823,881,940],
	[421,484,547,594,657,720,863,926,989],
	[439,506,574,621,689,756,904,971,1039],
	[458,530,603,650,722,794,948,1020,1092],
	[474,550,627,675,752,828,985,1061,1138]
	],
	[
	[414,478,541,588,651,715,854,917,981],
	[435,505,575,623,693,762,906,976,1046],
	[457,533,610,657,734,810,958,1035,1111],
	[481,564,647,694,778,861,1014,1097,1180],
	[500,589,679,727,817,906,1063,1152,1242]
	],
	[
	[295,348,382,417,470,505,558,592],
	[410,445,513,548,616,652,719,755],
	[551,588,670,707,789,826,862,0],
	[720,758,854,892,930,1026,0,0]
	],
	[
	[312,374,409,443,505,540,602,637],
	[455,491,574,609,692,728,811,846],
	[638,675,778,815,919,956,992,0],	
	[860,898,1023,1060,1098,1223,0,0]
	],
	[
	[280,315,361,396,430,476,511,545],
	[373,408,444,500,535,571,626,662],
	[454,519,555,592,657,693,758,0],
	[571,609,683,721,795,833,0,0]
	],
	[
	[243,277,311,345,379,394,446,514,548,582,597]
	],
	[
	[261,304,347,390,432,448,518,586,629,671,686]
	],
	[
	[231,258,286,301,328,356,371,451,479,494,521]
	],
	[
	[198,253,308,363,419,474,529,585,640],
	[223,290,358,426,494,561,629,697,765],
	[248,328,408,488,569,649,729,809,0],
	[273,365,458,551,643,836,829,0,0]
	],
	[
	[795,881,908,994,1231,1287,1344,1449,1669,1725],
	[835,930,958,1053,1300,1362,1423,1529,1763,1825],
	[875,979,1008,1112,1370,1436,1503,1609,1858,0],
	[915,1028,1058,1172,1439,1511,1582,1689,0,0],
	[954,1078,1107,1231,1508,1585,0,0,0,0],	
	[994,1127,1157,1290,1578,0,0,0,0,0]
	],
	[
	[848,959,987,1098,1336,1405,1475,1580,1813,1882],
	[896,1021,1049,1174,1422,1498,1575,1680,1930,2007],
	[944,1082,1111,1250,1507,1591,1675,1781,2047,0],
	[992,1144,1173,1326,1593,1684,1775,1881,0,0],
	[1039,1205,1235,1401,1679,1777,0,0,0,0],
	[1087,1267,1297,1477,1765,0,0,0,0,0]
	],
	[
	[757,804,851,878,1135,1182,1209,1333,1544,1571],
	[791,841,891,919,1189,1240,1268,1395,1619,1647],
	[824,878,932,961,1244,1297,1326,1457,1694,0],
	[858,915,973,1002,1298,1355,1384,1519,0,0],	
	[892,953,1014,1043,1352,1413,0,0,0,0],		
	[925,990,1054,1085,1407,0,0,0,0,0]
	]
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
	document.getElementById('sunblindHeight').disabled = false;
	document.getElementById('sunblindHeight').value = '';
	switch(modelCode)
	{
		case 1:
		case 2:
		case 3:
		case 5:
		document.getElementById("sennikPvc").disabled = "true";
		break;
		
		case 7:
		// The lenght is olny 200 cm and the field is disabled
		document.getElementById('sunblindHeight').value = 200;
		document.getElementById('sunblindHeight').disabled = true;
		break;
		
		default:
		document.getElementById("sennikPvc").disabled = false;
		break;
	}
}

// MAXIMUM
function throwMaxLenghtExeption(wOrH, maximum)
{
	var maxWidth = "Масималната ширна на този сенник е ";
	var maxHeight = "Максималната височина(напред) на този сенник е ";
	if(wOrH == 0)	// Width
	{
		alert(maxWidth + maximum + ' cm.');
	}
	else	// e.g. 1 -> height
	{
		alert(maxHeight + maximum + ' cm.');
	}
}

// MINIMUM
function throwMinLenghtExeption(minimum)
{
	var minWidth = "Минималната ширна на този сенник е ";
	alert(minWidth + minimum + ' cm.');
}

function findTable(model, color)
{
	var tableIndex = 0;
	switch(model)
	{
		case 0:
		tableIndex = 0;
		break;
		
		case 1:
		tableIndex = 3;
		break;
		
		case 2:
		tableIndex = 5;
		break;
		
		case 3:
		tableIndex = 7;
		break;
		
		case 4:
		tableIndex = 9;
		break;
		
		case 5:
		tableIndex = 12;
		break;
		
		case 6:
		tableIndex = 14;
		break;
		
		case 7:
		tableIndex = 17;
		break;
		
		case 8:
		tableIndex = 20; // !!!
		break;
		
		case 9:
		tableIndex = 21;
		break;

	}
	
	if(model != 8)
	{
	tableIndex += color;
	}
	
	return tableIndex;
}

function findPrizeClasicAndSmart(height, width)
{
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode,colorCode);
	//-------- Width Parameters
	if(width < 70)
	{
		throwMinLenghtExeption(70);
	}
	if(width > 500)
	{
		throwMaxLenghtExeption(0,500);
		return 1;
	}
	if(width > 450)
	{
		col = 8;
	}
	else if(width > 400)
	{
		col = 7;
	}
	else if(width > 350)
	{
		col = 6;
	}
	else if(width > 300)
	{
		col = 5;
	}
	else if(width > 250)
	{
		col = 4;
	}
	else if(width > 200)
	{
		col = 3;
	}
	else if(width > 150)
	{
		col = 2;
	}
	else if(width > 100)
	{
		col = 1;
	}
	else
	{
		col = 0;
	}
	//------- Lenght/Height Parameters
	if(height > 150)
	{
		throwMaxLenghtExeption(1,150);
		return 1;
	}
	if(height > 125)
	{
		row = 4;
	}
	else if(height > 100)
	{
		row = 3;
	}
	else if(height > 75)
	{
		row = 2;
	}
	else if(height > 50)
	{
		row = 1;
	}
	else
	{
	row = 0;
	}
	
	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeStandartAndVera(height, width)
{
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode,colorCode);
	//-------- Width Parameters
	if(width < 185)
	{
		throwMinLenghtExeption(185);
	}
	if(width > 500)
	{
		throwMaxLenghtExeption(0,500);
		return 1;
	}
	if(width > 450)
	{
		col = 6;
	}
	else if(width > 400)
	{
		col = 5;
	}
	else if(width > 350)
	{
		col = 4;
	}
	else if(width > 300)
	{
		col = 3;
	}
	else if(width > 250)
	{
		col = 2;
	}
	else if(width > 200)
	{
		col = 1;
	}
	else
	{
		col = 0;
	}
	//------- Lenght/Height Parameters
	if(height < 150 || height > 300)
	{
		throwMaxLenghtExeption(1,300);
		return 1;
	}
	if(height > 250)
	{
		row = 3;
	}
	else if(height > 200)
	{
		row = 2;
	}
	else if(height > 150)
	{
		row = 1;
	}
	else
	{
	row = 0;
	}
	
	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeElegans(height,width)
{
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode,colorCode);
	//-------- Width Parameters
	if(width < 185)
	{
		throwMinLenghtExeption(185);
	}
	if(width > 700)
	{
		throwMaxLenghtExeption(0,700);
		return 1;
	}
	
	if(width > 650)
	{
		col = 10;
	}
	else if(width > 600)
	{
		col = 9;
	}
	else if(width > 550)
	{
		col = 8;
	}
	else if(width > 500)
	{
		col = 7;
	}
	else if(width > 450)
	{
		col = 6;
	}
	else if(width > 400)
	{
		col = 5;
	}
	else if(width > 350)
	{
		col = 4;
	}
	else if(width > 300)
	{
		col = 3;
	}
	else if(width > 250)
	{
		col = 2;
	}
	else if(width > 200)
	{
		col = 1;
	}
	else
	{
		col = 0;
	}
	//------- Lenght/Height Parameters
	if(height > 400)
	{
		throwMaxLenghtExeption(1,400);
		return 1;
	}
	
	if(height > 350)
	{
		row = 5;
	}
	else if(height > 300)
	{
		row = 4;
	}
	else if(height > 250)
	{
		row = 3;
	}
	else if(height > 200)
	{
		row = 2;
	}
	else if(height > 150)
	{
		row = 1;
	}
	else
	{
	row = 0;
	}
	
	total = modelsTable[dimention][row][col];
	return total;	
}

function findPrizePrestige(height,width)
{
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode,colorCode);
	//-------- Width Parameters
	if(width < 185)
	{
		throwMinLenghtExeption(185);
	}
	if(width > 700)
	{
		throwMaxLenghtExeption(0,700);
		return 1;
	}
	
	if(width > 650)
	{
		col = 10;
	}
	else if(width > 600)
	{
		col = 9;
	}
	else if(width > 550)
	{
		col = 8;
	}
	else if(width > 500)
	{
		col = 7;
	}
	else if(width > 450)
	{
		col = 6;
	}
	else if(width > 400)
	{
		col = 5;
	}
	else if(width > 350)
	{
		col = 4;
	}
	else if(width > 300)
	{
		col = 3;
	}
	else if(width > 250)
	{
		col = 2;
	}
	else if(width > 200)
	{
		col = 1;
	}
	else
	{
		col = 0;
	}
	//------- Lenght/Height Parameters
	if(height > 300)
	{
		throwMaxLenghtExeption(1,300);
		return 1;
	}
	if(height > 250)
	{
		row = 3;
	}
	else if(height > 200)
	{
		row = 2;
	}
	else if(height > 150)
	{
		row = 1;
	}
	else
	{
	row = 0;
	}
	
	total = modelsTable[dimention][row][col];
	return total;	
}

function findPrizeCabrio(height,width)
{
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode,colorCode);
	//-------- Width Parameters
	if(width < 70)
	{
		throwMinLenghtExeption(70);
	}
	if(width > 450)
	{
		throwMaxLenghtExeption(0,450);
		return 1;
	}
	else if(width > 400)
	{
		col = 7;
	}
	else if(width > 350)
	{
		col = 6;
	}
	else if(width > 300)
	{
		col = 5;
	}
	else if(width > 250)
	{
		col = 4;
	}
	else if(width > 200)
	{
		col = 3;
	}
	else if(width > 150)
	{
		col = 2;
	}
	else if(width > 100)
	{
		col = 1;
	}
	else
	{
		col = 0;
	}
	//------- Lenght/Height Parameters
	if(height > 200)
	{
		throwMaxLenghtExeption(1,200);
		return 1;
	}
	else if(height > 150)
	{
		row = 3;
	}
	else if(height > 100)
	{
		row = 2;
	}
	else if(height > 50)
	{
		row = 1;
	}
	else
	{
	row = 0;
	}
	
	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeBalkonski(height,width)
{
	// The lenght is olny 200 cm and the field is disabled
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode,colorCode);
	
	if(width < 70)
	{
		throwMinLenghtExeption(70);
	}
	
	if(width > 600)
	{
		throwMaxLenghtExeption(0,600);
		return 1;
	}
	else if(width > 550)
	{
		col = 10;
	}
	else if(width > 500)
	{
		col = 9;
	}
	else if(width > 450)
	{
		col = 8;
	}
	else if(width > 400)
	{
		col = 7;
	}
	else if(width > 350)
	{
		col = 6;
	}
	else if(width > 300)
	{
		col = 5;
	}
	else if(width > 250)
	{
		col = 4;
	}
	else if(width > 200)
	{
		col = 3;
	}
	else if(width > 150)
	{
		col = 2;
	}
	else if(width > 100)
	{
		col = 1;
	}
	else
	{
		col = 0;
	}
	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeShirokoploshten(height,width)
{
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode,colorCode);
	//-------- Width Parameters
	if(width < 100)
	{
		throwMinLenghtExeption(100);
	}
	
	if(width > 700)
	{
		throwMaxLenghtExeption(0,700);
		return 1;
	}
	
	if(width > 650)
	{
		col = 9;
	}
	else if(width > 600)
	{
		col = 8;
	}
	else if(width > 550)
	{
		col = 7;
	}
	else if(width > 500)
	{
		col = 6;
	}
	else if(width > 450)
	{
		col = 5;
	}
	else if(width > 400)
	{
		col = 4;
	}
	else if(width > 350)
	{
		col = 3;
	}
	else if(width > 300)
	{
		col = 2;
	}
	else if(width > 250)
	{
		col = 1;
	}
	else
	{
		col = 0;
	}
	//------- Lenght/Height Parameters
	if(height > 500)
	{
		throwMaxLenghtExeption(1,500);
		return 1;
	}
	else if(height > 450)
	{
		row = 5;
	}	
	else if(height > 400)
	{
		row = 4;
	}
	else if(height > 350)
	{
		row = 3;
	}
	else if(height > 300)
	{
		row = 2;
	}
	else if(height > 250)
	{
		row = 1;
	}
	else
	{
	row = 0;
	}
	
	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeCristal(height,width)
{
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode,colorCode);
	//-------- Width Parameters
	if(width < 70)
	{
		throwMinLenghtExeption(70);
	}
	
	if(width > 500)
	{
		throwMaxLenghtExeption(0,500);
		return 1;
	}
	else if(width > 450)
	{
		col = 8;
	}
	else if(width > 400)
	{
		col = 7;
	}
	else if(width > 350)
	{
		col = 6;
	}
	else if(width > 300)
	{
		col = 5;
	}
	else if(width > 250)
	{
		col = 4;
	}
	else if(width > 200)
	{
		col = 3;
	}
	else if(width > 150)
	{
		col = 2;
	}
	else if(width > 100)
	{
		col = 1;
	}
	else
	{
		col = 0;
	}
	//------- Lenght/Height Parameters
	
	if(height > 300)
	{
		throwMaxLenghtExeption(1,300);
		return 1;
	}
	else if(height > 250)
	{
		row = 3;
	}
	else if(height > 200)
	{
		row = 2;
	}
	else if(height > 150)
	{
		row = 1;
	}
	else
	{
	row = 0;
	}
	
	total = modelsTable[dimention][row][col];
	return total;
}

function CheckBreakingSholder(model, width, height)
{
	var errMSG = "Минимална ширина на сенника = дължина на рамо + 35 см.";
	var errMSG2 = "При рамо 200, 250 или 300 см (за сенник 'Вера') минималната ширина на сенника = дължина на рамо + 60 см."
	if(model == 2)
	{
		if(height <= 150)
		{
			if(width < height + 35)
			{
				alert(errMSG);
			}
		}
		else
		{
			if(width < height + 60)
			{
				alert(errMSG2);
			}
		}
	}
	else
	{
		var minW = height + 35;
		if(width < minW)
		{
			alert(errMSG);
		}
	}
}

function printFinalPrice()
{
	var errMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	var errMsgUnacceptable = "При зададените размери ширината и височината са несъвместими. Моля намалете височината.";
	var sizeWidth = Number(document.getElementById("sunblindWidth").value); 
	var sizeHeight = Number(document.getElementById("sunblindHeight").value);	
	var discount = 7;	//precent discount
	
	//CheckBoundories (modelCode, sizeWidth, sizeHeight);
	
	// Setting the prize for the Total
	switch(modelCode)
	{
		case 0:
		case 2:
		totalPrice = findPrizeStandartAndVera(sizeHeight, sizeWidth);
		CheckBreakingSholder(modelCode, sizeWidth, sizeHeight);
		break;
		
		case 1:
		totalPrice = findPrizeElegans(sizeHeight, sizeWidth);
		CheckBreakingSholder(modelCode, sizeWidth, sizeHeight);
		break;
		
		case 3:
		totalPrice = findPrizePrestige(sizeHeight, sizeWidth);
		CheckBreakingSholder(modelCode, sizeWidth, sizeHeight);
		break;
		
		case 4:
		case 5:
		totalPrice = findPrizeClasicAndSmart(sizeHeight, sizeWidth);
		break;
		
		case 6:
		totalPrice = findPrizeCabrio(sizeHeight, sizeWidth);
		break;
		
		case 7:
		totalPrice = findPrizeBalkonski(sizeHeight, sizeWidth);
		break;
		
		case 8:
		totalPrice = findPrizeCristal(sizeHeight, sizeWidth);
		break;
		
		case 9:
		totalPrice = findPrizeShirokoploshten(sizeHeight, sizeWidth);
		break;
	}
	
	// TODO: If total = 0
	// TODO: If total = 1
	if(totalPrice == 0)
	{
		alert(errMsgUnacceptable);
		document.getElementById("finalPrice").innerHTML =  "";
	}
	else if(totalPrice == 1)
	{
		//alert(errMSG);
		document.getElementById("finalPrice").innerHTML =  "";
	}
	else{
	document.getElementById("finalPrice").innerHTML = totalPrice - totalPrice * discount / 100 + " лв.";
	}
	totalPrice = 0;
	return false;
}