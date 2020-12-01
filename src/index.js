import _ from "lodash";

// import * as pack from "package";

// function component() {
//     const element = document.createElement('div');

//     const btn = document.createElement('button');

//     // Lodash, currently included via a script, is required for this line to work
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//     // element.classList.add(['primary-txt','header'])
//     element.classList = 'primary-txt header'

//     // Add the image to our existing div
//     const myIcon = new Image()
//     myIcon.classList.add('header__icon')
//     myIcon.src = icon

//     element.appendChild(myIcon)

//     // console.log(Data);
//     // console.log(Notes);
//     // console.log("json5 ->", json5);
//     btn.innerHTML = 'Click me and check the console!';
//     // btn.onclick = print;
//     element.onclick = print1.bind(null, 'Hello webpack!1');

//     element.appendChild(btn);

//     return element;
// }

// let element = component(); // Store the element to re-render on print.js changes
//  document.body.appendChild(element);

// if (module.hot) {
//     module.hot.accept('./print.js', function() {
//         console.log('Accepting the updated printMe module!');
//         // print1();

//         document.body.removeChild(element);
//         element = component(); // Re-render the "component" to update the click handler
//         document.body.appendChild(element);
//     })
// }

// split both production and development

// if (process.env.NODE_ENV !== "production") {
//   console.log("Looks like we are in development mode!");
// }

// function component() {
//   const element = document.createElement("pre");

//   // Lodash, now imported by this script
//   // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.innerHTML = ["Hello webpack!", "5 cubed is equal to " + cube(5)].join(
//     "\n\n"
//   );

//   return element;
// }

// document.body.appendChild(component());

// console.log(pack)

// Lazy loading
function component() {
        const element = document.createElement('div');
    //    const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
    const button = document.createElement('button');
    const br = document.createElement('br');

    button.innerHTML = 'Click me and look at the console!';
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.appendChild(br);
    element.appendChild(button);

    element.classList = 'primary-txt header'

    // Note that because a network request is involved, some indication
    // of loading would need to be shown in a production-level site/app.
    button.onclick = e => import('./print').then(module => {
        const print = module.default;

        print();
        console.log('-----------')
    });

    return element;
}

document.body.appendChild(component());