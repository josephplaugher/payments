import FormClass from './FormClass'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'

class DataViewClass extends FormClass {
	showSearch = () => {
		this.setState({ searchView: true })
	}

	selectItem = (row) => {
		//switch from data view to search view
		this.setState({ dataView: true, userNotify: '' })

		//place all the resulting data into state
		for (var key in row) {
			//clear previous selection

			//fill with new data select
			this.setState({
				[key]: row[key]
			})
		}
	}

	closeLightBox = () => {
		this.setState({ dataView: false })
	}
}

export default DataViewClass
