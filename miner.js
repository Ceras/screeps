var CreepUtility = require('./creepUtility');
var MineCollection = require('./MineCollection');

module.exports = function(creep) {
    creep.memory.id = creep.memory.id || creep.id;


    if(!creep.memory.workerAt){
        var currentMine = MineCollection.getClosestMineWithWorkFor(creep.memory.role);
        currentMine.join(creep.memory.id, creep.memory.role);

        creep.memory.workerAt = currentMine.id;
    }

    var run = function(){
        var gameMine = Game.getObjectById(creep.memory.workerAt);

        if(creep.harvest(gameMine) !== OK) {
            var minePos = MineCollection.get(creep.memory.workerAt).pos;
            creep.moveTo(new RoomPosition(minePos.x, minePos.y, minePos.roomName));
        }
    };

    return {
        run: run
    }
};