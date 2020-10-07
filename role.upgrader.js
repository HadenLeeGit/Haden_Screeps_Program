/*
    Haden's Screeps program
	Version 0.8
	
	<role>
	"Upgrader"
    version 0.4

*/

var roleUpgrader = {

    //Upgrader function
    run: function(creep, upgradersSource, upgradersReaction) {
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
                creep.moveTo(creep.room.controller, { reusePath: 3, visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if(creep.harvest(sources[upgradersSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[upgradersSource], { reusePath: upgradersReaction, visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;