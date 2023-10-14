import { execSync } from 'child_process';
import { deleteNodeModules, getRootDir } from './helpers.js';

const config = {
    skipGit: process.argv.includes('-g'),
};

// Set the directories
const rootDir = getRootDir();
const directories = [rootDir];

(async () => {
    console.green(
        'Starting update script, this may take a minute or two depending on your system and network.',
    );

    const { skipGit } = config;
    if (!skipGit) {
    // Fetch latest repo
        console.purple('Fetching the latest repo...');
        execSync('git fetch origin', { stdio: 'inherit' });

        // Switch to main branch
        console.purple('Switching to main branch...');
        execSync('git checkout main', { stdio: 'inherit' });

        // Git pull origin main
        console.purple('Pulling the latest code from main...');
        execSync('git pull origin main', { stdio: 'inherit' });
    }

    // Delete all node_modules
    directories.forEach(deleteNodeModules);

    // Run npm cache clean --force
    console.purple('Cleaning npm cache...');
    execSync('npm cache clean --force', { stdio: 'inherit' });

    // Install dependencies
    console.purple('Installing dependencies...');
    execSync('npm ci', { stdio: 'inherit' });

    console.green('node-gpt-api is now up to date!');
})();
