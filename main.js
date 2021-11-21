let path = require("path");
let fs = require("fs");

// input
let inputArr = process.argv.slice(2);
// console.log(inputArr);

//option
let optionArr=[];
let fileArr=[];
// identifying the options
for(let i=0;i<inputArr.length;i++){
    if(inputArr[i].slice(0,1)=="-"){
        optionArr.push(inputArr[i]);
    }
    else{
        fileArr.push(inputArr[i]);
    }
}

// Handling the edge cases.
let isBothPresent = optionArr.includes("-b") && optionArr.includes("-n");
if(isBothPresent){
    console.log("either enter -b or -n option");
    return;
}
// existence of the file 
for(let i=0;i<fileArr.length;i++){
    let isPresent = fs.existsSync(fileArr[i]);
    if(isPresent==false){
        console.log("files does not exist");
        return;
    }
}


//Got the fcontents of the files mentioned and converted it to string type
let content="";
for(let i=0;i<fileArr.length;i++){
    let bufferContent = fs.readFileSync(fileArr[i]);
    content += bufferContent+"\n";
}

let contentArray=content.split("\n"); //Based on the new line converted it to array of strings
//console.log(contentArray);

//Identify -s option
let isSPresent = optionArr.includes("-s");
//Implementing -s option on the file
if(isSPresent){
    for(let i =1; i<contentArray.length;i++){
        if(contentArray[i]=="" && contentArray[i-1]==""){
            contentArray[i]=null;
        }else if(contentArray[i]=="" && contentArray[i-1]==null){
            contentArray[i]=null;
        }
    }
    let tempArr=[];
    for(let i=0;i<contentArray.length;i++){
        if(contentArray[i]!=null){
            tempArr.push(contentArray[i]);
        }
        
    }
    contentArray=tempArr;
}

//console.log(contentArray.join("\n")); // to see output of -s

//Identify -n option
let isNPresent = optionArr.includes("-n");
//Implementing -n option on the file 
if(isNPresent){
    for(let i =0; i<contentArray.length;i++){
        contentArray[i]=`${i+1} ${contentArray[i]}`;
    }
}

//console.log(contentArray.join("\n"));


let isBPresent = optionArr.includes("-b");
//Implementing -n option on the file 
if(isBPresent){
    let counter=1;
    for(let i =0; i<contentArray.length;i++){
        if(contentArray[i]!=""){
            contentArray[i]=`${counter} ${contentArray[i]}`;
            counter++;
        }
        
    }
}

console.log(contentArray.join("\n"));









