'use strict';

// Модальное окно
var isInitialized = false;
var CurrentSettings = {
	"BgOption": "",
	"ModeOption": "",
	"AnalOption": "",
	"CountOption": "",
	"UnitsOption": "",
	"LangOption": ""
};

// открыть по кнопке
$('#btnSettings').click(function () {

	$('#formSettingsWrapper').fadeIn();
	$('#formSettingsWrapper').addClass('disabled');
	if (!isInitialized) {
		isInitialized = true;
		var optionsDropDown = document.getElementsByClassName("optionsDropDown");
		for (var optionList of optionsDropDown) {
			SetEventHandlers(optionList.children);
		}
	}
});

// закрыть на крестик
$('#btnCloseSettings').click(function () {

	$('#formSettingsWrapper').fadeOut();
});

// закрыть по клику вне окна
$(document).mouseup(function (e) {
	if (e.target.id == 'formSettingsWrapper') {

		$('#formSettingsWrapper').fadeOut();
	}
});

$('#btnSaveSettings').click(function () {
	console.log("Ну тут тип сохранение настроек");
	console.log(CurrentSettings);
});

function SetEventHandlers(Options) {
	for (var option of Options) {
		option.addEventListener('click', function (e) {
			var data = TrimByCamelcase(e.target.id);
			console.log(data);
			CurrentSettings[data[1] + data[2]] = data[0];
		});
	}
};

function TrimByCamelcase(str) {
	var result = [];
	var temp = "";
	for (var chNum in str) {
		if (str[chNum] == str[chNum].toUpperCase() && chNum != 0) {
			result.push(temp);
			temp = "";
		}
		temp += str[chNum];
	}
	result.push(temp);
	return result;
}

// function save_options() {
//     var color = document.getElementById('color').value;
//     var likesColor = document.getElementById('like').checked;
//     chrome.storage.sync.set({
//       favoriteColor: color,
//       likesColor: likesColor
//     }, function() {
//       // Update status to let user know options were saved.
//       var status = document.getElementById('status');
//       status.textContent = 'Options saved.';
//       console.log("Someshit done")
//       setTimeout(function() {
//         status.textContent = '';
//       }, 750);
//     });
//   }