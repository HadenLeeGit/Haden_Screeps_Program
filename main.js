/*

    Haden's Screeps program
    Version 0.2.0

    <main>
    main js
    Version 0.1.3

*/

var roleHarvester = require('./role.harvester');
var roleUpgrader = require('./role.upgrader');
var roleBuilder = require('./role.builder');
var roleRepairer = require('./role.repairer');

module.exports.loop = function () {

//====================MAIN CONSOLE====================

    /*Real-time alive roles number
        Spawning priority
        1. harvester
        2. upgrader
        3. builder
        4. repairer
    */
    var harvestersNum = 3;
    var upgradersNum = 3;
    var buildersNum = 4;
    var repairersNum = 2;

    // Any non-THOUGH part above 5 will use 200 energy that sits inside a random extension with enough energy.
    //Harvester type modify
    var harvestType = [WORK, WORK, CARRY, MOVE, MOVE];

    //upgrader type modify
    var upgraderType = [WORK, CARRY, CARRY, MOVE, MOVE];

    //builder type modify
    var builderType = [WORK, WORK, CARRY, MOVE];

    //repairer type modify
    var repairerType = [WORK, CARRY, MOVE, MOVE];

//=======================THE END=======================

    /*  var tower = Game.getObjectById('82e26d71767cd2bc3b1f2b70');
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
    
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
    */

    //delete dead creeps in memory.
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //keep alive harvester creeps not less than number in console.
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if (harvesters.length < harvestersNum) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(harvestType, newName,
            { memory: { role: 'harvester' } });
    }

    //keep alive upgrader creeps not less than number in console.
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    if (upgraders.length < upgradersNum && harvesters.length > 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(upgraderType, newName,
            { memory: { role: 'upgrader' } });
    }

    //keep alive builder creeps not less than number in console.
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    if (builders.length < buildersNum && harvesters.length > 1 && upgraders.length > 1) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(builderType, newName,
            { memory: { role: 'builder' } });
    }

    //keep alive repairer creeps not less than number in console.
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairers: ' + repairers.length);

    if (repairers.length < repairersNum && harvesters.length > 1 && builders.length > 1 && upgraders.length > 1) {
        var newName = 'Repairer' + Game.time;
        console.log('Spawning new Repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(repairerType, newName,
            { memory: { role: 'repairer' } });
    }


    //visulize spawning creeps
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    //active roles
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}