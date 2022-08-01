var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://localhost:27017/MessageBoard",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
app.get('/text',(req,res)=>{
    let texts=[];
    db.collection('message').find()
    .forEach(text=>texts.push(text))
    .then(()=>{
       res.status(200).json(texts)
       
    }).catch(()=>{
        res.status(500).json({error:'could not fetch document'})
    })
})
app.post("/success",(req,res)=>{
    var name = req.body.name;
    var message=req.body.message;
    var data = {
        "name": name,
        "message":message
    }

    db.collection('message').insertOne(data,(err)=>{
        if(err){
            throw err;
        }
        console.log("Data Inserted Successfully");
    });
    return res.redirect('index.html');

})


app.get("/",(req,res)=>{
   
    return res.redirect('index.html');
}).listen(port);


console.log("Listening on PORT 3000");