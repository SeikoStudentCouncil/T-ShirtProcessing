function modifier() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('diff.');
    const sheet2 = ss.getSheetByName('changes.');
    const sheet3 = ss.getSheetByName('changes._auto.');
    
    let data1 = sheet.getRange(3, 1, getDataLastRow(sheet), 25).getValues();
    let data2 = sheet3.getRange(3, 4, getDataLastRow(sheet3) - 1, 25).getValues();

    data2.sort((a, b) => {
        if (a[0] < b[0]) return -1;
		    if (a[0] > b[0]) return 1;
    })
    
    let j = 0
    for (let i = 0; i < data1.length; i++) {
        if (j >= data2.length || data1[i][0] != data2[j][0]) {
            sheet2.getRange(sheet2.getLastRow() + 1, 2, 1, 25).setValues([data1[i]]);
        } else {
            j++;
        }
    }
}

function getDataLastRow(sheet) {
    return sheet.getRange('D:D').getValues().filter(String).length
}