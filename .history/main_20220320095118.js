/*

    Haden's Screeps program
    Version 0.8

    <main>
    main js
    version 0.7

*/

var roleHarvester = require('./role.harvester');
var roleUpgrader = require('./role.upgrader');
var roleBuilder = require('./role.builder');
var roleRepairer = require('./role.repairer');
var roleDefender = require('./role.defender');
var roleHealer = require('./role.healer');
var structureTower = require('./structure.Tower')
var stateScanner = require('./stateScanner');

module.exports.loop = function () {

//====================MAIN CONSOLE====================

    //Real-time alive roles number
    //harvester and upgrader have high spawning priority
    var harvestersNum = 3;
    var upgradersNum = 4;
    var buildersNum = 0;
    var defendersNum = 0;
    var healersNum = 0;
    var repairersNum = 3;

    //creeps type modify by roles
    var harvestType = [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];

    var upgraderType = [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];

    var builderType = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]; 

    var defenderType = [TOUGH, ATTACK, MOVE];

    var healerType = [TOUGH, HEAL, MOVE, MOVE];

    var repairerType = [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];

    //source acquisition and allocation of role
    var harvestersSource = 1;
    var upgradersSource = 0; 
    var buildersSource = 0;
    var repairersSource = 1;

    //set number >20 to avoid creeps blocked at resource points
    //set lower number to increase creeps' reaction
    //Default value = 5, higher number require more CPU source
    var harvestersReaction = 5;
    var upgradersReaction = 5;
    var buildersReaction = 5;
    var repairersReaction = 20;
    var healersReaction = 1;
    var defendersReaction = 1;

    //enter your room name to active structure tower
    structureTower.run('E31N17')
    
    //enter your <roomName> and <stateScannerTick> to active stateScanner
    //<stateScannerTick>: run set up tick per time
    stateScanner.run('E31N17', 5)

//=======================THE END=======================



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
    
    //if no modified harvester alive, always keep one basic harvester alive
    if (harvesters.length == 0) {
        harvestType = [WORK, CARRY, MOVE];
    }
    
    if (harvesters.length < harvestersNum) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(harvestType, newName,
            { memory: { role: 'harvester' } });
    }
    
    //keep alive upgrader creeps not less than number in console.
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    if (upgraders.length < upgradersNum && harvesters.length >= 2) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(upgraderType, newName,
            { memory: { role: 'upgrader' } });
    }

    //keep alive builder creeps not less than number in console.
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    if (builders.length < buildersNum && harvesters.length >= 2 && upgraders.length >= 1) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(builderType, newName,
            { memory: { role: 'builder' } });
    }

    //keep alive defender creeps not less than number in console.
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    console.log('Defenders: ' + defenders.length);

    if (defenders.length < defendersNum && harvesters.length >= 2 && upgraders.length >= 1) {
        var newName = 'Defender' + Game.time;
        console.log('Spawning new defender: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(defenderType, newName,
            { memory: { role: 'defender' } });
    }
    
    //keep alive healer creeps not less than number in console.
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    console.log('Healers: ' + healers.length);

    if (healers.length < healersNum && harvesters.length >= 2 && defenders.length >= 1) {
        var newName = 'Healer' + Game.time;
        console.log('Spawning new Healer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(healerType, newName,
            { memory: { role: 'healer' } });
    }
//TODO 
    //keep alive repairer creeps not less than number in console.
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairers: ' + repairers.length);

    if (repairers.length < repairersNum && harvesters.length >= 2 && builders.length >= buildersNum && upgraders.length >= 1) {
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
            roleHarvester.run(creep, harvestersSource, harvestersReaction);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, upgradersSource, upgradersReaction);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep, buildersSource, buildersReaction);
        }
        if (creep.memory.role == 'defender') {
            roleDefender.run(creep, defendersReaction);
        }
        if (creep.memory.role == 'healer') {
            roleHealer.run(creep, healersReaction);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep, repairersSource, repairersReaction);
        }
    }
}