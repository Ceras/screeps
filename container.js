module.exports = function(storageId){
    this.gameContainer = Game.getObjectById(storageId);
    this.memory = Memory.base.containers[storageId];
    for(var key in this.memory){
        this[key] = this.memory[key];
    }

    this.allowWithdrawal = function(){
        return true
    };

    this.saveMemory = function(){
        Memory.base.containers[storageId] = this.memory;
    };

    this.getFillRate = function(){
        return this.gameContainer.store.energy / this.gameContainer.storeCapacity;
    };

    this.saveMemory();
};
