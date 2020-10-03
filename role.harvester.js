/*
    Haden's Screeps program
    Version 0.5
	
    <role>
    "Harvester"
    version 0.5

*/

//====================ROLE CONSOLE====================	

//source acquisition and allocation of role
var harvestersSource = 1;

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
                creep.moveTo(sources[harvestersSource], { visualizePathStyle: { stroke: '#ffaa00' } });
            }

        }
        else {
            //delivery energy to STRUCTURE
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            },
            );
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
                if (creep.transfer(targets[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[1], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }

    }
};

module.exports = roleHarvester;