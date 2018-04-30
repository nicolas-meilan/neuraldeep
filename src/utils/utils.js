import { writeFileSync, readFileSync } from 'fs'


export function saveJson(json, path) {
    const jsonStr = JSON.stringify(json)
    writeFileSync(path, jsonStr)
}

export function readJson(path) {
    return JSON.parse(readFileSync(path, 'utf8'))
}

export function maxValueInArray(array) {
    if (array.length === 0) {
        return -1
    }
    let max = array[0]
    let index = 0
    let maxArray = [0]
    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            index = i
            max = array[i]
        }
        maxArray.push(0)
    }
    return index
}

export function multiplyArray(array1, array2) {
    let result = []
    let iterator = array1.length < array2.length?array1.length: array2.length
    for (let index = 0; index < iterator; index++) {
        result.push(array1[index] * array2[index])
    }
    return result
}