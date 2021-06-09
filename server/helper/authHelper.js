const userModel = require('../models/user');

const bcrypt = require('bcrypt');

exports.createSuperUser = async (admin) => {
    try {
        let adminData = new userModel(admin);
        let saveAdmin = await adminData.save();
        return (saveAdmin);
    } catch (error) {
        throw error;
    }
}

exports.findUserByCheck = async (check, fields) => {
    try {
        let user = await userModel.findOne(check, fields);
        return user;
    } catch (error) {
        throw error;
    }
};

// exports.CheckUserLogin = async (credentials) => {

//     try {
//         let userCheck = await userModel.findOne({
//             emailId: credentials.emailId,
//         });
//         if (userCheck) {
//             userCheck.comparePassword(credentials.password, function (err, isMatch) {
//                 if (err) throw err;

//                 if (isMatch) {
//                     return ({ statusCode: 200, loginResponse: userCheck, });
//                 } else {
//                     return ({ statusCode: 401, loginResponse: "Invalid Email or password", });
//                 }
//             });

//         } else {
//             return ({ statusCode: 401, loginResponse: "Invalid Email or password", });
//         }

//     } catch (error) {
//         return reject(error);
//     }
// };

exports.CheckUserLogin = async (credentials) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userCheck = await userModel.findOne({
                email_id: credentials.userLoginEmail,
            });

            if (userCheck) {
                userCheck.comparePassword(credentials.password, function (err, isMatch) {
                    if (err) throw err;

                    if (isMatch) {
                        return resolve({
                            statusCode: 200,
                            loginResponse: userCheck,
                        });
                    } else {
                        return resolve({
                            statusCode: 401,
                            loginResponse: "Invalid Email or password",
                        });
                    }
                });

            } else {
                return resolve({
                    statusCode: 401,
                    loginResponse: "No account found !!..",
                });
            }
        } catch (error) {
            return reject(error);
        }
    });
};