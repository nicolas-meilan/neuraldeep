import { Network } from 'synaptic';

import { testNeuralNetwork } from '../utils/neuralNetworkUtils';
import { readJson } from '../utils/utils';

import { neuralNetworkPath, testDataPath } from '../consts';


export function testNeuralNetworkCommand(name) {
    const neuralNetwork = Network.fromJSON(readJson(neuralNetworkPath + name + '.json'));
    const testData = readJson(testDataPath + name + '.json').testData;
    const error = testNeuralNetwork(neuralNetwork, testData);
    console.log("----------ERROR RATE----------");
    console.log(error.errorRate*100  + "%");
    console.log("------------------------------");
}