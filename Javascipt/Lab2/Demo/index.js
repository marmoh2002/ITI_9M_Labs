//? Datatypes in js 
//* 1- Arrays "Object Datatype"
//& A- Dense Arrays 
let arr1 = new Array(2);
arr1[0]=10; //! not recommended
console.log(arr1 , arr1.length);
let arr2 = [1,2,3,4,'ali',[10,20],function sum(){
}]; //^ preferred
console.log(arr2[3] , arr2.length);

for(let i=0;i<arr2.length;i++){
    console.log(arr2[i]);
}
//? maps in Es6
//& Associative Arrays 
let arr3 = [];
arr3["id"]=1;
arr3["name"]="ali";
console.log(arr3);
//? For -- of "interview QN"
for(let i in arr3){
    console.log(i+" --> "+arr3[i]);
}

//* Methods 
//~ Add
let arr4 = [1,2];
//^ push --> add at end
console.log(arr4.push(10));  //* return new length
console.log(arr4); //* effect original
//^ unshift --> add from start
console.log(arr4.unshift(15)); //* return new length
console.log(arr4); //* effect original
//^ splice --> add from specific index
console.log(arr4.splice(2,0,20,30,40,50)); //* return deleted elems
console.log(arr4); //* effect original

//~ delete
console.log(arr4.splice(1,5,150)); //* return array of deleted elements 
console.log(arr4);//* effect original
//^ pop --> delete from end
console.log(arr4.pop()); //* return last element
console.log(arr4); //* effect original
//^ shift --> delete from the beginning
console.log(arr4.shift()); //* return first element
console.log(arr4); //* effect original


//^ slice --> start index , end index "not included" [copy Array]
let arr5 = [1,2,3,4,5];
console.log(arr5.slice(1,3));
console.log(arr5);
console.log(arr5.slice(arr5.length-1));
console.log(arr5.slice(-3));
console.log(arr5);
let copiedArr4 = arr4.slice()
console.log(copiedArr4);

//^ reverse  -->  effect original
console.log(arr4.reverse());
console.log(arr4);

//^ sort --> based on ASCII
let arr6 = [1,-125,5,220];
console.log(arr6.sort());
//* A>B --> 1
//* A<B --> -1
//* A===B --> 0
console.log(arr6.sort((a,b)=>a-b)); //? Ascending
console.log(arr6.sort(function(a,b){return b-a})) //? descending

//^ filter --> array of all matched elements
//^ find --> first matched element
let arr7 = [1,2,3,50,100];
let newArr=[];
for(let i=0;i<arr7.length;i++){
    if(arr7[i]%2 === 0){
        newArr.push(arr7[i])
    }
}
console.log(newArr);
let filteredArray = arr7.filter((i)=>i===50)[0];
let findedElement = arr7.find((i)=>i%2===0);
console.log(filteredArray);
console.log(findedElement);
console.log(arr7);

let sum=0
for(let i=0;i<arr7.length;i++){
    sum += arr7[i]
}
console.log(sum);
//^ reduce
let reducedArr = arr7.reduce((sum,el)=>sum+=el)
console.log(reducedArr);
//^ map 
let names = ["ali","omar", "ali","omar","ali"];
let newNames = names.map((i)=>i+"@iti.com")
console.log(newNames);
console.log(names);

let a =[1,2,3];
let b =[4,5,6];
let c = [a,b];
console.log(c);
console.log(c.flat());
console.log(c);
c = a.concat(b);
console.log(c);

console.log(names.indexOf('ahmed')); //? -1 not found
console.log(names.indexOf('ali'));
console.log(names.lastIndexOf('ali'));
console.log(names.includes("ali",3));

console.log(names.toString());
console.log(names.join("/"));

let arr8 = [10,20,30,1];
console.log(arr8.some((i)=>i%2===0));
console.log(arr8.every((i)=>i%2===0));

//* ///////////////////////////////////////////////////////////
//& Regular Expression 
//^modifiers
//? i --> case insensitive  , g --> global , m --> multiplelines
//? . -> any character , ^ -> start , $ -> end , | -> or , [] -> match any one char , [^ ] -> match any one char not btn the bracket 
//? * --> zero or more , + --> one or more , ? --> zero or one 
//? {min , max} -->> range / {val} -->> exact value 

//* let regularS1 = /pattern/modifier
let namePattern = /^[A-Za-z]+$/;
// let namee;
// do{
// // namee = prompt("Enter Your Name");
// }while(! namee.match(namePattern))
//     console.log(namee);
//* let regularS2 = new RegExp("pattern","modifier")
let pattern = new RegExp("^[a-z]{5,}$","i");
let namee = "qwehh";
console.log(pattern.test(namee)); //? true or false
console.log(pattern.exec(namee)); //? array [matched pattern] / null
console.log(namee.match(pattern)); //? array [matched pattern] / null

//* ///////////////////////////////////////////////////
//? Strings --> array type
let str = "ILTI@Alex.coml\nghfLhfhjl";
console.log(str);
console.log(str.indexOf("l"));
console.log(str.lastIndexOf("l"));
console.log(str.slice(-2));
console.log(str.substring(7,1));
console.log(str.substring(1,7));
console.log(str.replace(/l/gim,"@"));
console.log(str);
let newStr = str.split(".")
console.log(newStr.splice(1,0,"."));
console.log(newStr);

let strr = new String("hello")
// console.log(strr,strr.length , strr[1]);
for(let i =0 ; i<strr.length;i++){
    // console.log(strr[i]);
}
//& for in / for of 