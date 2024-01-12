const events = require('events');
const PizzaShop = require('./pizza-shop');
const DrinkMachine = require('./drink-machine');
// const eventEmitter = new events.EventEmitter();

// eventEmitter.on('request', (eventData) => {
//     console.log('on request - '+ eventData);
// });

// eventEmitter.emit('request', 'request emitted')


// events

// const eventEmitter = new events.EventEmitter();

// eventEmitter.on('order-pizza', (size, oponent) => {
//     if (size) {
//         console.log(`order-pizza event emitted ${oponent}`)
//     }
// })

// console.log(`do log before the event`);
// eventEmitter.emit('order-pizza', 'large', oponent = 'pepperoni')
// console.log(`do log after the event`);


const pizzaShop = new PizzaShop();
const drinkMachine = new DrinkMachine();

pizzaShop.on('order', (size, topping) => {
    console.log(`order event emitted ${size} ${topping}`);
    drinkMachine.serveDrink(size);
});

pizzaShop.order('large', 'pepperoni');
pizzaShop.order('medium', 'cheese');
pizzaShop.order('small', 'veggie');
// console.log(pizzaShop);
pizzaShop.displayOrderNumber();