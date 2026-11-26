const fs = require('fs');

const files = [
  'e:/systems/LearnCS/frontend/lib/assessment/data/algorithms/index.ts',
  'e:/systems/LearnCS/frontend/lib/assessment/data/data-structures/index.ts',
  'e:/systems/LearnCS/frontend/lib/assessment/data/networking/index.ts',
  'e:/systems/LearnCS/frontend/lib/assessment/data/operating-systems/index.ts',
  'e:/systems/LearnCS/frontend/lib/assessment/data/databases/index.ts'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  const domainName = file.split('/data/')[1].split('/')[0].replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  content = content.replace(/domain:[\s\S]*?difficulty:/g, 'domain: "' + domainName + '",\n    topic: "General",\n    subtopic: "Fundamentals",\n    difficulty:');
  
  fs.writeFileSync(file, content);
});

console.log("Fixed!");
