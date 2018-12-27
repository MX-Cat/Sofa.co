'use strict';

// Модальное окно
var isInitialized = false; 

// открыть по кнопке
$('#btnSettings').click(function () {

	$('#formSettingsWrapper').fadeIn();
	$('#formSettingsWrapper').addClass('disabled');
	if (!isInitialized) {
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
});

function SetEventHandlers(Options) {
	for (var option of Options) {
		option.addEventListener('click', function (e) {
			console.log(e.target.id);
		});
	}
};

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