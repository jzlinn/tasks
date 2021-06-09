const empModel = require('../models/employee');

exports.createEmpUser = async (employData) => {
    try {
        let empData = new empModel(employData);
        let saveEmp = await empData.save();
        return (saveEmp);
    } catch (error) {
        throw error;
    }
}

exports.fetchEmpUser = async (check, fields) => {
    try {
        let user = await empModel.find(check, fields);
        return user;
    } catch (error) {
        throw error;
    }
};