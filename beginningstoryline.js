const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();
// starting the game - intro
async function start() {
  const welcomeMessage = `\nIn the heart of Burlington High, amidst the echoes of an abandoned Macy's department store turned school, you awaken to the deafening roar of F-35s overhead. The deserted school library, formerly the Macy's Furniture Gallery,envelops you in an eerie silence that is punctuated only by the faint rustling of forgotten pages. As a senior desperately preparing for finals, you had nodded off over your math textbook, succumbing to exhaustion. \nNow, with the lights extinguished, a chilling question lingers: Are you truly the sole occupant of this sprawling, shadowy building?\nSurveying the sturdy partition walls that enclose you, separating the floors and ceilings of the former department store that is now transformed into a labyrinth of classrooms, you can't help but feel like a lab mouse navigating a complex maze.\nYou need to get out of here!`

  console.log(welcomeMessage);
  await pressEnterToContinue();
  await libraryExit();
}
// keeping the player engaged
async function pressEnterToContinue() {
    console.log('\n[Press enter to continue]\n');
    await ask('');
  }
// first attempt to escape
  async function libraryExit() {
    let validInput=""
    while (validInput=true) {
    let libraryExit1= await ask(`Where will you go?\n\n[D] - The DOOR that leads to the hall.\n[W] - the WINDOW that overlooks 67 Cherry St.\n`);
    let library1= libraryExit1.toLowerCase();

// you need the keys in order to leave the library
    if (library1==='w') {
        console.log(`A thorough examination of the window reveals a grim reality – there's no conceivable way to pry it open. Regrettably, it won't serve as your escape route.`);
    } else if (library1!='d' && library1!='d'){
        console.log(`Incorrect input.`);
    } else if (library1==='d') {
        console.log(`The DOOR stands before you, stubbornly sealed shut, its lock showing no signs of yielding.`) ; process.exit();
    }

}
   // let library2 = await ask(library1);


}