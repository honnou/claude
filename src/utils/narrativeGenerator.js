import { calculateTotals, formatCurrency } from './calculations.js'

function getAge(dob) {
  if (!dob) return null
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

function fullName(adult) {
  if (!adult) return 'unnamed partner'
  const first = adult.firstName || ''
  const last = adult.lastName || ''
  return (first + ' ' + last).trim() || 'unnamed partner'
}

function childFullName(child) {
  if (!child) return 'their child'
  const first = child.firstName || ''
  const last = child.lastName || ''
  return (first + ' ' + last).trim() || 'their child'
}

function location(adult) {
  if (!adult) return 'their home'
  if (adult.city && adult.state) return `${adult.city}, ${adult.state}`
  if (adult.state) return adult.state
  return 'their community'
}

function incomeDescription(formData) {
  const { taxes } = formData
  const incomes = [
    parseFloat(String(taxes.adult1Income || '').replace(/[^0-9.]/g, '')) || 0,
    parseFloat(String(taxes.adult2Income || '').replace(/[^0-9.]/g, '')) || 0,
    parseFloat(String(taxes.adult3Income || '').replace(/[^0-9.]/g, '')) || 0,
  ]
  const combined = incomes.reduce((a, b) => a + b, 0)
  if (combined > 0) return formatCurrency(combined)
  return null
}

export function generateNarrative(formData) {
  const a1 = formData.adults[0] || {}
  const a2 = formData.adults[1] || {}
  const a3 = formData.adults[2] || {}
  const n1 = fullName(a1)
  const n2 = fullName(a2)
  const n3 = fullName(a3)
  const age1 = getAge(a1.dob)
  const age2 = getAge(a2.dob)
  const age3 = getAge(a3.dob)

  const children = (formData.children || []).filter(c => c.firstName)
  const child = children[0] || null
  const childName = child ? childFullName(child) : null
  const childAge = child ? getAge(child.dob) : null

  const poly = formData.polyamory || {}
  const years = poly.yearsTogethers || null
  const structure = poly.relationshipStructure || 'triad'
  const cohabiting = poly.cohabitation === 'yes' || poly.cohabitation === true
  const story = poly.relationshipStory || ''
  const whyPoly = poly.whyPolyamory || ''
  const dayToDay = poly.dayToDayLife || ''
  const whyPlanning = poly.whyEstatePlanning || ''
  const breakupPlan = poly.breakupContingencyPlan || ''

  const totals = calculateTotals(formData)
  const hasAssets = totals.totalAssets > 0
  const hasDebts = totals.totalLiabilities > 0
  const combinedIncome = incomeDescription(formData)

  const realProps = (formData.assets?.realProperty || []).filter(p => p.address || p.value)
  const businesses = (formData.assets?.businessInterests || []).filter(b => b.name)
  const hasPrimaryHome = realProps.length > 0

  const guardianship = formData.guardianship || {}
  const primaryGuardian = guardianship.primaryGuardianName || null
  const alternateGuardian = guardianship.alternateGuardianName || null

  const dist = formData.distribution || {}
  const primaryBeneficiaries = (dist.primaryBeneficiaries || []).filter(b => b.name)
  const specificBequests = (dist.specificBequests || []).filter(b => b.item && b.recipient)

  const dm = formData.decisionMaking || {}
  const currentPlan = formData.currentEstatePlan || {}
  const specialNotes = formData.specialConsiderations || {}
  const attorneyNotes = formData.attorneyNotes || {}

  const documentsWanted = (attorneyNotes.documentsWanted || [])
  const hasExistingDocuments = currentPlan.hasWill === 'yes' || currentPlan.hasTrust === 'yes'

  // Build sections
  const parts = []

  // ── OPENING ────────────────────────────────────────────────
  parts.push(`## Our Family`)

  let opening = `We are ${n1}`
  if (a1.dob && age1) opening += ` (${age1})`
  opening += `, ${n2}`
  if (a2.dob && age2) opening += ` (${age2})`
  opening += `, and ${n3}`
  if (a3.dob && age3) opening += ` (${age3})`
  opening += `—a ${structure} living `
  opening += cohabiting ? `together in ${location(a1)}` : `in ${location(a1)}`
  opening += `. `

  if (years) {
    opening += `Our family has taken shape over the past ${years} year${parseInt(years) !== 1 ? 's' : ''}. `
  }

  if (childName) {
    opening += `We are the parents of ${childName}`
    if (childAge !== null) opening += `, who is ${childAge} year${childAge !== 1 ? 's' : ''} old`
    opening += `. Our household is built on mutual commitment, shared values, and an intentional approach to the life we are creating together. `
  } else {
    opening += `Our household is built on mutual commitment, shared values, and an intentional approach to the life we are creating together. `
  }

  parts.push(opening)

  let opening2 = `${n1}, ${n2}, and ${n3} each bring their own history, strengths, and vision to this family. `
  if (cohabiting) {
    opening2 += `We share a home and, with it, the day-to-day rhythms that define a life built together. `
  }
  opening2 += `We are not a family that fits neatly into the categories our legal system was designed for—and that fact is precisely what has brought us here: to be intentional about protecting one another, and the people we love, in ways the law will not do for us automatically.`

  parts.push(opening2)

  // ── JOURNEY ────────────────────────────────────────────────
  parts.push(`## Our Story`)

  if (story) {
    parts.push(story)
  } else {
    let journeyPara = `Our relationship did not happen by accident. Each of us made a conscious choice—not just to love, but to commit: to build something lasting and to stand accountable for one another's wellbeing. `
    if (structure && structure !== 'triad') {
      journeyPara += `Our relationship structure, which we describe as a ${structure}, reflects the specific ways we have defined our commitments and responsibilities. `
    } else {
      journeyPara += `As a triad, we have defined our commitments and responsibilities together, in ways that reflect who we actually are rather than defaulting to inherited models. `
    }
    parts.push(journeyPara)
  }

  if (whyPoly) {
    parts.push(whyPoly)
  } else {
    parts.push(
      `Polyamory, for us, is not a rejection of commitment—it is a different shape of it. We have chosen a family structure that requires more explicit conversation, more deliberate planning, and more honest communication than many people ever have with the people they love. That intentionality is one of our family's greatest assets.`
    )
  }

  if (dayToDay) {
    parts.push(dayToDay)
  } else if (cohabiting && childName) {
    parts.push(
      `Day to day, our life looks much like any family's: meals together, school runs${childName ? ` for ${childName}` : ''}, work, errands, and the ordinary texture of a shared household. What sets us apart is not the content of our days but the framework we have built to hold them—a framework we are now formalizing through estate planning.`
    )
  }

  // ── WHY ESTATE PLANNING ────────────────────────────────────
  parts.push(`## Why Estate Planning Matters for Our Family`)

  if (whyPlanning) {
    parts.push(whyPlanning)
  }

  parts.push(
    `The American legal system was designed around a narrow definition of family: two married adults and their biological children. Every default rule in estate law—who inherits when someone dies without a will, who has authority to make medical decisions, who can remain in the family home—flows from that assumption. Our family does not fit that definition, and without careful planning, the law's defaults would work directly against us.`
  )

  let legalGaps = `Consider what happens if ${n1} dies tomorrow without any estate planning documents in place. `
  if (childName) {
    legalGaps += `${childName}'s future would be left to a probate court that does not recognize the full picture of our family. `
  }
  legalGaps += `${n2} and ${n3}, regardless of how long they have lived together and how deeply they are woven into one another's lives, would have no automatic legal standing. A hospital could refuse to share medical information with them. Financial institutions could freeze accounts. `
  if (hasPrimaryHome) {
    legalGaps += `The family home could become subject to legal claims from biological relatives who have had no role in this household. `
  }
  legalGaps += `None of this reflects what any of us would want—but without legal documentation, our wishes simply do not exist in the eyes of the law.`
  parts.push(legalGaps)

  parts.push(
    `This is not a hypothetical risk. It is a predictable outcome whenever a non-traditional family leaves planning undone. The good news is that the tools to address these gaps exist. Wills, trusts, healthcare directives, powers of attorney, HIPAA authorizations, and beneficiary designations are all legal instruments that allow us to override the law's defaults and put our own intentions in their place. That is exactly what we are here to do.`
  )

  // ── OUR SITUATION ──────────────────────────────────────────
  parts.push(`## Our Current Situation`)

  let situation = `As a household, `
  if (combinedIncome) {
    situation += `we have a combined annual income of approximately ${combinedIncome}. `
  }

  if (hasAssets) {
    situation += `Our assets include `
    const assetParts = []
    if (hasPrimaryHome && realProps.length === 1) {
      const p = realProps[0]
      if (p.value) assetParts.push(`a home valued at approximately ${formatCurrency(p.value)}`)
      else assetParts.push(`real property`)
    } else if (realProps.length > 1) {
      assetParts.push(`${realProps.length} real properties with a combined value of approximately ${formatCurrency(totals.realPropertyTotal)}`)
    }
    if (totals.bankTotal > 0) assetParts.push(`bank and liquid accounts totaling ${formatCurrency(totals.bankTotal)}`)
    if (totals.retirementTotal > 0) assetParts.push(`retirement savings of ${formatCurrency(totals.retirementTotal)}`)
    if (totals.investmentTotal > 0) assetParts.push(`investment accounts totaling ${formatCurrency(totals.investmentTotal)}`)
    if (businesses.length > 0) assetParts.push(`${businesses.length === 1 ? 'a business interest' : `${businesses.length} business interests`}`)
    if (assetParts.length > 0) {
      situation += assetParts.join(', ') + `. `
    }
    if (hasDebts) {
      situation += `Against these assets, we carry liabilities of ${formatCurrency(totals.totalLiabilities)}, leaving a net estate of approximately ${formatCurrency(totals.netEstate)}. `
    } else {
      situation += `Our total asset base is approximately ${formatCurrency(totals.totalAssets)}. `
    }
  }

  if (situation.length > 30) parts.push(situation)

  if (hasExistingDocuments) {
    let existingDocs = `We do have some estate planning documents already in place. `
    if (currentPlan.hasWill === 'yes') existingDocs += `All or some of us have existing wills. `
    if (currentPlan.hasTrust === 'yes') existingDocs += `We have a trust established. `
    if (currentPlan.lastReviewedDate) existingDocs += `These documents were last reviewed in ${currentPlan.lastReviewedDate}. `
    if (currentPlan.currentIssues) {
      existingDocs += `However, we have identified the following concerns: ${currentPlan.currentIssues} `
    } else {
      existingDocs += `These documents predate our current family structure and do not reflect our intentions as a triad. Our goal is to review, update, and supplement them to fully protect our family. `
    }
    parts.push(existingDocs)
  } else {
    parts.push(
      `We do not currently have comprehensive estate planning documents in place. This means that right now, each of us is operating under the law's defaults—which, as described above, do not reflect our family or our wishes. Addressing this gap is urgent.`
    )
  }

  // Specific vulnerability
  let vulnerability = `The most pressing vulnerability in our current situation is clear: `
  if (childName) {
    vulnerability += `if any one of us were to die or become incapacitated today, ${childName}'s care and financial security would be in legal limbo. `
    if (primaryGuardian) {
      vulnerability += `We have identified ${primaryGuardian} as our preferred guardian${alternateGuardian ? ` and ${alternateGuardian} as the alternate` : ''}—but without legal documentation, those preferences have no force. `
    }
  } else {
    vulnerability += `if any one of us were to die or become incapacitated today, the surviving partners would have no automatic legal authority over finances, healthcare decisions, or shared property. `
  }
  vulnerability += `Estate planning closes these gaps.`
  parts.push(vulnerability)

  // ── OUR PLAN ───────────────────────────────────────────────
  parts.push(`## Our Plan`)

  let planIntro = `We are working with an estate planning attorney to put the following legal framework in place: `
  const docsList = []

  if (documentsWanted.length > 0) {
    docsList.push(...documentsWanted)
  } else {
    docsList.push(
      `Wills for ${n1}, ${n2}, and ${n3}`,
      `Healthcare Powers of Attorney for each adult`,
      `Durable Financial Powers of Attorney for each adult`,
      `HIPAA Authorizations naming all three partners`,
      `Advance Healthcare Directives for each adult`,
    )
    if (childName) docsList.push(`Formal Guardianship Designations for ${childName}`)
    if (businesses.length > 0) docsList.push(`Business Succession Planning`)
    if (hasPrimaryHome) docsList.push(`Real Property Title Review`)
    docsList.push(`Beneficiary Designation Updates on all accounts, retirement funds, and insurance policies`)
  }

  planIntro += docsList.map(d => `\n  • ${d}`).join('')
  parts.push(planIntro)

  if (primaryBeneficiaries.length > 0) {
    let distPara = `Our distribution intentions are clear. `
    const benefList = primaryBeneficiaries
      .filter(b => b.name && b.percentage)
      .map(b => `${b.name} (${b.percentage}%)`)
    if (benefList.length > 0) {
      distPara += `We intend to leave our estates to ${benefList.join(', ')}. `
    }
    if (specificBequests.length > 0) {
      distPara += `We have also identified specific bequests: `
      distPara += specificBequests.map(b => `${b.item} to ${b.recipient}`).join('; ')
      distPara += `. `
    }
    parts.push(distPara)
  }

  if (childName) {
    let guardPara = `For ${childName}, our guardianship plan is as follows: `
    if (primaryGuardian) {
      guardPara += `${primaryGuardian} would serve as primary guardian`
      if (alternateGuardian) guardPara += `, with ${alternateGuardian} as alternate`
      guardPara += `. `
    }
    guardPara += `We want to ensure that ${childName}'s upbringing remains consistent with the values and environment we have created together—and that the transition, if it ever becomes necessary, is as stable and loving as possible.`
    parts.push(guardPara)
  }

  if (breakupPlan) {
    parts.push(`We have also thought carefully about what happens to our shared assets and co-parenting arrangements in the event our relationship structure changes. ${breakupPlan}`)
  }

  // ── CLOSING ────────────────────────────────────────────────
  parts.push(`## Looking Forward`)

  let closing1 = `This estate plan gives us something that no amount of love alone can provide: legal certainty. It transforms our intentions—which have always been clear to us—into enforceable documents that the legal system cannot ignore. `
  closing1 += `When we leave this attorney's office with our documents signed, ${n1}, ${n2}, and ${n3} will each know that the people they love are protected. `
  if (childName) {
    closing1 += `${childName} will have a clear, legally documented plan for their care and financial security, regardless of what life brings. `
  }
  parts.push(closing1)

  parts.push(
    `There is something worth naming in what we are doing here. Polyamorous families who take estate planning seriously are modeling something important: that intentional family structures require intentional legal infrastructure. We are not waiting for the law to catch up to our family. We are using the tools that exist right now to build the protections our family deserves. That is not just responsible—it is an act of love.`
  )

  if (specialNotes.other || specialNotes.healthIssues || attorneyNotes.concerns) {
    const noteText = specialNotes.other || specialNotes.healthIssues || attorneyNotes.concerns
    parts.push(`We approach this process with open eyes. ${noteText}`)
  }

  parts.push(
    `We are ready. Our family is real, our commitments are real, and—as of this planning process—our legal protections will be real too.`
  )

  return parts.join('\n\n')
}
