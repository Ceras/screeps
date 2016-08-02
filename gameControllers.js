module.exports = {
  units: [
    {
      "role": "builder",
      "priority": 2,
      "amount": 2, //global unit amount
      "build": [WORK,CARRY,MOVE]
    }, {
      "role": "miner",
      "priority": 1,
      "amount": 3, // should be the number of worker in mines
      "build": [WORK,MOVE]
    },{
      "role": "transporter",
      "priority": 1,
      "amount": 2, // should be the number of worker in mines
      "build": [CARRY,CARRY,MOVE,MOVE]
    },{
      "role": "maintainer",
      "priority": 2,
      "amount": 0,
      "build": [WORK,CARRY,MOVE]
    },{
      "role": "upgrader",
      "priority": 3,
      "amount": 0,
      "build": [WORK,CARRY,MOVE]
    }
  ],
  buildOrder: {
    rcl: {
      1: [{
        type: 'container',
        pos: {x: 2, y: -2}
      }],
      2: [{
        type: 'extension',
        pos: {x: 0, y: -2}
      }, {
        type: 'extension',
        pos: {x: 0, y: 2}
      }, {
        type: 'extension',
        pos: {x: -2, y: 0}
      }, {
        type: 'extension',
        pos: {x: 2, y: 0}
      }, {
        type: 'extension',
        pos: {x: -2, y: -2}
      }]
    }
  }
};