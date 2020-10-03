/*
    Haden's Screeps program
    Version 0.5
	
    <role>
    "healer"
    version 0.2

*/

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
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#0000FF' } });
                }
            }
        }


    }
};

module.exports = roleHealer;