const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const fetch = require('node-fetch')
const axios = require('axios').default;
require('dotenv').config()


// controllers
const profileController = require("../controller/profileController")

const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

axios.defaults.headers.post['Content-Type'] = 'application/json';


router.post('/add-subscriber', profileController.addSubscriber);

router.get('/proxy', async (req, res) => {
  let {
    baseUrl
  } = req.query

  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    })
    console.log(params)
    const response = await needle('get', `${baseUrl}?${params}`)
    const data = response.body;

    res.status(200).json({
      data,
      message: 'Successful',
      context: 'Proxy process done'
    })
  } catch (error) {
    res.status(500).json({ error })
  }


})


router.post('/proxy/post', async (req, res) => {
  let {
    baseUrl
  } = req.query
  const body = req.body;

  // try {
  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    ...url.parse(req.url, true).query,
  })
  const options = {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        "profiles": body
      }
    )
  };

  // Send a POST request
  axios({
    method: 'post',
    url: `${baseUrl.replace(/\/+$/, "")}?${API_KEY_NAME}=${API_KEY_VALUE}`,
    // headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    data: JSON.stringify(
      {
        "profiles": body
      }
    )
  }).then(response => {
    console.log(response)
    console.log('STATUS', response.statusText)
    res.status(response.status).json({
      data: body,
      message: response.statusText
    })
  }).catch(err => {
    console.log(err)
    res.status(response.status).json({
      context: err.message,
      message: response.statusText
    })
  });
  // console.log(`${baseUrl.replace(/\/+$/, "")}?${API_KEY_NAME}=${API_KEY_VALUE}`)
  // console.log(options.body)
  // fetch(`${baseUrl.replace(/\/+$/, "")}?${API_KEY_NAME}=${API_KEY_VALUE}`, options)
  //   .then(response => {
  //     console.log(response)
  //     res.status(response.status).json({
  //       data: body,
  //       message: response.statusText
  //     })
  //   })
  //   .then(json => console.log('JSON RESPONSE', json))
  //   .catch(err => {
  //     console.log(err.message)
  //     console.error('error:' + err)
  //   });




})


module.exports = router;