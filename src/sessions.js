// ═══════════════════════════════════════════════════════════════
// SESSION MANAGER
// Remembers where each user is in the conversation
// ═══════════════════════════════════════════════════════════════

const sessions = new Map()

const freshSession = () => ({
  step:         'MAIN',
  service:      null,
  branch:       null,
  name:         null,
  phone:        null,
  date:         null,
  time:         null,
  lastActivity: Date.now(),
})

function getSession(phone) {
  if (!sessions.has(phone)) {
    sessions.set(phone, freshSession())
  }
  const s = sessions.get(phone)
  s.lastActivity = Date.now()
  return s
}

function updateSession(phone, updates) {
  const s = getSession(phone)
  Object.assign(s, updates)
  sessions.set(phone, s)
}

function resetSession(phone) {
  sessions.set(phone, freshSession())
}

// Auto-clean sessions older than 2 hours
setInterval(() => {
  const TWO_HOURS = 2 * 60 * 60 * 1000
  const now = Date.now()
  for (const [phone, s] of sessions.entries()) {
    if (now - s.lastActivity > TWO_HOURS) sessions.delete(phone)
  }
}, 30 * 60 * 1000)

module.exports = { getSession, updateSession, resetSession }
