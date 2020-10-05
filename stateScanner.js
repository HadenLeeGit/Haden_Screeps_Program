<<<<<<< HEAD
/*

    Haden's Screeps program
    Version 0.7

    <main>
    stateScanner js
    version 0.3

*/

//========================CONSOLE========================	

    //run set up tick per time
    var stateScannerTick = 5; 

//=======================THE END=======================

var stateScanner = {

    run: function () {

        // run 20 tick per time
        if (Game.time % stateScannerTick) return

        if (!Memory.stats) Memory.stats = {}

        // GCL / GPL upgrade percent and rank
        Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100
        Memory.stats.gclLevel = Game.gcl.level
        Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100
        Memory.stats.gplLevel = Game.gpl.level
        
        // CPU use percent
        Memory.stats.cpu = Game.cpu.getUsed()
        
        // bucket free capacity
        Memory.stats.bucket = Game.cpu.bucket

        //creeps number
        Memory.stats.creepsNum = Object.keys(Game.creeps).length

        //construction sites number
        Memory.stats.sitesNum = Object.keys(Game.constructionSites).length

    }
}

=======
/*

    Haden's Screeps program
    Version 0.7

    <main>
    stateScanner js
    version 0.3

*/

//========================CONSOLE========================	

    //run set up tick per time
    var stateScannerTick = 5; 

//=======================THE END=======================

var stateScanner = {

    run: function () {

        // run 20 tick per time
        if (Game.time % stateScannerTick) return

        if (!Memory.stats) Memory.stats = {}

        // GCL / GPL upgrade percent and rank
        Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100
        Memory.stats.gclLevel = Game.gcl.level
        Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100
        Memory.stats.gplLevel = Game.gpl.level
        
        // CPU use percent
        Memory.stats.cpu = Game.cpu.getUsed()
        
        // bucket free capacity
        Memory.stats.bucket = Game.cpu.bucket

        //creeps number
        Memory.stats.creepsNum = Object.keys(Game.creeps).length

        //construction sites number
        Memory.stats.sitesNum = Object.keys(Game.constructionSites).length

    }
}

>>>>>>> origin/master
module.exports = stateScanner;