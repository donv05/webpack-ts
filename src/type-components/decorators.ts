function Logger(logString: string) {
    console.log('Logging...')
    // console.log(constructor)
    return function(constructor: Function) {
        // console.log(logString)
        // console.log(constructor)
    }
}

function sealed(isSealed: boolean) {
    // do something with 'target' ...
    console.log('sealed', isSealed)
    return function(target: any, key: any, descriptor: any) {
        // console.log(target, key, descriptor)
        target.age = 11;
    }
}

function readonly(target: any, key: any, descriptor: any) {
    console.log("readonly: evaluated");
    // descriptor.writable = false;
    // return descriptor;
    // console.log(target)
    target.age = 10
}

// When @WithTemplate is executed, it will seal both the constructor and its prototype.
// function WithTemplate(template: string, hookId: string) {
//     return function(constructor: any) {
//         console.log('Rendering template')
//         // console.log(constructor)
//         const hookEl = document.getElementById(hookId)
//         const p = new constructor()
//         // console.log('con: ', p)
//         if(hookEl) {
//             hookEl.innerHTML = template;
//             hookEl.querySelector('h1')!.textContent = p.name
//         }


//     }
// }

function WithTemplate(template: string, hookId: string) {
    return function<T extends { new (...args: any[]): {name: string} }>(constructor: T) {
        
        return class extends constructor {
            constructor(...args: any[]) {
                super()
                const hookEl: HTMLElement = document.getElementById(hookId) as HTMLElement;
                hookEl.innerHTML = template;
                hookEl.querySelector('h1')!.textContent = this.name
            }
            
        };
    }
    
}


function sealed1(constructor: Function) {
    console.log('sealed1...')
    Object.seal(constructor);
    Object.seal(constructor.prototype);
    console.log(constructor)
}

function classDecorator(
    template: string, hookId: string
  ) {
    return <T extends { new (...args: any[]): {name: any} }> (constructor: T) => {
        return class extends constructor {
            hookEl: HTMLElement = document.getElementById(hookId) as HTMLElement;
            newProperty = "new property";
            hello = template;
            constructor(...args: any[]) {
                super()
                this.hookEl.innerHTML = template;
                this.hookEl.querySelector('h1')!.textContent = this.name
                
            }
         
        };
    }
  }


function f() {
    console.log("f(): evaluated");
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        console.log("f():", target, propertyKey, descriptor);
    };
}


// @sealed1
@classDecorator('<h1>With template</h1>', 'root')
@Logger('LOG-STRING')
// @WithTemplate('<h1>With template</h1>', 'root')
class Person {
    name = 'Max';
    age: number;
    constructor() {
        console.log('create person object...')
    }

    @readonly
    @sealed(true)
    getName(){
        console.log('getName()', this.age)
    }

    @f()
    getAny(){}
}

export {Person}