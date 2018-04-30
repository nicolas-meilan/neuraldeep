import { Trainer } from 'synaptic'
import { saveJson, readJson, maxValueInArray } from './utils'


export function createAndTrainNeuralNetwork(neuralNetwork, trainingData, trainingConfig={}, path) {
    const myTrainer = new Trainer(neuralNetwork) // Crear entrenador
    myTrainer.train(trainingData, trainingConfig) // entrenar
    saveJson(neuralNetwork.toJSON(), path)
}

export function activatedOutputNeuron(output) {
    let binaryOutput = []
    for (const iterator of output) {
        binaryOutput.push(0)
    }
    const index = maxValueInArray(output)
    binaryOutput[index] = 1
    const outputNeurons = {
        neurons: binaryOutput,
        indexActivatedNeuron: index
    }
    return outputNeurons
}

export function testNeuralNetwork(neuralNetwork, testData) {
    let errors = 0
    let testsErrors = []
    for (let test of testData) {
        const output = neuralNetwork.activate(test.input)
        const outputNeurons = activatedOutputNeuron(output)
        if(_arrayEquals(outputNeurons.neurons, test.output)) {
            const testError = {
                input: test.input,
                outputExpected: test.output,
                outputObtained: outputNeurons.neurons,
            }
            errors++
            testsErrors.push(testError)
        }
    }
    const error = {
        errorRate: errors/testData.length,
        testsErrors: testsErrors,
        errors: errors,
        tests: testData.length,
    }
    return error
}

function _arrayEquals(arr1, arr2) {
    return JSON.stringify(arr1) != JSON.stringify(arr2)
}