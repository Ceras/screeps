var Container = require('./container');

module.exports = {
    containers: [],

    get: function(id){
        return _.find(this.containers, function(container){
            return container.id === id;
        })
    },
    add: function(containerId){
        this.containers.push(new Container(containerId));
    },
    create: function(container){
        var containerData = {
            id: container.id,
            pos: container.pos
        };

        Memory.base.containers = Memory.base.containers || {};
        Memory.base.containers[container.id] = containerData;
        this.add(container.id)
    },
    getContainersByFillRate: function(direction){
        return _.sortBy(this.containers, function(container){
                var fillRate = container.getFillRate();
                return direction === 'asc' ? fillRate : -fillRate;
            }) || [];
    }
};