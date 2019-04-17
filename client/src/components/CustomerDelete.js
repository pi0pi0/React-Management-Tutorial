import React from 'react'; 

//delete button
class CustomerDelete extends React.Component{

    deleteCustomer(id){
        const url = '/api/customer/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
 
    }
 
    render(){
        return(
            <button onClick = {(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )    
    }



}

export default CustomerDelete;