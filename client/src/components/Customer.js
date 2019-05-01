import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';
import CustomerDetail from './CustomerDetail';

class Customer extends React.Component{

    render(){
        return(
            <TableRow>
                <TableCell><CustomerDelete id={this.props.id} stateRefresh={this.props.stateRefresh}/></TableCell>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} height='64px' alt="profile picture"/></TableCell>
                <TableCell><CustomerDetail id={this.props.id} userName={this.props.name} job={this.props.job} gender={this.props.gender} birthday={this.props.birthday}/></TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell>{this.props.createdDate}</TableCell>         
            </TableRow>            
        )
    }
}
  
export default Customer;
