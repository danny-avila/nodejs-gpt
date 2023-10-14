/**
 * Helper functions
 * This allows us to give the console some colour when running in a terminal
 *
 */
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

export const getRootDir = (trajectory = '..') => {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    return path.resolve(dirname, trajectory);
};

export const askQuestion = (query) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(`\x1b[36m${query}\n> \x1b[0m`, (ans) => {
        rl.close();
        resolve(ans);
    }));
};

export function isDockerRunning() {
    try {
        execSync('docker info');
        return true;
    } catch (e) {
        return false;
    }
}

export function deleteNodeModules(dir) {
    const nodeModulesPath = path.join(dir, 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
        console.purple(`Deleting node_modules in ${dir}`);
        fs.rmSync(nodeModulesPath, { recursive: true });
    }
}

export const silentExit = (code = 0) => {
    console.log = () => {};
    process.exit(code);
};

// Set the console colours
console.orange = msg => console.log('\x1b[33m%s\x1b[0m', msg);
console.green = msg => console.log('\x1b[32m%s\x1b[0m', msg);
console.red = msg => console.log('\x1b[31m%s\x1b[0m', msg);
console.blue = msg => console.log('\x1b[34m%s\x1b[0m', msg);
console.purple = msg => console.log('\x1b[35m%s\x1b[0m', msg);
console.cyan = msg => console.log('\x1b[36m%s\x1b[0m', msg);
console.yellow = msg => console.log('\x1b[33m%s\x1b[0m', msg);
console.white = msg => console.log('\x1b[37m%s\x1b[0m', msg);
console.gray = msg => console.log('\x1b[90m%s\x1b[0m', msg);
