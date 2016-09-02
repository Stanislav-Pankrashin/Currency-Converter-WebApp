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
    CurrencyConverter.prototype.getRates = function (callback) {
        var settings = {
            async: false,
            crossDomain: true,
            url: "http://api.fixer.io/latest?symbols=USD%2CNZD",
            method: "GET"
        };
        $.ajax(settings).done(function (response) {
            callback(response);
        });
    };
    CurrencyConverter.prototype.getCallBack = function () {
        var result;
        this.getRates(function (data) {
            result = data;
        });
        return result;
    };
    CurrencyConverter.prototype.calculate = function (data) {
        if (!this.giveError) {
            this.currencyFromValue = Number(data["rates"][this.currencyFrom]);
            this.currencyToValue = Number(data["rates"][this.currencyTo]);
            this.currencyRatio = this.currencyToValue / this.currencyFromValue;
            this.finalResult = Number(this.currencyAmount) * this.currencyRatio;
        }
    };
    CurrencyConverter.prototype.returnResult = function () {
        $("#resultBtn").text(this.finalResult);
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
    var returnedData = currencyConverter.getCallBack();
    currencyConverter.calculate(returnedData);
    currencyConverter.returnResult();
}
