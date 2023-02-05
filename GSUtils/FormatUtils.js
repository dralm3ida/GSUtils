var _formatUtilsInstance = null;

class FormatUtils extends GSUtils {
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

  addEntryTableStyle(sheetName, topRow, firstColumn, dataRangeA1Notation, backgroundColor) {
    let dataSheet = this.getDataSheet(sheetName);
    let checkboxRange = dataSheet.getRange(topRow, firstColumn);
    let newDataRange = dataSheet.getRange(dataRangeA1Notation);
    let newEntryRange = dataSheet.getRange(topRow, firstColumn, 1, newDataRange.getNumColumns());
    checkboxRange.setDataValidation(FormatUtils.createCheckbox());
    newEntryRange.setBackground(backgroundColor);
    newEntryRange.setHorizontalAlignment("center");
    newEntryRange.setBorder(true, true, true, true, true, true, 'grey', SpreadsheetApp.BorderStyle.SOLID);
  }
}