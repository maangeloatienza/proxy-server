const Klaviyo = require('node-klaviyo');
require('dotenv').config()

let {
  KLAVIYO_PUBLIC_TOKEN,
  KLAVIYO_PRIVATE_TOKEN
} = process.env

const KlaviyoClient = new Klaviyo({
  publicToken: KLAVIYO_PUBLIC_TOKEN,
  privateToken: KLAVIYO_PRIVATE_TOKEN
});

module.exports = KlaviyoClient