// export default function print(text) {
//     console.log(text)
// }

// export default function print1(text) {
//     // console.log('print1: ' + text)
//     console.log('Updating print.js...1');
// }

console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};