/*
	Haden's Screeps program
	Version 0.7
	
	<role>
	"defender"
	version 0.2

*/

//====================ROLE CONSOLE====================	

//set number >20 to avoid creeps blocked at resource points
//set lower number to increase creeps' reaction
//Default value = 5, higher number require more CPU source
var reusePathNum = 1;

//=======================THE END=======================

var roleDefender = {

	//defender function
	run: function (creep) {

		//Attack status
		_.forEach(Game.rooms, room => {
			let eventLog = room.getEventLog();
			let attackEvents = _.filter(eventLog, { event: EVENT_ATTACK });
			attackEvents.forEach(event => {
				let target = Game.getObjectById(event.data.targetId);
				if (target && target.my) {
					console.log(event);
				}
			});
		});

		//Defend status
		const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if (target) {
			creep.say('Defend!');
			if (creep.attack(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target, { reusePath: reusePathNum, visualizePathStyle: { stroke: '#ED1C24' } });
			}
		}
	}

};

module.exports = roleDefender;