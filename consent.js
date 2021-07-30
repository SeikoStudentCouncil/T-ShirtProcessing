function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('User')
    .addItem('差し込み作成', 'createNewDocument')
    .addToUi();
}

function deleteMenu() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    spreadsheet.removeMenu('追加メニュー');
}

function createNewDocument() {
    const ss             = SpreadsheetApp.getActiveSpreadsheet();
    const parentFolder   = DriveApp.getFolderById(DriveApp.getFileById(ss.getId()).getParents().next().getId());
    const copyDir        = parentFolder.getFoldersByName('同意書').next();
    const sheet          = ss.getSheetByName('changes._consent');
    const values         = sheet.getDataRange().getDisplayValues(); 
    const sourceDocument = parentFolder.getFilesByName('同意書テンプレート').next();
    const changes        = ss.getSheetByName('changes.');

    var iterList = copyDir.getFiles();
    while (iterList.hasNext()) {
        iterList.next().setTrashed(true);
    }

    for (array of values.slice(2)) {
        const fileName = String(array[4]);
        const duplicateDocument = sourceDocument.makeCopy(fileName, copyDir);
        const ddId = duplicateDocument.getId();
        const targetDocument = DocumentApp.openById(ddId);
        const targetBody = targetDocument.getBody();

        for (let i = 2; i <= 29; i++) {
            targetBody.replaceText('c' + String(i) + 'c', nvl(array[i + 2], ''));
        }
        Logger.log(parseInt(array[4]) + 2)
        changes.getRange(parseInt(array[4]) + 2, 3).setValue("OK");

        targetDocument.saveAndClose();

        let token = ScriptApp.getOAuthToken();
        let options = {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            muteHttpExceptions: true
        };
        let url = "https://docs.google.com/document/d/"
                + ddId
                + "/export?&exportFormat=pdf&format=pdf";
        let blob = UrlFetchApp.fetch(url, options).getBlob().setName(fileName + '.pdf');
        copyDir.createFile(blob);
        Utilities.sleep(2000);
        duplicateDocument.setTrashed(true);
    }
}


function nvl(val1, val2){
    return (val1 == null) ? val2 : val1;
}