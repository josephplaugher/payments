import {} from 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
const app = express()
import cookieParser from 'cookie-parser'
import SetUrl from './util/SetUrl'
import Auth from './util/Auth'
import userCont from './controllers/userCont'
import achCont from './controllers/achCont'
import ccCont from './controllers/ccCont'
import Sentry from '@sentry/node'

Sentry.init({
	dsn: 'https://795905e8dd5147f4bd771d1203661434@sentry.io/payment'
})
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())
// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler())

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

let port = process.env.PORT
app.listen(port, function() {
	console.log(
		'server started in ' + process.env.NODE_ENV + ' mode on port ' + port
	)
})

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', SetUrl())
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, authorization')
	res.set('X-Powered-By', 'Appreciate Corporation')
	next()
})

app.use(bodyParser.urlencoded({ extended: false })) // Parse application/x-www-form-urlencoded
app.use(cookieParser())
app.use(bodyParser.json()) // Parse application/json

const checkAuth = (req, res, next) => {
	let auth = new Auth(req, res, next)
	return auth
}

app.get('/checkLoginState', checkAuth, (req, res) => {
	res.status(200).json({ checkLoginState: 'done' })
})

app.use('/', userCont)
app.use('/', checkAuth, achCont)
app.use('/', checkAuth, ccCont)

//this route renders the UI. The UI will check for the cookie and token
//and log the user out if they don't exist.
app.all('/*', (req, res) => {
	res.render('index')
})
