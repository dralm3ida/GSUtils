function getActionUtils() {
  return ActionUtils;
}

function getFormatUtils() {
  return FormatUtils;
}

function getCurrencyUtils() {
  return CurrencyUtils;
}

class GSUtils {
  constructor(spreadsheet, sheetName) {
    this._ss = spreadsheet;
    this._sn = sheetName;
    if (sheetName != null) {
      this._ds = spreadsheet.getSheetByName(sheetName);
    }
  }

  getDataSheet(sheetName) {
    if (sheetName != this._sn) {
      this._sn = sheetName;
      this._ds = this._ss.getSheetByName(sheetName);
    }
    return this._ds;
  }
}

