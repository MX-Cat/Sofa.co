'use strict';

// Модальное окно

// открыть по кнопке
$('#btnSettings').click(function() { 
	
	$('#formSettingsWrapper').fadeIn();
	$('#formSettingsWrapper').addClass('disabled');
});

// закрыть на крестик
$('#btnCloseSettings').click(function() { 

	$('#formSettingsWrapper').fadeOut();
});

// закрыть по клику вне окна
$(document).mouseup(function (e) { 
    if (e.target == $('#formSettingsWrapper')||
        e.target == $('#btnSaveSettings')) {

		$('#formSettingsWrapper').fadeOut();
	}
});
