
// NNIEDA : Prendre les infos dans le terminal
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`What do you want to do ?`, action => {
  console.log(`Hi ${action}!`);
  rl.close();
});

switch(action){
    case "f2s":
        break;
    case "s2f":
        break;
    case "add":
        break;
    case "del":
}




