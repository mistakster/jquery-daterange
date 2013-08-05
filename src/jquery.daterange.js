/**
 * jQuery UI Datepicker add-on which can help select date range
 * First click selects start date of range. Second click selects
 * end date of range and closes calendar.
 *
 * Plugin accept all Datepicker options except "onSelect" callback.
 * It will be overwritten by plugin. Also, plugin introduce one more
 * option -- rangeSeparator.
 *
 * http://noteskeeper.ru/38/
 *
 * Copyright 2009-2013 Vladimir Kuznetsov <mistakster@gmail.com>
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
(function ($) {

  $.fn.daterange = function (opts) {

    // defaults
    opts = $.extend({
      "changeMonth": false,
      "changeYear": false,
      "numberOfMonths": 2,
      "rangeSeparator": " - "
    }, opts || {});

    var onSelect = opts.onSelect || $.noop;
    var onClose = opts.onClose || $.noop;

    // datepicker's select date event handler
    opts.onSelect = function (dateText, inst) {
      var textStart;
      if (!inst.rangeStart) {
        inst.inline = true;
        inst.rangeStart = dateText;
      } else {
        inst.inline = false;
        textStart = inst.rangeStart;
        if (textStart !== dateText) {
          $(this).val(textStart + opts.rangeSeparator + dateText);
          inst.rangeStart = null;
        }
      }
      // call original callback for select event
      onSelect.apply(this, arguments);
    };

    opts.onClose = function (dateText, inst) {
      // reset inline state
      inst.inline = false;
      // call original callback for close event
      onClose.apply(this, arguments);
    };

    return this.each(function () {
      var input = $(this);
      if (input.is("input")) {
        input.datepicker(opts);
      }
    });
  };

}(jQuery));