const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}


// keeping the player engaged
async function pressEnterToContinue() {
    console.log('\n[Press enter to continue]\n');
    await ask('');
}
// first attempt to escape
async function libraryExit() {
    let validInput = ""
    while (validInput = true) {
        let libraryExit1 = await ask(`Where will you go?\n\n[D] - The DOOR that leads to the hall.\n[W] - the WINDOW that overlooks 67 Cherry St.\n`);
        let library1 = libraryExit1.toLowerCase();
    } }
        // you need the keys in order to leave the library
/*         if (library1 === 'w') {
            console.log(`A thorough examination of the window reveals a grim reality – there's no conceivable way to pry it open. Regrettably, it won't serve as your escape route.`);
        } else if (library1 != 'd' && library1 != 'w') {
            console.log(`Incorrect input.`);
        } else if (library1 === 'd'){ 
            console.log(`The DOOR stands before you, stubbornly sealed shut, its lock showing no signs of yielding.`)
        } */
            // let library2 = await ask(library1);

            class Location {
                constructor(name, description, inventory, locked) {
                    this.name = name,
                    this.description = description,
                    this.inventory = inventory,
                    this.locked=locked
                }
            }




            const library = new Location("library", "where you started", ["keys", "tape"], false)
            const hall = new Location("hall", "it connects all rooms", ["lighter", "rope"], false)
            const scienceRoom = new Location("science room", "where you learned to dissect a frog")
            const musicRoom = new Location("music room", "where you play the trumpet")
            const mathRoom = new Location("math room", "the source of all your headaches")
            const historyRoom = new Location("history room", "where Mr Diemar teaches Ancient History")
            const hvac = new Location("hvac", "It's high up. You'll need something to climb up!")
            const street = new Location("street", "Let's go home!")
            const house= new Location ("house", "It's nice to be home!")


/*                 if (locationStates[locationCurrent].includes(newLocation)) {
                    locationCurrent = newLocation
                    console.log(`You are in the ${locationLookUp[locationCurrent].name},${locationLookUp[locationCurrent].description}`)
                }
                else {
                    console.log(`Cannot go from ${locationCurrent} to the ${newLocation}`)
                } */
           

/*             moveLocation("hall");
            moveLocation("scienceRoom");
            moveLocation("hall");
            moveLocation("musicRoom");
            moveLocation("hall");
            moveLocation("mathRoom");
            moveLocation("hall");
            moveLocation("historyRoom");
            moveLocation("hvac"); */



    let locationLookUp = {
        library: library,
        hall: hall,
        scienceRoom: scienceRoom,
        musicRoom: musicRoom,
        mathRoom: mathRoom,
        historyRoom: historyRoom,
        hvac: hvac,
        street: street,
        house: house,
    }


let locationCurrent = "library"

function moveLocation(newLocation) {
    let validMoves=locationStates[locationCurrent];

    if (validMoves.includes(newLocation)) {
        console.log("Here"+locationCurrent)
        console.log("transition is valid")
        locationCurrent=newLocation
        console.log(locationCurrent);

    } else {
        console.log("You can't move there from here.")}
}

let locationStates = {
    library: ["hall"],
    hall: ["library", "scienceRoom", "musicRoom", "mathRoom", "historyRoom"],
    scienceRoom: ["hall"],
    musicRoom: ["hall"],
    mathRoom: ["hall"],
    historyRoom: ["hall", "hvac"],
    hvac: ["street"],
    street: ["house"],
    house: ["house"]
}

let commandLookUp= {
    move: ["move" , "go", "exit", "run"],
    take: ["take", "grab"],
    drop: ["drop", "lose"]
    
}

start();
// starting the game - intro
async function start() {
    const welcomeMessage = `\nIn the heart of Burlington High, amidst the echoes of an abandoned Macy's department store turned school, you awaken to the deafening roar of F-35s overhead. The deserted school library, formerly the Macy's Furniture Gallery,envelops you in an eerie silence that is punctuated only by the faint rustling of forgotten pages. As a senior desperately preparing for finals, you had nodded off over your math textbook, succumbing to exhaustion. \nNow, with the lights extinguished, a chilling question lingers: Are you truly the sole occupant of this sprawling, shadowy building?\nSurveying the sturdy partition walls that enclose you, separating the floors and ceilings of the former department store that is now transformed into a labyrinth of classrooms, you can't help but feel like a lab mouse navigating a complex maze.\nYou need to get out of here!`

    console.log(welcomeMessage);
    //await pressEnterToContinue();
    //await libraryExit();

    while (locationCurrent !== "house") {
        let playerInput=await ask ("What would you like to do?");
        console.log(playerInput);
        let playerInputSplit=playerInput.split(" to the ");
        console.log(playerInputSplit);

        let command=playerInputSplit[0];
        let noun=playerInputSplit[1];
        console.log(command);
        console.log(noun);
        console.log(commandLookUp.move.includes(command));
        if (commandLookUp.move.includes(command)===true) {
//           console.log(`Player moves from ${locationCurrent} to ${noun}`)
            moveLocation(noun);

        } else if(commandLookUp.take.includes(command)===true) {
            console.log("Implement a function that will make the user take something and put it into their inventory")
         }
    }
/*     function arrival(locationCurrent)
        if (locationCurrent === "house");
        console.log ("Congrats! You made it home!");
    }
     */



}