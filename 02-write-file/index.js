const fs = require('fs');
const path = require('path');
const {stdout, stdin, exit} = process;
const writeStream = fs.createWriteStream(path.join(__dirname,'text.txt'), 'utf-8');

writeStream.on('error', (err)=> {
  if(err){
    throw err;
  }
});

stdout.write('Hi...\nEnter text and press enter keyword\n');

stdin.on('data', (text)=> {
  if(text.toString().trim() === 'exit'){
    exit();
  }
  writeStream.write(text);
});

process.on('exit', ()=> {
  stdout.write('Text saved in text.txt\n Bye ;)')
});
process.on('SIGINT', exit);