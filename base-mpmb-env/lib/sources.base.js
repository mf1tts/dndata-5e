/**
 * This module makes available the MPMB Character Sheet v13 base data.
 * Definitions in this module are for:
 *  - Source (SourceList)
 **/
/* BEGIN COMMON HELPERS */
var app = {
    platform: "node"
};
this.fields = [];
this.bookmarkRoot = {
    children: [{
        children: []
    }]
};
this.info = {
        SheetType: "printer friendly letter",
        SpellsOnly: false,
        AdvLogOnly: false,
        SheetVersion: 13,
        
};
this.getField = function (name) {
    var item = this.fields.find((item) => item.name == name);
    if (item != this.undefined) {
        return item;
    }
    return {
        name: name,
        submitName: name,
        text: ""
    };
}
var npmclone = require('clone');
/* END COMMON HELPERS */
// all the very basic functions and text manipulation functions
var tDoc = this;

function Hide(field) {
	if (tDoc.getField(field)) tDoc.getField(field).display = display.hidden;
};

function DontPrint(field) {
	if (tDoc.getField(field)) tDoc.getField(field).display = display.noPrint;
};

function Show(field) {
	if (tDoc.getField(field)) tDoc.getField(field).display = display.visible;
};

function isDisplay(field) {
	return !tDoc.getField(field) ? 100 : tDoc.getField(field).display;
};

function Editable(field) {
	if (tDoc.getField(field)) tDoc.getField(field).readonly = false;
};

function Uneditable(field) {
	if (tDoc.getField(field)) tDoc.getField(field).readonly = true;
};

function Value(field, FldValue, tooltip, submitNm) {
	if (!tDoc.getField(field)) return false;
	tDoc.getField(field).value = FldValue;
	if (tooltip !== undefined) tDoc.getField(field).userName = tooltip;
	if (submitNm !== undefined) tDoc.getField(field).submitName = submitNm;
};

function What(field) {
	return tDoc.getField(field) ? tDoc.getField(field).value : BackwardsCompatible[field] ? eval(BackwardsCompatible[field]) : "";
};

function Who(field) {
	return tDoc.getField(field) ? tDoc.getField(field).userName : "";
};

function How(field) {
	return tDoc.getField(field) ? tDoc.getField(field).submitName : "";
};

function Clear(field) {
	if (tDoc.getField(field)) tDoc.getField(field).clearItems();
};

function AddTooltip(field, tooltip, submitNm) {
	if (!tDoc.getField(field)) return false;
	if (tooltip !== undefined) tDoc.getField(field).userName = tooltip;
	if (submitNm !== undefined) tDoc.getField(field).submitName = submitNm;
};

function SwapTooltip(field1, field2) {
	tt1 = Who(field1);
	tt2 = Who(field2);
	AddTooltip(field1, tt2);
	AddTooltip(field2, tt1);
};

function Checkbox(field, FldValue, tooltip, submitNm) {
	if (!tDoc.getField(field)) return false;
	var Checkit = (FldValue === undefined) ? true : FldValue;
	var checkNo = isArray(tDoc.getField(field).page) ? tDoc.getField(field).page.length : 1;
	for (var c = 0; c < checkNo; c++) {
		tDoc.getField(field).checkThisBox(c, Checkit);
	}
	if (tooltip !== undefined) tDoc.getField(field).userName = tooltip;
	if (submitNm !== undefined) tDoc.getField(field).submitName = submitNm;
};

function desc(arr) {
	return "\n   " + arr.join("\n   ");
};

// Call all the prototypes within their own function so we can call it again when importing, forcing the latest version
function setPrototypes() {
	//adding a way of capitalizing every first letter of every word in a string
	String.prototype.capitalize = function () {
		var string = this.toLowerCase().replace(/(?:^|\s|\(|\[)\w/g, function (m) {
			return m.toUpperCase();
		});

		// Certain minor words should be left lowercase unless
		// they are the first or last words in the string
		lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
		'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
		for (var Ca = 0; Ca < lowers.length; Ca++)
		string = string.replace(new RegExp('\\W' + lowers[Ca] + '\\W', 'g'), function(txt) {
			return txt.toLowerCase();
		});

		return string;
	};
	Number.prototype.capitalize = function () {
		return this.toString().capitalize();
	};
	RegExp.prototype.capitalize = function () {
		return this.toString().capitalize();
	};

	//adding a way to convert a string with special characters into a regular expression
	String.prototype.RegEscape = function () {
		return this.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	};
	Number.prototype.RegEscape = function () {
		return this.toString().RegEscape();
	};
	RegExp.prototype.RegEscape = function () {
		return this.toString().RegEscape();
	};

	//define a way for numbers and regular expressions to return an indexOf(), match(), replace(), search(), slice(), split(), substring(), substr(), toLowerCase(), or toUpperCase() to avoid errors
	Number.prototype.indexOf = function (searchValue, fromIndex) {
		return this.toString().indexOf(searchValue, fromIndex);
	};
	Number.prototype.match = function (regexpObj) {
		return this.toString().match(regexpObj);
	};
	Number.prototype.replace = function (regexp_substr, newSubStr_function) {
		return this.toString().replace(regexp_substr, newSubStr_function);
	};
	Number.prototype.search = function (regexpObj) {
		return this.toString().search(regexpObj);
	};
	Number.prototype.slice = function (beginSlice, endSlice) {
		return this.toString().slice(beginSlice, endSlice);
	};
	Number.prototype.split = function (separator, limit) {
		return this.toString().split(separator, limit);
	};
	Number.prototype.substring = function (indexStart, indexEnd) {
		return this.toString().substring(indexStart, indexEnd);
	};
	Number.prototype.substr = function (start, length) {
		return this.toString().substr(start, length);
	};
	Number.prototype.toLowerCase = function () {
		return this.toString().toLowerCase();
	};
	Number.prototype.toUpperCase = function () {
		return this.toString().toUpperCase();
	};
	RegExp.prototype.indexOf = function (searchValue, fromIndex) {
		return this.toString().indexOf(searchValue, fromIndex);
	};
	RegExp.prototype.match = function (regexpObj) {
		return this.toString().match(regexpObj);
	};
	RegExp.prototype.replace = function(oldstr, newstr) {
		var a = this.toString();
		return RegExp(a.replace(/^\/|\/\w*$/g, "").replace(oldstr, newstr), a.match(/\/\w*$/)[0].replace("/", ""));
	};
	RegExp.prototype.search = function (regexpObj) {
		return this.toString().search(regexpObj);
	};
	RegExp.prototype.slice = function (beginSlice, endSlice) {
		return this.toString().slice(beginSlice, endSlice);
	};
	RegExp.prototype.split = function (separator, limit) {
		return this.toString().split(separator, limit);
	};
	RegExp.prototype.substring = function (indexStart, indexEnd) {
		return this.toString().substring(indexStart, indexEnd);
	};
	RegExp.prototype.substr = function (start, length) {
		return this.toString().substr(start, length);
	};
	RegExp.prototype.toLowerCase = function () {
		return this.toString().toLowerCase();
	};
	RegExp.prototype.toUpperCase = function () {
		return this.toString().toUpperCase();
	};
	Array.prototype.match = function (regexpObj) {
		return this.toString().match(regexpObj);
	};
	Array.prototype.replace = function (regexp_substr, newSubStr_function) {
		return this.toString().replace(regexp_substr, newSubStr_function);
	};
	Array.prototype.search = function (regexpObj) {
		return this.toString().search(regexpObj);
	};
	Array.prototype.split = function (separator, limit) {
		return this.toString().split(separator, limit);
	};
	Array.prototype.substring = function (indexStart, indexEnd) {
		return this.toString().substring(indexStart, indexEnd);
	};
	Array.prototype.substr = function (start, length) {
		return this.toString().substr(start, length);
	};
	Array.prototype.toLowerCase = function () {
		return this.toString().toLowerCase();
	};
	Array.prototype.toUpperCase = function () {
		return this.toString().toUpperCase();
	};
	Array.prototype.trailingIndexOf = function(e) {
		var index = -1, len = this.length;
		for (var i = len - 1; i > -1; i--) {
			if (i in this && e === this[i]) {
				index = i;
			} else {
				break;
			}
		}
		return index;
	};
};
setPrototypes();

function ChangeWidth(field, amount) {
	var Fld = tDoc.getField(field);
	var aRect = Fld.rect; // Make a copy of Fld.rect
	aRect[2] += amount; // Increment lower right x coordinate by given amount
	Fld.rect = aRect; // Update the value of Fld.rect
	Fld.value = Fld.value; //Set the value of the Fld to match the original value, as to not mess up the font scaling
}

function ClearIcons(field, clickMe) {
	if (!tDoc.getField(field)) return false;
	var iconFld = clickMe ? "SaveIMG.ClickMeIcon" : "SaveIMG.EmptyIcon";
	var oIcon = tDoc.getField(iconFld).buttonGetIcon();
	tDoc.getField(field).buttonSetIcon(oIcon);
	if (clickMe) {
		DontPrint(field);
	} else if (tDoc.getField(field).display === display.noPrint) {
		Show(field);
	}
};

function PickDropdown(field, FldValue) {
	var thisFld = tDoc.getField(field);
	if (!thisFld) return;
	if (!isNaN(FldValue) && thisFld.type === "combobox") {
		tDoc.getField(field).currentValueIndices = Number(FldValue);
	} else {
		Value(field, FldValue);
	}
};

function isArray(input) {
	var giveback = false;
	if (Object.prototype.toString.call(input) === "[object Array]") {
		giveback = true;
	}
	return giveback;
};

//remove the empty values from an array (removes all things that are considered false, such as 0, "", undefined, false)
function removeEmptyValues(array) {
	var returnArray = [];
	for (var i = 0; i < array.length; i++) {
		if (array[i]) returnArray.push(array[i]);
	}
	return returnArray;
};

function sign(x) {
	return x > 0 ? 1 : x < 0 ? -1 : x;
};

function format1(extraDec, fixedDec, unit) {
	var plusDec = extraDec && !isNaN(extraDec) ? Number(extraDec) : 0;
	var decShow = 0;
	AFNumber_Format(2 + plusDec, 1, 0, 0, "", false);
	var decLoc = event.value.indexOf(".");
	var decSep = What("Decimal Separator");

	decShow = (3 + plusDec) - decLoc;
	decShow = decShow < 0 ? 0 : decShow;

	if (fixedDec !== undefined && !isNaN(fixedDec) && fixedDec !== "") {
		decShow = fixedDec;
	}

	if (decSep === "dot") {
		AFNumber_Format(decShow, 0, 0, 0, "", false);
		if (decShow) {
			// Replace any trailing zeroes with nothing
			event.value = event.value.replace(/[0]+$/, "");
			// Replace a trailing decimal with nothing
			event.value = event.value.replace(/\.$/, "");
		}
	} else if (decSep === "comma") {
		AFNumber_Format(decShow, 2, 0, 0, "", false);
		if (decShow) {
			// Replace any trailing zeroes with nothing
			event.value = event.value.replace(/[0]+$/, "");
			// Replace a trailing decimal with nothing
			event.value = event.value.replace(/,$/, "");
		}
	}

	if (event.value !== "" && unit && unit === "mass") {
		var UnitSystem = What("Unit System");
		if (UnitSystem === "imperial") {
			event.value += " lb";
		} else if (UnitSystem === "metric") {
			event.value += " kg";
		}
	}
}

//replace all commas and dots with the set decimal separator
function format2() {
	var theDec = What("Decimal Separator") === "dot" ? "." : ",";
	if (event.value) event.value = event.value.replace(/(\.|,)/, theDec);
}

function keystroke1(allowDec, allowNegative) {
	if (!event.willCommit) {
		if (allowDec) {
			var tests = !isNaN(event.change) || ((/,|\./g).test(event.change) && (!(/,|\./g).test(event.value) || (/,|\./g).test(event.value.substring(event.selStart, event.selEnd))));
		} else {
			var tests = !isNaN(event.change);
		}
		if (allowNegative) {
			tests = tests || (event.change === "-" && event.selStart === 0 && (!(/-/g).test(event.value) || (/-/g).test(event.value.substring(event.selStart, event.selEnd))));
		}
		event.rc = tests;
	} else {
		event.rc = !isNaN(event.value.replace(/,/, "."));
	}
}

function keystroke2() {
	var allowedA = [".", ",", "-", "+", "*", "/"];
	var tests = event.value === "";
	if (!event.willCommit) {
		tests = !isNaN(event.change) || allowedA.indexOf(event.change) !== -1;
	} else if (event.value !== "") {
		tests = false;
		var toUse = event.value.replace(/(\.)+(\,)+/g, ",").replace(/(\.|\,)+/g, "$1");
		toUse = toUse.replace(/(\-)+(\+)+/g, "-").replace(/(\+|\-)+/g, "$1").replace(/(\*|\/|\+|\-)+/g, "$1").replace(/^(\*|\/)/, "");
		var toTest = toUse.replace(/,/g, ".");
		try {
			var tests = !isNaN(eval(toTest));
			event.value = toUse;
		} catch (err) {
			try {
				var tests = !isNaN(eval(toTest.slice(0, -1)));
				event.value = toUse.slice(0, -1);
			} catch (err) {
				var tests = false;
			}
		}
	}
	event.rc = tests;
};

// a format function for the "Die" field of the Hit Dice section
function FormatHD() {
	var theResult = clean(event.value, " ");
	if (theResult !== "") {
		var QI = getTemplPre(event.target.name, "AScomp");
		var theCon = Number(What(QI === true ? "Con Mod" : QI + "Comp.Use.Ability.Con.Mod"));
		event.value = "d" + theResult + (theCon < 0 ? theCon : "+" + theCon);
	}
};

//format the date (format)
function FormatDay() {
	var isDate = util.scand('yy-mm-dd', event.value);
	event.value = event.value && isDate ? util.printd(What("DateFormat_Remember"), isDate) : "";
};

//make sure the date is entered in the correct format (keystroke)
function KeystrokeDay() {
	if (event.willCommit && event.value) {
		var isDate = util.scand('yy-mm-dd', event.value);
		if (!isDate) {
			event.value = "";
			if (IsNotImport) {
				app.alert({
					cMsg : "Please enter a valid date using the date-picker (the little arrow in the field) or enter the date manually using of the form \"Year-Month-Day\".\n\nYou can change the way the date is displayed with the \"Logsheet Options\" at the top of each Adventurers Logsheet. Note that the format of the date in the field never changes, only the way it is displayed.",
					cTitle : "Invalid date format",
					nIcon : 1
				});
			};
		};
	};
};

//a field "format" function to add a space at the start and end of the field, to make sure it looks better on the sheet
function addWhitespace() {
	event.value = " " + event.value + " ";
};

function RoundTo(inputNmbr, roundNmbr, emptyAtZero, applyDec) {
	var input = isNaN(inputNmbr) ? Number(inputNmbr.replace(/,/g,".")) : inputNmbr, result = inputNmbr;

	if (roundNmbr && !isNaN(roundNmbr)) {
		if (roundNmbr >= 1) {
			result = Math.round(input / roundNmbr) * roundNmbr;
		} else if (roundNmbr > 0 && roundNmbr < 1) {
			result = Math.round(input * Math.pow(roundNmbr,-1)) / Math.pow(roundNmbr,-1);
		}
	}
	if (emptyAtZero && result === 0) {
		result = "";
	} else if (applyDec && result % 1 != 0 && What("Decimal Separator") === "comma") {
		result = result.replace(".", ",");
	}
	return result;
}

function NormDecimal(dec) {
  var i = 0;
  var first = ding.match(/,|\./);
  var result = dec.replace(/,|\./g, function(all, match) { return i++===0 ? first : ''; });
  return result;
}

//adding a way to see the number of keys in an object (i.e. length)
function ObjLength(theObj) {
	var size = 0;
	for (var thingy in theObj) {
		size++;
	}
	return size;
};

// start a progress dialog
// input can be a percentage of the progress or a string to display
// if remove is set to true, the entry corresponding to the input text is removed
// if remove is set to false, overwrite the current entry
function thermoM(input, remove) {
	if (input === "start" || !IsNotImport || IsNotImport === "no progress bar") return "";
	var t = app.thermometer;
	if (!input || input.toLowerCase() == "stop") {
		if (!thermoStopSet && t.text != undefined) thermoStopSet = app.setTimeOut("thermoStop();", 500);
		return "";
	}
	var dT = 10;
	if (remove !== undefined && isNaN(input)) { // remove the input if remove = true, or the latest entry if remove = false
		var toRem = remove ? input : thermoCount[thermoCount.length -1];
		if (thermoCount.indexOf(toRem) !== -1) {
			thermoCount.splice(thermoCount.indexOf(toRem), 1);
			if (!remove) thermoDur[input] = thermoDur[toRem];
			delete thermoDur[toRem];
			if (remove && thermoCount.length) {
				t.text = thermoCount[thermoCount.length -1];
				t.value = thermoDur[t.text];
			}
		}
	}
	if (!remove && isNaN(input)) { // start new with the input text
		if (t.text == undefined) {
			t.begin();
			t.duration = dT;
		}
		t.text = input;
		if (thermoCount.indexOf(input) == -1) {
			thermoCount.push(input);
			t.value = thermoDur[input] ? thermoDur[input] : 1;
			thermoDur[input] = t.value;
		} else {
			t.value++;
			thermoDur[input] = t.value;
		}
	} else if (!remove && t.text != undefined) { // update progress with the input number (if there is an active progress bar)
		t.value = dT * input;
		thermoDur[thermoCount[thermoCount.length -1]] = t.value;
	}
	// close all dialogs half a second after the last bit of code finishes
	if (!thermoStopSet && t.text != undefined) thermoStopSet = app.setTimeOut("thermoStop();", 500);
	return t.text != undefined ? t.text : "";
};

// end all instances of the progress dialog
function thermoStop() {
	if (thermoStopSet) {
		app.clearTimeOut(thermoStopSet);
		thermoStopSet = false;
	}
	thermoCount = [];
	thermoDur = {};
	var i = 0;
	while(i < 1000 && app.thermometer.text != undefined) {
		app.thermometer.end();
		i++
	};
};

//test if a font works or not
function testFont(fontTest) {
	var remFont = tDoc.getField((tDoc.info.AdvLogOnly ? "AdvLog." : "") + "Player Name").textFont;
	try {
		tDoc.getField((tDoc.info.AdvLogOnly ? "AdvLog." : "") + "Player Name").textFont = fontTest;
		tDoc.getField((tDoc.info.AdvLogOnly ? "AdvLog." : "") + "Player Name").textFont = remFont;
		return true;
	} catch (e) {
		return false;
	}
};

function clean(input, remove, diacretics) {
	if (remove && isArray(remove)) remove = remove.join('').replace(/(-|\\|\^|\])/g, '\\$1');
	var removeRegex = remove ? RegExp("/^[" + remove + "]+|[" + remove + "]+$", "g") : /^[ \-.,\\/:;]+|[ \-.,\\/:;]+$/g;
	input = input.replace(removeRegex, '');
	return diacretics ? removeDiacritics(input) : input;
};

//convert string to usable, complex regex
function MakeRegex(inputString, extraRegex) {
	return RegExp("^(?=.*\\b" + inputString.replace(/\W/g, " ").replace(/^ +| +$/g, "").RegEscape().replace(/('?s'?)\b/ig, "\($1\)?").replace(/ +/g, "s?\\b)(?=.*\\b") + "s?\\b)" + (extraRegex ? extraRegex : "") + ".*$", "i");
};

function toUni(input) {
	if (!What("UseUnicode")) return input;
	input = input.toString();
	var UniBoldItal = {
		"0" : "\uD835\uDFCE",
		"1" : "\uD835\uDFCF",
		"2" : "\uD835\uDFD0",
		"3" : "\uD835\uDFD1",
		"4" : "\uD835\uDFD2",
		"5" : "\uD835\uDFD3",
		"6" : "\uD835\uDFD4",
		"7" : "\uD835\uDFD5",
		"8" : "\uD835\uDFD6",
		"9" : "\uD835\uDFD7",
		"A" : "\uD835\uDE3C",
		"B" : "\uD835\uDE3D",
		"C" : "\uD835\uDE3E",
		"D" : "\uD835\uDE3F",
		"E" : "\uD835\uDE40",
		"F" : "\uD835\uDE41",
		"G" : "\uD835\uDE42",
		"H" : "\uD835\uDE43",
		"I" : "\uD835\uDE44",
		"J" : "\uD835\uDE45",
		"K" : "\uD835\uDE46",
		"L" : "\uD835\uDE47",
		"M" : "\uD835\uDE48",
		"N" : "\uD835\uDE49",
		"O" : "\uD835\uDE4A",
		"P" : "\uD835\uDE4B",
		"Q" : "\uD835\uDE4C",
		"R" : "\uD835\uDE4D",
		"S" : "\uD835\uDE4E",
		"T" : "\uD835\uDE4F",
		"U" : "\uD835\uDE50",
		"V" : "\uD835\uDE51",
		"W" : "\uD835\uDE52",
		"X" : "\uD835\uDE53",
		"Y" : "\uD835\uDE54",
		"Z" : "\uD835\uDE55",
		"a" : "\uD835\uDE56",
		"b" : "\uD835\uDE57",
		"c" : "\uD835\uDE58",
		"d" : "\uD835\uDE59",
		"e" : "\uD835\uDE5A",
		"f" : "\uD835\uDE5B",
		"g" : "\uD835\uDE5C",
		"h" : "\uD835\uDE5D",
		"i" : "\uD835\uDE5E",
		"j" : "\uD835\uDE5F",
		"k" : "\uD835\uDE60",
		"l" : "\uD835\uDE61",
		"m" : "\uD835\uDE62",
		"n" : "\uD835\uDE63",
		"o" : "\uD835\uDE64",
		"p" : "\uD835\uDE65",
		"q" : "\uD835\uDE66",
		"r" : "\uD835\uDE67",
		"s" : "\uD835\uDE68",
		"t" : "\uD835\uDE69",
		"u" : "\uD835\uDE6A",
		"v" : "\uD835\uDE6B",
		"w" : "\uD835\uDE6C",
		"x" : "\uD835\uDE6D",
		"y" : "\uD835\uDE6E",
		"z" : "\uD835\uDE6F"
	};
	var output = "";
	for (var i = 0; i < input.length; i++) {
		var tempChar = input.charAt(i);
		output += UniBoldItal[tempChar] ? UniBoldItal[tempChar] : tempChar;
	}
	return output;
};

function toSup(inString) {
	if (!What("UseUnicode")) return " ["+inString+"]";
	var doChar = function(aChar) {
		switch(aChar) {
			case "0" : return "\u2070";
			case "1" : return "\xB9";
			case "2" : return "\xB2";
			case "3" : return "\xB3";
			case "4" : return "\u2074";
			case "5" : return "\u2075";
			case "6" : return "\u2076";
			case "7" : return "\u2077";
			case "8" : return "\u2078";
			case "9" : return "\u2079";
			case "+" : return "\u207A";
			case "-" : return "\u207B";
			case "=" : return "\u207C";
			case "(" : return "\u207D";
			case ")" : return "\u207E";
			case "A" : if (useCaps) return "\u1D2C";
			case "a" : return "\u1D43";
			case "B" : if (useCaps) return "\u1D2E";
			case "b" : return "\u1D47";
			case "C" :
			case "c" : return "\u1D9C";
			case "D" : if (useCaps) return "\u1D30";
			case "d" : return "\u1D48";
			case "E" : if (useCaps) return "\u1D31";
			case "e" : return "\u1D49";
			case "F" :
			case "f" : return "\u1DA0";
			case "G" : if (useCaps) return "\u1D33";
			case "g" : return "\u1D4D";
			case "H" : if (useCaps) return "\u1D34";
			case "h" : return "\u02B0";
			case "I" : if (useCaps) return "\u1D35";
			case "i" : return "\u2071";
			case "J" : if (useCaps) return "\u1D36";
			case "j" : return "\u02B2";
			case "K" : if (useCaps) return "\u1D37";
			case "k" : return "\u1D4F";
			case "L" : if (useCaps) return "\u1D38";
			case "l" : return "\u02E1";
			case "M" : if (useCaps) return "\u1D39";
			case "m" : return "\u1D50";
			case "N" : if (useCaps) return "\u1D3A";
			case "n" : return "\u207F";
			case "O" : if (useCaps) return "\u1D3C";
			case "o" : return "\u1D52";
			case "Q" :
			case "P" : if (useCaps) return "\u1D3E";
			case "q" :
			case "p" : return "\u1D56";
			case "R" : if (useCaps) return "\u1D3F";
			case "r" : return "\u02B3";
			case "S" :
			case "s" : return "\u02E2";
			case "T" : if (useCaps) return "\u1D40";
			case "t" : return "\u1D57";
			case "U" : if (useCaps) return "\u1D41";
			case "u" : return "\u1D58";
			case "V" : if (useCaps) return "\u2C7D";
			case "v" : return "\u1D5B";
			case "W" : if (useCaps) return "\u1D42";
			case "w" : return "\u02B7";
			case "X" :
			case "x" : return "\u02E3";
			case "Y" :
			case "y" : return "\u02B8";
			case "Z" :
			case "z" : return "\u1DBB";
		}
		return aChar;
	};
	var input = inString.split(/\:|\ |\.|\,|\_/);
	var output = [];
	var useCaps = true;
	for (i = 0; i < input.length; i++) {
		useCaps = !useCaps || (/c|f|s|x|y|z/i).test(input[i]) ? false : true;
		output[i] = "";
		for (c = 0; c < input[i].length; c++) {
			output[i] += doChar(input[i].charAt(c));
		}
	}
	return output.join("-");
};

//a way to remove diacretics (leestekens)

/*
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
var defaultDiacriticsRemovalMap = [
	{
		'base' : 'A',
		'letters' : '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'
	}, {
		'base' : 'AA',
		'letters' : '\uA732'
	}, {
		'base' : 'AE',
		'letters' : '\u00C6\u01FC\u01E2'
	}, {
		'base' : 'AO',
		'letters' : '\uA734'
	}, {
		'base' : 'AU',
		'letters' : '\uA736'
	}, {
		'base' : 'AV',
		'letters' : '\uA738\uA73A'
	}, {
		'base' : 'AY',
		'letters' : '\uA73C'
	}, {
		'base' : 'B',
		'letters' : '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'
	}, {
		'base' : 'C',
		'letters' : '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'
	}, {
		'base' : 'D',
		'letters' : '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0'
	}, {
		'base' : 'DZ',
		'letters' : '\u01F1\u01C4'
	}, {
		'base' : 'Dz',
		'letters' : '\u01F2\u01C5'
	}, {
		'base' : 'E',
		'letters' : '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'
	}, {
		'base' : 'F',
		'letters' : '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'
	}, {
		'base' : 'G',
		'letters' : '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'
	}, {
		'base' : 'H',
		'letters' : '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'
	}, {
		'base' : 'I',
		'letters' : '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'
	}, {
		'base' : 'J',
		'letters' : '\u004A\u24BF\uFF2A\u0134\u0248'
	}, {
		'base' : 'K',
		'letters' : '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'
	}, {
		'base' : 'L',
		'letters' : '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'
	}, {
		'base' : 'LJ',
		'letters' : '\u01C7'
	}, {
		'base' : 'Lj',
		'letters' : '\u01C8'
	}, {
		'base' : 'M',
		'letters' : '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'
	}, {
		'base' : 'N',
		'letters' : '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'
	}, {
		'base' : 'NJ',
		'letters' : '\u01CA'
	}, {
		'base' : 'Nj',
		'letters' : '\u01CB'
	}, {
		'base' : 'O',
		'letters' : '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'
	}, {
		'base' : 'OI',
		'letters' : '\u01A2'
	}, {
		'base' : 'OO',
		'letters' : '\uA74E'
	}, {
		'base' : 'OU',
		'letters' : '\u0222'
	}, {
		'base' : 'OE',
		'letters' : '\u008C\u0152'
	}, {
		'base' : 'oe',
		'letters' : '\u009C\u0153'
	}, {
		'base' : 'P',
		'letters' : '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'
	}, {
		'base' : 'Q',
		'letters' : '\u0051\u24C6\uFF31\uA756\uA758\u024A'
	}, {
		'base' : 'R',
		'letters' : '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'
	}, {
		'base' : 'S',
		'letters' : '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'
	}, {
		'base' : 'T',
		'letters' : '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'
	}, {
		'base' : 'TZ',
		'letters' : '\uA728'
	}, {
		'base' : 'U',
		'letters' : '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'
	}, {
		'base' : 'V',
		'letters' : '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'
	}, {
		'base' : 'VY',
		'letters' : '\uA760'
	}, {
		'base' : 'W',
		'letters' : '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'
	}, {
		'base' : 'X',
		'letters' : '\u0058\u24CD\uFF38\u1E8A\u1E8C'
	}, {
		'base' : 'Y',
		'letters' : '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'
	}, {
		'base' : 'Z',
		'letters' : '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'
	}, {
		'base' : 'a',
		'letters' : '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'
	}, {
		'base' : 'aa',
		'letters' : '\uA733'
	}, {
		'base' : 'ae',
		'letters' : '\u00E6\u01FD\u01E3'
	}, {
		'base' : 'ao',
		'letters' : '\uA735'
	}, {
		'base' : 'au',
		'letters' : '\uA737'
	}, {
		'base' : 'av',
		'letters' : '\uA739\uA73B'
	}, {
		'base' : 'ay',
		'letters' : '\uA73D'
	}, {
		'base' : 'b',
		'letters' : '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'
	}, {
		'base' : 'c',
		'letters' : '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'
	}, {
		'base' : 'd',
		'letters' : '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'
	}, {
		'base' : 'dz',
		'letters' : '\u01F3\u01C6'
	}, {
		'base' : 'e',
		'letters' : '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'
	}, {
		'base' : 'f',
		'letters' : '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'
	}, {
		'base' : 'g',
		'letters' : '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'
	}, {
		'base' : 'h',
		'letters' : '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'
	}, {
		'base' : 'hv',
		'letters' : '\u0195'
	}, {
		'base' : 'i',
		'letters' : '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'
	}, {
		'base' : 'j',
		'letters' : '\u006A\u24D9\uFF4A\u0135\u01F0\u0249'
	}, {
		'base' : 'k',
		'letters' : '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'
	}, {
		'base' : 'l',
		'letters' : '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'
	}, {
		'base' : 'lj',
		'letters' : '\u01C9'
	}, {
		'base' : 'm',
		'letters' : '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'
	}, {
		'base' : 'n',
		'letters' : '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'
	}, {
		'base' : 'nj',
		'letters' : '\u01CC'
	}, {
		'base' : 'o',
		'letters' : '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'
	}, {
		'base' : 'oi',
		'letters' : '\u01A3'
	}, {
		'base' : 'ou',
		'letters' : '\u0223'
	}, {
		'base' : 'oo',
		'letters' : '\uA74F'
	}, {
		'base' : 'p',
		'letters' : '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'
	}, {
		'base' : 'q',
		'letters' : '\u0071\u24E0\uFF51\u024B\uA757\uA759'
	}, {
		'base' : 'r',
		'letters' : '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'
	}, {
		'base' : 's',
		'letters' : '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'
	}, {
		'base' : 't',
		'letters' : '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'
	}, {
		'base' : 'tz',
		'letters' : '\uA729'
	}, {
		'base' : 'u',
		'letters' : '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'
	}, {
		'base' : 'v',
		'letters' : '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'
	}, {
		'base' : 'vy',
		'letters' : '\uA761'
	}, {
		'base' : 'w',
		'letters' : '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'
	}, {
		'base' : 'x',
		'letters' : '\u0078\u24E7\uFF58\u1E8B\u1E8D'
	}, {
		'base' : 'y',
		'letters' : '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'
	}, {
		'base' : 'z',
		'letters' : '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'
	}
];
var diacriticsMap = {};
for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
	var letters = defaultDiacriticsRemovalMap[i].letters;
	for (var j = 0; j < letters.length; j++) {
		diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
	}
};

// "what?" version ... http://jsperf.com/diacritics/12
function removeDiacritics(str) {
	return str.replace(/[^\u0000-\u007E]/g, function (a) {
		return diacriticsMap[a] || a;
	});
};

// a way to change an attribute of a particular itemID element in a dialog.
function setDialogName(dialogElem, itemID, attrNm, setAttr) {
	if (dialogElem.description && dialogElem.description.elements) dialogElem = dialogElem.description.elements;
	for (var i = 0; i < dialogElem.length; i++) {
		var tElem = dialogElem[i];
		if (tElem.item_id && tElem.item_id === itemID) {
			tElem[attrNm] = setAttr;
			return true;
		} else if (tElem.elements) {
			var isSet = setDialogName(tElem.elements, itemID, attrNm, setAttr);
			if (isSet) return true;
		};
	};
};

//return a random number between 1 and the input 'die'
function RollD(die) {
    return Math.floor(Math.random() * die) + 1;
};

//set the other checkbox Dis/Adv off when clicking this field (on MouseUp)
function SetDisAdv() {
	var Adv = (/Adv$/).test(event.target.name);
	this.getField(event.target.name.replace(Adv ? "Adv" : "Dis", Adv ? "Dis" : "Adv")).value = "Off";
};

//see if two strings don't differ too much in length
function similarLen(str1, str2) {
	return Math.abs(str1.length - str2.length) < 5 || Math.abs(str1.length, str2.length) / Math.max(str1.length, str2.length) < 0.2;
};

//test if a template is visible or not
function isTemplVis(tempNm, returnPrefix) {
	if (!BookMarkList[tempNm] || !tDoc.getField(BookMarkList[tempNm])) return false;
	var isVisible = false;
	var multiTemp = TemplatesWithExtras.indexOf(tempNm) !== -1;
	var firstTempl = "";
	if (!multiTemp) {
		var tempPage = tDoc.getField(BookMarkList[tempNm]).page;
		isVisible = (isArray(tempPage) ? Math.max.apply(Math, tempPage) : tempPage) !== -1;
	} else {
		isVisible = What("Template.extras." + tempNm) !== "";
		firstTempl = What("Template.extras." + tempNm).split(",")[1];
	};
	if (!isVisible && tempNm === "SSfront") {
		isVisible = isTemplVis("SSmore", returnPrefix);
		if (isArray(isVisible)) {
			firstTempl = isVisible[1];
			isVisible = isVisible[0];
		};
	};
	return returnPrefix && firstTempl ? [isVisible, firstTempl] : isVisible;
};

// A way to return a new, fresh object
function newObj(inObj) {
	return eval(inObj.toSource());
};

// Returns the template prefix, or true if not the template, or an empty string if rEmpty is true
function getTemplPre(tName, templ, rEmpty) {
	templ = templ + ".";
	return tName.indexOf(templ) === -1 ? (rEmpty ? "" : true) : tName.substring(0, tName.indexOf(templ)) + templ;
};

// Change a number to a 2-spaced semantic versioning scheme (13.011 -> 13.1.10)
function nmbrToSemanticVersion(inNmbr) {
	inNmbr = parseFloat(inNmbr);
	if (isNaN(inNmbr)) return 0;
	var strV = inNmbr.toString().split(".");
	var versStr = [strV[0]];
	if (strV[1]) {
		for (var i = 0; i < strV[1].length; i++) {
			var partI2 = strV[1][i] + (strV[1][i+1] ? strV[1][i+1] : 0);
			versStr.push(Number(partI2));
			i++
		};
	};
	var theSemV = versStr.join(".").toString();
	if (versStr.length < 3) {
		for (var i = versStr.length; i < 3; i++) theSemV += ".0";
	};
	return theSemV;
};

// Change a semantic versioning scheme to a number (13.1.10 -> 13.011)
function semVersToNmbr(inSemV) {
	if (!isNaN(inSemV)) return Number(inSemV);
	if (isNaN(parseFloat(inSemV))) {
		if (!(/\d/).test(inSemV)) return 0;
		inSemV = inSemV.replace(/.*?(\d.*)/, "$1");
	};
	var strV = inSemV.toString().split(".");
	var nmbrStr = [strV[0], ""];
	if (strV[1]) {
		for (var i = 1; i < strV.length; i++) {
			var nmbrAdd = parseFloat(strV[i]);
			if (isNaN(nmbrAdd)) continue;
			nmbrStr[1] += ("0" + nmbrAdd).slice(-2);
		};
	};
	if (strV.length) nmbrStr.push(strV.join(""));
	var nmbr = parseFloat(nmbrStr.join("."));
	return isNaN(nmbr) ? 0 : nmbr;
};

// Stop calculations and drawing of fields in the whole PDF to speed up changes
// give a namedStop to make sure that it only can be started again with the same namedStop (and if no other namedStops are present)
function calcStop(noSheetUpdate) {
	noSheetUpdate = noSheetUpdate !== undefined ? noSheetUpdate : !IsNotReset || !IsNotImport;
	app.calculate = false;
	tDoc.calculate = false;
	tDoc.delay = true;
	if (!calcStartSet) calcStartSet = app.setTimeOut("calcCont(" + noSheetUpdate + ", true);", 250);
};

// function to start the calculations of the PDF again
function calcCont(noSheetUpdate, viaTimeOut) {
	if (!noSheetUpdate) UpdateSheetWeapons(); // first recalculate the weapons if set to do so, before restarting any calculations
	if (calcStartSet) {
		app.clearTimeOut(calcStartSet);
		calcStartSet = false;
	}
	var currentDirty = tDoc.dirty;
	app.calculate = true;
	tDoc.calculate = true;
	tDoc.delay = false;
	tDoc.calculateNow();
	tDoc.dirty = currentDirty;
	thermoStop();
	if (!noSheetUpdate) {
		UpdateSheetDisplay();
		thermoStop();
	} else if (viaTimeOut) {
		CurrentUpdates = {types : []};
	}
};

// function to find the value (date) of a source
function sourceDate(srcArr) {
	if (!srcArr) return 0;
	srcArr = !isArray(srcArr) ? [srcArr] : [].concat.apply([], srcArr);
	var dateArr = [0];
	for (var i = 0; i < srcArr.length; i++) {
		var src = srcArr[i];
		if (!SourceList[src] || CurrentSources.globalExcl.indexOf(src) !== -1) continue;
		var srcDate = src === "SRD" ? 1 : src === "HB" ? 90001231 : SourceList[src].date ? Number(SourceList[src].date.replace(/\D/g, "")) : 'stop';
		if (!isNaN(srcDate)) dateArr.push(srcDate);
	};
	return Math.max.apply(Math, dateArr);
};

function MakeDocName() {
	return "MorePurpleMoreBetter's D&D 5th edition " + (tDoc.info.SpellsOnly ? "Complete " + tDoc.info.SpellsOnly.capitalize() + " Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")) + " v" + semVers + " (" + tDoc.info.SheetType + ")";
};

function MakeButtons() {
	CreateIcons();
	try {
		if (!tDoc.info.SpellsOnly) {
			app.addToolButton({
				cName : "LayoutButton",
				cExec : minVer ? "MakeAdvLogMenu_AdvLogOptions(true);" : "MakePagesMenu(); PagesOptions();",
				oIcon : allIcons.layout,
				cTooltext : toUni("Set Pages Layout") + "\nSelect which pages are visible in the sheet and set the different lay-out options on those pages. Some pages might offer extra options on the page itself.\n\nNote that you can have multiple instances of the following pages:\n   \u2022  Companion page;\n   \u2022  Notes page;\n   \u2022  Wild Shapes page;\n   \u2022  Spell Sheet page.;\n   \u2022  Adventure Logsheet.\n\nIf you add more pages or you hide/show the pages many times, the file size might increase.",
				nPos : 0,
				cLabel : "Layout"
			});
		}
		if (!minVer) {
			app.addToolButton({
				cName : "ResetButton",
				cExec : "ResetAll();",
				oIcon : allIcons.reset,
				cTooltext : toUni("Reset") + "\nReset the entire sheet and all form fields to their initial value.",
				nPos : 1,
				cLabel : "Reset"
			});
		}
		if (!tDoc.info.AdvLogOnly) {
			app.addToolButton({
				cName : "ImportExportButton",
				cExec : "ImportExport_Button();",
				oIcon : allIcons.import,
				cTooltext :  minVer ? toUni("Add Custom Script") + "\nAdd a script to add new spells, modify spells and more, see FAQ." : toUni("Import / Export") + "\n \u2022  Import all the information from an old sheet directly;\n \u2022  Add custom script, see FAQ;\n \u2022  Alternatively, you can import or export data with the .xfdf file format. This method is depreciated, but might still be interesting if you only want to import the equipment sections or only the description sections.\n\nThe description sections include the top of first page, background page, notes, and companion description.",
				nPos : 2,
				cLabel : "Import"
			});
			app.addToolButton({
				cName : "SourcesButton",
				cExec : "resourceDecisionDialog();",
				oIcon : allIcons.sources,
				cTooltext : toUni("Select Sources") + "\nOpen a dialogue where you can select which sourcebooks and materials the sheet is allowed to use and which it has to excluded from the automation." + (this.info.SpellsOnly ? "\n\nHere you can select which sources are used for the spells or even exclude certain spells or spell schools. After you have set this, you will have to manually re-generate the spell sheet using the 'Spells' button/bookmark." : "\n\nHere you can make the sheet include all Unearthed Arcana material or even have the sheet exclude certain classes, races, spells, etc. etc.\n\nYou are advised to set the sources before filling out the sheet as it may cause certain fields to be reset."),
				nPos : 3,
				cLabel : "Sources"
			});
		}

		if (!tDoc.info.SpellsOnly) {
			app.addToolButton({
				cName : "SetTextOptionsButton",
				cExec : "MakeTextMenu_TextOptions();",
				oIcon : allIcons.textsize,
				cTooltext : toUni("Text Options") + "\nWith this button you can:\n   \u2022  Set the font of all fillable fields" + "\n   \u2022  Set the font size of fields with multiple lines;\n   \u2022  Hide\/show the text lines on all pages" + (!typePF ? "" : ";\n   \u2022  Switch between boxes or lines for single-line fields."),
				nPos : 4,
				cLabel : "Text"
			});
		}

		if (!minVer) {
			app.addToolButton({
				cName : "ClassesButton",
				cExec : "SelectClass();",
				oIcon : allIcons.classes,
				cTooltext : toUni("Set Character Classes") + "\nOpen a pop-up dialogue where you can set the classes, subclasses, and levels the character has.\n\nYou get drop-down boxes for selecting a class and its subclass, and can test what text you enter is being recognized as what class/subclass.",
				nPos : 5,
				cLabel : "Class"
			});
			app.addToolButton({
				cName : "SetToManualButton",
				cExec : "SetToManual_Button();",
				oIcon : allIcons.automanual,
				cTooltext : toUni("Auto / Manual") + "\nSwitch between manual or automatic calculation\/implementation of:\n   \u2022  Attacks;\n   \u2022  Background;\n   \u2022  Class;\n   \u2022  Feats;\n   \u2022  Race.",
				nPos : 6,
				cLabel : "Manual"
			});
			app.addToolButton({
				cName : "WeightToCalcButton",
				cExec : "WeightToCalc_Button();",
				oIcon : allIcons.weight,
				cTooltext : toUni("Weight Calculation") + "\nOpen the Total Weight dialogue where you can choose what is and what is not counted towards the Total Weight on the second page.\n\nIn the dialogue you can also select which encumbrance rules to use.",
				nPos : 7,
				cLabel : "Weight"
			});
			app.addToolButton({
				cName : "AbilityScoresButton",
				cExec : "AbilityScores_Button();",
				oIcon : allIcons.scores,
				cTooltext : toUni("Ability Scores") + "\nOpen the Ability Scores dialog where you can set them using their separate parts, see the Point Buy value, and apply a magic item that overrides.\n\nThis dialog also gives the option to add Honor/Sanity.",
				nPos : 8,
				cLabel : "Scores"
			});
			app.addToolButton({
				cName : "BlueTextButton",
				cExec : "ToggleBlueText();",
				oIcon : allIcons.modifiers,
				cTooltext : toUni("Modifier Fields") + "\nHide\/show fields where you can manually add modifiers for:\n   \u2022  Ability save DC;\n   \u2022  Attacks to hit and damage bonusses;\n   \u2022  Attacks damage die;\n   \u2022  Proficiency bonus, or the use of proficiency dice;\n   \u2022  Saves;\n   \u2022  Skills, with Jack of All Trades and Remarkable Athlete;\n   \u2022  Number of spell slots;\n   \u2022  Initiative;\n   \u2022  Carrying capacity multiplier;\n   \u2022  Weights of armor, shield, weapons, and ammunition.\n\nThese are the so-called \"blue text fields\" and they won't print, even when they are visible.",
				cMarked : "event.rc = CurrentVars.bluetxt;",
				nPos : 9,
				cLabel : "Mods"
			});
		}

		if (!tDoc.info.AdvLogOnly) {
			app.addToolButton({
				cName : "SpellsButton",
				cExec : "MakeSpellMenu_SpellOptions();",
				oIcon : allIcons.spells,
				cTooltext : toUni("Spells Options") + "\nGet a menu with the options to:\n   \u2022  Create a Spell Sheet;\n   \u2022  Select the sources for that Spell Sheet;\n   \u2022  Delete an existing Spell Sheet;" + (!typePF ? "\n   \u2022  Set the visibility of the Spell Slot check boxes to the Spell Sheet, the Limited Feature section, or both;" : "") + "\n   \u2022  Set the sheet to use Spell Points instead of Spell Slots.\n\nGenerating a Spell Sheet will involve filling out a dialog for each spellcasting class/race/feat. After that you can select which is included in the Spell Sheet and in what order.", //\n\nAlternatively you can create an empty Spell Sheet which you can fill out manually.",
				nPos : 10,
				cLabel : "Spells"
			});
		}

		if (!minVer) {
			app.addToolButton({
				cName : "AdventureLeagueButton",
				cExec : "MakeAdventureLeagueMenu(); AdventureLeagueOptions();",
				oIcon : allIcons.league,
				cTooltext : toUni("Adventurers League") + "\nHide\/show fields for Adventurers League play:\n   \u2022  'DCI' on the 1st page;\n   \u2022  'Faction Rank' and 'Renown' on the Background page;\n   \u2022  Sets HP value on the 1st page to 'always fixed';" + (typePF ? "" : "\n   \u2022  Removes the action options from the DMG on the 1st page;") + "\n   \u2022  Adds asterisks for action options taken from the DMG in the reference section.\n\nThis button can also make the \"Adventurers Logsheet\" visible if it isn't already.\n\nNote that this Character Generator\/Sheet offers some options that are not legal in Adventurer's League play regardless of enabling this button or not.",
				cMarked : "event.rc = Number(tDoc.getField('League Remember').submitName);",
				nPos : 11,
				cLabel : "League"
			});
			app.addToolButton({
				cName : "PrintButton",
				cExec : "PrintButton();",
				oIcon : allIcons.print,
				cTooltext : toUni("Print") + "\nSelect what pages you want to print and open the print dialog.\n\nThe pages you select will be remembered for the next time you press this button.\n\nYou also get an option to hide all fields on the sheet before printing.",
				nPos : 12,
				cLabel : "Print"
			});
		};
		app.addToolButton({
			cName : "MakeMobileReadyButton",
			cExec : "MakeMobileReady();",
			oIcon : allIcons.tablet,
			cTooltext : toUni("Flatten") + "\nSwitch to or from a version of the sheet that is compatible with Acrobat Reader for mobile devices.\nThis flattens all form fields and hides non-printable ones to make the sheet more usable on a phone or tablet.\n\nThe fields used during normal play will stay editable:\n   \u2022  1st page: health, attacks, actions, adv.\/disadv., etc.;\n   \u2022  2nd page: equipment and proficiencies;\n   \u2022  3rd-6th page: all except buttons and portrait\/symbol.",
			cMarked : "event.rc = CurrentVars.mobileset ? CurrentVars.mobileset.active : false;",
			nPos : 13,
			cLabel : "Flatten"
		});
		app.addToolButton({
			cName : "SetUnitDecimalsButton",
			cExec : "SetUnitDecimals_Button();",
			oIcon : allIcons.unitsystem,
			cTooltext : toUni("Unit System") + "\nOpen a dialog where you can select the following:\n   \u2022  Unit system: metric or imperial\n   \u2022  Decimal separator: dot or comma.",
			nPos : 14,
			cLabel : "Units"
		});
		app.addToolButton({
			cName : "ColorButton",
			cExec : "MakeColorMenu(); ColoryOptions();",
			oIcon : allIcons.colors,
			cTooltext : !typePF ? toUni("Set Color Theme") + "\nControl the color theme of the sheet in the following ways:\n   \u2022  Color of the Headers;\n   \u2022  Color of the Dragon Heads;" + (minVer ? "" : "\n   \u2022  Color of the HP Dragons;\n   \u2022  Color of the Ability Save DCs;") + "\n   \u2022  Color of the form field highlighting.\n\nNote that the color of the highlighting might affect other PDFs you currently have opened. It will revert to normal once you close this sheet, but will be applied again once you open this sheet." : toUni("Set Highlighting Color") + "\nSet the color of the form field highlighting.\n\nYou can select several colors, the adobe default color, or turn form field highlighting off.\n\nNote that the color of the highlighting might affect other PDFs you currently have opened. It will revert to normal once you close this sheet, but will be applied again once you open this sheet.",
			nPos : 15,
			cLabel : "Color"
		});
		app.addToolButton({
			cName : "FAQButton",
			cExec : "getFAQ();",
			oIcon : allIcons.faq,
			cTooltext : toUni("FAQ") + "\nOpen the frequently asked questions pdf.\n\nThere you can find information on how to add custom code to the sheet, like homebrew races\/weapons\/feats\/etc.",
			nPos : 16,
			cLabel : "FAQ"
		});
	} catch (err) {
		app.addToolButton({
			cName : "TempButton",
			cExec : "",
			cLabel : "Just to make it appear"
		});
		app.removeToolButton({
			cName : "TempButton"
		});
	}
};

function OpeningStatement() {
	var reminders = Number(tDoc.getField("Opening Remember").submitName);
	if (!app.viewerVersion || !reminders || (app.viewerVersion < 15 && reminders <= 3)) {
		CurrentSources.globalExcl = ["UA:TMC"];
		var oldVerAlert = app.alert({
			nIcon : 0,
			cTitle : "Please update your Adobe Acrobat",
			cMsg : "This version of Adobe Acrobat is not supported for use with MPMB's D&D 5e Character Tools. You need at least Adobe Acrobat DC (Reader, Pro, or Standard) to use this PDF's full automation. Please know that if you continue to use the sheet with this outdated version of Adobe Acrobat, some features will not work (correctly) and others might produce errors (e.g. the Source Selection and the Mystic class).\n\nDo you want to close this pdf and visit the Adobe website where you can download the latest version of Adobe Acrobat Reader for free (https://get.adobe.com/reader/)?\n\nPlease understand that if you choose 'No', there will be no support if anything doesn't work.\n\n" + (!reminders ? "As you aren't using Adobe Acrobat to view this PDF, you will not be redirected to the website to download Adobe Acrobat Reader for free. Please go there manually.\n\nhttps://get.adobe.com/reader/" : reminders == 1 ? "You will get this warning again the next two times that you open this sheet in an unsupported version of Adobe Acrobat." : reminders == 2 ? "You will get this warning again the next time you open this sheet in an unsupported version of Adobe Acrobat." : "This is the last time this pdf character sheet shows this warning."),
			nType : 2
		});
		if (oldVerAlert === 4) {
			app.launchURL("https://get.adobe.com/reader/", true);
			tDoc.closeDoc();
			return;
		};
		tDoc.getField("Opening Remember").submitName += 1;
	};
	if (What("Opening Remember") === "No") {
		this.dirty = false;
		this.pane = "bookmarks"; //open the bookmarks so that on the first opening people can see its existance
		var sheetTitle = "MorePurpleMoreBetter's " + (tDoc.info.SpellsOnly ? "Complete " + tDoc.info.SpellsOnly.capitalize() + " Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")) + " (" + tDoc.info.SheetType + ") v" + semVers;
		var Text = "[Can't see the 'OK' button at the bottom? Use ENTER to close this dialog]\n\n";
		Text += "Welcome to " + toUni(sheetTitle);
		Text += " (get the latest version using the bookmark).";
		Text += patreonVersion ? "" : "\n\n" + toUni("Only SRD") + ": This sheet is only allowed to contain content from the System Reference Document and no other Wizards of the Coast publications, as they are protected by copyright. If you want to get more content to use with the sheet, see the \"Add Extra Materials\" bookmark.";
		Text += "\n\n" + toUni("Tooltips") + ": This sheet makes extensive use of tooltips (mouseover texts). Hover your cursor over a field to find how you can enter things into the field, reference to the source, explanatory text, or even a list of options your selection offers you.";
		Text += "\n\n" + toUni("Functions") + ": Check out the buttons in the \'JavaScript Window\'-toolbar and the bookmarks. Hover your cursor over a button in the \'JavaScript Window\'-toolbar to see what it does.";
		Text += minVer ? "" : "\n\n" + toUni("Modifiers") + ": With the \"Mods\" button you can add modifiers to the calculated values.";
		Text += tDoc.info.SpellsOnly ? "" : "\n\n" + toUni("Layout") + ": With the \"Layout\" button you can hide, add, and remove certain pages.";
		Text += tDoc.info.AdvLogOnly ? "" : "\n\n" + toUni("Spells") + ": With the \"Spells\" button you can have the sheet generate a spell sheet based on your character, or manually create one.";
		Text += !typePF ? "\n\n" + toUni("Color Options") + ": With the \"Color\" button or the top right logo on the first page, you can change the graphical elements of this sheet to 11 different colors." : "";
		Text += tDoc.info.AdvLogOnly ? "" : "\n\n" + toUni("Sources") + ": With the \"Sources\" button you can set which resources you want the sheet to use, including most Unearthed Arcana material (e.g. the Revised Ranger). You can also get more using the \"Get Additional Content\" bookmark, like the Gunslinger, Blood Hunter, College of the Maestro by Matthew Mercer, and many others...";
		Text += "\n\nHave fun with the sheet and the adventures you embark on with its help!\n - MorePurpleMoreBetter - ";
		var oCk = {
			bInitialValue : true,
			bAfterValue : false
		};
		app.alert({
			cMsg : Text,
			nIcon : 3,
			cTitle : "Before you get started with MPMB's " + (tDoc.info.SpellsOnly ? "Complete Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")),
			oCheckbox : oCk
		});
		if (oCk.bAfterValue) {
			Value("Opening Remember", "Yes");
		};
		if (!minVer && CurrentSources.firstTime && app.viewerVersion >= 15) resourceDecisionDialog(true);
	};
	if (tDoc.getField("SaveIMG.Patreon").submitName !== "") {
		OpeningStatementVar = app.setTimeOut("PatreonStatement();", 66000);
	};
};

function ResetTooltips() {
	var TooltipArray = [
		"Proficiency Armor Light",
		"Proficiency Armor Medium",
		"Proficiency Armor Heavy",
		"Proficiency Shields",
		"Proficiency Weapon Simple",
		"Proficiency Weapon Martial",
		"Proficiency Weapon Other",
		"AC Misc Mod 1 Description",
		"AC Misc Mod 2 Description",
		"Speed",
		"Speed encumbered",
		"Highlighting",
		"Saving Throw advantages / disadvantages",
		"Vision"
	];
	var clearSubmits = [
		"All ST Bonus",
		"Init Bonus",
		"Passive Perception Bonus",
		"All Skills Bonus",
		"Spell DC 1 Bonus",
		"Spell DC 2 Bonus"
	]
	var clearCalcs = [];
	for (var i = 1; i <= FieldNumbers.langstools; i++) {
		TooltipArray.push("Tool " + i);
		TooltipArray.push("Language " + i);
	}
	for (i = 1; i <= FieldNumbers.actions; i++) {
		TooltipArray.push("Bonus Action " + i);
		TooltipArray.push("Reaction " + i);
	}
	for (i = 1; i <= FieldNumbers.trueactions; i++) {
		TooltipArray.push("Action " + i);
	}
	for (i = 0; i <= AbilityScores.abbreviations.length; i++) {
		TooltipArray.push((i === AbilityScores.abbreviations.length ? "HoS" : AbilityScores.abbreviations[i]) + " ST Prof");
		clearSubmits.push((i === AbilityScores.abbreviations.length ? "HoS" : AbilityScores.abbreviations[i]) + " ST Bonus");
	}
	for (i = 1; i <= FieldNumbers.limfea; i++) {
		TooltipArray.push("Limited Feature " + i);
		clearCalcs.push("Limited Feature Max Usages " + i);
	}
	for (i = 1; i <= 6; i++) {
		TooltipArray.push("Resistance Damage Type " + i);
	}
	for (i = 1; i <= FieldNumbers.attacks; i++) {
		var fld = "BlueText.Attack." + i;
		clearSubmits.push(fld + ".To Hit Bonus");
		clearSubmits.push(fld + ".Damage Bonus");
		clearSubmits.push(fld + ".Damage Die");
	}
	for (i = 1; i <= FieldNumbers.magicitems; i++) {
		clearSubmits.push("Extra.Magic Item Attuned " + i);
	}

	//remove the tooltips from every fieldname in the array
	for (i = 0; i < TooltipArray.length; i++) {
		AddTooltip(TooltipArray[i], "", "");
	};
	for (i = 0; i < clearSubmits.length; i++) {
		AddTooltip(clearSubmits[i], undefined, "");
	};
	for (i = 0; i < clearCalcs.length; i++) {
		AddTooltip(clearCalcs[i], undefined, "");
		tDoc.getField(clearCalcs[i]).setAction("Calculate", "");
	};
	AddTooltip("Equipment.menu", "Click here to add equipment to the adventuring gear section, or to reset it (this button does not print).\n\nIt is recommended to pick a pack first before you add any background's items.");
	AddTooltip("Background Extra", 'First fill out a background in the field to the left.\n\nOnce a background is recognized that offers additional options, those additional options will be displayed here. For example, the "Origin" for the "Outlander" background.');
	SetHPTooltip("reset");
	setSkillTooltips(true);
	correctMIattunedVisibility();
};

function AddResistance(input, tooltip, replaceThis, replaceMatch) {
	var useful = undefined;
	var usefulreplace = undefined;
	var inputCl = clean(input, false, true);
	var replaceThisString = replaceThis ? clean(replaceThis, false, true) : "";
	if (DamageTypes[inputCl.toLowerCase()]) {
		useful = DamageTypes[inputCl.toLowerCase()].index;
	};
	if (replaceThis && DamageTypes[replaceThisString.toLowerCase()]) {
		usefulreplace = DamageTypes[replaceThisString.toLowerCase()].index;
	};
	var tooltipString = tooltip ? formatMultiList("\"" + inputCl + "\" resistance was gained from:", tooltip) : "";
	var doReplace = false;
	var testRegex = useful !== undefined ? /does_not_match/ : MakeRegex(inputCl);
	for (var n = 1; n <= 2; n++) {
		for (var k = 1; k <= 6; k++) {
			var next = tDoc.getField("Resistance Damage Type " + k);
			if (n === 1 && (next.currentValueIndices === useful || next.value == inputCl || next.submitName == inputCl || ((testRegex).test(next.value) && similarLen(next.value, inputCl)))) {
				if (!replaceThis) {
					next.userName = tooltipString;
					next.submitName = inputCl;
				};
				return;
			} else if (n === 1 && replaceThis && (next.submitName == replaceThisString || next.value == replaceThisString || (usefulreplace !== undefined && next.currentValueIndices === usefulreplace) || (replaceMatch && replaceThisString.toLowerCase().indexOf(next.value.toLowerCase()) !== -1))) {
				doReplace = k;
			} else if (n === 2 && (doReplace === k || (!doReplace && clean(next.value) === ""))) {
				if (useful !== undefined) {
					next.currentValueIndices = useful;
				} else {
					next.value = inputCl;
				};
				if (!replaceThis) {
					next.submitName = next.value;
					next.userName = tooltipString;
				};
				break;
			};
		};
	};
};

function RemoveResistance(Input) {
	var useStr = clean(Input, false, true);
	var useReg = MakeRegex(useStr);
	for (var k = 1; k <= 6; k++) {
		var fld = "Resistance Damage Type " + k;
		var ResFld = What(fld);
		if (ResFld === useStr | ((useReg).test(ResFld) && similarLen(ResFld, useStr))) {
			DeleteItemType("Resistance Damage Type ", k, 6);
			return;
		} else if (How(fld) == useStr) {
			AddTooltip(fld, "", "");
			return;
		};
	};
};

function AddDmgType(Field, Input) {
	var useful = !Input ? 0 : (DamageTypes[Input.toLowerCase()] ? DamageTypes[Input.toLowerCase()].index : Input);
	PickDropdown(Field, useful);
};

// Toggle between text lines toggle = true to hide the lines and toggle = false to show the lines
function ToggleWhiteout(toggle) {
	if (CurrentVars.whiteout == undefined) CurrentVars.whiteout = tDoc.getField("Whiteout.Standard.0").display == display.visible;

	if (toggle !== undefined && ((toggle && CurrentVars.whiteout) || (!toggle && !CurrentVars.whiteout))) return;
	var nowWhat = !CurrentVars.whiteout; // Toggle the current state

	// Start progress bar and stop calculations
	var thermoTxt = thermoM((nowWhat ? "Hide" : "Show") + " the text lines for mult-line fields...");
	calcStop();

	MakeMobileReady(false); // Undo flatten, if needed

	// Add the fields for all the template pages into an array
	var compTemps = What("Template.extras.AScomp").split(","); // so include the ""
	var noteTemps = What("Template.extras.ASnotes").split(",").splice(1);
	var wildTemps = What("Template.extras.WSfront").split(",").splice(1);
	var logTemps = What("Template.extras.ALlog").split(",").splice(1);
	var templateA = compTemps.concat(noteTemps).concat(wildTemps).concat(logTemps);

	// Show/hide the whiteout fields as per the array
	for (var i = 0; i < templateA.length; i++) {
		var whiteFld = templateA[i] + "Whiteout";
		if (nowWhat) {
			Show(whiteFld);
		} else {
			Hide(whiteFld);
		}
		thermoM((i+1)/(templateA.length+2)); // Increment the progress bar
	};

	CurrentVars.whiteout = nowWhat;
	SetStringifieds("vars"); // Save the settings to a field

	// Show/hide the whiteout field on page 3 depending on the state of the layers
	LayerVisibilityOptions();

	thermoM(thermoTxt, true); // Stop progress bar
};

function ResetAll(GoOn, noTempl) {
	var oCk = {
		cMsg : "Also delete all imported scripts, both files and manual input, as well as the source selection",
		bInitialValue : false,
		bAfterValue : false
	};
	var ResetDialog = {
		cTitle : "Reset the whole sheet",
		cMsg : "Are you sure you want to reset all fields and functions to their initial value?\n\nThis will undo any changes you have made, including page layout and imported images.\n\nThis cannot be undone!",
		nIcon : 1, //Warning
		nType : 2, //Yes, No
		oCheckbox : oCk
	};
	if (!GoOn && app.alert(ResetDialog) !== 4) return;
	var keepImports = !oCk.bAfterValue;
	if (keepImports) {
		var userScriptString = What("User Script");
	};
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Resetting the sheet" + (GoOn ? ' "' + tDoc.documentFileName + '"' : '') + "...");
	calcStop(true);
	IsNotReset = false;

	//make a variable of the current state of location columns in the equipment sections
	var locColumns = What("Gear Location Remember").split(",");

	MakeMobileReady(false); // Undo flatten, if needed

	thermoM(1/9); //increment the progress dialog's progress

	//delete any extra templates and make any template that is invisible, visible
	RemoveSpellSheets(); //first do all the Spell Sheets
	var defaultShowTempl = ["ASfront", "ASbackgr", "PRsheet"];
	for (var R in TemplateDep) {
		if (R === "SSfront" || R === "SSmore" || (!typePF && R === "PRsheet")) continue; //don't do this for the spell sheets, they have their own function; also don't do it for the player reference sheet in not the Printer Friendly version, as it doesn't exist
		//first see if the template is visible
		var isTempVisible = isTemplVis(R);
		var tempExtras = What("Template.extras." + R);

		//if invisible, and one of the defaultShowTempl, make it visible
		if (!isTempVisible && defaultShowTempl.indexOf(R) !== -1) {
			DoTemplate(R, "Add");
		} else if (tempExtras) { //if there can be multiples of a template, remove them
			DoTemplate(R, "RemoveAll", false, true); //remove all of them
		} else if (isTempVisible && defaultShowTempl.indexOf(R) === -1) {
			DoTemplate(R, "Remove"); //remove all of them
		};
	};

	setListsUnitSystem("imperial"); //reset the values of some variables to the right unit system

	thermoM(2/9); //increment the progress dialog's progress

	// Reset of all the form field values
	tDoc.resetForm();
	thermoM(3/9); //increment the progress dialog's progress
	tDoc.resetForm(); // do this twice so that all variables based on fields are also reset
	for (var i = 1; i <= FieldNumbers.limfea; i++) {
		tDoc.getField("Limited Feature Max Usages " + i).setAction("Calculate", "");
		tDoc.getField("Limited Feature Max Usages " + i).submitName = "";
	};
	tDoc.getField("AC Misc Mod 1 Description").submitName = "";
	tDoc.getField("AC Misc Mod 2 Description").submitName = "";
	tDoc.getField("Opening Remember").submitName = 1;
	tDoc.getField("Character Level").submitName = 0;
	thermoM(4/9); //increment the progress dialog's progress

	//Reset the color scheme to red
	setColorThemes(true);
	thermoM(5/9); //increment the progress dialog's progress

	//reset some global variables
	CurrentClasses = {};
	classes.known = {};
	classes.old = {};
	CurrentRace = {};
	CurrentBackground = {};
	CurrentCompRace = {};
	GetStringifieds(keepImports);

	if (keepImports) { // remove the imports and reset the sources
		SetStringifieds("sources");
		SetStringifieds("scriptfiles");
		Value("User Script", userScriptString);
	} else { // re-apply the imports and keep the sources setting
		InitiateLists();
		resourceDecisionDialog(true, true); //to make sure that even if the sheet is used before re-opening, the resources are set to default
		UpdateDropdown("resources");
		spellsAfterUserScripts(true);
	};

	// Reset the calculation order
	ResetTooltips();
	setCalcOrder();

	thermoM(6/9); //increment the progress dialog's progress

	// Call upon some functions to reset other stuff than field values
	ConditionSet(true);
	ShowCalcBoxesLines();
	ToggleWhiteout(false);
	ChangeFont();
	ToggleTextSize();
	ToggleAttacks(false);
	ToggleBlueText(false);
	Toggle2ndAbilityDC("hide");
	AdventureLeagueOptions("advleague#all#0");
	SetSpellSlotsVisibility();
	ShowHonorSanity();
	delete CurrentVars.vislayers; LayerVisibilityOptions();
	ShowCompanionLayer();
	if (locColumns[0] === "true") HideInvLocationColumn("Adventuring Gear ", true);
	if (locColumns[1] === "true") HideInvLocationColumn("Extra.Gear ", true);
	ShowAttunedMagicalItems(true); // in equipment section
	SetHighlighting();
	UpdateALdateFormat();
	DnDlogo();

	thermoM(7/9); //increment the progress dialog's progress

	//Reset portrait & symbol to original blank
	ClearIcons("HeaderIcon", true);
	ClearIcons("AdvLog.HeaderIcon", true);
	ClearIcons("Portrait", true);
	ClearIcons("Symbol", true);
	ClearIcons("Comp.img.Portrait", true);

	//re-apply the rich text (deleted because of resetting the form fields)
	MakeSkillsMenu_SkillsOptions(["skills", "alphabeta"]);
	SetRichTextFields();

	thermoM(8/9); //increment the progress dialog's progress

	//generate an instance of the AScomp and ASnotes templates
	if (!noTempl) {
		DoTemplate("AScomp", "Add");
		DoTemplate("ASnotes", "Add");
	};
	// now move the focus to the first page
	tDoc.getField(BookMarkList["CSfront"]).setFocus();

	// Set global variable to reflect end of reset
	IsNotReset = true;
	InitializeEverything(true, true);
	thermoM(thermoTxt, true); // Stop progress bar
	tDoc.dirty = true;
};

// Select the text size to use (0 for auto), or if left empty, select the default text size of 5.74 (7 for Printer Friendly)
function ToggleTextSize(size) {
	if (CurrentVars.fontsize == undefined) CurrentVars.fontsize = typePF ? 7 : 5.74;
	var fontSize = size == undefined || isNaN(size) ? (typePF ? 7 : 5.74) : parseFloat(size);
	if (fontSize == CurrentVars.fontsize) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the font size to " + (fontSize ? fontSize : "'Auto'") + "...");
	calcStop();

	if (!tDoc.info.AdvLogOnly) {
		var LinesFld = [
			"Vision",
			"Saving Throw advantages / disadvantages",
			"HP Current",
			"Racial Traits",
			"Class Features",
			"Background Feature Description",
			"Personality Trait",
			"Ideal",
			"Bond",
			"Flaw",
			"Extra.Notes",
			"Extra.Other Holdings",
			"Background_History",
			"Background_Appearance",
			"Background_Enemies",
			"MoreProficiencies"
		].concat(typePF ?
			["Background_Organisation.Left", "Background_Organisation.Right"] :
			["Background_Organisation"]
		);
		for (var i = 1; i <= FieldNumbers.magicitems; i++) {
			LinesFld.push("Extra.Magic Item Description " + i);
		};
		for (var i = 1; i <= FieldNumbers.feats; i++) {
			LinesFld.push("Feat Description " + i);
		};

		//add the lines for all the companion pages
		var compTemps = What("Template.extras.AScomp").split(",");
		for (var T = 0; T < compTemps.length; T++) {
			var prefix = compTemps[T];
			LinesFld = LinesFld.concat([
				prefix + "Comp.Use.HP.Current",
				prefix + "Comp.Use.Senses",
				prefix + "Comp.Use.Features",
				prefix + "Comp.Use.Traits",
				prefix + "Cnote.Left",
				prefix + "Cnote.Right"
			]);
		}

		//add the lines for all the notes pages
		var noteTemps = What("Template.extras.ASnotes").split(",");
		for (var T = 0; T < noteTemps.length; T++) {
			var prefix = noteTemps[T];
			LinesFld = LinesFld.concat([
				prefix + "Notes.Left",
				prefix + "Notes.Right"
			]);
		}

		//add the lines for all the wild shapes pages
		var wildTemps = What("Template.extras.WSfront").split(",");
		for (var T = 0; T < wildTemps.length; T++) {
			var prefix = wildTemps[T];
			for (var W = 1; W <= 4; W++) {
				LinesFld = LinesFld.concat([
					prefix + "Wildshape." + W + ".HP Current",
					prefix + "Wildshape." + W + ".Traits"
				]);
			}
		}
	} else {
		var LinesFld = []
	}

	//add the lines for all the logsheet pages
	var logTemps = What("Template.extras.ALlog").split(",");
	for (var T = 0; T < logTemps.length; T++) {
		var prefix = logTemps[T];
		for (var L = 1; L <= FieldNumbers.logs; L++) {
			LinesFld.push(prefix + "AdvLog." + L + ".notes");
		}
	}

	for (var i = 0; i < LinesFld.length; i++) {
		tDoc.getField(LinesFld[i]).textSize = fontSize;
		thermoM((i+1)/LinesFld.length); // Increment the progress bar
	};

	CurrentVars.fontsize = fontSize;
	SetStringifieds("vars"); // Save the settings to a field
	thermoM(thermoTxt, true); // Stop progress bar
};

//set the visibility of the layers on the third page. Input is true if a menu is to be created, or false if the remembered setting is to be taken.
function show3rdPageNotes() {
	if (typePF || !What("Extra.Notes")) return;
	LayerVisibilityOptions(false, ['notes', false]);
}
function LayerVisibilityOptions(showMenu, useSelect) {
	if (typePF || minVer) return; //don't do this function in the Printer-Friendly version

	var isReset = false;
	if (CurrentVars.vislayers == undefined) {
		isReset = !showMenu;
		CurrentVars.vislayers = ["rules", "equipment"];
	}
	MakeMobileReady(false); // Undo flatten, if needed

	var possibleOptions = ["notes", "rules", "equipment"];
	if (!useSelect || useSelect === "justMenu") {
		Menus.chooselayers = [{
			cName : "Rules left - Equipment right",
			cReturn : "3rdpage#rules#equipment",
			bMarked : CurrentVars.vislayers[0] === "rules" && CurrentVars.vislayers[1] === "equipment"
		}, {
			cName : "Notes left - Equipment right",
			cReturn : "3rdpage#notes#equipment",
			bMarked : CurrentVars.vislayers[0] === "notes" && CurrentVars.vislayers[1] === "equipment"
		}, {
			cName : "Notes left - Rules right",
			cReturn : "3rdpage#notes#rules",
			bMarked : CurrentVars.vislayers[0] === "notes" && CurrentVars.vislayers[1] === "rules"
		}];
		if (useSelect === "justMenu") return;
	};

	var selection = useSelect ? useSelect : showMenu ? getMenu("chooselayers") : CurrentVars.vislayers;
	if (!selection || selection[0] == "nothing") return;

	if (selection[0] === "3rdpage") selection.shift();
	if (!selection[0] || possibleOptions.indexOf(selection[0]) == -1) selection[0] = CurrentVars.vislayers[0];
	if (!selection[1] || possibleOptions.indexOf(selection[1]) == -1) selection[1] = CurrentVars.vislayers[1];

	if (!isReset && selection[0] == CurrentVars.vislayers[0] && selection[1] == CurrentVars.vislayers[1]) return; // nothing changed

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Show the 3rd page " + selection[0] + " and " + selection[1] + " sections...");
	calcStop();

	Value("Extra.Layers Remember", selection);
	var LNotesFlds = [
		"Text.Header.Notes.Left",
		"Extra.Notes",
	];
	var HideShowLNotesFlds = "Hide";
	var LRulesFlds = [
		"Text.Header.Rules.Left",
		"Image.Rules.Left"
	];
	var HideShowLRulesFlds = "Hide";
	var RRulesFlds = [
		"Text.Header.Rules.Right",
		"Image.Header.RightRules",
		"Image.DragonheadRightRules",
		"Image.DragonheadshadowRightRules",
		"Image.Rules.Right"
	];
	var HideShowRRulesFlds = "Hide";
	var REquipFlds = [
		"Text.Header.Equip.Right",
		"Image.Equip.Right",
		"Image.DividerExtraGear",
		"Image.DragonheadExtraGear",
		"Display.Weighttxt.LbKgPage3",
		"Extra.Gear Weight Subtotal Left",
		"Extra.Gear Weight Subtotal Right",
		"Extra.Other Holdings"
	];
	var HideShowREquipFlds = "Hide";
	var REquipFldsNP = [];
	var HideShowREquipFldsNP = "Hide";
	for (i = 1; i <= FieldNumbers.extragear; i++) {
		REquipFldsNP.push("Extra.Gear Button " + i);
		REquipFlds.push("Extra.Gear Row " + i);
		REquipFlds.push("Extra.Gear Amount " + i);
		REquipFlds.push("Extra.Gear Weight " + i);
	};

	// Hide/show the whiteout fields on the right and left side depending on the visible layer and the settings of text line visibility
	if (CurrentVars.whiteout && selection[0] === "notes") {
		Show("Extra.Notes Whiteout");
	} else {
		Hide("Extra.Notes Whiteout");
	}
	if (CurrentVars.whiteout && selection[1] === "equipment") {
		Show("Extra.Other Holdings Whiteout");
	} else {
		Hide("Extra.Other Holdings Whiteout");
	}

	//do something with the input
	switch (selection[0]) {
		case "notes":
			HideShowLNotesFlds = "Show";
			break;
		case "rules":
			HideShowLRulesFlds = "Show";
			break;
	}

	switch (selection[1]) {
		case "rules":
			HideShowRRulesFlds = "Show";
			Hide("Extra.Gear Location");
			break;
		case "equipment":
			HideShowREquipFlds = "Show";
			HideShowREquipFldsNP = "DontPrint";
			if (What("Gear Location Remember").split(",")[1] === "true") {
				Show("Extra.Gear Location");
			}
			break;
	}

	//set the visibility of the fields
	for (var L = 0; L < LNotesFlds.length; L++) {
		tDoc[HideShowLNotesFlds](LNotesFlds[L]);
	}
	for (L = 0; L < LRulesFlds.length; L++) {
		tDoc[HideShowLRulesFlds](LRulesFlds[L]);
	}
	for (var R = 0; R < RRulesFlds.length; R++) {
		tDoc[HideShowRRulesFlds](RRulesFlds[R]);
	}
	for (R = 0; R < REquipFlds.length; R++) {
		tDoc[HideShowREquipFlds](REquipFlds[R]);
	}
	for (R = 0; R < REquipFldsNP.length; R++) {
		tDoc[HideShowREquipFldsNP](REquipFldsNP[R]);
	}

	CurrentVars.vislayers = selection;
	SetStringifieds("vars"); // Save the settings to a field
	thermoM(thermoTxt, true); // Stop progress bar
}

// Toggle between calculated (Toggle = false) and manual (Toggle = true) attack fields
function ToggleAttacks(Toggle) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the attacks to " + (Toggle === "Yes" ? "calculated" : "manual") + "...");
	calcStop();

	MakeMobileReady(false); // Undo flatten, if needed

	CurrentVars.manual.attacks = Toggle;
	var VisibleHidden = !Toggle ? "Show" : "Hide";
	var HiddenVisible = !Toggle ? "Hide" : "Show";
	var NoPrintHidden = !Toggle ? "DontPrint" : "Hide";
	var ReadOnly = !Toggle ? "Uneditable" : "Editable";
	var compTemps = What("Template.extras.AScomp").split(",");
	var incr = compTemps.length * 4 + FieldNumbers.attacks * 2;

	for (var i = 1; i <= FieldNumbers.attacks; i++) {
		tDoc[HiddenVisible]("Attack." + i + ".Weapon");
		tDoc[ReadOnly]("Attack." + i + ".To Hit");
		tDoc[ReadOnly]("Attack." + i + ".Damage");
		tDoc[VisibleHidden]("Attack." + i + ".Weapon Selection");
		tDoc[VisibleHidden]("Attack." + i + ".Proficiency");
		tDoc[VisibleHidden]("Attack." + i + ".Mod");
		thermoM(i/incr); //increment the progress dialog's progress
	}

	for (var T = 0; T < compTemps.length; T++) {
		for (var i = 1; i <= 3; i++) {
			var prefix = compTemps[T];
			tDoc[HiddenVisible](prefix + "Comp.Use.Attack." + i + ".Weapon");
			tDoc[ReadOnly](prefix + "Comp.Use.Attack." + i + ".To Hit");
			tDoc[ReadOnly](prefix + "Comp.Use.Attack." + i + ".Damage");
			tDoc[VisibleHidden](prefix + "Comp.Use.Attack." + i + ".Weapon Selection");
			tDoc[VisibleHidden](prefix + "Comp.Use.Attack." + i + ".Proficiency");
			tDoc[VisibleHidden](prefix + "Comp.Use.Attack." + i + ".Mod");
			thermoM((i * (T + 1) + FieldNumbers.attacks)/incr); //increment the progress dialog's progress
		}
		tDoc[VisibleHidden](prefix + "Attack.Titles");
	}

	if (CurrentVars.bluetxt) {
		tDoc[NoPrintHidden]("BlueText.Attack");
		for (var T = 0; T < compTemps.length; T++) {
			prefix = compTemps[T];
			tDoc[NoPrintHidden](prefix + "BlueText.Comp.Use.Attack");
			thermoM((T + 1 + FieldNumbers.attacks + compTemps.length * 3)/incr); //increment the progress dialog's progress
		}
		for (var i = 1; i <= FieldNumbers.attacks; i++) {
			DontPrint("BlueText.Attack." + i + ".Weight Title");
			DontPrint("BlueText.Attack." + i + ".Weight");
			thermoM((i + FieldNumbers.attacks + compTemps.length * 4)/incr); //increment the progress dialog's progress
		};
	}

	thermoM(thermoTxt, true); // Stop progress bar
};

// Show the bluetext modifier fields (toggle = true) or hide them (toggle = false)
// If toggle is undefined, toggle their visibility
function ToggleBlueText(toggle) {
	if (CurrentVars.bluetxt == undefined) CurrentVars.bluetxt = false;

	if (toggle !== undefined && ((toggle && CurrentVars.bluetxt) || (!toggle && !CurrentVars.bluetxt))) return;
	var nowWhat = !CurrentVars.bluetxt; // Toggle the current state

	// Start progress bar and stop calculations
	var thermoTxt = thermoM((nowWhat ? "Showing" : "Hiding") + " the modifier fields...");
	calcStop();

	MakeMobileReady(false); // Undo flatten, if needed

	var HiddenNoPrint = nowWhat ? "DontPrint" : "Hide";

	var BlueTxt = [
		"BlueText",
		"Proficiency Bonus Modifiers Title",
		"Proficiency Bonus Modifier",
		"Proficiency Bonus Dice Title",
		"Proficiency Bonus Dice",
		"Skill Modifiers Title",
		"Acr Bonus",
		"Ani Bonus",
		"Arc Bonus",
		"Ath Bonus",
		"Dec Bonus",
		"His Bonus",
		"Ins Bonus",
		"Inti Bonus",
		"Inv Bonus",
		"Med Bonus",
		"Nat Bonus",
		"Perc Bonus",
		"Perf Bonus",
		"Pers Bonus",
		"Rel Bonus",
		"Sle Bonus",
		"Ste Bonus",
		"Sur Bonus",
		"Too Bonus",
		"All Skills Bonus",
		"Skill Modifiers All Text",
		"Save Modifiers Title",
		"Str ST Bonus",
		"Dex ST Bonus",
		"Con ST Bonus",
		"Int ST Bonus",
		"Wis ST Bonus",
		"Cha ST Bonus",
		"All ST Bonus",
		"Save Modifiers All Text",
		"Passive Perception Bonus",
		"Spell DC 1 Bonus",
		"Carrying Capacity Multiplier",
		"Carrying Capacity Multiplier Title",
		"Remarkable Athlete",
		"Remarkable Athlete Title",
		"Jack of All Trades",
		"Jack of All Trades Title",
		"AC Armor Weight Title",
		"AC Armor Weight",
		"AC Shield Weight Title",
		"AC Shield Weight",
		"AmmoLeftDisplay.WeightText",
		"AmmoLeftDisplay.Weight",
		"AmmoRightDisplay.WeightText",
		"AmmoRightDisplay.Weight"
	];

	if (typePF) {
		BlueTxt.push("Init Bonus");
		BlueTxt.push("Comp.Use.Combat.Init.Bonus");
		BlueTxt.push("AC Stealth Disadvantage");
		BlueTxt.push("AC Stealth Disadvantage Title");
	}

	//add the fields for all the companion template pages into the array
	var compTemps = What("Template.extras.AScomp").split(",");
	compTemps.splice(compTemps.indexOf(""), 1);
	for (var T = 0; T < compTemps.length; T++) {
		BlueTxt.push(compTemps[T] + "BlueText");
		if (typePF) {
			BlueTxt.push(compTemps[T] + "Comp.Use.Combat.Init.Bonus");
		}
	}

	for (var i = 0; i < BlueTxt.length; i++) {
		tDoc[HiddenNoPrint](BlueTxt[i]);
		thermoM(i/(BlueTxt.length + 7)); //increment the progress dialog's progress
	};

	//only show the modifier "Spell DC 2 Bonus" if the second spell DC is actually visible
	if (HiddenNoPrint === "Hide" || tDoc.getField("ShowHide 2nd DC").buttonGetCaption() === "Hide 2nd DC") {
		tDoc[HiddenNoPrint]("Spell DC 2 Bonus");
	}

	//undo the showing of certain blue text fields depending on the manual settings
	if (CurrentVars.manual.attacks) {
		Hide("BlueText.Attack");
		Hide("BlueText.Comp.Use.Attack");
		for (var T = 0; T < compTemps.length; T++) {
			Hide(compTemps[T] + "BlueText.Comp.Use.Attack");
		}
	};

	//because of the above, some fields may be hidden even though they should be visible
	for (var i = 1; i <= FieldNumbers.attacks; i++) {
		tDoc[HiddenNoPrint]("BlueText.Attack." + i + ".Weight Title");
		tDoc[HiddenNoPrint]("BlueText.Attack." + i + ".Weight");
	};

	//show the spellslots bluetext fields or hide them
	var SSarray = What("Template.extras.SSfront").split(",");
	var SSvisible = SSarray.length > 1;
	var SSpresuffix = [];
	if (!typePF) {
		var showSlots = eval(What("SpellSlotsRemember"));
		if (showSlots[0]) SSpresuffix.push(["", ".0"]); //show the ones on the first page
		if (showSlots[1]) SSpresuffix.push(["", ".1"]); //show the ones on the spell sheet template page
		if (showSlots[1] && SSvisible) SSpresuffix.push([SSarray[1], ""]); //show the ones on the spell sheet page, if visible
	} else if (What("SpellSlotsRemember") !== "[false,false]") { //only do something if not currently using spell points
		SSpresuffix = [["", ""]];
		if (SSvisible) SSpresuffix.push([SSarray[1], ""]); //show the ones on the spell sheet page, if visible
	}
	for (var e = 0; e < SSpresuffix.length; e++) {
		for (var i = 1; i <= 9; i++) {
			tDoc[HiddenNoPrint](SSpresuffix[e][0] + "SpellSlots.CheckboxesSet.lvl" + i + SSpresuffix[e][1]);
		};
	};

	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		if (!typePF) {
			tDoc[HiddenNoPrint]("Extra.Magic Item Weight Title " + i);
		}
		tDoc[HiddenNoPrint]("Extra.Magic Item Weight " + i);
		thermoM((BlueTxt.length + i)/(BlueTxt.length + FieldNumbers.magicitems)); //increment the progress dialog's progress
	};
	if (typePF) {
		tDoc[HiddenNoPrint]("Extra.Magic Item Weight Title");
	};

	//now go through all the spell sheets and show the correct blueText fields
	SSarray = SSarray.concat(What("Template.extras.SSmore").split(","));
	if (HiddenNoPrint === "DontPrint") Hide("BlueText.spellshead"); //first hide all the bluetext fields of the spell sheet templates
	if (SSvisible) {
		for (var A = 0; A < SSarray.length; A++) {
			var prefix = SSarray[A];
			if (prefix === "") continue; //skip the ones where the prefix is nothing
			for (var i = 0; i < 4; i++) {
				var SSfieldsArray = [
					prefix + "spellshead.Text.header." + i, //0
					prefix + "spellshead.class." + i, //1
					prefix + "BlueText.spellshead.prepare." + i, //2
					prefix + "BlueText.spellshead.attack." + i, //3
					prefix + "BlueText.spellshead.dc." + i,  //4
					prefix + "spellshead.prepare." + i, //5
				];
				if (HiddenNoPrint === "Hide") {
					Hide(SSfieldsArray[2]);
					Hide(SSfieldsArray[3]);
					Hide(SSfieldsArray[4]);
				} else if (HiddenNoPrint === "DontPrint" && tDoc.getField(SSfieldsArray[0]).display === display.visible) {
					var aCast = What(SSfieldsArray[1]);
					if (tDoc.getField(SSfieldsArray[5]).display === display.visible) {
						DontPrint(SSfieldsArray[2]);
					}
					DontPrint(SSfieldsArray[3]);
					DontPrint(SSfieldsArray[4]);
				}
			}
		}
	}

	if (What("HoSRememberState") && HiddenNoPrint === "DontPrint") {
		DontPrint("HoS ST Bonus");
	} else {
		Hide("HoS ST Bonus");
	}

	CurrentVars.bluetxt = nowWhat;
	SetStringifieds("vars"); // Save the settings to a field
	thermoM(thermoTxt, true); // Stop progress bar
};

//make a menu for the adventure league button/bookmark and put it in the global variable
function MakeAdventureLeagueMenu() {
	var submenuItems = [
		["Set the HP on the 1st page to automatically use fixed values", "hp", tDoc.getField("HP Max").submitName.split(",")[3] === "fixed"], // 0
		["Show DCI field on 1st page", "dci", isDisplay("DCI.Text") === display.visible] // 1
	].concat(typePF ?
		[["Show Renown on the Background page", "renown", isDisplay("Background_Renown.Text") === display.visible]] : // 2
		[["Remove DMG actions from 1st page (not legal in AL play)", "actions", true]] // 2
	).concat([
		[typePF ? "Show space for Faction Rank on the Background page" : "Show space for Faction, Faction Rank, and Renown on the Background page", "factionrank", isDisplay("Background_FactionRank.Text") === display.visible], // 3
	]).concat(typePF ?
		[["Mark actions on the Player Reference page that are not legal in AL play", "asterisks", isDisplay("Text.PRsheet.AL.asterisk") === display.visible]] : //4
		[]
	).concat([
		["Use the fixed carrying capacity rules", "encumbrance", tDoc.getField("Weight Carrying Capacity.Field").display === display.visible], // 5
		["-", "-", false], // 6
		["Show Adventure Logsheet(s)", "allog", isTemplVis("ALlog")], // 7
		["-", "-", false], // 8
		["Prepare the sheet for Adventurers League play (i.e. do all of the above)", "all#1", false], // 9
		["Undo all of those marked above", "all#0", false] // 10
	]);

	if (!typePF) {
		for (var i = 1; i <= FieldNumbers.trueactions; i++) {
			if ((/^(?=.*overrun)(?=.*tumble).*$/i).test(What("Action " + i))) {
				submenuItems[2][2] = false;
				break;
			};
		};
	};

	var AdvLeagueMenu = [];
	for (i = 0; i < submenuItems.length; i++) {
		AdvLeagueMenu.push({
			cName : submenuItems[i][0],
			cReturn : "advleague#" + submenuItems[i][1] + "#" + (submenuItems[i][2] ? 0 : 1),
			bMarked : submenuItems[i][2]
		});
	};

	Menus.adventureLeague = AdvLeagueMenu;

	tDoc.getField("League Remember").submitName = submenuItems.slice(0,4).every(function(theN) { return theN[2]; }) ? 1 : 0;
};

//call the adventure league menu (or use the input) and do something with the results
function AdventureLeagueOptions(MenuSelection) {
	MenuSelection = MenuSelection ? MenuSelection : getMenu("adventureLeague");

	if (MenuSelection[0] !== "advleague") return;

	var set = Number(MenuSelection[2]);
	var toSaveSelection = {};
	var selectionAll = {};
	for (i = 0; i < Menus.adventureLeague.length; i++) {
		var theAll = Menus.adventureLeague[i];
		var thecReturn = theAll.cReturn.split("#")[1];
		toSaveSelection[thecReturn] = MenuSelection[1] === "all" || MenuSelection[1] === thecReturn ? set : theAll.bMarked;
		if (MenuSelection[1] !== "all" || (/^(-|all)$/i).test(thecReturn) || set == theAll.bMarked) continue;
		selectionAll[thecReturn] = set;
	};
	if (MenuSelection[1] === "all") {
		tDoc.getField("League Remember").submitName = set;
		ToggleAdventureLeague(selectionAll);
	} else {
		var selection = {
			allog : undefined,
			dci : undefined,
			factionrank : undefined,
			renown : undefined,
			actions : undefined,
			asterisks : undefined,
			hp : undefined,
			encumbrance : undefined
		};
		selection[MenuSelection[1]] = set;
		ToggleAdventureLeague(selection);
		if (!set) tDoc.getField("League Remember").submitName = set;
	};
	//Save the toSaveSelection for later reprisal when importing
	Value("League Remember", toSaveSelection.toSource());
};

// Set the visibility of the fields for faction, faction ranks, renown, and DCI
function ToggleAdventureLeague(Setting) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the Adventurers League settings...");
	calcStop();

	Setting = Setting ? Setting : {};
	var isBackgrVisible = isTemplVis("ASbackgr");

	MakeMobileReady(false); // Undo flatten, if needed

	//Show the adventurers log, if not already visible
	if (Setting.allog !== undefined) {
		if (isTemplVis("ALlog")) {
			DoTemplate("ALlog", "RemoveAll");
		} else {
			DoTemplate("ALlog", "Add");
		};
	};

	//Show the DCI field
	if (Setting.dci !== undefined) {
		tDoc[Setting.dci ? "Show" : "Hide"]("DCI.Title");
		tDoc[Setting.dci ? "Show" : "Hide"]("DCI.Text");
		if (!typePF) {
			tDoc[Setting.dci ? "Hide" : "Show"]("Class and Levels.0");
			tDoc[Setting.dci ? "Show" : "Hide"]("Class and Levels.1");
		};
	};

	//Show the Faction and Renown fields
	if (Setting.factionrank !== undefined) {
		var VisibleHidden = Setting.factionrank ? "Show" : "Hide";
		var HiddenVisible = Setting.factionrank ? "Hide" : "Show";
		if (!typePF) {
			var FactionList = [
				"Background_Organisation.1",
				"Background_Faction.Title",
				"Background_Faction.Text",
				"Background_FactionRank.Title",
				"Background_FactionRank.Text",
				"Background_Renown.Title",
				"Background_Renown.Text"
			];
			if (isBackgrVisible) {
				FactionList.push("Background_Organisation.3");
				tDoc[HiddenVisible]("Background_Organisation.2");
			};
			for (var i = 0; i < FactionList.length; i++) {
				tDoc[VisibleHidden](FactionList[i]);
			};
		} else {
			tDoc[VisibleHidden]("Background_FactionRank.Text");
			tDoc[VisibleHidden]("Image.Background_FactionRank");
			tDoc[HiddenVisible]("Background_Organisation.Right");
		};
	};

	//Show the Renown field
	if (typePF && Setting.renown !== undefined) {
		tDoc[Setting.renown ? "Show" : "Hide"]("Background_Renown.Title");
		tDoc[Setting.renown ? "Show" : "Hide"]("Background_Renown.Text");
	};

	//Show the asterisks on the reference sheet field
	if (typePF && Setting.asterisks !== undefined) {
		tDoc[Setting.asterisks ? "Show" : "Hide"]("Text.PRsheet.AL");
	};

	//Remove the DMG actions on the 1st page
	if (!typePF && Setting.actions !== undefined) {
		if (Setting.actions) {
			RemoveAction("action", "Overrun / Tumble (or as bonus action)", "Default action");
			AddAction("action", "Grapple / Shove (instead of 1 attack)", "Default action", "As 1 attack: Disarm / Grapple / Shove");
		} else {
			AddAction("action", "Overrun / Tumble (or as bonus action)", "Default action");
			AddAction("action", "As 1 attack: Disarm / Grapple / Shove", "Default action", "Grapple / Shove (instead of 1 attack)");
		};
	};

	//Set the HP to using fixed values
	if (Setting.hp !== undefined) {
		var theHP = tDoc.getField("HP Max").submitName.split(",");
		theHP[3] = Setting.hp ? "fixed" : "nothing";
		tDoc.getField("HP Max").submitName = theHP.join();
		if (Setting.hp) CurrentUpdates.types.push("hp");
	};

	//Set the encumbrance rules to using fixed value
	if (Setting.encumbrance !== undefined) {
		SetEncumbrance(!Setting.encumbrance);
	};

	thermoM(thermoTxt, true); // Stop progress bar
};

//search the string for possible armour
function ParseArmor(input, onlyInv) {
	var found = "";
	if (!input) return found;

	input = removeDiacritics(input);
	var foundLen = 0;
	var foundDat = 0;

	for (var key in ArmourList) {
		var kObj = ArmourList[key];
		if ((onlyInv && kObj.weight == undefined) // see if only doing equipable items
			|| !kObj.regExpSearch || !(kObj.regExpSearch).test(input) // see if the regex matches
			|| testSource(key, kObj, "armorExcl") // test if the armour or its source isn't excluded
		) continue;

		// only go on with this entry if:
		// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
		// or if we are not using the search length, just look at the newest source date
		var tempDate = sourceDate(kObj.source);
		if ((!ignoreSearchLength && kObj.name.length < foundLen) || (!ignoreSearchLength && kObj.name.length == foundLen && tempDate < foundDat) || (ignoreSearchLength && tempDate <= foundDat)) continue;

		// we have a match, set the values
		found = key;
		foundLen = kObj.name.length
		foundDat = tempDate;
	}
	return found;
};

//Find if the armor is a known armor
function FindArmor(input) {
	if (input === undefined) {
		CurrentArmour.field = What("AC Armor Description").toLowerCase();
	};
	var tempString = CurrentArmour.field;
	var temp = "";
	var tempFound = false;
	CurrentArmour.known = ParseArmor(tempString);

	CurrentArmour.dex = "";
	if (CurrentArmour.known && ArmourList[CurrentArmour.known] && ArmourList[CurrentArmour.known].dex !== undefined && !isNaN(ArmourList[CurrentArmour.known].dex)) {
		CurrentArmour.dex = ArmourList[CurrentArmour.known].dex;
	}

	//add magical bonus, denoted by a "+"
	CurrentArmour.magic = 0;
	var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
	if (magicRegex.test(tempString)) {
		CurrentArmour.magic = parseFloat(tempString.match(magicRegex)[1]);
	}

	CurrentArmour.mod = "";
	if (CurrentArmour.known && ArmourList[CurrentArmour.known] && ArmourList[CurrentArmour.known].addMod) {
		// check if it is an ability score
		for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
			temp = AbilityScores.abbreviations[i];
			if (tempString.indexOf(temp.toLowerCase()) !== -1) {
				CurrentArmour.mod = temp + " Mod";
				i = AbilityScores.abbreviations.length;
			}
		}
		// or perhaps it wants to add the proficiency bonus
		if (!CurrentArmour.mod && tempString.indexOf("prof") !== -1) {
			CurrentArmour.mod = "Proficiency Bonus";
		}
	}
};

// Change the armor features
function ApplyArmor(input) {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying armor...");
	calcStop();

	CurrentArmour.field = input.toLowerCase();
	var ArmorFields = [
		"AC Armor Bonus", //0
		"Medium Armor", //1
		"Heavy Armor", //2
		"AC Stealth Disadvantage", //3
		"AC Armor Weight", //4
		"AC Dexterity Modifier" //5
	];
	FindArmor(input);

	tDoc.getField(ArmorFields[0]).setAction("Calculate", "var placeholder = \"just to keep the calculation from being done too late\";");

	if (CurrentArmour.known !== undefined && ArmourList[CurrentArmour.known] !== undefined) {
		var ArmorType = ArmourList[CurrentArmour.known].type ? ArmourList[CurrentArmour.known].type.toLowerCase() : "";
		var ArmorStealth = (ArmorType === "medium" && What("Medium Armor Max Mod") === 3) || (/mithral|vind rune/i).test(CurrentArmour.field) ? false : ArmourList[CurrentArmour.known].stealthdis ? ArmourList[CurrentArmour.known].stealthdis : false;
		Checkbox(ArmorFields[3], ArmorStealth);
		Checkbox(ArmorFields[1], ArmorType === "medium");
		Checkbox(ArmorFields[2], ArmorType === "heavy");
		thermoM(1/3); //increment the progress dialog's progress

		if (CurrentArmour.mod) {
			var theCalc = "event.value = " + ArmourList[CurrentArmour.known].ac + ' + Number(' + (!CurrentArmour.mod ? 0 : CurrentArmour.mod == "Proficiency Bonus" ? 'How("Proficiency Bonus")' : 'What("' + CurrentArmour.mod + '")') + ') + ' + CurrentArmour.magic;
			tDoc.getField(ArmorFields[0]).setAction("Calculate", theCalc);
		} else {
			Value(ArmorFields[0], ArmourList[CurrentArmour.known].ac + CurrentArmour.magic);
		}
		thermoM(2/3); //increment the progress dialog's progress

		//add weight of the armor
		if (ArmourList[CurrentArmour.known].weight) {
			var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
			Value(ArmorFields[4], RoundTo(ArmourList[CurrentArmour.known].weight * massMod, 0.001, true));
		} else {
			Value(ArmorFields[4], 0);
		}
	} else {
		tDoc.resetForm(ArmorFields);
	}
	ConditionSet();
	thermoM(thermoTxt, true); // Stop progress bar
};

//a function to calculate the value of the Dex field in the Armour section (returns a value)
function calcMaxDexToAC() {
	var dexMod = What("Dex Mod");
	if (dexMod === "" || isNaN(dexMod)) return "";
	dexMod = Number(dexMod);
	if (CurrentArmour.dex !== "" && CurrentArmour.dex !== undefined && !isNaN(CurrentArmour.dex)) {
		dexMod = CurrentArmour.dex == -10 ? 0 : Math.min(dexMod, CurrentArmour.dex);
	} else if (tDoc.getField("Heavy Armor").isBoxChecked(0)) {
		dexMod = 0;
	} else if (tDoc.getField("Medium Armor").isBoxChecked(0)) {
		dexMod = Math.min(dexMod, Number(What("Medium Armor Max Mod")));
	};

	return dexMod;
};

//a function to calculate the value of the Dex field in the Armour section (returns a value)
function calcCompMaxDexToAC(prefix, armourKey) {
	if (!prefix || !ArmourList[armourKey]) return 0;
	var dexMod = Number(What(prefix + "Comp.Use.Ability.Dex.Mod"));
	var theArmour = ArmourList[armourKey];
	if (theArmour.dex) {
		dexMod = theArmour.dex == -10 ? 0 : Math.min(dexMod, theArmour.dex);
	} else if (theArmour.type === "heavy") {
		dexMod = 0;
	} else if (theArmour.type === "medium" && dexMod > 2) {
		dexMod = 2;
	};
	return dexMod;
};

// add the armour; only overwrites if force == true
function AddArmor(armour, force, comp) {
	if (!armour) return;
	var prefix = comp ? comp : !event.target || !event.target.name ? "" : getTemplPre(event.target.name, "AScomp", true);
	var ACfld = prefix ? prefix + "Comp.Use.AC" : "AC Armor Description";
	var curAC = What(ACfld);
	if (curAC && !force) return;
	if (prefix) { // calculate what the value should be and add it
		var armKey = ParseArmor(armour);
		if (!armKey) return;
		var newAC = ArmourList[armKey].ac + calcCompMaxDexToAC(prefix, armKey);
		Value(ACfld, newAC);
	} else {
		Value(ACfld, armour);
	};
};
// remove the armour if it is the same
function RemoveArmor(armour, comp) {
	if (!armour) return;
	var prefix = comp ? comp : !event.target || !event.target.name ? "" : getTemplPre(event.target.name, "AScomp", true);
	var ACfld = prefix ? prefix + "Comp.Use.AC" : "AC Armor Description";
	var curAC = What(ACfld);
	var armKey = ParseArmor(armour);
	if (armKey && prefix) { // calculate what the value would be
		var newAC = ArmourList[armKey].ac + calcCompMaxDexToAC(prefix, armKey);
		if (curAC == newAC) tDoc.resetForm([ACfld]); // remove it if it's the same
	} else if (!prefix && (CurrentArmour.known === armKey || (!armKey && curAC.indexOf(armour) !== -1))) {
		tDoc.resetForm([ACfld]);
	};
};

// find the magic bonus in the shield description
function FindShield(input) {
	if (!input) {
		CurrentShield.field = What("AC Shield Bonus Description").toLowerCase();
	}
	var tempString = CurrentShield.field;
	var temp = "";

	//add magical bonus, denoted by a "+"
	CurrentShield.magic = 0;
	var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
	if (magicRegex.test(tempString)) {
		CurrentShield.magic = parseFloat(tempString.match(magicRegex)[1]);
	}
}

// Change the armor features
function ApplyShield(input) {
	CurrentShield.field = input.toLowerCase();

	FindShield(input);

	if (input) {
		var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
		Value("AC Shield Bonus", 2 + CurrentShield.magic);
		Value("AC Shield Weight", RoundTo(6 * massMod, 0.001, true));
	} else {
		tDoc.resetForm(["AC Shield Bonus", "AC Shield Weight"]);
	}
}

//Change advantage or disadvantage of saves, skills, checks, attacks, etc. based on condition
function ConditionSet(isReset) {
	if (!isReset && !IsNotConditionSet) return;
	if (typePF) { // only the stealth disadvantage is part of the printer friendly version
		// Start progress bar and stop calculations
		var thermoTxt = thermoM("Armor stealth disadvantage...");
		calcStop();
		IsNotConditionSet = false;
		var thisFld = "ArmDis";
		var thisChck = !isReset && tDoc.getField("AC Stealth Disadvantage").isBoxChecked(0) ? true : false;
		SetProf("advantage", thisChck, ["Ste", false], "Armor");
		IsNotConditionSet = true;
		thermoM(thermoTxt, true); // Stop progress bar
		return;
	}
	var cFlds = {
		Exh1 : { name : "Extra.Exhaustion Level 1" },
		Exh2 : { name : "Extra.Exhaustion Level 2" },
		Exh3 : { name : "Extra.Exhaustion Level 3" },
		Exh4 : { name : "Extra.Exhaustion Level 4" },
		Exh5 : { name : "Extra.Exhaustion Level 5" },
		Exh6 : { name : "Extra.Exhaustion Level 6" },
		Blinded : { name : "Extra.Condition 1" },
		Deafened : { name : "Extra.Condition 3" },
		Frightened : { name : "Extra.Condition 4" },
		Grappled : { name : "Extra.Condition 5" },
		Incapacitated : { name : "Extra.Condition 6" },
		Invisible : { name : "Extra.Condition 7" },
		Paralyzed : { name : "Extra.Condition 8" },
		Petrified : { name : "Extra.Condition 9" },
		Poisoned : { name : "Extra.Condition 10" },
		Prone : { name : "Extra.Condition 11" },
		Restrained : { name : "Extra.Condition 12" },
		Stunned : { name : "Extra.Condition 13" },
		Unconscious : { name : "Extra.Condition 14" },
		ArmDis : { name : "AC Stealth Disadvantage" }
	}

	var thisFld = "ArmDis";
	for (var aFld in cFlds) {
		if (!tDoc.getField(cFlds[aFld].name)) continue;
		cFlds[aFld].checked = tDoc.getField(cFlds[aFld].name).isBoxChecked(0);
		if (event.target && event.target.name && cFlds[aFld].name == event.target.name) thisFld = aFld;
		if ((/Exh\d/).test(aFld)) cFlds[aFld].origchecked = thisFld === aFld ? !cFlds[aFld].checked : cFlds[aFld].checked;
	}
	var thisChck = !isReset && thisFld && cFlds[thisFld].checked ? true : false;
	if (!isReset && (!thisFld || !tDoc.getField(cFlds[aFld].name))) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying the conditions...");
	calcStop();
	IsNotConditionSet = false;

	// Do something with other fields dependent on the selection
	//var stealthLoc = Who("Text.SkillsNames") === "alphabeta" ? "Ste" : "Ath";
	if (isReset || (/Exh\d/).test(thisFld)) {
		// If this is an exhaustion level, check the ones below and/or uncheck the ones above
		if (!isReset) {
			var exhNmbr = Number(thisFld.slice(-1));
			var strtNmbr = thisChck ? 1 : exhNmbr;
			var endNmbr = thisChck ? exhNmbr : 7;
			for (var X = strtNmbr; X < endNmbr; X++) {
				Checkbox("Extra.Exhaustion Level " + X, thisChck);
				cFlds["Exh" + X].checked = thisChck;
			}
		}
		// if the level 2 changes, set the current speed
		if (isReset || cFlds.Exh2.origchecked != cFlds.Exh2.checked || cFlds.Exh5.origchecked != cFlds.Exh5.checked) {
			SetProf("speed", cFlds.Exh5.checked ? false : cFlds.Exh2.checked, { allModes : "/2" }, "Exhaustion level 2 (condition)");
		}
		// if the level 3 changed, set all the saving throws to adv/dis
		if (isReset || cFlds.Exh3.origchecked != cFlds.Exh3.checked) {
			for (var B = 0; B < AbilityScores.abbreviations.length; B++) {
				SetProf("advantage", cFlds.Exh3.checked, [AbilityScores.abbreviations[B], false], "Exhaustion level 2 (condition)");
			};
		}
		// if the level 4 changes, set the current HP max
		if (!isReset && cFlds.Exh4.origchecked != cFlds.Exh4.checked) {
			var maxHP = What("HP Max");
			var halfMaxHP = Math.floor(maxHP / 2);
			var curMaxHP = What("HP Max Current");
			if (cFlds.Exh4.checked) {
				var extraMin = curMaxHP ? maxHP - curMaxHP : 0;
				Value("HP Max Current", halfMaxHP - extraMin);
			} else if (curMaxHP == halfMaxHP || !halfMaxHP) {
				Value("HP Max Current", "");
			} else {
				var extraMin = halfMaxHP - curMaxHP;
				Value("HP Max Current", maxHP - extraMin);
			}
		}
	}
	if (isReset || (/Unconscious|Paralyzed|Petrified|Stunned/).test(thisFld)) {
		if (thisFld == "Unconscious" && thisChck) {
			// if unconscious, also check prone, but don't automatically stand up when no longer unconscious
			Checkbox(cFlds.Prone.name, true);
			cFlds.Prone.checked = true;
		} else if (isReset || thisFld == "Petrified") {
			SetProf("resistance", thisChck, "All", "Petrified (condition)", "All (petrified)");
			SetProf("savetxt", thisChck, { immune : ["poison", "disease"] }, "Petrified (condition)");
		}
		// Incapacitated and fail str/dex saves if any of these are checked, but only undo if none are
		var anyChecked = cFlds.Paralyzed.checked || cFlds.Petrified.checked || cFlds.Stunned.checked || cFlds.Unconscious.checked;
		Checkbox(cFlds.Incapacitated.name, anyChecked);
		cFlds.Incapacitated.checked = anyChecked;
		SetProf("savetxt", anyChecked, { text : ["Fail Str/Dex saves"] }, "Conditions (paralyzed, petrified, stunned, or unconscious)");
	}
	if (isReset || thisFld == "Blinded") {
		SetProf("vision", thisChck, "Blinded: fail checks involving sight", "Blinded (condition)", 0);
	}
	if (isReset || thisFld == "Deafened") {
		SetProf("vision", thisChck, "Deafened: fail checks involving hearing", "Deafened (condition)", 0);
	}
	if (isReset || thisFld == "Restrained") {
		SetProf("advantage", thisChck, ["Dex", false], "Restrained (condition)");
	}
	if (isReset || thisFld == "Invisible") {
		SetProf("advantage", thisChck, ["Att", true], "Invisible (condition)");
	}
	if (!isReset && thisFld == "Incapacitated" && (cFlds.Unconscious.checked || cFlds.Paralyzed.checked || cFlds.Petrified.checked || cFlds.Stunned.checked)) {
		Checkbox(cFlds.Incapacitated.name, true);
		cFlds.Incapacitated.checked = true;
	}
	if (isReset || thisFld == "ArmDis") {
		SetProf("advantage", thisChck, ["Ste", false], "Armor");
	}
	thermoM(0.25); //increment the progress dialog's progress

	// Ability checks disadvantage
	if (isReset || (/Exh|Frightened|Poisoned/).test(thisFld)) {
		var abiDisadv = cFlds.Exh1.checked || cFlds.Frightened.checked || cFlds.Poisoned.checked;
		for (var S = 0; S < SkillsList.abbreviations.length; S++) {
			SetProf("advantage", abiDisadv, [SkillsList.abbreviations[S], false], "Exhaustion, Frightened, or Poisoned (conditions)");
		};
	}
	thermoM(0.5); //increment the progress dialog's progress

	// Attack disadvantage
	if (isReset || (/Exh|Blinded|Frightened|Poisoned|Prone|Restrained/).test(thisFld)) {
		var attDisadv = cFlds.Exh3.checked || cFlds.Frightened.checked || cFlds.Poisoned.checked || cFlds.Prone.checked || cFlds.Restrained.checked || (cFlds.Blinded.checked && What("Class Features").toLowerCase().indexOf("feral senses") === -1);
		SetProf("advantage", attDisadv, ["Att", false], "Exhaustion, Blinded, Frightened, Poisoned, Prone, or Restrained (conditions)");
	}
	thermoM(0.75); //increment the progress dialog's progress

	// Set movement speed
	if (isReset || (/Exh|Grappled|Paralyzed|Petrified|Restrained|Stunned|Unconscious/).test(thisFld)) {
		var spdFormat = cFlds.Exh5.checked || cFlds.Grappled.checked || cFlds.Paralyzed.checked || cFlds.Petrified.checked || cFlds.Restrained.checked || cFlds.Stunned.checked || cFlds.Unconscious.checked ? "event.value = '0 " + (What("Unit System") == "imperial" ? "ft" : "m") + "';" :"";
		var spdFlds = ["Speed", "Speed encumbered"];
		for (var i = 0; i < spdFlds.length; i++) {
			tDoc.getField(spdFlds[i]).setAction("Format", spdFormat);
			Value(spdFlds[i], What(spdFlds[i]));
		}
	}

	IsNotConditionSet = true;
	thermoM(thermoTxt, true); // Stop progress bar
};

// apply the Class and Levels field change (field validation)
function classesFieldVal() {
	// if you ctrl/shift click into the field, any changes in it must be ignored as the class selection dialog is opened
	if (event.target.remVal !== undefined) {
		event.value = event.target.remVal;
		delete event.target.remVal;
	} else {
		ApplyClasses(event.value, true);
	};
}

// search the string for possible class and subclass
function ParseClass(input) {
	var classFound = "", classFoundLen = 0, classFoundDat = 0;
	var subFound = "", subFoundLen = 0, subFoundDat = 0;
	input = removeDiacritics(input);

	// Loop through all the classes and see if any of them match and then look for its subclasses
	// If that doesn't yield anything, look if any of the subclasses match regardless of class' names
	for (var i = 1; i <= 2; i++) {
		if (i == 2 && classFound) break; // something was already found in round 1, so no need for round 2
		for (var key in ClassList) { //scan string for all classes, choosing subclasses over classes
			var kObj = ClassList[key];
			if (i == 1) { // reset the subs for every class we look through if still looking at classes mainly
				subFoundLen = 0;
				subFoundDat = 0;
			}

			if ((i == 1 && !(kObj.regExpSearch).test(input)) // see if the class regex matches (round 1 only)
				|| testSource(key, kObj, "classExcl") // test if the class or its source isn't excluded
				|| (key === "ranger" && !testSource("rangerua", ClassList.rangerua, "classExcl")) // ignore the PHB ranger if the UA ranger is present
			) continue;

			// only go on with this entry if:
			// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
			// or if we are not using the search length, just look at the newest source date
			var tempDate = sourceDate(kObj.source);
			if (i == 1 && ((!ignoreSearchLength && kObj.name.length < classFoundLen) || (!ignoreSearchLength && kObj.name.length == classFoundLen && tempDate < classFoundDat) || (ignoreSearchLength && tempDate <= classFoundDat))) continue;

			if (i == 1) { // we have a matching class! (round 1 only)
				classFound = key;
				classFoundLen = kObj.name.length;
				classFoundDat = tempDate;
				subFound = "";
				subFoundLen = 0;
				subFoundDat = 0;
			}

			// see if any of the sublasses match
			for (var sub = 0; sub < kObj.subclasses[1].length; sub++) {
				var subKey = kObj.subclasses[1][sub];
				var sObj = ClassSubList[subKey];

				if (!sObj // skip if the subclass isn't known in the ClassSubList object
					|| !(sObj.regExpSearch).test(input) // see if the subclass regex matches (round 1 only)
					|| testSource(subKey, sObj, "classExcl") // test if the subclass or its source isn't excluded
				) continue;

				// only go on with this entry if:
				// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
				// or if we are not using the search length, just look at the newest source date
				var tempSubDate = sourceDate(sObj.source);
				if ((!ignoreSearchLength && sObj.subname.length < subFoundLen) || (!ignoreSearchLength && sObj.subname.length == subFoundLen && tempSubDate < subFoundDat) || (ignoreSearchLength && tempSubDate <= subFoundDat)) continue;

				// we have a match for both the class and the subclass!
				classFound = key;
				classFoundLen = kObj.name.length;
				classFoundDat = tempDate;
				subFound = subKey;
				subFoundLen = sObj.subname.length;
				subFoundDat = tempSubDate;
			}
		}
	}
	return classFound ? [classFound, subFound] : false;
};

// detects classes entered and parses information to global classes variable
function FindClasses(NotAtStartup, isFieldVal) {
	if (!NotAtStartup) classes.field = What("Class and Levels"); // called from startup

	// Remove starting numbers and clean the start/end of the string
	classes.field = classes.field.replace(/^[ \-.,\\/:;\d]+|[ \-.,\\/:;]+$/g, '');
	classes.totallevel = 0;

	// Initialize some variables
	var primeClass = "";

	// Put the old classes.known in classes.old so the differences in level can be queried later
	var oldClasses = eval(classes.old.toSource());
	classes.old = {};
	classes.oldprimary = classes.primary;
	classes.oldspellcastlvl = classes.spellcastlvl;
	for (var aClass in classes.known) {
		classes.old[aClass] = {
			classlevel : classes.known[aClass].level,
			subclass : classes.known[aClass].subclass,
			fullname : CurrentClasses[aClass].fullname
		}
	}

	// Get the different classes from the class field string
	classes.parsed = [];
	if (classes.field != "") {
		var ClDelimiter = clean(What("Delimiter"));
		var fieldRem = classes.field;
		var fieldSplit = fieldRem.match(/\D+|(\d+(\.|,))?\d+/g);
		var tempLevel = fieldSplit.length > 2 ? 1 : Math.max(Number(What("Character Level")), 1);
		// now loop through the found elements and add them to the classes.parsed array
		for (var i = 0; i < fieldSplit.length; i = i+2) {
			if (ClDelimiter) fieldSplit[i].replace(RegExp("^" + ClDelimiter.RegEscape(), "i"), '');
			var fieldLevel = fieldSplit[i+1] !== undefined ? parseFloat(fieldSplit[i+1]) : tempLevel;
			classes.parsed.push([clean(fieldSplit[i]), fieldLevel]);
			classes.totallevel += fieldLevel;
		}
	}

	// Reset the global classes variables
	classes.hd = [];
	classes.hp = 0;

	//find known classes and push them into known array, add hd
	var classesTemp = {};
	for (i = 0; i < classes.parsed.length; i++) {
		var tempLevel = classes.parsed[i][1];
		var tempFound = ParseClass(classes.parsed[i][0]);

		if (!tempFound) continue; // class not detected
		var tempClass = tempFound[0];
		var tempSubClass = tempFound[1];
		var tempSubClassOld = classes.old[aClass] && classes.old[aClass].subclass ? classes.old[aClass].subclass : false;
		var tempClObj = ClassList[tempClass];
		var tempDie = tempSubClass && ClassSubList[tempSubClass].die ? ClassSubList[tempSubClass].die : tempClObj.die;

		// see if the found class isn't a prestige class and if all prereqs are met. If not, skip this class
		var tempPrereq = !ignorePrereqs && tempClObj.prestigeClassPrereq ? tempClObj.prestigeClassPrereq : false;
		if (tempPrereq) {
			if (!isNaN(tempPrereq)) {
				tempPrereq = Number(tempPrereq) <= (classes.totallevel - tempLevel);
			} else {
				try {
					tempPrereq = eval(tempPrereq);
				} catch (err) {
					tempPrereq = true;
				}
			}
			// ask the user if we should apply this prestige class (only if not a reset, import, or load on startup)
			if (tempPrereq === false && IsNotReset && IsNotImport && NotAtStartup) {
				var prestClMsg = app.alert({
					nType : 2, // Yes,No
					nIcon : 1, // Warning
					cTitle : "Prestige class prerequisites not met!",
					cMsg : "The prestige class '" + tempClObj.name + "' has a prerequisite which wasn't met. Apply this prestige class anyway?\n\nIf you select 'No', the " + tempLevel + " level(s) of this prestige class will be counted towards the total character level, but none of its features will be added."
				});
				if (prestClMsg == 3) continue; // user decided not to apply the prestige class
			}
		}

		// set the primary class if not yet defined and this is not a prestige class
		if (primeClass === "" && !tempClObj.prestigeClassPrereq) primeClass = tempClass;

		// set the object for this class (later to be set to classes.known)
		classesTemp[tempClass] = {
			name : tempClass,
			level : tempLevel,
			subclass : tempSubClass,
			string : classes.parsed[i][0]
		};

		// Ask for subclass if none is defined and this is not a reset, import, or a sheet startup event and not after just removing a subclass
		if (IsNotReset && IsNotImport && NotAtStartup && !tempSubClass && tempClObj.subclasses[1].length && !tempSubClassOld) {
			// first check at what level this class gets it subclass and if we are at that level yet
			var enoughLevel = false;
			for (var propKey in tempClObj.features) {
				var tempProp = tempClObj.features[propKey];
				if (propKey.indexOf("subclassfeature") == -1 || !tempProp.minlevel || tempProp.minlevel > tempLevel) continue;
				enoughLevel = true;
				break;
			}
			if (enoughLevel) {
				var newSubClass = PleaseSubclass(tempClass, classesTemp[tempClass].string);
				if (newSubClass) {
					classesTemp[tempClass].subclass = newSubClass[0];
					classesTemp[tempClass].string = newSubClass[1];
					classes.field = classes.field.replace(classes.parsed[i][0], newSubClass[1]);
					classes.parsed[i][0] = newSubClass[1];
				}
			}
		}

		if (classes.hd[tempDie] === undefined) { //add hd
			classes.hd[tempDie] = [tempDie, tempLevel];
		} else {
			classes.hd[tempDie][1] += tempLevel;
		};

		if (classes.hp === 0) { //add first level hp
			classes.hp = tempDie;
		};
	};

	// if there is only a single class, remove the level from the classes.field (if present)
	if (classes.parsed.length == 1 && classes.field.indexOf(classes.parsed[0][1]) !== -1) {
		classes.field = clean(classes.field.replace(classes.parsed[0][1], ''));
	}

	// if any of the above changed the classes.field set it
	if (NotAtStartup && !isFieldVal && What("Class and Levels") != classes.field) {
		tDoc.getField("Class and Levels").remVal = classes.field;
		Value("Class and Levels", classes.field);
	} else if (NotAtStartup && isFieldVal && event.value != classes.field) {
		event.value = classes.field;
	}

	// if the found classes are the exact same as the classes.known, don't do anything
	var isChange = primeClass !== classes.primary;
	if (!isChange) {
		var testArray = [];
		for (var testCl in classesTemp) testArray.push(testCl);
		for (var testCl in classes.known) testArray.push(testCl);
		for (var t = 0; t < testArray.length; t++) {
			var theKcl = classes.known[testArray[t]];
			var theNcl = classesTemp[testArray[t]];
			if (theKcl && theNcl && theNcl.name === theKcl.name && theNcl.level === theKcl.level && theNcl.subclass === theKcl.subclass) {
				theKcl.string = theNcl.string; // because otherwise we skip this change, if it is the only thing that changes
				continue;
			}
			isChange = true;
			break;
		};
	};
	if (!isChange) {
		ApplyClassLevel(true);
		return true;
	};

	// Check every class in classes old and if they are not in classesTemp, remove their features
	if (NotAtStartup) { for (var oClass in classes.old) {
		var tempCl = CurrentClasses[oClass];

		// if this class exists, was the primary class, and is no longer, change things up
		if (classesTemp[oClass] && classes.primary === oClass && primeClass !== classes.primary) {
			// first remove its primary class attributes
			ApplyClassBaseAttributes(false, oClass, true);
			// then add its non-primary class attributes
			ApplyClassBaseAttributes(true, oClass, false);
		}

		if (!classesTemp[oClass]) {
			// remove the class base features if removing the class
			ApplyClassBaseAttributes(false, oClass, classes.primary == oClass);
			// reset the tooltip of the equipment menu
			AddTooltip("Equipment.menu", "Click here to add equipment to the adventuring gear section, or to reset it (this button does not print).\n\nIt is recommended to pick a pack first before you add any background's items.");
			// remove the class from the CurrentSpells variable
			delete CurrentSpells[oClass];
		} else if (classesTemp[oClass].subclass !== classes.old[oClass].subclass) {
			// when only changing the subclass, or adding a new one, remove the base features of the subclass and add those of the new class
			ApplyClassBaseAttributes([classes.old[oClass].subclass, classesTemp[oClass].subclass], oClass, classes.primary == oClass);
			// if the class doesn't have spellcasting, but the old subclass did, remove it from the CurrentSpells variable
			var oldSubClass = classes.old[oClass].subclass ? ClassSubList[classes.old[oClass].subclass] : false;
			if (oldSubClass && oldSubClass.spellcastingFactor && !ClassList[oClass].spellcastingFactor) delete CurrentSpells[oClass];
		}

		// update things when removing a whole class or when removing a subclass
		if (!classesTemp[oClass] || (classesTemp[oClass].subclass !== classes.old[oClass].subclass && classes.old[oClass].subclass)) {
			// Temporarily add the class to classes known for the next step
			classes.known = {};
			classes.known[oClass] = {
				name : oClass,
				level : 0,
				subclass : classes.old[oClass].subclass
			}
			// Remove all the features of the class (remember, new level is set to 0 above)
			UpdateLevelFeatures("class");

			// If changing subclass, set the class' old level to 0 so all features are added again in full
			if (classesTemp[oClass]) classes.old[oClass].classlevel = 0;

			// If removing the (sub)class, also remove the class from the SubClass Remember field
			if (!classesTemp[oClass] || !classesTemp[oClass].subclass) {
				RemoveString("SubClass Remember", oClass, false);
			}
		}
	} }

	classes.known = classesTemp;
	classes.primary = primeClass;

	var multiCaster = {default : 0, warlock : 0};

	temp = [1];
	//lookup classes and subclasses and put their attributes in CurrentClasses global variable
	for (var aClass in classes.known) {

		//define new global variable based on the known classes
		CurrentClasses[aClass] = {
			name : "", //must exist
			subname : "", //must exist
			fullname : "", //must exist
			source : "", //must exist
			attacks : [1], //must exist
			features : {}, //must exist
			equipment : "", //must exist
			prereqs : "", //must exist
			primaryAbility : "", //must exist
			improvements : [0] //must exist
		};

		var Temps = CurrentClasses[aClass];
		var classObj = ClassList[aClass];
		var subClObj = classes.known[aClass].subclass && ClassSubList[classes.known[aClass].subclass] ? ClassSubList[classes.known[aClass].subclass] : false;

		// Fill in the properties of this newly defined global variable and prefer subclass attributes over class attributes
		for (var prop in classObj) { // the class
			if ((/^(subname|features)$/i).test(prop)) continue;
			Temps[prop] = classObj[prop];
		}
		if (subClObj) { // the subclass, if it exists
			for (var prop in subClObj) {
				if ((/^(name|features|prereqs|primaryAbility)$/i).test(prop)) continue;
				Temps[prop] = subClObj[prop];
			}
			// --- backwards compatibility --- //
			// if an old attribute exists in the subclass, but the ClassList object uses the new attribute name, make sure the subclass's version is used
			var backwardsAttr = [["armor", "armorProfs"], ["weapons", "weaponProfs"]];
			for (var i = 0; i < backwardsAttr.length; i++) {
				var aBW = backwardsAttr[i];
				if (subClObj[aBW[0]] && subClObj[aBW[1]] == undefined && classObj[aBW[1]]) delete Temps[aBW[1]];
			}
		}

		//special something for classes that have alternative ability scores that can be used for the DC
		if (Temps.abilitySave && Temps.abilitySaveAlt) {
			var as1 = Number(What(AbilityScores.abbreviations[Temps.abilitySave - 1]));
			var as2 = Number(What(AbilityScores.abbreviations[Temps.abilitySaveAlt - 1]));
			if (as1 < as2) Temps.abilitySave = Temps.abilitySaveAlt;
		}

		var fAB = [];
		var fTrans = {};
		//add features of the class
		for (prop in classObj.features) {
			var cPropAtt = classObj.features[prop];
			var fNm = ("0" + cPropAtt.minlevel).slice(-2) + ((/subclassfeature/i).test(prop) ? "" : "()") + cPropAtt.name;
			//subClObj && subClObj.features[prop]
			if (fNm.toString().length > 2) {
				fAB.push(fNm);
				fTrans[fNm] = {name: prop, list: "ClassList", item: aClass};
			}
		}

		//add features of subclass
		if (subClObj && subClObj.features) {
			for (prop in subClObj.features) {
				var csPropAtt = subClObj.features[prop];
				var fNm = ("0" + csPropAtt.minlevel).slice(-2) + csPropAtt.name;
				if (fNm.toString().length > 2) {
					fAB.push(fNm);
					fTrans[fNm] = {name: prop, list: "ClassSubList", item: classes.known[aClass].subclass};
				}
			}
		}

		fAB.sort();

		for (var f = 0; f < fAB.length; f++) {
			var propAtt = fTrans[fAB[f]];
			if (subClObj && propAtt.list === "ClassList" && subClObj.features[propAtt.name]) continue; // skip any features from the class if a subclass is known and has that same feature
			Temps.features[propAtt.name] = tDoc[propAtt.list][propAtt.item].features[propAtt.name];
		}

		//make fullname if not defined by subclass
		if (Temps.fullname === "") {
			Temps.fullname = Temps.name + (Temps.subname ? " (" + Temps.subname + ")" : "");
		}

		//see if this class is a spellcaster and what we need to do with that
		if (Temps.spellcastingFactor) {
			var casterType = !isNaN(Temps.spellcastingFactor) ? "default" : Temps.spellcastingFactor.replace(/\d/g, "");
			var casterFactor = !isNaN(Temps.spellcastingFactor) ? Number(Temps.spellcastingFactor) : (/\d/g).test(Temps.spellcastingFactor) ? Number(Temps.spellcastingFactor.match(/\d/g).join("")) : 1;
			// now only continue if the class level is the factor or higher
			var casterAtCurLvl = Math.max(casterFactor, 1) <= classes.known[aClass].level;
			// or if the class has its own spell slot progression, check against that
			if (!casterAtCurLvl && Temps.spellcastingTable && Temps.spellcastingTable[classes.known[aClass].level]) {
				casterAtCurLvl = 0 < Temps.spellcastingTable[classes.known[aClass].level].reduce(function (total, num) {
					return total + num;
				});
			}
			if (casterAtCurLvl) {
				// add one to the casterType for seeing if this casterType is multiclassing later on
				if (multiCaster[casterType]) {
					multiCaster[casterType] += 1;
				} else {
					multiCaster[casterType] = 1;
				}
				// create the base object (or update if already exists)
				CreateCurrentSpellsEntry("class", aClass);
				// then update this base object so that it is a spellcasting class with options
				var cSpells = CurrentSpells[aClass];
				cSpells.list = Temps.spellcastingList ? Temps.spellcastingList : {class : aClass};
				cSpells.known = Temps.spellcastingKnown ? Temps.spellcastingKnown : "";
				cSpells.typeSp = !cSpells.known || !cSpells.known.spells || isArray(cSpells.known.spells) || !isNaN(cSpells.known.spells) ? "known" : cSpells.known.spells;
				cSpells.factor = [casterFactor, casterType];
				cSpells.spellsTable = Temps.spellcastingTable ? Temps.spellcastingTable : false;
				if (Temps.spellcastingExtra) cSpells.extra = Temps.spellcastingExtra;
			} else if (CurrentSpells[aClass]) {
				// not high enough level to be a spellcaster anymore, so remove the object if it exists
				delete CurrentSpells[aClass];
				CurrentUpdates.types.push("spells");
			}
		}

		//add number of attacks to temp array
		temp.push(Temps.attacks[Math.min(classes.known[aClass].level, Temps.attacks.length) - 1]);
	}
	//pick highest number of attacks in temp array and put that into global classes variable
	classes.attacks = Math.max.apply(Math, temp);

	//reset the global variable for spellcasting levels
	classes.spellcastlvl = {default : 0, warlock : 0};
	//loop through the classes to find the new spellcasting level totals (can't be done in previous loop, because we need to know the total amount of casters of each type, which is set in previous loop)
	for (var aClass in classes.known) {
		var Temps = CurrentClasses[aClass];
		var cSpells = CurrentSpells[aClass];
		// don't go on if this is not a spellcaster or its factor is lower than its level (thus, no spell slots at this level)
		if (!cSpells || !cSpells.factor || (!Temps.spellcastingTable && cSpells.factor[0] > cSpells.level)) continue;
		var casterFactor = cSpells.factor[0];
		var casterType = cSpells.factor[1];
		// Now calculate the effective caster level and add it to the casterType
		if (Temps.spellcastingTable && multiCaster[casterType] === 1) {
			var casterLvl = Math.min(Temps.spellcastingTable.length - 1, classes.known[aClass].level);
			// Sum the values in the row at the current caster level and add it to the otherTables
			classes.spellcastlvl.otherTables = !classes.spellcastlvl.otherTables ? Temps.spellcastingTable[casterLvl] : classes.spellcastlvl.otherTables.map(function (num, idx) {
				return num + Temps.spellcastingTable[casterLvl][idx];
			});
		} else {
			if (classes.spellcastlvl[casterType] == undefined) classes.spellcastlvl[casterType] = 0;
			classes.spellcastlvl[casterType] += Math[multiCaster[casterType] > 1 && !Temps.spellcastingFactorRoundupMulti ? "floor" : "ceil"](cSpells.level / casterFactor);
		}
	}

	if (!NotAtStartup) { // add the current classes.known into classes.old on startup of the sheet
		for (var aClass in classes.known) {
			classes.old[aClass] = {
				classlevel : classes.known[aClass].level,
				subclass : classes.known[aClass].subclass,
				fullname : CurrentClasses[aClass].fullname
			}
		}
		classes.oldspellcastlvl = classes.spellcastlvl;
		classes.oldprimary = classes.primary;
	} else { // if not a startup event, update the field with the CurrentSpells variable
		SetStringifieds("spells");
	}

	return false;
};

// apply the effect of the classes
function ApplyClasses(inputclasstxt, isFieldVal) {
	isFieldVal = isFieldVal ? isFieldVal : false;
	classes.field = inputclasstxt;

	// Stop if class is set to manual or if the entered classes are the same as classes.known
	if (CurrentVars.manual.classes || FindClasses(true, isFieldVal)) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying the class(es)...");
	calcStop();
	thermoM(1/5); // Increment the progress bar

	// Put hit dice on sheet
	var hdChanged = false;
	if (classes.hd.length > 0) classes.hd.sort(function (a, b) { return a - b; }); // sort by biggest HD
	for (var i = 0; i < 3; i++) { // loop through the 3 HD fields
		var hdLvl = classes.hd[i] ? Math.min(classes.hd[i][1], 999) : "";
		var hdDie = classes.hd[i] ? classes.hd[i][0] : "";
		if (!hdChanged) hdChanged = What("HD" + (i+1) + " Level") != hdLvl || What("HD" + (i+1) + " Die") != hdDie;
		Value("HD" + (i+1) + " Level", hdLvl);
		Value("HD" + (i+1) + " Die", hdDie);
	}
	// If the HD changed, prompt the user about this
	if (hdChanged) CurrentUpdates.types.push("hp");

	thermoM(2/5); // Increment the progress bar

	// Add attributes of each class, if we didn't do so already
	var primaryChange = !classes.oldprimary || classes.oldprimary !== classes.primary;
	for (var aClass in classes.known) {
		// don't process this class if it already existed, but do process it if it became the new primary class
		if (classes.old[aClass] && (!primaryChange || classes.primary !== aClass)) continue;
		// process its attributes
		ApplyClassBaseAttributes(true, aClass, classes.primary == aClass);
		// set the tooltip if the new primary class
		if (classes.primary == aClass) {
			AddTooltip("Equipment.menu", "Click here to add equipment to the adventuring gear section, or to reset it (this button does not print).\n\nIt is recommended to pick a pack first before you add any background's items.\n\n" + CurrentClasses[classes.primary].equipment);
		}
	}

	thermoM(3/5); // Increment the progress bar

	// Set some things dependent on class-levels
	SetTheAbilitySaveDCs();
	AddAttacksPerAction();
	if (MakeClassMenu()) { // Show the option button if a class has features that offers a choice
		DontPrint("Class Features Menu");
	} else {
		Hide("Class Features Menu");
	}

	// Have the prompt check if something changed in Ability Score Increases gained form levels
	CurrentUpdates.types.push("testasi");

	thermoM(4/5); //increment the progress dialog's progress

	// If something changed in spellcasting
	if (classes.oldspellcastlvl.toSource() != classes.spellcastlvl.toSource()) {
		thermoTxt = thermoM("Setting spell slots...", false); //change the progress dialog text
		// Set the spell slots of the class' levels
		for (var ss = 0; ss <= 8; ss++) {
			var SpellSlotsName = "SpellSlots.CheckboxesSet.lvl" + (ss + 1);
			var SpellSlotsField = Number(What(SpellSlotsName));
			var SpellSlotsTotal = SpellSlotsField;
			for (var casterType in classes.spellcastlvl) {
				var spTable = tDoc[casterType + "SpellTable"];
				if (casterType == "otherTables") {
					SpellSlotsTotal += classes.spellcastlvl.otherTables[ss];
				} else if (spTable) {
					SpellSlotsTotal += spTable[Math.min(spTable.length - 1, classes.spellcastlvl[casterType])][ss];
					SpellSlotsTotal -= classes.oldspellcastlvl[casterType] ? spTable[Math.min(spTable.length - 1, classes.oldspellcastlvl[casterType])][ss] : 0;
				}
			}
			if (classes.oldspellcastlvl.otherTables) SpellSlotsTotal -= classes.oldspellcastlvl.otherTables[ss];
			if (SpellSlotsField != SpellSlotsTotal) Value(SpellSlotsName, SpellSlotsTotal);
		}
		// Have the prompt check if something changed to warrant generating new spell sheets
		CurrentUpdates.types.push("testclassspellcasting");
	}

	thermoM(thermoTxt, true); // Stop progress bar

	ApplyClassLevel(); // Lastly, update the level and level-dependent features (or just the class features if level didn't change)
};

// a function to apply the class level depending on how it was changed
function ApplyClassLevel(noChange) {
	if (IsCharLvlVal !== false) { // called during a Level field change event
		IsCharLvlVal = classes.totallevel;
	} else if (Number(What("Character Level")) != classes.totallevel) {
		Value("Character Level", classes.totallevel);
	} else if (!noChange) { // the classes changed, but the total level didn't, so only call to update the class features
		UpdateLevelFeatures("class");
	}
}

// apply the Character Level field change (field validation)
function levelFieldVal() {
	var lvlOld = Number(What(event.target.name));
	var lvl = Number(event.value);
	if (lvlOld == lvl) { // no level change, but it could be an empty string changed to '0' or vice versa
		event.value = lvl > 0 ? lvl : '';
		return;
	}

	IsCharLvlVal = lvl; // save level to global variable

	if (lvl != classes.totallevel && IsNotReset && IsNotImport) { // new level not the same as total level for found classes, so ask how to allocate this level to a (new) class
		AskMulticlassing();
	}

	if (IsCharLvlVal != lvl) { // the above might have changed the total level, so correct that
		lvl = IsCharLvlVal;
	}

	UpdateLevelFeatures("all", Math.max(1,lvl)); // update all level features and use the set level

	// the following should change to be part UpdateLevelFeatures() once custom companions can be imported
	UpdateRangerCompanions(lvl); // update level-dependent things for any ranger companions

	IsCharLvlVal = false; // reset global variable

	// make sure to update the experience points (or similar system) and alert the user
	CurrentUpdates.types.push("xp");

	event.value = lvl > 0 ? lvl : '';
}

function getCurrentLevelByXP(level, exp) {
	level = Number(level);
	exp = Number(exp.replace(",", "."));
	var LVLbyXP = ExperiencePointsList.reduce(function(acc, val) { return acc += exp >= Number(val) ? 1 : 0; }, 0);
	var XPforLVL = !level || isNaN(level) || level < 2 ? 0 : ExperiencePointsList[Math.min(ExperiencePointsList.length - 1, level - 1)];
	return [LVLbyXP, XPforLVL];
}

//Check if the level or XP entered matches the XP or level
function CalcExperienceLevel() {
	// initialise some variables
	var Level = Number(What("Character Level"));
	var exp = What("Total Experience");
	var getLvlXp = getCurrentLevelByXP(Level, exp);
	var LVLbyXP = getLvlXp[0];
	var XPforLVL = getLvlXp[1];

	// if the level and experience points match or both are 0, stop this function
	// also stop this function if the level is higher than the xp table allows (> 20)
	// also stop this function if the experience points are more than the xp table allows (> 1000000000)
	if (Level === LVLbyXP || (!Level && !exp) || Level >= ExperiencePointsList.length || LVLbyXP >= (ExperiencePointsList.length)) return;

	// create the strings for the dialog
	var LVLtxt = Level >= ExperiencePointsList.length ? "a level higher than 20" : "level " + Level;
	var XPtxt = !exp ? "no" : "only " + exp;
	var StringHigherLvl = "This character has " + XPtxt + " experience points. This is not enough to attain the level is currently has (" + Level + "). You need at least " + XPforLVL + " experience points for " + LVLtxt + ".\n\nYou can upgrade the experience points to " + XPforLVL + ", downgrade the level to " + LVLbyXP + ", or leave it as it is.";
	var StringHigherXP = "This character is level " + Level + ", but already has " + exp + " experience points. This amount is enough to attain level " + LVLbyXP + ".\n\nYou can upgrade the level to " + LVLbyXP + ", downgrade the experience points to " + XPforLVL + ", or leave it as it is.";

	var Experience_Dialog = {
		result : false,
		//when pressing the ok button
		commit : function (dialog) {
			this.result = Level > LVLbyXP ? "XPre" : "LVLr";
		},
		//when pressing the other button
		other : function (dialog) {
			this.result = Level > LVLbyXP ? "LVLr" : "XPre";
			dialog.end("ok");
		},
		description : {
			name : "Level and Experience Points do not match!",
			elements : [{
				type : "view",
				elements : [{
					type : "static_text",
					name : "Level and Experience Points do not match!",
					item_id : "head",
					alignment : "align_top",
					font : "heading",
					bold : true,
					height : 21,
					char_width : 45
				}, {
					type : "static_text",
					item_id : "text",
					alignment : "align_fill",
					font : "dialog",
					char_width : 45,
					wrap_name : true,
					name : Level > LVLbyXP ? StringHigherLvl : StringHigherXP
				}, {
					type : "ok_cancel_other",
					ok_name : Level > LVLbyXP ? "Upgrade XP to " + XPforLVL : "Upgrade level to " + LVLbyXP,
					other_name : Level > LVLbyXP ? "Downgrade level to " + LVLbyXP : "Downgrade XP to " + XPforLVL,
				}]
			}]
		}
	};

	var dia = app.execDialog(Experience_Dialog);
	switch (Experience_Dialog.result) {
		case "LVLr":
			Value("Character Level", LVLbyXP);
			break;
		case "XPre":
			Value("Total Experience", XPforLVL);
			break;
	};
};

function AddExperiencePoints() {
	if (!What("Add Experience")) return;
	var XPS = Number(What("Total Experience").replace(/,/g, "."));
	var AddXP = Number(What("Add Experience").replace(/,/g, "."));
	Value("Total Experience", RoundTo(XPS + AddXP, 0.01));
	Value("Add Experience", "");
	CalcExperienceLevel(true);
};

function ParseRace(input) {
	var resultArray = ["", "", []];
	if (!input) return resultArray;

	input = removeDiacritics(input);
	var foundLen = 0;
	var foundDat = 0;

	for (var key in RaceList) {
		var kObj = RaceList[key];

		if (!(kObj.regExpSearch).test(input) // see if race regex matches
			|| testSource(key, kObj, "racesExcl") // test if the race or its source isn't excluded
		) continue;

		// only go on with this entry if:
		// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
		// or if we are not using the search length, just look at the newest source date
		var tempDate = sourceDate(kObj.source);
		if ((!ignoreSearchLength && kObj.name.length < foundLen) || (!ignoreSearchLength && kObj.name.length == foundLen && tempDate < foundDat) || (ignoreSearchLength && tempDate <= foundDat)) continue;

		// we have a match, set the values
		resultArray = [key, "", []];
		foundLen = kObj.name.length;
		foundDat = tempDate;

		// now see if we need to look for racial variants
		if (kObj.variants) {
			var foundLen2 = 0;
			var foundDat2 = 0;
			for (var sub = 0; sub < kObj.variants.length; sub++) { // scan string for all variants of the race
				var theR = key + "-" + kObj.variants[sub];
				var rVars = RaceSubList[theR];
				if (!rVars) {
					console.println("The racial variant '" + kObj.variants[sub] + "' for the '" + kObj.name + "' race is not found in the RaceSubList. Please contact the author of this race to have this issue corrected. The variant will be ignored for now.");
					console.show();
					continue;
				}
				var theRname = rVars.name ? rVars.name : kObj.variants[sub];

				// test if the racial variant or its source isn't excluded
				if (testSource(theR, rVars, "racesExcl")) continue;

				resultArray[2].push(kObj.variants[sub]);

				// see if racial variant regex matches
				if (!(rVars.regExpSearch).test(input)) continue;

				// only go on with this entry if:
				// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
				// or if we are not using the search length, just look at the newest source date
				var tempDate = sourceDate(rVars.source);
				if ((!ignoreSearchLength && theRname.length < foundLen2) || (!ignoreSearchLength && theRname.length == foundLen2 && tempDate < foundDat) || (ignoreSearchLength && tempDate <= foundDat)) continue;

				// we have a match, set the values
				resultArray[1] = kObj.variants[sub];
				foundLen2 = theRname.length;
				foundDat2 = tempDate;
			}
		}
	}
	return resultArray;
};

//detects race entered and put information to global CurrentRace variable
function FindRace(inputracetxt, novardialog) {
	var tempString = inputracetxt === undefined ? What("Race Remember") : inputracetxt;
	var tempFound = ParseRace(tempString);

	CurrentRace = {
		known : tempFound[0],
		variant : tempFound[1],
		variants : tempFound[2],
		level : 0,
		name : "", //must exist
		source : "", //must exist
		plural : "", //must exist
		size : 3, //must exist
		age : "", //must exist
		height : "", //must exist
		weight : "", //must exist
		trait : "", //must exist
		features : "" //must exist
	};

	if (inputracetxt === undefined && CurrentVars.manual.race) return; // don't do the rest of this function if race is set to manual and this is not a startup event

	//show the option button if the race has selectable variants
	if (!tempFound[2].length) {
		Hide("Race Features Menu");
	} else {
		DontPrint("Race Features Menu");
		// if no variant was found, ask the user if he wants to select one
		if (!novardialog && IsNotImport && inputracetxt && !tempFound[1] && !CurrentVars.manual.race) {
			var aRace = RaceList[tempFound[0]];
			var rSource = stringSource(aRace, 'first,abbr', "    [", "]");
			var aBasic = "Basic " + aRace.name.toLowerCase() + rSource;
			var rVarNames = [aBasic];
			var rVarObj = {};
			rVarObj[aBasic] = "";
			for (var i = 0; i < tempFound[2].length; i++) {
				var varR = tempFound[2][i];
				var varRobj = RaceSubList[tempFound[0] + "-" + varR];
				var varRname = varR.capitalize() + " " + aRace.name.toLowerCase();
				var varRsrc = varRobj && varRobj.source ? stringSource(varRobj, 'first,abbr', "    [", "]") : rSource;
				rVarNames.push(varRname + varRsrc);
				rVarObj[varRname + varRsrc] = varR;
			}
			var aResp = AskUserOptions("Select Racial Variant", "The '" + aRace.name + "' race offers a choice of variants. Note that variants are not the same as subraces. If you want to select a different subrace, use the drop-down box in the Race field.\n\nYou can change the selected variant by typing the full name of another variant into the Race field, or with the Racial Options button in the Racial Traits section on the second page.", rVarNames, "radio", true);
			if (rVarObj[aResp]) CurrentRace.variant = rVarObj[aResp];
		}
	}

	// set the properties of the CurrentRace object
	if (CurrentRace.known) {
		// the properties of the main race
		for (var prop in RaceList[CurrentRace.known]) {
			if ((/^(known|variants?|level)$/i).test(prop)) continue;
			CurrentRace[prop] = RaceList[CurrentRace.known][prop];
		}
		// the properties of the variant (overriding anything from the main)
		if (CurrentRace.variant) {
			var subrace = CurrentRace.known + "-" + CurrentRace.variant;
			for (var prop in RaceSubList[subrace]) {
				if ((/^(known|variants?|level)$/i).test(prop)) continue;
				CurrentRace[prop] = RaceSubList[subrace][prop];
			}
			// --- backwards compatibility --- //
			// if an old attribute exists in the racial variant, but the RaceList object uses the new attribute name, make sure the variant's version is used
			var backwardsAttr = [["improvements", "scorestxt"], ["armor", "armorProfs"], ["addarmor", "armorAdd"], ["weaponprofs", "weaponProfs"], ["weapons", "weaponsAdd"]];
			for (var i = 0; i < backwardsAttr.length; i++) {
				var aBW = backwardsAttr[i];
				if (RaceSubList[subrace][aBW[0]] && RaceSubList[subrace][aBW[1]] == undefined && RaceList[CurrentRace.known][aBW[1]]) delete CurrentRace[aBW[1]];
			}

		}
	}

	// set the current race level when loading the sheet
	if (!inputracetxt && CurrentRace.known) CurrentRace.level = What("Character Level") ? Number(What("Character Level")) : 1;
};

//apply the effect of the player's race
function ApplyRace(inputracetxt, novardialog) {
	if (IsSetDropDowns) return; // when just changing the dropdowns or race is set to manual, don't do anything

	if (CurrentVars.manual.race) { // if race is set to manual, just put the text in the Race Remember
		var newRace = ParseRace(inputracetxt);
		Value("Race Remember", newRace[0] + (newRace[1] ? "-" + newRace[1]  : ""));
		return;
	}

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying race...");
	calcStop();

	var newRace = ParseRace(inputracetxt);
	var oldRace = [CurrentRace.known, CurrentRace.variant];
	if (newRace[0] !== oldRace[0] || newRace[1] !== oldRace[1]) {
		if (CurrentRace.known) {// remove the old race if one was detected
			thermoTxt = thermoM("Removing the " + CurrentRace.name + " features...", false); //change the progress dialog text

			// Remove tooltips from some fields
			var tooltipRemove = ["Height", "Weight", "Age"];
			for (i = 0; i < tooltipRemove.length; i++) {
				AddTooltip(tooltipRemove[i], "", "");
			};
			AddTooltip("Size Category", "Selected size category will effect encumbrance on the second page.");
			Value("Racial Traits", "", "");

			// Remove the common attributes from the CurrentRace object and remove the CurrentRace features
			UpdateLevelFeatures("race", 0);
		}
		FindRace(inputracetxt, novardialog);
		Value("Race Remember", CurrentRace.known + (CurrentRace.variant ? "-" + CurrentRace.variant : ""));
	}

	if (CurrentRace.known && (CurrentRace.known !== oldRace[0] || CurrentRace.variant !== oldRace[1])) {
		thermoTxt = thermoM("Applying the " + CurrentRace.name + " features...", false); //change the progress dialog text
		thermoM(1/10); //increment the progress dialog's progress

		// Add race height
		var theHeight = What("Unit System") === "metric" && CurrentRace.heightMetric ? CurrentRace.heightMetric : CurrentRace.height;
		AddTooltip("Height", CurrentRace.plural + theHeight);
		// Add race weight
		var theWeight = What("Unit System") === "metric" ? CurrentRace.weightMetric : CurrentRace.weight;
		AddTooltip("Weight", CurrentRace.plural + theWeight);
		// Add race age
		AddTooltip("Age", CurrentRace.plural + CurrentRace.age);
		// Add race size
		PickDropdown("Size Category", CurrentRace.size);
		var theSize = tDoc.getField("Size Category").getItemAt(CurrentRace.size, false);
		AddTooltip("Size Category", CurrentRace.plural + " size is " + theSize + ".\nSelected size category will affect encumbrance on the second page.");
		// Add racial traits
		var tempString = stringSource(CurrentRace, "full,page", CurrentRace.name + " is found in ", ".");
		var theTraits = What("Unit System") === "imperial" ? CurrentRace.trait : ConvertToMetric(CurrentRace.trait, 0.5);
		Value("Racial Traits", theTraits, tempString);

		thermoM(2/6); //increment the progress dialog's progress

		// Process the common attributes from the CurrentRace object and its features
		UpdateLevelFeatures("race");

		thermoM(3/4); //increment the progress dialog's progress
	};

	thermoTxt = thermoM("Finalizing the changes of the race...", false); //change the progress dialog text
	SetTheAbilitySaveDCs();

	SetStringifieds(); // set the global variables to their fields for future reference

	thermoM(thermoTxt, true); // Stop progress bar
};

//search the string for possible weapon
function ParseWeapon(input, onlyInv) {
	var found = "";
	if (!input) return found;

	input = removeDiacritics(input.replace(/off.{0,3}hand/i, ""));
	var foundLen = 0;
	var foundDat = 0;
	for (var key in WeaponsList) {
		var kObj = WeaponsList[key];
		var bObj = kObj.baseWeapon ? WeaponsList[kObj.baseWeapon] : false;
		if ((onlyInv && kObj.weight == undefined) // see if only doing equipable items
			|| (kObj.baseWeapon && !bObj) // see if it has a baseWeapon, but that baseWeapon doesn't exist
			|| !kObj.regExpSearch || !(kObj.regExpSearch).test(input) // see if the regex matches
			|| testSource(key, kObj, "weapExcl") // test if the armour or its source isn't excluded
		) continue;

		/* Only go with this entry if:
			(1) we are using the search length (default) and this entry has a longer name
			or (2) we are using the search length and this entry has an equal length name but has a newer source
			or (3) if we are not using the search length, just look at the newest source date.
		However,
			use its baseWeapon name length if it is more than its name length.
			or the lenght of the matching regex if it is less. */
		var tempNmLn = ignoreSearchLength ? 0 : Math.min(input.length, input.match(kObj.regExpSearch)[0].length, kObj.name.length);
		if (!ignoreSearchLength && bObj) {
			// has a baseWeapon, so use that as well to determine the length to test with
			var tempNmLn = Math.max(tempNmLn, Math.min(input.length, (bObj.regExpSearch).test(input) ? input.match(bObj.regExpSearch)[0].length : 100, bObj.name.length));
		}
		var tempDate = sourceDate(kObj.source);
		if ((!ignoreSearchLength && tempNmLn < foundLen)
			|| (!ignoreSearchLength && tempNmLn == foundLen && tempDate < foundDat)
			|| (ignoreSearchLength && tempDate <= foundDat)
		) continue;

		// we have a match, set the values
		found = key;
		foundLen = tempNmLn
		foundDat = tempDate;
	}
	return found;
};

//detects weapons entered and put information to global CurrentWeapons variable
function FindWeapons(ArrayNmbr) {
	var tempArray = [];
	var startArray = ArrayNmbr;
	var endArray = ArrayNmbr + 1;

	//do all the weapons, if no ArrayNmbr has been entered
	if (ArrayNmbr === undefined) {
		for (var i = 0; i < FieldNumbers.attacks; i++) {
			CurrentWeapons.field[i] = What("Attack." + (i + 1) + ".Weapon Selection").toLowerCase();
		}
		var startArray = 0;
		var endArray = CurrentWeapons.field.length;
	}

	//parse the weapons into tempArray
	for (var j = startArray; j < endArray; j++) {
		var tempString = CurrentWeapons.field[j];
		tempArray[j] = [
			ParseWeapon(tempString), //see if the field contains a known weapon
			0, // the magical bonus
			true, // whether to add the ability modifier to damage or not
			"", // the spell/cantrip this attack refers to
			[] // if a spell/cantrip, this will be an array of the classes on which spell list this attack is
		];

		var theWea = WeaponsList[tempArray[j][0]];

		//add magical bonus, denoted by a "+" or "-"
		var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
		if (magicRegex.test(tempString)) {
			tempArray[j][1] = parseFloat(tempString.match(magicRegex)[1]);
		}

		//add the true/false switch for adding ability score to damage or not
		tempArray[j][2] = theWea && theWea.abilitytodamage !== undefined ? theWea.abilitytodamage : true;

		//if this is a spell or a cantrip, see if we can link it to an object in the CurrentCasters variable
		var isSpell = !theWea ? ParseSpell(tempString) : theWea.SpellsList ? theWea.SpellsList : SpellsList[tempArray[j][0]] ? tempArray[j][0] : ParseSpell(tempArray[j][0]);
		if (isSpell && (!theWea || (/spell|cantrip/i).test(theWea.type + theWea.list))) {
			tempArray[j][3] = isSpell;
			if (!tempArray[j][0]) tempArray[j][2] = false;
			tempArray[j][4] = isSpellUsed(isSpell);
		};

		//put tempArray in known
		CurrentWeapons.known[j] = tempArray[j];
	};
};

//update the weapons to apply the change in proficiencies
function ReCalcWeapons(justProfs, force) {
	// Stop calculations
	calcStop();

	justProfs = justProfs && !force && !CurrentEvals.atkAdd;
	for (var xy = 0; xy < CurrentWeapons.known.length; xy++) {
		if (CurrentWeapons.field[xy]) {
			ApplyWeapon(CurrentWeapons.field[xy], "Attack." + (xy + 1) + ".Weapon Selection", true, justProfs);
		};
	};
};

function SetWeaponsdropdown(forceTooltips) {
	var tempString = "Type in the name of the attack (or select it from the drop-down menu) and all its attributes will be filled out automatically, provided that its a recognized attack.";
	tempString += "\n\n" + toUni("Magic bonus") + '\nAny magical bonus you type in this field is added to both the to hit and damage (e.g. type " +2Longsword").';
	tempString += "\n\n" + toUni("Off-hand weapons") + '\nIf the name or description fields include the word "off-hand", "secondary", "spell", or "cantrip", the ability modifier will only be added to the to hit bonus, and not to the damage.';
	tempString += "\n\n" + toUni("Damage Die") + '\nThis is determined by the value in the "modifier" field, see below.';
	tempString += "\n\n" + toUni("To Hit and Damage calculations") + '\nThese are calculated using the proficiency bonus, the selected ability modifier and any bonus added in the "modifier" fields, see below.';
	tempString += "\n\n" + toUni("Context-aware calculations") + "\nSome class features, racial features, and feats can affect the attack to hit and damage calculations. You can read what these are by clicking the button in this line.";
	tempString += "\n\n" + toUni("Modifier or blue text fields") + '\nThese are hidden by default. You can toggle their visibility with the "Mods" button in the \'JavaScript Window\' or the "Modifiers" bookmark.';

	var added = [], otherLists = [];
	var weaponlists = {
		startlist : [],
		endlist : [
			"Axe, Hand",
			"Axe, Battle",
			"Axe, Great",
			"Bow, Short",
			"Bow, Long",
			"Crossbow, Hand",
			"Crossbow, Light",
			"Crossbow, Heavy",
			"Hammer, Light",
			"Hammer, War",
			"Hammer, Great",
			"Sword, Short",
			"Sword, Long",
			"Sword, Great"
		],
		melee : [],
		ranged : [],
		improvised : [],
		spell : []
	};

	for (var key in WeaponsList) {
		var weaKey = WeaponsList[key];
		var weaList = weaKey.list ? weaKey.list.toLowerCase() : "";
		if (!weaList || testSource(key, weaKey, "weapExcl")) continue; // test if the weapon or its source is set to be included
		if (!weaponlists[weaList]) {
			otherLists.push(weaList);
			weaponlists[weaList] = [];
		}
		var weaName = WeaponsList[key].name.capitalize();
		if (added.indexOf(weaName) === -1) {
			added.push(weaName);
			weaponlists[weaList].push(weaName);
		}
	};

	// make the definitive list of weapons for the dropdown box
	var setweapons = [];
	var addWeaList = function (weArr, addFirst, noSort, addAtStart) {
		if (!noSort) weArr.sort();
		if (addFirst) weArr.unshift(addFirst);
		if (weArr.length) {
			weArr.unshift("");
			setweapons = !addAtStart ? setweapons.concat(weArr) : weArr.concat(setweapons);
		}
	};
	addWeaList(weaponlists.melee.concat(weaponlists.ranged), "Unarmed Strike"); // add the natural weapons
	addWeaList(weaponlists.improvised, "Improvised Weapon"); // add the improvised weapons
	addWeaList(weaponlists.spell, "Spell Attack"); // add the spells/cantrips
	addWeaList(weaponlists.endlist, false, true); // add the endlist weapons
	// now add any lists that are not preset
	otherLists.sort();
	for (var i = 0; i < otherLists.length; i++) addWeaList(weaponlists[otherLists[i]]);

	// first set the companion sheets attack dropdowns
	var AScompA = What("Template.extras.AScomp").split(",");
	var listToSource = setweapons.toSource();
	for (var i = 0; i < AScompA.length; i++) {
		var prefix = AScompA[i];
		for (var c = 1; c <= 3; c++) {
			var theFld = prefix + "Comp.Use.Attack." + c + ".Weapon Selection";
			var theFldSuNm = prefix + "Comp.Use.Attack." + c + ".Proficiency";
			if (tDoc.getField(theFldSuNm).submitName === listToSource) {
				if (forceTooltips) AddTooltip(theFld, tempString);
				continue; // no changes, so no reason to set this field
			}
			tDoc.getField(theFldSuNm).submitName = listToSource;
			var theFldVal = What(theFld);
			IsNotWeaponMenu = false;
			tDoc.getField(theFld).setItems(setweapons);
			IsNotWeaponMenu = true;
			if (theFldVal !== What(theFld)) Value(theFld, theFldVal, tempString);
		};
	}

	// now add the special weapons added by features, as we only want those on the first page
	addWeaList(weaponlists.startlist, false, false, true);
	listToSource = setweapons.toSource();

	// lastly set this array for the attack dropdowns on the first page
	for (var i = 1; i <= FieldNumbers.attacks; i++) {
		var theFld = "Attack." + i + ".Weapon Selection";
		var theFldSuNm = "Attack." + i + ".Proficiency";
		if (tDoc.getField(theFldSuNm).submitName === listToSource) {
			if (forceTooltips) AddTooltip(theFld, tempString);
			continue; // no changes, so no reason to set this field
		}
		tDoc.getField(theFldSuNm).submitName = listToSource;
		var theFldVal = What(theFld);
		IsNotWeaponMenu = false;
		tDoc.getField(theFld).setItems(setweapons);
		IsNotWeaponMenu = true;
		if (theFldVal !== What(theFld)) Value(theFld, theFldVal, tempString);
	};
};

function SetArmordropdown(forceTooltips) {
	var tempString = toUni("Armor AC") + "\nType the name of the armor (or select it from the drop-down menu) and its AC and features will be filled out automatically, provided that its a recognized armor.";
	tempString += "\n\n" + toUni("Alternative spelling") + '\nYou can use alternative spellings, descriptions and embellishments. For example: "Golden Breastplate of Lathander" will result in the AC and attributes of a "Breastplate".';
	tempString += "\n\n" + toUni("Unarmored Defense") + '\nUsing either "unarmored", "naked", "nothing", or "no armor" combined with an abbreviation of one of the six ability scores will result in the armor being calculated with that ability score. For example: "Unarmored Defense (Int)".\nIf you do not include the abbreviation, the sheet will auto-fill an armor AC of 10.';
	tempString += "\n\n" + toUni("Magic bonus") + '\nAny magical bonus you type in this field is added to the AC of the armor type. For example: "Chain mail +1" or "Plate -2".';

	var added = [], otherLists = [];
	var presetLists = ["firstlist", "magic", "light", "medium", "heavy"];
	var aLists = { startlist : [], firstlist : [""], light : [""], medium : [], heavy : [], magic : [] };
	for (var key in ArmourList) {
		var theArm = ArmourList[key]
		// first test if the armour or its source isn't excluded
		if (testSource(key, theArm, "armorExcl")) continue;
		var armNm = theArm.name.capitalize();
		var armList = theArm.list ? theArm.list.toLowerCase() : theArm.type ? theArm.type.toLowerCase() : "";
		// test if the armour should be excluded (no list/type) or is already listed
		if (!armList || added.indexOf(armNm) !== -1) continue;
		added.push(armNm);

		if (!aLists[armList]) {
			otherLists.push(armList);
			aLists[armList] = [armNm];
		} else {
			aLists[armList].push(armNm);
		}
	};

	// now create the final array element to set to the armour field
	var setarmours = [];

	// first add the startlist if it has any members
	if (aLists.startlist.length) {
		aLists.startlist.sort();
		aLists.startlist.unshift("");
		setarmours = aLists.startlist;
	}
	// then add the presetLists
	for (var i = 0; i < presetLists.length; i++) setarmours = setarmours.concat(aLists[presetLists[i]]);
	// then add the newly added otherLists
	otherLists.sort();
	for (var i = 0; i < otherLists.length; i++) {
		aLists[otherLists[i]].sort();
		aLists[otherLists[i]].unshift("");
		setarmours = setarmours.concat(aLists[otherLists[i]]);
	}

	var listToSource = setarmours.toSource();
	if (tDoc.getField("AC Armor Description").submitName === listToSource) {
		if (forceTooltips) AddTooltip("AC Armor Description", tempString);
		return; // no changes, so no reason to do any more
	}
	tDoc.getField("AC Armor Description").submitName = listToSource;

	var theFldVal = What("AC Armor Description");
	tDoc.getField("AC Armor Description").setItems(setarmours);
	Value("AC Armor Description", theFldVal, tempString);
};

function SetBackgrounddropdown(forceTooltips) {
	var ArrayDing = [""];
	var tempString = "";
	tempString += toUni("Background") + "\nType in the name of the background (or select it from the drop-down menu) and its features and proficiencies will be filled out automatically, provided that its a recognized background.";
	tempString += "\n\n" + toUni("Changing background") + "\nIf you change the background, all the features of the previous background will be removed and the features of the new background will be applied.";

	for (var key in BackgroundList) {
		if (testSource(key, BackgroundList[key], "backgrExcl")) continue;
		ArrayDing.push(BackgroundList[key].name);
		var varArr = BackgroundList[key].variant ? BackgroundList[key].variant : [];
		for (var i = 0; i < varArr.length; i++) {
			var varKey = varArr[i];
			if (testSource(varKey, BackgroundSubList[varKey], "backgrExcl")) continue;
			var backNm = BackgroundSubList[varKey].name;
			if (ArrayDing.indexOf(backNm) === -1) ArrayDing.push(backNm);
		}
	};
	ArrayDing.sort();
	if (tDoc.getField("Background").submitName === ArrayDing.toSource()) {
		if (forceTooltips) AddTooltip("Background", tempString);
		return; //no changes, so no reason to do this
	}
	tDoc.getField("Background").submitName = ArrayDing.toSource();
	var theFldVal = What("Background");
	tDoc.getField("Background").setItems(ArrayDing);
	Value("Background", theFldVal, tempString);
};

function SetRacesdropdown(forceTooltips) {
	var tempString = "";
	var ArrayDing = [""];
	tempString += toUni("Race") + "\nType in the name of the race (or select it from the drop-down menu) and its traits and features will be filled out automatically, provided that its a recognized race. You are not limited by the names in the list. Just typing \"Drow\" will also be recognized, for example.";
	tempString += "\n\n" + toUni("Alternative spelling") + "\nDifferent, setting-dependent race names are recognized as well. For example, typing \"Moon Elf\" will result in all the traits and features of the \"High Elf\" from the Player's Handbook.";
	tempString += "\n\n" + toUni("Changing race") + "\nIf you change the race, all the features of the previous race will be removed and the features of the new race will be applied.";

	for (var key in RaceList) {
		if (testSource(key, RaceList[key], "racesExcl")) continue;
		var raceNm = RaceList[key].sortname ? RaceList[key].sortname : RaceList[key].name.capitalize();
		if (ArrayDing.indexOf(raceNm) === -1) ArrayDing.push(raceNm);
	}
	ArrayDing.sort();
	if (tDoc.getField("Race").submitName === ArrayDing.toSource()) {
		if (forceTooltips) AddTooltip("Race", tempString);
		return; //no changes, so no reason to do this
	}
	tDoc.getField("Race").submitName = ArrayDing.toSource();
	var theFldVal = What("Race");
	tDoc.getField("Race").setItems(ArrayDing);
	Value("Race", theFldVal, tempString);
};

//parse the results from the menu into an array
function getMenu(menuname) {
	try {
		var temp = app.popUpMenuEx.apply(app, Menus[menuname]);
	} catch (err) {
		var temp = null;
	}
	return temp === null ? ["nothing", "toreport"] : temp.toLowerCase().split("#");
};

/* ---- INVENTORY FUNCTIONS START ---- */

// set the value of the gear field to be remembered (on focus)
function RememberGearTempOnFocus() {
	event.target.temp = event.target.value;
};

// set the weight of the gear field (on blur)
function SetGearWeightOnBlur() {
	var theValue = event.target.value;
	var weightFld = event.target.name.replace("Row", "Weight");

	if (!theValue) {
		tDoc.resetForm([weightFld, event.target.name.replace("Row", "Amount")])
	} else if (event.target.temp && event.target.temp === theValue) {
		//do nothing
	} else {
		var theGear = ParseGear(theValue);
		if (theGear) {
			var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
			var theWeight = RoundTo(tDoc[theGear[0]][theGear[1]].weight * massMod, 0.001, true);
			var weightCurrent = What(weightFld);
			var setWeight = false;
			if (weightCurrent && event.target.temp) {
				var theGearOld = event.target.temp ? ParseGear(event.target.temp) : "";
				if (theGearOld && (theGearOld[0] !== theGear[0] || theGearOld[1] !== theGear[1])) setWeight = true;
			} else if (!weightCurrent || weightCurrent !== theWeight) {
				setWeight = true;
			}
			if (setWeight) Value(weightFld, theWeight);
		}
	}

	//now reset the temp
	delete event.target.temp;
};

// find if the entry is an equipment
function ParseGear(input) {
	if (!input) return false;
	var foundLen = 0;
	var result = false;
	var tempString = removeDiacritics(input.toLowerCase());

	//see if it is an armour
	var findArmor = ParseArmor(tempString, true);
	if (findArmor) {
		foundLen = tempString.match(ArmourList[findArmor].regExpSearch)[0].length;
		if (foundLen === tempString.length) foundLen = findArmor.length;
		result = ["ArmourList", findArmor];
	};

	//see if it is a weapon
	var findWeapon = ParseWeapon(tempString, true);
	if (findWeapon) {
		var testLen = tempString.match(WeaponsList[findWeapon].regExpSearch)[0].length;
		if (testLen === tempString.length) testLen = findWeapon.length;
		if (testLen > foundLen) {
			foundLen = testLen;
			result = ["WeaponsList", findWeapon];
		};
	};

	//see if it is an ammunition weapon
	var findAmmo = ParseAmmo(tempString, true);
	if (findAmmo) {
		var testLen = findAmmo[1];
		if (testLen > foundLen) {
			foundLen = testLen;
			result = ["AmmoList", findAmmo[0]];
		};
	};

	//see if it is gear
	for (var key in GearList) { //scan string for all gear
		var aList = GearList[key];
		if (!aList.name || aList.name === "-" || testSource(key, aList, "gearExcl")) continue;
		var searchName = aList.name.replace(/\uFEFF|,[^,]+$/g, "");
		var aListRegEx = MakeRegex(searchName);
		if ((aListRegEx).test(tempString)) {
			var testLen = searchName.length;
			if (testLen >= foundLen) {
				result = ["GearList", key];
				foundLen = testLen;
			};
		};
	};

	//see if it is a tool
	for (var key in ToolsList) { //scan string for all tools
		var aList = ToolsList[key];
		if (!aList.name || aList.name === "-" || testSource(key, aList, "gearExcl")) continue;
		var searchName = aList.name.replace(/\uFEFF|,[^,]+$/g, "");
		var aListRegEx = MakeRegex(searchName);
		if ((aListRegEx).test(tempString)) {
			var testLen = searchName.length;
			if (testLen >= foundLen) {
				result = ["ToolsList", key];
				foundLen = testLen;
			};
		};
	};

	return result;
};

// a way to add an item to one of the equipment sections
// area = "gear" "magic" "extra" "comp"
// column = "l", "m", "r"; can be followed/preceded by 'only' to limit searching to just that column
function AddToInv(area, column, item, amount, weight, location, searchRegex, AddTestReplace, checkKey, isCorrectUnits) {
	if (item == undefined || area == undefined) return;
	//set area and prefix, if any
	var prefix = area.indexOf("AScomp.") !== -1 ? area.substring(0, area.indexOf("AScomp.") + 7) : "";
	area = area.toLowerCase();
	if (!checkKey) {
		var isItem = ParseGear(item);
		if (isItem) checkKey = isItem[1]
	};
	//set start and end row
	var maxRow = FieldNumbers[(/adventuring|gear|magic/).test(area) ? "gear" : area.indexOf("extra") !== -1 ? "extragear" : area.indexOf("comp") !== -1 ? "compgear" : false];
	if (!maxRow) return;
	column = column ? column.toLowerCase() : "";
	var columnCalc = !column ? false : typePF && (/adventuring|gear/).test(area) ? (column.indexOf("r") !== -1 ? 1.5 : column.indexOf("m") !== -1 ? 3 : false) : (column.indexOf("r") !== -1 ? 2 : false);
	var startRow = area.indexOf("magic") !== -1 ? FieldNumbers.gearMIrow + 1 : columnCalc ? Math.round(maxRow / columnCalc + 1) : 1;
	var endRow = (/adventuring|gear/).test(area) && !What("Adventuring Gear Remember") ? maxRow - 4 : maxRow;

	//set start and end row for searching
	var startSearch = column.indexOf("only") !== -1 ? startRow : 1;
	var endSearch = column.indexOf("only") === -1 ? endRow : typePF && (/adventuring|gear/).test(area) ? (!columnCalc ? Math.round(maxRow / 3) : columnCalc === 3 ? Math.round(maxRow / 1.5) : endRow) : (columnCalc ? endRow : Math.round(maxRow / 2));

	//define the names
	var rowNm = prefix + (area.indexOf("extra") !== -1 ? "Extra.Gear " :  area.indexOf("comp") !== -1 ? "Comp.eqp.Gear " : "Adventuring Gear ");
	var itemRow = rowNm + "Row ";
	var amountRow = rowNm + "Amount ";
	var weightRow = rowNm + "Weight ";
	var locationRow = rowNm + "Location.Row ";

	//prepare the item name for searching
	var searchItem = clean(item, false, true);
	searchRegex = searchRegex ? searchRegex : MakeRegex(searchItem.replace(/\uFEFF|\,[^\,]+$/g, (/(\+|-)\d+/).test(searchItem) ? "" : "(?!.*(\\+|-)\\d+)"));

	//search through the items and do something if it is found
	for (var i = startSearch; i <= endSearch; i++) {
		var theRow = clean(What(itemRow + i), false, true);
		var isKey = !checkKey ? false : ParseGear(theRow);
		if ((theRow === searchItem || (searchRegex).test(theRow)) && (!checkKey || isKey[1] === checkKey)) {
			if (!AddTestReplace) {
				var curAmount = What(amountRow + i);
				if (curAmount === "") {
					Value(amountRow + i, 1 + (amount && !isNaN(amount) ? amount : 1));
				} else if (!isNaN(curAmount)) {
					Value(amountRow + i, Number(curAmount) + (amount && !isNaN(amount) ? amount : 1));
				} else {
					Value(itemRow + i, What(itemRow + i) + " (+ one more)");
				};
			} else if (AddTestReplace === "replace") {
				Value(amountRow + i, amount);
			};
			return;
		};
	};

	//as nothing above was found, add the item to the first empty row of the selected column
	var Container = "";
	if (!isCorrectUnits && What("Unit System") !== "imperial") weight = RoundTo(weight * UnitsList.metric.mass, 0.001, true);
	item = clean(item, [" ", "-", ".", ",", "\\", "/", ";"]);
	for (var i = startRow; i <= endRow; i++) {
		var theRow = What(itemRow + i);
		if (!theRow) {
			Value(itemRow + i, Container + item);
			Value(amountRow + i, amount !== undefined ? amount : "");
			Value(weightRow + i, weight !== undefined ? weight : "");
			Value(locationRow + i, location !== undefined ? location : "");
			return;
		} else {
			Container = (/^.{0,2}-|backpack|\bbag\b|^(?=.*saddle)(?=.*bag).*$|\bsack\b|\bchest\b|, with|, contain/i).test(theRow) ? "- " : "";
		};
	};
};

// redirect the old function names for legacy support
function AddInvL(item, amount, weight, location) { AddToInv("gear", "l", item, amount, weight, location, false, false, false, true); };
function AddInvM(item, amount, weight, location) { AddToInv("gear", "m", item, amount, weight, location, false, false, false, true); };
function AddInvR(item, amount, weight, location) { AddToInv("gear", "r", item, amount, weight, location, false, false, false, true); };
function AddInvMagic(item, amount, weight, location) { AddToInv("magic", false, item, amount, weight, location, false, false, false, true); };
function AddInvLExtra(item, amount, weight, location) { AddToInv("extra", "l", item, amount, weight, location, false, false, false, true); };
function AddInvRExtra(item, amount, weight, location) { AddToInv("extra", "r", item, amount, weight, location, false, false, false, true); };
function AddInvLComp(item, amount, weight, prefix) { AddToInv(prefix + "comp", "l", item, amount, weight, location, false, false, false, true); };
function AddInvRComp(item, amount, weight, prefix) { AddToInv(prefix + "comp", "r", item, amount, weight, location, false, false, false, true); };

// make an array of all the gear, tools, and packs, saving each to the menus variable
function SetGearVariables() {
	if (minVer) return;
	//make a menu array for all the packs
	GearMenus.packs = [];
	var packArray = [];
	for (var key in PacksList) {
		if (testSource(key, PacksList[key], "gearExcl")) continue;
		packArray.push(key);
	};
	packArray.sort();
	for (var i = 0; i < packArray.length; i++) {
		GearMenus.packs.push({
			cName : PacksList[packArray[i]].name,
			cReturn : "pack#" + packArray[i]
		});
	};

	//make a menu array for all the gear
	GearMenus.gear = [];
	var gearTypes = {};
	var gearArray = [];
	for (var key in GearList) {
		if (testSource(key, GearList[key], "gearExcl")) continue;
		if (!GearList[key].type) {
			gearArray.push(key);
		} else {
			var aType = GearList[key].type.toLowerCase();
			if (gearArray.indexOf(aType) == -1) {
				gearArray.push(aType);
				gearTypes[aType] = [];
			}
			gearTypes[aType].push(key);
		}
	};
	gearArray.sort();
	for (var i = 0; i < gearArray.length; i++) {
		var aGear = gearArray[i];
		if (gearTypes[aGear]) {
			gearTypes[aGear].sort();
			var theSub = gearTypes[aGear].map( function (n) {
				return {
					cName : GearList[n].infoname,
					cReturn : "gear#" + n
				}
			});
			GearMenus.gear.push({
				cName : aGear.capitalize(),
				oSubMenu : theSub
			});
		} else {
			var theGear = GearList[aGear];
			GearMenus.gear.push({
				cName : theGear.infoname,
				cReturn : "gear#" + aGear
			});
		}
	};

	//make a menu array for all the tools
	GearMenus.tools = [];
	var toolsTypes = {};
	var toolsArray = [];
	for (var key in ToolsList) {
		if (testSource(key, ToolsList[key], "gearExcl")) continue;
		if (!ToolsList[key].type) {
			toolsArray.push(key);
		} else {
			var aType = ToolsList[key].type.toLowerCase();
			if (toolsArray.indexOf(aType) == -1) {
				toolsArray.push(aType);
				toolsTypes[aType] = [];
			}
			toolsTypes[aType].push(key);
		}

	};
	toolsArray.sort();
	for (var i = 0; i < toolsArray.length; i++) {
		var aTool = toolsArray[i];
		if (toolsTypes[aTool]) {
			toolsTypes[aTool].sort();
			var theSub = toolsTypes[aTool].map( function (n) {
				return {
					cName : ToolsList[n].infoname,
					cReturn : "tool#" + n
				}
			});
			GearMenus.tools.push({
				cName : aTool.capitalize(),
				oSubMenu : theSub
			});
		} else {
			var theTool = ToolsList[aTool];
			GearMenus.tools.push({
				cName : theTool.infoname,
				cReturn : "tool#" + aTool
			});
		}
	};
};

//Make menu for 'add equipment' button and parse it to Menus.inventory
function MakeInventoryMenu() {
	var InvMenu = [];

	var backgroundKn = CurrentBackground.name ? CurrentBackground.name : "Background";

	//first make the top three entries (Pack, Gear, Tool)
	var itemMenu = function(menu, name, array, object) {
		var temp = {
			cName : name,
			oSubMenu : []
		};
		for (var i = 0; i < array.length; i++) {
			temp.oSubMenu[i] = {
				cName : array[i][0],
				oSubMenu : eval(object.toSource())
			};
			for (var j = 0; j < temp.oSubMenu[i].oSubMenu.length; j++) {
				var tempObject = temp.oSubMenu[i].oSubMenu[j];
				if (tempObject.cReturn) tempObject.cReturn += "#" + array[i][1];
				if (tempObject.oSubMenu) {
					for (var k = 0; k < tempObject.oSubMenu.length; k++) {
						var tempObjectK = tempObject.oSubMenu[k];
						if (tempObjectK.cReturn) tempObjectK.cReturn += "#" + array[i][1];
					}
				}
			};
		};
		menu.push(temp);
	};

	var menuExtraTypes = [
		["To left column", "lonly"],
		["To middle column", "monly"],
		["To right column", "ronly"]
	];
	if (!typePF) menuExtraTypes.splice(1, 1);
	itemMenu(InvMenu, "Pack", menuExtraTypes, GearMenus.packs);
	itemMenu(InvMenu, "Gear", menuExtraTypes, GearMenus.gear);
	itemMenu(InvMenu, "Tool", menuExtraTypes, GearMenus.tools);

	//add the other single-level options to the menu
	var menuLVL1 = function (item, array) {
		for (i = 0; i < array.length; i++) {
			var isMarked = array[i][1] === "attuned" ? What("Adventuring Gear Remember") == false :
				array[i][1] === "location2" ? What("Gear Location Remember").split(",")[0] == "true" :
				array[i][1] === "location3" ? What("Gear Location Remember").split(",")[1] == "true" : false;
			var isEnabled = array[i][1] === "location3" ? isTemplVis("ASfront") : array[i][1].indexOf("background") !== -1 ? backgroundKn !== "Background" : true;
			item.push({
				cName : array[i][0],
				cReturn : array[i][1],
				bMarked : isMarked,
				bEnabled : isEnabled
			});
		}
	};

	menuLVL1(InvMenu, [
		["-", "-"],
		[backgroundKn + "'s items and gold", "background"],
		["Armor && Shield (from 1st page) [only adds new]", "armour"],
		["Weapons && Ammunition (from 1st page) [only updates/adds new]", "weapon"],
		["-", "-"],
		["All three of the above (" + backgroundKn + ", armour, weapons)", "background-armour-weapon"],
		["Just two of the above (armour, weapons)", "armour-weapon"],
		["-", "-"],
		["Reset equipment section", "reset"],
		["-", "-"],
		["Show 'Attuned Magical Items' subsection", "attuned"],
		["Show location column for Equipment (this page)", "location2"],
		["Show location column for Extra Equipment (3rd page)", "location3"]
	]);

	Menus.inventory = InvMenu;
};

//call the inventory menu ('add equipment' button) and do something with the results
function InventoryOptions(input) {
	var MenuSelection = input ? input : getMenu("inventory");

	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying the inventory menu option...");
	thermoM(0.5); // Increment the progress bar
	calcStop();

	if (MenuSelection[0] === "pack") {
		var thePack = PacksList[MenuSelection[1]];
		thermoTxt = thermoM("Adding pack " + thePack.name + "...", false); //change the progress dialog text
		var columnCalc = typePF ? (MenuSelection[2].indexOf("r") !== -1 ? 1.5 : MenuSelection[2].indexOf("m") !== -1 ? 3 : false) : (MenuSelection[2].indexOf("r") !== -1 ? 2 : false);
		var startRow = columnCalc ? Math.round(FieldNumbers.gear / columnCalc + 1) : 1;
		if (What("Adventuring Gear Row " + startRow)) InvInsert("Adventuring ", startRow);
		for (var i = 0; i < thePack.items.length; i++) {
			var theGear = thePack.items[i];
			AddToInv("gear", MenuSelection[2], theGear[0], theGear[1], theGear[2]);
		};
	} else if (MenuSelection[0] === "gear" || MenuSelection[0] === "tool") {
		var theGear = MenuSelection[0] === "gear" ? GearList[MenuSelection[1]] : ToolsList[MenuSelection[1]];
		thermoTxt = thermoM("Adding '" + theGear.name + "' to the adventuring gear...", false); //change the progress dialog text
		AddToInv("gear", MenuSelection[2], theGear.name, theGear.amount, theGear.weight);
	} else if (MenuSelection[0] === "reset") {
		thermoTxt = thermoM("Resetting the equipment section...", false); //change the progress dialog text
		var tempArray = ["Platinum Pieces", "Gold Pieces", "Electrum Pieces", "Silver Pieces", "Copper Pieces"];
		if (!typePF) {
			for (var i = 1; i < 5; i++) { tempArray.push("Valuables" + i); };
			tempArray = tempArray.concat(["Lifestyle", "Lifestyle daily cost"]);
		};
		for (var i = 1; i <= FieldNumbers.gear; i++) {
			tempArray.push("Adventuring Gear Row " + i);
			tempArray.push("Adventuring Gear Location.Row " + i);
			tempArray.push("Adventuring Gear Amount " + i);
			tempArray.push("Adventuring Gear Weight " + i);
		};
		tDoc.resetForm(tempArray);
	} else if (MenuSelection[0] === "attuned") {
		thermoTxt = thermoM("Toggling the visibility of the Attuned Magical Items subsection...", false);
		ShowAttunedMagicalItems(What("Adventuring Gear Remember") === true);
	} else if (MenuSelection[0] === "location2") {
		thermoTxt = thermoM("Toggling the visibility of the location column on page 2...", false);
		HideInvLocationColumn("Adventuring Gear ", What("Gear Location Remember").split(",")[0] === "true");
	} else if (MenuSelection[0] === "location3") {
		thermoTxt = thermoM("Toggling the visibility of the location column on page 3...", false);
		HideInvLocationColumn("Extra.Gear ", What("Gear Location Remember").split(",")[1] === "true");
	} else if (MenuSelection[0].indexOf("background") !== -1) {
		thermoTxt = thermoM("Adding background items to equipment section...", false);
		AddInvBackgroundItems();
	};
	if (MenuSelection[0].indexOf("armour") !== -1) {
		thermoTxt = thermoM("Adding/updating armor and shield in equipment section...", false);
		AddInvArmorShield();
	};
	if (MenuSelection[0].indexOf("weapon") !== -1) {
		thermoTxt = thermoM("Adding/updating weapons and ammunition in equipment section...", false);
		AddInvWeaponsAmmo();
	};

	thermoM(thermoTxt, true); // Stop progress bar
};

function AddInvBackgroundItems() {
	if (!CurrentBackground.known) return;
	if (CurrentBackground.gold) Value("Gold Pieces", Number(What("Gold Pieces").replace(",", ".")) + CurrentBackground.gold);
	var addEquip = function (array, LR) {
		for (var i = 0; i < array.length; i++) {
			AddToInv("gear", LR, array[i][0], array[i][1], array[i][2]);
		};
	};
	if (CurrentBackground.equipleft) addEquip(CurrentBackground.equipleft, "l");
	if (CurrentBackground.equipright) addEquip(CurrentBackground.equipright, "r");
};

function AddInvArmorShield() {
	//add the armour
	var theArm = What("AC Armor Description");
	var theArmWght = What("AC Armor Weight");
	var theArmKn = ArmourList[CurrentArmour.known];
	if (theArm && theArmWght && (theArmKn ? theArmKn.weight : true)) {
		var regexArmNm = RegExp("(" + theArmKn.name.RegEscape() + ")", "i");
		var hasInvName = theArmKn && theArmKn.invName ? theArmKn.invName.replace(regexArmNm, "") : false;
		var theTxt = hasInvName && !(RegExp(hasInvName.RegEscape(), "i")).test(theArm) && (regexArmNm).test(theArm) && similarLen(theArmKn.name, theArm) ? theArm.replace(regexArmNm, "$1" + hasInvName) : theArm;
		var searchRegex = MakeRegex(theTxt.replace(/ ?\([^\)]\)| ?\[[^\]]\]/g, ""), theArmKn.magic ? "" : "(?!.*(\\+|-)\\d+)");

		AddToInv("gear", "r", theTxt, "", theArmWght, "", searchRegex, "replace", false, true);
	};


	//add the shield
	var theShi = What("AC Shield Bonus Description");
	var theShiWght = What("AC Shield Weight");
	if (theShi && theShiWght) {
		var theTxt = theShi + (theShi.length < 6 && !(/shield/i).test(theShi) ? " shield" : "");
		var searchRegex = MakeRegex(theTxt.replace(/ ?\([^\)]\)| ?\[[^\]]\]/g, ""), CurrentShield.magic ? "" : "(?!.*(\\+|-)\\d+)");

		AddToInv("gear", "r", theTxt, "", theShiWght, "", searchRegex, "replace", false, true);
	}
};

//add all the weapons and ammo from the first page to the second page
function AddInvWeaponsAmmo() {
	//a way to see if there are any special calculation-driven entries in the attack's name
	var specialAtkName = function (atkNm) {
		var isSpecial = false;
		var toMatch = /\(\/.*?\/i?g?i?\)\.test\(WeaponText\)/g;
		if (CurrentEvals.atkCalc && (toMatch).test(CurrentEvals.atkCalc)) {
			isSpecial = CurrentEvals.atkCalc.match(toMatch).some( function (C) {
				try {
					return eval(C.replace("WeaponText", "atkNm"));
				} catch (err) {};
			});
		};
		return isSpecial;
	};

	//make an array of the weapons to add; only those with weight and not alternative attack entries
	var testArray = [];
	var items = {};
	for (var i = 1; i <= FieldNumbers.attacks; i++) {
		var theAtk = CurrentWeapons.known[i - 1];
		var theWea = theAtk[0] ? theAtk[0] : false;
		var theFld = What("Attack." + i + ".Weapon Selection");
		var theWeight = What("BlueText.Attack." + i + ".Weight");
		if (theWeight && !theAtk[3] && !specialAtkName(theFld)) {
			var theTxt = (theWea ? theWea : theFld) + theAtk[1];
			if (testArray.indexOf(theTxt) === -1) {
				items[theTxt] = {
					key : theWea, // item key
					name : clean(theFld.replace(/\(?\[?(off.{0,3}hand|secondary)\)?\]?/i, "")), // the name in the field
					weight : theWeight,
					magic : theAtk[1], // magic bonus
					amount : 1, // the number of these
					isOffHand : (/^(?!.*(spell|cantrip))(?=.*(off.{0,3}hand|secondary)).*$/i).test(theFld)
				};
			} else {
				if (similarLen(theFld.replace(/off.{0,3}hand|secondary/i, ""), items[theTxt].name)) {
					if ((/^(?!.*(spell|cantrip))(?=.*(off.{0,3}hand|secondary)).*$/i).test(theFld) || items[theTxt].isOffHand) {
						items[theTxt].amount = 2;
						items[theTxt].isOffHand = false;
					}
				} else if (theWea && !items[theFld]) {
					items[theFld] = {
						key : theWea, // item key
						name : clean(theFld.replace(/\(?\[?(off.{0,3}hand|secondary)\)?\]?/i, "")), // the name in the field
						weight : theWeight,
						magic : theAtk[2], // magic bonus
						amount : 1, // the number of these
						isOffHand : (/^(?!.*(spell|cantrip))(?=.*(off.{0,3}hand|secondary)).*$/i).test(theFld)
					};
				};
			};
			testArray.push(theTxt);
		};
	};

	//then do the ammo
	var addAmmo = function(aNm, aNr, aWght) {
		var theAmmo = ParseAmmo(aNm);
		var magicBonus = 0;
		var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
		if (magicRegex.test(aNm)) {
			magicBonus = parseFloat(aNm.match(magicRegex)[1])
		};
		if (isNaN(magicBonus)) magicBonus = 0;
		for (var it in items) {
			var aItem = items[it];
			if (aItem.magic === magicBonus && ((!theAmmo && aItem.name.indexOf(aNm) !== -1) || (theAmmo && aItem.key === theAmmo && (it.replace(/\d+/, "") === theAmmo || similarLen(aItem.name, aNm))))) {
				aItem.amount = aNr + (theAmmo && aItem.isAmmo ? aItem.amount : 0);
				aItem.isAmmo = true;
				return;
			};
		};
		var theTxt = theAmmo ? theAmmo : aNm;
		if (!items[theTxt]) {
			var InvName = theAmmo && AmmoList[theAmmo].invName ? AmmoList[theAmmo].invName : aNm;
			var parsedInv = ParseGear(InvName);
			items[theTxt] = {
				key : parsedInv ? parsedInv[1] : theAmmo, // item key
				name : InvName, // the name of the ammo
				weight : aWght,
				magic : 0, // magic bonus
				amount : aNr, // the number of these
				isAmmo : true
			};
		};
	};
	if (What("AmmoLeftDisplay.Weight") && What("AmmoLeftDisplay.Amount")) addAmmo(What("AmmoLeftDisplay.Name"), What("AmmoLeftDisplay.Amount"), What("AmmoLeftDisplay.Weight"));
	if (What("AmmoRightDisplay.Weight") && What("AmmoRightDisplay.Amount")) addAmmo(What("AmmoRightDisplay.Name"), What("AmmoRightDisplay.Amount"), What("AmmoRightDisplay.Weight"));

	// loop through the items and add them to the adventuring gear
	for (var it in items) {
		var aItem = items[it];
		var searchRegex = MakeRegex(aItem.name.replace(/ ?\([^\)]\)| ?\[[^\]]\]/g, ""), aItem.magic ? "" : "(?!.*(\\+|-)\\d+)");
		AddToInv("gear", "r", aItem.name, aItem.amount, aItem.weight, "", searchRegex, "replace", aItem.key, true);
	};
};

//Make menu for the button on each equipment line and parse it to Menus.gearline
function MakeInventoryLineMenu() {
	var type = event.target.name.indexOf("Adventuring") !== -1 ? "Adventuring " :
		event.target.name.indexOf("Extra.") !== -1 ? "Extra." :
		event.target.name.substring(0, event.target.name.indexOf("Comp.") + 8) + ".";
	var lineNmbr = Number(event.target.name.slice(-2));
	var theField = What(type + "Gear Row " + lineNmbr);
	var hasMagic = type === "Adventuring " && What("Adventuring Gear Remember") === false;
	var magic = hasMagic && lineNmbr > FieldNumbers.gearMIrow;
	var maxRow = FieldNumbers[type === "Adventuring " ? "gear" : type === "Extra." ? "extragear" : "compgear"];
	var upRow = lineNmbr === 1 ? false : magic ? lineNmbr !== FieldNumbers.gearMIrow + 1 : true;
	var downRow = lineNmbr === maxRow ? false : hasMagic ? lineNmbr !== FieldNumbers.gearMIrow - 1 : true;

	var numColumns = typePF && type === "Adventuring " ? 3 : 2;
	var curCol = typePF && type.indexOf("Comp.") !== -1 ? 1 : Math.ceil(lineNmbr / Math.round(maxRow / numColumns));
	var moveCol = curCol > 1 ? "left" : numColumns === 3 ? "middle" : "right";
	var moveCol2 = numColumns !== 3 ? false : curCol === 3 ? "middle" : "right";

	var amendMenu = function(inputArray) {
		var array = eval(inputArray.toSource());
		for (var i = 0; i < array.length; i++) {
			if (array[i].oSubMenu) {
				var theSub = array[i].oSubMenu;
				for (var j = 0; j < theSub.length; j++) {
					if (theSub[j].cReturn) theSub[j].cReturn = type + "#" + lineNmbr + "#" + theSub[j].cReturn;
				}
			} else {
				array[i].cReturn = type + "#" + lineNmbr + "#" + array[i].cReturn;
			}
		};
		return array;
	};

	var gearMenu = [{
		cName : "Put item on this line" + (theField ? " (overwrites current)" : ""),
		oSubMenu : [{
			cName : "Gear",
			oSubMenu : amendMenu(GearMenus.gear)
		}, {
			cName : "Tool",
			oSubMenu : amendMenu(GearMenus.tools)
		}]
	}, {
		cName : "-"
	}];

	var menuLVL1 = function (menu, array) {
		for (var i = 0; i < array.length; i++) {
			var isEnabled = (array[i][1] === "up" && !upRow) || (array[i][1] === "down" && !downRow) || (!theField && (/move|insert/i).test(array[i][1])) ? false : true;
			menu.push({
				cName : array[i][0],
				cReturn : type + "#" + lineNmbr + "#" + array[i][1],
				bEnabled : isEnabled
			});
		};
	};

	var AddCompOptions = function(menu) {
		var AScompA = What("Template.extras.AScomp").split(",").splice(1);
		var prefix = type.substring(0, type.indexOf("Comp."));
		if (type.indexOf("Comp.") !== -1) AScompA.splice(AScompA.indexOf(prefix), 1);
		if (!theField || !AScompA.length) {
			menu.push({
				cName : "Move to a Companion's Equipment",
				bEnabled : false
			})
			return;
		};
		var temp = {
			cName : "Move to a Companion's Equipment",
			oSubMenu : []
		};
		for (var i = 0; i < AScompA.length; i++) {
			//if (type.indexOf("Comp.") !== -1 && prefix === AScompA[i]) continue;
			var CompNm = What(AScompA[i] + "Comp.Desc.Name");
			var CompPg = tDoc.getField(AScompA[i] + "Comp.Desc.Name").page + 1;
			var eqpVis = eval(What(AScompA[i] + "Companion.Layers.Remember"))[1];
			temp.oSubMenu.push({
				cName : (CompNm ? CompNm : "NAME") + "'s Equipment Section " + (eqpVis ? "" : "\[not visible currently\] ") + "(page " + CompPg + ")",
				cReturn : type + "#" + lineNmbr + "#" + "movepage#" + AScompA[i] + "Comp."
			});
		};
		menu.push(temp);
	};

	menuLVL1(gearMenu, [
		["Move up", "up"],
		["Move down", "down"],
		["-", "-"]
	]);
	if (!typePF || type.indexOf("Comp.") === -1) menuLVL1(gearMenu, [["Move to " + moveCol + " column", "movecol#" + moveCol.substr(0, 1) + "only"]]);
	if (moveCol2) menuLVL1(gearMenu, [["Move to " + moveCol2 + " column", "movecol#" + moveCol2.substr(0, 1) + "only"]]);

	gearMenu.push({cName : "-"});

	if (type !== "Adventuring ") menuLVL1(gearMenu, [["Move to Equipment (page 2)", "movepage#gear"]]);
	if (type !== "Extra.") menuLVL1(gearMenu, [["Move to Extra Equipment (page 3)", "movepage#extra"]]);
	AddCompOptions(gearMenu);

	gearMenu.push({cName : "-"});

	if (magic) menuLVL1(gearMenu, [["Copy to Magic Items (page 3)", "copy#magic"], ["-", "-"]]);

	menuLVL1(gearMenu, [
		["Insert line", "insert"],
		["Delete line", "delete"],
		["Clear line", "clear"]
	]);

	Menus.gearline = gearMenu;
};

//call the inventory line menu and do something with the results
function InventoryLineOptions() {

	var MenuSelection = getMenu("gearline");

	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying inventory line menu option...");
	calcStop();

	var toRightCase = function (intxt) {
		return intxt.split(".").map(function (n) {
			return n == "eqp" ? n : n == "ascomp" ? "AScomp" : n.substr(0,1).toUpperCase() + n.substr(1);
		}).join(".");
	}
	var type = toRightCase(MenuSelection[0]);
	var lineNmbr = Number(MenuSelection[1]);

	var Fields = [
		type + "Gear Row " + lineNmbr,
		type + "Gear Amount " + lineNmbr,
		type + "Gear Weight " + lineNmbr,
		type + "Gear Location.Row " + lineNmbr
	];
	var FieldsValue = [
		What(Fields[0]),
		What(Fields[1]),
		What(Fields[2]),
		What(Fields[3])
	];

	switch (MenuSelection[2]) {
	 case "up" :
	 case "down" :
		thermoTxt = thermoM("Moving the gear " + MenuSelection[2] + "...", false); //change the progress dialog text
		var A = MenuSelection[2] === "up" ? -1 : 1;
		var FieldsNext = [
			type + "Gear Row " + (lineNmbr + A),
			type + "Gear Amount " + (lineNmbr + A),
			type + "Gear Weight " + (lineNmbr + A),
			type + "Gear Location.Row " + (lineNmbr + A)
		];
		var FieldsNextValue = [
			What(FieldsNext[0]),
			What(FieldsNext[1]),
			What(FieldsNext[2]),
			What(FieldsNext[3])
		];
		for (var H = 0; H < Fields.length; H++) {
			Value(FieldsNext[H], FieldsValue[H]);
			Value(Fields[H], FieldsNextValue[H]);
			thermoM(H/Fields.length); //increment the progress dialog's progress
		};
		break;
	 case "movecol" :
		var toCol = MenuSelection[3];
		thermoTxt = thermoM("Moving the gear to the " + (toCol.indexOf("r") !== -1 ? "right" : toCol.indexOf("m") !== -1 ? "middle" : "left") + " column...", false); //change the progress dialog text
		InvDelete(type, lineNmbr);
		AddToInv(type, MenuSelection[3], FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3], false, false, false, true);
		break;
	 case "movepage" :
		thermoTxt = thermoM("Moving the gear to another page...", false); //change the progress dialog text
		InvDelete(type, lineNmbr);
		var toPageType = toRightCase(MenuSelection[3]);
		AddToInv(toPageType, "l", FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3], false, false, false, true);
		break;
	 case "copy" :
		thermoTxt = thermoM("Copying the gear to magic items on page 3...", false); //change the progress dialog text
		AddMagicItem(FieldsValue[0], true, "", FieldsValue[2]);
		break;
	case "insert":
		thermoTxt = thermoM("Inserting empty gear line...", false); //change the progress dialog text
		InvInsert(type, lineNmbr);
		break;
	case "delete":
		thermoTxt = thermoM("Deleting gear line...", false); //change the progress dialog text
		InvDelete(type, lineNmbr);
		break;
	case "clear":
		thermoTxt = thermoM("Clearing gear line...", false); //change the progress dialog text
		tDoc.resetForm(Fields);
		break;
	case "gear":
	case "tool":
		var theGear = MenuSelection[2] === "gear" ? GearList[MenuSelection[3]] : ToolsList[MenuSelection[3]];
		thermoTxt = thermoM("Adding '" + theGear.name + "' to the line...", false); //change the progress dialog text
		var theNm = (lineNmbr > 1 && (/^.{0,2}-|backpack|\bbag\b|^(?=.*saddle)(?=.*bag).*$|\bsack\b|\bchest\b|, with|, contain/i).test(What(type + "Gear Row " + (lineNmbr - 1))) ? "- " : "") + theGear.name;
		Value(Fields[0], theNm);
		Value(Fields[1], theGear.amount);
		Value(Fields[2], What("Unit System") === "metric" ? RoundTo(theGear.weight * UnitsList.metric.mass, 0.001, true) : theGear.weight);
		break;
	};

	thermoM(thermoTxt, true); // Stop progress bar
};

//insert a slot at the position wanted
function InvInsert(type, slot, extraPre) {
	//stop the function if the selected slot is already empty
	if (What(type + "Gear Row " + slot) === "") {
		return;
	}

	var isComp = type.indexOf("Comp.") !== -1;
	var totalslots = isComp ? FieldNumbers.compgear : (type === "Extra." ? FieldNumbers.extragear : (What("Adventuring Gear Remember") === false && slot <= FieldNumbers.gearMIrow ? FieldNumbers.gearMIrow : FieldNumbers.gear));

	//look for the first empty slot below the slot
	var endslot = "";
	for (var i = slot + 1; i <= totalslots; i++) {
		if (What(type + "Gear Row " + i) === "") {
			endslot = i;
			i = totalslots + 1;
		}
	}

	//only continue if an empty slot was found in the fields
	if (endslot) {
		var extraPre = extraPre ? extraPre : "";
		//cycle to the slots starting with the empty one and add the values of the one above
		for (var i = endslot; i > slot; i--) {
			var lastRowName = What(type + "Gear Row " + (i - 1));
			lastRowName = (extraPre && lastRowName.indexOf(extraPre) !== 0 ? extraPre : "") + lastRowName;
			Value(type + "Gear Row " + i, lastRowName);
			Value(type + "Gear Amount " + i, What(type + "Gear Amount " + (i - 1)));
			Value(type + "Gear Weight " + i, What(type + "Gear Weight " + (i - 1)));
			if (!isComp) Value(type + "Gear Location.Row " + i, What(type + "Gear Location.Row " + (i - 1)));
		}

		//empty the selected slot
		Value(type + "Gear Row " + slot, "");
		Value(type + "Gear Amount " + slot, "");
		Value(type + "Gear Weight " + slot, "");
		if (!isComp) Value(type + "Gear Location.Row " + slot, "");
	}
}

//delete a slot at the position wanted and move the rest up
function InvDelete(type, slot) {
	var isComp = type.indexOf("Comp.") !== -1;
	var lastslot = isComp ? FieldNumbers.compgear : (type === "Adventuring " ? FieldNumbers.gear : FieldNumbers.extragear);
	var numColumns = typePF && type === "Adventuring " ? 3 : 2;
	var perColumn = Math.round(lastslot / numColumns);
	var endslot = isComp && typePF ? lastslot : perColumn * Math.ceil(slot / perColumn);
	if (type === "Adventuring " && endslot === FieldNumbers.gear && What("Adventuring Gear Remember") === false && slot <= FieldNumbers.gearMIrow) {
		endslot = FieldNumbers.gearMIrow;
	}

	//move every line up one space, starting with the selected line
	for (var i = slot; i < endslot; i++) {
		Value(type + "Gear Row " + i, What(type + "Gear Row " + (i + 1)));
		Value(type + "Gear Amount " + i, What(type + "Gear Amount " + (i + 1)));
		Value(type + "Gear Weight " + i, What(type + "Gear Weight " + (i + 1)));
		if (!isComp) Value(type + "Gear Location.Row " + i, What(type + "Gear Location.Row " + (i + 1)));
	}
	//delete the contents of the final line
	var resetA = [
		type + "Gear Row " + endslot,
		type + "Gear Amount " + endslot,
		type + "Gear Weight " + endslot,
		type + "Gear Location.Row " + endslot
	];
	if (!isComp) resetA.pop();
	tDoc.resetForm(resetA);
}

/* ---- INVENTORY FUNCTIONS END ---- */

//see if text contains a background
function ParseBackground(input) {
	var resultArray = ["", ""];
	if (!input) return resultArray;

	input = removeDiacritics(input);
	var foundLen = 0;
	var foundDat = 0;

	for (var key in BackgroundList) {
		var kObj = BackgroundList[key];

		// first we look for background variants
		if (kObj.variant) {
			var matchedThisSub = false;
			var BackOpt = kObj.variant;
			for (var sub = 0; sub < BackOpt.length; sub++) { // scan string for all variants of the background
				var bVars = BackgroundSubList[BackOpt[sub]];

				if (!(bVars.regExpSearch).test(input) // see if background variant regex matches
					|| testSource(BackOpt[sub], bVars, "backgrExcl") // test if the background variant or its source isn't excluded
				) continue;

				// only go on with this entry if:
				// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
				// or if we are not using the search length, just look at the newest source date
				var tempDate = sourceDate(bVars.source);
				if ((!ignoreSearchLength && bVars.name.length < foundLen) || (!ignoreSearchLength && bVars.name.length == foundLen && tempDate < foundDat) || (ignoreSearchLength && tempDate <= foundDat)) continue;

				// we have a match, set the values
				resultArray = [key, BackOpt[sub]];
				foundLen = bVars.name.length;
				foundDat = tempDate;
				matchedThisSub = true;
			}
		}

		// continue with the background object, maybe it is a (better) match
		if (!(kObj.regExpSearch).test(input) // see if regex matches
			|| testSource(key, kObj, "backgrExcl") // test if the background or its source isn't excluded
		) continue;

		// only go on with this entry if:
		// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
		// or if we are not using the search length, just look at the newest source date
		var tempDate = sourceDate(kObj.source);
		if ((!ignoreSearchLength && kObj.name.length < foundLen) || (!ignoreSearchLength && kObj.name.length == foundLen && tempDate < foundDat) || (ignoreSearchLength && tempDate <= foundDat)) continue;

		// we have a match, set the values
		resultArray = [key, matchedThisSub ? resultArray[1] : ""];
		foundLen = kObj.name.length;
		foundDat = tempDate;
	}
	return resultArray;
};

//detects background entered and put information to global CurrentBackground variable
function FindBackground(input) {
	var tempString = input === undefined ? What("Background").toLowerCase() : input;
	var tempFound = ParseBackground(tempString);
	CurrentBackground = {
		known : tempFound[0],
		variant : tempFound[1],
		name : "", //must exist
		source : [], //must exist
		trait : [], //must exist
		ideal : [], //must exist
		bond : [], //must exist
		flaw : [] //must exist
	};

	// set the properties of the CurrentBackground object
	if (tempFound[0]) {
		// the properties of the main background
		for (var prop in BackgroundList[tempFound[0]]) {
			if ((/^(known|variants?|level)$/i).test(prop)) continue;
			CurrentBackground[prop] = BackgroundList[tempFound[0]][prop];
		}
		// the properties of the variant (overriding anything from the main)
		if (tempFound[1]) {
			for (var prop in BackgroundSubList[tempFound[1]]) {
				if ((/^(known|variants?|level)$/i).test(prop)) continue;
				CurrentBackground[prop] = BackgroundSubList[tempFound[1]][prop];
			}
		}
	}
};

//apply the various attributes of the background
function ApplyBackground(input) {
	if (IsSetDropDowns || CurrentVars.manual.background) return; // when just changing the dropdowns or background is set to manual, don't do anything

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying background...");
	calcStop();

	var xtrFld = tDoc.getField("Background Extra");
	var newBackground = ParseBackground(input);
	var oldBackground = [CurrentBackground.known, CurrentBackground.variant];
	if (newBackground[0] !== oldBackground[0] || newBackground[1] !== oldBackground[1]) {
		if (CurrentBackground.known) {
			thermoTxt = thermoM("Removing the " + CurrentBackground.name + " background features...", false); //change the progress dialog text

			// remove the background common attributes
			var Fea = ApplyFeatureAttributes(
				"background", // type
				CurrentBackground.known, // fObjName [aParent, fObjName]
				[1, 0, false], // lvlA [old-level, new-level, force-apply]
				false, // choiceA [old-choice, new-choice, "only"|"change"]
				false // forceNonCurrent
			);

			// reset the background feature
			if (CurrentBackground.feature) Value("Background Feature", "");

			// reset the background extra field
			xtrFld.clearItems();
			xtrFld.userName = "First fill out a background in the field " + (typePF ? "above" : "to the left") + '.\n\nOnce a background is recognized that offers additional options (e.g. the "Origin" of the "Outlander" background), those additional options will be available here.';

			// reset the lifestyle
			if (CurrentBackground.lifestyle && What("Lifestyle") === CurrentBackground.lifestyle) Value("Lifestyle", "");

			thermoM(2/5); //increment the progress dialog's progress
		};
		FindBackground(input);
	}

	if (CurrentBackground.known && (CurrentBackground.known !== oldBackground[0] || CurrentBackground.variant !== oldBackground[1])) {
		thermoTxt = thermoM("Applying the " + CurrentBackground.name + " background features...", false); //change the progress dialog text

		// Apply the background feature
		if (CurrentBackground.feature) Value("Background Feature", CurrentBackground.feature);

		// Apply the background extra
		if (CurrentBackground.extra) {
			xtrFld.setItems([""].concat(CurrentBackground.extra.slice(1)));
			xtrFld.userName = CurrentBackground.extra[0] + "\n(" + CurrentBackground.name + " background)";
		} else {
			xtrFld.userName = "There are no extra choices defined for your " + CurrentBackground.name + " background.\nThus, this drop-down box is empty.\n\nFeel free to use it for additional background comments.";
		};

		// Apply the lifestyle, if defined
		if (CurrentBackground.lifestyle) Value("Lifestyle", CurrentBackground.lifestyle);

		thermoM(3/5); //increment the progress dialog's progress

		// Apply the background common attributes
		var Fea = ApplyFeatureAttributes(
			"background", // type
			CurrentBackground.known, // fObjName [aParent, fObjName]
			[0, 1, false], // lvlA [old-level, new-level, force-apply]
			false, // choiceA [old-choice, new-choice, "only"|"change"]
			false // forceNonCurrent
		);
	}

	thermoM(thermoTxt, true); // Stop progress bar
};

//Make menu for 'background traits' button and parse it to Menus.background
function MakeBackgroundMenu() {
	var backMenu = [];

	var menuLVL1 = function (item, array) {
		for (i = 0; i < array.length; i++) {
			item.push({
				cName : array[i][0],
				cReturn : item + "#" + array[i][1],
				bEnabled : array[i][1] !== "nothing"
			});
		}
	};

	var menuLVL2 = function (menu, name, array) {
		var temp = {
			cName : name + (name == "Personality Trait" ? " (select 2)" : ""),
			oSubMenu : []
		};
		var theEntry = What(name);
		for (i = 0; i < array.length; i++) {
			var toUse = isArray(array[i]) ? array[i][1] : array[i];
			temp.oSubMenu.push({
				cName : toUse,
				cReturn : name + "#" + i,
				bMarked : (RegExp(toUse.RegEscape(), "i")).test(theEntry)
			})
		}
		menu.push(temp);
	};

	if (CurrentBackground.known) {
		menuLVL2(backMenu, "Personality Trait", CurrentBackground.trait);
		menuLVL2(backMenu, "Ideal", CurrentBackground.ideal);
		menuLVL2(backMenu, "Bond", CurrentBackground.bond);
		menuLVL2(backMenu, "Flaw", CurrentBackground.flaw);
	} else {
		menuLVL1(backMenu, [["No background entry has been detected on the first page", "nothing"]]);
	};

	menuLVL1(backMenu, ["-", ["Reset the four fields", "reset"]]);

	Menus.background = backMenu;
};

//call the background menu and do something with the results
function BackgroundOptions() {
	var MenuSelection = getMenu("background");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	if (MenuSelection[0] === "personality trait") {
		AddString("Personality Trait", CurrentBackground.trait[MenuSelection[1]], " ");
	} else if (MenuSelection[0] === "ideal") {
		Value("Ideal", CurrentBackground.ideal[MenuSelection[1]][1]);
	} else if (MenuSelection[0] === "bond") {
		Value("Bond", CurrentBackground.bond[MenuSelection[1]]);
	} else if (MenuSelection[0] === "flaw") {
		Value("Flaw", CurrentBackground.flaw[MenuSelection[1]]);
	} else if (MenuSelection[1] === "reset") {
		tDoc.resetForm(["Personality Trait", "Ideal", "Bond", "Flaw"]);
	}
};

// add a tool or a language (typeLT = "tool" || "language"); uniqueID is the whole submitname for something that has a choice, it is the input + ID
function AddLangTool(typeLT, input, tooltip, uniqueID, replaceThis, replaceMatch) {
	switch (clean(typeLT, false, true).toLowerCase()) {
		case "language" :
			var fld = "Language ";
			var type = "language";
			break;
		case "tool" :
			var fld = "Tool ";
			var type = "tool";
			break;
		default :
			return;
	};
	var inputCl = clean(input, false, true);
	var replaceThisString = replaceThis ? clean(replaceThis, false, true) : false;
	var doReplace = false;
	var overflow = What("MoreProficiencies").toLowerCase().indexOf(inputCl.toLowerCase()) !== -1;
	var theSubmit = uniqueID ? uniqueID : inputCl;
	var useReg = MakeRegex(inputCl);
	var tooltipString = tooltip ? formatMultiList("\"" + (uniqueID ? uniqueID.replace(/.*_#_(.*)_#_.*/, "$1") : inputCl) + "\" " + type + " proficiency was gained from:", tooltip) : "";
	for (var n = 1; n <= 3; n++) {
		for (var i = 1; i <= FieldNumbers.langstools; i++) {
			var next = tDoc.getField(fld + i);
			if (n === 1 && (!uniqueID || (uniqueID && next.submitName == uniqueID)) && (next.value == inputCl || next.submitName == theSubmit || ((useReg).test(next.value) && similarLen(next.value, inputCl)))) {
				if (!replaceThis) {
					next.userName = tooltipString;
					next.submitName = theSubmit;
				};
				return;
			} else if (n === 2 && replaceThis && (next.submitName == replaceThisString || next.value == replaceThisString || (replaceMatch && replaceThisString.toLowerCase().indexOf(next.value.toLowerCase()) !== -1))) {
				doReplace = i;
				break;
			} else if (n === 3 && (doReplace === i || (!doReplace && clean(next.value) === ""))) {
				next.value = inputCl;
				if (!replaceThis) {
					next.submitName = theSubmit;
					next.userName = tooltipString;
				};
				if (overflow) {
					RemoveString("MoreProficiencies", inputCl + " (" + type + ")");
					RemoveString("MoreProficiencies", inputCl);
				};
				return;
			};
		};
	};
	if (!overflow) AddString("MoreProficiencies", inputCl + " (" + type + ")", "; ");
};

// remove a tool or a language (typeLT = "tool" || "language") // choice = the input from the dialogue; uniqueID is for something that offers a choice, so which might have been changed but should still be removed if it matches
function RemoveLangTool(typeLT, input, uniqueID, choice) {
	switch (clean(typeLT, false, true).toLowerCase()) {
		case "language" :
			var fld = "Language ";
			var type = "language";
			break;
		case "tool" :
			var fld = "Tool ";
			var type = "tool";
			break;
		default :
			return;
	};
	var useStr = clean(input, false, true);
	var useReg = MakeRegex(useStr);
	var theSubmit = uniqueID ? uniqueID : useStr;
	for (var i = 1; i <= FieldNumbers.langstools; i++) {
		var next = tDoc.getField(fld + i);
		if ((uniqueID && next.submitName === theSubmit) || (!uniqueID && (next.value === useStr || ((useReg).test(next.value) && similarLen(next.value, useStr))))) {
			DeleteItemType(fld, i, FieldNumbers.langstools);
			return;
		} else if (next.submitName === theSubmit) {
			AddTooltip(fld + i, "", "");
			return;
		};
	};
	var choiceCl = choice ? clean(choice, false, true) : useStr;
	RemoveString("MoreProficiencies", choiceCl + " (" + type + ")");
	RemoveString("MoreProficiencies", choiceCl);

};

// redirect the old function names for legacy support
function AddLanguage(language, tooltip, replaceThis) { AddLangTool("language", language, tooltip, false, replaceThis) };
function RemoveLanguage(language, tooltip) { RemoveLangTool("language", language) };
function AddTool(tool, toolstooltip, replaceThis) { AddLangTool("tool", tool, toolstooltip, false, replaceThis) };
function RemoveTool(tool, toolstooltip) { RemoveLangTool("tool", tool) };

function AddWeapon(weapon, partialReplace) {
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var maxItems = QI ? FieldNumbers.attacks : 3;

	var makeWordBoundryRegex = function (inStr) {
		return RegExp(inStr.RegEscape().replace(/(^\W*)(.*?)(\W*$)/i, "$1\\b$2\\b$3"), "i");
	}
	var searchWea = clean(weapon.toLowerCase(), " "); //remove leading or trailing spaces
	var regexWea = makeWordBoundryRegex(searchWea);
	for (var n = 1; n <= 2; n++) {
		for (var i = 1; i <= maxItems; i++) {
			var next = tDoc.getField(prefix + Q + "Attack." + i + ".Weapon Selection");
			if (n === 1 && (regexWea).test(next.value)) {
				return;
			} else if (n === 2 && (next.value === "" || (partialReplace && (makeWordBoundryRegex(next.value)).test(searchWea)))) {
				next.value = weapon;
				return;
			}
		}
	}
};

function RemoveWeapon(weapon) {
	if (!IsNotImport) return;
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var maxItems = QI ? FieldNumbers.attacks : 3;

	var regexWea = RegExp(clean(weapon.toLowerCase(), " ").RegEscape().replace(/(^\W*)(.*?)(\W*$)/i, "$1\\b$2\\b$3"), "i");
	for (var i = 1; i <= maxItems; i++) {
		if ((regexWea).test(What(prefix + Q + "Attack." + i + ".Weapon Selection"))) {
			WeaponDelete(i);
		}
	}
};

function AddString(field, inputstring, newline) {
	var thefield = tDoc.getField(field);
	if (!thefield) return;
	var thestring = inputstring.replace(/\n/g, "\r");
	var regExString = thestring.RegEscape();
	var multithestring = "\r" + thestring;
	var multilines = thefield.type === "text" && thefield.multiline && newline === true && thefield.value !== "";
	var separator = (newline !== true && newline !== false && thefield.value !== "") ? (newline ? newline : " ") : "";
	if (!(RegExp(regExString, "i")).test(thefield.value) && thefield.value.toLowerCase().indexOf(thestring.toLowerCase()) === -1) {
		if (!multilines && thefield.value !== "") {
			var cleanSep = clean(separator, " ");
			var cleanFld = clean(thefield.value, " ");
			if (cleanFld.slice(cleanSep.length * -1) === cleanSep) separator = " ";
			thefield.value = cleanFld + separator + thestring;
		} else {
			thefield.value += multilines ? multithestring : thestring;
		}
	}
};

function RemoveString(field, toremove, newline) {
	var thestring = toremove.replace(/\n/g, "\r");
	var regExString = thestring.RegEscape();
	var thefield = tDoc.getField(field);
	if (!thefield) return;
	var stringsArray = [
		thestring + "\r",
		"\r" + thestring,
		", " + thestring,
		"; " + thestring,
		thestring + ", ",
		thestring + "; ",
		thestring + " ",
		" " + thestring,
		thestring
	];
	var regExStringsArray = [
		regExString + "\\r",
		"\\r" + regExString,
		", " + regExString,
		"; " + regExString,
		regExString + ", ",
		regExString + "; ",
		regExString + " ",
		" " + regExString,
		regExString
	];
	if (newline === false) {
		stringsArray = [thestring];
		regExStringsArray = [regExString];
	}
	for (var i = 0; i < stringsArray.length; i++) {
		if ((RegExp(regExStringsArray[i], "i")).test(thefield.value)) {
			thefield.value = thefield.value.replace(RegExp(regExStringsArray[i], "i"), "");
			i = stringsArray.length;
		} else if (thefield.value.indexOf(stringsArray[i]) !== -1) {
			thefield.value = thefield.value.replace(stringsArray[i], "");
			i = stringsArray.length;
		}
	}
};

function ReplaceString(field, inputstring, newline, theoldstring, alreadyRegExp) {
	var thefield = tDoc.getField(field);
	if (!thefield) return;
	var thestring = theoldstring.replace(/\n/g, "\r");
	var regExString = alreadyRegExp ? thestring : thestring.RegEscape();
	var multilines = newline !== undefined ? newline : thefield.multiline;
	if ((RegExp(regExString, "i")).test(thefield.value) && theoldstring) {
		thefield.value = thefield.value.replace(RegExp(regExString, "i"), inputstring);
	} else if (thefield.value.indexOf(thestring) !== -1 && theoldstring) {
		thefield.value = thefield.value.replace(thestring, inputstring);
	} else {
		AddString(field, inputstring, multilines);
		return;
	};
	if (field == "Extra.Notes") show3rdPageNotes();
};

// add (change === true) or remove (change === false) a skill proficiency with or without expertise; If expertise === "only", only add/remove the expertise, considering the skill already has proficiency; If expertise === "increment", only add/remove the expertise, considering the skill already has proficiency, otherwise add proficiency
function AddSkillProf(SkillName, change, expertise, returnSkillName, bonus, compPage) {
	var QI = compPage ? !compPage : !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var prefix = QI ? "" : compPage ? compPage : getTemplPre(event.target.name, "AScomp", true);
	var tempString = SkillName;
	if (SkillName.length > 4) {
		if (SkillsList.abbreviations.indexOf(SkillName.substring(0, 4)) !== -1) {
			tempString = SkillName.substring(0, 4);
		} else if (SkillsList.abbreviations.indexOf(SkillName.substring(0, 3)) !== -1) {
			tempString = SkillName.substring(0, 3);
		}
	};
	if (SkillsList.abbreviations.indexOf(tempString) == -1) return; // skill not found, so nothing to do
	var alphaB = Who("Text.SkillsNames") === "alphabeta";
	if ((QI || typePF) && !alphaB) tempString = SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(tempString)];
	if (!QI && !typePF) {
		var skFld = prefix + "Text.Comp.Use.Skills." + tempString + ".Prof";
		var curProf = What(skFld);
		if ((/only|increment/i).test(expertise)) {
			var newval = change && curProf == "proficient" ? "expertise" : !change && curProf == "expertise" ? "proficient" : expertise == "only" ? curProf : change && curProf == "nothing" ? "proficient" : "nothing";
		} else {
			var newval = !change ? "nothing" : expertise ? "expertise" : "proficient";
		}
		Value(skFld, newval);
		if (bonus !== undefined && bonus !== false) Value(prefix + ".BlueText.Comp.Use.Skills." + tempString + ".Bonus", bonus);
	} else {
		var profFld = QI ? tempString + " Prof" : prefix + ".Comp.Use.Skills." + tempString + ".Prof";
		var expFld = QI ? tempString + " Exp" : prefix + ".Comp.Use.Skills." + tempString + ".Exp";
		var bonusFld = QI ? tempString + " Bonus" : prefix + ".BlueText.Comp.Use.Skills." + tempString + ".Bonus";
		var curProf = tDoc.getField(profFld).isBoxChecked(0);
		var curExp = tDoc.getField(expFld).isBoxChecked(0);
		var exp, prof;
		if ((/only|increment/i).test(expertise)) {
			exp = change && curProf ? true : false;
			prof = expertise == "only" ? curProf : !change && curExp;
		} else {
			exp = change && expertise;
			prof = change;
		}
		Checkbox(expFld, exp);
		Checkbox(profFld, prof);
		if (bonus !== undefined && bonus !== false) Value(bonusFld, bonus);
	}
	// return the skill name if concerning a companion page
	if (returnSkillName) return SkillsList.names[SkillsList.abbreviations.indexOf(tempString)];
};

//make sure field is a number or the abbreviation of an ability score (field validation)
function ValidateBonus(goEmpty, allowDC) {
	var test = 0;
	var input = Number(event.value.replace(/,/g,"."));
	if (isNaN(input)) {
		var notComp = getTemplPre(event.target.name, "AScomp");
		test = event.value;
		if (!allowDC) test = test.replace(/dc/ig, "");
		["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS", "Prof"].forEach( function(AbiS) {
			test = test.replace(RegExp("(\\b|\\d)" + AbiS[0] + AbiS[1] + "?" + AbiS[2] + "?" + "(\\b|\\d)", "ig"), "$1" + AbiS + "$2");
		});
		event.value = EvalBonus(test, notComp, "test") !== undefined ? test : event.target.value;
	} else {
		event.value = event.value === "" && goEmpty ? "" : Math.round(input);
	};
};

// Calculate the skill modifier (field calculation)
function CalcSkill() {
	event.value = SkillsList.values[event.target.name] === undefined ? '' : SkillsList.values[event.target.name];
}
function CalcAllSkills(isCompPage) {
	if (isCompPage) {
		var pr = getTemplPre(event.target.name, "AScomp", true);
		if (!pr) return;
	} else {
		var pr = false;
		var remAth = tDoc.getField("Remarkable Athlete").isBoxChecked(0);
		var jackOf = tDoc.getField("Jack of All Trades").isBoxChecked(0);
	}
	var abiFlds = ["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"];
	var alphaB = Who("Text.SkillsNames") == "alphabeta";
	var setVals = SkillsList.values;
	var mod = {};
	for (var i = 0; i < abiFlds.length; i++) {
		var abi = abiFlds[i];
		mod[abi] = What(!pr ? abi + " Mod" : pr + "Comp.Use.Ability." + abi + ".Mod");
	}
	var profB = Number(!pr ? How("Proficiency Bonus") : What(pr + "Comp.Use.Proficiency Bonus"));
	var profDie = tDoc.getField(!pr ? "Proficiency Bonus Dice" : pr + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0);
	var isInit = false;
	var allBonus = EvalBonus(What(!pr ? "All Skills Bonus" : pr + "BlueText.Comp.Use.Skills.All.Bonus"), !pr ? true : pr);
	var passPercFld = !pr ? "Passive Perception" : pr + "Comp.Use.Skills.Perc.Pass.Mod";
	for (var i = 0; i < SkillsList.abbreviations.length; i++) {
		var sk = SkillsList.abbreviations[i];
		isInit = sk == "Init";
		if (sk == "Too" && pr) continue;
		var skFld = alphaB || (pr && !typePF) ? sk : SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(sk)];
		var setFld = !pr ? (isInit ? "Initiative bonus" : skFld) : pr + "Comp.Use." + (isInit ? "Combat.Init" : "Skills." + skFld) + ".Mod";
		var theAbi = SkillsList.abilityScores[i];
		var doPass = sk == "Perc";
		if (!theAbi || theAbi == "Too" || mod[theAbi] === undefined || mod[theAbi] === "") {
			setVals[setFld] = "";
			if (doPass) setVals[passPercFld] = "";
			continue;
		}
		// ability score modifier
		setVals[setFld] = mod[theAbi];
		var addProf = 0;
		// proficiency bonus
		if (isInit) {
			if (!pr) setVals[setFld] += remAth ? Math.ceil(profB / 2) : jackOf ? Math.floor(profB / 2) : 0;
		} else if ((doPass || !profDie) && !pr) {
			if (tDoc.getField(setFld + " Prof").isBoxChecked(0)) {
				addProf = profB;
				if (tDoc.getField(setFld + " Exp").isBoxChecked(0)) addProf += profB;
			} else if (remAth && (/^(Str|Dex|Con)$/).test(theAbi)) {
				addProf = Math.ceil(profB / 2);
			} else if (jackOf) {
				addProf = Math.floor(profB / 2);
			}
		} else if ((doPass || !profDie) && typePF) {
			if (tDoc.getField(pr + "Comp.Use.Skills." + skFld + ".Prof").isBoxChecked(0)) {
				addProf = profB;
				if (tDoc.getField(pr + "Comp.Use.Skills." + skFld + ".Exp").isBoxChecked(0)) addProf += profB;
			}
		} else if (doPass || !profDie) {
			var profType = What(pr + "Text.Comp.Use.Skills." + skFld + ".Prof");
			if (profType == "expertise") {
				addProf = profB * 2;
			} else if (profType == "proficient") {
				addProf = profB;
			}
		}
		if (!profDie) setVals[setFld] += addProf;
		// modifier field
		var modFld = isInit && !pr ? "Init Bonus" : isInit && pr ? pr + "Comp.Use.Combat.Init.Bonus" : !pr ? setFld + " Bonus" : pr + "BlueText.Comp.Use.Skills." + skFld + ".Bonus";
		setVals[setFld] += EvalBonus(What(modFld), !pr ? true : pr);
		// all skill bonus
		if (!isInit) setVals[setFld] += allBonus;
		// passive perception
		if (doPass) {
			setVals[passPercFld] = setVals[setFld] + 10;
			setVals[passPercFld] += EvalBonus(What(!pr ? "Passive Perception Bonus" : pr + "BlueText.Comp.Use.Skills.Perc.Pass.Bonus"), !pr ? true : pr);
			if (!pr) {
				// advantage/disadvantage on the 1st page
				if (!typePF) {
					setVals[passPercFld] += tDoc.getField(setFld + " Adv").isBoxChecked(0) ? 5 : tDoc.getField(setFld + " Dis").isBoxChecked(0) ? -5 : 0;
				} else {
					var pasPercSN = How("Passive Perception Bonus");
					setVals[passPercFld] += pasPercSN == "Adv" ? 5 : pasPercSN == "Dis" ? -5 : 0;
				}
				if (profDie) {
					// add the proficiency bonus if set to using proficiency die
					setVals[passPercFld] += addProf;
				}
			}
		}
	}
	CalcSkill();
};

//calculate the saving throw modifier (field calculation)
function CalcSave() {
	//get the ability modifier belonging to the save
	var Save = event.target.name;
	var QI = event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var Sabi = QI ? 4 : 21 + prefix.length;
	var Ability = Save.substring(0, Sabi - 1).slice(-3);
	var Mod = What(Save.substring(0, Sabi) + "Mod");

	//get the proficiency bonus if applicable
	var Sprof = tDoc.getField(Save.replace("Mod", "Prof")).isBoxChecked(0) === 1;
	var useDice = QI ? tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) === 1 : tDoc.getField(prefix + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) === 1;
	var ProfBonus = useDice || !Sprof ? 0 : What(prefix + Q + "Proficiency Bonus");

	//get the variable entered into the bonus field
	var ExtraBonus = EvalBonus(What(Save.replace("Comp.", "BlueText.Comp.").replace("Mod", "Bonus")), QI ? true : prefix);

	//get the variable entered into the bonus field for all
	var AllBonus = EvalBonus(What(Save.replace("Comp.", "BlueText.Comp.").replace("Mod", "Bonus").replace(Ability, "All")), QI ? true : prefix);

	//calculate the total
	var theResult = Mod === "" ? "" : Number(Mod) + Number(ProfBonus) + Number(ExtraBonus) + Number(AllBonus);

	//change the total to fail if some condition dictates it
	if (!typePF && QI && (Ability === "Str" || Ability === "Dex") && (tDoc.getField("Extra.Condition 8").isBoxChecked(0) === 1 || tDoc.getField("Extra.Condition 9").isBoxChecked(0) === 1 || tDoc.getField("Extra.Condition 13").isBoxChecked(0) === 1 || tDoc.getField("Extra.Condition 14").isBoxChecked(0) === 1)) {
		theResult = "fail";
	}

	event.value = theResult;
};

//calculate the ability modifier (field calculation)
function CalcMod() {
	var Base = event.target.name.indexOf("Comp.") !== -1 || event.target.name.indexOf("Wildshape.") !== -1;
	var AbiNm = Base ? event.target.name.replace(".Mod", ".Score") : event.target.name.replace(" Mod", "");
	var theScore = What(AbiNm);
	event.value = theScore ? (Math.round((theScore - 10.5) * 0.5)) : "";
}

// Add a limited feature: add (UpdateOrReplace = "replace"), or only update the text (UpdateOrReplace = "update"), or update both the text and the usages (UpdateOrReplace = number of previous usages), or just add the number of usages (UpdateOrReplace = "bonus")
function AddFeature(identifier, usages, additionaltxt, recovery, tooltip, UpdateOrReplace, Calc) {
	tooltip = tooltip ? tooltip : "";
	var additionaltxt = additionaltxt && What("Unit System") === "metric" ? ConvertToMetric(additionaltxt, 0.5) : additionaltxt;
	UpdateOrReplace = UpdateOrReplace ? UpdateOrReplace : "replace";
	var calculation = Calc ? Calc : "";
	var SslotsVisible = !typePF && eval(What("SpellSlotsRemember"))[0];
	var recovery = (/^(long rest|short rest|dawn)$/).test(recovery) ? recovery : recovery.capitalize();
	if ((/ ?\bper\b ?/).test(usages)) usages = usages.replace(/ ?\bper\b ?/, "");
	for (var n = 1; n <= 2; n++) {
		for (var i = 1; i <= FieldNumbers.limfea; i++) {
			var featureFld = tDoc.getField("Limited Feature " + i);
			var usageFld = tDoc.getField("Limited Feature Max Usages " + i);
			var recoveryFld = tDoc.getField("Limited Feature Recovery " + i);
			if (n === 1 && featureFld.value.toLowerCase().indexOf(identifier.toLowerCase()) !== -1) { //if the feature is found
				if (UpdateOrReplace === "replace" || (!isNaN(UpdateOrReplace) && !isNaN(usages))) {
					featureFld.value = identifier + additionaltxt;
					if (tooltip) featureFld.userName = "The feature \"" + identifier + "\" was gained from " + tooltip;
					usageFld.setAction("Calculate", calculation);
					usageFld.submitName = calculation; //so it can be referenced later
					recoveryFld.value = recovery;
					if (!isNaN(UpdateOrReplace) && !isNaN(usages)) {
						usageFld.value += usages - UpdateOrReplace;
					} else {
						usageFld.value = usages;
					}
				} else if ((featureFld.value.toLowerCase().indexOf(additionaltxt.toLowerCase()) !== -1 || UpdateOrReplace === "bonus") && !isNaN(usages)) {
					featureFld.userName += featureFld.userName.indexOf(tooltip) === -1 ? ", " + tooltip : "";
					usageFld.value += usages - (!isNaN(UpdateOrReplace) ? UpdateOrReplace : 0);
				} else { //UpdateOrReplace == "update" || isNaN(usages)
					featureFld.value = identifier + additionaltxt;
					usageFld.setAction("Calculate", calculation);
					usageFld.submitName = calculation; //so it can be referenced later
					usageFld.value = usages;
					recoveryFld.value = recovery;
				}
				i = FieldNumbers.limfea + 1;
				n = 3;
			} else if (n === 2 && featureFld.value === "") { //if the feature is not found
				if (SslotsVisible && i > 5 && i < 9) continue; //don't add something to the bottom three rows on the first page if the spell slots are visible
				featureFld.value = identifier + additionaltxt;
				if (tooltip) featureFld.userName = "The feature \"" + identifier + "\" was gained from " + tooltip;
				usageFld.setAction("Calculate", calculation);
				usageFld.submitName = calculation; //so it can be referenced later
				usageFld.value = usages;
				recoveryFld.value = recovery;
				i = FieldNumbers.limfea + 1;
			}
		}
	}
};

// Remove a limited feature
function RemoveFeature(identifier, usages, additionaltxt, recovery, tooltip, UpdateOrReplace, Calc) {
	var theFlds = [
		"Limited Feature ",
		"Limited Feature Max Usages ",
		"Limited Feature Recovery ",
		"Limited Feature Used "
	];
	var EndFldsArray = [];
	for (var F = 0; F < theFlds.length; F++) {
		EndFldsArray.push(theFlds[F] + FieldNumbers.limfea);
	}
	for (var i = 1; i <= FieldNumbers.limfea; i++) {
		var FldsArray = [];
		for (var l = 0; l < theFlds.length; l++) {
			FldsArray.push(theFlds[l] + i);
		}
		var featureFld = tDoc.getField(FldsArray[0]);
		var usageFld = tDoc.getField(FldsArray[1]);
		if (featureFld.value.toLowerCase().indexOf(identifier.toLowerCase()) !== -1) {
			if (!usages || usageFld.value === usages || Calc || isNaN(usages)) {
				LimFeaDelete(i); //delete the limited feature at this row and move all the ones up below it
			} else {
				usageFld.value -= usages;
			}
			i = FieldNumbers.limfea + 1;
		}
	}
}

// >>>> Feat functions <<<< \\

// Make an array of all feat fields of that field number
function ReturnFeatFieldsArray(FldNmbr) {
	fldsArray = [
		"Feat Name " + FldNmbr,			// 0
		"Feat Note " + FldNmbr,			// 1
		"Feat Description " + FldNmbr	// 2
	];
	return fldsArray;
}

// Lookup the name of a Feat and if it exists in the FeatsList
function ParseFeat(input) {
	var found = "";
	var subFound = "";
	if (!input) return [found, subFound, []];

	input = removeDiacritics(input).toLowerCase();
	var foundLen = 0;
	var foundDat = 0;
	var subFoundLen = 0;
	var subFoundDat = 0;
	var subOptionArr = [];
	var isMatch, isMatchSub, tempDate, tempDateSub, tempNameLen;
	var varArr;

	// Scan string for all magic items
	for (var key in FeatsList) {
		var kObj = FeatsList[key];

		// test if the magic item or its source isn't excluded
		if (testSource(key, kObj, "featsExcl")) continue;

		isMatch = input.indexOf(kObj.name.toLowerCase()) !== -1;
		tempDate = sourceDate(kObj.source);
		subFoundLen = 0;
		subFoundDat = 0;
		isMatchSub = "";
		varArr = [];

		if (kObj.choices) {
			for (var i = 0; i < kObj.choices.length; i++) {
				var keySub = kObj.choices[i].toLowerCase();
				var sObj = kObj[keySub];
				if (!sObj || (sObj.source && testSource(keySub, sObj, "featsExcl"))) continue;
				varArr.push(kObj.choices[i]);
				var isMatchSub = false;
				if (sObj.name) {
					isMatchSub = input.indexOf(sObj.name.toLowerCase()) !== -1;
				} else if (isMatch) {
					isMatchSub = input.indexOf(keySub) !== -1;
				}
				if (isMatchSub) {
					// the choice matched, but only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source than the other choices
					tempDateSub = sObj.source ? sourceDate(sObj.source) : tempDate;
					tempNameLen = (sObj.name ? sObj.name : keySub).length
					if (tempNameLen < subFoundLen || (tempNameLen == subFoundLen && tempDateSub < subFoundDat)) continue;
					// we have a match for a choice, so set the values
					subFoundLen = tempNameLen;
					subFoundDat = tempDateSub;
					foundLen = kObj.name.length;
					foundDat = tempDate;
					found = key;
					subFound = keySub;
					subOptionArr = varArr;
				}
			}
		}
		if (!isMatch || subFoundLen) continue; // no match or sub already matched

		// only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source. This differs from the regExpSearch objects
		if (kObj.name.length < foundLen || (kObj.name.length == foundLen && tempDate < foundDat)) continue;

		// we have a match, set the values
		found = key;
		subFound = "";
		subOptionArr = varArr;
		foundLen = kObj.name.length
		foundDat = tempDate;
	}
	return [found, subFound, subOptionArr];
};

// Check all Feat fields and parse the once known into the global variable
function FindFeats() {
	CurrentFeats.known = [];
	CurrentFeats.choices = [];
	for (var i = 1; i <= FieldNumbers.feats; i++) {
		var parsedFeat = ParseFeat( What("Feat Name " + i) );
		CurrentFeats.known.push(parsedFeat[0]);
		CurrentFeats.choices.push(parsedFeat[1]);
	}
}

// Add the text and features of a Feat
function ApplyFeat(input, FldNmbr) {
	if (IsSetDropDowns || CurrentVars.manual.feats || !IsNotFeatMenu) return; // When just changing the dropdowns or feats are set to manual or this is a menu action, don't do anything
	var Fflds = ReturnFeatFieldsArray(FldNmbr);
	// Not called from a field? Then just set the field and let this function be called anew
	if ((!event.target || event.target.name !== Fflds[0]) && What(Fflds[0]) !== input) {
		Value(Fflds[0], input);
		return;
	};

	var parseResult = ParseFeat(input);
	var newFeat = parseResult[0];
	var newFeatVar = parseResult[1];
	var aFeat = FeatsList[newFeat];
	var aFeatVar = aFeat && newFeatVar ? aFeat[newFeatVar] : false;
	var ArrayNmbr = FldNmbr - 1;
	var oldFeat = CurrentFeats.known[ArrayNmbr];
	var oldFeatVar = CurrentFeats.choices[ArrayNmbr];
	var setFieldValueTo;
	var failedChoice = false;

	var doNotCommit = function(toSetVal) {
		if (thermoTxt) thermoM(thermoTxt, true); // Stop progress bar
		if (!IsNotImport) return;
		event.rc = false;
		if (isArray(event.target.page)) OpeningStatementVar = app.setTimeOut("tDoc.getField('" + event.target.name + ".1').setFocus();", 10);
	}

	// If no variant was found, but there is a choice, ask it now
	if (aFeat && aFeat.choices && !newFeatVar) {
		if (parseResult[2].length) {
			var selectFeatVar = false;
			if (parseResult[2].length == 1) {
				selectFeatVar = parseResult[2][0];
			} else if (aFeat.selfChoosing && typeof aFeat.selfChoosing == "function") {
				try {
					selectFeatVar = aFeat.selfChoosing();
				} catch (error) {
					var eText = "The function in the 'selfChoosing' attribute of '" + newFeat + "' produced an error! Please contact the author of the feat code to correct this issue:\n " + error + "\n ";
					for (var e in error) eText += e + ": " + error[e] + ";\n ";
					console.println(eText);
					console.show();
				}
				selectFeatVar = selectFeatVar && typeof selectFeatVar == "string" && aFeat[selectFeatVar.toLowerCase()] ? selectFeatVar : false;
			}
			if (!newFeatVar && !IsNotImport) {
				failedChoice = true;
			} else {
				if (!selectFeatVar) selectFeatVar = AskUserOptions("Select " + aFeat.name + " Type", "The '" + aFeat.name + "' feat has several forms. Select which form you want to add to the sheet at this time.\n\nYou can change the selected form with the little square button in the feat line that this feat is in.", parseResult[2], "radio", true);
				newFeatVar = selectFeatVar.toLowerCase();
				aFeatVar = aFeat[newFeatVar];
				setFieldValueTo = aFeatVar.name ? aFeatVar.name : aFeat.name + " [" + selectFeatVar + "]";
			}
		} else if (!IsNotImport) {
			failedChoice = true;
		} else {
			app.alert({
				cTitle : "Error processing options for " + aFeat.name,
				cMsg : "The feat that you have selected, '" + aFeat.name + "' offers a choice for the form it comes in. Unfortunately, the sheet has run into an issue where there are no forms to choose from because of resources being excluded. Use the \"Source Material\" bookmark to correct this.\n\nThis could also be an issue with the imported script containing the feat not being written correctly. If so, please contact the author of that import script."
			});
			doNotCommit();
			return;
		}
	}

	// if there was a choice but none was selected for whatever reason (importing), do not apply anything and warn the user
	if (failedChoice) {
		Value(Fflds[2], 'ERROR, please reapply "' + aFeat.name + '" above.');
		if (!IsNotImport) {
			console.println("The feat '" + aFeat.name + "' requires you to make a selection of a sub-choice. However, because this feat was added during importing from another MPMB's Character Record Sheet, no pop-up dialog could be displayed to allow you to make a selection. Please reapply this feat to show the pop-up dialog and make a selection for its sub-choice.");
			console.show();
		}
		if (thermoTxt) thermoM(thermoTxt, true); // Stop progress bar
		event.target.setVal = "ERROR, please reapply: " + (aFeat.name.substr(0,2) + "\u200A" + aFeat.name.substr(2)).split(" ").join("\u200A ");
		return;
	}

	if (oldFeat === newFeat && oldFeatVar === newFeatVar) {
		if (setFieldValueTo) event.target.setVal = setFieldValueTo;
		return; // No changes were made
	}

	// Start progress bar
	var thermoTxt = thermoM("Applying feat...");
	thermoM(1/6); // Increment the progress bar

	// Create the object to use (merge parent and choice)
	if (!newFeatVar) {
		var theFeat = aFeat;
		aFeatVar = "";
	} else {
		var theFeat = {
			name : aFeatVar.name ? aFeatVar.name : setFieldValueTo ? setFieldValueTo : input
		}
		var FeatAttr = ["source", "description", "descriptionFull", "calculate", "prerequisite", "prereqeval"];
		for (var a = 0; a < FeatAttr.length; a++) {
			var aKey = FeatAttr[a];
			if (aFeatVar[aKey]) {
				theFeat[aKey] = aFeatVar[aKey];
			} else if (aFeat[aKey]) {
				theFeat[aKey] = aFeat[aKey];
			}
		}
	}

	// Check if the feat doesn't already exist (with the same choice, if any)
	if (IsNotImport && !ignoreDuplicates && aFeat) {
		// count occurrence of parent & choice
		var parentDupl = 0;
		var choiceDupl = 0;
		for (var i = 0; i < CurrentFeats.known.length; i++) {
			if (i == ArrayNmbr) continue;
			if (CurrentFeats.known[i] == newFeat) {
				parentDupl++;
				if (newFeatVar && CurrentFeats.choices[i] == newFeatVar) choiceDupl++;
			}
		}
		if ((parentDupl && !aFeat.allowDuplicates) || (choiceDupl && !aFeatVar.allowDuplicates)) {
			var stopFunct = app.alert({
				cTitle : "Can only have one instance of a feat",
				cMsg : "The feat that you have selected, '" + (choiceDupl ? theFeat.name : aFeat.name) + "' is already present on the sheet and you can't have duplicates of it." + (newFeatVar && !choiceDupl ? "\n\nHowever, as this is a composite feat that exists in different forms, and you don't have '" + theFeat.name + "' yet, the sheet can allow you to add it regardless of the rules. Do you want to continue adding this feat?" : ""),
				nIcon : !newFeatVar || choiceDupl ? 0 : 1,
				nType : !newFeatVar || choiceDupl ? 0 : 2
			});
			if (stopFunct === 1 || stopFunct === 3) {
				doNotCommit();
				return;
			}
		}
	}

	// Before stopping the calculations, first test if the feat has a prerequisite and if it meets that
	if (IsNotImport && IsNotReset && theFeat && theFeat.prereqeval && !ignorePrereqs && event.target && event.target.name == Fflds[0]) {
		try {
			if (typeof theFeat.prereqeval == 'string') {
				var meetsPrereq = eval(theFeat.prereqeval);
			} else if (typeof theFeat.prereqeval == 'function') {
				var gatherVars = gatherPrereqevalVars();
				gatherVars.choice = newFeatVar;
				var meetsPrereq = theFeat.prereqeval(gatherVars);
			}
		} catch (error) {
			var eText = "The 'prereqeval' attribute for the feat '" + theFeat.name + "' produces an error and is subsequently ignored. If this is one of the built-in feats, please contact morepurplemorebetter using one of the contact bookmarks to let him know about this bug. Please do not forget to list the version number of the sheet, name and version of the software you are using, and the name of the feat.\nThe sheet reports the error as\n " + error + "\n ";
			for (var e in error) eText += e + ": " + error[e] + ";\n ";
			console.println(eText);
			console.show();
			var meetsPrereq = true;
		};
		if (!meetsPrereq) {
			thermoTxt = thermoM("The feat '" + theFeat.name + "' has prerequisites that have not been met...", false); //change the progress dialog text
			thermoM(1/5); //increment the progress dialog's progress

			var askUserFeat = app.alert({
				cTitle : "The prerequisites for '" + theFeat.name + "' have not been met",
				cMsg : "The feat that you have selected, '" + theFeat.name + "' has a prerequisite listed" + (theFeat.prerequisite ? ' as: \n\t"' + theFeat.prerequisite + '"' : ".") + "\n\nYour character does not meet this requirement. Are you sure you want to apply this feat?",
				nIcon : 1,
				nType : 2
			});

			if (askUserFeat !== 4) { // If "NO" was pressed
				doNotCommit();
				return;
			}
		};
	};

	// if a feat variant was chosen, make sure this field will show that selection, now that it can't be cancelled anymore due to not meeting a prerequisite
	if (setFieldValueTo) event.target.setVal = setFieldValueTo;

	calcStop(); // Now stop the calculations

	// Remove previous feat at the same field
	if (oldFeat !== newFeat || oldFeatVar !== newFeatVar) {
		// Remove everything from the description field, value, calculation, tooltip, submitname
		tDoc.getField(Fflds[2]).setAction("Calculate", "");
		Value(Fflds[2], "", "", "");
		if (oldFeat) {
			if (oldFeat !== newFeat) {
				// Remove its attributes
				var Fea = ApplyFeatureAttributes(
					"feat", // type
					oldFeat, // fObjName
					[CurrentFeats.level, 0, false], // lvlA [old-level, new-level, force-apply]
					[oldFeatVar, "", false], // choiceA [old-choice, new-choice, "only"|"change"]
					false // forceNonCurrent
				);
			}
			// remove the source from the notes field
			var oldSource = oldFeatVar && FeatsList[oldFeat][oldFeatVar].source ? FeatsList[oldFeat][oldFeatVar] : FeatsList[oldFeat];
			var sourceStringOld = stringSource(oldSource, "first", "[", "]");
			if (sourceStringOld) RemoveString(Fflds[1], sourceStringOld);
		}
	}

	// Update the CurrentFeats.known variable
	CurrentFeats.known[ArrayNmbr] = newFeat;
	CurrentFeats.choices[ArrayNmbr] = newFeatVar;

	// Do something if there is a new feat to apply
	if (aFeat) {
		thermoTxt = thermoM("Applying '" + theFeat.name + "' feat...", false); //change the progress dialog text
		thermoM(1/3); //increment the progress dialog's progress

		// Set the field description/calculation
		if (theFeat.calculate) {
			var theCalc = What("Unit System") === "imperial" ? theFeat.calculate : ConvertToMetric(theFeat.calculate, 0.5);
			if (typePF) theCalc = theCalc.replace("\n", " ");
			tDoc.getField(Fflds[2]).setAction("Calculate", theCalc);
		}

		// Create the tooltip
		var tooltipStr = toUni(theFeat.name);
		if (theFeat.prerequisite) tooltipStr += "\n \u2022 Prerequisite: " + theFeat.prerequisite;
		tooltipStr += stringSource(theFeat, "full,page", "\n \u2022 Source: ", ".");
		if (theFeat.descriptionFull) tooltipStr += isArray(theFeat.descriptionFull) ? desc(theFeat.descriptionFull).replace(/^\n   /i, "\n\n") : "\n\n" + theFeat.descriptionFull;

		// Get the description
		var theDesc = !theFeat.description ? "" : What("Unit System") === "imperial" ? theFeat.description : ConvertToMetric(theFeat.description, 0.5);
		if (typePF) theDesc = theDesc.replace("\n", " ");
		// Set it all to the appropriate field
		Value(Fflds[2], theDesc, tooltipStr, theFeat.calculate ? theCalc : "");

		// Set the notes field
		var sourceString = stringSource(theFeat, "first", "[", "]");
		if (sourceString) AddString(Fflds[1], sourceString, " ");

		// Apply the rest of its attributes
		var justChange = oldFeat == newFeat && oldFeatVar !== newFeatVar;
		var Fea = ApplyFeatureAttributes(
			"feat", // type
			newFeat, // fObjName
			[justChange ? CurrentFeats.level : 0, CurrentFeats.level, justChange], // lvlA [old-level, new-level, force-apply]
			justChange ? [oldFeatVar, newFeatVar, "change"] : ["", newFeatVar, false], // choiceA [old-choice, new-choice, "only"|"change"]
			false // forceNonCurrent
		);
	}

	thermoM(thermoTxt, true); // Stop progress bar
};

function SetFeatsdropdown(forceTooltips) {
	var ArrayDing = [""];
	var tempString = "Type in the name of the feat (or select it from the drop-down menu) and its text and features will be filled out automatically, provided it is a recognized feat.\n\nAbility scores will not be automatically altered other than their tool tips (mouseover texts) and in the Scores dialog.";
	for (var key in FeatsList) {
		if (testSource(key, FeatsList[key], "featsExcl")) continue;
		var feaNm = FeatsList[key].name;
		if (ArrayDing.indexOf(feaNm) === -1) ArrayDing.push(feaNm);
	}
	ArrayDing.sort();

	var ArrayDingSource = ArrayDing.toSource();
	var applyItems = tDoc.getField("Feat Name 1").submitName !== ArrayDingSource;
	if (applyItems) tDoc.getField("Feat Name 1").submitName = ArrayDingSource;

	for (var i = 1; i <= FieldNumbers.feats; i++) {
		var theFeatFld = "Feat Name " + i;
		var theFeati = What(theFeatFld);
		if (applyItems) {
			tDoc.getField(theFeatFld).setItems(ArrayDing);
			Value(theFeatFld, theFeati, tempString);
		} else if (forceTooltips) {
			AddTooltip(theFeatFld, tempString);
		}
	}
}

//Make menu for the button on each Feat line and parse it to Menus.feats
function MakeFeatMenu_FeatOptions(MenuSelection, itemNmbr) {
	var featMenu = [];
	if (!itemNmbr) itemNmbr = parseFloat(event.target.name.slice(-2));
	var ArrayNmbr = itemNmbr - 1;
	var Fflds = ReturnFeatFieldsArray(itemNmbr);
	var theField = What(Fflds[0]) != "";
	var noUp = itemNmbr === 1;
	var noDown = itemNmbr === FieldNumbers.feats;
	var upToOtherPage = itemNmbr !== (FieldNumbers.featsD + 1) ? "" : typePF ? " (to third page)" : " (to second page)";
	var downToOtherPage = itemNmbr === FieldNumbers.featsD ? " (to overflow page)" : "";
	var aFeat;

	if (!MenuSelection || MenuSelection === "justMenu") {
		// a function to add the other items
		var menuLVL1 = function (array) {
			for (i = 0; i < array.length; i++) {
				featMenu.push({
					cName : array[i][0],
					cReturn : "feat#" + array[i][1],
					bEnabled : array[i][2] !== undefined ? array[i][2] : true
				});
			}
		};
		// if this feat allows for a choice, add that option as the first thing in the menu
		if (CurrentFeats.known[ArrayNmbr]) {
			aFeat = FeatsList[CurrentFeats.known[ArrayNmbr]];
			if (FeatsList[CurrentFeats.known[ArrayNmbr]].choices) {
				var aFeatOpts = aFeat.choices;
				var choiceMenu = {
					cName : "Change type of " + aFeat.name,
					oSubMenu : []
				};
				for (var i = 0; i < aFeatOpts.length; i++) {
					var aCh = aFeatOpts[i];
					var aChL = aCh.toLowerCase();
					if (!aFeat[aChL] || (aFeat[aChL].source && testSource(aChL, aFeat[aChL], "featsExcl"))) continue;
					choiceMenu.oSubMenu.push({
						cName : aCh + stringSource(aFeat[aChL].source ? aFeat[aChL] : aFeat, "first,abbr", "\t   [", "]"),
						cReturn : "feat#choice#" + aChL,
						bMarked : CurrentFeats.choices[ArrayNmbr] == aChL
					});
				}
				if (choiceMenu.oSubMenu.length > 1) featMenu.push(choiceMenu);
			}
			// an option to read the whole description
			if (Who(Fflds[2])) menuLVL1([["Show full text of " + aFeat.name, "popup"]]);
			// add a separator if we have any items in the menu so far
			if (featMenu.length) featMenu.push({cName : "-"});
		}
		menuLVL1([
			["Move up" + upToOtherPage, "up", !noUp],
			["Move down" + downToOtherPage, "down", !noDown],
			["-", "-"],
			["Insert empty feat", "insert", noDown || !theField ? false : true],
			["Delete feat", "delete"],
			["Clear feat", "clear"],
		]);
		Menus.feats = featMenu;
		if (MenuSelection == "justMenu") return;
	}
	MenuSelection = getMenu("feats");
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] != "feat") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Apply feat menu option...");

	switch (MenuSelection[1]) {
		case "popup" :
			ShowDialog("Feat's full description", Who(Fflds[2]));
			break;
		case "choice" :
			aFeat = FeatsList[CurrentFeats.known[ArrayNmbr]];
			if (MenuSelection[2] && aFeat && aFeat[MenuSelection[2]] && CurrentFeats.choices[ArrayNmbr] !== MenuSelection[2]) {
				var aFeatVar = aFeat[MenuSelection[2]];
				if (aFeatVar.name) {
					Value(Fflds[0], aFeatVar.name);
				} else {
					for (var i = 0; i < aFeat.choices.length; i++) {
						if (aFeat.choices[i].toLowerCase() == MenuSelection[2]) {
							Value(Fflds[0], aFeat.name + " [" + aFeat.choices[i] + "]");
							break;
						}
					}
				}
			}
			break;
		case "up" :
			if (noUp) return;
		case "down" :
			if (MenuSelection[1] == "down" && noDown) return;
			calcStop();
			IsNotFeatMenu = false;
			thermoTxt = thermoM("Moving the feat " + MenuSelection[1] + "...", false);
			// Get the other fields
			var otherNmbr = MenuSelection[1] == "down" ? itemNmbr + 1 : itemNmbr - 1;
			var FfldsO = ReturnFeatFieldsArray(otherNmbr);
			// Now swap all the fields
			for (var i = 0; i < Fflds.length; i++) {
				var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
				copyField(Fflds[i], FfldsO[i], exclObj, true);
				thermoM(i/Fflds.length); //increment the progress dialog's progress
			}
			// Correct the entry in the CurrentMagicItems.known array
			if (!CurrentVars.manual.feats) {
				var thisKnown = CurrentFeats.known[itemNmbr - 1];
				var thisChoice = CurrentFeats.choices[itemNmbr - 1];
				CurrentFeats.known[itemNmbr - 1] = CurrentFeats.known[otherNmbr - 1];
				CurrentFeats.known[otherNmbr - 1] = thisKnown;
				CurrentFeats.choices[itemNmbr - 1] = CurrentFeats.choices[otherNmbr - 1];
				CurrentFeats.choices[otherNmbr - 1] = thisChoice;
			}
			IsNotFeatMenu = true;
			break;
		case "insert" :
			FeatInsert(itemNmbr);
			break;
		case "delete" :
			FeatDelete(itemNmbr);
			break;
		case "clear" :
			thermoTxt = thermoM("Clearing feat...", false);
			FeatClear(itemNmbr, true);
			break;
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//insert a feat at the position wanted
function FeatInsert(itemNmbr) {
	// Stop the function if the selected slot is already empty
	if (!What("Feat Name " + itemNmbr)) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Inserting empty feat...");
	calcStop();
	IsNotFeatMenu = false;

	// Look for the first empty slot below the slot
	var endslot = false;
	for (var i = itemNmbr + 1; i <= FieldNumbers.feats; i++) {
		if (What("Feat Name " + i) === "") {
			endslot = i;
			break;
		}
	}

	//only continue if an empty slot was found in the fields
	if (endslot) {
		// Cycle through the slots starting with the found empty one and add the values of the one above
		for (var f = endslot; f > itemNmbr; f--) {
			// Copy all the fields
			var FfldsFrom = ReturnFeatFieldsArray(f - 1);
			var FfldsTo = ReturnFeatFieldsArray(f);
			for (var i = 0; i < FfldsFrom.length - 1; i++) {
				var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
				copyField(FfldsFrom[i], FfldsTo[i], exclObj);
			}
			// Correct the known array & choices arrays
			if (!CurrentVars.manual.feats) {
				CurrentFeats.known[f - 1] = CurrentFeats.known[f - 2];
				CurrentFeats.choices[f - 1] = CurrentFeats.choices[f - 2];
			}
		}

		// Empty the selected slot
		FeatClear(itemNmbr)
	}

	IsNotFeatMenu = true;
	thermoM(thermoTxt, true); // Stop progress bar
}

//delete a feat at the position wanted and move the rest up
function FeatDelete(itemNmbr) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Deleting feat...");
	calcStop();

	var maxNmbr = FieldNumbers.feats;
	// Stop at the end of the first page if last one on first page is empty
	if (itemNmbr <= FieldNumbers.featsD && !What("Feat Name " + FieldNumbers.featsD)) maxItem = FieldNumbers.featsD;

	// First clear the current feat so that it's automation is run
	FeatClear(itemNmbr, true);
	IsNotFeatMenu = false;

	// Make every line identical to the one below, starting with the selected line
	for (var f = itemNmbr; f < maxItem; f++) {
		// Copy all the fields
		var FfldsFrom = ReturnFeatFieldsArray(f + 1);
		var FfldsTo = ReturnFeatFieldsArray(f);
		for (var i = 0; i < FfldsFrom.length - 1; i++) {
			var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
			copyField(FfldsFrom[i], FfldsTo[i], exclObj);
		}
		// Correct the known array & choices arrays
		if (!CurrentVars.manual.feats) {
			CurrentFeats.known[f - 1] = CurrentFeats.known[f];
			CurrentFeats.choices[f - 1] = CurrentFeats.choices[f];
		}
	}

	// Clear the final line
	FeatClear(maxItem);

	IsNotFeatMenu = true;
	thermoM(thermoTxt, true); // Stop progress bar
}

// Clear a feat at the position given
function FeatClear(itemNmbr, doAutomation) {
	var Fflds = ReturnFeatFieldsArray(itemNmbr);
	if (doAutomation && !CurrentVars.manual.feats && CurrentFeats.known[itemNmbr - 1]) {
		IsNotFeatMenu = true;
		Value("Feat Name " + itemNmbr, "");
		tDoc.resetForm(Fflds[1]);
	} else {
		if (!CurrentVars.manual.feats) CurrentFeats.known[itemNmbr - 1] = "";
		AddTooltip(Fflds[2], "", "");
		tDoc.getField(Fflds[2]).setAction("Calculate", "");
		if (IsNotReset) tDoc.resetForm(Fflds);
	}
}

//this is now an empty function so that legacy code doesn't produce an error
function ChangeSpeed(input) {
	console.println("ChangeSpeed(" + input + ") was called, but this function is no longer supported since v12.998 of the sheet. Instead, a new, more comprehensive syntax for setting speed is available from v12.998 onwards.");
	console.show();
};

function ResetFeaSR() {
	for (var z = 1; z <= FieldNumbers.limfea; z++) {
		var recoveryFld = What("Limited Feature Recovery " + z).toLowerCase();
		if (recoveryFld.indexOf("short rest") !== -1 || recoveryFld.indexOf("sr") !== -1) {
			resetForm(["Limited Feature Used " + z]);
		}
	}
}

function ResetFeaLR() {
	calcStop();
	for (var z = 1; z <= FieldNumbers.limfea; z++) {
		var recoveryFld = What("Limited Feature Recovery " + z).toLowerCase();
		if (recoveryFld.indexOf("short rest") !== -1 || recoveryFld.indexOf("sr") !== -1 || recoveryFld.indexOf("long rest") !== -1 || recoveryFld.indexOf("lr") !== -1) {
			resetForm(["Limited Feature Used " + z]);
		}
	}
	var SpellSlotsReset = [];
	var SSfrontA = What("Template.extras.SSfront").split(",")[1];
	if (SSfrontA) SpellSlotsReset.push(SSfrontA + "SpellSlots.Checkboxes");
	if (!typePF) SpellSlotsReset.push("SpellSlots.Checkboxes");
	if (!typePF && SSfrontA) SpellSlotsReset.push(SSfrontA + "SpellSlots2.Checkboxes");
	if (SpellSlotsReset.length > 0) tDoc.resetForm(SpellSlotsReset);
}

function ResetFeaDawn() {
	for (var z = 1; z <= FieldNumbers.limfea; z++) {
		var recoveryFld = What("Limited Feature Recovery " + z).toLowerCase();
		if (recoveryFld.indexOf("dawn") !== -1 || recoveryFld.indexOf("day") !== -1) {
			resetForm(["Limited Feature Used " + z]);
		}
	}
}

function HealItNow() {
	calcStop();
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);

	var fields = [
		"HP Current",
		"HP Temp",
		"Death Save Fail1",
		"Death Save Fail2",
		"Death Save Fail3",
		"Death Save Success1",
		"Death Save Success2",
		"Death Save Success3"
	];
	var CompFields = [
		prefix + "Comp.Use.HP.Current",
		prefix + "Comp.Use.HP.Temp",
		prefix + "Comp.Use.DeathSave"
	];
	tDoc.resetForm(QI ? fields : CompFields);

	// now heal half the HD, starting with the highest (HD1), and using remaining leftovers
	if (QI) {
		var HD1 = Number(What("HD1 Used"));
		var HD2 = Number(What("HD2 Used"));
		var HD3 = Number(What("HD3 Used"));
		var toHeal = Math.max(1, Math.floor((Number(What("HD1 Level")) + Number(What("HD2 Level")) + Number(What("HD3 Level"))) / 2));

		//now go through the HD and recover theMenu
		if (toHeal > 0 && HD1) {
			Value("HD1 Used", HD1 - toHeal <= 0 ? "" : Math.max(1, HD1 - toHeal));
			toHeal -= HD1;
		};
		if (toHeal > 0 && HD2) {
			Value("HD2 Used", HD2 - toHeal <= 0 ? "" : Math.max(1, HD2 - toHeal));
			toHeal -= HD2;
		};
		if (toHeal > 0 && HD3) {
			Value("HD3 Used", HD3 - toHeal <= 0 ? "" : Math.max(1, HD3 - toHeal));
			toHeal -= HD3;
		};
	} else {
		var toHeal = Math.max(1, Math.floor(What(prefix + "Comp.Use.HD.Level") / 2));
		var HD1 = Number(What(prefix + "Comp.Use.HD.Used"));

		if (HD1 - toHeal <= 0) {
			Value(prefix + "Comp.Use.HD.Used", "");
		} else if (HD1 - toHeal > 0) {
			Value(prefix + "Comp.Use.HD.Used", HD1 - toHeal);
		}
	}
};

//calculate the encumbrance (field calculation)
function CalcEncumbrance() {
	var Str = What("Str"), result = "";
	var Size = What("Size Category");
	Size = Size ? Size : 1;
	var CarMult = Math.max(What("Carrying Capacity Multiplier"), 0);
	var decSep = What("Decimal Separator");
	var FldName = event.target.name;
	var Mult1 = FldName.indexOf("Push") !== -1 || FldName.indexOf("Carrying Capacity") !== -1 ? 15 : FldName.indexOf("Heavily") !== -1 ? 10 : 5;
	var Mult2 = FldName.indexOf("Push") !== -1 ? 30 : FldName.indexOf("Heavily") !== -1 ? 15 : 10;
	var UnitSystem = What("Unit System");
	if (UnitSystem === "imperial") {
		var Unit = " lb";
		var UnitMult = 1;
		var pushSep = " - ";
	} else if (UnitSystem === "metric") {
		var Unit = " kg";
		var UnitMult = UnitsList.metric.mass;
		var pushSep = "-";
	}

	var BasicMult = Number(Size) * Number(CarMult);
	var TotalMult = Number(Str) * Number(Size) * Number(CarMult);
	if (CarMult === 0 || (!Str && FldName.indexOf("Text") === -1)) {
		result = "";
	} else if (FldName.indexOf("Text") !== -1 && FldName.indexOf("Push") !== -1) {
		result = RoundTo((BasicMult * Mult1 * UnitMult), 0.1) + pushSep + RoundTo((BasicMult * Mult2 * UnitMult), 0.1);
	} else if (FldName.indexOf("Text") !== -1) {
		result = RoundTo((BasicMult * Mult1 * UnitMult), 0.1);
	} else if (FldName.indexOf("Carrying Capacity") !== -1) {
		result = Math.floor(TotalMult * Mult1 * UnitMult) + Unit;
	} else {
		result = Math.floor(1 + TotalMult * Mult1 * UnitMult) + " - " + (!typePF ? "\n" : "") + Math.floor(TotalMult * Mult2 * UnitMult) + Unit;
	}
	if (decSep === "comma" && result) {
		result = "." + result;
		result = result.replace(/\./g, ",");
		result = result.substring(1);
	}
	event.value = result;
}

function ParseClassFeature(theClass, theFeature, FeaLvl, ForceOld, SubChoice, Fea, ForceFeaOld) {
	var FeaKey = ForceOld && ClassList[theClass].features[theFeature] ? ClassList[theClass].features[theFeature] : CurrentClasses[theClass].features[theFeature];
	if (!FeaKey) return "";

	var old = (ForceOld || ForceFeaOld) && Fea ? "Old" : "";
	if (old) Fea.source = Fea.sourceOld;
	var FeaClass = !ForceOld && theFeature.indexOf("subclassfeature") !== -1 && CurrentClasses[theClass].subname ? CurrentClasses[theClass].subname : CurrentClasses[theClass].name;
	if (!Fea) Fea = GetLevelFeatures(FeaKey, FeaLvl, SubChoice, "", "");

	if (!Fea.UseName) return ["", ""]; // return empty strings if there is no name

	var FeaSource = stringSource(Fea, "first,abbr", ", ");
	var FeaRef = " (" + FeaClass + " " + FeaKey.minlevel + FeaSource + ")";
	var FeaUse = Fea["Use" + old] + (Fea["Use" + old] && !isNaN(Fea["Use" + old]) ? "\u00D7 per " : "") + Fea["Recov" + old];
	var FeaPost = "";
	if (Fea["Add" + old] && FeaUse) {
		FeaPost = " [" + Fea["Add" + old] + ", " + FeaUse + "]";
	} else if (Fea["Add" + old]) {
		FeaPost = " [" + Fea["Add" + old] + "]";
	} else if (FeaUse) {
		FeaPost = " [" + FeaUse + "]";
	}

	var FeaName = SubChoice && FeaKey[SubChoice] ? FeaKey[SubChoice].name : FeaKey.name;
	var FeaFirstLine = "\u25C6 " + FeaName + FeaRef;
	var FeaDescr = Fea["Descr" + old];
	if (isArray(FeaDescr)) FeaDescr = desc(FeaDescr);
	var FeaOtherLines = FeaPost + FeaDescr;
	if (What("Unit System") == "metric") FeaOtherLines = ConvertToMetric(FeaOtherLines, 0.5);

	return [FeaFirstLine + (Fea.extFirst ? FeaPost : ""), "\r" + FeaFirstLine + FeaOtherLines];
};

function ParseClassFeatureExtra(theClass, theFeature, extraChoice, Fea, ForceOld) {
	var FeaKey = CurrentClasses[theClass] ? CurrentClasses[theClass].features[theFeature][extraChoice.toLowerCase()] : false;
	if (!FeaKey || !FeaKey.name) return ["", ""];
	var old = ForceOld ? "Old" : "";
	if (old) Fea.source = Fea.sourceOld;

	var FeaRef = " (" + CurrentClasses[theClass].features[theFeature].extraname + stringSource(Fea, "first,abbr", ", ") + ")";
	var FeaUse = Fea["Use" + old] + (Fea["Use" + old] && !isNaN(Fea["Use" + old]) ? "\u00D7 per " : "") + Fea["Recov" + old];
	var FeaPost = "";
	if (Fea["Add" + old] && FeaUse) {
		FeaPost = " [" + Fea["Add" + old] + ", " + FeaUse + "]";
	} else if (Fea["Add" + old]) {
		FeaPost = " [" + Fea["Add" + old] + "]";
	} else if (FeaUse) {
		FeaPost = " [" + FeaUse + "]";
	};

	var FeaFirstLine = "\u25C6 " + FeaKey.name + FeaRef;
	var FeaDescr = Fea["Descr" + old];
	if (isArray(FeaDescr)) FeaDescr = desc(FeaDescr);
	var FeaOtherLines = FeaPost + FeaDescr;
	if (What("Unit System") == "metric") FeaOtherLines = ConvertToMetric(FeaOtherLines, 0.5);

	return [FeaFirstLine + (ForceOld ? "" : FeaPost), "\r" + FeaFirstLine + FeaOtherLines];
};

//change all the level-variables gained from classes and races
function UpdateLevelFeatures(Typeswitch, newLvlForce) {
	if (!IsNotReset) return; //stop this function on a reset

	// initialise some variables
	Typeswitch = Typeswitch === undefined ? "all" : Typeswitch;
	var thermoTxt, Fea, feaA;

	// Start progress bar and stop calculations
	thermoTxt = thermoM("Updating level-dependent features...");
	calcStop();
	thermoM(1/8); //increment the progress dialog's progress

	// apply race level changes
	var oldRaceLvl = CurrentRace.level;
	var newRaceLvl = newLvlForce !== undefined ? newLvlForce : What("Character Level") ? Number(What("Character Level")) : 1;
	if (CurrentRace.known && (/race|all|notclass/i).test(Typeswitch) && newRaceLvl != oldRaceLvl) {
		thermoTxt = thermoM("Updating " + CurrentRace.name + " features...", false);
		thermoM(3/8); //increment the progress dialog's progress
		// do the CurrentRace object itself
		Fea = ApplyFeatureAttributes(
			"race", // type
			[CurrentRace.known, CurrentRace.known], // fObjName [aParent, fObjName]
			[oldRaceLvl, newRaceLvl, false], // lvlA [old-level, new-level, force-apply]
			false, // choiceA [old-choice, new-choice, "only"|"change"]
			false // forceNonCurrent
		);
		thermoM(5/8); //increment the progress dialog's progress
		// iterate through the racial features and apply/update them
		if (CurrentRace.features) {
			feaA = [];
			for (var key in CurrentRace.features) feaA.push(key);
			if (oldRaceLvl > newRaceLvl) feaA.reverse(); // when removing, loop through them backwards
			for (var f = 0; f < feaA.length; f++) {
				var prop = feaA[f]
				// --- backwards compatibility --- //
				// set the name and limfeaname from the depreciated tooltip attribute
				var propFea = CurrentRace.features[prop];
				if (propFea.tooltip && !propFea.limfeaname) {
					propFea.limfeaname = propFea.name;
					propFea.name = propFea.tooltip.replace(/^ *\(|\)$/g, '');
				}

				Fea = ApplyFeatureAttributes(
					"race", // type
					[CurrentRace.known, prop], // fObjName [aParent, fObjName]
					[oldRaceLvl, newRaceLvl, false], // lvlA [old-level, new-level, force-apply]
					false, // choiceA [old-choice, new-choice, "only"|"change"]
					false // forceNonCurrent
				);
			}
		}
		// update the racial level
		CurrentRace.level = newRaceLvl;
		if (CurrentSpells[CurrentRace.known]) CurrentSpells[CurrentRace.known].level = newRaceLvl;
	}

	// apply feat level changes
	var oldFeatLvl = CurrentFeats.level;
	var newFeatLvl = newRaceLvl; // would otherwise be identical to how to determine the race level
	if ((/feat|all|notclass/i).test(Typeswitch) && oldFeatLvl != newFeatLvl) {
		for (var f = 0; f < CurrentFeats.known.length; f++) {
			var aFeat = CurrentFeats.known[f];
			var theFeat = FeatsList[aFeat];
			if (!theFeat) continue;

			thermoTxt = thermoM("Updating " + theFeat.name + " features...", false);
			thermoM((f+1)/CurrentFeats.known.length); //increment the progress dialog's progress

			Fea = ApplyFeatureAttributes(
				"feat", // type
				aFeat, // fObjName
				[oldFeatLvl, newFeatLvl, false], // lvlA [old-level, new-level, force-apply]
				[CurrentFeats.choices[f], CurrentFeats.choices[f], false], // choiceA [old-choice, new-choice, "only"|"change"]
				false // forceNonCurrent
			);
		}
		CurrentFeats.level = newFeatLvl;
	}

	// apply magic item level changes
	var oldItemLvl = CurrentMagicItems.level;
	var newItemLvl = newRaceLvl; // would otherwise be identical to how to determine the race level
	if ((/item|all|notclass/i).test(Typeswitch) && oldItemLvl != newItemLvl) {
		for (var f = 0; f < CurrentMagicItems.known.length; f++) {
			var anItem = CurrentMagicItems.known[f];
			var anItemVar = CurrentMagicItems.known[f];
			var theItem = MagicItemsList[anItem];

			// if the attunement field is visible, but the checkbox is not checked, skip it
			var attuneFld = tDoc.getField("Extra.Magic Item Attuned " + (f+1));
			if (!theItem || (attuneFld.display == display.visible && !attuneFld.isBoxChecked(0))) continue;

			thermoTxt = thermoM("Updating " + theItem.name + " features...", false);
			thermoM((f+1)/CurrentMagicItems.known.length); //increment the progress dialog's progress

			Fea = ApplyFeatureAttributes(
				"item", // type
				anItem, // fObjName
				[oldItemLvl, newItemLvl, false], // lvlA [old-level, new-level, force-apply]
				[CurrentMagicItems.choices[f], CurrentMagicItems.choices[f], false], // choiceA [old-choice, new-choice, "only"|"change"]
				false // forceNonCurrent
			);
		}
		CurrentMagicItems.level = newItemLvl;
	}

	// apply class level changes
	if ((/^(?!=notclass)(all|class).*$/i).test(Typeswitch)) {

		// first see if any wild shapes are in use
		var WSinUse = false;
		var prefixA = What("Template.extras.WSfront").split(",").slice(1);
		for (var p = 0; p < prefixA.length; p++) {
			for (var i = 1; i <= 4; i++) {
				var theFld = What(prefixA[p] + "Wildshape.Race." + i);
				if (!theFld || theFld.toLowerCase() === "make a selection") continue;
				if (!theFld && theFld.toLowerCase() !== "make a selection" && ParseCreature(theFld)) {
					WSinUse = true;
					p = prefixA.length;
					break;
				}
			}
		}

		// set some general variables
		var oldClassLvl = {}, newClassLvl = {}, ClassLevelUp = {}; // NODIG???

		// loop through all known classes and updates its features
		for (var aClass in classes.known) {
			var cl = CurrentClasses[aClass];
			var newSubClass = classes.known[aClass].subclass;
			var oldSubClass = classes.old[aClass] ? classes.old[aClass].subclass : "";

			// get the class level, new and old
			oldClassLvl[aClass] = classes.old[aClass] ? classes.old[aClass].classlevel : 0;
			newClassLvl[aClass] = classes.known[aClass].level;
			ClassLevelUp[aClass] = [
				newClassLvl[aClass] >= oldClassLvl[aClass], // true if going level up/same, false if going down
				Math.min(oldClassLvl[aClass], newClassLvl[aClass]), // lowest level
				Math.max(oldClassLvl[aClass], newClassLvl[aClass]) // highest level
			];

			// now skip this class if neither the level nor subclass changed
			if (newClassLvl[aClass] === oldClassLvl[aClass] && newSubClass === oldSubClass) continue;

			// update the progress dialog
			thermoTxt = thermoM("Updating " + cl.fullname + " features...", false);
			thermoM(1/5);

			// process the class header
			if (newClassLvl[aClass] == 0) { // remove the header
				var oldHeaderString = cl.fullname + ", level " + oldClassLvl[aClass] + ":";
				if (What("Class Features").indexOf("\r\r" + oldHeaderString) !== -1) oldHeaderString = "\r\r" + oldHeaderString;
				RemoveString("Class Features", oldHeaderString, false);
			} else if (oldClassLvl[aClass] == 0) { // add the header
				var newHeaderString = cl.fullname + ", level " + newClassLvl[aClass] + ":";
				if (What("Class Features")) newHeaderString = "\r\r" + newHeaderString;
				AddString("Class Features", newHeaderString, false);
			} else { // update the header
				var newHeaderString = cl.fullname + ", level " + newClassLvl[aClass] + ":";
				var oldHeaderString = !classes.old[aClass] ? "" : classes.old[aClass].fullname.RegEscape() + ".*, level \\d+:";
				ReplaceString("Class Features", newHeaderString, false, oldHeaderString, true);
			}

			// loop through the features
			var LastProp = [newHeaderString, ""], feaA = [];
			for (var key in cl.features) feaA.push(key);
			if (oldClassLvl[aClass] > newClassLvl[aClass]) feaA.reverse(); // when removing, loop through them backwards
			for (var f = 0; f < feaA.length; f++) {
				var prop = feaA[f];
				var propFea = cl.features[prop];
				var isSubClassProp = newSubClass && ClassSubList[newSubClass].features[prop] ? true : false;
				var isClassProp = ClassList[aClass].features[prop] ? true : false;

				// update the progress dialog
				thermoTxt = thermoM("Updating " + cl.fullname + ": " + propFea.name + "...", false);
				thermoM((f+1)/feaA.length);

				// if this is the first time applying the features after changing subclass, things might need to be forced if the class was previously at a level that a subclass was already warranted
				var forceProp = isSubClassProp && newSubClass != oldSubClass && propFea.minlevel <= oldClassLvl[aClass] && propFea.minlevel <= newClassLvl[aClass];

				// apply the common attributes of the feature
				Fea = ApplyFeatureAttributes(
					"class", // type
					[aClass, prop], // fObjName [aParent, fObjName]
					[oldClassLvl[aClass], newClassLvl[aClass], forceProp], // lvlA [old-level, new-level, force-apply]
					false, // choiceA [old-choice, new-choice, "only"|"change"]
					false // forceNonCurrent
				);

				// add/remove/update the feature text on the second page
				var FeaOldString = ParseClassFeature(aClass, prop, oldClassLvl[aClass], forceProp, Fea.ChoiceOld, forceProp ? false : Fea);
				Fea.extFirst = true; // signal that we need the full first line for FeaNewString
				var FeaNewString = ParseClassFeature(aClass, prop, newClassLvl[aClass], false, Fea.Choice, Fea);
				// see what type of change we have to do
				var textAction = Fea.CheckLVL && !Fea.AddFea ? "remove" : // level dropped below minlevel
					Fea.CheckLVL && Fea.AddFea && (!forceProp || (forceProp && !isClassProp)) ? "insert" : // level rose above minlevel and there is nothing to replace
					forceProp || (Fea.AddFea && Fea.changed && Fea.Descr !== Fea.DescrOld) ? "replace" : // forcing the new version or update the whole text after a description change
					Fea.AddFea && Fea.changed && Fea.Descr === Fea.DescrOld ? "first" : // update just header after a usages/recovery/additional change
					false;
				// do the text change, if any
				if (textAction) applyClassFeatureText(textAction, ["Class Features"], FeaOldString, FeaNewString, LastProp);

				// keep track of the last property's text
				LastProp = propFea.minlevel <= ClassLevelUp[aClass][2] ? FeaNewString : LastProp;

				// see if this is a wild shape feature
				if (prop.indexOf("wild shape") !== -1 && Fea.changed) WSinUse = [newClassLvl[aClass], Fea.Use, Fea.Recov, Fea.Add];

				/* loop through the feature's selected extra options, but only:
					- during import to set the feature for the first time (!IsNotImport && Fea.AddFea)
					- if removing the feature (Fea.CheckLVL && !Fea.AddFea)
					- if level-dependent things might have changed for existing extrachoices (!Fea.CheckLVL && Fea.AddFea)
				*/
				if ((!IsNotImport && propFea.extrachoices && Fea.AddFea) || (IsNotImport && Fea.CheckLVL !== Fea.AddFea)) {
					var xtrSel = GetFeatureChoice("classes", aClass, prop, true);
					for (var x = 0; x < xtrSel.length; x++) {
						var xtrProp = xtrSel[x];
						if (!propFea[xtrProp] || (!IsNotImport && propFea.extrachoices.join("##").toLowerCase().indexOf(xtrProp) == -1)) continue; // skip this feature if not found OR this is an import event and the feature is not in the extrachoices array
						// apply the common attributes of the feature extra choice
						var xtrFea = ApplyFeatureAttributes(
							"class", // type
							[aClass, prop], // fObjName [aParent, fObjName]
							[oldClassLvl[aClass], newClassLvl[aClass], false], // lvlA [old-level, new-level, force-apply]
							Fea.AddFea ? ["", xtrProp, "only"] : [xtrProp, "", "only"], // choiceA [old-choice, new-choice, "only"|"change"]
							false // forceNonCurrent
						);
						// add/remove/update the feature text on the third/second page
						var xtrFeaOldString = ParseClassFeatureExtra(aClass, prop, xtrProp, xtrFea, true);
						var xtrFeaNewString = ParseClassFeatureExtra(aClass, prop, xtrProp, xtrFea, false);
						// see what type of change we have to do
						var xtrTextAction = Fea.CheckLVL && !Fea.AddFea ? "remove" : // level dropped below minlevel
							xtrFea.AddFea && xtrFea.changed && xtrFea.Descr !== xtrFea.DescrOld ? "replace" : // update the whole text after a description change
							xtrFea.AddFea && xtrFea.changed && xtrFea.Descr === xtrFea.DescrOld ? "first" : // update just header after a usages/recovery/additional change
							false;
						// do the text change, if any
						if (IsNotImport && xtrTextAction) {
							applyClassFeatureText(xtrTextAction, ["Extra.Notes", "Class Features"], xtrFeaOldString, xtrFeaNewString, false);
						} else if (propFea.extrachoices && !IsNotImport) {
							AddString("Extra.Notes", xtrFeaNewString[1].replace(/^(\r|\n)*/, ''), true);
						}
					}
				}
			}
		}

		// (re-)apply and re-calculate all the wild shapes as something might have changed after going level up
		if (WSinUse) WildshapeUpdate(WSinUse != true ? WSinUse : false);
	}

	thermoM(thermoTxt, true); // Stop progress bar
};

//Make menu for 'choose class feature' button and parse it to Menus.classfeatures
function MakeClassMenu() {
	var gatherVars, hasEldritchBlast;
	var testPrereqs = function(toEval, objNm, feaNm) {
		if (!gatherVars) {
			gatherVars = gatherPrereqevalVars();
			hasEldritchBlast = gatherVars.hasEldritchBlast;
		}
		var theRe = true;
		try {
			if (typeof toEval == 'string') {
				theRe = eval(toEval);
			} else if (typeof toEval == 'function') {
				theRe = toEval(gatherVars);
			}
		} catch (error) {
			var eText = "The prerequisite check code (prereqeval) for '" + objNm + "' of the '" + feaNm + "' feature produced an error! Please contact the author of the feature to correct this issue:\n " + error + "\n ";
			for (var e in error) eText += e + ": " + error[e] + ";\n ";
			console.println(eText);
			console.show();
		}
		return theRe;
	}

	var menuLVL3 = function (menu, name, array, classNm, featureNm, extrareturn, feaObj, curSel) {
		var temp = [];
		for (var i = 0; i < array.length; i++) {
			var feaObjNm = array[i].toLowerCase();
			var feaObjA = feaObj[feaObjNm];
			if (!feaObjA) { // object doesn't exist, so warn user
				console.println("The object corresponding to '" + array[i] + "' doesn't exist in the '" + featureNm + "' feature. This is a discrepancy between the '" + extrareturn + "choices' array and the names of the objects. Note that the object name needs to be exactly '" + array[i].toLowerCase() + "' (identical, but fully lower case).");
				console.show();
				continue;
			};
			if (testSource("", feaObjA)) continue; // object's source is excluded, so skip it

			// is this feature selected? Than mark it!
			var isActive = extrareturn ? curSel.indexOf(feaObjNm) !== -1 : curSel == feaObjNm;
			var removeStop = !isActive ? "add" : extrareturn ? "remove" : "stop";

			// now see if we should disable this because of prerequisites
			var isEnabled = feaObjA.prereqeval && !ignorePrereqs && !isActive ? testPrereqs(feaObjA.prereqeval, feaObjNm, featureNm) : true;

			// now make the menu entry
			temp.push({
				cName : array[i] + stringSource(feaObjA, "first,abbr", "\t   [", "]"),
				cReturn : classNm + "#" + featureNm + "#" + array[i] + "#" + extrareturn + "#" + removeStop,
				bMarked : isActive,
				bEnabled : isEnabled
			});
		};
		menu.oSubMenu.push({
			cName : name,
			oSubMenu : temp
		});
	};

	var ClassMenu = [], toTest, toChooseNr;

	for (var aClass in classes.known) {
		var clLvl = classes.known[aClass].level;
		var cl = CurrentClasses[aClass];
		var tempItem = {
			cName : cl.fullname,
			oSubMenu : []
		};
		for (var prop in cl.features) {
			var propFea = cl.features[prop];
			if (propFea.choices && !propFea.choicesNotInMenu && propFea.minlevel <= clLvl) {
				toTest = GetFeatureChoice("classes", aClass, prop, false);
				propFea.choices.sort();
				menuLVL3(tempItem, propFea.name, propFea.choices, aClass, prop, "", propFea, toTest);
			};
			if (propFea.extrachoices && !propFea.choicesNotInMenu && propFea.minlevel <= clLvl) {
				toTest = GetFeatureChoice("classes", aClass, prop, true);
				propFea.extrachoices.sort();
				toChooseNr = " (" + "selected " + toTest.length + (propFea.extraTimes ? " of " + propFea.extraTimes[Math.min(propFea.extraTimes.length, clLvl) - 1] : "") + ")";
				menuLVL3(tempItem, propFea.extraname + toChooseNr, propFea.extrachoices, aClass, prop, "extra", propFea, toTest);
			};
		};
		if (tempItem.oSubMenu.length > 0) {
			ClassMenu.push(tempItem);
		};
	};


	// if no options were found, set the menu to something else and make the return false
	if (ClassMenu.length === 0) {
		Menus.classfeatures = [{
			cName : "No class features detected that require a choice",
			cReturn : "nothing",
			bEnabled : false
		}]
		return false;
	} else {
		Menus.classfeatures = ClassMenu;
		return true;
	}
};

//call the Class Features menu and do something with the results
function ClassFeatureOptions(Input, AddRemove) {
	// first see if we have something to do
	var MenuSelection = Input ? Input : getMenu("classfeatures");
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[4] == "stop") return;

	// initialize some variables
	var triggerIsMenu = event.target && event.target.name && event.target.name == "Class Features Menu";
	var addIt = AddRemove ? AddRemove.toLowerCase() == "add" : MenuSelection[4] ? MenuSelection[4] == "add" : true;
	var aClass = MenuSelection[0];
	var prop = MenuSelection[1];
	var choice = MenuSelection[2];
	var extra = !!MenuSelection[3];
	var propFea = CurrentClasses[aClass] ? CurrentClasses[aClass].features[prop] : false;
	var propFeaCs = propFea ? propFea[choice] : false;
	if (!propFea || !propFeaCs) return; // no objects to process, so go back

	// Start progress bar and stop calculations
	var thermoTxt = thermoM((!extra ? "Applying " : addIt ? "Adding " : "Removing ") + propFeaCs.name + "...");
	thermoM(1/5); //increment the progress dialog's progress
	calcStop();

	var clLvl = classes.known[aClass].level;
	var clLvlOld = !triggerIsMenu && Input && classes.old[aClass] ? classes.old[aClass].classlevel : clLvl;

	if (extra) { // an extra choice for the third page

		// if removing, first check if it actually exists
		if (!addIt && GetFeatureChoice("classes", aClass, prop, true).indexOf(choice) == -1) {
			thermoM(thermoTxt, true); // Stop progress bar
			return;
		};

		// apply the common attributes of the feature
		var Fea = ApplyFeatureAttributes(
			"class", // type
			[aClass, prop], // fObjName [aParent, fObjName]
			addIt ? [0, clLvl, false] : [clLvlOld, 0, false], // lvlA [old-level, new-level, force-apply]
			addIt ? ["", choice, "only"] : [choice, "", "only"], // choiceA [old-choice, new-choice, "only"|"change"]
			false // forceNonCurrent
		);

		thermoM(3/5); //increment the progress dialog's progress

		// do something with the text of the feature
		var feaString = ParseClassFeatureExtra(aClass, prop, choice, Fea, !addIt);

		if (addIt) { // add the string to the third page
			AddString("Extra.Notes", feaString[1].replace(/^(\r|\n)*/, ''), true);
			show3rdPageNotes(); // for a Colourful sheet, show the notes section on the third page
			var changeMsg = "The " + propFea.extraname + ' "' + propFeaCs.name + '" has been added to the Notes section on the third page' + (!typePF ? ", while the Rules section on the third page has been hidden" : "") + ". They wouldn't fit in the Class Features section if the class is taken to level 20.";
			CurrentUpdates.types.push("notes");
			if (!CurrentUpdates.notesChanges) {
				CurrentUpdates.notesChanges = [changeMsg];
			} else {
				CurrentUpdates.notesChanges.push(changeMsg);
			}
		} else { // remove the string from the third (or second) page
			applyClassFeatureText("remove", ["Extra.Notes", "Class Features"], feaString, "", false);
		}
	} else if (addIt) { // a choice to replace the feature on the second page
		var choiceOld = GetFeatureChoice("classes", aClass, prop, false);
		// apply the common attributes of the feature
		var Fea = ApplyFeatureAttributes(
			"class", // type
			[aClass, prop], // fObjName [aParent, fObjName]
			[clLvlOld, clLvl, true], // lvlA [old-level, new-level, force-apply]
			[choiceOld, choice, "change"], // choiceA [old-choice, new-choice, "only"|"change"]
			false // forceNonCurrent
		);
		thermoM(3/5); //increment the progress dialog's progress
		// do something with the text of the feature
		var feaString = ParseClassFeature(aClass, prop, clLvl, false, choice, Fea);
		var feaStringOld = ParseClassFeature(aClass, prop, clLvlOld, false, choiceOld, Fea, true);
		applyClassFeatureText("replace", ["Class Features"], feaStringOld, feaString, false);
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

// Set the choice for other class features dependent on the choice of this class feature
/* choiceDependencies : [{
	feature : "subclassfeature6",
	choiceAttribute : true // OPTIONAL //
}] */
function processClassFeatureChoiceDependencies(lvlA, aClass, aFeature, fChoice) {
	var lvlOld = lvlA[0], lvlNew = lvlA[1];
	var pObj = CurrentClasses[aClass].features;
	var fObj = pObj[aFeature];
	var theDep = fObj.choiceDependencies;
	if (!isArray(theDep)) theDep = [theDep];
	for (var i = 0; i < theDep.length; i++) {
		var aDep = theDep[i];
		var tObj = pObj[aDep.feature];
		if (!tObj || lvlNew < tObj.minlevel) continue;
		var newChoice = aDep.choiceAttribute && fObj[fChoice].dependentChoices ? fObj[fChoice].dependentChoices : fChoice;
		var curChoice = GetFeatureChoice('class', aClass, aDep.feature);
		if (!tObj[newChoice] || newChoice == curChoice) continue;
		if (lvlOld >= tObj.minlevel) {
			// the feature is already present on the sheet, so parse it through ClassFeatureOptions
			ClassFeatureOptions([aClass, aDep.feature, newChoice]);
		} else {
			// the feature will be added during this same UpdateLevelFeatures call, so just set it to be remembered
			SetFeatureChoice("class", aClass, aDep.feature, newChoice);
		}
	}
}

// A way for a class feature to add an extra choice (from its own object) at a specific level
/* autoSelectExtrachoices : [{
	extrachoice : "flurry of blows",
	minlevel : 5 // OPTIONAL //
}] */
function processClassFeatureExtraChoiceDependencies(lvlA, aClass, aFeature, fObj) {
	var lvlH = Math.max(lvlA[0], lvlA[1]), lvlL = Math.min(lvlA[0], lvlA[1]);
	var theDep = fObj.autoSelectExtrachoices;
	if (!isArray(theDep)) theDep = [theDep];
	var saveExtraName = fObj.extraname;
	for (var i = 0; i < theDep.length; i++) {
		var aDep = theDep[i];
		var minLvl = aDep.minlevel ? aDep.minlevel : fObj.minlevel;
		// stop if nothing found or there was no level change that affected this feature
		if (!aDep.extrachoice || !fObj[aDep.extrachoice] || !(lvlH >= minLvl && lvlL < minLvl)) continue;
		fObj.extraname = aDep.extraname ? aDep.extraname : saveExtraName;
		// set or remove the class feature, depending on its level
		ClassFeatureOptions(
			[aClass, aFeature, aDep.extrachoice, 'extra'],
			lvlA[1] < minLvl ? 'remove' : false
		);
	}
	fObj.extraname = saveExtraName;
}

// The print feature button
function PrintButton() {
	var thePageOptions = [
		"CSfront",
		"CSback",
		"ASfront",
		"ASoverflow",
		"ASbackgr",
		"AScomp",
		"ASnotes",
		"WSfront",
		"SSfront",
		"ALlog"
	];
	if (typePF) {
		thePageOptions.push("PRsheet");
		SetPrintPages_Dialog.bshowPR = true;
	}

	var PrintFld = What("Print Remember").split("!#TheListSeparator#!");
	var PageArray = PrintFld[1] !== "0" ? PrintFld[1].split(",") : null;

	for (var x = 0; x < thePageOptions.length; x++) {
		//set the check marks in the dialog, depending on previous settings
		SetPrintPages_Dialog["b" + thePageOptions[x]] = PageArray.indexOf(thePageOptions[x]) !== -1;

		//set whether or not the fields are editable in the dialog (not editable if page is hidden)
		var isVisible = isTemplVis(thePageOptions[x]);
		SetPrintPages_Dialog["a" + thePageOptions[x]] = isVisible;
	}

	if (PrintFld[0] === "true") {
		SetPrintPages_Dialog["bDupl"] = true;
	} else {
		SetPrintPages_Dialog["bDupl"] = false;
	}

	var theDialog = app.execDialog(SetPrintPages_Dialog);

	var Proceed = false;
	switch (theDialog) {
	 case "ok":
		Proceed = true;
	 case "save":
		var ResultsArray = [0];
		for (var p = 0; p < thePageOptions.length; p++) {
			if (SetPrintPages_Dialog["b" + thePageOptions[p]]) {
				ResultsArray.push(thePageOptions[p]);
			}
		}
		Value("Print Remember", SetPrintPages_Dialog["bDupl"] + "!#TheListSeparator#!" + ResultsArray.toString());
		if (Proceed) {
			PrintTheSheet();
		};
	 case "cancel":
		if (SetPrintPages_Dialog.bHide) {
			HideShowEverything(false);
			SetPrintPages_Dialog.bHide = false;
		}
	}
};

//call the print dialog
function PrintTheSheet() {
	var PrintFld = What("Print Remember").split("!#TheListSeparator#!");
	var PageArray = PrintFld[1] !== "0" ? PrintFld[1].split(",") : null;
	if (PageArray) {
		var PagesToPrint = [];
		for (var P = 1; P < PageArray.length; P++) {
			//in the case of the three extendable types, also go add all the extra sheets
			if (PageArray[P] === "SSfront") {
				var prefixArray = What("Template.extras.SSmore").split(",");
				prefixArray[0] = What("Template.extras.SSfront").split(",")[1];
				if (!prefixArray[0]) prefixArray.shift();
			} else if (TemplatesWithExtras.indexOf(PageArray[P]) !== -1) {
				var prefixArray = What("Template.extras." + PageArray[P]).split(",");
			} else {
				var prefixArray = [""];
			}
			for (var A = 0; A < prefixArray.length; A++) {
				var testFld = tDoc.getField(prefixArray[A] + BookMarkList[PageArray[P]]).page;
				if (isArray(testFld)) {
					for (var tF = 0; tF < testFld.length; tF++) {
						if (testFld[tF] !== -1) {
							PagesToPrint.push([testFld[tF], testFld[tF]]);
						}
					}
				} else if (testFld !== -1) {
					PagesToPrint.push([testFld, testFld]);
				}
			}
		}
	}
	var GoPrint = tDoc.getPrintParams();
	GoPrint.interactive = GoPrint.constants.interactionLevel.full;

	if (PrintFld[0] === "true") {
		GoPrint.DuplexType = GoPrint.constants.duplexTypes.DuplexFlipLongEdge;
	} else {
		GoPrint.DuplexType = GoPrint.constants.duplexTypes.Simplex;
	}
	if (PageArray) {
		GoPrint.printRange = PagesToPrint;
	};
	tDoc.print(GoPrint);
};

//Hide (true) or show (false) all the different form fields in the entire sheet
function HideShowEverything(toggle) {
	if (toggle) {
		// Start progress bar and stop calculations
		var thermoTxt = thermoM("Hiding all the fields...");
		calcStop();

		//first undo the visibility of the blue-text fields, if visible
		ToggleBlueText(false);

		if (FieldsRemember.length) HideShowEverything(false);

		var exceptionRegex = /(Sheet|Copyright)Information|(Whiteout|Title|^(?!Too).* Text)$|(Whiteout|Image|Text|Line|Display)\.|Circle|Location\.Line|Medium Armor Max Mod|Comp\.Type|Ammo(Right|Left)\.Icon|spellshead\.Box/;
		for (var F = 0; F < tDoc.numFields; F++) {
			thermoM(F/tDoc.numFields); //increment the progress dialog's progress
			var Fname = tDoc.getNthFieldName(F);
			var Ffield = tDoc.getField(Fname);
			if ((exceptionRegex).test(Fname)) continue;
			if (Ffield.page.length) {
				for (var i = 0; i < Ffield.page.length; i++) {
					var Fnamei = Fname + "." + i;
					var Ffieldi = tDoc.getField(Fnamei);
					if (Ffieldi.display !== 1) {
						FieldsRemember.push([Fnamei, Ffieldi.display]);
						Ffieldi.display = 1
					};
				};
			} else if (Ffield.display !== 1) {
				FieldsRemember.push([Fname, Ffield.display]);
				Ffield.display = 1;
			};
		};
	} else if (!toggle) {
		// Start progress bar and stop calculations
		var thermoTxt = thermoM("Restoring the visibility of all the fields...");
		calcStop();
		for (var H = 0; H < FieldsRemember.length; H++) {
			thermoM(H/FieldsRemember.length); //increment the progress dialog's progress
			tDoc.getField(FieldsRemember[H][0]).display = FieldsRemember[H][1];
		};
		FieldsRemember = [];
	};
	// Stop the progress bar and force calculations to start again because this is function is called while a dialog is displayed
	thermoM(thermoTxt, true);
	calcCont(true);
};

// Calculate the AC (field calculation)
function CalcAC() {
	// Check if the armour's AC is filled, otherwise just return nothing
	var AC = Number(What("AC Armor Bonus"));
	if (!AC) {
		event.value = "";
		return;
	}

	// Add all the other elements
	AC += Number(What("AC Shield Bonus"));
	AC += Number(What("AC Dexterity Modifier"));
	AC += EvalBonus(What("AC Magic"), true);
	AC += EvalBonus(What("AC Misc Mod 1"), true);
	AC += EvalBonus(What("AC Misc Mod 2"), true);

	// It is possible that some of the modifiers (magic / misc) should not be added if some conditions aren't met
	var theArmor = CurrentArmour.known ? ArmourList[CurrentArmour.known] : false;
	// First gather some variables that the evals can test against
	var gatherVars = {
		theArmor : theArmor ? theArmor : {},
		usingShield : What("AC Shield Bonus Description") != "",
		// wearingArmor is only true for made armor, as natural/magic doesn't have a 'type'
		wearingArmor : !theArmor ? What("AC Armor Description") != "" : !!theArmor.type,
		mediumArmor : tDoc.getField('Medium Armor').isBoxChecked(0),
		heavyArmor : tDoc.getField('Heavy Armor').isBoxChecked(0),
		shieldProf : tDoc.getField("Proficiency Shields").isBoxChecked(0),
		lightProf : tDoc.getField("Proficiency Armor Light").isBoxChecked(0),
		mediumProf : tDoc.getField("Proficiency Armor Medium").isBoxChecked(0),
		heavyProf : tDoc.getField("Proficiency Armor Heavy").isBoxChecked(0)
	}
	// Now run through those conditions and remove the ones from the total that weren't met
	for (var entry in CurrentProfs.specialarmour) {
		var aMod = CurrentProfs.specialarmour[entry];
		if (aMod.stopeval) {
			try {
				var removeMod = false;
				if (typeof aMod.stopeval == 'string') {
					removeMod = eval(aMod.stopeval);
				} else if (typeof aMod.stopeval == 'function') {
					removeMod = aMod.stopeval(gatherVars);
				}
				if (removeMod) AC -= EvalBonus(aMod.mod, true);
			} catch (error) {
				var eText = "The check if the AC bonus from '" + aMod.name + "' should be added or not produced an error! This check will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error + "\n ";
				for (var e in error) eText += e + ": " + error[e] + ";\n ";
				console.println(eText);
				console.show();
				delete aMod.stopeval;
			}
		}
	}

	event.value = AC;
};

// Make sure the magic/miscellaneous AC fields have a proper description (and don't overflow)
function formatACdescr() {
	var isMagic = event.target.name.indexOf("Magic") !== -1;
	var testLen = typePF ? 40 : 35;
	if (event.value.length > testLen) {
		event.value = "Various" + (isMagic ? " magic" : "") + " bonuses"
	}
}

function SetToManual_Button(noDialog) {
	var BackgroundFld = !!CurrentVars.manual.background;
	var ClassFld = !!CurrentVars.manual.classes;
	var FeatFld = !!CurrentVars.manual.feats;
	var ItemFld = !!CurrentVars.manual.items;
	var RaceFld = !!CurrentVars.manual.race;

	if (!noDialog) {
		//set the checkboxes in the dialog to starting position
		SetToManual_Dialog.mAtt = CurrentVars.manual.attacks;
		SetToManual_Dialog.mBac = BackgroundFld;
		SetToManual_Dialog.mCla = ClassFld;
		SetToManual_Dialog.mFea = FeatFld;
		SetToManual_Dialog.mMag = ItemFld;
		SetToManual_Dialog.mRac = RaceFld;

		//call the dialog and proceed if Apply is pressed
		if (app.execDialog(SetToManual_Dialog) != "ok") return;
	}

	//do something with the results of attacks checkbox
	if (SetToManual_Dialog.mAtt !== CurrentVars.manual.attacks) ToggleAttacks(SetToManual_Dialog.mAtt);

	//do something with the results of background checkbox
	if (SetToManual_Dialog.mBac !== BackgroundFld) {
		if (SetToManual_Dialog.mBac) {
			CurrentVars.manual.background = What("Background");
			Hide("Background Menu");
		} else {
			FindBackground(CurrentVars.manual.background);
			CurrentVars.manual.background = false;
			DontPrint("Background Menu");
			ApplyBackground(What("Background"));
		}
	}

	//do something with the results of class checkbox
	if (SetToManual_Dialog.mCla !== ClassFld) {
		if (SetToManual_Dialog.mCla) {
			var classString = What("Class and Levels");
			if (classes.parsed.length == 1 && classString.indexOf(classes.totallevel) == -1) classString += classes.totallevel;
			CurrentVars.manual.classes = What("Class and Levels");
			Hide("Class Features Menu");
		} else {
			var newClassValue = What("Class and Levels");
			// restore the old class value so that we have a working classes.old
			var oldClassValue = CurrentVars.manual.classes;
			tDoc.getField("Class and Levels").remVal = oldClassValue;
			Value("Class and Levels", oldClassValue);
			// now set class processing back to automatic and apply the new value
			CurrentVars.manual.classes = false;
			Value("Class and Levels", newClassValue);
		}
	}

	//do something with the results of feat checkbox
	if (SetToManual_Dialog.mFea !== FeatFld) {
		if (SetToManual_Dialog.mFea) {
			CurrentVars.manual.feats = [CurrentFeats.known.slice(0), CurrentFeats.level];
			// remove the auto-calculations from feat fields
			for (var i = 1; i <= FieldNumbers.feats; i++) tDoc.getField("Feat Description " + i).setAction("Calculate", "");
		} else if (CurrentVars.manual.feats) {
			// set the old known feats back and apply the current ones
			var oldKnowns = CurrentVars.manual.feats[0];
			CurrentFeats.level = CurrentVars.manual.feats[1];
			CurrentVars.manual.feats = false;
			var remIgnoreDuplicates = ignoreDuplicates;
			ignoreDuplicates = true;
			for (var i = 1; i <= FieldNumbers.feats; i++) {
				CurrentFeats.known[i - 1] = oldKnowns[i - 1];
				ApplyFeat(What("Feat Name " + i), i);
			}
			// loop through the known feats and if any are still the same as before, first delete it and then apply it again
			for (var i = 0; i < FieldNumbers.feats; i++) {
				if (oldKnowns[i] && CurrentFeats.known[i] == oldKnowns[i]) {
					Value("Feat Name " + (i+1), "");
					Value("Feat Name " + (i+1), FeatsList[oldKnowns[i]].name);
				}
			}
			ignoreDuplicates = remIgnoreDuplicates;
			// update the feat level to the current level
			UpdateLevelFeatures("feat");
		}
	}
	//do something with the results of magic item checkbox
	if (SetToManual_Dialog.mMag !== ItemFld) {
		if (SetToManual_Dialog.mMag) {
			// make an array of the attunement status of the magic items
			var attuneArray = [];
			for (var i = 0; i < CurrentMagicItems.known.length; i++) {
				var theMI = MagicItemsList[CurrentMagicItems.known[i]];
				if (!theMI || !theMI.attunement) {
					attuneArray.push(undefined);
				} else {
					attuneArray.push(tDoc.getField("Extra.Magic Item Attuned " + (i + 1)).isBoxChecked(0));
				}
			}
			CurrentVars.manual.items = [CurrentMagicItems.known.slice(0), attuneArray, CurrentMagicItems.level];
			// remove the auto-calculations from magic item fields
			for (var i = 1; i <= FieldNumbers.magicitems; i++) {
				var descFld = "Extra.Magic Item Description " + i;
				tDoc.getField(descFld).setAction("Calculate", "");
				AddTooltip(descFld, undefined, "");
			}
		} else if (CurrentVars.manual.items) {
			// set the old known magic items back and apply the current ones
			var oldKnowns = CurrentVars.manual.items[0];
			var oldAttuned = CurrentVars.manual.items[1];
			CurrentMagicItems.level = CurrentVars.manual.items[2];
			CurrentVars.manual.items = false;
			var remIgnoreDuplicates = ignoreDuplicates;
			ignoreDuplicates = true;
			for (var i = 1; i <= FieldNumbers.magicitems; i++) {
				CurrentMagicItems.known[i - 1] = oldKnowns[i - 1];
				ApplyMagicItem(What("Extra.Magic Item " + i), i);
			}
			// loop through the known magic items and if any are still the same as before, first delete it and then apply it again
			for (var i = 0; i < FieldNumbers.magicitems; i++) {
				if (oldKnowns[i] && CurrentMagicItems.known[i] == oldKnowns[i]) {
					Value("Extra.Magic Item " + (i+1), "");
					Value("Extra.Magic Item " + (i+1), MagicItemsList[oldKnowns[i]].name);
				}
			}
			ignoreDuplicates = remIgnoreDuplicates;
			// update the magic item level to the current level
			UpdateLevelFeatures("item");
		}
	}

	//do something with the results of race checkbox
	if (SetToManual_Dialog.mRac !== RaceFld) {
		if (SetToManual_Dialog.mRac) {
			CurrentVars.manual.race = [What("Race Remember"), CurrentRace.level];
			Hide("Race Features Menu");
		} else {
			FindRace(CurrentVars.manual.race[0], true);
			if (CurrentRace.known) CurrentRace.level = CurrentVars.manual.race[1];
			CurrentVars.manual.race = false;
			ApplyRace(What("Race Remember"));
			if (CurrentRace.known) UpdateLevelFeatures("race");
		}
	}

	SetStringifieds("vars");
}

//calculate how much experience points are needed for the next level (field calculation)
function CalcXPnextlvl() {
	var lvl = Number(What("Character Level"));
	event.value = lvl && !isNaN(lvl) && lvl < (ExperiencePointsList.length - 1) ? ExperiencePointsList[lvl] : "";
};

//calculate the Ability Save DC (field calculation)
function CalcAbilityDC() {
	var Nmbr = event.target.name.slice(-1);
	var SpellAbi = What("Spell DC " + Nmbr + " Mod");

	//damage added manually in the bluetext field
	var ExtraBonus = EvalBonus(What("Spell DC " + Nmbr + " Bonus"), true);

	if (SpellAbi !== "" && SpellAbi !== " " && What(SpellAbi) !== "") {
		event.value = 8 + Number(How("Proficiency Bonus")) + Number(What(SpellAbi)) + ExtraBonus;
	} else {
		event.value = "";
	}
}

//find the ability score the tool (or custom skill) is keyed off on
function UpdateTooSkill() {
	var TooSkillTxt = event.target && event.target.name == "Too Text" ? event.value.toLowerCase() : What("Too Text").toLowerCase();
	var Ability = "Too";
	for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
		if (TooSkillTxt.indexOf("(" + AbilityScores.abbreviations[i].toLowerCase() + ")") !== -1) {
			Ability = AbilityScores.abbreviations[i];
			break;
		}
	}
	SkillsList.abilityScores[SkillsList.abbreviations.indexOf("Too")] = Ability;
	SkillsList.abilityScoresByAS[SkillsList.abbreviations.indexOf("Too")] = Ability;
}

// Create the span objects for emulating smallcaps
// non-letter characters preceded by a ^ are always made big
// non-letter characters preceded by a _ are always made small
function createSmallCaps(input, fontSize, extraObj) {
	if (typePF) return input;
	var fontSizeLookup = {
		6 : 4.2,
		7: 4.9,
		8: 5.6
	};
	var fontSizeSmall = fontSizeLookup[fontSize] ? fontSizeLookup[fontSize] : fontSize * 0.7;
	// Set some things to be allways big
	var txt = input.replace(/([^\^])(:)/, "$1^$2");
	var spans = [];
	var nBig = "";
	var nSmall = "";
	var sp = "";
	var updateTxts = function(toBig, tChar) {
		if (toBig && nSmall) {
			var spObj = {
				text : nSmall.toUpperCase(),
				textSize : fontSizeSmall
			};
			if (extraObj) MergeRecursive(spObj, extraObj);
			spans.push(spObj);
			nSmall = "";
		} else if (nBig) {
			var spObj = {
				text : nBig.toUpperCase(),
				textSize : fontSize
			};
			if (extraObj) MergeRecursive(spObj, extraObj);
			spans.push(spObj);
			nBig = "";
		}
		if (toBig) {
			nBig += tChar;
		} else {
			nSmall += tChar;
		}
		sp = "";
	}
	for (var t = 0; t < txt.length; t++) {
		var aTxt = txt[t];
		if (aTxt == " ") {
			sp += " ";
		} else if (aTxt == "^" || aTxt == "_") {
			updateTxts(aTxt == "^", sp+txt[t+1]);
			t++;
		} else {
			updateTxts(!isNaN(aTxt) || ((/\w/).test(aTxt) && aTxt == aTxt.toUpperCase()), sp+aTxt);
		};
	}
	if (nSmall) updateTxts(true, "");
	if (nBig) updateTxts(false, "");
	return spans;
}
function SetRichTextFields(onlyAttackTitles, onlySkills) {
	var AScompA = What("Template.extras.AScomp").split(",");

	//set the skills
	var alphaB = Who("Text.SkillsNames") === "alphabeta";
	var skillTXT = [];
	var PFcolor = ["RGB", 0.658, 0.658, 0.654];
	for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
		var sNm = alphaB ? SkillsList.names[s] : SkillsList.namesByAS[s];
		var sAS = alphaB ? SkillsList.abilityScores[s] : SkillsList.abilityScoresByAS[s];
		if (typePF) {
			skillTXT.push({text : sNm + " ", textSize: 7});
			skillTXT.push({text : "(" + sAS + ")\n", textSize: 7, textColor: PFcolor});
			skillTXT.push({text : "\n", textSize: 6});
		} else {
			skillTXT.push({text : sNm + " ", textSize: 9});
			skillTXT.push({text : "(" + sAS.toUpperCase() + ")\n", textSize: 7});
			skillTXT.push({text : "\n", textSize: 5});
		}
	}
	var sLoop = typePF ? AScompA : [""];
	for (var A = 0; A < sLoop.length; A++) {
		tDoc.getField(sLoop[A] + "Text.SkillsNames").richValue = skillTXT;
	}
	if (typePF || onlySkills) return; //don't do this function in the Printer-Friendly version

	rtSpans = createSmallCaps("Prof  Ability", 6);
	for (var A = 0; A < AScompA.length; A++) {
		tDoc.getField(AScompA[A] + "Attack.Titles").richValue = rtSpans;
	}
	if (onlyAttackTitles) return; // don't do the rest of the function

	tDoc.getField("Attuned Magic Items Title").richValue = createSmallCaps("Attuned Magical Items", 7).concat(createSmallCaps(" ^(max ^3^)", 6));

	rtSpans = createSmallCaps("Loc", 7, {alignment : "center"});
	tDoc.getField("Adventuring Gear Location.Title").richValue = rtSpans;
	tDoc.getField("Extra.Gear Location.Title").richValue = rtSpans;

	// the weapon and armor proficiency names
	var themeColor = ColorList[What("Color.Theme")].RGB;
	tDoc.getField("Text.Armor Proficiencies").richValue = createSmallCaps("Armor:", 8, {textColor : themeColor});
	tDoc.getField("Text.Weapon Proficiencies").richValue = createSmallCaps("Weapons:", 8, {textColor : themeColor});

	// the equipment table headers
	var LbKg = What("Unit System") === "imperial";
	rtSpans = createSmallCaps(What("Unit System") === "imperial" ? "LBs" : "Kg", 7, {alignment : "center"});
	tDoc.getField("Display.Weighttxt.LbKg").richValue = rtSpans;
	tDoc.getField("Display.Weighttxt.LbKgPage3").richValue = rtSpans;
	for (var A = 0; A < AScompA.length; A++) {
		tDoc.getField(AScompA[A] + "Comp.eqp.Display.Weighttxt").richValue = rtSpans;
	}
}

//make all the fields, with some exceptions, read-only (toggle = true) or editable (toggle = false)

// Make most fields read-only for use with Adobe Acrobat for Mobile Devices
// toggle = true for making it mobile ready or toggle = false for the other way around
// If no toggle is defined, do the opposite of the current state
function MakeMobileReady(toggle) {
	if (!CurrentVars.mobileset) { // if the variable is not defined yet, define it now
		CurrentVars.mobileset = {
			active : false,
			readonly : [],
			hidden : []
		}
	}
	if (toggle !== undefined && ((CurrentVars.mobileset.active && toggle) || (!CurrentVars.mobileset.active && !toggle))) return;

	var nowWhat = !CurrentVars.mobileset.active; // Toggle the current state

	// Start progress bar and stop calculations
	var thermoTxt = thermoM(nowWhat ? "Making the sheet ready for mobile use..." : "Making all form fields editable again...");
	calcStop();

	if (nowWhat) {
		//first undo the visibility of the blue-text fields, if visible
		ToggleBlueText(false);

		CurrentVars.mobileset.readonly = [];
		CurrentVars.mobileset.hidden = [];
		var exceptionArray = [
			"Link to downloadpage",
			"Link to donation",
			"Inspiration",
			"HD1 Used",
			"HD2 Used",
			"HD3 Used",
			"AC during Rest",
			"Add Experience",
			"Saving Throw advantages / disadvantages",
			"Vision",
			"Speed",
			"Speed encumbered",
			"Platinum Pieces",
			"Gold Pieces",
			"Electrum Pieces",
			"Silver Pieces",
			"Copper Pieces",
			"Extra.Other Holdings",
			"AmmoLeftDisplay.Name",
			"AmmoLeftDisplay.Amount",
			"AmmoRightDisplay.Name",
			"AmmoRightDisplay.Amount",
			"Reaction Used This Round"
		];
		var exceptionRegex = /Comp\.Use\.HD\.Used|Comp\.Use\.HP|Cnote\.Left|Cnote\.Right|Comp\.eqp\.Notes|Comp\.img\.Notes|Notes\.Left|Notes\.Right|HP Max|HP Max Current|HP Temp|HP Current|Limited Feature Used | Adv| Dis|AmmoLeft\.|AmmoRight\.|Death Save |\.DeathSave\.|Resistance Damage Type |Adventuring Gear Row |Adventuring Gear Location\.Row |Adventuring Gear Amount |Adventuring Gear Weight |Language |Tool |Valuables|Extra\.Exhaustion Level |Extra\.Condition |Extra\.Gear Row |Extra\.Gear Location\.Row |Extra\.Gear Amount |Extra\.Gear Weight |Extra\.Notes|Background_|SpellSlots\.Checkboxes\.|SpellSlots2\.Checkboxes\./;
		var tooMuchExceptionRegex = /AC Stealth Disadvantage|button|Attack\.\d+\.Weapon$/i;
		var totLen = tDoc.numFields;
		for (var F = 0; F < totLen; F++) {
			var Fname = tDoc.getNthFieldName(F);
			if (!Fname) continue;
			var Ffield = tDoc.getField(Fname);

			// Check if field is not in one of the exceptionlists, but continue if it is in the tooMuchExceptionRegex
			var isException = !tooMuchExceptionRegex.test(Fname) && (exceptionArray.indexOf(Fname) !== -1 || (/^(Bonus |Re)?action \d+/i).test(Fname) || exceptionRegex.test(Fname));
			if (CurrentVars.manual.attacks && !isException) isException = (/Attack\./).test(Fname);
			if (CurrentVars.manual.feats && !isException) isException = (/^(?!.*Button)Feat .+\d+$/).test(Fname);
			if (CurrentVars.manual.items && !isException) isException = (/^(?!.*Button)Extra\.Magic Item .*\d+$/).test(Fname);
			if (isException) continue;

			//add fields that are visible and not read-only to array and make them read-only
			if (Ffield.display === display.visible && Ffield.readonly === false) {
				CurrentVars.mobileset.readonly.push(Fname);
				Ffield.readonly = true;
			}
			//add fields that are visible but non-printable to an array and make them hidden
			if (Ffield.display === display.noPrint) {
				CurrentVars.mobileset.hidden.push(Fname);
				Hide(Fname);
			}

			thermoM(F/totLen); // Increment the progress bar
		};

		// We also have to set all the spell sheet checkboxes back to readable, if they are visible
		var SSfrontA = What("Template.extras.SSfront").split(",");
		var SSmoreA = What("Template.extras.SSmore").split(",");
		SSmoreA[0] = SSfrontA[1];
		if (!SSmoreA[0]) SSmoreA.shift();
		for (var SS = 0; SS < SSmoreA.length; SS++) {
			var maxLine = FieldNumbers.spells[SSfrontA[1] && SSmoreA[SS] === SSfrontA[1] ? 0 : 1];
			for (var S = 0; S < maxLine; S++) {
				var SSbox = tDoc.getField(SSmoreA[SS] + "spells.checkbox." + S);
				if (SSbox.display === display.visible) SSbox.readonly = false;
			}
		}



		// Hide the D20 warning in the corner so that it won't interfere with the bug in Acrobat Reader for iOS/Android
		tDoc.getField("d20warning").rect = [0,0,0,0];
	} else {
		var totLen = CurrentVars.mobileset.readonly.length + CurrentVars.mobileset.hidden.length + 1;
		for (var RO = 0; RO < CurrentVars.mobileset.readonly.length; RO++) {
			Editable(CurrentVars.mobileset.readonly[RO]);
			thermoM(RO/totLen); // Increment the progress bar
		}
		var strtLen = CurrentVars.mobileset.readonly.length;
		for (var DP = 0; DP < CurrentVars.mobileset.hidden.length; DP++) {
			DontPrint(CurrentVars.mobileset.hidden[DP]);
			thermoM((DP+strtLen)/totLen); // Increment the progress bar
		}
		CurrentVars.mobileset.readonly = [];
		CurrentVars.mobileset.hidden = [];
	}

	CurrentVars.mobileset.active = nowWhat;
	SetStringifieds("vars"); // Save the settings to a field
	thermoM(thermoTxt, true); // Stop progress bar
}

//Calculate the weight of a column of items in the equipment section [field calculation]
function CalcWeightSubtotal() {
	var type = (/extra.*/i).test(event.target.name) ? "Extra.Gear " : ((/Adventuring.*/i).test(event.target.name) ? "Adventuring Gear " : event.target.name.substring(0, event.target.name.indexOf("Comp.") + 14));
	var column = event.target.name.slice(-4) === "Left" ? "Left" : (event.target.name.slice(-5) === "Right" ? "Right" : "Middle");
	var allGear = type === "Extra.Gear " ? FieldNumbers.extragear : (type === "Adventuring Gear " ? FieldNumbers.gear : FieldNumbers.compgear);
	var division = typePF && type === "Adventuring Gear " ? 3 : 2;
	var divisionHalf = typePF && type === "Adventuring Gear " ? 1.5 : 2;
	var total = column === "Right" ? allGear : Math.round(column === "Left" ? allGear / division : allGear / divisionHalf);
	var start = column === "Left" ? 1 : Math.round(column === "Right" ? allGear / divisionHalf : allGear / division) + 1;

	if (column === "Middle" && event.target.name.indexOf("Middle") === -1) {
		column = "All";
		start = 1;
		total = allGear;
	}

	var totalweight = 0;
	for (var i = start; i <= total; i++) {
		var amount = What(type + "Amount " + i);
		var weight = What(type + "Weight " + i);
		if (amount && isNaN(amount) && amount.indexOf(",") !== -1) {
			amount = parseFloat(amount.replace(",", "."));
		}
		if (weight && isNaN(weight) && weight.indexOf(",") !== -1) {
			weight = parseFloat(weight.replace(",", "."));
		}

		if (weight) {
			if (amount === "" || isNaN(amount)) {
				totalweight += weight;
			} else {
				totalweight += amount * weight;
			}
		}
	}
	event.value = totalweight === 0 ? "" : totalweight;
}

//Calculate the total weight carried, based on the value of the remember fields (field calculation)
function CalcWeightCarried(manualTrigger) {
	if (!CurrentVars.weight) {
		CurrentVars.weight = ["cCoi", "cP2L", "cP2R"];
		if (typePF) CurrentVars.weight.push("cP2M");
		SetStringifieds("vars");
	}

	var coinMod = What("Unit System") === "imperial" ? 50 : 100;
	var weightTypes = {
		cArm : "AC Armor Weight",
		cShi : "AC Shield Weight",
		cWea : Array.apply(null, Array(FieldNumbers.attacks)).map(function (n, idx) {
			return "BlueText.Attack." + (idx+1) + ".Weight";
		}),
		cAmL : "AmmoLeftDisplay.Weight",
		cAmR : "AmmoRightDisplay.Weight",
		cCoi : ["Platinum Pieces", "Gold Pieces", "Electrum Pieces", "Silver Pieces", "Copper Pieces"],
		cP2L : "Adventuring Gear Weight Subtotal Left",
		cP2M : "Adventuring Gear Weight Subtotal Middle",
		cP2R : "Adventuring Gear Weight Subtotal Right",
		cP3L : "Extra.Gear Weight Subtotal Left",
		cP3R : "Extra.Gear Weight Subtotal Right",
		cMaI : Array.apply(null, Array(FieldNumbers.magicitems)).map(function (n, idx) {
			return "Extra.Magic Item Weight " + (idx+1);
		})
	}
	var totalWeight = 0;
	for (var i = 0; i < CurrentVars.weight.length; i++) {
		var useFld = weightTypes[CurrentVars.weight[i]];
		if (!useFld) continue;
		if (isArray(useFld)) {
			var aWeight = 0;
			for (var j = 0; j < useFld.length; j++) {
				aWeight += Number(What(useFld[j]).replace(/,/, "."));
			}
		} else {
			var aWeight = Number(What(useFld).replace(/,/, "."));
		}
		if (CurrentVars.weight[i] == "cCoi") {
			aWeight = Math.floor(aWeight / coinMod * 10) / 10;
		} else if (CurrentVars.weight[i] == "cAmL") {
			aWeight *= Number(What("AmmoLeftDisplay.Amount"));
		} else if (CurrentVars.weight[i] == "cAmR") {
			aWeight *= Number(What("AmmoRightDisplay.Amount"));
		}
		if (!isNaN(aWeight)) totalWeight += aWeight;
	}
	if (manualTrigger) {
		Value("Weight Carried", totalWeight === 0 ? "" : totalWeight);
	} else {
		event.value = totalWeight === 0 ? "" : totalWeight;
	}
}

//call this to choose which weights to add to the "Total Carried", and which weights not to add
function WeightToCalc_Button() {
	//The dialog for setting what things are added to the total weight carried on page 2
	var explTxt = 'Note that you can change the weight of the armor, shield, weapons, and ammunition on the 1st page and the magic items on the 3rd page by using the "Modifier" fields that appear when you press the "Mods" button or the "Modifiers" bookmark.\nFor the ammunition, only the listed "total" is counted as that already includes the unchecked ammo icons.';
	var weightOptions = ["cArm", "cShi", "cWea", "cAmL", "cAmR", "cCoi", "cP2L", "cP2R", "cP3L", "cP3R", "cMaI"];
	if (typePF) weightOptions.push("cP2M");
	var WeightToCalc_Dialog = {
		UseEnc : true,

		//when starting the dialog
		initialize : function (dialog) {
			var toLoad = {
				"rEnc" : this.UseEnc,
				"rCar" : !this.UseEnc
			};
			for (var i = 0; i < weightOptions.length; i++) {
				toLoad[weightOptions[i]] = CurrentVars.weight.indexOf(weightOptions[i]) !== -1
			}
			dialog.load(toLoad);
		},

		//when pressing the ok button
		commit : function (dialog) {
			var oResult = dialog.store();
			CurrentVars.weight = [];
			for (var i = 0; i < weightOptions.length; i++) {
				if (oResult[weightOptions[i]]) CurrentVars.weight.push(weightOptions[i]);
			}
			this.UseEnc = oResult["rEnc"];
		},

		description : {
			name : "Choose the things you want to count to Carried Weight",
			elements : [{
				type : "view",
				elements : [{
					type : "view",
					elements : [{
						type : "view",
						align_children : "align_row",
						elements : [{
							type : "image",
							item_id : "img1",
							alignment : "align_bottom",
							width : 20,
							height : 20
						}, {
							type : "static_text",
							item_id : "head",
							alignment : "align_fill",
							font : "heading",
							bold : true,
							height : 21,
							name : "What to count towards the Carried Weight on the second page?"
						}]
					}, {
						type : "cluster",
						align_children : "align_distribute",
						elements : [{
							type : "view",
							align_children : "align_left",
							elements : [{
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cArm",
									name : "Armor",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tArm",
									name : (typePF ? '"Armor' : '"Defense') + '" section on the 1st page.'
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cShi",
									name : "Shield",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tShi",
									name : (typePF ? '"Armor' : '"Defense') + '" section on the 1st page.'
								} ]
							}, {
								type : "view",
								align_children : "align_row",
								char_height : 2,
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cWea",
									name : "Weapons",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tWea",
									name : '"Attacks" section on the 1st page.'
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cAmL",
									name : "Ammunition on the left",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tAmL",
									name : '"Attacks" section on the 1st page.'
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cAmR",
									name : "Ammunition on the right",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tAmR",
									name : '"Attacks" section on the 1st page.'
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cCoi",
									name : "Coins",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tCoi",
									name : '"Equipment" section on the 2nd page (1 lb per 50).'
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP2L",
									name : "Left column equipment",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tP2L",
									name : '"Equipment" section on the 2nd page.'
								} ]
							}].concat(typePF ? [{
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP2M",
									name : "Middle column equipment",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tP2M",
									name : '"Equipment" section on the 2nd page.'
								} ]
							}] : []).concat([{
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP2R",
									name : "Right column equipment",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tP2R",
									name : '"Equipment" section on the 2nd page.'
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP3L",
									name : "Left column extra equipment",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tP3L",
									name : '"Extra Equipment" section on the 3rd page.'
								} ]
							}, {
								type : "view",
								align_children : "align_row",
								char_width : 40,
								char_height : 2,
								elements : [{
									type : "check_box",
									item_id : "cP3R",
									name : "Right column extra equipment",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tP3R",
									name : '"Extra Equipment" section on the 3rd page.'
								} ]
							}, {
								type : "view",
								align_children : "align_row",
								char_width : 40,
								char_height : 2,
								elements : [{
									type : "check_box",
									item_id : "cMaI",
									name : "Magic items",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tMaI",
									name : '"Magic Items" section on the 3rd (and overflow) page.'
								} ]
							} ])
						} ]
					}, {
						type : "static_text",
						item_id : "text",
						alignment : "align_fill",
						font : "dialog",
						wrap_name : true,
						name : explTxt,
						char_width : 45
					}, {
						type : "cluster",
						align_children : "align_left",
						name : "What weight allowance to show (PHB, page 176)",
						bold : true,
						font : "heading",
						char_width : 44,
						elements : [{
							type : "radio",
							item_id : "rEnc",
							group_id : "encu",
							name : "Use the variant encumbrance rules"
						}, {
							type : "radio",
							item_id : "rCar",
							group_id : "encu",
							name : "Use the fixed carrying capacity rules"
						} ]
					}, {
						type : "gap",
						height : 8
					} ]
				}, {
					type : "ok_cancel",
					ok_name : "Apply"
				} ]
			} ]
		}
	};

	var isEnc = tDoc.getField("Weight Carrying Capacity.Field").display === display.hidden;
	WeightToCalc_Dialog.UseEnc = isEnc;

	app.execDialog(WeightToCalc_Dialog);

	if (WeightToCalc_Dialog.UseEnc !== isEnc) SetEncumbrance(WeightToCalc_Dialog.UseEnc);

	CalcWeightCarried(true); // manual trigger the field calculation for the total field
};

//set the type of encumbrance rules to use (if variant = true, use the variant rules)
function SetEncumbrance(variant) {
	var ShowHide = variant ? "Show" : "Hide";
	var HideShow = variant ? "Hide" : "Show";
	tDoc[HideShow]("Weight Carrying Capacity");
	tDoc[ShowHide]("Weight Heavily Encumbered");
};

//see if a known ammunition is in a string, and return the ammo name
function ParseAmmo(input, onlyInv) {
	var found = "";
	if (!input) return found;

	input = removeDiacritics(input).toLowerCase();
	var foundLen = 0;
	var foundDat = 0;
	var keyLen = 0;
	//scan string for all ammunition, including the alternative spellings
	for (var key in AmmoList) {
		if ((onlyInv && AmmoList[key].weight == undefined) // see if only doing equipable items
			|| testSource(key, AmmoList[key], "ammoExcl") // test if the ammo or its source isn't excluded
		) continue;

		var tempDate = sourceDate(AmmoList[key].source);

		// see if any of the alternatives match
		if (AmmoList[key].alternatives) {
			for (var z = 0; z < AmmoList[key].alternatives.length; z++) {
				var theAlt = AmmoList[key].alternatives[z];
				var doTest = typeof theAlt != "string";
				var altLen = theAlt.toString().length;

				if (altLen < foundLen || (altLen == foundLen && tempDate < foundDat) // only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source date. This differs from the regExpSearch objects
					|| (doTest ? !theAlt.test(input) : input.indexOf(theAlt) === -1) // see if string matches
				) continue;


				// we have a match, set the values
				found = key;
				foundLen = altLen;
				keyLen = doTest ? key.length : foundLen;
				foundDat = tempDate;
			}
		};

		// now see if the parent is a (better) match
		if (found == key // stop if one of the alternatives already matched
			|| key.length < foundLen || (key == foundLen && tempDate < foundDat) // only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source. This differs from the regExpSearch objects
			|| input.indexOf(key) === -1 // see if string matches
		) continue;

		// we have a match, set the values
		found = key;
		foundLen = key.length;
		keyLen = foundLen;
		foundDat = tempDate;
	}
	return onlyInv && found ? [found, keyLen] : found;
}

//Reset the visibility of all the ammo fields of a particular side (input = "Left" or "Right")
function ResetAmmo(AmmoLeftRight) {
	AmmoLeftRight = AmmoLeftRight.substring(0, 4) === "Ammo" ? AmmoLeftRight : "Ammo" + AmmoLeftRight;
	Hide(AmmoLeftRight);
	Show(AmmoLeftRight + ".Icon.Arrows");
	Show(AmmoLeftRight + ".Top");
	Show(AmmoLeftRight + ".Base");
	Value(AmmoLeftRight + "Display.MaxAmount", 20);
}

//Set the Ammo fields upon filling out the Ammo name
function ApplyAmmo(inputtxt, Fld) {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything

	calcStop();
	var LeftRight = !event.target || !event.target.name || event.target.name.substring(0, 8) === "AmmoLeft" ? "AmmoLeft" : event.target.name.substring(0, 9) === "AmmoRight" ? "AmmoRight" : "Ammo" + Fld;
	var theAmmo = ParseAmmo(inputtxt);
	var parseAsWeapon = theAmmo ? false : ParseWeapon(inputtxt);
	if (parseAsWeapon && AmmoList[parseAsWeapon]) theAmmo = parseAsWeapon;

	if (theAmmo) {
		var aList = AmmoList[theAmmo];
		Hide(LeftRight);
		var ammoIcon = AmmoIcons[aList.icon];
		if (!ammoIcon) ammoIcon = AmmoIcons.Arrows;
		Show(LeftRight + ".Icon." + aList.icon);
		for (var i = 0; i < ammoIcon.checks.length; i++) {
			Show(LeftRight + ammoIcon.checks[i]);
		}
		var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
		var theWeight = aList.weight ? RoundTo(aList.weight * massMod, 0.001, true) : 0;
		Value(LeftRight + "Display.Weight", theWeight);
		Value(LeftRight + "Display.MaxAmount", ammoIcon.display);
	} else {
		tDoc.resetForm([LeftRight + "Display.Weight"]);
		if (!inputtxt) {
			ResetAmmo(LeftRight);
			tDoc.resetForm([LeftRight + "Display.Amount"]);
		}
	}

	LoadAmmo();
}

//Add the ammunition to one of the ammo fields. Inputtxt must be a known AmmoList entry
function AddAmmo(inputtxt, amount) {
	var AmmoFlds = [ "AmmoLeftDisplay.Name", "AmmoRightDisplay.Name" ];
	var AmountFlds = [ "AmmoLeftDisplay.Amount", "AmmoRightDisplay.Amount" ];
	amount = amount && !isNaN(Number(amount)) ? Number(amount) : 0;
	for (var n = 1; n <= 2; n++) {
		for (var i = 0; i < AmmoFlds.length; i++) {
			var next = tDoc.getField(AmmoFlds[i]);
			if (n === 1 && ((RegExp(inputtxt.RegEscape(), "i")).test(next.value) || next.value.toLowerCase().indexOf(inputtxt.toLowerCase()) !== -1)) {
				if (amount) tDoc.getField(AmountFlds[i]).value += amount;
				return;
			} else if (n === 2 && next.value === "") {
				next.value = AmmoList[inputtxt] ? AmmoList[inputtxt].name : inputtxt;
				if (amount) Value(AmountFlds[i], amount);
				return;
			}
		}
	}
}

//Remove the ammunition if it exists in one of the ammo fields
function RemoveAmmo(inputtxt) {
	var AmmoFlds = [ "AmmoLeftDisplay.Name", "AmmoRightDisplay.Name" ];
	for (var i = 0; i < AmmoFlds.length; i++) {
		var next = tDoc.getField(AmmoFlds[i]);
		if (next.value.toLowerCase().indexOf(inputtxt.toLowerCase()) !== -1) {
			next.value = "";
			break;
		}
	}
}

//Set the 'quiver' to correspond with the amount of ammo
function LoadAmmo(Amount, Fld) {
	calcStop();

	var LeftRight = event.target.name.substring(0, 8) === "AmmoLeft" ? "AmmoLeft" : event.target.name.substring(0, 9) === "AmmoRight" ? "AmmoRight" : "Ammo" + Fld;
	var Units = Amount !== undefined ? Amount : Number(What(LeftRight + "Display.Amount"));
	var Counter = 0;
	var NextFld = "";
	var NextFldVis = 0;

	if (event.target.name.slice(-6) === "Amount" || event.target.name.slice(-5) === "Reset" || event.target.name.slice(-4) === "Name") {
		Value(LeftRight + "Display.SaveAmount", Units);
		Value(LeftRight + "Display.CurrentAmount", Math.min(Units, What(LeftRight + "Display.MaxAmount")));
	}

	//stop the function if Units are 0
	if (Number(Units) === 0) {
		if (event.target.name.indexOf("Display") !== -1) {
			tDoc.resetForm([LeftRight]);
		}
		return;
	}

	//go through evey ammo field and see if they are visible. If visible, update counter and check if the field should be checked (ammo unavailable), or uncheck (ammo available)
	if (tDoc.getField(LeftRight + ".Bullet.1").display === display.visible) { //only look at the bullet fields
		for (var i = 1; i <= 50; i++) {
			NextFld = LeftRight + ".Bullet." + i;
			NextFldVis = tDoc.getField(NextFld).display
			if (NextFldVis === display.visible) {
				Counter += 1;
				if (Counter <= Units) {
					Checkbox(NextFld, false);
				} else {
					Checkbox(NextFld, true);
				}
			}
		}
	} else { //look into the top/base fields
		for (var i = 1; i <= 20; i++) {
			var TopBase = i <= 10 ? ".Top." : ".Base.";
			try {
				NextFld = LeftRight + TopBase + i;
				NextFldVis = tDoc.getField(NextFld).display;
			} catch (err) {
				NextFld = LeftRight + TopBase + "Axe." + i;
				NextFldVis = tDoc.getField(NextFld).display;
			}
			if (NextFldVis === display.visible) {
				Counter += 1;
				if (Counter <= Units) {
					Checkbox(NextFld, false);
				} else {
					Checkbox(NextFld, true);
				}
			}
		}
	}
}

//set the dropdown menus for ammo
function SetAmmosdropdown(forceTooltips) {
	var tempString = "Select or type in the ammunition you want to use and all its attributes will be filled out automatically.";
	tempString += "\n\n" + toUni("Ammunition weight") + "\nThe weight of the ammo can be added to the total weight carried on the 2nd page. In order to do this you have to push the \"Weight\" button in the \"JavaScript Window\".";
	tempString += "\nYou can change the weight of the ammunition in the \"override section\" (a.k.a. the \"blue text fields\").";
	tempString += "\n\n" + toUni("Blue text fields") + "\nIn order to see these you first need to push the \"Mods\" button in the \"JavaScript Window\".";
	var theDropList = [""];

	for (ammo in AmmoList) {
		var theAmmo = AmmoList[ammo];
		if (testSource(ammo, theAmmo, "ammoExcl")) continue; // test if the weapon or its source is set to be included
		if (theDropList.indexOf(theAmmo.name) === -1) theDropList.push(theAmmo.name);
	}
	theDropList.sort();

	var listToSource = theDropList.toSource();
	if (tDoc.getField("AmmoLeftDisplay.Name").submitName === listToSource) {
		if (forceTooltips) {
			AddTooltip("AmmoLeftDisplay.Name", tempString);
			AddTooltip("AmmoRightDisplay.Name", tempString);
		}
		return; //no changes, so no reason to do this
	}
	tDoc.getField("AmmoLeftDisplay.Name").submitName = listToSource;

	var remAmmo = What("AmmoLeftDisplay.Name");
	tDoc.getField("AmmoLeftDisplay.Name").setItems(theDropList);
	Value("AmmoLeftDisplay.Name", remAmmo, tempString);

	remAmmo = What("AmmoRightDisplay.Name");
	tDoc.getField("AmmoRightDisplay.Name").setItems(theDropList);
	Value("AmmoRightDisplay.Name", remAmmo, tempString);
}

//Toggle the visibility of the secondary ability save DC. ShowHide = "show" or "hide".
function Toggle2ndAbilityDC(ShowHide) {
	var isVis2nd = isDisplay("Image.SaveDC" + (typePF ? "" : ".2")) === 0;

	if (ShowHide && (/show/i).test(ShowHide) == isVis2nd) {
		return; //stop the function, there is nothing to do
	}

	var theCaption = isVis2nd ? "Show 2nd DC" : "Hide 2nd DC";
	var HiddenVisible = isVis2nd ? "Hide" : "Show";
	var VisibleHidden = isVis2nd ? "Show" : "Hide";
	var HiddenNoPrint = !isVis2nd && CurrentVars.bluetxt ? "DontPrint" : "Hide";

	for (var L = 0; L <= 2; L++) {
		tDoc.getField("ShowHide 2nd DC").buttonSetCaption(theCaption, L);
	}

	if (typePF) {
		var DC2array = [
			"Image.SaveDC",
			"Spell DC 2 Mod",
			"Spell save DC 2",
			"Spell DC 1 Mod.1"
		];
		tDoc[VisibleHidden]("Spell DC 1 Mod.0");
	} else {
		var DC1array = [
			"Text.SaveDC.1",
			"Image.SaveDCarrow.1",
			"Image.SaveDC.1",
			"Spell DC 1 Mod",
			"Spell save DC 1",
			"Spell DC 1 Bonus"
		];
		var DC2array = [
			"Text.SaveDC.2",
			"Image.SaveDCarrow.2",
			"Image.SaveDC.2",
			"Spell DC 2 Mod",
			"Spell save DC 2"
		];

		var toMove = isVis2nd ? 27 : -27;
		for (var i = 0; i < DC1array.length; i++) {
			var theFld = tDoc.getField(DC1array[i]);
			var gRect = theFld.rect; // Get the location of the field on the sheet
			gRect[0] += toMove; // Add the widen amount to the upper left x-coordinate
			gRect[2] += toMove; // Add the widen amount to the lower right x-coordinate
			theFld.rect = gRect; // Update the value of b.rect
			theFld.value = theFld.value; // Re-input the value as to counteract the changing of font rendering
		}
	}

	for (var j = 0; j < DC2array.length; j++) {
		tDoc[HiddenVisible](DC2array[j]);
	}
	tDoc[HiddenNoPrint]("Spell DC 2 Bonus");
}

//change the colorscheme that is used for the entire sheet
function ApplyColorScheme(aColour) {
	if (typePF || (!aColour && What("Color.Theme") === tDoc.getField("Color.Theme").defaultValue)) return; //don't do this function in the Printer-Friendly version or if resetting with the default colour still active
	var colour = aColour ? aColour.toLowerCase() : What("Color.Theme");
	//stop the function if the input color is not recognized
	if (!ColorList[colour]) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying " + colour + " color theme...");
	calcStop();

	//set the chosen color to a place it can be found again
	Value("Color.Theme", colour);

	//set the highlighting color if it has been coupled to the headers
	if (Who("Highlighting") === "headers") {
		app.runtimeHighlightColor = LightColorList[colour];
		tDoc.getField("Highlighting").fillColor = LightColorList[colour];
	}

	if (tDoc.info.AdvLogOnly) {
		var ALlogA = What("Template.extras.ALlog").split(",");
		var theIconH = tDoc.getField("SaveIMG.Header.Left." + colour).buttonGetIcon();
		var theIconD = tDoc.getField("SaveIMG.Divider." + colour).buttonGetIcon();
		for (tA = 0; tA < ALlogA.length; tA++) {
			tDoc.getField(ALlogA[tA] + "Line").fillColor = ColorList[colour].CMYK;
			tDoc.getField(ALlogA[tA] + "Button").strokeColor = ColorList[colour].CMYK;
			tDoc.getField(ALlogA[tA] + "Image.Header.Left").buttonSetIcon(theIconH);
			tDoc.getField(ALlogA[tA] + "Image.Divider").buttonSetIcon(theIconD);
		}
		thermoM(thermoTxt, true); // Stop progress bar
		return; // do not continue any further with this function
	}

	//get any extra prefixes
	var makeTempArray = function (template) {
		var tempReturn = [];
		var temp = What("Template.extras." + template);
		if (temp) {
			temp = temp.split(",");
			temp.splice(temp.indexOf(""), 1);
			tempReturn = temp;
		}
		return tempReturn;
	}
	var AScompA = makeTempArray("AScomp");
	var ASnotesA = makeTempArray("ASnotes");
	var WSfrontA = makeTempArray("WSfront");
	var ALlogA = makeTempArray("ALlog");

	var SSmoreA = What("Template.extras.SSmore").split(","); //here we do include the first "" value
	var SSfrontA = What("Template.extras.SSfront") ? What("Template.extras.SSfront").split(",")[1] : false;
	if (SSfrontA) SSmoreA.push(SSfrontA);

	// set the fill colours of the spellsheet boxes
	var fillListIfDontPrint = [];
	for (var SS = 0; SS < SSmoreA.length; SS++) {
		var maxSpells = SSmoreA[SS] === SSfrontA ? FieldNumbers.spells[0] : FieldNumbers.spells[1];
		for (var L = 0; L <= maxSpells; L++) {
			fillListIfDontPrint.push(SSmoreA[SS] + "spells.checkbox." + L);
		}
	}
	for (fLdp = 0; fLdp < fillListIfDontPrint.length; fLdp++) {
		var thefLdp = tDoc.getField(fillListIfDontPrint[fLdp]);
		if (thefLdp.display === display.noPrint && thefLdp.fillColor[0] !== "T") {
			thefLdp.fillColor = ColorList[colour].CMYK;
		}
	}

	//first do the Spell Sheets, which have their very peculiar way of naming
	var SSimgFields = [
		"Title",
		"Header.Left",
		"Divider",
		"DividerFlip"
	];
	for (var i = 0; i < SSimgFields.length; i++) {
		theIcon = tDoc.getField("SaveIMG." + SSimgFields[i] + "." + colour).buttonGetIcon();
		if (SSfrontA && SSimgFields[i] === "Title") {
			tDoc.getField(SSfrontA + "Image." + SSimgFields[i]).buttonSetIcon(theIcon);
		} else if (SSimgFields[i] !== "Title") { for (var SS = 0; SS < SSmoreA.length; SS++) {
			var maxLoop = SSimgFields[i] === "Header.Left" ? 3 : 9;
			var extraTxt = SSimgFields[i] === "Header.Left" ? "spellshead." : "spellsdiv.";
			for (var L = 0; L <= maxLoop; L++) {
				tDoc.getField(SSmoreA[SS] + extraTxt + "Image." + SSimgFields[i] + "." + L).buttonSetIcon(theIcon);
			}
		}}
	}

	if (tDoc.info.SpellsOnly) { // if this pdf is only filled with spell sheets, we don't need to go on
		thermoM(thermoTxt, true); // Stop progress bar
		return; // do not continue any further with this function
	}

	//create the lists of the borders, fill, and text of the following fields
	var borderList = [
		"Circle",
		"Button",
		"Attack.Button",
		"Comp.Use.Attack.Button",
		"Comp.eqpB"
	];
	var fillList = [
		"Line"
	];
	var textList = [
		"Background Feature",
		"Background_Faction.Title",
		"Background_FactionRank.Title",
		"Background_Renown.Title",
		"Text.Armor Proficiencies",
		"Text.Weapon Proficiencies"
	];

	//add any possible other template prefixes to the list
	if (AScompA[0]) {
		for (tA = 0; tA < AScompA.length; tA++) {
			borderList.push(AScompA[tA] + "Circle");
			borderList.push(AScompA[tA] + "Comp.Use.Attack.Button");
			borderList.push(AScompA[tA] + "Comp.eqpB");
			fillList.push(AScompA[tA] + "Line");
		}
	}
	if (WSfrontA[0]) {
		for (tA = 0; tA < WSfrontA.length; tA++) {
			borderList.push(WSfrontA[tA] + "Circle");
			fillList.push(WSfrontA[tA] + "Line");
		}
	}
	if (ALlogA[0]) {
		for (tA = 0; tA < ALlogA.length; tA++) {
			fillList.push(ALlogA[tA] + "Line");
		}
	}

	//add more fields to the list; fields that are not part of the templates
	for (var i = 1; i <= FieldNumbers.gear; i++) {
		borderList.push("Adventuring Gear Button " + i);
	}
	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		borderList.push("Extra.Magic Item Button " + i);
		textList.push("Extra.Magic Item " + i);
	}
	for (var i = 1; i <= FieldNumbers.extragear; i++) {
		borderList.push("Extra.Gear Button " + i);
	}
	for (var i = 1; i <= FieldNumbers.feats; i++) {
		borderList.push("Feat Button " + i);
		textList.push("Feat Name " + i);
	}

	thermoM(2/7); //increment the progress dialog's progress

	//change the colors of the borders, fill, and text
	for (bL = 0; bL < borderList.length; bL++) {
		tDoc.getField(borderList[bL]).strokeColor = ColorList[colour].CMYK;
	}
	for (fL = 0; fL < fillList.length; fL++) {
		tDoc.getField(fillList[fL]).fillColor = ColorList[colour].CMYK;
	}
	for (tL = 0; tL < textList.length; tL++) {
		tDoc.getField(textList[tL]).textColor = ColorList[colour].RGB;
	}

	//change the color of the text "Weapons:" and "Armor:" on the second page
	var armorProfArray = tDoc.getField("Text.Armor Proficiencies").richValue;
	var weaponProfArray = tDoc.getField("Text.Weapon Proficiencies").richValue;

	for (var aP = 0; aP < armorProfArray.length; aP++) {
		armorProfArray[aP].textColor = ColorList[colour].RGB;
	}
	for (var wP = 0; wP < weaponProfArray.length; wP++) {
		weaponProfArray[wP].textColor = ColorList[colour].RGB;
	}

	tDoc.getField("Text.Armor Proficiencies").richValue = armorProfArray;
	tDoc.getField("Text.Weapon Proficiencies").richValue = weaponProfArray;

	thermoM(3/7); //increment the progress dialog's progress

	//get a list of the image fields
	var imgFields = [
		"Level",
		"Title",
		"Divider",
		"Stats",
		"Prof",
		"Header.Left",
		"Header.Right",
		"Arrow",
		"IntArrow"
	];

	//set the colored icons
	for (var i = 0; i < imgFields.length; i++) {
		var theIcon = tDoc.getField("SaveIMG." + imgFields[i] + "." + colour).buttonGetIcon();

		temp = [""];

		if (imgFields[i] === "Divider") {
			//also set it for the divider that can be hidden on the third page
			tDoc.getField("Image.DividerExtraGear").buttonSetIcon(theIcon);
			//if divider, also add the adventurers log template names
			temp = temp.concat(ALlogA);
		} else if (imgFields[i] === "Header.Right") {
			//also set it for the header that can be hidden on the third page
			tDoc.getField("Image.Header.RightRules").buttonSetIcon(theIcon);
		}

		//if anything but level or title, also do something with the extra template pages
		if (imgFields[i] !== "Level" && imgFields[i] !== "Title" && imgFields[i] !== "Header.Right") {
			//also set it for the companion and wild shape templates names
			temp = temp.concat(AScompA);
			//if not prof or arrow, also add the wild shape templates names
			if (imgFields[i] !== "Prof" && imgFields[i] !== "Arrow") {
				temp = temp.concat(WSfrontA);
			}
		}
		//if left header, also add the notes and adventurers log templates names
		if (imgFields[i] === "Header.Left") {
			temp = temp.concat(ASnotesA).concat(ALlogA);
		}

		for (var te = 0; te < temp.length; te++) {
			tDoc.getField(temp[te] + "Image." + imgFields[i]).buttonSetIcon(theIcon);
			if ((te === 0 || temp[te].indexOf("AScomp") !== -1) && imgFields[i] === "Divider") {
				tDoc.getField(temp[te] + "Comp.eqp.Image." + imgFields[i]).buttonSetIcon(theIcon);
			}
		}
	}

	thermoM(4/7); //increment the progress dialog's progress

	//make an array of the extra companion templates with an empty value at the start (so it is never empty)
	var prefixAScomp = [""].concat(AScompA);

	//set the attack field color for any of them that is set to change together with the headers
	theIcon = tDoc.getField("SaveIMG.Attack." + colour).buttonGetIcon();
	for (var a = 1; a <= FieldNumbers.attacks; a++) {
		if (What("BlueText.Attack." + a + ".Weight Title") === "same as headers") {
			tDoc.getField("Image.Attack." + a).buttonSetIcon(theIcon);
		}
		if (a <= 3) { for (var pA = 0; pA < prefixAScomp.length; pA++) {
			if (What(prefixAScomp[pA] + "BlueText.Comp.Use.Attack." + a + ".Weight Title") === "same as headers") {
				tDoc.getField(prefixAScomp[pA] + "Image.Comp.Use.Attack." + a).buttonSetIcon(theIcon);
			}
		}}
	}

	thermoM(5/7); //increment the progress dialog's progress

	//make an array of the extra wildshape templates with an empty value at the start (so it is never empty)
	var prefixWSfront = [""].concat(WSfrontA);

	//re-do all the skill proficiencies of the companion and wild shape pages
	for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
		var theSkill = SkillsList.abbreviations[s];
		for (pAS = 0; pAS < prefixAScomp.length; pAS++) {
			var compSkill = prefixAScomp[pAS] + "Text.Comp.Use.Skills." + theSkill + ".Prof";
			if (What(compSkill) !== "nothing") Value(compSkill, What(compSkill));
		}

		for (pWS = 0; pWS < prefixWSfront.length; pWS++) {
			for (var w = 1; w <= 4; w++) {
				var wildSkill = prefixWSfront[pWS] + "Text.Wildshape." + w + ".Skills." + theSkill + ".Prof";
				if (What(wildSkill) !== "nothing") Value(wildSkill, What(wildSkill));
			}
		}
	}

	thermoM(6/7); //increment the progress dialog's progress

	//see if any of the Ability Save DC's have the color connected to this
	ApplyDCColorScheme();

	thermoM(thermoTxt, true); // Stop progress bar
}

//change the colorscheme that is used for the dragon heads sheet
function ApplyDragonColorScheme(aColour) {
	if (typePF || (!aColour && What("Color.DragonHeads") === tDoc.getField("Color.DragonHeads").defaultValue)) return; //don't do this function in the Printer-Friendly version or if resetting with the default colour still active
	var colour = aColour ? aColour.toLowerCase() : What("Color.DragonHeads");
	var theColor = ColorList[colour].CMYK;
	var theColorDark = DarkColorList[colour];
	//stop the function if the input color is not recognized
	if (!ColorList[colour]) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying " + colour + " Dragon Heads...");
	calcStop();

	//set the chosen color to a place it can be found again
	Value("Color.DragonHeads", colour);

	//set the highlighting color if it has been coupled to the dragon heads color
	if (Who("Highlighting") === "same as dragon heads") {
		app.runtimeHighlightColor = LightColorList[colour];
		tDoc.getField("Highlighting").fillColor = LightColorList[colour];
	}

	//change the dragonheads
	var theIcon = tDoc.getField("SaveIMG.Dragonhead." + colour).buttonGetIcon();

	if (tDoc.info.AdvLogOnly) {
		var ALlogA = What("Template.extras.ALlog").split(",");
		var buttons = [];
		for (tA = 0; tA < ALlogA.length; tA++) {
			buttons.push(ALlogA[tA] + "AdvLog.Options");
			tDoc.getField(ALlogA[tA] + "Image.Dragonhead").buttonSetIcon(theIcon);
		}
		//set the fill and border colors of the buttons
		if (theColor && theColorDark) {
			for (var b = 0; b < buttons.length; b++) {
				tDoc.getField(buttons[b]).fillColor = theColor;
				tDoc.getField(buttons[b]).strokeColor = theColorDark;
			}
		}
		thermoM(thermoTxt, true); // Stop progress bar
		return; // do not continue any further with this function
	}

	//first do the Spell Sheets, which have their very peculiar way of naming
	var SSmoreA = What("Template.extras.SSmore").split(",");
	var SSfrontA = What("Template.extras.SSfront") ? What("Template.extras.SSfront").split(",")[1] : false;
	if (SSfrontA) SSmoreA.push(SSfrontA);
	var SSnameFields = [
		"spellshead.",
		"spellsdiv."
	];
	for (var SS = 0; SS < SSmoreA.length; SS++) {
		for (var i = 0; i < SSnameFields.length; i++) {
			var maxLoop = SSnameFields[i] === "spellshead." ? 3 : 9;
			for (var L = 0; L <= maxLoop; L++) {
				tDoc.getField(SSmoreA[SS] + SSnameFields[i] + "Image.Dragonhead." + L).buttonSetIcon(theIcon);
			}
		}
	}

	thermoM(1/6); //increment the progress dialog's progress

	if (tDoc.info.SpellsOnly) { // if this pdf is only filled with spell sheets, we don't need to go on
		thermoM(thermoTxt, true); // Stop progress bar
		return; // do not continue any further with this function
	}

	//get any extra prefixes
	var AScompA = What("Template.extras.AScomp").split(",");
	var ASnotesA = What("Template.extras.ASnotes").split(",");
	var WSfrontA = What("Template.extras.WSfront").split(",");
	var ALlogA = What("Template.extras.ALlog").split(",");
	var prefixFullA = [""].concat(AScompA).concat(ASnotesA).concat(WSfrontA).concat(ALlogA);

	thermoM(2/6); //increment the progress dialog's progress

	tDoc.getField("Image.DragonheadExtraGear").buttonSetIcon(theIcon);
	tDoc.getField("Image.DragonheadRightRules").buttonSetIcon(theIcon);
	for (var pA = 0; pA < prefixFullA.length; pA++) {
		if (pA > 0 && !prefixFullA[pA]) continue; //ignore anything but the first "" in the array
		tDoc.getField(prefixFullA[pA] + "Image.Dragonhead").buttonSetIcon(theIcon);
	}
	for (tA = 0; tA < AScompA.length; tA++) { //also do the dragonhead that can be hidden on the Companion page
		tDoc.getField(AScompA[tA] + "Comp.eqp.Image.Dragonhead").buttonSetIcon(theIcon);
	}

	//set the color of the D&D logo on the third page
	theIcon = tDoc.getField("SaveIMG.DnDLogo." + colour).buttonGetIcon();
	tDoc.getField("Image.DnDLogo.long").buttonSetIcon(theIcon);

	thermoM(3/6); //increment the progress dialog's progress

	var buttons = [
		"Show Buttons",
		"ShowHide 2nd DC",
		"Background Menu",
		"Race Features Menu",
		"Class Features Menu",
		"Equipment.menu",
		"Extra.Layers Button",
		"Buttons"
	];

	//add the buttons names of the extra templates to buttons array
	for (tA = 0; tA < AScompA.length; tA++) {
		buttons.push(AScompA[tA] + "Companion.Options");
		buttons.push(AScompA[tA] + "Cnote.Options");
		buttons.push(AScompA[tA] + "Buttons");
	}
	for (tA = 0; tA < ASnotesA.length; tA++) {
		buttons.push(ASnotesA[tA] + "Notes.Options");
	}
	for (tA = 0; tA < WSfrontA.length; tA++) {
		buttons.push(WSfrontA[tA] + "Wildshapes.Settings");
	}
	for (tA = 0; tA < ALlogA.length; tA++) {
		buttons.push(ALlogA[tA] + "AdvLog.Options");
	}
	//set the fill and border colors of the buttons
	if (theColor && theColorDark) {
		for (var b = 0; b < buttons.length; b++) {
			tDoc.getField(buttons[b]).fillColor = theColor;
			tDoc.getField(buttons[b]).strokeColor = theColorDark;
		}
	}

	//make an array of the extra companion templates with an empty value at the start (so it is never empty)
	var prefixA = [""].concat(AScompA);

	thermoM(4/6); //increment the progress dialog's progress

	//set the attack field color for any of them that is set to change together with the dragon heads
	theIcon = tDoc.getField("SaveIMG.Attack" + "." + colour).buttonGetIcon();
	for (var a = 1; a <= FieldNumbers.attacks; a++) {
		if (What("BlueText.Attack." + a + ".Weight Title") === "same as dragon heads") {
			tDoc.getField("Image.Attack." + a).buttonSetIcon(theIcon);
		}
		if (a <= 3) { for (pA = 0; pA < prefixA.length; pA++) {
			if (What(prefixA[pA] + "BlueText.Comp.Use.Attack." + a + ".Weight Title") === "same as dragon heads") {
				tDoc.getField(prefixA[pA] + "Image.Comp.Use.Attack." + a).buttonSetIcon(theIcon);
			}
		}}
	}

	thermoM(5/6); //increment the progress dialog's progress

	//see if any of the Ability Save DC's have the color connected to this
	ApplyDCColorScheme();

	thermoM(thermoTxt, true); // Stop progress bar
}

//change the colorscheme that is used for the dragon heads sheet
function ApplyHPDragonColorScheme(aColour) {
	if (typePF || (!aColour && What("Color.HPDragon") === tDoc.getField("Color.HPDragon").defaultValue)) return; //don't do this function in the Printer-Friendly version or if resetting with the default colour still active
	var colour = aColour ? aColour.toLowerCase() : What("Color.HPDragon");

	//stop the function if the input color is not recognized
	if (!ColorList[colour]) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying " + colour + " HP Dragons...");
	calcStop();

	//set the chosen color to a place where it can be found again
	Value("Color.HPDragon", colour);

	//get any extra prefixes
	var makeTempArray = function (template) {
		var tempReturn = [];
		var temp = What("Template.extras." + template);
		if (temp) {
			temp = temp.split(",");
			temp.splice(temp.indexOf(""), 1);
			tempReturn = temp;
		}
		return tempReturn;
	}
	var AScompA = makeTempArray("AScomp");
	var WSfrontA = makeTempArray("WSfront");
	var prefixFullA = [""].concat(AScompA).concat(WSfrontA);

	thermoM(1/2); //increment the progress dialog's progress

	var theIcon = tDoc.getField("SaveIMG.HPdragonhead" + "." + colour).buttonGetIcon();
	for (var pA = 0; pA < prefixFullA.length; pA++) {
		tDoc.getField(prefixFullA[pA] + "Image.HPdragonhead").buttonSetIcon(theIcon);
	}

	thermoM(thermoTxt, true); // Stop progress bar
}

//Make menu for choosing the color, the 'color' button, and parse it to Menus.color
function MakeColorMenu() {

	var ColorMenu = [];
	var tempArray = [];

	//add all the colours to the array, ommitting some if not using the full (bonus) version
	for (var key in ColorList) {
		tempArray.push([key.capitalize(), key]);
	};
	tempArray.sort();

	if (typePF) {
		var menuLVL1 = function (item, array, name) {
			var lookIt = Who("Highlighting");
			for (i = 0; i < array.length; i++) {
				item.push({
					cName : array[i][0],
					cReturn : "color#" + name + "#" + array[i][1],
					bMarked : lookIt === array[i][1]
				});
			}
		};
		tempArray.unshift(
			["Turn highlighting off", "turn highlighting off"],
			["-", "-"],
			["Sheet default", "sheet default"],
			["Adobe default", "adobe default"],
			["-", "-"]
		);
		menuLVL1(ColorMenu, tempArray, "highlights");
	} else {
		var DCMenu = {cName : "Ability Save DCs", oSubMenu : []};

		var menuLVL1 = function (item, array, name) {
			var lookIt = What("Color.Theme");
			for (i = 0; i < array.length; i++) {
				item.push({
					cName : array[i][0],
					cReturn : "color#" + name + "#" + array[i][1],
					bMarked : lookIt === array[i][1]
				});
			}
		};

		var menuLVL2 = function (name, array) {
			var menu = {
				cName : name[0],
				oSubMenu : []
			};
			var lookIt = name[1] === "highlights" ? Who("Highlighting") : name[1] === "hpdragons" ? What("Color.HPDragon") : name[1] === "dragonheads" ? What("Color.DragonHeads") : false;
			for (i = 0; i < array.length; i++) {
				menu.oSubMenu.push({
					cName : array[i][0],
					cReturn : "color#" + name[1] + "#" + array[i][1],
					bMarked : lookIt === array[i][1]
				})
			};
			return menu;
		};

		var menuLVL3 = function (menu, name, array, extraReturn) {
			var temp = [];
			var lookIt = What("Color.DC").split(",")[extraReturn - 1];
			for (i = 0; i < array.length; i++) {
				temp.push({
					cName : array[i][0],
					cReturn : "color#" + name[1] + "#" + array[i][1] + "#" + extraReturn,
					bMarked : lookIt === array[i][1]
				});
			}
			menu.oSubMenu.push({
				cName : name[0],
				oSubMenu : temp
			});
		};

		var tempArrayExt = tempArray.slice(0);
		tempArrayExt.unshift(
			["Same as Headers", "headers"],
			["Same as Dragon Heads", "dragons"],
			["-", "-"]
		);

		//make a submenu to set the form field highlight color, or turn highlighting off
		var HighlightArray = tempArrayExt.slice(0);
		HighlightArray.unshift(
			["Turn highlighting off", "turn highlighting off"],
			["-", "-"],
			["Sheet default", "sheet default"],
			["Adobe default", "adobe default"],
			["-", "-"]
		);
		ColorMenu.push(menuLVL2(["Form Highlights", "highlights"], HighlightArray));

		//make the Dragon Head submenu
		ColorMenu.push(menuLVL2(["Dragon Heads", "dragonheads"], tempArray));

		//make, if this is not a spell sheet, the Dragon HP and ability save DCs submenu
		if (!minVer) {
			ColorMenu.push(menuLVL2(["HP Dragons", "hpdragons"], tempArray));
			menuLVL3(DCMenu, ["Ability Save DC 1 (left)", "abilitydc"], tempArrayExt, 1);
			menuLVL3(DCMenu, ["Ability Save DC 2 (right)", "abilitydc"], tempArrayExt, 2);
			ColorMenu.push(DCMenu);
		}

		ColorMenu.push({cName : "-"}); //add a divider

		//make the color menu
		menuLVL1(ColorMenu, tempArray, "theme");

		ColorMenu.push({cName : "-"}); //add a divider

		// 'all' option
		ColorMenu.push(menuLVL2(["All of the above (expect highlighting)", "all"], tempArray));
	}

	Menus.colour = ColorMenu;
};

//call the color menu and do something with the results
function ColoryOptions(input) {
	var MenuSelection = input ? input : getMenu("colour");

	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] !== "color") return;
	switch (MenuSelection[1]) {
		case "theme" :
			ApplyColorScheme(MenuSelection[2]);
			break;
		case "dragonheads" :
			ApplyDragonColorScheme(MenuSelection[2]);
			break;
		case "hpdragons" :
			ApplyHPDragonColorScheme(MenuSelection[2]);
			break;
		case "abilitydc" :
			ApplyDCColorScheme(MenuSelection[2], MenuSelection[3]);
			break;
		case "highlights" :
			var highlightsOn = true;
			switch (MenuSelection[2]) {
				case "turn highlighting off" :
					highlightsOn = false;
				case "adobe default" :
					var theColour = ["RGB", 0.8, 0.8431, 1]; //Adobe default form field highlighting colour
					break;
				case "sheet default" :
					var theColour = ["RGB", 0.9, 0.9, 1];
					break;
				case "headers" :
					var theColour = LightColorList[What("Color.Theme")];
					break;
				case "dragons" :
					var theColour = LightColorList[What("Color.DragonHeads")];
					break;
				default :
					if (!LightColorList[MenuSelection[2]]) return;
					var theColour = LightColorList[MenuSelection[2]];
					break;
			};
			app.runtimeHighlight = highlightsOn;
			Value("Highlighting", app.runtimeHighlight, MenuSelection[2]);
			app.runtimeHighlightColor = theColour;
			tDoc.getField("Highlighting").fillColor = theColour;
			break;
		case "all" :
			ApplyColorScheme(MenuSelection[2]);
			ApplyDragonColorScheme(MenuSelection[2]);
			ApplyHPDragonColorScheme(MenuSelection[2]);
			ApplyDCColorScheme(MenuSelection[2], 1);
			ApplyDCColorScheme(MenuSelection[2], 2);
			break;
	};
};

//Add the text of the feature selected
function ApplyBackgroundFeature(input) {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything
	if (event.target && event.target.name === "Background Feature" && input.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made

	var TheInput = input.toLowerCase();
	var TempFound = false;
	var tempString = stringSource(CurrentBackground, "full,page", "The \"" + CurrentBackground.name + "\" background is found in ", ".\n");

	if (input === "") {
		Value("Background Feature Description", "", "");
	} else {
		for (var feature in BackgroundFeatureList) {
			if (TheInput.indexOf(feature) !== -1) {
				if (testSource(feature, BackgroundFeatureList[feature], "backFeaExcl")) continue; // test if the background feature or its source isn't excluded
				var FeaName = feature.capitalize();
				var theBfea = BackgroundFeatureList[feature];
				tempString += stringSource(theBfea, "full,page", "The \"" + FeaName + "\" background is found in ", ".");

				var theDesc = What("Unit System") === "imperial" ? BackgroundFeatureList[feature].description : ConvertToMetric(BackgroundFeatureList[feature].description, 0.5);
				Value("Background Feature Description", theDesc, tempString);

				return;
			};
		};
	};
};

//set the dropdown box options for the background features
function SetBackgroundFeaturesdropdown(forceTooltips) {
	var tempArray = [""];
	var tempString = "Select or type in the background feature you want to use and its text will be filled out below automatically.\n\n" + toUni("Background selection") + "\nThe relevant background feature is automatically selected upon selecting a background on the first page. Doing that will always override whatever you wrote here. So, please first fill out a background before you select a alternative feature here.";

	for (var feature in BackgroundFeatureList) {
		if (testSource(feature, BackgroundFeatureList[feature], "backFeaExcl")) continue;
		var feaNm = feature.capitalize();
		if (tempArray.indexOf(feaNm) === -1) tempArray.push(feaNm);
	};
	tempArray.sort();

	if (tDoc.getField("Background Feature").submitName === tempArray.toSource()) {
		if (forceTooltips) AddTooltip("Background Feature", tempString);
		return; //no changes, so no reason to do this
	}
	tDoc.getField("Background Feature").submitName = tempArray.toSource();

	var theFldVal = What("Background Feature");
	tDoc.getField("Background Feature").setItems(tempArray);
	Value("Background Feature", theFldVal, tempString);
}

//Make menu for 'choose race feature' button and parse it to Menus.raceoptions
function MakeRaceMenu() {
	//make an array of the variants that are not excluded by the resource settings
	var racialVarArr = ["basic"];
	if (CurrentRace.known && CurrentRace.variants) {
		for (var r = 0; r < CurrentRace.variants.length; r++) {
			var theR = CurrentRace.known + "-" + CurrentRace.variants[r];
			if (testSource(theR, RaceSubList[theR], "racesExcl")) continue; // test if the racial variant or its source isn't excluded
			racialVarArr.push(CurrentRace.variants[r]);
		}
	};

	var menuLVL1R = function (item, array) {
		var isCurrent = CurrentRace.variant;
		var raceSrc = stringSource(RaceList[CurrentRace.known], "first,abbr", "\t   [", "]");
		for (var i = 0; i < array.length; i++) {
			var varR = RaceSubList[CurrentRace.known + "-" + array[i]];
			var varSrc = varR && varR.source ? stringSource(varR, "first,abbr", "\t   [", "]") : raceSrc;
			item.push({
				cName : array[i].capitalize() + " " + RaceList[CurrentRace.known].name + varSrc,
				cReturn : CurrentRace.known + "#" + array[i],
				bMarked : (isCurrent === "" && array[i] === "basic") || isCurrent === array[i]
			});
		}
	};

	var RaceMenu = [];

	if (racialVarArr.length === 1) {
		RaceMenu = [{
			cName : "No race options that require a choice",
			cReturn : "nothing",
			bEnabled : false
		}];
	} else {
		menuLVL1R(RaceMenu, racialVarArr);
	}

	Menus.raceoptions = RaceMenu;
}

//call the Race Features menu and do something with the results
function RaceFeatureOptions() {
	var MenuSelection = getMenu("raceoptions");

	if (MenuSelection && MenuSelection[0] !== "nothing") {
		ApplyRace(MenuSelection.toString(), true);
	}
}

function ConvertToMetric(inputString, rounded, exact) {
	if (typeof inputString != 'string' || inputString === "") {return "";};
	var rounding = rounded ? rounded : 1;
	var ratio = exact ? "metricExact" : "metric";
	var fraction;
	var INtoCM = function (unit) {
		return unit * UnitsList[ratio].lengthInch;
	}
	var FTtoM = function (unit) {
		return unit * UnitsList[ratio].length;
	}
	var MILEtoKM = function (unit) {
		return unit * UnitsList[ratio].distance;
	}
	var CUFTtoM = function (unit) {
		return unit * UnitsList[ratio].volume;
	}
	var SQFTtoM = function (unit) {
		return unit * UnitsList[ratio].surface;
	}
	var LBtoKG = function (unit) {
		return unit * UnitsList[ratio].mass;
	}
	var GALtoL = function (unit) {
		return unit * UnitsList[ratio].liquid;
	}
	var FtoC = function (unit) {
		return (unit - 32) * 5/9;
	}

	var theConvert = function (amount, units) {
		amount = Number(amount);
		var total, unit, isRounded;
		switch (units){
		 case "mile" : case "miles" :
			total = MILEtoKM(amount);
			unit = "km";
			break;
		 case "ft" : case "foot" : case "feet" : case "'" :
			total = FTtoM(amount);
			unit = "m";
			break;
		 case "in" : case "inch" : case "inches" : case '"' :
			total = INtoCM(amount);
			unit = "cm";
			break;
		 case "cu ft" : case "cubic foot" : case "cubic feet" :
			total = CUFTtoM(amount);
			unit = "m3";
			break;
		 case "sq ft" : case "square foot" : case "square feet" :
			total = SQFTtoM(amount);
			unit = "m2";
			break;
		 case "lb" : case "lbs" : case "pound" : case "pounds" :
			total = LBtoKG(amount);
			unit = "kg";
			break;
		 case "gal" : case "gallon" : case "gallons" :
			total = GALtoL(amount);
			unit = "L";
			break;
		 case "\u00B0 f" : case "\u00B0f" : case "degree fahrenheit" : case "degrees fahrenheit" : case "fahrenheit" :
			total = RoundTo(FtoC(amount), exact ? 0.01 : 1, false, true);
			unit = "\u00B0C";
			isRounded = true;
			break;
		}
		return [total, unit, isRounded];
	}

	// find all labeled measurements in string
	var measurements = inputString.match(/(\b|-)\d+(,|\.|\/)?\d*\/?(-?\d+?(,|\.|\/)?\d*)?\s?-?('\d+\w?"($|\W)|'($|\W)|"($|\W)|(in|inch|inches|miles?|ft|foot|feet|sq ft|square foot|square feet|cu ft|cubic foot|cubic feet|lbs?|pounds?|gal|gallons?|\u00B0 ?f|degrees? fahrenheit|fahrenheit)\b)/ig);

	if (measurements) {
		for (var i = 0; i < measurements.length; i++) {
			if ((/'.+"/).test(measurements[i])) {
				if ((/'.+"\W/).test(measurements[i])) {
					measurements[i] = measurements[i].substr(0, measurements[i].length - 1);
				}
				var orgFT = parseFloat(measurements[i].substring(0,measurements[i].indexOf("'")));
				var orgIN = parseFloat(measurements[i].substring(measurements[i].indexOf("'") + 1, measurements[i].indexOf('"')));
				var resulted = theConvert(parseFloat(orgIN/12) + parseFloat(orgFT), "ft");
			} else {
				if ((/\d+('|")\W/).test(measurements[i])) {
					measurements[i] = measurements[i].substr(0, measurements[i].length - 1);
				}
				var org = measurements[i].replace(/,/g, ".");
				var orgUnit = org.match(/[-\s]*([\u00B0 A-z'"]+)$/)[1].toLowerCase();
				var fraction;

				if (fraction = org.match(/(-?\d+\.?\d*)\/(-?\d+\.?\d*)/) ){
					var resulted = [theConvert(fraction[1], orgUnit), theConvert(fraction[2], orgUnit)];
				} else {
					var resulted = theConvert(parseFloat(org), orgUnit);
				}
			}

			var delimiter = (/-[^\d]/).test(measurements[i]) ? "-" : " ";

			if (isArray(resulted[0])) {
				var theResult = RoundTo(resulted[0][0], rounding, false, true) + "/" + RoundTo(resulted[1][0], rounding, false, true) + delimiter + resulted[1][1];
			} else {
				var theResult = (resulted[2] ? resulted[0] : RoundTo(resulted[0], rounding, false, true)) + delimiter + resulted[1];
			}
			inputString = inputString.replace(measurements[i], theResult);
		}
	}
	return inputString;
}

function ConvertToImperial(inputString, rounded, exact, toshorthand) {
	if (typeof inputString != 'string' || inputString === "") {return "";};
	var ratio = exact ? "metricExact" : "metric";
	var rounding = rounded ? rounded : 1;
	var fraction;
	var INofCM = function (unit) {
		return unit / UnitsList[ratio].lengthInch;
	}
	var FTofM = function (unit) {
		return unit / UnitsList[ratio].length;
	}
	var MILEofKM = function (unit) {
		return unit / UnitsList[ratio].distance;
	}
	var CUFTofM = function (unit) {
		return unit / UnitsList[ratio].volume;
	}
	var SQFTofM = function (unit) {
		return unit / UnitsList[ratio].surface;
	}
	var LBofKG = function (unit) {
		return unit / UnitsList[ratio].mass;
	}
	var LofGAL = function (unit) {
		return unit / UnitsList[ratio].liquid;
	}
	var CofF = function (unit) {
		return (unit * 9/5) + 32;
	}

	var theConvert = function (amount, units) {
		amount = Number(amount);
		var total, unit, isRounded;
		switch (units){
		 case "cm" :
			if (amount < 30) {
				total = INofCM(amount);
				unit = "in";
				break;
			}
			amount = amount / 100;
		 case "m" : case "meter" : case "meters" : case "metre" : case "metres" :
			total = FTofM(amount);
			unit = "ft";
			break;
		 case "km" :
			total = MILEofKM(amount);
			unit = total === 1 ? "mile" : "miles";
			break;
		 case "m3" : case "cubic meter" : case "cubic meters" : case "cubic metre" : case "cubic metres" :
			total = CUFTofM(amount);
			unit = "cu ft";
			break;
		 case "m2" : case "square metre" : case "square metres" : case "square meter" : case "square meters" :
			total = SQFTofM(amount);
			unit = "sq ft";
			break;
		 case "g" :
			amount = amount / 1000;
		 case "kg" : case "kilo" : case "kilos" :
			total = LBofKG(amount);
			unit = "lb";
			break;
		 case "l" : case "liter" : case "liters" : case "litre" : case "litres" :
			total = LofGAL(amount);
			unit = "gal";
			break;
		 case "\u00B0 c" : case "\u00B0c" : case "degree celcius" : case "degrees celcius" : case "celcius" :
			total = RoundTo(CofF(amount), exact ? 0.01 : 1, false, true);
			unit = "\u00B0F";
			isRounded = true;
			break;
		}
		return [total, unit, isRounded];
	}

	// find all labeled measurements in string
	var measurements = inputString.match(/(\b|-)\d+(,|\.|\/)?\d*\/?(-?\d+?(,|\.|\/)?\d*)?\s?-?(m2|square meters?|square metres?|m3|cubic meters?|cubic metres?|cm|km|m|meters?|metres?|l|liters?|litres?|kg|g|kilos?|\u00B0 ?c|degrees? celcius|celcius)\b/ig);

	if (measurements) {
		for (var i = 0; i < measurements.length; i++) {
			var org = measurements[i].replace(/,/g, ".");
			var orgUnit = org.match(/[-\s]*([\u00B0 A-z']+)$/)[1].toLowerCase();
			var fraction;

			if (fraction = org.match(/(-?\d+\.?\d*)\/(-?\d+\.?\d*)/)){
				var resulted = [theConvert(fraction[1], orgUnit), theConvert(fraction[2], orgUnit)];
			} else {
				var resulted = theConvert(parseFloat(org), orgUnit);
			}

			var delimiter = (/-[^\d]/).test(measurements[i]) ? "-" : " ";

			if (isArray(resulted[0])) {
				var theResult = RoundTo(resulted[0][0], rounding, false, true) + "/" + RoundTo(resulted[1][0], rounding, false, true) + delimiter + resulted[1][1];
			} else if (toshorthand && resulted[1] === "ft" && resulted[0] % 1 != 0) {
				var theFT = Math.floor(resulted[0]);
				var theINCH = Math.round(resulted[0] % 1 / (1/12));
				var theResult = theFT + "'" + theINCH + "\"";
			} else {
				var theResult = (resulted[2] ? resulted[0] : RoundTo(resulted[0], rounding, false, true)) + delimiter + resulted[1];
			}
			inputString = inputString.replace(measurements[i], theResult);
		}
	}
	return inputString;
}

//update all the decimals in a string or number to reflect the new decimal chosen.
function UpdateDecimals(inputString) {
	var theDec = What("Decimal Separator");
	var theInput = inputString.toString();

	if (theDec === "dot") {
		var measurements = theInput.match(/\b\d+,\d+/g);
		if (measurements) {
			for (var i = 0; i < measurements.length; i++) {
				var theResult = measurements[i].replace(",", ".");
				theInput = theInput.replace(measurements[i], theResult);
			}
		}
	} else if (theDec === "comma") {
		var measurements = theInput.match(/\b\d+\.\d+/g);
		if (measurements) {
			for (var i = 0; i < measurements.length; i++) {
				var theResult = measurements[i].replace(".", ",");
				theInput = theInput.replace(measurements[i], theResult);
			}
		}
	}
	theInput = isNaN(theInput) ? theInput : Number(theInput);
	return theInput;
}

function SetUnitDecimals_Button() {
	var unitSys = What("Unit System");
	var decSep = What("Decimal Separator");

	//set the dialog to represent current settings
	SetUnitDecimals_Dialog.bSys = unitSys;
	SetUnitDecimals_Dialog.bDec = decSep;

	//call the dialog and do something if ok is pressed
	if (app.execDialog(SetUnitDecimals_Dialog) != "ok") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Set units and decimals...");
	calcStop();

	if (!minVer) {
		//fields to update the string from
		var FldsGameMech = [
			"Vision",
			"Saving Throw advantages / disadvantages",
			"Racial Traits",
			"Class Features",
			"Speed",
			"Speed encumbered",
			"Background Feature Description",
			"Extra.Notes",
			"MoreProficiencies"
		];
		//Weight fields (that don't include a unit) to update with 4 decimals
		var FldsWeight = [
			"AC Armor Weight",
			"AC Shield Weight",
			"AmmoLeftDisplay.Weight",
			"AmmoRightDisplay.Weight"
		];
		//field calculations to update
		var FldsCalc = [], MIfldsCalc = [];
		var AScompA = What("Template.extras.AScomp").split(",").slice(1);
		var WSfrontA = What("Template.extras.WSfront").split(",").slice(1);
		for (var C = 0; C < AScompA.length; C++) {
			var prefix = AScompA[C];
			FldsGameMech.push(prefix + "Comp.Use.Speed");
			FldsGameMech.push(prefix + "Comp.Use.Features");
			FldsGameMech.push(prefix + "Comp.Use.Senses");
			FldsGameMech.push(prefix + "Comp.Use.Traits");
			FldsGameMech.push(prefix + "Cnote.Left");
			FldsGameMech.push(prefix + "Cnote.Right");
			for (var a = 1; a <= FieldNumbers.compgear; a++) {
				FldsWeight.push(prefix + "Comp.eqp.Gear Weight " + a);
			}
		}
		for (var i = 1; i <= 77; i++) {
			if (i <= FieldNumbers.magicitems) FldsGameMech.push("Extra.Magic Item Description " + i);
			if (i <= FieldNumbers.limfea) FldsGameMech.push("Limited Feature " + i);
			if (i <= FieldNumbers.feats) {
				FldsGameMech.push("Feat Description " + i);
				FldsCalc.push("Feat Description " + i);
			}
			if (i <= FieldNumbers.magicitems) {
				FldsGameMech.push("Extra.Magic Item Description " + i);
				MIfldsCalc.push("Extra.Magic Item Description " + i);
				FldsWeight.push("Extra.Magic Item Weight " + i);
			}
			if (i <= FieldNumbers.actions) {
				FldsGameMech.push("Bonus Action " + i);
				FldsGameMech.push("Reaction " + i);
			}
			if (i <= FieldNumbers.trueactions) {
				FldsGameMech.push("Action " + i);
			}
			if (i <= FieldNumbers.attacks) {
				FldsGameMech.push("Attack." + i + ".Range");
				FldsGameMech.push("Attack." + i + ".Description");
				FldsWeight.push("BlueText.Attack." + i + ".Weight");
			}
			if (i <= 4) {
				for (var W = 0; W < WSfrontA.length; W++) {
					prefix = WSfrontA[W];
					FldsGameMech.push(prefix + "Wildshape." + i + ".Attack.1.Range");
					FldsGameMech.push(prefix + "Wildshape." + i + ".Attack.1.Description");
					FldsGameMech.push(prefix + "Wildshape." + i + ".Attack.2.Range");
					FldsGameMech.push(prefix + "Wildshape." + i + ".Attack.2.Description");
					FldsGameMech.push(prefix + "Wildshape." + i + ".Speed");
					FldsGameMech.push(prefix + "Wildshape." + i + ".Traits");
				}
			}
			if (i <= 3) {
				for (var C = 0; C < AScompA.length; C++) {
					prefix = AScompA[C];
					FldsGameMech.push(prefix + "Comp.Use.Attack." + i + ".Range");
					FldsGameMech.push(prefix + "Comp.Use.Attack." + i + ".Description");
				}
			}
			if (i <= FieldNumbers.extragear) FldsWeight.push("Extra.Gear Weight " + i);
			if (i <= FieldNumbers.gear) FldsWeight.push("Adventuring Gear Weight " + i);
		}
	}
	if (!tDoc.info.AdvLogOnly) {
		var spellsArray = []; // an array of all the spell fields
		var SSmoreA = What("Template.extras.SSmore").split(",");
		SSmoreA[0] = What("Template.extras.SSfront").split(",")[1];
		if (!SSmoreA[0]) SSmoreA.shift();
		var SkipArray = ["hidethisline", "setcaptions", "setheader", "setdivider", "setglossary"];
		if (SSmoreA[0]) {
			for (var SS = 0; SS < SSmoreA.length; SS++) {
				var fldsNmbrs = SS === 0 ? FieldNumbers.spells[0] : FieldNumbers.spells[1];
				for (var q = 0; q < fldsNmbrs; q++) {
					var SSrem = SSmoreA[SS] + "spells.remember." + q;
					var SSremV = What(SSrem);
					if (SSremV && SkipArray.indexOf(SSremV.split("##")[0]) === -1) {
						spellsArray.push([SSremV, SSrem]);
					}
				}
			}
		}
	}
	if (!minVer && SetUnitDecimals_Dialog.bSys !== unitSys) { //do something if the unit system was changed
		thermoTxt = thermoM("Converting to " + SetUnitDecimals_Dialog.bSys + "...", false); //change the progress dialog text
		setListsUnitSystem(SetUnitDecimals_Dialog.bSys); //update some variables
		Value("Unit System", SetUnitDecimals_Dialog.bSys);
		Value("Decimal Separator", SetUnitDecimals_Dialog.bDec);
		if (typePF) {
			var LbKg = What("Unit System") === "imperial" ? "LB" : "KG";
			Value("Display.Weighttxt.LbKg", LbKg);
			var tpls = What("Template.extras.AScomp").split(",");
			for (var t = 0; t < tpls.length; t++) Value(tpls[t]+"Comp.eqp.Display.Weighttxt", LbKg);
		} else {
			SetRichTextFields();
		}

		if (SetUnitDecimals_Dialog.bSys === "imperial") {
			var conStr = "ConvertToImperial";
			var weightConv = function (amount) {
				return RoundTo(amount / UnitsList.metric.mass, 0.001);
			}
			var raceHeight = "height";
			var raceWeight = "weight";
		} else {
			var conStr = "ConvertToMetric";
			var weightConv = function (amount) {
				return RoundTo(amount * UnitsList.metric.mass, 0.001);
			}
			var raceHeight = "heightMetric";
			var raceWeight = "weightMetric";
		}

		var totalInc = FldsGameMech.length + FldsWeight.length + FldsCalc.length + MIfldsCalc.length + 2;

		for (var C = 0; C < FldsGameMech.length; C++) {
			var theValue = What(FldsGameMech[C]);
			if (theValue) {
				Value(FldsGameMech[C], tDoc[conStr](theValue, 0.5));
			}
			thermoM(C/totalInc); //increment the progress dialog's progress
		}
		for (C = 0; C < FldsWeight.length; C++) {
			var theValue = What(FldsWeight[C]);
			if (theValue) {
				Value(FldsWeight[C], weightConv(theValue));
			}
			thermoM((FldsGameMech.length + C)/totalInc); //increment the progress dialog's progress
		}
		for (C = 0; C < FldsCalc.length; C++) {
			if (CurrentFeats.known[C] && FeatsList[CurrentFeats.known[C]].calculate) {
				var theCalc = FeatsList[CurrentFeats.known[C]].calculate;
				tDoc.getField(FldsCalc[C]).setAction("Calculate", tDoc[conStr](theCalc, 0.5));
				thermoM((FldsGameMech.length + FldsWeight.length + C)/totalInc); //increment the progress dialog's progress
			}
		}
		for (C = 0; C < MIfldsCalc.length; C++) {
			if (CurrentMagicItems.known[C] && MagicItemsList[CurrentMagicItems.known[C]].calculate) {
				var theCalc = MagicItemsList[CurrentMagicItems.known[C]].calculate;
				tDoc.getField(MIfldsCalc[C]).setAction("Calculate", tDoc[conStr](theCalc, 0.5));
				thermoM((FldsGameMech.length + FldsWeight.length + FldsCalc.length + C)/totalInc); //increment the progress dialog's progress
			}
		}
		if (What("Height")) {
			Value("Height", tDoc[conStr](What("Height"), 0.01, true, true));
		}
		if (What("Weight")) {
			Value("Weight", tDoc[conStr](What("Weight"), 0.01, true));
		}
		if (CurrentRace.known) {
			if (CurrentRace[raceHeight]) {
				AddTooltip("Height", CurrentRace.plural + CurrentRace[raceHeight]);
			}
			if (CurrentRace[raceWeight]) {
				AddTooltip("Weight", CurrentRace.plural + CurrentRace[raceWeight]);
			}
			if (CurrentRace.speed[0]) {
				var tempString = tDoc[conStr](tDoc.getField("Speed").userName, 0.5);
				AddTooltip("Speed", tempString);
				AddTooltip("Speed encumbered", tempString);
			}
		}
		thermoM((totalInc - 1)/totalInc); //increment the progress dialog's progress

		for (var p = 0; p < AScompA.length; p++) {
			prefix = AScompA[p];
			if (What(prefix + "Comp.Desc.Height")) {
				Value(prefix + "Comp.Desc.Height", tDoc[conStr](What(prefix + "Comp.Desc.Height"), 0.01, true, true));
			}
			if (What(prefix + "Comp.Desc.Weight")) {
				Value(prefix + "Comp.Desc.Weight", tDoc[conStr](What(prefix + "Comp.Desc.Height"), 0.01, true));
			}
			if (CurrentCompRace[prefix] && CurrentCompRace[prefix].known && CurrentCompRace[prefix].typeFound === "race") {
				if (CurrentCompRace[prefix][raceHeight]) {
					AddTooltip("Height", CurrentCompRace[prefix].plural + CurrentCompRace[prefix][raceHeight]);
				}
				if (CurrentCompRace[prefix][raceWeight]) {
					AddTooltip("Weight", CurrentCompRace[prefix].plural + CurrentCompRace[prefix][raceWeight]);
				}
			}
		}

		//run through all the spells fields with a description and re-do the description
		for (var Sa = 0; Sa < spellsArray.length; Sa++) {
			ApplySpell(spellsArray[Sa][0], spellsArray[Sa][1]);
		}

	} else if (!minVer && SetUnitDecimals_Dialog.bDec !== decSep) { //or if only the decimal separator has been changed
		thermoTxt = thermoM("Converting to " + SetUnitDecimals_Dialog.bDec + " decimal separator...", false); //change the progress dialog text
		setListsUnitSystem(unitSys); //update some variables
		Value("Decimal Separator", SetUnitDecimals_Dialog.bDec);

		FldsWeight.push("Total Experience");
		FldsWeight.push("Add Experience");
		FldsWeight.push("Platinum Pieces");
		FldsWeight.push("Gold Pieces");
		FldsWeight.push("Electrum Pieces");
		FldsWeight.push("Silver Pieces");
		FldsWeight.push("Copper Pieces");
		FldsGameMech.push("Height");
		FldsGameMech.push("Weight");

		for (var p = 0; p < AScompA.length; p++) {
			prefix = AScompA[p];
			FldsGameMech.push(prefix + "Comp.Desc.Height");
			FldsGameMech.push(prefix + "Comp.Desc.Weight");
		}

		var totalInc = FldsGameMech.length + FldsWeight.length;

		for (var D = 0; D < FldsGameMech.length; D++) {
			var theValue = What(FldsGameMech[D]);
			if (theValue) {
				Value(FldsGameMech[D], UpdateDecimals(theValue));
			}
			thermoM(D/totalInc); //increment the progress dialog's progress
		}

		for (D = 0; D < FldsWeight.length; D++) {
			Value(FldsWeight[D], What(FldsWeight[D]));
			thermoM((FldsGameMech.length + D)/totalInc); //increment the progress dialog's progress
		}
	} else if (tDoc.info.SpellsOnly && SetUnitDecimals_Dialog.bSys !== unitSys) { //do something if the unit system was changed
		thermoTxt = thermoM("Converting to " + SetUnitDecimals_Dialog.bSys + "...", false); //change the progress dialog text
		Value("Unit System", SetUnitDecimals_Dialog.bSys);
		Value("Decimal Separator", SetUnitDecimals_Dialog.bDec);
		//run through all the spells fields with a description and re-do the
		for (var Sa = 0; Sa < spellsArray.length; Sa++) {
			ApplySpell(spellsArray[Sa][0], spellsArray[Sa][1]);
		}
	} else if (tDoc.info.AdvLogOnly) {
		Value("Unit System", SetUnitDecimals_Dialog.bSys);
		Value("Decimal Separator", SetUnitDecimals_Dialog.bDec);
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

function SetTextOptions_Button() {
	var FontSize = CurrentVars.fontsize !== undefined ? CurrentVars.fontsize : typePF ? 7 : 5.74;
	var nowFont = tDoc.getField((tDoc.info.AdvLogOnly ? "AdvLog." : "") + "Player Name").textFont;
	var FontDef = typePF ? "SegoeUI" : "SegoePrint";
	var FontDefSize = typePF ? 7 : 5.74;
	if (FontList[nowFont]) FontDefSize = FontList[nowFont];

	var fontArray = {};
	for (var fo in FontList) {
		if (fo !== nowFont) {
			fontArray[fo] = -1;
		} else {
			fontArray[fo] = 1;
		}
	};
	SetTextOptions_Dialog.bSize = FontSize.toString();
	SetTextOptions_Dialog.bDefSize = FontDefSize;
	SetTextOptions_Dialog.bDefFont = FontDef;
	SetTextOptions_Dialog.bDefSizeSheet = FontList[FontDef];
	SetTextOptions_Dialog.bFont = nowFont;
	SetTextOptions_Dialog.bFontsArray = fontArray;

	// Call the dialog and do something if ok is pressed
	if (app.execDialog(SetTextOptions_Dialog) === "ok") {
		if (SetTextOptions_Dialog.bSize !== FontSize) {
			ToggleTextSize(SetTextOptions_Dialog.bSize);
		}
		if (SetTextOptions_Dialog.bFont !== nowFont) {
			ChangeFont(SetTextOptions_Dialog.bFont);
		}
	}
};

//Make menu for the button on each Attack line and parse it to Menus.attacks
function MakeWeaponMenu() {
	var QI = event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);

	var menuLVL1 = function (item, array, setDisabled) {
		for (var i = 0; i < array.length; i++) {
			var disable = setDisabled;
			if ((array[i] === "Move up" && itemNmbr === 1) || (array[i] === "Move down" && itemNmbr === maxItems) || (array[i] === "Insert empty attack" && (!theField || itemNmbr === maxItems))) {
				disable = true;
			} else if (!theField && !isEquipment && array[i] === "Copy to Adventuring Gear (page 2)") {
				disable = true;
			}
			item.push({
				cName : array[i],
				cReturn : array[i],
				bEnabled : !disable
			});
		}
	};

	var menuLVL2 = function (menu, name, array) {
		menu.cName = name;
		menu.oSubMenu = [];
		var lookIt = What(prefix + "BlueText." + Q + "Attack." + itemNmbr + ".Weight Title");
		for (var i = 0; i < array.length; i++) {
			menu.oSubMenu.push({
				cName : array[i].capitalize(),
				cReturn : name + "#" + array[i],
				bMarked : lookIt === array[i]
			})
		}
	};

	//make the attack menu
	var attackMenu = [];
	var itemNmbr = Number(event.target.name.slice(-1));
	var maxItems = QI ? FieldNumbers.attacks : 3;
	var theField = !CurrentVars.manual.attacks ? What(prefix + Q + "Attack." + itemNmbr + ".Weapon Selection") : What(prefix + Q + "Attack." + itemNmbr + ".Weapon");
	var theWea = CurrentWeapons.known[itemNmbr - 1];
	var isWeapon = QI && ((!theWea[0] && CurrentWeapons.field[itemNmbr - 1]) || (theWea[0] && WeaponsList[theWea[0]].weight));
	var isEquipment = QI && What("BlueText.Attack." + itemNmbr + ".Weight") && (CurrentVars.manual.attacks || isWeapon) ? true : false;

	//decide what items to put on there
	var menuItems = [["Move up", "Move down"], ["-", "Copy to Adventuring Gear (page 2)"], ["-", "Insert empty attack", "Delete attack", "Clear attack"]];
	var attackMenuItems = QI ? menuItems[0].concat(menuItems[1]).concat(menuItems[2]) : menuItems[0].concat(menuItems[2]);
	menuLVL1(attackMenu, attackMenuItems);

	if (!typePF) {
		//make the color menu
		var ColorMenu = {};
		var ColorArray = ["black"]; //add a black option

		//add all the colours to the tempArray, ommitting some if not using the full (bonus) version
		for (var key in ColorList) {
			ColorArray.push(key);
		};
		ColorArray.sort();
		ColorArray.unshift("same as headers", "same as dragon heads", "-");
		menuLVL2(ColorMenu, "Outline Color", ColorArray);

		//add the colormenu to the attack menu
		attackMenu.push({cName : "-"});
		attackMenu.push(ColorMenu);
	}

	if (QI) menuLVL1(attackMenu, ["-", "Show what things are affecting the attack calculations"], CurrentEvals.atkAdd || CurrentEvals.atkCalc ? false : true);

	//set the complete menu as the global variable
	Menus.attacks = attackMenu;
};

//call the weapon menu and do something with the results
function WeaponOptions() {
	var MenuSelection = getMenu("attacks");

	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying attack menu option...");
	calcStop();

	var QI = event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var maxItems = QI ? FieldNumbers.attacks : 3;

	var itemNmbr = Number(event.target.name.slice(-1));
	var FieldNames = [
		["", ".Weapon"], //0
		["", ".To Hit"], //1
		["", ".Damage"], //2
		["", ".Weapon Selection"], //3
		["", ".Proficiency"], //4
		["", ".Mod"], //5
		["", ".Range"], //6
		["BlueText.", ".Weight"], //7
		["", ".Damage Type"], //8
		["BlueText.", ".To Hit Bonus"], //9
		["BlueText.", ".Damage Bonus"], //10
		["BlueText.", ".Damage Die"], //11
		["", ".Description"], //12
		["BlueText.", ".Weight Title"], //13
	];
	var Fields = [], FieldsValue = [], FieldsUp = [], FieldsUpValue = [], FieldsDown = [], FieldsDownValue = [];

	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(prefix + FieldNames[F][0] + Q + "Attack." + itemNmbr + FieldNames[F][1]);
		FieldsValue.push(What(Fields[F]));
		if (itemNmbr !== 1) {
			FieldsUp.push(prefix + FieldNames[F][0] + Q + "Attack." + (itemNmbr - 1) + FieldNames[F][1]);
			FieldsUpValue.push(What(FieldsUp[F]));
		}
		if (itemNmbr !== maxItems) {
			FieldsDown.push(prefix + FieldNames[F][0] + Q + "Attack." + (itemNmbr + 1) + FieldNames[F][1]);
			FieldsDownValue.push(What(FieldsDown[F]));
		}
	}
	var IconFld = !typePF ? tDoc.getField(prefix + "Image." + Q + "Attack." + itemNmbr).buttonGetIcon() : "";
	var findWeaps = false;
	switch (MenuSelection[0]) {
	 case "move up":
		thermoTxt = thermoM("Moving the attack up...", false); //change the progress dialog text
		IsNotWeaponMenu = false;
		for (var H = 0; H < FieldNames.length; H++) {
			Value(FieldsUp[H], FieldsValue[H]);
			Value(Fields[H], FieldsUpValue[H]);
			if (!QI && (/description/i).test(Fields[H])) SwapTooltip(FieldsUp[H], Fields[H])
			thermoM(H/FieldNames.length); //increment the progress dialog's progress
		};
		if (!typePF) {
			var IconUp = tDoc.getField(prefix + "Image." + Q + "Attack." + (itemNmbr - 1)).buttonGetIcon();
			tDoc.getField(prefix + "Image." + Q + "Attack." + (itemNmbr - 1)).buttonSetIcon(IconFld);
			tDoc.getField(prefix + "Image." + Q + "Attack." + itemNmbr).buttonSetIcon(IconUp);
		}
		IsNotWeaponMenu = true;
		findWeaps = true;
		break;
	 case "move down":
		thermoTxt = thermoM("Moving the attack down...", false); //change the progress dialog text
		IsNotWeaponMenu = false;
		for (var H = 0; H < FieldNames.length; H++) {
			Value(FieldsDown[H], FieldsValue[H]);
			Value(Fields[H], FieldsDownValue[H]);
			if (!QI && (/description/i).test(Fields[H])) SwapTooltip(FieldsDown[H], Fields[H])
			thermoM(H/FieldNames.length); //increment the progress dialog's progress
		};
		if (!typePF) {
			var IconDown = tDoc.getField(prefix + "Image." + Q + "Attack." + (itemNmbr + 1)).buttonGetIcon();
			tDoc.getField(prefix + "Image." + Q + "Attack." + (itemNmbr + 1)).buttonSetIcon(IconFld);
			tDoc.getField(prefix + "Image." + Q + "Attack." + itemNmbr).buttonSetIcon(IconDown);
		}
		IsNotWeaponMenu = true;
		findWeaps = true;
		break;
	 case "copy to adventuring gear (page 2)":
		thermoTxt = thermoM("Copying the attack to the equipment on page 2...", false); //change the progress dialog text
		AddToInv("gear", "r", FieldsValue[3], "", FieldsValue[7], "", false, false, false, true);
		break;
	 case "insert empty attack":
		thermoTxt = thermoM("Inserting empty attack...", false); //change the progress dialog text
		WeaponInsert(itemNmbr);
		break;
	 case "delete attack":
		thermoTxt = thermoM("Deleting attack...", false); //change the progress dialog text
		WeaponDelete(itemNmbr);
		break;
	 case "clear attack":
		thermoTxt = thermoM("Clearing attack...", false); //change the progress dialog text
		tDoc.resetForm(Fields);
		if (!QI) AddTooltip(Fields[12], "Description and notes");
		//reset the color outline
		ApplyAttackColor(itemNmbr);
		findWeaps = true;
		break;
	 case "outline color":
		thermoTxt = thermoM("Changing the attack outline color...", false); //change the progress dialog text
		ApplyAttackColor(itemNmbr, MenuSelection[1]);
		break;
	 case "show what things are affecting the attack calculations":
		var atkCalcStr = StringEvals("atkStr");
		if (atkCalcStr) ShowDialog("Things Affecting the Attack Calculations", atkCalcStr);
		break;
	}

	//re-populate the CurrentWeapons variable because of the thing that just changed
	if (findWeaps && QI) {
		FindWeapons();
	} else if (findWeaps) {
		FindCompWeapons(undefined, prefix);
	}

	thermoM(thermoTxt, true); // Stop progress bar
};

//insert a weapon at the position wanted
function WeaponInsert(itemNmbr) {
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var maxItems = QI ? FieldNumbers.attacks : 3;
	var theField = !CurrentVars.manual.attacks ? ".Weapon Selection" : ".Weapon";

	//stop the function if the selected slot is already empty
	if (What(prefix + Q + "Attack." + itemNmbr + theField) === "") {
		return;
	}

	//look for the first empty slot below the slot
	var endslot = "";
	for (var i = itemNmbr + 1; i <= maxItems; i++) {
		if (What(prefix + Q + "Attack." + i + theField) === "") {
			endslot = i;
			i = (maxItems + 1);
		}
	}

	var FieldNames = [
		["", ".Weapon"], //0
		["", ".To Hit"], //1
		["", ".Damage"], //2
		["", ".Weapon Selection"], //3
		["", ".Proficiency"], //4
		["", ".Mod"], //5
		["", ".Range"], //6
		["BlueText.", ".Weight"], //7
		["", ".Damage Type"], //8
		["BlueText.", ".To Hit Bonus"], //9
		["BlueText.", ".Damage Bonus"], //10
		["BlueText.", ".Damage Die"], //11
		["", ".Description"], //12
		["BlueText.", ".Weight Title"], //13
	];
	var Fields = [];
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(prefix + FieldNames[F][0] + Q + "Attack." + itemNmbr + FieldNames[F][1]);
	}

	//only continue if an empty slot was found in the fields
	if (endslot) {
		//cycle to the slots starting with the empty one and add the values of the one above
		IsNotWeaponMenu = false;
		for (var i = endslot; i > itemNmbr; i--) {
			//move the values
			for (var H = 0; H < FieldNames.length; H++) {
				var fromFld = prefix + FieldNames[H][0] + Q + "Attack." + (i - 1) + FieldNames[H][1];
				Value(prefix + FieldNames[H][0] + Q + "Attack." + i + FieldNames[H][1], What(fromFld), !QI && (/description/i).test(FieldNames[H][1]) ? Who(fromFld) : undefined);
			}
			if (!typePF) {
				var theIcon = tDoc.getField(prefix + "Image." + Q + "Attack." + (i - 1)).buttonGetIcon();
				tDoc.getField(prefix + "Image." + Q + "Attack." + i).buttonSetIcon(theIcon);
			}
		}

		//empty the selected slot
		tDoc.resetForm(Fields);
		if (!QI) AddTooltip(Fields[12], "Description and notes");
		IsNotWeaponMenu = true;

		//re-populate the CurrentWeapons variable because of the thing that just changed
		if (QI) {
			FindWeapons();
		} else {
			FindCompWeapons(undefined, prefix);
		}
	}
}

//delete a weapon at the position wanted and move the rest up
function WeaponDelete(itemNmbr) {
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var maxItems = QI ? FieldNumbers.attacks : 3;

	var FieldNames = [
		["", ".Weapon"], //0
		["", ".To Hit"], //1
		["", ".Damage"], //2
		["", ".Weapon Selection"], //3
		["", ".Proficiency"], //4
		["", ".Mod"], //5
		["", ".Range"], //6
		["BlueText.", ".Weight"], //7
		["", ".Damage Type"], //8
		["BlueText.", ".To Hit Bonus"], //9
		["BlueText.", ".Damage Bonus"], //10
		["BlueText.", ".Damage Die"], //11
		["", ".Description"], //12
		["BlueText.", ".Weight Title"], //13
	];
	var Fields = [];
	var EndFields = [];
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(prefix + FieldNames[F][0] + Q + "Attack." + itemNmbr + FieldNames[F][1]);
		EndFields.push(prefix + FieldNames[F][0] + Q + "Attack." + maxItems + FieldNames[F][1]);
	}

	//delete the currently selected line so that the weapons code is removed as well
	tDoc.resetForm(Fields);

	//move every line up one space, starting with the selected line
	IsNotWeaponMenu = false;
	for (var i = itemNmbr; i < maxItems; i++) {
		if (!typePF) {
			//move the images, for every line that contains a weapon
			var theColorField = prefix + "BlueText." + Q + "Attack." + (i + 1) + ".Weight Title";
			if (!QI || (i !== (maxItems - 1) && What(theColorField) !== tDoc.getField(theColorField).defaultValue)) {
				var theIcon = tDoc.getField(prefix + "Image." + Q + "Attack." + (i + 1)).buttonGetIcon();
				tDoc.getField(prefix + "Image." + Q + "Attack." + i).buttonSetIcon(theIcon);
			}
		}

		//move the values
		for (var H = 0; H < FieldNames.length; H++) {
			var fromFld = prefix + FieldNames[H][0] + Q + "Attack." + (i + 1) + FieldNames[H][1];
			Value(prefix + FieldNames[H][0] + Q + "Attack." + i + FieldNames[H][1], What(fromFld), !QI && (/description/i).test(FieldNames[H][1]) ? Who(fromFld) : undefined);
		};
	}

	//delete the contents of the final line
	tDoc.resetForm(EndFields);
	if (!QI) AddTooltip(EndFields[12], "Description and notes");

	//reset the final line's image to the default
	ApplyAttackColor(maxItems, "");
	IsNotWeaponMenu = true;

	//re-populate the CurrentWeapons variable because of the thing that just changed
	if (QI) {
		FindWeapons();
	} else {
		FindCompWeapons(undefined, prefix);
	}
}

//show (true) or hide (false) the subsection of "attuned magical items" in the adventure gear table
function ShowAttunedMagicalItems(currentstate) {
	if (currentstate === undefined) currentstate = !eval(What("Adventuring Gear Remember"));
	var ExtraLine = [
		"Adventuring Gear Row " + FieldNumbers.gearMIrow,
		"Adventuring Gear Amount " + FieldNumbers.gearMIrow,
		"Adventuring Gear Weight " + FieldNumbers.gearMIrow
	]
	var MagicItems = [
		"Attuned Magic Items Whiteout",
		"Attuned Magic Items Title"
	]
	if (!typePF) MagicItems.push("Line.adventuringGear");
	if (!currentstate) {
		var HideShow = "Hide";
		var ShowHide = "Show";
		var NoPrintHide = "DontPrint";
	} else {
		var HideShow = "Show";
		var ShowHide = "Hide";
		var NoPrintHide = "Hide";
	}
	if (currentstate || What("Gear Location Remember").split(",")[0] === "true") {
		ExtraLine.push("Adventuring Gear Location.Row " + FieldNumbers.gearMIrow);
	}
	for (var E = 0; E < ExtraLine.length; E++) {
		tDoc[ShowHide](ExtraLine[E]);
	}
	tDoc[NoPrintHide]("Adventuring Gear Button " + FieldNumbers.gearMIrow)
	for (var M = 0; M < MagicItems.length; M++) {
		tDoc[HideShow](MagicItems[M]);
	}
	Value("Adventuring Gear Remember", !currentstate);
}

//hide (true) or show (false) the location column in the adventure gear or extra equipment table
function HideInvLocationColumn(type, currentstate) {
	var total = type === "Extra.Gear " ? FieldNumbers.extragear : FieldNumbers.gear;
	var suffix = type === "Extra.Gear " ? ".1" : "";
	//change the size of the gear input rows
	if (currentstate) {
		var HideShow = "Hide";
		var widen = !typePF ? 12 : 16;
	} else {
		var HideShow = "Show";
		var widen = !typePF ? -12 : -16;
	}
	for (var i = 1; i <= total; i++) {
		var RowName = tDoc.getField(type + "Row " + i + suffix);
		var gRect = RowName.rect; // get the location of the field on the sheet
		gRect[2] += widen; // add the widen amount to the lower right x-coordinate
		RowName.rect = gRect; // Update the value of b.rect
		RowName.value = RowName.value; //re-input the value as to counteract the changing of font
	}
	if (typePF || (type === "Extra.Gear " && What("Extra.Layers Remember").split(",")[1] === "equipment") || type === "Adventuring Gear ") { //only show things on the third page, if the extra equipment section is visible
		tDoc[HideShow](type + "Location");
		if (!currentstate && type === "Adventuring Gear " && What("Adventuring Gear Remember") === false) {
			Hide("Adventuring Gear Location.Row " + FieldNumbers.gearMIrow);
		}
	}
	var theState = What("Gear Location Remember").split(",");
	theState = type === "Extra.Gear " ? [theState[0], !currentstate] : [!currentstate, theState[1]];
	Value("Gear Location Remember", theState);
};

//put the ability save DC right, and show both if more than one race/class with ability save DC
function SetTheAbilitySaveDCs() {
	var AbilitySaveArray = [];

	//check all the classes
	for (var aClass in classes.known) {
		var CurrentAbilitySave = CurrentClasses[aClass].abilitySave;
		if (CurrentAbilitySave && AbilitySaveArray.indexOf(CurrentAbilitySave) === -1) {
			AbilitySaveArray.push(CurrentAbilitySave);
		}
	}

	//check the race
	var CurrentAbilitySave = CurrentRace.abilitySave;
	if (CurrentAbilitySave && AbilitySaveArray.indexOf(CurrentAbilitySave) === -1) {
		AbilitySaveArray.push(CurrentAbilitySave);
	}

	//put the ability save DC right, and show both if more than one class with ability save DC
	if (AbilitySaveArray[0]) {
		PickDropdown("Spell DC 1 Mod", AbilitySaveArray[0]);
	} else {
		PickDropdown("Spell DC 1 Mod", 0);
	}

	if (AbilitySaveArray[1]) {
		Toggle2ndAbilityDC("show");
		PickDropdown("Spell DC 2 Mod", AbilitySaveArray[1]);
	} else {
		Toggle2ndAbilityDC("hide");
	}
}

//remove the item at the line number, and move all things below it up so that no empty line is left
//Type is the name of the field without the number; Line is the number of the line; Total is the total amount of fields there are
function DeleteItemType(Type, Line, Total) {
	//move every line up one space, starting with the selected line
	for (var D = Line; D < Total; D++) {
		Value(Type + D, What(Type + (D + 1)), Who(Type + (D + 1)), How(Type + (D + 1)));
	};

	//delete the contents of the final line
	tDoc.resetForm([Type + Total]);
	//set the tooltip of the final line to nothing
	AddTooltip(Type + Total, "", "");
}

//set the global variable for the form field highlighting; and reset it if applicable
function SetHighlighting() {
	if (!IsNotReset) { //if called during a reset
		//set the remember highlight colour to the sheet's default
		tDoc.getField("Highlighting").fillColor = ["RGB", 0.9, 0.9, 1];
		AddTooltip("Highlighting", "sheet default");
		Highlighting.rememberState = eval(What("Highlighting"));
		Highlighting.rememberColor = tDoc.getField("Highlighting").fillColor;
	}
	app.runtimeHighlight = Highlighting.rememberState;
	app.runtimeHighlightColor = Highlighting.rememberColor;
}

//set spell slots checkboxes, use the value of the field to set the picture and right checkbox form fields [through field validation]
var ignoreSetSpellSlotsCheckboxes = false;
function SetSpellSlotsCheckboxes(SpellLVL, theSlots, onlyDisplay) {
	if (ignoreSetSpellSlotsCheckboxes) return;
	calcStop();
	var tempNr = What("Template.extras.SSfront").split(",").length;

	//now set the fields of the prefix type, or non-prefix type, depending on which one was just set
	if (!onlyDisplay && tempNr > 1) {
		var otherPrefix = event.target && event.target.name.indexOf("SpellSlots") !== 0 ? "" : What("Template.extras.SSfront").split(",")[1];
		ignoreSetSpellSlotsCheckboxes = true;
		Value(otherPrefix + "SpellSlots.CheckboxesSet.lvl" + SpellLVL, theSlots);
		ignoreSetSpellSlotsCheckboxes = false;
	}

	if (!onlyDisplay && What("SpellSlotsRemember") === "[false,false]") return;

	var startTry = minVer && !typePF ? 2 : 1;
	var maxTries = tempNr + (typePF || minVer ? 0 : 1);
	for (var s = startTry; s <= maxTries; s++) {
		var suffix = s === 1 || typePF ? "" : "2";
		var prefix = s === maxTries && tempNr > 1 ? What("Template.extras.SSfront").split(",")[1] : "";
		var isDisplayed = typePF || tDoc.getField(prefix + "Image.SpellSlots" + suffix + ".List").display === display.visible;
		var ExtraFld = prefix + "SpellSlots" + suffix + ".Extra.lvl" + SpellLVL;
		if (parseFloat(theSlots) > 4) {
			Value(ExtraFld, "OF " + parseFloat(theSlots));
			Slots = 4;
		} else {
			Value(ExtraFld, "");
			Slots = parseFloat(theSlots);
		}

		var BoxesFld = [
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".mid", //0
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".top1", //1
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".top2.1", //2
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".top2.2", //3
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".bottom1", //4
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".bottom2.1", //5
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".bottom2.2", //6
		];

		//reset the checkboxes form fields so all are empty and hidden
		tDoc.resetForm(BoxesFld);
		for (var i = 0; i < BoxesFld.length; i++) {
			Hide(BoxesFld[i]);
		}
		ClearIcons(prefix + "Image.SpellSlots" + suffix + ".Checkboxes." + SpellLVL);

		//set the right image and show form fields depending on the number entered and whether or not the field is even visible
		if (isDisplayed && Slots > 0) { //only go ahead if there are more than 0 slots to be done
			var theIcon = tDoc.getField("SaveIMG.SpellSlots." + Slots).buttonGetIcon();
			tDoc.getField(prefix + "Image.SpellSlots" + suffix + ".Checkboxes." + SpellLVL).buttonSetIcon(theIcon);
			switch (Slots) {
			 case 1:
				 Show(BoxesFld[0]);
				 break;
			 case 2:
				 Show(BoxesFld[1]);
				 Show(BoxesFld[4]);
				 break;
			 case 3:
				 Show(BoxesFld[2]);
				 Show(BoxesFld[3]);
				 Show(BoxesFld[4]);
				 break;
			 case 4:
				 Show(BoxesFld[2]);
				 Show(BoxesFld[3]);
				 Show(BoxesFld[5]);
				 Show(BoxesFld[6]);
				 break;
			}
		}
	}
}

//show the spell slot section (Toggle = "Off") or hide it (Toggle = "On")
function SetSpellSlotsVisibility() {
	if (!IsNotReset) {
		Hide("Image.SpellPoints");
		Hide("SpellSlots.Checkboxes.SpellPoints");
	}
	if (typePF) return; //don't do this function in the Printer-Friendly version
	calcStop();

	MakeMobileReady(false); // Undo flatten, if needed

	var toShow = eval(What("SpellSlotsRemember"));

	//define a function to show (showOrHide = true) or hide (showOrHide = false) all the spellslots; suffix is "" or "2"
	var doSpellSlots = function(showOrHide, suffix, prefix) {
		var HiddenVisible = showOrHide ? "Hide" : "Show";
		var VisibleHidden = showOrHide ? "Show" : "Hide";
		var NoPrintHidden = showOrHide && CurrentVars.bluetxt ? "DontPrint" : "Hide";
		var HiddenNoPrint = showOrHide ? "Hide" : "DontPrint";

		//the ones that only apply to the first page
		if (suffix !== 2) {
			var SpellSlotsFields0 = [
				"Text.Header.SpellSlots",
				"Line.SpellSlots"
			]
			var LimitedFeatureFields = [
				"Image.LimitedFeatures.Full"
			];
			var LimitedFeatureButtons = [];
			//append the LimitedFeatureFields array with the fillable form fields
			for (var i = 6; i <= 8; i++) {
				LimitedFeatureFields.push("Limited Feature " + i);
				LimitedFeatureFields.push("Limited Feature Max Usages " + i);
				LimitedFeatureFields.push("Limited Feature Recovery " + i);
				LimitedFeatureFields.push("Limited Feature Used " + i);
				LimitedFeatureButtons.push("Button.Limited Feature " + i);
			};

			//show or hide the fields of the bottom 3 limited features
			for (var i = 0; i < LimitedFeatureFields.length; i++) {
				tDoc[HiddenVisible](LimitedFeatureFields[i]);
			};
			//show or hide the buttons of the bottom 3 limited features
			for (var i = 0; i < LimitedFeatureButtons.length; i++) {
				tDoc[HiddenNoPrint](LimitedFeatureButtons[i]);
			};
			//show or hide the fields of the spell slots that are ony on the first page
			for (var i = 0; i < SpellSlotsFields0.length; i++) {
				tDoc[VisibleHidden](SpellSlotsFields0[i]);
			};
		}

		var SpellSlotFields = [
			prefix + "Image.SpellSlots" + suffix,
			prefix + "SpellSlots" + suffix + ".Extra"
		];

		//show or hide the fields of the spell slots
		for (var i = 0; i < SpellSlotFields.length; i++) {
			tDoc[VisibleHidden](SpellSlotFields[i]);
		};

		var extrasuffix = minVer ? "" : (suffix !== 2 ? ".0" : (prefix ? "" : ".1"));

		//show the bluetext fields, if appropriate
		for (var i = 1; i <= 9; i++) {
			tDoc[NoPrintHidden](prefix + "SpellSlots.CheckboxesSet.lvl" + i + extrasuffix);
		}
	}

	//see if we need to hide or show the Spell Slots on the first page
	if (!minVer) {
		var display1 = tDoc.getField("Image.SpellSlots.List").display === display.visible;
		if (display1 !== toShow[0]) doSpellSlots(toShow[0], "", "");
	} else {
		var display1 = toShow[0];
	}

	//see if we need to hide or show the Spell Slots on the spell sheet page
	var prefix = What("Template.extras.SSfront").split(",")[1];
	var display2 = tDoc.getField("Image.SpellSlots2.List").display === display.visible;
	if (display2 !== toShow[1]) {
		doSpellSlots(toShow[1], 2, "");
		if (prefix) doSpellSlots(toShow[1], 2, prefix);
	}

	//update the checkbox fields of the spell slots if any changes have been made
	if (display1 !== toShow[0] || display2 !== toShow[1]) {
		for (var i = 1; i <= 9; i++) {
			SetSpellSlotsCheckboxes(i, What("SpellSlots.CheckboxesSet.lvl" + i), true);
		}
	}
}

//determine the types of locations there are, and add them to the corresponding fields to calculate their subtotals in weight carried [through field format]
function SetCarriedLocations() {
	var type = event.target.name.substring(0,10) === "Extra.Gear" ? "Extra.Gear " : "Adventuring Gear ";
	var row = parseFloat(event.target.name.slice(-2));
	var total = type === "Extra.Gear " ? FieldNumbers.extragear : FieldNumbers.gear;
	var theEvent = clean(event.target.value, " ");
	var locationList = [];
	var locationTestList = [];
	//loop through all the fields and add any found locations to the array
	for (var i = 1; i <= total; i++) {
		var theLoc = clean(What(type + "Location.Row " + i), " ");
		if (i !== row && theLoc !== "" && locationTestList.indexOf(theLoc.toLowerCase()) === -1) {
			locationList.push(theLoc);
			locationTestList.push(theLoc.toLowerCase());
		} else if (i === row && theEvent !== "" && locationTestList.indexOf(theEvent.toLowerCase()) === -1) {
			locationList.push(theEvent);
			locationTestList.push(theEvent.toLowerCase());
		}
	}
	locationList.sort();
	//loop through the list of locations and add the first 6 found to the subtotal fields
	var locationFields = type === "Extra.Gear " || !typePF ? 6 : 9;
	for (var i = 0; i < locationFields; i++) {
		var aLoc = locationList[i] ? locationList[i] : "";
		Value(type + "Location.SubtotalName " + (i + 1), aLoc);
	}
}

//calculate the subtotal for a given gear location [field calculation]
function CalcCarriedLocation() {
	var type = event.target.name.substring(0,10) === "Extra.Gear" ? "Extra.Gear " : "Adventuring Gear ";
	var number = parseFloat(event.target.name.slice(-1));
	var total = type === "Extra.Gear " ? FieldNumbers.extragear : FieldNumbers.gear;
	var toSearch = clean(What(type + "Location.SubtotalName " + number));
	if (toSearch !== "") {
		var totalweight = 0;
		for (var i = 1; i <= total; i++) {
			var theLoc = clean(What(type + "Location.Row " + i), " ").RegEscape();
			if ((RegExp("\\b" + toSearch + "\\b", "i")).test(theLoc)) {
				var amount = What(type + "Amount " + i);
				var weight = What(type + "Weight " + i);
				if (amount && isNaN(amount) && amount.indexOf(",") !== -1) {
					amount = parseFloat(amount.replace(",", "."));
				}
				if (weight && isNaN(weight) && weight.indexOf(",") !== -1) {
					weight = parseFloat(weight.replace(",", "."));
				}

				if (weight) {
					if (amount === "" || isNaN(amount)) {
						totalweight += weight;
					} else {
						totalweight += amount * weight;
					}
				}
			}
		}
		event.value = totalweight;
	} else {
		event.value = "";
	}
}

//make the appropriate attack field a different color, depending on the menu entry
function ApplyAttackColor(attackNmbr, aColour, type, prefix) {
	if (typePF) return; //don't do this function in the Printer-Friendly version
	var QI = type ? type !== "Comp." : !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var prefixA = [""];
	if (!QI && event.target && event.target.name && !prefix) {
		prefixA = [getTemplPre(event.target.name, "AScomp", true)];
	} else if (!QI && prefix) {
		prefixA = [prefix];
	} else if (!QI && !prefix) {
		prefixA = What("Template.extras.AScomp").split(",");
	}
	var Q = QI ? "" : "Comp.Use.";
	var maxItems = QI ? FieldNumbers.attacks : 3;

	startNmbr = attackNmbr ? attackNmbr : 1;
	endNmbr = attackNmbr ? attackNmbr : maxItems;
	for (var pA = 0; pA < prefixA.length; pA++) {
		for (var a = startNmbr; a <= endNmbr; a++) {
			var colour = aColour ? aColour.toLowerCase() : What(prefixA[pA] + "BlueText." + Q + "Attack." + a + ".Weight Title");
			switch (colour) {
				case "same as headers" :
					colour = What("Color.Theme");
					break;
				case "same as dragon heads" :
					colour = What("Color.DragonHeads");
					break;
			}
			if (colour !== "black" && !ColorList[colour]) break;
			var theIcon = tDoc.getField("SaveIMG.Attack." + colour).buttonGetIcon();

			tDoc.getField(prefixA[pA] + "Image." + Q + "Attack." + a).buttonSetIcon(theIcon);
			if (aColour) Value(prefixA[pA] + "BlueText." + Q + "Attack." + a + ".Weight Title", aColour.toLowerCase());
		}
	}
}

//toggle the appearance of the button when it is pushed, cycling between nothing (black), proficiency (colour), and expertise (*) [field action]
function ToggleSkillProf() {
	var isProf = tDoc.getField(event.target.name.replace("Name", "Prof"));
	isProf.currentValueIndices = isProf.currentValueIndices < 2 ? isProf.currentValueIndices + 1 : 0;
}

//apply the change of the field to the colorscheme of the sheet [field format]
function ApplySkillProf() {
	var toChange = event.target.name.substring(0, event.target.name.length - 5);
	switch(event.target.value) {
		case "nothing":
			tDoc.getField(toChange).textColor = color.black;
			break;
		case "proficient":
		case "expertise":
			var theColor = ColorList[What("Color.Theme")];
			if (theColor) tDoc.getField(toChange).textColor = theColor.RGB;
	}
}

//set all the color schemes as the fields dictate
function setColorThemes(reset) {
	if (typePF) return; //don't do this function in the Printer-Friendly version
	ApplyColorScheme(reset ? tDoc.getField("Color.Theme").defaultValue : false);
	ApplyDragonColorScheme(reset ? tDoc.getField("Color.DragonHeads").defaultValue : false);
	ApplyHPDragonColorScheme(reset ? tDoc.getField("Color.HPDragon").defaultValue : false);
	var DCdefaultClrs = tDoc.getField("Color.DC").defaultValue.split(",");
	ApplyDCColorScheme(reset ? DCdefaultClrs[0] : false, 1);
	ApplyDCColorScheme(reset ? DCdefaultClrs[1] : false, 2);
	ApplyAttackColor("", "", "Default");
	ApplyAttackColor("", "", "Comp.");
}

//calculate the proficiency bonus (field calculation)
function ProfBonus() {
	var QI = getTemplPre(event.target.name, "AScomp");
	var lvl = What(QI === true ? "Character Level" : QI + "Comp.Use.HD.Level");
	var ProfMod = QI === true ? What("Proficiency Bonus Modifier") : 0;
	var useDice = tDoc.getField(QI === true ? "Proficiency Bonus Dice" : QI + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) === 1;
	var ProfB = lvl ? ProficiencyBonusList[Math.min(lvl, ProficiencyBonusList.length) - 1] : 0;
	event.target.submitName = ProfB + ProfMod;
	event.value = useDice || !lvl ? "" : event.target.submitName;
}

//show the proficiency die (field format)
function ProfBonusDisplay(input) {
	var QI = getTemplPre(event.target.name, "AScomp");
	var ProfB = QI === true ? event.target.submitName : input;
	var useDice = tDoc.getField(QI === true ? "Proficiency Bonus Dice" : QI + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) === 1;
	event.value = useDice ? GetProfDice(ProfB) : !isNaN(event.value) && event.value > 0 ? "+" + event.value : event.value;
}

function GetProfDice(ProfB) {
	var theReturn = "";
	if (ProfB >= 6) {
		theReturn = "d12";
	} else if (ProfB >= 5) {
		theReturn = "d10";
	} else if (ProfB >= 4) {
		theReturn = "d8";
	} else if (ProfB >= 3) {
		theReturn = "d6";
	} else if (ProfB !== "") {
		theReturn = "d4";
	}
	return theReturn;
}
//find the creature on the companion page
function ParseCreature(input) {
	var found = "";
	if (!input) return found;

	input = removeDiacritics(input).toLowerCase();
	var foundLen = 0;
	var foundDat = 0;
	var testLen = 0;

	for (var key in CreatureList) { //scan string for all creatures
		var kObj = CreatureList[key];

		if (testSource(key, kObj, "creaExcl")) continue; // test if the creature or its source isn't excluded

		if (input.indexOf(key) != -1) { // see if the text matches the key
			testLen = key.length;
		} else if (input.indexOf(kObj.name.toLowerCase()) != -1) { // see if the text matches the name
			testLen = kObj.name.length;
		} else {
			continue; // no match, so skip this one
		}

		// only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source. This differs from the regExpSearch objects
		var tempDate = sourceDate(kObj.source);
		if (testLen < foundLen || (testLen == foundLen && tempDate < foundDat)) continue;

		// we have a match, set the values
		found = key;
		foundLen = testLen;
		foundDat = tempDate;
	}
	return found;
};

//detects race entered and put information to global CurrentCompRace variable
function FindCompRace(inputcreatxt, aPrefix) {
	if (aPrefix) {
		var prefixA = [aPrefix];
	} else {
		var prefixA = What("Template.extras.AScomp").split(",");
	}
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		var tempString = inputcreatxt === undefined ? tDoc.getField(prefix + "Comp.Race").submitName : inputcreatxt;
		var oldKnown = CurrentCompRace[prefix] ? CurrentCompRace[prefix].known : undefined;
		var newCreaFound = ParseCreature(tempString);
		if (newCreaFound) {
			CurrentCompRace[prefix] = {};
			CurrentCompRace[prefix] = CreatureList[newCreaFound];
			CurrentCompRace[prefix].known = newCreaFound;
			CurrentCompRace[prefix].typeFound = "creature";
		} else {
			var newRaceFound = ParseRace(tempString);
			if (newRaceFound[0]) {
				CurrentCompRace[prefix] = {};
				CurrentCompRace[prefix].known = newRaceFound[0],
				CurrentCompRace[prefix].variant = newRaceFound[1],
				CurrentCompRace[prefix].typeFound = "race";

				// set the properties of the CurrentCompRace[prefix] object
				for (var prop in RaceList[newRaceFound[0]]) { // the properties of the main race
					if ((/^(known|variant|level)$/i).test(prop)) continue;
					CurrentCompRace[prefix][prop] = RaceList[newRaceFound[0]][prop];
				}
				if (newRaceFound[1]) { // the properties of the variant (overriding anything from the main)
					var subrace = newRaceFound[0] + "-" + newRaceFound[1];
					for (var prop in RaceSubList[subrace]) {
						if ((/^(known|variants?|level)$/i).test(prop)) continue;
						CurrentCompRace[prefix][prop] = RaceSubList[subrace][prop];
					}
				}
			}
		}
		if (inputcreatxt) { //if there was an input, return if it was different from the previously known or not
			if (CurrentCompRace[prefix] && CurrentCompRace[prefix].known && oldKnown !== CurrentCompRace[prefix].known) tDoc.getField(prefix + "Comp.Race").submitName = inputcreatxt;
			return !CurrentCompRace[prefix] || oldKnown === CurrentCompRace[prefix].known || !CurrentCompRace[prefix].known;
		}
	}
}

//a function to remove the strings added to Cnote.Left when making a familiar or mount
function resetCompTypes(prefix) {
	var theType = What(prefix + "Companion.Remember");
	if (!theType) return;
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Resetting the companion back to its default...");
	calcStop();
	RemoveString(prefix + "Cnote.Left", compString[theType].string);
	RemoveString(prefix + "Comp.Use.Features", compString[theType].featurestring);
	for (var i = 0; i < compString[theType].actions.length; i++) {
		RemoveAction(compString[theType].actions[i][0], compString[theType].actions[i][1], compString[theType].actionTooltip);
	}

	if (theType === "mount" || theType === "mechanicalserv") {
		//reset the languages
		var removeLangs = What(prefix + "Comp.Use.Features").match(/\u25C6 languages:.*/i);
		if (CurrentCompRace[prefix] && CurrentCompRace[prefix].known && removeLangs && CurrentCompRace[prefix].languages) {
			removeLangs = removeLangs[0];
			if (CurrentCompRace[prefix].typeFound === "race") {
				//make a string of the languages known to the features
				var languageString = "\u25C6 " + "Languages: ";
				var theEnd = CurrentCompRace[prefix].languages.length - 1;
				for (var l = 0; l <= theEnd; l++) {
					var divider = l === 0 ? "" : l === theEnd ? " and " : ", ";
					languageString += divider + CurrentCompRace[prefix].languages[l];
					languageString += l === theEnd ? "." : "";
				}
			} else if (CurrentCompRace[prefix].typeFound === "creature") {
				var languageString = "\u25C6 Languages: " + CurrentCompRace[prefix].languages + ".";
			}
			ReplaceString(prefix + "Comp.Use.Features", languageString, true, removeLangs, true);
		} else if (removeLangs) {
			RemoveString(prefix + "Comp.Use.Features", removeLangs[0]);
		}
	}

	if (CurrentCompRace[prefix] && CurrentCompRace[prefix].known && theType === "mount") {
		//reset the intelligence if the original creature had less than 6
		if (CurrentCompRace[prefix].typeFound === "creature" && CurrentCompRace[prefix].scores[3] < 6) {
			Value(prefix + "Comp.Use.Ability.Int.Score", CurrentCompRace[prefix].scores[3])
		}
	} else if (theType === "familiar" && CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound === "creature" && CurrentCompRace[prefix].attacks) {
		Value(prefix + "Comp.Use.Attack.perAction", CurrentCompRace[prefix].attacksAction); //set attacks per action
		//add any weapons the creature possesses
		for (var a = 0; a < CurrentCompRace[prefix].attacks.length; a++) {
			AddWeapon(CurrentCompRace[prefix].attacks[a].name);
		}
	} else if (theType === "companion") {
		UpdateRangerCompanions(0);
	} else if (theType === "companionrr") {
		UpdateRevisedRangerCompanions(0);
	} else if (theType === "mechanicalserv") {
		if (CurrentCompRace[prefix] && CurrentCompRace[prefix].known) {
			Value(prefix + "Comp.Desc.MonsterType", CurrentCompRace[prefix].type);
		};

		var removeDamI = What(prefix + "Comp.Use.Features").match(/\u25C6 damage immunities:.*/i);
		if (removeDamI && CurrentCompRace[prefix] && CurrentCompRace[prefix].known && CurrentCompRace[prefix].damage_immunities) {
			ReplaceString(prefix + "Comp.Use.Features", "\u25C6 Damage Immunities: " + CurrentCompRace[prefix].damage_immunities + ".", true, removeDamI[0], true);
		} else if (removeDamI) {
			RemoveString(prefix + "Comp.Use.Features", removeDamI[0]);
		};

		var removeConI = What(prefix + "Comp.Use.Features").match(/\u25C6 condition immunities:.*/i);
		if (removeConI && CurrentCompRace[prefix] && CurrentCompRace[prefix].known && CurrentCompRace[prefix].condition_immunities) {
			ReplaceString(prefix + "Comp.Use.Features", "\u25C6 Damage Immunities: " + CurrentCompRace[prefix].condition_immunities + ".", true, removeConI[0], true);
		} else if (removeConI) {
			RemoveString(prefix + "Comp.Use.Features", removeConI[0]);
		};

		var removeDarkv = What(prefix + "Comp.Use.Senses").match(/darkvision \d+.?\d*.?(ft|m)/i);
		if (removeDarkv && CurrentCompRace[prefix] && CurrentCompRace[prefix].known && (/darkvision \d+.?\d*.?ft/i).test(CurrentCompRace[prefix].vision + CurrentCompRace[prefix].senses)) {
			var creaDarkv = (CurrentCompRace[prefix].vision + CurrentCompRace[prefix].senses).match(/darkvision \d+.?\d*.?ft/i)[0];
			if (What("Unit System") === "metric") creaDarkv = ConvertToMetric(creaDarkv, 0.5);
			ReplaceString(prefix + "Comp.Use.Senses", creaDarkv, ";", removeDarkv[0], true);
		} else if (removeDarkv) {
			RemoveString(prefix + "Comp.Use.Senses", removeDarkv[0], ";");
		};
	}
	Value(prefix + "Companion.Remember", "", "");
	thermoM(thermoTxt, true); // Stop progress bar
}

//add a creature to the companion page
function ApplyCompRace(newRace) {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything
	if (event.target && event.target.name.indexOf("Comp.Race") !== -1 && newRace.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying companion race...");
	calcStop();

	var prefix = getTemplPre(event.target.name, "AScomp", true);

	var resetDescTooltips = function() {
		AddTooltip(prefix + "Comp.Desc.Height", "");
		AddTooltip(prefix + "Comp.Desc.Weight", "");
		AddTooltip(prefix + "Comp.Desc.Age", "");
		// remove submitName from modifier fields
		var clearSubmitNames = [prefix + "Comp.Use.Combat.Init.Bonus"].concat(tDoc.getField(prefix + "BlueText.Comp.Use.Ability").getArray()).concat(tDoc.getField(prefix + "BlueText.Comp.Use.Skills").getArray());
		for (var c = 0; c < clearSubmitNames.length; c++) AddTooltip(clearSubmitNames[c], undefined, "");
	}

	var doCreatureEval = function(type) {
		var theEval = CurrentCompRace[prefix][type];
		if (CurrentCompRace[prefix].typeFound !== "creature" || !theEval || typeof theEval != 'function') return;
		try {
			theEval(prefix);
		} catch (error) {
			var eText = "The " + type + " from '" + CurrentCompRace[prefix].name + "' produced an error! Please contact the author of the feature to correct this issue:\n " + error + "\n ";
			for (var e in error) eText += e + ": " + error[e] + ";\n ";
			console.println(eText);
			console.show();
		}
	}

	var compFields = [
		prefix + "Comp.Use",
		prefix + "Text.Comp.Use",
		prefix + "BlueText.Comp.Use"
	];

	//reset all the fields if the input is nothing
	if (newRace === "") {
		thermoTxt = thermoM("Resetting the companion page...", false); //change the progress dialog text
		doCreatureEval("removeeval");
		CurrentCompRace[prefix] = {}; //reset the global variable to nothing
		tDoc.resetForm(compFields); //rest all the fields
		thermoM(1/3); //increment the progress dialog's progress
		resetDescTooltips(); //remove descriptive tooltips
		resetCompTypes(prefix); //remove strings
		thermoM(2/3); //increment the progress dialog's progress
		tDoc.getField(prefix + "Comp.Race").submitName = "";
		thermoM(thermoTxt, true); // Stop progress bar
		return; //don't do the rest of the function
	}
	if (FindCompRace(newRace, prefix)) { //fill the global variable. If the return is true, it means that no (new) race was found, so the function can be stopped
		thermoM(thermoTxt, true); // Stop progress bar
		return; //don't do the rest of the function
	}
	resetCompTypes(prefix); //remove stuff from the companion type (actions, strings, etc.)
	doCreatureEval("removeeval"); // execute the removeeval from the previously known creature, if any
	if (CurrentCompRace[prefix].typeFound === "race") {// do the following if a race was found
		tDoc.resetForm(compFields); //reset all the fields
		thermoTxt = thermoM("Adding the companion's player race...", false); //change the progress dialog text

		//set descriptive tooltips
		var theHeight = What("Unit System") === "imperial" ? CurrentCompRace[prefix].height : CurrentCompRace[prefix].heightMetric ? CurrentCompRace[prefix].heightMetric : CurrentCompRace[prefix].height;
		var theWeight = What("Unit System") === "imperial" ? CurrentCompRace[prefix].weight : CurrentCompRace[prefix].weightMetric ? CurrentCompRace[prefix].weightMetric : CurrentCompRace[prefix].weight;
		AddTooltip(prefix + "Comp.Desc.Height", CurrentCompRace[prefix].plural + theHeight);
		AddTooltip(prefix + "Comp.Desc.Weight", CurrentCompRace[prefix].plural + theWeight);
		AddTooltip(prefix + "Comp.Desc.Age", CurrentCompRace[prefix].plural + CurrentCompRace[prefix].age);

		thermoM(1/11); //increment the progress dialog's progress

		//set race's size
		PickDropdown(prefix + "Comp.Desc.Size", CurrentCompRace[prefix].size);

		//set race's type
		Value(prefix + "Comp.Desc.MonsterType", "Humanoid");

		//set racial traits
		var theTraits = What("Unit System") === "imperial" ? CurrentCompRace[prefix].trait : ConvertToMetric(CurrentCompRace[prefix].trait, 0.5);
		Value(prefix + "Comp.Use.Traits", theTraits);

		thermoM(2/11); //increment the progress dialog's progress

		//set speed
		var raceSpeed = CurrentCompRace[prefix].speed;
		if (isArray(raceSpeed)) { //legacy
			var theSpeed = isNaN(raceSpeed[0]) ? raceSpeed[0] : raceSpeed[0] + " ft";
		} else {
			var theSpeed = raceSpeed.walk && raceSpeed.walk.spd ? raceSpeed.walk.spd + " ft" : "";
			for (aSpeed in raceSpeed) {
				var Spd = raceSpeed[aSpeed].spd;
				if (!Spd || aSpeed === "walk") continue;
				theSpeed += (aSpeed ? ",\n" : "") + aSpeed + " " + Spd + " ft";
			};
		};
		theSpeed = What("Unit System") === "imperial" ? theSpeed : ConvertToMetric(theSpeed, 0.5);
		Value(prefix + "Comp.Use.Speed", theSpeed);

		thermoM(3/11); //increment the progress dialog's progress

		//set senses
		if (CurrentCompRace[prefix].vision) {
			var theSenseStr = "";
			var theSenses = CurrentCompRace[prefix].vision;
			if (!isArray(theSenses) || (theSenses.length === 2 && !isArray(theSenses[0]) && !isArray(theSenses[1]) && (!isNaN(theSenses[1]) || !isNaN(theSenses[1].substr(1))))) {
				theSenses = [theSenses];
			};
			for (var s = 0; s < theSenses.length; s++) {
				var aSense = theSenses[s];
				if (isArray(aSense)) {
					theSenseStr += (theSenseStr ? "; " : "") + aSense[0] + (aSense[1] ? " " + aSense[1] + " ft": "");
				} else {
					theSenseStr += (theSenseStr ? "; " : "") + aSense;
				};
			};
			if (What("Unit System") !== "imperial") theSenseStr = ConvertToMetric(theSenseStr, 0.5);
			Value(prefix + "Comp.Use.Senses", theSenseStr);
		};

		thermoM(4/11); //increment the progress dialog's progress

		//add a string of the languages known to the features
		if (CurrentCompRace[prefix].languageProfs) {
			var theLangs = [];
			for (var l = 0; l < CurrentCompRace[prefix].languageProfs.length; l++) {
				var aLang = CurrentCompRace[prefix].languageProfs[l];
				if (isNaN(aLang)) {
					theLangs.push(aLang);
				} else {
					theLangs.push("+" + aLang);
				};
			};
			var languageString = formatLineList("\u25C6 Languages:", theLangs);
			if (languageString) AddString(prefix + "Comp.Use.Features", languageString + ".", true);
		};

		thermoM(5/11); //increment the progress dialog's progress

		//add a string of the saveText to the features
		if (CurrentCompRace[prefix].savetxt) {
			if (typeof CurrentCompRace[prefix].savetxt === "string") {
				var svString = "\u25C6 Saving Throws: " + CurrentCompRace[prefix].savetxt + ".";
			} else {
				var svObj = CurrentCompRace[prefix].savetxt;
				var svString = "";
				if (svObj.text) {
					svString += svString ? "; " : "\u25C6 Saving Throws: ";
					svString += svObj.text.join("; ");
				};
				if (svObj.adv_vs) {
					svString += formatLineList((svString ? "; " : "\u25C6 Saving Throws: ") + "Adv. on saves vs.", svObj.adv_vs);
				};
				if (svObj.immune) {
					svString += formatLineList((svString ? "; " : "\u25C6 Saving Throws: ") + "Immune to", svObj.immune);
				};
				svString += ".";
			};
			AddString(prefix + "Comp.Use.Features", svString, true);
		};

		thermoM(6/11); //increment the progress dialog's progress

		//add saving throw proficiencies
		if (CurrentCompRace[prefix].saves) {
			for (var s = 0; s < CurrentCompRace[prefix].saves.length; s++) {
				var Abi = AbilityScores.fields[CurrentCompRace[prefix].saves[s].substr(0,3)];
				if (Abi) Checkbox(prefix + "Comp.Use.Ability." + Abi + ".ST.Prof");
			}
		}

		//add modifiers
		if (CurrentCompRace[prefix].addMod) {
			processMods(true, CurrentCompRace[prefix].name, CurrentCompRace[prefix].addMod);
		}

		//add a string of any resistances to the features
		if (CurrentCompRace[prefix].dmgres) {
			var dmgresString = formatLineList("\u25C6 Damage Resistances:", CurrentCompRace[prefix].dmgres);
			if (dmgresString) AddString(prefix + "Comp.Use.Features", dmgresString + ".", true);
		};

		thermoM(7/11); //increment the progress dialog's progress

		//add a string of any weapon proficiencies to the features
		var weaponProf = CurrentCompRace[prefix].weaponProfs ? CurrentCompRace[prefix].weaponProfs : CurrentCompRace[prefix].weaponprofs ? CurrentCompRace[prefix].weaponprofs : false;
		if (weaponProf) {
			var theWeaponArray = [];
			if (weaponProf[0]) theWeaponArray.push("simple weapons");
			if (weaponProf[1]) theWeaponArray.push("martial weapons");
			if (weaponProf[2]) theWeaponArray = theWeaponArray.concat(weaponProf[2]);
			var weaponString = formatLineList("\u25C6 Weapon Proficiencies:", theWeaponArray);
			if (weaponString) AddString(prefix + "Comp.Use.Features", weaponString + ".", true);
		};

		//add a string of any armour proficiencies to the features
		var armorProf = CurrentCompRace[prefix].armorProfs ? CurrentCompRace[prefix].armorProfs : CurrentCompRace[prefix].armor ? CurrentCompRace[prefix].armor : false;
		if (armorProf) {
			var theArmourArray = [];
			if (armorProf[0]) theArmourArray.push("light armor");
			if (armorProf[1]) theArmourArray.push("medium armor");
			if (armorProf[2]) theArmourArray.push("heavy armor");
			if (armorProf[3]) theArmourArray.push("shields");
			var armourString = formatLineList("\u25C6 Armor Proficiencies:", theArmourArray);
			if (armourString) AddString(prefix + "Comp.Use.Features", armourString + ".", true);
		};

		thermoM(8/11); //increment the progress dialog's progress

		//add a string of any tool proficiencies to the features
		if (CurrentCompRace[prefix].toolProfs) {
			var theTools = [];
			for (var l = 0; l < CurrentCompRace[prefix].toolProfs.length; l++) {
				var aTool = CurrentCompRace[prefix].toolProfs[l];
				if (isArray(aTool)) {
					if (!isNaN(aTool[1]) && Number(aTool[1]) > 1) {
						theTools.push(aTool[1] + " \u00d7 " + aTool[0]);
					} else {
						theTools.push(aTool[0]);
					};
				} else {
					theTools.push(aTool);
				};
			};
			var toolString = formatLineList("\u25C6 Tool Proficiencies:", theTools);
			if (toolString) AddString(prefix + "Comp.Use.Features", toolString + ".", true);
		};

		thermoM(9/11); //increment the progress dialog's progress

		//add skill proficiencies and feature text
		var skillsTxt;
		if (CurrentCompRace[prefix].skills) {
			var skillsNameArr = [];
			for (var i = 0; i < CurrentCompRace[prefix].skills.length; i++) {
				var aSk = CurrentCompRace[prefix].skills[i];
				if (isArray(aSk)) {
					var doSkill = aSk[0];
					var doExp = aSk[1];
				} else {
					var doSkill = aSk;
					var doExp = false;
				}
				var skillName = AddSkillProf(doSkill, true, doExp, true);
				if (skillName) skillsNameArr.push(skillName);
			}
			skillsTxt = formatLineList("\u25C6 Skill Proficiencies:", skillsNameArr);
		};
		if (CurrentCompRace[prefix].skillstxt) {
			skillsTxt = "\u25C6 Skill Proficiencies: " + CurrentCompRace[prefix].skillstxt.replace(/^( |\n)*.*: |\;$|\.$/g, '');
		}
		if (skillsTxt) AddString(prefix + "Comp.Use.Features", skillsTxt + ".", true);

		thermoM(10/11); //increment the progress dialog's progress

		//add weapons
		var weaponAdd = CurrentCompRace[prefix].weaponsAdd ? CurrentCompRace[prefix].weaponsAdd : CurrentCompRace[prefix].weapons ? CurrentCompRace[prefix].weapons : [];
		if (!isArray(weaponAdd)) weaponAdd = [weaponAdd];
		for (i = 0; i < weaponAdd.length; i++) {
			AddWeapon(weaponAdd[i]);
		}

		//add armour
		var anArmorAdd = CurrentCompRace[prefix].armorAdd ? CurrentCompRace[prefix].armorAdd : CurrentCompRace[prefix].addarmor ? CurrentCompRace[prefix].addarmor : false;
		if (anArmorAdd) AddArmor(anArmorAdd, true, prefix);

		// If the race has any other features that aren't applied here
		if (CurrentCompRace[prefix].eval || CurrentCompRace[prefix].features || CurrentCompRace[prefix].scores || CurrentCompRace[prefix].action) {
			app.alert({
				cTitle : "Player race not fully compatible with companion page",
				nIcon : 3,
				cMsg : "The companion page is not fully compatible with all the possible features of races that are designed to be used as a player race (i.e. normally used to create a character with levels).\n\nThe sheet has tried its best to add the '" + CurrentCompRace[prefix].name + "' race to the companion page, but some aspects will be missing:\n\u2022 Anything gained from level-dependent features;\n\u2022 Limited features;\n\u2022 Racial spellcasting;\n\u2022 Additional actions, bonus actions, and reactions;\n\u2022 Automated attack calculation changes;\n\u2022 Anything added using the 'eval' or 'changeeval' attributes."
			})
		}

	} else if (CurrentCompRace[prefix].typeFound === "creature") {// do the following if a creature was found
		thermoTxt = thermoM("Adding the companion creature...", false); //change the progress dialog text
		resetDescTooltips(); //remove descriptive tooltips
		tDoc.resetForm(compFields); //reset all the fields

		//add the size
		PickDropdown(prefix + "Comp.Desc.Size", CurrentCompRace[prefix].size);

		//set race's type
		var typeString = CurrentCompRace[prefix].subtype ? CurrentCompRace[prefix].type + " (" + CurrentCompRace[prefix].subtype + ")" : CurrentCompRace[prefix].type;
		Value(prefix + "Comp.Desc.MonsterType", typeString);

		//set senses
		var theSenses = What("Unit System") === "imperial" ? CurrentCompRace[prefix].senses : ConvertToMetric(CurrentCompRace[prefix].senses, 0.5);
		Value(prefix + "Comp.Use.Senses", theSenses);

		Value(prefix + "Comp.Desc.Alignment", CurrentCompRace[prefix].alignment); //set alignment
		Value(prefix + "Comp.Use.Proficiency Bonus", CurrentCompRace[prefix].proficiencyBonus); //set proficiency bonus
		Value(prefix + "Comp.Use.Attack.perAction", CurrentCompRace[prefix].attacksAction); //set attacks per action
		Value(prefix + "Comp.Use.AC", CurrentCompRace[prefix].ac); //set AC
		Value(prefix + "Comp.Use.HP.Max", CurrentCompRace[prefix].hp); //set HP
		Value(prefix + "Comp.Use.HD.Level", CurrentCompRace[prefix].hd[0]); //set HD #
		Value(prefix + "Comp.Use.HD.Die", CurrentCompRace[prefix].hd[1]); //set HD die

		//add ability scores
		for (var a = 0; a < AbilityScores.abbreviations.length; a++) {
			Value(prefix + "Comp.Use.Ability." + AbilityScores.abbreviations[a] + ".Score", CurrentCompRace[prefix].scores[a]);
			Value(prefix + "Comp.Use.Ability." + AbilityScores.abbreviations[a] + ".Mod", Math.round((CurrentCompRace[prefix].scores[a] - 10.5) * 0.5));
		}

		thermoM(1/10); //increment the progress dialog's progress

		//add speed
		var theSpeed = What("Unit System") === "imperial" ? CurrentCompRace[prefix].speed : ConvertToMetric(CurrentCompRace[prefix].speed, 0.5);
		Value(prefix + "Comp.Use.Speed", theSpeed);

		thermoM(2/10); //increment the progress dialog's progress

		//add any weapons the creature possesses
		for (var a = 0; a < CurrentCompRace[prefix].attacks.length; a++) {
			AddWeapon(CurrentCompRace[prefix].attacks[a].name);
		}

		thermoM(3/10); //increment the progress dialog's progress

		//calculate the ability score modifiers
		var mods = [];
		for (var i = 0; i < CurrentCompRace[prefix].scores.length; i++) {
			mods[i] = Math.round((CurrentCompRace[prefix].scores[i] - 10.5) * 0.5);
		}

		thermoM(4/10); //increment the progress dialog's progress

		//add skill proficiencies
		if (CurrentCompRace[prefix].skills) {
			for (var aSkill in CurrentCompRace[prefix].skills) {
				var profSkill = CompSkillRefer(aSkill, CurrentCompRace[prefix].skills[aSkill], CurrentCompRace[prefix].scores, CurrentCompRace[prefix].proficiencyBonus);
				AddSkillProf(profSkill[0], profSkill[1] !== "nothing", profSkill[1] === "expertise", false, profSkill[2]); //set the proficiency
			}
		}

		thermoM(5/10); //increment the progress dialog's progress

		//add saving throw proficiencies
		for (var s = 0; s < CurrentCompRace[prefix].saves.length; s++) {
			if (CurrentCompRace[prefix].saves[s] !== "") {//only do something if a value is detected
				var saveFld = "Comp.Use.Ability." + AbilityScores.abbreviations[s] + ".ST";
				Checkbox(prefix + saveFld + ".Prof"); //set the save as proficient
				Value(prefix + "BlueText." + saveFld + ".Bonus", CurrentCompRace[prefix].saves[s] - mods[s] - CurrentCompRace[prefix].proficiencyBonus);
			}
		}

		//add features
		if (CurrentCompRace[prefix].damage_vulnerabilities) {
			var tempString = "\u25C6 Damage Vulnerabilities: " + CurrentCompRace[prefix].damage_vulnerabilities + ".";
			AddString(prefix + "Comp.Use.Features", tempString, true);
		}
		if (CurrentCompRace[prefix].damage_resistances) {
			var tempString = "\u25C6 Damage Resistances: " + CurrentCompRace[prefix].damage_resistances + ".";
			AddString(prefix + "Comp.Use.Features", tempString, true);
		}
		if (CurrentCompRace[prefix].damage_immunities) {
			var tempString = "\u25C6 Damage Immunities: " + CurrentCompRace[prefix].damage_immunities + ".";
			AddString(prefix + "Comp.Use.Features", tempString, true);
		}
		if (CurrentCompRace[prefix].condition_immunities) {
			var tempString = "\u25C6 Condition Immunities: " + CurrentCompRace[prefix].condition_immunities + ".";
			AddString(prefix + "Comp.Use.Features", tempString, true);
		}
		if (CurrentCompRace[prefix].languages) {
			var tempString = "\u25C6 Languages: " + CurrentCompRace[prefix].languages + ".";
			AddString(prefix + "Comp.Use.Features", tempString, true);
		}

		thermoM(6/10); //increment the progress dialog's progress

		//add features
		if (CurrentCompRace[prefix].features) {
			for (var t = 0; t < CurrentCompRace[prefix].features.length; t++) {
				var featureString = "\u25C6 " + CurrentCompRace[prefix].features[t].name + ": ";
				featureString += CurrentCompRace[prefix].features[t].description;
				AddString(prefix + "Comp.Use.Features", featureString, true);
			}
		}

		thermoM(7/10); //increment the progress dialog's progress

		//add actions
		if (CurrentCompRace[prefix].actions) {
			for (var t = 0; t < CurrentCompRace[prefix].actions.length; t++) {
				var actionString = "\u25C6 " + CurrentCompRace[prefix].actions[t].name + ": ";
				actionString += CurrentCompRace[prefix].actions[t].description;
				AddString(prefix + "Comp.Use.Traits", actionString, true);
			}
		}

		thermoM(8/10); //increment the progress dialog's progress

		//add traits
		if (CurrentCompRace[prefix].traits) {
			for (var t = 0; t < CurrentCompRace[prefix].traits.length; t++) {
				var traitString = "\u25C6 " + CurrentCompRace[prefix].traits[t].name + ": ";
				traitString += CurrentCompRace[prefix].traits[t].description;
				AddString(prefix + "Comp.Use.Traits", traitString, true);
			}
		}

		thermoM(9/10); //increment the progress dialog's progress

		//convert to metric, if applicable
		if (What("Unit System") === "metric") {
			if (What(prefix + "Comp.Use.Traits")) Value(prefix + "Comp.Use.Traits", ConvertToMetric(What(prefix + "Comp.Use.Traits"), 0.5));
			if (What(prefix + "Comp.Use.Features")) Value(prefix + "Comp.Use.Features", ConvertToMetric(What(prefix + "Comp.Use.Features"), 0.5));
		}

		// execute eval
		doCreatureEval("eval");
	}

	SetHPTooltip(false, true);
	thermoM(thermoTxt, true); // Stop progress bar
}

//calculate whether the skill bonus equals proficiency, expertise, or something else
function CompSkillRefer(Skill, SkillBonus, scores, profB) {
	var SkillName = Skill.capitalize();
	if (Skill.length > 4) {
		if (SkillsList.abbreviations.indexOf(SkillName.substring(0, 4)) !== -1) {
			SkillName = SkillName.substring(0, 4);
		} else if (SkillsList.abbreviations.indexOf(SkillName.substring(0, 3)) !== -1) {
			SkillName = SkillName.substring(0, 3);
		}
	};

	var SkillAbility = SkillsList.abilityScores[SkillsList.abbreviations.indexOf(SkillName)];
	var SkillMod = Math.round((scores[AbilityScores.abbreviations.indexOf(SkillAbility)] - 10.5) * 0.5);

	if (SkillBonus === SkillMod) {
		var theReturn = [SkillName, "nothing", 0];
	} else if (SkillBonus === (SkillMod + profB)) {
		var theReturn = [SkillName, "proficient", 0];
	} else if (SkillBonus === (SkillMod + (2 * profB))) {
		var theReturn = [SkillName, "expertise", 0];
	} else if (SkillBonus > (SkillMod + (2 * profB))) {
		var theReturn = [SkillName, "expertise", SkillBonus - (SkillMod + (2 * profB))];
	} else if (SkillBonus > (SkillMod + profB)) {
		var theReturn = [SkillName, "proficient", SkillBonus - (SkillMod + profB)];
	} else {
		var theReturn = [SkillName, "nothing", SkillBonus - SkillMod];
	}

	return theReturn;
}

// manual trigger for clicking the skill proficiency/expertise (MouseUp) on the companion page
function applyCompSkillClick() {
	var isExp = (/Exp$/).test(event.target.name);
	var isCheck = event.target.isBoxChecked(0) ? true : false;
	if (isCheck != isExp) return; // nothing to do
	var otherFld = event.target.name.replace(/(Exp|Prof)$/, isExp ? "Prof" : "Exp");
	Checkbox(otherFld, isCheck);
}

// call this to update the companion page's proficiency bonus field so it displays the die
function setCompProfDie() {
	var prefix = event.target.name.substring(0, event.target.name.indexOf("BlueText."));
	var profFld = prefix + "Comp.Use.Proficiency Bonus";
	Value(profFld, What(profFld));
}

//see if the weapon matches one of the companion as a creature
function parseCompWeapon(input, prefix) {
	if (!input || !CurrentCompRace[prefix] || !CurrentCompRace[prefix].attacks) return "";

	var input = removeDiacritics(input).toLowerCase();
	var tempFound = false;

	//scan string for all attacks
	for (var n = 0; n < CurrentCompRace[prefix].attacks.length; n++) {
		var nAtk = CurrentCompRace[prefix].attacks[n].name.toLowerCase();
		if (input.indexOf(nAtk) !== -1) return n;
	}

	return ""; // nothing was found, so return nothing
}

//detects weapons entered on the companion sheet and put information to global CurrentWeapons variable
function FindCompWeapons(ArrayNmbr, aPrefix) {
	if (aPrefix) {
		var prefixA = [aPrefix];
	} else {
		var prefixA = What("Template.extras.AScomp").split(",");
	}
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		var tempString = "";
		var tempFound = false;
		var tempArray = [];
		var startArray = ArrayNmbr;
		var endArray = ArrayNmbr + 1;
		var isCompRace = CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound === "creature" && CurrentCompRace[prefix].known;

		//do all the weapons, if no ArrayNmbr has been entered
		if (ArrayNmbr === undefined) {
			CurrentWeapons.compField[prefix] = [];
			CurrentWeapons.compKnown[prefix] = [];
			for (var i = 0; i < 3; i++) {
				CurrentWeapons.compField[prefix][i] = What(prefix + "Comp.Use.Attack." + (i + 1) + ".Weapon Selection").toLowerCase();
			}
			var startArray = 0;
			var endArray = CurrentWeapons.compField[prefix].length;
		}

		//parse the weapons into tempArray
		for (var j = startArray; j < endArray; j++) {
			tempString = CurrentWeapons.compField[prefix][j];
			tempArray[j] = [];
			var compAttackFound = false;
			if (isCompRace) { //if a creature is found, check to see if attack entered matches one of the creature's attacks
				tempArray[j][0] = parseCompWeapon(tempString, prefix);
				compAttackFound = tempArray[j][0] !== "";
			}

			if (!compAttackFound) { //if not a comprace or nothing was found above
				//see if the field contains a known weapon
				tempArray[j][0] = ParseWeapon(tempString);
			}

			//add magical bonus, denoted by a "+" or "-"
			tempArray[j][1] = 0;
			var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
			if (magicRegex.test(tempString)) {
				tempArray[j][1] = parseFloat(tempString.match(magicRegex)[1]);
			}

			//add the true/false switch for adding ability score to damage or not
			if (!compAttackFound && tempArray[j][0]) {
				tempArray[j][2] = WeaponsList[tempArray[j][0]].abilitytodamage;
			} else if (compAttackFound) {
				var compMod = CurrentCompRace[prefix].attacks[tempArray[j][0]].modifiers;
				tempArray[j][2] = compMod && compMod[2] !== "" ? compMod[2] : true;
			}
			//put tempArray in known
			CurrentWeapons.compKnown[prefix][j] = tempArray[j];
		}
	}
};

//add a wildshape based on the selection and calculation settings
function ApplyWildshape() {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything
	if (event.target && event.value.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying wild shape...");
	calcStop();

	var prefix = getTemplPre(event.target.name, "WSfront", true);
	var Fld = event.target.name.slice(-1);
	var newForm = event.value.toLowerCase();
	var resetFlds = [
		prefix + "Wildshape." + Fld,
		prefix + "Text.Wildshape." + Fld
	];
	var resetTooltipsFlds = function() {
		AddTooltip(prefix + "Wildshape." + Fld + ".Attack." + 1 + ".Description", "");
		AddTooltip(prefix + "Wildshape." + Fld + ".Attack." + 2 + ".Description", "");
		AddTooltip(prefix + "Wildshape." + Fld + ".AC", "");
	}

	if (newForm === "" || newForm === "make a selection") {
		thermoTxt = thermoM("Resetting the wild shape...", false); //change the progress dialog text
		tDoc.resetForm(resetFlds);
		thermoM(1/2); //increment the progress dialog's progress
		resetTooltipsFlds();
		thermoM(thermoTxt, true); // Stop progress bar
		return; //don't do the rest of the function
	}

	var newCrea = ParseCreature(newForm);

	var oldCrea = ParseCreature(event.target.value);
	if (newCrea === oldCrea || !newCrea || !What("Character Level") || !What("Int")|| !What("Wis")|| !What("Cha")) { //If this returns true, it means that no (new) race was found; or that the character has not been defined enough yet so the function can be stopped
		thermoM(thermoTxt, true); // Stop progress bar
		return; //don't do the rest of the function
	}

	thermoTxt = thermoM("Resetting the wild shape...", false); //change the progress dialog text
	tDoc.resetForm(resetFlds);
	resetTooltipsFlds();
	thermoM(1/10); //increment the progress dialog's progress

	thermoTxt = thermoM("Applying the new wild shape...", false); //change the progress dialog text
	var theCrea = CreatureList[newCrea];
	//calculate the new array of ability scores
	var scores = [
		theCrea.scores[0],
		theCrea.scores[1],
		theCrea.scores[2],
		What("Int"),
		What("Wis"),
		What("Cha")
	];

	//calculate the ability score modifiers
	var mods = [];
	for (var i = 0; i < scores.length; i++) {
		mods[i] = Math.round((scores[i] - 10.5) * 0.5);
	}

	//get the proficiency bonuses
	var creaProfBcalc = theCrea.proficiencyBonus;
	var charProfBcalc = Number(What("Proficiency Bonus"));
	var creaProfBfix = theCrea.proficiencyBonus;
	var charProfBfix = Number(What("Proficiency Bonus"));

	//get the setting field
	var setting = What("Wildshapes.Remember").split("!#TheListSeparator#!");

	if (setting[0] === "all_creature") {
		charProfBcalc = creaProfBcalc;
	} else if (setting[0] === "all_druid") {
		creaProfBcalc = charProfBcalc;
	}

	//define a function that calculates the proficiency bonus to use
	var getProfB = function(ProfB, isProf, halfProf) {
		if (isProf === "expertise") {
			return ProfB * 2;
		} else if (isProf === "proficient") {
			return ProfB;
		} else if (halfProf) {
			return Math.floor(ProfB / 2);
		} else {
			return 0;
		}
	}

	//add ability scores
	for (var a = 0; a < AbilityScores.abbreviations.length; a++) {
		Value(prefix + "Wildshape." + Fld + ".Ability." + AbilityScores.abbreviations[a] + ".Score", scores[a]);
	}

	thermoM(2/10); //increment the progress dialog's progress

	//add the size
	PickDropdown(prefix + "Wildshape." + Fld + ".Size", theCrea.size);

	//set race's type
	var typeString = theCrea.subtype ? theCrea.type + " (" + theCrea.subtype + ")" : theCrea.type;
	Value(prefix + "Wildshape." + Fld + ".MonsterType", typeString);

	//set speed
	var theSpeed = What("Unit System") === "imperial" ? theCrea.speed : ConvertToMetric(theCrea.speed, 0.5);
	Value(prefix + "Wildshape." + Fld + ".Speed", theSpeed);

	//if the character is using proficiency dice instead of a bonus, change the values for calculations to zero and change the Proficiency Bonus field to display a dice
	if (tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) === 1) {
		var profToDisplay = GetProfDice(creaProfBcalc);
		creaProfBcalc = 0;
		charProfBcalc = 0;
	} else {
		var profToDisplay = creaProfBcalc;
	}

	Value(prefix + "Wildshape." + Fld + ".Proficiency Bonus", profToDisplay); //set proficiency bonus
	Value(prefix + "Wildshape." + Fld + ".HP Max", theCrea.hp); //set HP
	Value(prefix + "Wildshape." + Fld + ".HD", theCrea.hd[0] + "d" + theCrea.hd[1]); //set HD
	Value(prefix + "Wildshape." + Fld + ".CR", theCrea.challengeRating); //set CR

	//set AC
	var theAC = [theCrea.ac];
	var theACtt = [""];
	for (var aClass in CurrentClasses) {
		for (var pop in CurrentClasses[aClass].features) {
			var fea = CurrentClasses[aClass].features[pop];
			if ((/armor of peace|unarmored defense|draconic resilience|durability/i).test(fea.name) && (/ AC /).test(fea.description) && fea.minlevel <= classes.known[aClass].level) {
				var newAC = fea.description.match(/\d+ ?\+/);
				newAC = Number(newAC ? newAC[0].replace(/ ?\+/, "") : 10);
				var addAbi = fea.description.match(/\+ ?(Str|Dex|Con|Int|Wis|Cha)/ig);
				if (addAbi) { for (var aA = 0; aA < addAbi.length; aA++) {
					newAC += mods[AbilityScores.abbreviations.indexOf(addAbi[aA].replace(/\+ ?/, ""))];
				}; };
				if (newAC) {
					theAC.push(newAC);
					theACtt.push("\n\nThe AC used here is calculated using " + fea.name + " (" + CurrentClasses[aClass].fullname + ")");
				}
			}
		}
	}
	if (CurrentArmour.known && CurrentArmour.mod) {
		var newAC = ArmourList[CurrentArmour.known].ac;
		if (CurrentArmour.mod) newAC += mods[AbilityScores.abbreviations.indexOf(CurrentArmour.mod.replace(/ Mod/i, ""))];
		theAC.push(newAC);
		theACtt.push("\n\nThe AC used here is calculated using " + What("AC Armor Description"));
	}
	var theACtoUse = Math.max.apply(null, theAC);
	var theTTtoUse = "The " + theCrea.name + " default AC is " + theCrea.ac + theACtt[theAC.indexOf(theACtoUse)];
	Value(prefix + "Wildshape." + Fld + ".AC", theACtoUse, theTTtoUse);

	thermoM(3/10); //increment the progress dialog's progress

	//set the initiative value
	var initBonus = EvalBonus(What("Init Bonus"), prefix, Fld);
	if (tDoc.getField("Jack of All Trades").isBoxChecked(0) === 1 || tDoc.getField("Remarkable Athlete").isBoxChecked(0) === 1) initBonus += Math.floor(charProfBcalc / 2); //add half the proficiency bonus if either Jack of All Trades or Remarkable Athlete is checked off
	Value(prefix + "Wildshape." + Fld + ".Initiative Bonus", mods[1] + Number(initBonus));

	thermoM(4/10); //increment the progress dialog's progress

	//set the skill proficiencies
	for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
		//get the particulars of the skill
		var skill = SkillsList.abbreviations[s];
		var skillFull = SkillsList.names[s];
		var skillDruid = Who("Text.SkillsNames") === "alphabeta" ? skill : SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(skill)];
		var skillAbi = SkillsList.abilityScores[s];
		var skillMod = mods[AbilityScores.abbreviations.indexOf(skillAbi)];
		if (!typePF) {
			var skillFlds = [
				prefix + "Wildshape." + Fld + ".Skills." + skill, //for the numerical value
				prefix + "Text.Wildshape." + Fld + ".Skills." + skill + ".Prof", //pick proficiency/expertise/nothing
			];
		} else {
			var skillFlds = [
				prefix + "Wildshape." + Fld + ".Skills." + skill + ".Mod", //for the numerical value
				prefix + "Wildshape." + Fld + ".Skills." + skill + ".Prof", //for the proficiency
				prefix + "Wildshape." + Fld + ".Skills." + skill + ".Exp", //for the expertise
			];
		}

		//see if the creature has proficiency/expertise in it
		if (theCrea.skills && theCrea.skills[skillFull.toLowerCase()] !== undefined) {
			var skillCrea = CompSkillRefer(skill, theCrea.skills[skillFull.toLowerCase()], theCrea.scores, creaProfBfix);
		} else {
			var skillCrea = [skill, "nothing", 0];
		}

		//see if the druid has proficiency/expertise in it
		var charProfFlds = [
			tDoc.getField(skillDruid + " Prof").isBoxChecked(0) === 1,
			tDoc.getField(skillDruid + " Exp").isBoxChecked(0) === 1,
			What(skillDruid + " Bonus"),
			What("All Skills Bonus"),
			tDoc.getField("Jack of All Trades").isBoxChecked(0) === 1 || (tDoc.getField("Remarkable Athlete").isBoxChecked(0) === 1 && (skillAbi === "Str" || skillAbi === "Dex" || skillAbi === "Con"))
		];
		var skillChar = [
			skill,
			charProfFlds[0] && charProfFlds[1] ? "expertise" : charProfFlds[0] ? "proficient" : "nothing",
			EvalBonus(charProfFlds[2], prefix, Fld),
			EvalBonus(charProfFlds[3], prefix, Fld)
		];

		//set the right colouring of the skill name (i.e. the proficiency level)
		var skillProf = "nothing";
		if (skillCrea[1] === "expertise" || skillChar[1] === "expertise") {
			skillProf = "expertise";
		} else if (skillCrea[1] === "proficient" || skillChar[1] === "proficient") {
			skillProf = "proficient";
		}
		if (!typePF) {
			Value(skillFlds[1], skillProf);
		} else {
			Checkbox(skillFlds[1], skillProf === "expertise" || skillProf === "proficient");
			Checkbox(skillFlds[2], skillProf === "expertise");
		}

		//set the bonus for the skill
		if (setting[0] === "by_the_numbers") { //if set to only compare by the numbers, regardless of actual stats/prof bonus
			var skillBonus = theCrea.skills && theCrea.skills[skillFull.toLowerCase()] !== undefined ? Math.max(theCrea.skills[skillFull.toLowerCase()], What(skill)) : Math.max(skillMod, What(skill));
		} else {
			//if set to use char's prof bonus for everything, but not double it on creature expertise, add it to the
			if (setting[1].indexOf("expertise") === -1 && skillCrea[1] === "expertise") {
				skillCrea[2] += creaProfBfix; //add the prof bonus from the creature stat block, because we are not now doubling any prof bonus
				skillCrea[1] = "proficient"; //just set it to proficient, so that it will be only added once
			}

			var creaSkillProfB = getProfB(creaProfBcalc, skillCrea[1], false);
			var charSkillProfB = getProfB(charProfBcalc, skillChar[1], charProfFlds[4]);

			//calculate the skill bonus with the highest proficiency bonus
			var skillBonus = skillMod + Math.max(creaSkillProfB + skillCrea[2], charSkillProfB) + skillChar[2] + skillChar[3];
		}
		Value(skillFlds[0], skillBonus);

		//set the passive perception if calculating the perception score
		if (skillFull === "Perception") {
			var passPercBonus = EvalBonus(What("Passive Perception Bonus"), prefix, Fld);
			Value(prefix + "Wildshape." + Fld + ".Skills.PassPerc", 10 + skillBonus + Number(passPercBonus));
		}
	}

	thermoM(5/10); //increment the progress dialog's progress

	//set the saving throw proficiencies
	for (var s = 0; s < AbilityScores.abbreviations.length; s++) {
		//get the particulars of the save
		var saveAbi = AbilityScores.abbreviations[s];
		var saveMod = mods[s];
		var saveFlds = [
			prefix + "Wildshape." + Fld + ".Ability." + saveAbi + ".ST.Prof", //check if proficient
			prefix + "Wildshape." + Fld + ".Ability." + saveAbi + ".ST.Mod" //for the numerical value
		];

		//see if the creature has proficiency/expertise in it, and any possible bonuses
		var saveCrea = [
			theCrea.saves[s] !== "" ? "proficient" : "nothing",
			theCrea.saves[s] !== "" ? creaProfBcalc : 0,
			theCrea.saves[s] !== "" ? theCrea.saves[s] - Math.round((theCrea.scores[s] - 10.5) * 0.5) - creaProfBfix : 0
		];

		//see if the druid has proficiency/expertise in it, and any possible bonuses
		var saveCharFlds = [
			tDoc.getField(saveAbi + " ST Prof").isBoxChecked(0) === 1,
			What(saveAbi + " ST Bonus"),
			What("All ST Bonus")
		];
		var saveChar = [
			saveCharFlds[0] ? "proficient" : "nothing",
			saveCharFlds[0] ? charProfBcalc : 0,
			EvalBonus(saveCharFlds[1], prefix, Fld),
			EvalBonus(saveCharFlds[2], prefix, Fld)
		];

		//check the box for proficiency, if applicable
		if (saveCrea[0] === "proficient" || saveChar[0] === "proficient") {
			Checkbox(saveFlds[0]);
		}

		//set the bonus for the save
		if (setting[0] === "by_the_numbers") { //if set to only compare by the numbers, regardless of actual stats/prof bonus
			var saveBonus = theCrea.saves[s] !== "" ? Math.max(theCrea.saves[s], What(saveAbi + " ST Mod")) : Math.max(saveMod, What(saveAbi + " ST Mod"));
		} else {
			//calculate the skill bonus with the highest proficiency bonus
			var saveBonus = saveMod + Math.max(saveCrea[1] + saveCrea[2], saveChar[1]) + saveChar[2] + saveChar[3];
		}
		Value(saveFlds[1], saveBonus);
	}

	thermoM(6/10); //increment the progress dialog's progress

	//add attacks
	var attacksArray = theCrea.wildshapeAttacks ? theCrea.attacks.concat(theCrea.wildshapeAttacks) : theCrea.attacks;
	for (var a = 0; a < (Math.min(2, attacksArray.length)); a++) {
		var atk = attacksArray[a];
		var atkStr = prefix + "Wildshape." + Fld + ".Attack." + (a + 1);
		var atkMod = mods[atk.ability - 1];
		var atkAlt = atk.modifiers ? atk.modifiers : [];
		var atkRange = What("Unit System") === "imperial" ? atk.range : ConvertToMetric(atk.range, 0.5);
		Value(atkStr + ".Weapon", atk.name); //set attack name
		Value(atkStr + ".Range", atkRange); //set attack range
		Value(atkStr + ".Description", atk.description, atk.tooltip ? atk.tooltip : ""); //set attack description

		//set to hit
		var tohitProfB = setting[1].indexOf("attacks") !== -1 ? charProfBfix : creaProfBfix;
		tohitProfB = tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) === 1 ? 0 : tohitProfB;
		var tohitString = atk.dc ? 8 + tohitProfB + atkMod : tohitProfB + atkMod;
		if (atkAlt[0]) tohitString += !isNaN(atkAlt[0]) ? atkAlt[0] : AbilityScores.abbreviations.indexOf(atkAlt[0]) !== -1 ? mods[AbilityScores.abbreviations.indexOf(atkAlt[0])] : 0; //add a modifier, if defined
		if (atk.dc) tohitString = "DC " + tohitString;
		if (!isNaN(tohitString) && tohitString > 0) tohitString = "+" + tohitString;
		Value(atkStr + ".To Hit", tohitString); //set to hit string

		//set damage
		var damageString = atk.damage[1] === "" ? atk.damage[0] : atk.damage[0] + "d" + atk.damage[1];
		var damageBonus = (!atkAlt[1] ? 0 : !isNaN(atkAlt[1]) ? atkAlt[1] : mods[AbilityScores.abbreviations.indexOf(atkAlt[1])]) + (atkAlt[2] !== undefined && atkAlt[2] !== "" && atkAlt[2] === false ? 0 : atkMod);
		damageString += damageBonus === 0 ? "" : damageBonus > 0 ? "+" + damageBonus : damageBonus;
		Value(atkStr + ".Damage", damageString); //set damage string
		AddDmgType(atkStr + ".Damage Type", atk.damage[2]); //set damage type
	}

	thermoM(7/10); //increment the progress dialog's progress

	//add traits & features
	var traitsFld = prefix + "Wildshape." + Fld + ".Traits";
	if (theCrea.wildshapeString) {
		Value(traitsFld, theCrea.wildshapeString)
	} else {
/* 		if (theCrea.languages) {
			var tempString = "\u25C6 Languages: " + theCrea.languages + ".";
			AddString(traitsFld, tempString, true);
		} */
		var sensesToAdd = theCrea.senses.replace(/(\; )?Adv\..+(hearing|sight|smell)/i, ""); //avoid duplicating the information with regards to the keen hearing/sight/smell traits
		if (sensesToAdd) {
			AddString(traitsFld, "\u25C6 Senses: " + sensesToAdd, true); //set senses
		}
		//add resistances & immunities
		if (theCrea.damage_vulnerabilities) {
			var tempString = "\u25C6 Damage Vulnerabilities: " + theCrea.damage_vulnerabilities + ".";
			AddString(traitsFld, tempString, true);
		}
		if (theCrea.damage_resistances) {
			var tempString = "\u25C6 Damage Resistances: " + theCrea.damage_resistances + ".";
			AddString(traitsFld, tempString, true);
		}
		if (theCrea.damage_immunities) {
			var tempString = "\u25C6 Damage Immunities: " + theCrea.damage_immunities + ".";
			AddString(traitsFld, tempString, true);
		}
		if (theCrea.condition_immunities) {
			var tempString = "\u25C6 Condition Immunities: " + theCrea.condition_immunities + ".";
			AddString(traitsFld, tempString, true);
		}
		//add actions
		if (theCrea.actions) {
			for (var t = 0; t < theCrea.actions.length; t++) {
				var actionString = "\u25C6 " + theCrea.actions[t].name + ": ";
				actionString += theCrea.actions[t].description;
				AddString(traitsFld, actionString, true);
			}
		}
		//add traits
		if (theCrea.traits) {
			for (var t = 0; t < theCrea.traits.length; t++) {
				var traitString = "\u25C6 " + theCrea.traits[t].name + ": ";
				traitString += theCrea.traits[t].description;
				AddString(traitsFld, traitString, true);
			}
		}
	}

	thermoM(8/10); //increment the progress dialog's progress

	//convert to metric, if applicable
	if (What("Unit System") === "metric") {
		if (What(traitsFld)) Value(traitsFld, ConvertToMetric(What(traitsFld), 0.5));
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//add a wild shape to the top most empty place
function AddWildshape(input, inCrea) {
	var prefixA = What("Template.extras.WSfront").split(",").splice(1);
	var inputLC = input.toLowerCase();
	inCrea = inCrea && CreatureList[inCrea] ? inCrea : ParseCreature(inputLC);
	if (!inCrea) return;
	for (var n = 1; n <= 2; n++) {
		for (var p = 0; p < prefixA.length; p++) {
			var prefix = prefixA[p];
			for (var i = 1; i <= 4; i++) {
				var aShp = What(prefix + "Wildshape.Race." + i).toLowerCase();
				var aCrea = n === 1 ? ParseCreature(aShp) : "";
				if (n === 1 && (aShp == inputLC || inCrea == aCrea)) {
					return; //the value was found to already exist
				} else if (n === 2 && (!aShp || aShp.indexOf("make a selection") !== -1)) {
					Value(prefix + "Wildshape.Race." + i, input);
					return;
				}
			}
		}
	};
	//if the wildshape to add was not found and there was no room to add it, add another wild shapes page and add the entry to the top of the new page
	var newPrefix = DoTemplate("WSfront", "Add");
	Value(newPrefix + "Wildshape.Race.1", input);
}

//remove the first instance of the wild shape found
function RemoveWildshape(input) {
	var prefixA = What("Template.extras.WSfront").split(",").splice(1);
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		for (var i = 1; i <= 4; i++) {
			next = tDoc.getField(prefix + "Wildshape.Race." + i);
			if (next.value.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
				next.value = next.defaultValue;
				i = 5;
				p = prefixA.length;
				WildshapeRecalc();
			}
		}
	}
}

//make a menu for wild shape options
function MakeWildshapeMenu() {
	var prefix = getTemplPre(event.target.name, "WSfront", true);

	if (!What("Character Level") || !What("Int")|| !What("Wis")|| !What("Cha")) { //If the character has not been defined enough, the function can be stopped after making a warning-menu
		Menus.wildshape = [{cName : "Please create a character on the 1st page before trying a Wild Shape", cReturn : "nothing#toreport", bEnabled : false}];
		return; //don't do the rest of the function
	}

	//make a list of the current wild shapes entered
	var usedShapes = [];
	var prefixA = What("Template.extras.WSfront").split(",").splice(1);
	for (var p = 0; p < prefixA.length; p++) {
		for (var i = 1; i <= 4; i++) {
			var theFld = What(prefixA[p] + "Wildshape.Race." + i);
			if (!theFld || theFld.toLowerCase() === "make a selection") continue;
			var theShape = ParseCreature(theFld);
			if (theShape) usedShapes.push(theShape);
		}
	}

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			item.push({
				cName : array[i][0],
				cReturn : array[i][1] + "#" + "nothing"
			});
		}
	};

	var menuLVL2 = function (menu, name, array) {
		var temp = {};
		temp.cName = name[0];
		temp.oSubMenu = [];
		for (var i = 0; i < array.length; i++) {
			temp.oSubMenu.push({
				cName : array[i],
				cReturn : name[1] + "#" + array[i]
			})
		}
		menu.push(temp);
	};

	var menuLVL3 = function (menu, name, array) {
		var temp = [];
		for (var i = 0; i < array.length; i++) {
			temp.push({
				cName : array[i][0],
				cReturn : "add" + "#" + array[i][1],
				bMarked : usedShapes.indexOf(array[i][1]) !== -1
			});
		};
		menu.oSubMenu.push({
			cName : name,
			oSubMenu : temp
		});
	};

	var menuLVL2Ext = function (menu, array, thereturn) {
		var toTest = What("Wildshapes.Remember").split("!#TheListSeparator#!");
		for (var i = 0; i < array.length; i++) {
			menu.oSubMenu.push({
				cName : array[i][0],
				cReturn : thereturn + "#" + array[i][1],
				bMarked : toTest[0] === array[i][1]
			})
		}
	};

	var menuLVL3Ext = function (menu, name, array, thereturn) {
		var toTest = What("Wildshapes.Remember").split("!#TheListSeparator#!");
		var temp = [];
		for (var i = 0; i < array.length; i++) {
			temp.push({
				cName : array[i][0],
				cReturn : thereturn + "#" + name[1] + "#" + array[i][1],
				bMarked : toTest[1] === array[i][1]
			})
		}
		menu.oSubMenu.push({
			cName : name[0],
			oSubMenu : temp,
			bMarked : toTest[0] === name[1]
		});
	};

	var WildshapeMenu = [];

	var allCrea = {
		names : [],
		keys : {}
	};

	for (var crea in CreatureList) {
		var thisCrea = CreatureList[crea];
		if ((!(/^(air|earth|fire|water) elemental$/i).test(crea) && thisCrea.type !== "Beast") || allCrea.keys[thisCrea.name] || testSource(crea, thisCrea, "creaExcl")) {
			continue; //go on to the next creature if the creature is not a beast or its source isn't excluded
		};
		allCrea.keys[thisCrea.name] = crea;
		allCrea.names.push(thisCrea.name);
	};
	allCrea.names.sort();

	var elementals = [];
	var shapesBeast = {
		all : [],
		CR1_4 : [],
		CR1_2 : [],
		CR1 : [],
		CR2 : [],
		CR3 : [],
		CR4 : [],
		CR5 : [],
		CR6 : []
	};

	for (var C = 0; C < allCrea.names.length; C++) {
		var aCrea = allCrea.keys[allCrea.names[C]];
		var theCrea = CreatureList[aCrea];

		if ((/^(air|earth|fire|water) elemental$/i).test(aCrea))  {
			elementals.push([theCrea.name, aCrea]);
			continue; //it is not one of the other things, so just stop here
		};

		//see if the creature has a fly and/or swim speed
		var Spd = theCrea.speed.match(/fly|swim/ig);
		if (Spd) {
			switch (Spd.toLowerCase()) {
				case "fly,swim" :
				case "swim,fly" :
				 Spd = "Fly and Swim speeds";
				 break;
				case "fly" :
				 Spd = "Fly speed";
				 break;
				case "swim" :
				 Spd = "Swim speed";
				 break;
			}
		}

		//select based on challenge Rating
		var CR = theCrea.challengeRating;
		var CRname = false;
		var creaName = theCrea.name;
		switch (CR) {
			case "0" :
			case "1/8" :
			case "1/4" :
			 CRname = "1_4";
			 creaName += " (CR " + CR + (Spd ? ", " + Spd : "") + ")";
			 break;
			case "1/2" :
			 CRname = "1_2";
			 creaName += (Spd ? " (" + Spd + ")" : "");
			 break;
			case "1" :
			case "2" :
			case "3" :
			case "4" :
			case "5" :
			case "6" :
			 CRname = CR;
			 creaName += (Spd ? " (" + Spd + ")" : "");
		};

		//add it to the array of all
		shapesBeast.all.push([theCrea.name + " (CR " + CR + (Spd ? ", " + Spd : "") + ")", aCrea]);

		//add it to the CR specific array
		if (CRname) shapesBeast["CR" + CRname].push([creaName, aCrea]);
	};

	//add all the options for "Add Wild Shape"
	var BeastMenu = {
		cName : "Add Wild Shape",
		oSubMenu : []
	};
	if (CurrentSources.globalExcl.indexOf("M") !== -1) { // the monster manual has been excluded from the sources
		BeastMenu.oSubMenu.push({
			cName : "Be aware: the Monster Manual is excluded from the sources!",
			cReturn : "-",
			bEnabled : false
		});
	};
	menuLVL3(BeastMenu, "All Beasts", shapesBeast.all);
	menuLVL3(BeastMenu, "Elementals", elementals);
	menuLVL3(BeastMenu, "Beasts up to CR 1/4", shapesBeast.CR1_4);
	menuLVL3(BeastMenu, "Beasts of CR 1/2", shapesBeast.CR1_2);
	menuLVL3(BeastMenu, "Beasts of CR 1", shapesBeast.CR1);
	menuLVL3(BeastMenu, "Beasts of CR 2", shapesBeast.CR2);
	menuLVL3(BeastMenu, "Beasts of CR 3", shapesBeast.CR3);
	menuLVL3(BeastMenu, "Beasts of CR 4", shapesBeast.CR4);
	menuLVL3(BeastMenu, "Beasts of CR 5", shapesBeast.CR5);
	menuLVL3(BeastMenu, "Beasts of CR 6", shapesBeast.CR6);
	WildshapeMenu.push(BeastMenu);

	WildshapeMenu.push({cName : "-"}); //add a divider

	//add all the options for "Remove Wild Shape"
	if (usedShapes.length > 0) { //if any shapes are currently present
		menuLVL2(WildshapeMenu, ["Remove Wild Shape", "remove"], usedShapes)
	} else { //if no shapes are present to be removed, add the item, but grey it out
		WildshapeMenu.push({cName : "Remove Wild Shape", cReturn : "nothing", bEnabled : false});
	}

	WildshapeMenu.push({cName : "-"}); //add a divider

	//add the options for wildshape calculation
	var calcMenu = {
		cName : "Calculation options",
		oSubMenu : []
	};
	menuLVL2Ext(calcMenu, [["Use druid's prof. bonus if druid is prof.", "default"]], "wildshapeSelect");
	//add a submenu for the next options
	menuLVL3Ext(calcMenu, ["Use druid's prof. bonus for all prof.", "all_druid"], [["Excluding attacks and expertise", "excluding"], ["Including attacks", "attacks"], ["Including expertise", "expertise"], ["Including attacks and expertise", "attacks_expertise"]], "wildshapeSelect");
	//add two more options
	menuLVL2Ext(calcMenu, [["Use creature's prof. bonus for all prof.", "all_creature"], ["Only compare based on total number", "by_the_numbers"]], "wildshapeSelect");

	WildshapeMenu.push(calcMenu);

	//add options to re-calculate and to reset
	menuLVL1(WildshapeMenu, [["-", "-"], ["Re-calculate the Wild Shapes", "recalculate"], ["Order the Wild Shapes alphabetically (re-calculates)", "order"], ["Reset all the Wild Shapes on this page", "reset"], ["-", "-"], ["Add extra 'Wild Shapes' page", "add page"], [(prefix ? "Remove" : "Hide") + " this 'Wild Shapes' page", "remove page"]]);

	Menus.wildshape = WildshapeMenu;
};

//call the wildshape menu and do something with the results
function WildshapeOptions() {
	var MenuSelection = getMenu("wildshape");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	var prefix = getTemplPre(event.target.name, "WSfront", true);
	switch (MenuSelection[0]) {
	 case "recalculate" :
		WildshapeRecalc();
		break;
	 case "order" :
		WildshapeRecalc("order");
		break;
	 case "reset" :
		calcStop();
		tDoc.resetForm([prefix + "Wildshape.Race"]);
		break;
	 case "add" :
		AddWildshape(CreatureList[MenuSelection[1]].name, MenuSelection[1]);
		break;
	 case "remove" :
		RemoveWildshape(MenuSelection[1]);
		break;
	 case "wildshapeselect" :
		if (MenuSelection[1] === "all_druid") {
			var theValue = MenuSelection[1] + "!#TheListSeparator#!" + MenuSelection[2];
		} else {
			var theValue = MenuSelection[1] + "!#TheListSeparator#!" + "nothing";
		}
		if (What("Wildshapes.Remember") !== theValue) {
			Value("Wildshapes.Remember", theValue);
			WildshapeRecalc();
		}
		break;
	 case "add page" :
		DoTemplate("WSfront", "Add");
		break;
	 case "remove page" :
		DoTemplate("WSfront", "Remove", prefix);
		break;
	}
}

//re-calculate all the wild shapes
function WildshapeRecalc(order) {
	// first make sure we have the right calculated values (if function is invoked when changes are made after a calcStop)
	tDoc.calculateNow();

	// Start progress bar
	var thermoTxt = thermoM("Re-calculating the wild shapes...");

	var prefixA = What("Template.extras.WSfront").split(",").splice(1);
	var theFields = [];
	var theFieldsNames = [];
	//first add all the wildshapes to an array and reset all the fields
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		for (var i = 1; i <= 4; i++) {
			var theFld = prefix + "Wildshape.Race." + i;
			theFieldsNames.push(theFld); //add all the fields to the array, so we have an exhaustive list of all the options
			var theValue = What(theFld);
			if (theValue && theValue.toLowerCase() !== "make a selection") {
				theFields.push(theValue);
			}
		}
		tDoc.resetForm([prefix + "Wildshape.Race"]);
		thermoM(p/(prefixA.length * 4 + prefixA.length)); //increment the progress dialog's progress
	}
	//order the array, if so selected
	if (order) theFields.sort();

	//now add all the wildshapes in the array to the empty fields
	for (var F = 0; F < theFields.length; F++) {
		Value(theFieldsNames[F], theFields[F]);
		thermoM((F + prefixA.length)/(theFields.length + prefixA.length)); //increment the progress dialog's progress
	}
	// Stop progress bar
	thermoM(thermoTxt, true);
}

//set the drop-down menus for wildshape selection fields
function SetWildshapeDropdown(forceTooltips) {
	var tempString = "Type (or select) the name of the creature you want to calculate a Wild Shape for.";
	tempString += "\n\n" + toUni("Not auto-updated") + "\nThe generated stats will not auto-update once you change something on the first page! They will only update when your druid level changes. You can have them re-calculated using the \"Wild Shape Options\" button at the top of this page.";
	tempString += "\n\n" + toUni("First create the character") + "\nNote that nothing will happen if no character is defined on the 1st page.";
	tempString += "\n\n" + toUni("Calculation is wrong") + "\nThe Wild Shape rules are open for interpertation and your DM might not approve with the way it is done here. You can change the calculation of proficiencies using the \"Wild Shape Options\" button at the top of this page.\nYou can always change the outcome yourself, because all of the fields are editable.";

	var theList = [];

	for (var key in CreatureList) {
		if ((CreatureList[key].type === "Beast" && eval(CreatureList[key].challengeRating) <= 6) || (/^(air|earth|fire|water) elemental$/i).test(key)) {
			if (testSource(key, CreatureList[key], "creaExcl") || theList.indexOf(CreatureList[key].name) !== -1) continue;
			theList.push(CreatureList[key].name);
		}
	}
	theList.sort();

	theList.unshift("");
	if (!typePF) theList.unshift("Make a Selection");

	var applyItems = tDoc.getField("Wildshapes.Settings").submitName !== theList.toSource();
	if (applyItems) tDoc.getField("Wildshapes.Settings").submitName = theList.toSource();

	var WSfrontA = What("Template.extras.WSfront").split(",");
	for (var A = 0; A < WSfrontA.length; A++) {
		for (var i = 1; i <= 4; i++) {
			var theFld = WSfrontA[A] + "Wildshape.Race." + i;
			var theFldVal = What(theFld);
			if (applyItems) {
				tDoc.getField(theFld).setItems(theList);
				Value(theFld, theFldVal, tempString);
			} else if (forceTooltips) {
				AddTooltip(theFld, tempString);
			}
		}
	}
}

//set the drop-down menus for companion race
function SetCompDropdown(forceTooltips) {
	var tempString = "Type (or select) the name of the race you want to have on this page. Note that first a list of player races is given, followed by an alphabetical list of creatures. You are not limited by the names in the list. Just typing \"Drow\" will also be recognized, for example.";
	tempString += "\n\n" + toUni("Selecting a creature") + "\nAll information of the creature will automatically be added. This includes ability scores, proficiencies, senses, weapons, etc. You can change the things afterwards.\nBecause not all creatures need the same amount of space for all their feature text,some fields may overflow. You can manually edit these fields so that everything is visible when printed (e.g. move things to the \"Noted\" below).";
	tempString += "\n\n" + toUni("Selecting a player race") + "\nAll the same things as selecting a player race on the first page will happen, with the exception that no limited feature or ability DC is added as there is no room for that."
	tempString += "\n\n" + toUni("Changing the race") + "\nIf you entered a race that was recognized and then change the entry to something that is not recognized, all the features and abilities of the recognized race will remain in place. This way, you can change the name of the race to something, while keeping the stats of something else. For example, you can choose \"Frog\" and then change it to \"Toad\", creating a toad with the stats of a frog.";

	var theList = [""];

	for (var key in RaceList) {
		if (testSource(key, RaceList[key], "racesExcl")) continue;
		var raceNm = RaceList[key].sortname ? RaceList[key].sortname : RaceList[key].name.capitalize();
		if (theList.indexOf(raceNm) === -1) theList.push(raceNm);
	}
	theList.sort();

	var theListC = [""];
	for (var key in CreatureList) {
		if (testSource(key, CreatureList[key], "creaExcl")) continue;
		if (theListC.indexOf(CreatureList[key].name) === -1) theListC.push(CreatureList[key].name);
	}
	theListC.sort();

	theList = theList.concat(theListC);

	var applyItems = tDoc.getField("Companion.Remember").submitName !== theList.toSource();
	if (applyItems) tDoc.getField("Companion.Remember").submitName = theList.toSource();

	var AScompA = What("Template.extras.AScomp").split(",");
	for (var A = 0; A < AScompA.length; A++) {
		var theFld = AScompA[A] + "Comp.Race";
		var theFldVal = What(theFld);
		if (applyItems) {
			tDoc.getField(theFld).setItems(theList);
			Value(theFld, theFldVal, tempString);
		} else if (forceTooltips) {
			AddTooltip(theFld, tempString);
		}
	}
};

//Make menu for the button on the companion page and parse it to Menus.companion
function MakeCompMenu() {
	var prefix = getTemplPre(event.target.name, "AScomp", true);
	var usingRevisedRanger = ClassList.rangerua && !testSource("rangerua", ClassList.rangerua, "classExcl");
	var usingArtificer = SourceList["UA:A"] && CurrentSources.globalExcl.indexOf("UA:A") === -1;
	var menuLVL2 = function (menu, name, array) {
		var temp = {};
		var enabled = name[1] === "change" ? What(prefix + "Comp.Race") : true;
		temp.cName = name[0];
		if (!enabled) {
			temp.bEnabled = enabled;
		} else {
			temp.oSubMenu = [];
			for (var i = 0; i < array.length; i++) {
				if (name[1] === "visible") {
					var toShow = eval(What(prefix + "Companion.Layers.Remember"));
					var subMarked = array[i][1] === "comp.img" ? toShow[0] : toShow[1];
				} else if (name[1] === "change") {
					var subMarked = What(prefix + "Companion.Remember") === array[i][1];
				} else {
					var subMarked = What(prefix + "Companion.Remember") === name[1] && CurrentCompRace[prefix].known === array[i][1];
				}
				temp.oSubMenu.push({
					cName : array[i][0],
					cReturn : name[1] + "#" + array[i][1],
					bMarked : subMarked,
					bEnabled : array[i][1] === "no-mm" ? false : name[1] === "change" && (array[i][1] === "companion" || array[i][1] === "companionrr") && CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound !== "creature" ? false : true
				})
			}
		}
		menu.push(temp);
	};
	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			item.push({
				cName : array[i][0],
				cReturn : array[i][1] + "#" + "nothing"
			});
		}
	};

	var CompMenu = [], familiars = [], chainPact = [], mounts = [], steeds = [], companions = [], companionRR = [], mechanicalServs = [];
	var change = [
		["Into a familiar (Find Familiar spell)", "familiar"],
		["Into a Pact of the Chain familiar (Warlock feature)", "pact_of_the_chain"],
		["Into a mount (Find Steed spell)", "mount"]
	].concat(!SpellsList["find greater steed"] ? [] : [
		["Into a greater mount (Find Greater Steed spell)", "steed"]
	]).concat(!usingArtificer ? [] : [
		["Into a Mechanical Servant (Artificer feature)", "mechanicalserv"]
	]).concat([
		["Into a Ranger's Companion", usingRevisedRanger ? "companionrr" : "companion"],
		["-", "-"],
		["Reset to normal", "reset"]
	]);

	var visOptions = [
		["Show box for Companion's Appearance", "comp.img"],
		["Show Equipment section", "comp.eqp"]
	];

	//make a list of all the creatures
	for (var aCrea in CreatureList) {
		var theCrea = CreatureList[aCrea];
		if (testSource(aCrea, theCrea, "creaExcl")) continue; // test if the creature or its source isn't excluded
		if (theCrea.type === "Beast" && theCrea.size >= 3 && eval(theCrea.challengeRating) <= 1/4) {
			companions.push([theCrea.name, aCrea]);
		} else if (theCrea.type === "Beast" && theCrea.size === 2 && eval(theCrea.challengeRating) <= 2) {
			mechanicalServs.push([theCrea.name, aCrea]);
		};
		switch (theCrea.companion) {
			case "familiar_not_al" :
			if (isDisplay("DCI.Text")) break;
			case "familiar" :
				familiars.push([theCrea.name, aCrea]);
			case "pact_of_the_chain" :
				chainPact.push([theCrea.name, aCrea]);
				break;
			case "mount" :
				mounts.push([theCrea.name, aCrea]);
				break;
			case "steed" :
				steeds.push([theCrea.name, aCrea]);
				break;
			case "companion" :
				companionRR.push([theCrea.name, aCrea]);
				break;
		};
	};
	familiars.sort();
	chainPact.sort();
	mounts.sort();
	steeds.sort();
	companions.sort();
	companionRR.sort();
	mechanicalServs.sort();

	var noSrd = CurrentSources.globalExcl.indexOf("SRD") !== -1;
	var existMm = SourceList.M;
	if ((existMm && CurrentSources.globalExcl.indexOf("M") && noSrd) || (!existMm && noSrd)) { // the monster manual & SRD have been excluded from the sources
		var reminder = ["Be aware: the SRD " + (existMm ? "and Monster Manual are" : "is") + " excluded from the sources!", "no-mm"];
		familiars.unshift(reminder);
		chainPact.unshift(reminder);
		mounts.unshift(reminder);
		steeds.unshift(reminder);
		companions.unshift(reminder);
		companionRR.unshift(reminder);
		mechanicalServs.unshift(reminder);
	};

	menuLVL2(CompMenu, ["Create familiar (Find Familiar spell)", "familiar"], familiars);
	menuLVL2(CompMenu, ["Create familiar (Warlock Pact of the Chain)", "pact_of_the_chain"], chainPact);
	menuLVL2(CompMenu, ["Create mount (Find Steed spell)", "mount"], mounts);
	if (SpellsList["find greater steed"]) menuLVL2(CompMenu, ["Create greater mount (Find Greater Steed spell)", "steed"], steeds);
	if (usingArtificer) menuLVL2(CompMenu, ["Create Mechanical Servant (Artificer feature)", "mechanicalserv"], mechanicalServs);
	if (usingRevisedRanger) {
		menuLVL2(CompMenu, ["Create Revised Ranger's Companion", "companionrr"], companionRR);
	} else {
		menuLVL2(CompMenu, ["Create Ranger's Companion", "companion"], companions);
	};

	CompMenu.push({cName : "-"}); //add a divider
	menuLVL2(CompMenu, ["Change current creature", "change"], change);
	CompMenu.push({cName : "-"}); //add a divider
	menuLVL2(CompMenu, ["Change visible sections", "visible"], visOptions);
	menuLVL1(CompMenu, [["-", "-"], ["Reset this Companion page", "reset"], ["-", "-"], ["Add extra 'Companion' page", "add page"], [(prefix ? "Remove" : "Hide") + " this 'Companion' page", "remove page"]]);

	Menus.companion = CompMenu;
};

//call the companion menu and do something with the results
function CompOptions() {
	var MenuSelection = getMenu("companion");
	if (!MenuSelection || MenuSelection[0] == "nothing") return
	var prefix = getTemplPre(event.target.name, "AScomp", true);

	if (MenuSelection[0] === "reset") {
		// Start progress bar and stop calculations
		var thermoTxt = thermoM("Resetting the companion page...");
		calcStop();

		tDoc.resetForm([prefix + "Comp", prefix + "Text.Comp", prefix + "BlueText.Comp", prefix + "Cnote", prefix + "Companion"]); //reset all the fields

		thermoM(0.5); // Increment the progress bar

		ApplyAttackColor("", "", "Comp.", prefix); //reset the colour of the attack boxes
		SetHPTooltip("reset", true);
		ShowCompanionLayer(prefix);
		ClearIcons(prefix + "Comp.img.Portrait", true); //reset the appearance image

		thermoTxt = thermoM("Applying...", false); // Change the progress bar text
	} else if (MenuSelection[0] === "add page") {
		DoTemplate("AScomp", "Add");
	} else if (MenuSelection[0] === "remove page") {
		//remove the prefix, if found, from the array in the remember field
		DoTemplate("AScomp", "Remove", prefix);
	} else if (MenuSelection[0] === "visible") {
		var toShow = eval(What(prefix + "Companion.Layers.Remember"));
		if (MenuSelection[1] === "comp.img") {
			toShow[0] = !toShow[0];
		} else if (MenuSelection[1] === "comp.eqp") {
			toShow[1] = !toShow[1];
		}
		Value(prefix + "Companion.Layers.Remember", toShow.toSource());
		ShowCompanionLayer(prefix);
	} else {
		if (MenuSelection[0] === "change" && MenuSelection[1] === "reset") {
			resetCompTypes(prefix);
		} else {
			if (MenuSelection[0] !== "change") {
				Value(prefix + "Comp.Race", CreatureList[MenuSelection[1]].name);
			}
			var type = MenuSelection[0] !== "change" ? MenuSelection[0] : MenuSelection[1];
			changeCompType(type, prefix);
		}
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//change the creature on the companion page into the chosen form (familiar, mount, or pact of the chain familiar)
function changeCompType(inputType, prefix) {
	var oldType = What(prefix + "Companion.Remember");
	if (oldType) resetCompTypes(prefix);
	Value(prefix + "Companion.Remember", inputType); //set this so it can be called upon later
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the companion to a predefined type...");
	calcStop();

	// a function to add the languages
	var addCharLangArr = function() {
		var creaLangs = What(prefix + "Comp.Use.Features").match(/\u25C6 languages:.*/i);
		if (creaLangs) creaLangs = creaLangs[0].replace(/\.$/, "");
		var charLanguages = [];
		for (var i = 1; i <= FieldNumbers.langstools; i++) {
			var charFld = What("Language " + i);
			if (charFld && (!creaLangs || creaLangs.toLowerCase().indexOf(charFld.toLowerCase()) === -1)) {
				charLanguages.push(charFld);
			};
		};
		if ((/mount|steed/i).test(inputType) && charLanguages.length > 1) {
			charLanguages = [AskUserOptions("Character's language the steed knows", "Find Greater Steed companion", charLanguages, "radio")];
		};
		var charLangs = charLanguages.length === 0 ? "" : (creaLangs ? "; and understands, but doesn't speak," : "\u25C6 Languages: Understands, but doesn't speak,");
		for (var i = 0; i < charLanguages.length; i++) {
			charLangs += i !== 0 && charLanguages.length > 2 ? ", " : " ";
			charLangs += i !== 0 && i === charLanguages.length - 1 ? "and " : "";
			charLangs += charLanguages[i];
		};
		if (creaLangs && charLangs) {
			ReplaceString(prefix + "Comp.Use.Features", creaLangs + charLangs, true, creaLangs, true);
		} else if (charLangs) {
			AddString(prefix + "Comp.Use.Features", charLangs + ".", true);
		};
	};

	switch (inputType) {
	 case "familiar" :
		tDoc.resetForm([prefix + "Comp.Use.Attack"]); // familiars can't make attacks
	 case "pact_of_the_chain" :
		Value(prefix + "Comp.Type", "Familiar");
		if (CurrentCompRace[prefix].type === "Beast") changeCompDialog(prefix); //change the type, but only if just a beast
		break;
	 case "companionrr" :
	 case "companion" :
		Value(prefix + "Comp.Type", "Companion");
		break;
	 case "mount" :
	 case "steed" :
		Value(prefix + "Comp.Type", "Mount");
		changeCompDialog(prefix); // change the type

		//add the new language options to the mount's features
		addCharLangArr();

		//set the Intelligence to 6 if less than 6
		var IntFld = prefix + "Comp.Use.Ability.Int.Score";
		if (What(IntFld) < 6) Value(IntFld, 6);
		break;
	 case "mechanicalserv" :
		Value(prefix + "Comp.Type", "Servant");
		Value(prefix + "Comp.Desc.MonsterType", "Construct");

		//add the new language options
		addCharLangArr();

		//add the new poison damage immunity
		var creaDamI = What(prefix + "Comp.Use.Features").match(/\u25C6 damage immunities:.*/i);
		if (!creaDamI || !(/poison/i).test(creaDamI)) {
			var newDamI = (creaDamI ? creaDamI[0].replace(/\.$/, ", ") : "\u25C6 Damage Immunities: ") + "poison.";
			if (creaDamI) {
				ReplaceString(prefix + "Comp.Use.Features", newDamI, true, creaDamI[0], true);
			} else {
				AddString(prefix + "Comp.Use.Features", newDamI, true);
			};
		};

		//add the new poisoned and charmed condition immunity
		var creaConI = What(prefix + "Comp.Use.Features").match(/\u25C6 condition immunities:.*/i);
		if (!creaConI) {
			var newConI = "\u25C6 Condition Immunities: charmed, poisoned.";
			AddString(prefix + "Comp.Use.Features", newConI, true);
		} else if (!(/poisoned/i).test(creaConI) || !(/charmed/i).test(creaConI)) {
			newConI = creaConI[0].replace(/\.$/, ", ");
			if (!(/charmed/i).test(creaConI)) {
				newConI += "charmed";
				var goCo = true;
			}
			if (!(/poisoned/i).test(creaConI)) newConI += (goCo ? ", " : "") + "poisoned";
			newConI += ".";
			ReplaceString(prefix + "Comp.Use.Features", newConI, true, creaConI[0], true);
		};

		//add the 60 ft darkvision, if not already there, or upgrade it to 60 ft
		var creaSens = What(prefix + "Comp.Use.Senses");
		var newDarkv = What("Unit System") === "metric" ? "Darkvision 18 m" : "Darkvision 60 ft";
		if (!(/darkvision \d+.?\d*.?(ft|m)/i).test(creaSens)) {
			AddString(prefix + "Comp.Use.Senses", newDarkv, "; ");
		} else if (!(/darkvision (60.?ft|18.?m)/i).test(creaSens)) {
			var darkvis = creaSens.match(/darkvision \d+.?\d*.?(ft|m)/i)[0];
			if (parseFloat(darkvis.match(/\d+/)[0]) < (What("Unit System") === "metric" ? 18 : 60)) {
				ReplaceString(prefix + "Comp.Use.Senses", newDarkv, true, darkvis, true);
			}
		};
		break;
	 default :
		return; //don't do the rest of this function if inputType doesn't match one of the above
	};

	//add a string in the creature's feature section
	AddString(prefix + "Comp.Use.Features", compString[inputType].featurestring, true);

	//make the string for the spell/ability explanation
	AddString(prefix + "Cnote.Left", compString[inputType].string, true);

	//add any actions this spell/companion gives the character
	for (var i = 0; i < compString[inputType].actions.length; i++) {
		AddAction(compString[inputType].actions[i][0], compString[inputType].actions[i][1], compString[inputType].actionTooltip);
	};
	thermoM(0.7);
	//add level-dependent things if this is a ranger's companion
	if (inputType === "companion") {
		UpdateRangerCompanions();
	} else if (inputType === "companionrr") {
		UpdateRevisedRangerCompanions();
		if (IsNotImport) {
			app.alert({
				cMsg : toUni("Pick Two Skills") + "\nThe Ranger's Animal Companion that you have just added, gains proficiency with two additional skills as those already selected. Because there is no automation for selecting these proficiencies, please do so manually.\n\n" + toUni("Ability Score Improvements") + "\nThe Ranger's Animal Companion gains Ability Score Improvements whenever your character gains them. There is no automation for adding these either, so please don't forget to increase the ability scores for the animal companion when you get the reminder pop-up. Also, remember that any DCs for abilities that the beast possesses are based on ability scores and that they might need to be manually changed when changing the ability scores.\nThe 'Notes' section on the companion page automatically keeps track of how many points you can increase the ability scores and what the base value of those scores are according to the Monster Manual.",
				nIcon : 3,
				cTitle : "Don't forget the Skills and Ability Score Improvements!"
			});
		}
	}
	thermoM(thermoTxt, true); // Stop progress bar
};

//change the type of the creature on the companion page to one of either Celestial, Fey, or Fiend
function changeCompDialog(prefix) {
	if (!IsNotImport) return;
	//The dialog for setting the pages to print
	var theTxt = "A familiar or mount's type changes from beast to either celestial, fey, or fiend. Please select one.";
	var theDialog = {
		//variables to be set by the calling function
		bType : "Celestial",

		//when starting the dialog
		initialize : function (dialog) {
		},

		//when pressing the ok button
		commit : function (dialog) {
			var oResult = dialog.store();
			if (oResult["rCel"]) {
				this.bType = "Celestial";
			} else if (oResult["rFey"]) {
				this.bType = "Fey";
			} else if (oResult["rFie"]) {
				this.bType = "Fiend";
			}
		},

		description : {
			name : "Choose the type of your familiar/mount",
			elements : [{
				type : "view",
				elements : [{
					type : "static_text",
					item_id : "head",
					alignment : "align_fill",
					font : "heading",
					bold : true,
					height : 21,
					char_width : 30,
					name : "Choose the type of your familiar/mount"
				}, {
					type : "static_text",
					item_id : "txt0",
					wrap_name : true,
					alignment : "align_fill",
					font : "dialog",
					char_width : 30,
					name : theTxt
				}, {
					type : "cluster",
					align_children : "align_distribute",
					elements : [{
						type : "radio",
						item_id : "rCel",
						group_id : "Type",
						name : "Celestial"
					}, {
						type : "radio",
						item_id : "rFey",
						group_id : "Type",
						name : "Fey"
					}, {
						type : "radio",
						item_id : "rFie",
						group_id : "Type",
						name : "Fiend"
					}, ]
				}, {
					type : "gap",
					height : 8
				}, {
					type : "ok"
				}, ]
			}, ]
		}
	};

	app.execDialog(theDialog);

	Value(prefix + "Comp.Desc.MonsterType", theDialog.bType);
}

//update the wild shape header and all the different shapes on the all the wildshape pages
function WildshapeUpdate(inputArray) {
	var prefixA = What("Template.extras.WSfront").split(",");
	if (inputArray && inputArray[1]) {
		var wlvl = inputArray[0];
		var wUses = inputArray[1];
		var wRec = inputArray[2];
		var useString = isNaN(wUses) && (wUses.indexOf("\u221E") !== -1 || wUses.toLowerCase().indexOf("unlimited") !== -1) ? "Unlimited" : wUses + (!isNaN(wUses) ? "\u00D7" : "") + " per " + wRec;
		var wLimit = inputArray[3].match(/CR.+;/i);
		wLimit = wLimit ? "max " + wLimit[0].replace(";", "") : "";
		var wDur = inputArray[3].match(/\d+ hours?/i);
		wDur = wDur ? wDur[0] : "";
	} else {
		var useString = What("Wildshapes.Info.Uses");
		var wLimit = What("Wildshapes.Info.Limitations");
		var wDur = What("Wildshapes.Info.Duration");
		prefixA.splice(prefixA.indexOf(""), 1);
	}
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		if (useString) {
			Value(prefix + "Wildshapes.Info.Uses", useString);
			Value(prefix + "Wildshapes.Info.Limitations", wLimit);
			Value(prefix + "Wildshapes.Info.Duration", wDur);
		} else {
			tDoc.resetForm([prefix + "Wildshapes.Info"]);
		};
	};
	//now recalculate all the wild shapes if not just adding a new sheet (i.e. inputArray === undefined)
	if (inputArray !== undefined) WildshapeRecalc();
}

//change the font of all fields to this
function ChangeFont(newFont, oldFont) {
	newFont = newFont ? newFont : (!typePF ? "SegoePrint" : "SegoeUI");
	oldFont = oldFont ? oldFont : tDoc.getField((tDoc.info.AdvLogOnly ? "AdvLog." : "") + "Player Name").textFont;
	var aTest = newFont === (!typePF ? "SegoePrint" : "SegoeUI") ? true : testFont(newFont);
	if (!aTest || newFont == oldFont) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying the " + newFont + " font...");
	calcStop();

	var FldNums = tDoc.numFields;
	for (var F = 0; F < FldNums; F++) {
		var Fname = tDoc.getNthFieldName(F);
		var Fld = tDoc.getField(Fname);
		if (!(/spells\.|Template\.extras/).test(Fname) && Fld.textFont === oldFont && (Fld.type !== "text" || Fld.richText === false)) {
			Fld.textFont = newFont;
		}
		thermoM((F+1)/FldNums); //increment the progress dialog's progress
	}

	thermoM(thermoTxt, true); // Stop progress bar
}

//change the colorscheme that is used for the Ability Save DC. Choose from: "red", "green", ""; The "DC" can be either 1 or 2.
function ApplyDCColorScheme(colour, DC) {
	if (typePF || (!colour && What("Color.DC") === tDoc.getField("Color.DC").defaultValue)) return; //don't do this function in the Printer-Friendly version or if resetting with the default colour
	//stop the function if the input color is not recognized
	colour = colour && isNaN(colour) ? colour.toLowerCase() : What("Color.DC").split(",")[DC - 1];
	if (colour && colour !== "same as headers" && colour !== "same as dragon heads" && !ColorList[colour]) {
		return;
	}

	var colorGo = What("Color.DC").split(",");
	var DCstart = DC ? DC : 1;
	var DCstop = DC ? DC : 2;

	if (DC && colour) {
		//set the color of the DC that was given in the input
		colorGo[DC - 1] = colour;
	} else if (colour) { //if no DC is given, assume both need to be set to the same
		colorGo = [colour, colour];
	}

	//set the chosen colors to a place it can be found again
	Value("Color.DC", colorGo);

	for (var dc = DCstart; dc <= DCstop; dc++) {
		var DCcolor = colorGo[dc - 1];
		switch (DCcolor) {
			case "same as headers" :
				DCcolor = What("Color.Theme");
				break;
			case "same as dragon heads" :
				DCcolor = What("Color.DragonHeads");
				break;
		}
		if (!ColorList[DCcolor]) {
			continue; //if not a recognized colour, continue with the next
		}
		var DCimg = tDoc.getField("SaveIMG.SaveDC." + DCcolor).buttonGetIcon();
		tDoc.getField("Image.SaveDC." + dc).buttonSetIcon(DCimg);
		var DCarrow = tDoc.getField("SaveIMG.Arrow." + DCcolor).buttonGetIcon();
		tDoc.getField("Image.SaveDCarrow." + dc).buttonSetIcon(DCarrow);
		tDoc.getField("Spell DC " + dc + " Mod").textColor = ColorList[DCcolor].RGB;
	}
}

// Make menu for the button on each Action line and parse it to Menus.actions
function MakeActionMenu_ActionOptions(MenuSelection, FldNm, itemNmbr) {
	var actionMenu = [];
	if (!itemNmbr) itemNmbr = parseFloat(event.target.name.slice(-2));
	if (!FldNm) FldNm = event.target.name.match(/bonus action|reaction|action/i)[0];
	var type = FldNm.toLowerCase();
	FldNm = FldNm + " ";
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	var theField = What(FldNm + itemNmbr);
	var noUp = itemNmbr === 1;
	var noDown = itemNmbr === maxNmbr;

	if (!MenuSelection || MenuSelection === "justMenu") {
		// a function to add the other items
		var menuLVL1 = function (array) {
			for (i = 0; i < array.length; i++) {
				actionMenu.push({
					cName : array[i][0],
					cReturn : "action#" + array[i][1],
					bEnabled : array[i][2] !== undefined ? array[i][2] : true
				});
			}
		};

		var menuArray = [
			["Move up" + (itemNmbr === (maxNmbr - 5) ? " (to first page)" : ""), "up", !noUp],
			["Move down" + (itemNmbr === (maxNmbr - 6) ? " (to overflow page)" : ""), "down", !noDown],
			["-", "-"],
			["Insert empty " + type, "insert", noDown || !theField ? false : true],
			["Delete item", "delete"],
			["Clear item", "clear"]
		];
		if (type === "action" && (!typePF || itemNmbr > (maxNmbr - 6))) {
			menuArray = menuArray.concat([
				["-", "-"],
				["Swap with opposing field", "opposite"]
			]);
		}
		menuLVL1(menuArray);
		Menus.actions = actionMenu;
		if (MenuSelection == "justMenu") return;
	}
	var MenuSelection = MenuSelection ? MenuSelection : getMenu("actions");
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] != "action") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying action menu option...");
	calcStop();

	switch (MenuSelection[1]) {
		case "up" :
			if (noUp) return;
		case "down" :
			if (MenuSelection[1] == "down" && noDown) return;
		case "opposite":
			thermoTxt = thermoM("Moving the " + type + " " + MenuSelection[1] + "...", false);
			// Get the other fields
			var otherNmbr = MenuSelection[1] == "down" ? itemNmbr + 1 : MenuSelection[1] == "up" ? itemNmbr - 1 :
				// swap with opposite, first see if on overflow page and which side
				itemNmbr > maxNmbr - 3 ? itemNmbr - 3 : itemNmbr > maxNmbr - 6 && itemNmbr < maxNmbr - 3 ? itemNmbr + 3 :
				// swap with opposite on 1st page, see which side
				itemNmbr > (maxNmbr - 6) / 2 ? itemNmbr - ((maxNmbr - 6) / 2) : itemNmbr - ((maxNmbr + 6) / 2);
			// Now swap the fields
			copyField(FldNm + itemNmbr, FldNm + otherNmbr, { noCalc : true }, true);
			break;
		case "insert" :
			ActionInsert(type, itemNmbr);
			break;
		case "delete" :
			ActionDelete(type, itemNmbr);
			break;
		case "clear" :
			Value(FldNm + itemNmbr, "", "", "");
			break;
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

function AddAction(actiontype, action, actiontooltip, replaceThis, replaceMatch) {
	var field = (/bonus/i).test(actiontype) ? "Bonus Action " : (/reaction/i).test(actiontype) ? "Reaction " : "Action ";
	var numberOfFields = field === "Action " ? FieldNumbers.trueactions : FieldNumbers.actions;
	// first loop through all to see if it isn't already known
	// also check if there is a match if we are trying to replace something
	var doReplace = false;
	for (var i = 1; i <= numberOfFields; i++) {
		var setVal = How(field + i).split("#!#");
		if (replaceThis && (setVal[0] == replaceThis || (replaceMatch && What(field + i).toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1))) doReplace = i;
		if (setVal[0] == action) {
			if (actiontooltip) { // add the extra source
				var tooltips = setVal.slice(1);
				if (tooltips.indexOf(actiontooltip) == -1) {
					tooltips = tooltips.concat([actiontooltip]);
					AddTooltip(
						field + i,
						formatMultiList('The "' + action + '" ' + field.toLowerCase() + "was gained from:", tooltips),
						setVal.concat([actiontooltip]).join("#!#")
					);
				}
			}
			return;
		}
	}
	// set the new action to its field
	for (var i = 1; i <= numberOfFields; i++) {
		var actFld = tDoc.getField(field + i);
		if ((doReplace && doReplace === i) || (!doReplace && actFld.value === "")) {
			actFld.value = action;
			actFld.userName = actiontooltip ? formatMultiList('The "' + action + '" ' + field.toLowerCase() + "was gained from:", actiontooltip) : "";
			actFld.submitName = actiontooltip ? [action, actiontooltip].join("#!#") : action;
			return;
		}
	}
};

function RemoveAction(actiontype, action, actiontooltip) {
	var field = (/bonus/i).test(actiontype) ? "Bonus Action " : (/reaction/i).test(actiontype) ? "Reaction " : "Action ";
	var numberOfFields = field === "Action " ? FieldNumbers.trueactions : FieldNumbers.actions;
	for (var i = 1; i <= numberOfFields; i++) {
		var actFldVal = What(field + i);
		var setVal = How(field + i).split("#!#");
		if ((typeof action == "object" && (action).test(actFldVal)) || (typeof action == "string" && setVal[0] == action)) {
			if (setVal.length < 3 || !actiontooltip) {
				ActionDelete(clean(field).toLowerCase(), i);
			} else if (actiontooltip) {
				var tooltips = setVal.slice(1);
				tooltips.splice(tooltips.indexOf(actiontooltip), 1);
				AddTooltip(
					field + i,
					formatMultiList('The "' + setVal[0] + '" ' + field.toLowerCase() + "was gained from:", tooltips),
					[setVal[0]].concat(tooltips).join("#!#")
				);
			}
			return;
		};
	};
};

//insert a Action at the position wanted
function ActionInsert(type, itemNmbr) {
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	var FldNm = type.capitalize() + " ";
	var Field = FldNm + itemNmbr;

	//stop the function if the selected slot is already empty
	if (What(Field) === "" || itemNmbr === maxNmbr) return;

	//look for the first empty slot below the slot
	var endslot = false;
	for (var i = itemNmbr + 1; i <= maxNmbr; i++) {
		if (What(FldNm + i) === "") {
			endslot = i;
			break;
		};
	};

	//only continue if an empty slot was found in the fields
	if (!endslot) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Inserting empty " + type + "...");
	calcStop();

	//cycle to the slots starting with the empty one and add the values of the one above
	for (var i = endslot; i > itemNmbr; i--) {
		copyField(FldNm + (i - 1), FldNm + i, { noCalc : true });
	};

	//empty the selected slot
	Value(Field, "", "", "");

	thermoM(thermoTxt, true); // Stop progress bar
};

//delete a Action at the position wanted and move the rest up
function ActionDelete(type, itemNmbr) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Deleting " + type + "...");
	calcStop();

	var FldNm = type.capitalize() + " ";
	// var Field = FldNm + itemNmbr;
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	if (!typePF && type === "action" && itemNmbr < (maxNmbr- 6) / 2) {
		var maxNmbr = (maxNmbr - 6) / 2;
	} else {
		maxNmbr = itemNmbr > (maxNmbr - 6) || What(FldNm + (maxNmbr - 6)) ? maxNmbr : maxNmbr - 6; //stop at the end of the first page if last one on first page is empty
	};

	//move every line up one space, starting with the line below the selected line
	for (var i = itemNmbr; i < maxNmbr; i++) {
		copyField(FldNm + (i + 1), FldNm + i, { noCalc : true });
	};

	//delete the contents of the final line
	Value(FldNm + maxNmbr, "", "", "");

	thermoM(thermoTxt, true); // Stop progress bar
};

//Make menu for the button on each Limited Feature line and parse it to Menus.limfea
function MakeLimFeaMenu() {
	var limfeaMenu = [];
	var itemNmbr = parseFloat(event.target.name.slice(-2));
	var maxNmbr = FieldNumbers.limfea;
	var theField = What("Limited Feature " + itemNmbr);
	var SslotsVisible = !typePF && eval(What("SpellSlotsRemember"))[0];
	var frstPend = SslotsVisible ? 5 : 8;

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			var enabled = true
			if ((array[i] === "Move up" && itemNmbr === 1) || (array[i] === "Move down" && itemNmbr === maxNmbr) || (array[i] === "Insert empty limited feature" && (!theField || itemNmbr === maxNmbr))) {
				enabled = false;
			}
			var extraName = "";
			if (array[i] === "Move down" && itemNmbr === frstPend) {
				extraName = " (to overflow page)";
			} else if (array[i] === "Move up" && itemNmbr === 9) {
				extraName = " (to first page)";
			}
			item.push({
				cName : array[i] + extraName,
				cReturn : array[i],
				bEnabled : enabled
			});
		}
	};

	menuLVL1(limfeaMenu, ["Move up", "Move down", "-", "Insert empty limited feature", "Delete limited feature", "Clear limited feature"]);

	Menus.limfea = limfeaMenu;
};

//call the Limited Feature menu and do something with the results
function LimFeaOptions() {
	var MenuSelection = getMenu("limfea");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	var itemNmbr = parseFloat(event.target.name.slice(-2));
	var maxNmbr = FieldNumbers.limfea;
	var FieldNames = [
		"Limited Feature ",
		"Limited Feature Max Usages ",
		"Limited Feature Recovery ",
		"Limited Feature Used "
	];
	var Fields = [], FieldsValue = [], FieldsTool = [], FieldsCalc = [], FieldsUp = [], FieldsUpValue = [], FieldsUpTool = [], FieldsUpCalc = [], FieldsDown = [], FieldsDownValue = [], FieldsDownTool = [], FieldsDownCalc = [];

	var SslotsVisible = !typePF && eval(What("SpellSlotsRemember"))[0];
	var upDownOffset = SslotsVisible && (itemNmbr === 5 || itemNmbr === 9) ? 4 : 1;

	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(FieldNames[F] + itemNmbr);
		FieldsValue.push(What(Fields[F]));
		FieldsTool.push(Who(Fields[F]));
		FieldsCalc.push(tDoc.getField(Fields[F]).submitName);
		if (itemNmbr !== 1) {
			FieldsUp.push(FieldNames[F] + (itemNmbr - upDownOffset));
			FieldsUpValue.push(What(FieldsUp[F]));
			FieldsUpTool.push(Who(FieldsUp[F]));
			FieldsUpCalc.push(tDoc.getField(FieldsUp[F]).submitName);
		}
		if (itemNmbr !== maxNmbr) {
			FieldsDown.push(FieldNames[F] + (itemNmbr + upDownOffset));
			FieldsDownValue.push(What(FieldsDown[F]));
			FieldsDownTool.push(Who(FieldsDown[F]));
			FieldsDownCalc.push(tDoc.getField(FieldsDown[F]).submitName);
		}
	}

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying limited feature menu option...");
	calcStop();
	switch (MenuSelection[0]) {
	 case "move up":
		thermoTxt = thermoM("Moving the limited feature line up...", false); //change the progress dialog text
		for (var H = 0; H < FieldNames.length; H++) {
			tDoc.getField(FieldsUp[H]).setAction("Calculate", FieldsCalc[H]);
			tDoc.getField(FieldsUp[H]).submitName = FieldsCalc[H];
			tDoc.getField(Fields[H]).setAction("Calculate", FieldsUpCalc[H]);
			tDoc.getField(Fields[H]).submitName = FieldsUpCalc[H];
			Value(FieldsUp[H], FieldsValue[H], FieldsTool[H]);
			Value(Fields[H], FieldsUpValue[H], FieldsUpTool[H]);
			thermoM(H/FieldNames.length); //increment the progress dialog's progress
		};
		break;
	 case "move down":
		thermoTxt = thermoM("Moving the limited feature line down...", false); //change the progress dialog text
		for (var H = 0; H < FieldNames.length; H++) {
			tDoc.getField(FieldsDown[H]).setAction("Calculate", FieldsCalc[H]);
			tDoc.getField(FieldsDown[H]).submitName = FieldsCalc[H];
			tDoc.getField(Fields[H]).setAction("Calculate", FieldsDownCalc[H]);
			tDoc.getField(Fields[H]).submitName = FieldsDownCalc[H];
			Value(FieldsDown[H], FieldsValue[H], FieldsTool[H]);
			Value(Fields[H], FieldsDownValue[H], FieldsDownTool[H]);
			thermoM(H/FieldNames.length); //increment the progress dialog's progress
		};
		break;
	 case "insert empty limited feature":
		thermoTxt = thermoM("Inserting empty limited feature line...", false); //change the progress dialog text
		LimFeaInsert(itemNmbr);
		break;
	 case "delete limited feature":
		thermoTxt = thermoM("Deleting limited feature line...", false); //change the progress dialog text
		LimFeaDelete(itemNmbr);
		break;
	 case "clear limited feature":
		thermoTxt = thermoM("Clearing limited feature line...", false); //change the progress dialog text
		for (var T = 0; T < Fields.length; T++) {
			Value(Fields[T], "", "");
			tDoc.getField(Fields[T]).setAction("Calculate", "");
			tDoc.getField(Fields[T]).submitName = "";
			thermoM(T/Fields.length); //increment the progress dialog's progress
		}
		break;
	}
	thermoM(thermoTxt, true); // Stop progress bar
};

//insert a Limited Feature at the position wanted
function LimFeaInsert(itemNmbr) {
	var SslotsVisible = !typePF && eval(What("SpellSlotsRemember"))[0];
	var maxNmbr = FieldNumbers.limfea;
	var FieldNames = [
		"Limited Feature ",
		"Limited Feature Max Usages ",
		"Limited Feature Recovery ",
		"Limited Feature Used "
	];
	var Fields = [];
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(FieldNames[F] + itemNmbr);
	}

	//stop the function if the selected slot is already empty
	if (What(Fields[0]) === "" || itemNmbr === maxNmbr) {
		return;
	}

	//look for the first empty slot below the slot
	var endslot = "";
	for (var i = itemNmbr + 1; i <= maxNmbr; i++) {
		if (SslotsVisible && i > 5 && i < 9) continue;
		if (What(FieldNames[0] + i) === "") {
			endslot = i;
			i = (maxNmbr + 1);
		}
	}

	//only continu if an empty slot was found in the fields
	if (endslot) {
		//cycle to the slots starting with the empty one and add the values of the one above
		for (var i = endslot; i > itemNmbr; i--) {
			if (SslotsVisible && i > 5 && i < 9) continue;
			var downOffset = SslotsVisible && i === 9 ? 4 : 1;
			for (var H = 0; H < FieldNames.length; H++) {
				//set the calculations of the usages field
				var theCalc = tDoc.getField(FieldNames[H] + (i - downOffset)).submitName;
				tDoc.getField(FieldNames[H] + i).setAction("Calculate", theCalc);
				tDoc.getField(FieldNames[H] + i).submitName = theCalc;
				//set the value of the field
				Value(FieldNames[H] + i, What(FieldNames[H] + (i - downOffset)), Who(FieldNames[H] + (i - downOffset)));
			}
		}

		//empty the selected slot
		for (var T = 0; T < Fields.length; T++) {
			Value(Fields[T], "", "");
			tDoc.getField(Fields[T]).setAction("Calculate", "");
			tDoc.getField(Fields[T]).submitName = "";
		}
	}
}

//delete a Limited Feature at the position wanted and move the rest up
function LimFeaDelete(itemNmbr) {
	var SslotsVisible = !typePF && eval(What("SpellSlotsRemember"))[0];
	var frstPend = SslotsVisible ? 5 : 8;
	var maxNmbr = FieldNumbers.limfea;
	maxNmbr = itemNmbr > frstPend || What("Limited Feature 8") ? maxNmbr : frstPend; //stop at the end of the first page if last one on first page is empty
	var FieldNames = [
		"Limited Feature ",
		"Limited Feature Max Usages ",
		"Limited Feature Recovery ",
		"Limited Feature Used "
	];
	var Fields = [];
	var EndFields = [];
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(FieldNames[F] + itemNmbr);
		EndFields.push(FieldNames[F] + maxNmbr);
	}

	//move every line up one space, starting with the line below the selected line
	for (var i = itemNmbr; i < maxNmbr; i++) {
		for (var H = 0; H < FieldNames.length; H++) {
			if (SslotsVisible && i > 5 && i < 9) continue;
			var upOffset = SslotsVisible && i === 5 ? 4 : 1;
			//set the calculations of the usages field
			var theCalc = tDoc.getField(FieldNames[H] + (i + upOffset)).submitName;
			tDoc.getField(FieldNames[H] + i).setAction("Calculate", theCalc);
			tDoc.getField(FieldNames[H] + i).submitName = theCalc;
			//set the value of the field
			Value(FieldNames[H] + i, What(FieldNames[H] + (i + upOffset)), Who(FieldNames[H] + (i + upOffset)));
		};
	}

	//delete the contents of the final line
	for (var T = 0; T < EndFields.length; T++) {
		Value(EndFields[T], "", "");
		tDoc.getField(EndFields[T]).setAction("Calculate", "");
		tDoc.getField(EndFields[T]).submitName = "";
	}
}

//a way of going to a specified field (for making bookmarks independent of templates)
function Bookmark_Goto(BookNm) {
	// Find the field corresponding to the bookmark name
	var theTemplate = event.type === "Bookmark" ? getBookmarkTemplate(event.target) : false;
	var isVisible = theTemplate ? isTemplVis(theTemplate[0], true) : true;
	var prefix = "";
	if (isArray(isVisible)) {
		prefix = isVisible[1];
		isVisible = isVisible[0];
	}
	var theFld = prefix + BookMarkList[BookNm];

	// Determine if the selected section is on a visible page, and if so go to it.
	if (isVisible && theFld && tDoc.getField(theFld)) {
		tDoc.getField(theFld).setFocus();
		return;
	};

	// If the selected section is on a hidden page, alert the user.
	if (theTemplate) {
		var theMessage = {
			cMsg : "The bookmark \"" + BookNm + "\" you have selected is on a page which is currently hidden.\n\You can change your page visibility settings using the \"Layout\" button in the \"JavaScript Window\" or in the bookmarks.\n\nDo you want to make the page \"" + theTemplate[1] + "\" visible now?" + (theTemplate[0] !== "SSfront" ? "" : "\n\nClicking \"Yes\" will start the Spell Sheets Generation process."),
			nIcon : 2, //question mark
			cTitle : "Bookmark is currently unavailable",
			nType : 2, //Yes-No
		};
		if (app.alert(theMessage) === 4) {
			if (theTemplate[0] !== "SSfront") {
				var newPrefix = DoTemplate(theTemplate[0], "Add");
				tDoc.getField(newPrefix + BookMarkList[BookNm]).setFocus();
			} else {
				GenerateSpellSheet();
			};
		};
	};
};

// show/hide a template (AddRemove == undefined) or add/remove template with multiple instances (AddRemove == "Add" | "Remove" | "RemoveAll")
function DoTemplate(tempNm, AddRemove, removePrefix, GoOn) {
	MakeMobileReady(false); // Undo flatten, if needed

	//make a function for determining the next page to add the template
	var whatPage = function(templN) {
		var DepL = TemplateDep[templN];
		for (var T = 0; T < DepL.length; T++) {
			var theDep = DepL[T];
			var multiDep = TemplatesWithExtras.indexOf(theDep) !== -1;
			if (!multiDep) {
				var DepTypeFld = tDoc.getField(BookMarkList[theDep]);
				if (isArray(DepTypeFld.page)) {
					return Math.max.apply(Math, DepTypeFld.page) + 1;
				};
			} else {
				var DepTypeFlds = What("Template.extras." + theDep);
				if (DepTypeFlds) {
					return tDoc.getField(DepTypeFlds.split(",").slice(-1)[0] + BookMarkList[theDep]).page + 1;
				};
			};
		};
		return 2;
	};

	//are we dealing with a template that can have multiple instances or not?
	var multiTemp = TemplatesWithExtras.indexOf(tempNm) !== -1;

	if (!multiTemp) { // spawn or hide the template page for templates that can't have multiple instances
		var isTempVisible = isTemplVis(tempNm);
		if (isTempVisible) {
			//find the current page of the template
			var tempPage = Math.max.apply(Math, tDoc.getField(BookMarkList[tempNm]).page);

			// Start progress bar
			var thermoTxt = thermoM("Hiding " + TemplateNames[tempNm] + ", from page " + (tempPage + 1) + "...");
			thermoM(0.9);

			tDoc.deletePages(tempPage);

			//grey out the appropriate bookmarks
			amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], false);

			// Stop progress bar
			thermoM(thermoTxt, true);
		} else {
			//the template is invisible, so we have to add it at the right page
			var tempPage = whatPage(tempNm);

			// Start progress bar and stop calculations
			var thermoTxt = thermoM("Revealing " + TemplateNames[tempNm] + ", at page " + (tempPage + 1) + "...");
			thermoM(0.5);
			calcStop();

			//now spawn a new instance of the template with the same fields as the template at the desired page
			tDoc.getTemplate(tempNm).spawn(tempPage, false, false);

			//black out the appropriate bookmarks
			amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], true);

			//now do some extra actions, depending on the page added
			switch (tempNm) {
			 case "ASfront" :
				// if the location column on the second page was set to visible, re-do this again
				if (What("Gear Location Remember").split(",")[1] === "true") {
					HideInvLocationColumn("Extra.Gear ", false);
				};
			 case "ASoverflow" :
				// Correct the visibility of attuned checkboxes of the magic items
				correctMIattunedVisibility(tempNm);
				break;
			};

			//move focus to this new page
			if (IsNotImport) tDoc.getField(BookMarkList[tempNm] + ".1").setFocus();

			// Stop progress bar and start calculations
			thermoM(thermoTxt, true);
		};
	} else { // add or remove a template that can have multiple instances
		var isTempVisible = isTemplVis(tempNm);
		var tempExtras = What("Template.extras." + tempNm).split(",");
		//removing one or all pages
		var isSS = tempNm.substring(0, 2) === "SS";

		if ((/remove/i).test(AddRemove) && isTempVisible) { // If told to remove a page and a page exists
			var newTemplList = What("Template.extras." + tempNm).split(",");
			var removeWhich = (/removeall/i).test(AddRemove) ? "all" : removePrefix ? tempExtras.indexOf(removePrefix) : "last";
			tempExtras = isNaN(removeWhich) ? tempExtras.splice(removeWhich === "all" ? 1 : -1) : tempExtras.splice(removeWhich, 1);
			var pageNr = tempExtras.length > 1 ? false : tDoc.getField(tempExtras[0] + BookMarkList[tempNm]).page + 1;
			var removeTxt = (removeWhich === "all" ? "all " : "") + TemplateNames[tempNm] + (removeWhich === "all" ? "s that are currently in this document" : " (page "+pageNr+")");

			var doGoOn = {
				cTitle: "Continue with deleting page(s)?",
				cMsg: "You are about to remove " + removeTxt + ". All this data will be permanently lost.\n\nThis can't be undone!\nAre you sure you want to continue?",
				nIcon: 2,
				nType: 2
			};

			// Start progress bar
			var thermoTxt = thermoM("Deleting " + removeTxt + "...");

			if (GoOn || app.alert(doGoOn) === 4) {
				for (var i = tempExtras.length - 1; i >= 0; i--) {
					var tempPage = tDoc.getField(tempExtras[i] + BookMarkList[tempNm]).page;
					thermoM((i + 1) / tempExtras.length); // Increment the progress bar
					tDoc.deletePages(tempPage);
					//remove the deleted entry from the newTemplList
					newTemplList.splice(newTemplList.indexOf(tempExtras[i]), 1);
				};

				// Put the updated array in the field
				Value("Template.extras." + tempNm, newTemplList);

				// Amend the bookmarks
				if (newTemplList.toString() === "") amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], false);

				// Do some extra actions, depending on the page(s) removed
				switch (tempNm) {
				 case "ALlog" :
					if (newTemplList.length) UpdateLogsheetNumbering(newTemplList[1]); // Update the header texts for the still remaining logsheets
					break;
				};
			};

			// Stop progress bar
			thermoM(thermoTxt, true);

		} else if ((/add/i).test(AddRemove)) {
			// find the page where we want to add the new page at
			var tempPage = !isTempVisible ? whatPage(tempNm) : tDoc.getField(tempExtras.slice(-1)[0] + BookMarkList[tempNm]).page + 1;

			// Start progress bar and stop calculations
			var thermoTxt = thermoM(isSS ? "Generating the Spell Sheet(s), Acrobat will be unresponsive for a long time..." : "Adding " + TemplateNames[tempNm] + ", at page " + (tempPage + 1) + "...");
			thermoM(0.35);
			calcStop();

			var theNewPrefix = "P" + tempPage + "." + tempNm + ".";

			//if this template is already in use, it might already have the exact prefix that we would make. Thus, we will have to add blank pages to increase the number until it is no longer already defined
			var toDeleteArray = [];
			if (isTempVisible && tempExtras.indexOf(theNewPrefix) !== -1) {
				while (tempExtras.indexOf(theNewPrefix) !== -1) {
					tDoc.getTemplate("blank").spawn(tempPage, false, false);
					toDeleteArray.push(tempPage);
					tempPage++;
					theNewPrefix = "P" + tempPage + "." + tempNm + ".";
				};
			};

			// Add another instance of the template, but with changing the field names
			tDoc.getTemplate(tempNm).spawn(tempPage, true, false);

			// Put the updated array in the field
			tempExtras.push(theNewPrefix);
			Value("Template.extras." + tempNm, tempExtras.toString());

			// Delete all the blank pages we added earlier
			if (toDeleteArray.length) tDoc.deletePages({nStart: toDeleteArray[0], nEnd: toDeleteArray[0] + toDeleteArray.length - 1});

			// Amend the bookmarks
			if (!isTempVisible && BookMarkList[tempNm + "_Bookmarks"]) amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], true);

			// Do some extra actions, depending on the page added
			switch (tempNm) {
			 case "AScomp" : // Re-find the companion pages races and weapons
				FindCompRace(undefined, theNewPrefix);
				FindCompWeapons(undefined, theNewPrefix);
				break;
			 case "ALlog" : // Update header text and reset calculation order
				if (isTempVisible) UpdateLogsheetNumbering(theNewPrefix);
				SetAdvLogCalcOrder(theNewPrefix);
				break;
			 case "SSfront" : // change the tooltips of the top header and divider, as those can't be moved or hidden
				AddTooltip(theNewPrefix + "spellshead.Text.header.0", "Clear the content of this field to make its prepared section visible again, if you had hidden it.");
				AddTooltip(theNewPrefix + "spellsdiv.Text.0", "");
				break;
			 case "SSmore" :
				Uneditable(theNewPrefix + "spellshead." + (!typePF? "Text" : "Image") + ".prepare.0");
				break;
			};

			//set focus to the new page
			tDoc.getField(theNewPrefix + BookMarkList[tempNm]).setFocus();

			// Stop progress bar and start calculations
			thermoM(thermoTxt, true);
		};
	};
	// If a new template was created with a prefix, return that prefix
	return theNewPrefix ? theNewPrefix : "";
};

//Make menu for the options for hiding, adding, and removing templates (i.e. pages)
function MakePagesMenu() {
	//the functions for adding the base menu elements
	var menuLvl1 = function (menu, array) {
		for (var i = 0; i < array.length; i++) {
			var isMarked = isTemplVis(array[i]);
			menu.push({
				cName : TemplateNames[array[i]],
				cReturn : "template#" + array[i] + "#toggle",
				bMarked : isMarked
			});
		};
	};

	//the start menu entry
	var pagesMenu = [{
		cName : "[Mark the pages you want visible]",
		cReturn : "nothing#toreport",
		bEnabled : false
	}];
	//the menu items for the pages that can only be hidden/shown
	menuLvl1(pagesMenu, ["ASfront", "ASoverflow", "ASbackgr"]);

	//the menu items for the templates of which multiple instances can exist
	var menuLvl2templ = function (menu, array) {
		for (var i = 0; i < array.length; i++) {
			var isVisible = isTemplVis(array[i]);
			var templName = TemplateNames[array[i]];
			var temp = {
				cName : templName,
				bMarked : isVisible
			};
			if (isVisible) {
				var visNr = What("Template.extras." + array[i]).split(",").length - 1;
				temp.oSubMenu = (visNr <= 1 ? [] : [{
					cName : "[" + visNr + " " + templName + "s active]",
					bEnabled : false
				}]).concat([{
					cName : "Add extra " + templName,
					cReturn : "template#" + array[i] + "#add"
				}, {
					cName : "Remove " + (visNr > 1 ? "last " : "") + templName,
					cReturn : "template#" + array[i] +
					"#remove"
				}]).concat(visNr <= 1 ? [] : [{
					cName : "Remove all " + templName + "s",
					cReturn : "template#" + array[i] + "#removeall"
				}]);
			} else {
				temp.cReturn = "template#" + array[i] + "#add";
			};
			menu.push(temp);
		};
	};
	menuLvl2templ(pagesMenu, ["AScomp", "ASnotes", "WSfront", "ALlog"]);

	//the menu item for the refence sheet, if applicable
	if (typePF) menuLvl1(pagesMenu, ["PRsheet"]);

	//a function for adding menu items with a submenu
	var menuLVL2 = function (menu, name, array) {
		var temp = {
			cName : name[0],
			oSubMenu : []
		};
		for (var i = 0; i < array.length; i++) {
			var splitA = array[i][1].split("#");
			var isMarked = name[1] === "dndlogos" ? splitA[1] == cLogoDisplay :
				name[1] === "scores" ? array[i][1] == HoSvis || (array[i][1] == "disable" && !HoSvis) :
				name[1] === "dc" ? splitA[1] == isVis2nd :
				name[1] === "equip" ? (
					splitA[0] == "attuned" ? (splitA[1] == "hide" ? attunedHid : !attunedHid) :
					splitA[0] == "location2" ? (splitA[1] == "show" ? locColVis[0] == "true" : locColVis[0] == "false") :
					splitA[0] == "location3" ? (splitA[1] == "show" ? locColVis[1] == "true" : locColVis[1] == "false") :
					false) :
				false;
			temp.oSubMenu.push({
				cName : array[i][0],
				cReturn : name[1] + "#" + array[i][1] + "#" + isMarked,
				bMarked : isMarked
			});
		};
		menu.push(temp);
	};

	pagesMenu.push({cName : "-", cReturn : "-"}); // add a divider

	//add a menu item for the color them options
	if (!typePF) {
		MakeColorMenu();
		pagesMenu.push({
			cName : "Color Theme options",
			oSubMenu : Menus.colour
		});
	};

	//add the menu for setting the visibility of the D&D logos
	var cLogoDisplay = tDoc.getField("Image.DnDLogo.long").display;
	menuLVL2(pagesMenu, ["Visible D&&D logos", "dndlogos"], [
		["Show the D&&D logos", "show#0"],
		["Show, but don't print the D&&D logos", "noprint#2"],
		["Hide and don't print the D&&D logos", "hide#1"],
		["Hide, but print the D&&D logos", "onlyprint#3"]
	]);

	//add a menu item for the text fields
	MakeTextMenu_TextOptions("justMenu");
	pagesMenu.push({
		cName : "Text field options",
		oSubMenu : Menus.texts
	});

	pagesMenu.push({cName : "-", cReturn : "-"}); // add a divider

	//add the menu for setting adventurers league stuff
	MakeAdventureLeagueMenu();
	pagesMenu.push({
		cName : "Adventurers League options",
		oSubMenu : Menus.adventureLeague
	});

	pagesMenu.push({cName : "-", cReturn : "-"}); // add a divider

	//add a menu item for the first page
	var pageone = {
		cName : "1st page options",
		oSubMenu : []
	};
	//1st page: add the menu for the visibility of the 7h ability score
	var HoSvis = What("HoSRememberState").toLowerCase();
	menuLVL2(pageone.oSubMenu, ["Ability Scores", "scores"], [
		["Open the Ability Scores dialogue", "dialog"],
		["-", "-"],
		["Disable the 7th ability score", "disable"],
		["Make the 7th ability score 'Honor'", "honor"],
		["Make the 7th ability score 'Sanity'", "sanity"]
	]);
	//1st page: add the menu for setting hp on the first page
	MakeHPMenu_HPOptions("justMenu");
	pageone.oSubMenu.push({
		cName : "Hit Points",
		oSubMenu : Menus.hp
	});
	//1st page: add the menu for setting skill order
	MakeSkillsMenu_SkillsOptions("justMenu");
	pageone.oSubMenu.push({
		cName : "Skills",
		oSubMenu : Menus.skills
	});
	//1st page: add the menu for setting 2nd Abilty Save DC visibility
	var isVis2nd = isDisplay("Image.SaveDC" + (typePF ? "" : ".2"));
	menuLVL2(pageone.oSubMenu, ["Ability Save DC", "dc"], [
		["Show only 1 ability save DC", "hide#1"],
		["Show both ability save DCs", "show#0"]
	]);
	//1st page: add the first page menu to the whole menu
	pagesMenu.push(pageone);

	//add a menu item for the second page equipment section
	var locColVis = What("Gear Location Remember").split(",");
	var attunedHid = What("Adventuring Gear Remember");
	menuLVL2(pagesMenu, ["2nd page options (equipment section)", "equip"], [
		["Show 'Attuned Magical Items' subsection", "attuned#show"],
		["Hide 'Attuned Magical Items' subsection", "attuned#hide"],
		["-", "-"],
		["Show location column", "location2#show"],
		["Hide location column", "location2#hide"],
		["-", "-"],
		["Carried Weight options (encumbrance rules)", "weight"]
	]);

	//add a menu item for the third page
	var page3txt = "3rd page options";
	if (!isTemplVis("ASfront")) {
		pagesMenu.push({
			cName : page3txt + " [page not visible]",
			cReturn : "-",
			bEnabled : false
		});
	} else if (typePF) {
		//3rd page: add the menu items for the equipment section
		menuLVL2(pagesMenu, [page3txt + " (equipment section)", "equip"], [
			["Show location column", "location3#show"],
			["Hide location column", "location3#hide"]
		]);
	} else {
		var pagethree = {
			cName : page3txt,
			oSubMenu : []
		};
		//3rd page: add the menu items for the equipment section
		menuLVL2(pagethree.oSubMenu, ["Equipment section", "equip"], [
			["Show location column", "location3#show"],
			["Hide location column", "location3#hide"]
		]);
		//3rd page: add the menu items for the visibility of the notes/rules section (CF only)
		LayerVisibilityOptions(false, "justMenu");
		pagethree.oSubMenu.push({
			cName : "Visible sections",
			oSubMenu : Menus.chooselayers
		});
		//3rd page: add the third page menu to the whole menu
		pagesMenu.push(pagethree);
	};

	//add the menu for setting Spell Sheet things
	MakeSpellMenu();
	pagesMenu.push({
		cName : "Spell Sheet options",
		oSubMenu : Menus.spells
	});

	//add the option to enable or disable use of the unicode functions
	pagesMenu.push({cName : "-", cReturn : "-"}); // add a divider
	makeUnicodeMenu();
	pagesMenu.push(Menus.unicode);

	Menus.pages = pagesMenu;
};

//call the pages menu and do something with the results
function PagesOptions() {
	var MenuSelection = getMenu("pages");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	switch (MenuSelection[0]) {
		case "dndlogos" :
			DnDlogo(MenuSelection[2]);
			break;
		case "template" :
			MenuSelection[1] = MenuSelection[1].substr(0, 2).toUpperCase() + MenuSelection[1].substr(2);
			DoTemplate(MenuSelection[1], MenuSelection[2]);
			break;
		case "advleague" :
			AdventureLeagueOptions(MenuSelection);
			break;
		case "ssheet" :
			MakeSpellMenu_SpellOptions(MenuSelection);
			break;
		case "hp" :
			MakeHPMenu_HPOptions(MenuSelection);
			break;
		case "skills" :
			MakeSkillsMenu_SkillsOptions(MenuSelection);
			break;
		case "scores" :
			if (MenuSelection[1] === "dialog") {
				AbilityScores_Button();
				break;
			};
			ShowHonorSanity(MenuSelection[1].capitalize());
			break;
		case "dc" :
			Toggle2ndAbilityDC(MenuSelection[1]);
			break;
		case "equip" :
			if (MenuSelection[3] == "false") InventoryOptions([MenuSelection[1]]);
			if (MenuSelection[1] == "weight") WeightToCalc_Button();
			break;
		case "3rdpage" :
			LayerVisibilityOptions(false, MenuSelection);
			break;
		case "text" :
			MakeTextMenu_TextOptions(MenuSelection);
			break;
		case "color" :
			ColoryOptions(MenuSelection);
			break;
		case "unicode" :
			setUnicodeUse(MenuSelection[2]);
			break;
	};
};

//show or hide the DnD logos. Input is the number for the field display setting (0-3)
function DnDlogo(input) {
	var defaultDisplay = tDoc.info.SheetType === "Printer Friendly" ? 0 : 3;
	input = !isNaN(input) ? input : defaultDisplay;
	tDoc.getField("Image.DnDLogo").display = input;
	var prefixArray = What("Template.extras.SSfront").split(",");

	if (typePF && !tDoc.info.SpellsOnly) {
		prefixArray = prefixArray.concat(What("Template.extras.ALlog").split(","));
		if (!minVer) prefixArray = prefixArray.concat(What("Template.extras.AScomp").split(","));
	}

	for (var i = 0; i < prefixArray.length; i++) {
		if (prefixArray[i]) {
			tDoc.getField(prefixArray[i] + "Image.DnDLogo").display = input;
		}
	}
}

//change the color of a section of bookmarks, including all children
function amendBookmarks(theParent, show) {
	if (minVer) return;
	var doTheChildren = function (aParent, colour) {
		for (var i = 0; i < aParent.length; i++) {
			aParent[i].color = colour;
			if (aParent[i].children) {
				doTheChildren(aParent[i].children, colour);
			}
		}
	}

	if (app.viewerType !== "Reader") {
		if (show) {
			var Color = color.black;
			var Style = 2;
		} else {
			var Color = color.ltGray;
			var Style = 0;
		}
		theParent.color = Color;
		theParent.style = Style;
		if (theParent.children) doTheChildren(theParent.children, Color);
	};
}

//change the function of a section of bookmarks, including all children
function functionBookmarks(theParent) {

	var doTheChildren = function (aParent, colour) {
		for (var i = 0; i < aParent.length; i++) {
			aParent[i].setAction("Bookmark_Goto(event.target.name);");
			if (aParent[i].children) {
				doTheChildren(aParent[i].children, colour);
			}
		}
	}

	theParent.setAction("Bookmark_Goto(event.target.name);");
	doTheChildren(theParent.children);
}

//make a menu to hide/show the lines of the notes on the page
//after that, do something with the menu and its results
function MakeNotesMenu_NotesOptions() {
	//define some variables
	var toSearch = event.target.name.indexOf("Notes") !== -1 ? "Notes." : "Cnote.";
	var prefix = event.target.name.substring(0, event.target.name.indexOf(toSearch));
	var NoteMenu = [];
	var WhiteFld = prefix + "Whiteout." + toSearch;
	var WhiteL = WhiteFld + "Left";
	var WhiteR = WhiteFld + "Right";

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][1] === "comp.img") {
				var isMarked = toShow[0];
			} else if (array[i][1] === "comp.eqp") {
				var isMarked = toShow[1];
			} else {
				var isField = tDoc.getField(array[i][1]);
				var isMarked = isField ? tDoc.getField(array[i][1]).display !== display.visible : false;
			}
			item.push({
				cName : array[i][0],
				cReturn : array[i][1],
				bMarked : isMarked
			});
		}
	};

	var menuArray = [["Left column lines visible", WhiteL], ["Right column lines visible", WhiteR], ["-", "-"]];
	if (toSearch === "Notes.") {
		menuArray.push(["Add extra 'Notes' page", "add page"]);
		menuArray.push([(prefix ? "Remove" : "Hide") + " this 'Notes' page", "remove page"]);
	} else if (toSearch === "Cnote.") {
		var toShow = eval(What(prefix + "Companion.Layers.Remember"));
		menuArray.push(["Show box for Companion's Appearance", "comp.img"]);
		menuArray.push(["Show Equipment section", "comp.eqp"]);
	}
	menuLVL1(NoteMenu, menuArray);

	//parse it into a global variable
	Menus.notes = NoteMenu;

	//now call the menu
	var MenuSelection = getMenu("notes");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	var toDo = false;
	switch (MenuSelection[0]) {
	 case WhiteL.toLowerCase() :
		toDo = WhiteL;
		break;
	 case WhiteR.toLowerCase() :
		toDo = WhiteR;
		break;
	 case "add page" :
		DoTemplate("ASnotes", "Add");
		break;
	 case "remove page" :
		DoTemplate("ASnotes", "Remove", prefix);
		break;
	 case "comp.img" :
		toShow[0] = !toShow[0];
	 case "comp.eqp" :
		if (MenuSelection[0] === "comp.eqp") toShow[1] = !toShow[1];
		Value(prefix + "Companion.Layers.Remember", toShow.toSource());
		ShowCompanionLayer(prefix);
		break;
	}

	if (toDo) {
		if (tDoc.getField(toDo).display === display.visible) {
			Hide(toDo);
		} else {
			Show(toDo);
		}
	}
}

//make a string of all the classes and levels (field calculation)
function CalcFullClassLvlName() {
	var prefix = event.target && event.target.name ? getTemplPre(event.target.name, "ALlog", true) : "";
	if (!prefix) {
		var ClLvls = What("Class and Levels");
		var LVL = What("Character Level");
		if (!classes.parsed.length || ClLvls === "" || LVL === "") {
			var theValue = "";
		} else {
			var isOnlyClass = ClLvls.indexOf(LVL) !== -1;
			if (classes.parsed.length === 1) {
				var theValue = isOnlyClass ? ClLvls : ClLvls + " " + LVL;
			} else {
				var lastMultiLvl = classes.parsed[classes.parsed.length - 1][1];
				var lastStringLvl = Number(clean(ClLvls).slice(-1 * lastMultiLvl.toString().length));
				var theValue = lastMultiLvl === lastStringLvl ? ClLvls : ClLvls + " " + lastMultiLvl;
			}
		}
	} else {
		var theValue = What("AdvLog.Class and Levels");
	}
	return theValue;
}

//return the value of a logsheet's number (field calculation)
function CalcLogsheetNumber() {
	var prefix = getTemplPre(event.target.name, "ALlog", true);
	var ALlogA = What("Template.extras.ALlog").split(",");
	event.value = (ALlogA.indexOf(prefix)) + " of " + (ALlogA.length - 1);
}

//return the previous logsheet's prefix (field calculation)
function CalcLogsheetPrevious(prefix) {
	var ALlogA = What("Template.extras.ALlog").split(",");
	return prefix && ALlogA.indexOf(prefix) - 1 ? ALlogA[ALlogA.indexOf(prefix) - 1] : "";
}

//calculate the total or starting value of an entry in the advanturers log sheet (field calculation)
function CalcLogsheetValue() {
	var fNm = event.target.name;
	var prefix = fNm.substring(0, fNm.indexOf("AdvLog."));
	if (!prefix) return;
	var StrTot = fNm.indexOf("start") !== -1 ? "start" : "total";
	if (StrTot === "total") {
		var theStart = fNm.replace("total", "start");
		var theGain = What(fNm.replace("total", "gain")).replace(/,/g, ".");
		event.target.display = theGain === "" ? display.hidden : tDoc.getField(theStart).display;
		var theStartNmr = Number(What(theStart).replace(/,/g, "."));
		event.value = theGain === "" ? theStartNmr : theStartNmr + eval(theGain);
	} else {
		var FldNmbr = Number(fNm.replace(/.*AdvLog\.(\d+?)\..+/, "$1"));
		if (prefix === What("Template.extras.ALlog").split(",")[1] && FldNmbr === 1) {
			event.target.readonly = false;
			event.target.display = display.visible;
			return;
		} else {
			event.target.readonly = true;
		};
		if (FldNmbr !== 1) {
			var preFld = fNm.replace("AdvLog." + FldNmbr, "AdvLog." + (FldNmbr - 1));
		} else {
			var prePrefix = What(prefix + "AdvLog.previous");
			var preFld = fNm.replace(prefix, prePrefix).replace("AdvLog." + FldNmbr, "AdvLog." + FieldNumbers.logs);
		};
		event.target.display = What(fNm.replace("start", "gain")) !== "" || What(preFld.replace("start", "gain")) !== "" ? display.visible : display.hidden;
		event.value = What(preFld.replace("start", "total"));
	}
}

//add the correct numbers to the logsheet title sections
function UpdateLogsheetNumbering(prefix, prePrefix) {
	prePrefix = prePrefix ? prePrefix : CalcLogsheetPrevious(prefix);
	var preValue = prePrefix ? Number(What(prePrefix + "Text.AdvLog." + FieldNumbers.logs).replace(/Logsheet Entry /i, "")) : 0;
	var logTxt = !typePF ? "Logsheet Entry " : "LOGSHEET ENTRY ";
	for (var i = 1; i <= FieldNumbers.logs; i++) {
		Value(prefix + "Text.AdvLog." + i, logTxt + (preValue + i));
	};
	var ALlogA = What("Template.extras.ALlog").split(",");
	if (prefix !== ALlogA.slice(-1)[0]) UpdateLogsheetNumbering(ALlogA[ALlogA.indexOf(prefix) + 1], prefix);
};

//Make menu for the button on the adventurers log page and parse it to Menus.advlog
//after that, do something with the menu and its results
function MakeAdvLogMenu_AdvLogOptions(Button) {
	var prefix = Button ? "P0.AdvLog." : getTemplPre(event.target.name, "ALlog", true);
	var isFirstPrefix = prefix === What("Template.extras.ALlog").split(",")[1];
	var cLogoDisplay = minVer && typePF ? tDoc.getField("Image.DnDLogo.AL").display : false;

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			item.push({
				cName : array[i][0],
				cReturn : array[i][1]
			});
		}
	};

	var menuLVL2 = function (menu, name, array) {
		menu.cName = name[0];
		menu.oSubMenu = [];
		for (i = 0; i < array.length; i++) {
			var isMarked = false;
			if (name[1] === "dateformat") {
				isMarked = What("DateFormat_Remember") === array[i][1];
			} else if (name[1] === "dndlogo") {
				isMarked = array[i][1].split("#")[1] == cLogoDisplay;
			};
			menu.oSubMenu.push({
				cName : array[i][0],
				cReturn : name[1] + "#" + array[i][1],
				bMarked : isMarked
			});
		};
	};

	var AdvLogMenu = [];

	var alMenuItems = [
		["Add extra " + (Button ? "page" : "'Adventurers Log' page"), "add page"]
	].concat(
		(Button || (tDoc.info.AdvLogOnly && isFirstPrefix)) ?
		[["Remove all pages and reset the 1st", "remove all"]] :
		[["Remove this 'Adventurers Log' page", "remove page"]]
	).concat(
		(Button) ? [["-", "-"], ["Reset all pages", "reset all"], ["-", "-"]] :
		[["-", "-"], ["Reset this page", "reset"], ["-", "-"]]
	);

	menuLVL1(AdvLogMenu, alMenuItems);

	if (!minVer) {
		menuLVL1(AdvLogMenu, [["Generate next Logsheet Entry", "generate"]]);
	} else if (typePF) {
		var dndLogoMenu = [];
		menuLVL2(dndLogoMenu, ["Visible D&&D logos", "dndlogo"], [
			["Show the D&&D logos", "show#0"],
			["Show, but don't print the D&&D logos", "noprint#2"],
			["Hide and don't print the D&&D logos", "hide#1"],
			["Hide, but print the D&&D logos", "onlyprint#3"]
		]);
		AdvLogMenu.push(dndLogoMenu);
	}

	var dateTypesMenu = [];

	menuLVL2(dateTypesMenu, ["Date format", "dateformat"], [
		["24 Dec 2014", "d mmm yyyy"],
		["24-12-2014", "d-m-yyyy"],
		["24/12/2014", "d/m/yyyy"],
		["Dec 24, 2014", "mmm d, yyyy"],
		["12-24-2014", "m-d-yyyy"],
		["12/24/2014", "m/d/yyyy"],
		["2014 Dec 24", "yyyy mmm d"],
		["2014-12-24", "yyyy-m-d"],
		["2014/12/24", "yyyy/m/d"]
	]);

	AdvLogMenu.push(dateTypesMenu);

	menuLVL1(AdvLogMenu, [["-", "-"], ["Tutorial for Adventurers League logsheet", "tutorial"], ["Advanced tutorial for Adventurers League logsheet", "advanced tutorial"]]);

	Menus.advlog = AdvLogMenu;

	//now call the menu
	var MenuSelection = getMenu("advlog");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	var thermoTxt;
	switch (MenuSelection[0]) {
	 case "add page" :
		DoTemplate("ALlog", "Add");
		break;
	 case "remove page" :
		DoTemplate("ALlog", "Remove", prefix);
		break;
	 case "remove all" :
		thermoTxt = thermoM("Removing all Adventure Logsheets...");
		calcStop();
		tDoc.getTemplate("blank").spawn(0, false, false);
		tDoc.deletePages({nStart: 1, nEnd: tDoc.numPages - 1});
		tDoc.getTemplate("ALlog").spawn(0, true, false);
		Value("Template.extras.ALlog", ",P0.ALlog");
		tDoc.deletePages(1);
		break;
	 case "tutorial" :
		app.launchURL("http://dndadventurersleague.org/tutorial-for-dd-adventure-league-logsheets/", true);
		break;
	 case "advanced tutorial" :
		app.launchURL("http://dndadventurersleague.org/advanced-logsheet-tutorial/", true);
		break;
	 case "reset" :
		thermoTxt = thermoM("Resetting this Adventure Logsheet...");
		calcStop();
		var resetLogs = [];
		for (var l = 0; l <= FieldNumbers.logs; l++) resetLogs.push(prefix + "AdvLog." + l)
		tDoc.resetForm(resetLogs);
		break;
	 case "reset all" :
		thermoTxt = thermoM("Resetting all Adventure Logsheets...");
		calcStop();
		var ALlogF = What("Template.extras.ALlog").split(",").splice(1);
		var resetLogs = [];
		for (var i = 0; i < ALlogF.length; i++) {
			for (var l = 0; l <= FieldNumbers.logs; l++) resetLogs.push(ALlogF[i] + "AdvLog." + l);
		};
		tDoc.resetForm(resetLogs);
		break;
	 case "dateformat" :
		UpdateALdateFormat(MenuSelection[1]);
		break;
	 case "generate" :
		addALlogEntry();
		break;
	 case "dndlogo" :
		DnDlogo(MenuSelection[2]);
		break;
	}
	if (thermoTxt) thermoM(thermoTxt, true); // Stop progress bar
};

//get the parent of the bookmark so we can know which template it is on
function getBookmarkTemplate(bookmark) {
	while (bookmark.name !== "Root") {
		if (BookMarkList[bookmark.name + "_template"]) {
			return [BookMarkList[bookmark.name + "_template"], bookmark.name];
		};
		bookmark = bookmark.parent;
	};
	return "";
}

//make menu for the button to (re)set the portrait/organization symbol
//after that, do something with the menu and its results
function MakeIconMenu_IconOptions() {
	var SymbPort = event.target.name;
	var DoAdvLog = SymbPort.indexOf("AdvLog") !== -1;
	var DisplayName = SymbPort.indexOf("Comp.") !== -1 ? "Companion's Icon" : (SymbPort.indexOf("HeaderIcon") !== -1 ? "Header Icon" : SymbPort);
	if (DoAdvLog) DisplayName = "Adventure Logsheet " + DisplayName;

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			item.push({
				cName : array[i][0],
				cReturn : array[i][1]
			});
		}
	};
	var menuLVL2 = function (menu, name, array) {
		var temp = {};
		temp.cName = name[0];
		temp.oSubMenu = [];
		for (var i = 0; i < array.length; i++) {
			temp.oSubMenu.push({
				cName : array[i][0],
				cReturn : name[1] + "#" + array[i][1]
			})
		}
		menu.push(temp);
	};

	//make default menu items
	var restrictedViewer = app.viewerType === "Reader" && app.viewerVersion < 17;
	var IconMenu = [];
	var OptionMenu = [
		[(restrictedViewer ? "Set a pdf file as " : "Set any image/pdf file as ") + DisplayName, "set"],
		["Reset the " + DisplayName, "reset"],
		["Empty the " + DisplayName, "empty"]
	];
	menuLVL1(IconMenu, OptionMenu);

	//add options for faction icons, symbols, banners, if so desired
	//add options for class and AL season icons, if so desired
	if (SymbPort === "Symbol" || SymbPort.indexOf("HeaderIcon") !== -1) {
		//first the factions
		var faction = [
			["Emerald Enclave", "emeraldenclave"],
			["Harpers", "harpers"],
			["Lords' Alliance", "lordsalliance"],
			["Order of the Gauntlet", "ordergauntlet"],
			["Zhentarim", "zhentarim"]
		];
		var factionSymbols = [];
		var factionIcons = [];
		var factionBanners = [];
		for (var f = 0; f < faction.length; f++) {
			var aFact = faction[f];
			factionSymbols.push([aFact[0], aFact[1] + "#symbol"]);
			factionIcons.push([aFact[0], aFact[1] + "#icon"]);
			factionBanners.push([aFact[0], aFact[1] + "#banner"]);
		}
		IconMenu.push({cName : "-", cReturn : "-"}); // add a divider
		menuLVL2(IconMenu, ["Set faction symbol", "organizationicon"], factionSymbols);
		menuLVL2(IconMenu, ["Set faction banner", "organizationicon"], factionBanners);
		menuLVL2(IconMenu, ["Set faction icon", "organizationicon"], factionIcons);

		//second the class
		var classes = [
			["Barbarian", "barbarian"],
			["Bard", "bard"],
			["Cleric", "cleric"],
			["Druid", "druid"],
			["Fighter", "fighter"],
			["Monk", "monk"],
			["Paladin", "paladin"],
			["Ranger", "ranger"],
			["Rogue", "rogue"],
			["Sorcerer", "sorcerer"],
			["Warlock", "warlock"],
			["Wizard", "wizard"]
		];
		IconMenu.push({cName : "-", cReturn : "-"}); // add a divider
		menuLVL2(IconMenu, ["Set class icon", "classicon"], classes);

		//third the AL seasons
		var ALseasons = [
			["1 Tyranny of Dragons", "tod"],
			["2 Elemental Evil", "ee"],
			["3 Rage of Demons", "rod"],
			["4 Curse of Strahd", "cos"],
			["5 Storm King's Thunder", "skt"],
			["6 Tales from the Yawning Portal", "totyp"],
			["7 Tomb of Annihilation", "toa"]
		];
		IconMenu.push({cName : "-", cReturn : "-"}); // add a divider
		menuLVL2(IconMenu, ["Set Adventure League season icon", "seasonicon"], ALseasons);
	}

	//add a link to an online pdf converter, if not using Acrobat Pro/Standard
	if (restrictedViewer) {
		var Conversions = [
			["-", "-"],
			["Go to an online image-to-pdf converter", "convertor"]
		];
		menuLVL1(IconMenu, Conversions);
	}

	Menus.icon = IconMenu;

	//now call the menu
	var MenuSelection = getMenu("icon");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	switch (MenuSelection[0]) {
	 case "set" :
		tDoc.getField(SymbPort).buttonImportIcon();
		break;
	 case "reset" :
		ClearIcons(SymbPort, true);
		break;
	 case "empty" :
		ClearIcons(SymbPort);
		break;
	 case "organizationicon" :
		var oIcon = tDoc.getField("SaveIMG.Faction." + MenuSelection[1] + "." + MenuSelection[2]).buttonGetIcon();
		tDoc.getField(SymbPort).buttonSetIcon(oIcon);
		break;
	 case "classicon" :
		var oIcon = tDoc.getField("SaveIMG.ClassIcon." + MenuSelection[1]).buttonGetIcon();
		tDoc.getField(SymbPort).buttonSetIcon(oIcon);
		break;
	 case "seasonicon" :
		var oIcon = tDoc.getField("SaveIMG.ALicon." + MenuSelection[1]).buttonGetIcon();
		tDoc.getField(SymbPort).buttonSetIcon(oIcon);
		DoAdvLog = true;
		break;
	 case "convertor" :
		app.launchURL("http://imagetopdf.com/", true);
		break;
	};
	if (MenuSelection[0] !== "convertor" && MenuSelection[0] !== "reset") {
		Show(SymbPort);
	}
	//now loop through all the adventure logsheet pages, if this was to set the adv.logs
	if (typePF && DoAdvLog && MenuSelection[0] !== "convertor") {
		var ALlogA = What("Template.extras.ALlog").split(",");
		var aIcon = event.target.buttonGetIcon();
		for (var tA = 0; tA < ALlogA.length; tA++) {
			var fldNm = ALlogA[tA] + "AdvLog.HeaderIcon";
			if (fldNm !== event.target.name) {
				tDoc.getField(fldNm).buttonSetIcon(aIcon);
				tDoc.getField(fldNm).display = event.target.display;
			}
		}
	}
};

//return the value of the field that this adventurers log header field refers to
function CalcAdvLogInfo() {
	if (tDoc.info.SpellsOnly) return;
	var theField = event.target.name.replace(/.*?AdvLog\./, tDoc.info.AdvLogOnly ? "AdvLog." : "");
	event.value = What(theField);
}

//see if the value of the field has been changed and differs from the original. If so, push the value to the original
function ValidateAdvLogInfo() {
	if (tDoc.info.SpellsOnly || (SetFactionSymbolIgnore && event.target.name.indexOf("Background_Faction.Text") !== -1)) return;
	var prefix = getTemplPre(event.target.name, "ALlog", true);
	if (tDoc.info.AdvLogOnly && !prefix) {
		return;
	} else {
		var theField = event.target.name.replace(/.*?AdvLog\./, tDoc.info.AdvLogOnly ? "AdvLog." : "");
		var theValue = What(theField);
		if (event.value !== "" && event.value !== theValue) Value(theField, event.value);
	}
}

//set the calculation order of the AdvLog page so that it comes after the previous one
function SetAdvLogCalcOrder(prefix) {
	var whatCalcOrder = function (field) {
		return tDoc.getField(field).calcOrderIndex;
	}
	var resetCalcOrder = function (field, input) {
		tDoc.getField(field).calcOrderIndex = input;
	}
	if (prefix) {
		var prePrefix = CalcLogsheetPrevious(prefix);
		resetCalcOrder(prefix + "AdvLog.Class and Levels", whatCalcOrder(prePrefix + "AdvLog.Class and Levels") + 1);
		var theLastCalc = whatCalcOrder(prePrefix + "AdvLog." + FieldNumbers.logs + ".magicItems.total");
	} else {
		var theLastCalc = whatCalcOrder("AdvLog.sheetNumber");
	}

	var theTypesA = [
		".xp",
		".gold",
		".downtime",
		".renown",
		".magicItems"
	];


	for (var i = 1; i <= FieldNumbers.logs; i++) {
		for (var A = 0; A < theTypesA.length; A++) {
			var toSet = prefix + "AdvLog." + i + theTypesA[A];
			//add one to the calculation order to put it at
			theLastCalc += 1;
			resetCalcOrder(toSet + ".start", theLastCalc);
			//add one to the calculation order to put it at
			theLastCalc += 1;
			resetCalcOrder(toSet + ".total", theLastCalc);
		}
	}
}

//get all stringified variable and put them into their document level variable
function GetStringifieds(notSources) {
	var forSpells = What("CurrentSpells.Stringified").split("##########");
	if (forSpells[0][0] !== "(") forSpells[0] = "(" + forSpells[0] + ")";
	if (forSpells[1][0] !== "(") forSpells[1] = "(" + forSpells[1] + ")";
	CurrentSpells = eval(forSpells[0]);
	CurrentCasters = eval(forSpells[1]);
	if (!notSources) {
		CurrentSources = eval(What("CurrentSources.Stringified"));
		CurrentScriptFiles = eval(What("User_Imported_Files.Stringified"));
	};
	CurrentEvals = eval(What("CurrentEvals.Stringified"));
	CurrentProfs = eval(What("CurrentProfs.Stringified"));
	CurrentVars = eval(What("CurrentVars.Stringified"));
	CurrentFeatureChoices = eval(What("CurrentFeatureChoices.Stringified"));
	CurrentStats = eval(What("CurrentStats.Stringified"));
}

//set all stringified variables into their fields
function SetStringifieds(type) {
	if (!type || type === "spells") {
		var cSpells = CurrentSpells.toSource();
		var cCasters = CurrentCasters.toSource();
		Value("CurrentSpells.Stringified", cSpells + "##########" + cCasters);

		//any time the CurrentSpells variable is changed, we need to update the CurrentWeapons variable as well
		FindWeapons();
	};
	if (!type || type === "sources") Value("CurrentSources.Stringified", CurrentSources.toSource());
	if (!type || type === "evals") Value("CurrentEvals.Stringified", CurrentEvals.toSource());
	if (!type || type === "profs") Value("CurrentProfs.Stringified", CurrentProfs.toSource());
	if (!type || type === "vars") Value("CurrentVars.Stringified", CurrentVars.toSource());
	if (!type || type === "choices") Value("CurrentFeatureChoices.Stringified", CurrentFeatureChoices.toSource());
	if (!type || type === "stats") Value("CurrentStats.Stringified", CurrentStats.toSource());
	if (type === "scriptfiles") Value("User_Imported_Files.Stringified", CurrentScriptFiles.toSource());
};

//set the sheet version
function Publish(version, extra) {
	if (app.viewerType !== "Reader") {
		tDoc.info.SheetVersion = version;
		sheetVersion = parseFloat(tDoc.info.SheetVersion);
		if (extra) {
			tDoc.info.SheetVersionType = extra;
		} else {
			tDoc.info.SheetVersionType = "";
		}
	}
	semVers = nmbrToSemanticVersion(sheetVersion) + (tDoc.info.SheetVersionType ? tDoc.info.SheetVersionType : "");
	if (app.viewerType !== "Reader") tDoc.info.Title = MakeDocName();
	tDoc.getField("SheetInformation").defaultValue = MakeDocName();
	tDoc.resetForm(["Opening Remember", "CurrentSources.Stringified", "User_Imported_Files.Stringified","SheetInformation"]);
	tDoc.getField("Opening Remember").submitName = 1;
	tDoc.getField("SaveIMG.Patreon").submitName = "(new Date(0))";
	if (!minVer) DontPrint("d20warning");
	DnDlogo();
	tDoc.calculateNow();
};

//show Honor or Sanity score, based on the field value
function ShowHonorSanity(input) {
	calcStop();
	if (input !== undefined) Value("HoSRememberState", input);
	var toShow = What("HoSRememberState");
	toShow = toShow === "Sanity" || toShow === "Honor" ? toShow : "";
	var ShowHide = toShow ? "Show" : "Hide";
	var HideShow = toShow ? "Hide" : "Show";
	if (typePF) {
		var fieldsArray = [
			"Text.HoS.Ability",
			"Text.HoS.Save",
			"Image.HoS",
			"Vision.1",
			"Passive Perception.1",
			"HoS",
			"HoS Mod",
			"HoS ST Mod",
			"HoS ST Prof"
		];
		var fieldsArrayHide = [
			"Vision.0",
			"Passive Perception.0"
		];
		Value("Text.HoS.Ability", toShow.toUpperCase());
		Value("Text.HoS.Save", toShow.toUpperCase());

		if (ShowHide === "Show") {
			Show("Image." + What("BoxesLinesRemember") + ".HoS")
		} else {
			Hide("Image.calc_lines.HoS");
			Hide("Image.calc_boxes.HoS");
		}
	} else {
		var fieldsArray = [
			"Text.HoS",
			"Image.Stats.6",
			"Saving Throw advantages / disadvantages.1",
			"Text.Header.Saving Throw advantages / disadvantages",
			"HoS",
			"HoS Mod",
			"HoS ST Mod",
			"HoS ST Adv",
			"HoS ST Dis",
			"HoS ST Prof"
		];
		var fieldsArrayHide = [
			"Saving Throw advantages / disadvantages.0"
		];
		if (toShow) {
			var theIcon = tDoc.getField("SaveIMG." + toShow).buttonGetIcon();
			tDoc.getField(fieldsArray[0]).buttonSetIcon(theIcon);
		}
	}

	for (var i = 0; i < fieldsArray.length; i++) {
		tDoc[ShowHide](fieldsArray[i]);
	}

	for (var i = 0; i < fieldsArrayHide.length; i++) {
		tDoc[HideShow](fieldsArrayHide[i]);
	}

	if (ShowHide === "Show" && CurrentVars.bluetxt) {
		DontPrint("HoS ST Bonus");
	} else {
		Hide("HoS ST Bonus");
	}
};

//set the lifestyle
function setLifeStyle(input) {
	var isSelection = Lifestyles.names.indexOf(input);
	if (isSelection == -1) isSelection = Lifestyles.types.indexOf(clean(input.toLowerCase()));
	if (isSelection !== -1) Value("Lifestyle daily cost", Lifestyles.expenses[isSelection]);
}

// update all the level-dependent features for the ranger companions on the companion pages
function UpdateRangerCompanions(newLvl) {
	if (ClassList.rangerua && !testSource("rangerua", ClassList.rangerua, "classExcl")) {
		UpdateRevisedRangerCompanions(newLvl);
		return;
	}
	var thermoTxt;

	var textArray = [
		"\u2022 " + "If the beast takes the Attack action, I can use my Extra Attack feature to attack once myself", //add at level 5
		"\u2022 " + "The beast's attacks count as magical for the purpose of overcoming resistances and immunities" + "\n\u2022 " + "As a bonus action, I can command the beast to take the Dash/Disengage/Help action on its turn", //add at level 7
		"\u2022 " + "The beast can make two attacks (or multiattack) when I command it to take an Attack action", //add at level 11
		"\u2022 " + "When I cast a spell on myself, I can have it also affect the beast if it is within 30 ft of me", //add at level 15
	]

	var theText = function (input) {
		var toReturn = "If I don't command it to take an action, it takes the Dodge action instead";
		if (input >= 5) {
			toReturn += "\n" + textArray[0];
		}
		if (input >= 7) {
			toReturn += "\n" + textArray[1];
		}
		if (input >= 11) {
			toReturn += "\n" + textArray[2];
		}
		if (input >= 15) {
			toReturn += "\n" + textArray[3];
		}
		return toReturn;
	}

	newLvl = newLvl !== undefined ? newLvl : Number(What("Character Level"));
	var deleteIt = newLvl === 0;

	var newLvlProfB = newLvl ? ProficiencyBonusList[Math.min(newLvl, ProficiencyBonusList.length) - 1] : 0;
	var RangerLvl = deleteIt || (!classes.known.ranger && !classes.known["spell-less ranger"]) ? newLvl : (classes.known.ranger ? classes.known.ranger.level : 0) + (classes.known["spell-less ranger"] ? classes.known["spell-less ranger"].level : 0);
	var newLvlText = theText(RangerLvl);
	var AScompA = What("Template.extras.AScomp").split(",").splice(1);

	for (var i = 0; i < AScompA.length; i++) {
		var prefix = AScompA[i];
		if (What(prefix + "Companion.Remember") === "companion") { //only do something if the creature is set to "companion"

			if (!thermoTxt) { // Start progress bar and stop calculations
				thermoTxt = thermoM("Updating Ranger's Companion(s)...");
				calcStop();
			}

			thermoM((i+2)/(AScompA.length+2)); //increment the progress dialog's progress

			var thisCrea = CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound === "creature" ? CurrentCompRace[prefix] : false;
			//first look into adding the proficiency bonus to AC, attacks, proficiencies
			var remLvl = Who(prefix + "Companion.Remember").split(",");
			var oldLvl = Number(remLvl[0]);
			var RangerLvlOld = remLvl[1] !== undefined ? Number(remLvl[1]) : 0;
			var oldLvlProfB = oldLvl ? ProficiencyBonusList[Math.min(oldLvl, ProficiencyBonusList.length) - 1] : 0;
			var diff = newLvlProfB - oldLvlProfB;
			var BlueTextArrayAdd = [];
			var BlueTextArrayRemove = [];

			//add saving throw proficiencies
			for (var a = 0; a < AbilityScores.abbreviations.length; a++) {
				var theSave = prefix + "Comp.Use.Ability." + AbilityScores.abbreviations[a] + ".ST.Prof";
				var theSaveBT = prefix + "BlueText.Comp.Use.Ability." + AbilityScores.abbreviations[a] + ".ST.Bonus";
				var hasProfAdded = What(theSaveBT).indexOf("oProf") !== -1;
				if (!deleteIt && !hasProfAdded && tDoc.getField(theSave).isBoxChecked(0) === 1) {
					BlueTextArrayAdd.push(theSaveBT);
				} else if (hasProfAdded) {
					BlueTextArrayRemove.push(theSaveBT);
				};
			};

			//add skill proficiencies
			for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
				var theSkill = prefix + (typePF ? "" : "Text.") + "Comp.Use.Skills." + SkillsList.abbreviations[s] + ".Prof";
				var isProf = typePF ? tDoc.getField(theSkill).isBoxChecked(0) : What(theSkill) !== "nothing";
				var theSkillBT = prefix + "BlueText.Comp.Use.Skills." + SkillsList.abbreviations[s] + ".Bonus";
				hasProfAdded = What(theSkillBT).indexOf("oProf") !== -1;
				if (!deleteIt && !hasProfAdded && isProf) {
					BlueTextArrayAdd.push(theSkillBT);
				} else if (hasProfAdded) {
					BlueTextArrayRemove.push(theSkillBT);
				};
			};

			//add attacks damage and to hit bonus fields, as well as count as magical to description
			for (var A = 1; A <= 3; A++) {
				if (What(prefix + "Comp.Use.Attack." + A + ".Weapon Selection")) {
					var weaHit = prefix + "BlueText.Comp.Use.Attack." + A + ".To Hit Bonus";
					hasProfAdded = What(weaHit).indexOf("oProf") !== -1;
					if (!deleteIt && !hasProfAdded) {
						BlueTextArrayAdd.push(weaHit);
					} else if (hasProfAdded) {
						BlueTextArrayRemove.push(weaHit);
					};
					var weaDmg = prefix + "BlueText.Comp.Use.Attack." + A + ".Damage Bonus";
					hasProfAdded = What(weaDmg).indexOf("oProf") !== -1;
					if (!deleteIt && !hasProfAdded) {
						BlueTextArrayAdd.push(weaDmg);
					} else if (hasProfAdded) {
						BlueTextArrayRemove.push(weaDmg);
					};
					var weaDescr = prefix + "Comp.Use.Attack." + A + ".Description";
					var countMagic = (/(,|;)? ?counts as magical/i).test(What(weaDescr));
					if (newLvl >= 7 && oldLvl < 7 && !countMagic) {
						AddString(weaDescr, "Counts as magical", "; ");
					} else if (newLvl < 7 && oldLvl >= 7 && countMagic) {
						Value(weaDescr, What(weaDescr).replace(/(,|;)? ?counts as magical/i, ''));
					}
				};
			};

			var NameEntity = "Ranger's Companion";
			var Explanation = "The Ranger's Companion adds the ranger's proficiency bonus (oProf) to all skills and saving throws it is proficient with, as well as to the to hit and damage of its attacks.";
			for (var f = 0; f < BlueTextArrayAdd.length; f++) {
				AddToModFld(BlueTextArrayAdd[f], "oProf", false, NameEntity, Explanation);
			};
			for (var f = 0; f < BlueTextArrayRemove.length; f++) {
				AddToModFld(BlueTextArrayRemove[f], "oProf", true, NameEntity, Explanation);
			};

			//then look into the hit points
			// first reset it to not assume a value automatically, if so set
			var theCompSetting = How(prefix + "Comp.Use.HP.Max").split(",");
			if (!deleteIt && theCompSetting[3] !== "nothing") {
				theCompSetting[3] = "nothing";
				tDoc.getField(prefix + "Comp.Use.HP.Max").submitName = theCompSetting.join();
			};
			// then add the new hp value
			if (thisCrea) {
				Value(prefix + "Comp.Use.HP.Max", Math.max(thisCrea.hp, RangerLvl * 4));
			} else {
				var newHP = Number(What(prefix + "Comp.Use.HP.Max")) + ((RangerLvl - RangerLvlOld) * 4);
				if (!isNaN(newHP)) Value(prefix + "Comp.Use.HP.Max", newHP);
			};

			//then look into the AC
			if (thisCrea) {
				Value(prefix + "Comp.Use.AC", thisCrea.ac + (deleteIt ? 0 : newLvlProfB));
			} else if (diff) {
				Value(prefix + "Comp.Use.AC", What(prefix + "Comp.Use.AC") + diff);
			};

			//then look into the attacks per action
			if (thisCrea && deleteIt) {
				Value(prefix + "Comp.Use.Attack.perAction", thisCrea.attacksAction);
			} else {
				Value(prefix + "Comp.Use.Attack.perAction", newLvl >= 11 ? 2 : 1);
			}

			//then look into the string in the notes field
			if (deleteIt) {
				for (var t = 0; t < textArray.length; t++) {
					RemoveString(prefix + "Cnote.Left", textArray[t]);
				};
			} else {
				var oldLvlText = theText(RangerLvlOld);
				ReplaceString(prefix + "Cnote.Left", newLvlText, false, oldLvlText);
			};

			//set the new level to the tooltip text of the remember field for later use
			if (!deleteIt) AddTooltip(prefix + "Companion.Remember", newLvl + "," + RangerLvl);
		}
	}
	if (thermoTxt) thermoM(thermoTxt, true); // Stop progress bar
}

//update the tooltip for the Max HP field
function SetHPTooltip(resetHP, onlyComp) {
	// do the main character HP, if not set to only do the companion page(s)
	if (onlyComp == undefined || onlyComp === false) {
		var HDLVL = [
			Math.floor(What("HD1 Level")),
			Math.floor(What("HD2 Level")),
			Math.floor(What("HD3 Level"))
		];
		var HD = [
			Math.floor(What("HD1 Die")),
			Math.floor(What("HD2 Die")),
			Math.floor(What("HD3 Die"))
		];
		var ConMod = Number(What("Con Mod"));
		var hdstring = "The total hit points (with averages and max for 1st level)\n = ";
		var hdaverage = 0;
		var conhp = 0;
		var totalhd = 0;
		var extrastring = "";
		var hdadvleague = 0;
		var hdmax = 0;
		var extrahp = 0;

		for (var j = 0; j < HDLVL.length; j++) {
			HDLVL[j] = HDLVL[j] < 1 ? 1 : HDLVL[j];
		};

		for (var i = 0; i < HD.length; i++) {
			if (HD[i] !== 0) {
				if ((i === 0 && classes.hp === 0) || classes.hp === HD[i]) {
					hdcalc = HD[i] + (HDLVL[i] - 1) * ((HD[i] + 1) / 2);
					hdcalc2 = HD[i] + (HDLVL[i] - 1) * Math.ceil((HD[i] + 1) / 2);
					hdcalc3 = HDLVL[i] * HD[i];
				} else {
					hdcalc = HDLVL[i] * ((HD[i] + 1) / 2);
					hdcalc2 = HDLVL[i] * Math.ceil((HD[i] + 1) / 2);
					hdcalc3 = HDLVL[i] * HD[i];
				}
				hdstring += HDLVL[i] + "d" + HD[i] + " (" + hdcalc + ")";
				hdstring += (i === 2 || HD[i + 1] === 0) ? "" : " + ";
				hdaverage += hdcalc;
				hdadvleague += hdcalc2;
				hdmax += hdcalc3;
				totalhd += HDLVL[i];
				conhp += HDLVL[i] * ConMod;
			};
		};

		if (CurrentEvals.hp) {
			for (var hpEval in CurrentEvals.hp) {
				var evalThing = CurrentEvals.hp[hpEval];
				try {
					if (typeof evalThing == 'string') {
						eval(evalThing);
					} else if (typeof evalThing == 'function') {
						var addHP = evalThing(totalhd);
						if (!isArray(addHP)) addHP = [addHP];
						if ((addHP[0] || addHP[0] === 0) && !isNaN(addHP[0])) {
							if (!addHP[1]) addHP[1] = hpEval;
							extrahp += addHP[0];
							extrastring += addHP[2] ? addHP[1] : '\n ' + (addHP[0] > -1 ? "+ " : "") + addHP[0] + ' from ' + addHP[1];
						}
					}
				} catch (error) {
					var eText = "The custom hit point calculation addition '" + hpEval + "' produced an error! It will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error + "\n ";
					for (var e in error) eText += e + ": " + error[e] + ";\n ";
					console.println(eText);
					console.show();
					delete CurrentEvals.hp[hpEval];
				}
			}
		}

		hdplaceholder = totalhd === 0 ? "level \u00D7 hit dice (0)" : "";
		totalhd = totalhd === 0 ? "level" : totalhd;
		conhp = conhp === 0 ? ConMod : conhp;
		hdstring += hdplaceholder + "\n + " + totalhd + " \u00D7 " + ConMod + " from Constitution (" + conhp + ")";
		hdstring += extrastring;
		hdstring += "\n\n \u2022 " + toUni(hdaverage + conhp + extrahp) + " is the total average HP";
		hdstring += "\n \u2022 " + toUni(hdadvleague + conhp + extrahp) + " is the total HP when using fixed values";
		hdstring += "\n \u2022 " + toUni(hdmax + conhp + extrahp) + " is the total maximum HP";

		//now add this tooltip
		AddTooltip("HP Max", hdstring);

		//now see if the menu setting tells us that we need to change
		var theSetting = How("HP Max").split(",");
		theSetting[0] = Number(Math.round(hdaverage + conhp + extrahp));
		theSetting[1] = Number(hdadvleague + conhp + extrahp);
		theSetting[2] = Number(hdmax + conhp + extrahp);
		var setHP = false;
		switch (theSetting[3]) {
			case "average" :
				setHP = theSetting[0];
				break;
			case "fixed" :
				setHP = theSetting[1];
				break;
			case "max" :
				setHP = theSetting[2];
				break;
		}
		if (setHP !== false) Value("HP Max", setHP);

		tDoc.getField("HP Max").submitName = theSetting.join();

		Value("HD1 Die", What("HD1 Die"));
		Value("HD2 Die", What("HD2 Die"));
		Value("HD3 Die", What("HD3 Die"));
	}

	// if it was set to only do the main character, stop now
	if (onlyComp !== undefined && onlyComp === false) return;

	// now do the same for every companion page
	var tempExtras = What("Template.extras.AScomp").split(",").splice(1);
	for (var tE = 0; tE < tempExtras.length; tE++) {
		var prefix = tempExtras[tE];
		var CompHDLVL = Math.floor(What(prefix + "Comp.Use.HD.Level"));
		var CompHD = Math.floor(What(prefix + "Comp.Use.HD.Die"));
		var CompConMod = Number(What(prefix + "Comp.Use.Ability.Con.Mod"));
		var Compconhp = 0;
		var CompAverageHD = 0;
		var CompFixedHD = 0;
		var CompMaxHD = 0;
		var Comphdplaceholder = "level \u00D7 hit dice (0)";

		//check if the fields are filled out at all
		if (CompHDLVL && CompHD) {
			Compconhp = CompHDLVL * CompConMod;
			CompAverageHD = CompHDLVL * ((CompHD + 1) / 2);
			CompFixedHD = CompHDLVL * Math.ceil((CompHD + 1) / 2) + Compconhp;
			CompMaxHD = CompHDLVL * CompHD + Compconhp;
			Comphdplaceholder = CompHDLVL + "d" + CompHD + " (" + CompAverageHD + ")";
		}

		var compHPsting = "The total hit points (with averages)\n = ";
		compHPsting += Comphdplaceholder;
		compHPsting += "\n + " + CompHDLVL + " \u00D7 " + CompConMod + " from Constitution (" + Compconhp + ")";
		compHPsting += "\n + Special modifiers from other sources";
		compHPsting += "\n\n \u2022 " + (CompAverageHD + Compconhp) + " is the total average HP";
		compHPsting += "\n \u2022 " + CompFixedHD + " is the total HP when using fixed values";
		compHPsting += "\n \u2022 " + CompMaxHD + " is the total maximum HP";
		AddTooltip(prefix + "Comp.Use.HP.Max", compHPsting);

		//now see if the menu setting tells us that we need to change
		var theCompSetting = How(prefix + "Comp.Use.HP.Max").split(",");
		theCompSetting[0] = Number(Math.round(CompAverageHD + Compconhp));
		theCompSetting[1] = Number(CompFixedHD);
		theCompSetting[2] = Number(CompMaxHD);
		if (resetHP) theCompSetting[3] = "nothing";
		var setCompHP = false;
		switch (theCompSetting[3]) {
			case "average" :
				setCompHP = theCompSetting[0];
				break;
			case "fixed" :
				setCompHP = theCompSetting[1];
				break;
			case "max" :
				setCompHP = theCompSetting[2];
				break;
		}
		if (setCompHP !== false) Value(prefix + "Comp.Use.HP.Max", setCompHP);

		tDoc.getField(prefix + "Comp.Use.HP.Max").submitName = theCompSetting.join();

		Value(prefix + "Comp.Use.HD.Die", What(prefix + "Comp.Use.HD.Die"));
	}
};

function MakeHPMenu_HPOptions(preSelect) {

	//define some variables
	var theFld = preSelect ? "HP Max" : event.target.name.replace("Buttons.", "");
	var theInputs = tDoc.getField(theFld).submitName.split(",");
	if (!preSelect || preSelect == "justMenu") {
		var optionsArray = [
			["The total average HP (" + theInputs[0] + ")", "average"],
			["The total HP when using fixed values (" + theInputs[1] + ")", "fixed"],
			["The total maximum HP (" + theInputs[2] + ")", "max"]
		]
		var hpMenu = [];

		var menuLVL2 = function (menu, name, array) {
			var temp = {};
			temp.cName = name[0];
			temp.oSubMenu = [];
			for (var i = 0; i < array.length; i++) {
				var isMarked = name[1] === "auto" && array[i][1] === theInputs[3];
				temp.oSubMenu.push({
					cName : array[i][0],
					cReturn : "hp#" + name[1] + "#" + theInputs[i] + "#" + array[i][1],
					bMarked : isMarked
				})
			}
			menu.push(temp);
		};

		menuLVL2(hpMenu, ["Change the Max HP to", "change"], optionsArray);
		optionsArray.push(["Don't change the maximum HP automatically", "nothing"])
		menuLVL2(hpMenu, ["Set the Max HP to automatically assume", "auto"], optionsArray);

		//parse it into a global variable
		Menus.hp = hpMenu;
		if (preSelect == "justMenu") return;
	};

	//now call the menu
	var MenuSelection = preSelect ? preSelect : getMenu("hp");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	switch (MenuSelection[1]) {
	 case "auto" :
		theInputs[3] = MenuSelection[3];
		tDoc.getField(theFld).submitName = theInputs.join();
	 case "change" :
		if (MenuSelection[3] !== "nothing") {
			//set the value of the field
			Value(theFld, MenuSelection[2]);
		}
	}
};

// add the action "Attack (X attacks per action)" to the top of the "actions" fields, if there is room to do so
function AddAttacksPerAction() {
	if (typePF) {
		var theString = ["Attack (", " attacks per action)"];
		var regExStr = /\d+.{0,3}attacks/i;
		if (Number(classes.attacks) < 2) {
			RemoveAction("action", regExStr, "Extra attack class feature");
		} else {
			// first see if it isn't anywhere already
			var actFld = false;
			for (var i = 1; i <= FieldNumbers.trueactions; i++) {
				var actVal = What("Action " + i);
				if ((regExStr).test(actVal)) {
					actFld = actVal.indexOf(classes.attacks) === -1 ? "Action " + i : false;
					break;
				} else if (actVal === "") {
					actFld = true;
				};
			};
			//then if a matching field is found, put it there, or otherwise put it at the top
			if (actFld !== false && actFld !== true) {
				Value(actFld, theString[0] + classes.attacks + theString[1]);
			} else if (actFld) {
				if (What("Action 1") !== "") ActionInsert("action", 1);
				AddAction("action", theString[0] + classes.attacks + theString[1], "Extra attack class feature");
			}
		}
	} else {
		Value("Attacks per Action", classes.attacks);
	}
}

// set the symbol of a faction (keystroke)
var SetFactionSymbolIgnore = false;
function SetFactionSymbol(theFld, newValue, commitIt) {
	if (minVer) return;
	if (!SetFactionSymbolIgnore) {
		theFld = theFld ? tDoc.getField(theFld) : event.target;
		SetFactionSymbolIgnore = true;
		if (newValue !== undefined || (event.changeEx && event.changeEx !== event.target.value)) {
			if (newValue === undefined) newValue = event.changeEx;
			var theSymbolFld = tDoc.getField("SaveIMG.Faction." + newValue + ".symbol");
			if (theSymbolFld) {
				var theIcon = theSymbolFld.buttonGetIcon();
				tDoc.getField("Symbol").buttonSetIcon(theIcon);
				Show("Symbol");
			}
			if (factions[newValue]) tDoc.getField("Background_FactionRank.Text").setItems([""].concat(factions[newValue].ranks));
			theFld.temp = newValue;
		} else if (newValue === "" || (event && event.value !== undefined && event.value === "")) {
			Clear("Background_FactionRank.Text");
		}
		// when committing, set all the faction symbol fields to match this one
		if (commitIt || event.willCommit) {
			var logTemps = What("Template.extras.ALlog").split(",");
			for (var T = 0; T <= logTemps.length; T++) {
				var BckgrFld = T === logTemps.length ? "Background_Faction.Text" : logTemps[T] + "AdvLogS.Background_Faction.Text";
				if (theFld.name !== BckgrFld) Value(BckgrFld, theFld.temp ? theFld.temp : (newValue !== undefined ? newValue : event.value));
			}
		}
		SetFactionSymbolIgnore = false;
	}
}

//update the other faction symbol fields (only on AdvLogOnly) (field blur)
function UpdateFactionSymbols() {
	var prefix = getTemplPre(event.target.name, "ALlog", true);
	var ALlogA = What("Template.extras.ALlog").split(",");
	for (var Al = 0; Al < ALlogA.length; Al++) {
		if (ALlogA[Al] === prefix) continue;
		tDoc.getField(ALlogA[Al] + "AdvLogS.Background_Faction.Text").value = event.value;
	}
}

//make a menu for the text fields and text line options
//after that, do something with the menu and its results
function MakeTextMenu_TextOptions(input) {
	var isBoxesLines = What("BoxesLinesRemember");

	if (!input || input === "justMenu") {
		Menus.texts = [{
				cName : "Change the font size and/or font",
				cReturn : "text#dodialog"
			}, {
				cName : "-",
				cReturn : "-"
			}
		];

		if (typePF) {
			Menus.texts.push({
				cName : "Single-line fields",
				oSubMenu : [{
					cName : "Show boxes for single-line fields",
					cReturn : "text#calc_boxes",
					bMarked : isBoxesLines === "calc_boxes"
				}, {
					cName : "Show lines for single-line fields",
					cReturn : "text#calc_lines",
					bMarked : isBoxesLines === "calc_lines"
				}]
			});
			Menus.texts.push({cName : "-", cReturn : "-"});
		};

		Menus.texts.push({
			cName : "Multi-line fields",
			oSubMenu : [{
				cName : "Show lines for multi-line fields",
				cReturn : "text#show lines",
				bMarked : !CurrentVars.whiteout
			}, {
				cName : "Hide lines for multi-line fields",
				cReturn : "text#hide lines",
				bMarked : CurrentVars.whiteout
			}]
		});
		if (input !== "justMenu") {
			makeUnicodeMenu();
			Menus.texts.push({cName : "-", cReturn : "-"}); // add a divider
			Menus.texts.push(Menus.unicode);
		}
		if (input === "justMenu") return;
	};

	//now call the menu
	var MenuSelection = input ? input : getMenu("texts");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	if (MenuSelection !== undefined && MenuSelection[0] !== "nothing") {
		switch (MenuSelection[1]) {
		 case "dodialog" :
			SetTextOptions_Button();
			break;
		 case "calc_boxes" :
		 case "calc_lines" :
			ShowCalcBoxesLines(MenuSelection[1]);
			break;
		 case "show lines" :
			ToggleWhiteout(false);
			break;
		 case "hide lines" :
			ToggleWhiteout(true);
			break;
		 case "unicode" :
			setUnicodeUse(MenuSelection[2]);
			break;
		};
	};
};

//make the calculation lines or boxes visible
function ShowCalcBoxesLines(input) {
	input = input ? input.toLowerCase() : "calc_boxes";
	if (!typePF || (input !== "calc_boxes" && input !== "calc_lines")) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the single-line fields to have " + (input === "calc_boxes" ? "boxes" : "lines") + "...");
	calcStop();

	Value("BoxesLinesRemember", input);
	var ShowBHideL = input === "calc_boxes" ? "Show" : "Hide";
	var HideBShowL = input === "calc_boxes" ? "Hide" : "Show";
	tDoc[ShowBHideL]("Image.calc_boxes");
	tDoc[HideBShowL]("Image.calc_lines");

	//now get all the template prefixes
	var prefixA = What("Template.extras.AScomp").split(",");
	prefixA = prefixA.concat(What("Template.extras.WSfront").split(","));
	prefixA = prefixA.concat(What("Template.extras.ALlog").split(","));

	for (var i = 0; i < prefixA.length; i++) {
		var prefix = prefixA[i];
		if (prefix !== "") {
			tDoc[ShowBHideL](prefix + "Image.calc_boxes");
			tDoc[HideBShowL](prefix + "Image.calc_lines");
		}
	}

	if (!minVer && What("HoSRememberState") !== "Honor" && What("HoSRememberState") !== "Honor") {
		Hide("Image.calc_lines.HoS");
		Hide("Image.calc_boxes.HoS");
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//chane the format of all the date fields of the AL log pages
function UpdateALdateFormat(dateForm) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the date format...");
	calcStop();

	dateForm = dateForm ? dateForm : What("DateFormat_Remember");
	Value("DateFormat_Remember", dateForm);
	var ALlogA = What("Template.extras.ALlog").split(",").splice(1);
	for (var tA = 0; tA < ALlogA.length; tA++) {
		var prefix = ALlogA[tA];
		for (var i = 1; i < FieldNumbers.logs; i++) {
			var dateFld = prefix + "AdvLog." + i + ".date";
			Value(dateFld, What(dateFld));
		};
	};
	thermoM(thermoTxt, true); // Stop progress bar
};

//return the value of the field that this notes field (field calculation)
function CalcCompNotes() {
	var prefix = getTemplPre(event.target.name, "AScomp", true);
	var notesFld = prefix + (typePF ? "Cnote.Left" : "Cnote.Right");
	event.value = What(notesFld);
}

// add the content to all the other fields that should share the content (field validation)
function ValidateCompNotes() {
	var prefix = getTemplPre(event.target.name, "AScomp", true);
	var notesFld = prefix + (typePF ? "Cnote.Left" : "Cnote.Right");
	var theValue = What(notesFld);
	if (event.value !== theValue) {
		Value(notesFld, event.value);
	}
}

// show the selected layers on the companion page
function ShowCompanionLayer(prefix) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the visible sections on the companion page...");
	calcStop();

	MakeMobileReady(false); // Undo flatten, if needed

	prefix = prefix ? prefix : "";
	var notesFld = prefix + (typePF ? "Cnote.Left" : "Cnote.Right");
	var toShow = eval(What(prefix + "Companion.Layers.Remember")); //an array with two true/false values, the first is for the image section, second is for the equipment section
	var changeNotes = typePF ? toShow[1] : toShow[0] || toShow[1];

	if (changeNotes) {
		Hide(notesFld);
	} else {
		Show(notesFld);
	}
	if (toShow[0]) {
		Show(prefix + "Comp.img");
		if (toShow[1] && !typePF) {
			Hide(prefix + "Comp.img.Notes");
		} else if (typePF) {
			Hide(prefix + "Cnote.Right");
		}
	} else {
		Hide(prefix + "Comp.img");
		if (typePF) Show(prefix + "Cnote.Right");
	}
	if (toShow[1]) {
		Show(prefix + "Comp.eqp");
		DontPrint(prefix + "Comp.eqpB");
		if (toShow[0] && !typePF) Hide(prefix + "Comp.eqp.Notes");
	} else {
		Hide(prefix + "Comp.eqp.");
		Hide(prefix + "Comp.eqpB");
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//(re)set the dropdowns
function UpdateDropdown(type, weapon) {
	if (minVer || !IsNotUserScript) return;
	IsSetDropDowns = true;
	type = type ? type.toLowerCase() : "all";
	var notAll, forceTT = false;
	calcStop();
	switch (type) {
	 case "tooltips" :
		forceTT = true;
	 case "resources" :
		notAll = true;
	 case "all" :
		SetRacesdropdown(forceTT);
		SetBackgrounddropdown(forceTT);
		SetBackgroundFeaturesdropdown(forceTT);
		SetFeatsdropdown(forceTT);
		SetMagicItemsDropdown(forceTT);
		SetCompDropdown(forceTT);
		SetWildshapeDropdown(forceTT);
		SetArmordropdown(forceTT);
		SetAmmosdropdown(forceTT);
		if (notAll) {
			SetWeaponsdropdown(forceTT);
			break;
		}
	 case "attack" :
	 case "attacks" :
	 case "weapon" :
	 case "weapons" :
		if (weapon) {
			if (!isArray(weapon)) weapon = [weapon]; //make this into an array
			weapon.forEach( function (wea) {
				var weaKey = WeaponsList[wea];
				if (!weaKey || weaKey.list) return;
				weaKey.list = "extra";
			});
		};
		SetWeaponsdropdown();
		break;
	 case "armour" :
	 case "armours" :
	 case "armor" :
	 case "armors" :
		SetArmordropdown();
		break;
	 case "race" :
	 case "races" :
		SetRacesdropdown();
		SetCompDropdown();
		break;
	 case "background" :
	 case "backgrounds" :
		SetBackgrounddropdown();
		break;
	 case "backgroundfeature" :
	 case "backgroundfeatures" :
		SetBackgroundFeaturesdropdown();
		break;
	 case "feat" :
	 case "feats" :
		SetFeatsdropdown();
		break;
	 case "item" :
	 case "items" :
	 case "magic" :
	 case "magic item" :
	 case "magic items" :
		SetMagicItemsDropdown();
		break;
	 case "ammo" :
	 case "ammunition" :
	 case "ammunitions" :
		SetAmmosdropdown();
		break;
	 case "creature" :
	 case "creatures" :
	 case "wildshape" :
	 case "wildshapes" :
		SetCompDropdown();
		SetWildshapeDropdown();
		break;
	};
	IsSetDropDowns = false;
};

function ChangeToCompleteAdvLogSheet() {
	if (minVer) return;
	ResetAll();
	tDoc.resetForm(["User Script", "User_Imported_Files.Stringified"]); // remove all custom scripts
	tDoc.getField("AdvLog.Class and Levels").setAction("Calculate", "CalcAdvLogInfo();");
	tDoc.getField("AdvLog.Class and Levels").setAction("Validate", "ValidateAdvLogInfo();");
	tDoc.getField("AdvLog.Class and Levels").readonly = false;

	tDoc.getField("AdvLogS.Background_Faction.Text").setAction("OnBlur", "UpdateFactionSymbols();");
	tDoc.getField("AdvLogS.Background_Faction.Text").setAction("Keystroke", "");

	tDoc.getTemplate("ALlog").spawn(0, true, false);
	tDoc.deletePages({nStart: 1, nEnd: tDoc.numPages - 1});
	tDoc.getTemplate("ALlog").hidden = false;
	tDoc.getTemplate("remember").hidden = false;
	tDoc.getTemplate("blank").hidden = false;
	Value("Template.extras.ALlog", ",P0.ALlog.");

	//remove the saveIMG fields that are now useless
	tDoc.removeField("SaveIMG.SpellSlots");
	tDoc.removeField("SaveIMG.Spells");

	if (typePF) { //if the Printer Friendly version, update the copyright
		var newCR = "Made by Joost Wijnen (mpmb@flapkan.com); Design inspired by Wizards of the Coast " + (tDoc.info.SheetType === "Printer Friendly" ? "adventure logsheet" : "character sheet");
		tDoc.getField("CopyrightInformation").defaultValue = newCR;
		tDoc.getField("P0.ALlog.CopyrightInformation").defaultValue = newCR;
		tDoc.resetForm(["CopyrightInformation", "P0.ALlog.CopyrightInformation"]);
	} else { //if the Colorful version, remove some more useless fields
		tDoc.removeField("SaveIMG.Title");
		tDoc.removeField("SaveIMG.Level");
		tDoc.removeField("SaveIMG.Attack");
		tDoc.removeField("SaveIMG.Prof");
		tDoc.removeField("SaveIMG.Stats");
		tDoc.removeField("SaveIMG.Header.Right");
		tDoc.removeField("SaveIMG.DividerFlip");
		tDoc.removeField("SaveIMG.Arrow");
		tDoc.removeField("SaveIMG.IntArrow");
		tDoc.removeField("SaveIMG.HPdragonhead");
		tDoc.removeField("SaveIMG.SaveDC");
		tDoc.removeField("SaveIMG.DnDLogo");
		tDoc.removeField("SaveIMG.Honor");
		tDoc.removeField("SaveIMG.Sanity");
	};

	var keyPF = "This Adventure Logsheet is an extraction from MPMB's Character Record Sheet [Printer Friendly]. It follows the design and uses elements of the official D&D 5e adventure logsheet by Wizards of the Coast, but has been heavily modified by Joost Wijnen [morepurplemorebetter] (mpmb@flapkan.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'.";

	var keyPFR = "This Adventure Logsheet is an extraction from MPMB's Character Record Sheet [Printer Friendly - Redesign]. It follows the design idea of the official D&D 5e character sheet by Wizards of the Coast, but has been created from the ground up by Joost Wijnen [morepurplemorebetter] (mpmb@flapkan.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'.";

	var keyCF = "This Adventure Logsheet is an extraction from MPMB's Character Record Sheet [" + tDoc.info.SheetType + "]. This sheet uses elements designed by Javier Aumente, but has been created from the ground up by Joost Wijnen [morepurplemorebetter] (mpmb@flapkan.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'."

	//move the pages that we want to extract to a new instance, by running code from a console
	var forConsole = "tDoc.extractPages({nStart: 0, nEnd: 3});\n\n";
	forConsole += "this.info.AdvLogOnly = true;";
	forConsole += " var toDelScripts = ['AbilityScores', 'ClassSelection', 'ListsBackgrounds', 'ListsClasses', 'ListsCreatures', 'ListsFeats', 'ListsGear', 'ListsPsionics', 'ListsRaces', 'ListsSources', 'ListsSpells']; for (var s = 0; s < toDelScripts.length; s++) {this.removeScript(toDelScripts[s]);};";
	forConsole += " this.createTemplate({cName:\"ALlog\", nPage:1 });";
	forConsole += " this.createTemplate({cName:\"remember\", nPage:2 });";
	forConsole += " this.createTemplate({cName:\"blank\", nPage:3 });";
	forConsole += " this.getTemplate(\"ALlog\").hidden = true;";
	forConsole += " this.getTemplate(\"remember\").hidden = true;";
	forConsole += " this.getTemplate(\"blank\").hidden = true;";
	forConsole += " this.info.SheetVersion = \"" + tDoc.info.SheetVersion + "\";";
	forConsole += " this.info.SheetType = \"" + tDoc.info.SheetType + "\";";
	forConsole += " this.info.Keywords = \"" + (!typePF ? keyCF : (tDoc.info.SheetType === "Printer Friendly" ? keyPF : keyPFR)) + "\";";
	forConsole += " this.info.Subject = \"D&D 5e; Character Sheet; Adventurers League; Adventure Logsheet\";";
	forConsole += " this.info.ContactEmail = \"mpmb@flapkan.com\";";
	forConsole += " this.info.Title = MakeDocName();";
	forConsole += " typePF = (/printer friendly/i).test(this.info.SheetType);";
	forConsole += " typeA4 = (/a4/i).test(this.info.SheetType);";
	forConsole += " typeLR = (/letter/i).test(this.info.SheetType);";
	forConsole += " minVer = this.info.SpellsOnly || this.info.AdvLogOnly;";
	forConsole += " CreateBkmrksCompleteAdvLogSheet();";
	forConsole += " this.calculateNow();";
	forConsole += " this.importDataObject({cName: 'FAQ.pdf', cDIPath: \"/D/Doc/NAS/02 Hobby/Dungeons & Dragons/5th Edition/- Sheets Creation/- MPMB's Character Record Sheet/Frequently Asked Questions/FAQ.pdf\"});";
	forConsole += " Value(\"Opening Remember\", \"No\");";
	forConsole += " app.execMenuItem(\"GeneralInfo\");";
	console.show();
	console.println("Execute the following:\n" + forConsole);
}

//create the bookmarks of a Adventure Logsheet
function CreateBkmrksCompleteAdvLogSheet() {
	//make the functions bookmark section
	tDoc.bookmarkRoot.createChild({cName: "Functions", cExpr: "MakeButtons();", nIndex: 0});

	var NameBm = typePF ? "Set Highlight Color" : "Set Color Theme";
	tDoc.bookmarkRoot.children[0].createChild({cName: NameBm, cExpr: "MakeColorMenu(); ColoryOptions();", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.5, 0.5, 0.5];

	tDoc.bookmarkRoot.children[0].createChild({cName: "Unit System", cExpr: "SetUnitDecimals_Button();", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB",0.463,0.192,0.467];

	tDoc.bookmarkRoot.children[0].createChild({cName: "Flatten", cExpr: "MakeMobileReady();", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.2823486328125, 0.1921539306640625, 0.478424072265625];

	tDoc.bookmarkRoot.children[0].createChild({cName: "Text Options", cExpr: "MakeTextMenu_TextOptions();", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.8000030517578125, 0.6666717529296875, 0.1137237548828125];

	tDoc.bookmarkRoot.children[0].createChild({cName: "Set Pages Layout", cExpr: "MakeAdvLogMenu_AdvLogOptions(true);", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.9098052978515625, 0.196075439453125, 0.48626708984375];

	//make links bookmark section
	tDoc.bookmarkRoot.createChild({cName: "Links", cExpr: "", nIndex: 1});

	var aLink = typePF ? "http://www.dmsguild.com/product/186823/" : "http://www.dmsguild.com/product/193053/";
	tDoc.bookmarkRoot.children[1].createChild({cName: "Get the Full Character Record Sheet", cExpr: "contactMPMB('fullversion');", nIndex: 0});

	var NameLink = tDoc.info.SheetType === "Printer Friendly" ? "Get the Printer Friendly Redesign" : "Get the Latest Version";
	tDoc.bookmarkRoot.children[1].createChild({cName: NameLink, cExpr: "contactMPMB('latestversion');", nIndex: 1});

	NameLink = typePF ? "Get the Colorful Design" : "Get the Printer Friendly Design";
	tDoc.bookmarkRoot.children[1].createChild({cName: NameLink, cExpr: "contactMPMB('otherdesign');", nIndex: 2});

	//make FAQ bookmark section
	tDoc.bookmarkRoot.createChild({cName: "FAQ", cExpr: "getFAQ();", nIndex: 2});

	//make the contact bookmark section
	tDoc.bookmarkRoot.createChild({cName: "Contact MPMB", cExpr: "contactMPMB('patreon');", nIndex: 3});
	tDoc.bookmarkRoot.children[3].style = 2;
	tDoc.bookmarkRoot.children[3].createChild({cName: "on DMs Guild", cExpr: "contactMPMB('dmsguild');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on EN world", cExpr: "contactMPMB('enworld');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "via Email", cExpr: "contactMPMB('email');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on GitHub", cExpr: "contactMPMB('github');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Reddit", cExpr: "contactMPMB('reddit');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Twitter", cExpr: "contactMPMB('twitter');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Patreon", cExpr: "contactMPMB('patreon');", nIndex: 0});

	//make all bookmarks bold
	for (var p = 0; p < tDoc.bookmarkRoot.children.length; p++) {
		tDoc.bookmarkRoot.children[p].style = 2;
		if (tDoc.bookmarkRoot.children[p].children) {
			for (var c = 0; c < tDoc.bookmarkRoot.children[p].children.length; c++) {
				tDoc.bookmarkRoot.children[p].children[c].style = 2;
			}
		}
	}
}

// update all the level-dependent features for the UA's revised ranger companions on the companion pages
function UpdateRevisedRangerCompanions(newLvl) {
	var thermoTxt;

	var notesArray = [
		"\u2022 " + "When I take the Attack action, my companion can use its reaction to make one melee attack", //add at level 5
		"\u2022 " + "While my companion can see me, it has advantage on all saving throws", //add at level 7
		"\u2022 " + "My companion can, as an action, make a melee attack vs. all creatures within 5 ft of it", //add at level 11
		"\u2022 " + "My companion can, as a reaction, halve the damage of an attack from an attacker that it sees", //add at level 15
	];

	var theText = function (input) {
		var toReturn = "My companion gains a bonus on damage rolls against my favored enemies just like me";
		if (input >= 5) {
			toReturn += "\n" + notesArray[0];
		}
		if (input >= 7) {
			toReturn += "\n" + notesArray[1];
		}
		if (input >= 11) {
			toReturn += "\n" + notesArray[2];
		}
		if (input >= 15) {
			toReturn += "\n" + notesArray[3];
		}
		return What("Unit System") === "imperial" ? toReturn : ConvertToMetric(toReturn, 0.5);
	}

	var featuresArray = [
		"\u25C6 " + "Coordinated Attack: " + "As a reaction when the ranger owner takes the attack action, the companion can make one melee attack.", //add at level 5
		"\u25C6 " + "Beast's Defense: " + "While the ranger owner is within eyeshot, the companion has advantage on all saving throws.", //add at level 7
		"\u25C6 " + "Storm of Claws and Fangs: " + "As an action, the companion can make a melee attack against each creature that is within 5 ft.", //add at level 11
		"\u25C6 " + "Superior Beast's Defense: " + "As a reaction, the companion can halve the damage of an attack from an attacker that it can see.", //add at level 15
	];

	var theFeature = function (input) {
		var toReturn = "";
		if (input >= 5) {
			toReturn += featuresArray[0];
		}
		if (input >= 7) {
			toReturn += "\n" + featuresArray[1];
		}
		if (input >= 11) {
			toReturn += "\n" + featuresArray[2];
		}
		if (input >= 15) {
			toReturn += "\n" + featuresArray[3];
		}
		return What("Unit System") === "imperial" ? toReturn : ConvertToMetric(toReturn, 0.5);
	}

	var ASIs = 0;
	for (var aClass in classes.known) {
		var classLvL = Math.min(CurrentClasses[aClass].improvements.length, classes.known[aClass].level);
		ASIs += 2 * CurrentClasses[aClass].improvements[classLvL - 1];
	}
	var ASIstring = function (aCreat) {
		var toReturn = "whenever I gain an ASI\r   Currently, there are " + ASIs + " points ";
		toReturn += aCreat && aCreat.scores ? "(default: " + aCreat.scores[0] + " Str, " + aCreat.scores[1] + " Dex, " + aCreat.scores[2] + " Con, " + aCreat.scores[3] + " Int, " + aCreat.scores[4] + " Wis, " + aCreat.scores[5] + " Cha)" : "to divide among the ability scores";
		return toReturn;
	}

	newLvl = newLvl !== undefined ? newLvl : Number(What("Character Level"));
	var deleteIt = newLvl === 0;
	var newLvlProfB = newLvl ? ProficiencyBonusList[Math.min(newLvl, ProficiencyBonusList.length) - 1] : 0;
	var RangerLvl = deleteIt || !classes.known.rangerua ? newLvl : classes.known.rangerua.level;
	var newLvlText = theText(RangerLvl);
	var newLvlFea = theFeature(RangerLvl);
	var AScompA = What("Template.extras.AScomp").split(",").splice(1);

	for (var i = 0; i < AScompA.length; i++) {
		var prefix = AScompA[i];
		if (What(prefix + "Companion.Remember") === "companionrr") { //only do something if the creature is set to "companionrr"

			if (!thermoTxt) { // Start progress bar and stop calculations
				thermoTxt = thermoM("Updating Revised Ranger's Companion(s)...");
				calcStop();
			}

			thermoM((i+2)/(AScompA.length+2)); //increment the progress dialog's progress

			var thisCrea = CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound === "creature" ? CurrentCompRace[prefix] : false;

			//first update the proficiency bonus
			Value(prefix + "Comp.Use.Proficiency Bonus", !deleteIt ? newLvlProfB : thisCrea ? thisCrea.proficiencyBonus : "");

			//now look into adding the proficiency bonus to attack damage and removing multiattacks
			var remLvl = Who(prefix + "Companion.Remember").split(",");
			var oldLvl = Number(remLvl[0]);
			var RangerLvlOld = remLvl[1] !== undefined ? Number(remLvl[1]) : 0;
			var oldLvlProfB = oldLvl ? ProficiencyBonusList[Math.min(oldLvl, ProficiencyBonusList.length) - 1] : 0;
			var diff = newLvlProfB - oldLvlProfB;

			//add ranger's prof to attacks damage fields
			var NameEntity = "Revised Ranger's Companion";
			var Explanation = "The Revised Ranger's Companion adds the ranger's proficiency bonus (oProf) to the damage of its attacks.";
			for (var A = 1; A <= 3; A++) {
				if (What(prefix + "Comp.Use.Attack." + A + ".Weapon Selection")) {
					var weaFldDmg = prefix + "BlueText.Comp.Use.Attack." + A + ".Damage Bonus";
					var hasProfAdded = What(weaFldDmg).indexOf("oProf") !== -1;
					if (!deleteIt) {
						ReplaceString(prefix + "Comp.Use.Attack." + A + ".Description", "", false, "(((One|Two).+as an Attack action)|(2 per Attack));? ?", true);
						if (!hasProfAdded) AddToModFld(weaFldDmg, "oProf", false, NameEntity, Explanation);
					} else if (deleteIt && hasProfAdded) {
						AddToModFld(weaFldDmg, "oProf", true, NameEntity, Explanation);
					};
				};
			};

			//add the HD
			if (thisCrea && deleteIt) {
				Value(prefix + "Comp.Use.HD.Level", thisCrea.hd[0]);
			} else if (thisCrea) {
				Value(prefix + "Comp.Use.HD.Level", thisCrea.hd[0] + RangerLvl - 3);
			} else if (What(prefix + "Comp.Use.HD.Level")) {
				var HDincr = oldLvl === 0 ? RangerLvl - 3 : RangerLvl - oldLvl;
				Value(prefix + "Comp.Use.HD.Level", What(prefix + "Comp.Use.HD.Level") + HDincr);
			}
			var theCompSetting = How(prefix + "Comp.Use.HP.Max").split(",");
			theCompSetting[3] = deleteIt ? "nothing" : "fixed";
			tDoc.getField(prefix + "Comp.Use.HP.Max").submitName = theCompSetting.join();

			//add the alignment
			if (thisCrea && deleteIt) {
				Value(prefix + "Comp.Desc.Alignment", thisCrea.alignment);
			} else {
				var theAL = tDoc.getField("Alignment").currentValueIndices;
				if (theAL !== -1) {
					PickDropdown(prefix + "Comp.Desc.Alignment", theAL);
				} else {
					Value(prefix + "Comp.Desc.Alignment", What("Alignment"));
				}
			}

			//add saving throw proficiencies
			for (var s = 0; s < 6; s++) {
				var saveFld = prefix + "Comp.Use.Ability." + AbilityScores.abbreviations[s] + ".ST";
				if (deleteIt && thisCrea && thisCrea.saves[s] !== "") {
					Checkbox(saveFld + ".Prof"); //set the save as proficient
				} else if (deleteIt) {
					Checkbox(saveFld + ".Prof", false); //set the save as not proficient
				} else {
					Checkbox(saveFld + ".Prof"); //set the save as proficient
				}
			}

			//then look into the AC
			if (deleteIt) {
				Value(prefix + "Comp.Use.AC", thisCrea ? thisCrea.ac : '');
			} else if (diff) {
				Value(prefix + "Comp.Use.AC", What(prefix + "Comp.Use.AC") + diff);
			};

			//then look into the attacks per action
			if (thisCrea && deleteIt) {
				Value(prefix + "Comp.Use.Attack.perAction", thisCrea.attacksAction);
			} else {
				Value(prefix + "Comp.Use.Attack.perAction", 1);
			}

			//remove the old ASI line (if any)
			var ASIregex = /whenever I gain an ASI\r.*Currently.+(scores|Cha\))/;
			if ((ASIregex).test(What(prefix + "Cnote.Left"))) {
				ReplaceString(prefix + "Cnote.Left", "whenever I gain an ASI", false, "whenever I gain an ASI\\r.*Currently.+(scores|Cha\\))", true);
			}

			//then look into the string in the notes and feature fields
			if (deleteIt) {
				for (var t = 0; t < notesArray.length; t++) {
					RemoveString(prefix + "Cnote.Left", notesArray[t]);
				}
				for (var t = 0; t < featuresArray.length; t++) {
					RemoveString(prefix + "Comp.Use.Features", featuresArray[t]);
				}
				RemoveString(prefix + "Cnote.Left", compString.companionrr.string);
			} else {
				var oldLvlText = theText(RangerLvlOld);
				ReplaceString(prefix + "Cnote.Left", newLvlText, false, oldLvlText);
				var oldLvlFea = theFeature(RangerLvlOld);
				ReplaceString(prefix + "Comp.Use.Features", newLvlFea, false, oldLvlFea);
				var creaASI = ASIstring(thisCrea);
				ReplaceString(prefix + "Cnote.Left", creaASI, false, "whenever I gain an ASI");

				//remove any multiattack trait
				ReplaceString(prefix + "Comp.Use.Traits", "", false, "\u25C6 Multiattack: .+(\r|$)", true);
			}

			if (!deleteIt) {
				//set the new level to the tooltip text of the remember field for later use
				AddTooltip(prefix + "Companion.Remember", newLvl + "," + RangerLvl + ",");
			} else if (thisCrea && thisCrea.traits) {
				//bring back the multiattack trait, if applicable
				for (var t = 0; t < thisCrea.traits.length; t++) {
					var tName = thisCrea.traits[t].name;
					if ((/multiattack/i).test(tName)) {
						var traitString = "\u25C6 " + tName + ": " + thisCrea.traits[t].description;
						AddString(prefix + "Comp.Use.Traits", traitString, true);
					}
				}
			}
		}
	}
	if (thermoTxt) {
		SetHPTooltip(false, true);
		thermoM(thermoTxt, true); // Stop progress bar
	}
}

//a function to change the sorting of the skills
function MakeSkillsMenu_SkillsOptions(input, onlyTooltips) {
	var sWho = Who("Text.SkillsNames");
	var sList = Who("Acr Prof").replace(/^.*(\n|\r)*/, "");
	if (!input || input == "justMenu") {
		Menus.skills = [{
			cName : "Sort skills alphabetically",
			cReturn : "skills#alphabeta",
			bMarked : sWho === "alphabeta"
		}, {
			cName : "Sort skills by ability score",
			cReturn : "skills#abilities",
			bMarked : sWho === "abilities"
		}, {
			cName : "-"
		}, {
			cName : "Show a dialog with my skill options" + (sList ? "" : " (nothing to show)"),
			cReturn : "skills#dialog",
			bEnabled : sList !== ""
		}];
		if (input == "justMenu") return;
	};

	var mStr = toUni(" Bonus Modifier") + "\nThe number you type in here will be added to the calculated ";
	var mStr1 = " value.\n\n" + toUni("Dynamic Modifiers") + "\nYou can also have the field use ability score modifiers. To do this, use the abbreviations of ability scores (Str, Dex, Con, Int, Wis, Cha, HoS), math operators (+, -, /, *), and numbers.\n   For example: '2+Str' or 'Wis+Int'.\nDon't worry if you are only able to write one or two letters of an ability score's abbreviation, the field will auto-complete (e.g. typing 'S+1' will result in 'Str+1').";
	var mStrC = mStr1.replace(", HoS", "");
	var mStr2 = "\n\nNote that any bonus from \"Jack of All Trades\" or \"Remarkable Athelete\" will be added automatically if the appropriate checkbox is checked.";
	var mStr3 = "\n\n" + toUni("Not Enough Space to Write?") + "\nIf you find that you need more space to type out the modifier you want to use, you can get a bigger input-form by left-clicking in this field while holding either the Ctrl, Shift, or Cmd key.\n   This pop-up dialogue will also show you the origins of modifiers added by the automation, if any.";
	var getStr = function(aSkill, isCom) {
		return toUni(aSkill) + mStr + aSkill + (isCom ? mStrC : mStr1) + (isCom ? "" : mStr2) + mStr3;
	};

	if (onlyTooltips) { // only do the bonus modifier tooltips
		for (var S = 0; S < (SkillsList.abbreviations.length - 2); S++) {
			var newSkill = SkillsList.names[S];
			AddTooltip(SkillsList.abbreviations[S] + " Bonus", getStr(newSkill));
			if (typePF) AddTooltip("BlueText.Comp.Use.Skills." + SkillsList.abbreviations[S] + ".Bonus", getStr(newSkill, true), "");
		}
		return;
	};

	var MenuSelection = input ? input : getMenu("skills");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	if (MenuSelection[1] === "dialog") {
		ShowDialog("Skill proficiency origins and options", sList);
	} else if (MenuSelection[1] !== sWho) {
		// Start progress bar and stop calculations
		var thermoTxt = thermoM("Changing the order of the skills...");
		calcStop();
		var skillFlds = [" Prof", " Exp", " Bonus"];
		if (!typePF) skillFlds = skillFlds.concat([" Adv", " Dis"]);
		var skillRemObj = {}, useFld;

		// a function to do the actual copying
		var copy = function(fromObj, toObj, justObj) {
			if (fromObj.type == "checkbox") {
				if (justObj) {
					toObj.isBoxCheckVal = fromObj.isBoxChecked(0);
					toObj.type = "checkbox";
				} else {
					toObj.checkThisBox(0, fromObj.isBoxCheckVal);
				}
			} else {
				toObj.value = fromObj.value;
			}
			toObj.userName = fromObj.userName;
			toObj.submitName = fromObj.submitName;
			toObj.readonly = fromObj.readonly;
		}

		// Swap everything between the two types of lists
		for (var n = 1; n <= 2; n++) {
			for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
				var aSkill = SkillsList.abbreviations[s];
				var linkedSkill = SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(aSkill)];
				if (n == 1) {
					skillRemObj[aSkill] = {};
					useFld = sWho === "alphabeta" ? aSkill : linkedSkill;
				} else {
					useFld = sWho === "alphabeta" ? linkedSkill : aSkill;
				}
				for (var i = 0; i < skillFlds.length; i++) {
					if (n == 1) {
						skillRemObj[aSkill][skillFlds[i]] = {};
						copy(tDoc.getField(useFld + skillFlds[i]), skillRemObj[aSkill][skillFlds[i]], true);
					} else {
						copy(skillRemObj[aSkill][skillFlds[i]], tDoc.getField(useFld + skillFlds[i]));
					}
				}
			}
		}

		if (typePF) {
			// If this is a printer friendly sheet, show the stealth disadvantage field, if checked
			Hide("Stealth Disadv");
			if (How("AC Stealth Disadvantage") == "Dis") Show("Stealth Disadv." + MenuSelection[1]);

			// If this is a printer friendly sheet, also rearrange the skills of the companion page(s)
			var AScompA = What("Template.extras.AScomp").split(",");
			for (var AS = 0; AS < AScompA.length; AS++) {
				var prefix = AScompA[AS];
				var aField = prefix + "Comp.Use.Skills.";
				var bField = prefix + "BlueText.Comp.Use.Skills.";
				skillFlds = [[aField, ".Prof"], [aField, ".Exp"], [bField, ".Bonus"]];
				for (var n = 1; n <= 2; n++) {
					for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
						var aSkill = SkillsList.abbreviations[s];
						var linkedSkill = SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(aSkill)];
						if (n == 1) {
							skillRemObj[aSkill] = {};
							useFld = sWho === "alphabeta" ? aSkill : linkedSkill;
						} else {
							useFld = sWho === "alphabeta" ? linkedSkill : aSkill;
						}
						for (var i = 0; i < skillFlds.length; i++) {
							if (n == 1) {
								skillRemObj[aSkill][skillFlds[i][1]] = {};
								copy(tDoc.getField(skillFlds[i][0] + useFld + skillFlds[i][1]), skillRemObj[aSkill][skillFlds[i][1]], true);
							} else {
								copy(skillRemObj[aSkill][skillFlds[i][1]], tDoc.getField(skillFlds[i][0] + useFld + skillFlds[i][1]));
							}
						}
					}
				}
			}
		}

		//set the correct tooltip for remembering
		AddTooltip("Text.SkillsNames", MenuSelection[1]);

		//set the rich text for the skill names
		SetRichTextFields(false, true);
		thermoM(thermoTxt, true); // Stop progress bar
	}
}

// returns an object of the different elements to populate the class features or limited features section if olchoice is provided, oldlevel has to be provided as well
function GetLevelFeatures(aFea, level, choice, oldlevel, oldchoice, ForceChoice) {
	var tRe = { changed : false };
 	var attr = [["Add", "additional"], ["Use", "usages"], ["UseCalc", "usagescalc"], ["Recov", "recovery"], ["UseName", "name"], ["UseName", "limfeaname"], ["Descr", "description"], ["source", "source"]];

	for (var a = 0; a < attr.length; a++) {
		// add the new choice
		var setA = attr[a][0];
		var objA = attr[a][1];
		tRe[setA] = choice && aFea[choice] && aFea[choice][objA] ? aFea[choice][objA] : aFea[objA] && !ForceChoice ? aFea[objA] : tRe[setA] ? tRe[setA] : "";
		tRe[setA + "Old"] = oldchoice && aFea[oldchoice] && aFea[oldchoice][objA] ? aFea[oldchoice][objA] : aFea[objA] && !ForceChoice ? aFea[objA] : tRe[setA + "Old"] ? tRe[setA + "Old"] : "";
		if (objA.indexOf("usages") !== -1) {
			if (level === 0) tRe[setA] = "";
			if (oldlevel === 0) tRe[setA + "Old"] = "";
		}
	}

	for (var aProp in tRe) {
		if (aProp.indexOf("source") !== -1) continue;
		var theP = tRe[aProp];
		if (theP && isArray(theP)) {
			var lvlUse = aProp.indexOf("Old") !== -1 && (oldlevel || oldlevel === 0) ? oldlevel : level;
			lvlUse = Math.min(lvlUse, theP.length) - 1;
			tRe[aProp] = theP[lvlUse] ? theP[lvlUse] : "";

			// now see if anything changed compared to the new
			if (!tRe.changed && aProp.indexOf("Old") !== -1) {
				var otherProp = aProp.replace("Old", "");
				if (tRe[otherProp] !== "" && !isArray(tRe[otherProp])) {
					tRe.changed = tRe[aProp] != tRe[otherProp];
				}
			}
		}
	}
	return tRe;
};

// set some variables to their metric functionality
function setListsUnitSystem(isMetric, onStart) {
	var wasMetric = What("Unit System") === "metric";
	isMetric = isMetric ? isMetric === "metric" : What("Unit System") === "metric";
	if (onStart && !isMetric) return; //nothing to do on startup and the unit system is not metric
	var conStr = !onStart && wasMetric === isMetric ? "UpdateDecimals" : (isMetric ? "ConvertToMetric" : "ConvertToImperial");

	for (var cType in compString) {
		var cString = compString[cType].string
		if (compString[cType].string) compString[cType].string = tDoc[conStr](compString[cType].string, 0.5);
	};
}

// automatically add a new entry on the Adventurers Logsheet with the sheets current values
function addALlogEntry() {
	//first find the next empty logsheet entry
	var theTypesA = [
		".xp",
		".gold",
		".downtime",
		".renown",
		".magicItems"
	];
	var ALlogA = What("Template.extras.ALlog").split(",").splice(1);
	var emptyLog = [];
	var emptyFound = false;
	for (var tA = 0; tA < ALlogA.length; tA++) {
		for (var i = 1; i <= FieldNumbers.logs; i++) {
			var emptyFlds = 0;
			for (var A = 0; A < theTypesA.length; A++) {
				emptyFlds += What(ALlogA[tA] + "AdvLog." + i + theTypesA[A] + ".gain") === "" ? 1 : 0;
			}
			if (emptyFlds === 5) {
				emptyFound = true;
				emptyLog[0] = ALlogA[tA];
				emptyLog[1] = i;
				emptyLog[2] = i !== 1 ? ALlogA[tA] : (tA !== 0 ? ALlogA[tA - 1] : "stop");
				break;
			}
		}
		if (emptyFound) break;
	};
	//now if no empty log was found, first add another logsheet page
	if (emptyLog.length === 0) {
		emptyLog[0] = DoTemplate("ALlog", "Add");
		emptyLog[1] = 1;
		emptyLog[2] = ALlogA[ALlogA.length - 1];
	};

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Adding new logsheet entry...");
	calcStop();

	var baseFld = emptyLog[0] + "AdvLog." + emptyLog[1] + ".";
	// experience
	var start = baseFld === "AdvLog.1." ? 0 : What(baseFld + "xp.start");
	var total = What("Total Experience") - start;
	Value(baseFld + "xp.gain", (total >= 0 ? "+" : "") + total);
	thermoM(1/5);

	// gold
	start = baseFld === "AdvLog.1." ? 0 : What(baseFld + "gold.start");
	total = Math.round(((Number(What("Platinum Pieces").replace(",", ".")) * 10) + Number(What("Gold Pieces").replace(",", ".")) + (Number(What("Electrum Pieces").replace(",", ".")) / 2) + (Number(What("Silver Pieces").replace(",", ".")) / 10) + (Number(What("Copper Pieces").replace(",", ".")) / 100)) * 100) / 100 - start;
	Value(baseFld + "gold.gain", (total >= 0 ? "+" : "") + total);
	thermoM(2/5);

	// downtime (can't really be calculated, so just add a zero)
	Value(baseFld + "downtime.gain", "+0");

	// renown
	start = baseFld === "AdvLog.1." ? 0 : What(baseFld + "renown.start");
	total = What("Background_Renown.Text") - start;
	Value(baseFld + "renown.gain", (total >= 0 ? "+" : "") + total);
	thermoM(3/5);

	// magicItems
	start = baseFld === "AdvLog.1." ? 0 : What(baseFld + "magicItems.start");
	var MInr = [];
	for (var mi = 1; mi <= FieldNumbers.magicitems; mi++) {
		var thisMI = What("Extra.Magic Item " + mi).toLowerCase();
		if (thisMI) MInr.push(thisMI);
	};
	if (What("Adventuring Gear Remember") === false) {
		for (var gmi = FieldNumbers.gearMIrow + 1; gmi <= FieldNumbers.gear; gmi++) {
			var thisMI = What("Adventuring Gear Row " + mi).toLowerCase();
			if (thisMI && MInr.index(thisMI) === -1) MInr.push(thisMI);
		}
	};
	total = MInr.length - start;
	Value(baseFld + "magicItems.gain", (total >= 0 ? "+" : "") + total);
	thermoM(4/5);

	// set today's date
	Value(baseFld + "date", util.printd('yy-mm-dd', new Date()));

	// set the other fields, if a previous entry was detected
	if (emptyLog[2] !== "stop") {
		var preBase = emptyLog[2] + "AdvLog." + (emptyLog[1] === 1 ? FieldNumbers.logs : emptyLog[1] - 1) + ".";
		Value(baseFld + "adventure", What(preBase + "adventure"));
		Value(baseFld + "dm", What(preBase + "dm"));
		var oldSesh = Number(What(preBase + "session").replace(/[^\d+]*(\d+)?.*/, "$1"));
		Value(baseFld + "session", What(preBase + "session").replace(oldSesh, oldSesh + 1));
	};

	tDoc.getField(baseFld + "notes" + (emptyLog[0] === "" ? ".1" : "")).setFocus();

	//alert the user of what happened
	app.alert({
		cMsg : "The sheet automatically filled '" + toUni(What(emptyLog[0] + "Text.AdvLog." + emptyLog[1]).capitalize()) + "' with the date of today.\n\nThe numerical 'gain' fields are calculated using the information from the rest of the sheet compared to the last entry.\nThe Adventure Name, Session number, and DMs Name have been taken from the previous entry.\n\nNote that the Downtime gain is set to zero as the sheet doesn't track those.",
		cTitle : "A new Logsheet Entry has been added",
		nType : 0,
		nIcon : 3
	});
	thermoM(thermoTxt, true); // Stop progress bar
};

//menu for logsheet entries to move up, move down, insert, delete, or clear
function MakeAdvLogLineMenu_AdvLogLineOptions() {
	var prefix = getTemplPre(event.target.name, "ALlog", true);
	var firstPrefix = isTemplVis("ALlog", true)[1];
	var lineNmbr = Number(event.target.name.slice(-1));
	var theArray = [
		["Move up", "up"],
		["Move down", "down"],
		["-", "-"],
		["Insert empty Logsheet Entry", "insert"],
		["Delete Logsheet Entry", "delete"],
		["Clear Logsheet Entry", "clear"]
	];
	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			var isEnabled = true;
			if (array[i][1] === "up" && prefix === firstPrefix && lineNmbr === 1) {
				isEnabled = false;
			}
			item.push({
				cName : array[i][0],
				cReturn : array[i][1],
				bEnabled : isEnabled
			});
		}
	}
	var AdvLogLineMenu = [];
	menuLVL1(AdvLogLineMenu, theArray);
	Menus.advlogline = AdvLogLineMenu;

	var MenuSelection = getMenu("advlogline");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	doAdvLogLine(MenuSelection[0], lineNmbr, prefix);
}

//do with logsheet entry, move up, move down, insert, delete, clear
function doAdvLogLine(action, lineNmbr, prefix) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying the layout settings...");
	calcStop();
	var ALlogA = What("Template.extras.ALlog").split(",").splice(1);
	var preNm = prefix + "AdvLog.";
	var firstPrefix = isTemplVis("ALlog", true)[1];
	var FieldNames = [
		".xp.gain",
		".gold.gain",
		".downtime.gain",
		".renown.gain",
		".magicItems.gain",
		".date",
		".adventure",
		".session",
		".dm",
		".notes"
	];
	var extraPage = false;
	switch (action) {
	 case "up" :
	 case "down" :
		var Fields = [], FieldsValue = [], FieldsUp = [], FieldsUpValue = [], FieldsDown = [], FieldsDownValue = [];
		for (var F = 0; F < FieldNames.length; F++) {
			Fields[F] = preNm + lineNmbr + FieldNames[F];
			FieldsValue[F] = What(Fields[F]);
			if (action === "up" && (prefix !== firstPrefix || lineNmbr !== 1)) {
				if (lineNmbr !== 1) {
					FieldsUp[F] = preNm + (lineNmbr - 1) + FieldNames[F];
					FieldsUpValue[F] = What(FieldsUp[F]);
				} else {
					FieldsUp[F] = ALlogA[ALlogA.indexOf(prefix) - 1] + "AdvLog." + FieldNumbers.logs + FieldNames[F];
					FieldsUpValue[F] = What(FieldsUp[F]);
				}
			};
			if (action === "down") {
				if (lineNmbr !== FieldNumbers.logs) {
					FieldsDown[F] = preNm + (lineNmbr + 1) + FieldNames[F];
					FieldsDownValue[F] = What(FieldsDown[F]);
				} else if (ALlogA.indexOf(prefix) !== ALlogA.length - 1) {
					FieldsDown[F] = ALlogA[ALlogA.indexOf(prefix) + 1] + "AdvLog.1" + FieldNames[F];
					FieldsDownValue[F] = "";
				} else {
					if (!extraPage) extraPage = DoTemplate("ALlog", "Add");
					FieldsDown[F] = extraPage + "AdvLog.1" + FieldNames[F];
					FieldsDownValue[F] = "";
				}
			};
		};
		var useArr = action === "up" ? [FieldsUp, FieldsUpValue] : [FieldsDown, FieldsDownValue];
		for (var F = 0; F < FieldNames.length; F++) {
			Value(useArr[0][F], FieldsValue[F]);
			Value(Fields[F], useArr[1][F]);
		}
		break;
	 case "delete" :
		for (var tA = ALlogA.indexOf(prefix); tA < ALlogA.length; tA++) {
			var startI = ALlogA[tA] === prefix ? lineNmbr : 1;
			for (var i = startI; i <= FieldNumbers.logs; i++) {
				if (tA === (ALlogA.length - 1) && i === FieldNumbers.logs) {
					tDoc.resetForm([ALlogA[tA] + "AdvLog." + i]);
				} else {
					for (var F = 0; F < FieldNames.length; F++) {
						if (i === FieldNumbers.logs) {
							Value(ALlogA[tA] + "AdvLog." + i + FieldNames[F], What(ALlogA[tA + 1] + "AdvLog." + 1 + FieldNames[F]));
						} else {
							Value(ALlogA[tA] + "AdvLog." + i + FieldNames[F], What(ALlogA[tA] + "AdvLog." + (i + 1) + FieldNames[F]));
						}
					}
				}
			}
		};
		break;
	 case "insert" :
		for (var tA = (ALlogA.length - 1); tA >= ALlogA.indexOf(prefix); tA--) {
			var endI = ALlogA[tA] === prefix ? lineNmbr : 0;
			for (var i = FieldNumbers.logs; i > endI; i--) {
				if (tA === (ALlogA.length - 1) && i === FieldNumbers.logs) {
					for (var F = 0; F < FieldNames.length; F++) {
						var fieldVal = What(ALlogA[tA] + "AdvLog." + i + FieldNames[F]);
						if (fieldVal && !extraPage) extraPage = DoTemplate("ALlog", "Add");
						Value(extraPage + "AdvLog.1" + FieldNames[F], fieldVal);
						Value(ALlogA[tA] + "AdvLog." + i + FieldNames[F], What(ALlogA[tA] + "AdvLog." + (i - 1) + FieldNames[F]));
					}
					if (extraPage) event.target.setFocus();
				} else {
					for (var F = 0; F < FieldNames.length; F++) {
						if (i === 1) {
							Value(ALlogA[tA] + "AdvLog." + i + FieldNames[F], What(ALlogA[tA - 1] + "AdvLog." + FieldNumbers.logs + FieldNames[F]));
						} else {
							Value(ALlogA[tA] + "AdvLog." + i + FieldNames[F], What(ALlogA[tA] + "AdvLog." + (i - 1) + FieldNames[F]));
						}
					}
				}
			}
		};
	 case "clear" :
		tDoc.resetForm([preNm + lineNmbr]);
		break;
	};
	thermoM(thermoTxt, true); // Stop progress bar
}

//a way to contact morepurplemorebetter
function contactMPMB(medium) {
	switch (medium.toLowerCase()) {
	 case "email" :
		app.launchURL(("https://flapkan.com/contact?edit[message]=%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASheet version: MPMB\'s " + (tDoc.info.SpellsOnly ? "Complete " + tDoc.info.SpellsOnly.capitalize() + " Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")) + " v" + semVers + " (" + tDoc.info.SheetType + ")" + " %0D%0APDF viewer: " + app.viewerType + ", v" + app.viewerVersion + "; Language: " + app.language + "; OS: " + app.platform).replace(/ /g, "%20"), true);
		break;
	 case "twitter" :
		app.launchURL("https://twitter.com/BetterOfPurple", true);
		break;
	 case "reddit" :
		app.launchURL("https://www.reddit.com/u/morepurplemorebetter/", true);
		break;
	 case "patreon" :
		app.launchURL("https://www.patreon.com/morepurplemorebetter", true);
		break;
	 case "github" :
		app.launchURL("https://github.com/morepurplemorebetter/", true);
		break;
	 case "dmsguild" :
		app.launchURL("https://www.dmsguild.com/browse.php?author=morepurplemorebetter", true);
		break;
	 case "enworld" :
		app.launchURL("http://www.enworld.org/forum/rpgdownloads.php?do=download&downloadid=1180", true);
		break;
	 case "syntax" :
		app.launchURL("https://flapkan.com/mpmb/syntax", true);
		break;
	 case "additions" :
		app.launchURL("https://flapkan.com/how-to/import-scripts", true);
		break;
	 case "syntaxgit" :
		app.launchURL("https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/tree/master/additional%20content%20syntax", true);
		break;
	 case "additionsgit" :
		app.launchURL("https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/tree/master/additional%20content", true);
		break;
	 case "latestversion" :
		app.launchURL(
			patreonVersion || tDoc.info.SpellsOnly ? LinksLatest.patreon :
			LinksLatest[minVer ? "advlog" : "character"][typePF ? "PF" : "CF"],
			true
		);
		break;
	 case "otherdesign" :
		app.launchURL(
			patreonVersion || tDoc.info.SpellsOnly ? LinksLatest.patreon :
			LinksLatest[minVer ? "advlog" : "character"][typePF ? "CF" : "PF"],
			true
		);
		break;
	 case "fullversion" :
		app.launchURL(
			patreonVersion ? LinksLatest.patreon :
			LinksLatest.character[typePF ? "PF" : "CF"],
			true
		);
		break;
	 case "subreddit" :
		app.launchURL("http://flapkan.com/mpmb/fanforum", true);
		break;
	 case "bug" :
		var sheetType = typePF ? "pf" + ((/redesign/i).test(tDoc.info.SheetType) ? "r" : "") : typeA4 ? "cf-a4" : "cf-lt";
		var acroType = app.viewerType == "Reader" ? "reader-" : "pro-";
		var acroVers = app.viewerVersion < 9 ? "other" : acroType + (app.viewerVersion < 10 ? "ix" : app.viewerVersion < 11 ? "x" : app.viewerVersion < 12 ? "xi" : "dc");
		var bugURL = [
			"https://flapkan.com/contact/bug_report", //base URL
			"?edit[field_sheet_type]=",
			sheetType, // sheet type (cf-a4, cf-lt, pf, pfr)
			"&edit[field_version_number]=",
			sheetVersion, // sheet version, as a decimal
			"&edit[field_operating_system]=",
			app.platform.toLowerCase(), // OS (win, mac, unix, ios, android, other)
			"&edit[field_pdf_viewing_software]=",
			acroVers, // acrobat version (reader-, pro-) + (ix, x, xi, dc)
		];
		app.launchURL(bugURL.join(""), true);
		break;
	};
};

//open a dialogue for the Patreon
function PatreonStatement() {
	try {
		var iNow = new Date();
		var timeDiff = iNow.getTime() - eval(tDoc.getField("SaveIMG.Patreon").submitName).getTime();
		if (Math.floor(timeDiff / (1000 * 3600 * 24)) >= 28) {
			var oButIcon = this.getField("SaveIMG.Patreon").buttonGetIcon();
			var oMyIcon = util.iconStreamFromIcon(oButIcon);

			var theTxt = "If you like this sheet, please consider becoming a patron at the Patreon for MPMB's Character Record Sheet.\n\nWith your contribution on Patreon:\n   \u2022 I can continue expanding the functionality of this sheet.\n   \u2022 You get to choose which new features get added.\n   \u2022 Your favourite third-party material gets added.\n   \u2022 You get instant access and alerts when new versions are released.";
			var theTxt2 = "Don't worry, the sheet will stay available for free on my website.\nHowever, if you feel like contributing more, it will all flow back into expanding the sheets' features and content.\n\nYou can always visit the Patreon webpage using the \"Contact MPMB\" bookmarks.";
			var PatreonDialog = {
				initialize : function (dialog) {
					dialog.load({
						"img1" : oMyIcon
					});
				},
				bPat : function (dialog) {contactMPMB("patreon");},
				description : {
					name : "Become a patron",
					elements : [{
						type : "view",
						elements : [{
							type : "view",
							align_children : "align_distribute",
							elements : [{
								type : "image",
								item_id : "img1",
								alignment : "align_top",
								width : 63,
								height : 63
							}, {
								type : "view",
								char_width : 40,
								elements : [{
									type : "static_text",
									name : "Become a patron on Patreon",
									item_id : "head",
									alignment : "align_top",
									font : "title",
									bold : true,
									height : 24,
									char_width : 40
								}, {
									type : "static_text",
									item_id : "txt1",
									alignment : "align_fill",
									font : "dialog",
									wrap_name : true,
									char_width : 40,
									name : theTxt
								}, {
									type : "button",
									font : "heading",
									bold : true,
									item_id : "bPat",
									name : "Go to the Patreon webpage",
									alignment : "align_center"
								}, {
									type : "static_text",
									item_id : "txt2",
									alignment : "align_fill",
									font : "dialog",
									wrap_name : true,
									char_width : 40,
									name : theTxt2
								}]
							}]
						}, {
							type : "ok"
						}]
					}]
				}
			};

			app.execDialog(PatreonDialog);
			//reset the counter
			tDoc.getField("SaveIMG.Patreon").submitName = new Date().toSource();
		};
	} catch (e) {};
}

//a way to change the calculations of the sheet; The input is an object with the "atkDmg", "atkHit", "atkAdd", and/or "hp" attributes;
// Add === true to add something, or Add === false to remove something;
function addEvals(evalObj, NameEntity, Add) {
	if (!evalObj) return;

	// remember the old attack changing strings
	if ((evalObj.atkAdd || evalObj.atkCalc || evalObj.spellCalc) && CurrentUpdates.atkStrOld == undefined) CurrentUpdates.atkStrOld = StringEvals("atkStr");
	if (evalObj.atkAdd) CurrentUpdates.types.push("attacksforce");

	// make the changes to the CurrentEvals object for attack changes
	var atkStr = "";
	var atkTypes = ["atkAdd", "atkCalc", "spellCalc"];
	for (var i = 0; i < atkTypes.length; i++) {
		var atkT = atkTypes[i];
		if (!evalObj[atkT]) continue;
		var atkIsArray = isArray(evalObj[atkT]);
		// add the descriptive text
		if (atkIsArray && evalObj[atkT][1]) atkStr += "\n \u2022 " + evalObj[atkT][1];
		// set the function
		if (Add) {
			if (!CurrentEvals[atkT]) CurrentEvals[atkT] = {};
			CurrentEvals[atkT][NameEntity] = atkIsArray ? evalObj[atkT][0] : evalObj[atkT];
		} else if (CurrentEvals[atkT] && CurrentEvals[atkT][NameEntity]) {
			delete CurrentEvals[atkT][NameEntity];
		}
	};
	// set the descriptive text for the attack calculations
	if (atkStr) {
		if (Add) {
			if (!CurrentEvals.atkStr) CurrentEvals.atkStr = {};
			CurrentEvals.atkStr[NameEntity] = atkStr;
		} else if (CurrentEvals.atkStr && CurrentEvals.atkStr[NameEntity]) {
			delete CurrentEvals.atkStr[NameEntity];
		}
		// as the descriptive text changed, show it in the changes dialog
		CurrentUpdates.types.push("atkstr");
	}

	// do the stuff for the hp calculations
	if (evalObj.hp) {
		if (Add) {
			if (!CurrentEvals.hp) CurrentEvals.hp = {};
			CurrentEvals.hp[NameEntity] = evalObj.hp;
		} else if (CurrentEvals.hp && CurrentEvals.hp[NameEntity]) {
			delete CurrentEvals.hp[NameEntity];
		};
		CurrentUpdates.types.push("hp");
	};

	// remember the old spell changing strings
	if ((evalObj.spellList || evalObj.spellAdd) && CurrentUpdates.spellStrOld == undefined) CurrentUpdates.spellStrOld = StringEvals("spellStr");

	// make the changes to the CurrentEvals object for spell changes
	var spellStr = "";
	var spellTypes = ["spellList", "spellAdd"];
	for (var i = 0; i < spellTypes.length; i++) {
		var spellT = spellTypes[i];
		if (!evalObj[spellT]) continue;
		var spellIsArray = isArray(evalObj[spellT]);
		// add the descriptive text
		if (spellIsArray && evalObj[spellT][1]) spellStr += "\n \u2022 " + evalObj[spellT][1];
		// set the function
		if (Add) {
			if (!CurrentEvals[spellT]) CurrentEvals[spellT] = {};
			CurrentEvals[spellT][NameEntity] = spellIsArray ? evalObj[spellT][0] : evalObj[spellT];
		} else if (CurrentEvals[spellT] && CurrentEvals[spellT][NameEntity]) {
			delete CurrentEvals[spellT][NameEntity];
		}
	};
	// set the descriptive text for the attack calculations
	if (spellStr) {
		if (Add) {
			if (!CurrentEvals.spellStr) CurrentEvals.spellStr = {};
			CurrentEvals.spellStr[NameEntity] = spellStr;
		} else if (CurrentEvals.spellStr && CurrentEvals.spellStr[NameEntity]) {
			delete CurrentEvals.spellStr[NameEntity];
		}
		// as the descriptive text changed, show it in the changes dialog
		CurrentUpdates.types.push("spellstr");
	}

	if (!Add) CurrentEvals = CleanObject(CurrentEvals); // remove any remaining empty objects
	SetStringifieds("evals"); //now set this global variable to its field for safekeeping
};

// make a string of all the things affecting the attack calculations
function StringEvals(type) {
	if (!type || !CurrentEvals[type]) return "";
	var txt = [];
	for (var str in CurrentEvals[type]) {
		txt.push(toUni(str) + CurrentEvals[type][str]);
	}
	return txt.join("\n\n");
}

//apply the effect of a weapon with inputText the literal string in the Weapon Selection field and fldName the name of the field (any one of them); If fldName is left blank, use the event.target.name
function ApplyWeapon(inputText, fldName, isReCalc, onlyProf) {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything
	fldName = fldName ? fldName : event.target.name;
	var QI = fldName.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var fldNmbr = fldName.replace(/.*Attack\.(\d+?)\..+/, "$1");
	var ArrayNmbr = Number(fldNmbr) - 1;
	var fldBase = prefix + Q + "Attack." + fldNmbr + ".";
	var fldBaseBT = prefix + "BlueText." + Q + "Attack." + fldNmbr + ".";

	//set the input as the submitName for reference and set the non-automated field with the same value as well
	tDoc.getField(fldBase + "Weapon Selection").submitName = inputText;
	if (!IsNotWeaponMenu || CurrentVars.manual.attacks || (!isReCalc && inputText === (QI ? CurrentWeapons.field[ArrayNmbr] : CurrentWeapons.compField[prefix][ArrayNmbr]))) return; //don't do the rest of this function if only moving weapons around or weapons are set to manual or the CurrentWeapons.field didn't change

	if (What(fldBase + "Weapon") !== inputText) Value(fldBase + "Weapon", inputText);

	//remember what the old weapon was
	var oldWea = QI ? CurrentWeapons.known[ArrayNmbr][0] : CurrentWeapons.compKnown[prefix][ArrayNmbr][0];

	//now find the new weapon and put it in the document level variable CurrentWeapons
	if (QI) {
		CurrentWeapons.field[ArrayNmbr] = inputText;
		FindWeapons(ArrayNmbr);
	} else {
		CurrentWeapons.compField[prefix][ArrayNmbr] = inputText;
		FindCompWeapons(ArrayNmbr, prefix);
	};

	//a variable with all different fields of the one weapon
	var fields = {
		Proficiency : false,
		Mod : "",
		Range : "",
		Damage_Type : "",
		Description : "",
		Description_Tooltip : "",
		To_Hit_Bonus : 0,
		Damage_Bonus : 0,
		Damage_Die : "",
		Weight : ""
	};
	var BTflds = ["To_Hit_Bonus", "Damage_Bonus", "Damage_Die", "Weight"];

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Filling out the weapon's details...");
	calcStop();

	//set a variable to refer to the new weapon
	var thisWeapon = QI ? CurrentWeapons.known[ArrayNmbr] : CurrentWeapons.compKnown[prefix][ArrayNmbr];
	var WeaponName = thisWeapon[0];
	var aWea = QI || isNaN(parseFloat(WeaponName)) ? WeaponsList[WeaponName] : !QI && !isNaN(parseFloat(WeaponName)) && CurrentCompRace[prefix] ? CurrentCompRace[prefix].attacks[WeaponName] : false;

	//if there is a new weapon entered and the old weapon had ammo that is not used by any of the current weapons, remove that ammo from the ammo section.
	if (QI && oldWea && WeaponsList[oldWea].ammo) {
		var theOldAmmo = WeaponsList[oldWea].ammo;
		var tempFound = false;
		for (var j = 0; j < CurrentWeapons.known.length; j++) {
			var jWeapon = WeaponsList[CurrentWeapons.known[j][0]];
			if (jWeapon && jWeapon.ammo && jWeapon.ammo === theOldAmmo) {
				tempFound = true;
				break;
			};
		};
		if (!tempFound) RemoveAmmo(theOldAmmo);
	};

	// if a weapon was found, set the variables
	if (aWea) {
		// create the variable from the baseWeapon
		var theWea = {};
		if (aWea.baseWeapon && WeaponsList[aWea.baseWeapon]) {
			for (var attr in WeaponsList[aWea.baseWeapon]) theWea[attr] = WeaponsList[aWea.baseWeapon][attr];
		}
		for (var attr in aWea) theWea[attr] = aWea[attr];

		thermoTxt = thermoM("Applying the weapon's features...", false); //change the progress dialog text
		var curDescr = What(fldBase + "Description");
		var curRange = What(fldBase + "Range");
		fields.Description = theWea.description; //add description
		fields.Description_Tooltip = theWea.tooltip ? theWea.tooltip : ""; //add the tooltip for the description
		fields.Range = theWea.range; //add range
		fields.Damage_Type = theWea.damage[2]; //add Damage Type

		//add Weight
		fields.Weight = isReCalc ? What(fldBaseBT + "Weight") :
			theWea.weight ? theWea.weight : "";

		//add Damage Die
		fields.Damage_Die = theWea.damage[0] + (parseFloat(theWea.damage[1]) ? "d" + theWea.damage[1] : "");

		//add To Hit Bonus
		fields.To_Hit_Bonus = isReCalc ? What(fldBaseBT + "To Hit Bonus") :
			theWea.dc ? "dc" :
			theWea.modifiers && theWea.modifiers[0] ? theWea.modifiers[0] : 0;

		//add Damage Bonus
		fields.Damage_Bonus = isReCalc ? What(fldBaseBT + "Damage Bonus") :
			theWea.modifiers && theWea.modifiers[1] ? theWea.modifiers[1] : 0;

		//add proficiency checkmark
		fields.Proficiency = !QI ? true :
			QI && (/natural|spell|cantrip|alwaysprof/i).test(theWea.type) ? true :
			(/^(simple|martial)$/i).test(theWea.type) && tDoc.getField("Proficiency Weapon " + theWea.type.capitalize()).isBoxChecked(0) ? true :
			CurrentProfs.weapon.otherWea && RegExp(";(" + CurrentProfs.weapon.otherWea.finalProfs.join("s?|").replace(/ss\?\|/g, "s?|") + ");", "i").test(";" + [WeaponName, theWea.type].concat(theWea.list ? [theWea.list] : []).concat(theWea.baseWeapon ? [theWea.baseWeapon] : []).join(";") + ";") ? true :
			false;

		//add mod
		var StrDex = What(QI ? "Str" : prefix + "Comp.Use.Ability.Str.Score") < What(QI ? "Dex" : prefix + "Comp.Use.Ability.Dex.Score") ? 2 : 1;
		fields.Mod = isReCalc && !theWea.ability ? What(fldBase + "Mod") :
			(/finesse/i).test(theWea.description) ? StrDex : theWea.ability;

		//change mod if this is concerning a spell/cantrip
		if (thisWeapon[3]) {
			if (thisWeapon[4].length) {
				var abiArr = thisWeapon[4].map( function(sClass) {
					return CurrentSpells[sClass] && CurrentSpells[sClass].ability && !isNaN(CurrentSpells[sClass].ability) ? CurrentSpells[sClass].ability : 0;
				});
			} else {
				// the spell is not known by any class, so just gather the ability scores from all spellcasting entries so we can select the highest
				var abiArr = [];
				for (var aCast in CurrentSpells) {
					if (!isNaN(CurrentSpells[aCast].ability)) abiArr.push(CurrentSpells[aCast].ability);
				}
			}
			var abiDone = [];
			var abiModArr = [];
			for (var i = 0; i < abiArr.length; i++) {
				if (!abiArr[i] || abiDone.indexOf(abiArr[i]) !== -1) continue;
				abiDone.push(abiArr[i]);
				var thisMod = What(AbilityScores.abbreviations[abiArr[i] - 1]);
				if (thisMod > Math.max.apply(Math, abiModArr)) fields.Mod = abiArr[i];
				abiModArr.push(thisMod);
			}
		}

		if (theWea.ammo) fields.Ammo = theWea.ammo; //add ammo

		//now run the code that was added by class/race/feat
		if (QI && CurrentEvals.atkAdd) {

			// define some variables that we can check against later or with the CurrentEvals
			var WeaponText = inputText + " " + fields.Description;
			var isDC = (/dc/i).test(fields.To_Hit_Bonus);
			var isSpell = (thisWeapon[3] || (/cantrip|spell/i).test(theWea.type) || (/\b(cantrip|spell)\b/i).test(WeaponText)) && WeaponName !== "shillelagh";
			var isMeleeWeapon = !isSpell && (/melee/i).test(fields.Range);
			var isRangedWeapon = !isSpell && (/^(?!.*melee).*\d+.*$/i).test(fields.Range);
			var isNaturalWeapon = !isSpell && (/natural/i).test(theWea.type);

			var gatherVars = {
				WeaponText : WeaponText,
				WeaponTextName : inputText,
				isDC : isDC,
				isSpell : isSpell,
				isMeleeWeapon : isMeleeWeapon,
				isRangedWeapon : isRangedWeapon,
				isNaturalWeapon : isNaturalWeapon,
				theWea : theWea,
				StrDex : StrDex,
				WeaponName : WeaponName,
				baseWeaponName : theWea.baseWeapon ? theWea.baseWeapon : WeaponName,
				thisWeapon : thisWeapon
			}

			var evalsToDo = [[], [], []]; // [0] magic items, [1] feats, [2] others
			for (var anEval in CurrentEvals.atkAdd) {
				evalsToDo[anEval.indexOf("(magic item)") != -1 ? 0 : anEval.indexOf("(feat)") != -1 ? 1 : 2].push(anEval);
			}
			evalsToDo = evalsToDo[0].concat(evalsToDo[1]).concat(evalsToDo[2]);
			for (var i = 0; i < evalsToDo.length; i++) {
				var evalThing = CurrentEvals.atkAdd[evalsToDo[i]];
				try {
					if (typeof evalThing == 'string') {
						eval(evalThing);
					} else if (typeof evalThing == 'function') {
						evalThing(fields, gatherVars);
					}
				} catch (error) {
					var eText = "The custom ApplyWeapon/atkAdd script '" + evalsToDo[i] + "' produced an error! It will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error + "\n ";
					for (var e in error) eText += e + ": " + error[e] + ";\n ";
					console.println(eText);
					console.show();
					delete CurrentEvals.atkAdd[evalsToDo[i]];
				}
			}
		};
		// if this is a field recalculation and no custom eval changed the description or range, just use the one from the field so that manual changes are preserved
		if (isReCalc) {
			if (fields.Description === theWea.description) fields.Description = curDescr;
			if (fields.Range === theWea.range) fields.Range = curRange;
		}
	};

	// apply the values to the fields only if we need to either reset the fields or a weapon was found
	if (onlyProf) {
		Checkbox(fldBase + "Proficiency", fields.Proficiency);
	} else if (aWea || !inputText) {
		var resetFlds = [];
		for (var weaKey in fields) {
			var keyFld = (BTflds.indexOf(weaKey) !== -1 ? fldBaseBT : fldBase) + weaKey.replace(/_/g, " ");
			if (!fields[weaKey]) {
				if (tDoc.getField(keyFld)) resetFlds.push(keyFld);
				continue;
			};
			switch (weaKey) {
			 case "Description_Tooltip" :
				break;
			 case "Proficiency" :
				Checkbox(keyFld, fields[weaKey]);
				break;
			 case "Mod" :
				PickDropdown(keyFld, fields[weaKey]);
				break;
			 case "Damage_Type" :
				AddDmgType(keyFld, fields[weaKey]);
				break;
			 case "Weight" :
				var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
				Value(keyFld, RoundTo(fields[weaKey] * massMod, 0.001, true));
				break;
			 case "Description" :
			 case "Range" :
				Value(keyFld, What("Unit System") === "imperial" ? fields[weaKey] : ConvertToMetric(fields[weaKey], 0.5), weaKey !== "Description" ? "" : What("Unit System") === "imperial" ? fields.Description_Tooltip : ConvertToMetric(fields.Description_Tooltip, 0.5));
				break;
			 case "Ammo" :
				if (fields[weaKey]) AddAmmo(fields[weaKey]);
				break;
			 default :
				Value(keyFld, fields[weaKey]);
			};
		};
		if (resetFlds.length) tDoc.resetForm(resetFlds);
	} else if (CurrentProfs.weapon.otherWea) { //if not a known weapon or an empty field, still check if we need to set the checkmark for proficiency
		var matchTxt = CurrentWeapons.field[ArrayNmbr].toLowerCase();
		for (var i = 0; i < CurrentProfs.weapon.otherWea.length; i++) {
			var weaProf = CurrentProfs.weapon.otherWea[i];
			if (!WeaponsList[weaProf] && matchTxt.indexOf(weaProf.toLowerCase()) !== -1) {
				Checkbox(fldBase + "Proficiency", true);
				break;
			};
		};
	};
	//if (QI && ((event.target && fldName == event.target.name) || Number(fldNmbr) === FieldNumbers.attacks)) SetOffHandAction();
	thermoM(thermoTxt, true); // Stop progress bar
};

//calculate the attack damage and to hit, can be called from any of the attack fields (sets the fields)
function CalcAttackDmgHit(fldName) {
	if (CurrentVars.manual.attacks) return; //if the attack calculation is set to manual, don't do anything

	fldName = fldName ? fldName : event.target.name;
	var QI = fldName.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var fldNmbr = fldName.replace(/.*Attack\.(\d+?)\..+/, "$1");
	var ArrayNmbr = Number(fldNmbr) - 1;
	var fldBase = prefix + Q + "Attack." + fldNmbr + ".";
	var fldBaseBT = prefix + "BlueText." + Q + "Attack." + fldNmbr + ".";
	var fields = {
		Proficiency : tDoc.getField(fldBase + "Proficiency").isBoxChecked(0),
		Mod : What(fldBase + "Mod"),
		Range : What(fldBase + "Range"),
		Damage_Type : What(fldBase + "Damage Type"),
		Description : What(fldBase + "Description"),
		To_Hit_Bonus : What(fldBaseBT + "To Hit Bonus"),
		Damage_Bonus : What(fldBaseBT + "Damage Bonus"),
		Damage_Die : What(fldBaseBT + "Damage Die")
	};

	var thisWeapon = QI ? CurrentWeapons.known[ArrayNmbr] : CurrentWeapons.compKnown[prefix][ArrayNmbr];
	var WeaponName = thisWeapon[0];
	var aWea = QI || isNaN(parseFloat(WeaponName)) ? WeaponsList[WeaponName] : !QI && !isNaN(parseFloat(WeaponName)) && CurrentCompRace[prefix] ? CurrentCompRace[prefix].attacks[WeaponName] : false;
	var WeaponText = QI ? CurrentWeapons.field[ArrayNmbr] : CurrentWeapons.compField[prefix][ArrayNmbr];
	var aWeaAbi = aWea && aWea.ability !== undefined ? aWea.ability : aWea && aWea.baseWeapon && WeaponsList[aWea.baseWeapon] && WeaponsList[aWea.baseWeapon].ability !== undefined ? WeaponsList[aWea.baseWeapon].ability : false;

	if (!WeaponText || ((/^(| |empty)$/).test(fields.Mod) && aWeaAbi !== 0)) {
		Value(fldBase + "Damage", "");
		Value(fldBase + "To Hit", "");
		if (QI) CurrentWeapons.offHands[ArrayNmbr] = false;
		return;
	};

	// only add the description part now, so we don't test against it above
	if (fields.Description) WeaponText += " " + fields.Description;

	// get the damage bonuses from the selected modifier, magic, and the blueText field
	var output = {
		prof : !fields.Proficiency ? 0 : (QI ? (tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) ? 0 : Number(How("Proficiency Bonus"))) : (tDoc.getField(prefix + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) ? 0 : What(prefix + "Comp.Use.Proficiency Bonus"))),
		die : fields.Damage_Die,
		modToDmg : thisWeapon[2],
		mod : !fields.Mod || fields.Mod === "empty" ? 0 : What(prefix + fields.Mod),
		magic : thisWeapon[1],
		bHit : fields.To_Hit_Bonus,
		bDmg : fields.Damage_Bonus,
		extraDmg : 0,
		extraHit : 0
	};

	// define some variables that we can check against later or with the CurrentEvals
	var isDC = (/dc/i).test(fields.To_Hit_Bonus);
	if (QI) {
		var theWea = {};
		if (aWea && aWea.baseWeapon && WeaponsList[aWea.baseWeapon]) {
			for (var attr in WeaponsList[aWea.baseWeapon]) theWea[attr] = WeaponsList[aWea.baseWeapon][attr];
		}
		if (aWea) for (var attr in aWea) theWea[attr] = aWea[attr];

		var isSpell = (thisWeapon[3] || (theWea && (/cantrip|spell/i).test(theWea.type)) || (/\b(cantrip|spell)\b/i).test(WeaponText)) && WeaponName !== "shillelagh";
		var isMeleeWeapon = !isSpell && (/melee/i).test(fields.Range);
		var isRangedWeapon = !isSpell && (/^(?!.*melee).*\d+.*$/i).test(fields.Range);
		var isNaturalWeapon = !isSpell && theWea && (/natural/i).test(theWea.type);

		// see if this is a off-hand attack and the modToDmg shouldn't be use
		var isOffHand = isMeleeWeapon && (/^(?!.*(spell|cantrip))(?=.*(off.{0,3}hand|secondary)).*$/i).test(WeaponText);
		if (CurrentWeapons.offHands[ArrayNmbr] !== isOffHand) {
			CurrentWeapons.offHands[ArrayNmbr] = isOffHand;
			SetOffHandAction();
		}
		if (isOffHand) output.modToDmg = output.mod < 0;

		//add the BlueText field value of the corresponding spellcasting class
		var spCaster = false;
		var abiScoreNo = tDoc.getField(fldBase + "Mod").currentValueIndices;
		if (thisWeapon[3] && thisWeapon[4].length) {
			var DCorHit = isDC ? "dc" : "atk";
			var abiBonArr = thisWeapon[4].map( function(sClass) {
				var ExtraBonus = CurrentSpells[sClass] && CurrentSpells[sClass].ability == abiScoreNo && CurrentSpells[sClass].blueTxt && CurrentSpells[sClass].blueTxt[DCorHit] ? CurrentSpells[sClass].blueTxt[DCorHit] : 0;
				return EvalBonus(ExtraBonus, true);
			});
			var highestBon = Math.max.apply(Math, abiBonArr);
			if (highestBon) {
				spCaster = [];
				for (var i = 0; i < abiBonArr.length; i++) {
					if (abiBonArr[i] == highestBon) spCaster.push(thisWeapon[4][i]);
				}
				output.extraHit += highestBon;
			}
		};

		// now run the code that was added by class/race/feat
		if (CurrentEvals.atkCalc) {

			var gatherVars = {
				WeaponText : WeaponText,
				WeaponTextName : WeaponText.replace(" " + fields.Description, ""),
				isDC : isDC,
				isSpell : isSpell,
				isMeleeWeapon : isMeleeWeapon,
				isRangedWeapon : isRangedWeapon,
				isNaturalWeapon : isNaturalWeapon,
				theWea : theWea,
				WeaponName : WeaponName,
				baseWeaponName : theWea.baseWeapon ? theWea.baseWeapon : WeaponName,
				thisWeapon : thisWeapon,
				isOffHand : isOffHand
			}

			var evalsToDo = [[], [], []]; // [0] magic items, [1] feats, [2] others
			for (var anEval in CurrentEvals.atkCalc) {
				evalsToDo[anEval.indexOf("(magic item)") != -1 ? 0 : anEval.indexOf("(feat)") != -1 ? 1 : 2].push(anEval);
			}
			evalsToDo = evalsToDo[0].concat(evalsToDo[1]).concat(evalsToDo[2]);
			for (var i = 0; i < evalsToDo.length; i++) {
				var evalThing = CurrentEvals.atkCalc[evalsToDo[i]];
				try {
					if (typeof evalThing == 'string') {
						eval(evalThing);
					} else if (typeof evalThing == 'function') {
						evalThing(fields, gatherVars, output);
					}
				} catch (error) {
					var eText = "The custom CalcAttackDmgHit/atkCalc script '" + evalsToDo[i] + "' produced an error! It will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error + "\n ";
					for (var e in error) eText += e + ": " + error[e] + ";\n ";
					console.println(eText);
					console.show();
					delete CurrentEvals.atkCalc[evalsToDo[i]];
				}
			}
		};
		if (isSpell && CurrentEvals.spellCalc) {
			// get the variables we need to pass to the function
			var spType = isDC ? "dc" : "attack";
			var spCasters = spCaster ? spCaster : !thisWeapon[4].length ? [] : thisWeapon[4].map( function(sClass) {
				return CurrentSpells[sClass] && CurrentSpells[sClass].ability == abiScoreNo ? sClass : "";
			});

			var evalsToDo = [[], [], []]; // [0] magic items, [1] feats, [2] others
			for (var anEval in CurrentEvals.spellCalc) {
				evalsToDo[anEval.indexOf("(magic item)") != -1 ? 0 : anEval.indexOf("(feat)") != -1 ? 1 : 2].push(anEval);
			}
			evalsToDo = evalsToDo[0].concat(evalsToDo[1]).concat(evalsToDo[2]);
			for (var i = 0; i < evalsToDo.length; i++) {
				var evalThing = CurrentEvals.spellCalc[evalsToDo[i]];
				try {
					if (typeof evalThing == 'function') {
						var addSpellNo = evalThing(spType, spCasters, abiScoreNo);
						if (!isNaN(addSpellNo)) output.extraHit += Number(addSpellNo);
					}
				} catch (error) {
					var eText = "The custom spell attack/DC (spellCalc) script '" + evalsToDo[i] + "' produced an error! It will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error + "\n ";
					for (var e in error) eText += e + ": " + error[e] + ";\n ";
					console.println(eText);
					console.show();
					delete CurrentEvals.spellCalc[evalsToDo[i]];
				}
			}
		}
	};

	var dmgDie = "";
	var dmgNum = 0;
	var hitNum = 0;
	var addNum = function(inP, DmgHit) {
		inP = Number(inP);
		if (isNaN(inP)) inP = 0;
		if (!DmgHit || (/dmg/i).test(DmgHit)) dmgNum += inP;
		if (!DmgHit || (/hit/i).test(DmgHit)) hitNum += inP;
	};

	for (var out in output) {
		switch (out) {
		 case "modToDmg" :
			break;
		 case "prof" :
			addNum(output[out], "hit");
			break;
		 case "extraHit" :
			addNum(output[out], "hit");
			break;
		 case "extraDmg" :
			addNum(output[out], "dmg");
			break;
		 case "die" :
			dmgDie = EvalDmgDie(output[out], QI ? true : prefix);
			break;
		 case "mod" :
			if (output.modToDmg) addNum(output[out], "dmg");
			addNum(output[out], "hit");
			break;
		 case "bHit" :
			if (isDC) {
				addNum(8, "hit");
			};
		 case "bDmg" :
		 // if the blueText field is not a number, find the ability modifier
			addNum(EvalBonus(output[out], QI ? true : prefix), out);
			break;
		 default :
			addNum(output[out]);
			break;
		};
	};
	if (!isNaN(Number(dmgDie))) dmgDie = Number(dmgDie);
	if (dmgDie && isNaN(dmgDie) && Number(dmgNum) > 0) dmgNum = "+" + dmgNum;
	var dmgTot = dmgDie === "\u2015" || dmgDie === "-" ? dmgDie : dmgDie + (dmgNum === 0 ? "" : dmgNum);
	var hitTot = (isDC ? "DC " : (hitNum >= 0 ? "+" : "")) + hitNum;

	Value(fldBase + "Damage", dmgTot == 0 ? "" : dmgTot);
	if (event.target && event.target.name && (/.*Attack.*To Hit/).test(event.target.name)) {
		event.value = fields.Range === "With melee wea" ? "" : hitTot;
	} else {
		Value(fldBase + "To Hit", fields.Range === "With melee wea" ? "" : hitTot);
	};
};

//see if the bonus action for Off-hand attack is needed or not
function SetOffHandAction() {
	var areOffHands = CurrentWeapons.offHands.some( function(n) { return n});
	tDoc[(areOffHands ? "Add" : "Remove") + "Action"]("bonus action", "Off-hand Attack");
};

//a way to show a very long piece of text without the dialogue overflowing the screen
function ShowDialog(hdr, strng) {
	if (strng === "sources") { // ShowDialog("List of Sources, sorted by abbreviation", "sources");
		strng = "";
		var srcRef = {};
		var srcArr = {};
		var srcGroups = [];
		for (var src in SourceList) {
			var tSrc = SourceList[src];
			srcRef[tSrc.abbreviation] = src;
			var tGroup = !tSrc.group || tSrc.group === "default" ? "\u200B\u200Bother" : tSrc.group === "Primary Sources" ? tSrc.group : "\u200B" + tSrc.group;
			if (!srcArr[tGroup]) srcArr[tGroup] = [];
			srcArr[tGroup].push(tSrc.abbreviation);
			if (srcGroups.indexOf(tGroup) === -1) srcGroups.push(tGroup);
		};
		srcGroups.sort();
		for (var group in srcArr) srcArr[group].sort();
		for (var i = 0; i < srcGroups.length; i++) {
			strng += "\n\n" + srcGroups[i].replace(/\u200B/g, "") + ":";
			var tArr = srcArr[srcGroups[i]];
			for (var j = 0; j < tArr.length; j++) {
				var theSrc = srcRef[tArr[j]];
				strng += "\n\u2022 " + (SourceList[theSrc].abbreviation + "            ").substr(0,12) + "\t" + SourceList[theSrc].name;
			};
		};
	}
	var ShowString_dialog = {
		initialize : function(dialog) {
			dialog.load({
				"Eval" : strng.replace(/^(\r|\n)*/, "")
			});
		},
		description : {
			name : hdr,
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "view",
					elements : [{
						type : "static_text",
						item_id : "head",
						alignment : "align_fill",
						font : "heading",
						bold : true,
						wrap_name : true,
						width : 550,
						name : hdr
					}, {
						type : "view",
						align_children : "align_row",
						elements : [{
							type : "static_text",
							item_id : "txt0",
							alignment : "align_fill",
							font : "palette",
							wrap_name : true,
							height : 20,
							name : "[Can't see the 'OK' button at the bottom? Use ENTER to close this dialog]",
							width : 548
						}, {
							type : "edit_text",
							item_id : "ding",
							alignment : "align_fill",
							readonly : true,
							height : 1,
							width : 1
						}]
					}, {
						type : "edit_text",
						item_id : "Eval",
						alignment : "align_fill",
						readonly : true,
						multiline: true,
						height : 500,
						width : 550
					}, {
						type : "gap",
						height : 5
					}]
				}, {
					type : "ok"
				}]
			}]
		}
	};
	app.execDialog(ShowString_dialog);
};

//calculate the mod for the Dex field in the initiative section (field calculation)
function CalcInitDexMod() {
	var QI = getTemplPre(event.target.name, "AScomp");
	event.value = QI === true ? What(SkillsList.abilityScores[SkillsList.abbreviations.indexOf("Init")] + " Mod") : What(QI + "Comp.Use.Ability.Dex.Mod");
};

function FunctionIsNotAvailable() {
	app.alert({
		nIcon : 0,
		cTitle : "Please update your Adobe Acrobat",
		cMsg : "This feature doesn't work (correctly) with the version of Adobe Acrobat you are using. This version of Adobe Acrobat is not supported for use with MPMB's D&D 5e Character Tools. Please update to Adobe Acrobat DC.\n\nYou can get Adobe Acrobat Reader DC for free at https://get.adobe.com/reader/"
	});
};

// a way to eval the content of a modifier field; notComp if it is the character (true) or if it is for a companion page (the prefix of the companion page); if isSpecial === "test" it will output undefined if an error occurs; if isSpecial is a number it will look for that entry on the Wild Shape page with the corresponding notComp variable as a prefix;
function EvalBonus(input, notComp, isSpecial) {
	if (!input) {
		return 0;
	} else if (!isNaN(input)) {
		return Number(input);
	};
	var modStr = notComp === true ? ["", " Mod"] : !isSpecial || isSpecial === "test" ? [notComp + "Comp.Use.Ability.", ".Mod"] : [notComp + "Wildshape." + isSpecial + ".Ability.", ".Mod"];
	var ProfB = notComp === true ? Number(How("Proficiency Bonus")) : !isSpecial || isSpecial === "test" ? What(notComp + "Comp.Use.Proficiency Bonus") : What(notComp + "Wildshape." + isSpecial + ".Proficiency Bonus");
	var abbrRegex = /(o?(Str|Dex|Con|Int|Wis|Cha|HoS|Prof))(o?(Str|Dex|Con|Int|Wis|Cha|HoS|Prof))/ig;
	// remove 'dc' and convert commas to dots for decimal handling
	input = input.replace(/,/g, ".").replace(/dc/ig, "");
	// add a "+" between abbreviations that have no operator. Do this twice, so we also catch uneven groups
	input = input.replace(abbrRegex, "$1+$3");
	input = input.replace(abbrRegex, "$1+$3");
	// removing double or trailing operators and replace double minus with a plus
	input = input.replace(/[+\-/*]+([+/*])/g, "$1").replace(/--/g, "+").replace(/^[+/*]+|[+\-/*]+$/g, "");
	// change ability score abbreviations with their modifier
	["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"].forEach(function(AbiS) {
		input = input.replace(RegExp("o" + AbiS, "ig"), Number(What(AbiS + " Mod")));
		input = input.replace(RegExp(AbiS, "ig"), Number(What(modStr[0] + AbiS + modStr[1])));
	});
	// change Prof with the proficiency bonus
	input = input.replace(/oProf/ig, How("Proficiency Bonus"));
	input = input.replace(/Prof/ig, ProfB);
	// double negative to positive
	input = input.replace(/--/g, "+");
	try {
		output = eval(input);
		return !isNaN(output) ? Math.round(Number(output)) : 0;
	} catch (err) {
		return isSpecial === "test" ? undefined : 0;
	};
};

// a way to eval the content of a weapon damage die field; notComp if it is the character (true) or if it is for a companion page (the prefix of the companion page); if isSpecial === "test" it will output _ERROR_ for the part that produces an error;
function EvalDmgDie(input, notComp, isSpecial) {
	if (!input) {
		return 0;
	} else if (!isNaN(input)) {
		return Number(input);
	};
	// resolve the C and B for cantrip die, if present
	if ((/^(?=.*(B|C))(?=.*d\d).*$/).test(input)) { //if this involves a cantrip calculation
		var cLvl = Number(notComp === true ? What("Character Level") : What(notComp + "Comp.Use.HD.Level"));
		var cDie = cantripDie[Math.min(Math.max(cLvl, 1), cantripDie.length) - 1];
		input = input.replace(/cha/ig, "kha").replace(/con/ig, "kon");
		input = input.replace(/C/g, cDie).replace(/B/g, cDie - 1).replace(/0.?d\d+/g, 0);
		input = input.replace(/kha/g, "Cha").replace(/kon/g, "Con");
	};
	if (input[0] == "=") { // only if a string staring with "=" does it mean that it wants to be calculate to values
		input = input.substr(1).split("_").map(function(u) {
			return u.split("d").map(function(v) {
				try {
					var theEval = EvalBonus(v, notComp, isSpecial);
					return theEval === undefined ? "_ERROR_" : theEval;
				} catch (errV) {
					return v;
				};
			}).join("d");
		}).join("+");
	};
	return input;
};

// add a way to set the value of a field
function SetThisFldVal() {
	var len = typePF ? 4 : 3;
	if (event.target.submitName || event.target.value.length > len || event.modifier || event.shift) {
		var QI = getTemplPre(event.target.name, "AScomp");
		var dmgDie = event.target.name.indexOf("Damage Die") !== -1;
		var theName = event.target.userName;
		if (theName && (/\n/).test(theName)) {
			theName = theName.match(/.*\n/)[0].replace(/\n/, "");
		};
		var theVal = event.target.value;
		if (!isNaN(theVal)) theVal = theVal.toString();
		var theExpl = event.target.submitName.replace(/^\n*/, "");
		var theDialTxt = (dmgDie ? "If you want the Damage Die to be a calculated value, and not just a string, make sure the first character is a '='.\nRegardless of the first character, a 'C' will be replaced with the Cantrip die, and a 'B' with the Cantrip die minus 1.\n\nIf a calculated value (=), you can use underscores to keep the strings separate. For the calculated parts, y" : "Y") + "ou can use numbers, logical operators (+, -, /, *), ability score abbreviations (Str, Dex, Con, Int, Wis, Cha" + (QI === true ? ", HoS" : "") + "), and 'Prof'." + (QI === true ? "" : "\nIn addition, you can use the values from the character (the 1st page) by adding the letter 'o' before the variable (oStr, oDex, oCon, oInt, oWis, oCha, oHoS, oProf).");
		var theDialog = {
			notComp : QI,
			isDmgDie : dmgDie,
			theExp : theExpl,
			theTXT : theVal,
			initialize : function (dialog) {
				var toLoad = { "user" : this.theTXT };
				if (this.theTXT) {
					var calcVal = this.isDmgDie ? EvalDmgDie(this.theTXT, this.notComp, "test") : EvalBonus(this.theTXT, this.notComp, "test");
					toLoad["rslt"] = calcVal === undefined ? "ERROR" : calcVal.toString();
				};
				if (this.theExp) {
					toLoad["expl"] = this.theExp;
				};
				dialog.load(toLoad);
			},
			commit : function (dialog) {
				var oResult = dialog.store();
				this.theTXT = oResult["user"];
			},
			calc : function (dialog) {
				var oResult = dialog.store()["user"];
				var calcVal = this.isDmgDie ? EvalDmgDie(oResult, this.notComp, "test") : EvalBonus(oResult, this.notComp, "test");
				dialog.load({
					"rslt" : calcVal === undefined ? "ERROR" : calcVal.toString()
				});
			},
			description : {
				name : "Set the field's value",
				elements : [{
					type : "view",
					align_children : "align_left",
					elements : [{
						type : "static_text",
						item_id : "head",
						alignment : "align_fill",
						font : "heading",
						bold : true,
						wrap_name : true,
						char_width : 35,
						name : theName ? theName : "Set the field's value"
					}, {
						type : "cluster",
						alignment : "align_fill",
						item_id : "txt0",
						name : "Fill out the value you want to set",
						font : "dialog",
						bold : true,
						elements : [{
							type : "static_text",
							alignment : "align_left",
							item_id : "txt3",
							name : theDialTxt,
							char_width : 35,
							wrap_name : true
						}, {
							type : "edit_text",
							alignment : "align_center",
							item_id : "user",
							char_width : 35,
							height : 20
						}, {
							type : "view",
							align_children : "align_distribute",
							char_width : 35,
							elements : [{
								type : "static_text",
								alignment : "align_left",
								item_id : "txt2",
								name : "This calculates to:",
								char_width : 1,
								height : 25
							}, {
								type : "static_text",
								alignment : "align_left",
								item_id : "rslt",
								font : "dialog",
								bold : true,
								name : "0",
								char_width : 8,
								height : 25
							}, {
								type : "button",
								alignment : "align_left",
								item_id : "calc",
								name : "<< Re-Calculate This"
							}]
						}]
					}, {
						type : "static_text",
						alignment : "align_fill",
						item_id : "txt1",
						wrap_name : true,
						name : "If the above calculates to 'ERROR', the field will not be changed.\nNote that the field won't appear to change until you click/tab out of it.",
						char_width : 35
					}].concat(theExpl ? [{
						type : "cluster",
						alignment : "align_fill",
						name : "Modifiers set by class features, race, feats, or magic items",
						font : "dialog",
						bold : true,
						elements : [{
							type : "edit_text",
							item_id : "expl",
							alignment : "align_fill",
							readonly : true,
							multiline: true,
							char_width : 35,
							height : 200
						}]
					}] : []).concat([{
						type : "ok_cancel"
					}])
				}]
			}
		};
		if (app.execDialog(theDialog) === "ok") {
			event.target.value = theDialog.theTXT;
		};
	};
};

// add a modifier to a modifier field so that the formula stays intact; Remove is boolean
function AddToModFld(Fld, Mod, Remove, NameEntity, Explanation) {
	if (!tDoc.getField(Fld)) return;
	var aFld = What(Fld);
	var setFld = "";
	if (!isNaN(Mod)) {
		Mod = Remove ? -1 * Mod : Number(Mod);
		var noRegEx = /((^|\+|[^*/]-)\d+)(?:($|\+|-))/;
		if (!isNaN(aFld)) {
			setFld = Number(aFld) + Mod;
		} else if ((noRegEx).test(aFld)) {
			var FldNum = Number(aFld.match(noRegEx)[1]);
			var FldNumNew = FldNum + Mod;
			setFld = aFld.replace(noRegEx, (FldNumNew < 0 ? "" : "+") + FldNumNew + "$3");
		} else {
			setFld = aFld + (Mod < 0 ? "" : "+") + Mod;
		};
	} else if (Remove) { // remove string
		setFld = aFld.replace(RegExp("\\+?" + Mod, "i"), "");
	} else { // add string
		setFld = (aFld ? aFld : "") + (Mod.substr(0, 1) === "-" ? "" : "+") + Mod
	};
	// remove zeroes
	setFld = setFld.replace(/[\+-/*]0([\+-/*]|$)/g, "$1");
	// remove useless leading things
	while (isNaN(setFld) && (/[+*/0]/).test(setFld[0])) {
		setFld = setFld.substr(1);
	}
	if (setFld == 0) setFld = "";
	var theSubmit = How(Fld);
	if (NameEntity && Explanation) {
		var theAdd = "\n\n" + toUni(NameEntity) + "\n" + Explanation;
		if (Remove) {
			theSubmit = theSubmit.replace(theAdd, "");
			// in case unicode use has changed between adding and removing
			theSubmit = theSubmit.replace("\n\n" + NameEntity + "\n" + Explanation, "");
		} else {
			theSubmit += theAdd;
		};
	};
	Value(Fld, setFld, undefined, theSubmit);
};

// add a modifier to a skill
// addMod : {type : "save", field : "all", mod : "Cha", text : "While I'm conscious I can add my Charisma modifier (min 1) to all my saving throws."} // this can be an array of objects, all of which will be processed
function processMods(AddRemove, NameEntity, items) {
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var alphaB = Who("Text.SkillsNames") === "alphabeta";
	if (!isArray(items)) items = [items];
	for (var i = 0; i < items.length; i++) {
		var type = items[i].type.toLowerCase();
		var Fld = items[i].field;
		var Mod = items[i].mod;
		var Explanation = items[i].text;
		switch (type) {
			case "initiative" :
				Fld = QI ? "Init Bonus" : prefix + "Comp.Use.Combat.Init.Bonus";
			case "skill" :
				if ((/^all/i).test(Fld)) {
					Fld = QI ? "All Skills Bonus" : prefix + "BlueText.Comp.Use.Skills.All.Bonus";
				} else if ((/^pass/i).test(Fld)) {
					Fld = QI ? "Passive Perception Bonus" : prefix + "BlueText.Comp.Use.Skills.Perc.Pass.Bonus";
				} else {
					var skill = Fld.substr(0,4).capitalize();
					if (SkillsList.abbreviations.indexOf(skill) === -1) {
						skill = skill.substr(0,3);
						if (SkillsList.abbreviations.indexOf(skill) === -1) continue;
					};
					var skillOrder = alphaB || (!QI && !typePF) ? "abbreviations" : "abbreviationsByAS";
					var skillAbbr = SkillsList.abbreviations[SkillsList[skillOrder].indexOf(skill)];
					Fld = QI ? skillAbbr + " Bonus" : skillAbbr == "Init" ? prefix + "Comp.Use.Combat.Init.Bonus" : prefix + "BlueText.Comp.Use.Skills." + skillAbbr + ".Bonus";
				};
				break;
			case "save" :
				var matchSv = QI ? /.*(Str|Dex|Con|Int|Wis|Cha|HoS|All).*/i : /.*(Str|Dex|Con|Int|Wis|Cha|All).*/i;
				if (!(matchSv).test(Fld)) continue;
				var save = Fld.replace(matchSv, "$1").capitalize();
				if (save === "Hos") save = "HoS";
				Fld = QI ? save + " ST Bonus" : prefix + "BlueText.Comp.Use.Ability." + save + ".ST.Bonus";
				break;
			default :
				if (!tDoc.getField(Fld)) continue;
		};
		AddToModFld(Fld, Mod, !AddRemove, NameEntity, Explanation);
	};
};

// a way to pass an array of action strings or arrays to be processed by the Add/RemoveAction functions
// ["action", " (with Attac)"] or [["action", " (start)"], ["bonus action", " (end)"]]
function processActions(AddRemove, srcNm, itemArr, itemNm) {
	if (!itemArr) return;
	if (!isArray(itemArr) || (itemArr.length === 2 && !isArray(itemArr[0]) && !isArray(itemArr[1]) && (/^(?!.*action).*$|\(.*\)|\[.*\]/i).test(itemArr[1]))) {
		itemArr = [itemArr];
	};
	for (var i = 0; i < itemArr.length; i++) {
		var theAct = isArray(itemArr[i]) ? itemArr[i] : [itemArr[i], ""];
		var actNm = theAct[1] && !(/^( |-|,|\(|\[|\{|'|"|\/)/).test(theAct[1]) ? theAct[1] : itemNm + theAct[1];
		if (AddRemove) {
			AddAction(theAct[0], actNm, srcNm, theAct[2] ? theAct[2] : false);
		} else if (theAct[2]) {
			AddAction(theAct[0], theAct[2], srcNm, actNm);
		} else {
			RemoveAction(theAct[0], actNm, srcNm);
		}
	};
};

// a way to pass an array of tools to be processed by the SetProf function
// [["Musical instrument", 3], ["Thieves' tools", "Dex"]]
// "Land vehicles"
function processTools(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	if (!isArray(itemArr) || (itemArr.length === 2 && !isArray(itemArr[0]) && !isArray(itemArr[1]) && (!isNaN(itemArr[1]) || AbilityScores.fields[itemArr[1].substr(0,3).toLowerCase()]))) {
		itemArr = [itemArr];
	};
	for (var i = 0; i < itemArr.length; i++) {
		var subj = itemArr[i];
		if (isArray(subj)) {
			var prof = subj[0];
			var extra = subj[1];
		} else {
			var prof = subj;
			var extra = false;
		};
		SetProf("tool", AddRemove, prof, srcNm, extra);
	};
};

// a way to pass an array of languages to be processed by the SetProf function
// ["Elvish", 3] >> elvish and three other languages
function processLanguages(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	itemArr = isArray(itemArr) ? itemArr : [itemArr];
	for (var i = 0; i < itemArr.length; i++) {
		var subj = itemArr[i];
		if (isArray(subj)) {
			var prof = subj[0];
			var extra = subj[1];
		} else if (isNaN(subj)) {
			var prof = subj;
			var extra = false;
		} else {
			var prof = "from " + srcNm;
			var extra = subj;
		};
		SetProf("language", AddRemove, prof, srcNm, extra);
	};
};

// a way to pass an array of vision string to be processed by the SetProf function
// ["Darkvision", 60] >> Darkvision 60 ft
function processVision(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	if (!isArray(itemArr) || (itemArr.length === 2 && !isArray(itemArr[0]) && !isArray(itemArr[1]) && (!isNaN(itemArr[1]) || !isNaN(itemArr[1].substr(1))))) {
		itemArr = [itemArr];
	};
	var profsdone = {};
	for (var i = 0; i < itemArr.length; i++) {
		var subj = itemArr[i];
		if (isArray(subj)) {
			var prof = subj[0];
			var extra = subj[1];
		} else {
			var prof = subj;
			var extra = 0;
		};
		if (!profsdone[prof]) { profsdone[prof] = 1; } else { profsdone[prof] += 1; };
		var useScrNm = srcNm + (profsdone[prof] < 2 ? "" : " (" + profsdone[prof] + ")");
		SetProf("vision", AddRemove, prof, useScrNm, extra);
	};
};

// a way to pass an array of damage resistance strings or arrays to be processed by the SetProf function
// ["Slashing", "Slash. (nonmagical)"] >> Slash. (nonmagical) or Slashing if another doesn't have the nonmagical clause
function processResistance(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	if (!isArray(itemArr) || (itemArr.length === 2 && !isArray(itemArr[0]) && !isArray(itemArr[1]) && (/\(.*\)|\[.*\]/).test(itemArr[1]))) {
		itemArr = [itemArr];
	};
	for (var i = 0; i < itemArr.length; i++) {
		var theDmgres = isArray(itemArr[i]) ? itemArr[i] : [itemArr[i], false];
		SetProf("resistance", AddRemove, theDmgres[0], srcNm, theDmgres[1]);
	}
};

// a way to pass an array of save proficiency strings to be processed by the SetProf function
// ["Str", "Dex"]
function processSaves(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];
	for (var i = 0; i < itemArr.length; i++) {
		SetProf("save", AddRemove, itemArr[i], srcNm);
	}
};
// a way to pass an array of advantage/disadvantage giving arrays strings to be processed by the SetProf function
// ["Str", true] to give advantage on Strenght saves
// ["Init", false]  to give disadvantage on Initiative checks
function processAdvantages(AddRemove, srcNm, itemArr) {
	if (!itemArr || !isArray(itemArr)) return;
	if (itemArr.length == 2 && !isArray(itemArr[0])) itemArr = [itemArr];
	for (var i = 0; i < itemArr.length; i++) {
		SetProf("advantage", AddRemove, itemArr[i], srcNm);
	}
};

// a way to pass an array of skill proficiency strings to be processed by the SetProf function
// ["Persuasion", "full"]
function processSkills(AddRemove, srcNm, itemArr, descrTxt) {
	// add or remove the descrTxt
	var setDescr = false;
	if (!AddRemove) {
		if (CurrentProfs.skill.descrTxt && CurrentProfs.skill.descrTxt[srcNm]) {
			delete CurrentProfs.skill.descrTxt[srcNm];
		}
	} else {
		if (!CurrentProfs.skill.descrTxt) CurrentProfs.skill.descrTxt = {};
		if (descrTxt) {
			CurrentProfs.skill.descrTxt[srcNm] = descrTxt;
		} else {
			setDescr = true;
			descrTxt = [];
		}
	}
	if (!itemArr) {
		if (descrTxt) setSkillTooltips();
		return; // no items to process, so stop now
	}
	var getSkillAbbr = function(inSkill) {
		return SkillsList.abbreviations.indexOf(inSkill) !== -1 ? inSkill : false;
	}
	if (!isArray(itemArr) || (itemArr.length === 2 && !isArray(itemArr[0]) && !isArray(itemArr[1]) && (/full|increment|only/i).test(itemArr[1]))) itemArr = [itemArr];
	for (var i = 0; i < itemArr.length; i++) {
		var isArr = isArray(itemArr[i]);
		var aSkill = isArr ? itemArr[i][0] : itemArr[i];
		var sExp = isArr ? itemArr[i][1] : false;
		aSkill = aSkill[0].toUpperCase() + aSkill.substring(1, 4).toLowerCase();
		if (!getSkillAbbr(aSkill)) {
			aSkill = getSkillAbbr(aSkill.substring(0, 3));
			if (!aSkill) continue; // skill not found, so do the next one
		}
		SetProf("skill", AddRemove, aSkill, srcNm, sExp);
		if (setDescr) {
			var tSkill = SkillsList.names[SkillsList.abbreviations.indexOf(aSkill)];
			var eSkill = !sExp && !(/full|increment|only/i).test(sExp) ? "" : (/full/i).test(sExp) ? " expertise" : (/increment/i).test(sExp) ? " (expertise if already proficient)" : " expertise (only if already proficient)";
			descrTxt.push(tSkill + eSkill);
		}
	}
	// if we generated a new descriptive text and none was provided, add it now
	if (setDescr && descrTxt.length) CurrentProfs.skill.descrTxt[srcNm] = formatLineList(false, descrTxt);
	// then update the skill tooltips
	setSkillTooltips();
};
// Update the skill tooltips
function setSkillTooltips(noPopUp) {
	var oldTooltipTxt = Who("Acr Prof");
	if (!CurrentProfs.skill.descrTxt) CurrentProfs.skill.descrTxt = {};
	var iSet = CurrentProfs.skill.descrTxt;
	var tooltipTxt = "";
	var tooltipArr = [];
	for (var aSrc in iSet) tooltipArr.push(toUni(aSrc) + ": " + iSet[aSrc]);
	if (tooltipArr.length) {
		tooltipArr.sort();
		tooltipTxt = formatMultiList("Skill proficiencies gained from:", tooltipArr);
	}

	if (tooltipTxt == oldTooltipTxt) return; // nothing changed, so stop here

	for (i = 0; i < SkillsList.abbreviations.length; i++) {
		var theSkill = SkillsList.abbreviations[i];
		if (theSkill == "Init") continue;
		AddTooltip(theSkill + " Prof", tooltipTxt);
		AddTooltip(theSkill + " Exp", tooltipTxt);
	}
	if (!noPopUp && CurrentUpdates.types.indexOf("skills") === -1) {
		CurrentUpdates.types.push("skills");
		CurrentUpdates.skillStrOld = oldTooltipTxt.replace(/.+(\r|\n)*/, '');
	}
	AddTooltip("SkillsClick", "Click here to change the order of the skills. You can select either alphabetic order or ordered by ability score." + (tooltipTxt ? "\n\n" + tooltipTxt : ""));
}
// manual trigger for clicking the skill proficiency/expertise (MouseUp) on the 1st page
function applySkillClick(theSkill, isExp) {
	if (SkillsList.abbreviations.indexOf(theSkill) == -1) return;
	var isCheck = event.target.isBoxChecked(0) ? true : false;
	if (Who('Text.SkillsNames') !== 'alphabeta') {
		theSkill = SkillsList.abbreviationsByAS[SkillsList.abbreviations.indexOf(theSkill)];
	}
	var setExp = !isExp ? false : isCheck || (!isCheck && CurrentProfs.skill[theSkill]  && CurrentProfs.skill[theSkill].length > 1) ? "full" : "only";
	// if the proficiency is checked, but it already exists from another source, stop now
	// if the expertise is checked but it is already proficient and expertise already exists, stop now
	var alreadyProf = isCheck && CurrentProfs.skill[theSkill];
	if ((!isExp && alreadyProf) || (isExp && alreadyProf && CurrentProfs.skill[theSkill + " Prof"])) return;
	// apply the manual skill proficiency changes
	SetProf("skill", isCheck, theSkill, "manualClick", setExp);
	// if disabling manually, but set to enabled by the CurrentProfs variable, do an extra check to make sure it is manually disabled
	if (!isCheck && event.target.isBoxChecked(0)) {
		event.target.checkThisBox(0, false);
	}
}

// a way to pass an array of weapon proficiency booleans to be processed by the SetProf function
// [true, true, ["dagger", "sling"]] >> [simple, martial, [other array]]
function processWeaponProfs(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	var weaponTypes = ["simple", "martial", "other"]
	for (var i = 0; i < itemArr.length; i++) {
		if (itemArr[i] && weaponTypes[i]) {
			SetProf("weapon", AddRemove, weaponTypes[i], srcNm,
				i != 2 ? false : isArray(itemArr[i]) && itemArr[i].length ? itemArr[i] : itemArr[i] ? [itemArr[i]] : false
			);
		}
	}
};
// a way to pass an array of armour proficiency booleans to be processed by the SetProf function
// [true, true, false, false] >> [light, medium, heavy, shield]
function processArmourProfs(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	var armorTypes = ["light", "medium", "heavy", "shields"]
	for (var i = 0; i < itemArr.length; i++) {
		if (itemArr[i] && armorTypes[i]) SetProf("armour", AddRemove, armorTypes[i], srcNm);
	}
};
// set the armour/weapon proficiency manually (field action)
function setCheckboxProfsManual(theField) {
	calcStop();
	var fld = theField ? tDoc.getField(theField) : event.target;
	var isActive = fld.isBoxChecked(0) === 1;
	var sort = (/simple|martial/i).test(fld.name) ? "weapon" : "armour";
	var type = fld.name.replace(/proficiency |armor |weapon /ig, '').toLowerCase();
	var normalState = CurrentProfs[sort][type] ? true : false;
	delete CurrentProfs[sort][type+"_manualon"];
	delete CurrentProfs[sort][type+"_manualoff"];
	if (normalState != isActive) CurrentProfs[sort][type+"_manual" + (isActive ? "on" : "off")] = true;
	SetProf(sort, undefined, type, undefined, true);
}
// do something with the manually entered 'other' weapon proficiencies (field action)
function setOtherWeaponProfsManual() {
	calcStop();
	var set = CurrentProfs.weapon;
	if (!set.otherWea) set.otherWea = { finalProfs : [], finalString : "", finalNamesNotManual : [], finalProfsNotManual : [] };
	var iSet = set.otherWea;
	var remString = iSet.finalString;
	var othWea = What("Proficiency Weapon Other Description");
	if (remString == othWea) return; // nothing changed

	var othWeaArr = othWea.split(/[/,\\\;\~\|]+ ?/); //split the current list with some commonly used separators
	var newWea = [];
	for (var i = 0; i < othWeaArr.length; i++) {
		var aWea = othWeaArr[i];
		if (!aWea) continue;
		// first test if this same name doesn't already exist by the regularly added stuff
		var testRegExp = RegExp("\\b"+aWea+"\\b", "i");
		var isKnownProf = iSet.finalNamesNotManual.some(function (wea) { return testRegExp.test(wea) });
		if (isKnownProf) continue;
		// then test if the weapon key is not already known
		var parsedWea = ParseWeapon(aWea);
		if (parsedWea && iSet.finalProfsNotManual.indexOf(parsedWea) !== -1) continue;
		// guess it isn't known, so add it
		var doWea = parsedWea ? parsedWea : aWea;
		if (newWea.indexOf(doWea) == -1) newWea.push(doWea);
	}

	var didChange = false;
	var manualWea = iSet["Manually added"] ? iSet["Manually added"].toString() : "";
	if (newWea.length) {
		// we found some manually added things, so add them
		newWea.sort();
		if (newWea.toString() != manualWea) {
			iSet["Manually added"] = newWea;
			didChange = true;
		}
	} else if (iSet["Manually added"]) {
		// nothing manually added, so remove that entry
		delete iSet["Manually added"];
		didChange = true;
	}
	if (didChange) SetProf("weapon", undefined, "other");
}

// A way to set the extra AC lines for magic / miscellaneous
function processExtraAC(AddRemove, srcNm, itemArr, parentName) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];
	for (var i = 0; i < itemArr.length; i++) {
		if (!itemArr[i].name) itemArr[i].name = parentName ? parentName : "Undefined";
		SetProf("specialarmour", AddRemove, itemArr[i], srcNm, i.toString());
	}
}
// Function is still present for backwards-compatibility. If 'useMod' == 0, remove
function AddACMisc(useMod, useName, useText, useStopeval) {
	var makeObject = {
		name : useName,
		mod : useMod,
		text : useText,
		stopeval : useStopeval
	};
	var extra = "-addacmisc";
	// if we are removing something, we first have to fint the mod that was previously used
	if (!useMod && CurrentProfs.specialarmour[useName + extra]) {
		makeObject.mod = CurrentProfs.specialarmour[useName + extra].mod;
	}
	SetProf("specialarmour", !!useMod, makeObject, useName, extra);
}

// ProfType can be: "armour", "weapon", "save", "savetxt", "resistance", "vision", "speed", "language", or "tool"
// Add: AddRemove = true; Remove: AddRemove = false
// ProfObj is the proficiency that is gained/removed
// ProfSrce is the name of the thing granting the proficiency
// What "Extra" is, depends on ProfType
function SetProf(ProfType, AddRemove, ProfObj, ProfSrc, Extra) {
	ProfType = ProfType.toLowerCase();
	var set = CurrentProfs[ProfType];
	var ProfObjLC = typeof ProfObj == "string" ? clean(ProfObj, false, true).toLowerCase() : false;
	var metric = What("Unit System") !== "imperial";
	if (!set) return;
	if (!Extra) Extra = false;

	// function for adding all resistances of a single entry
	var DoResistance = function(keyName, skipA) {
		var aSet = CurrentProfs.resistance[keyName];
		if (!aSet || (CurrentProfs.savetxt.immune && CurrentProfs.savetxt.immune[keyName])) return;
		if (!skipA) skipA = [];
		if (aSet.merge) {
			if (skipA.indexOf(aSet.name) === -1) AddResistance(aSet.name, aSet.src);
		} else {
			for (var i = 0; i < aSet.cond.length; i++) {
				if (aSet.cond.indexOf(aSet.cond[i]) !== i) continue;
				if (skipA.indexOf(aSet.cond[i]) === -1) AddResistance(aSet.cond[i], aSet.lookup[aSet.cond[i]]);
			};
		};
	};

 switch (ProfType) {
	case "skill" : { // Extra is if the skill should also have expertise ('full'), or only expertise if already proficient from another source, else just proficient ('increment'), or only expertise if already proficient from another source ('only'), else nothing
		if (AddRemove) { // add
			// set the proficiency, but not if only adding expertise
			if (!Extra || !(/only/i).test(Extra)) {
				if (!set[ProfObj]) set[ProfObj] = [];
				if (set[ProfObj].indexOf(ProfSrc) == -1) set[ProfObj].push(ProfSrc);
			}
			// add the expertise, if any
			if (Extra) {
				if (!set[ProfObj+"_Exp"]) set[ProfObj+"_Exp"] = {};
				set[ProfObj+"_Exp"][ProfSrc] = Extra;
			}
		} else { // remove
			// delete the proficiency entry
			if ((!Extra || !(/only/i).test(Extra)) && set[ProfObj] && set[ProfObj].indexOf(ProfSrc) !== -1) {
				set[ProfObj].splice(set[ProfObj].indexOf(ProfSrc), 1);
				if (set[ProfObj].length == 0) delete set[ProfObj];
			}
			// delete the expertise entry
			if (set[ProfObj+"_Exp"] && set[ProfObj+"_Exp"][ProfSrc]) {
				delete set[ProfObj+"_Exp"][ProfSrc];
				if (ObjLength(set[ProfObj+"_Exp"]) === 0) delete set[ProfObj+"_Exp"];
			}
			// also remove the descriptive text if it is still there
			if (set.descrTxt && set.descrTxt[ProfSrc]) delete set.descrTxt[ProfSrc];
		}
		// now determine the new state of the skill
		var isProf = set[ProfObj] ? true : false;
		// then see if we need to add exp
		if (set[ProfObj+"_Exp"]) {
			for (var expSrc in set[ProfObj+"_Exp"]) {
				var aExp = set[ProfObj+"_Exp"][expSrc];
				var isExp = (/full/i).test(aExp) ? true : isProf && (/only/i).test(aExp) ? true : isProf && (/increment/i).test(aExp) && (set[ProfObj].length > 1 || set[ProfObj][0] !== expSrc);
				if (isExp) break;
			}
		} else {
			var isExp = false;
		}
		// get the name of the skill field
		var skillFld = Who('Text.SkillsNames') === 'alphabeta' ? ProfObj : SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(ProfObj)];
		// now update the fields
		Checkbox(skillFld + " Prof", isProf);
		Checkbox(skillFld + " Exp", isExp);
	}; break;
	case "weapon" : // if this is the 'other' weapons do something special. If not, it is Simple/Martial weapons and they can be treated just like armour
		if (ProfObj == "other") {
			if (!set.otherWea) set.otherWea = { finalProfs : [], finalString : "", finalNamesNotManual : [], finalProfsNotManual : [] };
			var iSet = set.otherWea;
			// Add or remove the new weapons from the objects
			var toDo = Extra && isArray(Extra) ? Extra : false;
			if (toDo) {
				if (AddRemove) { // Add
					iSet[ProfSrc] = toDo;
					iSet[ProfSrc].sort();
				} else { // Remove
					if (iSet[ProfSrc]) delete iSet[ProfSrc];
				}
			}
			// Make an array of all the weapons that are not covered by another proficiency
			iSet.finalProfs = [];
			iSet.finalNamesNotManual = [];
			iSet.finalProfsNotManual = [];
			var finalNames = [];
			var tooltipArr = [];
			var simpleProf = tDoc.getField("Proficiency Weapon Simple").isBoxChecked(0) === 1;
			var martialProf = tDoc.getField("Proficiency Weapon Martial").isBoxChecked(0) === 1;
			for (var key in iSet) {
				if ((/^final(Names|Profs|String)/).test(key)) continue;
				var aWea = iSet[key];
				// create the tooltip
				var lineTooltip = [];
				for (var i = 0; i < aWea.length; i++) {
					if (!aWea[i]) continue;
					// lookup to see if the weapon is a known key
					var aWeaI = aWea[i].toLowerCase();
					var theW = WeaponsList[aWeaI];
					var theWeaKey = theW ? aWeaI : aWea[i];
					var theName = theW ? theW.name : theWeaKey[0].toUpperCase() + theWeaKey.substr(1);
					// add the weapon to the tooltip
					lineTooltip.push(theName);
					if (theW && theW.type && ((/natural|spell|cantrip/i).test(theW.type) || ((/^simple$/i).test(theW.type) && simpleProf) || ((/^martial$/i).test(theW.type) && martialProf))) continue; // already proficient
					if (iSet.finalProfs.indexOf(theWeaKey) === -1) {
						// not yet proficient, so add the weapon to the final arrays
						iSet.finalProfs.push(theWeaKey);
						finalNames.push(theName[0].toUpperCase() + theName.substr(1));
						if (key != "Manually added") {
							iSet.finalProfsNotManual.push(theWeaKey);
							iSet.finalNamesNotManual.push(theName);
						}
					}
				}
				lineTooltip.sort();
				tooltipArr.push(formatLineList(key + " - ", lineTooltip));
			}
			// create the new field text
			finalNames.sort();
			iSet.finalString = finalNames.join(", ");
			// create the new field tooltip
			var weaProfs = [].concat(simpleProf ? ["simple"] : []).concat(martialProf ? ["martial"] : []).join(" and ");
			var extraTooltip = !weaProfs ? "" : "\n\nBecause you also have proficiency with " + weaProfs + " weapons, any falling into those categories are not displayed in the field."
			var otherWeaTooltip = tooltipArr.length == 0 ? "" : formatMultiList("Other weapon proficiencies gained from:", tooltipArr) + extraTooltip;
			// set the fields
			Checkbox("Proficiency Weapon Other", iSet.finalString != "");
			Value("Proficiency Weapon Other Description", iSet.finalString, otherWeaTooltip);
			// recalculate the attacks with the proficiency changes
			CurrentUpdates.types.push("attacksprofs");
			break; // only stop if this concerning "other" weapon proficiencies
		}
		// if simple or martial proficiency, do the same as the armour proficiency below
	case "armour" : { // if (Extra == true) means to not change the field, only the tooltip
		var sort = ProfType.replace('ou', 'o');
		var fld = "Proficiency " + ((/shield/i).test(ProfObj) ? "Shields" : (sort + " " + ProfObj).capitalize());
		var fldState = tDoc.getField(fld).isBoxChecked(0) === 1;
		if (!tDoc.getField(fld)) return;
		// set the object
		if (!Extra && AddRemove) { // add
			if (!set[ProfObj]) {
				set[ProfObj] = [ProfSrc];
			} else if (set[ProfObj].indexOf(ProfSrc) === -1) {
				set[ProfObj].push(ProfSrc);
			}
			delete set[ProfObj+"_manualon"];
		} else if (!Extra && set[ProfObj] && set[ProfObj].indexOf(ProfSrc) !== -1) { // remove
			set[ProfObj].splice(set[ProfObj].indexOf(ProfSrc), 1);
			if (set[ProfObj].length === 0) {
				delete set[ProfObj];
				delete set[ProfObj+"_manualoff"];
			}
		};
		// set the field and tooltip
		var tooltipArr = [].concat(set[ProfObj] ? set[ProfObj] : []);
		if (set[ProfObj+"_manualoff"]) tooltipArr.push("[Manually disabled]");
		if (set[ProfObj+"_manualon"]) tooltipArr.push("[Manually enabled]");
		var TooltipTxt = tooltipArr.length ? formatMultiList(ProfObj.capitalize() + " " + sort + " proficiency gained from:", tooltipArr) : "";
		var isOn = set[ProfObj+"_manualon"] ? true : set[ProfObj+"_manualoff"] ? false : set[ProfObj] ? true : false;
		if (Extra || isOn == fldState) {
			AddTooltip(fld, TooltipTxt);
		} else {
			Checkbox(fld, isOn, TooltipTxt);
		}
		// if this was weapons, we need to do some more things
		if (ProfType == "weapon") {
			if ((Extra || isOn != fldState) && Who("Proficiency Weapon Other Description")) {
				// redo the other weapon proficiencies, as they might have changed now
				SetProf("weapon", undefined, "other");
				return;
			} else if (Extra || isOn != fldState) {
				// recalculate the attacks if the proficiency value changed
				CurrentUpdates.types.push("attacksprofs");
			}
		}
	}; break;
	case "save" : {
		var Abi = AbilityScores.fields[ProfObjLC.substr(0,3)];
		if (!Abi) return; // stop if the input can't be used
		var SvFld = Abi + " ST Prof";
		if (AddRemove) { // add
			if (!set[Abi]) {
				set[Abi] = [ProfSrc];
			} else if (set[Abi].indexOf(ProfSrc) === -1) {
				set[Abi].push(ProfSrc);
			}
		} else if (set[Abi] && set[Abi].indexOf(ProfSrc) !== -1) { // remove
			set[Abi].splice(set[Abi].indexOf(ProfSrc), 1);
			if (set[Abi].length === 0) delete set[Abi];
		};
		// now update the saving throw checkbox
		if (set[Abi]) {
			var AbiNm = AbilityScores.names[AbilityScores.abbreviations.indexOf(Abi)];
			var TooltipTxt = formatMultiList(AbiNm + " saving throws proficiency was gained from:", set[Abi]);
			Checkbox(SvFld, true, TooltipTxt);
		} else {
			Checkbox(SvFld, false, "");
		};
	}; break;
	case "resistance" : { // Extra is something to replace the actual text, if even one source has no condition for the resistance (e.g. not something like "Bludg. (in Rage)"), then there is no need to add multiple instances of essentially the same resistance
		var setRem = !set[ProfObjLC] ? undefined : set[ProfObjLC].merge;
		if (AddRemove) { // add
			if (!set[ProfObjLC]) set[ProfObjLC] = {name : ProfObj, src : [], cond : [], lookup : {}, merge : false};
			var theSet = set[ProfObjLC];
			if (theSet.src.indexOf(ProfSrc) !== -1) return; // the thing already exists so exit
			theSet.src.push(ProfSrc);
			if (Extra) {
				theSet.cond.push(Extra);
				if (theSet.lookup[Extra]) {
					theSet.lookup[Extra].push(ProfSrc);
				} else {
					theSet.lookup[Extra] = [ProfSrc];
				};
			};
			theSet.merge = theSet.src.length !== theSet.cond.length;
		} else if (set[ProfObjLC]) { // remove
			var theSet = set[ProfObjLC];
			if (theSet.src.indexOf(ProfSrc) !== -1) theSet.src.splice(theSet.src.indexOf(ProfSrc), 1);
			if (theSet.src.length == 0) {
				delete set[ProfObjLC];
			} else {
				if (Extra && theSet.cond.indexOf(Extra) !== -1) theSet.cond.splice(theSet.cond.indexOf(Extra), 1);
				if (Extra && theSet.lookup[Extra].indexOf(ProfSrc) !== -1) {
					theSet.lookup[Extra].splice(theSet.lookup[Extra].indexOf(ProfSrc), 1);
					if (theSet.lookup[Extra].length == 0) delete theSet.lookup[Extra];
				};
				theSet.merge = theSet.src.length !== theSet.cond.length;
			};
		};

		// now update the resistance fields
		var resRemoved = 0;
		if (set[ProfObjLC]) {
			if (setRem != undefined) { // the object existed before, so see if something changed
				if (setRem && !theSet.merge) { // if before it was merged, but now no longer (removed the option without condiion)
					RemoveResistance(ProfObj);
					resRemoved = 1;
				} else if (!setRem && theSet.merge) { // if before it was not merged, but now is (the new addition must be without condition)
					for (var i = 0; i < theSet.cond.length; i++) {
						RemoveResistance(theSet.cond[i]);
						resRemoved += 1;
					};
				}; // if the merge status didn't change, we don't have to do anything here
			};
			// now add the resistance
			DoResistance(ProfObjLC);
		} else { // guess the current item was the only thing to remove
			RemoveResistance(Extra ? Extra : ProfObj);
			resRemoved = 1;
		};
		// if a space opened up, maybe some other resistances can finally fit
		if (resRemoved) {
			// first make a list of all the items currently in the fields
			var curRes = [];
			for (var k = 1; k <= 6; k++) {
				var aDmgRes = What("Resistance Damage Type " + k);
				if (aDmgRes) curRes.push(aDmgRes);
			};
			if (curRes.length !== 6) {
				for (var resObj in set) {
					if (resObj !== ProfObjLC) DoResistance(resObj, curRes);
				};
			};
		};
	}; break;
	case "language" :
	case "tool" : { // Extra is a number if the entry is a choice to be made by the user duplicates should be ignored (e.g. 'musical instrument'); // Alternatively, for a tool the Extra can be the 3-letter abbreviation if the tool is also to be added in the Skill Proficiencies section with a calculated value;
		var optNmbr = Extra && !isNaN(Extra) ? Extra : false;
		if (optNmbr) {
			var uID = ProfSrc + "_#_" + ProfObj + "_#_" + optNmbr;
			if (AddRemove) { // add
				if (!set[uID]) set[uID] = {source : ProfSrc, entries : [], choices : []};
				// first ask the user to select choices
				var optType = ProfType.capitalize() + "s";
				var optSubj = [];
				for (var i = 1; i <= optNmbr; i++) {
					optSubj.push(ProfObj + (optNmbr > 1 ? " (" + i + "/" + optNmbr + ")" : ""));
					set[uID].entries.push(uID + "-" + i);
				};
				set[uID].choices = optSubj;
				if (IsNotImport) {
					var knownOpt = [];
					for (var i = 1; i <= FieldNumbers.langstools; i++) {
						var theI = What(ProfType.capitalize() + " " + i);
						if (theI) knownOpt.push(theI);
					};
					set[uID].choices = AskUserOptions(optType, ProfSrc, optSubj, knownOpt);
				} else if (global.docFrom && global.docFrom.CurrentProfs && global.docFrom.CurrentProfs[ProfType] && global.docFrom.CurrentProfs[ProfType][uID] && global.docFrom.CurrentProfs[ProfType][uID].choices) {
					if (global.docFrom.CurrentProfs[ProfType][uID].choices.length === optNmbr) set[uID].choices = global.docFrom.CurrentProfs[ProfType][uID].choices;
				};
				// now add these choices to the sheet
				for (var i = 0; i < optNmbr; i++) {
					AddLangTool(ProfType, set[uID].choices[i], ProfSrc, set[uID].entries[i]);
				};
			} else if (set[uID]) { // remove
				for (var i = 0; i < optNmbr; i++) {
					RemoveLangTool(ProfType, ProfObj, set[uID].entries[i], set[uID].choices[i]);
				};
				delete set[uID];
			};
		} else {
			if (AddRemove) { // add
				if (!set[ProfObjLC]) {
					set[ProfObjLC] = [ProfSrc];
				} else if (set[ProfObjLC].indexOf(ProfSrc) === -1) {
					set[ProfObjLC].push(ProfSrc);
				};
			} else if (set[ProfObjLC] && set[ProfObjLC].indexOf(ProfSrc) !== -1) { // remove
				set[ProfObjLC].splice(set[ProfObjLC].indexOf(ProfSrc), 1);
				if (set[ProfObjLC].length === 0) delete set[ProfObjLC];
			};
			// now update the proficiency
			if (set[ProfObjLC]) {
				AddLangTool(ProfType, ProfObj, set[ProfObjLC]);
			} else {
				RemoveLangTool(ProfType, ProfObj);
			};

			// if dealing with a tool, we might need to add it to the skill proficiencies section to get a calculated value
			var toolAbi = ProfType === "tool" && Extra && isNaN(Extra) ? AbilityScores.fields[Extra.substr(0,3).toLowerCase()] : false;
			if (toolAbi) {
				var theTooTxt = ProfObj + " (" + (typePF ? toolAbi : toolAbi.toUpperCase()) + ")";
				if (AddRemove) { // add
					if (!set.toolSkill) {
						set.toolSkill = [theTooTxt];
					} else if (set.toolSkill.indexOf(ProfSrc) === -1) {
						set.toolSkill.push(theTooTxt);
					};
				} else if (!set[ProfObjLC] && set.toolSkill && set.toolSkill.indexOf(theTooTxt) !== -1) { // remove
					set.toolSkill.splice(set.toolSkill.indexOf(theTooTxt), 1);
					if (set.toolSkill.length === 0) delete set.toolSkill;
				};
				// now update the skill proficiency entry
				var curToolTxt = What("Too Text");
				if (theTooTxt.toLowerCase().indexOf(curToolTxt.toLowerCase()) !== -1 && set.toolSkill && set.toolSkill.indexOf(curToolTxt) === -1) {
					Value("Too Text", set.toolSkill[0]);
					Checkbox("Too Prof", true);
					Checkbox("Too Exp", false);
				} else if (!set.toolSkill && theTooTxt.toLowerCase().indexOf(curToolTxt.toLowerCase()) !== -1) {
					tDoc.resetForm(["Too Text"]);
					Checkbox("Too Prof", false);
					Checkbox("Too Exp", false);
				};
			};
		};
	}; break;
	case "savetxt" : { // text to be put in the "Saving Throw advantages / disadvantages" field
		var fld = "Saving Throw advantages / disadvantages";
		//create the set object if it doesn't exist already
		var setKeys = function() {
			for (var e in set) {return true;};
			CurrentProfs.savetxt = { text : {}, immune : {}, adv_vs : {} };
			set = CurrentProfs.savetxt;
		}();
		//put the input into a form we can use
		if (typeof ProfObj == "string") ProfObj = { text : [ProfObj] };
		for (var st in ProfObj) {
			if (typeof ProfObj[st] == "string") ProfObj[st] = [ProfObj[st]];
			for (var i = 0; i < ProfObj[st].length; i++) {
				ProfObj[st][i] = clean(ProfObj[st][i], false, true);
				if (st !== "text") ProfObj[st][i] = ProfObj[st][i].replace(/,|;/g, "");
			};
		};
		//a functino to parse the 'immune' and 'adv_vs' parts into a usable string
		var preTxt = {adv_vs : "Adv. on saves vs.", immune : "Immune to"};
		var parseSvTxt = function() {
			var adv_vsArr = [], immuneArr = [];
			for (var svAdv in set.adv_vs) {
				if (!set.immune[svAdv]) adv_vsArr.push(set.adv_vs[svAdv].name);
			};
			for (var svImm in set.immune) {
				immuneArr.push(set.immune[svImm].name);
			};
			adv_vsArr.sort();
			immuneArr.sort();
			var theRe = {
				adv_vs : formatLineList(preTxt.adv_vs, adv_vsArr),
				adv_vsA : adv_vsArr,
				immune : formatLineList(preTxt.immune, immuneArr),
				immuneA : immuneArr
			};
			return theRe;
		};
		//create an object of the current state
		var oldSvTxt = parseSvTxt();
		//Process the input. //for the simple text strings, immediately add/remove it
		for (var attr in ProfObj) {
			var setT = set[attr];
			var addT = ProfObj[attr];
			for (var i = 0; i < addT.length; i++) {
				var iAdd = addT[i];
				var iAddM = ConvertToMetric(iAdd, 0.5);
				var iAddLC = iAdd.toLowerCase();
				if (AddRemove) { // add
					if (!setT[iAddLC]) {
						setT[iAddLC] = {
							name : iAdd,
							nameMetric : iAddM,
							src : [ProfSrc]
						};
						if (attr === "text") {
							AddString(fld, metric ? iAdd : iAddM, "; ");
						} else if (attr === "immune" && CurrentProfs.resistance[iAddLC]) {
							//adding immunity to something that the character also has resistance to, so remove the resistance
							var theRes = CurrentProfs.resistance[iAddLC];
							if (theRes.merge) {
								RemoveResistance(theRes.name);
							} else {
								for (var j = 0; j < theRes.cond.length; j++) {
									RemoveResistance(theRes.cond[j]);
								};
							};
						};
					} else if (setT[iAddLC].src.indexOf(ProfSrc) === -1) {
						setT[iAddLC].src.push(ProfSrc);
					};
				} else if (setT[iAddLC] && setT[iAddLC].src.indexOf(ProfSrc) !== -1) { // remove
					setT[iAddLC].src.splice(setT[iAddLC].src.indexOf(ProfSrc), 1);
					if (setT[iAddLC].src.length === 0) {
						delete setT[iAddLC];
						if (attr === "text") {
							RemoveString(fld, metric ? iAdd : iAddM);
						} else if (attr === "immune" && CurrentProfs.resistance[iAddLC]) {
							//removing immunity to something that the character also has resistance to, so add the resistance (again)
							DoResistance(iAddLC);
						};
					};
				};
			};
		};
		// Put the immune and adv_vs into the field, if anything changed
		var svFld = What(fld);
		var newSvTxt = parseSvTxt();
		for (var i = 0; i <= 1; i++) {
			var attri = i ? "adv_vs" : "immune";
			var oldStr = oldSvTxt[attri];
			var oldStrRE = RegExp(oldStr.RegEscape(), "i");
			var newStr = newSvTxt[attri];
			if (!oldStr && newStr) {
				svFld += (svFld ? "; " : "") + newStr;
			} else if (oldStr && (oldStrRE).test(svFld)) {
				svFld = svFld.replace(oldStrRE, newStr);
			} else if (oldStr) {
				// the string was probably altered manually, we got to find what was added, if anything
				var oldArr = oldSvTxt[attri + "A"];
				var newArr = newSvTxt[attri + "A"];
				var findRE = RegExp(preTxt[attri].RegEscape() + " ?(.*?),?( and)? ?" + oldArr[oldArr.length - 1].RegEscape(), "i");
				var foundStr = (findRE).test(svFld) ? svFld.match(findRE)[0].replace(findRE, "$1") : "";
				if (foundStr) {
					// we could match the string with something added in between, we can re-create the string with the manually added thing
					var addOb = foundStr.split(/, |; /);
					for (var j = 0; j < addOb.length; j++) {
						if (addOb[j] && !(RegExp("\\b" + addOb[j] + "\\b", "i")).test(oldArr)) newArr.push(addOb[j]);
					};
					newArr.sort();
					newStr = formatLineList(preTxt[attri], newArr);
					svFld = svFld.replace(findRE, newStr);
				} else if (newStr) {
					// we could not match the string, so lets just add the new object
					svFld += (svFld ? "; " : "") + newStr;
				};
			};
		};
		// Create the tooltip string for the "Saving Throw advantages / disadvantages" field
		var svTooltip = "";
		for (var a1 in set) {
		 for (var b2 in set[a1]) {
			var nmFld = a1 === "text" && metric ? "nameMetric" : "name";
			var aSvHead = (a1 === "immune" ? "\"Immunity to " : a1 === "adv_vs" ? "\"Adv. on saves vs. " : "\"") + set[a1][b2][nmFld] + "\"" + " was gained from:";
			var aSvTxt = formatLineList(aSvHead, set[a1][b2].src);
			if (aSvTxt) svTooltip += (svTooltip ? "\n \u2022 " : " \u2022 ") + aSvTxt + ".";
		 };
		};
		//Set the value of the field after cleaning any unfortunate replacement leftovers
		svFld = svFld.replace(/(,|;) (,|;)/g, "$2").replace(/^(,|;) |(,|;) $/g, "");
		Value(fld, svFld, svTooltip);
	}; break;
	case "vision" : { // Extra is optionally used to add a range, in feet, to the vision entry
		var fld = "Vision";
		var range = Extra ? Extra : 0;
		if (AddRemove) { // add
			if (!set[ProfObjLC]) {
				set[ProfObjLC] = {name : ProfObj, src : [], ranges : {}};
				var prevNm = "";
			} else {
				var prevRng = RoundTo(getHighestTotal(set[ProfObjLC].ranges) * (metric ? 0.3 : 1), 0.5, false, true);
				var prevNm = set[ProfObjLC].name + (!prevRng ? "" : " " + prevRng + (metric ? " m" : " ft"));
			}
			var theSet = set[ProfObjLC];
			if (theSet.src.indexOf(ProfSrc) !== -1) return; // the thing already exists so exit
			theSet.src.push(ProfSrc);
			theSet.ranges[ProfSrc] = range;
			// See what the new entry is now
			var newRng = RoundTo(getHighestTotal(theSet.ranges) * (metric ? 0.3 : 1), 0.5, false, true);
			var newNm = theSet.name + (!newRng ? "" : " " + newRng + (metric ? " m" : " ft"));
			// Add or replace someting in the field
			if (prevNm != newNm) {
				ReplaceString(fld, newNm, "; ", prevNm);
			};
		} else if (set[ProfObjLC]) { // remove
			var theSet = set[ProfObjLC];
			if (theSet.src.indexOf(ProfSrc) !== -1) theSet.src.splice(theSet.src.indexOf(ProfSrc), 1);
			if (theSet.src.length == 0) { // remove all of this entry
				var newRng = RoundTo(getHighestTotal(theSet.ranges) * (metric ? 0.3 : 1), 0.5, false, true);
				var newNm = theSet.name + (!newRng ? "" : " " + newRng + (metric ? " m" : " ft"));
				RemoveString(fld, newNm);
				delete set[ProfObjLC];
			} else {
				var prevRng = RoundTo(getHighestTotal(theSet.ranges) * (metric ? 0.3 : 1), 0.5, false, true);
				var prevNm = theSet.name + (!prevRng ? "" : " " + prevRng + (metric ? " m" : " ft"));
				if (theSet.ranges[ProfSrc] !== undefined) delete theSet.ranges[ProfSrc];
				var newRng = RoundTo(getHighestTotal(theSet.ranges) * (metric ? 0.3 : 1), 0.5, false, true);
				var newNm = theSet.name + (!newRng ? "" : " " + newRng + (metric ? " m" : " ft"));
				if (prevNm != newNm) {
					ReplaceString(fld, newNm, "; ", prevNm);
				};
			};
		};
		//update the tooltip
		var visTxt = "";
		for (var aVis in set) {
			var aSet = set[aVis];
			var aSrcs = [];
			for (var aSrc in aSet.ranges) {
				var aRng = "";
				if (aSet.ranges[aSrc]) {
					aRng = " [" + aSet.ranges[aSrc] + " ft]";
					if (metric) aRng = ConvertToMetric(aRng, 0.5);
				};
				aSrcs.push(aSrc + aRng);
			};
			var aVisTxt = formatLineList("\"" + aSet.name + "\" was gained from:", aSrcs);
			if (aVisTxt) visTxt += (visTxt ? "\n \u2022 " : " \u2022 ") + aVisTxt + ".";
		};
		AddTooltip(fld, visTxt);
	}; break;
	case "speed" : {
		var fldSpd = "Speed";
		var fldSpdW = What(fldSpd).replace(/\n|\r/g, "").replace(/,/g, ".");
		var fldEnc = "Speed encumbered";
		var fldEncdW = What(fldEnc).replace(/\n|\r/g, "").replace(/,/g, ".");
		var spdTypes = ["walk", "burrow", "climb", "fly", "swim"];
		//create the set object if it doesn't exist already
		var setKeys = function() {
			for (var e in set) {return true;};
			CurrentProfs.speed = { allModes : {} };
			for (var i = 0; i < spdTypes.length; i++) CurrentProfs.speed[spdTypes[i]] = {spd : {}, enc : {}};
			set = CurrentProfs.speed;
		}();
		// a function to get the correct value of the speed
		var parseSpeed = function(type, inpObj, fullString, replaceWalk, extra) {
			var useObj = eval(inpObj.toSource());
			var goOn = function() {for (var e in useObj) {return true;} return false; }();
			if (!goOn) return fullString == "both" ? ["", 0] : fullString ? "" : 0;
			useObj.extra = extra;
			var total = getHighestTotal(useObj, true, replaceWalk, CurrentProfs.speed.allModes);
			var typeStr = type === "walk" ? "" : type + " ";
			var totalStr = !total ? "" : typeStr + RoundTo(total * (metric ? 0.3 : 1), 0.5, false, true) + (metric ? " m" : " ft");
			return fullString == "both" ? [totalStr, total] : fullString ? totalStr : total;
		};
		// get the totals before we change anything
		var oldTotals = {
			walkSpd : parseSpeed("walk", set.walk.spd, false, 0),
			walkEnc : parseSpeed("walk", set.walk.enc, false, 0)
		};
		for (var i = 0; i < spdTypes.length; i++) {
			var sT = spdTypes[i];
			if (sT === "walk") continue;
			oldTotals[sT + "Spd"] = parseSpeed(sT, set[sT].spd, false, oldTotals.walkSpd);
			oldTotals[sT + "Enc"] = parseSpeed(sT, set[sT].enc, false, oldTotals.walkEnc);
		};
		// make an object of all the differences between the values of the field and the oldTotals
		var deltaSpds = {};
		var splitSpdString = function(type, str) {
			for (var i = 0; i < spdTypes.length; i++) {
				var sT = spdTypes[i];
				if (!str) {
					deltaSpds[sT + type] = 0;
					continue;
				};
				var strParse = oldTotals[sT + type];
				var typeRE = sT === "walk" ? /^(\d+.?\d*).*/ : RegExp(".*" + sT + " *(\\d+.?\\d*).*", "i");
				if ((typeRE).test(str)) strParse = Number(str.replace(typeRE, "$1"));
				if (metric) strParse = RoundTo(strParse / 0.3, 5, false, false);
				var total = strParse - oldTotals[sT + type];
				deltaSpds[sT + type] = !total ? 0 : total > 0 ? "+" + total : total.toString();
			}
		};
		splitSpdString("Spd", fldSpdW);
		splitSpdString("Enc", fldEncdW);
		if (isArray(ProfObj)) ProfObj = { walk : {spd : parseFloat(ProfObj[0]), enc : parseFloat(ProfObj[1])} };
		// add or remove the ProfObj from the current object
		for (var spdType in ProfObj) {
			if (!CurrentProfs.speed[spdType]) continue
			var theInp = ProfObj[spdType];
			var theSet = CurrentProfs.speed[spdType];
			if (AddRemove) { // add
				if (spdType === "allModes") {
					theSet[ProfSrc] = theInp;
				} else if (typeof theInp == "object") {
					if (theInp.spd) theSet.spd[ProfSrc] = theInp.spd;
					if (theInp.enc) theSet.enc[ProfSrc] = theInp.enc;
				} else {
					theSet.spd[ProfSrc] = theInp;
					theSet.enc[ProfSrc] = theInp;
				};
			} else { // remove
				if (spdType === "allModes") {
					delete theSet[ProfSrc];
				} else {
					if (theSet.spd[ProfSrc] !== undefined) delete theSet.spd[ProfSrc];
					if (theSet.enc[ProfSrc] !== undefined) delete theSet.enc[ProfSrc];
				};
			};
		};
		// get the new totals
		var theWalks = {
			spd : parseSpeed("walk", set.walk.spd, "both", 0, deltaSpds.walkSpd),
			enc : parseSpeed("walk", set.walk.enc, "both", 0, deltaSpds.walkEnc)
		};
		var newTotals = { walkSpd : theWalks.spd[0], walkEnc : theWalks.enc[0] };
		for (var i = 0; i < spdTypes.length; i++) {
			var sT = spdTypes[i];
			if (sT === "walk") continue;
			newTotals[sT + "Spd"] = parseSpeed(sT, set[sT].spd, true, theWalks.spd[1], deltaSpds[sT + "Spd"]);
			newTotals[sT + "Enc"] = parseSpeed(sT, set[sT].enc, true, theWalks.enc[1], deltaSpds[sT + "Enc"]);
		};
		// create the strings
		var spdString = "";
		var encString = "";
		for (var i = 0; i < spdTypes.length; i++) {
			var sT = spdTypes[i];
			var sSpd = newTotals[sT + "Spd"];
			if (sSpd) spdString += (!spdString ? "" : ",\n") + sSpd;
			var eSpd = newTotals[sT + "Enc"];
			if (eSpd) encString += (!encString ? "" : typePF ? ", " : ",\n") + eSpd;
		};
		// create the tooltips
		var ttips = {spd : "", enc : ""};
		var modArray = [];
		for (var spMod in set.allModes) {
			var theVal = set.allModes[spMod];
			if (!theVal) continue;
			theVal += " ft";
			if (metric) theVal = ConvertToMetric(theVal, 0.5);
			modArray.push(spMod + " [" + theVal + "]");
		};
		for (var i = 0; i < spdTypes.length; i++) {
			var sT = spdTypes[i];
			var arrs = {spd : [], enc : []};
			for (var n = 0; n <= 1; n++) {
				var sV = n ? "enc" : "spd";
				var theSpeeds = set[sT][sV];
				var goOn = false;
				for (var aSpeed in theSpeeds) {
					var theVal = theSpeeds[aSpeed];
					if (!theVal) continue;
					if (theVal === "walk") {
						theVal = "as walking speed";
					} else {
						theVal += " ft";
					};
					if (metric) theVal = ConvertToMetric(theVal, 0.5);
					arrs[sV].push(aSpeed + " [" + theVal + "]");
					goOn = true;
				};
				if (goOn) {
					arrs[sV] = arrs[sV].concat(modArray);
					ttips[sV] += (ttips[sV] ? "\n\n" : "") + formatMultiList("The total " + (n ? "encumbered " : "") + sT + "ing speed comes from:", arrs[sV]);
				};
			};
		};
		// set them to the fields
		Value(fldSpd, spdString, ttips.spd);
		Value(fldEnc, encString, ttips.enc);
	}; break;
	case "specialarmour" : { // Extra is to make the entry unique (the array index)
		if (!ProfObj.mod) return;
		var fldNms = {
			magic : ["AC Magic", "AC Magic Description"],
			misc1 : ["AC Misc Mod 1", "AC Misc Mod 1 Description"],
			misc2 : ["AC Misc Mod 2", "AC Misc Mod 2 Description"]
		};
		var objName = ProfSrc + "-" + Extra;
		if (AddRemove) { // add
			var tObj = {
				name : ProfObj.name,
				mod : ProfObj.mod,
				text : ProfObj.text,
				stopeval : ProfObj.stopeval,
				source : ProfSrc
			};
			if (ProfObj.magic) {
				tObj.type = "magic";
			} else {
				// count how many of each misc we got, and add to the fewest
				var tCount = { misc1 : 0, misc2 : 0 };
				for (var key in set) if (set[key].type != "magic") tCount[set[key].type] += 1;
				tObj.type = tCount.misc1 <= tCount.misc2 ? "misc1" : "misc2";
			}
			set[objName] = tObj;
			// update the description
			AddString(fldNms[tObj.type][1], tObj.name, ", ");
		} else { // remove
			var tObj = set[objName];
			if (!tObj) return; // nothing to do so stop now
			// only remove this if the name isn't used for another in the same field
			var removeName = true;
			for (var key in set) {
				if (key !== objName && set[key].name == tObj.name && set[key].type == tObj.type) {
					removeName = false;
					break;
				}
			}
			// update the description
			if (removeName) RemoveString(fldNms[tObj.type][1], tObj.name);
		}
		// update the modifier field
		AddToModFld(fldNms[tObj.type][0], tObj.mod, !AddRemove, tObj.name, tObj.text);
		// now set the tooltip
		var tooltipArr = [];
		for (var key in set) {
			if (!AddRemove && key == objName) continue;
			if (set[key].type == tObj.type) {
				var srcStr = set[key].source.indexOf(set[key].name) == -1 ? set[key].source + " (" + set[key].name + ")" : set[key].source;
				tooltipArr.push(srcStr);
			};
		}
		var tooltipStr = formatMultiList("This line of " + (tObj.type == "magic" ? "magic" : "miscellaneous") + " AC bonuses contains:\n(tip: click on the number field in this line for more info)", tooltipArr);
		AddTooltip(fldNms[tObj.type][1], tooltipStr);
		if (!AddRemove) delete set[objName]; // now delete the object
	}; break;
	case "carryingcapacity" : {
		ProfObj = parseFloat(ProfObj);
		if (isNaN(ProfObj)) return; // nothing to do
		var cFld = "Carrying Capacity Multiplier";
		var curFactor = Number(What(cFld));
		if (isNaN(curFactor)) { // recreate the total from the attributes
			curFactor = 1;
			for (var srcs in set) curFactor *= set[srcs];
		}
		if (AddRemove) { // add
			set[ProfSrc] = ProfObj;
			curFactor *= ProfObj;
		} else if (set[ProfSrc]) { // remove
			curFactor /= set[ProfSrc];
			delete set[ProfSrc];
		}
		// Make the new tooltip
		var sourcesArray = [];
		for (var srcs in set) {
			sourcesArray.push(srcs + ": \u00D7" + set[srcs]);
		}
		var ttText = toUni("Carrying Capacity Multiplier") + "\nThe number you type in here will be used to multiply the carrying capacity with. This must be a positive number.\n\nWhen you set this value to zero, all the encumbrance calculations will be halted and the encumbrance fields will be left empty." + formatMultiList("\n\nThe following features have changed this multiplier:", sourcesArray);
		// Set the new field value
		Value("Carrying Capacity Multiplier", Math.max(0, RoundTo(curFactor, 0.25)), ttText);
	}; break;
	case "advantage" : { // ProfObj array [field, boolean (true = adv; false = disadv)]
		var fld = ProfObj[0], fldDescr;
		fld = fld.substr(0,1).toUpperCase() + fld.substr(1).toLowerCase();
		var fld3 = fld.substr(0,3), fld4 = fld.substr(0,4);
		var isSkill = false;
		if (SkillsList.abbreviations.indexOf(fld3) !== -1) {
			fld = fld3;
			isSkill = true;
		} else if (SkillsList.abbreviations.indexOf(fld4) !== -1) {
			fld = fld4;
			isSkill = true;
		} else if (AbilityScores.abbreviations.indexOf(fld3) !== -1) {
			fld = fld3 + " ST";
			fldDescr = AbilityScores.names[AbilityScores.abbreviations.indexOf(fld3)] + " saving throws";
		} else if (fld3 == "Att") {
			fld = fld3;
			fldDescr = "attack rolls";
		}
		if (isSkill) {
			fldDescr = SkillsList.names[SkillsList.abbreviations.indexOf(fld)] + " checks";
		}
		if (!set[fld]) set[fld] = {};
		if (AddRemove) { // add
			set[fld][ProfSrc] = ProfObj[1];
		} else if (set[fld][ProfSrc] !== undefined) { // remove
			delete set[fld][ProfSrc];
		}
		// what to change the field to
		var setAdv = 0, setDis = 0, tooltipArr = [];
		for (var src in set[fld]) {
			var giveAdv = set[fld][src];
			tooltipArr.push((!giveAdv ? "Disa" : "A") + "dvantage: " + src);
			if (giveAdv) {
				setAdv++;
			} else {
				setDis++;
			}
		}
		tooltipArr.sort();
		if (setAdv && setDis) { // both advantage and disadvantage, so set neither
			setAdv = false;
			setDis = false;
		}
		// apply the fields
		if (!typePF) {
			var useFld = isSkill && Who("Text.SkillsNames") != "alphabeta" ? SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(fld)] : fld;
			var fullTT = !tooltipArr.length ? "" : formatMultiList("(Dis)advantage with " + fldDescr + " gained from:", tooltipArr) + "\n\nRemember that advantage and disadvantage cancel each other out and that there is no bonus in having multiple sources of either.\nOne disadvantage will cancel any number of reasons for advantage and vice versa.";
			Checkbox(useFld + " Adv", setAdv, fullTT);
			Checkbox(useFld + " Dis", setDis, fullTT);
		} else {
			if (fld == "Perc") {
				AddTooltip("Passive Perception Bonus", undefined, setAdv ? "Adv" : setDis ? "Dis" : "");
			} else if (fld == "Ste") {
				if (setDis) {
					Show("Stealth Disadv." + Who("Text.SkillsNames"));
				} else {
					Hide("Stealth Disadv");
				}
				AddTooltip("AC Stealth Disadvantage", undefined, setAdv ? "Adv" : setDis ? "Dis" : "");
			}
		}
		// clean the object
		if (!AddRemove && !tooltipArr.length) delete set[fld];
	}; break;
 };
	SetStringifieds("profs");
};

//a way of creating a formatted list with multiple lines or on a single line
function formatMultiList(caption, elements) {
	if (!elements || (isArray(elements) && elements.length === 0)) return "";
	if (!isArray(elements)) elements = [elements];
	var rStr = caption + "\n \u2022 " + elements[0];
	for (var i = 1; i < elements.length; i++) {
		rStr += ";\n \u2022 " + elements[i];
	};
	return rStr + ".";
};
function formatLineList(caption, elements) {
	if (!elements || (isArray(elements) && elements.length === 0)) return "";
	if (!isArray(elements)) elements = [elements];
	var rStr = (caption ? caption + " " : "") + elements[0];
	var EL = elements.length;
	for (var i = 1; i < EL; i++) {
		rStr += EL > 2 ? "," : "";
		rStr += (i === EL - 1 ? " and " : " ") + elements[i];
	};
	return rStr;
};

//a way to condense an array of numbers down to the highest and modifiers
function getHighestTotal(nmbrObj, notRound, replaceWalk, extraMods) {
	var values = [0];
	var modifications = [];
	var fixedVals = [0];
	var noModsIfWalks = false;
	var prsVal = function(val) {
		if (!val) {
			return;
		} else if (isNaN(val.substring(0,1)) && !isNaN(val.substring(1))) {
			modifications.push(val);
		} else if (!isNaN(val)) {
			values.push(val);
		} else if (replaceWalk !== undefined && replaceWalk !== "walk" && val === "walk") {
			prsVal(replaceWalk);
			noModsIfWalks = true;
		} else if ((/fixed/i).test(val) && (/\d+/).test(val)) { // for Magic Items granting a speed, no modifiers at all
			fixedVals.push(Number(val.match(/\d+/)[0]));
		};
	};
	var recurProcess = function(input) {
		if (isArray(input)) {
			for (var i = 0; i < input.length; i++) { recurProcess(input[i]); };
		} else if (typeof input == "object") {
			for (var i in input) { recurProcess(input[i]); };
		} else {
			prsVal(input);
		};
	};
	recurProcess(nmbrObj);
	//process the values
	var tValue = Math.max.apply(Math, values);
	//process the modifications
	var processModifiers = function(modA) {
		for (n = 1; n <= 2; n++) { // first do substractions and additions, then multiplications and divisions
			for (var i = 0; i < modA.length; i++) {
				var aMod = modA[i];
				var aOperator = aMod.substring(0,1);
				var aValue = Number(aMod.substring(1));
				if (isNaN(aValue)) continue;
				if (n === 1) {
					switch (aOperator) {
						case "+" :
							tValue += aValue;
							break;
						case "-" :
						case "\u2015" :
							tValue -= aValue;
							break;
						case "_" :
							tValue = tValue ? tValue + aValue : tValue;
							break;
					};
				} else {
					switch (aOperator) {
						case "x" :
						case "X" :
						case "*" :
						case "\u00d7" :
							tValue *= aValue;
							break;
						case "/" :
						case ":" :
							tValue /= aValue;
							break;
					};
				};
			};
		};
	};
	if (tValue && modifications.length) processModifiers(modifications);
	if (tValue && extraMods && !(replaceWalk && noModsIfWalks && tValue === replaceWalk)) {
		modifications = [];
		recurProcess(extraMods);
		if (modifications.length) processModifiers(modifications);
	};
	if (fixedVals.length > 1) {
		tValue = Math.max.apply(Math, fixedVals.concat([tValue]));
	};
	return notRound ? tValue : Math.round(tValue);
};

// open a dialogue with a number of lines of choices and return the choices in an array; if knownOpt === "radio", show radio buttons instead, and return the entry selected
// if notProficiencies is set to true, the optType will serve as the dialog header, and optSrc will serve as the multline explanatory text
function AskUserOptions(optType, optSrc, optSubj, knownOpt, notProficiencies) {
	if (!IsNotImport) return optSubj;
	//first make the entry lines
	var selectionLines = [];
	for (var i = 0; i < optSubj.length; i++) {
		if (knownOpt === "radio") {
			selectionLines.push({
				type : "radio",
				item_id : "sl" + ("0" + i).slice(-2),
				group_id : "slct",
				name : optSubj[i]
			});
		} else {
			selectionLines.push({
				type : "view",
				alignment : "align_fill",
				align_children : "align_row",
				elements : [{
					type : "static_text",
					alignment : "align_left",
					item_id : "st" + ("0" + i).slice(-2),
					font : "dialog",
					name : "Already known!"
				}, {
					type : "edit_text",
					alignment : "align_right",
					item_id : "sl" + ("0" + i).slice(-2),
					char_width : 30,
					height : 20
				}]
			});
		};
	};
	// split to two columns if radio options and more than 7
	if (knownOpt === "radio" && optSubj.length > 7) {
		var leftCol = selectionLines.slice(0,Math.ceil(selectionLines.length/2));
		var rightCol = selectionLines.slice(Math.ceil(selectionLines.length/2));
		selectionLines = [{
			type : "view",
			alignment : "align_fill",
			align_children : "align_distribute",
			elements : [{
				type : "view",
				alignment : "align_left",
				align_children : "align_left",
				elements : leftCol
			}, {
				type : "view",
				alignment : "align_right",
				align_children : "align_left",
				elements : rightCol
			}]
		}];
	}

	var diaHeader = notProficiencies ? optType : "Select proficiencies";

	//make all the known options lowercase for easier testing
	var showOptions = "";
	if (knownOpt && knownOpt !== "radio") {
		showOptions = knownOpt.toString();
		for (var i = 0; i < knownOpt.length; i++) { knownOpt[i] = knownOpt[i].toLowerCase(); };
	};

	var theDialog = {
		choices : [],
		already : knownOpt,
		subj : optSubj, //array of default choices
		initialize : function (dialog) {
			if (this.already === "radio") return;
			var toLoad = {};
			var toShow = {};
			for (var i = 0; i < this.subj.length; i++) {
				toLoad["sl" + ("0" + i).slice(-2)] = this.subj[i];
				var stTxt = "st" + ("0" + i).slice(-2);
				toShow[stTxt] = false;
				dialog.setForeColorRed(stTxt);
			};
			dialog.load(toLoad);
			dialog.visible(toShow);
		},
		commit : function (dialog) {
			var oResult = dialog.store();
			this.choices = [];
			for (var i = 0; i < this.subj.length; i++) {
				var theResult = oResult["sl" + ("0" + i).slice(-2)];
				if (this.already === "radio") {
					if (theResult) {
						this.choices = this.subj[i];
						return;
					};
				} else {
					this.choices.push(theResult ? theResult : this.subj[i]);
				};
			};
		},
		check : function (dialog, nmbr) {
			if (!this.already || this.already === "radio") return;
			var toChk = "sl" + ("0" + nmbr).slice(-2);
			var tTxt = "st" + ("0" + nmbr).slice(-2);
			var tResult = dialog.store()[toChk].toLowerCase();
			var toShow = {};
			toShow[tTxt] = this.already.indexOf(tResult) !== -1;
			dialog.visible(toShow);
		},
		description : {
			name : diaHeader,
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "static_text",
					item_id : "head",
					alignment : "align_fill",
					font : "heading",
					bold : true,
					wrap_name : true,
					char_width : 40,
					name : diaHeader
				}].concat(notProficiencies ? [{
					type : "static_text",
					item_id : "txtA",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					char_width : 40,
					name : optSrc
				}] : [{
					type : "view",
					alignment : "align_fill",
					align_children : "align_row",
					elements : [{
						type : "view",
						alignment : "align_left",
						align_children : "align_left",
						elements : [{
							type : "static_text",
							alignment : "align_left",
							font : "dialog",
							item_id : "txt0",
							name : "Regarding:"
						}, {
							type : "static_text",
							alignment : "align_left",
							font : "dialog",
							item_id : "txt2",
							name : "Gained from:"
						}]
					}, {
						type : "view",
						alignment : "align_right",
						align_children : "align_left",
						elements : [{
							type : "static_text",
							alignment : "align_left",
							item_id : "txt1",
							font : "dialog",
							bold : true,
							name : optType
						}, {
							type : "static_text",
							alignment : "align_left",
							item_id : "txt3",
							font : "dialog",
							bold : true,
							name : optSrc
						}]
					}]
				}]).concat([{
					type : "view",
					alignment : "align_center",
					align_children : "align_left",
					elements : selectionLines
				}]).concat(!showOptions ? [] : [{
					type : "static_text",
					alignment : "align_fill",
					item_id : "txtO",
					wrap_name : true,
					name : "Currently already known: " + showOptions + ".",
					char_width : 40
				}]).concat([{
					type : "static_text",
					alignment : "align_fill",
					item_id : "txtL",
					wrap_name : true,
					name : "You can always change what you set here at a later time by editing the corresponding field on the sheet. What you select here is not permanent.",
					char_width : 40
				}, {
					type : "ok"
				}])
			}]
		}
	};
	if (knownOpt !== "radio") { for (var i = 0; i < optSubj.length; i++) {
		theDialog["sl" + ("0" + i).slice(-2)] = Function("dialog", "this.check(dialog, " + i + ");");
	}; };
	app.execDialog(theDialog)
	return theDialog.choices;
};

// Process a feature attribute through the AddToNotes function
// namesArr = [tipNm, displName, fObjName, aParent]
function processToNotesPage(AddRemove, items, type, mainObj, parentObj, namesArr) {
	if (!isArray(items)) items = [items];
	// set the alertType, determined by type
	var fallback = {
		alertType : "Class Features section",
		noteOrig : namesArr[1],
		noteSrc : mainObj.source ? stringSource(mainObj, "first,abbr", ", ") : parentObj && parentObj.source ? stringSource(parentObj, "first,abbr", ", ") : ""
	}
	switch (GetFeatureType(type)) {
		case "classes":
			fallback.alertType = "Class Features section";
			fallback.noteOrig = namesArr[2].indexOf("subclassfeature") !== -1 ? CurrentClasses[namesArr[3]].subname : CurrentClasses[namesArr[3]].name;
			fallback.noteOrig += mainObj.minlevel ? " " + mainObj.minlevel : parentObj && parentObj.minlevel ? " " + parentObj.minlevel : "";
			break;
		case "race":
			fallback.alertType = "Racial Traits section";
			fallback.noteOrig = namesArr[1];
			break;
		case "background":
			fallback.alertType = "Background Feature description";
			fallback.noteOrig = namesArr[1];
			break;
		case "feats":
			fallback.alertType = "Feat description";
			fallback.noteOrig = namesArr[0];
			break;
		case "items":
			fallback.alertType = "Magic Item description";
			fallback.noteOrig = namesArr[0];
			break;
	};
	for (var i = 0; i < items.length; i++) {
		var noteObj = items[i];
		var alertTxt = noteObj.popupName ? noteObj.popupName : noteObj.name;
		var noteSrc = noteObj.source ? stringSource(noteObj, "first,abbr", ", ") : fallback.noteSrc;
		var noteDesc = (isArray(noteObj.note) ? desc(noteObj.note) : noteObj.note).replace(/\n/g, "\r");
		if (What("Unit System") === "metric") noteDesc = ConvertToMetric(noteDesc, 0.5);
		var noteStr = "\u25C6 " + noteObj.name + " (" + fallback.noteOrig + noteSrc + ")" + (noteObj.additional ? " [" + noteObj.additional + "]" : "") + noteDesc;
		if (noteObj.page3notes) { // add to 3rd page notes section
			if (AddRemove) {
				AddString('Extra.Notes', noteStr, true);
				show3rdPageNotes(); // for a Colourful sheet, show the notes section on the third page
				var changeMsg = alertTxt + " has been added to the Notes section on the third page" + (!typePF ? ", while the Rules section on the third page has been hidden" : "") + ". They wouldn't fit in the " + fallback.alertType + ".";
				CurrentUpdates.types.push("notes");
				if (!CurrentUpdates.notesChanges) {
					CurrentUpdates.notesChanges = [changeMsg];
				} else {
					CurrentUpdates.notesChanges.push(changeMsg);
				}
			} else {
				RemoveString('Extra.Notes', noteStr, true);
			}
		} else { // add to its own section on a notes page
			if (AddRemove) {
				AddToNotes(noteStr, alertTxt, false, fallback.alertType, true);
			} else {
				AddToNotes("", false, noteStr, false, true);
			}
		}
	}
}

// A way to add a string to a notes page, or generate a notes page if it didn't exist yet
function AddToNotes(noteStr, alertTxt, oldNoteStr, alertType, isProcessed) {
	if (!noteStr && !oldNoteStr) return;
	var prefix = false;
	if (!isProcessed) {
		if (What("Unit System") === "metric") {
			if (noteStr) noteStr = ConvertToMetric(noteStr, 0.5);
			if (oldNoteStr) oldNoteStr = ConvertToMetric(oldNoteStr, 0.5);
		}
		if (noteStr) noteStr = noteStr.replace(/\n/g, "\r");
		if (oldNoteStr) oldNoteStr = oldNoteStr.replace(/\n/g, "\r");
	};
	var replaceOldNote = false;
	if (noteStr && !isTemplVis("ASnotes")) {
		var noteFld = DoTemplate("ASnotes", "Add");
		noteFld += "Notes.Left";
	} else {
		var noteFld = false;
		var noteFlds = ["Notes.Left", "Notes.Right"];
		var notesPrefix = What("Template.extras.ASnotes").split(",");
		for (var i = 1; i < notesPrefix.length; i++) {
			for (var n = 0; n < noteFlds.length; n++) {
				var aFld = notesPrefix[i] + noteFlds[n];
				var inFld = What(aFld);
				if (noteStr && inFld.toLowerCase().indexOf(noteStr.toLowerCase()) !== -1) {
					return;
				} else if (oldNoteStr && inFld.toLowerCase().indexOf(oldNoteStr.toLowerCase()) !== -1) {
					prefix = notesPrefix[i];
					noteFld = aFld;
					replaceOldNote = true;
					i = noteFlds.length;
					break;
				} else if (inFld === "" && !noteFld) {
					noteFld = aFld;
				};
			};
		};
		if (!noteFld && noteStr) {
			noteFld = DoTemplate("ASnotes", "Add");
			noteFld += "Notes.Left";
		} else if (!noteFld && oldNoteStr) {
			return;
		};
	};
	ReplaceString(noteFld, noteStr, false, oldNoteStr ? oldNoteStr : "");
	if (!replaceOldNote && noteStr && alertTxt) {
		if (!alertType) alertType = "Class Features section";
		var changeMsg = alertTxt + ' has been added to the Notes page at page number ' + (tDoc.getField(noteFld).page + 1) + ". They wouldn't fit in the " + alertType + " or the third page's Notes section.";
		CurrentUpdates.types.push("notes");
		if (!CurrentUpdates.notesChanges) {
			CurrentUpdates.notesChanges = [changeMsg];
		} else {
			CurrentUpdates.notesChanges.push(changeMsg);
		}
	} else if (replaceOldNote && oldNoteStr && prefix && !What(prefix + "Notes.Left") && !What(prefix + "Notes.Right")) {
		// if the notes page is now completely empty, remove it completely
		DoTemplate("ASnotes", "Remove", prefix, true);
	}
};

// check if a newer version is available (Acrobat Pro only)
function checkForUpdates() {
	if (!(/exchange/i).test(app.viewerType)) return; // using Reader
	var serv = Net.SOAP.connect("http://update.flapkan.com/mpmb.wsdl");
	if (!serv || !serv.version) return;
	var thisType = typeA4 ? "CF-A4" : typeLR ? "CF-L" : (/redesign/i).test(tDoc.info.SheetType) ? "PF-R" : "PF";
	var lVers = parseFloat(serv.version(thisType));
	if (!lVers) return;
};

// a function to see if the character has proficiency in a skill; This returns an array of two booleans: [proficiency, expertise]
function hasSkillProf(theSkill) {
	var skill = theSkill.substr(0,4).capitalize();
	if (SkillsList.abbreviations.indexOf(skill) === -1) {
		skill = skill.substr(0,3);
		if (SkillsList.abbreviations.indexOf(skill) === -1) return [false, false];
	};
	var skillFld = Who('Text.SkillsNames') === 'alphabeta' ? skill : SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(skill)];
	var hasProf = tDoc.getField(skillFld + ' Prof').isBoxChecked(0) != 0;
	var hasExp = !hasProf ? false : tDoc.getField(skillFld + ' Exp').isBoxChecked(0) != 0;
	return [hasProf, hasExp];
};

// (Re)set all the calculations in their right order
function setCalcOrder() {
	calcStop();
	var cFlds = [];
	var abis = ["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"];
	var skills = ["Acr", "Ani", "Arc", "Ath", "Dec", "His", "Ins", "Inti", "Inv", "Med", "Nat", "Perc", "Perf", "Pers", "Rel", "Sle", "Ste", "Sur"];
	// ability modifiers
	for (var i = 0; i < abis.length; i++) cFlds.push(abis[i]+" Mod");
	// Proficiency bonus
	cFlds.push("Proficiency Bonus");
	// saving throws
	for (var i = 0; i < abis.length; i++) cFlds.push(abis[i]+" ST Mod");
	// skills & initiative
	cFlds = cFlds.concat(skills);
	cFlds = cFlds.concat(["Too", "Passive Perception", "Initiative bonus"]);
	if (!typePF) cFlds.push("Init Dex Mod");
	// Spell Saves
	cFlds = cFlds.concat(["Spell save DC 1", "Spell save DC 2"]);
	// AC
	cFlds = cFlds.concat(["AC Armor Bonus", "AC Dexterity Modifier", "AC"]);
	// HD
	if (!typePF) for (var i = 1; i <= 3; i++) cFlds.push("HD"+i+" Con Mod");
	// attacks
	for (var i = 1; i <= FieldNumbers.attacks; i++) cFlds.push("Attack."+i+".To Hit");
	// weight information
	cFlds = cFlds.concat(["Weight Encumbered", "Weight Heavily Encumbered", "Weight Push/Drag/Lift", "Weight Carrying Capacity.Field"]);
	if (!typePF) cFlds = cFlds.concat(["Weight Encumbered Text", "Display.Speed.Enc", "Weight Heavily Encumbered Text", "Display.Speed.EncH", "Weight Push/Drag/Lift Text", "Display.Speed.Push", "Weight Carrying Capacity.Text"]);
	// equipment 2nd page
	cFlds.push("Adventuring Gear Weight Subtotal Right");
	if (typePF) cFlds.push("Adventuring Gear Weight Subtotal Middle");
	cFlds.push("Adventuring Gear Weight Subtotal Left");
	for (var i = 1; i <= (typePF ? 9 : 6); i++) cFlds.push("Adventuring Gear Location.Subtotal "+i);
	// equipment 3rd page
	cFlds.push("Extra.Gear Weight Subtotal Right");
	cFlds.push("Extra.Gear Weight Subtotal Left");
	for (var i = 1; i <= 6; i++) cFlds.push("Extra.Gear Location.Subtotal "+i);
	// weight carried
	cFlds.push("Weight Carried");
	// unrelated fields
	cFlds = cFlds.concat(["Next level", "SheetInformation"]);
	// companion page
	var tpls = What("Template.extras.AScomp").split(",");
	for (var t = 0; t < tpls.length; t++) {
		var tpl = tpls[t];
		// companion ability modifiers
		for (var i = 0; i < (abis.length - 1); i++) cFlds.push(tpl+"Comp.Use.Ability."+abis[i]+".Mod");
		// companion saving throws
		for (var i = 0; i < (abis.length - 1); i++) cFlds.push(tpl+"Comp.Use.Ability."+abis[i]+".ST.Mod");
		// companion skills
		for (var i = 0; i < skills.length; i++) cFlds.push(tpl+"Comp.Use.Skills."+skills[i]+".Mod");
		cFlds.push(tpl+"Comp.Use.Skills.Perc.Pass.Mod");
		// companion initiative
		cFlds.push(tpl+"Comp.Use.Combat.Init.Mod");
		if (!typePF) cFlds.push(tpl+"Comp.Use.Combat.Init.Dex");
		// companion HD
		if (!typePF) cFlds.push(tpl+"Comp.Use.HD.Con");
		// companion equipment
		if (typePF) {
			cFlds.push(tpl+"Comp.eqp.Gear Weight Subtotal");
		} else {
			cFlds = cFlds.concat([tpl+"Comp.eqp.Gear Weight Subtotal Left", tpl+"Comp.eqp.Gear Weight Subtotal Right"]);
		}
		// companion notes
		cFlds.push(tpl+"Comp.eqp.Notes");
		if (!typePF) cFlds.push(tpl+"Comp.img.Notes");
		// companion attacks
		for (var i = 1; i <= 3; i++) cFlds.push(tpl+"Comp.Use.Attack."+i+".To Hit");
	}
	// Wild Shape page
	var tpls = What("Template.extras.WSfront").split(",");
	for (var t = 0; t < tpls.length; t++) {
		var tpl = tpls[t];
		if (tpl) cFlds.push(tpl+"AdvLog.Player Name");
		for (var w = 1; w <= 4; w++) {
			for (var i = 0; i < (abis.length - 1); i++) cFlds.push(tpl+"Wildshape."+w+".Ability."+abis[i]+".Mod")
		}
	}
	// spell sheet pages
	var tpls = (What("Template.extras.SSfront") + "," + What("Template.extras.SSmore")).replace(/,(,)|,$()/, "$1").split(",");
	for (var t = 0; t < tpls.length; t++) {
		var tpl = tpls[t];
		cFlds.push(tpl+"SpellSheetInformation");
		if (typePF) {
			cFlds.push(tpl+"zAdvLog.PC Name");
		} else if (tpl) {
			cFlds.push(tpl+"AdvLog.PC Name");
		}
		if (!typePF && What("Template.extras.SSfront").indexOf(tpl) !== -1) cFlds.push(tpl+"spellshead.Text.prepare.0");
		for (var i = 0; i <= 3; i++) cFlds = cFlds.concat([tpl+"spellshead.prepare."+i, tpl+"spellshead.dc."+i, tpl+"spellshead.attack."+i]);
	}
	// adventurers log page last
	var advT = [".xp", ".gold", ".downtime", ".renown", ".magicItems"];
	var tpls = What("Template.extras.ALlog").split(",");
	for (var t = 0; t < tpls.length; t++) {
		var tpl = tpls[t];
		cFlds = cFlds.concat([
			tpl+"AdvLog.previous",
			tpl+"AdvLog.DCI.Text",
			tpl+"AdvLog.Player Name",
			tpl+"AdvLog.PC Name",
			tpl+"AdvLog.Class and Levels",
			tpl+"AdvLog.sheetNumber" // before the numeric fields for correct working of the SetAdvLogCalcOrder() function
		]);
		for (var l = 1; l <= FieldNumbers.logs; l++) {
			for (var i = 0; i < advT.length; i++) {
				var aLog = tpl+"AdvLog."+l+advT[i];
				cFlds = cFlds.concat([aLog+".start", aLog+".total"]);
			}
		}
	}

	// Set the actual calculation order
	var cOrd = 0;
	for (var i = 0; i < cFlds.length; i++) {
		var aFld = tDoc.getField(cFlds[i]);
		if (aFld) {
			aFld.calcOrderIndex = cOrd;
			cOrd++;
		}
	};
};

// The function called when the FAQ button is pressed
function getFAQ(input, delay) {
	var MenuSelection = input ? input : getMenu("faq");
	if (!MenuSelection || MenuSelection[0] != "faq") return;
	switch (MenuSelection[1]) {
		case "online" :
			app.launchURL("https://flapkan.com/faq", true);
			break;
		case "pdf" :
			if (delay) return true;
			tDoc.exportDataObject({ cName: 'FAQ.pdf', nLaunch: 2 });
			break;
		case "ogl" :
			ShowDialog("Open Gaming License, for use of the SRD", licenseOGL.join("\n\n"));
			break;
		case "gplv3" :
			ShowDialog("GNU License, for the software by MPMB", licenseGPLV3.join("\n\n"));
			break;
	}
};

// Make a menu to enable or disable the use of unicode
function makeUnicodeMenu() {
	var isEnabled = What("UseUnicode") != "";
	Menus.unicode = {
		cName : "Use Unicode " + (isEnabled ? "(disable if you can't read this: \"" + toUni("This") + "\")" : "[disabled]"),
		cReturn : "unicode#unicode#" + (isEnabled ? "" : "true"),
		bMarked : isEnabled
	}
}

// Do something with the menu
function setUnicodeUse(enable, force) {
	enable = enable != "";
	var isEnabled = What("UseUnicode") != "";
	if (isEnabled !== enable || force) {
		Value("UseUnicode", enable ? "true" : "");
		if (!force) {
			app.alert({
				cMsg : "You have changed the use of unicode characters to: " + (enable ? "ENABLED" : "DISABLED") + "\nUnicode characters are those that are bold, italic, or superscript in tooltips and dialogs. Not all systems handle them well.\n\nNote that there still will be some static tooltips that use unicode and thus might have unreadable characters for you.\n\nYou can already see the result of your change here:\n\"" + toUni("This text is bold and italic if unicode is enabled") + '\".',
				nIcon : 3,
				cTitle : "Unicode has been " + (enable ? "ENABLED" : "DISABLED")
			});
		}
		// update the sourcelist superscript
		for (var aSrc in SourceList) {
			SourceList[aSrc].uniS = toSup(SourceList[aSrc].abbreviation);
		};
		// update the tooltips that use unicode
		UpdateDropdown("tooltips");
		AbilityScores_Button(true);
		setSkillTooltips(true);
		MakeSkillsMenu_SkillsOptions(true, true);
		SetHPTooltip();
		AtHigherLevels = "\n   " + toUni("At Higher Levels") + ": ";
	}
}

// Copy all the attributes of a field to another field (or even swap between the two)
// excl is an object with optional attributes { userName : true, submitName : true, readonly : true, noCalc : true }
function copyField(fldFromName, fldToName, excl, swap) {
	var fldTo = tDoc.getField(fldToName);
	var fldFrom = tDoc.getField(fldFromName);
	if (!fldTo || !fldFrom || fldTo.type !== fldFrom.type) return;

	if (!excl) excl = {};

	// a function to do the actual copying
	var copy = function(fromObj, toObj, justObj) {
		if (fromObj.type == "checkbox") {
			if (justObj) {
				toObj.isBoxCheckVal = fromObj.isBoxChecked(0);
				toObj.isBoxChecked = function() { return saveTo.isBoxCheckVal; };
				toObj.type = "checkbox";
			} else {
				toObj.checkThisBox(0, fromObj.isBoxChecked(0));
			}
		} else {
			toObj.value = fromObj.value;
			if (justObj) toObj.type = "text";
		}
		if (!excl.userName) toObj.userName = fromObj.userName;
		if (!excl.submitName) toObj.submitName = fromObj.submitName;
		if (!excl.readonly) toObj.readonly = fromObj.readonly;
		if (fromObj.type == "text" && !excl.noCalc && !justObj) {
			toObj.setAction("Calculate", toObj.submitName);
		}
	}

	// If swapping the fields, first save the fldTo attributes to a separate object
	if (swap) {
		var saveTo = {};
		copy(fldTo, saveTo, true);
	}

	// Apply the attributes to the fldTo
	copy(fldFrom, fldTo);

	// If swapping the fields, now apply the fldTo attributes to the fldFrom from the object
	if (swap) copy(saveTo, fldFrom);
}

// a function to get the different versions of names used
function GetFeatureType(type) {
	var theReturn = "classes";
	switch (type.toLowerCase()) {
		case "classes":
		case "class":
			theReturn = "classes";
			break;
		case "backgrounds":
		case "background":
			theReturn = "background";
			break;
		case "races":
		case "race":
			theReturn = "race";
			break;
		case "feats":
		case "feat":
			theReturn = "feats";
			break;
		case "magicitems":
		case "magicitem":
		case "magic item":
		case "magic items":
		case "items":
		case "item":
			theReturn = "items";
			break;
		case "magic":
			theReturn = "magic";
			break;
	};
	return theReturn;
}

/*	---- ApplyFeatureAttributes ----
	A function to handle all the common attributes a feature can have
	Input:
		type - the type of thing being processed
			STRING "class", "race", "feat", or "item"
		fObjName - the object name; array only for class/race with features
			if type="feat" or type="item":
				STRING
			if type="class" or type="race":
				ARRAY [STRING: class/race-name, STRING: feature-name]
				// for a race, if the feature-name is also the race-name, the parent race object will be used
		lvlA - old and new level and a true/false to force updating regardless of old-level
			ARRAY [INTEGER: old-level, INTEGER: new-level, BOOLEAN: force-apply]
		choiceA - child object names of overriding choice
			ARRAY [STRING: old-choice, STRING: new-choice, STRING: "only","change"]
			// if 'only-choice' is set to true, it is viewed as an extra-choice and just the child features will be used (e.g. Warlock Invocations)
		forceNonCurrent - the parent object name if the sheet is to use the original list object and not the CurrentXXX (CurrentRace, CurrentClasses)
			STRING
	Examples:
		ApplyFeatureAttributes("feat", "grappler", [0,1,false], false, false);
		ApplyFeatureAttributes("class", ["warlock","pact boon"], [4,4,true], ["pact of the blade","pact of the chain","change"], false); // change from Pact of the Blade to Pact of the Chain
		ApplyFeatureAttributes("class", ["warlock","eldritch invocations"], [0,4,true], ["","devil's sight","only"], false); // add Devil's Sight
		ApplyFeatureAttributes("class", ["warlock","eldritch invocations"], [15,0,true], ["devil's sight","","only"], false); // remove Devil's Sight
*/
function ApplyFeatureAttributes(type, fObjName, lvlA, choiceA, forceNonCurrent) {
	if (!IsNotReset) return; //stop this function on a reset

	// validate input
	if (!lvlA) lvlA = [0,1,false];
	if (!choiceA) choiceA = ["","",false];
	type = type.toLowerCase();
	// base variables
	var FeaChoice = "", FeaOldChoice = "", tipNmExtra = "";
	var aParent = fObjName;
	var lvlH = Math.max(lvlA[0], lvlA[1]), lvlL = Math.min(lvlA[0], lvlA[1]);
	var defaultUnits = What("Unit System") === "imperial";
	var choiceLimFeaTooltip;

	// the function to run an eval string/function
	var runEval = function(evalThing, attributeName, ignoreUnits) {
		if (!evalThing) return;
		try {
			var convertUnits = false;
			if (typeof evalThing == 'string') {
				var convertUnits = !defaultUnits && !ignoreUnits && !(/ConvertTo(Metric|Imperial)/).test(evalThing);
				if (convertUnits) evalThing = ConvertToMetric(evalThing, 0.5);
				eval(evalThing);
			} else if (typeof evalThing == 'function') {
				evalThing(lvlA, choiceA);
			}
		} catch (error) {
			// the error could be caused by the ConvertToMetric function, so try it without to see if that works
			if (convertUnits) {
				runEval(evalThing, attributeName, true);
				return;
			}
			var eText = "The " + attributeName + " from '" + fObjName + (aParent ? "' of the '" + aParent : "") + "' " + type + " produced an error! Please contact the author of the feature to correct this issue:\n " + error + "\n ";
			for (var e in error) eText += e + ": " + error[e] + ";\n ";
			console.println(eText);
			console.show();
		}
	}

	// the function to run all regular level-independent attributes
	// addIt = true to add things and addIt = false to remove things
	var useAttr = function(uObj, addIt, skipEval, objNm) {
		var uniqueObjNm = objNm == undefined ? fObjName : fObjName + objNm; // has to be unique
		var tipNm = displName;
		var useSpCasting = objNm && (type === "feat" || type === "magic item") ? objNm : aParent;
		if (cnt > 1) {
			tipNm += " (" + cnt + ")";
			if (cntCh > 1) uniqueObjNm += " (" + cntCh + ")";
		}
		if (!uObj.name || displName !== uObj.name) {
			if (type === "feat" || type === "magic item") {
				if (uObj.name) {
					tipNm = uObj.name;
				} else if (objNm && fObj.choices) {
					for (var j = 0; j < fObj.choices.length; j++) {
						if (fObj.choices[j].toLowerCase() == objNm) {
							tipNm = displName + " [" + fObj.choices[j] + "]";
							break;
						}
					}
				}
				if (cntCh > 1) tipNm += " (" + cntCh + ")";
				if (addIt) choiceLimFeaTooltip = tipNm;
			} else if (uObj.name) {
				tipNm = displName + ": " + uObj.name;
			}
		}
		var tipNmF = tipNm + (tipNmExtra ? " " + tipNmExtra : "");

		// we should add the options for weapons/armours/ammos before adding the item itself
		// but we should be removing them only after removing the item itself
		var addListOptions = function() {
			if (uObj.armorOptions) processArmorOptions(addIt, tipNm, uObj.armorOptions, type === "magic item");
			if (uObj.ammoOptions) processAmmoOptions(addIt, tipNm, uObj.ammoOptions, type === "magic item");
			if (uObj.weaponOptions) processWeaponOptions(addIt, tipNm, uObj.weaponOptions, type === "magic item");
		}

		// run eval or removeeval first
		var evalType = addIt ? "eval" : "removeeval";
		if (!skipEval && uObj[evalType]) runEval(uObj[evalType], evalType);

		if (uObj.calcChanges) addEvals(uObj.calcChanges, tipNmF, addIt);
		if (uObj.savetxt) SetProf("savetxt", addIt, uObj.savetxt, tipNmF);
		if (uObj.speed) SetProf("speed", addIt, uObj.speed, tipNmF);
		if (uObj.addMod) processMods(addIt, tipNmF, uObj.addMod);
		if (uObj.saves) processSaves(addIt, tipNmF, uObj.saves);
		if (uObj.toolProfs) processTools(addIt, tipNmF, uObj.toolProfs);
		if (uObj.languageProfs) processLanguages(addIt, tipNmF, uObj.languageProfs);
		if (uObj.vision) processVision(addIt, tipNmF, uObj.vision);
		if (uObj.dmgres) processResistance(addIt, tipNmF, uObj.dmgres);
		if (uObj.action) processActions(addIt, tipNmF, uObj.action, uObj.limfeaname ? uObj.limfeaname : uObj.name);
		if (uObj.extraLimitedFeatures) processExtraLimitedFeatures(addIt, tipNmF, uObj.extraLimitedFeatures);
		if (uObj.extraAC) processExtraAC(addIt, tipNmF, uObj.extraAC, uObj.name);
		if (uObj.toNotesPage) processToNotesPage(addIt, uObj.toNotesPage, type, uObj, fObj, [tipNm, displName, fObjName, aParent]);
		if (uObj.carryingCapacity) SetProf("carryingcapacity", addIt, uObj.carryingCapacity, tipNmF);
		if (uObj.advantages) processAdvantages(addIt, tipNmF, uObj.advantages);

		// --- backwards compatibility --- //
		var abiScoresTxt = uObj.scorestxt ? uObj.scorestxt : uObj.improvements ? uObj.improvements : false;
		if (uObj.scores || abiScoresTxt) processStats(addIt, type, tipNm, uObj.scores, abiScoresTxt, false, uObj.scoresMaximum);
		if (uObj.scoresOverride) processStats(addIt, type, tipNm, uObj.scoresOverride, abiScoresTxt, "overrides");
		if (uObj.scoresMaximum) processStats(addIt, type, tipNm, uObj.scoresMaximum, abiScoresTxt, "maximums");

		// spellcasting
		if (uObj.spellcastingBonus) processSpBonus(addIt, uniqueObjNm, uObj.spellcastingBonus, type, aParent, objNm);
		if (CurrentSpells[useSpCasting] && (uObj.spellFirstColTitle || uObj.spellcastingExtra || uObj.spellChanges)) {
			CurrentUpdates.types.push("spells");
			if (uObj.spellFirstColTitle) CurrentSpells[useSpCasting].firstCol = addIt ? uObj.spellFirstColTitle : false;
			if (uObj.spellcastingExtra) CurrentSpells[useSpCasting].extra = addIt ? uObj.spellcastingExtra : false;
			if (uObj.spellChanges) processSpChanges(addIt, tipNmF, uObj.spellChanges, useSpCasting);
		}

		if (addIt) addListOptions(); // add weapon/armour/ammo option(s)

		// --- backwards compatibility --- //
		// armor and weapon proficiencies
		var weaponProf = uObj.weaponProfs ? uObj.weaponProfs : (/^(class|feat)$/).test(type) && uObj.weapons ? uObj.weapons : uObj.weaponprofs ? uObj.weaponprofs : false;
		if (weaponProf) processWeaponProfs(addIt, tipNmF, weaponProf);
		var armorProf = uObj.armorProfs ? uObj.armorProfs : uObj.armor ? uObj.armor : false;
		if (armorProf) processArmourProfs(addIt, tipNmF, armorProf);

		// --- backwards compatibility --- //
		// armor, shield, and weapon additions
		var aWeaponsAdd = uObj.weaponsAdd ? uObj.weaponsAdd : type == "race" && uObj.weapons ? uObj.weapons : false;
		if (aWeaponsAdd) processAddWeapons(addIt, aWeaponsAdd);
		var anArmorAdd = uObj.armorAdd ? uObj.armorAdd : uObj.addarmor ? uObj.addarmor : false;
		if (anArmorAdd) processAddArmour(addIt, anArmorAdd);
		if (uObj.shieldAdd) processAddShield(addIt, uObj.shieldAdd, uObj.weight);

		// --- backwards compatibility --- //
		// skills additions
		var skillsTxt = uObj.skillstxt ? uObj.skillstxt : uObj.skills && type == "feat" && !isArray(uObj.skills) ? uObj.skills : false;
		if (skillsTxt) skillsTxt = skillsTxt.replace(/^( |\n)*.*: |\;$|\.$/g, '');
		var skills = uObj.skills && (type != "feat" || (type == "feat" && isArray(uObj.skills))) ? uObj.skills : false;
		if (skills || skillsTxt) processSkills(addIt, tipNmF, skills, skillsTxt);

		if (!addIt) addListOptions(); // remove weapon/armour/ammo option(s)
	};

	// set the main variables, determined by type
	switch (GetFeatureType(type)) {
		case "classes":
			type = "class";
			aParent = fObjName[0];
			fObjName = fObjName[1];
			var fObj = forceNonCurrent && ClassList[aParent].features[fObjName] && !choiceA[0] ? ClassList[aParent].features[fObjName] : CurrentClasses[aParent].features[fObjName];
			var displName = fObjName.indexOf("subclassfeature") !== -1 ? CurrentClasses[aParent].fullname : CurrentClasses[aParent].name;

			// --- backwards compatibility --- //
			// also create some variables that (old) eval scripts tend to use
			var oldClassLvl = {}; oldClassLvl[aParent] = lvlA[0];
			var newClassLvl = {}; newClassLvl[aParent] = lvlA[1];
			var ClassLevelUp = {}; ClassLevelUp[aParent] = [lvlA[1] >= lvlA[0], lvlL, lvlH];

			break;
		case "race":
			type = "race";
			aParent = fObjName[0];
			fObjName = fObjName[1];
			var fObj = aParent == fObjName && !CurrentRace.features[fObjName] ?
					(forceNonCurrent ? RaceList[aParent] : CurrentRace) :
				forceNonCurrent && RaceList[aParent].features[fObjName] && !choiceA[0] ?
					RaceList[aParent].features[fObjName] : CurrentRace.features[fObjName];
			var displName = CurrentRace.name;
			break;
		case "background":
			type = "background";
			var fObj = forceNonCurrent && BackgroundList[fObjName] ? BackgroundList[fObjName] : CurrentBackground;
			var displName = fObj.name;
			break;
		case "feats":
			type = "feat";
			var fObj = FeatsList[fObjName];
			var displName = fObj.name;
			tipNmExtra = "(feat)";
			break;
		case "items":
			type = "magic item";
			var fObj = MagicItemsList[fObjName];
			var displName = fObj.name;
			tipNmExtra = "(magic item)";
			break;
	};

	if (!fObj) {
		console.println("The '" + fObjName + (aParent ? "' of the '" + aParent : "") + "' " + type + " could not be found! Please contact the author of the feature to correct this issue.");
		console.show();
		return false;
	};

	if (fObj.minlevel && fObj.minlevel > lvlH) return false; // no reason to continue with this function

	// Are we to do anything with the feature?
	var CheckLVL = lvlA[2] ? true : fObj.minlevel ? fObj.minlevel <= lvlH && fObj.minlevel > lvlL : lvlL == 0;
	// Add (true) or remove (false) the feature's attributes?
	var AddFea = fObj.minlevel ? fObj.minlevel <= lvlA[1] : 0 < lvlA[1];

	// Get the choice, if any choices exist, it was selected in the past, and not entered into this function
	if (!choiceA[1] && !choiceA[2] && fObj.choices) {
		choiceA[1] = GetFeatureChoice(type, aParent, aParent !== fObjName ? fObjName : "", false);
		if (choiceA[1] && !choiceA[0]) choiceA[0] = choiceA[1];
	}

	// --- backwards compatibility --- //
	// First do the eval attribute of the main object, as it might change things for the choice
	var skipMainEval = false;
 	if (!choiceA[2] && CheckLVL && AddFea && fObj.eval && (typeof fObj.eval == "string") && (/Fea(Old)?Choice/).test(fObj.eval)) {
		runEval(fObj.eval, "eval");
		skipMainEval = true;
		// redo the choice array, as the eval might have changed it
		if (FeaOldChoice) choiceA[0] = FeaOldChoice;
		if (FeaChoice) choiceA[1] = FeaChoice;
	}

	// set the choice objects, if any
	var cOldObj = choiceA[0] && fObj[choiceA[0]] ? fObj[choiceA[0]] : false;
	var cNewObj = choiceA[1] && fObj[choiceA[1]] ? fObj[choiceA[1]] : false;
	var cJustChange = (/change|update/).test(choiceA[2]) && cOldObj && cNewObj && choiceA[0] != choiceA[1];
	var cOnly = ((AddFea && cNewObj) || (!AddFea && cOldObj)) && (/only/).test(choiceA[2]);

	// Now if there was a choice, and this is a feat or an item, check for duplicates
	var cnt = 0, cntCh = 0;
	if (type === "feat" || type === "magic item") {
		var checkObj = type === "feat" ? CurrentFeats : CurrentMagicItems;
		for (var i = 0; i < checkObj.known.length; i++) {
			if (checkObj.known[i] == fObjName) {
				cnt++;
				if ((choiceA[0] && checkObj.choices[i] == choiceA[0]) || (choiceA[1] && checkObj.choices[i] == choiceA[1])) cntCh++;
			}
		}
	}

	// get the level-dependent attributes for the current and old levels
	var Fea = GetLevelFeatures(fObj, lvlA[1], cNewObj ? choiceA[1] : false, lvlA[0], cOldObj ? choiceA[0] : cOnly ? choiceA[1] : false, cOnly);
	// add some of the current variables to this object, so it is given in the return
	Fea.CheckLVL = CheckLVL;
	Fea.AddFea = AddFea;
	Fea.Choice = choiceA[1];
	Fea.ChoiceOld = choiceA[0];

	// now do all the level-independent attributes, only if this is mandated by the level change
	if (CheckLVL) {
		// do the main object if not only interested in the choice, but without the eval as we just did that already
		if (!choiceA[2]) useAttr(fObj, AddFea, skipMainEval);
		// if we are are changing the choice or removing the feature, now remove the old choice
		//if (cJustChange || (!AddFea && cOldObj)) {
		if (cOldObj && (cJustChange || !AddFea)) {
			SetFeatureChoice(type, aParent, aParent !== fObjName ? fObjName : "", false, cOnly ? choiceA[0] : "");
			useAttr(cOldObj, false, false, choiceA[0]);
		}
		// if we are changing the choice or adding the feature, now add the new choice
		//if (cJustChange || cOnly || (AddFea && cNewObj)) {
		if (cNewObj && AddFea) {
			SetFeatureChoice(type, aParent, aParent !== fObjName ? fObjName : "", AddFea ? choiceA[1] : "", cOnly ? choiceA[1] : "");
			useAttr(cNewObj, true, false, choiceA[1]);
		}
	}
	// next do the level-dependent attributes, if any of them changed or we are supposed to do them
	if ((CheckLVL || Fea.changed) && (Fea.UseOld || Fea.UseCalcOld || Fea.Use || Fea.UseCalc)) {
		// remove the limited feature entry if it is no longer applicable
		if (lvlA[0] && (!AddFea || ((Fea.UseOld || Fea.UseCalcOld) && (Fea.UseName !== Fea.UseNameOld || (!Fea.Use && !Fea.UseCalc) || (/unlimited|\u221E/i).test(Fea.Use))))) {
			RemoveFeature(Fea.UseNameOld ? Fea.UseNameOld : Fea.UseName, lvlA[1] === 0 ? "" : Fea.UseOld, "", "", "", "", Fea.UseCalcOld);
			Fea.UseOld = 0;
		}
		// add the limited feature entry if it changed or added for the first time
		if (AddFea && (Fea.UseCalc || Fea.Use) && !(/unlimited|\u221E/i).test(Fea.Use)) {
			var tooltipName = choiceLimFeaTooltip ? choiceLimFeaTooltip : displName + (fObj.tooltip ? fObj.tooltip : displName !== fObj.name ? ": " + fObj.name : "");
			AddFeature(Fea.UseName, Fea.Use, Fea.Add ? " (" + Fea.Add + ")" : "", Fea.Recov, tooltipName, Fea.UseOld, Fea.UseCalc);
		}
	}

	// changeeval always at the end and regardless of AddFea or CheckLVL
	if (!cOnly && fObj.changeeval) runEval(fObj.changeeval, 'changeeval');
	if (cOldObj && cOldObj.changeeval) runEval(cOldObj.changeeval, 'changeeval');
	if (cNewObj && cNewObj.changeeval) runEval(cNewObj.changeeval, 'changeeval');

	// if this is a class feature (and not doing an extrachoice), always check if we need to update the dependencies
	if (type == "class" && !cOnly) {
		if (choiceA[1] && fObj.choiceDependencies) processClassFeatureChoiceDependencies(lvlA, aParent, fObjName, choiceA[1]);
		if (fObj.autoSelectExtrachoices) processClassFeatureExtraChoiceDependencies(lvlA, aParent, fObjName, fObj);
	}

	// return the level-dependent attributes so it doesn't have to be queried again
	return Fea;
}

// a function to apply the first-level attributes of a class object
// AddRemove - can be boolean (true = add all feature, false = remove all features)
//		or can be an Array of [oldsubclass, newsubclass]
function ApplyClassBaseAttributes(AddRemove, aClass, primaryClass) {
	// declare some variables
	var fObj = CurrentClasses[aClass];
	var n = primaryClass ? 0 : 1; // for backwards compatibility
	var nAttr = primaryClass ? "primary" : "secondary";

	// a way to see if we should process the attribute or not
	var checkIfIn = function(nObj, testObj, attrA, noN) {
		attrA[1] = attrA[1] ? attrA[1] : "nonExistentAttributeName";
		if (!nObj[attrA[0]] && !nObj[attrA[1]]) {
			// if the first object doesn't have either attribute, just stop
			return [false];
		}
		var useAttr = nObj[attrA[0]] ? attrA[0] : attrA[1];
		var subAttr = noN ? 0 : isArray(nObj[useAttr]) ? n : nAttr;
		if (!noN && !nObj[useAttr][subAttr]) {
			// the first object has an attribute, but not the right sub-attribute, so stop
			return [false];
		} else if (!testObj) {
			// there is no object to test against, so continue with the first object
			return [true, useAttr, subAttr];
		}
		var useAttr2 = testObj[attrA[0]] ? attrA[0] : testObj[attrA[1]] ? attrA[1] : false;
		return !useAttr2 || !testObj[useAttr2][noN ? 0 : isArray(testObj[useAttr2]) ? n : nAttr] ? [false] : [true, useAttr, subAttr];
	}

	// loop through the attributes and apply them
	var processAttributes = function (uObj, addIt, tipNmF, ifInObj) {
		// saves, if primary class
		if (primaryClass && checkIfIn(uObj, ifInObj, ['saves'], true)[0]) processSaves(addIt, tipNmF, uObj.saves);

		// skills
		var doSkills = checkIfIn(uObj, ifInObj, ['skills', 'skillstxt']);
		if (doSkills[0]) {
			var oSkills = false;
			var oSkillsTxt = false;
			if (doSkills[1] === "skillstxt") {
				// no 'skills' attribute, only 'skillstxt'
				oSkillsTxt = uObj.skillstxt[doSkills[2]];
			} else if (doSkills[1] === "skills" && uObj.skillstxt) {
				// both 'skills' and 'skillstxt' attributes
				oSkills = uObj.skills[doSkills[2]];
				oSkillsTxt = isArray(uObj.skillstxt) ? uObj.skillstxt[n] : uObj.skillstxt[nAttr];
			} else if (doSkills[2] == n && !isArray(uObj.skills[n]) && SkillsList.abbreviations.indexOf(uObj.skills[n]) == -1 && SkillsList.names.indexOf(uObj.skills[n]) == -1) {
				// --- backwards compatibility --- //
				// the class has skillstxt as skills attribute (pre v13)
				oSkillsTxt = uObj.skills[n].replace(/^( |\n)*.*: |\;$|\.$/g, '');
			} else {
				// no 'skillstxt' attribute, only 'skills'
				oSkills = uObj.skills[doSkills[2]];
			}
			processSkills(addIt, tipNmF, oSkills, oSkillsTxt);
		}

		// weapon proficiencies ('weapons' attribute for backwards compatibility)
		var doWeapons = checkIfIn(uObj, ifInObj, ['weaponProfs', 'weapons']);
		if (doWeapons[0]) processWeaponProfs(addIt, tipNmF, uObj[doWeapons[1]][doWeapons[2]]);

		// armour proficiencies ('armor' attribute for backwards compatibility)
		var doArmour = checkIfIn(uObj, ifInObj, ['armorProfs', 'armor']);
		if (doArmour[0]) processArmourProfs(addIt, tipNmF, uObj[doArmour[1]][doArmour[2]]);

		// tool proficiencies
		var doTools = checkIfIn(uObj, ifInObj, ['toolProfs']);
		if (doTools[0]) processTools(addIt, tipNmF, uObj.toolProfs[doTools[2]]);

		// spellcasting extra array
		if (CurrentSpells[aClass] && checkIfIn(uObj, ifInObj, ['spellcastingExtra'], true)[0]) {
			CurrentSpells[aClass].extra = !addIt ? "" : uObj.spellcastingExtra;
			CurrentUpdates.types.push("spells");
		}
	}

	if (!isArray(AddRemove)) {
		// just do the AddRemove for the object
		processAttributes(fObj, AddRemove, fObj.name, false);
	} else if (!AddRemove[0] && AddRemove[1]) {
		// adding a subclass while previously none was there
		var parentCl = fObj;
		var newSubCl = ClassSubList[AddRemove[1]];
		// first remove everything that is in class and also in the subclass
		processAttributes(parentCl, false, parentCl.name, newSubCl);
		// then add everything from the subclass
		processAttributes(newSubCl, true, newSubCl.subname);
	} else if (AddRemove[0] && !AddRemove[1]) {
		// removing a subclass, going back to just the class
		var oldSubCl = ClassSubList[AddRemove[0]];
		var parentCl = fObj;
		// first remove everything that is in the subclass
		processAttributes(oldSubCl, false, oldSubCl.subname);
		// then add everything from the class that is also in the subclass
		processAttributes(parentCl, true, parentCl.name, oldSubCl);
	} else if (AddRemove[0] && AddRemove[1]) {
		// changing subclasses
		var parentCl = fObj;
		var oldSubCl = ClassSubList[AddRemove[0]];
		var newSubCl = ClassSubList[AddRemove[1]];
		// first remove everything that is in old subclass
		processAttributes(oldSubCl, false, oldSubCl.subname);
		// then add everything from the class that is also in old subclass
		processAttributes(parentCl, true, parentCl.name, oldSubCl);
		// next remove everything that is in class and also in new subclass
		processAttributes(parentCl, false, parentCl.name, newSubCl);
		// lastly add everything from new subclass
		processAttributes(newSubCl, true, newSubCl.subname);
	}
}

// a function to set the choice for something (choice = objectname) or remove it (choice = false)
// put the objectname in extra for extrachoices (both when adding and when removing)
function SetFeatureChoice(type, objNm, feaNm, choice, extra) {
	choice = choice ? choice.toLowerCase() : false;
	extra = extra ? extra.toLowerCase() : false;
	type = GetFeatureType(type);
	if (type == "items" || type == "feats") return;
	if (!CurrentFeatureChoices[type]) CurrentFeatureChoices[type] = {};
	if (!choice) { // remove the choice
		if (!CurrentFeatureChoices[type][objNm]) return;
		var lookin = feaNm ? CurrentFeatureChoices[type][objNm][feaNm] : CurrentFeatureChoices[type][objNm];
		if (!lookin) return;
		if (extra) {
			if (lookin.extrachoices) {
				lookin.extrachoices.splice(lookin.extrachoices.indexOf(extra), 1);
				if (lookin.extrachoices.length == 0) delete lookin.extrachoices;
			}
		} else {
			if (lookin.choice) delete lookin.choice;
		}
		CurrentFeatureChoices = CleanObject(CurrentFeatureChoices); // remove any remaining empty objects
	} else { // add the choice
		if (!CurrentFeatureChoices[type][objNm]) CurrentFeatureChoices[type][objNm] = {};
		if (feaNm && !CurrentFeatureChoices[type][objNm][feaNm]) CurrentFeatureChoices[type][objNm][feaNm] = {};
		var touse = feaNm ? CurrentFeatureChoices[type][objNm][feaNm] : CurrentFeatureChoices[type][objNm];
		if (extra) {
			if (!touse.extrachoices) touse.extrachoices = [];
			if (touse.extrachoices.indexOf(extra) == -1) touse.extrachoices.push(extra);
		} else {
			touse.choice = choice;
		}
	}
	SetStringifieds("choices");
}

// a function to return the feature choice(s); if extra==true, returns array
function GetFeatureChoice(type, objNm, feaNm, extra) {
	var theReturn = extra ? [] : "";
	type = GetFeatureType(type);
	if (CurrentFeatureChoices[type] && CurrentFeatureChoices[type][objNm] && (!feaNm || CurrentFeatureChoices[type][objNm][feaNm])) {
		var useObj = feaNm ? CurrentFeatureChoices[type][objNm][feaNm] : CurrentFeatureChoices[type][objNm];
		var foundSel = extra ? useObj.extrachoices : useObj.choice;
		if (foundSel) theReturn = foundSel.slice();
	}
	return theReturn;
}

// a function to get a string of class feature choices just like how they use to be prior to v13 with the "Class Feature Remember" field
function classFeaChoiceBackwardsComp() {
	var chc = CurrentFeatureChoices.classes;
	if (!chc) return "";
	var returnStr = "";
	for (var aClass in chc) {
		for (var aFea in chc[aClass]) {
			var fea = chc[aClass][aFea];
			if (fea.choice) returnStr += [aClass, aFea, fea.choice].toString();
		}
	}
	return returnStr;
}

// a function to create the CurrentSpells global variable entry
function CreateCurrentSpellsEntry(type, fObjName, aChoice) {
	type = GetFeatureType(type);
	var fObjP = false;
	var setCSobj = function(oName) {
		if (!CurrentSpells[oName]) {
			CurrentSpells[oName] = {bonus : {}};
			CurrentUpdates.types.push("spells");
		}
		return CurrentSpells[oName];
	};
	switch (type.toLowerCase()) {
		case "classes":
			var fObj = CurrentClasses[fObjName];
			var aClass = classes.known[fObjName].name;
			var aSubClass = classes.known[fObjName].subclass;
			var sObj = setCSobj(fObjName);
			sObj.name = fObj.fullname;
			sObj.shortname = ClassList[aClass].spellcastingFactor ? ClassList[aClass].name : ClassSubList[aSubClass].fullname ? ClassSubList[aSubClass].fullname : ClassSubList[aSubClass].subname;
			sObj.level = classes.known[fObjName].level;
			if (sObj.typeSp == undefined) sObj.typeSp = "";
			sObj.refType = "class";
			break;
		case "race":
			var fObj = CurrentRace;
			var sObj = setCSobj(CurrentRace.known);
			sObj.name = fObj.name;
			sObj.typeSp = "race";
			sObj.level = fObj.level;
			sObj.refType = "race";
			break;
		case "feats":
			var fObj = FeatsList[fObjName];
			if (aChoice && fObj[aChoice]) {
				fObj = FeatsList[fObjName][aChoice];
				fObjP = FeatsList[fObjName];
				fObjName = aChoice;
			}
			var sObj = setCSobj(fObjName);
			sObj.name = fObj.name + " (feat)";
			sObj.typeSp = "feat";
			sObj.refType = "feat";
			break;
		case "items":
			var fObj = MagicItemsList[fObjName];
			if (aChoice && fObj[aChoice]) {
				fObj = MagicItemsList[fObjName][aChoice];
				fObjP = MagicItemsList[fObjName];
				fObjName = aChoice;
			}
			var sObj = setCSobj(fObjName);
			sObj.name = fObj.name + " (item)";
			sObj.typeSp = "item";
			sObj.refType = "item";
			break;
		default:
			return false;
	};
	if (aChoice && (type == "items" || type == "feats") && !fObj.name && fObjP && fObjP.choices) {
		for (var j = 0; j < fObjP.choices.length; j++) {
			if (fObjP.choices[j].toLowerCase() == aChoice) {
				sObj.name = fObjP.name + " [" + fObjP.choices[j] + "]" + " (item)";
				break;
			}
		}
	}
	if (!sObj.ability) sObj.ability = fObj.spellcastingAbility ? fObj.spellcastingAbility : fObj.abilitySave ? fObj.abilitySave : 0;
	if (!sObj.fixedDC && fObj.fixedDC) sObj.fixedDC = Number(fObj.fixedDC);
	if (!sObj.fixedSpAttack && fObj.fixedSpAttack) sObj.fixedSpAttack = Number(fObj.fixedSpAttack);
	if (fObjP) {
		if (!sObj.ability) sObj.ability = fObjP.spellcastingAbility ? fObjP.spellcastingAbility : fObjP.abilitySave ? fObjP.abilitySave : 0;
		if (!sObj.fixedDC && fObjP.fixedDC) sObj.fixedDC = Number(fObjP.fixedDC);
		if (!sObj.fixedSpAttack && fObjP.fixedSpAttack) sObj.fixedSpAttack = Number(fObjP.fixedSpAttack);
	}
	if (!sObj.abilityToUse) sObj.abilityToUse = getSpellcastingAbility(fObjName);
	return sObj;
}

// process a spellcastingBonus feature
function processSpBonus(AddRemove, srcNm, spBon, type, parentName, choice) {
	type = GetFeatureType(type);
	var useSpName = choice && (type === "feats" || type === "items") ? choice : parentName;
	if (!AddRemove && !CurrentSpells[useSpName]) return; // nothing to remove
	// create the spellcasting object if it doesn't yet exist
	var sObj = CurrentSpells[useSpName] ? CurrentSpells[useSpName] : CreateCurrentSpellsEntry(type, parentName, choice);
	// do something with the spellcastingBonus object
	if (!AddRemove) { // removing the entry
		delete sObj.bonus[srcNm];
		// now see if the bonus object is empty and if so, delete the whole entry
		if (!sObj.factor && !sObj.list && ObjLength(sObj.bonus) == 0) delete CurrentSpells[useSpName];
	} else { // adding the entry
		sObj.bonus[srcNm] = spBon;
		// see if this wants to change the spellcasting ability
		var spFeatItemLvl = false;
		var spAbility = !isArray(spBon) ? spBon.spellcastingAbility : false;
		var spFixedDC = !isArray(spBon) ? spBon.fixedDC : false;
		var spFixedSpAttack = !isArray(spBon) ? spBon.fixedSpAttack : false;
		if (isArray(spBon)) {
			for (var i = 0; i < spBon.length; i++) {
				if (!spFeatItemLvl && spBon[i].times && isArray(spBon[i].times)) spFeatItemLvl = true;
				if (spBon[i].spellcastingAbility) spAbility = spBon[i].spellcastingAbility;
				if (spBon[i].fixedDC) spFixedDC = spBon[i].fixedDC;
				if (spBon[i].fixedSpAttack) spFixedSpAttack = spBon[i].fixedSpAttack;
			}
		}
		if (spAbility) sObj.ability = spAbility;
		if (spFixedDC) sObj.fixedDC = spFixedDC;
		if (spFixedSpAttack) sObj.fixedSpAttack = spFixedSpAttack;
		// if concerning a feat or item, set the level only if the spellcastingBonus needs it
		if ((/feat|item/i).test(sObj.typeSp) && spFeatItemLvl) sObj.level = Math.max(Number(What("Character Level")), 1);
	}
	SetStringifieds('spells');
	CurrentUpdates.types.push("spells");
}

// process the spellChanges attribute
function processSpChanges(AddRemove, srcNm, spChng, parentName) {
	var spCast = CurrentSpells[parentName];
	var changeHead = "Changes by " + srcNm;
	if (!spCast || (!AddRemove && !spCast.spellAttrOverride)) return; // nothing to do
	if (AddRemove) { // adding
		if (!spCast.spellAttrOverride) spCast.spellAttrOverride = {};
		for (var aSpell in spChng) {
			if (!spCast.spellAttrOverride[aSpell]) spCast.spellAttrOverride[aSpell] = { changesObj : {} };
			var spObj = spCast.spellAttrOverride[aSpell];
			if (spChng[aSpell].changes) spObj.changesObj[changeHead] = "\n - " + spChng[aSpell].changes;
			for (var key in spChng[aSpell]) {
				if (key == "changes") continue;
				spObj[key] = spChng[aSpell][key];
			}
		}
	} else { // removing
		for (var aSpell in spChng) {
			var spObj = spCast.spellAttrOverride[aSpell];
			if (!spObj || spObj.changesBy.indexOf(srcNm) == -1) continue;
			for (var key in spChng[aSpell]) {
				if (key == "changes") continue;
				delete spObj[key];
			}
			delete spObj.changesObj[changeHead];
			// now maybe delete this spellAttrOverride entry if its changesObj is empty
			if (!ObjLength(spObj.changesObj)) delete spCast.spellAttrOverride;
		}
		// now maybe delete the whole spellAttrOverride if it is empty
		if (!ObjLength(spCast.spellAttrOverride)) delete spCast.spellAttrOverride[aSpell];
	}
}

// set the armour (if more AC than current armour) or remove the armour
function processAddArmour(AddRemove, armour) {
	if (!armour || typeof armour != "string") return;
	if (!AddRemove) { // remove
		RemoveArmor(armour);
	} else { // add
		if (!ParseArmor(armour)) return;
		var remCurArm = What("AC Armor Description");
		var remAC = Number(What("AC"));
		Value("AC Armor Description", armour);
		if (remCurArm && remAC) { // there was a previous armor, so check if this new armor is better or not
			// calculate all the field values, or the AC field will not be updated
			var isStoppedCalc = calcStartSet != false;
			if (isStoppedCalc) calcCont(true);
			if (remAC > Number(What("AC"))) {
				Value("AC Armor Description", remCurArm);
			} else if (isStoppedCalc) {
				calcStop();
			}
		}
	}
}

// set the shield (if more AC than current shield) or remove the shield
function processAddShield(AddRemove, shield, weight) {
	if (!shield) return;
	if (isArray(shield)) {
		if (!shield.length) return;
		if ((shield[2] == undefined || isNaN(shield[2])) && weight !== undefined && !isNaN(weight)) shield[2] = weight;
	} else {
		var shield = [shield];
		if (weight !== undefined && !isNaN(weight)) shield[2] = weight;
	}

	// grab current fields
	var shieldFld = What("AC Shield Bonus Description");
	if (AddRemove) { // add
		// see what the new AC will be
		var newACdefined = shield[1] !== undefined && !isNaN(shield[1]) ? shield[1] : undefined;
		if (newACdefined !== undefined) {
			var newAC = newACdefined;
		} else {
			var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
			var newAC = 2 + (magicRegex.test(shield[0]) ? parseFloat(shield[0].match(magicRegex)[1]) : 0);
		}
		if (newAC < What("AC Shield Bonus")) return; // do not continue if new AC would not be equal or more

		// set the value of the fields
		Value("AC Shield Bonus Description", shield[0]);
		if (newACdefined !== undefined) Value("AC Shield Bonus", shield[1]);
		if (shield[2] !== undefined && !isNaN(shield[2])) Value("AC Shield Weight", shield[2]);

	} else if (CurrentShield.field.indexOf(shield[0].toLowerCase()) !== -1) { // remove
		Value("AC Shield Bonus Description", "");
	}
}

// set attacks or remove the attacks
function processAddWeapons(AddRemove, weapons) {
	if (!weapons) return;
	if (!isArray(weapons)) weapons = [weapons];
	for (var w = 0; w < weapons.length; w++) {
		tDoc[(AddRemove ? "Add" : "Remove") + "Weapon"](weapons[w]);
	}
}

// set or remove armour options
function processArmorOptions(AddRemove, srcNm, itemArr, magical) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];

	// if adding things but the variable doesn't exist
	if (AddRemove && !CurrentVars.extraArmour) CurrentVars.extraArmour = {};

	srcNm = srcNm.toLowerCase();
	for (var i = 0; i < itemArr.length; i++) {
		var newName = srcNm + "-" + itemArr[i].name.toLowerCase();
		if (AddRemove) {
			itemArr[i].list = "startlist";
			if (magical) itemArr[i].isMagicArmor = true;
			CurrentVars.extraArmour[newName] = itemArr[i];
			ArmourList[newName] = itemArr[i];
		} else {
			// remove the entries if they exist
			if (CurrentVars.extraArmour[newName]) delete CurrentVars.extraArmour[newName];
			if (ArmourList[newName]) delete ArmourList[newName];
		}
	}

	// if removing things and the variable is now empty
	if (!AddRemove && !ObjLength(CurrentVars.extraArmour)) delete CurrentVars.extraArmour;
	UpdateDropdown("armour"); // update the armour dropdown
	SetStringifieds("vars"); // Save the new settings to a field
}

// set or remove attack options
function processWeaponOptions(AddRemove, srcNm, itemArr, magical) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];

	// if adding things but the variable doesn't exist
	if (AddRemove && !CurrentVars.extraWeapons) CurrentVars.extraWeapons = {};

	srcNm = srcNm.toLowerCase();
	for (var i = 0; i < itemArr.length; i++) {
		var newName = srcNm + "-" + itemArr[i].name.toLowerCase();
		if (AddRemove) {
			itemArr[i].list = "startlist";
			if (magical) itemArr[i].isMagicWeapon = true;
			CurrentVars.extraWeapons[newName] = itemArr[i];
			WeaponsList[newName] = itemArr[i];
		} else {
			// remove the entries if they exist
			if (CurrentVars.extraWeapons[newName]) delete CurrentVars.extraWeapons[newName];
			if (WeaponsList[newName]) delete WeaponsList[newName];
		}
	}

	// if removing things and the variable is now empty
	if (!AddRemove && !ObjLength(CurrentVars.extraWeapons)) delete CurrentVars.extraWeapons;
	UpdateDropdown("weapons"); // update the weapons dropdown
	SetStringifieds("vars"); // Save the new settings to a field
}

// set or remove ammo options
function processAmmoOptions(AddRemove, srcNm, itemArr, magical) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];

	// if adding things but the variable doesn't exist
	if (AddRemove && !CurrentVars.extraAmmo) CurrentVars.extraAmmo = {};

	srcNm = srcNm.toLowerCase();
	for (var i = 0; i < itemArr.length; i++) {
		var newName = srcNm + "-" + itemArr[i].name.toLowerCase();
		if (AddRemove) {
			itemArr[i].list = "startlist";
			if (magical) itemArr[i].isMagicAmmo = true;
			CurrentVars.extraAmmo[newName] = itemArr[i];
			AmmoList[newName] = itemArr[i];
		} else {
			// remove the entries if they exist
			if (CurrentVars.extraAmmo[newName]) delete CurrentVars.extraAmmo[newName];
			if (AmmoList[newName]) delete AmmoList[newName];
		}
	}

	// if removing things and the variable is now empty
	if (!AddRemove && !ObjLength(CurrentVars.extraAmmo)) delete CurrentVars.extraAmmo;
	UpdateDropdown("ammo"); // update the ammunition dropdown
	SetStringifieds("vars"); // Save the new settings to a field
}

// set or remove extra limited feature options
function processExtraLimitedFeatures(AddRemove, srcNm, objArr) {
	if (!objArr) return;
	if (!isArray(objArr)) objArr = [objArr];

	for (var i = 0; i < objArr.length; i++) {
		var aObj = objArr[i];
		if (AddRemove) {
			AddFeature(aObj.name, aObj.usages ? aObj.usages : 0, aObj.additional ? " (" + aObj.additional + ")" : "", aObj.recovery ? aObj.recovery : "", srcNm, false, aObj.usagescalc);
		} else {
			RemoveFeature(aObj.name, aObj.usages ? aObj.usages : 0, "", "", "", "", aObj.usagescalc);
		}
	}
}

// add/remove a class feature text, replace the first line of it, or insert it after another
// the string is assumed to start with "\u25C6\uFEFF" (ParseClassFeature | ParseClassFeatureExtra)
// for possible values of 'act', see the switch statement
// each ...TxtA is [firstline, completetext]
function applyClassFeatureText(act, fldA, oldTxtA, newTxtA, prevTxtA) {
	if (!oldTxtA || !oldTxtA[0]) return; // no oldTxt, so we can't do anything

	// make some regex objects
	var oldFrstLnEsc = oldTxtA[0].replace(/^(\r|\n)*/, '').RegEscape();
	var oldRxHead = RegExp(oldFrstLnEsc + ".*", "i");
	var oldRx = RegExp("\\r?" + oldFrstLnEsc + "(.|\\r  )*", "i"); // everything until the first line that doesn't start with two spaces (e.g. an empty line or a new bullet point)

	// find the field we are supposed to update
	var fld = fldA[0];
	if (fldA.length > 1) {
		for (var i = 0; i < fldA.length; i++) {
			if (oldRx.test(What(fldA[i]))) {
				fld = fldA[i];
				break;
			}
		}
	}
	var fldTxt = What(fld);
	if (!fldTxt) return; // empty or non-existing field, so just stop now

	// apply the change
	switch (act) {
		case "first" : // update just the first line (usages, recovery, or additional changed)
			var changeTxt = fldTxt.replace(oldRxHead, newTxtA[0]);
			break;
		case "replace" : // replace the oldTxt with the newTxt
			var changeTxt = fldTxt.replace(oldRx, newTxtA[1]);
			break;
		case "insert" : // add the newTxt after the prevTxt
			if (!prevTxtA || !prevTxtA[0]) return; // no prevTxt, so we can't do anything
			var prevFrstLnEsc = prevTxtA[0].replace(/^(\r|\n)*/, '').RegEscape();
			var prevRx = RegExp("\\r?" + prevFrstLnEsc + "(.|\\r  )*", "i");
			var prevTxtFound = fldTxt.match(prevRx);
			var changeTxt = prevTxtFound ? fldTxt.replace(prevTxtFound[0], prevTxtFound[0] + newTxtA[1]) : fldTxt;
			break;
		case "remove" : // remove the oldTxt
			var changeTxt = fldTxt.replace(oldRx, '').replace(/^\r+/, '');
			break;
		default :
			return;
	}
	if (changeTxt != fldTxt) {
		Value(fld, changeTxt);
	} else if (act !== "insert") {
		// nothing changed, so just insert the whole feature, using this same function
		applyClassFeatureText("insert", fldA, oldTxtA, newTxtA, prevTxtA);
	}
}

// a function to recalculate the weapon entries after a change in weapon proficiencies or CurrentEvals
function UpdateSheetWeapons() {
	// some atkAdd eval might be level-dependent, so force updating the weapons when changing level and such an eval is present
	var isLvlDepAtkAdd = false;
	// iterate through all the atkAdd evals to see if any are level-dependent, but only when changing level
	if (CurrentUpdates.types.indexOf("xp") !== -1 && CurrentEvals.atkAdd) {
		for (addEval in CurrentEvals.atkAdd) {
			var evalThing = CurrentEvals.atkAdd[addEval];
			if (typeof evalThing == 'function') evalThing = evalThing.toSource();
			if ((/\.level/).test(evalThing)) {
				isLvlDepAtkAdd = true;
				break;
			}
		}
	}

	var CUflat = CurrentUpdates.types.toString();
	if (!isLvlDepAtkAdd && (!CurrentUpdates.types.length || !IsNotReset || !IsNotImport || CUflat.indexOf("attacks") == -1)) return;
	ReCalcWeapons(CurrentUpdates.types.indexOf("attacksprofs") !== -1, isLvlDepAtkAdd || CurrentUpdates.types.indexOf("attacksforce") !== -1);
}

// >>>> Changes Dialog functions <<<< \\

// a function to do all the default things after a change in level, class, race, feat, magic item, or companion
// this function is called whenever the calculations are activated again
function UpdateSheetDisplay() {
	if (!CurrentUpdates.types.length || !IsNotReset || !IsNotImport) {
		CurrentUpdates = {types : []}; // reset the CurrentUpdates variable
		return;
	}

	if (!ChangesDialogSkip) {
		var cDialogFld = What("ChangesDialogSkip.Stringified");
		ChangesDialogSkip = cDialogFld ? eval(cDialogFld) : {
			chXP : false, // experience points
			chAS : false, // ability scores
			chHP : false, // hit points
			chSP : false, // spells
			chSK : false, // skills
			chAT : false, // attack calculations
			chNO : false // notes additions
		};
		if (!cDialogFld) Value("ChangesDialogSkip.Stringified", ChangesDialogSkip.toSource());
	}

	// Show the progress dialog
	var thermoTxt = thermoM("Finalizing changes...", false);
	thermoM(2/5); // Increment the progress bar

	// initialize some variables
	var dialogParts = [];
	var autoHP;
	var CUflat = CurrentUpdates.types.toString();

	// create the dialog
	var titleTxt = "Changes Requiring Your Attention";
	var explTxt = "The things you just changed has effected the things listed below.\nNote that this dialog is just a reminder and you can find all the things listed below in their respective sections of the sheet and/or its functions.\nYou can always use the [ESC] key to close this dialog.";
	var checkboxTxt = "Don't alert me about these changes (unless there is another change I do want to be alerted about).";
	var Changes_Dialog = {
		// when starting the dialog
		initialize : function (dialog) {
			var thermoTxt = thermoM("Finalizing changes...", false);
			thermoM(2/5); // Increment the progress bar
			var toLoad = { "img1" : allIcons.automanual };
			for (var p = 0; p < dialogParts.length; p++) {
				var skType = dialogParts[p].skipType;
				toLoad[skType] = ChangesDialogSkip[skType];
			}
			dialog.load(toLoad);
		},
		// when closing the dialog, one way or another
		destroy : function (dialog) {
			Value("ChangesDialogSkip.Stringified", ChangesDialogSkip.toSource());
		},
		description : {
			name : titleTxt,
			first_tab : "CLOS",
			elements : [{
				type : "view",
				elements : [{
					type : "view", // the top row
					alignment : "align_fill",
					align_children : "align_row",
					elements : [{
						type : "image",
						item_id : "img1",
						alignment : "align_bottom",
						width : 20,
						height : 20
					}, {
						type : "static_text",
						item_id : "Hea0",
						alignment : "align_fill",
						font : "title",
						bold : true,
						height : 23,
						width : 250,
						name : titleTxt
					}]
				}, {
					type : "static_text", // explanatory text
					item_id : "txt0",
					alignment : "align_fill",
					font : "palette",
					name : explTxt,
					wrap_name : true,
					width : 500
				}, {
					type : "view",
					item_id : "sect",
					align_children : "align_left",
					elements : []
				}, {
					type : "view",
					alignment : "align_fill",
					align_children : "align_center",
					elements : [{
						type : "ok",
						item_id : "CLOS",
						alignment : "align_center",
						ok_name : "Close"
					}, {
						type : "ok_cancel",
						alignment : "align_offscreen",
						item_id : "CNCL",
						ok_name : "Close",
						cancel_name : "Close",
						height : 0
					}]
				}]
			}]
		}
	};

	// if the level changed but the xp (or similar system) is not correct, update the xp to the needed value for the level
	if (CurrentUpdates.types.indexOf("xp") !== -1) {
		var curLvl = Number(What("Character Level"));
		var curExp = What("Total Experience");
		if (!curExp) curExp = 0;
		var LvlXp = getCurrentLevelByXP(curLvl, curExp);
		// if the amount of xp is less than needed for the level, change the xp. But not if the level is 0
		Changes_Dialog.oldXPval = curExp;
		if (curLvl > LvlXp[0]) {
			Value("Total Experience", LvlXp[1]);
			// make the xp dialog insert
			dialogParts.push({
				skipType : "chXP",
				type : "cluster",
				align_children : "align_left",
				alignment : "align_fill",
				width : 500,
				font : "heading",
				name : "Experience Points",
				elements : [{
					type : "view",
					align_children : "align_row",
					alignment : "align_fill",
					elements : [{
						type : "static_text",
						width : 375,
						alignment : "align_fill",
						font : "dialog",
						wrap_name : true,
						name : "The current amount of experience points (" + toUni(curExp) + ") are not enough to attain the current level (" + toUni(curLvl) + "), as that requires " + toUni(LvlXp[1]) + " experience points.\nThe total XP has now been updated to " + toUni(LvlXp[1]) + "."
					}, {
						type : "button",
						item_id : "bXPo",
						name : "Change XP back to " + curExp
					}]
				}, {
					type : "check_box",
					item_id : "chXP",
					alignment : "align_fill",
					font : "palette",
					name : checkboxTxt
				}]
			});
			Changes_Dialog.bXPo = function (dialog) {
				Value("Total Experience", this.oldXPval);
			};
		}
	};

	// if something affecting the stats changed
	// possible options for stats: statsoverride, statsclasses, statsrace, statsfeats, statsitems
	if (CUflat.indexOf("stats") !== -1 || CurrentUpdates.types.indexOf("testasi") !== -1) {
		Changes_Dialog.oldStats = Who("Str");
		if (AbilityScores_Button(true)) { // sets tooltip for stats and returns true if anything changed
			var strStats = "";
			// ability score improvements
			if (CurrentUpdates.types.indexOf("testasi") !== -1) {
				var newASI = 0;
				for (var nClass in classes.known) {
					var clLvl = Math.min(CurrentClasses[nClass].improvements.length, classes.known[nClass].level);
					newASI += clLvl ? CurrentClasses[nClass].improvements[clLvl - 1] : 0;
				}
				var oldASI = 0;
				for (var oClass in classes.old) {
					var useObj = CurrentClasses[oClass] ? CurrentClasses[oClass] : ClassList[oClass];
					clLvl = Math.min(useObj.improvements.length, classes.old[oClass].classlevel);
					oldASI += clLvl ? useObj.improvements[clLvl - 1] : 0;
				}
				if (newASI !== oldASI) {
					var totalASI = newASI - oldASI;
					var ASItxt = " Ability Score Improvement" + (Math.abs(totalASI) != 1 ? "s" : "");
					strStats += "\nThe change in level has granted " + toUni(totalASI) + " new" + ASItxt + ".\nThis bring the new total to " + toUni(newASI) + ".";
				}
			}
			// other stat changes
			if (CUflat.indexOf("stats") !== -1) {
				var statChanges = [];
				if (CurrentUpdates.types.indexOf("statsrace") !== -1) statChanges.push(toUni("Race"));
				if (CurrentUpdates.types.indexOf("statsclasses") !== -1) statChanges.push(toUni("Class Feature(s)"));
				if (CurrentUpdates.types.indexOf("statsfeats") !== -1) statChanges.push(toUni("Feat(s)"));
				if (CurrentUpdates.types.indexOf("statsoverride") !== -1 || CurrentUpdates.types.indexOf("statsitems") !== -1 || CurrentUpdates.types.indexOf("statsmagic") !== -1) statChanges.push(toUni("Magic Item(s)"));
				strStats += formatLineList("\nThe following changed one or more ability score:", statChanges);
			}
			if (strStats) {
				// make the Stats dialog insert
				dialogParts.push({
					skipType : "chAS",
					type : "cluster",
					align_children : "align_left",
					alignment : "align_fill",
					width : 500,
					font : "heading",
					name : "Ability Scores",
					elements : [{
						type : "view",
						align_children : "align_row",
						alignment : "align_fill",
						elements : [{
							type : "static_text",
							width : 375,
							alignment : "align_fill",
							font : "dialog",
							wrap_name : true,
							name : "A change to ability scores has been detected. This is not applied automatically, but you can use the Ability Scores Dialog for that." + strStats
						}, {
							type : "view",
							align_children : "align_right",
							elements : [{
								type : "button",
								item_id : "bSTc",
								name : "See Changes"
							}, {
								type : "button",
								item_id : "bSTo",
								name : "Open Ability Scores Dialog"
							}]
						}]
					}, {
						type : "check_box",
						item_id : "chAS",
						alignment : "align_fill",
						font : "palette",
						name : checkboxTxt
					}]
				});
				Changes_Dialog.bSTc = function (dialog) {
					ShowCompareDialog(
						["Ability Score changes", "The text above is part of the 'Ability Scores Dialog' and the tooltip (mouseover text) of the ability score fields.\nYou can always open the 'Ability Scores Dialog' using the 'Scores' button in the 'JavaScript Window'-toolbar or the 'Ability Scores' bookmark."],
						[
							["Old ability score modifiers", this.oldStats],
							["New ability score modifiers", Who("Str")]
						],
						true
					);
				};
				Changes_Dialog.bSTo = function (dialog) {
					AbilityScores_Button();
					// this dialog might have just updated the stats, prompting for some other updates
					if (CurrentUpdates.types.indexOf("attacks") !== -1) ReCalcWeapons();
					if (CurrentUpdates.types.indexOf("hp") !== -1) SetHPTooltip(false, false);
				};
			}
		}
	}

	// if the HP changed (of the main character)
	if (CurrentUpdates.types.indexOf("hp") !== -1) {
		// save the current HP
		var settingsHP = How("HP Max").split(",");
		autoHP = settingsHP[3] && (/average|fixed|max/).test(settingsHP[3]);
		var oldHPmax = What("HP Max");
		Changes_Dialog.oldHPtt = Who("HP Max");
		// update the HP of the main character
		SetHPTooltip(false, false);
		// make the HP dialog insert
		var strHP = "The hit die and/or hit point maximum of the character have changed.";
		if (autoHP) {
			strHP += "\nAs HP has been set to update automatically, the Maximum Hit Points have been changed from " + toUni(oldHPmax) + " to " + toUni(What("HP Max")) + ".";
		}
		dialogParts.push({
			skipType : "chHP",
			type : "cluster",
			align_children : "align_left",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Hit Points",
			elements : [{
				type : "view",
				align_children : "align_row",
				alignment : "align_fill",
				elements : [{
					type : "static_text",
					width : 400,
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					name : strHP
				}, {
					type : "button",
					item_id : "bHPc",
					name : "See Changes"
				}]
			}, {
				type : "check_box",
				item_id : "chHP",
				alignment : "align_fill",
				font : "palette",
				name : checkboxTxt
			}]
		});
		Changes_Dialog.bHPc = function (dialog) {
			ShowCompareDialog(
				["Hit Points changes", "You can always find the current Hit Point calculation in the tooltip (mouseover text) of the Max HP field."],
				[["Old HP calculation", this.oldHPtt], ["New HP calculation", Who("HP Max")]]
			);
		};
	}

	// if the spellcasting changed
	var CurrentSpellsLen = ObjLength(CurrentSpells);
	var hasSpellSheets = isTemplVis("SSfront", false) || isTemplVis("SSmore", false);
	var changedSpellEval = CurrentUpdates.types.indexOf("spellstr") !== -1;
	var changedSpellcasting = CurrentUpdates.types.indexOf("spells") !== -1 || (CurrentSpellsLen && changedSpellEval) || (!CurrentSpellsLen && CurrentUpdates.types.indexOf("testclassspellcasting") !== -1);
	// if there is no spellcastingBonus added, but change in spellcasting level was detected, see if a spellcasting class changed level and would require a new spell sheet
	if (!changedSpellcasting && CurrentUpdates.types.indexOf("testclassspellcasting") !== -1) {
		for (var theCaster in CurrentSpells) {
			var aCast = CurrentSpells[theCaster];
			// skip this entry if this is not a class, or not a class with spells known, or there is already a spell sheet made of all cantrips & spells
			if (!classes.known[theCaster] || !aCast.known || (aCast.typeList && aCast.typeList == 4)) continue;
			var newClass = !classes.old[theCaster];
			var lvlOld = newClass ? 0 : classes.old[theCaster].classlevel - 1;
			var lvlNew = classes.known[theCaster].level - 1;
			// see if there is a cantrips array in the known section and the amount of known
			if (isArray(aCast.known.cantrips)) {
				var oldCaLvl = Math.min(aCast.known.cantrips.length - 1, lvlOld);
				var newCaLvl = Math.min(aCast.known.cantrips.length - 1, lvlNew);
				changedSpellcasting = (newClass && aCast.known.cantrips[newCaLvl]) || (aCast.known.cantrips[oldCaLvl] !== aCast.known.cantrips[newCaLvl]);
			}
			// stop if there is already a reason to update
			if (changedSpellcasting) break;
			// see if there is a spells array in the known section and the amount of known
			if (aCast.known.spells && isArray(aCast.known.spells)) {
				var oldSpLvl = Math.min(aCast.known.spells.length - 1, lvlOld);
				var newSpLvl = Math.min(aCast.known.spells.length - 1, lvlNew);
				changedSpellcasting = (newClass && aCast.known.spells[newSpLvl]) || (aCast.known.spells[oldSpLvl] !== aCast.known.spells[newSpLvl]);
			} else if (aCast.known.spells && aCast.typeSp && (aCast.typeSp === "book" || (aCast.typeSp === "list" && aCast.typeList !== 2))) { // if this is a list/book, test if the caster just got access to a new spell slot level
				var theTable = aCast.spellsTable ? aCast.spellsTable : aCast.factor && aCast.factor[0] ? tDoc[aCast.factor[1] + "SpellTable"] : false;
				if (theTable) {
					var oldTableLvl = Math.min(theTable.length - 1, lvlOld + 1);
					var newTableLvl = Math.min(theTable.length - 1, lvlNew + 1);
					changedSpellcasting = (newClass && aCast.known.spells[newSpLvl]) || (theTable[oldTableLvl].trailingIndexOf(0) !== theTable[newTableLvl].trailingIndexOf(0));
				};
			}
			// stop if there is already a reason to update
			if (changedSpellcasting) break;
		}
	};
	if (changedSpellcasting && ((!CurrentSpellsLen && hasSpellSheets) || CurrentSpellsLen)) {
		// see if not all spellcasting stuff has been removed
		var strSpells = !CurrentSpellsLen ?
			"All spellcasting abilities have been removed from the character.\nYou might want to remove any Spell Sheets as well." :
			"A change to spellcasting" +
			(changedSpellEval ? " and how spells are displayed or spell lists are generated" : "") +
			" has been detected that require the Spell Sheets to be updated.\nTIP: if you plan to make more changes affecting spellcasting, do those first before generating Spell Sheets, because creating them takes very long.";
		var buttonSpells = !CurrentSpellsLen ? "Remove Spell Sheets" : (hasSpellSheets ? "Update" : "Create") + " Spell Sheets";
		var buttonSpellStr = changedSpellEval ? "Spells \u0026\u0026 -List Changes" : "Affecting Spells \u0026\u0026 -Lists";
		// make the Spells dialog insert
		dialogParts.push({
			skipType : "chSP",
			type : "cluster",
			align_children : "align_left",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Spellcasting",
			elements : [{
				type : "view",
				align_children : "align_row",
				alignment : "align_fill",
				elements : [{
					type : "static_text",
					width : 375,
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					name : strSpells
				}, {
					type : "view",
					align_children : "align_right",
					elements : (changedSpellEval || CurrentEvals.spellStr ? [{
						type : "button",
						item_id : "bSPs",
						name : buttonSpellStr
					}] : []).concat([{
						type : "button",
						item_id : "bSPo",
						name : buttonSpells
					}])
				}]
			}, {
				type : "check_box",
				item_id : "chSP",
				alignment : "align_fill",
				font : "palette",
				name : checkboxTxt
			}]
		});
		Changes_Dialog.curSpLen = CurrentSpellsLen;
		Changes_Dialog.bSPo = function (dialog) {
			if (this.curSpLen) {
				if (GenerateSpellSheet(undefined, true)) {
					app.alert({
						cTitle : "New spell sheets have been generated",
						nIcon : 3,
						cMsg : "The new spell sheets have been generated. You will be taken to them as soon as you close the 'Changes' dialog."
					})
				};
			} else {
				RemoveSpellSheets();
			}
		};
		if (changedSpellEval || CurrentEvals.spellStr) {
			Changes_Dialog.oldSpellStr = CurrentUpdates.spellStrOld ? CurrentUpdates.spellStrOld : "";
			Changes_Dialog.spellStrChange = changedSpellEval;
			Changes_Dialog.bSPs = function (dialog) {
				ShowCompareDialog(
					["Things affecting spells, spell properties and/or spell list generation", "Some features might affect how spells are displayed on the spell sheet, by adding more range for example.\n\nOthers might affect how a spell list for a spellcasting class or feature is generated, by adding extra spells to choose from for example."],
					this.spellStrChange ?
					[
						["Old spell list/attribute manipulations", this.oldSpellStr],
						["New spell list/attribute manipulations", StringEvals("spellStr")]
					] : [
						["Spell list/attribute manipulations", StringEvals("spellStr")]
					],
					true
				);
			};
		}
	}

	// if skill proficiencies changed
	if (CurrentUpdates.types.indexOf("skills") !== -1) {
		// get the previous skill string
		Changes_Dialog.oldSkillStr = CurrentUpdates.skillStrOld ? CurrentUpdates.skillStrOld : "";
		// make the skills dialog insert
		dialogParts.push({
			skipType : "chSK",
			type : "cluster",
			align_children : "align_left",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Skill Proficiencies",
			elements : [{
				type : "view",
				align_children : "align_row",
				alignment : "align_fill",
				elements : [{
					type : "static_text",
					width : 400,
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					name : "Proficiency with one or more skill has been added or removed. If this change offers you a choice, nothing on the sheet will have been altered and you will have to assign/remove the proficiency manually."
				}, {
					type : "button",
					item_id : "bSKc",
					name : "See Changes"
				}]
			}, {
				type : "check_box",
				item_id : "chSK",
				alignment : "align_fill",
				font : "palette",
				name : checkboxTxt
			}]
		});
		Changes_Dialog.bSKc = function (dialog) {
			ShowCompareDialog(
				["Skill proficiencies", "You can always find the current skill proficiencies in the tooltip (mouseover text) of the skill fields."],
				[
					["Old skill proficiencies", this.oldSkillStr],
					["New skill proficiencies", Who("Acr Prof").replace(/.+(\r|\n)*/, '')]
				],
				true
			);
		};
	}

	// if the attack calculations / populating changed
	if (CurrentUpdates.types.indexOf("atkstr") !== -1) {
		// get the previous atkCalc/stkAdd string
		Changes_Dialog.oldAtkStr = CurrentUpdates.atkStrOld ? CurrentUpdates.atkStrOld : "";
		// make the attack dialog insert
		dialogParts.push({
			skipType : "chAT",
			type : "cluster",
			align_children : "align_left",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Attack Calculations (possibly including spellcasting DC)",
			elements : [{
				type : "view",
				align_children : "align_row",
				alignment : "align_fill",
				elements : [{
					type : "static_text",
					width : 400,
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					name : "A change was detected in the things that affect how (spell) attacks and/or how spell save DCs are calculated."
				}, {
					type : "button",
					item_id : "bAtk",
					name : "See Changes"
				}]
			}, {
				type : "check_box",
				item_id : "chAT",
				alignment : "align_fill",
				font : "palette",
				name : checkboxTxt
			}]
		});
		Changes_Dialog.bAtk = function (dialog) {
			ShowCompareDialog(
				["Things affecting attack/DC calculations", "You can always see what things are affecting the attack calculations with the small buttons in front of each attack entry on the first page.", "Be aware that things affecting spell attacks and spell save DCs are applied in the attack section and on the spell sheet pages, but not to the 'Ability Save DC' on the first page."],
				[
					["Old attack/DC manipulations", this.oldAtkStr],
					["New attack/DC manipulations", StringEvals("atkStr")]
				],
				true
			);
		};
	}

	// if an addition was done to the 3rd page Notes section or to a Notes page
	if (CurrentUpdates.notesChanges) {
		// get the previous atkCalc/stkAdd string
		Changes_Dialog.notesChange = "\u2022 " + CurrentUpdates.notesChanges.join("\n\u2022 ");
		// make the attack dialog insert
		dialogParts.push({
			skipType : "chNO",
			type : "cluster",
			align_children : "align_left",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Notes Addition",
			elements : [{
				type : "view",
				align_children : "align_row",
				alignment : "align_fill",
				elements : [{
					type : "static_text",
					width : 400,
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					name : "A text was added to the Notes section on the 3rd page and/or a separate Notes page because it didn't fit into the space originally meant for it."
				}, {
					type : "button",
					item_id : "bNot",
					name : "See Addition(s)"
				}]
			}, {
				type : "check_box",
				item_id : "chNO",
				alignment : "align_fill",
				font : "palette",
				name : checkboxTxt
			}]
		});
		Changes_Dialog.bNot = function (dialog) {
			ShowCompareDialog(
				["Things added to the Notes section/page", "You can always edit the text in the Notes section or Notes pages, you don't have to keep it as set by the automation.", 'Class features added to the third page can always be moved to the Class Features section on the second page, it will not interfere with the sheet\'s automation. You will still be able to remove them using the "Choose Feature" button.'],
				[
					["", this.notesChange]
				],
				true
			);
		};
	}

	// check if any of the parts of the array should be shown
	var cancelDia = dialogParts.every(function (part) {
		// set the functions for the checkboxes
		var skType = part.skipType;
		Changes_Dialog[skType] = function (dialog, fldNm = skType) {
			ChangesDialogSkip[fldNm] = dialog.store()[fldNm] ? true : false;
		};
		// see if this part is set to be skipped or not
		return ChangesDialogSkip[skType] || (skType == "chHP" && autoHP);
	});
	// if there is nothing to show, stop the function now
	if (!cancelDia) {
		// reset the CurrentUpdates variable
		CurrentUpdates = {types : []};
		// add the sections to the dialog
		setDialogName(Changes_Dialog, "sect", "elements", dialogParts);
		// open the dialog
		var dia = app.execDialog(Changes_Dialog);
	}

	// reset the CurrentUpdates variable
	CurrentUpdates = {types : []};

	// Stop progress bar
	thermoM(thermoTxt, true);
}

//a way to show a dialog that compares multiple things
//arr is an array of arrays with two entries each [cluster title, cluster text]
function ShowCompareDialog(txtA, arr, canBeLong) {
	var clusterArr = [];
	var isTxtA = isArray(txtA);
	var hdr = isTxtA ? txtA[0] : txtA;
	var extraTxt = isTxtA && txtA[1] ? txtA[1] : "";
	var headTxt = isTxtA && txtA[2] ? txtA[2] : "";

	for (var i = 0; i < arr.length; i++) {
		var nextElem = {
			type : "cluster",
			alignment : "align_top",
			font : "heading",
			name : arr[i][0],
			elements : [{
				item_id : "tx" + ("0" + i).slice(-2),
				width : 300,
				alignment : "align_fill",
				font : "dialog"
			}]
		};
		if (canBeLong) {
			nextElem.elements[0].type = "edit_text";
			nextElem.elements[0].readonly = true;
			nextElem.elements[0].multiline = true;
			nextElem.elements[0].height = 350;
		} else {
			nextElem.elements[0].type = "static_text";
			nextElem.elements[0].wrap_name = true;
			nextElem.elements[0].name = arr[i][1].replace(/^(\r|\n)*/, "");
		}
		clusterArr.push(nextElem);
	}

	var otherWidths = clusterArr.length * 300;
	if (clusterArr.length == 1) {
		otherWidths = 400;
		clusterArr[0].elements[0].width = 400;
	}
	var ShowCompare_Dialog = {
		initialize : function (dialog) {
			if (!canBeLong) return;
			var toLoad = {};
			for (var i = 0; i < arr.length; i++) {
				toLoad["tx" + ("0" + i).slice(-2)] = arr[i][1].replace(/^(\r|\n)*/, "");
			}
			dialog.load(toLoad);
		},
		description : {
			name : txtA[0],
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : (headTxt ? [{
					type : "static_text",
					item_id : "head",
					alignment : "align_fill",
					font : "heading",
					wrap_name : true,
					width : otherWidths,
					name : txtA[0]
				}, {
					type : "static_text",
					item_id : "txt2",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					width : otherWidths,
					name : headTxt
				}] : []).concat([{
					type : "view",
					align_children : "align_row",
					elements : [{
						type : "static_text",
						item_id : "txt0",
						alignment : "align_fill",
						font : "palette",
						wrap_name : true,
						height : 20,
						name : "[Can't see the 'OK' button at the bottom? Use ENTER to close this dialog]",
						width : otherWidths
					}, {
						type : "edit_text",
						item_id : "ding",
						alignment : "align_fill",
						readonly : true,
						height : 1,
						width : 1
					}]
				}, {
					type : "view",
					align_children : "align_top",
					elements : clusterArr
				}]).concat(extraTxt ? [{
					type : "static_text",
					item_id : "txt1",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					width : otherWidths,
					name : extraTxt
				}] : []).concat([{
					type : "ok"
				}])
			}]
		}
	}
	var dia = app.execDialog(ShowCompare_Dialog);
}

// >>>> Magic Items functions <<<< \\

function doDropDownValCalcWithChoices() {
	if (!event.target || event.type != "Field") return;
	switch (event.name) {
		case "Calculate":
			if (event.target.setVal !== undefined) {
				event.value = event.target.setVal;
			}
			break;
		case "Validate":
			if (event.target.setVal !== undefined) {
				delete event.target.setVal;
				return;
			}
			// only in case of a validation event and not changing the value
			var fldName = event.target.name;
			var fldNmbr = parseFloat(fldName.slice(-2));
			if (fldName.toLowerCase().indexOf("magic item") !== -1) {
				ApplyMagicItem(event.value, fldNmbr);
			} else if (fldName.toLowerCase().indexOf("feat") !== -1) {
				ApplyFeat(event.value, fldNmbr);
			}
			break;
		default:
			break;
	}
}

// Make an array of all magic item fields of that fieldnumber
function ReturnMagicItemFieldsArray(fldNmbr) {
	fldsArray = [
		"Extra.Magic Item " + fldNmbr,				// 0
		"Extra.Magic Item Note " + fldNmbr,			// 1
		"Extra.Magic Item Description " + fldNmbr,	// 2
		"Extra.Magic Item Weight " + fldNmbr,		// 3
		"Extra.Magic Item Attuned " + fldNmbr,		// 4
		"Image.MagicItemAttuned." + fldNmbr			// 5
	];
	return fldsArray;
}

// Lookup the name of a Magic Item and if it exists in the MagicItemsList
function ParseMagicItem(input) {
	var found = "";
	var subFound = "";
	if (!input) return [found, subFound, []];

	input = removeDiacritics(input).toLowerCase();
	var foundLen = 0;
	var foundDat = 0;
	var subFoundLen = 0;
	var subFoundDat = 0;
	var subOptionArr = [];
	var isMatch, isMatchLen, isMatchSub, tempDate, tempDateSub, tempNameLen;
	var varArr;

	// Scan string for all magic items
	for (var key in MagicItemsList) {
		var kObj = MagicItemsList[key];

		// test if the magic item or its source isn't excluded
		if (testSource(key, kObj, "magicitemExcl")) continue;

		isMatch = false;
		if (input.indexOf(kObj.name.toLowerCase()) !== -1) {
			isMatch = true;
			isMatchLen = kObj.name.length;
		} else if (kObj.nameAlt && input.indexOf(kObj.nameAlt.toLowerCase()) !== -1) {
			isMatch = true;
			isMatchLen = kObj.nameAlt.length;
		} else if (kObj.nameTest && input.indexOf(kObj.nameTest.toLowerCase()) !== -1) {
			isMatch = true;
			isMatchLen = kObj.nameTest.length;
		}
		tempDate = sourceDate(kObj.source);
		subFoundLen = 0;
		subFoundDat = 0;
		isMatchSub = "";
		varArr = [];

		if (kObj.choices) {
			for (var i = 0; i < kObj.choices.length; i++) {
				var keySub = kObj.choices[i].toLowerCase();
				var sObj = kObj[keySub];
				if (!sObj || (sObj.source && testSource(keySub, sObj, "magicitemExcl"))) continue;
				varArr.push(kObj.choices[i]);
				isMatchSub = false;
				if (sObj.name) {
					if (input.indexOf(sObj.name.toLowerCase()) !== -1) {
						isMatchSub = true;
						tempNameLen = sObj.name.length;
					} else if (sObj.nameAlt && input.indexOf(sObj.nameAlt.toLowerCase()) !== -1) {
						isMatchSub = true;
						tempNameLen = sObj.nameAlt.length;
					} else if (sObj.nameTest && input.indexOf(sObj.nameTest.toLowerCase()) !== -1) {
						isMatchSub = true;
						tempNameLen = sObj.nameTest.length;
					}
				} else if (isMatch && input.indexOf(keySub) !== -1) {
					isMatchSub = true;
					tempNameLen = keySub.length;
				}
				if (isMatchSub) {
					// the choice matched, but only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source than the other choices
					tempDateSub = sObj.source ? sourceDate(sObj.source) : tempDate;
					if (tempNameLen < subFoundLen || (tempNameLen == subFoundLen && tempDateSub < subFoundDat)) continue;
					// we have a match for a choice, so set the values
					subFoundLen = tempNameLen;
					subFoundDat = tempDateSub;
					foundLen = isMatchLen;
					foundDat = tempDate;
					found = key;
					subFound = keySub;
					subOptionArr = varArr;
				}
			}
		}
		if (!isMatch || subFoundLen) continue; // no match or sub already matched

		// only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source. This differs from the regExpSearch objects
		if (isMatchLen < foundLen || (isMatchLen == foundLen && tempDate < foundDat)) continue;

		// we have a match, set the values
		found = key;
		subFound = "";
		subOptionArr = varArr;
		foundLen = isMatchLen;
		foundDat = tempDate;
	}
	return [found, subFound, subOptionArr];
};

// Check all Magic Items fields and parse the once known into the global variable
function FindMagicItems() {
	CurrentMagicItems.known = [];
	CurrentMagicItems.choices = [];
	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		var parsedItem = ParseMagicItem( What("Extra.Magic Item " + i) );
		CurrentMagicItems.known.push(parsedItem[0]);
		CurrentMagicItems.choices.push(parsedItem[1]);
	}
}

// Add the text and features of a Magic Items
function ApplyMagicItem(input, FldNmbr) {
	if (IsSetDropDowns || CurrentVars.manual.items || !IsNotMagicItemMenu) return; // When just changing the dropdowns or magic items are set to manual or this is a menu action, don't do anything
	var MIflds = ReturnMagicItemFieldsArray(FldNmbr);
	// Not called from a field? Then just set the field and let this function be called anew
	if ((!event.target || event.target.name !== MIflds[0]) && What(MIflds[0]) !== input) {
		Value(MIflds[0], input);
		return;
	};

	var parseResult = ParseMagicItem(input);
	var newMI = parseResult[0];
	var newMIvar = parseResult[1];
	var aMI = MagicItemsList[newMI];
	var aMIvar = aMI && newMIvar ? aMI[newMIvar] : false;
	var ArrayNmbr = FldNmbr - 1;
	var oldMI = CurrentMagicItems.known[ArrayNmbr];
	var oldMIvar = CurrentMagicItems.choices[ArrayNmbr];
	var setFieldValueTo;
	var failedChoice = false;

	var doNotCommit = function(toSetVal) {
		if (thermoTxt) thermoM(thermoTxt, true); // Stop progress bar
		if (!IsNotImport) return;
		event.rc = false;
		if (isArray(event.target.page)) OpeningStatementVar = app.setTimeOut("tDoc.getField('" + event.target.name + ".1').setFocus();", 10);
	}

	// If no variant was found, but there is a choice, ask it now
	if (aMI && aMI.choices && !newMIvar) {
		if (parseResult[2].length) {
			var selectMIvar = false;
			if (parseResult[2].length == 1) {
				selectMIvar = parseResult[2][0];
			} else if (aMI.selfChoosing && typeof aMI.selfChoosing == "function") {
				try {
					selectMIvar = aMI.selfChoosing();
				} catch (error) {
					var eText = "The function in the 'selfChoosing' attribute of '" + newMI + "' produced an error! Please contact the author of the magic item code to correct this issue:\n " + error + "\n ";
					for (var e in error) eText += e + ": " + error[e] + ";\n ";
					console.println(eText);
					console.show();
				}
				selectMIvar = selectMIvar && typeof selectMIvar == "string" && aMI[selectMIvar.toLowerCase()] ? selectMIvar : false;
			}
			if (!selectMIvar && !IsNotImport) {
				failedChoice = true;
			} else {
				// if none of the above selected a choice, ask the user!
				if (!selectMIvar) selectMIvar = AskUserOptions("Select " + aMI.name + " Type", "The '" + aMI.name + "' magic item exists in several forms. Select which form you want to add to the sheet at this time.\n\nYou can change the selected form with the little square button in the magic item line that this item is in.", parseResult[2], "radio", true);
				newMIvar = selectMIvar.toLowerCase();
				aMIvar = aMI[newMIvar];
				setFieldValueTo = aMIvar.name ? aMIvar.name : aMI.name + " [" + selectMIvar + "]";
			}
		} else if (!IsNotImport) {
			failedChoice = true;
		} else {
			app.alert({
				cTitle : "Error processing options for " + aMI.name,
				cMsg : "The magic item that you have selected, '" + aMI.name + "' offers a choice for the form it comes in. Unfortunately, the sheet has run into an issue where there are no forms to choose from because of resources being excluded. Use the \"Source Material\" bookmark to correct this.\n\nThis could also be an issue with the imported script containing the item not being written correctly. If so, please contact the author of that import script."
			});
			doNotCommit();
			return;
		}
	}

	// if there was a choice but none was selected for whatever reason (importing), do not apply anything and warn the user
	if (failedChoice) {
		Value(MIflds[2], 'ERROR, please reapply "' + aMI.name + '" above.');
		if (!IsNotImport) {
			console.println("The magic item '" + aMI.name + "' requires you to make a selection of a sub-choice. However, because this item was added during importing from another MPMB's Character Record Sheet, no pop-up dialog could be displayed to allow you to make a selection. Please reapply this magic item to show the pop-up dialog and make a selection for its sub-choice.");
			console.show();
		}
		if (thermoTxt) thermoM(thermoTxt, true); // Stop progress bar
		event.target.setVal = "ERROR, please reapply: " + (aMI.name.substr(0,2) + "\u200A" + aMI.name.substr(2)).split(" ").join("\u200A ");
		return;
	}

	if (oldMI === newMI && oldMIvar === newMIvar && (!aMI || !aMI.chooseGear) && (!aMIvar || !aMIvar.chooseGear)) {
		if (setFieldValueTo) event.target.setVal = setFieldValueTo;
		return; // No changes were made
	}

	// Start progress bar
	var thermoTxt = thermoM("Applying magic item...");
	thermoM(1/6); // Increment the progress bar

	// Create the object to use (merge parent and choice)
	if (!aMIvar) {
		var theMI = aMI;
		newMIvar = "";
	} else {
		var theMI = {
			name : aMIvar.name ? aMIvar.name : setFieldValueTo ? setFieldValueTo : input
		}
		var MIattr = ["source", "type", "rarity", "attunement", "magicItemTable", "weight", "description", "descriptionLong", "descriptionFull", "calculate", "prerequisite", "prereqeval", "chooseGear", "extraTooltip", "storyItemAL"];
		for (var a = 0; a < MIattr.length; a++) {
			var aKey = MIattr[a];
			if (aMIvar[aKey]) {
				theMI[aKey] = aMIvar[aKey];
			} else if (aMI[aKey]) {
				theMI[aKey] = aMI[aKey];
			}
		}
	}

	// Check if the magic item doesn't already exist (with the same choice, if any)
	if (IsNotImport && !ignoreDuplicates && aMI) {
		// count occurrence of parent & choice
		var parentDupl = 0;
		var choiceDupl = 0;
		for (var i = 0; i < CurrentMagicItems.known.length; i++) {
			if (i == ArrayNmbr) continue;
			if (CurrentMagicItems.known[i] == newMI) {
				parentDupl++;
				if (newMIvar && CurrentMagicItems.choices[i] == newMIvar) choiceDupl++;
			}
		}
		if ((parentDupl && !aMI.allowDuplicates) || (choiceDupl && !aMIvar.allowDuplicates)) {
			var stopFunct = app.alert({
				cTitle : "Can only have one instance of a magic item",
				cMsg : "The magic item that you have selected, '" + (choiceDupl ? theMI.name : aMI.name) + "' is already present on the sheet and you can't have duplicates of it.\n\nIf you want to show that your character has multiples of this item, consider adding \"(2)\" after its name. You can also list it in one of the equipment sections, where you can denote the number you have." + (newMIvar && !choiceDupl ? "\n\nHowever, as this is a composite item that exists in different forms, and you don't have '" + theMI.name + "' yet, the sheet can allow you to add it regardless of the rules. Do you want to continue adding this item?" : ""),
				nIcon : !newMIvar || choiceDupl ? 0 : 1,
				nType : !newMIvar || choiceDupl ? 0 : 2
			});
			if (stopFunct === 1 || stopFunct === 3) {
				doNotCommit();
				return;
			}
		}
	}

	// Before stopping the calculations, first test if the magic item has a prerequisite and if it meets that
	if (IsNotImport && IsNotReset && theMI && theMI.prereqeval && !ignorePrereqs && event.target && event.target.name == MIflds[0]) {
		try {
			if (typeof theMI.prereqeval == 'string') {
				var meetsPrereq = eval(theMI.prereqeval);
			} else if (typeof theMI.prereqeval == 'function') {
				var gatherVars = gatherPrereqevalVars();
				gatherVars.choice = newMIvar;
				var meetsPrereq = theMI.prereqeval(gatherVars);
			}
		} catch (error) {
			var eText = "The 'prereqeval' attribute for the magic item '" + theMI.name + "' produces an error and is subsequently ignored. If this is one of the built-in magic items, please contact morepurplemorebetter using one of the contact bookmarks to let him know about this bug. Please do not forget to list the version number of the sheet, name and version of the software you are using, and the name of the magic item.\nThe sheet reports the error as\n " + error + "\n ";
			for (var e in error) eText += e + ": " + error[e] + ";\n ";
			console.println(eText);
			console.show();
			var meetsPrereq = true;
		};
		if (!meetsPrereq) {
			thermoTxt = thermoM("The magic item '" + theMI.name + "' has prerequisites that have not been met...", false); //change the progress dialog text
			thermoM(1/5); //increment the progress dialog's progress

			var askUserMI = app.alert({
				cTitle : "The prerequisites for '" + theMI.name + "' have not been met",
				cMsg : "The magic item that you have selected, '" + theMI.name + "' has a prerequisite listed" + (theMI.prerequisite ? ' as: \n\t"' + theMI.prerequisite + '"' : ".") + "\n\nYour character does not meet this requirement. Are you sure you want to apply this magic item?",
				nIcon : 1,
				nType : 2
			});

			if (askUserMI !== 4) { // If "NO" was pressed
				doNotCommit();
				return;
			}
		};
	};

	// if a magic item variant was chosen, make sure this field will show that selection, now that it can't be cancelled anymore due to not meeting a prerequisite
	if (setFieldValueTo) event.target.setVal = setFieldValueTo;

	calcStop(); // Now stop the calculations

	// Remove previous magic item at the same field
	if (oldMI !== newMI || oldMIvar !== newMIvar) {
		// Remove everything from the description field, value, calculation, tooltip, submitname
		tDoc.getField(MIflds[2]).setAction("Calculate", "");
		Value(MIflds[2], "", "", "");
		if (oldMI) {
			var anOldMI = MagicItemsList[oldMI];
			var skipNoAttunement = isDisplay(MIflds[4]) == display.visible && !tDoc.getField(MIflds[4]).isBoxChecked(0);
			if (oldMI !== newMI && !skipNoAttunement) {
				// Undo the selection of a weapon, ammo, or armor if defined
				if (anOldMI.chooseGear || (oldMIvar && anOldMI[oldMIvar].chooseGear)) {
					selectMagicItemGearType(false, FldNmbr, oldMIvar && anOldMI[oldMIvar].chooseGear ? anOldMI[oldMIvar].chooseGear : anOldMI.chooseGear);
				}

				// Remove its attributes
				var Fea = ApplyFeatureAttributes(
					"item", // type
					oldMI, // fObjName
					[CurrentMagicItems.level, 0, false], // lvlA [old-level, new-level, force-apply]
					[oldMIvar, "", false], // choiceA [old-choice, new-choice, "only"|"change"]
					false // forceNonCurrent
				);
			}
			// Remove the source from the notes field
			var sourceStringOld = stringSource(oldMIvar && anOldMI[oldMIvar].source ? anOldMI[oldMIvar] : anOldMI, "first", "[", "]");
			if (sourceStringOld) RemoveString(MIflds[1], sourceStringOld);
		}
		// Reset the attuned and weight fields
		tDoc.resetForm([MIflds[3], MIflds[4]]);
		AddTooltip(MIflds[4], undefined, "");
	}

	// Update the CurrentMagicItems.known variable
	CurrentMagicItems.known[ArrayNmbr] = newMI;
	CurrentMagicItems.choices[ArrayNmbr] = newMIvar;

	// Do something if there is a new magic item to apply
	if (aMI) {
		thermoTxt = thermoM("Applying '" + theMI.name + "' magic item...", false); //change the progress dialog text
		thermoM(1/3); //increment the progress dialog's progress

		// Set the field calculation
		if (theMI.calculate) {
			var theCalc = What("Unit System") === "imperial" ? theMI.calculate : ConvertToMetric(theMI.calculate, 0.5);
			if (typePF) theCalc = theCalc.replace("\n", " ");
			tDoc.getField(MIflds[2]).setAction("Calculate", theCalc);
		}

		// Create the tooltip
		var tooltipStr = (theMI.type ? theMI.type + ", " : "") + (theMI.rarity ? theMI.rarity : "");
		if (theMI.attunement) tooltipStr += tooltipStr ? " (requires attunement)" : "requires attunement";
		tooltipStr = toUni(theMI.name) + (tooltipStr ? "\n" + tooltipStr[0].toUpperCase() + tooltipStr.substr(1) : "");

		if (theMI.notLegalAL) {
			tooltipStr += "\n \u2022 Illegal in Adventurers League play";
		} else if (theMI.magicItemTable) {
			if (isArray(theMI.magicItemTable)) {
				theMI.magicItemTable.sort();
				tooltipStr += formatLineList("\n \u2022 Table: ", theMI.magicItemTable);
				var lowestTable = theMI.magicItemTable[0];
			} else {
				var lowestTable = theMI.magicItemTable;
				tooltipStr += "\n \u2022 Table: " + theMI.magicItemTable;
			}
			if (TreasureCheckpointsTable[lowestTable]) {
				var aTC = TreasureCheckpointsTable[lowestTable];
				tooltipStr += " (Tier " + aTC.tier + "+; " + aTC.points + " Treasure Checkpoints)";
			}
			tooltipStr += ".";
		} else if (theMI.rarity && theMI.rarity == "common") {
			tooltipStr += "\n \u2022 AL: Tier 1+; 2 Treasure Checkpoints";
		} else if (theMI.storyItemAL) {
			tooltipStr += "\n \u2022 Story Item (AL: only use in adventure it's found in)";
		} else if (!theMI.extraTooltip) {
			tooltipStr += "\n \u2022 Can't be traded in Adventurers League play";
		}
		if (theMI.extraTooltip) {
			tooltipStr += "\n \u2022 " + theMI.extraTooltip;
		}
		if (theMI.prerequisite) tooltipStr += "\n \u2022 Prerequisite: " + theMI.prerequisite;
		tooltipStr += stringSource(theMI, "full,page", "\n \u2022 Source: ", ".");

		if (theMI.descriptionFull) tooltipStr += isArray(theMI.descriptionFull) ? desc(theMI.descriptionFull).replace(/^\n   /i, "\n\n") : "\n\n" + theMI.descriptionFull;

		// Get the description
		var theDesc = "";
		if (!theMI.calculate) {
			theDesc = FldNmbr > FieldNumbers.magicitemsD && theMI.descriptionLong ? theMI.descriptionLong : theMI.description ? theMI.description : "";
			if (What("Unit System") !== "imperial") theDesc = ConvertToMetric(theDesc, 0.5);
			if (typePF) theDesc = theDesc.replace("\n", " ");
		}

		// Set it all to the appropriate field
		Value(MIflds[2], theDesc, tooltipStr, theMI.calculate ? theCalc : "");

		// Set the notes field
		var sourceString = stringSource(theMI, "first", "[", "]");
		if (sourceString) AddString(MIflds[1], sourceString, " ");

		// Set the weight
		if (theMI.weight) {
			var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
			Value(MIflds[3], RoundTo(theMI.weight * massMod, 0.001, true));
		} else {
			Value(MIflds[3], 0);
		}

		// Apply the rest of its attributes
		if (oldMI !== newMI || oldMIvar !== newMIvar) {
			// Set the attunement
			Checkbox(MIflds[4], theMI.attunement ? true : false, undefined, theMI.attunement ? "" : "hide");
			var justChange = oldMI == newMI && oldMIvar !== newMIvar;
			var Fea = ApplyFeatureAttributes(
				"item", // type
				newMI, // fObjName
				[justChange ? CurrentMagicItems.level : 0, CurrentMagicItems.level, justChange], // lvlA [old-level, new-level, force-apply]
				justChange ? [oldMIvar, newMIvar, "change"] : ["", newMIvar, false], // choiceA [old-choice, new-choice, "only"|"change"]
				false // forceNonCurrent
			);
		}

		// Do the selection of a weapon, ammo, or armor if defined
		var skipNoAttunement = isDisplay(MIflds[4]) == display.visible && !tDoc.getField(MIflds[4]).isBoxChecked(0);
		if (!skipNoAttunement && oldMI == newMI && (aMI.chooseGear || (oldMIvar && aMI[oldMIvar].chooseGear))) {
			// undo the previous
			selectMagicItemGearType(false, FldNmbr, oldMIvar && aMI[oldMIvar].chooseGear ? aMI[oldMIvar].chooseGear : aMI.chooseGear, oldMIvar);
		}
		if ((oldMI !== newMI || oldMIvar !== newMIvar) && theMI.chooseGear) selectMagicItemGearType(true, FldNmbr, theMI.chooseGear);
	}

	// Set the visibility of the attuned checkbox
	setMIattunedVisibility(FldNmbr);

	thermoM(thermoTxt, true); // Stop progress bar
};

function correctMIdescriptionLong(FldNmbr) {
	if (CurrentVars.manual.items) return;
	var ArrayNmbr = FldNmbr - 1;
	var aMI = MagicItemsList[CurrentMagicItems.known[ArrayNmbr]];
	var aMIvar = aMI && CurrentMagicItems.choices[ArrayNmbr] ? aMI[CurrentMagicItems.choices[ArrayNmbr]] : false;

	// Create the object to use (merge parent and choice)
	if (!aMIvar) {
		var theMI = aMI;
	} else {
		var theMI = {}
		var MIattr = ["description", "descriptionLong", "calculate"];
		for (var a = 0; a < MIattr.length; a++) {
			var aKey = MIattr[a];
			if (aMIvar[aKey]) {
				theMI[aKey] = aMIvar[aKey];
			} else if (aMI[aKey]) {
				theMI[aKey] = aMI[aKey];
			}
		}
	}

	// Now only do something if a magic item is recognized, doesn't have a calculation, or doesn't have two different description options (normal & long)
	if (!aMI || theMI.calculate || !theMI.descriptionLong) return;

	var theDesc = FldNmbr > FieldNumbers.magicitemsD && theMI.descriptionLong ? theMI.descriptionLong : theMI.description ? theMI.description : "";
	if (What("Unit System") !== "imperial") theDesc = ConvertToMetric(theDesc, 0.5);
	if (typePF) theDesc = theDesc.replace("\n", " ");
	Value("Extra.Magic Item Description " + FldNmbr, theDesc);
	// Apply the chooseGear item again to the description
	var hasChooseGear = aMIvar && aMIvar.chooseGear ? aMIvar.chooseGear : aMI.chooseGear;
	if (hasChooseGear) selectMagicItemGearType(true, FldNmbr, hasChooseGear, false, true);
}

function ApplyAttunementMI(FldNmbr) {
	if (CurrentVars.manual.items) return;
	var ArrayNmbr = FldNmbr - 1;
	var aMI = CurrentMagicItems.known[ArrayNmbr];
	if (!aMI) return; // no magic item recognized, so do nothing
	var aMIvar = CurrentMagicItems.choices[ArrayNmbr];

	var theFld = event.target && event.target.name.indexOf("Extra.Magic Item Attuned ") !== -1 ? event.target : tDoc.getField("Extra.Magic Item Attuned " + FldNmbr);
	var isChecked = theFld.isBoxChecked(0);

	// Start progress bar and stop calculation
	var thermoTxt = thermoM((isChecked ? "Applying" : "Removing") + " magic item features...");
	calcStop();
	thermoM(1/2); // Increment the progress bar

	// now apply or remove the magic item's features
	var Fea = ApplyFeatureAttributes(
		"item", // type
		aMI, // fObjName
		isChecked ? [0, CurrentMagicItems.level, false] : [CurrentMagicItems.level, 0, false], // lvlA [old-level, new-level, force-apply]
		isChecked ? ["", aMIvar, false] : [aMIvar, "", false], // choiceA [old-choice, new-choice, "only"|"change"]
		false // forceNonCurrent
	);

	// Do the selection of a weapon, ammo, armor if defined
	var useChooseGear = aMIvar && MagicItemsList[aMI][aMIvar].chooseGear ? MagicItemsList[aMI][aMIvar].chooseGear : MagicItemsList[aMI].chooseGear ? MagicItemsList[aMI].chooseGear : false;
	if (useChooseGear) selectMagicItemGearType(isChecked, FldNmbr, useChooseGear);
}

// Hide/show the attuned checkbox for a magic item entry
function setMIattunedVisibility(FldNmbr, force) {
	var MIflds = ReturnMagicItemFieldsArray(FldNmbr);
	var hideIt = How(MIflds[4]) != "";
	if (!force && hideIt == isDisplay(MIflds[4])) return; // already the right display

	var isOF = FldNmbr > FieldNumbers.magicitemsD;
	if (isOF && !isTemplVis("ASoverflow")) return; // overflow, but overflow is not visible

	// Define some constants
	var noteWidth = typePF ? 25 : 35;
	var fullWidth = !typePF ? 216 : isOF ? 243.45 : 164.3;
	var nameRect = tDoc.getField(MIflds[0] + ".1").rect;
	var noteRect = tDoc.getField(MIflds[1] + ".1").rect;
	var startCount = nameRect[0];
	var smallWidth = !typePF ? tDoc.getField(MIflds[4] + ".1").rect[0] - 1 - startCount : isOF ? 211.27 : 132.15;

	if (hideIt) {
		// hide it, uncheck it, and set the rect for the Name and Note fields
		Hide(MIflds[4]);
		Hide(MIflds[5]);
		Checkbox(MIflds[4], false);
		nameRect[2] = nameRect[0] + fullWidth - noteWidth;
	} else {
		// show it and set the rect for the Name and Note fields
		Show(MIflds[4]);
		Show(MIflds[5]);
		nameRect[2] = nameRect[0] + smallWidth - noteWidth;
	}
	// Apply the new positions of the Name and Note fields
	noteRect[0] = nameRect[2];
	noteRect[2] = noteRect[0] + noteWidth;
	tDoc.getField(MIflds[1] + ".1").rect = noteRect;
	tDoc.getField(MIflds[0] + ".1").rect = nameRect;
	if (!event.target || event.target.name !== MIflds[0]) {
		// Re-input the value as to counteract the changing of font rendering
		tDoc.getField(MIflds[0]).value = tDoc.getField(MIflds[0]).value;
	}
}

// Correct the visibility of the Magic Item attuned checkboxes when showing the 3rd/overflow page
function correctMIattunedVisibility(pageType) {
	var startNo = pageType == "ASoverflow" ? FieldNumbers.magicitemsD + 1 : 1;
	var endNo = pageType == "ASoverflow" ? FieldNumbers.magicitems : FieldNumbers.magicitemsD;
	for (var i = startNo; i <= endNo; i++) {
		setMIattunedVisibility(i, true);
	}
}

// Set the options of the dropdown of magic items
function SetMagicItemsDropdown(forceTooltips) {
	var ArrayDing = [""];
	var tempString = "Type in the name of the magic item (or select it from the drop-down menu) and its text and features will be filled out automatically, provided it is a recognized magic item.\n\nAbility scores will not be automatically altered other than their tool tips (mouseover texts) and in the Scores dialog.";
	for (var key in MagicItemsList) {
		if (testSource(key, MagicItemsList[key], "magicitemExcl")) continue;
		var MIname = MagicItemsList[key].name;
		if (ArrayDing.indexOf(MIname) === -1) ArrayDing.push(MIname);
	}
	ArrayDing.sort();

	var ArrayDingSource = ArrayDing.toSource();
	var applyItems = tDoc.getField("Extra.Magic Item 1").submitName !== ArrayDingSource;
	if (applyItems) tDoc.getField("Extra.Magic Item 1").submitName = ArrayDingSource;

	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		var MIfld = "Extra.Magic Item " + i;
		var MIfldV = What(MIfld);
		if (applyItems) {
			tDoc.getField(MIfld).setItems(ArrayDing);
			Value(MIfld, MIfldV, tempString);
		} else if (forceTooltips) {
			AddTooltip(MIfld, tempString);
		}
	}
}

//make a menu of all the magic items, sorted by different criteria
function ParseMagicItemMenu() {
	var iMenus = {
		alphabetical : {},
		rarity : {
			common : [],
			uncommon : [],
			rare : [],
			"very rare" : [],
			legendary : [],
			artifact : []
		},
		type : {
			"Armor, shield, AC bonus" : [],
			Potion : [],
			Ring : [],
			Rod : [],
			Scroll : [],
			Staff : [],
			Wand : [],
			"Wondrous item" : [],
			Weapon : []
		},
		special : {
			"Ability score increase" : [],
			"Hit points" : [],
			Movement : [],
			"Resistances or immunities" : [],
			Skills : [],
			Spells : [],
			Vision : [],
		},
		source : { namesArr : [] },
		ref : {}
	};
	var spaceArr = new Array(38).join("\u2002");
	var amendSrc = function(nameTxt, srcTxt) {
		if (!srcTxt) return nameTxt;
		return nameTxt + spaceArr.slice(0, nameTxt.length < 35 ? 38 - nameTxt.length : 4) + srcTxt;
	}
	var sortItem = function(mainItem, subItem) {
		var iObj = MagicItemsList[mainItem];
		var sObj = subItem ? iObj[subItem.toLowerCase()] : false;
		var tObj = sObj ? {} : iObj;
		if (sObj) {
			for (var attr in iObj) tObj[attr] = iObj[attr];
			for (var attr in sObj) tObj[attr] = sObj[attr];
		}
		var iSrc = tObj.source ? stringSource(tObj, "first,abbr", "(", ")") : false;  // DEBUGGING!!!
		var itemName = amendSrc(RemoveZeroWidths(!sObj ? iObj.name : sObj.name ? sObj.name : iObj.name + " [" + subItem + "]"), iSrc);
		var firstLetter = itemName[0].toUpperCase();
		// If this is a subitem and it has the exact same name as a previously added subitem, we have to make sure it 
		if (sObj && sObj.name && iMenus.ref[itemName]) {
			itemName = amendSrc(RemoveZeroWidths(iObj.name + " [" + subItem + "]"), iSrc);
			firstLetter = itemName[0].toUpperCase();
		}
		iMenus.ref[itemName] = subItem ? mainItem + "#" + subItem : mainItem;
		if (!iMenus.alphabetical[firstLetter]) iMenus.alphabetical[firstLetter] = [];
		iMenus.alphabetical[firstLetter].push(itemName);
		if (tObj.source) {
			var aSrcs = parseSource(tObj.source);
			for (var a = 0; a < aSrcs.length; a++) {
				var aSrc = SourceList[aSrcs[a][0]];
				var uSrc = aSrc.name + " (" + aSrc.abbreviation + ")";
				if (!iMenus.source[uSrc]) {
					iMenus.source[uSrc] = [];
					iMenus.source.namesArr.push(uSrc);
				}
				iMenus.source[uSrc].push(itemName);
			}
		}
		if (tObj.rarity && iMenus.rarity[tObj.rarity.toLowerCase()]) {
			iMenus.rarity[tObj.rarity.toLowerCase()].push(itemName);
		}
		if ((/weapon/i).test(tObj.type) || tObj.weaponsAdd || tObj.weaponOptions || (tObj.chooseGear && (/weapon|ammo/i).test(tObj.chooseGear.type))) {
			iMenus.type.Weapon.push(itemName);
		}
		if ((/armor|shield/i).test(tObj.type) || tObj.armorAdd || tObj.shieldAdd || tObj.armorOptions || tObj.extraAC || (tObj.chooseGear && tObj.chooseGear.type == "armor")) {
			iMenus.type["Armor, shield, AC bonus"].push(itemName);
		}
		var searchType = tObj.type ? tObj.type.toLowerCase() : false;
		for (var aType in iMenus.type) {
			if (!searchType) break;
			if ((/weapon|armor|shield/i).test(aType)) continue;
			if (searchType.indexOf(aType.toLowerCase()) !== -1) {
				iMenus.type[aType].push(itemName);
				break;
			}
		}
		if (tObj.scores || tObj.scorestxt || tObj.scoresOverride) {
			iMenus.special["Ability score increase"].push(itemName);
		}
		if (tObj.calcChanges && tObj.calcChanges.hp) {
			iMenus.special["Hit points"].push(itemName);
		}
		if (tObj.speed || (/(flying|climbing|burrowing|swimming|walking) speed/i).test(tObj.descriptionFull) || (/of (flying|climbing|burrowing|swimming)/i).test(tObj.name)) {
			iMenus.special.Movement.push(itemName);
		}
		if (tObj.dmgres || (tObj.savetxt && tObj.savetxt.immune)) {
			iMenus.special["Resistances or immunities"].push(itemName);
		}
		if (tObj.skills || tObj.skillstxt || tObj.advantage) {
			iMenus.special.Skills.push(itemName);
		}
		if (tObj.spellcastingBonus || tObj.spellChanges || (tObj.calcChanges && tObj.calcChanges.spellList)) {
			iMenus.special.Spells.push(itemName);
		}
		if (tObj.vision) {
			iMenus.special.Vision.push(itemName);
		}
	}
	for (var item in MagicItemsList) {
		var anItem = MagicItemsList[item];
		if (anItem.source && testSource(item, anItem, "magicitemExcl")) continue;
		var justDoMainItem = true;
		if (anItem.choices && !anItem.selfChoosing) {
			for (var c = 0; c < anItem.choices.length; c++) {
				var aChL = anItem.choices[c].toLowerCase();
				var aSubItem = anItem[aChL];
				if (!aSubItem || (aSubItem.source && testSource(aChL, aSubItem, "magicitemExcl"))) continue;
				for (var attr in aSubItem) {
					if (!(/^(description.*|name.*|source|notLegalAL|magicItemTable|storyItemAL|extraTooltip|attunement|weight|prereq.*|allowDuplicates|calculate)$/i).test(attr)) {
						justDoMainItem = false;
						sortItem(item, anItem.choices[c]);
						break;
					}
				}
			}
		}
		if (justDoMainItem) sortItem(item);
	}
	// First add the alphabetical listing of all the magic items
	var tempMenu = [], alphabetaArr = [];
	for (var letter in iMenus.alphabetical) alphabetaArr.push(letter);
	alphabetaArr.sort();
	for (var i = 0; i < alphabetaArr.length; i++) {
		var tempMenu2 = iMenus.alphabetical[alphabetaArr[i]];
		tempMenu2.sort();
		for (var a = 0; a < tempMenu2.length; a++) {
			tempMenu2[a] = {
				cName : tempMenu2[a],
				cReturn : "item#set#" + iMenus.ref[tempMenu2[a]]
			}
		}
		tempMenu.push({ cName : alphabetaArr[i], oSubMenu : [].concat(tempMenu2) });
	}
	AddMagicItemsMenu = [{
		cName : "Alphabetically",
		oSubMenu : [].concat(tempMenu)
	}]
	// Then a menu per rarity
	var tempMenu = [];
	for (var entry in iMenus.rarity) {
		var tempMenu2 = iMenus.rarity[entry];
		if (!tempMenu2.length) continue;
		tempMenu2.sort();
		for (var a = 0; a < tempMenu2.length; a++) {
			tempMenu2[a] = {
				cName : tempMenu2[a],
				cReturn : "item#set#" + iMenus.ref[tempMenu2[a]]
			}
		}
		tempMenu.push({ cName : entry[0].toUpperCase() + entry.substr(1), oSubMenu : [].concat(tempMenu2) });
	}
	AddMagicItemsMenu.push({
		cName : "By rarity",
		oSubMenu : [].concat(tempMenu)
	});
	// Then a menu per source
	var tempMenu = [];
	iMenus.source.namesArr.sort();
	for (var s = 0; s < iMenus.source.namesArr.length; s++) {
		var entry = iMenus.source.namesArr[s];
		var tempMenu2 = iMenus.source[entry];
		if (!tempMenu2 || !tempMenu2.length || entry == "namesArr") continue;
		tempMenu2.sort();
		for (var a = 0; a < tempMenu2.length; a++) {
			tempMenu2[a] = {
				cName : tempMenu2[a],
				cReturn : "item#set#" + iMenus.ref[tempMenu2[a]]
			}
		}
		tempMenu.push({ cName : entry, oSubMenu : [].concat(tempMenu2) });
	}
	AddMagicItemsMenu.push({
		cName : "By source",
		oSubMenu : [].concat(tempMenu)
	}, { cName : "-" });
	// Then a main menu item per type
	for (var entry in iMenus.type) {
		var tempMenu2 = iMenus.type[entry];
		if (!tempMenu2.length) continue;
		tempMenu2.sort();
		for (var a = 0; a < tempMenu2.length; a++) {
			tempMenu2[a] = {
				cName : tempMenu2[a],
				cReturn : "item#set#" + iMenus.ref[tempMenu2[a]]
			}
		}
		AddMagicItemsMenu.push({ cName : entry, oSubMenu : [].concat(tempMenu2) });
	}
	AddMagicItemsMenu.push({ cName : "-" });
	// Then a main menu item per bonus
	for (var entry in iMenus.special) {
		var tempMenu2 = iMenus.special[entry];
		if (!tempMenu2.length) continue;
		tempMenu2.sort();
		for (var a = 0; a < tempMenu2.length; a++) {
			tempMenu2[a] = {
				cName : tempMenu2[a],
				cReturn : "item#set#" + iMenus.ref[tempMenu2[a]]
			}
		}
		AddMagicItemsMenu.push({ cName : entry, oSubMenu : [].concat(tempMenu2) });
	}
};

//Make menu for the button on each Magic Item line and parse it to Menus.magicitems
function MakeMagicItemMenu_MagicItemOptions(MenuSelection, itemNmbr) {
	var magicMenu = [];
	if (!itemNmbr) itemNmbr = parseFloat(event.target.name.slice(-2));
	var ArrayNmbr = itemNmbr - 1;
	var MIflds = ReturnMagicItemFieldsArray(itemNmbr);
	var theField = What(MIflds[0]) != "";
	var noUp = itemNmbr === 1;
	var noDown = itemNmbr === FieldNumbers.magicitems;
	var upToOtherPage = itemNmbr === (FieldNumbers.magicitemsD + 1) ? " (to third page)" : "";
	var downToOtherPage = itemNmbr === FieldNumbers.magicitemsD ? " (to overflow page)" : "";
	var visibleAttunement = How(MIflds[4]) == "";
	var aMI;

	if (!MenuSelection || MenuSelection === "justMenu") {
		// a function to add the other items
		var menuLVL1 = function (array) {
			for (i = 0; i < array.length; i++) {
				magicMenu.push({
					cName : array[i][0],
					cReturn : "item#" + array[i][1],
					bEnabled : array[i][2] !== undefined ? array[i][2] : true,
					bMarked : array[i][3] !== undefined ? array[i][3] : false
				});
			}
		};
		// if this magic item allows for a choice, add that option as the first thing in the menu
		if (CurrentMagicItems.known[ArrayNmbr]) {
			aMI = MagicItemsList[CurrentMagicItems.known[ArrayNmbr]];
			if (MagicItemsList[CurrentMagicItems.known[ArrayNmbr]].choices) {
				var aMIopts = aMI.choices;
				var choiceMenu = {
					cName : "Change type of " + aMI.name,
					oSubMenu : []
				};
				for (var i = 0; i < aMIopts.length; i++) {
					var aCh = aMIopts[i];
					var aChL = aCh.toLowerCase();
					if (!aMI[aChL] || (aMI[aChL].source && testSource(aChL, aMI[aChL], "magicitemExcl"))) continue;
					choiceMenu.oSubMenu.push({
						cName : aCh + stringSource(aMI[aChL].source ? aMI[aChL] : aMI, "first,abbr", "\t   [", "]"),
						cReturn : "item#choice#" + aChL,
						bMarked : CurrentMagicItems.choices[ArrayNmbr] == aChL
					});
				}
				if (choiceMenu.oSubMenu.length > 1) magicMenu.push(choiceMenu);
			}
			// an option to read the whole description
			if (Who(MIflds[2])) menuLVL1([["Show full text of " + aMI.name, "popup"]]);
			// add a separator if we have any items in the menu so far
			if (magicMenu.length) magicMenu.push({ cName : "-" });
		}
		// a way to select another magic item
		if (!AddMagicItemsMenu) ParseMagicItemMenu();
		magicMenu.push({
			cName : CurrentMagicItems.known[ArrayNmbr] ? "Change item to" : "Apply item",
			oSubMenu : AddMagicItemsMenu
		},{ cName : "-" });
		// now all the default options
		var magicArray = [
			["Move up" + upToOtherPage, "up", !noUp],
			["Move down" + downToOtherPage, "down", !noDown],
			["-", "-"],
			["Insert empty item", "insert", noDown || !theField ? false : true],
			["Delete item", "delete"],
			["Clear item", "clear"],
			["-", "-"],
			["Show attuned checkbox", "attunement", undefined, visibleAttunement],
			["-", "-"],
			["Copy to Adventuring Gear (page 2)", "equipment#gear#r", theField]
		].concat(What("Adventuring Gear Remember") !== false || !visibleAttunement ? [] : [
			["Copy to Attuned Magical Items (page 2)", "equipment#magic#", theField]
		]).concat([
			["Copy to Extra Equipment (page 3)", "equipment#extra#", theField]
		]);
		menuLVL1(magicArray);
		// set it to the global variable
		Menus.magicitems = magicMenu;
		if (MenuSelection == "justMenu") return;
	}
	MenuSelection = MenuSelection ? MenuSelection : getMenu("magicitems");
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] != "item") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Magic item menu option...");

	var getChoiceName = function(item, choice) {
		var aMI = MagicItemsList[item];
		if (!choice || !aMI[choice]) return aMI.name;
		if (aMI[choice].name) return aMI[choice].name;
		for (var i = 0; i < aMI.choices.length; i++) {
			if (aMI.choices[i].toLowerCase() == choice) {
				return aMI.name + " [" + aMI.choices[i] + "]";
			}
		}
	}

	switch (MenuSelection[1]) {
		case "set" :
			Value(MIflds[0], getChoiceName(MenuSelection[2], MenuSelection[3]));
			break;
		case "popup" :
			ShowDialog("Magic item's full description", Who(MIflds[2]));
			break;
		case "choice" :
			aMI = MagicItemsList[CurrentMagicItems.known[ArrayNmbr]];
			if (MenuSelection[2] && aMI && aMI[MenuSelection[2]] && CurrentMagicItems.choices[ArrayNmbr] != MenuSelection[2]) {
				var aMIvar = aMI[MenuSelection[2]];
				Value(MIflds[0], getChoiceName(CurrentMagicItems.known[ArrayNmbr], MenuSelection[2]));
			}
			break;
		case "up" :
			if (noUp) return;
		case "down" :
			if (MenuSelection[1] == "down" && noDown) return;
			calcStop();
			IsNotMagicItemMenu = false;
			thermoTxt = thermoM("Moving the magic item " + MenuSelection[1] + "...", false);
			// Get the other fields
			var otherNmbr = MenuSelection[1] == "down" ? itemNmbr + 1 : itemNmbr - 1;
			var MIfldsO = ReturnMagicItemFieldsArray(otherNmbr);
			// Now swap all the fields
			for (var i = 0; i < MIflds.length - 1; i++) {
				var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
				copyField(MIflds[i], MIfldsO[i], exclObj, true);
				thermoM(i/(MIflds.length - 1)); //increment the progress dialog's progress
			}
			// Correct the visibility of the attuned fields
			setMIattunedVisibility(itemNmbr);
			setMIattunedVisibility(otherNmbr);
			// Correct the entry in the CurrentMagicItems.known array
			if (!CurrentVars.manual.items) {
				var thisKnown = CurrentMagicItems.known[itemNmbr - 1];
				var thisChoice = CurrentMagicItems.choices[itemNmbr - 1];
				CurrentMagicItems.known[itemNmbr - 1] = CurrentMagicItems.known[otherNmbr - 1];
				CurrentMagicItems.known[otherNmbr - 1] = thisKnown;
				CurrentMagicItems.choices[itemNmbr - 1] = CurrentMagicItems.choices[otherNmbr - 1];
				CurrentMagicItems.choices[otherNmbr - 1] = thisChoice;
			}
			// Correct the description if moving between 3rd and overflow page
			if ((upToOtherPage && MenuSelection[1] == "up") || (downToOtherPage && MenuSelection[1] == "down")) {
				correctMIdescriptionLong(itemNmbr);
				correctMIdescriptionLong(otherNmbr);
			}
			IsNotMagicItemMenu = true;
			break;
		case "insert" :
			MagicItemInsert(itemNmbr);
			break;
		case "delete" :
			MagicItemDelete(itemNmbr);
			break;
		case "clear" :
			thermoTxt = thermoM("Clearing magic item...", false);
			MagicItemClear(itemNmbr, true);
			break;
		case "equipment" :
			calcStop();
			thermoTxt = thermoM("Copying the item to equipment section...", false);
			var itemWeight = What(MIflds[3]);
			if (isNaN(itemWeight) || itemWeight <= 0) itemWeight = "";
			AddToInv(MenuSelection[2], MenuSelection[3], What(MIflds[0]), "", itemWeight, "", false, false, false, true);
			break;
		case "attunement" :
			calcStop();
			thermoTxt = thermoM((visibleAttunement ? "Hiding" : "Showing") + " the attuned checkbox...", false);
			var currentlyChecked = tDoc.getField(MIflds[4]).isBoxChecked(0);
			Checkbox(MIflds[4], !visibleAttunement && What(MIflds[0]), undefined, visibleAttunement ? "hide" : "");
			setMIattunedVisibility(itemNmbr);
			// Now if attunement was visible and it was unchecked, we have to reapply the magic item's properties
			if (!CurrentVars.manual.items) {
				var curMI = CurrentMagicItems.known[itemNmbr - 1];
				if (curMI && visibleAttunement && !currentlyChecked) {
					// now apply or remove the magic item's features
					var Fea = ApplyFeatureAttributes(
						"item", // type
						curMI, // fObjName
						[0, CurrentMagicItems.level, false], // lvlA [old-level, new-level, force-apply]
						false, // choiceA [old-choice, new-choice, "only"|"change"]
						false // forceNonCurrent
					);
				}
			}
			break;
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

// Add a magic item to the third page or overflow page
function AddMagicItem(item, attuned, itemDescr, itemWeight, overflow, forceAttunedVisible) {
	item = item.substring(0, 2) === "- " ? item.substring(2) : item;
	var itemLower = item.toLowerCase();
	var RegExItem = "\\b" + item.RegEscape() + "\\b";
	var RegExItemNo = RegExp(RegExItem + " \\+\\d+", "i");
	RegExItem = RegExp(RegExItem, "i");
	var startFld = overflow ? FieldNumbers.magicitemsD + 1 : 1;
	for (var n = 1; n <= 2; n++) {
		for (var i = startFld; i <= FieldNumbers.magicitems; i++) {
			var MIflds = ReturnMagicItemFieldsArray(i);
			var curItem = What(MIflds[0]);
			if (n === 1 && ((RegExItem.test(curItem) && !RegExItemNo.test(curItem)) || curItem.toLowerCase() === itemLower)) {
				return; // the item already exists
			} else if (n === 2 && curItem === "") {
				if (i > FieldNumbers.magicitemsD && !tDoc.getField(BookMarkList["Overflow sheet"])) DoTemplate("ASoverflow", "Add");
				Value(MIflds[0], item);
				var recognizedItem = CurrentMagicItems.known[i - 1];
				if (!recognizedItem) {
					if (itemDescr !== undefined) Value(MIflds[4], itemDescr);
					if (itemWeight !== undefined) Value(MIflds[3], itemWeight);
					if (attuned !== undefined) Checkbox(MIflds[4], attuned ? true : false);
				} else if ((forceAttunedVisible === undefined || forceAttunedVisible) && attuned !== undefined && !attuned && MagicItemsList[recognizedItem].attunement) {
					// This is an item that requires attunement, but attunement is explicitly set to none, so undo the automation of the magic item
					Checkbox(MIflds[4], false);
					ApplyAttunementMI(i);
				}
				var isAttuneVisible = How("Extra.Magic Item Attuned " + i) == "";
				if (forceAttunedVisible !== undefined && forceAttunedVisible !== isAttuneVisible) {
					AddTooltip("Extra.Magic Item Attuned " + i, undefined, forceAttunedVisible ? "" : "hide");
					setMIattunedVisibility(i);
					if (attuned === undefined) {
						Checkbox(MIflds[4], forceAttunedVisible);
					} else if (!attuned && forceAttunedVisible) {
						Checkbox(MIflds[4], false);
						ApplyAttunementMI(i);
					}
				}
				return;
			}
		}
	}
}

// Remove a magic item from the third page or overflow page
function RemoveMagicItem(item) {
	item = item.substring(0, 2) === "- " ? item.substring(2) : item;
	var itemLower = item.toLowerCase();
	var RegExItem = "\\b" + item.RegEscape() + "\\b";
	var RegExItemNo = RegExp(RegExItem + " \\+\\d+", "i");
	RegExItem = RegExp(RegExItem, "i");
	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		var curItem = What("Extra.Magic Item " + i);
		if ((RegExItem.test(curItem) && !RegExItemNo.test(curItem)) || curItem.toLowerCase() === itemLower) {
			MagicItemClear(i, true);
			break;
		}
	}
}

// Insert a magic item at the position wanted
function MagicItemInsert(itemNmbr) {
	// Stop the function if the selected slot is already empty
	if (!What("Extra.Magic Item " + itemNmbr)) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Inserting empty magic item...");
	calcStop();
	IsNotMagicItemMenu = false;

	//look for the first empty slot below the slot
	var endslot = false;
	for (var it = itemNmbr + 1; it <= FieldNumbers.magicitems; it++) {
		if (What("Extra.Magic Item " + it) === "") {
			endslot = it;
			break;
		}
	}

	// Only do something if an empty slot was found
	if (endslot) {
		// Cycle through the slots starting with the found empty one and add the values of the one above
		for (var it = endslot; it > itemNmbr; it--) {
			// Copy all the fields
			var MIfldsFrom = ReturnMagicItemFieldsArray(it - 1);
			var MIfldsTo = ReturnMagicItemFieldsArray(it);
			for (var i = 0; i < MIfldsFrom.length - 1; i++) {
				var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
				copyField(MIfldsFrom[i], MIfldsTo[i], exclObj);
			}
			// Correct the known array & choices arrays
			if (!CurrentVars.manual.items) {
				CurrentMagicItems.known[it - 1] = CurrentMagicItems.known[it - 2];
				CurrentMagicItems.choices[it - 1] = CurrentMagicItems.choices[it - 2];
			}
			// Correct the attuned checkbox visibility
			setMIattunedVisibility(it);
			// Correct the description (normal/long)
			if (it == FieldNumbers.magicitemsD + 1) correctMIdescriptionLong(it);
		}

		// Clear the selected slot
		MagicItemClear(itemNmbr);
	}

	IsNotMagicItemMenu = true;
	thermoM(thermoTxt, true); // Stop progress bar
}

// Delete a magic item at the position wanted and move the rest up
function MagicItemDelete(itemNmbr) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Deleting magic item...");
	calcStop();

	var maxItem = FieldNumbers.magicitems;
	// Stop at the end of the first page if last one on first page is empty
	if (itemNmbr <= FieldNumbers.magicitemsD && !What("Extra.Magic Item " + FieldNumbers.magicitemsD)) maxItem = FieldNumbers.magicitemsD;

	// First clear the current item so that it's automation is run
	MagicItemClear(itemNmbr, true);
	IsNotMagicItemMenu = false;

	// Make every line identical to the one below, starting with the selected line
	for (var it = itemNmbr; it < maxItem; it++) {
		// Copy all the fields
		var MIfldsFrom = ReturnMagicItemFieldsArray(it + 1);
		var MIfldsTo = ReturnMagicItemFieldsArray(it);
		for (var i = 0; i < MIfldsFrom.length - 1; i++) {
			var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
			copyField(MIfldsFrom[i], MIfldsTo[i], exclObj);
		}
		// Correct the known & choices arrays
		if (!CurrentVars.manual.items) {
			CurrentMagicItems.known[it - 1] = CurrentMagicItems.known[it];
			CurrentMagicItems.choices[it - 1] = CurrentMagicItems.choices[it];
		}
		// Correct the attuned checkbox visibility
		setMIattunedVisibility(it);
		// Correct the description (normal/long)
		if (it == FieldNumbers.magicitemsD) correctMIdescriptionLong(it);
	}

	// Clear the final line
	MagicItemClear(maxItem);

	IsNotMagicItemMenu = true;
	thermoM(thermoTxt, true); // Stop progress bar
}

// Clear a magic item at the position given
function MagicItemClear(itemNmbr, doAutomation) {
	var MIflds = ReturnMagicItemFieldsArray(itemNmbr);
	if (doAutomation && !CurrentVars.manual.items && CurrentMagicItems.known[itemNmbr - 1]) {
		IsNotMagicItemMenu = true;
		Value("Extra.Magic Item " + itemNmbr, "");
		tDoc.resetForm(MIflds[1]);
	} else {
		if (!CurrentVars.manual.items) CurrentMagicItems.known[itemNmbr - 1] = "";
		AddTooltip(MIflds[2], "", "");
		tDoc.getField(MIflds[2]).setAction("Calculate", "");
		AddTooltip(MIflds[4], undefined, "");
		if (IsNotReset) tDoc.resetForm(MIflds);
		setMIattunedVisibility(itemNmbr);
	}
}

// Change the magic item to include a selected weapon, armor, or ammunition
function selectMagicItemGearType(AddRemove, FldNmbr, typeObj, oldChoice, correctingDescrLong) {
	if (!event.target || !event.target.name || event.target.name.indexOf("Extra.Magic Item ") == -1 || !typeObj.type) return;
	if (typeObj.excludeCheck && typeof typeObj.excludeCheck != "function") delete typeObj.excludeCheck;
	// see what type of thing we are dealing with or return if none is recognized
	switch (typeObj.type.toLowerCase()) {
		case "ammo":
		case "ammos":
		case "ammunition":
		case "ammunitions":
			var typeNm = "ammunition";
			var typeNmC = "Ammunition";
			var parseFnct = "ParseAmmo";
			var baseList = AmmoList;
			var exclObj = "ammoExcl";
			break;
		case "wea":
		case "weapon":
		case "weapons":
			var typeNm = "weapon";
			var typeNmC = "Weapon";
			var parseFnct = "ParseWeapon"
			var baseList = WeaponsList;
			var exclObj = "weapExcl";
			break;
		case "armor":
		case "armors":
		case "armour":
		case "armours":
			var typeNm = "armor";
			var typeNmC = "Armor";
			var parseFnct = "ParseArmor";
			var baseList = ArmourList;
			var exclObj = "armorExcl";
			break;
		default:
			return;
	}

	var createString = function(type, addition, fixed) {
		switch (type ? type.toLowerCase() : "") {
			default:
			case "prefix":
				return addition + " " + fixed;
			case "suffix":
				return fixed + " " + addition;
			case "brackets":
				return fixed + " (" + addition.replace(/ ?\(.+\)/, '') + ")";
		}
	}
	var MIflds = ReturnMagicItemFieldsArray(FldNmbr);
	var isApplyFld = event.target.name == MIflds[0];
	var ArrayNmbr = FldNmbr - 1;
	var curItem = CurrentMagicItems.known[ArrayNmbr];
	var curChoice = oldChoice ? oldChoice : CurrentMagicItems.choices[ArrayNmbr];
	var aMI = MagicItemsList[curItem];
	var aMIvar = curChoice && aMI[curChoice] ? aMI[curChoice] : false;
	var curName = curChoice ? MagicItemsList[curItem][curChoice].name : MagicItemsList[curItem].name;
	var itemToProcess, selectedItem;

	// use the name of the choice object (if any) or the shortest of the name, nameAlt, and nameTest of the parent object
	var nameObj = aMIvar && aMIvar.name ? aMIvar : aMI;
	var curName = nameObj.name;
	var useName = [nameObj.name].concat(nameObj.nameAlt ? [nameObj.nameAlt] : []).concat(nameObj.nameTest ? [nameObj.nameTest] : []).reduce(function(a, b) { return a.length <= b.length ? a : b; });

	// get the value of the magic item name field
	var useVal = isApplyFld && AddRemove ? event.value : isApplyFld ? event.target.value : What(MIflds[0]);
	// see if the item is not already present in the string
	var isItem = tDoc[parseFnct](useVal);
	// if this is recognized as a weapon, make sure we are not just triggering on the default words (axe, sword, hammer, bow, crossbow)
	var defaultItems = {
		"battleaxe" : [/\baxes?\b/i, /battle/i],
		"longsword" : [/\bswords?\b/i, /long/i],
		"warhammer" : [/\bhammers?\b/i, /war/i],
		"shortbow" : [/\bbows?\b/i, /short/i],
		"light crossbow" : [/\bcrossbows?\b/i, /light/i]
	}
	if (typeNm == "weapon" && defaultItems[isItem] && (defaultItems[isItem][0]).test(useVal) && !(defaultItems[isItem][1]).test(useVal)) {
		isItem = ParseWeapon(useVal.replace(defaultItems[isItem][0], ''));
	}
	// if removing this item
	if (!AddRemove) {
		if (isItem) {
			selectedItem = baseList[isItem].name;
			var theItemName = selectedItem.toLowerCase();
		} else {
			return; // nothing more to do if we are just removing this item and no item is found
		}
	} else if (!isItem) {
		// collect all types of items
		var itemChoices = [];
		var itemRefs = {};
		for (var key in baseList) {
			var kObj = baseList[key];
			if (testSource(key, kObj, exclObj)) continue;
			// some type-dependent filters
			if (typeNm == "armor" && (!kObj.type || kObj.isMagicArmor)) {
				continue;
			} else if (typeNm == "weapon" && ((/natural|spell|cantrip|improvised/i).test(kObj.type) || kObj.isMagicWeapon)) {
				continue;
			} else if (typeNm == "ammunition" && (kObj.isMagicAmmo || WeaponsList[key])) {
				continue;
			}
			if (typeObj.excludeCheck && typeObj.excludeCheck(key, kObj)) continue;
			var capName = kObj.name.capitalize();
			itemChoices.push(capName);
			itemRefs[capName] = key;
		}
		if (typeNm != "armor") itemChoices.sort();
		if (!IsNotImport) {
			userSelected = itemChoices[0];
			console.println("During importing from another MPMB's Character Record Sheet, the sheet was unable to show a pop-up dialog to let you choose what type of " + typeNm + " the '" + curName + "' is. As a result, '" + userSelected + "' was chosen for you automatically. If you wish to change this, reapply the '" + curName + "'.");
			console.show();
		} else {
			var userSelected = AskUserOptions("Select Type of " + typeNmC, "Choose which " + typeNm + " type this '" + curName + "' is.\nIf you want to change the " + typeNm + " type at a later time, select the magic item again from the drop-down box." + (aMI.choices ? "\nYou will also be prompted to select the " + typeNm + " type again when you select a choice using the button in this magic item line," + (aMIvar ? " even when selecting '" + aMIvar.name + "' again." : ".") : ""), itemChoices, "radio", true);
		}

		var theItemName = userSelected.toLowerCase();
		isItem = itemRefs[userSelected];
		selectedItem = baseList[isItem].name;
	} else {
		if (isApplyFld && event.target.setVal) selectedItem = baseList[isItem].name;
		var theItemName = baseList[isItem].name.toLowerCase();
	}
	// ammunitions are often written as plural, but we don't want that here
	if (typeNm == "ammunition" && theItemName.substr(-1) == "s") {
		theItemName = theItemName.substr(0, theItemName.length - 1);
		if (selectedItem) selectedItem = selectedItem.substr(0, selectedItem.length - 1);
	}
	// get the new name of the magic item
	var newMIname = selectedItem ? createString(typeObj.prefixOrSuffix, selectedItem, useName) : useVal;
	// See if there is a special string set for how the item should appear on the 1st page
	if (typeObj.itemName1stPage) {
		itemToProcess = createString(typeObj.itemName1stPage[0], baseList[isItem].name, typeObj.itemName1stPage[1]);
	}
	// Apply the item to the sheet
	if (!correctingDescrLong) {
		switch (typeNm) {
			case "ammunition":
				tDoc[AddRemove ? 'AddAmmo' : 'RemoveAmmo'](itemToProcess ? itemToProcess : newMIname.replace(/ammunition (\+\d)/i, "$1").replace(/(\+\d) *\((.*?)\)/i, "$1 $2"), 1);
				break;
			case "weapon":
				processAddWeapons(AddRemove, itemToProcess ? itemToProcess : newMIname.replace(/weapon (\+\d)/i, "$1").replace(/(\+\d) *\((.*?)\)/i, "$1 $2"));
				break;
			case "armor":
				processAddArmour(AddRemove, itemToProcess ? itemToProcess : newMIname.replace(/armou?r (\+\d)/i, "$1").replace(/(\+\d) *\((.*?)\)/i, "$1 $2"));
				break;
		}
	}
	if (AddRemove && (isApplyFld || correctingDescrLong)) {
		// Update the description of the magic item to reflect the choice
		var descrWrd = typeObj.descriptionChange ? typeObj.descriptionChange[1] : typeNm;
		var desrcStr = What(MIflds[2]).replace(
			descrWrd,
			typeObj.descriptionChange && typeObj.descriptionChange[0].toLowerCase() == "replace" ? theItemName :
				createString(
					typeObj.descriptionChange ? typeObj.descriptionChange[0] : typeObj.prefixOrSuffix,
					theItemName,
					descrWrd
				)
		);
		Value(MIflds[2], desrcStr);
	}
	if (AddRemove && isApplyFld) {
		// set the weight of the item, if any
		if (baseList[isItem].weight) {
			var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
			Value(MIflds[3], RoundTo(baseList[isItem].weight * massMod, 0.001, true));
		}
		// set the changed name of the magic item (always do this last!)
		if (newMIname !== event.value) event.target.setVal = newMIname;
	}
}

// Gather some variables to pass to a prereqeval function
function gatherPrereqevalVars() {
	var moreProfs = What("MoreProficiencies");
	var gObj = {
		// general character abilities
		isSpellcaster : isSpellcaster(),
		characterLevel : Number(What("Character Level")),
		// armour proficiencies
		shieldProf : tDoc.getField("Proficiency Shields").isBoxChecked(0),
		lightArmorProf : tDoc.getField("Proficiency Armor Light").isBoxChecked(0),
		mediumArmorProf : tDoc.getField("Proficiency Armor Medium").isBoxChecked(0),
		heavyArmorProf : tDoc.getField("Proficiency Armor Heavy").isBoxChecked(0),
		// weapon proficiencies
		simpleWeaponsProf : tDoc.getField("Proficiency Weapon Simple").isBoxChecked(0),
		martialWeaponsProf : tDoc.getField("Proficiency Weapon Martial").isBoxChecked(0),
		otherWeaponsProf : What("Proficiency Weapon Other Description"),
		// other proficiencies
		toolProfs : [moreProfs],
		languageProfs : [moreProfs],
		skillProfs : [],
		// specifics
		hasEldritchBlast : (/,eldritch blast,/i).test(CurrentWeapons.known) || isSpellUsed("eldritch blast", true)
	};

	// fill the arrays for tool, language, and skill proficiencies
	for (var i = 1; i <= FieldNumbers.langstools; i++) {
		var aLang = What("Language " + i);
		if (aLang) gObj.languageProfs.push(aLang);
		var aTool = What("Tool " + i);
		if (aTool) gObj.toolProfs.push(aTool);
	}
	var skillsAlphaBeta = Who('Text.SkillsNames') === 'alphabeta';
	for (var i = 0; i < SkillsList.abbreviations.length - 2; i++) {
		var isProf = tDoc.getField(SkillsList.abbreviations[i] + " Prof").isBoxChecked(0);
		if (isProf) gObj.skillProfs.push(SkillsList[skillsAlphaBeta ? "names" : "namesByAS"][i]);
	}
	return gObj;
}

/*
NEW ATTRIBUTES
	limfeaname // Optional; If defined it is used for populating the limited feature section and the action section instead of `name`
	scorestxt // Optional; String; If defined it is used for the text in the Ability Score dialog and tooltips. If not defined, but 'scores' is defined, 'scores' will be used to generate a text
	scoresOverride // Optional; Array; works same as scores, but are used to populate the "Magical Override" column; If you are providing both 'scores' and 'scoresOverride' you should also give a 'scorestxt', as the auto-generated tooltip text doesn't work if you have both 'scores' and 'scoresOverride'
	calcChanges.spellList // Optional; an array with the first entry being a function, and the second entry being a descriptive text. This attribute can change the spell list created for a class / race / feat
	calcChanges.spellCalc // Optional; an array with the first entry being a function, and the second entry being a descriptive text. This attribute can change the DC, spell attack, and number of spells to memorize
	weaponOptions // Optional; an array of WeaponsList objects to be added to the WeaponsList (can also be a single object if only wanting to add a single weapon)
	armorOptions // Optional; an array of ArmourList objects to be added to the ArmourList (can also be a single object if only wanting to add a single armour)
	ammoOptions // Optional; an array of AmmoList objects to be added to the AmmoList (can also be a single object if only wanting to add a single armour)
	extraAC // replaces AddACMisc() in eval
	extraLimitedFeatures // replaces AddFeature() in eval
	carryingCapacity // multiply the Carrying Capacity Multiplier with this number
	spellcastingFactorRoundupMulti // in ClassList or ClassSublist to indicate that in case of multiclassing the spellcasting factor should be rounded up

CHANGED ATTRIBUTES
	armorProfs // Optional; Array; armor proficiencies to add [previous just 'armor']
	weaponProfs // Optional; Array; weapon proficiencies to add [previous just 'weapons' or 'weaponprofs' depending on List]
	armorAdd // Optional; String; name of the armor to put in the armor section (if results in higher AC) [previous 'addarmor']
	weaponsAdd // Optional; Array; names of the weapons to put in the attack section (if there is space) [previous 'weapons']


CHANGES TO IMPLEMENT IN LIST SCRIPTS

	'primaryAbility' for CLASS(main) no longer needs line-break, bullet point, name, or trailing semicolon
	'prereqs' for CLASS(main) no longer needs line-break, bullet point, name, or trailing semicolon


	'improvements' for RACE/FEAT replaced with 'scorestxt' (but without name or trailing semicolon)
	'improvements' for RACE/FEAT no longer needed if identical to changes by 'scores'

	'skills' can now be an array of arrays with 2 elements each, the first element being the skill name and the second element being the application of expertise "full", "increment", or "only"
	'skills' for FEATS/CLASS(main) is no longer used and should be replaced by 'skillstxt'

	'skillstxt' no longer need line breaks, name, or trailing semicolon/period
	'skillstxt' no longer needed if identical to changes by 'skills'

	'action' can now be an array, so no need for 'AddAction' in eval

	'tooltip' for racial features: make name same as tooltip (minus the parenthesis) and add limfeaname for the old name

	'eval', 'removeeval', 'changeeval' can now be a function

	'atkAdd[0]' & 'atkCalc[0]' can now be a function

	'armor' replace with 'armorProfs'
	'addarmor' replace with 'armorAdd'
	'weapons' for CLASS/FEAT: replace with 'weaponProfs'
	'weaponprofs' for RACE: replace with 'weaponProfs'
	'weapons' for RACE: replace with 'weaponsAdd'

	eval changes :
	- Class Features Remember
	- AddAction
	- AddWeapon
	- AddFeature
	- AddACMisc
	- ClassFeatureOptions (no longer needed in removeeval if to be removed at that level)

	spellcastingBonus.firstCol (options: 'atwill', 'oncesr', 'oncelr', 'markedbox', 'checkbox', 'checkedbox')
	REPLACE			WITH
	atwill : true	firstCol : 'atwill'
	oncesr : true	firstCol : 'oncesr'
	oncelr : true	firstCol : 'oncelr'
	prepared : true	firstCol : 'markedbox'

	(atwill|oncesr|oncelr) : true		firstCol : '\1'

OVERWRITTEN BY CHOICES (NOT EXTRACHOICES):
	name
	limfeaname // new, see above
	additional
	description
	recovery
	source
	usages
	usagescalc

CHANGED ATTRIBUTES
	action // can now be an array of actions
	  // if the second entry starts with a letter character, it will be used instead of the feature name
	  // if the second entry starts with a space or other common joining character like "-,'([{", it will be amended to the feature name
	  // e.g. ["action", " (start/stop)"] will result in "Feature name (start/stop)"
	  // while ["action", "start/stop"] will result in "start/stop"
	eval // can now be a function
	removeeval // can now be a function
	changeeval // can now be a function
	calcChanges.atkAdd[0] // the first entry of the array can now be a function (but has parameters!)
	calcChanges.atkCalc[0] // the first entry of the array can now be a function (but has parameters!)
	calcChanges.hp // can now be a function

	armor // replaced with armorProfs (so it is more clear)
	addarmor // replaced with armorAdd (notice difference in capitalisation)
	weapons // for CLASS/FEAT: replaced with weaponProfs (so it is more clear)
	weaponprofs // for RACE: replace with weaponProfs
	weapons // for RACE: replace with weaponsAdd


*/

// First some global variables that can be set by custom scripts (are otherwise never changed)
var ignorePrereqs = false; // whether or not to consider the prerequisites for class features, feats, and prestige classes
var ignoreSearchLength = false; // whether or not to consider the length of the names for regExpSearch objects. If set to true, the sheet uses only the date of the source
var ignoreDuplicates = false; // whether or not to allow duplicates of feats and magic items

// A function to create/reset the basic lists for the sheet to use. Things can subsequently be added to the created lists using custom scripts.
function InitiateLists() {
	var lists = [
		"BackgroundList",
		"BackgroundSubList",
		"BackgroundFeatureList",
		"ClassList",
		"ClassSubList",
		"CreatureList",
		"FeatsList",
		"MagicItemsList",
		"ArmourList",
		"WeaponsList",
		"AmmoList",
		"PacksList",
		"GearList",
		"ToolsList",
		"RaceList",
		"RaceSubList",
		"SourceList",
		"SpellsList",
		"PsionicsList",
		"spellLevelList",
		"spellSchoolList"
	];
	for (i = 0; i < lists.length; i++) {
		if (tDoc["Base_" + lists[i]]) {
			tDoc[lists[i]] = npmclone(tDoc["Base_" + lists[i]]);
		} else {
			tDoc[lists[i]] = {};
		};
	};
	// now add the armours/weapons/ammunitions added by features
	if (CurrentVars.extraArmour) {
		for (var anArmour in CurrentVars.extraArmour) {
			ArmourList[anArmour] = CurrentVars.extraArmour[anArmour];
		}
	}
	if (CurrentVars.extraWeapons) {
		for (var anWeapon in CurrentVars.extraWeapons) {
			WeaponsList[anWeapon] = CurrentVars.extraWeapons[anWeapon];
		}
	}
	if (CurrentVars.extraAmmo) {
		for (var anAmmo in CurrentVars.extraAmmo) {
			AmmoList[anAmmo] = CurrentVars.extraAmmo[anAmmo];
		}
	}
};

// A function to generate the spell variables after running imported scripts
function spellsAfterUserScripts(reDoAllSpells) {
	if (tDoc.info.AdvLogOnly) return;
	amendPsionicsToSpellsList();
	setSpellVariables(reDoAllSpells);
};

var typePF = (/printer friendly/i).test(tDoc.info.SheetType);
var typeA4 = (/a4/i).test(tDoc.info.SheetType);
var typeLR = (/letter/i).test(tDoc.info.SheetType);
var minVer = tDoc.info.SpellsOnly || tDoc.info.AdvLogOnly;
var sheetVersion = parseFloat(tDoc.info.SheetVersion);
var semVers = nmbrToSemanticVersion(sheetVersion) + (tDoc.info.SheetVersionType ? tDoc.info.SheetVersionType : "");
var isWindows = app.platform === "WIN";
var patreonVersion = tDoc.getField("SaveIMG.Patreon").submitName === "";

var UnitsList = {
	metric : {
		mass : 0.5,
		'length' : 0.3,
		lengthInch : 2.5,
		volume : 0.03,
		surface : 0.1,
		distance : 1.6,
		liquid : 4
	},
	metricExact : {
		mass : 0.45359237,
		'length' : 0.3048,
		lengthInch : 2.54,
		volume : 0.028316846592,
		surface : 0.09290304,
		distance : 1.609344,
		liquid : 3.785411784
	}
}

var AbilityScores = {
	abbreviations : ["Str", "Dex", "Con", "Int", "Wis", "Cha"],
	fields : {str : "Str", dex : "Dex", con : "Con", 'int' : "Int", wis : "Wis", cha : "Cha", hos : "HoS", hon : "HoS", san : "HoS"},
	names : ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"],
	"strength" : {
		index : 0
	},
	"dexterity" : {
		index : 1
	},
	"constitution" : {
		index : 2
	},
	"intelligence" : {
		index : 3
	},
	"wisdom" : {
		index : 4
	},
	"charisma" : {
		index : 5
	},
	"improvements" : {
		"classlvl" : "",
		"classprime" : "",
		"classmulti" : "",
		"racefeats" : ""
	}
};

var Menus = {
	"inventory" : "",
	"background" : "",
	"classfeatures" : "",
	"chooselayers" : "",
	"gear" : "",
	"gearline" : "",
	"magicitems" : "",
	"color" : "",
	"raceoptions" : "",
	"faq" : [{
			cName : "Go to the online FAQ (more up to date)",
			cReturn : "faq#online"
		}, {
			cName : "Open the built-in FAQ.pdf",
			cReturn : "faq#pdf"
		}, {
			cName : "-"
		}, {
			cName : "See the license used for distributing WotC material (SRD)",
			cReturn : "faq#ogl"
		}, {
			cName : "See the license under which this document is distributed",
			cReturn : "faq#gplv3"
		}],
	"importscripts" : [{
			cName : "Import a file with additional material",
			cReturn : "go#script#file"
		}, {
			cName : "Add material manually (copy-paste)",
			cReturn : "go#script#manual"
		}, {
			cName : "-"
		}, {
			cName : "Don't know how this works? Click here to learn more!",
			cReturn : "go#script#onlinehelp"
		}, {
			cName : "Find more content online...",
			cReturn : "go#script#subreddit"
		}],
	"importexport" : [{
			cName : "Add homebrew material (custom script)",
			oSubMenu : []
		}, {
			cName : "-"
		}, {
			cName : "Import a character directly from another MPMB's Character Sheet PDF",
			cReturn : "go#direct"
		}, {
			cName : "-"
		}, {
			cName : "Import/Export using files (depreciated, no longer support)",
			oSubMenu: [{
				cName : "Import .xfdf file",
				cReturn : "go#import#xfdf"
			}, {
				cName : "Export .xfdf file",
				oSubMenu: [{
					cName : "Export .xfdf file of non-calculated fields",
					cReturn : "go#export#partial"
				}, {
					cName : "Export .xfdf file of equipment fields only",
					cReturn : "go#export#equipment"
				}, {
					cName : "Export .xfdf file of description fields only",
					cReturn : "go#export#description"
				}, {
					cName : "-"
				}, {
					cName : "Export .xfdf file of all fields",
					cReturn : "go#export#all"
				}]
			}]
		}],
	"feats" : "",
	"attacks" : "",
	"wildshape" : "",
	"companion" : "",
	"actions" : "",
	"limfea" : "",
	"pages" : "",
	"notes" : "",
	"advlog" : "",
	"icon" : "",
	"spells" : "",
	"spellsLine" : "",
	"glossary" : "",
	"hp" : "",
	"texts" : "",
	"skills" : "",
	"adventureLeague" : "",
	"sources" : "",
	"unicode" : ""
};
Menus.importexport[0].oSubMenu = Menus.importscripts;

var GearMenus = {
	gear : "",
	tools : "",
	packs : ""
}

var classes = {
	field : "",
	parsed : [],
	known : {},
	old : {},
	hd : [],
	hp : 0,
	attacks : 1,
	totallevel : 0, // classes.parsed.reduce(function(acc, val) { return acc + val[1]; }, 0);
	primary : "",
	oldprimary : "",
	spellcastlvl : {default : 0, warlock : 0},
	oldspellcastlvl : {default : 0, warlock : 0}
};

var CurrentUpdates = {types : []};
var CurrentClasses = {};
var CurrentBackground = {};
var CurrentRace = {};
var CurrentCompRace = {};
var CurrentSpells = {};
var CurrentCasters = {};
var CurrentSources = {firstTime : true, globalExcl : []};
var CurrentEvals = {};
var CurrentScriptFiles = {};
var CurrentVars = { manual : {} };
var UpdateSpellSheets = {};
var CurrentFeatureChoices = {};
var CurrentStats = {};

var CurrentArmour = {
	field : "",
	known : "",
	mod : "",
	dex : "",
	magic : 0
};

var CurrentShield = {
	field : "",
	magic : 0
};

var CurrentWeapons = {
	field : [],
	known : [],
	compField : {},
	compKnown : {},
	offHands : []
};

var CurrentFeats = {
	known : [],
	choices : [],
	level : What("Character Level") ? Number(What("Character Level")) : 1
};

var CurrentMagicItems = {
	known : [],
	choices : [],
	level : CurrentFeats.level
};

var CurrentProfs = { // Also change field defaultValue!
	skill : {},
	armour : {},
	weapon : {},
	save : {},
	resistance : {},
	language : {},
	tool : {},
	savetxt : {},
	vision : {},
	speed : {},
	specialarmour : {},
	carryingcapacity : {},
	advantage : {}
};

var thermoCount = [], thermoDur = {};
var calcStartSet = false, thermoStopSet = false, ChangesDialogSkip;
var IsSubclassException = {};
var IsNotReset = true;
var IsNotImport = true;
var IsNotFeatMenu = true;
var IsNotMagicItemMenu = true;
var IsNotWeaponMenu = true;
var IsNotConditionSet = true;
var IsSetDropDowns = false;
var IsNotUserScript = true;
var IsCharLvlVal = false;

var FieldsRemember = [];

var FieldNumbers = {
	actions : typeLR ? 11 : 12,
	trueactions : typePF ? 12 : (typeA4 ? 22 : 20),
	attacks : typeA4 ? 6 : 5,
	feats : typeA4 ? 9 : 8,
	featsD : typeA4 ? 5 : 4,
	langstools : typeA4 ? 8 : 6,
	spells : typePF ? [55, 70] : (typeA4 ? [66, 77] : [61, 72]),
	logs : typePF ? 6 : 7,
	magicitems : typePF ? 12 : (typeA4 ? 15 : 14),
	magicitemsD : typePF ? 5 : 6,
	gear : typePF ? 54 : 46,
	extragear : typePF ? 36 : 42,
	gearMIrow : typePF ? 51 : 43,
	compgear : typePF ? 17 : 24,
	limfea : 16
}

var ExperiencePointsList = ["", 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000, 1000000000];
var levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var ProficiencyBonusList = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
var cantripDie = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4];

var SkillsList = {
	abbreviations : [
		"Acr",
		"Ani",
		"Arc",
		"Ath",
		"Dec",
		"His",
		"Ins",
		"Inti",
		"Inv",
		"Med",
		"Nat",
		"Perc",
		"Perf",
		"Pers",
		"Rel",
		"Sle",
		"Ste",
		"Sur",
		"Init",
		"Too"
	],
	abilityScores : [
		"Dex",
		"Wis",
		"Int",
		"Str",
		"Cha",
		"Int",
		"Wis",
		"Cha",
		"Int",
		"Wis",
		"Int",
		"Wis",
		"Cha",
		"Cha",
		"Int",
		"Dex",
		"Dex",
		"Wis",
		"Dex",
		"Too"
	],
	names : [
		"Acrobatics",
		"Animal Handling",
		"Arcana",
		"Athletics",
		"Deception",
		"History",
		"Insight",
		"Intimidation",
		"Investigation",
		"Medicine",
		"Nature",
		"Perception",
		"Performance",
		"Persuasion",
		"Religion",
		"Sleight of Hand",
		"Stealth",
		"Survival",
		"Initiative",
		"Tool"
	],
	abbreviationsByAS : [
		"Ath",
		"Acr",
		"Sle",
		"Ste",
		"Arc",
		"His",
		"Inv",
		"Nat",
		"Rel",
		"Ani",
		"Ins",
		"Med",
		"Perc",
		"Sur",
		"Dec",
		"Inti",
		"Perf",
		"Pers",
		"Init",
		"Too"
	],
	abilityScoresByAS : [
		"Str",
		"Dex",
		"Dex",
		"Dex",
		"Int",
		"Int",
		"Int",
		"Int",
		"Int",
		"Wis",
		"Wis",
		"Wis",
		"Wis",
		"Wis",
		"Cha",
		"Cha",
		"Cha",
		"Cha",
		"Dex",
		"Too"
	],
	namesByAS : [
		"Athletics",
		"Acrobatics",
		"Sleight of Hand",
		"Stealth",
		"Arcana",
		"History",
		"Investigation",
		"Nature",
		"Religion",
		"Animal Handling",
		"Insight",
		"Medicine",
		"Perception",
		"Survival",
		"Deception",
		"Intimidation",
		"Performance",
		"Persuasion",
		"Initiative",
		"Tool"
	],
	values : {}
};

var DamageTypes = {
	"acid" : {
		index : 1
	},
	"bludgeoning" : {
		index : 2
	},
	"cold" : {
		index : 3
	},
	"fire" : {
		index : 4
	},
	"force" : {
		index : 5
	},
	"lightning" : {
		index : 6
	},
	"necrotic" : {
		index : 7
	},
	"piercing" : {
		index : 8
	},
	"poison" : {
		index : 9
	},
	"psychic" : {
		index : 10
	},
	"radiant" : {
		index : 11
	},
	"slashing" : {
		index : 12
	},
	"thunder" : {
		index : 13
	}
};

var Lifestyles = {
	types : [
		"",
		"wretched",
		"squalid",
		"poor",
		"modest",
		"comfortable",
		"wealthy",
		"aristocratic"
	],
	expenses : [
		"",
		"\u2014",
		"1 sp",
		"2 sp",
		"1 gp",
		"2 gp",
		"4 gp",
		"10 gp min."
	],
	names : [
		"",
		(typePF ? " " : "") + "Wretched",
		(typePF ? "  " : "") + "Squalid",
		(typePF ? "     " : "") + "Poor",
		(typePF ? "   " : "") + "Modest",
		(typePF ? " " : "") + "Comfortable",
		(typePF ? "   " : "") + "Wealthy",
		"Aristocratic",
	]
};

var AmmoIcons = {
	"Arrows" : {
		checks : [".Top", ".Base"],
		display : 20
	},
	"Axes" : {
		checks : [".Top.Axe", ".Base.Axe"],
		display : 8
	},
	"Bullets" : {
		checks : [".Bullet"],
		display : 50
	},
	"Daggers" : {
		checks : [".Top"],
		display : 10
	},
	"Flasks" : {
		checks : [".Top", ".Base"],
		display : 20
	},
	"Hammers" : {
		checks : [".Top.Axe", ".Base.Axe"],
		display : 8
	},
	"Spears" : {
		checks : [".Base"],
		display : 10
	},
	"Vials" : {
		checks : [".Top", ".Base"],
		display : 20
	}
}

//The dialog for setting the pages to print
var SetPrintPages_Dialog = {
	//variables to be set by the calling function
	bCSfront : false,
	bCSback : false,
	bASfront : false,
	bASbackgr : false,
	bAScomp : false,
	bASnotes : false,
	bWSfront : false,
	bALlog : false,
	bSSfront : false,
	bPRsheet : false,
	bASoverflow : false,
	bHide : false,
	bDupl : false,
	bshowPR : false,
	aCSfront : true,
	aCSback : true,
	aASfront : true,
	aASbackgr : true,
	aAScomp : true,
	aASnotes : true,
	aWSfront : true,
	aALlog : true,
	aSSfront : false,
	aPRsheet : false,
	aASoverflow : false,

	//when starting the dialog
	initialize : function (dialog) {
		dialog.load({
			"img1" : allIcons.print,
			"Pag1" : this.bCSfront,
			"Pag2" : this.bCSback,
			"Pag3" : this.bASfront,
			"Pag4" : this.bASbackgr,
			"Pag5" : this.bAScomp,
			"Pag6" : this.bASnotes,
			"Pag7" : this.bWSfront,
			"Pag8" : this.bALlog,
			"Pag9" : this.bSSfront,
			"Pag0" : this.bPRsheet,
			"Pa10" : this.bASoverflow,
			"Hide" : this.bHide
		});

		if (this.bDupl) {
			dialog.load({
				"dupl" : true
			});
		} else {
			dialog.load({
				"sing" : true
			});
		}

		dialog.visible({
			"Pag0" : this.bshowPR
		})

		dialog.enable({
			"Pag1" : this.aCSfront,
			"Pag2" : this.aCSback,
			"Pag3" : this.aASfront,
			"Pag4" : this.aASbackgr,
			"Pag5" : this.aAScomp,
			"Pag6" : this.aASnotes,
			"Pag7" : this.aWSfront,
			"Pag8" : this.aALlog,
			"Pag9" : this.aSSfront,
			"Pag0" : this.aPRsheet,
			"Pa10" : this.aASoverflow
		});
	},

	//when pressing the ok button
	commit : function (dialog) {},

	//when pressing the other button
	other : function (dialog) {
		dialog.end("save");
	},

	//when the dialog is ended in one way or another
	destroy : function (dialog) {
		var oResult = dialog.store();
		this.bCSfront = oResult["Pag1"];
		this.bCSback = oResult["Pag2"];
		this.bASfront = oResult["Pag3"];
		this.bASbackgr = oResult["Pag4"];
		this.bAScomp = oResult["Pag5"];
		this.bASnotes = oResult["Pag6"];
		this.bWSfront = oResult["Pag7"];
		this.bALlog = oResult["Pag8"];
		this.bSSfront = oResult["Pag9"];
		this.bPRsheet = oResult["Pag0"];
		this.bASoverflow = oResult["Pa10"];
		this.bDupl = oResult["dupl"];
	},

	//fun whenever the Hide checkbox is clicked
	Hide : function (dialog) {
		this.bHide = !this.bHide;
		HideShowEverything(this.bHide);
	},

	description : {
		name : "Choose the pages you want to print",
		elements : [{
			type : "view",
			elements : [{
				type : "view",
				elements : [{
					type : "view",
					align_children : "align_row",
					elements : [{
						type : "image",
						item_id : "img1",
						alignment : "align_bottom",
						width : 20,
						height : 20
					}, {
						type : "static_text",
						item_id : "head",
						alignment : "align_fill",
						font : "heading",
						bold : true,
						height : 21,
						char_width : 30,
						name : "Choose the pages you want to print"
					}]
				}, {
					type : "static_text",
					item_id : "txt0",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					char_width : 40,
					name : "Please select the pages you want to print or save for future use.\n\nThe values you enter here will be remembered for the next time you push the \"Print\" button in the \"JavaScript Window\" or bookmarks section.\n\nNote that what you do here will have no effect on 'normal' print commands (i.e. using the file menu or Ctrl+P)."
				}, {
					type : "cluster",
					align_children : "align_distribute",
					elements : [{
						type : "view",
						elements : [{
							type : "check_box",
							item_id : "Pag1",
							name : "Page 1: Essentials"
						}, {
							type : "check_box",
							item_id : "Pag2",
							name : "Page 2: Features/equipment"
						}, {
							type : "check_box",
							item_id : "Pag3",
							name : (typePF ? "Feats" : "Conditions") + "/magic items page"
						}, {
							type : "check_box",
							item_id : "Pa10",
							name : "Overflow page"
						}, {
							type : "check_box",
							item_id : "Pag9",
							name : "Spell Sheet(s)"
						}]
					}, {
						type : "view",
						elements : [{
							type : "check_box",
							item_id : "Pag4",
							name : "Background page"
						}, {
							type : "check_box",
							item_id : "Pag5",
							name : "Companion page(s)"
						}, {
							type : "check_box",
							item_id : "Pag6",
							name : "Notes page(s)"
						}, {
							type : "check_box",
							item_id : "Pag7",
							name : "Wild Shapes page(s)"
						}, {
							type : "check_box",
							item_id : "Pag8",
							name : "Adventurers Logsheet(s)"
						}, {
							type : "check_box",
							item_id : "Pag0",
							name : "Reference sheet"
						}]
					}]
				}, {
					type : "cluster",
					align_children : "align_left",
					elements : [{
						type : "view",
						align_children : "align_distribute",
						elements : [{
							type : "radio",
							item_id : "dupl",
							group_id : "prin",
							name : "Duplex printing (both sides)"
						}, {
							type : "radio",
							item_id : "sing",
							group_id : "prin",
							name : "Simplex printing (single side)"
						}]
					}, {
						type : "view",
						elements : [{
							type : "static_text",
							item_id : "txt1",
							alignment : "align_fill",
							font : "dialog",
							wrap_name : true,
							char_width : 38,
							name : "Note that this cannot be changed in the next dialog, the print pop-up. The selection you make here will always override anything you do in the next dialog or print settings."
						}]
					}]
				},  {
					type : "cluster",
					align_children : "align_distribute",
					elements : [{
						type : "check_box",
						item_id : "Hide",
						name : "Hide all fields as to print a truly empty sheet to fill out by hand"
					}]
				}, {
					type : "gap",
					height : 8
				}]
			}, {
				type : "ok_cancel_other",
				ok_name : "Print",
				other_name : "Remember"
			}]
		}]
	}
};

//The dialog for setting things to be processed manually
var SetToManual_Dialog = {
	//variables to be set by the calling function
	mAtt : false,
	mBac : false,
	mCla : false,
	mFea : false,
	mRac : false,
	mMag : false,

	//when starting the dialog
	initialize : function (dialog) {
		dialog.load({
			"img1" : allIcons.automanual,
			"Atta" : this.mAtt,
			"Back" : this.mBac,
			"Clas" : this.mCla,
			"Feat" : this.mFea,
			"Item" : this.mMag,
			"Race" : this.mRac
		});
	},

	//when pressing the ok button
	commit : function (dialog) {
		var oResult = dialog.store();
		this.mAtt = oResult["Atta"];
		this.mRac = oResult["Race"];
		this.mBac = oResult["Back"];
		this.mCla = oResult["Clas"];
		this.mFea = oResult["Feat"];
		this.mMag = oResult["Item"];
	},

	description : {
		name : "Choose the functions you want to set to manual",
		elements : [{
			type : "view",
			elements : [{
				type : "view",
				elements : [{
					type : "view",
					align_children : "align_row",
					elements : [{
						type : "image",
						item_id : "img1",
						alignment : "align_bottom",
						width : 20,
						height : 20
					}, {
						type : "static_text",
						item_id : "head",
						alignment : "align_fill",
						font : "heading",
						bold : true,
						height : 21,
						char_width : 35,
						name : "Choose the functions you want to set to manual"
					}]
				}, {
					type : "static_text",
					item_id : "text",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					char_width : 40,
					name : "Here you can select the functions of this sheet that you want to be done manually instead of calculated (which is the default setting).\n\nSimply check of any items you want to set to manual and press \"Apply\".\n\nIf some items are already set to manual, simply uncheck the box, press \"Apply\", and that feature will be calculated and added to the sheet immediately."
				}, {
					type : "cluster",
					align_children : "align_distribute",
					elements : [{
						type : "view",
						elements : [{
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Atta",
								name : "Attacks",
								char_width : 12
							}, {
								type : "static_text",
								item_id : "tAtt",
								name : "No drop-down box; to hit and damage are calculated manually"
							}]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Back",
								name : "Background",
								char_width : 12
							}, {
								type : "static_text",
								item_id : "tBac",
								name : "Do nothing when changing the background"
							}]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Clas",
								name : "Class",
								char_width : 12
							}, {
								type : "static_text",
								item_id : "tCla",
								name : "Do nothing when changing the class or level"
							}]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Feat",
								name : "Feats",
								char_width : 12
							}, {
								type : "static_text",
								item_id : "tFea",
								name : "Disable auto-calculation and auto-fill for feats"
							}]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Item",
								name : "Magic Items",
								char_width : 12
							}, {
								type : "static_text",
								item_id : "tFea",
								name : "Disable auto-calculation and auto-fill for magic items"
							}]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Race",
								name : "Race",
								char_width : 12
							},  {
								type : "static_text",
								item_id : "tRac",
								name : "Do nothing when changing the race"
							}]
						}]
					}]
				}, {
					type : "gap",
					height : 8
				}]
			}, {
				type : "ok_cancel",
				ok_name : "Apply"
			}]
		}]
	}
};

var ColorList = {
	aqua : { //wizard
		RGB : ["RGB", 0.1176, 0.4431, 0.7176],
		CMYK : ["CMYK", 0.85, 0.5, 0.01, 0]
	}, //1e71b7
	blue : { //paladin
		RGB : ["RGB", 0, 0.651, 0.8314],
		CMYK : ["CMYK", 0.75, 0.13, 0.09, 0]
	}, //00a6d4
	brown : { //warlock
		RGB : ["RGB", 0.4784, 0.3647, 0.3294],
		CMYK : ["CMYK", 0.38, 0.53, 0.51, 0.4]
	}, //7a5d54
	gray : { //rogue
		RGB : ["RGB", 0.5, 0.5, 0.5],
		CMYK : ["CMYK", 0.5, 0.39, 0.39, 0.21]
	}, //7e7f7f
	green : { //druid
		RGB : ["RGB", 0.0157, 0.4, 0.2],
		CMYK : ["CMYK", 0.9, 0.33, 0.96, 0.27]
	}, //046633
	orange : { //sorcerer
		RGB : ["RGB", 0.9098, 0.3059, 0.0588],
		CMYK : ["CMYK", 0, 0.8, 1, 0]
	}, //e84e0f
	pink : {
		RGB : ["RGB", 0.9098, 0.1961, 0.4863],
		CMYK : ["CMYK", 0, 0.9, 0.15, 0]
	}, //e8327c
	purple : { //bard
		RGB : ["RGB", 0.3922, 0.1412, 0.5059],
		CMYK : ["CMYK", 0.76, 1, 0.03, 0]
	}, //642481
	red : { //fighter
		RGB : ["RGB", 0.7412, 0.0941, 0.1333],
		CMYK : ["CMYK", 0.18, 1, 0.91, 0.08]
	}, //bd1822
	teal : { //ranger
		RGB : ["RGB", 0, 0.6275, 0.6],
		CMYK : ["CMYK", 0.79, 0.12, 0.45, 0]
	}, //00a099
	yellow : { //cleric
		RGB : ["RGB", 0.9529, 0.5725, 0],
		CMYK : ["CMYK", 0, 0.5, 1, 0]
	} //f39200
} //for gradients, add 15% brightness as BHS color

var DarkColorList = {
	aqua : ["CMYK", 0.85, 0.5, 0.01, 0.5], //144671
	blue : ["CMYK", 0.75, 0.13, 0.09, 0.5], //066882
	brown : ["CMYK", 0.38, 0.53, 0.51, 0.9], //291d16
	gray : ["CMYK", 0.7, 0.6, 0.56, 0.67], //303131
	green : ["CMYK", 0.9, 0.33, 0.96, 0.77], //003012
	orange : ["CMYK", 0, 0.8, 1, 0.5], //8d3200
	pink : ["CMYK", 0, 0.9, 0.15, 0.5], //8e204c
	purple : ["CMYK", 0.76, 1, 0.03, 0.5], //401150
	red : ["CMYK", 0.18, 1, 0.91, 0.58], //6e110b
	teal : ["CMYK", 0.79, 0.12, 0.45, 0.5], //00645f
	yellow : ["CMYK", 0, 0.5, 1, 0.5] //935b00
} // +50% black

var LightColorList = {
	aqua : ["CMYK", 0.68, 0.29, 0, 0], //4e9ad9
	blue : ["CMYK", 0.7, 0.06, 0.11, 0], //2bb3d9
	brown : ["CMYK", 0.29, 0.39, 0.38, 0.14], //ad9189
	gray : ["CMYK", 0.33, 0.25, 0.26, 0.04], //b3b3b3
	green : ["CMYK", 0.8, 0.13, 0.78, 0], //219a5e
	orange : ["CMYK", 0, 0.62, 0.7, 0], //f77d4d
	pink : ["CMYK", 0, 0.69, 0.01, 0], //f772a9
	purple : ["CMYK", 0.58, 0.78, 0.01, 0], //844e99
	red : ["CMYK", 0.1, 0.79, 0.55, 0], //db535c
	teal : ["CMYK", 0.7, 0, 0.35, 0], //26bdb8
	yellow : ["CMYK", 0, 0.38, 0.82, 0] //f8ad3c
}

//The dialog for setting the unit system and decimal
var SetUnitDecimals_Dialog = {
	//variables to be set by the calling function
	bSys : "imperial",
	bDec : "dot",

	//when starting the dialog
	initialize : function (dialog) {
		var isImp = this.bSys === "imperial";
		var isDot = this.bDec === "dot";
		dialog.load({
			"img1" : allIcons.unitsystem,
			"SyIm" : isImp,
			"SyMe" : !isImp,
			"DeDo" : isDot,
			"DeCo" : !isDot
		});
	},

	//when pressing the ok button
	commit : function (dialog) {
		var oResult = dialog.store();
		this.bSys = oResult["SyIm"] ? "imperial" : "metric";
		this.bDec = oResult["DeDo"] ? "dot" : "comma";
	},

	description : {
		name : "Choose the unit system and decimal separator",
		elements : [{
			type : "view",
			elements : [{
				type : "view",
				elements : [{
					type : "view",
					align_children : "align_row",
					elements : [{
						type : "image",
						item_id : "img1",
						alignment : "align_bottom",
						width : 20,
						height : 20
					}, {
						type : "static_text",
						item_id : "head",
						alignment : "align_fill",
						font : "title",
						bold : true,
						wrap_name : true,
						width : 480,
						name : "Choose the unit system and decimal separator"
					}]
				}, {
					type : "static_text",
					item_id : "txt0",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					width : 480,
					name : "Any changes you make will be applied immediately to all fields that would logically be impacted by them.\nThe conversion is not completely accurate, as some accuracy is sacrificed for numbers that are easier to use during play."
				}, {
					type : "static_text",
					item_id : "txt1",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					width : 480,
					name : " \u2022 Distances in game mechanics are converted by assuming 1 ft is 30 cm;\n \u2022 Weights used in game mechanics are converted by assuming 2 lb is 1 kg;\n \u2022 Liquid volumes used in game mechanics are converted by assuming 1 gallon is 4 liters;\n \u2022 All converted units used in game mechanics are rounded to the nearest half;\n \u2022 Equipment weight is calculated to three decimals accuracy;\n \u2022 The Character's Height and Weight fields are converted with more accuracy;\n \u2022 Units you added manually might not be converted as not all unit conversions are supported."
				}, {
					type : "static_text",
					item_id : "txt2",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					width : 480,
					name : "Any features that auto-fill will recognize these settings and use them to update the sheet, so you only have to set this once.\nThe Spell Sheet can't be flawlessly changed from one unit system to another on the fly. Changing unit systems is best done before generating a Spell Sheet.\nFields that are never auto-filled by sheet automation, such as the character history or notes, will not be changed."
				}, {
					type : "view",
					align_children : "align_row",
					aligment : "align_center",
					width : 480,
					elements : [{
						type : "cluster",
						align_children : "align_left",
						font : "heading",
						bold : true,
						name : "Unit System",
						elements : [{
							type : "radio",
							item_id : "SyIm",
							group_id : "Syst",
							name : "Imperial"
						}, {
							type : "radio",
							item_id : "SyMe",
							group_id : "Syst",
							name : "Metric"
						}]
					}, {
						type : "gap",
						char_width : 3
					}, {
						type : "cluster",
						align_children : "align_left",
						font : "heading",
						bold : true,
						name : "Decimal Separator",
						elements : [{
							type : "radio",
							item_id : "DeDo",
							group_id : "Deci",
							name : "Dot (and comma as thousands separator)"
						}, {
							type : "radio",
							item_id : "DeCo",
							group_id : "Deci",
							name : "Comma (and dot as thousands separator)"
						}]
					}]
				}, {
					type : "gap",
					height : 8
				}]
			}, {
				type : "ok_cancel"
			}]
		}]
	}
};

//The dialog for setting the text font size and hiding or showing text lines
var SetTextOptions_Dialog = {
	//variables to be set by the calling function
	bSize : 5.74,
	bDefSize : 8.4,
	bDefSizeSheet : 5.74,
	bFont : "SegoePrint",
	bFontsArray : {"SegoeUI" : -1, "SegoeUI-Semibold" : -1},
	fOthTest : false,
	bDefFont : "SegoePrint",

	//when starting the dialog
	initialize : function (dialog) {
		dialog.load({
			"img1" : allIcons.textsize,
			"StSz" : this.bDefSize.toString(),
			"sOSi" : this.bSize.toString(),
			"fAlS" : this.bFontsArray,
			"fStS" : this.bDefFont
		});

		dialog.enable({
			"fStS" : false,
			"StSz" : false
		});

		if (Number(this.bSize) === this.bDefSize) {
			dialog.load({
				"sSta" : true
			});
		} else if (Number(this.bSize) === 0) {
			dialog.load({
				"sAut" : true
			});
		} else {
			dialog.load({
				"sOth" : true
			});
		}

		if (this.bFont === this.bDefFont) {
			dialog.load({
				"fSta" : true
			});
		} else if (this.bFontsArray[this.bFont]) {
			dialog.load({
				"fAlt" : true
			});
		} else {
			dialog.load({
				"fOth" : true,
				"fOtS" : this.bFont
			});
		}
	},

	//when pressing the ok button
	commit : function (dialog) {
		var oResult = dialog.store();

		if (oResult["sSta"]) {
			this.bSize = oResult["StSz"];
		} else if (oResult["sAut"]) {
			this.bSize = 0;
		} else if (oResult["sOth"]) {
			this.bSize = oResult["sOSi"];
		}

		if (oResult["fSta"]) {
			this.bFont = this.bDefFont;
		} else if (oResult["fAlt"]) {
			var elResult = dialog.store()["fAlS"];
			var fResult = this.bDefFont;
			for (var el in elResult) {
				if (elResult[el] > 0) {
					fResult = el;
				}
			}
			this.bFont = fResult;
		} else if (oResult["fOth"]) {
			if (this.fOthTest) {
				this.bFont = oResult["fOtS"];
			} else {
				this.bFont = this.bDefFont;
			}
		}
	},

	//do this whenever a number is entered to make sure it has a dot as decimal separator and not trailing zeroes
	sOSi : function (dialog) {
		var cResult = dialog.store()["sOSi"];
		if (isNaN(cResult) && (/,/).test(cResult)) {
			var Parsed = parseFloat(cResult.replace(/,/, "."));
		} else {
			var Parsed = parseFloat(cResult);
		}

		dialog.load({
			"sOth" : true,
			"sOSi" : Parsed.toString()
		});
	},

	fSta : function (dialog) {
		this.bDefSize = this.bDefSizeSheet;
		dialog.load({
			"StSz" : this.bDefSize.toString()
		});
	},

	fAlt : function (dialog) {
		var fontResult = dialog.store()["fAlS"];
		var cResult = "";
		for (var Fo in fontResult) {
			if (fontResult[Fo] > 0) {
				var cResult = Fo.toString();
			}
		}
		if (testFont(cResult)) {
			this.bDefSize = FontList[cResult];
			dialog.load({
				"fAlt" : true,
				"StSz" : this.bDefSize.toString()
			});
		}
	},

	fAlS : function (dialog) {
		var fontResult = dialog.store()["fAlS"];
		var cResult = "";
		for (var Fo in fontResult) {
			if (fontResult[Fo] > 0) {
				var cResult = Fo.toString();
			}
		}
		if (cResult === "") {
			this.bDefSize = this.bDefSizeSheet;
			dialog.load({
				"StSz" : this.bDefSize.toString()
			});
		} else if (testFont(cResult)) {
			this.bDefSize = FontList[cResult];
			dialog.load({
				"fAlt" : true,
				"StSz" : this.bDefSize.toString()
			});
		} else {
			app.alert({
				cMsg : "The font \"" + cResult + "\" does not appear to be working on your machine.\nEither it isn't spelled in the proper PDSysFont way, or it is not found on your system.\n\nNote that writing a font as a PDSysFont is not straightforward. You can use the names in the drop-down box as a guide (i.e. don't use spaces and pay attention to capitalization).",
				nIcon : 0,
				cTitle : "Error trying to apply the font"
			});
			this.bDefSize = this.bDefSizeSheet;
			dialog.load({
				"fSta" : true,
				"StSz" : this.bDefSize.toString()
			});
		}
	},
	fOth : function (dialog) {
		var cResult = dialog.store()["fOtS"];

		if (cResult === "") {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = false;
			dialog.load({
				"StSz" : this.bDefSize.toString()
			});
		} else if (testFont(cResult)) {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = true;
			dialog.load({
				"StSz" : this.bDefSize.toString()
			});
		} else {
			this.fOthTest = false;
			app.alert({
				cMsg : "The font \"" + cResult + "\" does not appear to be working on your machine.\nEither it isn't spelled in the proper PDSysFont way, or it is not found on your system.\n\nNote that writing a font as a PDSysFont is not straightforward. You can use the names in the drop-down box as a guide (i.e. don't use spaces and pay attention to capitalization).",
				nIcon : 0,
				cTitle : "Error trying to apply the font"
			});
			this.bDefSize = this.bDefSizeSheet;
			dialog.load({
				"fSta" : true,
				"StSz" : this.bDefSize.toString()
			});
		}
	},

	fOtS : function (dialog) {
		var cResult = dialog.store()["fOtS"].replace(/\s+/g, "");

		if (cResult === "") {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = false;
			dialog.load({
				"StSz" : this.bDefSize.toString()
			});
		} else if (testFont(cResult)) {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = true;
			dialog.load({
				"fOth" : true,
				"fOtS" : cResult.toString(),
				"StSz" : this.bDefSize.toString()
			});
		} else {
			this.fOthTest = false;
			app.alert({
				cMsg : "The font \"" + cResult + "\" does not appear to be working on your machine.\nEither it isn't spelled in the proper PDSysFont way, or it is not found on your system.\n\nNote that writing a font as a PDSysFont is not straightforward. You can use the names in the drop-down box as a guide (i.e. don't use spaces and pay attention to capitalization).",
				nIcon : 0,
				cTitle : "Error trying to apply the font"
			});
			this.bDefSize = this.bDefSizeSheet;
			dialog.load({
				"fSta" : true,
				"StSz" : this.bDefSize.toString()
			});
		}
	},

	description : {
		name : "Set the Font, the Font Size, and Hide Text Lines",
		elements : [{
			type : "view",
			elements : [{
				type : "view",
				elements : [{
					type : "view",
					align_children : "align_row",
					elements : [{
						type : "image",
						item_id : "img1",
						alignment : "align_bottom",
						width : 20,
						height : 20
					}, {
						type : "static_text",
						item_id : "head",
						alignment : "align_fill",
						font : "title",
						bold : true,
						height : 21,
						char_width : 40,
						name : "Set the Font and the Font Size"
					}]
				}, {
					type : "static_text",
					item_id : "txt0",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					char_width : 50,
					name : "Below you can set the font size and change the font of all the form fields.\n\nNote that if you use a font of your own choosing (custom font), it might not be possible to align the text properly with the text lines, regardless of the font size you select."
				}, {
					type : "static_text",
					item_id : "txt1",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					char_width : 50,
					name : "The settings for font size will be applied to all text fields that support multiple lines of text. Fields with a single line of text have a font size of 'auto'.\n\nIf you set the font size to 'auto', the text will resize to the size of the field. You can subsequently make the text smaller by entering more text or by entering line breaks."
				}, {
					type : "cluster",
					align_children : "align_left",
					char_width : 50,
					name : "Select the Font",
					font : "heading",
					bold : true,
					elements : [{
						type : "view",
						align_children : "align_distribute",
						height : 23,
						elements : [{
							type : "radio",
							item_id : "fSta",
							group_id : "Font",
							name : "Default font:",
							height : 22
						}, {
							type : "edit_text",
							item_id : "fStS",
							char_width : 8,
							height : 20,
							font : "dialog",
							bold : true
						}]
					}, {
						type : "view",
						align_children : "align_distribute",
						height : 23,
						elements : [{
							type : "radio",
							item_id : "fAlt",
							group_id : "Font",
							name : "Tested font, can be aligned with the lines in Adobe Acrobat:",
							height : 22
						}, {
							type : "popup",
							item_id : "fAlS",
							char_width : 10
						}]
					}, {
						type : "view",
						align_children : "align_distribute",
						height : 23,
						elements : [{
							type : "radio",
							item_id : "fOth",
							group_id : "Font",
							name : "Custom font (using the PDSysFont font name):",
							height : 22
						}, {
							type : "edit_text",
							item_id : "fOtS",
							char_width : 20,
							height : 20
						}]
					}]
				}, {
					type : "cluster",
					align_children : "align_left",
					char_width : 50,
					name : "Select the Font Size",
					font : "heading",
					bold : true,
					elements : [{
						type : "view",
						align_children : "align_row",
						height : 20,
						elements : [{
							type : "radio",
							item_id : "sSta",
							group_id : "Size",
							name : "Standard font size, tested to align with the lines in Adobe Acrobat:"
						}, {
							type : "edit_text",
							item_id : "StSz",
							char_width : 4,
							height : 20,
							font : "dialog",
							bold : true
						}]
					}, {
						type : "view",
						align_children : "align_left",
						height : 20,
						elements : [{
							type : "radio",
							item_id : "sAut",
							group_id : "Size",
							name : "Auto font size. The text will resize to the size of the field."
						}]
					}, {
						type : "view",
						align_children : "align_distribute",
						height : 20,
						elements : [{
							type : "radio",
							item_id : "sOth",
							group_id : "Size",
							name : "Custom font size (use your system's decimal separator):"
						}, {
							type : "edit_text",
							item_id : "sOSi",
							char_width : 4,
							height : 20,
							SpinEdit : true
						}]
					}]
				}, {
					type : "gap",
					height : 8
				}]
			}, {
				type : "ok_cancel"
			}]
		}]
	}
};

var Highlighting = {
	initialState : app.runtimeHighlight,
	initialColor : app.runtimeHighlightColor,
	rememberState : eval(What("Highlighting")),
	rememberColor : tDoc.getField("Highlighting").fillColor
};

var defaultSpellTable = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 0, 0, 0, 0, 0, 0, 0, 0],
	[4, 2, 0, 0, 0, 0, 0, 0, 0],
	[4, 3, 0, 0, 0, 0, 0, 0, 0],
	[4, 3, 2, 0, 0, 0, 0, 0, 0],
	[4, 3, 3, 0, 0, 0, 0, 0, 0],
	[4, 3, 3, 1, 0, 0, 0, 0, 0],
	[4, 3, 3, 2, 0, 0, 0, 0, 0],
	[4, 3, 3, 3, 1, 0, 0, 0, 0],
	[4, 3, 3, 3, 2, 0, 0, 0, 0],
	[4, 3, 3, 3, 2, 1, 0, 0, 0],
	[4, 3, 3, 3, 2, 1, 0, 0, 0],
	[4, 3, 3, 3, 2, 1, 1, 0, 0],
	[4, 3, 3, 3, 2, 1, 1, 0, 0],
	[4, 3, 3, 3, 2, 1, 1, 1, 0],
	[4, 3, 3, 3, 2, 1, 1, 1, 0],
	[4, 3, 3, 3, 2, 1, 1, 1, 1],
	[4, 3, 3, 3, 3, 1, 1, 1, 1],
	[4, 3, 3, 3, 3, 2, 1, 1, 1],
	[4, 3, 3, 3, 3, 2, 2, 1, 1]
]

var warlockSpellTable = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 4, 0, 0, 0, 0],
	[0, 0, 0, 0, 4, 0, 0, 0, 0],
	[0, 0, 0, 0, 4, 0, 0, 0, 0],
	[0, 0, 0, 0, 4, 0, 0, 0, 0],
]

var SpellPointsTable = [0, 4, 6, 14, 17, 27, 32, 38, 44, 57, 64, 73, 73, 83, 83, 94 ,94, 107, 114, 123, 133];

var compString = {
	mount : {
		featurestring : "\u25C6 Find Steed: If dropped to 0 HP, the steed disappears, leaving behind no physical form",
		string : "Find Steed (2nd-level conjuration spell, PHB 240):" +
				"\n\u2022 " + "Summon a spirit in the form of a steed, appearing in an unoccupied space within 30 ft" +
				"\n   " + "It assumes a chosen form: warhorse, pony, camel, elk, or mastiff (DM can allow more forms)" +
				"\n   " + "The steed has the statistics of the chosen form, though its type is celestial, fey, or fiend" +
				"\n   " + "If it has an Intelligence of 5 or less, its Intelligence becomes 6 " +
				"\n   " + "It gains the ability to understand one language that I, the caster, can speak" +
				"\n   " + "When the steed drops to 0 hit points, it disappears, leaving behind no physical form" +
				"\n\u2022 " + "The steed serves me as a mount. I have a bond with it that allows us to fight as a seamless unit" +
				"\n\u2022 " + "While mounted on my steed, I can make any spell I cast that targets only me also target it" +
				"\n\u2022 " + "While my steed is within 1 mile of me, we can communicate with each other telepathically" +
				"\n\u2022 " + "I can dismiss my steed at any time as an action, causing it to disappear" +
				"\n\u2022 " + "Casting this spell again summons the same steed, restored to its max HP, without conditions" +
				"\n\u2022 " + "I can't have more than one steed bonded at a time; as an action, I can release it from its bond",
		actions : [["action", "Find Steed (dismiss)"]],
		actionTooltip : "the Find Steed spell"
	},
	steed : {
		featurestring : "\u25C6 Find Greater Steed: If dropped to 0 HP, the steed disappears, leaving behind no physical form",
		string : "Find Greater Steed (4th-level conjuration spell, XGtE 156):" +
				"\n\u2022 " + "Summon a spirit in the form of a steed, appearing in an unoccupied space within 30 ft" +
				"\n   " + "It has the chosen form: griffon, pegasus, peryton, dire wolf, rhinoceros, or saber-toothed tiger" +
				"\n   " + "The steed has the statistics of the chosen form, though its type is celestial, fey, or fiend" +
				"\n   " + "If it has an Intelligence of 5 or less, its Intelligence becomes 6 " +
				"\n   " + "It gains the ability to understand one language that I, the caster, can speak" +
				"\n   " + "When the steed drops to 0 hit points, it disappears, leaving behind no physical form" +
				"\n\u2022 " + "The steed serves me as a mount. I have a bond with it that allows us to fight as a seamless unit" +
				"\n\u2022 " + "While mounted on my steed, I can make any spell I cast that targets only me also target it" +
				"\n\u2022 " + "While my steed is within 1 mile of me, I can communicate with it telepathically" +
				"\n\u2022 " + "I can dismiss my steed at any time as an action, causing it to disappear" +
				"\n\u2022 " + "Casting this spell again summons the same steed, restored to its max HP, without conditions" +
				"\n\u2022 " + "I can't have more than one steed bonded at a time; as an action, I can release it from its bond",
		actions : [["action", "Find Greater Steed (dismiss)"]],
		actionTooltip : "the Find Greater Steed spell"
	},
	familiar : {
		featurestring : "\u25C6 Find Familiar: If dropped to 0 HP, the familiar disappears, leaving behind no physical form. The familiar must obey all commands of the master",
		string : "Find Familiar (1st-level conjuration [ritual] spell, PHB 240):" +
			"\n\u2022 " + "Summon a spirit that serves as a familiar, appearing in an unoccupied space within 10 ft" +
			"\n   " + "It assumes a chosen form (can change at every casting): bat, cat, crab, frog (toad), hawk," +
			"\n   " + "lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel." +
			"\n   " + "It has the chosen form's statistics, but its type changes from beast to celestial, fey, or fiend" +
			"\n   " + "When the familiar drops to 0 hit points, it disappears, leaving behind no physical form" +
			"\n   " + "It reappears when I cast this spell again (in a new form if so desired)" +
			"\n\u2022 " + "The familiar acts independently of me, but it always obeys my commands" +
			"\n   " + "In combat, it rolls its own initiative and acts on its own turn, but it can't attack" +
			"\n\u2022 " + "While it is within 100 ft of me, I can communicate with it telepathically" +
			"\n\u2022 " + "As an action, I see/hear what it does (but not with my senses) until the start of my next turn" +
			"\n\u2022 " + "As an action, I can temporarily dismiss it, having it disappears into a pocket dimension" +
			"\n\u2022 " + "As an action, while it is temporarily dismissed, I can cause it to reappear within 30 ft" +
			"\n\u2022 " + "I can't have more than one familiar bonded at a time; as an action, I can dismiss it forever" +
			"\n\u2022 " + "When I cast a spell with a range of touch, my familiar can deliver the spell" +
			"\n   " + "It must be within 100 ft of me and it must use its reaction to deliver the spell when I cast it" +
			"\n   " + "It acts as if it cast the spell, but it can use my modifiers for any attack rolls the spell requires",
		actions : [["action", "Find Familiar (dismiss/reappear)"], ["action", "Use familiar's senses"]],
		actionTooltip : "the Find Familiar spell"
	},
	pact_of_the_chain : {
		featurestring : "\u25C6 Pact of the Chain: If dropped to 0 HP, the familiar disappears, leaving behind no physical form. It must obey all commands of the master",
		string : "Pact of the Chain (variant of the Find Familiar 1st-level conjuration [ritual] spell, PHB 240):" +
			"\n\u2022 " + "Summon a spirit that serves as a familiar, appearing in an unoccupied space within 10 ft" +
			"\n   " + "It assumes a chosen form (can change at every casting): bat, cat, crab, frog (toad), hawk," +
			"\n   " + "lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, weasel," +
			"\n   " + "or one of the special forms: imp, pseudodragon, quasit, or sprite." +
			"\n   " + "It has the chosen form's statistics, but its type changes from beast to celestial, fey, or fiend" +
			"\n   " + "When the familiar drops to 0 hit points, it disappears, leaving behind no physical form" +
			"\n   " + "It reappears when I cast this spell again (in a new form if so desired)" +
			"\n\u2022 " + "The familiar acts independently of me, but it always obeys my commands" +
			"\n   " + "In combat, it rolls its own initiative and acts on its own turn, but it can't attack on its turn" +
			"\n\u2022 " + "While it is within 100 ft of me, I can communicate with it telepathically" +
			"\n\u2022 " + "With my Attack action, I can forgo one attacks to have the familiar make one with its reaction" +
			"\n\u2022 " + "As an action, I see/hear what it does (but not with my senses) until the start of my next turn" +
			"\n\u2022 " + "As an action, I can temporarily dismiss it, having it disappears into a pocket dimension" +
			"\n\u2022 " + "As an action, while it is temporarily dismissed, I can cause it to reappear within 30 ft" +
			"\n\u2022 " + "I can't have more than one familiar bonded at a time; as an action, I can dismiss it forever" +
			"\n\u2022 " + "When I cast a spell with a range of touch, my familiar can deliver the spell" +
			"\n   " + "It must be within 100 ft of me and it must use its reaction to deliver the spell when I cast it" +
			"\n   " + "It acts as if it cast the spells, but it can use my modifiers for any attack rolls the spell requires",
		actions : [["action", "Have familiar attack (part of my Attack action)"], ["action", "Familiar (dismiss/reappear)"], ["action", "Use familiar's senses"]],
		actionTooltip : "Warlock (Pact of the Chain)"
	},
	companion : {
		featurestring : "",
		string : "Ranger's Companion (PHB 93):" +
			"\n\u2022 " + "A beast no larger than medium of challenge rating 1/4 or lower" +
			"\n\u2022 " + "If the beast dies, I can spend 8 hours magically bonding with another that isn't hostile to me" +
			"\n\u2022 " + "When moving in favored terrain with only the beast, I can move stealthily at a normal pace" +
			"\n\u2022 " + "The beast adds my proficiency bonus to its AC, attack rolls, damage rolls," +
			"\n   " + "as well as to any saving throws and skills it is proficient with." +
			"\n\u2022 " + "The beast's Hit Point maximum equals four times my ranger level if higher than its normal HP" +
			"\n\u2022 " + "The beast takes its turn on my initiative" +
			"\n\u2022 " + "I can verbally command the beast where to move (no action)" +
			"\n\u2022 " + "As an action, I can have the beast do an Attack, Dash, Disengage, or Help action on its turn" +
			"\n\u2022 " + "If I don't command it to take an action, it takes the Dodge action instead",
		actions : []
	},
	companionrr : {
		featurestring : "",
		string : "Ranger's Animal Companion (UA:RR 5):" +
			"\n\u2022 " + "Call forth and bond with an animal from the wilderness by spending 8 hours and 50 gp" +
			"\n\u2022 " + "The animal can be an ape, black bear, boar, giant badger, giant weasel, mule, panther, or wolf" +
			"\n\u2022 " + "I can have one companion at a time; If it dies, I can spend 8 hours and 25 gp to bring it back" +
			"\n\u2022 " + "My companion uses my Proficiency Bonus instead of its own and also adds it to AC & damage" +
			"\n\u2022 " + "My companion gains a Hit Dice for every ranger level I gain after 3rd" +
			"\n\u2022 " + "My companion can divide 2 points among its ability scores (to max 20) whenever I gain an ASI" +
			"\n\u2022 " + "My companion is proficient in two skills of my choice, as well as all saving throws" +
			"\n\u2022 " + "My companion obeys my commands as best it can, or act on its own if I can't command it" +
			"\n\u2022 " + "My companion rolls for initiative and takes actions as normal, but can't use Multiattack" +
			"\n\u2022 " + "When moving stealthily together with only my companion, we can move at a normal pace" +
			"\n\u2022 " + "My companion gains a bonus on damage rolls against my favored enemies just like me",
		actions : []
	},
	mechanicalserv : {
		featurestring : "",
		string : "Artificer's Mechanical Servant (UA:A 4):" +
			"\n\u2022 " + "The mechanical servant has the statistics of a chosen large beast of challenge rating 2 or lower" +
			"\n  " + "It has the Construct type, understands any language that I know, and has 60 ft Darkvision" +
			"\n  " + "In addition, it is immune to poison damage, being poisoned, and being charmed" +
			"\n\u2022 " + "I can have one servant at a time; If it dies, I can repair it or create a new one" +
			"\n  " + "I can repair the servant over the course of a long rest, which restores it to 1 HP" +
			"\n  " + "I can build a new servant by spending 8 hours a day for 7 days and 1000 gp of materials" +
			"\n\u2022 " + "The servant rolls initiative and takes actions as normal, obeying my commands as best it can" +
			"\n\u2022 " + "As a reaction when I am attacked in melee and my mechanical servant is within 5 ft of me," +
			"\n  I can command the servant to use its reaction to make a melee attack against the attacker",
		actions : [["reaction", "Mechanical Servant (if attacked)"]]
	}
};

//list of recommended fonts and there size to use
var FontList = {
	"SegoePrint" : !typePF ? 5.74 : 6.3,
	"SegoeUI" : !typePF ? 6.35 : 7,
	"SegoeUI-Semibold" : !typePF ? 6.3 : 6.9,
	"Garamond" : !typePF ? 7.7 : 8.45,
	"TimesNewRoman" : !typePF ? 7.4 : 8.1,
	"Calibri" : !typePF ? 7.47 : 8.2
};

//list of field names that correspond to the name of the bookmark
var BookMarkList = {
	"CSfront" : "Show Buttons",
	"CSback" : "Background Menu",
	"ASfront" : !typePF ? "Text.Header.Status" : "Extra.Notes",
	"ASoverflow" : "Extra.Magic Item " + (FieldNumbers.magicitemsD + 1),
	"ASbackgr" : !typePF ? "Text.Header.Background2" : "Sex",
	"AScomp" : "Comp.Desc.Name",
	"ASnotes" : "Notes.Left",
	"WSfront" : "Wildshapes.Settings",
	"ALlog" : "AdvLog.Options",
	"SSfront" : "spells.name.0",
	"SSmore" : "spells.name.0",
	"PRsheet" : "PRsheet.toFocus",

	"CSfront_Bookmarks" : tDoc.bookmarkRoot.children[0].children[0],
	"CSback_Bookmarks" : tDoc.bookmarkRoot.children[0].children[1],
	"ASfront_Bookmarks" : tDoc.bookmarkRoot.children[0].children[2],
	"ASoverflow_Bookmarks" : tDoc.bookmarkRoot.children[0].children[3],
	"ASbackgr_Bookmarks" : tDoc.bookmarkRoot.children[0].children[4],
	"AScomp_Bookmarks" : tDoc.bookmarkRoot.children[0].children[5],
	"ASnotes_Bookmarks" : tDoc.bookmarkRoot.children[0].children[6],
	"WSfront_Bookmarks" : tDoc.bookmarkRoot.children[0].children[7],
	"SSfront_Bookmarks" : tDoc.bookmarkRoot.children[0].children[8],
	"SSmore_Bookmarks" : tDoc.bookmarkRoot.children[0].children[8],
	"ALlog_Bookmarks" : tDoc.bookmarkRoot.children[0].children[9],
	"PRsheet_Bookmarks" : tDoc.bookmarkRoot.children[0].children[10],

	"Character sheet front" : !typePF ? "Text.Level" : "Show Buttons",
	"Level / Character Attributes" : "Character Level",
	"Character Information" : "PC Name.0",
	"Abilities " : "Str",
	"Saving Throws" : "Saving Throw advantages / disadvantages",
	"HP / Proficiency Bonus / AC" : "HP Max",
	"Armor" : "AC Armor Description",
	"Saving Throw Advantages / Disadvantages" : "Saving Throw advantages / disadvantages",
	"Ability save DC" : "Spell save DC 1",
	"Proficiency Bonus / Inspiration" : "Proficiency Bonus",
	"Proficiencies " : "Language 1",
	"Senses" : "Vision",
	"Limited Features" : "Limited Feature 1",
	"Skills " : "Acr",
	"Combat" : "Text.Header.Combat",
	"Initiative / Speed" : "Initiative bonus",
	"Defense / Health" : "HP Current",
	"Attacks / Actions" : "Attack.1.Weapon Selection",
	"Actions" : "Action 1",
	"Attacks " : "Attack.1.Weapon Selection",

	"Character sheet back" : !typePF ? "Text.Header.Features" : "Background Menu",
	"Features " : "Text.Header.Features",
	"Racial Traits" : "Racial Traits",
	"Class Features" : "Class Features",
	"Background Feature" : "Background Feature",
	"Proficiencies" : "Text.Header.Proficiencies",
	"Background " : "Text.Header.Background",
	"Background Traits" : "Background Menu",
	"Personality Trait" : "Personality Trait",
	"Ideal" : "Ideal",
	"Bond" : "Bond",
	"Flaw" : "Flaw",
	"Feats" : !typePF ? "Feat Name 1" : "Feat Name 1.1",
	"Equipment" : "Adventuring Gear Row 1",
	"Coins, Gems, and other Valuables" : "Valuables1",

	"Additional sheet" : !typePF ? "Text.Header.Status.1" : "Extra.Notes.1",
	"Additional sheet_template" : "ASfront",
	"Status" : "Text.Header.Status.1",
	"Exhaustion" : "Extra.Exhaustion Level 1.1",
	"Conditions" : "Extra.Condition 1.1",
	"Combat Rules / Notes" : "Extra.Notes.1",
	"Notes  " : "Extra.Notes.1",
	"Possessions" : "Text.Header.Possessions.1",
	"Magic Items" : "Extra.Magic Item 1.1",
	"Extra Equipment" : "Extra.Gear Row 1.1",
	"Other Holdings" : "Extra.Other Holdings.1",

	"Overflow sheet" : "Extra.Magic Item " + (FieldNumbers.magicitemsD + 1) + ".1",
	"Overflow sheet_template" : "ASoverflow",
	"Magic Items " : "Extra.Magic Item " + (FieldNumbers.magicitemsD + 1) + ".1",
	"Feats " : "Feat Name " + (FieldNumbers.feats - 3) + ".1",
	"Limited Features " : "Limited Feature 9.1",
	"Actions " : "Action " + (FieldNumbers.trueactions - 5) + ".1",
	"Proficiencies " : "MoreProficiencies.1",

	"Background sheet" :  !typePF ? "Text.Header.Background2.1" : "Sex.1",
	"Background sheet_template" : "ASbackgr",
	"Character Description" : "Sex.1",
	"Background" : "Text.Header.Background2.1",
	"Character History" : "Background_History.1",
	"Character Portrait" : "Portrait.1",
	"Appearance" : "Background_Appearance.1",
	"Enemies" : "Background_Enemies.1",
	"Allies & Organizations" :  !typePF ? "Symbol.1" : "Background_Organisation.Left.1",
	"Organization Symbol" : "Symbol.1",
	"Lifestyle" : "Lifestyle.1",

	"Companion sheet" : "Companion.Options",
	"Companion sheet_template" : "AScomp",
	"Descriptive Header" : "Comp.Type",
	"Abilities" : "Comp.Use.Ability.Str.Score",
	"Skills" : "Comp.Use.Skills.Acr.Mod",
	"Attacks" : "Comp.Use.Attack.1.Weapon Selection",
	"Initiative" : "Comp.Use.Combat.Init.Mod",
	"Initiative / Speed / HD" : "Comp.Use.Combat.Init.Mod",
	"Speed" : "Comp.Use.Speed",
	"AC / Prof Bonus / HP" : "Comp.Use.AC",
	"Defense" : "Comp.Use.AC",
	"Health" : "Comp.Use.HP.Current",
	"Features" : "Comp.Use.Features",
	"Proficiency Bonus" : "Comp.Use.Proficiency Bonus",
	"Traits" : "Comp.Use.Traits",
	"Notes " : "Cnote.Left",

	"Notes sheet" : "Notes.Left",
	"Notes sheet_template" : "ASnotes",
	"Notes" : "Notes.Left",

	"Wild Shapes" : "Wildshapes.Settings",
	"Wild Shapes_template" : "WSfront",
	"Wild Shape 1" : "Wildshape.Race.1",
	"Wild Shape 2" : "Wildshape.Race.2",
	"Wild Shape 3" : "Wildshape.Race.3",
	"Wild Shape 4" : "Wildshape.Race.4",

	"Spell Sheets" : "spells.name.0",
	"Spell Sheets_template" : "SSfront",

	"Adventurers Logsheet" : "AdvLog.Options",
	"Adventurers Logsheet_template" : "ALlog",
	"Logsheet Entry 1" : "Text.AdvLog.1",
	"Logsheet Entry 2" : "Text.AdvLog.2",
	"Logsheet Entry 3" : "Text.AdvLog.3",
	"Logsheet Entry 4" : "Text.AdvLog.4",
	"Logsheet Entry 5" : "Text.AdvLog.5",
	"Logsheet Entry 6" : "Text.AdvLog.6",
	"Logsheet Entry 7" : "Text.AdvLog.7",

	"Reference Sheet" : "PRsheet.toFocus.1",
	"Reference Sheet_template" : "PRsheet"
};

var TemplateNames = {
	"CSfront" : "Character sheet front",
	"CSback" : "Character sheet back",
	"ASfront" : (!typePF ? "Conditions / Magic Items" : "Feats / Magic Items") + " sheet (3rd page)",
	"ASoverflow" : "Overflow (magic items, feats, actions, etc.) sheet",
	"ASbackgr" : "Background and Organization sheet",
	"AScomp" : "Companion sheet",
	"ASnotes" : "Notes sheet",
	"WSfront" : "Wild Shapes sheet",
	"ALlog" : "Adventurers Logsheet",
	"SSfront" : "Spell sheet",
	"SSmore" : "Spell sheet",
	"PRsheet" : "Rules Reference sheet"
};

var TemplatesWithExtras = ["AScomp", "ASnotes", "WSfront", "SSfront", "SSmore", "ALlog"];

var TemplateDep = {
	"ASfront" : [],
	"ASoverflow" : ["ASfront"],
	"ASbackgr" : ["ASoverflow", "ASfront"],
	"AScomp" : ["ASbackgr", "ASoverflow", "ASfront"],
	"ASnotes" : ["AScomp", "ASbackgr", "ASoverflow", "ASfront"],
	"WSfront" : ["ASnotes", "AScomp", "ASbackgr", "ASoverflow", "ASfront"],
	"SSfront" : ["WSfront", "ASnotes", "AScomp", "ASbackgr", "ASoverflow", "ASfront"],
	"SSmore" : ["SSfront", "WSfront", "ASnotes", "AScomp", "ASbackgr", "ASoverflow", "ASfront"],
	"ALlog" : ["SSmore", "SSfront", "WSfront", "ASnotes", "AScomp", "ASbackgr", "ASoverflow", "ASfront"],
	"PRsheet" : ["ALlog", "SSmore", "SSfront", "WSfront", "ASnotes", "AScomp", "ASbackgr", "ASoverflow", "ASfront"]
};

var TemplateResetRanges = {
	"AScomp" : ["Comp", "Text.Comp", "Companion", "Cnote", "BlueText.Comp"],
	"ASnotes" : ["Notes"],
	"WSfront" : ["Wildshape.Race"],
	"ALlog" : ["AdvLog", "Text.AdvLog"]
};

var factions = {
	"emeraldenclave" : {
		name : "The Emerald Enclave",
		type : "Forgotten Realms",
		ranks : [
			"Springwarden (rank 1)",
			"Summerstrider (rank 2)",
			"Autumnreaver (rank 3)",
			"Winterstalker (rank 4)",
			"Master of the Wild (rank 5)"
		]
	},
	"harpers" : {
		name : "The Harpers",
		type : "Forgotten Realms",
		ranks : [
			"Watcher (rank 1)",
			"Harpshadow (rank 2)",
			"Brightcandle (rank 3)",
			"Wise Owl (rank 4)",
			"High Harper (rank 5)"
		]
	},
	"lordsalliance" : {
		name : "The Lords' Alliance",
		type : "Forgotten Realms",
		ranks : [
			"Cloak (rank 1)",
			"Redknife (rank 2)",
			"Stingblade (rank 3)",
			"Warduke (rank 4)",
			"Lioncrown (rank 5)"
		]
	},
	"ordergauntlet" : {
		name : "The Order of the Gauntlet",
		type : "Forgotten Realms",
		ranks : [
			"Chevall (rank 1)",
			"Marcheon (rank 2)",
			"Whitehawk (rank 3)",
			"Vindicator (rank 4)",
			"Righteous Hand (rank 5)"
		]
	},
	"zhentarim" : {
		name : "The Zhentarim",
		type : "Forgotten Realms",
		ranks : [
			"Fang (rank 1)",
			"Wolf (rank 2)",
			"Viper (rank 3)",
			"Ardragon (rank 4)",
			"Dread Lord (rank 5)"
		]
	},
	"azorius" : {
		name : "Azorius Senate",
		type : "Ravnica",
		ranks : [
			"Official (rank 1)",
			"Authority (rank 2)",
			"Minister, Judge, or Senator (rank 3)",
			"Arbiter (rank 4)"
		]
	},
	"boros" : {
		name : "Boros Legion",
		type : "Ravnica",
		ranks : [
			"Sergeant (rank 1)",
			"Skyknight (special)",
			"Wojek (special)",
			"Brigadier (rank 2)",
			"Sunhome Guard (special)",
			"Captain (rank 3)",
			"Commander (rank 4)"
		]
	},
	"dimir" : {
		name : "House Dimir",
		type : "Ravnica",
		ranks : [
			"Independent Agent",
			"Collector of Secrets",
			"Inner Circle",
			"Guildmaster's Confidant"
		]
	},
	"golgari" : {
		name : "Golgari Swarm",
		type : "Ravnica",
		ranks : [
			"Agent",
			"Monstrous Favors",
			"Ochran (special)",
			"Adviser",
			"High Chancellor",
			"Matka (special)"
		]
	},
	"gruul" : {
		name : "Gruul Clans",
		type : "Ravnica",
		ranks : [
			"Proven",
			"Beast-Friend",
			"Celebrated",
			"Chieftan"
		]
	},
	"izzet" : {
		name : "Izzet League",
		type : "Ravnica",
		ranks : [
			"Researcher (rank 1)",
			"Scorchbringer (special)",
			"Supervisor (rank 2)",
			"Independent Researcher (special)",
			"Director (rank 3)",
			"Advisor (rank 4)"
		]
	},
	"orzhov" : {
		name : "Orzhov Syndicate",
		type : "Ravnica",
		ranks : [
			"Syndic (rank 1)",
			"Knight (rank 2)",
			"Ministrant (rank 3)",
			"Pontiff (rank 4)"
		]
	},
	"rakdos" : {
		name : "Cult of Rakdos",
		type : "Ravnica",
		ranks : [
			"Extra",
			"Sideshow Act",
			"Blood Witch (special)",
			"Star Performer",
			"Ringmaster"
		]
	},
	"selesnya" : {
		name : "Selesnya Conclave",
		type : "Ravnica",
		ranks : [
			"Evangel (special)",
			"Votary (special)",
			"Sagittar (special)",
			"Selesnya Charm",
			"Equenaut (special)",
			"Hierarch (special)",
			"Ledev Guardian (special)",
			"Dignitary (special)"
		]
	},
	"simic" : {
		name : "Simic Combine",
		type : "Ravnica",
		ranks : [
			"Technician (rank 1)",
			"Researcher (rank 2)",
			"Luminary (special)",
			"Project Leader (rank 3)",
			"Clade Leader (rank 4)",
			"Speaker (special)"
		]
	}
}

var LinksLatest = {
	advlog : {
		PF : "http://www.dmsguild.com/product/194068",
		CF : "http://www.dmsguild.com/product/194069"
	},
	character : {
		PF : "https://flapkan.com/printer_friendly_character_sheet",
		CF : "https://flapkan.com/colourful_character_sheet"
	},
	patreon : "https://www.patreon.com/posts/mpmbs-character-14927098"
};

// A backwards compatible way to call the field content of those that are now part of the CurrentVars object
var BackwardsCompatible = {
	'MakeMobileReady Remember' : "!CurrentVars.mobileset ? '' : CurrentVars.mobileset.active ? true : '';",
	'WhiteoutRemember' : "CurrentVars.whiteout",
	'FontSize Remember' : "CurrentVars.fontsize",
	'Extra.Layers Remember' : 'CurrentVars.vislayers.toString()',
	'BlueTextRemember' : "CurrentVars.bluetxt ? 'Yes' : 'No';",
	'Class Features Remember' : "classFeaChoiceBackwardsComp();",
	'Manual Attack Remember' : "CurrentVars.manual.attacks ? 'No' : 'Yes';",
	'Manual Background Remember' : "CurrentVars.manual.background ? 'No' : 'Yes';",
	'Manual Class Remember' : "CurrentVars.manual.classes ? 'No' : 'Yes';",
	'Manual Feat Remember' : "CurrentVars.manual.feats ? 'No' : 'Yes';",
	'Manual Race Remember' : "CurrentVars.manual.race ? 'No' : 'Yes';"
}

// Define this here (as well) so that it can be used by the Base_ClassList
var Base_spellLevelList = ["Cantrips (0-level)", "1st-level", "2nd-level", "3rd-level", "4th-level", "5th-level", "6th-level", "7th-level", "8th-level", "9th-level", "Talents", "Disciplines"];

var licenseOGL = [
  "OPEN GAME LICENSE Version 1.0a",
  'The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc ("Wizards"). All Rights Reserved.',
  '1. Definitions:' + desc(['(a) "Contributors" means the copyright and/or trademark owners who have contributed Open Game Content;',
  '(b) "Derivative Material" means copyrighted material including derivative works and translations (including into other computer languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work may be recast, transformed or adapted;',
  '(c) "Distribute" means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise distribute;',
  '(d) "Open Game Content" means the game mechanic and includes the methods, procedures, processes and routines to the extent such content does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and means any work covered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity.',
  '(e) "Product Identity" means product and product line names, logos and identifying marks including trade dress; artifacts; creatures characters; stories, storylines, plots, thematic elements, dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts, themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural abilities or effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product identity by the owner of the Product Identity, and which specifically excludes the Open Game Content;',
  '(f) "Trademark" means the logos, names, mark, sign, motto, designs that are used by a Contributor to identify itself or its products or the associated products contributed to the Open Game License by the Contributor',
  '(g) "Use", "Used" or "Using" means to use, Distribute, copy, edit, format, modify, translate and otherwise create Derivative Material of Open Game Content.',
  '(h) "You" or "Your" means the licensee in terms of this agreement.']),
  "2. The License: This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used under and in terms of this License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or subtracted from this License except as described by the License itself. No other terms or conditions may be applied to any Open Game Content distributed using this License.",
  "3.Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.",
  "4. Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty-free, non-exclusive license with the exact terms of this License to Use, the Open Game Content.",
  "5.Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that Your Contributions are Your original creation and/or You have sufficient rights to grant the rights conveyed by this License.",
  "6.Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing, and You must add the title, the copyright date, and the copyright holder's name to the COPYRIGHT NOTICE of any original Open Game Content you Distribute.",
  "7. Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed in another, independent Agreement with the owner of each element of that Product Identity. You agree not to indicate compatibility or co-adaptability with any Trademark or Registered Trademark in conjunction with a work containing Open Game Content except as expressly licensed in another, independent Agreement with the owner of such Trademark or Registered Trademark. The use of any Product Identity in Open Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product Identity used in Open Game Content shall retain all rights, title and interest in and to that Product Identity.",
  "8. Identification: If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open Game Content.",
  "9. Updating the License: Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of this License to copy, modify and distribute any Open Game Content originally distributed under any version of this License.",
  "10 Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content You Distribute.",
  "11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor unless You have written permission from the Contributor to do so.",
  "12 Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material so affected.",
  "13 Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.",
  "14 Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable.",
  "15 COPYRIGHT NOTICE Open Game License v 1.0 Copyright 2000, Wizards of the Coast, Inc.",
  "System Reference Document 5.1 Copyright 2016, Wizards of the Coast, Inc.; Authors Mike Mearls, Jeremy Crawford, Chris Perkins, Rodney Thompson, Peter Lee, James Wyatt, Robert J. Schwalb, Bruce R. Cordell, Chris Sims, and Steve Townshend, based on original material by E. Gary Gygax and Dave Arneson.",
  "MPMB's Character Record Sheet© Copyright 2014, Joost Wijnen; Flapkan Productions.",
  "END OF LICENSE"
];

var licenseGPLV3 = [
	'GNU General Public License Version 3',
	'The following text is Copyright (C) 2007 Free Software Foundation, Inc. Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.',
	"PREAMBLE\nThe GNU General Public License is a free, copyleft license for software and other kinds of works.\nThe licenses for most software and other practical works are designed to take away your freedom to share and change the works. By contrast, the GNU General Public License is intended to guarantee your freedom to share and change all versions of a program--to make sure it remains free software for all its users. We, the Free Software Foundation, use the GNU General Public License for most of our software; it applies also to any other work released this way by its authors. You can apply it to your programs, too.\nWhen we speak of free software, we are referring to freedom, not price. Our General Public Licenses are designed to make sure that you have the freedom to distribute copies of free software (and charge for them if you wish), that you receive source code or can get it if you want it, that you can change the software or use pieces of it in new free programs, and that you know you can do these things.\nTo protect your rights, we need to prevent others from denying you these rights or asking you to surrender the rights. Therefore, you have certain responsibilities if you distribute copies of the software, or if you modify it: responsibilities to respect the freedom of others.\nFor example, if you distribute copies of such a program, whether gratis or for a fee, you must pass on to the recipients the same freedoms that you received. You must make sure that they, too, receive or can get the source code. And you must show them these terms so they know their rights.\nDevelopers that use the GNU GPL protect your rights with two steps: (1) assert copyright on the software, and (2) offer you this License giving you legal permission to copy, distribute and/or modify it.\nFor the developers' and authors' protection, the GPL clearly explains that there is no warranty for this free software. For both users' and authors' sake, the GPL requires that modified versions be marked as changed, so that their problems will not be attributed erroneously to authors of previous versions.\nSome devices are designed to deny users access to install or run modified versions of the software inside them, although the manufacturer can do so. This is fundamentally incompatible with the aim of protecting users' freedom to change the software. The systematic pattern of such abuse occurs in the area of products for individuals to use, which is precisely where it is most unacceptable. Therefore, we have designed this version of the GPL to prohibit the practice for those products. If such problems arise substantially in other domains, we stand ready to extend this provision to those domains in future versions of the GPL, as needed to protect the freedom of users.\nFinally, every program is threatened constantly by software patents. States should not allow patents to restrict development and use of software on general-purpose computers, but in those that do, we wish to avoid the special danger that patents applied to a free program could make it effectively proprietary. To prevent this, the GPL assures that patents cannot be used to render the program non-free.\nThe precise terms and conditions for copying, distribution and modification follow.",
	"TERMS AND CONDITIONS",
	'0. Definitions:\n"This License" refers to version 3 of the GNU General Public License.\n"Copyright" also means copyright-like laws that apply to other kinds of works, such as semiconductor masks.\n"The Program" refers to any copyrightable work licensed under this License. Each licensee is addressed as "you". "Licensees" and "recipients" may be individuals or organizations.\nTo "modify" a work means to copy from or adapt all or part of the work in a fashion requiring copyright permission, other than the making of an exact copy. The resulting work is called a "modified version" of the earlier work or a work "based on" the earlier work.\nA "covered work" means either the unmodified Program or a work based on the Program.\nTo "propagate" a work means to do anything with it that, without permission, would make you directly or secondarily liable for infringement under applicable copyright law, except executing it on a computer or modifying a private copy. Propagation includes copying, distribution (with or without modification), making available to the public, and in some countries other activities as well.\nTo "convey" a work means any kind of propagation that enables other parties to make or receive copies. Mere interaction with a user through a computer network, with no transfer of a copy, is not conveying.\nAn interactive user interface displays "Appropriate Legal Notices" to the extent that it includes a convenient and prominently visible feature that (1) displays an appropriate copyright notice, and (2) tells the user that there is no warranty for the work (except to the extent that warranties are provided), that licensees may convey the work under this License, and how to view a copy of this License. If the interface presents a list of user commands or options, such as a menu, a prominent item in the list meets this criterion.',
	'1. Source Code.\nThe "source code" for a work means the preferred form of the work for making modifications to it. "Object code" means any non-source form of a work.\nA "Standard Interface" means an interface that either is an official standard defined by a recognized standards body, or, in the case of interfaces specified for a particular programming language, one that is widely used among developers working in that language.\nThe "System Libraries" of an executable work include anything, other than the work as a whole, that (a) is included in the normal form of packaging a Major Component, but which is not part of that Major Component, and (b) serves only to enable use of the work with that Major Component, or to implement a Standard Interface for which an implementation is available to the public in source code form. A "Major Component", in this context, means a major essential component (kernel, window system, and so on) of the specific operating system (if any) on which the executable work runs, or a compiler used to produce the work, or an object code interpreter used to run it.\nThe "Corresponding Source" for a work in object code form means all the source code needed to generate, install, and (for an executable work) run the object code and to modify the work, including scripts to control those activities. However, it does not include the work\'s System Libraries, or general-purpose tools or generally available free programs which are used unmodified in performing those activities but which are not part of the work. For example, Corresponding Source includes interface definition files associated with source files for the work, and the source code for shared libraries and dynamically linked subprograms that the work is specifically designed to require, such as by intimate data communication or control flow between those subprograms and other parts of the work.\nThe Corresponding Source need not include anything that users can regenerate automatically from other parts of the Corresponding Source.\nThe Corresponding Source for a work in source code form is that same work.',
	'2. Basic Permissions.\nAll rights granted under this License are granted for the term of copyright on the Program, and are irrevocable provided the stated conditions are met. This License explicitly affirms your unlimited permission to run the unmodified Program. The output from running a covered work is covered by this License only if the output, given its content, constitutes a covered work. This License acknowledges your rights of fair use or other equivalent, as provided by copyright law.\nYou may make, run and propagate covered works that you do not convey, without conditions so long as your license otherwise remains in force. You may convey covered works to others for the sole purpose of having them make modifications exclusively for you, or provide you with facilities for running those works, provided that you comply with the terms of this License in conveying all material for which you do not control copyright. Those thus making or running the covered works for you must do so exclusively on your behalf, under your direction and control, on terms that prohibit them from making any copies of your copyrighted material outside their relationship with you.\nConveying under any other circumstances is permitted solely under the conditions stated below. Sublicensing is not allowed; section 10 makes it unnecessary.',
	"3. Protecting Users' Legal Rights From Anti-Circumvention Law.\nNo covered work shall be deemed part of an effective technological measure under any applicable law fulfilling obligations under article 11 of the WIPO copyright treaty adopted on 20 December 1996, or similar laws prohibiting or restricting circumvention of such measures.\nWhen you convey a covered work, you waive any legal power to forbid circumvention of technological measures to the extent such circumvention is effected by exercising rights under this License with respect to the covered work, and you disclaim any intention to limit operation or modification of the work as a means of enforcing, against the work's users, your or third parties' legal rights to forbid circumvention of technological measures.",
	"4. Conveying Verbatim Copies.\nYou may convey verbatim copies of the Program's source code as you receive it, in any medium, provided that you conspicuously and appropriately publish on each copy an appropriate copyright notice; keep intact all notices stating that this License and any non-permissive terms added in accord with section 7 apply to the code; keep intact all notices of the absence of any warranty; and give all recipients a copy of this License along with the Program.\nYou may charge any price or no price for each copy that you convey, and you may offer support or warranty protection for a fee.",
	'5. Conveying Modified Source Versions.\nYou may convey a work based on the Program, or the modifications to produce it from the Program, in the form of source code under the terms of section 4, provided that you also meet all of these conditions:' + desc([
		'(a) The work must carry prominent notices stating that you modified it, and giving a relevant date.',
		'(b) The work must carry prominent notices stating that it is released under this License and any conditions added under section 7. This requirement modifies the requirement in section 4 to "keep intact all notices".',
		'(c) You must license the entire work, as a whole, under this License to anyone who comes into possession of a copy. This License will therefore apply, along with any applicable section 7 additional terms, to the whole of the work, and all its parts, regardless of how they are packaged. This License gives no permission to license the work in any other way, but it does not invalidate such permission if you have separately received it.',
		'(d) If the work has interactive user interfaces, each must display Appropriate Legal Notices; however, if the Program has interactive interfaces that do not display Appropriate Legal Notices, your work need not make them do so.'
	]) + '\nA compilation of a covered work with other separate and independent works, which are not by their nature extensions of the covered work, and which are not combined with it such as to form a larger program, in or on a volume of a storage or distribution medium, is called an "aggregate" if the compilation and its resulting copyright are not used to limit the access or legal rights of the compilation\'s users beyond what the individual works permit. Inclusion of a covered work in an aggregate does not cause this License to apply to the other parts of the aggregate.',
	'6. Conveying Non-Source Forms.\nYou may convey a covered work in object code form under the terms of sections 4 and 5, provided that you also convey the machine-readable Corresponding Source under the terms of this License, in one of these ways:' + desc([
		'(a) Convey the object code in, or embodied in, a physical product (including a physical distribution medium), accompanied by the Corresponding Source fixed on a durable physical medium customarily used for software interchange.',
		'(b) Convey the object code in, or embodied in, a physical product (including a physical distribution medium), accompanied by a written offer, valid for at least three years and valid for as long as you offer spare parts or customer support for that product model, to give anyone who possesses the object code either (1) a copy of the Corresponding Source for all the software in the product that is covered by this License, on a durable physical medium customarily used for software interchange, for a price no more than your reasonable cost of physically performing this conveying of source, or (2) access to copy the Corresponding Source from a network server at no charge.',
		'(c) Convey individual copies of the object code with a copy of the written offer to provide the Corresponding Source. This alternative is allowed only occasionally and noncommercially, and only if you received the object code with such an offer, in accord with subsection 6b.',
		'(d) Convey the object code by offering access from a designated place (gratis or for a charge), and offer equivalent access to the Corresponding Source in the same way through the same place at no further charge. You need not require recipients to copy the Corresponding Source along with the object code. If the place to copy the object code is a network server, the Corresponding Source may be on a different server (operated by you or a third party) that supports equivalent copying facilities, provided you maintain clear directions next to the object code saying where to find the Corresponding Source. Regardless of what server hosts the Corresponding Source, you remain obligated to ensure that it is available for as long as needed to satisfy these requirements.',
		'(e) Convey the object code using peer-to-peer transmission, provided you inform other peers where the object code and Corresponding Source of the work are being offered to the general public at no charge under subsection 6d.'
	]) + '\nA separable portion of the object code, whose source code is excluded from the Corresponding Source as a System Library, need not be included in conveying the object code work.\nA "User Product" is either (1) a "consumer product", which means any tangible personal property which is normally used for personal, family, or household purposes, or (2) anything designed or sold for incorporation into a dwelling. In determining whether a product is a consumer product, doubtful cases shall be resolved in favor of coverage. For a particular product received by a particular user, "normally used" refers to a typical or common use of that class of product, regardless of the status of the particular user or of the way in which the particular user actually uses, or expects or is expected to use, the product. A product is a consumer product regardless of whether the product has substantial commercial, industrial or non-consumer uses, unless such uses represent the only significant mode of use of the product.\n"Installation Information" for a User Product means any methods, procedures, authorization keys, or other information required to install and execute modified versions of a covered work in that User Product from a modified version of its Corresponding Source. The information must suffice to ensure that the continued functioning of the modified object code is in no case prevented or interfered with solely because modification has been made.\nIf you convey an object code work under this section in, or with, or specifically for use in, a User Product, and the conveying occurs as part of a transaction in which the right of possession and use of the User Product is transferred to the recipient in perpetuity or for a fixed term (regardless of how the transaction is characterized), the Corresponding Source conveyed under this section must be accompanied by the Installation Information. But this requirement does not apply if neither you nor any third party retains the ability to install modified object code on the User Product (for example, the work has been installed in ROM).\nThe requirement to provide Installation Information does not include a requirement to continue to provide support service, warranty, or updates for a work that has been modified or installed by the recipient, or for the User Product in which it has been modified or installed. Access to a network may be denied when the modification itself materially and adversely affects the operation of the network or violates the rules and protocols for communication across the network.\nCorresponding Source conveyed, and Installation Information provided, in accord with this section must be in a format that is publicly documented (and with an implementation available to the public in source code form), and must require no special password or key for unpacking, reading or copying.',
	'7. Additional Terms.\n"Additional permissions" are terms that supplement the terms of this License by making exceptions from one or more of its conditions. Additional permissions that are applicable to the entire Program shall be treated as though they were included in this License, to the extent that they are valid under applicable law. If additional permissions apply only to part of the Program, that part may be used separately under those permissions, but the entire Program remains governed by this License without regard to the additional permissions.\nWhen you convey a copy of a covered work, you may at your option remove any additional permissions from that copy, or from any part of it. (Additional permissions may be written to require their own removal in certain cases when you modify the work.) You may place additional permissions on material, added by you to a covered work, for which you have or can give appropriate copyright permission.\nNotwithstanding any other provision of this License, for material you add to a covered work, you may (if authorized by the copyright holders of that material) supplement the terms of this License with terms:' + desc([
		'(a) Disclaiming warranty or limiting liability differently from the terms of sections 15 and 16 of this License; or',
		'(b) Requiring preservation of specified reasonable legal notices or author attributions in that material or in the Appropriate Legal Notices displayed by works containing it; or',
		'(c) Prohibiting misrepresentation of the origin of that material, or requiring that modified versions of such material be marked in reasonable ways as different from the original version; or',
		'(d) Limiting the use for publicity purposes of names of licensors or authors of the material; or',
		'(e) Declining to grant rights under trademark law for use of some trade names, trademarks, or service marks; or',
		'(f) Requiring indemnification of licensors and authors of that material by anyone who conveys the material (or modified versions of it) with contractual assumptions of liability to the recipient, for any liability that these contractual assumptions directly impose on those licensors and authors.'
	]) + 'All other non-permissive additional terms are considered "further restrictions" within the meaning of section 10. If the Program as you received it, or any part of it, contains a notice stating that it is governed by this License along with a term that is a further restriction, you may remove that term. If a license document contains a further restriction but permits relicensing or conveying under this License, you may add to a covered work material governed by the terms of that license document, provided that the further restriction does not survive such relicensing or conveying.\nIf you add terms to a covered work in accord with this section, you must place, in the relevant source files, a statement of the additional terms that apply to those files, or a notice indicating where to find the applicable terms.\nAdditional terms, permissive or non-permissive, may be stated in the form of a separately written license, or stated as exceptions; the above requirements apply either way.',
	'8. Termination.\nYou may not propagate or modify a covered work except as expressly provided under this License. Any attempt otherwise to propagate or modify it is void, and will automatically terminate your rights under this License (including any patent licenses granted under the third paragraph of section 11).\nHowever, if you cease all violation of this License, then your license from a particular copyright holder is reinstated (a) provisionally, unless and until the copyright holder explicitly and finally terminates your license, and (b) permanently, if the copyright holder fails to notify you of the violation by some reasonable means prior to 60 days after the cessation.\nMoreover, your license from a particular copyright holder is reinstated permanently if the copyright holder notifies you of the violation by some reasonable means, this is the first time you have received notice of violation of this License (for any work) from that copyright holder, and you cure the violation prior to 30 days after your receipt of the notice.\nTermination of your rights under this section does not terminate the licenses of parties who have received copies or rights from you under this License. If your rights have been terminated and not permanently reinstated, you do not qualify to receive new licenses for the same material under section 10.',
	'9. Acceptance Not Required for Having Copies.\nYou are not required to accept this License in order to receive or run a copy of the Program. Ancillary propagation of a covered work occurring solely as a consequence of using peer-to-peer transmission to receive a copy likewise does not require acceptance. However, nothing other than this License grants you permission to propagate or modify any covered work. These actions infringe copyright if you do not accept this License. Therefore, by modifying or propagating a covered work, you indicate your acceptance of this License to do so.',
	'10. Automatic Licensing of Downstream Recipients.\nEach time you convey a covered work, the recipient automatically receives a license from the original licensors, to run, modify and propagate that work, subject to this License. You are not responsible for enforcing compliance by third parties with this License.\nAn "entity transaction" is a transaction transferring control of an organization, or substantially all assets of one, or subdividing an organization, or merging organizations. If propagation of a covered work results from an entity transaction, each party to that transaction who receives a copy of the work also receives whatever licenses to the work the party\'s predecessor in interest had or could give under the previous paragraph, plus a right to possession of the Corresponding Source of the work from the predecessor in interest, if the predecessor has it or can get it with reasonable efforts.\nYou may not impose any further restrictions on the exercise of the rights granted or affirmed under this License. For example, you may not impose a license fee, royalty, or other charge for exercise of rights granted under this License, and you may not initiate litigation (including a cross-claim or counterclaim in a lawsuit) alleging that any patent claim is infringed by making, using, selling, offering for sale, or importing the Program or any portion of it.',
	'11. Patents.\nA "contributor" is a copyright holder who authorizes use under this License of the Program or a work on which the Program is based. The work thus licensed is called the contributor\'s "contributor version".\nA contributor\'s "essential patent claims" are all patent claims owned or controlled by the contributor, whether already acquired or hereafter acquired, that would be infringed by some manner, permitted by this License, of making, using, or selling its contributor version, but do not include claims that would be infringed only as a consequence of further modification of the contributor version. For purposes of this definition, "control" includes the right to grant patent sublicenses in a manner consistent with the requirements of this License.\nEach contributor grants you a non-exclusive, worldwide, royalty-free patent license under the contributor\'s essential patent claims, to make, use, sell, offer for sale, import and otherwise run, modify and propagate the contents of its contributor version.\nIn the following three paragraphs, a "patent license" is any express agreement or commitment, however denominated, not to enforce a patent (such as an express permission to practice a patent or covenant not to sue for patent infringement). To "grant" such a patent license to a party means to make such an agreement or commitment not to enforce a patent against the party.\nIf you convey a covered work, knowingly relying on a patent license, and the Corresponding Source of the work is not available for anyone to copy, free of charge and under the terms of this License, through a publicly available network server or other readily accessible means, then you must either (1) cause the Corresponding Source to be so available, or (2) arrange to deprive yourself of the benefit of the patent license for this particular work, or (3) arrange, in a manner consistent with the requirements of this License, to extend the patent license to downstream recipients. "Knowingly relying" means you have actual knowledge that, but for the patent license, your conveying the covered work in a country, or your recipient\'s use of the covered work in a country, would infringe one or more identifiable patents in that country that you have reason to believe are valid.\nIf, pursuant to or in connection with a single transaction or arrangement, you convey, or propagate by procuring conveyance of, a covered work, and grant a patent license to some of the parties receiving the covered work authorizing them to use, propagate, modify or convey a specific copy of the covered work, then the patent license you grant is automatically extended to all recipients of the covered work and works based on it.\nA patent license is "discriminatory" if it does not include within the scope of its coverage, prohibits the exercise of, or is conditioned on the non-exercise of one or more of the rights that are specifically granted under this License. You may not convey a covered work if you are a party to an arrangement with a third party that is in the business of distributing software, under which you make payment to the third party based on the extent of your activity of conveying the work, and under which the third party grants, to any of the parties who would receive the covered work from you, a discriminatory patent license (a) in connection with copies of the covered work conveyed by you (or copies made from those copies), or (b) primarily for and in connection with specific products or compilations that contain the covered work, unless you entered into that arrangement, or that patent license was granted, prior to 28 March 2007.\nNothing in this License shall be construed as excluding or limiting any implied license or other defenses to infringement that may otherwise be available to you under applicable patent law.',
	"12. No Surrender of Others' Freedom.\nIf conditions are imposed on you (whether by court order, agreement or otherwise) that contradict the conditions of this License, they do not excuse you from the conditions of this License. If you cannot convey a covered work so as to satisfy simultaneously your obligations under this License and any other pertinent obligations, then as a consequence you may not convey it at all. For example, if you agree to terms that obligate you to collect a royalty for further conveying from those to whom you convey the Program, the only way you could satisfy both those terms and this License would be to refrain entirely from conveying the Program.",
	'13. Use with the GNU Affero General Public License.\nNotwithstanding any other provision of this License, you have permission to link or combine any covered work with a work licensed under version 3 of the GNU Affero General Public License into a single combined work, and to convey the resulting work. The terms of this License will continue to apply to the part which is the covered work, but the special requirements of the GNU Affero General Public License, section 13, concerning interaction through a network will apply to the combination as such.',
	'14. Revised Versions of this License.\nThe Free Software Foundation may publish revised and/or new versions of the GNU General Public License from time to time. Such new versions will be similar in spirit to the present version, but may differ in detail to address new problems or concerns.\nEach version is given a distinguishing version number. If the Program specifies that a certain numbered version of the GNU General Public License "or any later version" applies to it, you have the option of following the terms and conditions either of that numbered version or of any later version published by the Free Software Foundation. If the Program does not specify a version number of the GNU General Public License, you may choose any version ever published by the Free Software Foundation.\nIf the Program specifies that a proxy can decide which future versions of the GNU General Public License can be used, that proxy\'s public statement of acceptance of a version permanently authorizes you to choose that version for the Program.\nLater license versions may give you additional or different permissions. However, no additional obligations are imposed on any author or copyright holder as a result of your choosing to follow a later version.',
	'15. Disclaimer of Warranty.\nTHERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.',
	'16. Limitation of Liability.\nIN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
	'17. Interpretation of Sections 15 and 16.\nIf the disclaimer of warranty and limitation of liability provided above cannot be given local legal effect according to their terms, reviewing courts shall apply local law that most closely approximates an absolute waiver of all civil liability in connection with the Program, unless a warranty or assumption of liability accompanies a copy of the Program in return for a fee.',
	'END OF TERMS AND CONDITIONS'
];

var Base_SourceList = {
	// Basic source
	"SRD" : {
		name : "System Reference Document 5.1",
		abbreviation : "SRD",
		group : "Primary Sources",
		url : "https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf",
		date : "2016/05/04"
	},
	// Sources for custom scripts
	"DMguild" : {
		name : "Dungeon Masters Guild [online]",
		abbreviation : "DMguild",
		group : "default",
		url : "https://www.dmsguild.com/"
	},
	"HB" : {
		name : "Homebrew",
		abbreviation : "Homebrew",
		group : "default"
	},
	// Sources for all official WotC backgrounds, so that they are easier to use with the AL +1 rule
	"ALbackground" : {
		name : "All official WotC backgrounds",
		abbreviation : "WotC",
		group : "Primary Sources",
		url : "https://flapkan.com/faq#What-is-the-source-All-official-WotC-backgrounds-and-how-does-it-work"
	}
};

module.exports = {
    SourceList: Base_SourceList
}