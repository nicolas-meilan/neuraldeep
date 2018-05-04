import { Architect } from 'synaptic';

import { createAndTrainNeuralNetwork } from '../utils/neuralNetworkUtils';
import { fileExists, readJson } from '../utils/utils';
import { Print } from '../utils/print';

import { neuralNetworkPath, trainingDataPath } from '../consts';


export function trainAndCreateNeuralNetwortCommand(name, architecture, verbose=false) {
    const print = new Print(verbose);
    print.verbose('Checking if the Training Data file exists...');
    const trainingDataFile = trainingDataPath + name + '.json';
    if (!fileExists(trainingDataFile)){
        return false;
    }
    print.verbose('Creating the Neural Network...');
    const neuralNetwork = new Architect.Perceptron(...architecture);
    const trainingData = readJson(trainingDataFile).trainingData;
    const trainingConfig = {
        rate: 0.1,
        iterations: 1000,
        shuffle: true
    };
    print.verbose('Training and save the Neural Network...');
    createAndTrainNeuralNetwork(neuralNetwork, trainingData, trainingConfig, neuralNetworkPath + name + '.json');
    return true;
}