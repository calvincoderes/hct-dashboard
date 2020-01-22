export const logger = {
  info(args1, args2) {
    console.log('#INFO: ', args1, args2)
  },
  debug(args1, args2) {
    console.log('#DEBUG: ', args1, args2)
  },
  warn(args1, args2) {
    console.log('#WARN: ', args1, args2)
  },
  verbose(args1, args2) {
    console.log('#VERBOSE: ', args1, args2)
  },
  silly(args1, args2) {
    console.log('#SILLY: ', args1, args2)
  },
  error(args1, args2) {
    console.log('#ERROR: ', args1, args2)
  },
  on(args1, args2) {
    console.log('#ON: ', args1, args2())
  }
}
