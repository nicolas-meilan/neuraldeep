let program = require('commander');

import { validateInputArray, validateName, validateProject } from './utils/utils';

import { createProjectStructure } from './commandsLogic/init';
import { runNeuralNetworkCommand } from './commandsLogic/run';
import { testNeuralNetworkCommand } from './commandsLogic/test';
import { trainAndCreateNeuralNetwortCommand } from './commandsLogic/create';


program.version('1.0.0');

program
    .command('init [name]')
    .description('create a new neuraldeep project')
    .action( (name) => {
        if(!validateName(name)) {
            process.exit(2);
        }
        createProjectStructure(name);
    });

program
    .command('create [name] [architecture...]')
    .description('create a trained neural network')
    .action( (name, architecture) => {
        if(!validateProject()) {
            process.exit(1);
        } else if(!validateName(name)) {
            process.exit(2);
        }
        trainAndCreateNeuralNetwortCommand(name, architecture);
    });

program
    .command('run [name] [input]')
    .description('run a neural network')
    .action( (name, input) => {
        if(!validateProject()) {
            process.exit(1);
        } else if(!validateName(name) || !validateInputArray(input)) {
            process.exit(2);
        }
        runNeuralNetworkCommand(name, input);
    });

program
    .command('test [name]')
    .description('test a neural network')
    .action( (name) => {
        if(!validateProject()) {
            process.exit(1);
        } else if(!validateName(name)) {
            process.exit(2);
        }
        testNeuralNetworkCommand(name)
    });

program.parse(process.argv);