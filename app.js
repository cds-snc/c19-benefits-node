// add app insights instrumentation
if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY !== undefined) { 
  const appInsights = require("applicationinsights");
  appInsights.setup();
  appInsights.start();
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

if (process.env.NODE_ENV !== 'test') {
  // CSRF setup
  app.use(
    csrf({
      cookie: {
        sameSite: true,
        secure: true,
      },
      signed: true,
    }),
  )

  // append csrfToken to all responses
  app.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken()
    next()
  })
}

// in production: use redis for sessions
// but this works for now
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
app.locals.hasData = hasData

// set default views path
app.locals.basedir = path.join(__dirname, './views')
app.set('views', [path.join(__dirname, './views')])

app.use(function (req, res, next) {
  // set a unique user id per session
  if (!req.session.id) req.session.id = uuidv4()
  // add user session req.locals so that the logger has access to it
  req.locals = { session: req.session }

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

module.exports = app
