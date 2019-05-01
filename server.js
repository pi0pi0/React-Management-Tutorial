const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})
 
app.get('/api/customers',(req,res)=>{
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows); 
    }
  ); 
});

app.use('/image', express.static('./upload')); //express static 은 미들웨어 함수이다. upload 디렉토리를 /image에 정적으로 매핑

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = '/image/' + req.file.filename; //해당 파일네임은 multer가 겹치지 않는 이름 생성.
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job; 
  let params = [image, name, birthday,gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
    })
});

app.post('/api/customers/modify', upload.single('image'), (req, res) => {
  let sql = 'UPDATE CUSTOMER SET image = ?, name = ? , birthday = ?, gender = ? , job = ? WHERE id = ?';
  let image = '/image/' + req.file.filename? 'name':'no-name'; //해당 파일네임은 multer가 겹치지 않는 이름 생성.
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job; 
  let id = req.body.id;
  let params = [image, name, birthday,gender, job, id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
    })
});

app.delete('/api/customer/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ? ';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
    })
})
  
app.listen(port, () => console.log(`Listening on port ${port}` ));