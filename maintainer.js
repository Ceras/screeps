var Base = require('./base');
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
                creep.memory.repairing = getStructuresSortedByHealth()[0].id;
            }
            var mostBrokenStructure = Game.getObjectById(creep.memory.repairing);

            if(mostBrokenStructure){
                if(creep.carry.energy == 0 && !isRepairDone(mostBrokenStructure)){
                    var source = Base.getContainerForWithdrawal();
                    if(source && creep.withdraw(source, RESOURCE_ENERGY, 20) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
                if(creep.repair(mostBrokenStructure) == ERR_NOT_IN_RANGE){
                    creep.moveTo(mostBrokenStructure);
                }

                if(isRepairDone(mostBrokenStructure)) {
                    creep.memory.repairing = undefined;
                    var target = Base.getContainerToFill();
                    if(creep.transfer(target, RESOURCE_ENERGY)) {
                        creep.moveTo(target);
                    }
                }
            }
        }
    }
};