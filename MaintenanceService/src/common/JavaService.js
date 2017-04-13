'use strict';

const _ = require('lodash');
const Service = require('./Service');

class JavaService extends Service {
    constructor(data) {
        super(data);
        this._validate(['mainClass'], data);

        this._javaBinPath = '/usr/bin/java';
        this._dependenciesPath = '/usr/lib/droid-system';

        this._mainClass = data.mainClass;
        this._dependencies = data.dependencies || [];
    }

    get mainClass() {
        return this._mainClass;
    }

    get dependencies() {
        return this._dependencies;
    }

    get executionCommand() {
        let classPath = `-cp ${this._dependenciesPath}/*`;

        if (!_.isEmpty(this.dependencies)) {
            classPath += `:${this._dependenciesPath}/${this.directoryName}/*`;
        }

        classPath += `:${JavaService.applicationsPath}/${this.directoryName}.jar`;

        return `${this._javaBinPath} ${classPath} ${this.mainClass}`;
    }
}

module.exports = JavaService;
