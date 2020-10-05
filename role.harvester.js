/*
    Haden's Screeps program
    Version 0.7
	
    <role>
    "Harvester"
    version 0.6

*/

//====================ROLE CONSOLE====================	

    //source acquisition and allocation of role
    var harvestersSource = 1;
	
	//set number >20 to avoid creeps blocked at resource points
    //set lower number to increase creeps' reaction
    //Default value = 5, higher number require more CPU source
    var reusePathNum = 20;

//=======================THE END=======================

var roleHarvester = {

    //harvester function
    run: function (creep) {
        //harvest status if stored energy = o
        if(creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = false;
            creep.say('harvest');
        }
        
        //store status if capacity is full
	    if(!creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
	        creep.memory.harvesting = true;
	        creep.say('storing');
	    }        
   
        //find and carry SOURCES
        if (!creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[harvestersSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[harvestersSource], { reusePath: reusePathNum, visualizePathStyle: { stroke: '#ffaa00' } });
            }

        }
        else {
            //delivery energy to STRUCTURE
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            },);
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { reusePath: 3, visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }

    }
};

module.exports = roleHarvester;