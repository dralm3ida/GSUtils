var _actionUtilsInstance = null;
var _formatUtilsInstance = null;

class SpreadsheetUtils extends GSUtils {
  constructor(spreadsheet, sheetName) {
    super(spreadsheet, sheetName);
  }
}

function loadActionUtils() {
  return ActionUtils;
}

class ActionUtils extends SpreadsheetUtils {

  constructor(spreadsheet, sheetName) {
    super(spreadsheet, sheetName);
  }

  static getInstance(spreadsheet, dataSheet) {
    if (_actionUtilsInstance == null || this._sn != dataSheet) {
      _actionUtilsInstance = new ActionUtils(spreadsheet, dataSheet);
    }
    return _actionUtilsInstance;
  }

  clearRange(sheetName, dataRangeA1Notation) {
    let dataSheet = this.getDataSheet(sheetName);
    dataSheet.getRange(dataRangeA1Notation).clearContent();
  }

  addRandomId(sheetName, cell) {
    let id = Utilities.getUuid();
    let dataSheet = this.getDataSheet(sheetName);
    dataSheet.getRange(cell).setValue(id)
  }

  addRowToTopOfTable(sheetName, topRow, firstColumn, dataRangeA1Notation) {
    let dataSheet = this.getDataSheet(sheetName);
    let newDataRange = dataSheet.getRange(dataRangeA1Notation);
    let newEntryRange = dataSheet.getRange(topRow, firstColumn, 1, newDataRange.getNumColumns());

    dataSheet.insertRowsBefore(topRow, 1);
    newEntryRange.setValues(newDataRange.getValues());
  }

  addValuesToTopOfTable(sheetName, topRow, firstColumn, values) {
    let dataSheet = this.getDataSheet(sheetName);
    let newEntryRange = dataSheet.getRange(topRow, firstColumn, 1, values.length);
    dataSheet.insertRowsBefore(topRow, 1);
    newEntryRange.setValues([values]);
  }
}

function loadFormatUtils() {
  return FormatUtils;
}

class FormatUtils extends SpreadsheetUtils {
  constructor(spreadsheet, sheetName) {
    super(spreadsheet, sheetName);
  }
  
  static getInstance(spreadsheet, dataSheet) {
    if (_formatUtilsInstance == null || this._sn != dataSheet) {
      _formatUtilsInstance = new FormatUtils(spreadsheet, dataSheet);
    }
    return _formatUtilsInstance;
  }

  static createCheckbox() {
    let checkboxObj = SpreadsheetApp.newDataValidation();
    checkboxObj.requireCheckbox();
    checkboxObj.setAllowInvalid(false);
    checkboxObj.build();
    return checkboxObj;
  }

  static getCurrencyFormat(currency, value) {
    let format = "";
    
    CurrencyUtils.getCurrencies().EUR
    
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
  
  addCheckbox(sheetName, row, column) {
    let dataSheet = this.getDataSheet(sheetName);
    let checkboxRange = dataSheet.getRange(row, column);
    checkboxRange.setDataValidation(FormatUtils.createCheckbox());
  }

  addEntryTableStyle(sheetName, topRow, firstColumn, dataRangeA1Notation, backgroundColor) {
    let dataSheet = this.getDataSheet(sheetName);
    let newDataRange = dataSheet.getRange(dataRangeA1Notation);
    let newEntryRange = dataSheet.getRange(topRow, firstColumn, 1, newDataRange.getNumColumns());
    newEntryRange.setBackground(backgroundColor);
    newEntryRange.setHorizontalAlignment("center");
    newEntryRange.setBorder(true, true, true, true, true, true, 'grey', SpreadsheetApp.BorderStyle.SOLID);
  }
}