const { StatusCodes } = require('http-status-codes');

const AppError = require('../utils/errors/app-error');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            throw new AppError('Not able to create the resource', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async destroy(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw new AppError('Not able to find and delete the resource', StatusCodes.NOT_FOUND);
        }
    }

    async get(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
    }

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            throw new AppError('Not able to find all the resource', StatusCodes.NOT_FOUND);
        }
        
    }

    async update(id, data) { 
        try {
            const response = await this.model.findByIdAndUpdate(id, data,{new: true});
            return response;
        } catch (error) {
            throw new AppError('Not able to update the resource', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = CrudRepository;