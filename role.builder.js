/*
    Haden's Screeps program
	Version 0.8
	
	<role>
	"Builder"
	version 0.5

*/

var roleBuilder = {

    run: function(creep, buildersSource, buildersReaction) {

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
	    if(creep.memory.building) {//do builders work
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { reusePath: 3, visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    } else {//harvest sources
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[buildersSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[buildersSource], { reusePath: buildersReaction, visualizePathStyle: {stroke: '#ffaa00'}});
            }
		}
		var constructionSitesNum = Object.keys(Game.constructionSites).length
		if (constructionSitesNum == 0) {//if no construction sites, do repairers work
			const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
					//ADD structureType || structureType to repair chosen structures
					return (structure.structureType == STRUCTURE_CONTAINER) &&
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
	    else {//harvest sources
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[buildersSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[buildersSource], { reusePath: buildersReaction, visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;