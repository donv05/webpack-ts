// type Admin =  {
//     name: string;
//     privileges: string[];
// }

// type Employee = {
//     name: string;
//     startDate: Date;
// }

interface Admin {
    name: string;
    privileges: string[];
}

interface Employee {
    name: string;
    startDate: Date;
    age: number;
}

type ElevatedEmployee = Admin | Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
    age: 50
}


type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;  // mixin return type number, just types like number | boolean ....
let universal: Universal;
universal = 12; // 

type UnknownEmployee = Admin | Employee;
// Type guards, a code pattern where you check for a certain type before you try
// to do something with it at runtime. you avoid runtime errors by checking types before you to do
// something with the values.
function printEmployeeInformation(emp: UnknownEmployee) {   // Type guards
    console.log(emp.name)
    if('privileges' in emp) {
        console.log('emp: Admin')
    } 
    if('age' in emp) {
        console.log('emp: Employee')
    }
}

console.log(e1)


// Discriminating Unions
type NetWorkLoadingState = {
    state: 'loading';
}

type NetWorkFailedState = {
    state: "failed";
    code: number;
}

type NetworkSuccessState = {
    state: 'success';
    response: {
        title: string;
        duration: number;
        summary: string;
    }
}

type NetworkState = NetWorkLoadingState | NetWorkFailedState | NetworkSuccessState;

function logger(state: NetworkState) {
    console.log("states: ", state.state)
    // state.code;
}

logger({state: 'loading'})
 

export {printEmployeeInformation, e1};