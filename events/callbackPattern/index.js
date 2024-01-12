// sync callback------------------------
// functions that are passed like map, filter, reduce, forEach, find, findIndex, every, some, sort, etc.

function callback(name) {
    console.log(`Hello ${name}`);
}


function higherOrderFunction(callback) {
    const name = 'Nikola';
    callback(name);
}

higherOrderFunction(callback);

//-----------------------------------------------------------------------------------------------------
// to continue or resume code execution after an asynchronous operation has completed

function callback(){
    document.getElementById('demo').innerHTML = 'Hello World';
}

document.getElementById('btn').addEventListener('click', callback);




// async callback