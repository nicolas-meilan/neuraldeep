import { existsSync, readFileSync, writeFileSync } from 'fs'


export function saveJson(json, path) {
    const jsonStr = JSON.stringify(json);
    writeFileSync(path, jsonStr);
}

export function readJson(path) {
    return JSON.parse(readFileSync(path, 'utf8'));
}

export function validateProject() {
    return existsSync('./.neuraldeep');
}

export function validateParams(...params) {
    for (const param of params) {
        if(param == undefined){
            return false;
        }
    }
    return true;
}

export function validateName(name) {
    const nameRegex = /^[a-z][a0-z9]{2,29}$/;
    return nameRegex.test(name.toLowerCase());
}

export function validateInputArray(binaryArray){
    const binaryArrayRegex = /^\[([0-1],)*[0-1]\]$/;
    return binaryArrayRegex.test(binaryArray);
}