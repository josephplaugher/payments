class LightboxHandler {

selectItem = (row,setState) => {
    console.log('select item');
    //switch from data view to search view
    setState({ dataView: true, userNotify: ''});
    console.log('click',row);

    //place all the resulting data into state
    for(var key in row){
      console.log(key,row[key]);
      //clear previous selection
    
      //fill with new data select
      setState({
        [key]: row[key]
      }); 
    }
  }

  closeLightBox = (setState) => {
    console.log('close');
    setState({dataView: false});
  }

}

export default LightboxHandler;