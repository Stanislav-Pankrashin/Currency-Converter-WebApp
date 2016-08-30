class CurrencyConverter {
    currencyFrom: string;
    currencyTo: string;
    currencyAmount: string;

    giveError: boolean = false;
    jsonData : JSON;
    currencyFromValue: number;
    currencyToValue: number;
    currencyRatio: number;

    finalResult: number;

    CurrencyConverter(){

    }

    setCurrencies(currencyFrom : string, currencyTo : string): void {
        this.currencyFrom = currencyFrom;
        this.currencyTo = currencyTo;

    }

    setAmount(amount: string): void {
        this.currencyAmount = amount;

    }

    getRates(): any {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://api.fixer.io/latest?symbols=USD%2CNZD",
            "method": "GET"
            )
            .done(function (data: JSON): JSON {
                return data;
            })
            .fail(function (): void {
                this.giveError = true;
            })
    }

    calculate(data : JSON): void {
        if (!this.giveError) {
            this.currencyFromValue = Number(data[0].this.currencyFrom);
            this.currencyToValue = Number(data[1].this.currencyTo);
            this.currencyRatio = this.currencyToValue / this.currencyFromValue;
            this.finalResult = Number(this.currencyAmount) * this.currencyRatio;
        }

    }
    returnResult(): void {
        $("#resultBtn").text = this.finalResult;

    }


}

function convertCurrency() : void{
    var currencyFrom : string = $("#currencyFrom").val();
    var currencyTo : string = $("#currencyTo").val();
    var currencyAmount : string = $("#currencyAmount").val();

    var currencyConverter = new CurrencyConverter();
    currencyConverter.setCurrencies(currencyFrom, currencyTo);
    currencyConverter.setAmount(currencyAmount);

    var returnedData : JSON = currencyConverter.getRates();
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