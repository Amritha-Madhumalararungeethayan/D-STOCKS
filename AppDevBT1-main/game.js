let spiderno; 
let value1 ; 
let value2; 
let playerl = 3 ; 
let bots = [
    {i : "BOT 1" , v:0 , l : 3}, 
    {i : "BOT 2" , v:0 , l:3 }, 
    {i : "BOT 3" , v:0 , l : 3 }, 


];

function start()
{   
randomno();
if(!spider()){
return ; 
}
 
calc();
displayno() ; 
winner();
}



function randomno(){
    bots.forEach(bot=>{
        bot.v = Math.floor(Math.random()*101 ); // generate random no
        console.log(bot.i , bot.v); 
    })
}





function spider(){
     value1 = document.getElementById("value1").value;
     if(Number(value1) > 100 || Number(value1) < 0 ){
        alert("Enter a value between 1 to 100"); 
        return false ; 
       
     }
     return true ; 
}

function calc(){
    let total = Number(value1) ; 
    bots.forEach(bot=>{
        total+=bot.v ; 
    }); 

spiderno = ((total) /(bots.length+1) ) *0.8 ; 
    console.log(spiderno);
}
 


// to find the closest no 
function winner(){
    let closest = {
        i : "player", 
        diff : Math.abs(Number(value1)-spiderno)
    }
    bots.forEach(bot=>{
        let diff = Math.abs(bot.v - spiderno) ; 
         if (diff<closest.diff){
            closest = {
                i :bot.i , 
                diff : diff
            };
        
    }
   
    }); 
    if(closest.i !== "player"){
        playerl-- ; 
    }
    bots.forEach(bot=>{
        if(bot.i !== closest.i){
            bot.l -- ;
            
        }
    })
   bots  = bots.filter(bot => bot.l > 0 );
   if(playerl<=0 ){
                document.getElementById("winner").innerText = "GAME OVER ";
                setTimeout(resetg , 2000);
                return ; 
            }
    if(bots.length === 0 ){
                document.getElementById("winner").innerText = "YOU WINN";
                setTimeout(resetg , 2000);
                return ;  
            }
   document.getElementById("winner").innerText = closest.i + " WINS!!!" ;
   document.getElementById("target").innerText = "Spider Number: " + spiderno;
   displaylives();

   
}

function displaylives(){
    let text = "PLAYER LIVES :" +hearts(playerl) + "</br>";
     bots.forEach(bot=>{
        text += bot.i +" Lives :" + hearts(bot.l) + "<br>";
            
        
    });
    document.getElementById("lives").innerHTML = text ; 
}


function hearts(lives){
    return "❤️".repeat(lives);
}

function displayno(){
    let text = "Player : "  + value1 + "<br>" ;
    bots.forEach(bot=>{
        text  += bot.i + ":" +bot.v +"<br>"
    });
    document.getElementById("numbers").innerHTML = text;
}


function resetg(){
playerl = 3 ; 
bots = [
    {i : "BOT 1" , v:0 , l : 3}, 
    {i : "BOT 2" , v:0 , l:3 }, 
    {i : "BOT 3" , v:0 , l : 3 }, 


];
displaylives() ; 
}