import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
 
const styles = theme => ({
    hidden: {
        display : 'none' 
    }
});

class CustomerDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            file: this.props.file,
            userName: this.props.userName,
            birthday: this.props.birthday,
            gender: this.props.gender,
            job: this.props.job,
            fileName: this.props.fileName,
            open: false
             
        }
    }
    
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.modiCustomer()
            .then((response) => {
                console.log(response.data);
                this.handleClose();
            })
   
    }
    
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    modiCustomer = () => {
        const url = '/api/customers/modify';
        const formData = new FormData();
        
        formData.append('image', this.state.file); 
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        formData.append('id', this.state.id);

        const config = {
            headers: {
                'content-type': 'multipart/form-data' //post 방식으로 이미지 전송하므로 헤더 추가 
            }
        }
        return post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render(){
        const { classes } = this.props; 
        return(
            <div>
                <Link component="button" onClick={this.handleClickOpen}>{this.state.userName}</Link>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Title</DialogTitle>

                    <DialogContent>
                        <input className = {classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName} 
                            </Button>
                        </label>
                        <br/>
                        <input className = {classes.hidden} name={this.state.id}/>
                        <TextField label ="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label ="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label ="성별" type="text" name="gender"   value={this.state.gender} onChange={this.handleValueChange}/><br/> 
                        <TextField label ="직업" type="text" name="job"      value={this.state.job} onChange={this.handleValueChange}/><br/>        
                    </DialogContent>
                    <DialogActions>
                        <Button variant ="contained" color="primary" onClick={this.handleFormSubmit}>
                            수정
                        </Button>
                        <Button variant ="outlined" color="primary" onClick={this.handleClose}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    
}


export default withStyles(styles)(CustomerDetail);
