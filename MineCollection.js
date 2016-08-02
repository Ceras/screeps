var Mine = require('./mine');

var getDistanceToSpawn = function(source){
    return Game.spawns['Spawn1'].pos.getRangeTo(source);
};

var getMaxMiners = function(source){
    var roomName = source.pos.roomName;
    var x = source.pos.x;
    var y = source.pos.y;

    var adjacentTiles = Game.rooms[roomName].lookAtArea(y-1, x-1, y+1, x+1, true);

    return 9 -_.countBy(adjacentTiles, function (tile) {
            return tile.terrain;
        }).wall;
};

var getMaxTransporters = function(distance, maxMiners){
    // Depends on miner power, transport size and transport speed
    return Math.ceil(maxMiners*(distance*2)/100);
};

module.exports = {
    mines: [],
    getClosestMineWithWorkFor: function(role){
        var minesWithMissingOfRole = _.filter(this.mines, function(mine){
            return mine['missing' + _.capitalize(role) + 's']() !== 0;
        });

        return _.sortBy(minesWithMissingOfRole, function (mine) {
            return mine.distance;
        })[0];
    },
    get: function(id){
        return _.find(this.mines, function(mine){
            return mine.id === id;
        })
    },
    add: function(mineId){
        this.mines.push(new Mine(mineId));
    },
    create: function(source){
        var mineData = {
            id: source.id,
            pos: source.pos,
            distance: getDistanceToSpawn(source),
            maxMiners: getMaxMiners(source),
            maxTransporters: 0,
            miners: [],
            transporters: [],
            fullyExploited: false
        };

        mineData.maxTransporters = getMaxTransporters(mineData.distance, mineData.maxMiners)

        Memory.mines[source.id] = mineData;
        this.add(source.id)
    }
};