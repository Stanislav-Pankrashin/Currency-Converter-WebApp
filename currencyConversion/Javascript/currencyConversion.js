var currencyFrom;
var currencyTo;
var currencyAmount;
var giveError = false;
var currencyFromValue;
var currencyToValue;
var currencyRatio;
var finalResult;
function convertCurrency() {
    currencyFrom = $("#currencyFrom").val();
    currencyTo = $("#currencyTo").val();
    currencyAmount = $("#currencyAmount").val();
    getRates();
}
function getRates() {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "http://api.fixer.io/latest?symbols=USD%2CNZD",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "22d4c045-ec74-c40d-e221-c06372e3817c"
        } })
        .done(function (data) {
        calculate(data);
    })
        .fail(function () {
        giveError = true;
    });
}
function calculate(data) {
    if (!giveError) {
        var theData = data;
        currencyFromValue = Number(data.rates.currencyFrom);
        currencyToValue = Number(data.rates.currencyTo);
        currencyRatio = currencyToValue / currencyFromValue;
        finalResult = Number(currencyAmount) * currencyRatio;
    }
}
function returnResult() {
    $("#resultBtn").text = finalResult;
}
