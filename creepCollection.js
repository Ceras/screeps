module.exports = {
    unitsByType: {},

    addCreep: function(creep){
        this.unitsByType[creep.memory.role] = this.unitsByType[creep.memory.role] || [];

        this.unitsByType[creep.memory.role].push({id: creep.id, name: creep.name, role: creep.memory.role});
    },
    getCreepsByRole: function(role){
        return this.unitsByType[role] || [];
    }
};