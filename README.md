# NeuralDeep

**Console interface** for create, train, test and **compare** differents **Perceptron Neural Networks**

## Requirements

* [NodeJS](https://nodejs.org/es)

## Install

```npm install -g neuraldeep```

## Use

1. Create a **neuraldeep** project: ```neuraldeep init <PROJECT_NAME>```.
2. Go to the root of the project: ```cd <PROJECT_NAME>```.
3. Now you can start using **neuraldeep**.

### Train and Create a new Neural Network

1. First of all you have to create the training data to train the neural network, so you have to create a training data file in the **trainingData folder**, following the syntax of the **training data file example**.
2. Now to create the network, you must execute the following command: ```neuraldeep create <NAME> <ARCHITECTURE>```.
* **NAME:** The name of the **Neural Network** and the **Training Data File**.
* **ARCHITECTURE:** The **Architecture** of the **Neural Network**. Input,deep and output **neurons**.
3. The **Neural Network** is saved in the **neuralNetwork** folder.

### Execute a Neural Network

* To execute the **Neural Network** you can use the command: ```neuraldeep run <NAME> <BINARY_INPUT_ARRAY>```.

### Test a Neural Network

1. First of all you have to create the test data to test the neural network, so you have to create a test data file in the **testData folder**, following the syntax of the **test data file example**.
2. Now to test the network, you must execute the following command: ```neuraldeep test <NAME>```.
* **NAME:** The name of the **Neural Network** and the **Test Data File**.