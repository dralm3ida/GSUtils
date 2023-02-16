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

function exists(value){
  var res = false;
  if ( (undefined != value) && (null != value) ){ res = true; }
  return res;
}
 
function isEmpty(value) {
  return !(exists(value) && value != "");
}

function flatNonEmpty(values) {
  return values.reduce(function(acc, el) { 
    return acc.concat(el.filter(function(val) {
      return val != "";  
    }));
  });
}

function sortDates(dates, asc) {
  return dates.sort(function(a, b) {
    return (asc) ? (a-b) : (b-a);
  });
}

function filterDatesByLastMonth(sortedDatesDesc) {
  var res = [];
  sortedDatesDesc.reduce(function(current, next, idx) {
    if (idx == 1) { res.push(current); }
    
    if (next.getMonth() >= current.getMonth()) {
      res.push(next);
    }
    return current;
  });
  return res;
}