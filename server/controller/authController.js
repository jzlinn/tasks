const dataFormater = require('../utils/respFormatter');
const authHelper = require('../helper/authHelper');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.loginPage = async (request, response) => {
    try {
        // creating an admin user
        let adminData = {
            firstName: 'masterUser',
            lastName: 'masterUser',
            username: 'masteruser',
            emailId: 'masteruser@root.com',
            password: 'rootuser@123',
            role: 'admin'
        }
        let findAdmin = await authHelper.findUserByCheck({ username: 'masteruser', emailId: 'masteruser@root.com', })
        if (!findAdmin) {
            let createAdmin = await authHelper.createSuperUser(adminData);
            if (createAdmin) {
                console.log('admin user created');
            }
        } else {
            console.log('admin already created');
        }
        response.render('auth/index', { templates: 'templates' });
    } catch (error) {
        console.log('error occured : ', error);
    }
}

exports.commonLogin = async (request, response) => {
    try {
        const loginUser = await authHelper.CheckUserLogin(request.input);
        if (loginUser && loginUser.statusCode == 200) {
            let token = jwt.sign({
                tokenData: {
                    username: loginUser.loginResponse.username,
                    email: loginUser.loginResponse.email_id,
                }
            }, process.env.TOKEN_SECRET, { expiresIn: '60m' });

            response.redirect('/dashboard',)

        } else if (loginUser.statusCode == 401) {
            response.render('auth/index', { message: loginUser.loginResponse });
        } else {
            response.render('auth/index', { message: loginUser.loginResponse });
        }

    } catch (error) {
        console.log('error occured : ', error);
    }
}