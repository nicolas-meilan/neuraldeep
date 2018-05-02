import { Architect } from 'synaptic';

import { createAndTrainNeuralNetwork } from '../utils/neuralNetworkUtils';
import { fileExists, readJson } from '../utils/utils';

import { neuralNetworkPath, trainingDataPath } from '../consts';


export function trainAndCreateNeuralNetwortCommand(name, architecture) {
    const trainingDataFile = trainingDataPath + name + '.json';
    if (!fileExists(trainingDataFile)){
        return false;
    }
    const neuralNetwork = new Architect.Perceptron(...architecture);
    const trainingData = readJson(trainingDataFile).trainingData;
    const trainingConfig = {
        rate: 0.1,
        iterations: 1000,
        shuffle: true
    };
    createAndTrainNeuralNetwork(neuralNetwork, trainingData, trainingConfig, neuralNetworkPath + name + '.json');
    return true;
}