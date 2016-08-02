var Container = require('./container');

module.exports = {
    containers: [],

    get: function(id){
        return _.find(this.containers, function(container){
            return container.id === id;
        })
    },
    add: function(mineId){
        this.containers.push(new Container(mineId));
    },
    create: function(container){
        var containerData = {
            id: container.id,
            pos: container.pos
        };


        Memory.base.containers[container.id] = containerData;
        this.add(container.id)
    }
};