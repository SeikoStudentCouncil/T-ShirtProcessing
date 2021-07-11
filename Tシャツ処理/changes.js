function modifier() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('diff.');
    const sheet2 = ss.getSheetByName('changes.');
    const sheet3 = ss.getSheetByName('changes._auto.');

    const trigger = sheet2.getRange("D1");
    if (trigger.getValue() == false) {
        return false;
    }
    trigger.setValue(false);

    let data1 = sheet.getRange(3, 1, getDataLastRow(sheet) - 1, 26).getValues();
    let data2 = sheet3.getRange(3, 5, getDataLastRow(sheet2) - 2, 26).getValues();

    data2.sort((a, b) => {
        if (a[0] < b[0]) return -1;
		    if (a[0] > b[0]) return 1;
    })
    
    let j = 0;
    for (let i = 0; i < data1.length; i++) {
        if (j >= data2.length || data1[i][0] != data2[j][0]) {
            sheet2.getRange(sheet2.getLastRow() + 1, 5, 1, 26).setValues([data1[i]]);
        } else {
            j++;
        }
    }
    return true;
}

function getDataLastRow(sheet) {
    return sheet.getRange('B:B').getValues().filter(String).length;
}