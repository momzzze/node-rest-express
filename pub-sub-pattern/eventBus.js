const listeners = {
    // [eventName]: [eventListener(), eventListener(), eventListener()]
}

const publish = (eventName, ...eventArgs) => {
    if (!listeners[eventName]) {
        return;
    }
    listeners[eventName].forEach((listener) => listener(...eventArgs));
};


const subscribe = (eventName, eventListener) => {
    if (!listeners[eventName]) {
        listeners[eventName] = [];
    }

    listeners[eventName].push(eventListener);
    return () => {
        console.log('before unsub ', listeners);
        console.log(`unsubscribing from ${eventName}`);
        listeners[eventName] = listeners[eventName].filter((listener) => listener !== eventListener);
        console.log('after unsub ', listeners);
    }
};
const eventBus = {
    publish,
    subscribe
}

module.exports = eventBus;