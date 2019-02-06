import FormClass from './FormClass'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'

class DataViewClass extends FormClass{

  showSearch = () => {
    this.setState({ searchView: true});
  }

  selectItem = (row) => {
    console.log('select item');
    //switch from data view to search view
    this.setState({ dataView: true, userNotify: ''});
    console.log('click',row);

    //place all the resulting data into state
    for(var key in row){
      console.log(key,row[key]);
      //clear previous selection
    
      //fill with new data select
      this.setState({
        [key]: row[key]
      }); 
    }
  }

  closeLightBox = () => {
    console.log('close');
    this.setState({dataView: false});
  }
}

export default DataViewClass;