export function year(time) {
  let Y = ''
  Y = time.slice(0, 4)
  return Y
};
export function mouth(time) {
  let m = ''
  m = parseInt(time.slice(5, 7))
  return m
};
export function date(time) {
  let d = ''
  d = parseInt(time.slice(8))
  return d
}
