/*
    Haden's Screeps program
	Version 0.3.0
	
	<role>
	"Harvester"
    Version 0.1.0

*/

//====================ROLE CONSOLE====================	

    //source acquisition and allocation of role
    var harvestersSource = 1;

//=======================THE END=======================

var roleHarvester = {
    
    //harvester function
    run: function(creep) { //find and carry SOURCES
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[harvestersSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[harvestersSource], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else { //delivery energy to STRUCTURE
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION 
                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
                            || structure.structureType == STRUCTURE_SPAWN);
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;