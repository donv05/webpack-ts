
function template(template: any, node: string, style: string): any {
    let element = document.createElement('div')
    element.className = node
    element.id = node
    element.innerHTML = template
    let rootElement: any = document.getElementById('root')
    rootElement.appendChild(element)
    return function (target: any ,propertyKey: string,  descriptor: PropertyDescriptor) {
        // console.log(target, propertyKey, descriptor)
    }

}

function autoBind(){
    return function(target: any, name: string, descriptor: PropertyDescriptor) {
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
    }
}

const html = `
    <template id="project-input">
        <form id="user-input" class="form">
        <label class="form__label" for="title">Title:</label><br>
        <input class="form__input" type="text" id="title" name="title"><br>
        <label class="form__label" for="des">Description:</label><br>
        <textarea class="form__input" id="description" name="description" rows="4" cols="50"></textarea></br>
        <label class="form__label" for="people">People:</label><br>
        <input class="form__input" type="number" id="people" name="people">
        <button type="button" class="btn btn--primary" id="submitData">Add Project</button>
    </form>
    </template>
    <div class="card-box" id="active-project">
        <h2 class="card-box__title card-box__title--active">Active Project</h2>
    </div>
    <div class="card-box" id="active-achieved">
        <h2 class="card-box__title card-box__title--achieved">Achieved Project</h2>
    </div>
    
    <template id="single-project">
       <div class="card-list">
            <ul class="card">
                <li class="card__item">
                    <h2></h2>
                    <h3></h3>
                    <p></p>
                </li>
            </ul>
        </div>
    </template>
    <template id="project-list">
        <span>Project list</span>
    </template>

`;

const style = `
    .project-input {background: rgba(183, 247, 251, .2);
        display: grid;
        grid-template-columns: 200px;
        justify-items: center;
    }
`

type mixType = [string, string, number]| void | string | object

type Listener = (items: any) => void  // format type function for variable
// like function function a(cb: Function) {} or function a(cb: Listener) {}

abstract class Component <T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement
    hostElement: T
    element: U

    constructor( 
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId: string
    ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement
        this.hostElement = document.getElementById(hostElementId) as T
        const importedNode = document.importNode(
            this.templateElement.content,
            true
        )
        this.element = importedNode.firstElementChild as U 
        if(newElementId) {
            this.element.id = newElementId
        }
        this.attach(insertAtStart)
        // this.configure()

    }

    attach(insertAtStart: boolean) {
        // document.getElementById('form-component').insertAdjacentElement('afterbegin', this.element)
        this.hostElement.insertAdjacentElement(insertAtStart? 'afterbegin': 'beforeend', this.element)
    }

    abstract configure(): void;
    abstract renderContent(): void
    
}

interface Project {
    id?: number,
    title: string,
    people: number,
    description: string
}

class ComponentItem extends Component<HTMLUListElement, HTMLLIElement> {
    
    project: Project

    constructor(hostId: string, project: Project){
        super('single-project', hostId, false, project.id + '') // .tostring()
        this.project = project

    }

    configure(): void {
        // throw new Error("Method not implemented.")
    }

    renderContent(): void {
        this.element.querySelector('li').id = this.project.id.toString()
        this.element.querySelector('li').draggable = true
        this.element.id = ''
        this.element.querySelector('h2')!.textContent = this.project.title.toString()
        this.element.querySelector('h3')!.textContent = this.project.people.toString()
        this.element.querySelector('p')!.textContent = this.project.description.toString()
        this.setDragAndDropEvent(this.project.id.toString(), 'active-achieved')
    }
    

    setDragAndDropEvent(idDragstart: string, idDrop: string){
        document.getElementById(idDragstart).addEventListener('dragstart', this.drag)
        document.getElementById(idDrop).addEventListener('drop', this.drop)

        document.getElementById(idDragstart).addEventListener('drop', this.drop1)
        document.getElementById(idDrop).addEventListener('dragstart', this.drag)

        document.addEventListener("dragover", function(event) {event.preventDefault();})
    }

    drag(ev: any){
        
        ev.dataTransfer.setData("text", ev.target.id);
        console.log(ev.dataTransfer)
    }

