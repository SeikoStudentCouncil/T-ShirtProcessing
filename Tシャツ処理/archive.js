function archive() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const main = ss.getSheetByName('main.');
    const main_archive = ss.getSheetByName('main._archive');
    const trigger = main_archive.getRange("F1");
    if (trigger.getValue() == false) {
        return false;
    }
    const cRange = main.getRange("A3:AM");
    const pRange = main_archive.getRange("A3:AM");
    cRange.copyTo(pRange, {contentsOnly: true});
    main_archive.getRange("C1").setValue(Utilities.formatDate(new Date(), 'JST', 'MM/dd HH:mm'))
    return true;
}