//? Numbers 
let x = 5;
let y = new Number(5);
console.log(y.valueOf(),y.constructor.name);
let num = 12.525789;
//^ toFixed() --> convert num to string / round /
console.log( num.toFixed(2));
//^ toPrecision --> convert num to string
console.log(num.toPrecision(4));
//^ isInteger - isNaN - isFinite --> coercion "jjfdjsk" --> false
console.log(Number.isInteger(num));
let testVar = 123+undefined;  //? NaN
console.log(Number.isNaN(testVar));
console.log(NaN === NaN);
console.log(Number.isFinite("123"));
//& ///////////////////////////////////////////////
//? Math 
console.log(Math.PI);
console.log(Math.max(2,4,6,1));
console.log(Math.min(2,4,6,1));
console.log(Math.pow(6,2));
console.log(Math.round(1.247));
console.log(Math.floor(1.5789));
console.log(Math.ceil(1.2789));
console.log(Math.round(Math.random()*10));
//& /////////////////////////////////////////
//? Dates 
//* min & sec --> 0-59 , hrs --> 0-23 , day 0"sunday" -6 , months --> 0-11
let d = new Date();
console.log(d);
//* getters 
console.log(d.getDate());
console.log(d.getMonth()+1);
console.log(d.getFullYear());
console.log(d.getTime()); //? ms to hrs
console.log(d.getHours());
//* setters
// d.setDate(23)
console.log(d);
//* to 
console.log(d.toLocaleString('ar-EG'));
//& /////////////////////////////////////////////////
//? Boolean
let truthy = true
let falsy = new Boolean(false)
if(x){}
let namee = "ggjl";
console.log(Boolean(namee));
console.log(!!namee);
//& //////////////////////////////////////////
//? Object
let obj1 = new Object({
    "id":1,
    "name":"ali"
});
console.log(obj1);
console.log(obj1.id); //* dot notation
console.log(obj1["name"]); //* bracket notation
console.log(typeof obj1 , obj1.constructor.name); //* adv js [search]
delete obj1.id;
console.log(obj1);

let obj2 = {
    id:10,
    name:"omar",
   "age year" : 2000,
   skills:["html","css","js"],
   //~ Concise fun
   //? old syntax
   print:function(){
    return "hello world"
   },
   //? es6 syntax
   display(){
    return "new syntax for fn in obj"
   }
}
console.log(typeof obj2 , obj2.constructor.name); //* adv js [search]
console.log(obj2[" age year"]);
console.log(obj2.print());
console.log(obj2.display());

console.log(Object.keys(obj2));
console.log(Object.values(obj2));
console.log(Object.entries(obj2));

for(let i in obj2){
    console.log(i+"--->  "+obj2[i]);
}

for(let i=0;i<obj2.skills.length;i++){
    console.log(obj2.skills[i]);
}

//& /////////////////////////////////////
//? Symbols --> create unique values
let s1 = Symbol("123");
let s2 = Symbol("123");
console.log(s1===s2);
console.log(s1 , typeof s1);

//& /////////////////////////////////
//? BigInt
console.log(Number.MAX_SAFE_INTEGER);
let numm = BigInt(12345878851444444444444444444444444444444);
console.log(numm);
//& ////////////////////////////////////////

//? Error Object
//~ typeError
// console.logg("")
//~ reference Error
// console.log(fullName);
//~ syntax error
// console.log(;
//~ Eval Error --> eval() xxxxxxx
// eval("4+7") //? 11
//~ Range Error 
//~ Url Error --> decoding&encoding


//^ Explicit  let err = new Error("msg")
//^ Implicit  throw new TypeError("msg")

function Sum(x,y){
    if(arguments.length !== 2){
        throw new SyntaxError("you should enter two args")
        console.error("you should enter two args")
      
    }else{
        return x+y
    }
}

try{
console.log(Sum());
}catch(err){
    console.error(err);
}finally{
console.log("aya 7aga ");
console.log(Sum(1,2));
}
// console.log(Sum());
//? DOM , BOM , API , Hoisting 