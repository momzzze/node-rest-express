const EventEmiter = require('events');

const eventEmiter = new EventEmiter();

eventEmiter.on('kitten-added', () => {
    console.log('kitten-added event emitted');
})

eventEmiter.on('kitten-removed', () => {
    console.log('kitten-removed event emitted');
})

eventEmiter.on('kitten-updated', (kittenName, age) => {
    console.log('kitten-updated event emitted. Kitten name: ' + kittenName + ' age: ' + age);
})

eventEmiter.emit('kitten-added');
eventEmiter.emit('kitten-removed');
eventEmiter.emit('kitten-updated', 'Mittens', 2);