// ═══════════════════════════════════════════════════════════════
// UIC BOT LOGIC — WATI version
// ═══════════════════════════════════════════════════════════════

const { sendText, sendStaffAlert, assignToAgent, addTag, updateContactAttributes } = require('./sender')
const { getSession, updateSession, resetSession } = require('./sessions')
const { MSG, SERVICE_MAP } = require('./messages')

// ─── HELPERS ──────────────────────────────────────────────────
function parseDate(input) {
  const up = input.trim().toUpperCase()
  const today = new Date()
  if (up === 'TODAY') return today.toLocaleDateString('en-IN', { day:'2-digit', month:'2-digit', year:'numeric' })
  if (up === 'TOMORROW') {
    const t = new Date(today); t.setDate(t.getDate() + 1)
    return t.toLocaleDateString('en-IN', { day:'2-digit', month:'2-digit', year:'numeric' })
  }
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(input.trim())) return input.trim()
  return null
}

function isValidPhone(p) {
  return /^[6-9]\d{9}$/.test(p.replace(/\D/g, ''))
}

// ─── MAIN HANDLER ─────────────────────────────────────────────
async function handleMessage(from, text, userName) {
  const clean   = text.trim()
  const lower   = clean.toLowerCase()
  const session = getSession(from)

  console.log(`\n📩 [${from}] (${userName}) Step:${session.step} | "${clean}"`)

  // ── GLOBAL RESET TRIGGERS ─────────────────────────────
  const resetWords = ['0','menu','hi','hello','start','hii','hey','namaste','kem cho','helo']
  if (resetWords.includes(lower)) {
    resetSession(from)
    updateSession(from, { step: 'MAIN' })
    await sendText(from, MSG.welcome(userName))
    return
  }

  // ── GLOBAL BOOK KEYWORD ───────────────────────────────
  // User replies BOOK from any service/branch detail page
  if (lower === 'book') {
    await sendText(from, MSG.booking.askService)
    updateSession(from, { step: 'BOOKING_SERVICE' })
    return
  }

  // ── STEP: MAIN MENU ───────────────────────────────────
  if (session.step === 'MAIN') {
    switch (clean) {
      case '1':
        await sendText(from, MSG.booking.askService)
        updateSession(from, { step: 'BOOKING_SERVICE' })
        break
      case '2':
        await sendText(from, MSG.servicesMenu)
        updateSession(from, { step: 'SERVICES_MENU' })
        break
      case '3':
        await sendText(from, MSG.branchMenu)
        updateSession(from, { step: 'BRANCH_MENU' })
        break
      case '4':
        await sendText(from, MSG.reportStatus)
        updateSession(from, { step: 'REPORT_STATUS' })
        break
      case '5':
        await sendText(from, MSG.connectTeam)
        await assignToAgent(from)
        updateSession(from, { step: 'HUMAN_HANDOFF' })
        break
      default:
        await sendText(from, MSG.welcome(userName))
    }
    return
  }

  // ── STEP: SERVICES MENU ───────────────────────────────
  if (session.step === 'SERVICES_MENU') {
    const details = {
      '1': MSG.services.mri,    '2': MSG.services.ct,
      '3': MSG.services.sono,   '4': MSG.services.doppler,
      '5': MSG.services.xray,   '6': MSG.services.dexa,
      '7': MSG.services.mammo,  '8': MSG.services.blood,
    }
    if (details[clean]) {
      await sendText(from, details[clean])
    } else {
      await sendText(from, MSG.servicesMenu)
    }
    return
  }

  // ── STEP: BRANCH MENU ─────────────────────────────────
  if (session.step === 'BRANCH_MENU') {
    if (MSG.branches[clean]) {
      await sendText(from, MSG.branches[clean])
      updateSession(from, { step: 'BRANCH_AFTER', lastBranch: MSG.branchNames[clean] })
    } else {
      await sendText(from, MSG.branchMenu)
    }
    return
  }

  // ── STEP: AFTER BRANCH DETAIL ─────────────────────────
  if (session.step === 'BRANCH_AFTER') {
    if (lower === 'book') {
      // Pre-fill branch from what they just viewed
      await sendText(from, MSG.booking.askService)
      updateSession(from, { step: 'BOOKING_SERVICE' })
    } else {
      await sendText(from, MSG.mainMenu)
      updateSession(from, { step: 'MAIN' })
    }
    return
  }

  // ── BOOKING: SELECT SERVICE ───────────────────────────
  if (session.step === 'BOOKING_SERVICE') {
    const service = SERVICE_MAP[clean]
    if (service) {
      updateSession(from, { step: 'BOOKING_BRANCH', service })
      await sendText(from, MSG.booking.askBranch(service))
    } else {
      await sendText(from, `⚠️ Please reply with a number 1–8\n\n` + MSG.booking.askService)
    }
    return
  }

  // ── BOOKING: SELECT BRANCH ────────────────────────────
  if (session.step === 'BOOKING_BRANCH') {
    const branch = MSG.branchNames[clean]
    if (branch) {
      updateSession(from, { step: 'BOOKING_NAME', branch })
      await sendText(from, MSG.booking.askName(branch))
    } else {
      await sendText(from, `⚠️ Please reply with a number 1–15\n\n` + MSG.booking.askBranch(session.service))
    }
    return
  }

  // ── BOOKING: ENTER NAME ───────────────────────────────
  if (session.step === 'BOOKING_NAME') {
    if (clean.length < 2) {
      await sendText(from, '⚠️ Please enter your full name (at least 2 characters).')
      return
    }
    updateSession(from, { step: 'BOOKING_PHONE', name: clean })
    await sendText(from, MSG.booking.askPhone(clean))
    return
  }

  // ── BOOKING: ENTER PHONE ──────────────────────────────
  if (session.step === 'BOOKING_PHONE') {
    const digits = clean.replace(/\D/g, '')
    if (!isValidPhone(digits)) {
      await sendText(from, '⚠️ Please enter a valid 10-digit Indian mobile number.\n\nExample: *9876543210*')
      return
    }
    updateSession(from, { step: 'BOOKING_DATE', phone: digits })
    await sendText(from, MSG.booking.askDate)
    return
  }

  // ── BOOKING: ENTER DATE ───────────────────────────────
  if (session.step === 'BOOKING_DATE') {
    const date = parseDate(clean)
    if (!date) {
      await sendText(from, '⚠️ Invalid date format.\n\nPlease use *DD/MM/YYYY*\nExample: *25/04/2025*\n\nOr type *TODAY* or *TOMORROW*')
      return
    }
    updateSession(from, { step: 'BOOKING_TIME', date })
    await sendText(from, MSG.booking.askTime)
    return
  }

  // ── BOOKING: ENTER TIME ───────────────────────────────
  if (session.step === 'BOOKING_TIME') {
    if (clean.length < 2) {
      await sendText(from, '⚠️ Please enter a time.\nExample: *10am* or *3pm* or *14:00*')
      return
    }
    updateSession(from, { step: 'BOOKING_CONFIRM', time: clean })
    const s = getSession(from)
    await sendText(from, MSG.booking.confirm({ ...s, time: clean }))
    return
  }

  // ── BOOKING: CONFIRM ──────────────────────────────────
  if (session.step === 'BOOKING_CONFIRM') {
    if (['yes','y','confirm','ok','okay','ha','haa'].includes(lower)) {

      const s = getSession(from)

      // 1. Confirm to patient
      await sendText(from, MSG.booking.confirmed(s))

      // 2. Alert staff
      await sendStaffAlert(MSG.staffAlert(s))

      // 3. Tag contact in WATI CRM
      await addTag(from, 'appointment_booked')
      await addTag(from, s.service.toLowerCase().replace(/\s/g, '_'))

      // 4. Update WATI contact attributes
      await updateContactAttributes(from, [
        { name: 'last_service',  value: s.service  },
        { name: 'last_branch',   value: s.branch   },
        { name: 'last_appt_date',value: s.date     },
        { name: 'last_appt_time',value: s.time     },
      ])

      // 5. Log booking
      logBooking(from, s)

      // 6. Reset
      resetSession(from)

    } else if (['edit','change','no','nope','n'].includes(lower)) {
      resetSession(from)
      await sendText(from, MSG.booking.askService)
      updateSession(from, { step: 'BOOKING_SERVICE' })

    } else if (['cancel','nahi','na'].includes(lower)) {
      await sendText(from, MSG.booking.cancelled)
      resetSession(from)
      updateSession(from, { step: 'MAIN' })

    } else {
      await sendText(from, '⚠️ Please reply:\n*YES* to confirm\n*EDIT* to change\n*CANCEL* to cancel')
    }
    return
  }

  // ── REPORT STATUS ─────────────────────────────────────
  if (session.step === 'REPORT_STATUS') {
    await sendText(from,
      `🔍 *Checking report for:* ${clean}\n\nOur team will send your report within a few minutes.\n\nFor immediate help:\n📞 +91 79 6969 0900\n🌐 www.usmanpuraimaging.com`
    )
    // Forward to staff to handle
    await sendStaffAlert(`📄 REPORT REQUEST\nFrom: ${from}\nID/Phone given: ${clean}\nPlease send their report.`)
    updateSession(from, { step: 'MAIN' })
    return
  }

  // ── HUMAN HANDOFF ─────────────────────────────────────
  if (session.step === 'HUMAN_HANDOFF') {
    // Forward message to staff
    await sendStaffAlert(`💬 PATIENT MESSAGE (needs human reply)\nFrom: ${from} (${userName})\nMessage: "${clean}"`)
    await sendText(from, `✅ Your message has been forwarded.\nOur team will reply shortly.\n\nUrgent? Call: 📞 *+91 79 6969 0900*`)
    return
  }

  // ── FALLBACK ──────────────────────────────────────────
  await sendText(from, MSG.fallback)
}

// ─── LOG BOOKING ──────────────────────────────────────────────
function logBooking(phone, session) {
  const b = {
    timestamp: new Date().toISOString(),
    patientWhatsApp: phone,
    name:    session.name,
    phone:   session.phone,
    service: session.service,
    branch:  session.branch,
    date:    session.date,
    time:    session.time,
    source:  'WhatsApp Bot (WATI)',
  }
  console.log('\n📝 ═══ NEW BOOKING LOGGED ═══')
  console.log(JSON.stringify(b, null, 2))
  console.log('════════════════════════════\n')
  // TODO: Add database/Google Sheets here
}

module.exports = { handleMessage }
