import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { deleteNodeModules, getRootDir } from './helpers.js';

// Set the directories
const rootDir = getRootDir();
const directories = [rootDir];

// Delete package-lock if it exists
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
