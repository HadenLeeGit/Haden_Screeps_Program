/*
    Haden's Screeps program
	Version 0.6
	
	<role>
	"Upgrader"
    version 0.3

*/

//====================ROLE CONSOLE====================	

    //source acquisition and allocation of role
    var upgradersSource = 0; 
    
    //set number >20 to avoid creeps blocked at resource points
    //set lower number to increase creeps' reaction
    //Default value = 5, higher number require more CPU source
    var reusePathNum = 50;

//=======================THE END=======================

var roleUpgrader = {

    //Upgrader function
    run: function(creep) {
        //harvest status if stored energy = o
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('harvest');
        }
        
        //upgrade status if capacity is full
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('upgrade');
	    }

        //update controller and harvest function
	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { reusePath: reusePathNum, visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if(creep.harvest(sources[upgradersSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[upgradersSource], { reusePath: reusePathNum, visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;