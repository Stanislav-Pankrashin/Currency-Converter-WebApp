class CurrencyConverter {
    currencyFrom: string;
    currencyTo: string;
    currencyAmount: string;

    giveError: boolean = false;
    currencyFromValue: number;
    currencyToValue: number;
    currencyRatio: number;

    finalResult: string;

    CurrencyConverter() {

    }

    setCurrencies(currencyFrom: string, currencyTo: string): boolean {
        if (this.checkCurrencies(currencyFrom, currencyTo)){
            this.currencyFrom = currencyFrom;
            this.currencyTo = currencyTo;
            return true
        }else{
            return false
        }

    }

    checkCurrencies(currencyFrom: string, currencyTo: string): boolean{
        var currencyFromValid: boolean;
        var currencyToValid: boolean;
        var currencies: string[] = ["AUD","BGN","BRL", "CAD",
                                    "CHF","CNY","CZK","DKK",
                                    "GBP","HKD","HRK","HUF",
                                    "IDR","ILS","INR","JPY",
                                    "KRW","MXN","MYR","NOK",
                                    "NZD","PHP","PLN","RON",
                                    "RUB","SEK","SGD","THB",
                                    "TRY","USD","ZAR"]; 
        if (currencies.indexOf(currencyFrom) !=-1){
            currencyFromValid = true;
        }else{
            currencyFromValid = false;
        }
        if (currencies.indexOf(currencyTo) !=-1){
            currencyToValid = true;
        }else{
            currencyToValid = false;
        }

        return currencyFromValid && currencyToValid
    }

    setAmount(amount: string): void {
        this.currencyAmount = amount;

    }

    getRates(callback): void {
        var settings = {
            async: true,
            crossDomain: true,
            url: "http://api.fixer.io/latest?symbols={1}%2C{2}".replace("{1}", this.currencyFrom).replace("{2}", this.currencyTo),
            method: "GET",
        }

        $.ajax(settings).done(function (response) {
            callback(response);
        }).fail(function(response){
            this.failMessage();
        });

    }

    calculate(data: JSON): void {
        if (!this.giveError) {
            this.currencyFromValue = Number(data["rates"][this.currencyFrom]);
            this.currencyToValue = Number(data["rates"][this.currencyTo]);
            this.currencyRatio = this.currencyToValue / this.currencyFromValue;
            this.finalResult = String(
                (Number(this.currencyAmount) * this.currencyRatio).toFixed(2));
        }

    }
    returnResult(): void {
        var message: string;
        message = "{0} {1} in {2} is {3}"
            .replace("{0}", this.currencyAmount)
            .replace("{1}", this.currencyFrom)
            .replace("{2}", this.currencyTo)
            .replace("{3}", this.finalResult);

        $("#resultBtn").text(message);

    }
    failMessage(): void{
       var message: string;
       message = "One or more of the currency Codes is Incorrect"
       $("#resultBtn").text(message); 
    }


}

function convertCurrency(): void {
    var currencyFrom: string = $("#currencyFrom").val().toUpperCase();
    var currencyTo: string = $("#currencyTo").val().toUpperCase();
    var currencyAmount: string = $("#currencyAmount").val();
    var currencyConverter = new CurrencyConverter();
    var incorrectCurrencies: boolean = currencyConverter.setCurrencies(currencyFrom, currencyTo);
    if (!incorrectCurrencies){
        currencyConverter.failMessage();
        return
    }
    
    
    currencyConverter.setAmount(currencyAmount);
    currencyConverter.getRates(function (data) {
        currencyConverter.calculate(data);
        currencyConverter.returnResult();
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showCurrencies(): void {
    swal({ 
        title: "Available currency codes:", 
        text: "AUD: Australian Dollar\nBGN: Bulgarian Vel\nBRL: Brazilian Real\nCAD: Canadian Dollar\nCHF: Swiss Franc\nCNY: Chinese Yuan\nCZK: Czech Koruna\nDKK: Danish Krone\nGBP: British Pound\nHKD: Hong Kong Dollar\nHRK: Croatian Kuna\nHUF: Hungarian Forint\nIDR: Indonesian Rupiah\nILS: Israeli New Sheqel\nINR: Indian Rupee\nJPY: Japanese Yen\nKRW: South Korean Won\nMXN: Mexican Peso\nMYR: Malaysian Ringgit\nNOK: Norwegian Krone\nNZD: New Zealand Dollar\nPHP: Philippine Peso\nPLN: Polish Zloty\nRON: Romanian Leu\nRUB: Russian Ruble\nSEK: Swedish Krone\nSGD: Singapore Dollar\nTHB: Thai Baht\nTRY: Turkish Lira\nUSD: United States Dollar\nZAR: South African Rand",
        type: "info", 
        confirmButtonText: "Return" });
}