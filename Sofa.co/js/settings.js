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

// Add slideDown animation to Bootstrap dropdown when expanding.
$('.input-group-prepend').on('show.bs.dropdown', function () {
	$(this).find('.dropdown-menu').first().stop(true, true).slideDown(200);
});

// Add slideUp animation to Bootstrap dropdown when collapsing.
$('.input-group-prepend').on('hide.bs.dropdown', function () {
	$(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
});

// Prevent dropdown from closing on click
$('.dropdown-menu').click(function (e) {
	e.stopPropagation();
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

			var item = document.getElementById(e.target.id);
			var parentItem = document.getElementById(data[1] + data[2] + "DropDown");
			for (var child of parentItem.children) {
				child.classList.remove("active");
			}
			item.classList.add("active");

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