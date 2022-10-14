// woodcutting script by airellmantilla
// Tested on 1920x1080 resolution
// Tested on Ikov.io client

// import the robotjs library
const robot = require('robotjs');

function main(){
    console.log("Starting...");
    sleep(4000);
    
    var i = 0;

    while(i < 5){
        robot.moveMouse(825, 550);
        robot.mouseClick();
        sleep(8000);
        i++;
    }

    console.log("Done.");
}

// pause execution for a given number of milliseconds
function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

main();