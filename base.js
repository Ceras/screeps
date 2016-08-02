var GameControllers = require('./gameControllers');
var Hive = require('./hive');
var Container = require('./container');
//var Extension = require('./extension');

var buildBase = function(room){
    var controllerLevel = room.controller.level;
    for(var baseLevel = 1; baseLevel <= controllerLevel ; baseLevel++){
        var buildOrder = GameControllers.buildOrder.rcl[baseLevel];
        buildOrder.forEach(function(order){
            var hive = Game.spawns['Spawn1'];
            var x = hive.pos.x + order.pos.x;
            var y = hive.pos.y + order.pos.y;
        })
    }
};

module.exports = {
    hive: {},
    containers: [],
    extensions: [],
    init: function(){
        this.hive = new Hive(Game.spawns['Spawn1']);
        var room = this.hive.spawn.room;

        this.findExistingStructures(room);
        buildBase(room);
    },
    findExistingStructures: function(room){
        room.find(FIND_MY_STRUCTURES, {
            filter: function(structure){
                if(structure.type === 'container'){
                    this.containers.push(new Container(structure));
                } else if(structure.type === 'extension'){
                    //this.extensions.push(new Extension(structure));
                }
            }
        });
    },
    getContainerToFill: function(){
        var container = this.containers[0];
        return container || Game.spawns['Spawn1'];
    }
};

