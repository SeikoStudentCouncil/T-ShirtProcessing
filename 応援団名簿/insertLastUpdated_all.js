function insertLastUpdated() {
    var spreadsheet = SpreadsheetApp.getActiveSheet()
    spreadsheet.getRange('I2').setValue(Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd HH:mm'))
    spreadsheet.getRange('J2').setValue(Session.getActiveUser().getEmail())
}