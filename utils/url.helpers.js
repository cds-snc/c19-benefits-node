/**
 * This request middleware checks for the "lang" query.
 * If it finds a query parameter "lang=fr" or "lang=en", it will set a "lang" cookie to whichever value.
 *
 * From this point onwards, all of the site's content will be in the user's preferred language.
 */

/**
 * get the domain for the app from the request obj
 */
const getDomain = req => {
  const protocol = getHostProtocol(req)

  if (!req || !req.headers || !req.headers.host) {
    throw new Error('req missing host')
  }

  const host = req.headers.host
  return `${protocol}://${host}`
}

const getHostProtocol = req => {
  if (req && req.secure) {
    return 'https'
  }

  return 'http'
}

const clientJsDir = '/dist/'

const getClientJsPath = req => {
  const domain = getDomain(req)
  return `${domain}${clientJsDir}`
}

const CryptoJS = require('crypto-js');

const encryptQuerystring = text => {
  const passphrase = '123';
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptQuerystring = ciphertext => {
  const passphrase = '123';
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = {
  getDomain,
  getHostProtocol,
  getClientJsPath,
  clientJsDir,
  encryptQuerystring,
  decryptQuerystring,
}
