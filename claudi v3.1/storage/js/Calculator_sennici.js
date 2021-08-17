
var colorCode = 0;	//default color
var modelCode = 0; // default model
var totalPrice = 0;

var models = ["Стандарт(Чупещо рамо)", "Елеганс(Чупещо рамо)", "Вера(Чупещо рамо)", "Престиж(Чупещо рамо)", "Класик(Падащо рамо)",
 			"Смарт(Падащо рамо)", "Кабрио", "Балконски(Ветроупорен)", "Кристал(Ветроупорен)", "Широкоплощен(Ветроупорен)"];

var colors = ["PVC", "Breza(Акрилен)", "PARA(Акрилен)"];



var modelsTable =
	[
		[
			//standart
			[442, 469, 520, 547, 573, 625, 69],
            [0, 504, 561, 589, 616, 673, 74],
            [0, 0, 607, 634, 662, 726, 79],
            [0, 0, 0, 672, 701, 771, 844]
		],
		[
			[472, 538, 564, 591, 657, 684, 795],
            [0, 589, 616, 643, 719, 746, 866],
            [0, 0, 671, 699, 784, 812, 942],
            [0, 0, 0, 747, 842, 870, 1010]
		],
		[
			[541, 568, 594, 695, 721, 748, 893],
            [0, 625, 652, 770, 798, 825, 988],
            [0, 0, 714, 850, 878, 905, 1086],
            [0, 0, 0, 921, 950, 978, 1176]
		],
		[
			//Elegance
			[575, 647, 678, 709, 780, 812, 929, 1069, 1154, 1271, 1302],
			[0, 703, 735, 767, 848, 879, 1006, 1160, 1245, 1372, 1404],
			[0, 0, 789, 822, 913, 945, 1081, 1252, 1337, 1474, 1506],
			[0, 0, 0, 879, 980, 1058, 1159, 1192, 1429, 1530, 1563],
			[0, 0, 0, 0, 1185, 1218, 1329, 1362, 1449, 1762, 0],
			[0, 0, 0, 0, 0, 1248, 1459, 1493, 1580, 0, 0]
		],
		[
			[649, 695, 740, 792, 864, 895, 1033, 1173, 1258, 1396, 1427],
            [0, 775, 811, 874, 950, 981, 1134, 1288, 1373, 1526, 1557],
            [0, 0, 880, 912, 1033, 1066, 1233, 1403, 1489, 1655, 1688],
            [0, 0, 0, 994, 1120, 1198, 1334, 1367, 1604, 1739, 1772],
            [0, 0, 0, 0, 1344, 1377, 1527, 1560, 1647, 2000, 0],
            [0, 0, 0, 0, 0, 1425, 1681, 1715, 1802, 0, 0]
		],
		[
			//Vera
			[871, 997, 1083, 1169, 1295, 1380, 1601],
			[0, 1082, 1168, 1254, 1390, 1476, 1706],
			[0, 0, 1255, 1342, 1488, 1574, 1814],
			[0, 0, 0, 0, 1583, 1670, 1919]
		],
		[
			[895, 1032, 1119, 1206, 1343, 1430, 1661],
            [0, 0, 1211, 1299, 1448, 1535, 1778],
            [0, 0, 0, 1394, 1555, 1643, 1898],
            [0, 0, 0, 0, 1660, 1748, 2016]
		],
		[
			//Prestige
			[1109, 1231, 1354, 1456, 1599, 1702, 1901, 2024, 2396, 2518, 2641],
			[0, 1296, 1424, 1527, 1680, 1783, 1911, 2115, 2507, 2635, 2840],
			[0, 0, 1499, 1602, 1765, 1945, 2078, 2211, 2702, 2835, 2968],
			[0, 0, 0, 1745, 1918, 2022, 2160, 2374, 2479, 2945, 0]
		],
		[
			[1153, 1287, 1421, 1523, 1689, 1791, 2002, 2136, 2507, 2641, 2775],
			[0, 1365, 1507, 1609, 1790, 1893, 2034, 2252, 2644, 2786, 3004],
			[0, 0, 1596, 1700, 1895, 2075, 2224, 2373, 2865, 3014, 3163],
			[0, 0, 0, 1858, 2068, 2172, 2329, 2563, 2667, 3152, 0]
		],
		[
			//Classic
			[332, 358, 384, 402, 428, 454, 472, 509, 535],
            [347, 376, 406, 424, 453, 482, 501, 545, 574],
            [362, 395, 427, 446, 479, 511, 530, 581, 614],
            [380, 416, 452, 471, 507, 543, 561, 622, 658],
            [393, 432, 472, 491, 530, 569, 588, 656, 695]
		],
		[
			[340, 370, 400, 418, 448, 478, 496, 536, 566],
            [358, 393, 427, 446, 481, 515, 534, 583, 618],
            [376, 416, 455, 474, 513, 553, 572, 630, 670],
            [397, 441, 486, 505, 549, 594, 613, 682, 726],
            [413, 462, 512, 531, 580, 629, 649, 726, 775]
		],
		[
			[353, 389, 426, 444, 480, 517, 535, 582, 619],
            [376, 420, 464, 482, 526, 570, 588, 647, 691],
            [399, 450, 502, 520, 571, 623, 641, 712, 763],
            [425, 484, 542, 561, 620, 678, 697, 780, 839],
            [446, 512, 578, 597, 663, 729, 748, 842, 908]
		],
		[
			//Smart
			[422, 483, 543, 591, 651, 711, 856, 916, 976],
			[441, 506, 571, 619, 684, 749, 898, 963, 1028],
			[459, 529, 599, 647, 717, 787, 941, 1011, 1081],
			[480, 554, 629, 678, 753, 827, 987, 1062, 1136],
			[496, 575, 655, 704, 783, 863, 1026, 1106, 1185]
		],
		[
			[436, 502, 569, 617, 684, 751, 896, 962, 1029],
			[459, 533, 607, 655, 729, 803, 953, 1027, 1101],
			[482, 564, 645, 694, 775, 856, 1011, 1092, 1173],
			[508, 597, 685, 734, 823, 912, 1072, 1161, 1249],
			[529, 625, 721, 770, 866, 963, 1126, 1222, 1318]
		],
		[
			//Kabrio
			[341, 411, 450, 490, 560, 599, 670, 709],
			[505, 545, 640, 680, 775, 815, 910, 950],
			[716, 757, 876, 917, 1036, 1077, 1119, 0],
			[972, 1014, 1157, 1200, 1242, 1385, 0, 0]
		],
		[
			//Balkonski
			[256, 291, 328, 363, 398, 413, 469, 531, 568, 603, 618]
		],
		[
			[281, 329, 376, 424, 472, 488, 568, 630, 678, 726, 740]
		],
		[
			[242, 271, 300, 315, 344, 372, 388, 464, 493, 508, 537]
		],
		[
			//Kristal
			[167, 215, 263, 312, 360, 408, 456, 504, 552],
			[183, 240, 297, 354, 411, 468, 524, 581, 638],
			[199, 265, 331, 396, 462, 528, 593, 659, 0],
			[216, 290, 364, 439, 513, 588, 662, 0, 0]
		],
		[
			//Shirokoploshten
			[795, 844, 894, 922, 1192, 1241, 1269, 1400, 1621, 1650],
			[831, 883, 936, 965, 1248, 1302, 1331, 1465, 1700, 1729],
			[865, 922, 979, 1009, 1306, 1362, 1392, 1530, 1779, 0],
			[901, 961, 1022, 1052, 1363, 1423, 1453, 1595, 0, 0],
			[937, 1001, 1065, 1095, 1420, 1484, 0, 0, 0, 0],
			[971, 1040, 1107, 1139, 1477, 0, 0, 0, 0, 0]
		],
		[
			[835, 925, 953, 1044, 1293, 1351, 1411, 1521, 1752, 1811],
			[877, 977, 1006, 1106, 1365, 1430, 1494, 1605, 1851, 1916],
			[919, 1028, 1058, 1168, 1439, 1508, 1578, 1689, 1951, 0],
			[961, 1079, 1111, 1231, 1511, 1587, 1661, 1773, 0, 0],
			[1002, 1132, 1162, 1293, 1583, 1664, 0, 0, 0, 0],
			[1044, 1183, 1215, 1355, 1657, 0, 0, 0, 0, 0]
		],
		[
			[890, 1007, 1036, 1153, 1403, 1475, 1549, 1659, 1904, 1976],
			[941, 1072, 1101, 1233, 1493, 1573, 1654, 1764, 2027, 2107],
			[991, 1136, 1167, 1313, 1582, 1671, 1759, 1870, 2149, 0],
			[1042, 1201, 1232, 1392, 1673, 1768, 1864, 1975, 0, 0],
			[1091, 1265, 1297, 1471, 1763, 1866, 0, 0, 0, 0],
			[1141, 1330, 1362, 1551, 1853, 0, 0, 0, 0, 0]
		]
	];

