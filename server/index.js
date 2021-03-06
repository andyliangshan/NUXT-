import path from 'path';
import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import session from 'express-session'
import unless from 'express-unless';
import connectRedis from 'connect-redis'
import cors from 'cors'
import { redisConfigFunc } from './config'
import auth from './middlewares/auth'
import bodyParser from 'body-parser'
import busboy from 'connect-busboy'
import bytes from 'bytes'

import api from './api'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.set('port', port)

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
const RedisStore = connectRedis(session)
const redisSessionStore = new RedisStore({
  port: redisConfigFunc().port,
  host: redisConfigFunc().host
})

app.set('redisSessionStore', redisSessionStore)
app.use(require('cookie-parser')(''))

app.use(session({
  name: 'sid',
  secret: 'andyliang',
  store: redisSessionStore,
  resave: true,
  saveUninitialized: true
}))
/**
 * files upload limits
 */
app.use(busboy({
  limits: {
    fileSize: bytes('20MB')  //  1M
  }
}));

app.use(auth.authUser.unless({path: [
  /_nuxt/,
  /__webpack_hmr/,
  // '/login',
  // '/api/valid/phone',
]}))

app.use(/api/, auth.detectTimespan);

app.use(cors())

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token");
  }
});

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

export default app;