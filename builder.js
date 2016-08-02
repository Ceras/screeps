var Hive = require('./hive');

module.exports = function(creep){
    var run = function(){
        //if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY)) {
        //    creep.moveTo(Game.spawns['Spawn1']);
        //}
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var construction = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
            //console.log(JSON.stringify(creep.room.find(FIND_CONSTRUCTION_SITES)));
            var t = creep.build(construction);
            if( t == ERR_NOT_IN_RANGE) {
                creep.moveTo(construction);
            } else if(t === ERR_RCL_NOT_ENOUGH){
                creep.say('RLC low!');
            }
        } else {
            var hive = new Hive(Game.spawns['Spawn1']);
            if(hive.allowWithdrawal() && creep.withdraw(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hive.gameSpawn);
            }
        }
    };
    return {
        create: function(){
            Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        },
        run: run
    }
};
