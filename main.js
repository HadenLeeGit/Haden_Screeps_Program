/*

    Haden's Screeps program
    Version 0.1.3

    <main>
    main js
    Version 0.1.3
    
*/

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    //====================MAIN CONSOLE====================
    
    /*Real-time alive roles number
        Spawning priority
        1. harvester
        2. builder
        3. upgrader
    */
    var harvestersNum = 2;
    var buildersNum = 2;
    var upgradersNum = 2; 

    //Harvester type modify
    var harvestType = [WORK, CARRY, MOVE];
    
    //builder type modify
    var builderType = [WORK, CARRY, MOVE];
    
    //upgrader type modify
    var upgraderType = [WORK, CARRY, MOVE];

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

    //keep alive harvester creeps not less than 2.
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if (harvesters.length < harvestersNum) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(harvestType, newName,
            { memory: { role: 'harvester' } });
    }
    
    //keep alive builder creeps not less than 2.
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    if (builders.length < buildersNum && harvesters.length > 1) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(builderType, newName,
            { memory: { role: 'builder' } });
    }
    
    //keep alive upgrader creeps not less than 2.
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    if (upgraders.length < upgradersNum && harvesters.length > 1 && builders.length > 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(upgraderType, newName,
            { memory: { role: 'upgrader' } });
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
    }
}