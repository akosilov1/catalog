export const numberFormat = function (number) {
  const nf = new Intl.NumberFormat('ru')
  return nf.format(number)
}
