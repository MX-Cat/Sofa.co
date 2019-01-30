'use strict';

var sofaURLs = ["url('https://www.8marta.ru/files/nodus_items/0000/0265/_cache/images/watermark94610169/pal-1443628899.jpg')",
				"url('https://www.8marta.ru/files/nodus_items/0000/0291/_cache/images/watermark94610169/pal-1443630133.jpg'"]

// Modal window
var isInitialized = false;
var DefaultAccentColor = "#FA7268";
var DefaultBgColor = "#5F4B8B";
var CurrentSettings = {
	"BgOption": "",
	"ModeOption": "",
	"AnalOption": "",
	"CountOption": "",
	"UnitsOption": "",
	"LangOption": ""
};

// Open on click
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

// Close on cross
$('#btnCloseSettings').click(function () {

	$('#formSettingsWrapper').fadeOut();
});

// Close on click out of the modal window
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

// Save settings on btnSaveSettings click
$('#btnSaveSettings').click(function () {
	save_options();
	$('#formSettingsWrapper').fadeOut();
});

function SetEventHandlers(Options) {
	for (var option of Options) {
		SetCurrentOptionState(option);
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

function SetCurrentOptionState(Option) {
	var parsedOption = TrimByCamelcase(Option.id);
	var settingsItem = parsedOption[1] + parsedOption[2]
	if (CurrentSettings[settingsItem] == parsedOption[0])
	{
		if (settingsItem == "BgOption" && parsedOption[0] == "sofa") {
			console.log("Choose sofa");
			document.body.style.backgroundImage = sofaURLs[0];
		}
		Option.classList.add("active");
	}
}

// Get the array of words from a camelcased statement
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

function save_options() {
	chrome.storage.local.set({
		settingsList: CurrentSettings
	}, function () {
		// Update status to let user know options were saved.
		//var status = document.getElementById('status');
		//status.textContent = 'Options saved.';
		//setTimeout(function () {
		//status.textContent = '';
		//}, 750);
		console.log("Someshit done")
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	chrome.storage.local.get({
		"settingsList": {
			"BgOption": "default",
			"ModeOption": "timer",
			"AnalOption": "year",
			"CountOption": "down",
			"UnitsOption": "sofas",
			"LangOption": "english"
		}
	}, function (items) {
		CurrentSettings = items.settingsList;
		console.log(items.settingsList)
	});


}


document.addEventListener('DOMContentLoaded', restore_options);

