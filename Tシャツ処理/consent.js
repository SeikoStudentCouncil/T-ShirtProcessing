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
    const spreadsheet    = SpreadsheetApp.getActiveSpreadsheet();
    const parentFolder   = DriveApp.getFolderById(DriveApp.getFileById(ss.getId()).getParents().next().getId());
    const copyDir        = parentFolder.getFoldersByName('同意書').next();
    const sheet          = spreadsheet.getSheetByName('changes._同意差込');
    const values         = sheet.getDataRange().getDisplayValues(); 
    const sourceDocument = parentFolder.getFilesByName('同意書テンプレート').next();

    var iterList = copyDir.getFiles();
    while (iterList.hasNext()) {
        iterList.next().setTrashed(true);
    }

    for (array of values.slice(2)) {
        const fileName = String(array[0]);
        const duplicateDocument = sourceDocument.makeCopy(fileName, copyDir);
        const ddId = duplicateDocument.getId();
        const targetDocument = DocumentApp.openById(ddId);
        const targetBody = targetDocument.getBody();

        for (let i = 0; i <= 28; i++) {
            targetBody.replaceText('c' + String(i) + 'c', array[i]);
        }

        Utilities.sleep(6000);
        targetDocument.saveAndClose();

        let token = ScirptApp.getOAuthToken();
        let options = {
            headers: {
                'Authorization': 'Bearer' + token
            },
            muteHttpExceptions: true
        };
        let url = "https://docs.google.com/document/d/"
                + ddId
                + "/export?&exportFormat=pdf&format=pdf";
        let blob = UrlFetchApp.fetch(url, options).getBlob().setName(fileName + '.pdf');
        copyDir.createFile(blob);
        targetDocument.setTrashed(true);
    }
}
