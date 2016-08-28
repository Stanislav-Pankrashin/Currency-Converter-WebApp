var currencyFrom: string;
var currencyTo: string;
var currencyAmount: string;

var fixerJsonReturn: JSON;
var giveError: boolean = false;
var currencyFromValue: number;
var currencyToValue: number;
var currencyRatio: number;

var finalResult: number;


function convertCurrency(): void {
    currencyFrom = (<HTMLInputElement>document.getElementById(currencyFrom)).value;
    currencyTo = (<HTMLInputElement>document.getElementById(currencyTo)).value;
    currencyAmount = (<HTMLInputElement>document.getElementById(currencyAmount)).value;
    getRates();
}

function getRates(): void {
    $.ajax({
        url: "http://api.fixer.io/latest?symbols={0},{1}".replace("{0}", currencyFrom).replace("{1}", currencyTo),
        type: "GET",
        processData: false,

    })
        .done(function (data: JSON): void {
            fixerJsonReturn = data;
        })
        .fail(function (): void {
            giveError = true;
        })
    calculate();
}


function calculate(): void {
    if (!giveError) {
        currencyFromValue = Number(fixerJsonReturn[2].currencyFrom);
        currencyToValue = Number(fixerJsonReturn[2].currencyTo);
        currencyRatio = currencyToValue / currencyFromValue;
        finalResult = Number(currencyAmount) * currencyRatio;
    }

}

function returnResult(): void {
    var displayElement = (<HTMLInputElement>document.getElementById(resultBtn));
    displayElement.innerHTML = String(finalResult);

}