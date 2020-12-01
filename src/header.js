import "./style.css";
import "../src/css/header.css";

function header() {

    debugger
    const element = document.createElement('div');
    const h1 = document.createElement('H1')
    const br = document.createElement('br');

    const txt = document.createTextNode("Your H1 text"); 
    h1.appendChild(txt); 
    // h1.innerText = 'Your H1 text'
    h1.classList = 'header'
    element.appendChild(br);
    element.appendChild(h1);

    element.classList = 'header'
    return element;
}

document.body.appendChild(header());