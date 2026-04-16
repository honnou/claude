import { calculateTotals } from './calculations.js'

export function exportAsJSON(formData) {
  const totals = calculateTotals(formData)
  const exportData = {
    exported_at: new Date().toISOString(),
    household: {
      adults: formData.adults,
      children: formData.children,
    },
    story: formData.story,
    guardianship: formData.guardianship,
    assets: {
      ...formData.assets,
      total_assets: totals.totalAssets,
    },
    liabilities: {
      ...formData.liabilities,
      total_liabilities: totals.totalLiabilities,
    },
    net_estate_value: totals.netEstate,
    current_estate_plan: formData.currentEstatePlan,
    distribution: formData.distribution,
    decision_making: formData.decisionMaking,
    polyamory_planning: formData.polyamory,
    taxes: formData.taxes,
    advisors: formData.advisors,
    special_considerations: formData.specialConsiderations,
    attorney_notes: formData.attorneyNotes,
  }

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  })
  downloadBlob(blob, `estate-planning-data-${dateStamp()}.json`)
}

export function exportAsText(formData, narrative) {
  const totals = calculateTotals(formData)
  const adult1 = formData.adults[0]
  const adult2 = formData.adults[1]
  const adult3 = formData.adults[2]

  const lines = [
    '═══════════════════════════════════════════════════════════',
    'ESTATE PLANNING INTAKE FORM',
    'Prepared: ' + new Date().toLocaleDateString(),
    '═══════════════════════════════════════════════════════════',
    '',
    '─── SECTION 1: HOUSEHOLD MEMBERS ───────────────────────',
    '',
    formatAdult('Adult 1', adult1),
    formatAdult('Adult 2', adult2),
    formatAdult('Adult 3', adult3),
    '',
    '─── SECTION 2: CHILDREN ────────────────────────────────',
    '',
    ...formData.children.map((c, i) => formatChild(`Child ${i + 1}`, c)),
    '',
    '─── SECTION 3: GUARDIANSHIP ────────────────────────────',
    '',
    `Primary Guardian: ${formData.guardianship.primaryGuardianName}`,
    `Alternate Guardian: ${formData.guardianship.alternateGuardianName}`,
    '',
    '─── SECTION 4: ASSETS ───────────────────────────────────',
    '',
    'Real Property:',
    ...formData.assets.realProperty.map(p =>
      `  ${p.address}, ${p.city}, ${p.state} — Value: ${formatCurrency(p.value)} / Mortgage: ${formatCurrency(p.mortgage)}`
    ),
    '',
    'Bank Accounts:',
    ...formData.assets.bankAccounts.map(a =>
      `  ${a.institution} (${a.accountType}) — Balance: ${formatCurrency(a.balance)}`
    ),
    '',
    `TOTAL ASSETS: ${formatCurrency(totals.totalAssets)}`,
    '',
    '─── SECTION 5: DEBTS & LIABILITIES ─────────────────────',
    '',
    `TOTAL LIABILITIES: ${formatCurrency(totals.totalLiabilities)}`,
    `NET ESTATE VALUE: ${formatCurrency(totals.netEstate)}`,
    '',
    '─── SECTION 7: DISTRIBUTION INTENTIONS ─────────────────',
    '',
    'Primary Beneficiaries:',
    ...formData.distribution.primaryBeneficiaries.map(b =>
      `  ${b.name} (${b.relationship}): ${b.percentage}%`
    ),
    '',
    '─── SECTION 9: POLYAMORY-SPECIFIC PLANNING ──────────────',
    '',
    `Relationship Structure: ${formData.polyamory.relationshipStructure}`,
    `Years Together: ${formData.polyamory.yearsTogethers}`,
    `Cohabitation: ${formData.polyamory.cohabitation}`,
    '',
    '─── SECTION 13: ATTORNEY NOTES ──────────────────────────',
    '',
    'Questions for Attorney:',
    formData.attorneyNotes.topQuestions,
    '',
    'Concerns:',
    formData.attorneyNotes.concerns,
    '',
  ]

  if (narrative) {
    lines.push(
      '═══════════════════════════════════════════════════════════',
      'FAMILY NARRATIVE',
      '═══════════════════════════════════════════════════════════',
      '',
      narrative,
      ''
    )
  }

  const content = lines.join('\n')
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  downloadBlob(blob, `estate-planning-${dateStamp()}.txt`)
}