function printOption(option) {
	for (var i = 0; i < option.length; i++) {
		document.write("<option value=" + 'option[i]' + ">" + option[i] + "</option>");
	}
}

//Receving Info from dropdown menu

function getColor(color) {
	colorCode = color.selectedIndex;
}

function getModel(model) {
	modelCode = model.selectedIndex;
	document.getElementById('sunblindHeight').disabled = false;
	document.getElementById("sennikPvc").disabled = false;
	document.getElementById("sennikBreza").disabled = false;
	document.getElementById('sunblindHeight').value = '';
	switch (modelCode) {
		case 1:
		case 2:
		case 3:
		case 5:
			document.getElementById("sennikPvc").disabled = "true";
			break;
		case 6:
			document.getElementById("sennikPvc").disabled = true;
			document.getElementById("sennikBreza").disabled = true;
			document.getElementById("selectColor").selectedIndex = '1';
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
function throwMaxLenghtExeption(wOrH, maximum) {
	var maxWidth = "Масималната ширна на този сенник е ";
	var maxHeight = "Максималната височина(напред) на този сенник е ";
	if (wOrH == 0)	// Width
	{
		alert(maxWidth + maximum + ' cm.');
	}
	else	// e.g. 1 -> height
	{
		alert(maxHeight + maximum + ' cm.');
	}
}

// MINIMUM
function throwMinLenghtExeption(minimum) {
	var minWidth = "Минималната ширна на този сенник е ";
	alert(minWidth + minimum + ' cm.');
}

function findTable(model, color) {
	var tableIndex = 0;
	switch (model) {
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
			tableIndex = 15;
			break;
		case 8:
			tableIndex = 18; 
			break;
		case 9:
			tableIndex = 19;
			break;
	}

	if (model != 8) {
		tableIndex += color;
	}

	return tableIndex;
}

function findPrizeClasicAndSmart(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode, colorCode);
	//-------- Width Parameters
	if (width < 70) {
		throwMinLenghtExeption(70);
	}
	if (width > 500) {
		throwMaxLenghtExeption(0, 500);
		return 1;
	}
	if (width > 450) {
		col = 8;
	}
	else if (width > 400) {
		col = 7;
	}
	else if (width > 350) {
		col = 6;
	}
	else if (width > 300) {
		col = 5;
	}
	else if (width > 250) {
		col = 4;
	}
	else if (width > 200) {
		col = 3;
	}
	else if (width > 150) {
		col = 2;
	}
	else if (width > 100) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height > 150) {
		throwMaxLenghtExeption(1, 150);
		return 1;
	}
	if (height > 125) {
		row = 4;
	}
	else if (height > 100) {
		row = 3;
	}
	else if (height > 75) {
		row = 2;
	}
	else if (height > 50) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeStandartAndVera(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode, colorCode);
	//-------- Width Parameters
	if (width < 185) {
		throwMinLenghtExeption(185);
	}
	if (width > 500) {
		throwMaxLenghtExeption(0, 500);
		return 1;
	}
	if (width > 450) {
		col = 6;
	}
	else if (width > 400) {
		col = 5;
	}
	else if (width > 350) {
		col = 4;
	}
	else if (width > 300) {
		col = 3;
	}
	else if (width > 250) {
		col = 2;
	}
	else if (width > 200) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height < 150 || height > 300) {
		throwMaxLenghtExeption(1, 300);
		return 1;
	}
	if (height > 250) {
		row = 3;
	}
	else if (height > 200) {
		row = 2;
	}
	else if (height > 150) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeElegans(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode, colorCode);
	//-------- Width Parameters
	if (width < 185) {
		throwMinLenghtExeption(185);
	}
	if (width > 700) {
		throwMaxLenghtExeption(0, 700);
		return 1;
	}

	if (width > 650) {
		col = 10;
	}
	else if (width > 600) {
		col = 9;
	}
	else if (width > 550) {
		col = 8;
	}
	else if (width > 500) {
		col = 7;
	}
	else if (width > 450) {
		col = 6;
	}
	else if (width > 400) {
		col = 5;
	}
	else if (width > 350) {
		col = 4;
	}
	else if (width > 300) {
		col = 3;
	}
	else if (width > 250) {
		col = 2;
	}
	else if (width > 200) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height > 400) {
		throwMaxLenghtExeption(1, 400);
		return 1;
	}

	if (height > 350) {
		row = 5;
	}
	else if (height > 300) {
		row = 4;
	}
	else if (height > 250) {
		row = 3;
	}
	else if (height > 200) {
		row = 2;
	}
	else if (height > 150) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizePrestige(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode, colorCode);
	//-------- Width Parameters
	if (width < 185) {
		throwMinLenghtExeption(185);
	}
	if (width > 700) {
		throwMaxLenghtExeption(0, 700);
		return 1;
	}

	if (width > 650) {
		col = 10;
	}
	else if (width > 600) {
		col = 9;
	}
	else if (width > 550) {
		col = 8;
	}
	else if (width > 500) {
		col = 7;
	}
	else if (width > 450) {
		col = 6;
	}
	else if (width > 400) {
		col = 5;
	}
	else if (width > 350) {
		col = 4;
	}
	else if (width > 300) {
		col = 3;
	}
	else if (width > 250) {
		col = 2;
	}
	else if (width > 200) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height > 300) {
		throwMaxLenghtExeption(1, 300);
		return 1;
	}
	if (height > 250) {
		row = 3;
	}
	else if (height > 200) {
		row = 2;
	}
	else if (height > 150) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeCabrio(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode, colorCode);
	//-------- Width Parameters
	if (width < 70) {
		throwMinLenghtExeption(70);
	}
	if (width > 450) {
		throwMaxLenghtExeption(0, 450);
		return 1;
	}
	else if (width > 400) {
		col = 7;
	}
	else if (width > 350) {
		col = 6;
	}
	else if (width > 300) {
		col = 5;
	}
	else if (width > 250) {
		col = 4;
	}
	else if (width > 200) {
		col = 3;
	}
	else if (width > 150) {
		col = 2;
	}
	else if (width > 100) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height > 200) {
		throwMaxLenghtExeption(1, 200);
		return 1;
	}
	else if (height > 150) {
		row = 3;
	}
	else if (height > 100) {
		row = 2;
	}
	else if (height > 50) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeBalkonski(height, width) {
	// The lenght is olny 200 cm and the field is disabled
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode, colorCode);

	if (width < 70) {
		throwMinLenghtExeption(70);
	}

	if (width > 600) {
		throwMaxLenghtExeption(0, 600);
		return 1;
	}
	else if (width > 550) {
		col = 10;
	}
	else if (width > 500) {
		col = 9;
	}
	else if (width > 450) {
		col = 8;
	}
	else if (width > 400) {
		col = 7;
	}
	else if (width > 350) {
		col = 6;
	}
	else if (width > 300) {
		col = 5;
	}
	else if (width > 250) {
		col = 4;
	}
	else if (width > 200) {
		col = 3;
	}
	else if (width > 150) {
		col = 2;
	}
	else if (width > 100) {
		col = 1;
	}
	else {
		col = 0;
	}
	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeShirokoploshten(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode, colorCode);
	//-------- Width Parameters
	if (width < 100) {
		throwMinLenghtExeption(100);
	}

	if (width > 700) {
		throwMaxLenghtExeption(0, 700);
		return 1;
	}

	if (width > 650) {
		col = 9;
	}
	else if (width > 600) {
		col = 8;
	}
	else if (width > 550) {
		col = 7;
	}
	else if (width > 500) {
		col = 6;
	}
	else if (width > 450) {
		col = 5;
	}
	else if (width > 400) {
		col = 4;
	}
	else if (width > 350) {
		col = 3;
	}
	else if (width > 300) {
		col = 2;
	}
	else if (width > 250) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters
	if (height > 500) {
		throwMaxLenghtExeption(1, 500);
		return 1;
	}
	else if (height > 450) {
		row = 5;
	}
	else if (height > 400) {
		row = 4;
	}
	else if (height > 350) {
		row = 3;
	}
	else if (height > 300) {
		row = 2;
	}
	else if (height > 250) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function findPrizeCristal(height, width) {
	var row = 0;
	var col = 0;
	var total = 0;
	var dimention = findTable(modelCode, colorCode);
	//-------- Width Parameters
	if (width < 70) {
		throwMinLenghtExeption(70);
	}

	if (width > 500) {
		throwMaxLenghtExeption(0, 500);
		return 1;
	}
	else if (width > 450) {
		col = 8;
	}
	else if (width > 400) {
		col = 7;
	}
	else if (width > 350) {
		col = 6;
	}
	else if (width > 300) {
		col = 5;
	}
	else if (width > 250) {
		col = 4;
	}
	else if (width > 200) {
		col = 3;
	}
	else if (width > 150) {
		col = 2;
	}
	else if (width > 100) {
		col = 1;
	}
	else {
		col = 0;
	}
	//------- Lenght/Height Parameters

	if (height > 300) {
		throwMaxLenghtExeption(1, 300);
		return 1;
	}
	else if (height > 250) {
		row = 3;
	}
	else if (height > 200) {
		row = 2;
	}
	else if (height > 150) {
		row = 1;
	}
	else {
		row = 0;
	}

	total = modelsTable[dimention][row][col];
	return total;
}

