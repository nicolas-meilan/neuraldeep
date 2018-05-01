import { Network } from 'synaptic';

import { activatedOutputNeuron } from '../utils/neuralNetworkUtils';
import { fileExists, readJson } from '../utils/utils';
import { Print } from '../utils/print';

import { neuralNetworkPath } from '../consts';


export function runNeuralNetworkCommand(name, input, verbose=false) {
    const print = new Print(verbose);
    const neuralNetworkFile = neuralNetworkPath + name + '.json';
    if (!fileExists(neuralNetworkFile)) {
        return false;
    }
    const binaryInput = input.replace('[', '').replace(']','').split(',');
    const neuralNetwork = Network.fromJSON(readJson(neuralNetworkFile));
    const activationPercentage = neuralNetwork.activate(binaryInput);
    const output = activatedOutputNeuron(activationPercentage).neurons;
    print.log("----------OUTPUT----------");
    print.log(output);
    print.log("--------------------------");
    return true;
}