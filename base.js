var GameControllers = require('./gameControllers');
var Hive = require('./hive');
var ContainerCollection = require('./ContainerCollection');
var CreepCollection = require('./creepCollection');
//var Extension = require('./extension');

var buildBase = function(room){
    var controllerLevel = room.controller.level;

    for(var baseLevel = 1; baseLevel <= controllerLevel ; baseLevel++){
        var buildOrder = GameControllers.buildOrder.rcl[baseLevel];
        buildOrder.forEach(function(order){
            var hive = Game.spawns['Spawn1'];
            var x = hive.pos.x + order.pos.x;
            var y = hive.pos.y + order.pos.y;

            var result = room.createConstructionSite(x, y, order.type);
        })
    }
};

module.exports = {
    hive: {},
    extensions: [],
    init: function(){
        Memory.base = {};
        this.hive = new Hive(Game.spawns['Spawn1']);
        var room = this.hive.gameSpawn.room;

        this.findExistingStructures(room);
        buildBase(room);
    },
    findExistingStructures: function(room){
        room.find(FIND_STRUCTURES, {
            filter: function(structure){
                if(structure.structureType === 'container'){
                    ContainerCollection.create(structure);
                } else if(structure.structureType === 'extension'){
                    //this.extensions.push(new Extension(structure));
                }
            }
        });
    },
    getContainerToFill: function(){
        if(!CreepCollection.unitsByType.maintainer && this.hive.gameSpawn.energy !== 300){
            return this.hive.gameSpawn;
        }

        return ContainerCollection.getContainersByFillRate('desc')[0].gameContainer || this.hive.gameSpawn;
    },
    getContainerForWithdrawal: function(){
        var validContainers = _.filter(ContainerCollection.getContainersByFillRate('asc'), function(container){
            return container.allowWithdrawal();
        });

        if(validContainers.length > 0){
            return validContainers[0].gameContainer
        } else if(this.hive.allowWithdrawal()){
            return this.hive.gameSpawn;
        }

        return {};
    }
};

