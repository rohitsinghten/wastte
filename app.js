const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const { options } = require("request")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")

})

app.post("/",function(req,res){
    
    const fullname = req.body.full_name
    const email = req.body.email
    const password = req.body.password
    console.log(fullname,email,password);

    const data = {
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fullname
                }

            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url = "https://us17.api.mailchimp.com/3.0/lists/88fd0dd68b"
    const options = {
        method:"POST",
        auth:"rohit:485c084c8cb3f0c97acf5c8883ce7e34-us17"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/sucess.html")
        }else{
            res.sendFile(__dirname + "/faliure.html")
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData)  
    request.end()  


})
app.post("/faliure",function(req,res){
    res.redirect("/")
})




app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running");
})

// api key
// 485c084c8cb3f0c97acf5c8883ce7e34-us17

// list id
// 88fd0dd68b