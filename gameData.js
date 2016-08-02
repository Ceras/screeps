var MineCollection = require('./MineCollection');
module.exports = function(){
    // default Data
    Memory.mines = Memory.mines || {};
    Memory.exploredRooms = Memory.exploredRooms || [];

    this.exploreRoom = function(roomName){
        if(this.roomNotExplored(roomName)){
            var room = Game.rooms[roomName];

            if(room){
                this.findMines(room);

                this.roomExplored(roomName)
            }
        }
    };

    this.findMines = function(room){
        room.find(FIND_SOURCES).forEach(function(source){
            MineCollection.create(source);
        },this);
    };

    this.roomNotExplored = function(roomName){
        return Memory.exploredRooms.indexOf(roomName) === -1;
    };

    this.roomExplored = function(roomName){
        Memory.exploredRooms.push(roomName);
    };
};