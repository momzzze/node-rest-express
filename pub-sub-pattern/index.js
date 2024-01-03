const eventBus = require('./eventBus.js');

const kittenActions = () => {
    console.log('kitten-added has been invoked!');
}
eventBus.subscribe('kitten-removed', () => {
    console.log('kitten-removed has been invoked!');

});

const unsubscribe = eventBus.subscribe('kitten-added', kittenActions);

eventBus.subscribe('kitten-updated', () => {
    console.log('kitten-updated has been invoked!');
});
eventBus.subscribe('kitten-updated', (kittenName) => console.log(`kitten-updated has been invoked with name: ${kittenName}`));

eventBus.publish('kitten-updated');


eventBus.publish('kitten-added');
eventBus.publish('kitten-removed');
eventBus.publish('kitten-updated', 'Mittens');
console.log('-----------------------------');
unsubscribe();

eventBus.publish('kitten-added');
eventBus.publish('kitten-removed');
eventBus.publish('kitten-updated', 'Mittens');