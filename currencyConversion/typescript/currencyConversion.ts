//currency conversion class for handling all currency conversion operations
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
    //sets the currencies
    setCurrencies(currencyFrom: string, currencyTo: string): boolean {
        if (this.checkCurrencies(currencyFrom, currencyTo)){
            this.currencyFrom = currencyFrom;
            this.currencyTo = currencyTo;
            return true
        }else{
            return false
        }

    }
    //does a check to see if the currencies entered are valid
    checkCurrencies(currencyFrom: string, currencyTo: string): boolean{
        var currencyFromValid: boolean;
        var currencyToValid: boolean;
        var currencies: string[] = ["AUD","BGN","BRL", "CAD",
                                    "CHF","CNY","CZK","DKK",
                                    "EUR","GBP","HKD","HRK",
                                    "HUF","IDR","ILS","INR",
                                    "JPY","KRW","MXN","MYR",
                                    "NOK","NZD","PHP","PLN",
                                    "RON","RUB","SEK","SGD",
                                    "THB","TRY","USD","ZAR"]; 
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
    //sets the amount of currency to be converted
    setAmount(amount: string): void {
        this.currencyAmount = amount;

    }

    //Performs asynchronous api call to fixxer, with a dynamic call based on the currencies entered by the user
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
    //performs the conversion calculation
    calculate(data: JSON): void {
        if(this.currencyFrom == "EUR"){
            this.currencyFromValue = 1;
            this.currencyToValue =  Number(data["rates"][this.currencyTo]);
            this.currencyRatio = this.currencyToValue / this.currencyFromValue;
            this.finalResult = String(
                (Number(this.currencyAmount) * this.currencyRatio).toFixed(2));
            return
        }

        if(this.currencyTo == "EUR"){
            this.currencyFromValue = Number(data["rates"][this.currencyFrom]);
            this.currencyToValue = 1
            this.currencyRatio = this.currencyToValue / this.currencyFromValue;
            this.finalResult = String(
                (Number(this.currencyAmount) * this.currencyRatio).toFixed(2));
            return
        }

        if (!this.giveError) {
            this.currencyFromValue = Number(data["rates"][this.currencyFrom]);
            this.currencyToValue = Number(data["rates"][this.currencyTo]);
            this.currencyRatio = this.currencyToValue / this.currencyFromValue;
            this.finalResult = String(
                (Number(this.currencyAmount) * this.currencyRatio).toFixed(2));
        }

    }

    //updates the dom with the result
    returnResult(): void {
        var message: string;
        message = "{0} {1} in {2} is {3}"
            .replace("{0}", this.currencyAmount)
            .replace("{1}", this.currencyFrom)
            .replace("{2}", this.currencyTo)
            .replace("{3}", this.finalResult);

        $("#resultBtn").text(message);

    }

    //if something is wrong, will update the dom with the error
    failMessage(): void{
       var message: string;
       message = "One or more of the currency Codes is Incorrect"
       $("#resultBtn").text(message); 
    }


}
//eventlistener function which chains all of the calls and calculations together
function convertCurrency(): void {
    //Get the dom elements
    var currencyFrom: string = $("#currencyFrom").val().toUpperCase();
    var currencyTo: string = $("#currencyTo").val().toUpperCase();
    var currencyAmount: string = $("#currencyAmount").val();
    //create currency converter object
    var currencyConverter = new CurrencyConverter();
    //performs api calls, if false. then error occured
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
//sweet alert messages
function showCurrencies(): void {
    swal({ 
        title: "Available currency codes:", 
        text: "AUD: Australian Dollar\nBGN: Bulgarian Vel\nBRL: Brazilian Real\nCAD: Canadian Dollar\nCHF: Swiss Franc\nCNY: Chinese Yuan\nCZK: Czech Koruna\nDKK: Danish Krone\nGBP: British Pound\nHKD: Hong Kong Dollar\nHRK: Croatian Kuna\nHUF: Hungarian Forint\nIDR: Indonesian Rupiah\nILS: Israeli New Sheqel\nINR: Indian Rupee\nJPY: Japanese Yen\nKRW: South Korean Won\nMXN: Mexican Peso\nMYR: Malaysian Ringgit\nNOK: Norwegian Krone\nNZD: New Zealand Dollar\nPHP: Philippine Peso\nPLN: Polish Zloty\nRON: Romanian Leu\nRUB: Russian Ruble\nSEK: Swedish Krone\nSGD: Singapore Dollar\nTHB: Thai Baht\nTRY: Turkish Lira\nUSD: United States Dollar\nZAR: South African Rand",
        type: "info", 
        confirmButtonText: "Return" });
}

function showAuthor(): void{
    swal({
        title: "About the Author",
        text: "Author: Stanislav Pankrashin\nA student at the University of Auckland who is studying computer science\n",
        type: "info",
        confirmButtonText: "Return"

    });


}

function showInfo(): void{
    swal({
        title: "About the Website",
        text: "Powered by Fixxer.io\nThis website was made for the purposes of the microsoft student accelorator\nit is not intended to be monetised or used for monetary gain\n",
        type: "info",
        confirmButtonText: "Return"

    })

    
}