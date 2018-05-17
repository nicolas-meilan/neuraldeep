# NeuralDeep

Now yo can create, train, test and compare easly diferents **secuential** neural networks with diferents architectures for select the architecture that better solve your problems.**NeuralDeep** allow to see the performance and the error rate of differents neural networks and compare these with a ranking table. Also you can to export your neural networks to a json file to use with **Synaptic**.

**NeuralDeep** is a **console interface** based in the library of deep learning named: [**Synaptic**](https://www.npmjs.com/package/synaptic).

## Index

* [**Requirements**](#requirements)
* [**Install**](#install)
* [**Use**](#use)
* [**Train and Create a new Neural Network**](#train-and-create-a-new-neural-network)
* [**Execute a Neural Network**](#execute-a-neural-network)
* [**Test a Neural Network**](#test-a-neural-network)
* [**Compare Two or More Neural Networks**](#compare-two-or-more-neural-networks)

## Requirements

* [NodeJS](https://nodejs.org/es)

## Install

```npm install -g neuraldeep```

## Use

1. Create a **neuraldeep** project:

```neuraldeep init <projectName>```

2. Go to the root of the project:

```cd <projectName>```

3. Now you can start using **neuraldeep**.

## Train and Create a new Neural Network

1. First of all you have to create the training data to train the neural network, so you have to create a training data file in the **trainingData folder**, following the syntax of the **training data file example**.
2. Now to create the network, you must execute the following command: 

```neuraldeep create <name> <architecture>```

* **name:** The name of the **Neural Network** and the **Training Data File**.
* **architecture:** The **Architecture** of the **Neural Network**. Input,deep and output **neurons**.

* The **Neural Network** is saved in the **neuralNetwork** folder.

## Execute a Neural Network

* First, you must have to create a **Neural Network** with the **neuraldeep create** command. After that, to execute the **Neural Network** created you must use the command:

```neuraldeep run <name> <binaryInputArray>```

* **name:** The name of the **Neural Network** and the **Training Data File**.
* **binaryInputArray:** The **input** of the **Neural Network** in array format, for example If the neural network have 8 input neurons, the input may be **[0,0,0,0,0,0,1,1]**.

## Test a Neural Network

1. First of all you have to create a neural network (with **neuraldeep create**) and the test data to test it, so you have to create a test data file in the **testData folder**, following the syntax of the **test data file example**.
2. Now to test the network, you must execute the following command:

```neuraldeep test <name>```

* **name:** The name of the **Neural Network** and the **Test Data File**.

* This command has the **extensive** option (**-e** or **--extensive**) whitch showing all failed tests.

## Compare Two or More Neural Networks

1. First of all you have to create two or more neural network (with **neuraldeep create**),**the neural network must have the same base name: baseName_version** and the test data to test its, so you have to create a test data file in the **testData folder**, following the syntax of the **test data file example**. **(the name of the test data file must be the base name of the neural networks)**.
2. Now to compare the neural networks, you must execute the following command:

```neuraldeep compare <baseName>```

* **baseName:** The name of the test data file and the base name of the neural networks.