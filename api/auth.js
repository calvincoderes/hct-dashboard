const express = require('express')
const multer = require('./libraries/Multer')
const { callApi } = require('./libraries/Api')
const { initialize } = require('./libraries/Util')

// Create express router
const router = express.Router()
const noUploadForm = multer.multerFields()

router.use(initialize)
router.use(noUploadForm)

/**
 * Login
 */
router.post('/login', async (req, res) => {
  try {
    const body = {
      'username': req.body.username,
      'password': req.body.password,
      'client_id': process.env.OAUTH_CLIENT_ID,
      'client_secret': process.env.OAUTH_CLIENT_SECRET,
      'grant_type': 'password'
    }

    const oauth = await callApi({
      method: 'POST',
      url: `${process.env.REST_API_NETWORK_ENDPOINT}/assistant/auth/login/`,
      body,
      json: true
    })

    if (oauth.statusCode === 200) {
      const me = await callApi({
        method: 'GET',
        url: `${process.env.REST_API_NETWORK_ENDPOINT}/me/`,
        headers: {
          Authorization: 'Bearer ' + oauth.data.access_token
        },
        json: true
      })

      if (me.statusCode === 200) {
        req.session.auth = {
          ...oauth.data,
          ...me.data
        }
        res.status(200).json(req.session.auth)
      }
    } else {
      res.status(400).json({ success: false })
    }
  } catch (e) {
    const err = new Error(e)
    console.info('#### ERROR #######', err)
    res.status(400).json({ success: false })
  }
})

/**
 * Logout
 */
router.post('/logout', async (req, res) => {
  try {
    if ('auth' in req.session) {
      await callApi({
        method: 'POST',
        url: `${process.env.REST_API_NETWORK_ENDPOINT}/oauth/revoke_token/`,
        body: {
          'token': req.session.auth.access_token,
          'client_id': process.env.OAUTH_CLIENT_ID,
          'client_secret': process.env.OAUTH_CLIENT_SECRET
        },
        json: true
      })
    }
    req.session.destroy()
    res.status(200).json({ success: true })
  } catch (e) {
    const err = new Error(e)
    console.log('#### ERROR #######', err)
    res.status(400).json({ success: false })
  }
})

/**
 * Current Brand
 */
router.put('/default_location', async (req, res) => {
  try {
    const auth = req.session.auth
    if (auth) {
      const me = await callApi({
        method: 'PUT',
        url: `${process.env.REST_API_NETWORK_ENDPOINT}/me/location/`,
        body: req.body,
        headers: { Authorization: 'Bearer ' + auth.access_token },
        json: true
      })

      if (me.statusCode === 200 && req.session.auth.assistant_details) {
        Object.assign(req.session.auth.assistant_details, {
          default_location: req.body.location_id
        })
      }
      res.status(200).json({ details: ['Success'] })
    } else {
      res.status(401).json({ details: ['Unauthorized'] })
    }
  } catch (e) {
    const err = new Error(e)
    console.info('#### ERROR #######', err)
    res.status(400).json({ success: false })
  }
})

// Export the server middleware
export default {
  path: '/auth',
  handler: router
}
