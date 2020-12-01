// import { sum } from "lodash";

// import {printEmployeeInformation, e1} from './intersection-type';
// import {fnOverload} from './function-overloads'

// import {asyncFn, names} from './generics'

// import * as decoration from './decorators'

// export default function sumNum(txt: number) {
//     return txt;
// }

// console.log("Hello word !" , sumNum(10))
// console.log("Type: mix both of interface! ");
// let em = {name: 'name', startDate: new Date(), age: 50, privileges: ['something like that!']}
// printEmployeeInformation(em)

// let person = new decoration.Person()
// person.getName()


// import {autoBind} from './autobind'
// Auto binding 

// var auto = new autoBind<string>('mini', '2020');
// auto.getInfo()
// document.getElementById("myBtn").addEventListener("click", auto.getInfo); // current this of Button not object-> fixed add a external function (1) and nested this function
// document.getElementById("myBtn").addEventListener("click", function(){
//     console.log(this)
//     // -> 'this' key not constraint auto.getInfo()
//     auto.getInfo()
// }); // 1
// document.getElementById("myBtn").addEventListener("click", auto.getInfo.bind(auto)); // or use binding 
// document.getElementById("myBtn").addEventListener("click", auto.getInfo); // or use @decorator


// input project 
require("../style.css")
import ProjectInput from './input-project/index'

var myProject = new ProjectInput();