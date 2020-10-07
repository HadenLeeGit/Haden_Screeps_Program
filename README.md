# Haden_Screeps_Program

## Introduction
---
This is the program for Screeps.
It is basically a stable program with all you need in early-stage (when RCL <= 4).

## Roles
---
#### 1. harvester
    harvest source and move energy to structure you added
#### 2. upgrader
    harvest source and move energy to RCL
#### 3. builder
    harvest source and go to build
#### 4. defender
    if find the enemy in the room, it will give info to the console log and find the enemy location to attack immediately
#### 5. healer
    find roles that lost hints to heal
#### 6. repairer
    repair structure you added
## Structures
---
#### 1. tower
    find the enemy in the room, it will give info to the console log and find the enemy location to attack immediately. find lost hints creeps and structure to heal

## Function
---
#### 1. **Main Console** in main.js to modify roles number with correct spawn priority.
#### 2. Spawning creeps automatic with the modified number and modified parts with the correct priority
#### 3. Modify roles parts in **Main Console**
#### 4. Modify source location in each **Main Console**
#### 5. Creep with different roles showing status and route line
#### 6. The function to control creeps' reaction in **Main Console**
#### 7. **Extended function** state scanner give state information to the Grafana Dashboard
#### 8. set up structerTower.run(roomName) in **Main Console** to active towers
#### 9. monitor the surviving number of harvesters. if the number is zero, the harvesterType brake will be changed to produce the basic [WORK, CARRY, MOVE] harvester to ensure that the program continues to run