// ═══════════════════════════════════════════════════════════════
// WATI SENDER
// All outgoing WhatsApp messages go through WATI API
// Endpoint: https://live-mt-server.wati.io/1110
// ═══════════════════════════════════════════════════════════════

require('dotenv').config()
const axios = require('axios')

// WATI endpoint: https://live-mt-server.wati.io/1110
// API calls go to: https://live-mt-server.wati.io/1110/api/v1/...
const BASE    = process.env.WATI_API_ENDPOINT
const TOKEN   = process.env.WATI_ACCESS_TOKEN

// Shared axios headers — WATI uses Bearer token auth
const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type':  'application/json',
  'Accept':        'application/json',
  'origin':        'https://app.wati.io',
}

// ─── SEND PLAIN TEXT MESSAGE ──────────────────────────────────
// This is the main function used throughout the bot
async function sendText(toPhone, message) {
  // WATI expects phone without + e.g. 919725504245
  const phone = toPhone.replace(/\D/g, '')

  try {
    const response = await axios.post(
      `${BASE}/api/v1/sendSessionMessage/${phone}`,
      { messageText: message },
      { headers }
    )
    console.log(`✅ Sent to ${phone}:`, message.substring(0, 60) + '...')
    return response.data
  } catch (err) {
    const errMsg = err.response?.data || err.message
    console.error(`❌ WATI sendText failed to ${phone}:`, errMsg)

    // If session expired (24hr window), try template message fallback
    if (err.response?.status === 400 || err.response?.status === 403) {
      console.log('⚠️  Session may have expired — trying template fallback...')
      await sendTemplateWelcome(phone)
    }
  }
}

// ─── SEND WATI TEMPLATE MESSAGE ───────────────────────────────
// Used when: 24hr session window has expired (user hasn't messaged in 24hrs)
// You must create this template in WATI dashboard first (see SETUP_GUIDE.md)
async function sendTemplateWelcome(phone) {
  try {
    await axios.post(
      `${BASE}/api/v1/sendTemplateMessage`,
      {
        template_name:  'uic_welcome',   // create this in WATI → Templates
        broadcast_name: 'uic_bot_welcome',
        parameters: [],
        receivers: [{ whatsappNumber: phone }],
      },
      { headers }
    )
    console.log(`📨 Template sent to ${phone}`)
  } catch (err) {
    console.error('Template send failed:', err.response?.data || err.message)
  }
}

// ─── SEND STAFF ALERT ─────────────────────────────────────────
// Sends booking alert to staff WhatsApp
async function sendStaffAlert(message) {
  const staffPhone = process.env.STAFF_WHATSAPP || '919725504245'
  await sendText(staffPhone, message)
}

// ─── ASSIGN CONVERSATION TO AGENT ─────────────────────────────
// When user asks to talk to team — assigns to WATI inbox
async function assignToAgent(phone) {
  try {
    await axios.put(
      `${BASE}/api/v1/conversations/${phone}/assign`,
      { agentEmail: '' }, // leave blank to assign to unassigned queue
      { headers }
    )
    console.log(`👤 Conversation assigned to agent for ${phone}`)
  } catch (err) {
    console.error('Assign to agent failed:', err.response?.data || err.message)
  }
}

// ─── ADD TAG TO CONTACT ────────────────────────────────────────
// Tags contacts in WATI CRM for segmentation
async function addTag(phone, tag) {
  try {
    await axios.post(
      `${BASE}/api/v1/contacts/${phone}/tags`,
      { tags: [tag] },
      { headers }
    )
  } catch (err) {
    // Non-critical
  }
}

// ─── UPDATE WATI CONTACT ATTRIBUTES ───────────────────────────
// Saves booking data to WATI contact profile
async function updateContactAttributes(phone, attributes) {
  try {
    await axios.post(
      `${BASE}/api/v1/contacts/${phone}/attributes`,
      { customParams: attributes },
      { headers }
    )
    console.log(`📋 Contact attributes updated for ${phone}`)
  } catch (err) {
    console.error('Update attributes failed:', err.response?.data || err.message)
  }
}

module.exports = {
  sendText,
  sendStaffAlert,
  assignToAgent,
  addTag,
  updateContactAttributes,
}
