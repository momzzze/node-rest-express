// respond to custom events
const EventEmitter = require('node:events');


const emitter = new EventEmitter();


emitter.on('order-pizza', (size, topping) => {
    console.log(`Order received! Baking a ${size} pizza with ${topping}`);
})
console.log('do work before event occurs in the system');
emitter.on('order-pizza', (size) => {
    if (size === 'large'){
        console.log(`Serving complimentary drink!`);
    }
        
})

emitter.emit('order-pizza', 'large', 'mushroom');
console.log('-------------------');
emitter.emit('order-pizza', 'small', 'mushroom');