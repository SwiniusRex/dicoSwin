import * as readline from "node:readline"
import * as fs from "fs";
import { parse } from "csv-parse"; 

// GLOBAL FUNCTIONS
function s2Reg(word){
  //console.log("Entering s2Reg() with " + word)
  var res = word.replaceAll("(V)","[aoiuœeãõïüøë]")
    .replaceAll(`(U)`,`[aoiuœe]`)
    .replaceAll(`(Y)`,`[ãõïüøë]`)
    .replaceAll(`(W)`,`(aã|ãa|oõ|iï|ïi|uü|üu|œø|øœ|eë|ëe)`)
    .replaceAll(`(C)`,`[mnbpdtgkrqvfzsjcyhlwñx]`)
    .replaceAll(`(G)`,`[mnbdgrvzjylwñ]`)
    .replaceAll(`(K)`,`[ptkqfschx]`);
  //console.log("Exiting s2Reg() with " + res);
  return res;
}

function f2Reg(word){
  //console.log("Entering s2Reg() with " + word)
  var res = word.replaceAll("(V)","([aeiouyàâéèêëîïôùû]|ai|ei|oi|oy|an|am|en|em|in|im|un|um|ain|aim|ein|eu|au|eau|ou)")
    .replaceAll(`(C)`,`([mnbpdtgkrqvfzsjcyhlwx]|gn)`)
    .replaceAll(`(G)`,`([mnbdgrvzjylw]|gn)`)
    .replaceAll(`(K)`,`[ptkqfschx]`);
  //console.log("Exiting s2Reg() with " + res);
  return res;
}

function askWord(action){
  var word = "";

  rl.question(`Which word ? | `,w => {
    if(action == f2s){
      const nw = s2Reg(w);
    }else if(acton == s2f){
      const nw = f2Reg(w);
    }else{
      const nw = w;
    }
    action(nw);
  });
}

function readcsv(){
  var csvData=[];
fs.createReadStream(`../dictionnaire.csv`)
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something with csvData
      console.log(csvData);
    });
}

function displayWord(res){
  console.log(res)
  rl.close();
}

// PARAMETER FUNCTIONS
const f2s = (word) => {
  var res = [];
  const regex = RegExp(`${word}`, 'g');

  fs.createReadStream(`./dictionnaire.csv`)
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
      if(csvrow[1].search(regex) != -1){
        //console.log(csvrow[1]);
        res.push(csvrow);        
      }
    })
    .on('end',function() {
      displayWord(res)
      //console.log(csvData);
    });
}

const s2f = (word) => {
  var res = [];
  const regex = RegExp(`${word}`, 'g');

  fs.createReadStream(`./dictionnaire.csv`)
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
      if(csvrow[2].search(regex) != -1){
        //console.log(csvrow[2]);
        res.push(csvrow);        
      }
    })
    .on('end',function() {
      displayWord(res)
      //console.log(csvData);
    });
}

const add = (word) => {

}

const del = (word) => {

}


// MAIN

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


var actionName = "";

rl.question(`What do you want to do ? | `, a => {
  console.log(`Hi ${a}!`);
  actionName = a;
  console.log("This is" + actionName);

  switch(actionName){
  case "f2s":
    console.log("F2S")
    askWord(f2s);
    break;
  case "s2f":
    console.log("S2F")
    askWord(s2f);
    break;
  case "add":
    console.log("ADD")
    askWord(add);
    break;
  case "del":
    console.log("DEL")
    askWord(del);
    break;
  }
});





