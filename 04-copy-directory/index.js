const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

copyDir();

function copyDir(){
  fs.mkdir(copyFolder, {recursive: true}, (err)=>{
    if(err) throw err;
  });

  fs.readdir(copyFolder, (err, files)=>{
    if(err) throw err;

    if(files.length !== 0){
      files.forEach((elem)=>{
        fs.unlink(path.join(copyFolder, elem), (err)=>{
          if(err) throw err;
        });
      });
    };

    fs.readdir(folder, (err, files)=>{
      if(err) throw err;
      files.forEach((elem)=>{
        fs.copyFile(path.join(folder, elem), path.join(copyFolder, elem), (err)=>{
          if(err) throw err;
        });
      });
    });
  });
};