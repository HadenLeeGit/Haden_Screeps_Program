/*

    Haden's Screeps program
    Version 0.7

    <main>
    stateScanner js
    version 0.6

*/

//========================CONSOLE========================	

//run set up tick per time
var stateScannerTick = 5;

//=======================THE END=======================

var stateScanner = {

    run: function (myRoomName) {

        // run 20 tick per time
        if (Game.time % stateScannerTick) return

        if (!Memory.stats) Memory.stats = {}

        // GCL / GPL upgrade percent and rank
        Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100
        Memory.stats.gclLevel = Game.gcl.level
        Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100
        Memory.stats.gplLevel = Game.gpl.level

        // CPU use percent
        Memory.stats.cpu = Game.cpu.getUsed()

        // bucket free capacity
        Memory.stats.bucket = Game.cpu.bucket

        //creeps number
        Memory.stats.creepsNum = Object.keys(Game.creeps).length

        //get all creeps number with different roles
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
        var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

        Memory.stats.harvestersNum = Object.keys(harvesters).length
        Memory.stats.upgradersNum = Object.keys(upgraders).length
        Memory.stats.buildersNum = Object.keys(builders).length
        Memory.stats.defendersNum = Object.keys(defenders).length
        Memory.stats.healersNum = Object.keys(healers).length
        Memory.stats.repairersNum = Object.keys(repairers).length

        //get extension and spawns number and total free/used capacity with percent
        
        //get extensions number
        var extensions = Game.rooms[myRoomName].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION
            }
        })
        Memory.stats.entensionsNum = Object.keys(extensions).length

        //get spawns number
        var spawns = Game.rooms[myRoomName].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN
            }
        })
        Memory.stats.spawnsNum = Object.keys(spawns).length
        
        //energyAvailable from extensions and spawn
        var roomEnergyAvailable = Game.rooms[myRoomName].energyAvailable
        console.log('[Room Energy Available]: ' + '[' + roomEnergyAvailable + ']')
        Memory.stats.roomEnergyAvailable = roomEnergyAvailable

        //energyCapacityAvailable from extensions and spawn
        var roomEnergyCapacityAvailable = Game.rooms[myRoomName].energyCapacityAvailable
        console.log('[Room Energy Capacity Available]: ' + '[' +roomEnergyCapacityAvailable + ']')
        Memory.stats.roomEnergyCapacityAvailable = roomEnergyCapacityAvailable
        
        //percentage of EnergyAvailable/energyCapacityAvailable
        var roomEnergyPercent = (roomEnergyAvailable / roomEnergyCapacityAvailable) * 100
        Memory.stats.roomEnergyPercent = roomEnergyPercent

        //construction sites number
        Memory.stats.sitesNum = Object.keys(Game.constructionSites).length

    }
}

module.exports = stateScanner;