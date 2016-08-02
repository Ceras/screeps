var GameControllers = require('./gameControllers');
var GameData = require('./gameData');

var roles = {
    builder: require('./builder'),
    maintainer: require('./maintainer'),
    miner: require('./miner'),
    transporter: require('./transporter'),
    upgrader: require('./upgrader')
};

var Base = require('./base');
var Hive = require('./hive');
var Storage = require('./container');
var CreepCollection = require('./creepCollection');
var MineCollection = require('./MineCollection');

module.exports.loop = function () {
    //delete Memory.gameData;

    Base.init();
    var allMines = [],
        deadCreeps = [];

    var gameData = new GameData();
    var creepCollection = new CreepCollection();
    var hive = new Hive(Game.spawns['Spawn1']);
    var roomsToExplore = [hive.spawn.room.name]; //Object.keys(Game.rooms);

    roomsToExplore.forEach(function(roomName){
        if(gameData.roomNotExplored(roomName)){
            gameData.exploreRoom(roomName);
        }
    });

    for(var mineId in Memory.mines){
        MineCollection.add(mineId);
    }

    // run creeps
    for(var creepName in Memory.creeps){
        var creep = Game.creeps[creepName];

        if(creep){
            if(!creep.spawning){
                roles[creep.memory.role](creep, allMines).run();
            }

            creepCollection.addCreep(creep);
        } else {
            deadCreeps.push(creepName);
        }
    }

    // Delete creeps not in game
    deadCreeps.forEach(function(deadCreepName){
        var deadCreep = Memory.creeps[deadCreepName];

        if(deadCreep.workerAt){
            MineCollection.get(deadCreep.workerAt).leave(deadCreep.id, deadCreep.role);
        }

        delete Memory.creeps[deadCreepName];
    });

    // Autobuild units
    GameControllers.units.forEach(function(unitType){
        var nrOfUnits = creepCollection.getCreepsByRole(unitType.role).length + hive.unitsInQueueByRole(unitType.role);

        if(nrOfUnits < unitType.amount){
            hive.addAction({actionType: 'build', data: unitType});
        }
    });
};