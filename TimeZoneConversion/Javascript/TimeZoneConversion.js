var TimeZoneConverter = (function () {
    function TimeZoneConverter() {
    }
    TimeZoneConverter.prototype.TimeZoneConverter = function () { };
    TimeZoneConverter.prototype.setCities = function (cityFrom, cityTo) {
        this.cityFrom = cityFrom;
        this.cityTo = cityTo;
    };
    TimeZoneConverter.prototype.setOriginTime = function (originTime) {
        this.originTime = originTime;
    };
    TimeZoneConverter.prototype.retrieveInformation = function () {
        //main method where api calls will be chained
        this.getCoordinatesCityFrom();
    };
    //The next two methods can be executed concurrently, but shouldnt be due to limitations with calculation and multithreading. will need to chain all ajax calls
    TimeZoneConverter.prototype.getCoordinatesCityFrom = function () {
        var settings = {
            "async": true,
            "crossDomain": true,
            "datatype": "jsonp",
            "url": "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query={0}&key=AIzaSyB80t43vPlBiZptDZkAYPOTXAO9YLJsmng".replace("{0}", this.cityFrom),
            "method": "GET",
            "headers": {
                "access-control-allow-origin": "https://knickknacks.azurewebsites.net",
                "cache-control": "no-cache",
                "postman-token": "c4631188-a0f2-59e4-6cda-bc789b657fca"
            }
        };
        $.ajax(settings).done(function (response) {
            //will set lat and long variables, and then call next ajax call in the chain
            this.cityFromLat = String(response[1].geometry.location.lat);
            this.cityFromLong = String(response[1].geometry.location.lng);
            this.getcoordinatesCityTo();
        });
    };
    TimeZoneConverter.prototype.getcoordinatesCityTo = function () {
        var settings = {
            "async": true,
            "crossDomain": true,
            "datatype": "jsonp",
            "url": "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query={0}&key=AIzaSyB80t43vPlBiZptDZkAYPOTXAO9YLJsmng".replace("{0}", this.cityTo),
            "method": "GET",
            "headers": {
                "access-control-allow-origin": "https://knickknacks.azurewebsites.net",
                "cache-control": "no-cache",
                "postman-token": "c4631188-a0f2-59e4-6cda-bc789b657fca"
            }
        };
        $.ajax(settings).done(function (response) {
            //will set lat and long variables, and then call next ajax call in the chain
            this.cityToLat = String(response[1].geometry.location.lat);
            this.cityToLong = String(response[1].geometry.location.lng);
            this.getTimeZoneCityFrom();
        });
    };
    //these methods cannot be executed concurrently due to calculation coming immediately after, will need to chain two requests
    TimeZoneConverter.prototype.getTimeZoneCityFrom = function () {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.timezonedb.com/v2/get-time-zone?key=4SOHL9ALBRXC&format=json&by=position&lat={0}&lng={1}".replace("{0}", this.cityFromLat).replace("{1}", this.cityFromLong),
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "10e676fd-2038-9a90-8fde-596b448b8b63"
            }
        };
        $.ajax(settings).done(function (response) {
            this.cityFromTimezone = String(response.zoneName);
            this.getTimeZoneCityTo();
        });
    };
    TimeZoneConverter.prototype.getTimeZoneCityTo = function () {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.timezonedb.com/v2/get-time-zone?key=4SOHL9ALBRXC&format=json&by=position&lat={0}&lng={1}".replace("{0}", this.cityToLat).replace("{1}", this.cityToLong),
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "10e676fd-2038-9a90-8fde-596b448b8b63"
            }
        };
        $.ajax(settings).done(function (response) {
            this.cityToTimezone = String(response.zoneName);
            this.convertTime();
        });
    };
    TimeZoneConverter.prototype.convertTime = function () {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.timezonedb.com/v2/convert-time-zone?key=4SOHL9ALBRXC&format=json&from={0}&to={1}".replace("{0}", this.cityFromTimezone).replace("{1}", this.cityToTimezone),
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "5311186b-b1aa-099a-5ac8-d4778e9ff6ba"
            }
        };
        $.ajax(settings).done(function (response) {
            $("#resultBtn").text(response);
        });
    };
    return TimeZoneConverter;
}());
function convertTime() {
    var cityFrom = $("#cityfrom").val();
    var cityTo = $("#cityto").val();
    var timeZoneConverter = new TimeZoneConverter();
    timeZoneConverter.setCities(cityFrom, cityTo);
    timeZoneConverter.retrieveInformation();
}
