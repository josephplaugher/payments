import React from 'react';

class ListItem extends React.Component {
    render() {

        return (
            <p className="lsr" >{this.props.item}</p>    
        )
    };
}

export default ListItem;