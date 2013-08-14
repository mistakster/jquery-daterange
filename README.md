# jQuery UI Daterange

[Описание плагина по-русски](http://noteskeeper.ru/38/)

[jQuery Plugins Repository page](http://plugins.jquery.com/daterange/)

[Demo page](http://mistakster.github.io/jquery-daterange/)

## Overview

Select range of dates is a common task for report pages or so. Unfortunately,
jQuery UI Datepicker doesn’t have native ability to select dates in this way.

But Datapicker has undocumented flag that force it not to close than user select something.
In current version (1.10.x) it called `inline` and can be altered in `onSelect` callback.

Previously selected days will be highlighted next time by CSS class `ui-datepicker-range`
on table cells.

## Options

Plugin accept all Datepicker’s options.

	$("#date").daterange({
		dateFormat: "yy/mm/dd",
		onClose: function (dateRangeText) {
			$("#date").after("<p>" + dateRangeText + "</p>");
		}
	});

Also plugin introduce more options:

* **rangeSeparator** - this option cares about the string between first and last date;
* **rangeCssClass** - class that will be added to every cell of calendar, if date in range.

	$("#date").daterange({
		rangeCssClass: "my-range",
		rangeSeparator: " ### ",
		onClose: function (dateRangeText) {
			$("#date").after("<p>" + dateRangeText + "</p>");
		}
	});

## License

This plugin is licensed under the [MIT license](http://opensource.org/licenses/MIT).
