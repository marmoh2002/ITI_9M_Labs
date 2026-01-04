//? Cookies --> DOM [session , persistent "expiredate-delete[expiredate already exist]"]
function CookieFn(){
    document.cookie = "userName="+document.getElementById("inp").value //* session cookie
    //* persistent cookie
    let today = new Date();
    today.setMonth(today.getMonth()+1);
    document.cookie = "userAge=19;expires="+today
}
let inp = document.getElementById("inp")
console.log(inp.style.background = "red");

setCookie("name","ali");
console.log(getCookie("name"));
//? ///////////////////////////////////////////////////
//& BOM "Browser Object Model"
//? window --> navigator , history , location , screen , timers , document
//* Timer --> setTimeOut [clearTimeOut] , setInterval[clearInterval]
let timeoutID =setTimeout(()=>{
// console.log("setTimeOut Delay");
},0);
// console.log(timeoutID);

let intervalId =setInterval(()=>{
    // clearInterval(intervalId)
    //? to avoid pug [increase time] clearInterval
// console.log("setInterval Act As LOOP");
},500)
// console.log(intervalId);
// clearInterval(intervalId)
function TestEx(){
    // console.log("TestEx");
}
TestEx()

//? /////////////////////////////////////////////
//? open(url , target , features , replace)
//? close / moveTo / moveBy / focus / resizeTo / scroll 
let win;
function OpenWin(){
     win = open("./win.html","","width=150,height=150")
    win.focus()
}
function closeWin(){
    win.close()
}
let x = 150
function MoveWin(){
    // win.moveTo(150,150)
    if(x > screen.width){
        x=0
    }
    win.moveBy(x,150)
    win.focus()
}

console.log(navigator);
//? geolocation / onLine / languages 
if(navigator.onLine){
    // alert("online")
}
console.log(location);
//? port / reload / replace / assign / href 
console.log(location.port);
function locationTest(){
    location.assign("./win.html")
}
console.log(history);
//? length / back / forward
console.log(screen);
//? width / height /x / y

//& //////////////////////////////////////////
//~ WEBAPI  -- application programming interface
//^ open api --> public
//^ partner api --> not public "need licence"
//^ internal api --> private 
//^ composite api 

//* xmlhttprequest --> fetch --> axios[react&vue] --> httpClient[angular]

//& AJAX==> Asynchronous js and xml
//? js --> synchronous [single thread]
//? var xhr = new XMLHttpRequest()
//? methods ==>open , send ,close
//? attributes
//? readystate --> 0--uninitialized ,1--loading ,2--loaded ,3--interaction ,4--completed
//? status -->1** --inf ,2**--completed,3**--rediraction,4**--error in client,5**--error in server
//? statusText --> "ok --2**" "not found --404"
//? responseText | responseXMl
//? event ==> onreadystatechange
//? crud operation ==> post , get ,put[send all obj to update one prop]/patch[send the updated prop only] ,delete 
//* xml <family> <father>
//* JSON "JS OBJECT NOTATION" [most common received data]
let obj = {
    id:1
}
let objj ={
    "id":1,
    "name":"ali"
}

//^ JSON.parse() convert json to js object
//^ JSON.stringify() convert js object to json 

function getPosts(){
    let url = "https://dummyjson.com/posts";
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url)
    xhr.send("")
    xhr.onreadystatechange = function(){
        if(xhr.readyState ===4 && xhr.status === 200){
            let data = xhr.responseText
            data = JSON.parse(data)
            console.log(data.posts);
            data = data.posts;
            for(let i=0;i<data.length;i++){
                document.getElementById("header").innerText += data[i].title
            }
        }
    }
}
getPosts()

function getDetails(id){
    let url = "https://dummyjson.com/posts/"+id;
     let xhr = new XMLHttpRequest();
    xhr.open('GET',url)
    xhr.send("")
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status===200){
            let data = xhr.responseText;
            data = JSON.parse(data);
            console.log(data);
            alert(data.body)

        }
    }

}
getDetails(10)