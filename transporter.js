var transferToSpawn = function(creep){
    if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY)) {
        creep.moveTo(Game.spawns['Spawn1']);
    }
};
var CreepUtility = require('./creepUtility');
var MineCollection = require('./MineCollection');

module.exports = function(creep){
    creep.memory.id = creep.memory.id || creep.id;

    if(!creep.memory.workerAt){
        var currentMine = MineCollection.getClosestMineWithWorkFor(creep.memory.role);
        currentMine.join(creep.memory.id, creep.memory.role);

        creep.memory.workerAt = currentMine.id;
    }

    this.run = function(){
        var goingHome = creep.carryCapacity === creep.carry.energy;

        if(goingHome){
            transferToSpawn(creep);
        } else {
            if(Game.getObjectById(creep.memory.workerAt)){
                var resourcesOnGround = Game.getObjectById(creep.memory.workerAt).pos.findInRange(FIND_DROPPED_ENERGY, 1);

                if(resourcesOnGround.length > 0){
                    resourcesOnGround = _.sortBy(resourcesOnGround, function(resource){
                        return -resource.energy;
                    });
                    if(resourcesOnGround[0].energy > 10 && creep.pickup(resourcesOnGround[0]) === 0){

                    } else {
                        creep.moveTo(resourcesOnGround[0]);
                    }
                }
            }

        }
    };

    return {
        run: this.run
    }
};