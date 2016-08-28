var currencyFrom: string;
var currencyTo: string;
var currencyAmount: string;

var giveError: boolean = false;
var currencyFromValue: number;
var currencyToValue: number;
var currencyRatio: number;

var finalResult: number;


function convertCurrency(): void {
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
        currencyFromValue = Number(data.rates.currencyFrom);
        currencyToValue = Number(data.rates.currencyTo);
        currencyRatio = currencyToValue / currencyFromValue;
        finalResult = Number(currencyAmount) * currencyRatio;
    }

}

function returnResult(): void {
    $("#resultBtn").text = finalResult;

}