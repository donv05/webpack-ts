import * as _ from 'lodash';
require('../css/header.css');

function component() {
    const rootEl = document.createElement('div');
    //    const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
    const button = document.createElement('button');
    const br = document.createElement('br');

    button.innerHTML = 'Click me and look at the console!';
    button.id = 'myBtn'
    rootEl.className = 'root';
    rootEl.id = 'root'
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    const header = document.createElement('div');
    header.className = 'header'
    header.appendChild(button);
    rootEl.appendChild(header);

    // Note that because a network request is involved, some indication
    // of loading would need to be shown in a production-level site/app.
    button.onclick = e => import('../print').then(module => {
        const print = module.default;

        print();
    });
    return rootEl
}


document.body.appendChild(component())
