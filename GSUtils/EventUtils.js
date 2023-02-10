var _eventUtilsInstance = null;

function loadEventUtils() {
  return EventUtils;
}

class EventUtils extends GSUtils {
  constructor(spreadsheet, dataSheet) {
    super(spreadsheet, dataSheet);
    this._monthTriggerCreated = false;
  }

  static getInstance(spreadsheet, dataSheet) {
    if (_eventUtilsInstance == null || this._sn != dataSheet) {
      _eventUtilsInstance = new EventUtils(spreadsheet, dataSheet);
    }
    return _eventUtilsInstance;
  }

  createTimeDrivenTriggerOnMonthDay(functionName, monthDay) {
    var trigger = null;
    
    if (!this._monthTriggerCreated) {
      trigger = ScriptApp.newTrigger(functionName)
      .forSpreadsheet(this._ss)
      .timeBased()
      .onMonthDay(monthDay)
      .create();
      
      this._monthTriggerCreated = true;
    }
    
    return trigger;
  }

  deleteTrigger(triggerId) {
    const allTriggers = ScriptApp.getProjectTriggers();
    for(let i = 0; i < allTriggers.length; i++) {
      if (allTriggers[i].getUniqueId() === triggerId) {
        ScriptApp.deleteTrigger(allTriggers[i]);
        break;
      }
    }
  }
}