/*
    Haden's Screeps program
	Version 0.7
	
	<role>
	"Builder"
	version 0.3

*/

//====================ROLE CONSOLE====================	

	//source acquisition and allocation of role
	var buildersSource = 0;
	
	//set number >20 to avoid creeps blocked at resource points
    //set lower number to increase creeps' reaction
    //Default value = 5, higher number require more CPU source
	var reusePathNum = 25;

//=======================THE END=======================

var roleBuilder = {

    run: function(creep) {

		//builder status
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('build');
	    }

		//builder function
	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { reusePath: 3, visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[buildersSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[buildersSource], { reusePath: reusePathNum, visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;