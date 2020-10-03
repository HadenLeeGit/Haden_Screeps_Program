/*
    Haden's Screeps program
	Version 0.2.0
	
	<role>
	"Builder"
	Version 0.1.0

*/

//====================ROLE CONSOLE====================	

	//source acquisition and allocation of role
	var buildersSource = 1;

//=======================THE END=======================

var roleBuilder = {

    run: function(creep) {

		//builder status
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

		//builder function
	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[buildersSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[buildersSource], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;