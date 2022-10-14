// woodcutting script by airellmantilla
// Tested on 1920x1080 resolution
// Tested on Ikov.io client

// import the robotjs library
const robot = require('robotjs');

function main(){
    console.log("Starting...");
    sleep(4000);
    
    var firstTree_x = 1190;
    var firstTree_y = 510;
    var secondTree_x = 830;
    var secondTree_y = 475;

    // Loop forever until stopped manually
    while(true){
        //chop first tree
        robot.moveMouse(firstTree_x, firstTree_y);
        robot.mouseClick();
        sleep(8000);

        dropLogs();

        //chop second tree
        robot.moveMouse(secondTree_x, secondTree_y);
        robot.mouseClick();
        sleep(8000);

        dropLogs();
    }

    console.log("Done.");
}

// drop logs in inventory after chopping
function dropLogs(){
    var inventory_x = 1755;
    var inventory_y = 760;

    robot.moveMouse(inventory_x, inventory_y);
    robot.mouseClick("right");
    robot.moveMouse(inventory_x - 25, inventory_y + 70);
    robot.mouseClick();
    sleep(1000);
}

// snapshot screen for coordinates of trees
function snapshot(){
    //taking a screenshot
    var img = robot.screen.capture(0, 0, 1920, 1080);

    var pixelColor = img.colorAt(890, 790);
    console.log(pixelColor);
}

// pause execution for a given number of milliseconds
function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

snapshot();
//main();