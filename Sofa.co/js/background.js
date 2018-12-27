'use strict';

window.onload = function () {
	var now = new Date();
	
	document.getElementById('YearPercentage').innerHTML = Math.round(MsConverter.ToYearPercentage(GetYearMS(), isLeap(now.getFullYear()))) + "%";
	document.getElementById('DaysToNextYear').innerHTML = Math.ceil(MsConverter.ToDays(GetMsToNextYear(now.getFullYear())));
	document.getElementById('YearProgress').style.width = MsConverter.ToYearPercentage(GetYearMS(), isLeap(now.getFullYear())) + "%"

	window.setInterval(
		function () {
			document.getElementById('YearPercentage').innerHTML = Math.round(MsConverter.ToYearPercentage(GetYearMS(), isLeap(now.getFullYear()))) + "%";
			document.getElementById('DaysToNextYear').innerHTML = Math.ceil(MsConverter.ToDays(GetMsToNextYear()));
			document.getElementById('YearProgress').style.width = MsConverter.ToYearPercentage(GetYearMS(), isLeap(now.getFullYear())) + "%"
		}
		, GetMsToTomorrow());
}

function GetDayMS() {
	// get {currentTime obj.} and {today obj. (no h/s/ms)}
	var now = new Date();
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	return now - today;
}

function GetMsToTomorrow() {
	// get {currentTime obj.} and {tomorrow obj. (no h/s/ms)}
	var now = new Date();
	var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

	return tomorrow - now;
}

function GetYearMS() {
	// get {currentTime obj.} and {thisYear obj. (no h/s/ms)}
	var now = new Date();
	var thisYear = new Date(now.getFullYear(), 0, 0);

	return now - thisYear;
}

function GetMsToNextYear() {
	// get {currentTime obj.} and {nextYear obj. (no h/s/ms)}
	var now = new Date();
	var nextYear = new Date(now.getFullYear() + 1, 0, 0);

	return nextYear - now;
}

function isLeap(year) {
	return Boolean(new Date(year, 1, 29).getDate() === 29);
}

class MsConverter {

	static ToSeconds(ms) {
		return (ms / 1000);
	}

	static ToMinutes(ms) {
		return (this.ToSeconds(ms) / 60);
	}

	static ToHours(ms) {
		return (this.ToMinutes(ms) / 60);
	}

	static ToDays(ms) {
		return (this.ToHours(ms) / 24);
	}

	static ToYearPercentage(ms, isLeap) {
		if (isLeap) {
			return (this.ToDays(ms) / 3.65);
		} else {
			return (this.ToDays(ms) / 3.66);
		}
	}

	static ToDayPercentage(ms) {
		return ((1 - this.ToDays(ms)) * 100);
	}
}