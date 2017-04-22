'use strict';

const request = require('superagent');
const errors = require('../Errors');

class DataStorageClient {
    constructor() {
        this._host = 'http://localhost:8888';
        this._path = '/storage/services/';
    }

    getCommands() {
        return request
            .get(this._host + this._path + '_commands')
            .set('Accept', 'application/json');
    }

    checkServiceExists(serviceName) {
        return this.getService(serviceName)
            .then((service) => true)
            .catch((err) => {
                if (err.status === 404) {
                    return false;
                }
                throw err;
            })
    }

    getService(serviceName) {
        return request
            .get(this._host + this._path + serviceName)
            .set('Accept', 'application/json')
            .then((res, err) => {
                if (err) {
                    throw new errors.ServiceMaintenanceError(`Error getting service info`, err);
                }
                return res.body;
            });
    }

    addNewService(service) {
        return request
            .put(this._host + this._path + service.serviceName)
            .set('Accept', 'application/json')
            .send(service.toStorageModel());
    }

    removeService(service) {
        return request
            .delete(this._host + this._path + service.serviceName);
    }
}

module.exports = new DataStorageClient();
