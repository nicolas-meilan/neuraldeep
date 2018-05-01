import { red } from 'chalk'

export class Print {
    constructor(verbose=false) {
        this._verbose = verbose;
    }

    verbose(message) {
        if(this._verbose) {
            console.log(message);
        }
    }

    error(message) {
        console.error(red(message));
    }

    log(message) {
        console.log(message);
    }

    changeVerboseState() {
        this._verbose = !this._verbose;
    }
}