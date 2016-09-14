class TimeZoneConverter {
    cityFrom: string;
    cityTo: string;
    originTime: string;

    cityFromLat: number;
    cityFromLong: number;
    cityToLat: number;
    cityToLong: number;

    convertedTime: number;


    TimeZoneConverter() { }

    setCities(cityFrom: string, cityTo: string){
        this.cityFrom = cityFrom;
        this.cityTo = cityTo;
    }

    setOriginTime(originTime: string){
        this.originTime = originTime;
    }

    retrieveInformation(){
        //main method where api calls will be chained
        this.getCoordinatesCityFrom();

    }

    //The next two methods can be executed concurrently, but shouldnt be due to limitations with calculation and multithreading. will need to chain all ajax calls
    getCoordinatesCityFrom() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://maps.googleapis.com/maps/api/place/textsearch/json?query={0}&key=AIzaSyB80t43vPlBiZptDZkAYPOTXAO9YLJsmng".replace("{0}", this.cityFrom),
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "c4631188-a0f2-59e4-6cda-bc789b657fca"
            }
        }

        $.ajax(settings).done(function (response) {
            //will set lat and long variables, and then call next ajax call in the chain
            this.cityFromLat = response[1].geometry.location.lat;
            this.cityFromLong = response[1].geometry.location.lng;
            this.getcoordinatesCityTo();
        });
    }

    getcoordinatesCityTo() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://maps.googleapis.com/maps/api/place/textsearch/json?query={0}&key=AIzaSyB80t43vPlBiZptDZkAYPOTXAO9YLJsmng".replace("{0}", this.cityTo),
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "c4631188-a0f2-59e4-6cda-bc789b657fca"
            }
        }

        $.ajax(settings).done(function (response) {
            //will set lat and long variables, and then call next ajax call in the chain
            this.cityToLat = response[1].geometry.location.lat;
            this.cityToLong = response[1].geometry.location.lng;

            this.getTimeZoneCityFrom();
        });
    }
    //these methods cannot be executed concurrently due to calculation coming immediately after, will need to chain two requests
    getTimeZoneCityFrom(){
        //todo, need to consult api sheet for method
    }

    getTimeZoneCityTo(){
        //todo, need to consult api sheet for method
    }

    convertTime(){
        //todo, will convert time based on information recieved from previous two ajax calls, can use another ajax call here to get offset
        //then can do quick calculation and update the dom
    }
}