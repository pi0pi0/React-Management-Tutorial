import React, { Component } from 'react';
import Customer from './components/Customer'; 


const customers = [
  { 
    'id' : 1,
    'image' : 'https://placeimg.com/64/64/1',
    'name' : "hyejin",
    'sex' : "여자",
    'age' : "26",
    'birthday' : "940218"
  },
  {
    'id' : 2,
    'image' : 'https://placeimg.com/64/64/2',
    'name' : "lee",
    'sex' : "남자",
    'age' : "26",
    'birthday' : "930218"
    },
  {
    'id' : 3,
    'image' : 'https://placeimg.com/64/64/3',
    'name' : "kim",
    'sex' : "male",
    'age' : "26",
    'birthday' : "960218"
  }
]

class App extends Component {
  render() {
    return (
        <div>
          {
            customers.map( c => {
              return (<Customer key = {c.id} id={c.id}  image={c.image}  name={c.name}  sex={c.sex} age={c.age}  birthday={c.birthday} /> )
            })
          }
        </div>
        
    );
  }
}

export default App;
