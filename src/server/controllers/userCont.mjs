import express from 'express'
import Login from './model/user/Login.mjs'
import NewUser from './model/user/NewUser.mjs'
import RefreshStripeSources from './model/user/RefreshStripeSources'
const routes = express.Router()

routes.post('/login', (req, res) => {
	const login = new Login(req, res)
	login.start()
})

routes.post('/newUser', (req, res) => {
	const User = new NewUser(req, res)
	User.create()
})

routes.get('/refreshStripeSources', (req, res) => {
	const UserData = new RefreshStripeSources(req, res)
})

export default routes
