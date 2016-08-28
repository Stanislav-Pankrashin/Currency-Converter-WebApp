var currencyFrom;
var currencyTo;
var currencyAmount;
var fixerJsonReturn;
var giveError = false;
var currencyFromValue;
var currencyToValue;
var currencyRatio;
var finalResult;
function convertCurrency() {
    currencyFrom = document.getElementById(currencyFrom).value;
    currencyTo = document.getElementById(currencyTo).value;
    currencyAmount = document.getElementById(currencyAmount).value;
    getRates();
}
function getRates() {
    $.ajax({
        url: "http://api.fixer.io/latest?symbols={0},{1}".replace("{0}", currencyFrom).replace("{1}", currencyTo),
        type: "GET",
        processData: false
    })
        .done(function (data) {
        fixerJsonReturn = data;
    })
        .fail(function () {
        giveError = true;
    });
    calculate();
}
function calculate() {
    if (!giveError) {
        currencyFromValue = Number(fixerJsonReturn[2].currencyFrom);
        currencyToValue = Number(fixerJsonReturn[2].currencyTo);
        currencyRatio = currencyToValue / currencyFromValue;
        finalResult = Number(currencyAmount) * currencyRatio;
    }
}
function returnResult() {
    var displayElement = document.getElementById(resultBtn);
    displayElement.innerHTML = String(finalResult);
}
