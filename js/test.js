import * as fs from "fs";
import { parse } from "csv-parse"; 

var csvData=[];
fs.createReadStream(`./dictionnaire.csv`)
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        console.log(csvrow[2]);
        //do something with csvrow
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something with csvData
      console.log(csvData);
    });