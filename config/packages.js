import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { deleteNodeModules } from './helpers.js';

// Set the directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const directories = [rootDir];

// Delete package-lock.json if it exists
const packageLockPath = path.resolve(rootDir, 'package-lock.json');
if (fs.existsSync(packageLockPath)) {
  console.purple('Deleting package-lock.json...');
  fs.unlinkSync(packageLockPath);
}

(async () => {
  // Delete all node_modules
  directories.forEach(deleteNodeModules);

  // Run npm cache clean --force
  console.purple('Cleaning npm cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });

  // Install dependencies
  console.purple('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
})();
