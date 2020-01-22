export function isBuffer(obj) {
  return (
    !!obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  )
}

export function isStream(obj) {
  return (
    obj !== null && typeof obj === 'object' && typeof obj.pipe === 'function'
  )
}

export function flat(target, opts) {
  opts = opts || {}
  const maxDepth = opts.maxDepth
  const output = {}

  const step = (object, prev, currentDepth) => {
    currentDepth = currentDepth || 1
    Object.keys(object).forEach(function (key) {
      const value = object[key]
      const isarray = opts.safe && Array.isArray(value)
      const type = Object.prototype.toString.call(value)
      const isbuffer = isBuffer(value)
      const isstream = isStream(value)
      const isobject = type === '[object Object]' || type === '[object Array]'

      const newKey = prev ? prev + '[' + key + ']' : key

      if (
        !isstream &&
        !isarray &&
        !isbuffer &&
        isobject &&
        Object.keys(value).length &&
        (!opts.maxDepth || currentDepth < maxDepth)
      ) {
        return step(value, newKey, currentDepth + 1)
      }

      output[newKey] = value
    })
  }

  step(target)

  return output
}
