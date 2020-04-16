// docs: https://helmetjs.github.io/docs/csp/

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
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
    'https://*.demdex.net',
    'https://cm.everesttech.net',
    'https://assets.adobedtm.com',
    'https://www.google-analytics.com',
  ],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  frameSrc: ["'self'", 'https://*.demdex.net'],
  imgSrc: [
    "'self'",
    'data:',
    'https://*.demdex.net',
    'https://cm.everesttech.net',
    'https://assets.adobedtm.com',
    'https://www.google-analytics.com',
  ],
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  upgradeInsecureRequests,
}
