class LightboxHandler {
	selectItem = (row, setState) => {
		//switch from data view to search view
		setState({ dataView: true, userNotify: '' })

		//place all the resulting data into state
		for (var key in row) {
			//clear previous selection

			//fill with new data select
			setState({
				[key]: row[key]
			})
		}
	}

	closeLightBox = (setState) => {
		setState({ dataView: false })
	}
}

export default LightboxHandler
