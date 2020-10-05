/*
	Haden's Screeps program
	Version 0.7
	
	<role>
	"repairer"
	version 0.3

*/

//====================ROLE CONSOLE====================	

	//source acquisition and allocation of role
	var repairersSource = 0; 
	
	//set number >20 to avoid creeps blocked at resource points
    //set lower number to increase creeps' reaction
    //Default value = 5, higher number require more CPU source
	var reusePathNum = 25;

//=======================THE END=======================	

var roleRepairer = {

	//Repairer function
	run: function (creep) {

		//harves status	
		if (creep.memory.repairing && creep.carry.energy == 0) {
			creep.memory.repairing = false;
		}
		else if (!creep.memory.repairing && creep.carry.energy < creep.carryCapacity) {
			creep.memory.repairing = false;
		}
		else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
			creep.memory.repairing = true;
		}

		//find not full hits structure to repaier
		if (creep.memory.repairing) {
			const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
					//ADD structureType || structureType to repair chosen structures
					return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_TOWER) &&
                        structure.hits < structure.hitsMax;
                }
            },);
			targets.sort((a, b) => a.hits - b.hits);
			if (targets.length) {
				if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { reusePath: 3, visualizePathStyle: { stroke: '#ffffff' } });
				}
			}
		}
		else {
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[repairersSource]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[repairersSource], { reusePath: reusePathNum, visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
	}
};

module.exports = roleRepairer;