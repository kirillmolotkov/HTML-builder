const fs = require('fs');
const path = require('path');
const projectDist = path.join(__dirname, 'project-dist');
const componentsPath = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const cssFile = path.join(projectDist, 'style.css');
const styles = path.join(__dirname, 'styles');
const copyAssets = path.join(projectDist, 'assets')
const fonts = path.join(__dirname,'assets', 'fonts');
const img = path.join(__dirname,'assets', 'img');
const svg = path.join(__dirname,'assets', 'svg');

function buildProject(){
  createProjectFolder();
  buildHtml();
  buildCss();
  copyDir();
}

buildProject()

function createProjectFolder(){
  fs.mkdir(projectDist, {recursive: true}, (err)=>{
  if(err) throw err;
});
}

function buildHtml(){
  fs.readFile(templatePath, 'utf-8', (err,data)=>{
    if(err) throw err;
    let templateStrings = [];
    templateStrings = data.match(/{{.+}}/g).map((elem) => elem.slice(2, elem.length - 2));
    
    let obj = {};

    templateStrings.forEach((elem)=>{
      fs.readFile(path.join(componentsPath, `${elem}.html`), 'utf-8', (err, componentsData)=>{
        if(err) throw err;
        obj[elem] = componentsData;

        let splitData = data.split(`{{${elem}}}`)
        data = splitData[0] + obj[elem] + splitData[1]

        fs.writeFile(path.join(projectDist, 'index.html'),data ,(err)=>{
          if(err) throw err;
        })
      })
    })
  })
}

function buildCss(){
  fs.open(cssFile, 'w', (err)=>{
    if(err) throw err;
  })
  
  fs.readdir(styles, (err, files)=>{
    if(err) throw err;
    files.forEach((elem)=>{
      const extending = path.extname(elem);
      if(extending === '.css'){
        fs.readFile(path.join(styles, elem), 'utf-8', (err, data)=>{
          if(err) throw err;
          fs.appendFile(cssFile, data, (err)=>{
            if(err) throw err;
          })
        })
      }
    })
  })
}

function copyDir(){
  fs.mkdir(copyAssets, {recursive: true}, (err)=>{
    if(err) throw err;
    fs.mkdir(path.join(copyAssets, 'fonts'), {recursive: true}, (err)=>{
      if(err) throw err;
    });
    fs.mkdir(path.join(copyAssets, 'img'), {recursive: true}, (err)=>{
      if(err) throw err;
    });
    fs.mkdir(path.join(copyAssets, 'svg'), {recursive: true}, (err)=>{
      if(err) throw err;
    });


    fs.readdir(path.join(copyAssets, 'fonts'), (err, files)=>{
      if(err) throw err;
  
      if(files.length !== 0){
        files.forEach((elem)=>{
          fs.unlink(path.join(copyAssets, 'fonts', elem), (err)=>{
            if(err) throw err;
          });
        })
      }
  
      fs.readdir(fonts, (err, files)=>{
        if(err) throw err;
        files.forEach((elem)=>{
          fs.copyFile(path.join(fonts, elem), path.join(copyAssets, 'fonts', elem), (err)=>{
            if(err) throw err;
          })
        })
      })
    })
    
  
    fs.readdir(path.join(copyAssets, 'img'), (err, files)=>{
      if(err) throw err;
  
      if(files.length !== 0){
        files.forEach((elem)=>{
          fs.unlink(path.join(copyAssets, 'img', elem), (err)=>{
            if(err) throw err;
          });
        })
      }
  
      fs.readdir(img, (err, files)=>{
        if(err) throw err;
        files.forEach((elem)=>{
          fs.copyFile(path.join(img, elem), path.join(copyAssets, 'img', elem), (err)=>{
            if(err) throw err;
          })
        })
      })
    })
  
  
    fs.readdir(path.join(copyAssets, 'svg'), (err, files)=>{
      if(err) throw err;
  
      if(files.length !== 0){
        files.forEach((elem)=>{
          fs.unlink(path.join(copyAssets, 'svg', elem), (err)=>{
            if(err) throw err;
          });
        })
      }
  
      fs.readdir(svg, (err, files)=>{
        if(err) throw err;
        files.forEach((elem)=>{
          fs.copyFile(path.join(svg, elem), path.join(copyAssets, 'svg', elem), (err)=>{
            if(err) throw err;
          })
        })
      })
    })
  });
}
