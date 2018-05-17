import { Network } from 'synaptic';

import { testNeuralNetwork } from '../utils/neuralNetworkUtils';
import { fileExists, readJson, obtainFiles, clock } from '../utils/utils';
import { Print } from '../utils/print';

import { neuralNetworkPath, testDataPath } from '../consts';

export function compareNeuralNetworkCommand(baseNameNeuralNetworks, top, verbose) {
    const print = new Print(verbose);
    print.verbose('Checking if the Neural Networks exist...');
    const neuralNetworks = obtainFiles(neuralNetworkPath, baseNameNeuralNetworks);
    if (neuralNetworks.length < 2) {
        return false;
    }
    let neuralNetworksResults = [];
    const testDataFile = testDataPath + baseNameNeuralNetworks + '.json';
    print.verbose('Checking if the Test Data exist...');
    if (!fileExists(testDataFile)) {
        return false;
    }
    for (const neuralNetworkFileName of neuralNetworks) {
        print.verbose('Checking if the Neural Network(' + neuralNetworkFileName + ') exist...');
        const neuralNetworkFile = neuralNetworkPath + neuralNetworkFileName;
        if (!fileExists(neuralNetworkFile)) {
            return false;
        }
        print.verbose('Reading the Neural Network(' + neuralNetworkFileName + ') file...');
        const neuralNetwork = Network.fromJSON(readJson(neuralNetworkFile));
        print.verbose('Reading the Test Data file...');
        const testData = readJson(testDataFile).testData;
        print.verbose('Testing the Neural Network(' + neuralNetworkFileName + ')...');
        const error = testNeuralNetwork(neuralNetwork, testData);
        const start = clock();
        let duration = undefined;
        neuralNetwork.activate(testData[0].input);
        duration = clock(start);
        neuralNetworksResults.push( {name: neuralNetworkFileName.split('.')[0], error: error, performance: duration} );
    }
    const results = neuralNetworksResults.sort((neuralNetwork1, neuralNetwork2) => {
        const deltaErrors = neuralNetwork1.error.errors - neuralNetwork2.error.errors;
        if (deltaErrors == 0) {
            const deltaSeconds = neuralNetwork1.performance.seconds - neuralNetwork2.performance.seconds;
            const deltaNanoSeconds = neuralNetwork1.performance.nanoSeconds - neuralNetwork2.performance.nanoSeconds;
            return deltaSeconds != 0 ? deltaNanoSeconds : deltaSeconds;
        }
        return deltaErrors;
    });
    const iterations = top != undefined ? top : results.length;
    print.log("----------TOP NEURAL NETWORKS----------\n");
    for (let index = 0; index < iterations; index++) {
        print.log('Neural Network Name: ' + results[index].name + '\n');
        print.log('Error Rate: ' + results[index].error.errorRate * 100 + "%");
        print.log('----------Performance----------');
        print.log('Seconds: ' + results[index].performance.seconds);
        print.log('Nano Seconds: ' + results[index].performance.nanoSeconds);
        print.log('-------------------------------');
    }
    return true;
}