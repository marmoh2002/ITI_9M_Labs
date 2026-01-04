//? Hoisting --> scanning up from all vars
// var x;
// console.log(x);
// var x = 10;
// console.log(x);
//? TDZ --> hide value of vars "let & constp"
let x = 10; //* hoisting theoretical not practical "tdz"

console.log(sum(1, 2));

function sum(x, y) {
  return x + y;
}

// console.log(sub(2,1));
let sub = function (x, y) {
  return x - y;
};
//? /////////////////////////////////////
//& DOM "Document Object Model"
// document.title ="pd alex";
// document.write("<h1>hello</h1>");
// document.body.style.background = "blue"
console.log(document);
console.log(
  (document.childNodes[1].childNodes[2].childNodes[1].innerText += " world")
);
console.log(document.children[0].children[1].children[0].style.color = "green");
//? Collections --> images , links , forms 
console.log(document.images[1].style.border = "10px solid blue");
//? getters
// document.getElementById
// document.getElementsByTagName
// document.getElementsByClassName
// document.getElementsByName
//* textContent()
// console.log(document.getElementById("main").innerHTML += "<h1>text with innerHTML</h1></br>");
console.log(document.getElementById("main").innerText += "<span>hello</span>");
console.log(document.getElementsByClassName("s")[1].style.background = "yellow");

let main = document.getElementById("main")
// console.log(main);
main.style.background = "red"
//? css selectors
let classElem =document.querySelector(".s")
console.log(classElem);
classElem.style.border = "10px solid red"
let cssClassesElem =document.querySelectorAll(".s")
console.log(cssClassesElem);
//? classlist --> add , remove , toggle
let body = document.body;

function ChangeTheme(){
    body.classList.toggle("dark")

}

//? create elem on the fly
let text = "created element on the fly"
let header = document.getElementById("header")
let createdP
function AddElem(){
     createdP = document.createElement("h2");
    createdP.innerText = text;
    createdP.setAttribute("class","light")
    header.appendChild(createdP)

}
//? delete --> remove , removeChild
function deleteElement(){
    // createdP.remove()
    header.removeChild(createdP)
}

//& Events --> events types
let btn = document.getElementById("btn")
// btn.onclick=function(){
//     console.log("button is clicked");
// }
function getData(){
 let inp = document.getElementById("inp").value;
    console.log(inp);
}
btn.addEventListener("click",getData)
//* Event Propagation
//^ bubbling --> from child to parent "default"
//^ capture --> from parent to child

let outer = document.querySelector(".outer")
let inner = document.querySelector(".inner")
// console.log(inner , outer);

outer.addEventListener("click",()=>{
    console.log("outer event firing");
})
inner.addEventListener("click",(e)=>{
    console.log("inner event firing");
    console.log(e);
    e.stopPropagation()
})

document.getElementById("subBtn").addEventListener("click",(e)=>{
console.log("calledddddddddd form");
    e.preventDefault();

})

