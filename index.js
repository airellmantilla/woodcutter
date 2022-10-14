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
        robot.moveMouse(firstTree_x, firstTree_y);
        robot.mouseClick();
        sleep(8000);

        robot.moveMouse(secondTree_x, secondTree_y);
        robot.mouseClick();
        sleep(8000);
    }

    console.log("Done.");
}

// pause execution for a given number of milliseconds
function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

main();