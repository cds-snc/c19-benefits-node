// add app insights instrumentation
// istanbul ignore next
if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY !== undefined) {
  var appInsights = require('applicationinsights')
  appInsights.setup().setAutoCollectConsole(true, true).setSendLiveMetrics(true)
  appInsights.defaultClient.context.tags[
    appInsights.defaultClient.context.keys.cloudRole
  ] = process.env.SLOT_NAME
  appInsights.start()
}

// import environment variables.
require('dotenv').config()
require('dotenv').config({ path: './.env.public' })

// import node modules.
const express = require('express')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')
const morganConfig = require('./config/morgan.config')
const path = require('path')
const cookieSession = require('cookie-session')
const cookieSessionConfig = require('./config/cookieSession.config')
const { hasData, getDomain } = require('./utils')
const { addNunjucksFilters } = require('./filters')
const csp = require('./config/csp.config')
const csrf = require('csurf')
const uuidv4 = require('uuid').v4

// check to see if we have a custom configRoutes function
let { configRoutes, routes, locales } = require('./config/routes.config')

if (!configRoutes) configRoutes = require('./utils/route.helpers').configRoutes
if (!locales) locales = ['en', 'fr']

// initialize application.
const app = express()

// general app configuration.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.app_session_secret))
app.use(require('./config/i18n.config').init)

// ignore code coverage since this won't run in test mode
// istanbul ignore next
if (process.env.NODE_ENV !== 'test') {
  // CSRF setup
  app.use(csrf(require('./config/csrf.config')))

  // append csrfToken to all responses
  app.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken()
    next()
  })
}

// cookie sessions are character limited, but this works for now
app.use(cookieSession(cookieSessionConfig))

// public assets go here (css, js, etc)
app.use(express.static(path.join(__dirname, 'public')))

// add a request logger
process.env.NODE_ENV !== 'test' && app.use(morgan(morganConfig))


// dnsPrefetchControl controls browser DNS prefetching
// frameguard to prevent clickjacking
// hidePoweredBy to remove the X-Powered-By header
// hsts for HTTP Strict Transport Security
// ieNoOpen sets X-Download-Options for IE8+
// noSniff to keep clients from sniffing the MIME type
// xssFilter adds some small XSS protections
app.use(helmet())
app.use(helmet.contentSecurityPolicy({ directives: csp }))

// gzip response body compression.
app.use(compression())

// Adding values/functions to app.locals means we can access them in our templates
app.locals.GITHUB_SHA = process.env.GITHUB_SHA || null
app.locals.TAG_VERSION = process.env.TAG_VERSION || null
app.locals.LAST_UPDATED = process.env.LAST_UPDATED || null
app.locals.hasData = hasData

/**
 * Create an asset path helper for templates
 * If a CDN_PREFIX is set in env, and mode is production,
 * the helper will return the path with the CDN prefix,
 * otherwise it just returns the path
 */
app.locals.asset = (path) => {
  const cdnprefix = process.env.CDN_PREFIX || '';

  if (process.env.NODE_ENV === 'production') {
    return cdnprefix + path;
  }
  return path;
}

// set default views path
app.locals.basedir = path.join(__dirname, './views')
app.set('views', [path.join(__dirname, './views')])

// middleware to set a unique user id per session
app.use(function (req, res, next) {
  // set a unique user id per session
  if (!req.session.id) req.session.id = uuidv4()
  // add user session req.locals so that the logger has access to it
  req.locals = { session: req.session }

  next()
})

// middleware to redirect french paths to the french domain and english paths to the english domain
/* istanbul ignore next */
app.use(function (req, res, next) {
  // if not running on production azure, skip this
  if (process.env.SLOT_NAME !== 'default') return next()

  const domain = getDomain(req)

  // if `/fr/` appears in the path for the english domain, redirect to DOMAIN_FR
  if (req.path.startsWith('/fr/') && domain.includes(process.env.DOMAIN_EN))
    return res.redirect(`https://${process.env.DOMAIN_FR}${req.path}`)

  // if `/en/` appears in the path for the french domain, redirect to DOMAIN_EN
  if (req.path.startsWith('/en/') && domain.includes(process.env.DOMAIN_FR))
    return res.redirect(`https://${process.env.DOMAIN_EN}${req.path}`)

  next()
})

app.routes = configRoutes(app, routes, locales)

// view engine setup
const nunjucks = require('nunjucks')

const env = nunjucks
  .configure([...app.get('views'), 'views/macros'], {
    autoescape: true,
    express: app,
  })
  .addGlobal('$env', process.env)

addNunjucksFilters(env)

nunjucks.installJinjaCompat()

app.set('view engine', 'njk')

// Pass error information to res.locals
// istanbul ignore next
app.use((err, req, res, next) => {
  const errObj = {}

  const status = err.status || err.statusCode || 500
  res.statusCode = status

  errObj.status = status
  if (err.message) errObj.message = err.message
  if (err.stack) errObj.stack = err.stack
  if (err.code) errObj.code = err.code
  if (err.name) errObj.name = err.name
  if (err.type) errObj.type = err.type

  if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    appInsights.trackException({ exception: errObj })
  }

  res.locals.err = errObj
  next(err)
})

module.exports = app
