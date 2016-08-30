var CurrencyConverter = (function () {
    function CurrencyConverter() {
        this.giveError = false;
    }
    CurrencyConverter.prototype.CurrencyConverter = function () {
    };
    CurrencyConverter.prototype.setCurrencies = function (currencyFrom, currencyTo) {
        this.currencyFrom = currencyFrom;
        this.currencyTo = currencyTo;
    };
    CurrencyConverter.prototype.setAmount = function (amount) {
        this.currencyAmount = amount;
    };
    CurrencyConverter.prototype.getRates = function () {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://api.fixer.io/latest?symbols=USD%2CNZD",
            "method": "GET" })
            .done(function (data) {
            return data;
        })
            .fail(function () {
            this.giveError = true;
        });
    };
    CurrencyConverter.prototype.calculate = function (data) {
        if (!this.giveError) {
            this.currencyFromValue = Number(data[0].this.currencyFrom);
            this.currencyToValue = Number(data[1].this.currencyTo);
            this.currencyRatio = this.currencyToValue / this.currencyFromValue;
            this.finalResult = Number(this.currencyAmount) * this.currencyRatio;
        }
    };
    CurrencyConverter.prototype.returnResult = function () {
        $("#resultBtn").text = this.finalResult;
    };
    return CurrencyConverter;
}());
function convertCurrency() {
    var currencyFrom = $("#currencyFrom").val();
    var currencyTo = $("#currencyTo").val();
    var currencyAmount = $("#currencyAmount").val();
    var currencyConverter = new CurrencyConverter();
    currencyConverter.setCurrencies(currencyFrom, currencyTo);
    currencyConverter.setAmount(currencyAmount);
    var returnedData = currencyConverter.getRates();
    currencyConverter.calculate(returnedData);
    currencyConverter.returnResult();
}
/*function convertCurrency(): void {
    currencyFrom = $("#currencyFrom").val();
    currencyTo = $("#currencyTo").val();
    currencyAmount = $("#currencyAmount").val();
    getRates();
}

function getRates(): void {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "http://api.fixer.io/latest?symbols=USD%2CNZD",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "22d4c045-ec74-c40d-e221-c06372e3817c"
        })
        .done(function (data: JSON): void {
            calculate(data);
        })
        .fail(function (): void {
            giveError = true;
        })
}


function calculate(data: JSON): void {
    if (!giveError) {
        var theData: JSON = data;
        currencyFromValue = Number(theData.rates.currencyFrom);
        currencyToValue = Number(theData.rates.currencyTo);
        currencyRatio = currencyToValue / currencyFromValue;
        finalResult = Number(currencyAmount) * currencyRatio;
    }

}

function returnResult(): void {
    $("#resultBtn").text = finalResult;

}*/ 
