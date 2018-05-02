import { Network } from 'synaptic';

import { activatedOutputNeuron } from '../utils/neuralNetworkUtils';
import { fileExists, readJson } from '../utils/utils';

import { neuralNetworkPath } from '../consts';


export function runNeuralNetworkCommand(name, input) {
    const neuralNetworkFile = neuralNetworkPath + name + '.json';
    if (!fileExists(neuralNetworkFile)) {
        return false;
    }
    const binaryInput = input.replace('[', '').replace(']','').split(',');
    const neuralNetwork = Network.fromJSON(readJson(neuralNetworkFile));
    const activationPercentage = neuralNetwork.activate(binaryInput);
    const output = activatedOutputNeuron(activationPercentage).neurons;
    console.log("----------OUTPUT----------");
    console.log(output);
    console.log("--------------------------");
    return true;
}