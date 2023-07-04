const express=require('express');
const bodyParser = require('body-parser');
const port=process.env.port || 8000;
const mariadb = require('mariadb');

const app=express();
var fname;
var lname;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('./public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html');
})

app.post('/formPost', async (req, res) => {
    res.send(`Full name is:${req.body.username} ${req.body.password}`);
    console.log("into the form post");
    var username=req.body.username;
    var password=req.body.password;
    app.post('/', (req, res) => {
        res.send("POST Request Called")
    })
    console.log(`username is ${username} password is ${password}`);
    main(username,password)
});

const pool=mariadb.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'nodedb',
})

  async function main(username,password){
    try{
        let conn=await pool.getConnection();
        let rows=await conn.query(`INSERT into clients(Name,Password) VALUES('${username}','${password}')`);
        console.log('Inserted');

    }catch(err){
        console.log(err);

    }
}
app.listen(port,()=>{
    console.log('server started at http://localhost:',{port});
})