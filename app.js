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
const { hasData } = require('./utils')
const { addNunjucksFilters } = require('./filters')
const csp = require('./config/csp.config')
const csrf = require('csurf')
const {
  logger,
  session,
  languageLinkHelper,
  domainRedirector,
  errorHandler,
  csrfToken,
} = require('./middleware')

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
  app.use(csrfToken)
}

// cookie sessions are character limited, but this works for now
app.use(cookieSession(cookieSessionConfig))

const staticOptions = {
  dotfiles: 'ignore',
  index: false,
  maxAge: '1d',
  redirect: false,
}

// public assets go here (css, js, etc)
app.use(express.static(path.join(__dirname, 'public'), staticOptions))

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
 * If a CDN_PREFIX is set in env, the helper 
 * will return the path with the CDN prefix,
 * otherwise it just returns the path with 
 * current protocol and host prefix
 */
app.use((req, res, next) => {
  app.locals.asset = (path) => {
    const assetPrefix = process.env.CDN_PREFIX || '//' + req.get('host');

    return req.protocol + ':' + assetPrefix + path;
  }
  next()
})

app.use((req, res, next) => {
  app.locals.pageUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  next()
})

// set default views path
app.locals.basedir = path.join(__dirname, './views')
app.set('views', [path.join(__dirname, './views')])

// middleware to set a unique user id per session
app.use(session)
// Helper middleware used in languageLink.njk
app.use(languageLinkHelper(app))
// middleware to redirect french paths to the french domain and english paths to the english domain
app.use(domainRedirector)
app.use(logger)

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
app.use(errorHandler(appInsights))

module.exports = app
