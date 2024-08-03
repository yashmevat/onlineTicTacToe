const express = require("express")
const app = express();
const path = require("path");
const http = require("http");
const {Server} = require("socket.io");
const server = http.createServer(app);
const PORT = process.env.PORT || 5500
app.use(express.static(path.join(__dirname,"public")))
let arr=[];
let playingArr=[]
const io = new Server(server);

app.get("/",(req,res)=>{
    res.sendFile("index.html");
})

io.on("connection",(socket)=>{
    socket.on("find",(e)=>{
        if(e.Name!=null)
        {
            arr.push(e.Name);
            if(arr.length>=2){
                let p1obj={
                    p1name : arr[0],
                    p1value:"X",
                    p1move:""
                }
                let p2obj={
                    p2name : arr[1],
                    p2value:"O",
                    p2move:""
                }

                let obj ={
                    p1:p1obj,
                    p2:p2obj,
                    sum:1
                }
                playingArr.push(obj);

                arr.splice(0,2);
                io.emit("find",{allPlayers:playingArr})
            }
        }
    })

    socket.on("playing",(e)=>{
        if(e.value=="X"){
            let objToChange = playingArr.find(x=>x.p1.p1name === e.Name);
            console.log(objToChange)
            objToChange.p1.p1move = e.id;
            objToChange.sum++;

        }
        if(e.value=="O"){
            let objToChange = playingArr.find(x=>x.p2.p2name === e.Name);
            objToChange.p2.p2move = e.id;
            objToChange.sum++;

        }
        io.emit("playing",{allPlayers:playingArr})
    })

    socket.on("gameOver",(e)=>{
        playingArr = playingArr.filter(obj=>obj.p1.p1name !== e.Name)
    })
})
server.listen(PORT,()=>{
    console.log("listening on port ",PORT);
})

