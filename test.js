//? Game Title: Escape from Burlington High: The Quest for Freedom
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}

//?-----------------  Constructor -----------------
class Location {
    constructor(name, description, inventory, locked) {
        this.name = name,
        this.description = description,
        this.inventory = inventory,
        this.locked=locked
    }
}

const library = new Location("library", "where you started", ["keys", "tape"], false)
const hall = new Location("hall", "it connects all rooms.\n  [go science room]  [go music room]  [go math room]  [go history room]", ["lighter"])
const science = new Location("science room", "where you learned to dissect a frog", ["knife", "rope"])
const music = new Location("music room", "where you play the trumpet", ["flute", "drums"])
const math = new Location("math room", "the source of all your headaches", ["ruler", "calculator"])
const history = new Location("history room", "where Mr Diemar teaches Ancient History. Looking up, you notice that the bookcase is just inches away from the hvac system", ["book","globe"])
const hvac = new Location("hvac", "It's high up. You use your rope to climb!\n  [go street]", ["spider"])
const street = new Location("street", "You jump out of the hvac system to find yourself in 67 Cherry Street. The tension fades away as you catch your breath, disbelief washing over you.\n  [go home]", ["bat"])
const home= new Location ("home")

class Item {
    constructor (name, description) {
        this.name = name,
        this.description = description
    }
}

const keys = new Item("keys", "a jingling set of keys that the librarian always carries when walking around the school. These keys will open the door to the hall and its connected rooms.\n  [go hall]  [take tape]");
const tape = new Item("tape", "a roll of adhesive tape, potentially useful for fixing broken objects or crafting makeshift solutions");
const lighter = new Item("lighter", "a small, refillable lighter that can produce a flame when needed");
const rope = new Item("rope", "a sturdy length of rope that can be used for climbing or creating makeshift tools. You look up and notice the hvac system there is a room where you could climb up to the hvac. Go to that room, and type [climb hvac]");
const knife = new Item("knife", "a sharp and versatile utility knife that could come in handy for a variety of tasks");
const flute = new Item("flute", "a beautifully crafted flute that emits enchanting melodies when played");
const drums = new Item("drums", "a set of drums that can produce powerful rhythms, perfect for setting the mood");
const ruler = new Item("ruler", "a straight-edged ruler, useful for measuring and drawing precise lines");
const calculator = new Item("calculator", "a high-tech calculator capable of performing complex mathematical calculations");
const book = new Item("book", "a thick book filled with knowledge and information, a potential source of wisdom");
const globe = new Item("globe", "a globe of the world, ideal for geography enthusiasts and those seeking global insights");
const spider = new Item("spider", "you encounter some spiders and decide to adopt one as your companion");
const bat = new Item("bat", "fear courses through you");

//?-----------------  Look up tables -----------------

let locationLookUp = {
    library: library,
    hall: hall,
    science: science,
    music: music,
    math: math,
    history: history,
    hvac: hvac,
    street: street,
    home: home,
}

let itemLookUp = {
    book: book,
    keys: keys,
    tape: tape,
    lighter: lighter,
    rope: rope,
    knife: knife,
    flute: flute,
    drums: drums,
    ruler: ruler,
    calculator: calculator,
    globe: globe,
    spider:spider,
    bat: bat
}

//?-----------------  State Machines -----------------

let locationStates = {
    library: ["hall"],
    hall: ["library", "science", "music", "math", "history"],
    science: ["hall"],
    music: ["hall"],
    math: ["hall"],
    history: ["hall", "hvac"],
    hvac: ["street"],
    street: ["home"],
    home: ["home"]
}

let commandLookUp= {
    move: ["move" , "go", "exit", "run", "climb"],
    take: ["take", "grab"],
    drop: ["drop", "lose"]
}

let itemStates = {
    keys: ["keys", "tape", "lighter", "rope", "knife", "flute", "drums", "ruler","calculator", "book", "globe", "bat", "spider"],
    tape: ["keys", "lighter", "rope", "knife", "flute", "drums", "ruler","calculator", "book", "globe", "bat", "spider"],
    lighter: ["keys", "tape", "rope", "knife", "flute", "drums", "ruler","calculator", "book", "globe", "bat", "spider"],
    rope: ["keys", "tape", "lighter", "knife", "flute", "drums", "ruler","calculator", "book", "globe", "bat", "spider"],
    knife: ["keys", "tape", "lighter", "rope", "flute", "drums", "ruler","calculator", "book", "globe", "bat", "spider"],
    flute: ["keys", "tape", "lighter", "rope", "knife", "drums", "ruler","calculator", "book", "globe", "bat", "spider"],
    drums: ["keys", "tape", "lighter", "rope", "knife", "flute", "ruler","calculator", "book", "globe", "bat", "spider"],
    ruler: ["keys", "tape", "lighter", "rope", "knife", "flute", "drums", "calculator", "book", "globe", "bat", "spider"],
    calculator: ["keys", "tape", "lighter", "rope", "knife", "flute", "drums", "ruler", "book", "globe", "bat", "spider"],
    book: ["keys", "tape", "lighter", "rope", "knife", "flute", "drums", "ruler","calculator", "globe", "bat", "spider"],
    globe: ["keys", "tape", "lighter", "rope", "knife", "flute", "drums", "ruler","calculator", "book", "bat", "spider"],
    spider: ["tape", "lighter", "rope", "knife", "flute", "drums", "ruler","calculator", "book", "globe", "keys", "bat"],
    bat: ["tape", "lighter", "rope", "knife", "flute", "drums", "ruler","calculator", "book", "globe", "keys", "spider"],
}

