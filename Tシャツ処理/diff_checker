function diff_checker() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('掲示印刷');
    const sheet2 = ss.getSheetByName('掲示印刷_diff_checker');
    const cartesian =
        (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

    let classes = cartesian(["J1", "J2", "J3", "S1", "S2"], ["A", "B", "C", "D", "E"]);

    classes.push(["S2", "F"]);

    for (let c of classes) {
        let grd, cls;
        [grd, cls] = c;
        const v = grd + cls;
        sheet.getRange("B2").setValue(v);
        sheet2.getRange("B2").setValue(v);
        SpreadsheetApp.flush();
        let data1 = sheet.getRange("B3:P50").getValues();
        let data2 = sheet2.getRange("B3:P50").getValues();
        for (let i = 0; i < 48; i++) {
            if (JSON.stringify(data1[i]) != JSON.stringify(data2[i])) {
                Logger.log(data1[i]);
            }
        }
    }
}