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

    let data1 = diff.getRange(3, 1, getDataLastRow(diff) - 1, 26).getValues()
                .map((element) => element.slice(0, 5).concat(element.slice(6)));
    let data2 = change.getRange(3, 5, getDataLastRow(change) - 1, 28).getValues()
                .filter((element) => !/^B-/.test(element[1]));
    
    let data1Table = data1.map((element) => parseInt(element[0]));

    data2.sort((a, b) => {
        if (a[3] < b[3]) return -1;
        if (a[3] > b[3]) return 1;
    });
    
    let i = 0;
    let j = 0;
    let r = getDataLastRow(change) + 2;
    while (i < data1.length) {
        if (j < data2.length && data2[j][3] != 'null' && !(data1Table.includes(parseInt(data2[j][3])))) {
            change.getRange(data2[j][0] + 2, 6, 1, 27).clearContent();
            change.getRange(data2[j][0] + 2, 8).setValue('null');
            change.getRange(data2[j][0] + 2, 1, 1, 3).setValues(['OK', '-', '-']);
            j++;
        } else if (j >= data2.length || data1[i][0] != data2[j][3] || data2[j][3] == 'null') {
            change.getRange(r, 8, 1, 25).setValues([data1[i]]);
            i++;
            r++;
        } else if (JSON.stringify(data1[i]) != JSON.stringify(data2[j].slice(3))) {
            change.getRange(data2[j][0] + 2, 8, 1, 25).setValues([data1[i]]);
            req = change.getRange(data2[j][0] + 2, 4);
            rep = req.getValue();
            if (rep) {
                req.setValue('modified: 01');
            } else if (!/modified: \d$/.test(req)) {
                req.setValue(rep.slice(0, -2) + ('00' + parseInt(rep.slice(-2)) + 1).slice(-2));
            } else {
                req.setValue(String(rep) + ', modified: 01');
            }
            i++;
            j++;
        } else {
            i++;
            j++;
        }
    }
    return true;
}

function getDataLastRow(sheet) {
    return sheet.getRange('E:E').getValues().filter(String).length;
}