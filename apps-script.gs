/**
 * SANTÉ Wellness Lead Capture + CRM API
 * Deploy as a Web App. Execute as: Me. Access: Anyone.
 */
const SHEET_NAME = 'Leads';
const SPREADSHEET_ID = '1ib3VFd0LUGmjN7oYwEQeXmkJep78m14D1xioyqj7iPQ';

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Date & Time','Full Name','Email','Mobile / WhatsApp','Country',
      'Interest','Package','Message','Source Page','Lead Status',
      'CRM Notes','Follow-up Date'
    ]);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Date & Time','Full Name','Email','Mobile / WhatsApp','Country',
      'Interest','Package','Message','Source Page','Lead Status',
      'CRM Notes','Follow-up Date'
    ]);
  }
  // Upgrade older sheets without removing existing leads.
  const headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 12)).getValues()[0];
  if (!headers[10]) sheet.getRange(1,11).setValue('CRM Notes');
  if (!headers[11]) sheet.getRange(1,12).setValue('Follow-up Date');
  sheet.setFrozenRows(1);
  return sheet;
}

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || 'health';
    if (action === 'list') {
      const sheet = getSheet_();
      const values = sheet.getDataRange().getValues();
      if (values.length < 2) return json_({ok:true, leads:[]});
      const tz = Session.getScriptTimeZone();
      const leads = values.slice(1).filter(r => r.some(v => v !== '')).map((r, i) => ({
        row: i + 2,
        dateTime: r[0] instanceof Date ? Utilities.formatDate(r[0], tz, 'MMM d, yyyy h:mm a') : String(r[0] || ''),
        fullName: String(r[1] || ''),
        email: String(r[2] || ''),
        phone: String(r[3] || ''),
        country: String(r[4] || ''),
        interest: String(r[5] || ''),
        package: String(r[6] || ''),
        message: String(r[7] || ''),
        sourcePage: String(r[8] || ''),
        status: String(r[9] || 'New'),
        notes: String(r[10] || ''),
        followUp: r[11] instanceof Date ? Utilities.formatDate(r[11], tz, 'yyyy-MM-dd') : String(r[11] || '')
      })).reverse();
      return json_({ok:true, leads:leads});
    }
    return json_({ok:true, service:'SANTÉ Wellness Lead CRM'});
  } catch (error) {
    return json_({ok:false, error:String(error)});
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e && e.postData && e.postData.contents ? e.postData.contents : '{}');
    const sheet = getSheet_();

    if (data.action === 'update') {
      const row = Number(data.row);
      if (!row || row < 2 || row > sheet.getLastRow()) throw new Error('Invalid lead row.');
      sheet.getRange(row, 10).setValue(data.status || 'New');
      sheet.getRange(row, 11).setValue(data.notes || '');
      sheet.getRange(row, 12).setValue(data.followUp || '');
      return json_({ok:true});
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
      'New',
      '',
      ''
    ]);
    return json_({ok:true});
  } catch (error) {
    return json_({ok:false, error:String(error)});
  }
}