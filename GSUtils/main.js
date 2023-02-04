const enumCurrencies = {
  EUR:  "EUR",
  USD:  "USD"
}

class ActionUtils {
  constructor(spreadsheet, sheetName) {
    this._ss = spreadsheet;
    this._sn = sheetName;
  }

  static createInstance(spreadsheet, dataSheet) {
    if (dataSheet != null) {
      return new ActionUtils(spreadsheet, dataSheet);
    }
    return new ActionUtils(spreadsheet);
  }

  static createCheckbox() {
    let checkboxObj = SpreadsheetApp.newDataValidation();
    checkboxObj.requireCheckbox();
    checkboxObj.setAllowInvalid(false);
    checkboxObj.build();
    return checkboxObj;
  }

  static getCurrencies() {
    return enumCurrencies;
  }

  static getCurrencyFormat(currency, value) {
    let format = "";
    
    switch(currency){
      case enumCurrencies.EUR:
        format = (0 == value) ? (" -   €") : ("0.00 €");
        break;
      case enumCurrencies.USD:
        format = (0 == value) ? ("$   -") : ("$0.00");
        break;
    }
    return format;
  }

  getDataSheet(sheetName) {
    if (sheetName != this._sn) {
      this._sn = sheetName;
    }
    return this._ss.getSheetByName(sheetName);
  }

  clearRange(sheetName, range) {
    let dataSheet = getDataSheet(sheetName);
    dataSheet.getRange(range).clearContent();
  }

  addRowToTopOfTable(sheetName, topRow, firstColumn, dataRangeA1Notation, withCheckbox) {
    Logger.log(`addRowToTopOfTable(sheetName=${sheetName}, topRow=${topRow}, firstColumn=${firstColumn}, dataRangeA1Notation=${dataRangeA1Notation}) - START`);

    let dataSheet = this.getDataSheet(sheetName);
    let newDataRange = dataSheet.getRange(dataRangeA1Notation);
    let newEntryRange = dataSheet.getRange(topRow, firstColumn + 1, 1, newDataRange.getNumColumns());

    dataSheet.insertRowsBefore(topRow, 1);

    newEntryRange.setValues(newDataRange.getValues());

    if (withCheckbox == true) {
      let checkboxRange = dataSheet.getRange(topRow, firstColumn);
      checkboxRange.setDataValidation(ActionUtils.createCheckbox());
    }
  }
}

function getActionUtils() {
  return ActionUtils;
}

