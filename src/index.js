let program = require('commander');

import { validateInputArray, validateName, validateParams, validateProject } from './utils/utils';

import { createProjectStructure } from './commandsLogic/init';
import { runNeuralNetworkCommand } from './commandsLogic/run';
import { testNeuralNetworkCommand } from './commandsLogic/test';
import { trainAndCreateNeuralNetwortCommand } from './commandsLogic/create';

import { Print } from './utils/print';


let command = false;
const print = new Print();

program.version('1.0.5');

program
    .command('init [name]')
    .description('Create a new neuraldeep project')
    .action( (name) => {
        command = true;
        if(!validateParams(name)){
            print.error('ERROR: Missing parameters');
            process.exit(2);
        }
        if(!validateName(name)) {
            print.error('ERROR: Name invalid. The name must have camelCase syntax');
            process.exit(3);
        }
        try {
            createProjectStructure(name);
        } catch (error) {
            print.error('ERROR: ' + error.message);
        }
    });

program
    .command('create [name] [architecture...]')
    .description('Create a trained neural network with training data file')
    .action( (name, architecture) => {
        command = true;
        if(!validateProject()) {
            print.error('ERROR: Go to the root of the project');
            process.exit(1);
        }
        if(!validateParams(name, architecture)){
            print.error('ERROR: Missing parameters');
            process.exit(2);
        }
        if(!validateName(name)) {
            print.error('ERROR: Name invalid. The name must have camelCase syntax');
            process.exit(3);
        }
        if (architecture.length < 3) {
            print.error('ERROR: Architecture invalid. The architecture must have three or more layers');
            process.exit(3);
        }
        if(!trainAndCreateNeuralNetwortCommand(name, architecture)){
            print.error('ERROR: Make sure you have the training data file in its respective folder');
            process.exit(4);
        }
    });

program
    .command('run [name] [input]')
    .description('Run a neural network with a input')
    .action( (name, input) => {
        command = true;
        if(!validateProject()) {
            print.error('ERROR: Go to the root of the project');
            process.exit(1);
        }
        if(!validateParams(name, input)){
            print.error('ERROR: Missing parameters');
            process.exit(2);
        }
        if(!validateName(name)) {
            print.error('ERROR: Name invalid. The name must have camelCase syntax');
            process.exit(3);
        }
        if(!validateInputArray(input)) {
            print.error('ERROR: Input invalid. The input must be a binary array');
            process.exit(3);
        }
        if(!runNeuralNetworkCommand(name, input)){
            print.error('ERROR: Make sure you have run the create command');
            process.exit(4);
        }
    });

program
    .command('test [name]')
    .option('-e, --extensive', 'Show tests with error')
    .description('Test a neural network with test data file')
    .action( (name, option) => {
        command = true;
        if(!validateProject()) {
            print.error('ERROR: Go to the root of the project');
            process.exit(1);
        }
        if(!validateParams(name)){
            print.error('ERROR: Missing parameters');
            process.exit(2);
        }
        if(!validateName(name)) {
            print.error('ERROR: Name invalid. The name must have camelCase syntax');
            process.exit(3);
        }
        if(!testNeuralNetworkCommand(name, option.extensive)){
            print.error('ERROR: Make sure you have run the creation command or have the test data file in your respective folder');
            process.exit(4);
        }
    });

program.parse(process.argv);

if(!command){
    print.error('ERROR: No command given');
}