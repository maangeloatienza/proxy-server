const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const fetch = require('node-fetch')
require('dotenv').config()

const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

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
  console.log(body)
  const options = {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        profiles: body
      }
    )
  };

  fetch(`${baseUrl}?${params}`, options)
    .then(response => {
      console.log(response)
      res.json({
        data: body,
        message: "success"
      })
    })
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));


})


module.exports = router;