export function exportNarrativeAsPDF(narrative, formData) {
  // Dynamically import jsPDF to avoid bundle issues
  import('jspdf').then(({ jsPDF }) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' })
    const margin = 72
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const contentWidth = pageWidth - margin * 2
    const lineHeight = 16
    let y = margin

    // Header
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.setTextColor(109, 40, 217) // primary-700
    doc.text('Family Estate Planning Narrative', margin, y)
    y += 30

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Prepared: ${new Date().toLocaleDateString()}`, margin, y)
    y += 25

    doc.setDrawColor(200, 200, 200)
    doc.line(margin, y, pageWidth - margin, y)
    y += 20

    // Narrative body
    doc.setFont('times', 'normal')
    doc.setFontSize(12)
    doc.setTextColor(30, 30, 30)

    const paragraphs = narrative.split('\n\n')
    for (const para of paragraphs) {
      if (!para.trim()) continue

      // Section headings
      if (para.startsWith('## ')) {
        y += 10
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(14)
        doc.setTextColor(109, 40, 217)
        doc.text(para.replace(/^## /, ''), margin, y)
        y += lineHeight + 6
        doc.setFont('times', 'normal')
        doc.setFontSize(12)
        doc.setTextColor(30, 30, 30)
        continue
      }

      // Bulleted list block: every line starts with `- `
      const paraLines = para.split('\n').filter(l => l.trim())
      if (paraLines.length > 1 && paraLines.every(l => l.trim().startsWith('- '))) {
        for (const item of paraLines) {
          const text = item.replace(/^- /, '').trim()
          const wrapped = doc.splitTextToSize(text, contentWidth - 16)
          for (let li = 0; li < wrapped.length; li++) {
            if (y + lineHeight > pageHeight - margin) { doc.addPage(); y = margin }
            if (li === 0) doc.text('•', margin, y)
            doc.text(wrapped[li], margin + 16, y)
            y += lineHeight
          }
        }
        y += 8
        continue
      }

      const lines = doc.splitTextToSize(para.trim(), contentWidth)
      for (const line of lines) {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage()
          y = margin
        }
        doc.text(line, margin, y)
        y += lineHeight
      }
      y += 8 // paragraph gap
    }

    doc.save(`estate-planning-narrative-${dateStamp()}.pdf`)
  })
}

// ── Helpers ────────────────────────────────────────────────────

function formatAdult(label, adult) {
  if (!adult || !adult.firstName) return `${label}: (not provided)`
  return [
    `${label}: ${adult.firstName} ${adult.lastName}`,
    `  DOB: ${adult.dob || '—'}   Phone: ${adult.phone || '—'}   Email: ${adult.email || '—'}`,
    `  Address: ${adult.address}, ${adult.city}, ${adult.state} ${adult.zip}`,
    `  Role: ${adult.relationshipRole || '—'}`,
    '',
  ].join('\n')
}

function formatChild(label, child) {
  if (!child || !child.firstName) return `${label}: (not provided)\n`
  return [
    `${label}: ${child.firstName} ${child.lastName}`,
    `  DOB: ${child.dob || '—'}`,
    `  Biological Parents: ${child.biologicalParent1 || '—'} & ${child.biologicalParent2 || '—'}`,
    `  Legal Guardian: ${child.legalGuardian || '—'}`,
    '',
  ].join('\n')
}

export function formatCurrency(val) {
  const num = parseFloat(String(val).replace(/[^0-9.-]/g, ''))
  if (isNaN(num)) return '$0'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num)
}

function dateStamp() {
  return new Date().toISOString().slice(0, 10)
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
