import { closeSync, mkdirSync, openSync } from 'fs';
import { copy } from 'fs-extra';

import { neuraldeepFile, neuralNetworkPath, templatesPath, testDataPath, trainingDataPath } from '../consts';


export function createProjectStructure(name) {
    const rootFolder = './' + name;
    const neuralNetworkFolder = rootFolder + '/' + neuralNetworkPath;
    const trainingDataFolder = rootFolder + '/' + trainingDataPath;
    const testDataFolder = rootFolder + '/' + testDataPath;
    const templatesFolder = __dirname.split('/').slice(0, -2).join('/') + '/' + templatesPath;
    mkdirSync(rootFolder);
    mkdirSync(neuralNetworkFolder);
    mkdirSync(trainingDataFolder);
    mkdirSync(testDataFolder);
    copy(templatesFolder + '/trainingData.json', trainingDataFolder + '/nameNeuralNetwork.json');
    copy(templatesFolder + '/testData.json', testDataFolder + '/nameNeuralNetwork.json');
    closeSync(openSync(rootFolder + '/' + neuraldeepFile, 'w'));
}