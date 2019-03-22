let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let fct = {
    getJson: function (url) {
        let request = new XMLHttpRequest();

        request.open("GET", url, false);
        request.send(null);
        if(request.responseText !== null) {
            return request.responseText;
        }
        return null;
    },
};

module.exports = fct ;