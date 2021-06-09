
const dashboardHelper = require('../helper/dashboardHelper')

exports.dashboardPage = async (request, response) => {
    try {
        let emps = await dashboardHelper.fetchEmpUser();
        console.log('emps ', emps);
        response.render('dashboard/index', { emps: emps });
    } catch (error) {
        console.log('error occured : ', error);
    }
}

exports.addEmployForm = async (request, response) => {
    try {
        response.render('dashboard/addForm', { templates: 'templates' });
    } catch (error) {
        console.log('error occured : ', error);
    }
}

exports.saveNewEmploy = async (request, response) => {
    try {
        let save = await dashboardHelper.createEmpUser(request.input);
        if (save) {
            response.redirect('/dashboard',)
        }

    } catch (error) {
        console.log('error occured : ', error);
    }
}