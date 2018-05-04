import { closeSync, mkdirSync, openSync } from 'fs';
import { copy } from 'fs-extra';

import { Print } from '../utils/print';

import { neuraldeepFile, neuralNetworkPath, templatesPath, testDataPath, trainingDataPath } from '../consts';


export function createProjectStructure(name, verbose=false) {
    const print = new Print(verbose);
    const rootFolder = './' + name;
    const neuralNetworkFolder = rootFolder + '/' + neuralNetworkPath;
    const trainingDataFolder = rootFolder + '/' + trainingDataPath;
    const testDataFolder = rootFolder + '/' + testDataPath;
    const templatesFolder = __dirname.split('/').slice(0, -2).join('/') + '/' + templatesPath;
    print.verbose('Creating the struct of the project...');
    mkdirSync(rootFolder);
    mkdirSync(neuralNetworkFolder);
    mkdirSync(trainingDataFolder);
    mkdirSync(testDataFolder);
    print.verbose('Copying the templates...');
    copy(templatesFolder + '/trainingData.json', trainingDataFolder + '/nameNeuralNetwork.json');
    copy(templatesFolder + '/testData.json', testDataFolder + '/nameNeuralNetwork.json');
    print.verbose('Creating the neuraldeep file...');
    closeSync(openSync(rootFolder + '/' + neuraldeepFile, 'w'));
}