function CheckBreakingSholder(model, width, height) {
	var errMSG = "Минимална ширина на сенника = дължина на рамо + 35 см.";
	var errMSG2 = "При рамо 200, 250 или 300 см (за сенник 'Вера') минималната ширина на сенника = дължина на рамо + 60 см."
	if (model == 2) {
		if (height <= 150) {
			if (width < height + 35) {
				alert(errMSG);
			}
		}
		else {
			if (width < height + 60) {
				alert(errMSG2);
			}
		}
	}
	else {
		var minW = height + 35;
		if (width < minW) {
			alert(errMSG);
		}
	}
}

function printFinalPrice() {
	var errMSG = "Зададените размери са извън позволената ширина/височина на продукта";
	var errMsgUnacceptable = "При зададените размери ширината и височината са несъвместими. Моля намалете височината.";
	var sizeWidth = Number(document.getElementById("sunblindWidth").value);
	var sizeHeight = Number(document.getElementById("sunblindHeight").value);
	var discount = 6;	//precent discount

	//CheckBoundories (modelCode, sizeWidth, sizeHeight);

	// Setting the prize for the Total
	switch (modelCode) {
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
	if (totalPrice == 0) {
		alert(errMsgUnacceptable);
		document.getElementById("finalPrice").innerHTML = "";
	}
	else if (totalPrice == 1) {
		//alert(errMSG);
		document.getElementById("finalPrice").innerHTML = "";
	}
	else {
		document.getElementById("finalPrice").innerHTML = totalPrice - totalPrice * discount / 100 + " лв.";
	}
	totalPrice = 0;
	return false;
}