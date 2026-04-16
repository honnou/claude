function parseNum(val) {
  if (!val) return 0
  const cleaned = String(val).replace(/[$,\s]/g, '')
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}

export function calculateTotals(formData) {
  const assets = formData.assets || {}
  const liabilities = formData.liabilities || {}

  // Sum real property values
  const realPropertyTotal = (assets.realProperty || []).reduce((sum, p) => sum + parseNum(p.value), 0)

  // Sum bank accounts
  const bankTotal = (assets.bankAccounts || []).reduce((sum, a) => sum + parseNum(a.balance), 0)

  // Sum investment accounts
  const investmentTotal = (assets.investmentAccounts || []).reduce((sum, a) => sum + parseNum(a.balance), 0)

  // Sum retirement accounts
  const retirementTotal = (assets.retirementAccounts || []).reduce((sum, a) => sum + parseNum(a.balance), 0)

  // Sum life insurance (face values)
  const insuranceTotal = (assets.lifeInsurance || []).reduce((sum, a) => sum + parseNum(a.faceValue), 0)

  // Sum business interests
  const businessTotal = (assets.businessInterests || []).reduce((sum, a) => sum + parseNum(a.estimatedValue), 0)

  // Sum vehicles
  const vehicleTotal = (assets.vehicles || []).reduce((sum, a) => sum + parseNum(a.value), 0)

  // Sum other assets
  const otherAssetTotal = (assets.otherAssets || []).reduce((sum, a) => sum + parseNum(a.value), 0)

  const totalAssets = realPropertyTotal + bankTotal + investmentTotal + retirementTotal +
    businessTotal + vehicleTotal + otherAssetTotal

  // Note: insurance is separate (death benefit, not current asset)
  const totalAssetsWithInsurance = totalAssets + insuranceTotal

  // Liabilities
  const mortgageTotal = (liabilities.mortgages || []).reduce((sum, d) => sum + parseNum(d.balance), 0)
  const personalLoanTotal = (liabilities.personalLoans || []).reduce((sum, d) => sum + parseNum(d.balance), 0)
  const creditCardTotal = (liabilities.creditCards || []).reduce((sum, d) => sum + parseNum(d.balance), 0)
  const studentLoanTotal = (liabilities.studentLoans || []).reduce((sum, d) => sum + parseNum(d.balance), 0)
  const otherDebtTotal = (liabilities.otherDebts || []).reduce((sum, d) => sum + parseNum(d.balance), 0)

  const totalLiabilities = mortgageTotal + personalLoanTotal + creditCardTotal +
    studentLoanTotal + otherDebtTotal

  const netEstate = totalAssets - totalLiabilities

  return {
    realPropertyTotal,
    bankTotal,
    investmentTotal,
    retirementTotal,
    insuranceTotal,
    businessTotal,
    vehicleTotal,
    otherAssetTotal,
    totalAssets,
    totalAssetsWithInsurance,
    mortgageTotal,
    personalLoanTotal,
    creditCardTotal,
    studentLoanTotal,
    otherDebtTotal,
    totalLiabilities,
    netEstate,
  }
}

export function formatCurrency(val) {
  const num = typeof val === 'number' ? val : parseNum(val)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(num)
}
