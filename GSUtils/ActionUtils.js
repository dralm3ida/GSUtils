var _actionUtilsInstance = null;

class ActionUtils extends GSUtils {

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

  addRowToTopOfTable(sheetName, topRow, firstColumn, dataRangeA1Notation) {
    Logger.log(`addRowToTopOfTable(sheetName=${sheetName}, topRow=${topRow}, firstColumn=${firstColumn}, dataRangeA1Notation=${dataRangeA1Notation}) - START`);

    let dataSheet = this.getDataSheet(sheetName);
    let newDataRange = dataSheet.getRange(dataRangeA1Notation);
    let newEntryRange = dataSheet.getRange(topRow, firstColumn, 1, newDataRange.getNumColumns());

    dataSheet.insertRowsBefore(topRow, 1);

    newEntryRange.setValues(newDataRange.getValues());
  }
}
