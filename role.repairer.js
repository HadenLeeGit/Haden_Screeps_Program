/*
	Haden's Screeps program
	Version 0.2.0
	
	<role>
	"repairer"
	Version 0.0.1

*/

//====================ROLE CONSOLE====================	

	//source acquisition and allocation of role
	var repairersSource = 0; 

//=======================THE END=======================	

var roleRepairer = {

	//Repairer function
	run: function (creep) {

		//harves status	
		if (creep.memory.repairing && creep.carry.energy == 0) {
			creep.memory.repairing = false;
			creep.say('harvest');
		}
		else if (!creep.memory.repairing && creep.carry.energy < creep.carryCapacity) {
			creep.memory.repairing = false;
			creep.say('harvest');
		}
		else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
			creep.memory.repairing = true;
			creep.say('repair');
		}

		//find not full hits structure to repaier
		if (creep.memory.repairing) {
			const targets = creep.room.find(FIND_STRUCTURES, {
				filter: object => object.hits < object.hitsMax
			});
			targets.sort((a, b) => a.hits - b.hits);
			if (targets.length) {
				if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
					creep.say('repair');
				}
			}
		}
		else {
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[repairersSource]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[repairersSource], { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
	}
};

module.exports = roleRepairer;