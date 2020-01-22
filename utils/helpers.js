export const serialize = (obj) => {
  const str = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p) && (obj[p] !== null || obj[p] === '')) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}
