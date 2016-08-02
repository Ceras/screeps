var Hive = require('./hive');
module.exports = function(creep){
    var getStructuresSortedByHealth = function(){
        var allStructures = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: function(structure){
            return structure.structureType !== STRUCTURE_CONTROLLER
                && structure.structureType !== STRUCTURE_WALL;
        }});

        return allStructures.sort(function (a, b) {
            var aHealthPercentage = a.hits / a.hitsMax,
                bHealthPercentage = b.hits / b.hitsMax;

            return aHealthPercentage - bHealthPercentage
        });
    };

    var isRepairDone = function(structure){
        return (structure.hits / structure.hitsMax) === 1
    };

    return {
        run: function() {
            if(!creep.memory.repairing){
                creep.say('New target');
                creep.memory.repairing = getStructuresSortedByHealth()[0].id;
            }
            var mostBrokenStructure = Game.getObjectById(creep.memory.repairing);

            if(mostBrokenStructure){
                if(creep.carry.energy == 0 && !isRepairDone(mostBrokenStructure)){
                    var hive = new Hive(Game.spawns['Spawn1']);
                    if(hive.allowWithdrawal() && creep.withdraw(Game.spawns['Spawn1'], RESOURCE_ENERGY, 20) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hive.gameSpawn);
                    }
                }
                if(creep.repair(mostBrokenStructure) == ERR_NOT_IN_RANGE){
                    creep.moveTo(mostBrokenStructure);
                }

                if(isRepairDone(mostBrokenStructure)) {
                    creep.say('Idle');
                    creep.memory.repairing = undefined;

                    if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY)) {
                        creep.moveTo(Game.spawns['Spawn1']);
                    }
                }
            }
        }
    }
};