    drop(ev: any) {
        console.log(ev)
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        // ev.target.appendChild(document.getElementById(data));
        document.getElementById('active-achieved').appendChild(document.getElementById(data))
    }

    drop1(ev: any) {
        console.log(ev)
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        // ev.target.appendChild(document.getElementById(data));
        document.getElementById('active-project').appendChild(document.getElementById(data))
    }
}

@template(html, 'form-component', style)
export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    
    // extend form Component class 
    // templateElement: HTMLTemplateElement
    // hostElement: HTMLDivElement
    // element: HTMLFormElement

    titleInputElement: HTMLInputElement
    descriptionElement: HTMLInputElement
    peopleInputElement: HTMLInputElement
    id: number = 0

    constructor() {
        // debugger
        super('project-input', 'form-component', true, 'user-input')

        // extend from Component
        // this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement
        // this.hostElement = document.getElementById('form-component')! as HTMLDivElement
        // const importedNode = document.importNode(
        //     this.templateElement.content,
        //     true
        // )
        // this.element = importedNode.firstElementChild as HTMLFormElement
        // this.element.id = 'user-input'
        // this.attach()
        // extend form Component

        
        this.setInputElement()
        this.configure()
        
    }

    // extend from Component
    // attach() {
    //     // this.hostElement.appendChild(this.element)
    //     document.getElementById('form-component').insertAdjacentElement('afterbegin', this.element)
    //     //afterbegin : insert into child of the form-component and set to top form-component
    // }

    setInputElement() {
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionElement = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement
    }

    @autoBind()
    submitData(event: any, that?: any) {
        let valid = this.gatherUserInput()
        if(typeof valid === 'string' ) {
            alert(valid)
        } else {
            this.id += 1
            let data = {...valid, id: this.id} as Project
            let project = new ComponentItem('active-project', data)
            project.renderContent()
            

        }
    }

    querySelector() {

    }

    // override method from Component class
    configure() {
        // const that = this  // also to use bind 
        // document.getElementById("submitData").addEventListener("click", function() { // 'This' key is this of button
        //     that.submitData(that)
        // });
        // document.getElementById("submitData").addEventListener("click", () => {this.submitData(this)}); //this of object

        // document.getElementById("submitData").addEventListener("click", this.submitData.bind(this));
        // this.element.addEventListener("click", this.submitData.bind(this));

        // use decoration 
        document.getElementById("submitData").addEventListener('click', this.submitData)
    }
    
    private validation(validateData: Validatable): boolean {

        let isValid = false;
        // debugger
        if(validateData.required && typeof validateData.value === 'string') {
            validateData.value.trim().length > 0 ?  isValid = true : isValid = false
        }

        if(validateData.maxLength && typeof validateData.value === 'string') {
            validateData.value.trim().length > validateData.maxLength ?  isValid = false : isValid = true
        }

        if(validateData.minLength  && typeof validateData.value === 'string') {
            validateData.value.trim().length >= validateData.minLength ?  isValid = true : isValid = false
        }

        if(validateData.min > 0 && typeof validateData.value === 'string') {
            parseInt (validateData.value) >= validateData.min ?  isValid = true : isValid =false
        }

        if(validateData.max > 0 && typeof validateData.value === 'string') {
            parseInt (validateData.value) > validateData.max ?  isValid = false : isValid = true
        }

        return isValid
    }

    private gatherUserInput(): mixType {
        const titleInputElement = this.titleInputElement.value
        const descriptionElement = this.descriptionElement.value
        const peopleInputElement = this.peopleInputElement.value
        if(
            !this.validation({value: titleInputElement, required: true, minLength: 5}) ||
            !this.validation({value: descriptionElement, required: true, minLength: 5}) ||
            !this.validation({value: peopleInputElement, required: true, min: 3})
        ) {
            return "some field's error!";
        }
        return {
            'title': titleInputElement, 
            'description': descriptionElement, 
            'people': parseInt(peopleInputElement),
        } as Project;
    };

    renderContent(): void {
        throw new Error("Method not implemented.")
    }

    
}


interface Validatable {
    value: string
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
}


