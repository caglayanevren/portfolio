const { DateTime } = require("luxon");

module.exports = {
    dateToFormat: function (date, format) {
        return DateTime.fromJSDate(date, { zone: "UTC+3" }).toFormat(String(format));
    },

    dateToISO: function (date) {
        return DateTime.fromJSDate(date, { zone: "UTC+3" }).toFormat("fff");
    },
};
