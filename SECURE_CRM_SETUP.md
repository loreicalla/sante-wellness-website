# Secure CRM setup

The CRM frontend no longer contains the access code. It now asks the Apps Script backend to authenticate the user and expects a short-lived session token.

## 1. Store the access code securely

In the Apps Script editor open **Project Settings** and add a Script Property:

- Property: `CRM_ACCESS_CODE`
- Value: your private CRM access code

Do not put this code back into `crm.js` or commit it to GitHub.

## 2. Add these helpers to your Apps Script project

```javascript
function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function createCrmSession_() {
  const token = Utilities.getUuid() + '-' + Utilities.getUuid();
  CacheService.getScriptCache().put(
    'crm:' + token,
    JSON.stringify({ created: Date.now() }),
    21600 // 6 hours
  );
  return token;
}

function requireCrmSession_(token) {
  return !!token &&
    !!CacheService.getScriptCache().get('crm:' + token);
}

function handleCrmLogin_(data) {
  const expected = PropertiesService
    .getScriptProperties()
    .getProperty('CRM_ACCESS_CODE');

  if (!expected || String(data.accessCode || '') !== expected) {
    return json_({ ok: false, error: 'Unauthorized' });
  }

  return json_({
    ok: true,
    token: createCrmSession_()
  });
}
```

## 3. Protect list and update actions

At the beginning of the part of `doPost(e)` that handles CRM actions, parse the request and add this logic:

```javascript
const data = JSON.parse(e.postData.contents || '{}');

if (data.action === 'login') {
  return handleCrmLogin_(data);
}

if (data.action === 'list' || data.action === 'update') {
  if (!requireCrmSession_(data.token)) {
    return json_({ ok: false, error: 'Unauthorized or expired session' });
  }
}
```

Then allow your existing `list` and `update` code to run only after that check.

Your public website lead-capture submission should remain outside this CRM authentication block so visitors can still submit the form.

## 4. Important: remove public lead listing

If your current `doGet(e)` has code similar to:

```javascript
if (e.parameter.action === 'list') {
  return ...
}
```

remove that public list route or require a valid CRM session before returning lead data. The CRM frontend now uses authenticated POST requests for listing.

## 5. Redeploy

After saving:

1. Deploy > Manage deployments
2. Edit the active **Web app**
3. Select **New version**
4. Deploy
5. Use the same `/exec` URL in the website unless Google gives you a different deployment URL.

## Security model

- The CRM access code is stored in Apps Script Script Properties, not in the public website.
- Successful login creates a random session token.
- Tokens expire after 6 hours.
- List and update requests require a valid session.
- Logging out removes the token from the browser session.
- The Google Sheet itself remains private to the Google account that owns the Apps Script.

For stronger multi-user authentication later, the next step would be Google Sign-In or Firebase Authentication with an approved-user allowlist.
