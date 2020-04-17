// docs: https://helmetjs.github.io/docs/csp/

const scriptSrc = [
  "'self'",
  'cdnjs.cloudflare.com',
  '*.herokuapp.com',
  'www.googletagmanager.com/',
  'https://www.google-analytics.com',
  'https://ssl.google-analytics.com',
  'assets.adobedtm.com',
  '*.2o7.net',
  '*.omtrdc.net',
  '*.adobe.com',
  '*.demdex.net',
  'cm.everesttech.net',
  'assets.adobedtm.com',
  'adobe.com',
  'omniture.com',
  '*.omniture.com',
  '*.omniture-static.com',
  '*.typekit.net',
  (req, res) => `'nonce-${res.locals.nonce}'`,
]

let upgradeInsecureRequests = true

if (process.env.NODE_ENV === 'development') {
  scriptSrc.push("'unsafe-eval'")
  upgradeInsecureRequests = false
}

module.exports = {
  defaultSrc: ["'self'"],
  scriptSrc: scriptSrc,
  baseUri: ["'none'"],
  connectSrc: [
    "'self'",
    'https://www.google-analytics.com',
    '*.demdex.net',
    'cm.everesttech.net',
    'assets.adobedtm.com',
    '*.omtrdc.net',
  ],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  frameSrc: ["'self'", '*.demdex.net'],
  imgSrc: [
    "'self'",
    'data:',
    'https://www.google-analytics.com',
    '*.demdex.net',
    'cm.everesttech.net',
    'assets.adobedtm.com',
    '*.omtrdc.net',
  ],
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  upgradeInsecureRequests,
}
