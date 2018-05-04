import { Network } from 'synaptic';

import { testNeuralNetwork } from '../utils/neuralNetworkUtils';
import { fileExists, readJson } from '../utils/utils';
import { Print } from '../utils/print';

import { neuralNetworkPath, testDataPath } from '../consts';


export function testNeuralNetworkCommand(name, extensive, verbose) {
    const print = new Print(verbose);
    const testDataFile = testDataPath + name + '.json'
    const neuralNetworkFile = neuralNetworkPath + name + '.json';
    print.verbose('Checking if the Test Data and the Neural Network Exist...');
    if (!fileExists(testDataFile) || !fileExists(neuralNetworkFile)) {
        return false;
    }
    print.verbose('Reading the Neural Network file...');
    const neuralNetwork = Network.fromJSON(readJson(neuralNetworkFile));
    print.verbose('Reading the Test Data file...');
    const testData = readJson(testDataFile).testData;
    print.verbose('Testing the Neural Network...');
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