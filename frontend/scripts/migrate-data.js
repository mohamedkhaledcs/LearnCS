const fs = require('fs');
const path = require('path');

const dataDir = 'e:/systems/LearnCS/frontend/lib/assessment/data';
const files = [
  { file: 'algorithms.ts', targetDir: 'algorithms', newFile: 'index.ts' },
  { file: 'data-structures.ts', targetDir: 'data-structures', newFile: 'index.ts' },
  { file: 'networking.ts', targetDir: 'networking', newFile: 'index.ts' },
  { file: 'operating-systems.ts', targetDir: 'operating-systems', newFile: 'index.ts' },
  { file: 'databases.ts', targetDir: 'databases', newFile: 'index.ts' }
];

files.forEach(({file, targetDir, newFile}) => {
  const oldPath = path.join(dataDir, file);
  if (!fs.existsSync(oldPath)) return;
  
  let content = fs.readFileSync(oldPath, 'utf8');
  
  content = content.replace(/from \"\.\.\/schema\"/g, 'from "../../schema"');
  content = content.replace(/knowledgeArea: /g, 'domain: ');
  content = content.replace(/knowledgeUnit: /g, 'topic: ');
  content = content.replace(/topic: /g, 'subtopic: ');
  content = content.replace(/subtopic: /g, 'specialization: ');
  
  const newPath = path.join(dataDir, targetDir, newFile);
  fs.writeFileSync(newPath, content);
  fs.unlinkSync(oldPath);
});

console.log('Migration complete.');
