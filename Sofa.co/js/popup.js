'use strict';

function callback() {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {

    }
}

function ShowOptions() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage(callback());
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

window.onload = function () {
    document.querySelector('#go-to-options').addEventListener('click', ShowOptions);
}