import * as readline from "node:readline"
import * as fs from "fs";
import { parse } from "csv-parse"; 

// GLOBAL FUNCTIONS

/*
Converts some simple patterns from a given swinian word into regex expressions
*/
function s2Reg(word){
  //console.log("Entering s2Reg() with " + word)
  var res = word.replaceAll("(V)","[aoiuœeãõïüøë]")
    .replaceAll(`(U)`,`[aoiuœe]`) // first sister vowels
    .replaceAll(`(Y)`,`[ãõïüøë]`) // second sister vowels
    .replaceAll(`(W)`,`(aã|ãa|oõ|iï|ïi|uü|üu|œø|øœ|eë|ëe)`) // sister pairs
    .replaceAll(`(C)`,`[mnbpdtgkrqvfzsjcyhlwñx]`) // consonants
    .replaceAll(`(G)`,`[mnbdgrvzjylwñ]`) // voiced consonants
    .replaceAll(`(K)`,`[ptkqfschx]`) // unvoiced consonants
  //console.log("Exiting s2Reg() with " + res);
  return res;
}


function f2Reg(word){
  //console.log("Entering s2Reg() with " + word)
  var res = word.replaceAll("(V)","([aeiouyàâéèêëîïôùû]|ai|ei|oi|oy|an|am|en|em|in|im|un|um|ain|aim|ein|eu|au|eau|ou)") // vowels
    .replaceAll(`(C)`,`([mnbpdtgkrqvfzsjcyhlwx]|gn)`) // consonants
    .replaceAll(`(G)`,`([mnbdgrvzjylw]|gn)`) // voiced consonants
    .replaceAll(`(K)`,`[ptkqfschx]`); // unvoiced consonants
  //console.log("Exiting s2Reg() with " + res);
  return res;
}

/*
Reads the word or pattent inputted in the stdin and perform the given action on this word.
  action : a function (f2s|s2f|add|del) to use on the asked word. 
*/
function askWord(action){
  var nw = "";

  rl.question(`Search word/pattern :\n|> `, (w) => {
    if(action == f2s){
      nw = s2Reg(w);
    }else if(action == s2f){
      nw = f2Reg(w);
    }else{
      nw = w;
    }
    action(nw);
  });
}

/*
Returns content of the dictionnaire.csv file as an array of arrays.
*/
function readcsv(){
  var csvData=[];
  fs.createReadStream(`./dictionnaire.csv`)
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
      //console.log(csvrow);
      csvData.push(csvrow);        
  });
  return csvData;
}


/*
Displays on the stdout the result of searching with f2s() or s2f().
*/
function displayWord(res){
  console.log(res)
  rl.close();
}

// PARAMETER FUNCTIONS

/*
Search for the occurences of a given french word in the dictionnary.
  word : the word or pattern to look for.
*/
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

/*
Search for the occurences of a given swinian word in the dictionnary.
  word : the word or pattern to look for.
*/
const s2f = (word) => {
  var res = [];
  const regex = RegExp(`${word}`, 'g');

  fs.createReadStream(`./dictionnaire.csv`)
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
      if(csvrow[2].search(regex) != -1){
        res.push(csvrow);        
      }
    })
    .on('end',function() {
      displayWord(res)
    });
}


/*
Adds a line in the dictionnary
  word : the french word to add.
*/
const add = (word) => {
  rl.question(`Which type is it ? (subst. | verbe | adj. | ...) \n|> `, (t) => {
    rl.question(`Please enter the swinian for ${word} \n|> `, (trad) => {
      fs.appendFile(`./dictionnaire.csv`, `${t},${word},${trad}\n`, function(err){
        if(err) throw err;
        //console.log("Mot ajouté");
      })
      rl.close();
    });
  });
}

/*
Removes a line from the dictionnary.
  word : the french word to delete.
*/
const del = (word) => {
  var buffer = readcsv();
  rl.question(`Which type is it ? (subst. | verbe | adj. | ...) \n|> `, (t) => {
    rl.question(`Please enter the swinian for ${word} \n|> `, (trad) => {
  
      fs.writeFile(`./dictionnaire.csv`,``,function(err){
        if(err) throw err;
      });
  
      buffer.forEach((value) => {
        //console.log(value);
        if(JSON.stringify(value) !== JSON.stringify([t,word,trad])){
          fs.appendFile(`./dictionnaire.csv`,`${value[0]},${value[1]},${value[2]}\n`,function(err){
            if(err) throw err;
          });
        }
      });
      rl.close();
    });
  });  
}


// MAIN

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var actionName = "";

rl.question(`Choose an action (f2s-s2f-add-del)\n|> `, a => {
  actionName = a;

  switch(actionName){
  case "f2s":
    //console.log("F2S")
    askWord(f2s);
    break;
  case "s2f":
    //console.log("S2F")
    askWord(s2f);
    break;
  case "add":
    //console.log("ADD")
    askWord(add);
    break;
  case "del":
    //console.log("DEL")
    askWord(del);
    break;
  default:
    console.log("This action is not recognized. PLease try f2s|s2f|add|del.")
    rl.close();
    break;
  }
});





