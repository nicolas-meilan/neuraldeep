let program = require('commander');

import { validateInputArray, validateName, validateParams, validateProject } from './utils/utils';

import { createProjectStructure } from './commandsLogic/init';
import { runNeuralNetworkCommand } from './commandsLogic/run';
import { testNeuralNetworkCommand } from './commandsLogic/test';
import { trainAndCreateNeuralNetwortCommand } from './commandsLogic/create';


let command = false;

program.version('1.0.2');

program
    .command('init [name]')
    .description('create a new neuraldeep project')
    .action( (name) => {
        command = true;
        if(!validateParams(name)){
            console.error('ERROR: Missing parameters');
            process.exit(2);
        }
        if(!validateName(name)) {
            console.error('ERROR: Name invalid. The name must have camelCase syntax');
            process.exit(3);
        }
        createProjectStructure(name);
    });

program
    .command('create [name] [architecture...]')
    .description('create a trained neural network')
    .action( (name, architecture) => {
        command = true;
        if(!validateProject()) {
            console.error('ERROR: Go to the root of the project');
            process.exit(1);
        }
        if(!validateParams(name, architecture)){
            console.error('ERROR: Missing parameters');
            process.exit(2);
        }
        if(!validateName(name)) {
            console.error('ERROR: Name invalid. The name must have camelCase syntax');
            process.exit(3);
        }
        trainAndCreateNeuralNetwortCommand(name, architecture);
    });

program
    .command('run [name] [input]')
    .description('run a neural network')
    .action( (name, input) => {
        command = true;
        if(!validateProject()) {
            console.error('ERROR: Go to the root of the project');
            process.exit(1);
        }
        if(!validateParams(name, input)){
            console.error('ERROR: Missing parameters');
            process.exit(2);
        }
        if(!validateName(name)) {
            console.error('ERROR: Name invalid. The name must have camelCase syntax');
            process.exit(3);
        }
        if(!validateInputArray(input)) {
            console.error('ERROR: Input invalid. The input must be a binary array');
            process.exit(3);
        }
        runNeuralNetworkCommand(name, input);
    });

program
    .command('test [name]')
    .description('test a neural network')
    .action( (name) => {
        command = true;
        if(!validateProject()) {
            console.error('ERROR: Go to the root of the project');
            process.exit(1);
        }
        if(!validateParams(name)){
            console.error('ERROR: Missing parameters');
            process.exit(2);
        }
        if(!validateName(name)) {
            console.error('ERROR: Name invalid. The name must have camelCase syntax');
            process.exit(3);
        }
        testNeuralNetworkCommand(name)
    });

program.parse(process.argv);

if(!command){
    console.error('ERROR: No command given');
}