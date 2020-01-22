const express = require('express')
// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()

export const initialize = (req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
}
