function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('User')
    .addItem('差し込み作成', 'createNewDocument')
    .addToUi();
}

function createNewDocument() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet       = spreadsheet.getSheetByName('changes._同意差込');
    const values      = sheet.getDataRange().getDisplayValues(); 
    for (let i = 2; i < values.length; i++) {
        replaceDocument(values[i]);
    }
}

function replaceDocument(array) {
    const fileName          = String(array[0]);
    const parentFolder      = DriveApp.getFolderById(DriveApp.getFileById(ss.getId()).getParents().next().getId());
    const sourceDocument    = parentFolder.getFoldersByName('同意書テンプレート').next();
    const copyDir           = parentFolder.getFoldersByName('同意書').next();
    const duplicateDocument = sourceDocument.makeCopy(fileName, copyDir);
    const targetDocument    = DocumentApp.openById(duplicateDocument.getId());
    const targetBody        = targetDocument.getBody();
    
    for (let i = 0; i <= 28; i++) {
        targetBody.replaceText('c' + String(i) + 'c', array[i]);
    }
}