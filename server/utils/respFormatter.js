const jsonResponse = (error = false, data = {}, message = '') => {
    return {
        error, data, message
    };
};

module.exports = {
    jsonResponse
};