// ═══════════════════════════════════════════════════════════════
// UIC WATI BOT — Main Server
// Receives incoming messages from WATI webhook
// ═══════════════════════════════════════════════════════════════

require('dotenv').config()
const express           = require('express')
const { handleMessage } = require('./bot')
const { sendText }      = require('./sender')

const app  = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// ─── HEALTH CHECK ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status:   '✅ UIC WATI Bot is running!',
    endpoint: process.env.WATI_API_ENDPOINT,
    phone:    process.env.WATI_PHONE_NUMBER,
    time:     new Date().toISOString(),
  })
})

// ─── WATI WEBHOOK ─────────────────────────────────────────────
// WATI sends a POST request here for every incoming message
// Format: https://docs.wati.io/#webhooks
app.post('/webhook', async (req, res) => {
  // Always respond 200 immediately
  res.sendStatus(200)

  try {
    const body = req.body
    console.log('\n🔔 WATI Webhook received:', JSON.stringify(body, null, 2))

    // ── WATI webhook payload structure ──
    // body.waId          = sender's phone number (e.g. 919876543210)
    // body.senderName    = sender's display name
    // body.text          = message text (for text messages)
    // body.type          = message type (text, image, audio, etc.)
    // body.timestamp     = message timestamp
    // body.id            = message ID
    // body.eventType     = 'message' for incoming messages

    // Only process incoming text messages
    if (body.eventType !== 'message' && body.type !== 'text') {
      // Non-text message — tell user to use text
      if (body.waId && body.eventType === 'message') {
        await sendText(
          body.waId,
          '🙏 Please reply with a *number* from the menu.\n\nType *0* or *Hi* to see the main menu.'
        )
      }
      return
    }

    // Extract message data from WATI payload
    const from     = body.waId        // e.g. 919876543210
    const text     = body.text?.body || body.text || ''
    const name     = body.senderName  || ''

    if (!from || !text) {
      console.log('⚠️ Missing from or text, skipping')
      return
    }

    // Route to bot logic
    await handleMessage(from, text, name)

  } catch (error) {
    console.error('❌ Webhook error:', error)
  }
})

// ─── ALTERNATIVE: WATI uses different payload format sometimes ─
// This handles the nested format
app.post('/webhook/message', async (req, res) => {
  res.sendStatus(200)

  try {
    const body = req.body
    const msg  = body.message || body

    const from = msg.from || msg.waId || ''
    const text = msg.text?.body || msg.text || msg.body || ''
    const name = msg.pushName || msg.senderName || ''

    if (from && text) {
      await handleMessage(from, text, name)
    }
  } catch (err) {
    console.error('Webhook/message error:', err)
  }
})

// ─── START SERVER ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║   🏥 UIC WATI WhatsApp Bot                  ║
║   Status:   RUNNING ✅                       ║
║   Port:     ${PORT}                              ║
║   Webhook:  POST /webhook                    ║
║   Health:   GET  /                           ║
║   WATI:     ${(process.env.WATI_API_ENDPOINT||'').substring(0,30)}  ║
╚══════════════════════════════════════════════╝
  `)
})
