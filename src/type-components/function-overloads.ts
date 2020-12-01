type Combinable = string | number;


function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
    if(typeof a === 'string' || typeof b === 'string') {
        return a.toString() + ' ' + b.toString();
    }
    return a + b;
}

const result = add('First', 'Second');
console.log(result.split(" "))


//optional chaining

const fetchData = {
    id:'id',
    name: 'max',
    join: {title: 'CEO', description: 'My own company'} // option chain
}

console.log(fetchData?.join?.title);


export {result as fnOverload}
