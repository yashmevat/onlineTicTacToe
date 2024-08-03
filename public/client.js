document.getElementById("bigCont").style.display="none"
document.getElementById("loading").style.display="none"
document.getElementById("userCont").style.display="none"
document.getElementById("oppNameCont").style.display="none"
document.getElementById("valueCont").style.display="none"
document.getElementById("whoseTurn").style.display="none"
var Name;
let socket = io();
console.log(socket)
document.getElementById("find").addEventListener("click",()=>{
  Name = document.getElementById("name").value;
  if(Name==null || Name==""){
    alert("enter the name");
  }
  else{
    socket.emit("find",{Name:Name})
    document.getElementById("loading").style.display="block"
    document.getElementById("find").disabled=true;
  }
})

socket.on("find",(e)=>{

    let allPlayersArray = e.allPlayers
    document.getElementById("bigCont").style.display="flex"
document.getElementById("loading").style.display="none"
document.getElementById("name").style.display="none"
document.getElementById("find").style.display="none"
document.getElementById("entername").style.display="none"

document.getElementById("userCont").style.display="block"
document.getElementById("oppNameCont").style.display="block"
document.getElementById("valueCont").style.display="block"
document.getElementById("whoseTurn").style.display="block"
document.getElementById("whoseTurn").innerHTML="X's Turn"

let opname,value;

const foundObject = allPlayersArray.find(obj => obj.p1.p1name == `${Name}` || obj.p2.p2name == `${Name}`);
foundObject.p1.p1name == `${Name}` ? opname = foundObject.p2.p2name : opname = foundObject.p1.p1name
foundObject.p1.p1name == `${Name}` ? value = foundObject.p1.p1value : value = foundObject.p2.p2value
console.log(opname,value)

document.getElementById("user").innerText=Name;
document.getElementById("oppName").innerText=opname;
document.getElementById("value").innerText=value;
})

document.querySelectorAll(".btn").forEach((e)=>{
  e.addEventListener("click",function(){
    let value = document.getElementById("value").innerText;
    e.innerText = value;
    console.log(e.id)
    socket.emit("playing",{value : value,id : e.id, Name : Name})
  })
})

socket.on("playing",(e)=>{
   const foundobj = (e.allPlayers).find((obj)=>obj.p1.p1name ==`${Name}` || obj.p2.p2name==`${Name}`);
   let p1id = foundobj.p1.p1move;
   let p2id = foundobj.p2.p2move; 
   if(foundobj.sum % 2 == 0){
      document.getElementById("whoseTurn").innerText="O's Turn"
   }
   else{
        document.getElementById("whoseTurn").innerText="X's Turn"

   }

   if(p1id!=""){
    document.getElementById(`${p1id}`).innerText="X";
    document.getElementById(`${p1id}`).style.color="black";
    document.getElementById(`${p1id}`).disabled=true;
   }
   if(p2id!=""){
    document.getElementById(`${p2id}`).innerText="O";
    document.getElementById(`${p2id}`).style.color="black";
    document.getElementById(`${p2id}`).disabled=true;
   }
   check(Name,foundobj.sum)
})

function check(Name, sum) {


  document.getElementById("btn1").innerText == '' ? b1 = "a" : b1 = document.getElementById("btn1").innerText
  document.getElementById("btn2").innerText == '' ? b2 = "b" : b2 = document.getElementById("btn2").innerText
  document.getElementById("btn3").innerText == '' ? b3 = "c" : b3 = document.getElementById("btn3").innerText
  document.getElementById("btn4").innerText == '' ? b4 = "d" : b4 = document.getElementById("btn4").innerText
  document.getElementById("btn5").innerText == '' ? b5 = "e" : b5 = document.getElementById("btn5").innerText
  document.getElementById("btn6").innerText == '' ? b6 = "f" : b6 = document.getElementById("btn6").innerText
  document.getElementById("btn7").innerText == '' ? b7 = "g" : b7 = document.getElementById("btn7").innerText
  document.getElementById("btn8").innerText == '' ? b8 = "h" : b8 = document.getElementById("btn8").innerText
  document.getElementById("btn9").innerText == '' ? b9 = "i" : b9 = document.getElementById("btn9").innerText


  if ((b1 == b2 && b2 == b3) || (b4 == b5 && b5 == b6) || (b7 == b8 && b8 == b9) || (b1 == b4 && b4 == b7) || (b2 == b5 && b5 == b8) || (b3 == b6 && b6 == b9) || (b1 == b5 && b5 == b9) || (b3 == b5 && b5 == b7)) {

      socket.emit("gameOver", { Name: Name })

      setTimeout(() => {

          sum % 2 == 0 ? alert("X WON !!") : alert("O WON !!")

          setTimeout(() => {
              location.reload()

          }, 2000)

      }, 100)

  }

  else if (sum == 10) {
      socket.emit("gameOver", { Name: Name })

      setTimeout(() => {

          alert("DRAW!!")

          setTimeout(() => {
              location.reload()

          }, 2000)

      }, 100)
  }
}