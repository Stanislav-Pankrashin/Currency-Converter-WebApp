class TimeZoneConverter {
    cityFrom: string;
    cityTo: string;
    originTime: string;

    cityFromLat: string;
    cityFromLong: string;
    cityToLat: string;
    cityToLong: string;

    cityFromTimezone: string;
    cityToTimezone: string;

    convertedTime: number;


    TimeZoneConverter(): void { }

    setCities(cityFrom: string, cityTo: string) {
        this.cityFrom = cityFrom;
        this.cityTo = cityTo;
    }

    setOriginTime(originTime: string): void {
        this.originTime = originTime;
    }

    retrieveInformation(): void {
        //main method where api calls will be chained
        this.getCoordinatesCityFrom();

    }

    //The next two methods can be executed concurrently, but shouldnt be due to limitations with calculation and multithreading. will need to chain all ajax calls
    getCoordinatesCityFrom(): void {
        var settings = {
            "async": true,
            "crossDomain": true,
            "datatype": "jsonp",
            "url": "https://maps.googleapis.com/maps/api/place/textsearch/json?query={0}&key=AIzaSyB80t43vPlBiZptDZkAYPOTXAO9YLJsmng".replace("{0}", this.cityFrom),
            "method": "GET",
            "headers": {
                "access-control-allow-origin": "*",
                "cache-control": "no-cache",
                "postman-token": "c4631188-a0f2-59e4-6cda-bc789b657fca"
            }
        }

        $.ajax(settings).done(function (response): void {
            //will set lat and long variables, and then call next ajax call in the chain
            this.cityFromLat = String(response[1].geometry.location.lat);
            this.cityFromLong = String(response[1].geometry.location.lng);
            this.getcoordinatesCityTo();
        });
    }

    getcoordinatesCityTo(): void {
        var settings = {
            "async": true,
            "crossDomain": true,
            "datatype": "jsonp",
            "url": "https://maps.googleapis.com/maps/api/place/textsearch/json?query={0}&key=AIzaSyB80t43vPlBiZptDZkAYPOTXAO9YLJsmng".replace("{0}", this.cityTo),
            "method": "GET",
            "headers": {
                "access-control-allow-origin": "*",
                "cache-control": "no-cache",
                "postman-token": "c4631188-a0f2-59e4-6cda-bc789b657fca"
            }
        }

        $.ajax(settings).done(function (response): void {
            //will set lat and long variables, and then call next ajax call in the chain
            this.cityToLat = String(response[1].geometry.location.lat);
            this.cityToLong = String(response[1].geometry.location.lng);
            this.getTimeZoneCityFrom();
        });
    }
    //these methods cannot be executed concurrently due to calculation coming immediately after, will need to chain two requests
    getTimeZoneCityFrom(): void {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.timezonedb.com/v2/get-time-zone?key=4SOHL9ALBRXC&format=json&by=position&lat={0}&lng={1}".replace("{0}", this.cityFromLat).replace("{1}", this.cityFromLong),
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "10e676fd-2038-9a90-8fde-596b448b8b63"
            }
        }

        $.ajax(settings).done(function (response): void {
            this.cityFromTimezone = String(response.zoneName);
            this.getTimeZoneCityTo();
        });

    }

    getTimeZoneCityTo(): void {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.timezonedb.com/v2/get-time-zone?key=4SOHL9ALBRXC&format=json&by=position&lat={0}&lng={1}".replace("{0}", this.cityToLat).replace("{1}", this.cityToLong),
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "10e676fd-2038-9a90-8fde-596b448b8b63"
            }
        }

        $.ajax(settings).done(function (response) {
            this.cityToTimezone = String(response.zoneName);
            this.convertTime();
        });
    }

    convertTime(): void {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.timezonedb.com/v2/convert-time-zone?key=4SOHL9ALBRXC&format=json&from={0}&to={1}".replace("{0}", this.cityFromTimezone).replace("{1}", this.cityToTimezone),
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "5311186b-b1aa-099a-5ac8-d4778e9ff6ba"
            }
        }

        $.ajax(settings).done(function (response): void {
            $("#resultBtn").text(response);
        });
    }
}

function convertTime(): void{
    var cityFrom = $("#cityfrom").val();
    var cityTo = $("#cityto").val()

    var timeZoneConverter = new TimeZoneConverter();
    timeZoneConverter.setCities(cityFrom, cityTo);
    timeZoneConverter.retrieveInformation();
    



}