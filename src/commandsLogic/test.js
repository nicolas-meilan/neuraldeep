import { Network } from 'synaptic';

import { testNeuralNetwork } from '../utils/neuralNetworkUtils';
import { fileExists, readJson, clock } from '../utils/utils';
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
    if (extensive && error.tests > 0) {
        print.log('----------TESTS----------');
        for (const test of error.testsErrors) {
            print.log('Input: ' + test.input);
            print.log('Expected Output: ' + test.outputExpected);
            print.log('Obtained Output: ' + test.outputObtained);
            print.log('+++++++++++++++++++++++++');
        }
        print.log('-------------------------');
    }
    print.log("----------ERROR RATE----------");
    print.log(error.errorRate*100  + "%");
    print.log(error.errors + '/' + error.tests);
    print.log("------------------------------");
    print.log("----------PROCESING TIME----------");
    print.verbose('Running an example to calculate the processing time...');
    const start = clock();
    let duration = undefined;
    neuralNetwork.activate(testData[0].input);
    duration = clock(start);
    print.log('Seconds: ' + duration.seconds);
    print.log('Nano Seconds: ' + duration.nanoSeconds);
    print.log("----------------------------------");
    return true;
}