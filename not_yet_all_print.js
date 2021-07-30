function not_yet_all_print() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('未提出者印刷');
    const ssID = ss.getId();
    const shID = sheet.getSheetId();
    const parentFolders = DriveApp.getFileById(ss.getId()).getParents();
    const folder = DriveApp.getFolderById(parentFolders.next().getId()).getFoldersByName('未提出者').next();
    let baseUrl = "https://docs.google.com/spreadsheets/d/"
        + ssID
        + "/export?gid="
        + shID;
    let pdfOptions = "&exportFormat=pdf&format=pdf"
        + "&size=A4"
        + '&portrait=true'
        + "&fitw=true"
        + "&top_margin=0.1"
        + "&bottom_margin=0.1"
        + "&left_margin=0.1"
        + "&right_margin=0.1"
        + "&horizontal_alignment=LEFT"
        + "&vertical_alignment=TOP"
        + "&gridlines=false";
    let url = baseUrl + pdfOptions;
    const cartesian =
        (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
    let classes = cartesian(["J1", "J2", "J3", "S1", "S2"], ["A", "B", "C", "D", "E"]);
    classes.push(["S2", "F"]);
    var iterList = folder.getFiles();
    while (iterList.hasNext()) {
        iterList.next().setTrashed(true);
    }
    for (let c of classes) {
        let grd, cls;
        [grd, cls] = c;
        const v = grd + cls;
        let token = ScriptApp.getOAuthToken();
        let options = {
          headers: {
              'Authorization': 'Bearer ' +  token
          },
          muteHttpExceptions : true
        };
        sheet.getRange("B2").setValue(v);
        SpreadsheetApp.flush();
        let blob = UrlFetchApp.fetch(url, options).getBlob().setName(v + '.pdf');
        folder.createFile(blob);
        Utilities.sleep(6000);
    }
    return true;
}

function not_yet_all_print_1() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('未提出者印刷_');
    const ssID = ss.getId();
    const shID = sheet.getSheetId();
    const parentFolders = DriveApp.getFileById(ss.getId()).getParents();
    const folder = DriveApp.getFolderById(parentFolders.next().getId()).getFoldersByName('未提出者').next();
    let baseUrl = "https://docs.google.com/spreadsheets/d/"
        + ssID
        + "/export?gid="
        + shID;
    let pdfOptions = "&exportFormat=pdf&format=pdf"
        + "&size=A4"
        + '&portrait=true'
        + "&fitw=true"
        + "&top_margin=0.1"
        + "&bottom_margin=0.1"
        + "&left_margin=0.1"
        + "&right_margin=0.1"
        + "&horizontal_alignment=LEFT"
        + "&vertical_alignment=TOP"
        + "&gridlines=false";
    let url = baseUrl + pdfOptions;
    const cartesian =
        (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
    let classes = ["S1", "E"]
    for (let c of classes) {
        let grd, cls;
        [grd, cls] = c;
        const v = grd + cls;
        let token = ScriptApp.getOAuthToken();
        let options = {
          headers: {
              'Authorization': 'Bearer ' +  token
          },
          muteHttpExceptions : true
        };
        sheet.getRange("B2").setValue(v);
        SpreadsheetApp.flush();
        let blob = UrlFetchApp.fetch(url, options).getBlob().setName(v + '.pdf');
        folder.createFile(blob);
        Utilities.sleep(6000);
    }
    return true;
}