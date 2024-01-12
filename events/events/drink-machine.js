

class DrinkMachine{
    constructor(size){
        this.size = size;
    }
    serveDrink(size){
        if(size=== 'large'){
            console.log(`serving large drink`);
        }
    }
}

module.exports = DrinkMachine;