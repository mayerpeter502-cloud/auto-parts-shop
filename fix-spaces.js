const fs = require('fs');
const path = require('path');

function removeTrailingSpaces(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        removeTrailingSpaces(filePath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const newContent = content.replace(/[ \t]+$/gm, '');
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Fixed: ${filePath}`);
      }
    }
  });
}

removeTrailingSpaces('./src');
console.log('Done!');