function insertLastUpdated2() {
    var spreadsheet = SpreadsheetApp.getActive().getSheetByName("main.")
    spreadsheet.getRange('I3').setValue(Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd HH:mm'))
}