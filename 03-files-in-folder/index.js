const fs = require('fs');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, {withFileTypes: true}, (err, data)=>{
  if(err){
    throw err;
  }
  data.forEach((file)=>{
    getInfoFile(file);
  });
});

function getInfoFile(file){
  if(file.isDirectory()){
    return;
  }

  const pathFile = path.join(secretFolder, file.name);
  const nameFile = path.parse(pathFile).name;
  const extendingFile = path.extname(pathFile);
  
  fs.stat(pathFile, (err, stat)=>{
    if(err){
      throw err;
    }
    console.log(`File name: ${nameFile} - extending: ${extendingFile} - size: ${stat.size} b`)
  });
};