const joi = require('joi');
const respFormatter = require('../utils/respFormatter');


const commonLogin = (request, response, next) => {
    const schema = joi.object({
        emailId: joi.string().email().required(),
        password: joi.string().required(),
    });

    const { error, value } = schema.validate(request.body);
    if (error) {
        return response.status(400).json(respFormatter.jsonResponse(true, {}, error.details[0].message));
    } else {
        request.input = request.body;
    }
    next();
}

const userCreation = (request, response, next) => {
    const schema = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        department: joi.string().required(),
        emailId: joi.string().email().required(),
    });
    const { error, value } = schema.validate(request.body);
    if (error) {
        return response.status(400).json(respFormatter.jsonResponse(true, {}, error.details[0].message));
    } else {
        request.input = request.body;
    }
    next();
}

module.exports = { userCreation, commonLogin };