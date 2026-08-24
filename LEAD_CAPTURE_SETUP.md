# SANTÉ Wellness Lead Capture Setup

The website form is already designed to preserve its existing WhatsApp flow.

## Step 1 — Create the Google Sheet
1. Create a new Google Sheet named **SANTÉ Website Leads**.
2. Open **Extensions → Apps Script**.
3. Replace the default code with the contents of `apps-script.gs`.

## Step 2 — Deploy
1. Click **Deploy → New deployment**.
2. Select **Web app**.
3. Execute as: **Me**.
4. Who has access: **Anyone**.
5. Deploy and authorize the script.
6. Copy the deployment URL ending in `/exec`.

## Step 3 — Connect the website
Open `lead-form.js` and replace:

```js
const GOOGLE_SHEETS_ENDPOINT='';
```

with:

```js
const GOOGLE_SHEETS_ENDPOINT='PASTE_YOUR_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE';
```

After that, each submitted lead is written to the **Leads** tab before the visitor is sent to WhatsApp.

## Lead columns
- Date & Time
- Full Name
- Email
- Mobile / WhatsApp
- Country
- Interest
- Package
- Message
- Source Page
- Lead Status

The existing website UI, package flow, images, chatbot, and WhatsApp experience are not replaced by this setup.
