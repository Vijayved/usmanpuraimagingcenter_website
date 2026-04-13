# UIC WhatsApp Bot — WATI Setup Guide
# ══════════════════════════════════════════════════════════════
# Your WATI: https://live-mt-server.wati.io/1110
# Your Number: +91 97255 04245
# ══════════════════════════════════════════════════════════════

## ⚠️  FIRST — REGENERATE YOUR API TOKEN
Because your token appeared in a chat:
1. Login to app.wati.io
2. Settings (gear icon) → API
3. Click "Regenerate Token"
4. Copy the new token
5. Replace it in the .env file

══════════════════════════════════════════════════════════════
## STEP 1 — INSTALL NODE.JS (if not already installed)
══════════════════════════════════════════════════════════════

Download from: https://nodejs.org  (choose LTS version)
After install, open Terminal and check:

  node --version   ← should show v18 or higher
  npm --version    ← should show v9 or higher

══════════════════════════════════════════════════════════════
## STEP 2 — SET UP THE BOT FILES
══════════════════════════════════════════════════════════════

1. Create a folder on your computer: uic-wati-bot
2. Put all 6 downloaded files inside it:
   uic-wati-bot/
   ├── .env
   ├── package.json
   └── src/
       ├── index.js
       ├── bot.js
       ├── sender.js
       ├── sessions.js
       └── messages.js

3. Open Terminal and navigate to the folder:
   cd uic-wati-bot

4. Install dependencies:
   npm install

5. Open .env file and update WATI_ACCESS_TOKEN with your NEW token

══════════════════════════════════════════════════════════════
## STEP 3 — RUN LOCALLY + EXPOSE WITH NGROK
══════════════════════════════════════════════════════════════

Terminal 1 — Start the bot:
  npm start

You should see:
  ╔══════════════════════════════════╗
  ║   🏥 UIC WATI WhatsApp Bot      ║
  ║   Status:   RUNNING ✅           ║
  ╚══════════════════════════════════╝

Terminal 2 — Expose publicly:
  1. Download ngrok from https://ngrok.com/download
  2. Sign up for free and get your authtoken
  3. Run: ngrok http 3000
  4. Copy the HTTPS URL shown, e.g:
     https://abc123.ngrok-free.app

══════════════════════════════════════════════════════════════
## STEP 4 — CONFIGURE WEBHOOK IN WATI DASHBOARD
══════════════════════════════════════════════════════════════

This is the KEY step — tells WATI to send messages to your bot.

1. Login to: https://app.wati.io
2. Left sidebar → Settings (⚙️ gear icon)
3. Click "Webhook"
4. Click "Add Webhook" or "Edit"
5. Enter these details:

   Webhook URL:  https://abc123.ngrok-free.app/webhook
                 (your ngrok URL + /webhook)

   Events to subscribe:
   ✅ message (incoming messages)
   ✅ message_status (optional — delivery receipts)

6. Click Save ✅

══════════════════════════════════════════════════════════════
## STEP 5 — TEST IT!
══════════════════════════════════════════════════════════════

1. Open WhatsApp on YOUR phone
2. Message +91 97255 04245 with: Hi
3. The bot should reply with the welcome menu!

Test these messages:
  "Hi"   → Welcome menu
  "1"    → Book appointment flow
  "2"    → Services menu
  "3"    → Branch finder
  "0"    → Back to main menu (always works)

Watch the Terminal for logs — every message shows up there.

══════════════════════════════════════════════════════════════
## STEP 6 — DEPLOY TO RAILWAY (permanent, free hosting)
══════════════════════════════════════════════════════════════

ngrok URL changes every time you restart. Railway gives you a
permanent URL for free.

A) Upload to GitHub first:
   1. Go to github.com → Sign up / Login
   2. Click "+" → New Repository
   3. Name: uic-wati-bot
   4. Upload all your bot files
   ⚠️  DO NOT upload .env file! (contains secrets)

B) Deploy on Railway:
   1. Go to railway.app → Sign up with GitHub
   2. Click "New Project" → "Deploy from GitHub repo"
   3. Select your uic-wati-bot repo
   4. Railway will auto-detect Node.js and deploy

C) Add environment variables in Railway:
   1. Click your project → Settings → Variables
   2. Add each line from your .env file:
      WATI_API_ENDPOINT = https://live-mt-server.wati.io/1110
      WATI_ACCESS_TOKEN = (your new token)
      WATI_PHONE_NUMBER = 919725504245
      STAFF_WHATSAPP    = 919725504245
      PORT              = 3000

D) Get your permanent URL:
   Railway gives you something like:
   https://uic-wati-bot-production.up.railway.app

E) Update WATI webhook with permanent URL:
   Go back to WATI → Settings → Webhook
   Update URL to:
   https://uic-wati-bot-production.up.railway.app/webhook

══════════════════════════════════════════════════════════════
## STEP 7 — VERIFY EVERYTHING WORKS
══════════════════════════════════════════════════════════════

After Railway deploy:

1. Visit your Railway URL in browser:
   https://uic-wati-bot-production.up.railway.app
   Should show: ✅ UIC WATI Bot is running!

2. Send "Hi" to +91 97255 04245 again
3. Bot should reply instantly

4. Complete a test booking — you should receive:
   - Confirmation message as patient
   - Staff alert on same number (or staff number)

══════════════════════════════════════════════════════════════
## CUSTOMIZATION — How to change bot messages
══════════════════════════════════════════════════════════════

To change what the bot says:
→ Open src/messages.js
→ Edit any text inside the quotes
→ Save file and restart: npm start

To add a new service or branch:
→ Edit SERVICE_MAP in messages.js
→ Edit branchNames and branches in messages.js
→ Add handling in bot.js

══════════════════════════════════════════════════════════════
## WATI DASHBOARD — What you'll see
══════════════════════════════════════════════════════════════

After setting up, in your WATI dashboard:
- All conversations appear in Inbox
- Bookings get tagged (appointment_booked, mri_scan, etc.)
- Patient contact attributes get updated automatically
- When patient types "5" → conversation assigned to your team
- Your team can take over the chat at any time

══════════════════════════════════════════════════════════════
## COSTS
══════════════════════════════════════════════════════════════

WATI subscription:    Already paying (₹2,999/month)
Railway hosting:      FREE (500 hours/month free tier)
Bot conversations:    Included in WATI subscription
Total extra cost:     ₹0/month

══════════════════════════════════════════════════════════════
## TROUBLESHOOTING
══════════════════════════════════════════════════════════════

Bot not responding?
→ Check Terminal for errors
→ Check ngrok/Railway URL is correct in WATI webhook
→ Make sure webhook event "message" is subscribed

Getting 401 errors?
→ Your token expired — regenerate in WATI → Settings → API

Bot sends wrong message?
→ Edit src/messages.js and restart

Session stuck?
→ Type "0" or "Hi" — always resets to main menu
