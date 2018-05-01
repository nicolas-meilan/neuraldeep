import { Network } from 'synaptic';

import { activatedOutputNeuron } from '../utils/neuralNetworkUtils';
import { readJson } from '../utils/utils';

import { neuralNetworkPath } from '../consts';


export function runNeuralNetworkCommand(name, input) {
    const binaryInput = input.replace('[', '').replace(']','').split(',');
    const neuralNetwork = Network.fromJSON(readJson(neuralNetworkPath + name + '.json'));
    const activationPercentage = neuralNetwork.activate(binaryInput);
    const output = activatedOutputNeuron(activationPercentage).neurons;
    console.log("----------OUTPUT----------");
    console.log(output);
    console.log("--------------------------");
}