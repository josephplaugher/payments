import React from 'react'

const UserNotify = (props) => {
	if (props.type === 'error') {
		return <p className='error'>{props.error}</p>
	}
	if (props.type === 'message') {
		return <p className='userNotify'>{props.message}</p>
	}
}

export default UserNotify
