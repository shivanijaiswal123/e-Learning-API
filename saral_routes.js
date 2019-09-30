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


app.get('/courses/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "courses.json", 'utf8', function (err, data) {
    var coures_data  = JSON.parse( data );
    for(var i=0;i<coures_data.length;i++){
        if(req.params.id==coures_data[i]["id"]){
            var course=coures_data[i]
            break
        }
    }
    res.end( JSON.stringify(course));
    })
})

app.put('/courses/:id', function (req, res) {

    var id = req.params.id;
    var data = fs.readFileSync('courses.json')
    var coures_data = JSON.parse(data);
   
    coures_data[id]["name"] = req.body.name;
    coures_data[id][ "description"] = req.body.description;
    
    fs.writeFileSync("courses.json", JSON.stringify(coures_data));
    return res.json(coures_data)

})

app.get('/courses',(req,res)=>{
    var data=fs.readFileSync('courses.json')
    var coures_data = JSON.parse(data)
    res.send( coures_data);
})

app.post('/excercise',(req,res)=>{
    var user={
        courseId : req.body.courseId,
        name :req.body.name,
        content : req.body.content,
        hint : req.body.hint
    }
    
    var data = fs.readFileSync('excercise.json')
    data.toString();
    var excercise_data = JSON.parse(data)
    user.id=excercise_data.length+1
    
    excercise_data.push(user)

    fs.writeFileSync("excercise.json", JSON.stringify(excercise_data,null,2))
    return res.json(excercise_data)


})   

app.get('/courses/:cid/exercises/:eid', function (req, res) {
    var data=fs.readFileSync("excercise.json")
    var excercise_data  = JSON.parse( data );
    for(var i=0;i<excercise_data.length;i++){
        if(req.params.cid==excercise_data[i]["courseId"]){
            for(var x=0;x<excercise_data.length;x++){
                if(req.params.eid == excercise_data[x]["id"] && req.params.cid==excercise_data[x]["courseId"] ){
                    res.end( JSON.stringify(excercise_data[x]))
                }
            }
        }
    }
    res.end("data not found");
    
})

app.put('/courses/:cid/exercises/:eid', function (req, res) {
    var data=fs.readFileSync("excercise.json")
    var excercise_data  = JSON.parse( data );
    for(var i=0;i<excercise_data.length;i++){
        if(req.params.cid==excercise_data[i]["courseId"]){
            for(var x=0;x<excercise_data.length;x++){
                if(req.params.eid == excercise_data[x]["id"] && req.params.cid==excercise_data[x]["courseId"] ){
                    excercise_data[req.params.eid]["courseId"] = req.body.courseId;
                    excercise_data[req.params.eid]["name"] = req.body.name;
                    excercise_data[req.params.eid]["content"] = req.body.content;
                    excercise_data[req.params.eid]["hint"] = req.body.hint;
                    fs.writeFileSync("excercise.json", JSON.stringify(excercise_data,null,2));
                    res.send(excercise_data)
                }
            }
        }
    }
})









app.listen(3500, () => console.log('server is listening'));


