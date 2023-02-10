const enumCurrencies = {
  EUR:  "EUR",
  USD:  "USD"
}

function loadCurrencyUtils() {
  return CurrencyUtils;
}

class CurrencyUtils {

  static getCurrencies() {
    return enumCurrencies;
  }
  
}