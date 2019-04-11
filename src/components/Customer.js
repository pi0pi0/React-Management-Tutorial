import React from 'react';

      
class Customer extends React.Component{
 
    render(){
        return(
            <div>
                <CustomerProfile id={this.props.id} name={this.props.name} image={this.props.image}/>
                <CustomerInfo sex={this.props.sex} birthday={this.props.birthday} age={this.props.age}/>
                
            </div>            
        )
    }
}

class CustomerInfo extends React.Component{
    render(){
        return(
            <div>
                
                <p>{this.props.sex}</p>
                <p>{this.props.birthday}</p>
                <p>{this.props.age}</p>
            </div>  
        )

    }
}

class CustomerProfile extends React.Component{
    render(){
        return(
            <div>
                <img src={this.props.image} alt="profile" />
                <h2>{this.props.name} {this.props.id}</h2>
                
            </div>  
        )

    }
}

export default Customer;
