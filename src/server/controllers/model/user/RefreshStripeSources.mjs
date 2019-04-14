import UserBase from './UserBase'
import SetStripeKey from './../SetStripeKey'

class RefreshStripeSources extends UserBase {
	constructor(req, res) {
		this.stripe = SetStripeKey()
		this.req = req
		this.req = req
		this.res = res
		this.refresh()
	}

	async refresh() {
		let users = await this.getCustomersByEmail()
		let user = users.data[0]
		let userData = this.buildUserObject(user)
		this.res.status(200).json({ userData: userData })
	}
}

export default RefreshStripeSources
