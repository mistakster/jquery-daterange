/**
 * jQuery UI Datepicker add-on which can help select date range
 * First click selects start date of range. Second click selects
 * end date of range and closes calendar.
 *
 * Plugin accept all Datepicker options. Also, plugin introduce more options:
 *   - rangeCssClass -- class that will be added to every cell of calendar, if date in range
 *   - rangeSeparator -- string that split start and end dates of range
 *
 * http://noteskeeper.ru/38/
 *
 * Copyright 2009-2013 Vladimir Kuznetsov <mistakster@gmail.com>
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
(function ($) {

	function getDateFormat($ele) {
		return $ele.datepicker("option", "dateFormat");
	}

	var parseDate = $.proxy($.datepicker, "parseDate");

	function compareDates(start, end, format) {
		var temp, dateStart, dateEnd;

		try {
			dateStart = parseDate(format, start);
			dateEnd = parseDate(format, end);
			if (dateEnd < dateStart) {
				temp = start;
				start = end;
				end = temp;
			}
		} catch (ex) {}

		return { start: start, end: end };
	}

	function storeLastDateRange(widget, dateText, dateFormat) {
		var start, end, lastDateRange;
		dateText = dateText.split(widget.options.rangeSeparator);
		if (dateText.length > 0) {
			start = parseDate(dateFormat, dateText[0]);
			if (dateText.length > 1) {
				end = parseDate(dateFormat, dateText[1]);
			}
			lastDateRange = {start: start, end: end};
		} else {
			lastDateRange = null;
		}
		widget._lastDateRange = lastDateRange;
	}


	function wrapCallback(widget, method) {
		return function () {
			var args = Array.prototype.slice.apply(arguments);
			args.unshift(widget);
			widget["_" + method].apply(this, args);
			if (widget.options[method]) {
				widget.options[method].apply(this, arguments);
			}
		}
	}


	$.widget("ui.daterange", {
		options: {
			"changeMonth": false,
			"changeYear": false,
			"numberOfMonths": 2,
			"rangeCssClass": "ui-datepicker-range",
			"rangeSeparator": " - "
		},

		_getCssClass: function (cls) {
			return this.widgetFullName + "-" + cls;
		},

		_create: function () {
			var that = this;
			this.element.addClass(this._getCssClass("ready"));

			var dpOptions = $.extend({}, this.options, {
				onClose: wrapCallback(that, "onClose"),
				onSelect: wrapCallback(that, "onSelect"),
				beforeShow: wrapCallback(that, "beforeShow"),
				beforeShowDay: function (date) {
					return that._beforeShowDay.call(this, that, date);
				}
			});

			this.element.datepicker(dpOptions);
		},

		destroy: function () {
			this.element
				.removeClass(this._getCssClass("ready"))
				.datepicker("destroy");
			this._destroy();
		},

		_onClose: function (widget, dateText, inst) {
			// reset state
			widget._rangeStart = null;
			inst.inline = false;
		},

		_onSelect: function (widget, dateText, inst) {
			var textStart, $ele = $(this);
			if (!widget._rangeStart) {
				inst.inline = true;
				widget._rangeStart = dateText;
			} else {
				inst.inline = false;
				textStart = widget._rangeStart;
				if (textStart !== dateText) {
					var dateFormat = getDateFormat($ele);
					var dateRange = compareDates(textStart, dateText, dateFormat);
					$ele.val(dateRange.start + widget.options.rangeSeparator + dateRange.end);
					widget._rangeStart = null;
				}
			}
		},

		_beforeShow: function (widget, input, inst) {
			// store date to highlight it latter
			var $ele = $(this), dateFormat = getDateFormat($ele);
			storeLastDateRange(widget, $ele.val(), dateFormat);
		},

		_beforeShowDay: function (widget, date, cb) {
			var out = [true, ""], extraOut;
			var start, end;

			if (widget._lastDateRange) {
				start = widget._lastDateRange.start;
				end = widget._lastDateRange.end;
				if (!end) {
					end = start;
				}
			}

			if (start && start <= date && date <= end) {
				out[1] = widget.options.rangeCssClass;
			}

			if (cb) {
				extraOut = cb.call(this, date);
				out[0] = out[0] && extraOut[0];
				out[1] = out[1] + " " + extraOut[1];
				out[2] = extraOut[2];
			}

			return out;
		}
	});

}(jQuery));