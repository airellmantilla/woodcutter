// woodcutting script by airellmantilla
// Tested on 1920x1080 resolution
// Tested on Ikov.io client

// import the robotjs library
const robot = require('robotjs');

function main(){
    console.log("Starting Script...");
    sleep(3000);

    // Loop forever until stopped manually
    while(true){
        var tree = findTree();
        
        // if tree isn't found, rotate camera
        if (tree == false){
            rotateCamera();
            continue;
        }

        // chop down found tree
        robot.moveMouse(tree.x, tree.y);
        robot.mouseClick();
        sleep(3000);

        dropLogs();
    }
}

// drop logs in inventory after chopping
function dropLogs(){
    var inventory_x = 1755;
    var inventory_y = 760;
    var inventoryLogColour = "5b462a";

    //capture pixel colour of log inventory
    var pixelColor = robot.getPixelColor(inventory_x, inventory_y);

    var wait = 0;
    var maxWait = 9;
    while(pixelColor != inventoryLogColour && wait < maxWait){
        //wait to see if chopping animation is done
        sleep(1000);

        //check pixel colour again after waiting
        pixelColor = robot.getPixelColor(inventory_x, inventory_y);
        wait++;
    }

    //drop log if colour matches
    if (pixelColor == inventoryLogColour){
        robot.moveMouse(inventory_x, inventory_y);
        robot.mouseClick("right");
        sleep(300);
        robot.moveMouse(inventory_x - 25, inventory_y + 70);
        robot.mouseClick();
        sleep(1000);
    }
}

// rotate camera if tree isn't found
function rotateCamera(){
    console.log("Tree not found. Rotating camera...");
    robot.keyToggle("right", "down");
    sleep(1000);
    robot.keyToggle("right", "up");
}


// find a tree on the screen
function findTree(){
    var x = 300, y = 300, width = 1300, height = 400;
    var img = robot.screen.capture(x, y, width, height);

    var treeColours = ["705634", "60492c", "5b462a", "544026", "6d5432", "6a5130", "574328"];

    for(var i = 0; i < 100; i++){ 
        random_x = getRandomInt(0, width - 1);
        random_y = getRandomInt(0, height - 1);

        var sampleColour = img.colorAt(random_x, random_y);

        if (treeColours.includes(sampleColour)){
            var screen_x = x + random_x;
            var screen_y = y + random_y;

            if (validTree(screen_x, screen_y)){
                console.log("Found tree at " + screen_x + ", " + screen_y + " with colour " + sampleColour);
                return {x: screen_x, y: screen_y};
            } else {
                console.log("Found tree at " + screen_x + ", " + screen_y + " with colour " + sampleColour + " but it is invalid");
            }
        }
    }

    //couldn't find a tree in capture
    return false;
}

// check if a tree is valid
function validTree(screen_x, screen_y){
    //move mouse to to coordinates
    robot.moveMouse(screen_x, screen_y);
    sleep(300);

    // check text at top left
    var check_x = 85;
    var check_y = 65;
    pixelColor = robot.getPixelColor(check_x, check_y);

    if (pixelColor == "00ffff"){
        // tree is valid
        return true;
    } else {
        // tree is invalid
        return false;
    }
}

// generate a random integer between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// pause execution for a given number of milliseconds
function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

main();