//?-----------------  Functions -----------------

let locationCurrent = "library"

function moveLocation(newLocation) {
    let validMoves=locationStates[locationCurrent];

    if (validMoves.includes(newLocation)) {
        console.log(`\nYou leave the ${locationCurrent}.`)
        locationCurrent=newLocation
        console.log(`You run to the ${locationLookUp[newLocation].name}, ${locationLookUp[newLocation].description}. Items: ${locationLookUp[newLocation].inventory}.  [take|drop + item]`)
        // console.log(locationCurrent);

    } else {
        console.log("You can't move there from here.")}
}

let itemCurrent="book"

function takeItem(newItem) {
    const currentLocation = locationLookUp[locationCurrent];
    
    if (currentLocation.inventory.includes(newItem)) {
        currentLocation.inventory = currentLocation.inventory.filter(item => item !== newItem);
        console.log(`You pick up the ${itemLookUp[newItem].name}, ${itemLookUp[newItem].description}.`);
    } else {
        console.log("You can't take this item here.");
    }
}

function dropItem(dropItem) {
    const currentLocation = locationLookUp[locationCurrent];

    if (itemStates[itemCurrent].includes(dropItem)) {
        currentLocation.inventory.push(dropItem);
        console.log(`You drop the ${itemLookUp[dropItem].name}.`);
    } else {
        console.log("You can't drop this item here.");
    }
}

//?-----------------  Main Game -----------------

start();
// starting the game - intro
async function start() {
    const welcomeMessage = `Escape from Burlington High: The Quest for Freedom\n\nIn the heart of Burlington High, amidst the echoes of an abandoned Macy's department store turned school, you awaken to the deafening roar of F-35s overhead. The deserted school library, formerly the Macy's Furniture Gallery,envelops you in an eerie silence that is punctuated only by the faint rustling of forgotten pages. As a senior desperately preparing for finals, you had nodded off over your math textbook, succumbing to exhaustion. \nNow, with the lights extinguished, a chilling question lingers: Are you truly the sole occupant of this sprawling, shadowy building?\nSurveying the sturdy partition walls that enclose you, separating the floors and ceilings of the former department store that is now transformed into a labyrinth of classrooms, you can't help but feel like a lab mouse navigating a complex maze.\nYou need to get out of here!\n In the midst of your desperate quest for a solution, your focus zeroes in on the librarian's filing cabinet. You contemplate whether the path to your escape lies hidden there.\n\nAs you look at the filing cabinet's drawers, your exploration reveals a couple of potentially valuable items: a set of keys and a roll of tape.\n  [take keys]  [take tape]`

    console.log(welcomeMessage);

    while (locationCurrent !== "home") {
        let playerInput=await ask ("\nWhat would you like to do?");
      //console.log(playerInput);
        let playerInputSplit=playerInput.split(" ");
      // console.log(playerInputSplit);
        let command=playerInputSplit[0];
        let noun=playerInputSplit[1];
/*      console.log(command);
        console.log(noun); */
     // console.log(commandLookUp.move.includes(command));
        if (commandLookUp.move.includes(command)===true && noun === "home") {
        console.log("Congratulations!\n\nYou've successfully made it back home, just in time for dinner. As you settle into the warmth of your familiar surroundings, you can't help but reflect on the incredible adventure you've just experienced. Tomorrow, you'll have an amazing story to share with your friends. Your journey may have come to an end for now, but who knows what exciting quests await you in the future? For now, bask in the glory of your achievement and savor the taste of victory.\n\nYou've earned it!"); 
        process.exit(); 
        } else if (commandLookUp.move.includes(command)===true) {
            moveLocation(noun);
        } else if(commandLookUp.take.includes(command)===true) { 
            takeItem(noun);
        } else if(commandLookUp.drop.includes(command)===true) { 
            dropItem(noun);
        }
        }
    }