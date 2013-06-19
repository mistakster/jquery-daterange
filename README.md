# jQuery UI Daterange

[Описание плагина по-русски](http://noteskeeper.ru/38/)

[jQuery Plugins Repository page](http://plugins.jquery.com/daterange/)

[Demo page](http://mistakster.github.io/jquery-daterange/)

## Overview

Select range of dates is a common task for report pages or so. Unfortunately,
jQuery UI Datepicker doesn’t have native ability to select dates in this way.

But Datapicker has undocumented flag that force it not to close than user select something.
In current version it called `inline` and can be altered in `onSelect` callback.

## Options

Plugin accept all Datepicker’s options except [onSelect](http://api.jqueryui.com/datepicker/#option-onSelect)
which will be overwritten by plugin.

    $("#date").daterange({
    	dateFormat: "yy/mm/dd",
    	onClose: function (dateRangeText) {
			$("#date").after("<p>" + dateRangeText + "</p>");
    	}
    });

Also plugin introduce one more option: **rangeSeparator**.
This option cares about the string between first and last date.

    $("#date").daterange({
    	rangeSeparator: " ### ",
    	onClose: function (dateRangeText) {
			$("#date").after("<p>" + dateRangeText + "</p>");
    	}
    });

## License

This plugin is licensed under the [MIT license](http://opensource.org/licenses/MIT).
