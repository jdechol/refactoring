import { sayHello } from './module'; 
import { sayHi } from './module2'; 
const element = document.createElement('h1'); 
element.innerHTML = sayHello('World');
document.body.appendChild(element);
const element2 = document.createElement('h2'); 
element2.innerHTML = sayHi();
document.body.appendChild(element2);