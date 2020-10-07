/*
	Haden's Screeps program
	Version 0.8
	
	<role>
	"repairer"
	version 0.5

*/

var roleRepairer = {

	//Repairer function
	run: function (creep, repairersSource, repairersReaction) {

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
					return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_RAMPART) &&
                        structure.hits < structure.hitsMax;
                }
            },);
			targets.sort(
				function (a, b) {
					var aHitsPercent = a.hits/a.hitsMax
					var bHitsPercent = b.hits/b.hitsMax
					if (aHitsPercent < bHitsPercent) {
						return -1;
					} else if (aHitsPercent > bHitsPercent) {
						return 1;
					} else {
						return 0
					}					
				}
			);
			if (targets.length) {
				if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { reusePath: 3, visualizePathStyle: { stroke: '#ffffff' } });
				}
			}
		}
		else {
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[repairersSource]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[repairersSource], { reusePath: repairersReaction, visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
	}
};

module.exports = roleRepairer;