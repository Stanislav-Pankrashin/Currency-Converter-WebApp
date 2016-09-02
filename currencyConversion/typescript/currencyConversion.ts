class CurrencyConverter {
    currencyFrom: string;
    currencyTo: string;
    currencyAmount: string;

    giveError: boolean = false;
    jsonData: JSON;
    currencyFromValue: number;
    currencyToValue: number;
    currencyRatio: number;

    finalResult: number;

    CurrencyConverter() {

    }

    setCurrencies(currencyFrom: string, currencyTo: string): void {
        this.currencyFrom = currencyFrom;
        this.currencyTo = currencyTo;

    }

    setAmount(amount: string): void {
        this.currencyAmount = amount;

    }

    getRates(callback): any {
        var settings = {
            async: false,
            crossDomain: true,
            url: "http://api.fixer.io/latest?symbols=USD%2CNZD",
            method: "GET",
        }

        $.ajax(settings).done(function (response) {
            callback(response);
        });

    }

    getCallBack(): any {
        var result: any;
        this.getRates(function (data) {
            result = data;
        });
        return result;
    }


    calculate(data: JSON): void {
        if (!this.giveError) {
            this.currencyFromValue = Number(data["rates"][this.currencyFrom]);
            this.currencyToValue = Number(data["rates"][this.currencyTo]);
            this.currencyRatio = this.currencyToValue / this.currencyFromValue;
            this.finalResult = Number(this.currencyAmount) * this.currencyRatio;
        }

    }
    returnResult(): void {
        $("#resultBtn").text(this.finalResult);

    }


}

function convertCurrency(): void {
    var currencyFrom: string = $("#currencyFrom").val();
    var currencyTo: string = $("#currencyTo").val();
    var currencyAmount: string = $("#currencyAmount").val();

    var currencyConverter = new CurrencyConverter();
    currencyConverter.setCurrencies(currencyFrom, currencyTo);
    currencyConverter.setAmount(currencyAmount);
    let returnedData: any = currencyConverter.getCallBack();

    currencyConverter.calculate(returnedData);
    currencyConverter.returnResult();
}