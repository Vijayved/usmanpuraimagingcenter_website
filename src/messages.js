// ═══════════════════════════════════════════════════════════════
// UIC BOT MESSAGES
// Edit this file to change what the bot says
// ═══════════════════════════════════════════════════════════════

const MSG = {

  welcome: (name) => `🏥 *Welcome to Usmanpura Imaging Centre!*
Hello ${name ? name : 'there'}! 👋

Gujarat's Most Trusted Diagnostic Chain since 1985.

✅ 40+ Years Experience
✅ 15 Centres Across Gujarat
✅ Open 24 Hours / 7 Days
✅ NABH Certified
⭐ 7,158+ Google Reviews

Reply with a number:

1️⃣ Book an Appointment
2️⃣ Our Services & Info
3️⃣ Find Nearest Branch
4️⃣ Report / Download Results
5️⃣ Talk to Our Team
0️⃣ Main Menu (anytime)`,

  mainMenu: `📋 *UIC Main Menu*

1️⃣ Book an Appointment
2️⃣ Our Services & Info
3️⃣ Find Nearest Branch
4️⃣ Report / Download Results
5️⃣ Talk to Our Team
0️⃣ Back to this Menu`,

  servicesMenu: `🔬 *Our Diagnostic Services*

Reply with a number:

1️⃣ MRI Scan
2️⃣ CT Scan
3️⃣ Sonography / Ultrasound
4️⃣ Colour Doppler
5️⃣ Digital X-Ray (DR)
6️⃣ Dexa Scan (Bone Density)
7️⃣ Mammography
8️⃣ Blood Test / Pathology

0️⃣ Back to Main Menu`,

  services: {
    mri: `🧲 *MRI Scan — Usmanpura Imaging*

Available for:
• Brain & Head MRI
• Spine (Cervical / Lumbar / Thoracic)
• Knee, Shoulder & Joint MRI
• Abdominal & Pelvic MRI
• Cardiac MRI
• Whole Body MRI

⏱ Duration: 30–60 minutes
📋 Reports: Same-day digital delivery
📍 Available: Usmanpura, Bapunagar, Maninagar, Satellite, Gandhinagar

💬 Reply *BOOK* to book an MRI
📞 Call: +91 79 6969 0900
0️⃣ Back to Menu`,

    ct: `🔬 *CT Scan — Usmanpura Imaging*

Available for:
• CT Head / Brain
• HRCT Chest (COVID, ILD, Lungs)
• CT Abdomen & Pelvis
• CT Angiography (Heart, Carotid)
• CT KUB (Kidney stones)
• CT Spine

⏱ Duration: 15–30 minutes
📋 Reports: Within 2 hours
📍 Available: Usmanpura, Bapunagar, Maninagar, Satellite

💬 Reply *BOOK* to book a CT Scan
📞 Call: +91 79 6969 0900
0️⃣ Back to Menu`,

    sono: `🔊 *Sonography / Ultrasound — UIC*

Available for:
• Abdominal Sonography
• Obstetric / Pregnancy Scan
• 4D Baby Scan
• Pelvic Sonography
• Thyroid Ultrasound
• Musculoskeletal USG

⏱ Duration: 20–45 minutes
📋 Reports: Same-day
📍 Available: All 15 branches

💬 Reply *BOOK* to book Sonography
📞 Call: +91 79 6969 0900
0️⃣ Back to Menu`,

    doppler: `❤️ *Colour Doppler — UIC*

Available for:
• Carotid Doppler
• Peripheral Vascular Doppler
• Renal Doppler
• DVT Detection
• Obstetric Doppler

⏱ Duration: 30–45 minutes
📋 Reports: Same-day
📍 Available: Usmanpura, Bapunagar, Maninagar

💬 Reply *BOOK* to book Colour Doppler
0️⃣ Back to Menu`,

    xray: `☢️ *Digital X-Ray (DR) — UIC*

Available for:
• Chest X-Ray
• Bone X-Ray (all areas)
• Spine X-Ray
• Pelvis / Hip X-Ray
• Skull & Dental X-Ray
• Abdomen X-Ray

⏱ Duration: 10–15 minutes
📋 Reports: *Same-hour* digital delivery!
✅ Walk-in available at all branches
📍 Available: All 15 branches

💬 Reply *BOOK* to book X-Ray
0️⃣ Back to Menu`,

    dexa: `🦴 *Dexa Scan — UIC*

Bone Mineral Density Testing:
• Full Body Bone Density
• Lumbar Spine Density
• Hip Bone Density
• Body Composition Analysis
• Osteoporosis Screening

⏱ Duration: 10–20 minutes
📋 Reports: Same-day
✅ Very low radiation — extremely safe

💬 Reply *BOOK* to book Dexa Scan
0️⃣ Back to Menu`,

    mammo: `🎗️ *Mammography — UIC*

Breast Cancer Screening:
• Bilateral Mammography
• Diagnostic Mammography
• Guided Biopsy (select centres)
• Recommended annually for women 40+

⏱ Duration: 10–20 minutes
📋 Reports: Same-day
✅ Female radiographers available

💬 Reply *BOOK* to book Mammography
0️⃣ Back to Menu`,

    blood: `🧪 *Blood Test / Pathology — UIC*

NABH-Certified Lab Tests:
• Complete Blood Count (CBC)
• Lipid Profile
• Thyroid (T3, T4, TSH)
• Liver Function Test (LFT)
• Kidney Function Test (KFT)
• Diabetes (HbA1c, Fasting Sugar)
• Vitamin B12 & D3
• Full Health Packages

⏱ Duration: 5–10 minutes
📋 Reports: Same-day digital
✅ Home collection available

💬 Reply *BOOK* to book Blood Test
0️⃣ Back to Menu`,
  },

  branchMenu: `📍 *Our 15 Branches — Find Nearest*

*─── Ahmedabad ───*
1️⃣  Usmanpura (Head Office)
2️⃣  Bapunagar
3️⃣  Maninagar
4️⃣  Satellite
5️⃣  Sabarmati
6️⃣  Naroda
7️⃣  Juhapura
8️⃣  Vadaj
9️⃣  Bareja

*─── Other Cities ───*
🔟  Gandhinagar – Sector 6
1️⃣1️⃣ Patan – Subhadra Nagar
1️⃣2️⃣ Nadiad
1️⃣3️⃣ Anand
1️⃣4️⃣ Mavdi, Rajkot
1️⃣5️⃣ Morbi

0️⃣ Back to Main Menu`,

  branches: {
    '1':  `📍 *Usmanpura — HEAD OFFICE* 🏥\n\nAmbica Society 30, Vishwa Kosh Marg,\nOpp. Usmanpura Garden, Shanti Nagar,\nAhmedabad – 380013\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours / 7 Days\n🗺 https://maps.google.com/?q=Usmanpura+Imaging+Centre+Ahmedabad\n\n✅ MRI • CT Scan • Sonography • Doppler • X-Ray • Dexa • Mammography • Blood Test\n\nReply *BOOK* to book here`,
    '2':  `📍 *Bapunagar Branch* ⭐ 5.0 (7,158 reviews)\n\nBlock C, Pushkar Business Park,\nL.B Shashtri Marg, Bapunagar,\nAhmedabad – 380024\n\n📞 +91 79 6969 0923\n🕐 Open 24 Hours\n🗺 https://maps.google.com/?q=Usmanpura+Imaging+Bapunagar\n\n✅ MRI • CT Scan • Sonography • X-Ray • Blood Test\n\nReply *BOOK* to book here`,
    '3':  `📍 *Maninagar Branch*\n\nGround Floor, East Brook Square,\nOpp. Shreeji Dairy, Opp. Kalupur Commercial Bank,\nNear Jawahar Chauk, Maninagar – 380043\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n🗺 https://maps.google.com/?q=Usmanpura+Imaging+Maninagar\n\n✅ MRI • CT Scan • Sonography • X-Ray • Blood Test\n\nReply *BOOK* to book here`,
    '4':  `📍 *Satellite Branch*\n\nGround Floor, Ambika House,\nSatellite Marg, Near Star Bazar,\nOpp. Sundervan, Ahmedabad – 380015\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n🗺 https://maps.google.com/?q=Usmanpura+Imaging+Satellite\n\n✅ CT Scan • Sonography • X-Ray • Blood Test\n\nReply *BOOK* to book here`,
    '5':  `📍 *Sabarmati Branch*\n\nBlock 2, Saraswati Shopping Centre, 1st Floor,\nShop No. 9-17, Opp. Vijay Sales,\nNear ONGC Bhavan & Visat Circle – 380005\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n\n✅ Sonography • X-Ray • Blood Test\n\nReply *BOOK* to book here`,
    '6':  `📍 *Naroda Branch*\n\nGround Floor, City Centre Arcade,\nNaroda Patiya, Near SRP Camp,\nAhmedabad – 382345\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n\n✅ Sonography • X-Ray • Blood Test\n\nReply *BOOK* to book here`,
    '7':  `📍 *Juhapura Branch*\n\nFF-1, Medplus Commercial Complex,\nOpp. Amber Tower, Next to Arshad Park,\nMakaraba Juhapura, Sarkhej Road – 380055\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n\n✅ Sonography • X-Ray • Blood Test\n\nReply *BOOK* to book here`,
    '8':  `📍 *Vadaj Branch*\n\nDream Square, Opp. Rampir Temple,\nNear Vadaj Bus Stand,\nVadaj, Ahmedabad – 380013\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n\n✅ Sonography • X-Ray • Blood Test\n\nReply *BOOK* to book here`,
    '9':  `📍 *Bareja Branch*\n\nGround Floor, Shop No-1, Ananta Heights,\nOpp. Shiv Kunj Society,\nOld Ahmedabad Road (National Heritage Road) – 382425\n\n📞 +91 88646 79794 / +91 46094 9487\n🕐 Open 24 Hours\n\n✅ Sonography • X-Ray • Blood Test\n\nReply *BOOK* to book here`,
    '10': `📍 *Gandhinagar — Sector 6*\n\nImaging Centre Sector-6,\nGandhinagar, Gujarat\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n\n✅ MRI • CT Scan • Sonography • X-Ray\n\nReply *BOOK* to book here`,
    '11': `📍 *Patan — Subhadra Nagar*\n\nImaging Centre Subhadra Nagar,\nPatan, Gujarat\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n\n✅ Sonography • X-Ray • Blood Test\n\nReply *BOOK* to book here`,
    '12': `📍 *Nadiad Branch*\n\nImaging Centre Nadiad, Gujarat\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n\nReply *BOOK* to book here`,
    '13': `📍 *Anand Branch*\n\nImaging Centre Anand, Gujarat\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n\nReply *BOOK* to book here`,
    '14': `📍 *Mavdi, Rajkot Branch*\n\nImaging Centre Mavdi, Rajkot, Gujarat\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n\nReply *BOOK* to book here`,
    '15': `📍 *Morbi Branch*\n\nImaging Centre Morbi, Gujarat\n\n📞 +91 79 6969 0900\n🕐 Open 24 Hours\n\nReply *BOOK* to book here`,
  },

  branchNames: {
    '1':'Usmanpura (HQ)', '2':'Bapunagar', '3':'Maninagar',
    '4':'Satellite', '5':'Sabarmati', '6':'Naroda',
    '7':'Juhapura', '8':'Vadaj', '9':'Bareja',
    '10':'Gandhinagar – Sector 6', '11':'Patan – Subhadra Nagar',
    '12':'Nadiad', '13':'Anand', '14':'Mavdi Rajkot', '15':'Morbi',
  },

  booking: {
    askService: `📅 *Book an Appointment*

Which service do you need?

1️⃣ MRI Scan
2️⃣ CT Scan
3️⃣ Sonography
4️⃣ Colour Doppler
5️⃣ Digital X-Ray
6️⃣ Dexa Scan
7️⃣ Mammography
8️⃣ Blood Test

0️⃣ Back to Main Menu`,

    askBranch: (service) => `✅ *${service}* selected!

📍 Which branch is nearest to you?

1️⃣  Usmanpura (HQ)
2️⃣  Bapunagar
3️⃣  Maninagar
4️⃣  Satellite
5️⃣  Sabarmati
6️⃣  Naroda
7️⃣  Juhapura
8️⃣  Vadaj
9️⃣  Bareja
🔟  Gandhinagar
1️⃣1️⃣ Patan
1️⃣2️⃣ Nadiad
1️⃣3️⃣ Anand
1️⃣4️⃣ Rajkot
1️⃣5️⃣ Morbi

0️⃣ Back`,

    askName:  (branch) => `✅ *Branch: ${branch}*\n\nPlease type your *full name* 👇`,
    askPhone: (name)   => `✅ *Name: ${name}*\n\nPlease type your *10-digit mobile number* 👇`,
    askDate:  `📅 *What date would you prefer?*\n\nType the date like: *DD/MM/YYYY*\nExample: *25/04/2025*\n\nOr type *TODAY* or *TOMORROW*`,
    askTime:  `🕐 *What time would you prefer?*\n\nAvailable slots (Open 24 hours):\n• Morning: 7am, 8am, 9am, 10am, 11am\n• Afternoon: 12pm, 1pm, 2pm, 3pm, 4pm\n• Evening: 5pm, 6pm, 7pm, 8pm\n• Night: Available for emergencies\n\nType your preferred time (e.g. *10am*)`,

    confirm: (d) => `📋 *Please Confirm Your Appointment*

🏥 Usmanpura Imaging Centre
📍 Branch: ${d.branch}
🔬 Service: ${d.service}
👤 Name: ${d.name}
📞 Phone: ${d.phone}
📅 Date: ${d.date}
🕐 Time: ${d.time}

Reply:
✅ *YES* — Confirm booking
✏️ *EDIT* — Start over
❌ *CANCEL* — Cancel`,

    confirmed: (d) => `🎉 *Appointment Confirmed!*

🏥 *Usmanpura Imaging Centre*
📍 ${d.branch}
🔬 ${d.service}
📅 ${d.date} at ${d.time}

📌 *Please remember:*
• Bring your doctor's prescription
• Arrive 10 minutes early
• Carry any previous reports

📞 Changes/queries: *+91 79 6969 0900*
💬 WhatsApp: *+91 97255 04245*

Our team will call to confirm shortly.
Thank you for choosing UIC! 🙏`,

    cancelled: `❌ Appointment cancelled.\n\nReply *1* to book again\nReply *0* for Main Menu`,
  },

  reportStatus: `📄 *Report Status / Download*

Please share your:
• *Patient ID* (given at centre), OR
• *Mobile number* used at registration

Type it below 👇

For immediate help:
📞 +91 79 6969 0900
🌐 www.usmanpuraimaging.com`,

  connectTeam: `👨‍💼 *Connecting you to our team...*

A team member will respond shortly.
⏳ Response time: 2–5 minutes (during working hours)

For *urgent / emergency*:
📞 *+91 79 6969 0900* (24/7)

📧 help@usmanpuraimaging.com
🌐 www.usmanpuraimaging.com`,

  fallback: `Sorry, I didn't understand that. 🙏

Please reply with a number:

1️⃣ Book Appointment
2️⃣ Services
3️⃣ Find Branch
4️⃣ Report Status
5️⃣ Talk to Team
0️⃣ Main Menu`,

  staffAlert: (d) => `🔔 *NEW BOOKING — UIC Bot*

👤 Name: ${d.name}
📞 Patient Phone: ${d.phone}
🔬 Service: ${d.service}
📍 Branch: ${d.branch}
📅 Date: ${d.date}
🕐 Time: ${d.time}
📲 Booked via: WhatsApp Bot

⚡ Please call patient to reconfirm.`,
}

const SERVICE_MAP = {
  '1': 'MRI Scan', '2': 'CT Scan', '3': 'Sonography',
  '4': 'Colour Doppler', '5': 'Digital X-Ray',
  '6': 'Dexa Scan', '7': 'Mammography', '8': 'Blood Test',
}

module.exports = { MSG, SERVICE_MAP }
