module.exports = function(spawn){
    this.id = spawn.id;
    this.gameSpawn = spawn;
    this.unitTypesInQueue = {};

    this.setDefaultData = function(){
        Memory.hives = Memory.hives || {};

        this.memory = {
            currentAction: undefined,
            actionQueue: []
        };
    };

    this.loadMemory= function(){
        this.memory = Object.assign(this.memory, Memory.hives[this.id]);
        this.unitTypesInQueue = _.countBy(this.memory.actionQueue, function(action){
            return action.data.role;
        });

        if(this.memory.currentAction && !spawn.spawning){
            if(this.memory.currentAction === 'build'){
                this.unitTypesInQueue[this.memory.currentAction.data.role]--;
            }

            this.memory.currentAction = undefined;

            this.saveMemory();
        }
    };

    this.addAction = function(actionRequest){
        this.memory.actionQueue.push(actionRequest);

        this.memory.actionQueue = this.memory.actionQueue.sort(function(action1, action2){
            return action1.data.priority - action2.data.priority
        });

        if(actionRequest.actionType === 'build'){
            this.unitTypesInQueue[actionRequest.data.role] ? this.unitTypesInQueue[actionRequest.data.role]++ : this.unitTypesInQueue[actionRequest.data.role] = 1;
        }

        this.saveMemory();
    };

    this.executeAction = function(){
        if(!spawn.spawning && this.memory.actionQueue.length !== 0){
            var currentAction = this.memory.actionQueue[0];

            if(currentAction.actionType === 'build'){
                var result = Game.spawns['Spawn1'].createCreep(currentAction.data.build, undefined, {role: currentAction.data.role});

                if(typeof result === 'string'){
                    this.memory.currentAction = this.memory.actionQueue.shift();
                }
            }

            this.saveMemory();
        }
    };

    this.allowWithdrawal = function(){
        return (!spawn.spawning && this.memory.actionQueue.length === 0);
    };

    this.saveMemory = function(){
        this.memory.unitTypesInQueue = this.unitTypesInQueue;
        Memory.hives[this.id] = this.memory;
    };

    this.unitsInQueueByRole = function(role){
        return this.unitTypesInQueue[role] || 0;
    };

    this.setDefaultData();
    this.loadMemory();
    this.saveMemory();
    this.executeAction();
};
