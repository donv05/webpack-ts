const names: Array<string> = ['a', 'b'] // string[] = [string, string, ....]

const promise: Promise<number> = new Promise((res, rej) => {
    setTimeout(() => {
        res(10)
    }, 3000);
})

promise.then(data => console.log('promise ', data));

type NewType = string | any;

async function asyncFn(data: string) {
    let reData;
    console.log('start: ',reData);
   await promise.then(data => reData = data);
   console.log('end: ',reData);
}

asyncFn('asyncFn')

// console.log('end asyncFn')

// Create generics function 
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>('identity');
console.log(output)

// Generics types
function identity1<T>(arg: T): T {
    return arg
}

let myIdentity: <Y>(arg: Y) => Y = identity1
myIdentity<string>("string")
let myIdentity1: {<Y>(arg: Y): Y } = identity1
console.log(myIdentity1('mama'))

// Create generic interface 

interface GenericIdentityFn {
    <T>(arg: T): T
}
// or 
interface GenericIdentityFn1<Y> {
    (arg: Y): Y
}
function GenericIdentityFn<T>(arg: T): T {
    return arg
}

let myGenericIdentityFn: GenericIdentityFn = GenericIdentityFn
let myGenericIdentityFn1: GenericIdentityFn1<string> = GenericIdentityFn
myGenericIdentityFn('string')
myGenericIdentityFn1('string')


// Generic Contraints 

interface Lengthwise { // 1
    length: number
} 
interface Otherwise {
    value: string
} 

function loggingIdentity<T extends Lengthwise & Otherwise>(arg: T) {
    console.log (arg.length, arg.value, arg) // don't read this properties, so add interface to extend them. (1)
}

loggingIdentity({value: 'string', length: 12, other: 'hello word!'})


// Generic Class
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T
}
let myGenericNum = new GenericNumber<number>();
myGenericNum.zeroValue = 1
myGenericNum.add = (x, y)=>{
    let sum = x + y;
    console.log(sum)
    return sum;
}

myGenericNum.add(100, 200)

export {asyncFn, names}