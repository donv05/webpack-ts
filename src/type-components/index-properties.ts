

interface errorContainer {  // {name: 'Must start ...', email: 'Email is required!'}
    [prop: string]: string;
}


const errorBag: errorContainer = {
    username: 'Must start with a capital character!',
    email: 'Not valid email!',
    password: 'Password is required!'
}


export {errorBag, errorContainer}