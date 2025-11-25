const CURRENT_YEAR = new Date().getFullYear()
const END_YEAR = 2017

export const YearsProgramasEspeciales = Array.from(
  { length: CURRENT_YEAR - END_YEAR + 1 },
  (_, i) => CURRENT_YEAR - i
)