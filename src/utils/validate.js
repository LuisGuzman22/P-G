export const validate = (s) => {
  var rgx = /^[0-9]*\.?[0-9]*$/
  return s.match(rgx)
}
