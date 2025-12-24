// alert('hellooooo')
//? variables 
var x; //* declaration
x=10; //* initialization
document.write(x) //^ DOM 
console.log(x); //* inspect "webApi"
var x = "ali";
console.log(x);
let namee = "omar";
// let namee = "ahmed"
namee = "ahmed";
namee = 1000;
console.log(typeof namee); //? typeof 
const z=100;
// z=200
// if()

//? ////////////////////////////////
let A1 = 10; //~ literal creation --> primitive 
console.log(A1 , typeof A1);
let A2 = new Number(10); //~ constructor creation --> object
console.log(A2 , typeof A2);
//& == loose comparison "coercion" xxxxxx
console.log(A1 === A2); //^ false
console.log(2 == '2');
//& === Strict comparison "value and datatype"
console.log(2 === '2');
console.log(A1 === A2.valueOf()); //^ true
//* 0 --> falsy values 
//^ falsy values "false , ' ' , NAN , undefined , null , 0 , BigInt(0) , BigInt(-0)"
let str1= new String("ali");
console.log(str1 , typeof str1);
let bool1 = new Boolean(true);
console.log(bool1 , typeof bool1);
console.log(bool1.constructor.name);
let bool2 = true;
console.log(typeof bool2);
//? prototypal inheritance "adv js"
//? Operators 
let num1 = 20;
console.log(num1 + 200);
console.log(num1++); //* postfix
console.log(num1++);
console.log(++num1); //* prefix
console.log(1 !== 10);
//? 5 ---> 0101 // 1 --> 0001
console.log(5 & 1); //? 0001 --> 1
console.log(5 | 1); //? 0101 --> 5

//* && --> first false or last true
//* || --> first true or last false
console.log(123 && 'asd'&& true && 0 && true);
console.log('' || 0 || false);


//? Conditions 
let flag = false;
if(flag){
    document.write("it's true ")
}else{
    document.write("it's false")
}

//* ternary operator
flag?console.log("true"):console.log("false");

let numberr = 500;
switch(numberr){
    case 50:
        console.log("in range");
        break;
    case 20:
        console.log("out of range");
        break;
    default:
        console.log("Not Available");
}

//? 
// for(let i=0;i<10;i++){
//     console.log(i);
// }

// let i=0;
// while(i<5){
//     i++;
//     console.log(i);
// }

// let i=10;
// do{
// i++
// console.log(i);
// }while(i<5)
//? any method not return anything will return undefined
// let a1 = alert("hello"); 
// console.log(a1); //? return undefined
// let con = confirm("do you really wanna leave?"); //? true / false

// console.log(con , typeof con);
// if(con){

// }

// let promp = +(prompt("enter your number"));
// console.log(promp , typeof promp);
// let res = promp*10;
// console.log(res, typeof res); //? concatenate

//& Convert String to Number 
//? 1- Explicit --> Conversion
//^ A- parseInt() , parseFloat()
//* 1- if(promp.length === 0) NaN "toxic value -- number -- not equal anything even if itself"
// console.log(NaN === NaN);
// console.log(typeof NaN);
//* 2- terminate string " 123" --> "123"
//* 3- check in first char --> letters --> NaN
//*                        --> numbers --> letters 
//*                                               --> return numbers only 
//^ B- Number() , +
//* 1- if(promp.length === 0) return 0
//* 2- terminate string --> " 123" --> "123"
//* 3- loop over all the input --> digits --> digits 
//*                                letters --> NaN

console.log(+'1' +2);
//? 2 - Implicit --> Coercion
//^ + ==> number to string 
//^ - , * , / ==> string to number

//? ///////////////////////////////////////////////
//* DRY --> Don't Repeat Yourself
//^ 1- function declaration or function statement
function Sum(x,y){
    if(arguments.length !== 2){
        return "you should enter two nums only"
    }
    if(typeof x !== 'number'){
        return;
    }
    return x+y;
}
console.log(Sum(1,2,5));
console.log(Sum(1,2));
console.log(Sum("ali"));

//^ 2- function Expression
let Subtraction = function(x,y){
    return x-y;
}
console.log(Subtraction(3,1));

//^ 3- Arrow Function 

 //! no arguments.length available ---> rest parameter "Es6"
let mul1 =x=>x*10;
console.log(mul1(2));

let mul2=(x,y)=>x*y;
console.log(mul2(5,4));

let mul3=(x,y)=>{
    if(typeof x !== 'number'){
        return 0;
    }
    return x*y;
}
console.log(mul3(10,7));

//& Scope --> variable accessibility 
//? global = script , local = function , block , lexical
//^ 4- IIFE "Immediately Invoked Function Expression"
// (function(i){
//     console.log("IIFE V",i);
// })(1)

// (function(i){
//     console.log("IIFE V",i)}
// (2))
//? closure --> adv js " narrowing scope "
// !function(i){
//     console.log("IIFE V",i);
// }(3);

void function(i){
    console.log("IIFE V",i);
}(4);

//^ Anemones Function --> Function without name 
//^ Callback Function --> Function Passed as Argument to another Function


//*  var --> global scope / function scope
//* let & const --> block scope
{
    let zz = 20;
    console.log(zz);
}

//& Search "Explain" --> object + scope 
function xx(){
    nameee = "ali";
}
xx()
console.log(nameee);


