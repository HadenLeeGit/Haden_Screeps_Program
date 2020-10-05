<<<<<<< HEAD
/*
	Haden's Screeps program
	Version 0.7
	
	<structure>
	"tower"
	version 0.4

*/

//=======================CONSOLE=======================	


//=======================THE END=======================

var structureTower = {

	//Tower function
	run: function (myRoomName) {

		var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
		var towers = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });

		//if there are hostiles - attakc them    
		if (hostiles.length > 0) {
			var username = hostiles[0].owner.username;
			Game.notify(`User ${username} spotted in room ${myRoomName}`);
			towers.forEach(tower => tower.attack(hostiles[0]));
			console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!!");
		}

		//if there are no hostiles....
		if (hostiles.length === 0) {

			//....first heal any damaged creeps
			for (let name in Game.creeps) {
				// get the creep object
				var creep = Game.creeps[name];
				if (creep.hits < creep.hitsMax) {
					towers.forEach(tower => tower.heal(creep));
					console.log("Tower is healing Creeps.");
				}
			}

			for (var i in towers) {
				//...repair Buildings! :) But ONLY until HALF the energy of the tower is gone.
				//Because we don't want to be exposed if something shows up at our door :)
				if (towers.energy > ((towers.energyCapacity / 10) * 9)) {

					//Find the closest damaged Structure
					var closestDamagedStructure = towers.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART });
					if (closestDamagedStructure) {
						towers.repair(closestDamagedStructure);
						console.log("The tower is repairing buildings.");
					}
				}
			}

		}
	}
}

=======
/*
	Haden's Screeps program
	Version 0.7
	
	<structure>
	"tower"
	version 0.4

*/

//=======================CONSOLE=======================	


//=======================THE END=======================

var structureTower = {

	//Tower function
	run: function (myRoomName) {

		var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
		var towers = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });

		//if there are hostiles - attakc them    
		if (hostiles.length > 0) {
			var username = hostiles[0].owner.username;
			Game.notify(`User ${username} spotted in room ${myRoomName}`);
			towers.forEach(tower => tower.attack(hostiles[0]));
			console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!!");
		}

		//if there are no hostiles....
		if (hostiles.length === 0) {

			//....first heal any damaged creeps
			for (let name in Game.creeps) {
				// get the creep object
				var creep = Game.creeps[name];
				if (creep.hits < creep.hitsMax) {
					towers.forEach(tower => tower.heal(creep));
					console.log("Tower is healing Creeps.");
				}
			}

			for (var i in towers) {
				//...repair Buildings! :) But ONLY until HALF the energy of the tower is gone.
				//Because we don't want to be exposed if something shows up at our door :)
				if (towers.energy > ((towers.energyCapacity / 10) * 9)) {

					//Find the closest damaged Structure
					var closestDamagedStructure = towers.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART });
					if (closestDamagedStructure) {
						towers.repair(closestDamagedStructure);
						console.log("The tower is repairing buildings.");
					}
				}
			}

		}
	}
}

>>>>>>> origin/master
module.exports = structureTower;