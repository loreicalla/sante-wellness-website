/**
 * SANTÉ Wellness Lead Capture
 * Paste this entire file into Google Apps Script attached to a Google Sheet.
 */
const SHEET_NAME = 'Leads';
const SPREADSHEET_ID = '1ib3VFd0LUGmjN7oYwEQeXmkJep78m14D1xioyqj7iPQ';

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, service: 'SANTÉ Wellness Lead Capture' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData && e.postData.contents ? e.postData.contents : '{}');
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Date & Time','Full Name','Email','Mobile / WhatsApp','Country',
        'Interest','Package','Message','Source Page','Lead Status'
      ]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.country || '',
      data.interest || '',
      data.package || '',
      data.message || '',
      data.sourcePage || '',
      'New'
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}