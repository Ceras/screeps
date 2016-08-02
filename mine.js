module.exports = function(mineId) {
    this.memory = Memory.mines[mineId];
    for(var key in this.memory){
        this[key] = this.memory[key];
    }

    this.setFullyExploited = function(){
        var fullyExploited = (this.missingMiners() + this.missingTransporters()) === 0;

        this.fullyExploited = fullyExploited;
        this.memory.fullyExploited = fullyExploited;
    };

    this.saveMemory = function(){
        Memory.mines[mineId] = this.memory;
    };

    this.join = function(creepId, role){
        if(this.memory[role+'s'].indexOf(creepId) === -1){
            this.memory[role+'s'].push(creepId);

            this.memoryUpdated();
        }
    };

    this.leave = function(creepId, role){
        if(role && role !== 'harvester'){
            this.memory[role+'s'].splice(this.memory[role+'s'].indexOf(creepId), 1);

            this.memoryUpdated();
        }
    };

    this.missingMiners = function(){
        return this.maxMiners - this.miners.length;
    };

    this.missingTransporters = function(){
        return this.maxTransporters - this.transporters.length;
    };

    this.memoryUpdated = function(){
        this.saveMemory();
        this.setFullyExploited();
    };

    this.setFullyExploited();
    this.saveMemory();
};
