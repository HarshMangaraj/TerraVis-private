const fs = require('fs');
const path = require('path');

// 1. Delete package-lock.json and yarn.lock if they exist
const lockfiles = ['package-lock.json', 'yarn.lock'];
lockfiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Deleted ${file}`);
    } catch (err) {
      console.error(`Failed to delete ${file}:`, err.message);
    }
  }
});

// 2. Enforce pnpm
const userAgent = process.env.npm_config_user_agent || '';
if (!userAgent.startsWith('pnpm/')) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Use pnpm instead of npm or yarn.');
  process.exit(1);
}
