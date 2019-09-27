const express = require('express');
const app = express();
const fs = require('fs')

var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post('/course',(req,res)=>{
    var user={
        name : req.body.name,
        description :req.body.description
     }
    
    var data = fs.readFileSync('courses.json')
    data = data.toString();
    var Data = JSON.parse(data)
    console.log(Data)
    user.id=Data.length+1
    
    Data.push(user)

    fs.writeFileSync("courses.json", JSON.stringify(Data,null,2))
    return res.json(Data)
})


app.listen(3500, () => console.log('server is listening'));


