type stringOrNum = string | number;

// https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
function AutoBind(target: any, name: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value
    const adjDescription: PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn
        }
    }
    return adjDescription
    console.log(target, name, descriptor)
}
class Print<T>{
    type: T;
    model: T;

    constructor(type: T, model: T) {
        this.type = type;
        this.model = model;
    }

    @AutoBind
    getInfo() { 
        console.log('This', this)
        if(typeof this.type === 'string' || typeof this.model === 'string') {
            console.log(this.type.toString() +' - '+ this.model.toString())
            return this.type.toString() + this.model.toString()
        }
         
    }
}

// var myPrint = new Print<string>("string", "string");

// document.getElementById("myBtn").addEventListener("click", function() {
//     document.getElementById("demo").innerHTML = "Hello World";
// });

export { Print as autoBind}