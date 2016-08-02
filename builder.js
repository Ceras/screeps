var Base = require('./base');

module.exports = function(creep){
    var run = function(){
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
            var t = creep.build(construction);
            if( t == ERR_NOT_IN_RANGE) {
                creep.moveTo(construction);
            } else if(t === ERR_RCL_NOT_ENOUGH){
                creep.say('RLC low!');
            }
        } else {
            var source = Base.getContainerForWithdrawal();
            if(source && creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    };
    return {
        run: run
    }
};
