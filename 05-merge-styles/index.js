const fs = require('fs');
const path = require('path');
const projectDist = path.join(__dirname, 'project-dist');
const styles = path.join(__dirname, 'styles');
const bundle = path.join(projectDist, 'bundle.css')

fs.open(bundle, 'w', (err)=>{
  if(err) throw err;
})

fs.readdir(styles, (err, files)=>{
  if(err) throw err;
  files.forEach((elem)=>{
    const extending = path.extname(elem);
    if(extending === '.css'){
      fs.readFile(path.join(styles, elem), 'utf-8', (err, data)=>{
        if(err) throw err;
        fs.appendFile(bundle, data, (err)=>{
          if(err) throw err;
        })
      })
    }
  })
})
