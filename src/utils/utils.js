import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'

import { neuraldeepFile } from '../consts'


export function saveJson(json, path) {
    const jsonStr = JSON.stringify(json);
    writeFileSync(path, jsonStr);
}

export function readJson(path) {
    return JSON.parse(readFileSync(path, 'utf8'));
}

export function obtainFiles(path, baseName) {
    let files = [];
    readdirSync(path).forEach(file => {
        const pathSplit = file.split('/');
        if (pathSplit[pathSplit.length -1].startsWith(baseName)) {
            files.push(file);
        }
    });
    return files;
}
export function clock(start) {
    if (!start) return process.hrtime();
    const end = process.hrtime(start);
    const result = {
        seconds: end[0],
        nanoSeconds: end[1]
    }
    return result;
}

export function fileExists(file) {
    return existsSync(file);
}

export function validateProject() {
    return existsSync(neuraldeepFile);
}

export function validateParams(...params) {
    for (const param of params) {
        if(param == undefined){
            return false;
        }
    }
    return true;
}

export function validateBaseName(name) {
    const nameRegex = /^[a-z]([0-9]|[a-z]){2,29}$/;
    return nameRegex.test(name.toLowerCase());
}

export function validateName(name) {
    const nameRegex = /^[a-z]([0-9]|[a-z]){2,29}(_([0-9]|[a-z])+)?$/;
    return nameRegex.test(name.toLowerCase());
}

export function validateInputArray(binaryArray){
    const binaryArrayRegex = /^\[([0-1],)*[0-1]\]$/;
    return binaryArrayRegex.test(binaryArray);
}