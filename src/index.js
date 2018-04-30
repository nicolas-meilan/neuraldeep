let program = require('commander');
import * as synaptic from 'synaptic';

import { activatedOutputNeuron, createAndTrainNeuralNetwork, testNeuralNetwork } from './utils/neuralNetworkUtils';
import { readJson } from './utils/utils'


const neuralNetworkPath = './neuralNetwork/';
const trainingDataPath = './trainingData/';
const testDataPath = './testData/';

program.version('1.0.0');

program
    .command('create [name] [architecture...]')
    .description('create a trained neural network')
    .action( (name, architecture) => {
        const neuralNetwork = new synaptic.Architect.Perceptron(...architecture);
        const trainingData = readJson(trainingDataPath + name + '.json').trainingData;
        const trainingConfig = {
            rate: 0.1,
            iterations: 1000,
            shuffle: true
        };
        createAndTrainNeuralNetwork(neuralNetwork, trainingData, trainingConfig, neuralNetworkPath + name + '.json');
    });

program
    .command('run [name] [input]')
    .description('run a neural network')
    .action( (name, input) => {
        const binaryInput = input.replace('[', '').replace(']','').split(',');
        const neuralNetwork = synaptic.Network.fromJSON(readJson(neuralNetworkPath + name + '.json'));
        const activationPercentage = neuralNetwork.activate(binaryInput);
        const output = activatedOutputNeuron(activationPercentage).neurons;
        console.log("----------OUTPUT----------");
        console.log(output);
        console.log("--------------------------");
    });

    program
    .command('test [name]')
    .description('test a neural network')
    .action( (name) => {
        const neuralNetwork = synaptic.Network.fromJSON(readJson(neuralNetworkPath + name + '.json'));
        const testData = readJson(testDataPath + name + '.json').testData;
        const error = testNeuralNetwork(neuralNetwork, testData);
        console.log("----------ERROR RATE----------");
        console.log(error.errorRate*100  + "%");
        console.log("------------------------------");
    });

program.parse(process.argv);