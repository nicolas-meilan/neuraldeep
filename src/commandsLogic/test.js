import { Network } from 'synaptic';

import { testNeuralNetwork } from '../utils/neuralNetworkUtils';
import { fileExists, readJson } from '../utils/utils';

import { neuralNetworkPath, testDataPath } from '../consts';


export function testNeuralNetworkCommand(name, extensive) {
    const testDataFile = testDataPath + name + '.json'
    const neuralNetworkFile = neuralNetworkPath + name + '.json';
    if (!fileExists(testDataFile) || !fileExists(neuralNetworkFile)) {
        return false;
    }
    const neuralNetwork = Network.fromJSON(readJson(neuralNetworkFile));
    const testData = readJson(testDataFile).testData;
    const error = testNeuralNetwork(neuralNetwork, testData);
    console.log("----------ERROR RATE----------");
    console.log(error.errorRate*100  + "%");
    console.log(error.errors + '/' + error.tests);
    console.log("------------------------------");
    if(extensive && error.tests != 0) {
        console.log('----------TESTS----------');
        for (const test of error.testsErrors) {
            console.log('Input: ' + test.input);
            console.log('Expected Output: ' + test.outputExpected);
            console.log('Obtained Output: ' + test.outputObtained);
            console.log('+++++++++++++++++++++++++');
        }
        console.log('-------------------------');
    }
    return true;
}