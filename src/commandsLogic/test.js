import { Network } from 'synaptic';

import { testNeuralNetwork } from '../utils/neuralNetworkUtils';
import { fileExists, readJson } from '../utils/utils';
import { Print } from '../utils/print';

import { neuralNetworkPath, testDataPath } from '../consts';


export function testNeuralNetworkCommand(name, extensive, verbose) {
    const print = new Print(verbose);
    const testDataFile = testDataPath + name + '.json'
    const neuralNetworkFile = neuralNetworkPath + name + '.json';
    if (!fileExists(testDataFile) || !fileExists(neuralNetworkFile)) {
        return false;
    }
    const neuralNetwork = Network.fromJSON(readJson(neuralNetworkFile));
    const testData = readJson(testDataFile).testData;
    const error = testNeuralNetwork(neuralNetwork, testData);
    print.log("----------ERROR RATE----------");
    print.log(error.errorRate*100  + "%");
    print.log(error.errors + '/' + error.tests);
    print.log("------------------------------");
    if(extensive && error.tests != 0) {
        print.log('----------TESTS----------');
        for (const test of error.testsErrors) {
            print.log('Input: ' + test.input);
            print.log('Expected Output: ' + test.outputExpected);
            print.log('Obtained Output: ' + test.outputObtained);
            print.log('+++++++++++++++++++++++++');
        }
        print.log('-------------------------');
    }
    return true;
}