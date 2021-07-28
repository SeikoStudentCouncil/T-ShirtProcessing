function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('User')
    .addItem('changes.更新', 'modifier')
    .addToUi();
}

function modifier() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const diff = ss.getSheetByName('diff.');
    const change = ss.getSheetByName('changes.');
/*
    const trigger = change.getRange("H1");
    if (trigger.getValue() == false) {
        return false;
    }
    trigger.setValue(false);
*/
    let data1 = diff.getRange(3, 1, getDataLastRow(diff) - 1, 26).getValues()
                .map((element) => element.slice(0, 5).concat(element.slice(6)));
    let data2 = change.getRange(3, 5, getDataLastRow(change) - 1, 28).getValues()
                .filter((element) => !/^B-/.test(element[1]));
    
    let data1Table = data1.map((element) => parseInt(element[0]));

    data2.sort((a, b) => {
        if (a[3] < b[3]) return -1;
        if (a[3] > b[3]) return 1;
    });

    let j = 0;
    let r = getDataLastRow(change) + 2;
    for (let i = 0; i < data1.length; i++) {
        if (j < data2.length && data2[j][3] != 'null' && !(data1Table.includes(parseInt(data2[j][3])))) {
            change.getRange(data2[j][0] + 2, 6, 1, 27).clearContent();
            change.getRange(data2[j][0] + 2, 8).setValue('null');
            j++;
        } else if (j >= data2.length || data1[i][0] != data2[j][3] || data2[j][3] == 'null') {
            change.getRange(r, 8, 1, 25).setValues([data1[i]]);
            r++;
        } else if (JSON.stringify(data1[i]) != JSON.stringify(data2[j].slice(3))) {
            change.getRange(data2[j][0] + 2, 8, 1, 25).setValues([data1[i]]);
            req = change.getRange(data2[j][0] + 2, 4)
            req.setValue(String(req.getValue()) + ', modified')
            j++;
        } else {
            j++;
        }
    }
    return true;
}

function getDataLastRow(sheet) {
    return sheet.getRange('E:E').getValues().filter(String).length;
}
