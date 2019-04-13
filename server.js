const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers',(req,res)=>{
    res.send([
        { 
            'id' : 1,
            'image' : 'https://placeimg.com/64/64/1',
            'name' : "hyejin",
            'gender' : "여자",
            'age' : "26",
            'birthday' : "940218"
          },
          {
            'id' : 2,
            'image' : 'https://placeimg.com/64/64/2',
            'name' : "lee",
            'gender' : "남자",
            'age' : "26",
            'birthday' : "930218"
            },
          {
            'id' : 3,
            'image' : 'https://placeimg.com/64/64/3',
            'name' : "kim",
            'gender' : "male",
            'age' : "26",
            'birthday' : "960218"
          }
    ]);
});


app.listen(port, () => console.log(`Listening on port ${port}` ));