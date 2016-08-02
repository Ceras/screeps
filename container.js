module.exports = function(storageId){
    this.memory = Memory.storages[storageId];
    for(var key in this.memory){
        this[key] = this.memory[key];
    }
    
    this.allowWithdrawal = function(){
        return true
    };

    this.saveMemory = function(){
        Memory.storages[storageId] = this.memory;
    };

    this.saveMemory();
};
