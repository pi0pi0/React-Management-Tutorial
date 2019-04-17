import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }
    
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        // window.location.reload(); single window page (SPA) 방식으로 동작되어야 하므로 리로드 보다는 부모의 State 를 변경시켜야 한다. 
        
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

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file); 
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);

        const config = {
            headers: {
                'content-type': 'multipart/form-data' //post 방식으로 이미지 전송하므로 헤더 추가 
            }
        }
        return post(url, formData, config);
    }


    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별 : <input type="text" name="gender"   value={this.state.gender} onChange={this.handleValueChange}/><br/> 
                직업 : <input type="text" name="job"      value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가</button>
            </form>
        )
    }
    
}


export default CustomerAdd;
