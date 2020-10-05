<<<<<<< HEAD
/*
    Haden's Screeps program
    Version 0.7
	
    <role>
    "healer"
    version 0.3

*/

//====================ROLE CONSOLE====================	
    	
	//set number >20 to avoid creeps blocked at resource points
    //set lower number to increase creeps' reaction
    //Default value = 5, higher number require more CPU source
    var reusePathNum = 1;

//=======================THE END=======================

var roleHealer = {

    //healer function
    run: function (creep) {

        //healer status
        const targets = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.hits < object.hitsMax;
            }
        });
        if (targets != null) {
            targets.sort((a, b) => a.hits - b.hits); if (targets.length) {
                if (creep.heal(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { reusePath: reusePathNum, visualizePathStyle: { stroke: '#0000FF' } });
                }
            }
        }


    }
};

=======
/*
    Haden's Screeps program
    Version 0.7
	
    <role>
    "healer"
    version 0.3

*/

//====================ROLE CONSOLE====================	
    	
	//set number >20 to avoid creeps blocked at resource points
    //set lower number to increase creeps' reaction
    //Default value = 5, higher number require more CPU source
    var reusePathNum = 1;

//=======================THE END=======================

var roleHealer = {

    //healer function
    run: function (creep) {

        //healer status
        const targets = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.hits < object.hitsMax;
            }
        });
        if (targets != null) {
            targets.sort((a, b) => a.hits - b.hits); if (targets.length) {
                if (creep.heal(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { reusePath: reusePathNum, visualizePathStyle: { stroke: '#0000FF' } });
                }
            }
        }


    }
};

>>>>>>> origin/master
module.exports = roleHealer;