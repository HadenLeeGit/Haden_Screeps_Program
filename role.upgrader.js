/*
    Haden's Screeps program
	Version 0.4.0
	
	<role>
	"Upgrader"
    Version 0.1.0

*/

//====================ROLE CONSOLE====================	

    //source acquisition and allocation of role
    var upgradersSource = 0; 

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
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if(creep.harvest(sources[upgradersSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[upgradersSource], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;